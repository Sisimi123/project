<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <!-- 浙江首页 -->
  <div class="home-main">
    <!-- 数据概览模块 -->
    <Row :gutter="10">
      <Col>
        <!-- <Row>
                    <Card style="margin-bottom:6px" v-show="true">
                        <p>
                            <Icon type="ios-pulse-strong"></Icon>
                            选择统计日期： 
                            <DatePicker v-if="dPReset" :value="defaultData[1]" split-panels format="yyyy年MM月dd日" type="date" :options="options" placeholder=" " style="width: 135px" @on-change="datePickerHandle"></DatePicker>
                            <Button style="margin_left:10px" type="primary" @click="init">确认</Button>
                        </p>
                    </Card>
        </Row>-->
        <Row :gutter="7">
          <div @click="getUserPage('online')">
            <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
              <infor-card
                id-name="userVisit"
                :end-val="count.userVisit"
                iconType="ios-shuffle"
                color="#f25e43"
                intro-text="当前在线用户数"
              ></infor-card>
            </Col>
          </div>
          <div @click="getUserPage('register')">
            <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
              <infor-card
                id-name="signinCount"
                :end-val="count.signinCount"
                iconType="ios-eye"
                color="#64d572"
                :iconSize="50"
                intro-text="月注册量"
              ></infor-card>
            </Col>
          </div>
          <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="activeUser"
              :end-val="count.activeUser"
              iconType="ios-person"
              color="#2d8cf0"
              intro-text="月活跃用户"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="dataSize"
              :end-val="count.dataSize"
              iconType="ios-shuffle"
              color="#f25e43"
              intro-text="月数据量"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="agriculturalData"
              :end-val="count.agriculturalData"
              iconType="md-cloud-upload"
              color="#ffd572"
              intro-text="月农业部交换数据量"
            ></infor-card>
          </Col>
          <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
            <infor-card
              id-name="sosData"
              :end-val="count.sosData"
              iconType="ios-shuffle"
              color="#f25e43"
              intro-text="月救助交换数据量"
            ></infor-card>
          </Col>
        </Row>
      </Col>
    </Row>
    <!-- 用户登录与活跃度,流失\潜在流失\活跃\正常用户 -->
    <Row :gutter="10">
      <!-- 流失\潜在流失\活跃\正常用户 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>用户分析
          </p>
          <div style="position: absolute;right:0px;top:15px">
            <CheckboxGroup v-model="userType">
              <Checkbox label="管理用户"></Checkbox>
              <Checkbox label="注册用户"></Checkbox>
            </CheckboxGroup>
          </div>
          <div style="height:400px;overflow-y:auto;" class="data-source-row">
            <active-and-lost
              ref="activeAndLost"
              :defaultData="this.defaultData"
              :userType="this.userType"
            ></active-and-lost>
          </div>
        </Card>
      </Col>
      <!-- 用户登录与活跃度 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>用户登录与活跃人数
          </p>
          <div style="height:400px;overflow-y:auto;" class="data-source-row">
            <login-and-active ref="loginAndActive" :defaultData="this.defaultData"></login-and-active>
          </div>
        </Card>
      </Col>
    </Row>
    <!-- 热力图模块 -->
    <Row :gutter="10">
      <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>登录用户终端分布
          </p>
          <div style="height:533px" class="data-source-row">
            <data-source-pie ref="dataSourcePie" :defaultData="this.defaultData"></data-source-pie>
          </div>
        </Card>
      </Col>
      <Col :md="24" :lg="16" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="map"></Icon>活跃用户热力图
          </p>
          <div style="height:533px" class="map-con">
            <Col :md="24" :lg="24" span="19" class="map-incon">
              <Row type="flex" justify="center" align="middle">
                <home-map
                  ref="homeMap"
                  :defaultData="this.defaultData"
                  style="width:100%;height:530px"
                ></home-map>
              </Row>
            </Col>
          </div>
        </Card>
      </Col>
    </Row>
    <Row :gutter="10">
      <!-- 活跃用户TOP10 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="android-wifi"></Icon>活跃用户TOP10
          </p>
          <div style="height:400px;overflow-y:auto;" class="data-source-row">
            <Table style="min-height:400px" :columns="topList" :data="topListData"></Table>
          </div>
        </Card>
      </Col>
      <!-- 农业部交换数据 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>农业部交换数据
          </p>
          <div style="height:400px;overflow-y:auto;" class="data-source-row">
            <agricultural-data-chart ref="agriculturalDataChart" :defaultData="this.defaultData"></agricultural-data-chart>
          </div>
        </Card>
      </Col>
    </Row>
    <Row :gutter="10">
      <!-- 模块点击热度 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>接口调用量
          </p>
          <div style="height:400px" class="data-source-row">
            <click-heat ref="clickHeat" :defaultData="this.defaultData"></click-heat>
          </div>
        </Card>
      </Col>
      <!-- 救助交换数据 -->
      <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-pulse-strong"></Icon>救助交换数据
          </p>
          <div style="height:400px" class="data-source-row">
            <sos-data-chart ref="sosDataChart" :defaultData="this.defaultData"></sos-data-chart>
          </div>
        </Card>
      </Col>
    </Row>
    <Modal :title="title" v-model="modal" width="700">
      <Table :columns="columns" border :data="tableData" :height="360"></Table>
      <div slot="footer">
          <Button @click="modal = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 统计的资料小卡片
import inforCard from "./components/inforCard.vue";
// 用户登录与活跃度
import loginAndActive from "./components/loginAndActive.vue";
// 流失\潜在流失\活跃\正常用户
import activeAndLost from "./components/activeAndLost.vue";
// 活跃用户TOP10详细信息资料卡
import expandRow from "./components/table-expand.vue";
// 设备分布饼形图
import dataSourcePie from "./components/dataSourcePie.vue";
// 地图数据图表
import mapDataTable from "./components/mapDataTable.vue";
// IP热力图地图
import homeMap from "./components/map.vue";
// 农业部交换数据
import agriculturalDataChart from "./components/agriculturalDataChart.vue";
// 救助交换数据
import sosDataChart from "./components/sosDataChart.vue";
// 接口调用量
import clickHeat from "./components/clickHeat.vue";

export default {
  name: "home",
  components: {
    inforCard,
    loginAndActive,
    activeAndLost,
    expandRow,
    dataSourcePie,
    mapDataTable,
    homeMap,
    agriculturalDataChart,
    sosDataChart,
    clickHeat
  },
  data() {
    // 默认日期(今日)
    var nowDate = new Date();
    var str =
      nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1) +
      "-" +
      nowDate.getDate();
    var defaultDateInit = new Array();
    defaultDateInit[0] = str;
    defaultDateInit[1] = str;
    this.defaultData = defaultDateInit;

    return {
      dPReset: false,
      // 用户种类
      userType: ["管理用户", "注册用户"], // ADMIN OWNER USER
      // 默认日期
      defaultData: defaultDateInit,

      options: {
        disabledDate(date) {
          return (
            date.valueOf() < Date.now() - 86400000 ||
            date.valueOf() > Date.now()
          );
        }
      },
      // 数据概览
      count: {
        signinCount: 0, // 注册量
        activeUser: 0, // 活跃用户
        dataSize: 0, // 数据量
        userVisit: 0, // 用户访问量
        agriculturalData: 0, // 农业部交换数据
        sosData: 0 // 救助系统交换数据
      },
      // 活跃用户TOP10资料卡
      topList: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "注册时间",
          key: "createTime"
        }
      ],
      title:"",
      topListData: [],
      modal: false,
      tableData: [],
      query: {
        page: 1,
        size: 999,
        wheres: {
          type: ""
        }
      },
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "name",
          align: "center"
        },
        {
          title: "登录名",
          key: "username",
          align: "center"
        },
        {
          title: "部门名",
          key: "deptname",
          align: "center"
        },
        {
          title: "注册时间",
          key: "createTime",
          align: "center"
        }
      ]
    };
  },
  methods: {
    getUserPage(type) {
      if (type === "online") {
        this.title = "用户在线列表";
      } else {
        this.title = "用户注册列表";
      }
      this.modal = true;
      this.query.wheres.type = type;
      let params = new URLSearchParams();
      let query = JSON.stringify(this.query);
      params.append("query", query);
      this.$http
        .get("/scd/getUserPage", {
          params: params
        })
        .then(res => {
          if (res.success) {
            this.tableData = res.data.data;
          }
        });
    },
    datePickerHandle(date) {
      var _self = this;
      var date0 = date
        .replace(/年/g, "-")
        .replace(/月/g, "-")
        .replace(/日/g, "");
      _self.defaultData[0] = date0;
      _self.defaultData[1] = date0;
    },
    getOnlineCount() {
      var _self = this;
      this.$http.get("/scd/onlineCount").then(function(result) {
        if (result.success) {
          var resultData = result.data;
          _self.count.userVisit = Number(resultData); // 用户访问量
        }
      });
    },
    getInfoCardData() {
      var _self = this;
      this.$http
        .get("/scd/infoCard", {
          params: {
            startingDate: _self.defaultData[0],
            endDate: _self.defaultData[1]
          }
        })
        .then(function(result) {
          if (result.success) {
            if (result.data != "null") {
              var resultData = JSON.parse(result.data);
              _self.count.signinCount = resultData.getSigninCount; // 注册量
              _self.count.activeUser = resultData.getActiveUser; // 活跃用户
              _self.count.dataSize = resultData.getDataSize; // 数据量
              _self.count.agriculturalData = resultData.getAgriculturalData; // 农业部交换数据
              _self.count.sosData = resultData.getSosData; // 救助系统交换数据
            }
          }
        });
    },
    getExpandRowData() {
      var _self = this;
      this.$http
        .get("/scd/expandRow", {
          params: {
            startingDate: this.defaultData[0],
            endDate: this.defaultData[1]
          }
        })
        .then(function(result) {
          if (result.success) {
            var resultData = JSON.parse(result.data);
            _self.topListData = resultData.TopInfo;
          }
        });
    },
    getEarlyDate() {
      var _self = this;
      this.$http.get("/scd/earlyDate").then(function(result) {
        if (result.success) {
          var resultData = result.data;
          _self.earlyDate = Number(resultData);
          var x = {
            disabledDate(date) {
              return (
                date.valueOf() < Date.now() - resultData ||
                date.valueOf() > Date.now()
              );
            }
          };
          _self.options = x;
          _self.dPReset = true;
        }
      });
    },
    init() {
      this.getEarlyDate();
      this.getInfoCardData();
      this.getOnlineCount();
      this.getExpandRowData();
      this.$refs.activeAndLost.init();
      this.$refs.loginAndActive.init();
      this.$refs.dataSourcePie.init();
      this.$refs.homeMap.init();
      this.$refs.agriculturalDataChart.init();
      this.$refs.clickHeat.init();
      this.$refs.sosDataChart.init();
    }
  },
  mounted() {
    /////////////////////////////
    // 测试请求,用于更新统计数据 //
    // 不用时请删掉             //
    /////////////////////////////

    // var _self=this;
    // this.$http.get("/scd/init",{})
    // .then(function(result){
    //     console.log("*************do initialize *************")
    // });

    /////////////////////////////

    // 子组件自动加载了方法
    this.getEarlyDate();
    this.getInfoCardData();
    this.getOnlineCount();
    this.getExpandRowData();
  }
};
</script>
