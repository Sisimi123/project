<template>
    <div style="width:100%;height:100%;" id="pie-matter"></div>
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
          .get("/enforces/shipscorestatistics/matter")
          .then(res => {
            var legendData = [];
            var selected = {};
            var seriesData = [];
            res.data.forEach(element => {
              legendData.push(element.area);
              seriesData.push({
                name: element.area,
                value: element.count
              });
            });
            var dataSource = echarts.init(document.getElementById("pie-matter"));

            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            var option = {
              title: {
                text: "当前在档人员记分占比(记分/人数)",
                x: "center"
              },
              color:['#0F81FB', '#13D6DD', '#00CC97','#FCB408', '#F4DD52', '#FF6B52','#A975F4','#5E60E9','#5354D1', '#ed3f14'],
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
            dataSource.on('click', (params)=> {
              var data = params.data;
              console.log(data);
            });
            
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

