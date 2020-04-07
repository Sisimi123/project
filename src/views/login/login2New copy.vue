<style lang="less">
@import "./login2New.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="title_login">
      <p>{{title}}</p>
    </div>
    <div class="downLoad_login">
      <!-- <a target="_blank">打印控件</a> -->
      <a target="_blank" :href="$basePath+'/static/pageoffice/sealsetup.exe'">PageOffice控件</a>
      <a target="_blank" href="http://zjfisher.zjoaf.gov.cn:8180/hyjgpt/zjs/index.jsp">浙江海渔通</a>
      <a target="_blank" href="http://zjfisher.zjoaf.gov.cn:8180/hyjgpt/zjs/public.jsp">海渔通公众版</a>
    </div>
    <div class="login-con">
      <Card :bordered="false" v-show="ifQRcode">
        <div style="width:400px;height:120px">
          <div style="float:left;width:200px;">
            <p style="color:#4F5B69;font-size:32px;padding-top:50px;width:100px">登录</p>
          </div>
          <div style="float:left;width:200px;">
            <img
              @click="QRCode_login"
              style="width:110px;height:110px;margin-left:80px;cursor:pointer"
              src="../../styles/QRcode.png"
            />
          </div>
        </div>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <span
                style="display:block;background: #ffffff66;position:absolute;left:10px;top:-15px;width:36px;height:18px;z-index:1"
              >用户名</span>
              <Input v-model="form.username" placeholder="请输入用户名"></Input>
            </FormItem>
            <FormItem prop="password">
              <span
                style="display:block;background: #ffffff66;position:absolute;left:10px;top:-15px;width:25px;height:18px;z-index:1;"
              >密码</span>
              <Input type="password" v-model="form.password" placeholder="请输入密码"></Input>
            </FormItem>
            <FormItem prop="validate">
              <Row>
                <Col span="18">
                  <span
                    style="display:block;background: #ffffff66;position:absolute;left:10px;top:-15px;width:36px;height:18px;z-index:1"
                  >验证码</span>
                  <Input v-model="form.validate" placeholder="请输入验证码"></Input>
                </Col>
                <Col span="6">
                  <div style="margin-left:8px;margin-top:8px">
                    <img :src="validateImage" @click="setValidateImage" />
                  </div>
                </Col>
              </Row>
            </FormItem>
            <div style="margin-top:-20px;margin-bottom:20px">
              <Row>
                <Col span="12">
                  <Checkbox v-model="checkedPw">记住密码</Checkbox>
                </Col>
                <Col span="12">
                  <!-- <p style="margin-left:60px;cursor:pointer">Forgot password?</p> -->
                </Col>
              </Row>
            </div>
            <FormItem>
              <Button @click="handleSubmit" :loading="logining" type="primary">登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <Card v-show="!ifQRcode" :bordered="false">
        <div class="QRLogin_tips">
          <div class="QRLogin_tips_div">
            <p @click="selectQRcode('0')">扫码登录</p>
          </div>
          <div class="QRLogin_tips_div">
            <p @click="selectQRcode('1')">钉钉二维码</p>
          </div>
          <div class="QRLogin_tips_div2">
            <img @click="account_login" src="../../styles/QRCode_login.png" />
          </div>
        </div>
        <div v-show="isDingTalk" id="login_container" align="center"></div>
        <div v-show="!isDingTalk" style="text-align: center;height:406px">
          <img style="width:215px;height:215px;margin-top:15px" :src="qrCode.src" />
          <div style="margin-bottom:10px;position:relative;margin-top:10px;" @click="getQRCodeUrl">
            <span style="font-size:14px;color:#BCBFC0">
              请使用海渔通扫描二维码登录
              <img style="cursor:pointer;" src="../../styles/refresh2.png" />
              <span style="font-size:14px;color:#6CC3FF">刷新</span>
            </span>
          </div>
        </div>
        <!-- <Button @click="account_login" type="primary"><img style="position:absolute;z-index:10;left:130px" src="../styles/goback.png"/>账号密码登录</Button> -->
      </Card>
      <p class="jszc">技术支持：浙江索思科技有限公司</p>
    </div>
    <Modal v-model="status.chooseUser" title="选择用户" :mask-closable="false" width="620">
      <Table highlight-row @on-current-change="selectUser" :columns="columnsUser" :data="dataUser"></Table>
      <div slot="footer">
        <Button @click="status.chooseUser=false">关闭</Button>
        <Button @click="submitUser()" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { isEmpty } from "@/libs/common";
import { initSystem } from "@/api/system";
export default {
  data() {
    return {
      checkedPw: false,
      isDingTalk: false,
      dataUser: [],
      columnsUser: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
          align: "center"
        },
        {
          title: "部门名",
          key: "deptName",
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        }
      ],
      status: {
        chooseUser: false
      },
      ifQRcode: true,
      logining: false,
      validateImage: this.$basePath + "/validate/image",
      qrCode: {
        uuid: undefined,
        src: ""
      },
      form: {
        username: "",
        password: "",
        validate: ""
      },
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      dingdUrl: "",
      dingAppid: ""
    };
  },
  computed: {
    loginParams() {
      var password = this.$http.md5(
        this.form.username +
          this.$http.md5(this.form.password) +
          this.form.validate
      );
      return {
        username: this.form.username,
        password: password,
        validate: this.form.validate
      };
    },
    title() {
      return window.document.title;
    }
  },
  methods: {
    selectQRcode(v) {
      var _self = this;
      if (v === "0") {
        this.isDingTalk = false;
        $(".QRLogin_tips_div p")
          .eq(0)
          .css("border-bottom", "2px solid #0084ff");
        $(".QRLogin_tips_div p")
          .eq(1)
          .css("border-bottom", "none");
      } else if (v === "1") {
        this.isDingTalk = true;
        $(".QRLogin_tips_div p")
          .eq(1)
          .css("border-bottom", "2px solid #0084ff");
        $(".QRLogin_tips_div p")
          .eq(0)
          .css("border-bottom", "none");
      }
    },
    getUUID() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    getQRCodeUrl() {
      this.qrCode.uuid = this.getUUID();
      this.qrCode.src =
        this.$basePath +
        "//authentication/showQRCode?uuid=" +
        this.qrCode.uuid +
        "&tt=" +
        new Date().getTime();
    },
    account_login() {
      var _self = this;
      _self.ifQRcode = true;
    },
    selectUser(currentRow) {
      var _self = this;
      _self.mobile = currentRow.mobile;
      _self.userId = currentRow.userId;
    },
    loginFun(result, type) {
      var _self = this;
      if (type === "账号") {
        if (result.success) {
          if (result.data.userType !== "sys") {
            _self.setValidateImage();
            _self.$Notice.open({
              title: "登录失败",
              desc:
                "监测到您用非后台用户登录，非后台用户无法登录管理系统，请重新输入！"
            });
            _self.$refs["loginForm"].resetFields();
            return;
          }
          let userInfo = result.data;
          _self.$store.commit("setUserInfo", userInfo);
          // _self.$store.commit('setBeforeTime', (new Date).getTime());
          _self.$Message.success(result.msg);
          let avatar = _self.$util.avatar;
          if (!isEmpty(userInfo.photo)) {
            avatar = _self.$baseAttachUrl + userInfo.photo;
          }
        //   _self.$store.commit("setAvator", avatar);
          Cookies.set("user", _self.form.username);
        //   initSystem(_self, function() {
        //     if (typeof _self.$util.homeUrl === "function") {
        //       _self.$util.homeUrl(_self);
        //     } else {
        //       _self.$router.push(_self.$util.homeUrl);
        //     }
        //   });
        initSystem(() => {
            // localStorage.removeItem("tagNaveList");
            _self.$router.push({ path: "/" });
          });
        } else {
          _self.logining = false;
          _self.form.validate = "";
          _self.setValidateImage();
          _self.$Message.error(result.msg);
        }
      } else if (type === "钉钉(多用户)") {
        if (result.success) {
          _self.status.chooseUser = false;
          let userInfo = result.data;
          _self.$store.commit("setUserInfo", userInfo);
          // _self.$store.commit('setBeforeTime', (new Date).getTime());
          _self.$Message.success(result.msg);
          let avatar = _self.$util.avatar;
          if (!isEmpty(userInfo.photo)) {
            avatar = _self.$baseAttachUrl + userInfo.photo;
          }
        //   _self.$store.commit("setAvator", avatar);
          Cookies.set("user", _self.form.username);
        //   initSystem(_self, function() {
        //     if (typeof _self.$util.homeUrl === "function") {
        //       _self.$util.homeUrl(_self);
        //     } else {
        //       _self.$router.push(_self.$util.homeUrl);
        //     }
        //   });
        initSystem(() => {
            // localStorage.removeItem("tagNaveList");
            _self.$router.push({ path: "/" });
          });
        } else {
          _self.$Message.error(result.msg);
        }
      } else if (type === "钉钉") {
        if (result.success) {
          if (result.data.constructor === Array) {
            _self.dataUser = result.data;
            _self.status.chooseUser = true;
          } else if (result.data.constructor === Object) {
            let userInfo = result.data;
            _self.$store.commit("setUserInfo", userInfo);
            // _self.$store.commit('setBeforeTime', (new Date).getTime());
            _self.$Message.success(result.msg);
            // let avatar = _self.$util.avatar;
            // if (!isEmpty(userInfo.photo)) {
            //   avatar = _self.$baseAttachUrl + userInfo.photo;
            // }
            // _self.$store.commit("setAvator", avatar);
            Cookies.set("user", _self.form.username);
            // initSystem(_self, function() {
            //   if (typeof _self.$util.homeUrl === "function") {
            //     _self.$util.homeUrl(_self);
            //   } else {
            //     _self.$router.push(_self.$util.homeUrl);
            //   }
            // });
            initSystem(() => {
            // localStorage.removeItem("tagNaveList");
            _self.$router.push({ path: "/" });
          });
          }
        }
      } else if (type === "海渔通") {
        if (result.success) {
          if (result.data.userType !== "sys") {
            _self.setValidateImage();
            _self.$Notice.open({
              title: "登录失败",
              desc:
                "监测到您用非后台用户登录，非后台用户无法登录管理系统，请重新输入！"
            });
            _self.$refs["loginForm"].resetFields();
            return;
          }
          let userInfo = result.data;
          _self.$store.commit("setUserInfo", userInfo);
          // _self.$store.commit('setBeforeTime', (new Date).getTime());
          _self.$Message.success(result.msg);
        //   let avatar = _self.$util.avatar;
        //   if (!isEmpty(userInfo.photo)) {
        //     avatar = _self.$baseAttachUrl + userInfo.photo;
        //   }
        //   _self.$store.commit("setAvator", avatar);
          Cookies.set("user", _self.form.username);
          // initSystem(_self, function () {
          //     if (typeof _self.$util.homeUrl === 'function') {
          //         _self.$util.homeUrl(_self);
          //     } else {
          //         _self.$router.push(_self.$util.homeUrl);
          //     }
          // });
          initSystem(() => {
            // _self.$router.push({path:_self.$store.state.user.appInfo.home})
            // localStorage.removeItem("tagNaveList");
            _self.$router.push({ path: "/" });
          });
        }
      }
    },
    submitUser() {
      var _self = this;
      _self.$http
        .post(
          "/auth/dTalkLoginSet?mobile=" + _self.mobile + "&id=" + _self.userId
        )
        .then(res => {
          _self.loginFun(res, "钉钉(多用户)");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // test(loginTmpCode){
    //     var formredwin = document.createElement("form");
    //     formredwin.method = 'POST';
    //     document.body.appendChild(formredwin);
    //     formredwin.action = this.$basePath + "/auth/dTalkLogin?loginTmpCode="+loginTmpCode
    //     var ret = formredwin.submit();
    //     formredwin.parentNode.removeChild(formredwin);
    //     console.log(formredwin, ret);
    // },
    /** 发送loginTmpCode */
    sendLoginTmpCode(loginTmpCode) {
      // this.test(loginTmpCode)
      var _self = this;
      $.ajax({
        url: this.$basePath + "/auth/dTalkLogin?loginTmpCode=" + loginTmpCode,
        type: "GET",
        xhrFields: {
          withCredentials: true
        },
        success: function(result) {
          _self.loginFun(result, "钉钉");
        }
      });
    },
    getDingParams() {
      var _self = this;
      _self.$http
        .get("/auth/getDDPcLoginInfo")
        .then(res => {
          _self.dingdUrl = res.data.uri;
          _self.dingAppid = res.data.loginAppId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    QRCode_login() {
      var _self = this;
      var url = "";
      var appid = "";
      $(".QRLogin_tips_div p")
        .eq(0)
        .css("border-bottom", "2px solid #0084ff");
      $(".QRLogin_tips_div p")
        .eq(1)
        .css("border-bottom", "none");
      this.isDingTalk = false;
      !(function(window, document) {
        function d(a) {
          var e,
            c = document.createElement("iframe"),
            d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto;
          (d += a.style ? "&style=" + encodeURIComponent(a.style) : ""),
            (d += a.href ? "&href=" + a.href : ""),
            (c.src = d),
            (c.frameBorder = "0"),
            (c.allowTransparency = "true"),
            (c.scrolling = "no"),
            (c.width = a.width ? a.width + "px" : "365px"),
            (c.height = a.height ? a.height + "px" : "400px"),
            (e = document.getElementById(a.id)),
            (e.innerHTML = ""),
            e.appendChild(c);
        }
        window.DDLogin = d;
      })(window, document);
      var goto =
        "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=" +
        _self.dingAppid +
        "&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
        _self.dingdUrl;
      var obj = DDLogin({
        id: "login_container",
        goto: encodeURIComponent(goto),
        style: "border:none;background-color:#FFFFFF;margin-top:-20px",
        width: "365",
        height: "300"
      });

      var hanndleMessage = function(event) {
        var origin = event.origin;
        if (origin == "https://login.dingtalk.com") {
          var loginTmpCode = event.data;
          _self.sendLoginTmpCode(loginTmpCode);
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", hanndleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", hanndleMessage);
      }
      _self.getQRCodeUrl();
      _self.ifQRcode = false;
      var tt = setInterval(function() {
        if (!_self.ifQRcode) {
          _self.QRCode_query();
        } else {
          if (tt != undefined) window.clearInterval(tt);
        }
      }, 1000);
    },
    QRCode_query() {
      var _self = this;
      this.$http
        .get("/authentication/queryQRCode", {
          params: { uuid: this.qrCode.uuid }
        })
        .then(function(result) {
          _self.loginFun(result, "海渔通");
        });
    },
    setValidateImage() {
      this.validateImage =
        this.$basePath + "/validate/image?t=" + new Date().getTime();
    },
    // 设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; ");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("=");
          if (arr2[0] === "userName") {
            this.form.username = arr2[1];
          } else if (arr2[0] === "userPwd") {
            this.form.password = arr2[1];
          }
        }
      }
    },
    // 清除cookie
    clearCookie() {
      this.setCookie("", "", -1);
    },
    handleSubmit() {
      var _self = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (_self.checkedPw) {
            _self.setCookie(_self.form.username, _self.form.password, 1);
          } else {
            _self.clearCookie();
          }
          if (_self.logining) return;
          _self.logining = true;
          let params = new URLSearchParams();
          params.append("username", _self.form.username);
          var test =
            _self.form.username +
            this.$http.md5(_self.form.password) +
            _self.form.validate;
          var password = this.$http.md5(
            _self.form.username +
              this.$http.md5(_self.form.password) +
              _self.form.validate
          );
          params.append("password", password);
          params.append("validate", _self.form.validate);
          params.append("userType", "sys");
          // _self.form.password=password;
          this.$http
            .post("/authentication/formImage", params)
            .then(function(result) {
              _self.loginFun(result, "账号");
            })
            .catch(function(error) {
              _self.logining = false;
            });
        }
      });
    }
  },
  activated() {
    console.log("activated");
  },
  mounted() {
    this.getCookie();
    this.setValidateImage();
    this.getDingParams();
  }
};
</script>

<style>
</style>
