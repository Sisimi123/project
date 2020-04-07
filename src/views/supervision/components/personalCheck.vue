<template>
  <div style="width:100%;height:280px;" id="personalCheck"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "personalCheckVue",
  props: {
    params: {
      type: Object,
      default() {
        return {
          month: "",
          checkCompleteTime_begin: "",
          checkCompleteTime_end: ""
        };
      }
    }
  },
  data() {
    return {
      data: [],
      // params: {
      //   month: "",
      //   checkCompleteTime_begin: "",
      //   checkCompleteTime_end: ""
      // }
    };
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let params = new URLSearchParams();
        let json = JSON.stringify(this.params);
        params.append("query", json);
        this.$http
          .get("/supervision/statistics/personage", {
            params: params
          })
          .then(res => {
            // console.log(res, "res");
            if (res.success) {
              var data = res.data;
              var seriesData = [
                data.daily_finish,
                data.daily_unfinish,
                data.special_finish,
                data.special_unfinish,
                data.safety_finish,
                data.safety_unfinish,
                data.random_finish,
                data.random_unfinish
              ];
              console.log(seriesData, "seriesData");
              var dataSource = echarts.init(
                document.getElementById("personalCheck"),
                "macarons"
              );
              window.addEventListener("resize", function() {
                dataSource.resize();
              });

              var option = {
                color: ["#3398DB"],
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
                    type: "category",
                    data: [
                      "日常-完结",
                      "日常-检查中",
                      "专项-完结",
                      "	专项-检查中",
                      "安全-完结",
                      "安全-检查中",
                      "随机-完结",
                      "随机-检查中"
                    ],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: "value"
                  }
                ],
                series: [
                  {
                    name: "数量",
                    type: "bar",
                    barWidth: "60%",
                    data: seriesData
                  }
                ]
              };

              dataSource.setOption(option);
            }
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
  beforeDestroy() {}
};
</script>

