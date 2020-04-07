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
            <Row v-if="enforceType.action=='edit'">
                    案件编号：<Input v-model="enforceType.type"  placeholder="请输入案件编号..."></Input>
            </Row>
            <Row v-else>
                <Col span="24">
                    <!-- <p style="padding-bottom:5px;">
                        <Button type="primary" @click="enforceType.action='edit'" >新增</Button>
                    </p> -->
                    <Table size="small" border :columns="enforceType.cols" :data="enforceType.data" height="240" ></Table>
                </Col>
            </Row>
            <div slot="footer">
                <template v-if="enforceType.action=='edit'">
                    <Button type="default"  @click="backEnforceType">返回</Button>
                    <Button type="success"  @click="saveEnforceType">保存</Button>
                </template>
                <template v-else>
                    <Button type="default" @click="cancel">取消</Button>
                    <Button type="success" @click="enforceType.action='edit'" >新增</Button>
                </template>
            </div>
    </Modal>
</template>

<script>
import {getDiscretionarys} from '../../../api/laws';
import {isNull,isEmpty} from '@/libs/common.js';
export default {
  name: "enforceTypeModal",
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
      default: "案件编号"
    },
    width: {
      type: [Number, String],
      default: 450
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
    var _self=this;
    return {
        visible:false,
        enforceType:{
        show:false,
        action:"view",
        type:"",
        cols:[{
				    title: '序号',
            key: 'id',
            type:"index",
				    align: 'center',
				    width:67
				},
				{
          title: '案件编号',
          key: 'type',
        },{
          title: '操作',
          key: 'action',
          width: 130,
          align: 'center',
          render: function(h, params) {
              var row=params.row;
              var buttons=[];
              buttons.push(h('Button', {
                  props: {
                      type: 'primary',
                      size: 'small'
                  },
                  style: {
                      marginRight: '5px'
                  },
                  on: {
                      click: function() {
                          _self.selectEnforceType(row);
                      }
                  }
              }, '选择'));
              var userInfo=_self.$store.state.user.userInfo;
              if(!isNull(userInfo)){
                  if(row.creatorId == userInfo.userId)
                      buttons.push(h('Button', {
                          props: {
                              type: 'error',
                              size: 'small'
                          },
                          style: {
                              marginRight: '5px'
                          },
                          on: {
                              click: function() {
                                  _self.deleteEnforceType(row);
                              }
                          }
                      }, '删除'));
              }
              return h('div', buttons);
          }
        }],
        data:[]
      }
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
     //案件编号
    selectEnforceType(row){
        this.$emit("selectEnforceType", row);
        this.ok();
    },
    backEnforceType(){
        this.enforceType.action="view";
        this.enforceType.type="";
    },
    saveEnforceType(){
        var _self=this;
        if(isEmpty(this.enforceType.type)){
            _self.$Message.info("案件编号不能为空!");
            return;
        }
        _self.$http.post("/enforces/enforcetype",{
            type:this.enforceType.type
        })
        .then(function(result){
            if(result.success){
                _self.backEnforceType();
                _self.loadEnforceType();
            }
        });
    },
    deleteEnforceType(item){
        var _self=this;
          _self.$Modal.confirm({
            title:"提示",
            content:"是否确认删除？",
            onOk:function(){
                _self.$http.delete("/enforces/enforcetype/"+item.id)
                .then(function(result){
                    if(result.success){
                        _self.loadEnforceType();
                    }
                });
            }
        });
    },
    loadEnforceType(){
        var _self=this;
        _self.$http.get("/enforces/enforcetype/list")
        .then(function(result){
            if(result.success){
                _self.enforceType.data=result.data;
                _self.enforceType.show=true;
            }
        });
    }
  },
  mounted(){
    this.loadEnforceType();
  },
  watch: {
    value(val) {
      this.visible = val;
    }
  }
};
</script>