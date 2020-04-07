<template>
    <div style="width:100%;height:100%;" id="areaShip"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'areaShip',
    props:{

    },
    methods: {
    init() {
      this.$nextTick(() => {
        this.$http
          .get("/shiparchives/nybstatistics/areaShip",{
            params:{
              node:"330900"
            }
          })
          .then(res => {
            console.log("res",res);
            var legendData = [];
            var selected = {};
            var seriesData = [];
            res.data.forEach(element => {
              legendData.push(element.name);
              seriesData.push({
                name: element.name,
                value: element.count,
                code: element.codefishingArea
              });
              //selected.push(element.value + "人");
            });
            var dataSource = echarts.init(document.getElementById("areaShip"));
             
            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            var option = {
              // title: {
              //   text: "区域统计",
              //   x: "center"
              // },
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
                  center: ["30%", "60%"],
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
              let query = params.data;
              this.$router.push({
                  path: '/enforcement/achive/ships',
                  query: query
              });
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
