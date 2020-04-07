<template>
  <div>
    <img style="width:215px;height:215px;margin-top:15px" :src="qrCode.src" />
    <div style="margin-bottom:10px;position:relative;margin-top:10px;" @click="getQRCodeUrl">
      <span style="font-size:14px;color:#BCBFC0">
        请使用海渔通扫描二维码登录
        <img style="cursor:pointer;" src="../../../styles/refresh2.png" />
        <span style="font-size:14px;color:#6CC3FF;cursor:pointer">刷新</span>
      </span>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { initSystem } from "@/api/system";

export default {
  data() {
    return {
      qrCode: {
        uuid: undefined,
        src: ""
      }
    };
  },
  methods: {
    getQRCodeUrl() {
      this.qrCode.uuid = this.getUUID();
      this.qrCode.src =this.$basePath +"/authentication/showQRCode?uuid=" +this.qrCode.uuid +"&tt=" +new Date().getTime();
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
    QRTime() {
      var _self = this;
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
      this.$http.get("/authentication/queryQRCode", {
          params: { uuid: this.qrCode.uuid }
        })
        .then(function(result) {
          if (result.success) {
            if (!result.data || !result.data.userType) {
              return;
            }
            if (result.data.userType !== "sys") {
            //   _self.setValidateImage();
              _self.$Notice.open({
                title: "登录失败",
                desc:
                  "监测到您用非后台用户登录，非后台用户无法登录管理系统，请重新输入！"
              });
            //   _self.$refs["loginForm"].resetFields();
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
            // Cookies.set("user", _self.form.username);
            initSystem(() => {
              // _self.$router.push({path:_self.$store.state.user.appInfo.home})
              // localStorage.removeItem("tagNaveList");
              _self.$router.push({ path: _self.$store.state.user.index });
            });
          }
        });
    }
  }
};
</script>

<style>
</style>