<style lang="less">

</style>

<template>
  <div>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">

        <div slot="header" v-if="header">
            <slot name="header"></slot>
        </div>
        <div slot="close" v-if="close">
            <slot name="close"></slot>
        </div>
        <div slot="footer" v-if="footer">
            <slot name="footer"></slot>
        </div>
        <!-- 主体 -->
        <div>
            <iframe :src="ws_camera" width="100%" height="540" style="border:none;" ></iframe>
        </div>

    </Modal>

  </div>
</template>

<script>

export default {
  name: "camera_ws",
  props: {
    // default
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "上传图片"
    },
    width: {
      type: [Number, String],
      default: 1080
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "返回"
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    transitionNames: {
      type: Array,
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    // ------
    data: {
       type: Object
    }

  },
  data() {
    return {
      // default
      visible: false,
      // ------

    };
  },
  computed: {
    // default
    footer() {
      return this.$slots.footer == undefined ? false : true;
    },
    header() {
      return this.$slots.header == undefined ? false : true;
    },
    close() {
      return this.$slots.close == undefined ? false : true;
    },
    // -----
    ws_camera() {
      return this.$basePath+"/gpy/ws/ws_index.jsp?dataId=" + this.data.dataId + "&moduleId=" + this.data.moduleId 
    }

  },
  created(){
    // this.initWebSocket()
  },
  mounted() {
    
  },
  methods: {
    // default
    ok() {
      this.savePhoto();
      if (!this.loading) this.$emit("input", this.visible);
      //this.$emit("on-ok");
    },
    cancel() {
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    // ------
    
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        // window.open(ws_camera);
        // this.cancel();
        this.visible = val;
      }
    }
  }
};
</script>
<style scoped>

</style>


