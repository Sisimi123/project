<template>
    <div style="width:100%;height:100%;" id="pie_case"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "dataSourcePie",
  data() {
    return {};
  },
  methods: {
    init() {
      this.$nextTick(() => {
        this.$http
          .get("/enforces/shipscorestatistics/user")
          .then(res => {
            console.log(res);
            var legendData = [];
            var selected = {};
            var seriesData = [];
            res.data.forEach(element => {
              legendData.push("记" + element.name + "分");
              seriesData.push({
                name: "记" + element.name + "分",
                value: element.value
              });
              //selected.push(element.value + "人");
            });
            var dataSource = echarts.init(document.getElementById("pie_case"),'light');
            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            var option = {
              title: {
                text: "当前在档人员记分占比(记分/人数)",
                x: "center"
              },
              //color:['#ff9900', '#4cabce', '#54d6b6','#e5323e', '#62d1de', '#a6db69','#ffd454','#ffa361','#d1d1d1','#495060', '#ed3f14'],
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                type: "scroll",
                orient: "vertical",
                right: 10,
                top: 10,
                bottom: 10,
                data: legendData,

                //selected: legendData
              },
              series: [
                {
                  name: "当前记分",
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

