<template>
  <div class="login">
    <div class="loginBox">
      <span>请输入账号：</span>
      <input type="text" v-model="phone" autocomplete="off" class="layui-input" placeholder="请输入账号" />
      <span style="margin-top:10px;display: inline-block">请输入密码：</span>
      <input
        v-model="pwd"
        type="password"
        name="password"
        placeholder="请输入密码"
        autocomplete="off"
        class="layui-input"
      />
      <button type="button" class="layui-btn" style="margin-top:10px" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      phone: "admin",
      pwd: "123456"
      // pwd:"123456"
    };
  },
  mounted() {},
  methods: {
    //登录
    login() {
      var _self = this;
      let key = this.$http.md5(this.phone + this.$http.md5(this.pwd));
      let data = {
        username: this.phone,
        password: key,
        userType: "sys"
      };
      this.$http
            .post("/authentication/form", qs.stringify(data))
            .then(function(result) {
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
                // let avatar = _self.$util.avatar;
                // if (!isEmpty(userInfo.photo)) {
                //   avatar = _self.$baseAttachUrl + userInfo.photo;
                // }
                //   _self.$store.commit("setAvator", avatar);
                Cookies.set("user", _self.form.username);
                initSystem(() => {
                  // localStorage.removeItem("tagNaveList");
                  console.log(_self.$store.state.user.index,"_self.$store.state.user.index")
                  _self.$router.push({ path: '/home' });
                });
              } else {
                _self.logining = false;
                _self.form.validate = "";
                _self.setValidateImage();
                _self.$Message.error(result.msg);
              }
            })
            .catch(function(error) {
              _self.logining = false;
            });
    },
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginBox {
  width: 300px;
}
.loginBox input {
  width: 200px;
}
</style>