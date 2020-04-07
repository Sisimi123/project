<template>
  <div id="login_container" align="center"></div>
</template>

<script>
// import Cookies from "js-cookie";
import { initSystem } from "@/api/system";

export default {
  data() {
    return {};
  },
  methods: {
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
    getDingParams() {
      var _self = this;
      _self.$http
        .get("/auth/getDDPcLoginInfo")
        .then(res => {
          _self.dingdUrl = res.data.uri;
          _self.dingAppid = res.data.loginAppId;
          _self.imageEvent();
        })
        .catch(err => {
          console.log(err);
        });
    },
    imageEvent(){
      var _self = this;
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
    },
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
    loginFun(result, type) {
      var _self = this;
      if (type === "钉钉(多用户)") {
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
          // _self.$store.commit("setAvator", avatar);
          // Cookies.set("user", _self.form.username);
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
            // console.log(_self, "_self");
            // Cookies.set("user", _self.form.username);
            initSystem(() => {
              // localStorage.removeItem("tagNaveList");
              _self.$router.push({ path: _self.$store.state.user.index });
            });
          }
        }
      }
    }
  },
  mounted() {
    this.getDingParams();
  }
};
</script>

<style>
</style>