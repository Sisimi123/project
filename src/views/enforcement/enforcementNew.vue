<style lang="less" scoped>
@import "./styles/enforcement.less";
</style>
<template>
  <div class="zj_management_system">
    <div class="wrapper systembg">
      <div class="flex-wrap">
        <header>
          <span>
            <em class="system-name">
              <b></b>
              <i>智慧海洋</i>
            </em>
            <em class="home-btn-wrap" v-show="!hiddenBack">
              <!-- <a class="return-home" @click="goIndex">
                <b>首页</b>
              </a> -->
              <a class="return-sj" @click="goBack">
                <b>返回上级</b>
              </a>
            </em>
          </span>
          <span class="user">
            <b></b>
            <em>{{username}}</em>
            <!-- <input type="button" value="退出" @click="logout" /> -->
          </span>
        </header>
        <router-view></router-view>
        <footer>
          <em class="copyright">© 浙江省农业农村厅</em>
          <!-- <span class="pagebar">
                    <a>1</a>
          </span>-->
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { isEmpty, isNull } from "../../libs/common";
export default {
  name: "enforcement",
  data() {
    return {
      hiddenBack: false
    };
  },
  computed: {
    // currentPath () {
    //     return this.$store.state.app.currentPath; // 当前面包屑数组
    // },
    username() {
      var userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      return isNull(userInfo) ? "" : userInfo.name;
    }
    // copyright(){
    //     return this.$util.copyright;
    // },
    // title(){
    //     var title=this.$route.meta.title;
    //     if(typeof title==='function')
    //         return title();
    //     return title;
    // }
  },
  methods: {
    logout() {
      var _self = this;
      _self.$http.get("/authentication/logout").then(function(result) {
        if (result.success) {
          Cookies.set("loginOut", "1");
        //   _self.$store.commit("logout", _self);
          //_self.$store.commit('clearOpenedSubmenu');
          _self.$router.push({
            name: "login"
          });
        }
      });
    },
    goBack() {
      var urls = location.href.split("#")[1];
      if (urls == "/enforcement/wzindex" || urls == "/enforcement/index") {
        return;
      } else if (
        urls == "/enforcement/achive/employerInsurance" ||
        urls == "/enforcement/achive/shipInsurance"
      ) {
        this.$router.push("/enforcement/achiveIndex");
      } else if (urls == "/enforcement/achiveIndex") {
        this.$router.push("/enforcement/index");
      } else {
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    var urls = location.href.split("#")[1];
    this.hiddenBack = urls == "/home"
  },
  created() {
    //    if(isNull(this.$store.state.user.userInfo))
    //         this.$router.push("/login");
    //     console.log(this.$route, "this.$route")
  },
  updated() {
    var urls = location.href.split("#")[1];
    this.hiddenBack = urls == "/home"
  }
};
</script>

<style scoped>
</style>
