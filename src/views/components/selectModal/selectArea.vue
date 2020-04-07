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

        <div style="height:300px; overflow: auto">
            <Tree :data="areaTree" @on-select-change="selectedArea"></Tree>
        </div>

    </Modal>
</template>

<script>
export default {
  name: "selectArea",
  props: {
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
      default: "区域选择"
    },
    width: {
      type: [Number, String],
      default: 320
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
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
    // for instance
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
    // 参数
    params: {
      type: Object,
      default() {
        return {
          includes: "30,44,45",
          type:1,
        };
      }
    },
  },
  computed: {

  },
  data() {
    return {
        visible: false,
        // ----
        areaTree: [],
    };
  },
  methods: {
    ok() {
      this.visible = false;
      if (!this.loading) this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.visible = val;
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    // ----
    init() {
      this.$http
        .get("/$admin/depts/custree", {
          params: this.params
        })
        .then(res => {
          if (res.success) {
            this.areaTree = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedArea(row) {
      console.log(row);
      this.$emit("on-selected",row);
      this.ok();
    },
  },
  beforeDestroy() {
      this.visible = false;
      this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
        this.visible = val;
        if (val){
            this.init();
        } 
    }
  }
};
</script>

<style scoped>
.bottom-wrap {
    padding-top: 10px;
    overflow: hidden;
}
.bottom-wrap .ivu-page {
    float: right;
}
.ivu-form-item{
    margin-bottom: 10px !important;
}
</style>