<style lang="less" scoped>
    @import './styles/enforcement.less';
</style>
<template>
    <div class="zj_management_system" style="background-image: white;">
    <div class="wrapper" :style="{'background-image':'white !important;'}">
        <div class="flex-wrap">
            <router-view></router-view>
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
        }
   },
   methods:{
       logout(){
            var _self=this;
            _self.$http.get("/authentication/logout")
            .then(function(result){
                if(result.success){
                    _self.$store.commit('logout', _self);
                    //_self.$store.commit('clearOpenedSubmenu');
                    _self.$router.push({
                        name: 'login'
                    });
                }
            });
       },
       goIndex(){
           console.log(this.currentPath);
           this.$router.push("/enforcement/index");
       },
       goBack(){
           console.log(this.currentPath);
           this.$router.go(-1);
       }
   },
   mounted(){
       
   },
   created(){
       if(isNull(this.$store.state.user.userInfo))
            this.$router.push("/login");
   }
};
</script>

<style scoped>

</style>
