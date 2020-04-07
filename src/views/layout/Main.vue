<style lang="less" scoped>
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
         <div class="main-header" style="z-index:22">
            <div class="navicon-con"> 
                <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                    <Icon type="md-menu" size="32"></Icon>
                </Button>
            </div>
            <span style="font-weight: 700;color: #495060;font-size: 16px;">{{title}}</span>
            <!-- <div class="header-middle-con">
                <div class="main-breadcrumb">
                    <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                </div>
            </div> -->
            <div class="header-avator-con" style="width:240px;">
                <Tooltip content="开启引导" placement="bottom">
                    <i-switch size="small" v-model="switch1" @on-change="change" />
                </Tooltip>
                <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                <!-- <lock-screen></lock-screen> -->
                <a :href="urlZd" target="_blank" v-show="showZhandian">
                    <div class="zhanDian-btn-con">
                        <Tooltip content="站点跳转" placement="bottom">
                            <Icon type="android-globe" color="#495060" :size="20"></Icon>
                        </Tooltip>
                    </div>
                </a>
                <router-link :to="zhiFaTo" >
                    <div class="lock-screen-btn-con">
                        <Tooltip content="执法平台" placement="bottom">
                            <Icon type="ios-home" color="#495060" :size="20"></Icon>
                        </Tooltip>
                    </div>
                </router-link>
                 <!-- <router-link to="/entryPage" >
                    <div class="lock-screen-btn-con">
                        <Tooltip content="统一门户页" placement="bottom">
                            <Icon type="monitor" color="#495060" :size="20"></Icon>
                        </Tooltip>
                    </div>
                </router-link> -->

               <!-- <div>
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ username }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Row>
                </div> -->

                <!--
                <message-tip v-model="mesCount"></message-tip>
                -->
                <div class="user-dropdown-menu-con">
                    <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                        <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                            <a href="javascript:void(0)">
                                <span class="main-user-name">{{ username }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                    </Row>
                </div>
            </div>
        </div>
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px',paddingTop:'60px'}">
            <scrollBar>
            <shrinkable-menu
                :shrink="shrink"
                @on-change="handleSubmenuChange"
                :theme="menuTheme" 
                :before-push="beforePush"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
                <!-- <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/logoSea.png" key="max-logo" />
                    <img v-show="shrink" src="../images/zj_management_systemlogo.png" key="min-logo" />
                </div> -->
            </shrinkable-menu>
            </scrollBar>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px',height:'40px'}">          
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <!-- <keep-alive :include="cachePage"> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Driver from 'driver.js'; // import driver.js
    import 'driver.js/dist/driver.min.css'; // import driver.js css
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
                steps: [],
                driver: null,
                pageId: '',
                switch1: false,
                zhiFaTo:"",
                urlZd:"#",
                showZhandian:false,
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
                console.log(this.$store.state.app.cachePage,"测试");
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
            },
            title(){
                return window.document.title;
            }
        },
        methods: {
            getGuide () {
                var _self = this;
                var steps = [];
                _self.$http.get('/$admin/guides/getGuideByModuleId?moduleId=' + _self.$route.meta.id)
                    .then(res => {
                        if (res.success) {
                            res.data.forEach((v, i) => {
                                steps.push({
                                    element: v.element,
                                    popover: {
                                        title: v.title,
                                        description: v.description,
                                        position: v.position
                                    }
                                });
                            });
                            this.driver.defineSteps(steps);
                            this.driver.start();
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            },
            change (status) {
                if (status) {
                    this.getGuide();
                    // this.driver.defineSteps([
                    //     {
                    //         element: '.ivu-icon-md-menu',
                    //         popover: {
                    //             title: 'Hamburger',
                    //             description: 'Open && Close sidebar',
                    //             position: 'bottom'
                    //         }
                    //     }
                    // ]);
                    // this.driver.start();
                }
            },
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
                // console.log(val)
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
            },
            checkZhanDian(){
                this.$http.get('/jeecms/admin/validate?username='+this.$store.state.user.userInfo.username)
                .then(res=>{
                    if(res.success){
                        this.showZhandian=true;
                        this.urlZd=res.data+"tokenlogin.jspx?token="+this.$store.state.user.userInfo.accessToken;
                    }else{
                        this.showZhandian=false;
                    }
                });
            },
            zhiFaJump(){
                // if(this.$hasRoles("cooperative"))
                if(!this.$hasRoles("ADMIN")&&!this.$hasRoles("Manager")&&this.$hasRoles("cooperative"))
                    this.zhiFaTo="/enforcement/wzindex";//首页路由地址
                else
                    this.zhiFaTo="/enforcement/index";//首页路由地址
            },
        },
        watch: {
            '$route' (to) {
                this.pageId = to.meta.id;
                this.switch1 = false;
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
            this.checkZhanDian();
            this.zhiFaJump();
            // $(".ivu-shrinkable-menu").css('background','linear-gradient(#0268FF, #4d58E6)');
            $(".ivu-shrinkable-menu").css('background','#0081FE');
            $('.scroll-container').css('background','linear-gradient(#007AFF, #00AFFE)');
            $('.ivu-menu-dark').css('background','#0081FE');
            $('.ivu-menu').css('background','#1D4DF8');
            $('.ivu-menu-submenu-title').css('background','#0081FE');
            $('.ivu-menu-vertical').css('background','#0081FE');
            $(".ivu-menu-submenu-title").hover(function(){
                $(this).css("background-color","#006DFE");
            },function(){
                $(this).css("background-color","#0081FE");
            });
            this.driver = new Driver({
                nextBtnText: ' 下一步 ',
                prevBtnText: ' 上一步',
                closeBtnText: '关闭',
                doneBtnText: '完成',
                animate: false,
                allowClose: false,
                onReset: (Element) => {
                    this.switch1 = false;
                }
            });
        },
        created () {
            // 显示打开的页面的列表
            this.$store.commit('setOpenedList');
        }
    };
</script>
