<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../../images/login-bg.png");
  background-size: cover;
  background-position: center;
  position: relative;
  .ivu-card {
    border: none;
    background-color: #ffffff;
    padding: 10px 30px;
    .ivu-card {
      padding-top: 0;
    }
    .ivu-input {
      // width: 358px;
      outline: none;
      border: 1px solid #d4dfec;
      height: 50px;
      border-radius: 7px;
    }
    .ivu-form-item-error-tip {
      z-index: 10;
    }
  }
  &-con {
    position: absolute;
    right: 38%;
    top: 50%;
    transform: translateY(-40%);
    width: 450px;
    .form-con {
      padding: 10px 0 0;
    }
  }
}
.title_login{
    z-index: 999;
    color: #fff;
    font-size: 30px;
    font-weight: 300;
    position: absolute;
    left: 150px;
    top:80px;
}
.downLoad_login{
    position: absolute;
    right: 80px;
    top:80px;
    a{
        margin-left: 20px;
        color:#1b232a;
        font-size: 17px;
    }
    a:hover{
        border-bottom:2px solid #0084ff;
    }
}
.jszc{
    z-index: 999;
    text-align: center;
    color: #fff;
    margin-top:15px;
    font-size: 16px;
}
.QRLogin_tips{
    width:400px;
    height:100px;
    float:left;
    .QRLogin_tips_div{
        float:left;
        width:100px;
        padding-right:10px;
        p{
            color:#4F5B69;
            font-size:20px;
            padding-top:50px;
            width:100px;
            cursor:pointer;
            text-align: center
        }
        // P:hover{
        //     border-bottom:2px solid #0084ff;
        // }
    }
    .QRLogin_tips_div2{
        float:left;
        width:180px;
        img{
            width:110px;
            height:110px;
            margin-left:80px;
            cursor:pointer
        }
    }
}
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="title_login">
      <p>浙江省海洋与渔业执法综合管理系统</p>
    </div>
    <!-- <div class="downLoad_login">
      <a target="_blank">打印控件</a>
      <a target="_blank">视频控件</a>
      <a target="_blank" href="http://zjfisher.zjoaf.gov.cn:8180/hyjgpt/zjs/index.jsp">浙江海渔通</a>
      <a target="_blank" href="http://zjfisher.zjoaf.gov.cn:8180/hyjgpt/zjs/public.jsp">海渔通公众版</a>
    </div>-->
    <div class="login-con">
      <Card class="box-card">
        <div style="width:400px;height:120px">
          <div style="float:left;width:200px;">
            <p style="color:#4F5B69;font-size:32px;padding-top:10px;width:100px">登录</p>
          </div>
          <div style="float:left;width:200px;">
            <img
              style="width:110px;height:110px;margin-left:80px;cursor:pointer"
              src="../../images/QRcode.png"
            />
          </div>
        </div>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="username">
              <span
                style="display:block;background: white;position:absolute;left:10px;top:-15px;width:45px;height:30px;z-index:1;text-align: center;"
              >用户名</span>
              <Input v-model="form.username" />
            </FormItem>
            <FormItem prop="password">
              <span
                style="display:block;background: white;position:absolute;left:10px;top:-15px;width:35px;height:30px;z-index:1;text-align: center;"
              >密码</span>
              <Input v-model="form.password" type="password" />
            </FormItem>
            <FormItem prop="validate">
              <Row>
                <Col :span="18">
                  <span
                    style="display:block;background: white;position:absolute;left:10px;top:-15px;width:45px;height:30px;z-index:1;text-align: center;"
                  >验证码</span>
                  <Input v-model="form.validate" style="width:250px" />
                </Col>
                <Col :span="6">
                  <div style="margin-left:8px;margin-top:8px">
                    <img
                      :src="validateImage"
                      style="width:60px;height:30px;"
                      @click="setValidateImage"
                    />
                  </div>
                </Col>
              </Row>
            </FormItem>
            <div style="margin-top:-20px;margin-bottom:20px">
              <Row>
                <Col :span="12">
                  <Checkbox v-model="checked" style="margin-top:8px">记住密码</Checkbox>
                </Col>
                <!-- <ivu-col :span="12">
                  <p style="margin-left:70px;cursor:pointer;font-size:8px">Forgot password?</p>
                </ivu-col>-->
              </Row>
            </div>
            <FormItem>
              <Button
                :loading="logining"
                type="primary"
                style="background-color:#0084ff;outline:none;border: none;padding: 7px 0;font-size: 18px;width:358px;height:50px;"
                @click="handleSubmit"
              >登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
      <p class="jszc">技术支持：浙江索思科技有限公司</p>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import { isEmpty } from "../../../libs/common";
import { isEmpty } from "../../libs/common";

import { initSystem } from "../../api/system";

export default {
  name: "Login",
  data() {
    return {
      checked: false,
      validateImage: this.$basePath + "/validate/image",
      logining: false,
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
      }
    };
  },
  mounted() {
    this.setValidateImage();
    this.getCookie();
  },
  methods: {
    setValidateImage() {
      this.validateImage =
        this.$basePath + "/validate/image?t=" + new Date().getTime();
      console.log(this.$basePath, "this.$basePath");
    },
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          var _self = this;
          _self.logining = true;
          if (_self.checked == true) {
            //传入账号名，密码，和保存天数3个参数
            _self.setCookie(_self.form.username, _self.form.password, 1);
          } else {
            _self.clearCookie();
          }
          let params = new URLSearchParams();
          var password = _self.$util.md5(
            _self.form.username +
              _self.$util.md5(_self.form.password) +
              _self.form.validate
          );
          params.append("username", _self.form.username);
          params.append("password", password);
          // params.append("password", _self.form.password);
          params.append("validate", _self.form.validate);
          params.append("userType", "sys");
          _self.$http
            .post("/authentication/formImage", params)
            .then(res => {
              if (res.data.success) {
                if (res.data.data.userType != "sys") {
                  _self.setValidateImage();
                  _self.$notify({
                    title: "登录失败",
                    message:
                      "监测到您用非后台用户登录，非后台用户无法登录管理系统，请重新输入！"
                  });
                  _self.$refs["loginForm"].resetFields();
                  return;
                }
                var userInfo = res.data.data;
                var avatar = _self.$util.avatar;
                if (!isEmpty(userInfo.photo)) {
                  avatar =
                    _self.$basePath +
                    "/$admin/attachs/stream/" +
                    userInfo.photo;
                }
                _self.$store.commit("setAvator", avatar);
                Cookies.set("user", _self.form.username);
                _self.$message.success(res.data.msg);
                this.$store.commit("setUserInfo", res.data);
                initSystem(() => {
                  // _self.$router.push({path:_self.$store.state.user.appInfo.home})
                  _self.$router.push({ path: "/" });
                });
              } else {
                _self.logining = false;
                _self.form.validate = "";
                _self.$message.error(res.data.msg);
                _self.setValidateImage();
              }
            })
            .catch(err => {
              _self.logining = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie: function() {
      console.log(document.cookie);
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下
        console.log(arr, "1");
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.form.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.form.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  }
};
</script>

