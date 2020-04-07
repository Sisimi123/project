<style lang="less">
@import "./home.less";
@import "../../styles/common.less";
</style>
<template>
  <!-- 瑞安首页 -->
  <div class="home-main" style="overfolw-y:hidden">
    <Row :gutter="10">
      <Col span="15" :style="{marginTop: '10px'}">
        <Row :gutter="10">
          <Col class="margin-bottom-20" :xs="24" :sm="12" :md="8">
            <div @click="toShips()">
              <infor-card
                id-name="totalShip"
                :end-val="count.totalShip"
                iconType="ios-boat"
                :iconSize="60"
                color="#057EFF"
                titleText="渔船总数"
                height="130px"
              ></infor-card>
            </div>
          </Col>
          <Col class="margin-bottom-20" :xs="24" :sm="12" :md="8">
            <div @click="showA()">
              <infor-card
                id-name="totalAreaWorker"
                :end-val="count.totalAreaWorker"
                iconType="ios-people"
                :iconSize="60"
                color="#FF696A"
                titleText="从业人员总数"
                height="130px"
              ></infor-card>
            </div>
          </Col>
          <Col :xs="24" :sm="12" :md="8">
            <infor-card2
              id-name="weather"
              iconType="ios-sunny-outline"
              :iconSize="80"
              color="#78CBFE"
              height="130px"
            >
              <b>
                {{city}}{{text}}
                <br />
                {{code}}
                <br />
                {{wind}}
              </b>
              <!-- <b>{{code}} {{wind}}</b> -->
            </infor-card2>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="24" :style="{marginTop: '10px'}">
            <Card>
              <p slot="title" class="card-title-select">
                <span style="font-size:18px">渔船数据统计</span>
                <span>
                  <RadioGroup v-model="pieShipType.type">
                    <Radio label="1">作业类型</Radio>
                    <Radio label="2">渔船材质</Radio>
                    <Radio label="3">渔船大小</Radio>
                    <Radio label="4">渔船功率</Radio>
                  </RadioGroup>
                </span>
              </p>
              <div style="height:200px">
                <pieShipType
                  ref="pieShipType"
                  :areaCode="pieShipType.area"
                  :type="pieShipType.type"
                ></pieShipType>
              </div>
            </Card>
          </Col>
        </Row>
        <Row :gutter="10">
          <Col span="24" :style="{marginTop: '10px'}">
            <Card>
              <p slot="title" style="font-size:18px" class="card-title">渔船动态统计表</p>
              <Table height="295" border :columns="columns" :data="tableData"></Table>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span="9" :style="{marginTop: '10px'}">
        <Row :gutter="10">
          <Card>
            <p slot="title" class="card-title-select">
              <span style="font-size:18px; padding-right:20%">潮汐表</span>
              <span style="float:right; margin-top:2px">地区：</span>
              <Select style="float:right" size="small" v-model="tides.id" @on-change="setTidesId">
                <Option
                  :value="item.id"
                  v-for="item in tidesArr"
                  v-bind:key="item.id"
                >{{item.title}}</Option>
              </Select>
              <span style="float:right">
                <DatePicker
                  size="small"
                  type="date"
                  placeholder="Select date"
                  v-model="tides.date"
                  style="width: 150px;"
                ></DatePicker>
              </span>
            </p>
            <div style="height:180px">
              <tides :tidesDate="tides.date" :tidesId="tides.id"></tides>
            </div>
          </Card>
        </Row>
      </Col>
      <Col span="9" :style="{marginTop: '10px'}">
        <Row :gutter="10">
          <Card>
            <p slot="title" style="font-size:18px" class="card-title">从业人员分布统计</p>
            <div style="height:180px">
              <practitioner></practitioner>
            </div>
          </Card>
        </Row>
      </Col>
      <Col span="9" :style="{marginTop: '10px'}">
        <Row :gutter="10">
          <Card>
            <p slot="title" class="card-title-select">
              <span style="font-size:18px">持证情况统计</span>
            </p>
            <div style="height:180px">
              <pieAreaWorkerType :areaCode="pieAreaWorkerType.area" :areas="areas"></pieAreaWorkerType>
            </div>
          </Card>
        </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
import practitioner from "./components/ruian/practitioner";
import pieAreaWorkerType from "./components/ruian/pieAreaWorkerType";
import tides from "./components/ruian/tides";
import pieShipType from "./components/ruian/pieShipType";

// 统计的资料小卡片
import inforCard from "@/views/components/statisticsDemo/MyInfoCard.vue";
import inforCard2 from "@/views/components/statisticsDemo/MyInfoCardSlot.vue";

export default {
  name: "zshome",
  components: {
    tides,
    practitioner,
    inforCard,
    inforCard2,
    pieAreaWorkerType,
    pieShipType
  },
  data() {
    return {
      columns: [
        {
          title: "地区",
          align: "center",
          key: "name"
        },
        {
          title: "渔船总数",
          align: "center",
          key: "zs",
          render: (h, params) => {
            var _self = this;
            if (parseInt(params.row.zs) === 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.$router.push({
                          path: "/enforcement/achive/ships"
                        });
                      }
                    }
                  },
                  params.row.zs
                )
              ]);
            }
          }
        },
        {
          title: "在港渔船",
          align: "center",
          key: "zg",
          render: (h, params) => {
            var _self = this;
            if (parseInt(params.row.zg) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.query.wheres.mode = "3";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  params.row.zg
                )
              ]);
            }
          }
        },
        {
          title: "港外返航",
          align: "center",
          key: "fh",
          render: (h, params) => {
            var _self = this;
            if (parseInt(params.row.fh) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.query.wheres.mode = "7";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  params.row.fh
                )
              ]);
            }
          }
        },
        {
          title: "港外作业",
          align: "center",
          key: "zy",
          render: (h, params) => {
            var _self = this;
            if (parseInt(params.row.zy) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.query.wheres.mode = "4";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  params.row.zy
                )
              ]);
            }
          }
        },
        {
          title: "在线渔船",
          align: "center",
          key: "zs",
          render: (h, params) => {
            var str = "";
            str = params.row.zs - params.row.lx;
            if (str == 0) {
              return h("span", str);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        this.query.type = "4";
                        this.showmodes(params.row);
                      }
                    }
                  },
                  str
                )
              ]);
            }
          }
        },
        {
          title: "在线率",
          align: "center",
          key: "zs",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  class: "show",
                  style: { background: "#FFA800", color: "white" }
                },
                (100 -
                  parseInt(params.row.ycl.slice(0, params.row.ycl.length - 1))) +
                  "%"
              )
            ]);
            // return h(
            //     'div', {
            //         style: { color: '#FFA800' },
            //     }
            //     // {
            //     //     props: {
            //     //         type: 'warning'
            //     //     },
            //     //     on: {
            //     //     }
            //     // },
            //     // (100 - parseInt(params.row.ycl.slice(0, params.row.ycl.length - 2))) + '%'
            // );
          }
        },
        {
          title: "离线渔船",
          align: "center",
          key: "lx",
          render: (h, params) => {
            var _self = this;
            if (parseInt(params.row.lx) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.query.type = "2";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  params.row.lx
                )
              ]);
            }
          }
        },
        {
          title: "已点验",
          align: "center",
          render: (h, params) => {
            var _self = this;
            var bmd = params.row.bmd;
            var zs = params.row.zs;
            if (parseInt(zs - bmd) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.query.type = "1";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  parseInt(zs - bmd)
                )
              ]);
            }
          }
        },
        {
          title: "未点验",
          align: "center",
          key: "bmd",
          render: (h, params) => {
            return h(
              "span",
              {
                style: { color: "red" }
              },
              params.row.bmd
            );
          }
        },
        {
          title: "已核查",
          align: "center",
          render: (h, params) => {
            var _self = this;
            var lx = params.row.lx;
            var dhc = params.row.dhc;
            if (parseInt(lx - dhc) == 0) {
              return h("div", 0);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    style: { color: "#07CF99" },
                    on: {
                      click: () => {
                        _self.query.wheres.mode = "2";
                        _self.showmodes(params.row);
                      }
                    }
                  },
                  parseInt(lx - dhc)
                )
              ]);
            }
          }
        }
      ],
      tableData: [],
      less30: "",
      more30less40: "",
      more40less50: "",
      more50less60: "",
      other: "",
      more60: "",
      city: "",
      text: "",
      code: "",
      wind: "",
      // 数据概览
      shipList: [],
      count: {
        totalAreaWorker: 0, // 从业人员总数
        totalShip: 0, // 渔船总数
        onlineUser: 0
      },
      areas: [],
      shipType: "作业类型",
      status: {
        showB: false
      },
      tides: {
        date: "",
        id: "8000001"
      },
      pieShipType: {
        area: "4409",
        type: "1"
      },
      pieAreaWorkerType: {
        area: "4021",
        type: ""
      },
      query: {
        type: "1",
        wheres: {
          mode: "",
          organid: ""
        }
      },
      tidesArr: new Array()
    };
  },
  methods: {
    getTideList() {
      let sTypeArr = new Array();
      this.$http
        .post(`/map/tide/getAllTidePortPage`, {
          page: 1,
          size: 2147483647,
          wheres: {
            encountry: "China"
          }
        })
        .then(res => {
          var data = res.data.data;
          for (let ele in data) {
            var eleObj = data[ele];
            if (sTypeArr.length == 0) this.tides.id = data[ele].id;
            sTypeArr.push({
              id: data[ele].id,
              title: eleObj.cnname
            });
          }
          this.tidesArr = sTypeArr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    showmodes(row) {
      this.query.wheres.organid = row.id;
      var _self = this;
      this.$router.push({
        path: "/enforcement/shipsdy/dylistjump",
        query: {
          type: _self.query.type,
          organid: _self.query.wheres.organid,
          mode: _self.query.wheres.mode
        }
      });
    },
    showA() {
      console.log(1111111);
      this.$router.push({
        path: "/enforcement/achive/crews",
        query: {
          areaCode: this.pieAreaWorkerType.area
        }
      });
    },
    showB() {
      this.status.showB = true;
      this.shipList.forEach(element => {
        element = 0;
      });
      this.$http
        .get("/shiparchives/nybstatistics/areaShip", {
          params: {
            node: "330900"
          }
        })
        .then(res => {
          this.shipList = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    initTable() {
      var _self = this;
      _self.$http
        .get("/check/dy/statistic")
        .then(res => {
          _self.tableData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    toShips() {
      this.$router.push({
        path: "/enforcement/achive/ships",
        query: {
          // areaCode: item.codefishingArea
          areaCode: this.pieAreaWorkerType.area
        }
      });
    },
    setTidesId(val) {
      this.tides.id = val;
    }
    // pieAreaWorkerTypeChange(val){
    //     if(val == '330900'){
    //         this.pieAreaWorkerType.type = "2";
    //     } else {
    //         this.pieAreaWorkerType.type = "3";
    //     }
    // }
  },
  mounted() {
    this.initTable();
    this.getTideList();
    this.tides.date = new Date();
    // this.$http.get("/shiparchives/nybstatistics/xAxis")
    // .then(res => {
    //     let data = res.data
    //     this.areas = data
    //     this.pieAreaWorkerType.area = data[0].code
    //     this.pieAreaWorkerType.type = data[1].type
    //     this.pieShipType.area = data[0].code
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    this.$http
      .get("/checks/shipsailor/areaWorker", {
        params: {
          areaCode: "330381",
          type: "3"
        }
      })
      .then(res => {
        console.log(res, "areaWorker");
        if (res.success) {
          this.count.totalAreaWorker = res.data[0].count;
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.$http
      .get("/ruian/index/shipcount")
      .then(res => {
        if (res.success) {
          this.count.totalShip = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.$http
      .get("/scd/onlineCount")
      .then(res => {
        if (res.success) {
          this.count.onlineUser = res.data;
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.$http
      .get("/cms/weather/getWeather")
      .then(res => {
        var w = res.data;
        this.city = w.name;
        this.text =
          w.text_day == w.text_night
            ? w.text_day
            : w.text_day + "转" + w.text_night;
        this.code = w.low + "℃~" + w.high + "℃";
        this.wind = w.wind_direction + "风 " + w.wind_scale + "级";
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped lang="less">
.ageDistributed {
  height: 55%;
  width: 100%;
  border-bottom: 1px dashed #000;
  .ageDistributed_div {
    float: left;
    width: 33%;
    height: 100%;
    margin-bottom: 10px;
    img {
      float: left;
      height: 60%;
      width: 40%;
      // position:relative;
      // top:20%;
    }
    span {
      float: left;
      height: 50%;
      margin-left: 5px;
    }
    p {
      font-size: 18px;
      color: #4c95fd;
    }
  }
}
.ageDistributed2 {
  height: 45%;
  width: 100%;
  .ageDistributed2_div {
    float: left;
    width: 33%;
    height: 100%;
    img {
      float: left;
      height: 70%;
      width: 40%;
    }
    span {
      float: left;
      height: 50%;
      margin-left: 5px;
    }
    p {
      font-size: 18px;
      color: #4c95fd;
    }
  }
}
// .ivu-card-head {
//     border-bottom: none;
//     padding: 14px 16px;
//     line-height: 1;
// }
.card-title {
  height: 20px;
}
.card-title-select {
  height: 24px;
  display: flex;
  justify-content: space-between;
}
/* .ivu-col{
    margin-bottom: 10px;
} */

.weather-card {
  height: 100px;
  width: 100%;
  border-radius: 5px;
}
</style>
