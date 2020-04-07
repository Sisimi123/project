<template>
    <div style="width:100%;height:100%;" id="boatSituation"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'boatSituation',
    props:{
      areaCode: {
          type: String,
      },
      areas: {
          type: Array,
      },
    },
    methods: {
      init() {
        this.$nextTick(() => {
        //   let type;
        //   for(var i =0;i<this.areas.length;i++){
        //     if(this.areaCode == this.areas[i].code){
        //       type = this.areas[i].type
        //       break;
        //     }
        //   }
          if(this.areaCode){
            this.$http
            .get("/achive/zs/shipStatus",{
              params:{
                organid:this.areaCode,
                // type:type,
              }
            })
            .then(res => {
              var legendData = ['船证相符','船证不符','渔船配备船员相符','渔船配备船员不符'];
              var seriesData = [res.data.agree,res.data.diff,res.data.smAgree,res.data.smDiff];
              var dataSource = echarts.init(document.getElementById("boatSituation"));  
              window.addEventListener("resize", function() {
                dataSource.resize();
              });
              var option = {
                tooltip: {
                  trigger: "item",
                  formatter: "{b} : {c}"
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    y: 10,
                    y2:10,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: legendData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: seriesData,
                    type: 'bar',
                    barWidth : 40,//柱图宽度
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                              {offset: 0, color: '#009CFF'},  
                              {offset: 1, color: '#3E59E6'}
                            ]
                        ),
                        areaStyle: {type: 'default'}
                      }
                    },
                }]
              };
              dataSource.setOption(option);
            })
            .catch(err => {
              console.log(err);
            });
          }
        });
      }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {},
    watch:{
        areaCode(val){
            this.init();
        }
    }
};
</script>
