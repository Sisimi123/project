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
      :url="'/statistic/earlyWarning/getCrashObjectWarning'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="开始时间:">
                <DatePicker type="date" placeholder="开始时间" v-model="query.wheres.begin"></DatePicker>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="结束时间:">
                <DatePicker type="date" placeholder="结束时间" v-model="query.wheres.end"></DatePicker>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="船名:">
                <Input v-model="query.wheres.search" placeholder="请输入..."></Input>
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
      type: "fyjpc_bj",
      smsTitle: "碰桥渔船预警短信模板",
      template: {
        template1: "内容",
      },
      templateObj: {
        template1: "",
      },
      model: false,
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
        // {
        //   title: "区域报警类型",
        //   key: "type",
        //   align: "center",
        //   render: (h, params) => {
        //     let type = "";
        //     if (params.row.lon) {
        //       if (params.row.lon == "1") {
        //         type = "区域报警";
        //       } else if (params.row.lon == "2") {
        //         type = "落单渔船报警";
        //       } else {
        //         type = "不开机渔船";
        //       }
        //     }
        //     return h("span", type);
        //   }
        // },
        {
          title: "经度",
          key: "lon",
          align: "center",
          render: (h, params) => {
            let lon = "";
            if (params.row.lon) {
              lon = this.getLon(params.row.lon);
            }
            return h("span", lon);
          }
        },
        {
          title: "维度",
          key: "lat",
          align: "center",
          render: (h, params) => {
            let lat = "";
            if (params.row.lat) {
              lat = this.getLat(params.row.lat);
            }
            return h("span", lat);
          }
        },
        {
          title: "报位时间",
          key: "postime",
          align: "center",
          render: (h, params) => {
            let postime = "";
            if (params.row.postime) {
              postime = this.getTime(params.row.postime);
            }
            return h("span", postime);
          }
        },
        // {
        //   title: "终端类型",
        //   key: "termtype",
        //   align: "center",
        // },
        {
          title: "设备编码",
          key: "termno",
          align: "center"
        },
        {
          title: "航速(节)",
          key: "sog",
          align: "center",
          render: (h, params) => {
            let sog = "";
            if (params.row.sog) {
              sog = params.row.sog / 10;
            }
            return h("span", sog);
          }
        },
        {
          title: "船首向(度)",
          key: "heading",
          align: "center",
          render: (h, params) => {
            let heading = "";
            if (params.row.heading) {
              heading = params.row.heading / 10;
            }
            return h("span", heading);
          }
        },
        {
          title: "渔区",
          key: "grid",
          align: "center"
        },
        {
          title: "是否在港",
          key: "port",
          align: "center",
          render: (h, params) => {
            let port = "";
            if (params.row.port) {
              if (params.row.port == "0") {
                port = "港内";
              } else {
                port = "港外";
              }
            }
            return h("span", port);
          }
        },
        {
          title: "是否在线",
          key: "offline",
          align: "center",
          render: (h, params) => {
            let offline = "";
            if (params.row.offline) {
              if (params.row.offline == "0") {
                offline = "在线";
              } else {
                offline = "离线";
              }
            }
            return h("span", offline);
          }
        },
        {
          title: "是否在编",
          key: "outgroup",
          align: "center",
          render: (h, params) => {
            let outgroup = "";
            if (params.row.outgroup) {
              if (params.row.outgroup == "0") {
                outgroup = "在编";
              } else {
                outgroup = "离编";
              }
            }
            return h("span", outgroup);
          }
        },
        // {
        //   title: "区域类型",
        //   key: "category",
        //   align: "center",
        //   render: (h, params) => {
        //     let category = params.row.category;
        //     if (category == "2") {
        //       category = "电子栅栏";
        //     } else if (category == "6") {
        //       category = "保护区";
        //     } else if (category == "11") {
        //       category = "重点海域";
        //     } else {
        //       category = "休闲渔船跨区生产";
        //     }
        //     return h("span", category);
        //   }
        // },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status;
            if (status == "0") {
              status = "当前数据";
            } else if (status == "1") {
              status = "历史数据";
            } else if (status == "2") {
              status = "临时数据";
            } else {
              status = "异常数据";
            }
            return h("span", status);
          }
        },
        {
          title: "航行状态",
          key: "sailStatus",
          align: "center",
          render: (h, params) => {
            let sailStatus = "";
            if (params.row.sailStatus) {
              if (params.row.sailStatus == "0") {
                sailStatus = "出航";
              } else {
                sailStatus = "返航";
              }
            }
            return h("span", sailStatus);
          }
        }
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          search: "",
          begin: "",
          end: "",
          organId: "4409"
        }
        // orders: "updateTime desc"
      },
      data: [],
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
    handleReset() {
      this.query.wheres.shipname_like = "";
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
    cancel(name) {
      this.$refs["info"].resetFields();
      this.showDetail = false;
    },
    handleExport() {
      // 导出
      window.open(
        this.$basePath +
          "/checks/inOutPortMonitor/exportExcel?query=" +
          encodeURI(JSON.stringify(this.query)))
    },
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
</style>
