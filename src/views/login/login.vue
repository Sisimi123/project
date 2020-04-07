<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import {initSystem} from '@/api/system'
export default {
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      var _self=this;
      let params = new URLSearchParams();
      params.append('username', userName);
      var pwd=this.$http.md5(userName+this.$http.md5(password));
      params.append('password', pwd);
      params.append('userType', 'sys');
      this.$http.post("/authentication/form",params)
      .then(res=>{
        if(res.success){
          this.$store.commit("setUserInfo",res.data);
          initSystem(()=>{
            // _self.$router.push({path:_self.$store.state.user.appInfo.home})
            // localStorage.removeItem('tagNaveList')
            _self.$router.push({path:'/'})
          })
        }
      })
    }
  },
  mounted(){
    console.log(this.$router,"login");
  }
}
</script>

<style>

</style>
