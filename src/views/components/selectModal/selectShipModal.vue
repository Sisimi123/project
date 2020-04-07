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
          <Form :labelWidth="60">
              <Row>
                <Col span="8">
                    <FormItem label="渔船名:">
                        <Input v-model="query.wheres.shipname" placeholder="请输入渔船名"  @on-enter="handleSearch">
                           <Button slot="append" icon="ios-search" @click="handleSearch"></Button>
                        </Input>
                    </FormItem>
                </Col>
              </Row>
          </Form>
        </div>
        <Row>
          <div style="margin-top:10px">
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
    inputShipName:{
      type: String,
      default: ""
    },
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
    acl: {
      type: String,
      default: ""
    },
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
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.selectShip(params)
                        }
                    }
                }, '确认')
            ]);
          }
        }],
        query:{
          page:1,
          size:10,
          wheres:{
            acl:this.acl,
            shipname:""
          }
        }
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
      this.datas=[];
      this.$http.get("/achive/shipinfo/page",{
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
    selectShip(params){
      this.$emit("on-select-ship", params.row);
      this.ok();
    }
  },
  mounted(){
    
  },
  watch: {
    value(val) {
      this.visible = val;
      if(val){    
        this.query.wheres.acl=this.acl;
        this.query.wheres.shipname = this.inputShipName
        this.getPage();
      }
    },
  }
};
</script>

<style scoped>
  .ivu-form-item{
    margin-bottom:0px !important;
  }
</style>