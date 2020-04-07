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
        <div style="margin-bottom:5px;">
          <span>查询条件：</span>
          <Input v-model="query.wheres.name" @on-keydown.enter="handleSearch" @on-change="handleSearch" style="width:30%" placeholder="请输入执法人..."></Input>
          <Input v-model="query.wheres.code" @on-keydown.enter="handleSearch" @on-change="handleSearch" style="width:30%" placeholder="请输入执法号..."></Input>
          <Button  @click="handleSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
        </div>
        <Table size="small" border :columns="cols" :data="data" height="240" ></Table>

        <div slot="footer">
          <Page show-total :total="total" :page-size="query.size" :current="query.page" @on-change="pageChange" @on-page-size-change="handleSearch"></Page>
        </div>
    </Modal>
</template>

<script>
import {isNull,isEmpty} from '@/libs/common.js';
export default {
  name: "enforcersModal",
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
      default: "选择执法人"
    },
    width: {
      type: [Number, String],
      default: 620
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
        total:0,
        query:{
          page:1,
          size:10,
          wheres:{
            name:"",
            yycert:""
          }
        },
        cols:[{
            title: '序号',
            key: 'id',
            type:"index",
            align: 'center',
            width:67
        },{
          title: '执法人',
          key: 'name',
          width:201
        },{
          title: '执法号',
          key: 'code',
          width:200,
          // render: function(h, params) {
          //   var row=params.row;
          //   var ext=row.ext;
          //   var code="";
            
          //   if(!isEmpty(ext))  {
          //     try{
          //       var json=JSON.parse(ext);
          //       code=json["code"];
          //     }catch(e){
          //     }
          //   }
          //   return h('span', code);
          // }
        },{
          title: '操作',
          key: 'action',
          width: 100,
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
                          _self.selectEnforcer(row);
                      }
                  }
              }, '选择'));
              return h('div', buttons);
          }
        }],
        data:[]
      
    };
  },
  computed: {
    
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
    loadEnforcers(){
       this.$http.get("/enforces/case/enforcers",{params:{
          _model:JSON.stringify(this.query)
        }
       })
        .then((res)=>{
            if(res.success){
               this.data=res.data.data;
               this.total=res.data.total;
            }
        });
    },
    selectEnforcer(row){
      this.$emit("changeEnforcers",row);
      this.ok();
    },
    handleSearch(){
      this.query.page=1;
      this.loadEnforcers();
    },
    pageChange(){
      this.loadEnforcers();
    },
  },
  mounted(){
    this.loadEnforcers();
  },
  watch: {
    value(val) {
      this.visible = val;
    }
  }
};
</script>