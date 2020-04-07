<template>
    <div style="width:100%;height:100%;" id="pie_userScoreArea"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "dataSourcePie",
  data() {
    return {
      timeOut: {},
      dataType: [],
      data: []
    };
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$http
          .get("/enforces/shipscorestatistics/type")
          .then(res => {
            var seriesData = [];
            var legendData = [];
            res.data.forEach(element => {
              legendData.push(element.name);
              seriesData.push({
                name: element.name,
                value: element.value
              });
            });
            var dataSource = echarts.init(
              document.getElementById("pie_userScoreArea"),'macarons'
            );
            window.addEventListener("resize", function() {
              dataSource.resize();
            });

            var option = {
              color:['#0F81FB', '#13D6DD', '#00CC97','#FCB408', '#F4DD52', '#FF6B52','#A975F4','#5E60E9','#5354D1', '#ed3f14'],
              title: {
                text: "船长、船东、公司涉嫌记分占比",
                x: "center"
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: "left",
                data: legendData
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: seriesData,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            };

            dataSource.setOption(option);
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

