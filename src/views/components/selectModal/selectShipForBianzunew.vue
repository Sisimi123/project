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
        <slot name="close"></slot>
        <slot name="header"></slot>
        <!-- <div slot="footer">
            <Button @click="cancel">取消</Button>
            <Button type="primary" @click="ok">确定</Button>
        </div> -->
        <div>
          <!-- <Form :labelWidth="80">
              <Row style="margin-bottom:5px">
                <Col span="8">
                    <Input v-model="query.wheres.shipname" placeholder="请输入渔船名"  @on-enter="handleSearch" size="large">
                        <Button slot="append" icon="ios-search" @click="handleSearch"></Button>
                    </Input>
                    <Checkbox v-model="query.wheres.type" @on-change="handleSearch" true-value="1" false-value="2">全部</Checkbox>
                </Col>
                 <Col span="4" v-if="multiple">
                    
                </Col>
                 <Col span="12" v-if="multiple">
                    <Button type="primary" style="margin-left:5px;"  @click="handleSelect">确定</Button>
                    <Button type="warning"  @click="clearSelect">清空</Button>
                </Col>
              </Row>
              <Row v-if="selectedShips.length!=0&&multiple">
                <div class="divTags">   
                  <Tag  v-for="(item,index) in selectedShips" :key="'ships_'+index" closable @on-close="(e,name)=>{cancelShip(item,index)}" color="primary">{{item.shipname}}</Tag>
                </div>
              </Row>
          </Form> -->
           <Form :label-width="52" @submit.native.prevent>
                <Row>
                    <Col span="8">
                        <Form-item label="船名号:">
                            <Input v-model="query.wheres.shipname" placeholder="请输入渔船名"  @on-enter="handleSearch" size="large">
                              
                          </Input>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap" style="margin-top: 3px;">
                        <Button type="success" icon="ios-search" style="margin-left:5px;" @click="handleSearch">搜索</Button>
                        <Button type="primary" style="margin-left:5px;"  @click="handleSelect">确定</Button>
                        <Button type="warning"  @click="clearSelect">清空</Button>
                        <Checkbox true-value="1" v-model="query.wheres.type" false-value="2" @on-change="handleSearch" v-show="delRelation!=undefined">全部</Checkbox>
                    </div>
                </Row>
                <Row v-if="selectedShips.length!=0&&multiple"  style="margin-top: 5px;">
                  <div class="divTags">   
                    <Tag  v-for="(item,index) in selectedShips" :key="'ships_'+index" closable @on-close="(e,name)=>{cancelShip(item,index)}" color="primary">{{item.shipname}}</Tag>
                  </div>
                </Row>
            </Form>
        </div>
        <Row>
          <div style="margin-top:5px">
            <Table border stripe :data="datas" :columns="cols" height="400"></Table>
          </div>
        </Row>
          <div  slot="footer">
            <Page show-total show-elevator show-sizer :total="total" :page-size="query.size" :current="query.page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
          </div>
    </Modal>
</template>

<script>
export default {
  name: "selectShipModal",
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
      default: "选择渔船"
    },
    width: {
      type: [Number, String],
      default: 960
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
    shipUrl:{
      type: String,
      default:"/achive/shipinfo/page"
    },
    multiple: {
      type: Boolean,
      default:false
    },
    shipList:{
      type:Array,
      default(){
        return [];
      }
    },
    delRelation:{
      type: Function
    }
  },
  computed: {

  },
  data() {
    return {
        visible: false,
        total:0,
        datas:[],
        cols:[{
            title: "序号",
            type: "index",
            width: 60,
            align: "center"
        },{
            key: "shipname",
            title: "渔船名称",
            align: "center"
        },{
            key: "owner",
            title: "渔船所有人",
            align: "center"
        },{
            key: "tel",
            title: "联系电话",
            align: "center"
        },{
          title: '操作',
          key: 'action',
          width: 130,
          align: 'center',
          render: (h, params) => {
            var ship=params.row;
            var buttons=[];
            var flag=("1"==ship.type)&&!this.groupShip(ship);
            buttons.push(h('Button', {
                props: {
                    type: 'primary',
                    size: 'small',
                    disabled: flag
                },
                style: {
                    marginRight: '5px'
                },
                on: {
                    click: () => {
                        this.selectShip(ship)
                    }
                }
            }, '选中'));

            if(flag&&this.delRelation!=undefined)
              buttons.push(h('Button', {
                  props: {
                      type: 'error',
                      size: 'small',
                  },
                  style: {
                      marginRight: '5px'
                  },
                  on: {
                      click: () => {
                          this.delRelation(ship,this.getPage);
                      }
                  }
              }, '移除'));

            return h('div',buttons);
          }
        }],
        query:{
          page:1,
          size:10,
          wheres:{
            shipname:"",
            type:"2",//1:查询所有的渔船，2：只查还未建立有效关系的渔船。
          }
        },
        selectedShips:this.shipList||[]
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
    pageChange(page){
      this.query.page=page;
      this.getPage();
    },
    pageSizeChange(size){
      this.query.page=1;
      this.query.size=size;
      this.getPage();
    },
    handleSearch(){
      this.query.page=1;
      this.getPage();
    },
    getPage(){
      return this.$http.get(this.shipUrl,{
        params:{
          query:JSON.stringify(this.query)
        }
      })
      .then((result)=>{
        if(result.success){
          this.datas=result.data.data;
          this.total=result.data.total;
        }
      })
    },
    groupShip(ship){
      if(this.shipList){
        for(var i=0,length=this.shipList.length;i<length;i++){
          if(ship.shipid==this.shipList[i].shipid)
            return true;
        }
      }
      return false;
    },
    selectShip(ship){
      if(this.multiple){
        var selectedShips=this.selectedShips;
        for(var i=0,length=selectedShips.length;i<length;i++){
          var item=selectedShips[i];
          if(item.shipid==ship.shipid){
            this.$Message.info("当前渔船已选中！");
            return;
          }
        }
        var length=this.selectedShips.length;
        this.selectedShips.splice(length,0,ship);
      }else{
        this.$emit("on-select-ship", ship);
        this.ok();
      }
    },
    cancelShip(item,index){
      this.selectedShips.splice(index,1);
    },
    handleSelect(){
      console.log(this.selectedShips);
      this.$emit("on-select-ship",this.selectedShips);
      this.clearSelect();
      this.ok();
    },
    clearSelect(){
       this.selectedShips=[];
    }
  },
  mounted(){
    this.getPage();
  },
  watch: {
    value(val) {
      this.visible = val;
      if(val){
        this.getPage();
        this.selectedShips=this.shipList?JSON.parse(JSON.stringify(this.shipList)):[];
      }
    }
  }
};
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom:0px !important;
  }
  .divTags{
    max-height:150px;
    border:1px dashed #e9eaec;
    padding:5px;
    overflow-y:auto;
  }
  .divTags:hover{
    border:1px dashed #3e76f6;
  }
</style>