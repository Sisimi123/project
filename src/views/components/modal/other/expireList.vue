<style lang="less">

</style>

<template>
<!-- 证书到期提醒  -->
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

        <div slot="header" v-if="showHeader">
            <slot name="header"></slot>
        </div>
        <div slot="close" v-if="showClose">
            <slot name="close"></slot>
        </div>
        <!-- <div slot="footer" v-if="showFooter">
            <slot name="footer"></slot>
        </div> -->
        <div slot="footer">
            <Button  @click="ok">关闭</Button>
        </div>

        <Tabs type="card" v-model="initial">
            <TabPane label="船检证书" name="initial">
              <!-- <Row>
                  <div class="table-wrap" ref="table">
                      <Table ref="table" :height="tableHeight" border :columns="columns1" :data="dataList1" :stripe=true :loading="status.isLoading1" :highlight-row=true></Table>
                  </div>
              </Row>
              <Row>
                <div class="bottom-wrap" ref="bottom">
                    <Page show-total :total="totalNum" show-sizer show-elevator
                  placement=top @on-page-size-change="pageSizeChange" :page-size="params.size" 
                  :current="params.page" @on-change="changePage" ></Page>
                </div>
              </Row> -->
            </TabPane>
            <TabPane label="所有权证书" name="otherA">
                
            </TabPane>
            <TabPane label="国籍证书" name="otherB">
                
            </TabPane>
            <TabPane label="捕捞许可证书" name="otherC">
                
            </TabPane>
        </Tabs>

    </Modal>
</div>

</template>

<script>
import pic from "@/views/components/pic/pic.vue";

export default {
  name: "expireList",
  components: {
      pic,
    //   camera
  },
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
      default: "详情"
    },
    width: {
      type: [Number, String],
      default: 1280
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
    // ------
    id:{
      type: String
    },
    query: {
      type: Object,
      default() {
        return {
          
        };
      }
    }
  },
  data() {
    return {
      // default
      visible: false,
      // ------
      status: {
          needCopy: false,
          showCamera: false,
      },
      initial:"initial",
      tableHeight: 400,

      columns1:[],
      dataList1:[],
      
    };
  },
  computed: {
    // default
    showFooter() {
      return this.$slots.footer == undefined ? false : true;
    },
    showHeader() {
      return this.$slots.header == undefined ? false : true;
    },
    showClose() {
      return this.$slots.close == undefined ? false : true;
    },
    // ------
    // actionData() {
    //     return {
    //         moduleId: "oneshiponefile_cbjy",
    //         dataId: this.info.id,
    //     };
    // },
    // actionUrl(){
    //     return this.$basePath + "/$admin/attachs/";
    // } 
  },
  mounted() {},
  methods: {
    // default
    close() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-cancel");
    },
    cancel() {
      this.close();
    },
    ok() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-ok");
    },
    visibleChange(val) {
      this.visible = val;
      if (!this.visible) this.close();
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    // ----
    init() {
      this.initial = "initial";
      this.visible = true;
    },


  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        this.init();
      }
    }
  }
};
</script>
<style scoped>
</style>


