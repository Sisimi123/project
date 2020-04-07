<template>
    <div style="width:100%;height:100%;" id="areaWorker"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'areaWorker',
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
          let type
          for(var i =0;i<this.areas.length;i++){
            if(this.areaCode == this.areas[i].code){
              type = this.areas[i].type
              break;
            }
          }
          if(this.areaCode){
            this.$http
            .get("/ruian/index/dutyNew")
            .then(res => {
              var legendData = [];
              var data_m1 = [];
              var data_m2 = [];
              var data_m3 = [];
              var data_m4 = [];
              var data_m5 = [];
              var data_m6 = [];
              res.data.forEach(element => {
                legendData.push(element.fidDuty);
                data_m1.push(element.m1)
                data_m2.push(element.m2)
                data_m3.push(element.m3)
                data_m4.push(element.m4)
                data_m5.push(element.m5)
                data_m6.push(element.m6)
              });
              var dataSource = echarts.init(document.getElementById("areaWorker"));  
              window.addEventListener("resize", function() {
                dataSource.resize();
              });
              var option = {
                color: ['#A77AF6','#24D9C7','#F1C000','#F27155','#00B778','#1377FD'],
                legend: {
                    data: ['30岁以下','30-40岁','40-50岁','50-60岁','60岁以上','无信息'],
                    y: 'top'
                },
                tooltip: {
                  trigger: 'axis',
                    axisPointer : { 
                        type : 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    // bottom: '3%',
                    y: 20,
                    y2:5,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: legendData
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                      name: '30岁以下',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m1
                  },
                  {
                      name: '30-40岁',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m2
                  },
                  {
                      name: '40-50岁',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m3
                  },
                  {
                      name: '50-60岁',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m4
                  },
                  {
                      name: '60岁以上',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m5
                  },
                  {
                      name: '无信息',
                      type: 'bar',
                      stack: '总量',
                      label: {
                          normal: {
                              show: false,
                              position: 'insideRight'
                          }
                      },
                      barWidth : 30,
                      data: data_m6
                  }
                ]
              };
              // var option = {
              //   title: {
              //     text: "船员职务统计",
              //     x: 10,
              //     y: 10
              //   },
              //   color:['#2064F5', '#BF6FF4', '#6EDD29','#1D9DFF', '#6601FF', '#FBD214','#FA2016','#A313FF','#01CEE1', '#4609E0'],
              //   tooltip: {
              //     // trigger: "item",
              //     // formatter: "职务- <br/>{b} : {c} ({d}%)"
              //   },
              //   legend: {
              //     // itemGap: 20,
              //     // type: "scroll",
              //     // orient: "vertical",
              //     align: 'left',
              //     left: 10,
              //     bottom: 50,
              //     data: legendData,
              //     formatter:function(name){
              //       let target;
              //       for(let i=0;i<res.data.length;i++){
              //           if(res.data[i].fidDuty===name){
              //               target=res.data[i].count
              //           }
              //       }
              //       return name + ' ' + ((target/total)*100).toFixed(2) + '%';
              //     },
              //   },
              //   grid: {
              //       left: '3%',
              //       right: '4%',
              //       bottom: '50%',
              //   },
              //   xAxis:  {
              //       type: 'value',
              //       show: false
              //   },
              //   yAxis: {
              //       type: 'category',
              //       show: false
              //   },
              //   series: seriesData
              // };
              dataSource.setOption(option);
              dataSource.on('click', (params)=> {
                this.$router.push({
                    path: '/enforcement/achive/crews',
                    query: {
                      workType: params.name,
                      areaCode: this.areaCode
                    }
                });
              });
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
