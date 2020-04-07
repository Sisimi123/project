<style lang="less">
@import "../../../styles/commonStyle.less";
.inputDiv {
  overflow: hidden;
  display: block;
  margin-bottom: 15px;
}
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/check/fuxiualarm/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="3">
              <RadioGroup v-model="query.wheres.status_eq" type="button" @on-change="statusChange">
                <Radio label="0">已结束</Radio>
                <Radio label="1">未结束</Radio>
              </RadioGroup>
            </Col>
            <Col span="4">
              <Form-item label="船名:">
                <Input v-model="query.wheres.shipname_like" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="开始时间:">
                <DatePicker type="datetime" placeholder="开始时间" v-model="query.wheres.createTime_gt"></DatePicker>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="结束时间:">
                <DatePicker type="datetime" placeholder="结束时间" v-model="query.wheres.createTime_lt"></DatePicker>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>

            <span style="float:right;">
              <Button @click="sms" type="primary">短信模板设置</Button>
              <Button @click="handleExport()" type="info">导出</Button>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <callPoliceSms
      ref="callPoliceSms"
      :type="type"
      :template="template"
      :title="smsTitle"
      :templateObj="templateObj"
    ></callPoliceSms>
  </div>
</template> 

<script>
import callPoliceSms from "./components/callPoliceSms";

export default {
  components: {
    callPoliceSms
  },
  data() {
    return {
      type: "fxy_bj",
      smsTitle: "伏休期出港预警短信模板",
      template: {
        template1: "内容"
      },
      templateObj: {
        template1: ""
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipname",
          align: "center"
        },
        {
          title: "港外报位经度",
          key: "firstLon",
          align: "center",
          render: (h, params) => {
            let firstLon = "";
            if (params.row.firstLon) {
              firstLon = this.getLon(params.row.firstLon);
            }
            return h("span", firstLon);
          }
        },
        {
          title: "港外报位维度",
          key: "firstLat",
          align: "center",
          render: (h, params) => {
            let firstLat = "";
            if (params.row.firstLat) {
              firstLat = this.getLat(params.row.firstLat);
            }
            return h("span", firstLat);
          }
        },
        {
          title: "港内报位经度",
          key: "lastLon",
          align: "center",
          render: (h, params) => {
            let lastLon = "";
            if (params.row.lastLon) {
              lastLon = this.getLon(params.row.lastLon);
            }
            return h("span", lastLon);
          }
        },
        {
          title: "港内报位维度",
          key: "lastLat",
          align: "center",
          render: (h, params) => {
            let lastLat = "";
            if (params.row.lastLat) {
              lastLat = this.getLat(params.row.lastLat);
            }
            return h("span", lastLat);
          }
        },
        {
          title: "港外报位时间",
          key: "firstPosTime",
          align: "center",
          render: (h, params) => {
            let firstPosTime = "";
            if (params.row.firstPosTime) {
              firstPosTime = this.getTime(params.row.firstPosTime);
            }
            return h("span", firstPosTime);
          }
        },
        {
          title: "港内报位时间",
          key: "lastPosTime",
          align: "center",
          render: (h, params) => {
            let lastPosTime = "";
            if (params.row.lastPosTime) {
              lastPosTime = this.getTime(params.row.lastPosTime);
            }
            return h("span", lastPosTime);
          }
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let type = params.row.type;
            if (type == "1") {
              type = "来自单船伏休报警";
            } else {
              type = "来自作业类型伏休报警";
            }
            return h("span", type);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status;
            if (status == "0") {
              status = "报警结束";
            } else {
              status = "报警还在进行中";
            }
            return h("span", status);
          }
        }
        // {
        //   title: "操作",
        //   key: "action",
        //   align: "center",
        //   width: "150px",
        //   render: (h, params) => {
        //     let buttons = [];
        //     buttons.push(
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.amend(params.row);
        //             }
        //           }
        //         },
        //         "修改"
        //       )
        //     ),
        //       buttons.push(
        //         h(
        //           "Button",
        //           {
        //             props: {
        //               type: "error",
        //               size: "small"
        //             },
        //             style: {
        //               marginRight: "5px"
        //             },
        //             on: {
        //               click: () => {
        //                 this.deleteList(params.row);
        //               }
        //             }
        //           },
        //           "删除"
        //         )
        //       );
        //     return h("div", buttons);
        //   }
        // }
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipname_like: "",
          status_eq: "",
          createTime_gt: '',
          createTime_lt: '',
          organId: "4409"
        }
        // orders: "updateTime desc"
      },
      data: []
    };
  },
  computed: {
    //  getFormItem() {
    //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    //  },
    //  defaultUserName() {
    //    return this.$store.state.user.userInfo.name;
    //  },
  },
  // 方法.事件
  methods: {
    sms() {
      this.$refs.callPoliceSms.modal = true;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    statusChange() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.shipname_like = "";
      this.query.wheres.status_eq = "";
      this.query.wheres.createTime_gt = "";
      this.query.wheres.createTime_lt = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    getTime(time) {
      var date = new Date(time * 1000);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second)
      let dates = y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      return dates;
    },
    getLon(lon) {
      lon = lon / 10000000;
      let lonDre;
      let lonMin;
      let lonSec;
      if (lon) {
        lonDre = parseInt(lon) + "°";
        lonMin = parseInt((lon - parseInt(lon)) * 60) + "'";
        lonSec =
          parseInt(
            ((lon - parseInt(lon)) * 60 -
              parseInt((lon - parseInt(lon)) * 60)) *
              60
          ) +
          " " +
          '"E';
      } else {
        lonDre = "";
        lonMin = "";
        lonSec = "";
      }
      return lonDre + " " + lonMin + " " + lonSec;
    },
    getLat(lat) {
      lat = lat / 10000000;
      let latDre;
      let latMin;
      let latSec;
      if (lat) {
        latDre = parseInt(lat) + "°";
        latMin = parseInt((lat - parseInt(lat)) * 60) + "'";
        latSec =
          parseInt(
            ((lat - parseInt(lat)) * 60 -
              parseInt((lat - parseInt(lat)) * 60)) *
              60
          ) +
          " " +
          '"N';
      } else {
        latDre = "";
        latMin = "";
        latSec = "";
      }
      return latDre + " " + latMin + " " + latSec;
    },
    isEmpty(s) {
      if (
        s == "" ||
        s == undefined ||
        s == null ||
        JSON.stringify(s) === "{}"
      ) {
        return true;
      }
      return false;
    },
    handleExport() {
      // 导出
      window.open(
        this.$basePath +
          "/check/fuxiualarm/exportExcel?query=" +
          encodeURI(JSON.stringify(this.query)))
    }
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
  }
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}

/*  以上是表格 */

/* .searColumn {
  padding: 10px 20px 10px 20px;
}
.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}
label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}

label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}

.selec {
  width: 120px;
}

.selec2 {
  width: 85px;
}

.both-white-padding {
  margin: 0 20px;
}

th.ivu-table-column-left div.ivu-table-cell {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-input {
  font-size: 12px;
  border: none;
  out-line: none;
  color: #000;
}
.el-input__inner {
  height: 32px;
  border: none;
  outline-style: none;
}
.text-required {
  display: inline-block;
  color: red;
}
.fk-box1 {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
}
.fk-title {
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  background: #f8f8f9;
}
.fk-content {
  margin: 10px 0px;
}
.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
}
.fk-text {
  float: left;
  width: 90%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 40px;
}
.fk-img {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 130px;
  height: 120px;
}
p.mark {
  font-size: 12px;
  margin: 0 auto;
}
input:disabled {
  border: none;
  background-color: #fff;
  color: #aca899;
} */

/* upload 样式 */
/* .demo-upload-list,
.qm-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.qm-upload-list {
  width: 200px;
  height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
} */
</style>
