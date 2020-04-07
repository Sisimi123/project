<template>
  <div class="form-con" @keydown.enter="handleSubmit">
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
</template>

<script>
import Cookies from "js-cookie";
import { initSystem, logout } from "@/api/system";
export default {
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
    }
  },
  data() {
    return {
      checkedPw: false,
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
      },
      validateImage: this.$basePath + "/validate/image"
    };
  },
  methods: {
    setValidateImage() {
      this.validateImage =
        this.$basePath + "/validate/image?t=" + new Date().getTime();
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
                  _self.$router.push({ path: _self.$store.state.user.index });
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
        }
      });
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
    // 清除cookie
    clearCookie() {
      this.setCookie("", "", -1);
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
    }
  },
  mounted() {
    this.getCookie();
    this.setValidateImage();
  }
};
</script>

<style>
</style>