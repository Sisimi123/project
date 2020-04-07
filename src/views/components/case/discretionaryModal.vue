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
        <slot name="close"></slot>
        <slot name="header"></slot>
            <Input v-model="discretionary.search"   placeholder="请输入关键字"></Input> 
            <Tree :data="discretionarys"  @on-select-change="selectDiscretionaryPower"  style="height:300px;overflow:auto;"></Tree>
    </Modal>
</template>

<script>
import {getDiscretionarys} from '../../../api/laws';
import {isNull,isEmpty} from '@/libs/common.js';
export default {
  name: "discretionaryModal",
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
      default: "选择自由裁量"
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
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: true
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
   },
  data() {
    return {
        visible:false,
        discretionary:{
            dataList:[],
            search:""
        },
    };
  },
   computed: {
        discretionarys(){
        var discretionary= this.discretionary.dataList;
        return this.$util.diguiTree(discretionary,this.discretionary.search);
    },
  },
  methods: {
    ok() {
      this.visible = false;
      if (!this.loading) 
        this.$emit("input", this.visible);
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
     //自由裁量
    loadDiscretionaryPower(){
        var _self=this;
        getDiscretionarys().then(function(result){
            if(result.success){
                _self.discretionary.dataList=result.data[0].children;
            }
        })
    },
    selectDiscretionaryPower(nodes){
        if(nodes.length==0){
          this.curDiscretionary.expand=!this.curDiscretionary.expand;
          return;
        }
        var node=nodes[0];
        this.curDiscretionary=node;
        if(!isNull(node.children) && node.children.length>0){
            node.expand=!node.expand;
            this.$Message.error("请选择子节点！");
            return;
        }
        this.$emit("selectDiscretionaryPower",node);
        this.ok();
    }
  },
  mounted(){
    this.loadDiscretionaryPower();
  },
  watch: {
    value(val) {
      this.visible = val;
    }
  }
};
</script>