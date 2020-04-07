<style lang="less">
</style>

<template>
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
    </Modal>
</template>

<script>
export default {
  name: "myModal",
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
      type: String
    },
    width: {
      type: [Number, String],
      default: 520
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
    }
    // ------
  },
  data() {
    return {
      // default
      visible: false,
      footer: true,
      header: true,
      close: true
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
    }
    // ------
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    // default
    ok() {
      if (!this.loading) this.$emit("input", this.visible);
      this.$emit("on-ok");
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
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
      }
    }
  }
};
</script>
<style scoped>

</style>


