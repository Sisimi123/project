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
      :url="'/map/alarm/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
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
      type: "ldyc_bj",
      smsTitle: "落单渔船报警短信模板",
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
          type_eq: "2",
          category_eq: "",
          createTime_gt: "",
          createTime_lt: "",
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
      this.query.wheres.createTime_gt = ""
      this.query.wheres.createTime_lt = ""
      this.$refs.test.initSearch();
    },
    selectChange() {},
    onSelectShip(row) {
      this.info = row;
    },
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
    addList() {
      this.showDetail = true;
      this.title = "新增";
      this.info = {};
    },
    amend(row) {
      this.showDetail = true;
      this.title = "修改";
      this.info = row;
    },
    deleteList(row) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http.delete("/check/shipsBackPort/" + row.id).then(res => {
            console.log(res);
            if (res.success) {
              this.initSearch();
              this.$Message.info("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
          });
        },
        onCancel: () => {}
      });
    },
    submitData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.title);
          if (this.title == "新增") {
            this.$http.post("/check/shipsBackPort", this.info).then(res => {
              if (res.success) {
                this.initSearch();
                this.showDetail = false;
                this.$Message.info("新增成功");
              } else {
                this.$Message.error("新增失败");
              }
            });
          } else {
            this.$http
              .put(`/check/shipsBackPort/${this.info.id}`, this.info)
              .then(res => {
                if (res.success) {
                  this.initSearch();
                  this.showDetail = false;
                  this.$Message.info("修改成功");
                } else {
                  this.$Message.error("修改失败");
                }
              });
          }
        } else {
          this.$Message.error("填写存在错误");
          return;
        }
      });
    },
    handleExport() {
      // 导出
      window.open(
        this.$basePath +
          "/map/alarm/exportExcel?query=" +
          encodeURI(JSON.stringify(this.query)))
    },
    cancel(name) {
      this.$refs["info"].resetFields();
      this.showDetail = false;
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
