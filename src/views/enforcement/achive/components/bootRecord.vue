<template>
  <Modal v-model="show" title="渔船开机记录" width="1000">
    <Form :label-width="64" @submit.native.prevent>
      <Row>
        <Col span="7">
          <Form-item label="开始时间:">
            <DatePicker
              type="datetime"
              placeholder="开始时间"
              style="width: 200px"
              v-model="query.wheres.beginTime"
            ></DatePicker>
          </Form-item>
        </Col>
        <Col span="7">
          <Form-item label="结束时间:">
            <DatePicker
              type="datetime"
              placeholder="结束时间"
              style="width: 200px"
              v-model="query.wheres.endTime"
            ></DatePicker>
          </Form-item>
        </Col>
        <div class="btn-wrap">
          <Button @click="init()" type="primary" icon="ios-search">搜索</Button>
          <Button @click="handleReset()">重置</Button>
        </div>
      </Row>
    </Form>
    <div class="bootRecordBox">
      <div style="width:100%;height:100%;" id="bootRecord"></div>
    </div>
    <div slot="footer">
      <Button @click="cancel" type="primary">确定</Button>
    </div>
  </Modal>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    getShipid: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipid: "",
          beginTime: "",
          endTime: ""
        }
      }
    };
  },
  methods: {
    handleReset() {
        this.query.wheres.beginTime = ''
        this.query.wheres.endTime = ''
        this.init()
    },
    init() {
      this.show = true
      this.$nextTick(() => {
        this.query.wheres.shipid = this.getShipid;
        let params = new URLSearchParams();
        let query = JSON.stringify(this.query);
        params.append("query", query);
        this.$http
          .get("/bootTime/statistic", {
            params: params
          })
          // 返回值
          .then(res => {
            console.log(res, "statistic");
            if (res.success) {
              let test = echarts.init(document.getElementById("bootRecord"));
              let datelist = res.data.datelist;
              let timelist = res.data.timelist;
              let countlist = res.data.countlist;
              for (let i in datelist) {
                datelist[i] = datelist[i].substring(0, 10);
              }
              for (let i in timelist) {
                timelist[i] = (timelist[i] / 3600).toFixed(2);
              }
              const option = {
                // title: {
                //   text: "",
                //   textStyle: {
                //     color: "#999", //标题颜色
                //     fontSize: 18,
                //     fontStyle: "normal",
                //     fontWeight: "normal"
                //   },
                //   x: 20,
                //   y: 20
                // },
                tooltip: {
                  trigger: "axis"
                },
                legend: {
                //   top: 66,
                //   left: 80,
                  textStyle: {
                    //图例文字的样式
                    color: "#999",
                    fontSize: 12
                  },
                  icon: "roundRect",
                  data: ["时长", "报位点数"]
                },
                xAxis: [
                  {
                    type: "category",
                    boundaryGap: false,
                    splitLine: { show: true }, //去除网格线
                    splitArea: { show: false }, //去除网格区域
                    axisTick: {
                      alignWithLabel: true
                    },
                    axisLine: {
                      lineStyle: {
                        type: "solid",
                        color: "#999", //左边线的颜色
                        width: "2" //坐标线的宽度
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: "#999" //坐标值得具体的颜色
                      }
                    },
                    data: datelist
                  }
                ],
                yAxis: [
                  {
                    type: "value",
                    name: "小时",
                    splitLine: { show: true }, //去除网格线
                    splitArea: { show: false },
                    axisLine: {
                      lineStyle: {
                        type: "solid",
                        color: "#999",
                        width: "2"
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: "#999"
                      }
                    },
                    position: "left"
                  },
                  {
                    type: "value",
                    name: "次",
                    splitLine: { show: false }, //去除网格线
                    splitArea: { show: false },
                    axisLine: {
                      lineStyle: {
                        type: "solid",
                        color: "#999",
                        width: "2"
                      }
                    },
                    axisLabel: {
                      textStyle: {
                        color: "#999"
                      }
                    },
                    position: "right"
                  }
                ],
                series: [
                  {
                    name: "时长",
                    type: "line",
                    yAxisIndex: 0,
                    data: timelist,
                    //   symbol: "none", //这句就是去掉点的
                    //   smooth: true, //这句就是让曲线变平滑的
                    itemStyle: {
                      normal: {
                        color: "#5793f3" // 折线条的颜色
                      }
                    }
                  },
                  {
                    name: "报位点数",
                    type: "line",
                    yAxisIndex: 1,
                    data: countlist,
                    itemStyle: {
                      normal: {
                        color: "#d14a61" // 折线条的颜色
                      }
                    }
                  }
                ]
              };
              test.setOption(option);
            } else {
                this.$Message.error(res.msg)
            }
          })
          .catch(error => {});
      });
    },
    cancel(){
        this.show = false
    }
  },
  watch: {
    // show(val) {
    //   if (val) {
    //     this.init();
    //   }
    // }
  }
};
</script>

<style scoped>
.bootRecordBox {
  width: 100%;
  height: 500px;
}
</style>