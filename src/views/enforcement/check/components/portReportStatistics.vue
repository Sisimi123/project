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
        <MyTreeGrid ref="dataGrid" :height="520" size="small" border 
        :columns="columnList" :data="filterTree" ></MyTreeGrid>
        <!-- expandUrl="/$admin/dicts/node" -->
    </Modal>
</template>

<script>
import MyTreeGrid from '@/views/components/treeGrid/MyTreeGrid.vue';
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

  },
  data() {
    return {
        // default
        visible: false,
        // ------
        dataList:[],
        columnList: [
            {
                title:'序号',
                type: 'index',
                width: 70,
                align: 'center',
                key: 'id'
            },
            {
                title: '属地',
                type: 'tree',
                width: 200,
                align: 'left',
                key: 'name'
            },
            {
                title: '数量',
                align: 'center',
                width: 80,
                key: 'checkNumber'
            },
            {
                title: '开捕数',
                align: 'center',
                width: 80,
                key: 'kbNumber'
            },
            {
                title: '自查数量',
                align: 'center',
                key: 'zc',
                width: 80,
            },
            {
                title: '占比',
                align: 'center',
                width: 70,
                key: 'zcPercentage'
            },
            {
                title: '核查数量',
                align: 'center',
                key: 'hc',
                width: 80,
            },
            {
                title: '风险可控',
                align: 'center',
                key: 'hcfxkk',
                width: 80,
            },
            {
                title: '占比',
                align: 'center',
                width: 70,
                key: 'hcPercentage'
            },
            {
                title: '区县抽查数量',
                align: 'center',
                key: 'qxcc',
                width: 80,
            },
            {
                title: '风险可控',
                align: 'center',
                key: 'qxccfxkk'
            },
            {
                title: '占比',
                align: 'center',
                width: 70,
                key: 'qxPercentage'
            },
            {
                title: '市局抽查数量',
                align: 'center',
                key: 'shicc'
            },
            {
                title: '风险可控',
                align: 'center',
                key: 'shiccfxkk'
            },
            {
                title: '占比',
                align: 'center',
                width: 70,
                key: 'shiPercentage'
            },
            {
                title: '省局抽查数量',
                align: 'center',
                key: 'shencc'
            },
            {
                title: '风险可控',
                align: 'center',
                key: 'shenccfxkk'
            },
            {
                title: '占比',
                align: 'center',
                width: 70,
                key: 'shenPercentage'
            },



        ],

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
    // ------
    filterTree(){
        var tree=this.$util.deepCopy(this.dataList);
        return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
            return !isNull(node.name) && node.name.indexOf(filter) >= 0;
        });
    },
  },
  components: {
    MyTreeGrid
  },
  mounted() {
    this.init();
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
    
    init() {
      this.$http
        //请求路径
        .get("/checks/portreport/statistics")
        // 返回值
        .then(res => {
          console.log("statistics");
          console.log(res);
          if (res.success) {
            this.dataList = res.data;

          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
        this.init();
      }
    }
  }
};
</script>
<style scoped>
.margin-left-8 {
  margin-left: 8px;
}
</style>


