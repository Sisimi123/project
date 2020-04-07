<template>
  <div class="header-bar">
    <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    <span
      style="font-weight: 700; color: rgb(73, 80, 96); font-size: 16px;vertical-align: 18px;margin-left:20px"
    >{{title}}</span>
    <custom-bread-crumb show-icon style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb>
    <div class="custom-content-con">
      <!-- <Select
        v-model="toPath"
        @on-change="pathChange"
        style="width:200px;float:left;margin-top:18px;margin-right:10px"
      >
        <Option v-for="(item,i) in pathList" :value="item.value" :key="i">{{ item.title }}</Option>
      </Select>-->
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from "./sider-trigger";
import customBreadCrumb from "./custom-bread-crumb";
import "./header-bar.less";
export default {
  name: "HeaderBar",
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList;
    },
    title() {
      return this.$store.state.user.appInfo.title;
    },
    pathList() {
      return this.$config.path;
    }
  },
  data() {
    return {
      toPath: "",
    };
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit("on-coll-change", state);
    },
  },
  mounted() {
    // let href = window.location.href;
    // for (let i in this.$config.path) {
    //   if (href.indexOf(this.$config.path[i].value) > -1) {
    //     this.toPath = this.$config.path[i].value;
    //     break;
    //   } else {
    //     this.toPath = "index.html";
    //   }
    // }
  }
};
</script>
