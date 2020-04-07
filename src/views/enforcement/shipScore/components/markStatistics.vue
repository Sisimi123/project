<template>
    <div :style="'width:100%;height:'+ tableHeight +'px;'" id="visite_volume_con2"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "visiteVolume",
  data() {
    return {
      allData: [],
      dataOne: [],
      dataTwo: [],
      dataThree: [],
      height: "500",
      length: 0
    };
  },
  computed: {
    tableHeight() {
      if (this.length == 0) {
        return 400;
      } else {
        return this.length * 60 + 120;
      }
    }
  },
  methods: {
    setOption(dataSource) {},
    init() {
      this.$nextTick(() => {
        this.$http
          .get("/enforces/shipscorestatistics/matter")
          .then(res => {
            var data = res.data;
            this.length = data.length;
            var document = window.document.getElementById("visite_volume_con2");
            document.style.height = 100 + data.length * 60 + "px";
            var dataSourcePie = echarts.init(document);
            window.addEventListener("resize", function() {
              dataSourcePie.resize();
            });
            var dataX = [];
            var dataY = [];
            data.forEach(element => {
              dataX.push(element.value);
              dataY.push(element.name);
            });
            var option = {
              color:["#ffc032"],
              color:['#0F81FB', '#13D6DD', '#00CC97','#FCB408', '#F4DD52', '#FF6B52','#A975F4','#5E60E9','#5354D1', '#ed3f14'],
              
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: [
                {
                  type: "value"
                }
              ],
              yAxis: [
                {
                  type: "category",
                  data: dataY,
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],

              series: [
                {
                  name: "事件数",
                  type: "bar",
                  barWidth: "60%",
                  data: dataX,
                  itemStyle: {
                    // normal: {
                    //   color: function (params){
                    //     var colorList = ['#ff4844','#9ac3e5','#66ac52','#ffc032','#549bd3','#f47e39'];
                    //     return colorList[params.dataIndex];
                    //   }
                    // }
                  }
                }
              ]
            };
            dataSourcePie.setOption(option);
            dataSourcePie.resize();
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
  watch: {}
};
</script>
