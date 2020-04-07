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
        
        <div slot="footer" >
            <Button  @click="cancel()">关闭</Button>
        </div>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span >渔船名：</span>
                <Input v-model="query.wheres.shipname_like" @on-keydown.enter="initSearch()"  style="width:150px" placeholder="请输入..."></Input>
                <span >报告类型：  </span>
                <Select
                  v-model="query.wheres.isReport"
                  placement="bottom"
                  :transfer="true"
                  style="width:150px"
                >
                  <Option value="1">已报告</Option>
                  <Option value="0">未报告</Option>
                </Select>
                <span>时间：</span>
                <Select
                  v-model="timeType"
                  @on-change="timeChange"
                  placement="bottom"
                  :transfer="true"
                  style="width:150px"
                >
                  <Option value="0">一天内</Option>
                  <Option value="1">2天内</Option>
                  <Option value="2">3天内</Option>
                  <Option value="3">4天内</Option>
                  <Option value="4">5天内</Option>
                </Select>
                
                <Button style="margin-left:5px" @click="initSearch()" type="info" icon="ios-search" shape="circle">搜索</Button>
                <Button style="margin-left:5px" @click="resetSearch()"  shape="circle">重置</Button>
              </div>
            </Row>
            <Row>
              <div style="margin-top:10px">
                <span >港口名：</span>
                <Input v-model="query.wheres.gkname_like" @on-keydown.enter="initSearch()"  style="width:150px" placeholder="请输入..."></Input>

                <span >进出港类型：</span>
                <Select
                  v-model="query.wheres.type"
                  placement="bottom"
                  :transfer="true"
                  style="width:150px"
                >
                  <Option value="1">进港</Option>
                  <Option value="2">出港</Option>
                </Select>
              </div>
            </Row>
            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.tableLoading" :columns="columnsShip" :data="selectList" border :height="280"></Table>
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
  name: "portReportModal",
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
      default: "进出港信息"
    },
    width: {
      type: [Number, String],
      default: 1080
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
    }
  },
  data() {
    return {
        visible: false,
        totalNum:0,
        timeType:"0",
        status:{
            tableLoading: false,
        },
        query: {
            page: 1,
            size: 10,
            wheres: {
                nametheShip_like: "",
                acceptTime_gte: "",
                isReport:"",
                type:"",
            },
            orders: ""
        },
        columnsShip: [
            {
                title: "序号",
                type: "index",
                width: 80,
                align: "center"
            },
            {
                key: "shipname",
                title: "渔船名称",
                align: "center",
                width: 120,
            },
            {
                key: "power",
                title: "功率",
                align: "center"
            },
            {
                key: "length",
                title: "船体长度",
                align: "center"
            },
            {
                key: "width",
                title: "船体宽度",
                align: "center"
            },
            {
                key: "tonnage",
                title: "吨位",
                align: "center"
            },
            {
                key: "gkname",
                title: "港口名",
                align: "center"
            },
            {
                key: "type",
                title: "进出港类型",
                align: "center",
                render: (h, params) => {
                  var type;
                  var c;
                  if(params.row.type == 1){
                    type = "进港";
                    c = "red";
                  } else {
                    type = "出港";
                    c = "blank";
                  }
                  return h(
                    "span",
                    {
                      style: {
                        color: c
                      }
                    },
                    type
                  );
                }
            },
            {
                key: "type",
                title: "是否报告",
                align: "center",
                render: (h, params) => {
                  var name = "未报告";
                  var c = "red";
                  if(params.row.type == 1 && params.row.arrive == 1){
                    name = "已报告";
                    c = "blank";
                  } else if(params.row.type == 2 && params.row.depart == 1){
                    name = "已报告";
                    c = "blank";
                  }
                  return h(
                    "span",
                    {
                      style: {
                        color: c
                      }
                    },
                    name
                  );
                }
            },
            {
                key: "acceptTime",
                title: "进出港时间",
                align: "center",
                width: 180,
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
                                this.selectedPort(params.row);
                            }
                        }
                    },
                    "确认"
                    );
                }
            }
        ],
        selectList: [],
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
    selectedPort(row){
        console.log(row);
        this.$emit("on-selected",row);
        this.ok();
    },
    initSearch(){
        this.query.page = 1;
        this.handleSearch();
    },
    resetSearch() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.timeType = "0";
      this.initSearch();
    },
    handleSearch() {
      this.status.tableLoading = true;
      this.$http
        .get("/enforces/shipscoresafecheck/getPortReportNew", {
          params: {
            query: JSON.stringify(this.query)
          }
        })
        .then(res => {
            console.log(res);
            this.totalNum = res.data.total;
            this.selectList = res.data.data;
            this.status.tableLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    },
    timeChange(val) {
      const time = new Date();
      var gte;
      switch (val) {
        case "0":
          gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 1
          );
          break;
        case "1":
          gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 2
          );
          break;
        case "2":
         gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 3
          );
          break;
        case "3":
          gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 4
          );
          break;
        case "4":
          gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 5
          );
          break;

        default:
          break;
      }

      if(gte){
        var month = gte.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month; 
        var day = gte.getDate().toString().length == 1 ? '0' + gte.getDate() :gte.getDate();
        var h = gte.getHours().toString().length == 1 ? '0' + gte.getHours() : gte.getHours();
        var m = gte.getMinutes().toString().length == 1 ? '0' + gte.getMinutes() : gte.getMinutes();
        var s = gte.getSeconds().toString().length == 1 ? '0' + gte.getSeconds() : gte.getSeconds();

        this.query.wheres.acceptTime_gte = [gte.getFullYear(), month, day].join('-') + " " + [h, m, s].join(':');
      }
      this.initSearch();
    }

  },
  watch: {
    value(val) {
        this.visible = val;
        if (val){
            this.timeChange("0");
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
</style>