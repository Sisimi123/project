<style lang="less" scoped>
@import "./main.less";
.systemTitle {
  font-weight: 700;
  color: #fff;
  font-size: 16px;
  float: left;
  line-height: 60px;
  margin-left: 20px;
}
.menuList {
  //   float: left;
  background: #2d8cf0 !important;
  //   margin-left: 20px;
  //   max-width: 800px;
  // overflow-x: auto;
  position: absolute;
  // left: 220px;
  right: 210px;
}
.content-wrapper {
  position: absolute;
  top: 106px;
  right: 6px;
  bottom: 0;
  left: 6px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f0f0f0;
  z-index: 1;
  transition: left 0.3s;
}
</style>
<template>
  <div class="main topMain" :class="{'main-hide-text': shrink}" style="background:white">
    <div class="main-header" style="z-index:22;background: #2d8cf0; position: relative;">
      <!-- <div class="navicon-con"> 
                <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                    <Icon type="md-menu" size="32"></Icon>
                </Button>
      </div>-->
      <div class="systemTitle" style="display: inline-block;">{{title}}</div>
      <!-- <div class="header-middle-con">
                <div class="main-breadcrumb">
                    <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                </div>
      </div>-->
      <Menu
        mode="horizontal"
        ref="menu"
        class="menuList"
        theme="primary"
        :active-name="activeName"
        :style="`left:${titleWidth + 40}px`"
      >
        <MenuItem v-for="(v,i) in menuList" :key="i" :name="v.code">
        
          <span v-if="!v.children || (v.children && v.children.length < 2)" @click="level(v)">
            <img
              style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
              :src="showImage(v.icon)"
              alt
            />
            {{v.name}}</span>
          <template v-else>
            <Dropdown @on-click="secondChange" placement="bottom">
              <img
                style="width:15px;height:15px;border:0px;margin:3px;display:inline-block;vertical-align: -5px;"
                :src="showImage(v.icon)"
                alt
              />
                  {{v.name}}
              <DropdownMenu slot="list">
                  <DropdownItem v-for="(item, index) in v.children" :key="index" :name="i+','+index">{{item.name}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </MenuItem>
      </Menu>
      <div class="header-avator-con" style="width:210px;">
        <!-- <Tooltip content="开启引导" placement="bottom">
          <i-switch size="small" v-model="switch1" @on-change="change" />
        </Tooltip>-->
        <full-screen v-model="isFullScreen" @on-change="fullscreenChange" style="color:#fff"></full-screen>
        <!-- <lock-screen></lock-screen> -->
        <a :href="urlZd" target="_blank" v-show="showZhandian">
          <div class="zhanDian-btn-con">
            <Tooltip content="站点跳转" placement="bottom">
              <Icon type="android-globe" color="#495060" :size="20"></Icon>
            </Tooltip>
          </div>
        </a>
        <Dropdown style="margin-right:5px;" @on-click="pathChange" trigger="click">
          <Icon style="color:#fff;margin-left:10px" type="ios-home" color="#495060" :size="20"></Icon>
          <DropdownMenu slot="list">
            <template v-for="(v,i) in data">
              <DropdownItem v-if="v.href" :name="v.href" :key="i">{{v.title}}</DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <!-- <router-link :to="zhiFaTo">
          <div class="lock-screen-btn-con">
            <Tooltip content="执法平台" placement="bottom">
              <Icon style="color:#fff" type="ios-home" color="#495060" :size="20"></Icon>
            </Tooltip>
          </div>
        </router-link>-->
        <!-- <router-link to="/entryPage" >
                    <div class="lock-screen-btn-con">
                        <Tooltip content="统一门户页" placement="bottom">
                            <Icon type="monitor" color="#495060" :size="20"></Icon>
                        </Tooltip>
                    </div>
        </router-link>-->
        <!--
                <message-tip v-model="mesCount"></message-tip>
        -->
        <div class="user-dropdown-menu-con">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)" style="color:#fff">
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
    <!-- <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px',paddingTop:'60px'}">
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
    </div>-->
    <!-- <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px',height:'40px'}"> -->
    <div class="main-header-con" :style="{paddingLeft: '0px',height:'40px'}">
      <div class="tags-con">
        <tags-page-opened ref="tagsPageOpene" :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div class="content-wrapper">
      <div class="single-page">
        <!-- <keep-alive :include="cachePage"> -->
        <router-view :info="shipInfo"></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
    <enforceLawAide @setShipInfo="getShipInfo"></enforceLawAide>
  </div>
</template>

<script>
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import enforceLawAide from "../../components/enforceLawAide";
import shrinkableMenu from "../components/shrinkable-menu/shrinkable-menu.vue";
import tagsPageOpened from "../components/tags-page-opened.vue";
import breadcrumbNav from "../components/breadcrumb-nav.vue";
import fullScreen from "../components/fullscreen.vue";
import lockScreen from "../components/lockscreen/lockscreen.vue";
import messageTip from "../components/message-tip.vue";
import scrollBar from "../components/ScrollBar/index.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";
import { isEmpty, isNull } from "@/libs/common";

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    lockScreen,
    messageTip,
    scrollBar,
    enforceLawAide
  },
  data() {
    return {
      steps: [],
      data: [],
      driver: null,
      pageId: "",
      switch1: false,
      zhiFaTo: "",
      urlZd: "#",
      showZhandian: false,
      shrink: false,
      // userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
      pageTagsList: [],
      titleWidth: 0,
      activeName: "",
      shipInfo: {}
    };
  },
  computed: {
    username() {
      var userInfo = this.$store.state.user.userInfo;
      return isNull(userInfo) ? "" : userInfo.name;
    },
    menuList() {
      let list = JSON.parse(JSON.stringify(this.$store.getters.getModules()));
      // showInMenu - 左侧菜单
      this.operateMenu({list, str:'showInMenu'});
      // status - 状态
      this.operateMenu({list, str:'status'});
      // showAlways - 父菜单
      this.parentMenu(list);
      // return this.$store.getters.getModules();
      return list;
    },
    // pageTagsList() {
    //   return this.$store.state.app.pageOpenedList; // 打开的页面的页面对象
    // },
    currentPath() {
      return this.$store.state.app.currentPath; // 当前面包屑数组
    },
    avatorPath() {
      if (isEmpty(this.$store.state.user.userInfo.photo)) {
        return this.$util.baseAttachUrl + this.$store.state.user.userInfo.photo;
      }
      return localStorage.avatorImgPath;
    },
    cachePage() {
      console.log(this.$store.state.app.cachePage, "测试");
      return this.$store.state.app.cachePage;
    },
    lang() {
      return this.$store.state.app.lang;
    },
    menuTheme() {
      return this.$store.state.app.menuTheme;
    },
    mesCount() {
      return this.$store.state.app.messageCount;
    },
    title() {
      return window.document.title;
    }
  },
  methods: {
    /**
     * @desc 对菜单进行去除操作
     * @param {Array} list 操作对象
     * @param {String} str 判断的字段名， 默认1显示，0隐藏
     */
    operateMenu({list, str}) {
      if(!list || !list.length) return;
      let indexList = [];
      list.forEach((item, index) => {
        // 不显示
        if(!(item[str] * 1)) {
          indexList.push(index);
        }
        else {
          this.operateMenu({list: item.children, str});
        }
      });
      if(indexList &&indexList.length) {
        indexList.reverse();
        indexList.forEach(i => {
          list.splice(i, 1);
        })
      }
    },
    /**
     * @desc 对菜单进行操作 父菜单 存在一个子菜单，仅父菜单选择“隐藏” 0隐藏 1显示
     * @param {Array} list 操作对象
     */
    parentMenu(list) {
      if(!list || !list.length) return;
      let indexList = [];
      list.forEach((item, index) => {
        // 只存在一个子菜单的情况下
        if(item.children && item.children.length === 1) {
          // 隐藏
          if(!(item.children[0].showAlways * 1)) {
            indexList.push(index);
          }
        }
        this.parentMenu(item.children);
      });
      let icon = '';
      if(indexList && indexList.length) {
        indexList.forEach(i => {
          icon = list[i].icon;
          list[i] = list[i].children[0];
          (!list[i].icon) && (list[i].icon = icon);
        })
      }
    },
    getShipInfo(data) {
      this.shipInfo = data;
      console.log(this.shipInfo, "shipInfo");
    },
    showImage(item) {
      if (item) {
        return this.$baseIconUrl + item;
      }
    },
    getGuide() {
      var _self = this;
      var steps = [];
      _self.$http
        .get(
          "/$admin/guides/getGuideByModuleId?moduleId=" + _self.$route.meta.id
        )
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
        })
        .catch(error => {
          console.log(error);
        });
    },
    change(status) {
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
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name);
      this.$store.commit("updateMenulist");
      if (pathArr.length >= 2) {
        this.$store.commit("addOpenSubmenu", pathArr[1].path);
      }
      // this.userName = Cookies.get('user');
      let messageCount = 3;
      this.messageCount = messageCount.toString();
      this.checkTag(this.$route.name);
      this.$store.commit("setMessageCount", 3);
    },
    toggleClick() {
      this.shrink = !this.shrink;
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        util.openNewPage(this, "ownspace_index");
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        // 退出登录
        var _self = this;
        _self.$http.get("/authentication/logout").then(function(result) {
          if (result.success) {
            _self.$store.commit("logout", _self);
            //_self.$store.commit("clearOpenedSubmenu");
            sessionStorage.clear();
            _self.$router.push({
              name: "login"
            });
          }
        });
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true;
        }
      });
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(
          this,
          name,
          this.$route.params || {},
          this.$route.query || {}
        );
      }
    },
    handleSubmenuChange(val) {
      var _self = this;
      // console.log(val)
      if (_self.menuList) {
        _self.menuList.forEach(function(child) {
          child.children.forEach(function(item) {
            if (item.path == val) {
              _self.openedSubmenuArr = [child.meta.id];
            }
          });
        });
      }
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true;
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    },
    checkZhanDian() {
      this.$http
        .get(
          "/jeecms/admin/validate?username=" +
            this.$store.state.user.userInfo.username
        )
        .then(res => {
          if (res.success) {
            this.showZhandian = true;
            this.urlZd =
              res.data +
              "tokenlogin.jspx?token=" +
              this.$store.state.user.userInfo.accessToken;
          } else {
            this.showZhandian = false;
          }
        });
    },
    pathChange(value) {
      let href = window.location.href;
      href = href.split("/");
      // console.log(href,'href')
      for (let i in href) {
        if (href[i].indexOf("#") > -1) {
          if (i == 3) {
            href = `${href[0]}//${href[2]}${value}`;
          } else {
            href = `${href[0]}//${href[2]}/${href[3]}${value}`;
          }
        }
      }
      // let patt = /(http|ftp|https):\/\/[\w\-_]+:[0-9]*\//
      window.open(href);
      // this.$router.go(`${href}${value}#/`);
    },
    // zhiFaJump() {
    //   // if(this.$hasRoles("cooperative"))
    //   if (
    //     !this.$hasRoles("ADMIN") &&
    //     !this.$hasRoles("Manager") &&
    //     this.$hasRoles("cooperative")
    //   )
    //     this.zhiFaTo = "/enforcement/wzindex";
    //   //首页路由地址
    //   else this.zhiFaTo = "/enforcement/index"; //首页路由地址
    // }
    /**
     * @desc 上部侧边栏 第一级点击事件
     * @param {object} first 第一级
     */
    level(first) {
      this.activeName = first.code;
      this.pageTagsList = [];
      // 不存在children
      if(!first.children) {
        this.$refs.tagsPageOpene.currentPageName = first.code;
        this.$router.push({
          path: first.component
        })
      }
      // 存在children且只有一个
      else if(first.children.length < 2) {
        if(first.children[0].children && first.children[0].children.length > 1) {
          this.pageTagsList = first.children[0].children;
        }
        this.$refs.tagsPageOpene.currentPageName = first.children[0].code;
        this.$router.push({
          path: first.children[0].component
        })
      }
    },
    /**
     * @desc 上部侧边栏 第二级点击事件
     * @param {string} value 第一级下标，第二级下标
     */
    secondChange(value) {
      let index = value.split(',');
      let item = this.menuList[index[0]].children[index[1]];
      this.activeName = item.code;
      this.pageTagsList = [];
      // 如果有children，重定向到children的第一个 TODO 下面的tab
      if(item.children && item.children.length) {
        if(item.children && item.children.length > 1) {
          this.pageTagsList = item.children;
        }
        this.$refs.tagsPageOpene.currentPageName = item.children[0].code;
        this.$router.push({
          path: item.children[0].component
        });
      }
      else {
        this.$refs.tagsPageOpene.currentPageName = item.code;
        this.$router.push({
          path: item.component
        })
      }
    },
    /**
     * @desc 遍历memuList中是否有当前路由
     */
    isInRoute({list, code}) {
      if(!list || !list.length) return;
      let flag = false;
      let indexs = [];
      for(let i = 0, len = list.length; i < len; i++) {
        if(list[i].code === code) {
          flag = true;
          indexs.push(i);
          break;
        }
        else if(list[i].children && list[i].children.length) {
          let obj;
          obj = this.isInRoute({list: list[i].children, code});
          if(obj.flag) {
            let list = [];
            flag = true;
            list.push(i);
            list.push(obj.indexs);
            indexs = list;
            break;
          }
        }
      }
      return {flag, indexs};
    }
  },
  watch: {
    // $route(to) {
    //   this.pageId = to.meta.id;
    //   this.switch1 = false;
    //   // this.$store.commit("setCurrentPageName", to.name);
    //   let pathArr = util.setCurrentPath(this, to.name);
    //   if (pathArr.length > 2) {
    //     this.$store.commit("addOpenSubmenu", pathArr[1].path);
    //   }
    //   this.checkTag(to.name);
    //   localStorage.currentPageName = to.name;
    // },
    lang() {
      // util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
    },
    '$route'(val) {
      // let {flag, indexs} = this.isInRoute({list: this.menuList, code:this.$route.name});
      // console.log({flag, indexs}, 888)
      // if(!flag) {
      //   this.pageTagsList = [];
      // }
      if(this.$route.query.info) {
        this.getShipInfo(JSON.parse(this.$route.query.info));
      }
    }
  },
  mounted() {
    var title = document.getElementsByClassName("systemTitle");
    this.titleWidth = title[0].clientWidth;
    this.activeName = this.menuList[0].code;
    this.$nextTick(() => {
      this.$refs.menu.updateActiveName();
    });
    if(this.menuList[0].children && this.menuList[0].children.length > 1) {
      this.pageTagsList = this.menuList[0].children;
    }
    
    // this.pageTagsList = this.menuList[0].children;
    this.$http.get(`/$admin/principal/ownApps?parentId=web`).then(res => {
      if (res.success) {
        this.data = res.data;
      }
    });



    // this.init();
    // this.checkZhanDian();
    // this.zhiFaJump();
    // $(".ivu-shrinkable-menu").css('background','linear-gradient(#0268FF, #4d58E6)');
    // $(".ivu-shrinkable-menu").css("background", "#0081FE");
    // $(".scroll-container").css(
    //   "background",
    //   "linear-gradient(#007AFF, #00AFFE)"
    // );
    // $(".ivu-menu-dark").css("background", "#0081FE");
    // $(".ivu-menu").css("background", "#1D4DF8");
    // $(".ivu-menu-submenu-title").css("background", "#0081FE");
    // $(".ivu-menu-vertical").css("background", "#0081FE");
    // $(".ivu-menu-submenu-title").hover(
    //   function() {
    //     $(this).css("background-color", "#006DFE");
    //   },
    //   function() {
    //     $(this).css("background-color", "#0081FE");
    //   }
    // );
    // this.driver = new Driver({
    //   nextBtnText: " 下一步 ",
    //   prevBtnText: " 上一步",
    //   closeBtnText: "关闭",
    //   doneBtnText: "完成",
    //   animate: false,
    //   allowClose: false,
    //   onReset: Element => {
    //     this.switch1 = false;
    //   }
    // });
  },
  created() {
    // 显示打开的页面的列表
    // this.$store.commit("setOpenedList");
  }
};
</script>
