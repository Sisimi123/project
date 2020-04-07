<style lang="less">
@import "../../enforcement/styles/sea.less";
</style>
<template>
  <div :style="'overflow:'+overflow+';height:'+ orginalHeight +'px;width:100%'">
    <template v-if="withCard">
      <Card>
        <slot></slot>
      </Card>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>
<script>
export default {
  name: "myContent",
  props: {
    // default
    value: {
      type: Boolean,
      default: false
    },
    // ------
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    url: {
      type: String
    },
    treeUrl: {
      type: String
    },
    params: {
      type: Object,
      default() {
        return {
          page: 1,
          size: 10,
          wheres: {},
          orders: "updateTime desc"
        };
      }
    },
    overflow: {
      type: String,
      default: "auto"
    },
    withCard: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // default
      // params
    };
  },
  computed: {
    orginalHeight() {
      return this.$store.state.app.orginalSinglePage != 0
        ? this.$store.state.app.orginalSinglePage - 6
        : this.$store.state.app.orginalFlexWrap;
    }
  },
  methods: {
    // defalut
    isEmpty(s) {
      if (s == "" || s == undefined || s == null) {
        return true;
      }
      return false;
    }
    // method
  },
  mounted() {
    this.$nextTick(() => {
      var page = document.getElementsByClassName("content-wrapper");
      var wrap = document.getElementsByClassName("flex-wrap");
      if (page.length > 0) {
        this.$store.commit("setPageHeight", page[0].clientHeight);
      } else if (wrap.length > 0) {
        this.$store.commit("setWrapHeight", wrap[0].clientHeight);
      } else {
        console.log("error");
      }
    });
  },
  watch: {}
};
</script>

<style scoped>
</style>
