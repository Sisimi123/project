<style lang="less">
</style>

<template>
 <!-- 为了这个编组这个傻屌需求专门写的 -->
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
        
        <div slot="footer">
          <div v-if="multiple">
            <Button  @click="cancel()">关闭</Button>
            <Button type="primary" @click="selectedShipList()">确定</Button>
          </div>
          <div v-else>
            <Button  @click="cancel()">关闭</Button>
          </div>
        </div>

        <Row>
          <Col span="24">
            <Form :label-width="80" @submit.native.prevent>
              <Row>
                  <Col span="8">
                      <Form-item label="渔船名：">
                        <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                      </Form-item>
                  </Col>
                  <template v-if="showCheckBox">
                    <Checkbox v-model="status.showDisableShip" @on-change="changeCheckBox">{{checkBoxText}}</Checkbox>
                  </template>
                  
                  <Button style="margin-left:5px" @click="initSearch()" type="info" icon="ios-search" shape="circle">搜索</Button>
              </Row>
              <template v-if="multiple">
                <Row>
                    <Col span="24">
                        <Form-item label="选中渔船：">
                          <Input v-model="selectedShipName" type="textarea" :autosize="{minRows: 1,maxRows: 3}" disabled></Input>
                        </Form-item>
                    </Col>
                </Row>
                <div class="note2"  v-if="text">
                    <span style="margin-right:10px;">备注:</span>
                    {{text}}
                </div>
              </template>
            </Form>

            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.tableLoading" 
                :columns="defaultColumns" 
                :data="selectList" :height="280"
                @on-select-cancel="selectCancel"
                @on-select="addSelect" 
                @on-select-all="selectAll" 
                @on-selection-change="selectionChange" 
                border></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom-wrap">
                  <Page show-total :total="totalNum" show-sizer 
                placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
                :current="query.page" @on-change="changePage" ></Page>
              </div>
            </Row>
          </Col>
        </Row>
    </Modal>
</template>

<script>
export default {
  name: "selectShip",
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
      default: "渔船信息"
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
    // 参数
    keyParam: {
      type: String,
      default: ""
    },
    // 多选模式参数  multiple 是否多选； disableUrl 获取不可勾选渔船名列表  disableShips 已勾选渔船
    multiple: {
      type: Boolean,
      default: false
    },
    cutomsUrl:{
      type: String,
      default: "",
    },
    cutomsUrlParams:{
      type: Object,
      default() {
        return {

        };
      }
    },
    cutomsColumns:{
      type: Array,
      default() {
        return [];
      }
    },
    disableUrl:{
      type: String,
      default: "",
    },
    disableUrlParams:{
      type: Object,
      default() {
        return {

        };
      }
    },
    checkBoxText:{
      type: String,
      default: "其他组渔船",
    },
    disableShips:{
      type: Array,
      default() {
        return [];
      }
    },
    text:{
      type: String,
      default: "",
      // 已在其他编组中或已加入当前组的渔船不可选中，请在对应编组删除编组后操作。
    },
    // 单选模式参数   autoClose 是否自动关闭
    autoClose:{
      type: Boolean,
      default: true
    },
  },
  computed: {
    defaultColumns(){
      if(!this.showCheckBox && this.multiple){
        return this.columnsShip1;
      }
      if(this.multiple) {
        return this.status.showDisableShip ? this.columnsShip1 : this.cutomsColumns;
      } else {
        return this.columnsShip2;
      }
    },
    selectedShipName() {
      return this.selectedShipNameArray.toString();
    },
    showCheckBox() {
      return (this.isEmpty(this.cutomsUrl) || this.isEmpty(this.disableUrl)) ? false : true; 
    },
    selectedShipNameArray() {
      var names = [];
      if(!this.isEmpty(this.disableShips)){
        this.disableShips.forEach(element => {
          names.push(element);
        });
      }

      if(!this.isEmpty(this.selectedList)){
        this.selectedList.forEach(element => {
          names.push(element.nametheShip);
        });
      }
      return names;
    },
  },
  data() {
    return {
        visible: false,
        totalNum:0,
        status:{
            tableLoading: false,
            isCancel: false,
            selectAbleChange:[],
            selectDisableNumber: 0,
            showDisableShip:false,
        },
        query: {
            page: 1,
            size: 10,
            wheres: {
                nametheShip_like: ""
            },
        },
        
        columnsShip1: [
            {
                type: "selection",
                width: 60,
                align: "center"
            },
            {
                title: "序号",
                type: "index",
                width: 80,
                align: "center"
            },
            {
                key: "nametheShip",
                title: "渔船名称",
                align: "center"
            },
            {
                key: "namevesselOwner",
                title: "渔船所有人",
                align: "center"
            },
            {
                key: "shipOwnerTelephone",
                title: "联系电话",
                align: "center"
            },
            {
                title: "选择",
                key: "id",
                align: "center",
                width: 100,
                render: (h, params) => {
                    if((params.row._disabled && params.row._checked) || !params.row._disabled){
                      return h("span", "");
                    } else {
                      return h(
                        "Button",
                        {
                            props: {
                                type: "warning",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.removeShip(params.row.nametheShip);
                                }
                            }
                        },
                        "移出原编组"
                        );
                    }
                    
                }
            }
        ],
        columnsShip2: [
            {
                title: "序号",
                type: "index",
                width: 80,
                align: "center"
            },
            {
                key: "nametheShip",
                title: "渔船名称",
                align: "center"
            },
            {
                key: "namevesselOwner",
                title: "渔船所有人",
                align: "center"
            },
            {
                key: "shipOwnerTelephone",
                title: "联系电话",
                align: "center"
            },
            {
                title: "选择",
                key: "id",
                align: "center",
                width: 100,
                render: (h, params) => {
                    return h(
                    "Button",
                    {
                        props: {
                            type: "success",
                            size: "small"
                        },
                        on: {
                            click: () => {
                                this.selectedShip(params.row);
                            }
                        }
                    },
                    "确认"
                    );
                }
            }
        ],
        selectList: [],
        selectedList:[],
        disableCheckbox:[],
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
    //---------
    changeCheckBox(flag){
      if(flag){
        this.initDisableCheckbox();
      }else {
        this.initCustom();
      }
    },
    selectedShip(row){
        this.$emit("on-selected",row);
        if(this.autoClose){
          this.ok();
        }
    },
    selectedShipList(){
      this.$emit("on-selectedList",this.selectedList);
      this.ok();
    },
    init(){
      this.resetParams();
      if(this.multiple && !this.isEmpty(this.cutomsUrl)){
        this.initCustom();
      } else if(this.multiple && !this.isEmpty(this.disableUrl)){
        this.initDisableCheckbox();
      } else {
        this.initSearch();
      }
    },
    initCustom() {
      this.status.tableLoading = true;
      this.$http
        .get(this.cutomsUrl, {
          params: {
            query: JSON.stringify(this.cutomsUrlParams)
          }
        })
        .then(res => {
          this.status.tableLoading = false;
          this.totalNum = res.data.total;
          this.selectList = res.data.data;
          this.dealSelection();
        })
        .catch(error => {
          console.log(error);
        });
    },
    dealSelection(){
      if(this.multiple){
        this.selectList.forEach(element => {
          // 已选中渔船
          for (const key in this.disableShips) {
            if (this.disableShips.hasOwnProperty(key)) {
              const shipName = this.disableShips[key];
              if(element.nametheShip == shipName){
                element._checked = true;
                element._disabled = true;
                break;
              }
            }
          }

          // 不可选择渔船
          for (const key in this.disableCheckbox) {
            if (this.disableCheckbox.hasOwnProperty(key)) {
              // console.log(this.disableCheckbox[key]);
              const shipName = this.disableCheckbox[key];
              if(element.nametheShip == shipName){
                element._disabled = true;
                break;
              }
            }
          }

          // 历史勾选的列表
          for (const key in this.selectedList) {
            if (this.selectedList.hasOwnProperty(key)) {
              const shipName = this.selectedList[key].nametheShip;
              if(element.nametheShip == shipName){
                element._checked = true;
                break;
              }
            }
          }
          
        });
      }
    },
    initDisableCheckbox(){
      console.log("test");
      this.status.tableLoading = true;
      this.$http
        .get(this.disableUrl, {
          params: this.disableUrlParams
        })
        .then(res => {
          this.disableCheckbox = res.data;
          this.initSearch();
        })
        .catch(error => {
          console.log(error);
        });
    },
    initSearch(){
      if(this.status.showDisableShip || !this.multiple){
        this.query.page = 1;
        console.log("initSearch",this.query);
        this.handleSearch();
      } else if(!this.showCheckBox){
        this.query.page = 1;
        console.log("initSearch",this.query);
        this.handleSearch();
      }else {
        this.cutomsUrlParams.page = 1;
        this.cutomsUrlParams.wheres.nametheShip_like = this.query.wheres.nametheShip_like;
        this.initCustom();
      }
    },
    handleSearch() {
      this.status.tableLoading = true;
      this.$http
        .get("/shiparchives/normalnyb/getShipInfo", {
          params: {
            query: JSON.stringify(this.query)
          }
        })
        .then(res => {
            this.totalNum = res.data.total;
            this.selectList = res.data.data;
            // 多选模式，处理勾选selection
            this.dealSelection();
            this.status.tableLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    removeShip(shipName) {
      this.$Modal.confirm({
          title: "提示",
          content: "<p>确认移出该渔船的当前编组吗？</p>",
          okText: "确认",
          cancelText: "返回",
          onOk: () => {
              this.$http
                  .delete("/check/fishingGroup/exit?shipname=" + shipName)
                  .then(res => {
                      this.$Message.info(res.msg);
                      this.initDisableCheckbox();
                  })
                  .catch(err => {
                      console.log(error);
                  });
          },
          onCancel: () => {
              console.log("onCancel");
          }
      });
    },
    selectionChange(selection){
      if(selection.length == this.status.selectDisableNumber && !this.status.isCancel) {
        console.log(selection,'selectionChange');
        this.status.selectAbleChange.forEach(select => {
          for (const key in this.selectedList) {
            if (this.selectedList.hasOwnProperty(key)) {
              const selected = this.selectedList[key];
              if(selected.nametheShip == select.nametheShip){
                this.selectedList.splice(key, 1);
                break;
              }
            }
          }
        });
      }
    },
    addSelect(selected,select){
      console.log(selected,select,'addSelect');
      // 标记数据。处理全选取消场景
      this.status.isCancel = false;

      this.selectedList.push(select);
    },
    selectCancel(selected,select){
      console.log(selected,select,'selectCancel');
      // 标记数据。处理全选取消场景
      this.status.isCancel = true;
      for (const key in this.selectedList) {
        if (this.selectedList.hasOwnProperty(key)) {
          const element = this.selectedList[key];
          if(select.nametheShip == element.nametheShip){
            this.selectedList.splice(key, 1);
            return;
          }
        }
      }
    },
    selectAll(selection){
      // 标记数据
      this.status.isCancel = false;
      this.status.selectAbleChange = [];
      this.status.selectDisableNumber = 0;
      selection.forEach(element => {
        // 禁用判断
        if(element._disabled){
          this.status.selectDisableNumber ++;
        } else {
          this.status.selectAbleChange.push(element);
        }
      });

      this.status.selectAbleChange.forEach(select => {
        var haveSame = false;
        for (const key in this.selectedList) {
          if (this.selectedList.hasOwnProperty(key)) {
            const selected = this.selectedList[key];
            if(selected.nametheShip == select.nametheShip){
              haveSame = true;
              break;
            }
          }
        }
        if(!haveSame){
          this.selectedList.push(select);
        }
      });
    },
    pageSizeChange(size) {
      
      if(this.status.showDisableShip){
        this.query.size = size;
        this.handleSearch();
        
      } else {
        this.cutomsUrlParams.size = size;
        this.initCustom();
      }
      
    },
    changePage(page) {
      if(this.status.showDisableShip){
        this.query.page = page;
        this.handleSearch();
      } else {
        this.cutomsUrlParams.page = page;
        this.initCustom();
      }
    },
    resetParams(){
      this.selectedList = [];
      this.disableCheckbox= [];
      this.status.selectAbleChange = [];
      this.status.selectDisableNumber = 0;
      this.status.showDisableShip = false;
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
            this.query.wheres.nametheShip_like = this.keyParam;
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

.note2,
.note3 {
  height: 35px;
  line-height: 35px;
  border: 1px solid #e9eaec;
  border-top: none;
  text-align: center;
}
</style>