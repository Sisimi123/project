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
        
        <div slot="footer">
          <div v-if="multiple">
            <Button  @click="cancel()">关闭</Button>
            <Button type="primary" @click="selectedInfoList()">确定</Button>
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
                      <Form-item label="姓名：">
                        <Input v-model="query.wheres.XM_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                      </Form-item>
                  </Col>
                  <Button style="margin-left:5px" @click="initSearch()" type="info" icon="ios-search" shape="circle">搜索</Button>
              </Row>
              <Row v-if="multiple">
                  <Col span="24">
                      <Form-item label="选中人员：">
                        <Input v-model="selectedInfoName" type="textarea" :autosize="{minRows: 1,maxRows: 3}" disabled></Input>
                      </Form-item>
                  </Col>
              </Row>
            </Form>

            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.tableLoading" @on-select-cancel="selectCancel" @on-select="addSelect" @on-select-all="selectAll" @on-selection-change="selectionChange" :columns="multiple ? columnsShip1 : columnsShip2" :data="selectList" border :height="280"></Table>
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
  name: "selectCrew",
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
      default: "船员信息"
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
    multiple: {
      type: Boolean,
      default: false
    },
    autoClose:{
      type: Boolean,
      default: true
    }
  },
  computed: {
    selectedInfoName() {
      if(this.isEmpty(this.selectedList)){
        return;
      }
      var names = [];
      this.selectedList.forEach(element => {
        names.push(element.xm);
      });
      return names.toString();
    },
  },
  data() {
    return {
        visible: false,
        totalNum:0,
        status:{
            tableLoading: false,
            isCancel: false,
            selectAll:[],
        },
        query: {
            page: 1,
            size: 10,
            wheres: {
                XM_like: ""
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
              key: "xm",
              title: "姓名",
              align: "center",
              minWidth: 100
            },
            {
              key: "sfzhm",
              title: "身份证号码",
              align: "center",
              minWidth: 180
            },
            {
              key: "zszw_MC",
              title: "证书职务",
              align: "center",
              minWidth: 120
            },
            {
              key: "city",
              title: "户籍城市",
              align: "center",
              minWidth: 100
            },
            {
              key: "county",
              title: "户籍区县",
              align: "center",
              minWidth: 100
            },
        ],
        columnsShip2: [
            {
                title: "序号",
                type: "index",
                width: 80,
                align: "center"
            },
            {
              key: "xm",
              title: "姓名",
              align: "center",
              minWidth: 100
            },
            {
              key: "sfzhm",
              title: "身份证号码",
              align: "center",
              minWidth: 180
            },
            {
              key: "zszw_MC",
              title: "证书职务",
              align: "center",
              minWidth: 120
            },
            {
              key: "city",
              title: "户籍城市",
              align: "center",
              minWidth: 100
            },
            {
              key: "county",
              title: "户籍区县",
              align: "center",
              minWidth: 100
            },
            {
                title: "选择",
                key: "lsh",
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
                                this.selectedInfo(params.row);
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
    selectedInfo(row){
        console.log(row);
        this.$emit("on-selected",row);
        if(this.autoClose){
          this.ok();
        }
    },
    selectedInfoList(){
      this.$emit("on-selectedList",this.selectedList);
      this.ok();
    },
    initSearch(){
        this.query.page = 1;
        this.handleSearch();
    },
    handleSearch() {
      this.status.tableLoading = true;
      this.$http
        .get("/checks/shipsailor/page", {
          params: {
            query: JSON.stringify(this.query)
          }
        })
        .then(res => {

            this.totalNum = res.data.total;
            this.selectList = res.data.data;
            // 多选模式，处理勾选selection
            if(this.multiple){
              this.selectList.forEach(element => {
                for (const key in this.selectedList) {
                  if (this.selectedList.hasOwnProperty(key)) {
                    const element1 = this.selectedList[key];
                    if(element1.xm == element.xm){
                      element._checked = true;
                      break;
                    }
                  }
                }
              });
            }
            this.status.tableLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    selectionChange(selection){
      console.log("selectionChange",selection);
      if(selection.length == 0 && !this.status.isCancel) {
        this.status.selectAll.forEach(select => {
          for (const key in this.selectedList) {
            if (this.selectedList.hasOwnProperty(key)) {
              const selected = this.selectedList[key];
              if(selected.xm == select.xm){
                this.selectedList.splice(key, 1);
                break;
              }
            }
          }
        });
      }
    },
    addSelect(selected,select){
      // 标记数据。处理全选取消场景
      this.status.isCancel = false;

      for (const key in this.selectedList) {
        if (this.selectedList.hasOwnProperty(key)) {
          const element = this.selectedList[key];
          if(select.xm == element.xm){
            this.$Message.info(select.xm + "已添加，请勿重复操作");
            return;
          }
        }
      }

      this.selectedList.push(select);
    },
    selectCancel(selected,select){
      // 标记数据。处理全选取消场景
      this.status.isCancel = true;
      
      for (const key in this.selectedList) {
        if (this.selectedList.hasOwnProperty(key)) {
          const element = this.selectedList[key];
          if(select.xm == element.xm){
            this.selectedList.splice(key, 1);
            return;
          }
        }
      }
    },
    selectAll(selection){
      console.log("selectAll",selection);
      // 标记数据
      this.status.isCancel = false;
      this.status.selectAll = selection;
      
      selection.forEach(select => {
        var haveSame = false;
        for (const key in this.selectedList) {
          if (this.selectedList.hasOwnProperty(key)) {
            const selected = this.selectedList[key];
            if(selected.xm == select.xm){
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
      this.query.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
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
            this.query.wheres.XM_like = this.keyParam;
            this.initSearch();
            
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