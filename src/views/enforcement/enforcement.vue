<style lang="less" scoped>
    @import './styles/enforcement.less';
</style>
<template>
    <div class="zj_management_system">
    <div class="wrapper systembg">
        <div class="flex-wrap">
            <header>
                <span>
                    <em class="system-name">
                        <b></b>
                        <i>{{title}}</i>
                    </em>
                    <em class="home-btn-wrap" v-show="!hiddenBack">
                       <a class="return-home" @click="goIndex"><b>首页</b></a> 
                       <a class="return-sj" @click="goBack"><b>返回上级</b></a> 
                    </em>
                </span>
                <span class="user">
                    <b></b><em>{{username}}，</em>
                    <input type="button" value="退出" @click="logout" />
                </span>
            </header>
            <router-view></router-view>
            <footer>
                <em class="copyright">{{copyright}}</em>
                <!-- <span class="pagebar">
                    <a>1</a>
                </span> -->
            </footer>
        </div>
    </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import {isEmpty, isNull} from '../../libs/common';
export default {
   name:"enforcement",
   data(){
       return {
           hiddenBack:false
       }
   },
   computed:{
        currentPath () {
            return this.$store.state.app.currentPath; // 当前面包屑数组
        },
        username(){
            var userInfo=this.$store.state.user.userInfo;
            return isNull(userInfo)?"":userInfo.name;
        },
        copyright(){
            return this.$util.copyright;
        },
        title(){
            var title=this.$route.meta.title;
            if(typeof title==='function')
                return title();
            return title;
        }
   },
   methods:{
       logout(){
            var _self=this;
            _self.$http.get("/authentication/logout")
            .then(function(result){
                if(result.success){
                    Cookies.set("loginOut","1");
                    _self.$store.commit('logout', _self);
                    //_self.$store.commit('clearOpenedSubmenu');
                    _self.$router.push({
                        name: 'login'
                    });
                }
            });
       },
       goIndex(){
        //    console.log(this.currentPath);
        //    this.$router.push("/enforcement/index");
            var homeUrl=this.$util.homeUrl;
            if(typeof homeUrl =="function"){
                homeUrl(this);
            }else if(!isEmpty(homeUrl)){
                this.$router.push(homeUrl);//首页路由地址
            }else{
                this.$router.push("/enforcement/index");//首页路由地址
            }

            // if(this.$hasRoles("cooperative"))
            // if(!this.$hasRoles("ADMIN")&&!this.$hasRoles("Manager")&&this.$hasRoles("cooperative"))
            //     this.$router.push("/enforcement/wzindex");//首页路由地址
            // else
            //     this.$router.push("/enforcement/index");//首页路由地址
       },
       goBack(){
            var urls=location.href.split("#")[1];
            if(urls=="/enforcement/wzindex" || urls=="/enforcement/index"){
                return;
            } else  if (urls=="/enforcement/achive/employerInsurance" || urls=="/enforcement/achive/shipInsurance") {
                this.$router.push("/enforcement/achiveIndex")
            } else if (urls=="/enforcement/achiveIndex") {
                this.$router.push("/enforcement/index")
            } else{
                this.$router.go(-1);
            }
       }
   },
   mounted(){
       var urls=location.href.split("#")[1];
       this.hiddenBack=(urls=="/enforcement/wzIndex" || urls=="/enforcement/index");
   },
   created(){
       if(isNull(this.$store.state.user.userInfo))
            this.$router.push("/login");
        console.log(this.$route, "this.$route")
   },
   updated(){
        var urls=location.href.split("#")[1];
        this.hiddenBack=(urls=="/enforcement/wzIndex" || urls=="/enforcement/index");
   }

};
</script>

<style scoped>

</style>
