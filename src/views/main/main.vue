<template>
  <div>
    <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
        <user :message-unread-count="unreadCount" :user-avatar="userAvatar" />
        <Dropdown style="margin-right:10px" @on-click="pathChange">
          <Icon style="cursor: pointer;" type="ios-home" color="#515a6e" :size="24"></Icon>
          <DropdownMenu slot="list">
            <template v-for="(v,i) in data">
              <DropdownItem v-if="v.href" :name="v.href" :key="i">{{v.title}}</DropdownItem>
            </template>
          </DropdownMenu>
        </Dropdown>
        <fullscreen v-model="isFullscreen" style="margin-right: 10px;" />
      </header-bar>
    </Header>
    <Layout>
      <Sider
        hide-trigger
        collapsible
        :width="200"
        :collapsed-width="64"
        v-model="collapsed"
        class="left-sider"
        :style="{overflow: 'hidden'}"
      >
        <side-menu
          accordion
          ref="sideMenu"
          :active-name="$route.name"
          :collapsed="collapsed"
          @on-select="turnToPage"
          :menu-list="menuList"
          :style="{height: clientHeight -64 + 'px'}"
        >
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con" style="display:none">
            <img v-show="!collapsed" :src="maxLogo" key="max-logo" />
            <img v-show="collapsed" :src="minLogo" key="min-logo" />
          </div>
        </side-menu>
      </Sider>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <!-- // 标签栏 -->
          <div class="tag-nav-wrapper">
            <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <div class="single-page">
              <!-- <keep-alive :include="cacheList"> -->
                <router-view />
              <!-- </keep-alive> -->
              <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
            </div>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
  <!-- <enforceLawAide></enforceLawAide> -->
  </div>
</template>
<script>
import SideMenu from "./components/side-menu";
import HeaderBar from "./components/header-bar";
import TagsNav from "./components/tags-nav";
import User from "./components/user";
import ABackTop from "./components/a-back-top";
import Fullscreen from "./components/fullscreen";
import Language from "./components/language";
import ErrorStore from "./components/error-store";
// import enforceLawAide from "../../components/enforceLawAide"  
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getNewTagList, routeEqual } from "@/libs/util";
// import routers from "@/router/routers";
import minLogo from "@/assets/images/logo-min.jpg";
import maxLogo from "@/assets/images/logo.jpg";
import "./main.less";
export default {
  name: "Main",
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
    // enforceLawAide
  },
  data () {
    return {
      data: [],
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false
    };
  },
  computed: {
    tagNavList () { // 标签列表
      return this.$store.state.app.tagNavList;
    },
    tagRouter () {
      return this.$store.state.app.tagRouter;
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath;
    },
    cacheList () {
      const list = [
        'ParentView',
        ...(this.tagNavList.length
          ? this.tagNavList
              .filter(item => !(item.meta && item.meta.notCache))
              .map(item => item.name)
          : [])
      ];
      return list;
    },
    menuList() {
      // return this.$store.state.app.menuList
      console.log(
        this.$store.getters.getModules(),
        "this.$store.getters.getModules();"
      );
      return this.$store.getters.getModules();
    },
    unreadCount() {
      return this.$store.state.user.unreadCount;
    },
    clientHeight() {
      return this.$store.state.app.clientHeight;
    }
  },
  methods: {
    ...mapMutations([
      "setBreadCrumb",
      "setTagNavList",
      "addTag",
      "setHomeRoute",
      "closeTag"
    ]),
    ...mapActions(["handleLogin"]),
    // 跳转路由
    turnToPage (route) {
      // this.$router.push({name:route.name});
      // console.log(route,"turnToPage")
      if (typeof route === 'string') {
        this.$router.push({ name: route })
      } else {
        this.$router.push({ name: route.name })
      }
      // let { name, params, query } = {}
      // if (typeof route === 'string') name = route
      // else {
      //   name = route.name
      //   params = route.params
      //   query = route.query
      // }
      // if (name.indexOf('isTurnByHref_') > -1) {
      //   window.open(name.split('_')[1])
      //   return
      // }
      // this.$router.push({
      //   name,
      //   params,
      //   query
      // })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      // console.log(res);
      // console.log(type);
      // console.log(route);
      if (type !== "others") {
        if (type === "all") {
          this.turnToPage(this.$config.homeName);
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route);
          }
        }
      }
      this.setTagNavList(res);
    },
    handleClick(item) {
      // console.log(item);
      this.turnToPage(item);
    },
    contentHeight() {
      this.$nextTick(() => {
        // 前台页面内容部分高度
        var flexWrap = document.getElementsByClassName("flex-wrap");
        if (flexWrap.length > 0) {
          return flexWrap[0].offsetHeight - 83;
        } // 减去头部和尾部高度
        // 后台页面内容部分高度
        var singlePageCon = document.getElementsByClassName("content-wrapper");
        console.log(singlePageCon.length, "singlePageCon");
        if (singlePageCon.length > 0) {
          return singlePageCon[0].offsetHeight;
        } else {
          return 0;
        }
      });
    },
    // 点击下拉选项跳转对应页面
    pathChange (value) {
      console.log(value, "value");
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
    }
  },
  watch: {
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: "push"
      });
      this.setBreadCrumb(newRoute);
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.path);
    }
  },
  mounted() {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList();
    // this.setHomeRoute(routers);
    const { name, params, query, meta } = this.$route;
    this.addTag({
      route: { name, params, query, meta }
    });
    this.setBreadCrumb(this.$route);
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      });
    }

    // console.log(this.$router, "main");
    this.$nextTick(() => {
      this.$store.commit(
        "setWidthAndHeight",
        document.body.clientHeight,
        document.body.clientWidth,
        this.contentHeight()
      );
    });
    this.$http.get(`/$admin/principal/ownApps?parentId=web`).then(res => {
      if (res.success) {
        this.data = res.data;
      }
    });
  }
};
</script>
