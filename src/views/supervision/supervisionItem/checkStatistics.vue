<template>
  <div>
    <data-content>
      <Row>
        <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
          <Card class="treeDataCard">
            <p slot="title" class="card-title-select">
              <Tabs v-model="taskStatus" @on-click="tabsChange">
                <TabPane :label="incheckResult" name="getIncheckResult"></TabPane>
                <TabPane :label="finishResult" name="getFinishResult">已办</TabPane>
              </Tabs>
              <div style="font-weight:400; margin-bottom: 10px; position: absolute; right: 15px; top: 8px;">
                开始时间：
                <DatePicker
                  v-model="taskQuery.wheres.createTime_begin"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px;margin-right:5px"
                ></DatePicker>结束时间：
                <DatePicker
                  v-model="taskQuery.wheres.createTime_end"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px"
                ></DatePicker>
                <Button size="small" style="margin-left:5px" @click="getTaskData" type="primary">搜索</Button>
                <!-- <Button size="small" @click="exportWord" type="info">导出</Button> -->
              </div>
              <div class="data-source-row">
                <Table border :data="taskData" :columns="taskColumns"></Table>
                <div class="bottom-wrap">
                 <Page
                  show-total
                  :total="totalNum"
                  show-sizer
                  show-elevator
                  placement="top"
                  @on-page-size-change="pageSizeChange"
                  :page-size="taskQuery.size"
                  :current="taskQuery.page"
                  @on-change="changePage"
                ></Page>
                </div>
              </div>
            </p>
          </Card>
        </Col>
        <!-- <Col :style="{marginBottom: '10px'}" class="task-status">
        
          <data-table
            :params="taskQuery"
            ref="test"
            :url="`/supervision/examineTask/${taskStatus}`"
            :columns="taskColumns"
            @on-row-dblclick="tableClick"
          >
          <template slot="search">
            <span>
            <Tabs v-model="taskStatus">
                <TabPane :label="incheckResult" name="getIncheckResult"></TabPane>
                <TabPane :label="finishResult" name="getFinishResult">已办</TabPane>
            </Tabs>
          </span>
          <span style="font-weight:400;float:right;margin-bottom:8px;">
            开始时间：
            <DatePicker
              v-model="taskQuery.wheres.createTime_begin"
              type="datetime"
              placeholder="请选择日期时间"
              style="width: 200px;margin-right:5px"
            ></DatePicker>结束时间：
            <DatePicker
              v-model="taskQuery.wheres.createTime_end"
              type="datetime"
              placeholder="请选择日期时间"
              style="width: 200px"
            ></DatePicker>
              <Button size="small" style="margin-left:5px" @click="initSearch" type="primary">搜索</Button>
          </span>
          </template>
          </data-table>
        </Col> -->
      </Row>
      <Row>
        <Col :style="{marginBottom: '10px'}">
          <Card class="treeDataCard">
            <p slot="title" class="card-title-select">
              <span>
                <Icon type="ios-pulse-strong"></Icon>地区统计
              </span>
              <!-- <span style="display:flex;align-items: center;"></span> -->
              <span style="font-weight:400;float:right">
                开始时间：
                <DatePicker
                  v-model="treeParams.checkCompleteTime_begin"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px;margin-right:5px"
                ></DatePicker>结束时间：
                <DatePicker
                  v-model="treeParams.checkCompleteTime_end"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px"
                ></DatePicker>
                <Button size="small" style="margin-left:5px" @click="search" type="primary">搜索</Button>
                <Button size="small" @click="exportWord" type="info">导出</Button>
              </span>
            </p>
            <div class="data-source-row">
              <MyTreeGrid
                ref="dataGrid"
                :height="310"
                :loading="loading"
                size="small"
                border
                :columns="columnList"
                :data="filterTree"
                expandUrl="/$admin/depts/node"
              ></MyTreeGrid>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
          <Card class="treeDataCard">
            <p slot="title" class="card-title-select">
              <span>
                <Icon type="ios-pulse-strong"></Icon>个人检查统计
              </span>
              <span style="font-weight:400;float:right">
                开始时间：
                <DatePicker
                  v-model="personalCheckParams.checkCompleteTime_begin"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px;margin-right:5px"
                ></DatePicker>结束时间：
                <DatePicker
                  v-model="personalCheckParams.checkCompleteTime_end"
                  type="datetime"
                  placeholder="请选择日期时间"
                  style="width: 200px"
                ></DatePicker>
                <Button size="small" style="margin-left:5px" @click="personalCheckSearch" type="primary">搜索</Button>
                <Button size="small" @click="personageExportExcel" type="info">导出</Button>
              </span>
            </p>
            <div class="data-source-row">
              <personalCheck ref="personalCheck" :params="personalCheckParams"></personalCheck>
            </div>
          </Card>
        </Col>
        <Col :md="24" :lg="12" :style="{marginBottom: '10px',paddingLeft: '10px'}">
          <Card>
            <p slot="title" class="card-title">
              <Icon type="ios-pulse-strong"></Icon>监管对象覆盖统计
            </p>
            <div class="data-source-row">
              <Table border :data="data" :columns="columns" :height="280"></Table>
            </div>
          </Card>
        </Col>
      </Row>
    </data-content>
    <!-- 待办、已办 录入弹窗 -->
    <entryModal
      moduleIdName="dailyCheckEntry"
      :taskid="taskid"
      @isSuccess="getEntryStatus"
      :info="info"
      :width="900"
      v-model="status.entryModal"
      :isView="isView"
      @visibleChange="statusChange"
      :mask-closable="maskclosable"
    ></entryModal>
  </div>
</template>

<script>
import personalCheck from "../components/personalCheck.vue";
// import checkObjBar from "../components/checkObjBar";
import { isNull, isEmpty } from "../../../libs/common";
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import entryModal from "../components/entryModal.vue";

export default {
  components: {
    personalCheck,
    MyTreeGrid,
    entryModal
  },
  data() {
    return {
      loading: false,
      data: [],
      columns: [
        {
          title: "对象类型",
          align: "center",
          key: "type"
        },
        {
          title: "正常数量",
          align: "center",
          key: "NORMAL"
        },
        {
          title: "异常数量",
          align: "center",
          key: "ABNORMAL"
        },
        {
          title: "未检查数量",
          align: "center",
          key: "NOCHECK"
        },
        {
          title: "异常率",
          align: "center",
          key: "ABNORMAL_RATE",
          render: (h, params) => {
            let ABNORMAL_RATE = params.row.ABNORMAL_RATE;
            if (ABNORMAL_RATE == "0") {
              ABNORMAL_RATE = ABNORMAL_RATE + "%";
            } else {
              ABNORMAL_RATE = (ABNORMAL_RATE * 100).toFixed(2) + "%";
            }
            return h("span", ABNORMAL_RATE);
          }
        },
        {
          title: "检查覆盖率",
          align: "center",
          key: "CHECK_RATE",
          render: (h, params) => {
            let CHECK_RATE = params.row.CHECK_RATE;
            if (CHECK_RATE == "0") {
              CHECK_RATE = CHECK_RATE + "%";
            } else {
              CHECK_RATE = (CHECK_RATE * 100).toFixed(2) + "%";
            }
            return h("span", CHECK_RATE);
          }
        }
      ],
      dataList: [],
      columnList: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
          key: "id"
        },
        {
          title: "地区名称",
          type: "tree",
          width: 200,
          align: "left",
          key: "name"
        },
        {
          title: "日常-检查中",
          align: "center",
          key: "daily_unfinish"
        },
        {
          title: "日常-已完结",
          align: "center",
          key: "daily_finish"
        },
        {
          title: "日常-总数",
          align: "center",
          key: "daily_total"
        },
        {
          title: "专项-检查中",
          align: "center",
          key: "special_unfinish"
        },
        {
          title: "专项-已完结",
          align: "center",
          key: "special_finish"
        },
        {
          title: "专项-总数",
          align: "center",
          key: "special_total"
        },
        {
          title: "安全-检查中",
          align: "center",
          key: "safety_unfinish"
        },
        {
          title: "安全-已完结",
          align: "center",
          key: "safety_finish"
        },
        {
          title: "安全-总数",
          align: "center",
          key: "safety_total"
        },
        {
          title: "随机-检查中",
          align: "center",
          key: "random_unfinish"
        },
        {
          title: "随机-已完结",
          align: "center",
          key: "random_finish"
        },
        {
          title: "随机-总数",
          align: "center",
          key: "random_total"
        },
        {
          title: "全部",
          align: "center",
          key: "total"
        }
      ],
      params: {},
      treeParams: {
        deptId: "",
        checkCompleteTime_begin: "",
        checkCompleteTime_end: ""
      },
      personalCheckParams: {
        month: "",
        checkCompleteTime_begin: "",
        checkCompleteTime_end: ""
      },
      taskStatus: 'getIncheckResult',
      result: {
        getIncheckResult: 0,
        getFinishResult: 0
      },
      incheckResult: (h) => {
          return h('div', [
          h('span', '待办'),
          h('Badge', {
            props: {
              count: this.result.getIncheckResult
            }
          })
        ])
      },
      finishResult: (h) => {
          return h('div', [
          h('span', '已办'),
          h('Badge', {
            props: {
              count: this.result.getFinishResult
            }
          })
        ])
      },
      taskColumns: [],
      taskColumns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          maxWidth: 80
        },
        {
          title: "主体名称",
          key: "legalEntityName",
          align: "center"
        },
        {
          title: "检查对象类型",
          key: "checkObjectType",
          align: "center",
          render: (h, params) => {
            var str = "";
            this.checkedObjList.forEach((v, i) => {
              if (v.value === params.row.checkObjectType) {
                str = v.title;
              }
            });
            return h("span", str);
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "任务状态",
          key: "taskStatus",
          align: "center",
          render: (h, params) => {
            var str = "";
            if (params.row.taskStatus === "NOCHECK") {
              str = "待检查";
            } else if (params.row.taskStatus === "INCHECK") {
              str = "检查中";
            } else if (params.row.taskStatus === "NOFINISH") {
              str = "未完结";
            } else if (params.row.taskStatus === "FINISH") {
              str = "已完结";
              if (params.row.isCheckNoWhereabouts === "1") str += "(查无下落)";
            }
            return h("span", str);
          }
        },
        {
          title: "检查部门",
          key: "deptName",
          align: "center"
        },
        {
          title: "检查人员",
          key: "checkUserNames",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            var _self = this;
            let arr = [];
            arr.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {},
                  on: {
                    click: () => {
                      _self.entryWin(params.row);
                    }
                  }
                },
                "录入"
              )
            );
            if (
              params.row.checkUserNames &&
              params.row.checkUserNames ===
                this.$store.state.user.userInfo.mobile
            ) {
              arr.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {},
                    on: {
                      click: () => {
                        _self.del(params.row);
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            return h("div", arr);
          }
        }
      ],
      maskclosable: false,
      info: {},
      taskid: "",
      status: {
        checkObjModal: false,
        entryModal: false
      },
      taskQuery: {
        page: 1,
        size: 5,
        wheres: {
          createTime_begin: '',
          createTime_end: ''
        }
      },
      taskData: [],
      totalNum: 0,
      taskColumns2: [
          {
              title: '序号',
              type: 'index',
              align: 'center',
              maxWidth: 80
          },
          {
              title: '主体名称',
              key: 'legalEntityName',
              align: 'center'
          },
          {
              title: '检查对象类型',
              key: 'checkObjectType',
              align: 'center',
              render: (h, params) => {
                  var str = '';
                  this.checkedObjList.forEach((v, i) => {
                      if (v.value === params.row.checkObjectType) {
                          str = v.title;
                      }
                  });
                  return h('span', str);
              }
          },
          {
              title: '检查日期',
              key: 'checkCompleteTime',
              align: 'center'
          },
          {
              title: '任务状态',
              key: 'taskStatus',
              align: 'center',
              render: (h, params) => {
                  var str = '';
                  if (params.row.taskStatus === 'NOCHECK') {
                      str = '待检查';
                  } else if (params.row.taskStatus === 'INCHECK') {
                      str = '检查中';
                  } else if (params.row.taskStatus === 'NOFINISH') {
                      str = '未完结';
                  } else if (params.row.taskStatus === 'FINISH') {
                      str = '已完结';
                      if(params.row.isCheckNoWhereabouts === '1')
                          str += "(查无下落)";
                  }
                  return h('span', str);
              }
          },
          {
              title: '检查部门',
              key: 'deptName',
              align: 'center'
          },
          {
              title: '检查人员',
              key: 'checkUserNames',
              align: 'center'
          },
          {
              title: '操作',
              align: 'center',
              render: (h, params) => {
                  var _self = this;
                  return h('div', [
                      h('Button', {
                          props: {
                              type: 'info',
                              size: 'small'
                          },
                          style: {},
                          on: {
                              click: () => {
                                  _self.entryWin(params.row);
                              }
                          }
                      }, '详情')
                  ]);
              }
          }
      ],
      isView: false,
    };
  },
  computed: {
    filterTree() {
      var tree = this.$util.deepCopy(this.dataList);
      return this.$util.diguiTree(tree, this.dataFilter, function(
        node,
        filter
      ) {
        return !isNull(node.name) && node.name.indexOf(filter) >= 0;
      });
    },
    checkedObjList() {
      return this.$store.getters.getDictList("regulatoryRepertory");
    }
  },
  methods: {
    search() {
      this.getTreeData();
    },
    exportWord() {
      window.open(
        this.$basePath +
          `/supervision/statistics/exportExcel?deptId=${this.treeParams.deptId}&checkCompleteTime_begin=${this.treeParams.checkCompleteTime_begin}&checkCompleteTime_end=${this.treeParams.checkCompleteTime_end}`
      );
    },
    getData() {
      let params = new URLSearchParams();
      let json = JSON.stringify(this.params);
      params.append("query", json);
      this.$http
        .get("/supervision/statistics/objCover", {
          params: params
        })
        .then(res => {
          console.log(res, "res");
          if (res.success) {
            let data = [];
            if (!isEmpty(res.data.LEGAL_ENTITY)) {
              res.data.LEGAL_ENTITY.type = this.$store.getters.getDictName(
                "regulatoryRepertory",
                "LEGAL_ENTITY"
              );
              data.push(res.data.LEGAL_ENTITY);
            }
            if (!isEmpty(res.data.EQUIPMENT)) {
              res.data.EQUIPMENT.type = this.$store.getters.getDictName(
                "regulatoryRepertory",
                "EQUIPMENT"
              );
              data.push(res.data.EQUIPMENT);
            }
            if (!isEmpty(res.data.SPECIFIC_POPULATION)) {
              res.data.SPECIFIC_POPULATION.type = this.$store.getters.getDictName(
                "regulatoryRepertory",
                "SPECIFIC_POPULATION"
              );
              data.push(res.data.SPECIFIC_POPULATION);
            }
            this.data = data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getTreeData() {
      this.treeParams.deptId = this.$store.state.user.userInfo.areaId;
      let params = new URLSearchParams();
      let json = JSON.stringify(this.treeParams);
      params.append("query", json);
      this.$http
        .get("/supervision/statistics/region", {
          params: params
        })
        .then(res => {
          console.log(res, "treeRes");
          if (res.success) {
            this.dataList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    personalCheckSearch(){
      console.log("this.$refs.personalCheck", this.$refs.personalCheck);
      this.$refs.personalCheck.init()
    },
    personageExportExcel() {
      window.open(
        this.$basePath +
          `/supervision/statistics/personageExportExcel?month=${this.personalCheckParams.month}&checkCompleteTime_begin=${this.personalCheckParams.checkCompleteTime_begin}&checkCompleteTime_end=${this.personalCheckParams.checkCompleteTime_end}`
      );
    },
    pageSizeChange(size) {
      this.taskQuery.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.taskQuery.page = page;
      this.getTaskData();
    },
    /**
     * @desc 获取待办、已办数据
     */
    getTaskData() {
      if('getIncheckResult' === this.taskStatus) {
        this.taskColumns = this.taskColumns1;
        this.getIncheckResultApi().then(res => {
          this.taskData = res.data.data;
          this.totalNum = res.data.total;
        })
      }
      else {
        this.taskColumns = this.taskColumns2;
        this.getFinishResultApi().then(res => {
          this.taskData = res.data.data;
          this.totalNum = res.data.total;
        })
      }
    },
    /**
     * @desc 待办、已办 双击
     */
    tableClick(row) {
      this.entryWin(row);
    },
    tabsChange(value) {
      console.log(value, this.taskStatus, 2222)
      this.taskQuery.page = 1;
      this.getTaskData();
    },
    /**
     * @desc 操作中的 录入
     */
    entryWin(row) {
      var _self = this;
      _self.taskid = row.taskId;
      // _self.sID = row.taskId;
      _self.$http
        .get("/supervision/examine/getCheckResult?taskId=" + row.taskId)
        .then(res => {
          _self.info = res.data;
          if('getIncheckResult' === this.taskStatus) {
            _self.isView = false;
            _self.info.positionName = res.data.legalSupervisor
              ? res.data.legalSupervisor.positionName
              : null;
            _self.info.userName = res.data.legalSupervisor
              ? res.data.legalSupervisor.userName
              : null;
            if (
              _self.info.checkCompleteTime === undefined ||
              _self.info.checkCompleteTime === ""
            ) {
              _self.info.checkCompleteTime = new Date();
            }
            if (
              _self.info.enterUserName === undefined ||
              _self.info.enterUserName === ""
            ) {
              _self.info.enterUserName = user.state.userInfo.name;
            }
          }
          else {
            _self.isView = true;
            _self.info.isCheckNoWhereaboutsShow = res.data.isCheckNoWhereabouts === '1' ? '是' : '否';
            _self.info.positionName = res.data.legalSupervisor.positionName;
            _self.info.userName = res.data.legalSupervisor.userName;
          }
        })
        .catch(err => {
          console.log(err);
        });
      _self.status.entryModal = true;
    },
    statusChange(value) {
      this.status.entryModal = value;
    },
    getEntryStatus(v) {
      if (v) {
        this.getTaskData();
      }
    },
    /**
     * @desc 待办接口API
     */
    getIncheckResultApi() {
      return this.$http
        .get(`/supervision/examineTask/getIncheckResult`, {
          params: {
            query:JSON.stringify(this.taskQuery)
          }
        })
        .then(res => {
          this.result.getIncheckResult = res.data.total;
          this.status.isLoading = false;
          return Promise.resolve(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * @desc 待办接口API
     */
    getFinishResultApi() {
      return this.$http
        .get(`/supervision/examineTask/getFinishResult`, {
          params: {
            query:JSON.stringify(this.taskQuery)
          }
        })
        .then(res => {
          this.result.getFinishResult = res.data.total;
          this.status.isLoading = false;
          return Promise.resolve(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  
  mounted() {
    this.taskColumns = this.taskColumns1;
    this.getIncheckResultApi().then(res => {
      this.taskData = res.data.data;
      this.totalNum = res.data.total;
      this.status.isLoading = false;
    });
    this.getFinishResultApi();
    this.getData();
    this.getTreeData();
  }
};
</script>

<style lang="less">
.treeDataCard .card-title-select {
  height: 33px;
  line-height: 33px;
}

.task-status  {
  .ivu-tabs-tabpane {
    display: none;
  }

  .ivu-table-wrapper {
    height: auto !important;

    .ivu-table-body {
    height: auto !important;

    }
  }
}
</style>