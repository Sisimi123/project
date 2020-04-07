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
      :url="'/statistics/fenceAlarm/page'"
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
              <!-- <Button @click="handleExport()" type="info">导出</Button> -->
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <callPoliceSms
      ref="callPoliceSms"
      :labelWidth="110"
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
      type: "dzzl_yj",
      smsTitle: "电子栅栏预警短信模板",
      template: {
        template1: '10海里短信模板',
        template2: '5海里短信模板',
        template3: '短信发送人'
      },
      templateObj: {
        template1: "",
        template2: '',
        template3: ''
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
        {
          title: "报警类型",
          key: "phase",
          align: "center",
          render: (h, params) => {
            let phase = "";
            if (params.row.phase) {
              if (params.row.phase == "1") {
                phase = "10海里以内范围预警";
              } else if (params.row.phase == "2") {
                phase = "5海里以内预警";
              } else if(params.row.phase == "3"){
                phase = "报警结束";
              }
            }
            return h("span", phase);
          }
        },
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
        // {
        //   title: "航行状态",
        //   key: "sailStatus",
        //   align: "center",
        //   render: (h, params) => {
        //     let sailStatus = "";
        //     if (params.row.sailStatus) {
        //       if (params.row.sailStatus == "0") {
        //         sailStatus = "出航";
        //       } else {
        //         sailStatus = "返航";
        //       }
        //     }
        //     return h("span", sailStatus);
        //   }
        // }
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
          type_eq: "1",
          category_eq: "15",
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
      this.query.wheres.createTime_gt = "";
      this.query.wheres.createTime_lt = "";
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
    cancel(name) {
      this.$refs["info"].resetFields();
      this.showDetail = false;
    },
    handleExport() {
      // 导出
      window.open(
        this.$basePath +
          "/map/alarm/exportExcel?query=" +
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
