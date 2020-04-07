<style lang="less">
@import "./login2New.less";
</style>

<template>
  <div class="login">
    <div class="title_login">
      <p>{{title}}</p>
    </div>
    <div class="downLoad_login">
      <!-- <a target="_blank">打印控件</a> -->
      <a target="_blank" :href="$basePath+'/static/pageoffice/sealsetup.exe'">PageOffice控件</a>
      <a target="_blank" href="http://115.238.45.165:20009/hyjgpt/zjs/index.jsp">浙江海渔通</a>
      <!-- <a target="_blank" href="http://115.238.45.165:20009/hyjgpt/zjs/public.jsp">海渔通公众版</a> -->
      <router-link to="/wz_Qrcode">海渔通小程序</router-link>
    </div>
    <div class="login-con">
      <Card :bordered="false">
        <div style="width:400px;height:120px">
          <div style="float:left;width:200px;">
            <p style="color:#4F5B69;font-size:32px;padding-top:40px;width:100px">登录</p>
          </div>
        </div>
        <passwordLogin ref="passwordLogin"></passwordLogin>
      </Card>
      <p class="jszc">技术支持：浙江索思科技有限公司</p>
    </div>
  </div>
</template>

<script>
import passwordLogin from "./components/passwordLogin"
export default {
  components:{
    passwordLogin,
  },
  computed: {
    title() {
      return window.document.title;
    }
  },
  beforeCreate () {
    var keys = document.cookie.match(/[^ =;]+(?==)/g);
    console.log(keys)
    if (keys) {
      for (var i = keys.length; i--;) {
        document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的,例如：m.ratingdog.cn
        document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的，例如 .m.ratingdog.cn
        document.cookie = keys[i] + '=0;path=/;domain=ratingdog.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的，例如 .ratingdog.cn
      }
    }
  }
};
</script>

<style>
</style>
