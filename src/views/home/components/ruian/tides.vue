<template>
  <div style="width:100%;height:100%;">
    <div
      class="tides_label"
    >全天最高:{{tide_height_max}}m({{tide_height_max_time}}) 全天最低:{{tide_height_min}}m({{tide_height_min_time}})</div>
    <div style="width:100%;height:100%;" id="tides"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  props: {
    tidesDate: "",
    tidesId: "",
  },
  data() {
    return {
      tide_height_max: "",
      tide_height_max_time: "",
      tide_height_min: "",
      tide_height_min_time: "",
      startDate:"",
      endDate:"",
      sTypeArr: new Array(),
      defId: "8000001",
    };
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$http
          .get(
            `/map/tide/getSinglePortTide?id=` + this.defId + `&sDate=${this.startDate}&eDate=${this.endDate}`
          )
          .then(res => {
            if (!res.data) {
              return;
            }
            let legendData = [];
            let data = [];
            let overview = res.data.overview[1];
            let heightArr = [overview.tide_height1, overview.tide_height2, overview.tide_height3, overview.tide_height4];
            let timeArr = [overview.tide_time1, overview.tide_time2, overview.tide_time3, overview.tide_time4];
            let maxIndex = 0, minIndex = 0, maxTemp = -1, minTemp = -1;
            for (let loop = 0, m = heightArr.length; loop < m; loop++) {
              let height = heightArr[loop];
              if (!height || height=="")
                continue;
              if (maxTemp==-1) {
                maxTemp = height;
              } else if (height > maxTemp) {
                maxTemp = height;
                maxIndex = loop;
              }
              if (minTemp==-1) {
                minTemp = height;
              } else if (height < minTemp) {
                minTemp = height;
                minIndex = loop;
              }
            }
            this.tide_height_max = heightArr[maxIndex];
            this.tide_height_max_time = timeArr[maxIndex];
            this.tide_height_min = heightArr[minIndex];
            this.tide_height_min_time = timeArr[minIndex];
            let detail = res.data.detail[1];
            delete detail.date;
            for (let k in detail) {
              legendData.push(k);
              data.push(detail[k]);
            }
            var option = {
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: legendData,
                axisTick: {
                  // false 为去掉坐标轴刻线
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: "dashed"
                  }
                }
              },
              tooltip: {
                trigger: "axis",
                formatter: "当前潮高:{c}m"
              },
              grid: {
                left: "3%",
                top: 10,
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              yAxis: {
                type: "category",
                axisLabel: {
                  formatter: "{value} m"
                },
                axisTick: {
                  // false 为去掉坐标轴刻线
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: "dashed"
                  }
                },
                boundaryGap: false,
                data: ["0", "1", "2", "3", "4", "5", "6", "7"]
              },
              series: [
                {
                  type: "line",
                  smooth: false,
                  symbolSize: 5,
                  itemStyle: {
                    normal: {
                      color: "#057eff"
                    }
                  },
                  lineStyle: {
                    normal: {
                      width: 2,
                      color: "#057eff"
                    }
                  },
                  data: data
                }
              ]
            };
            var dataSource = echarts.init(document.getElementById("tides"));
            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            dataSource.setOption(option);
            // dataSource.on('click',function(params){
            //     console.log(params,'params')
            // })
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  watch: {
    tidesDate(val) {
        let sDate =  new Date(val.getTime() - 24*60*60*1000);
        let year = sDate.getFullYear()
        let month = sDate.getMonth() + 1
        let day = sDate.getDate()
        this.startDate = `${year}-${month<10?"0"+month:month}-${day<10?"0"+day:day}`
        let eDate =  new Date(val.getTime());
        let eYear = eDate.getFullYear()
        let eMonth = eDate.getMonth() + 1
        let eDay = eDate.getDate()
        this.endDate = `${eYear}-${eMonth<10?"0"+eMonth:eMonth}-${eDay<10?"0"+eDay:eDay}`
        this.init()
    },
    tidesId(id){
      this.defId = id;
      this.init();
    }
  }
};
</script>

<style scoped>
.tides_label {
  position: absolute;
  left: 30%;
  font-size: 12px;
  top: 55px
}
</style>