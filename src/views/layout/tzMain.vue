<style lang="less" scoped>
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px'}">
            <scrollBar>
            <shrinkable-menu 
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
            </shrinkable-menu>
            </scrollBar>
        </div>
       
        <div class="single-page-con" :style="{left: shrink?'60px':'200px',top:'0px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import shrinkableMenu from '../components/shrinkable-menu/shrinkable-menu.vue';
    import tagsPageOpened from '../components/tags-page-opened.vue';
    import breadcrumbNav from '../components/breadcrumb-nav.vue';
    import fullScreen from '../components/fullscreen.vue';
    import lockScreen from '../components/lockscreen/lockscreen.vue';
    import messageTip from '../components/message-tip.vue';
    import scrollBar from '../components/ScrollBar/index.vue';
    import Cookies from 'js-cookie';
    import util from '@/libs/util.js';
    import {isEmpty, isNull} from '@/libs/common';
    
    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            messageTip,
            scrollBar
        },
        data () {
            return {
                shrink: false,
                // userName: '',
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr
            };
        },
        computed: {
            username(){
                var userInfo=this.$store.state.user.userInfo;
                return isNull(userInfo)?"":userInfo.name;
            },
            menuList () {
                return this.$store.state.app.menuList;
            },
            pageTagsList () {
                return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
            },
            currentPath () {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatorPath () {
                if(isEmpty(this.$store.state.user.userInfo.photo)){
                    return this.$util.baseAttachUrl + this.$store.state.user.userInfo.photo
                }
                return localStorage.avatorImgPath;
            },
            cachePage () {
                return this.$store.state.app.cachePage;
            },
            lang () {
                return this.$store.state.app.lang;
            },
            menuTheme () {
                return this.$store.state.app.menuTheme;
            },
            mesCount () {
                return this.$store.state.app.messageCount;
            }
        },
        methods: {
            init () {
                let pathArr = util.setCurrentPath(this, this.$route.name);
                this.$store.commit('updateMenulist');
                if (pathArr.length >= 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].path);
                }
                // this.userName = Cookies.get('user');
                let messageCount = 3;
                this.messageCount = messageCount.toString();
                this.checkTag(this.$route.name);
                this.$store.commit('setMessageCount', 3);
            },
            toggleClick () {
                this.shrink = !this.shrink;
            },
            handleClickUserDropdown (name) {
                if (name === 'ownSpace') {
                    util.openNewPage(this, 'ownspace_index');
                    this.$router.push({
                        name: 'ownspace_index'
                    });
                } else if (name === 'loginout') {
                    console.log(123456)
                    // 退出登录
                    var _self=this;
                    _self.$http.get("/authentication/logout")
                    .then(function(result){
                        if(result.success){
                            _self.$store.commit('logout', _self);
                            //_self.$store.commit('clearOpenedSubmenu');
                            sessionStorage.clear()
                            _self.$router.push({
                                name: 'login'
                            });
                        }
                    })
                }
            },
            checkTag (name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name === name) {
                        return true;
                    }
                });
                if (!openpageHasTag) { //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {});
                }
            },
            handleSubmenuChange (val) {
                var _self=this;
                console.log(val)
                if(_self.menuList){
                    _self.menuList.forEach(function(child){
                        child.children.forEach(function(item){
                            if(item.path==val){
                                _self.openedSubmenuArr=[child.meta.id];
                            }
                        });
                    });
                }
            },
            beforePush (name) {
                // if (name === 'accesstest_index') {
                //     return false;
                // } else {
                //     return true;
                // }
                return true;
            },
            fullscreenChange (isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            '$route' (to) {
                this.$store.commit('setCurrentPageName', to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit('addOpenSubmenu', pathArr[1].path);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang () {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted () {
            this.init();
            $('.scroll-container').css('background','#1168b9');
            $('.ivu-menu-dark').css('background','#1168b9');
            $('.ivu-menu').css('background','#1b59a3');
            $('.ivu-menu-submenu-title').css('background','#1168b9');
            $('.ivu-menu-vertical').css('background','#1168b9');
            $(".ivu-menu-submenu-title").hover(function(){
                $(this).css("background-color","#418ad7");
            },function(){
                $(this).css("background-color","#1168b9");
            });

        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
