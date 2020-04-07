<template>
    <div style="width:100%;height:100%;" id="practitioner"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'practitioner',
    props:{
    },
    data () {
        return {
            areaMap: new Map()
        };
    },
    methods: {
      init() {
        this.$nextTick(() => {
            this.$http
            .get("/achive/zs/ageList")
            .then(res => {
              var data_m1 = [];
              var data_m2 = [];
              var data_m3 = [];
              var data_m4 = [];
              var data_m5 = [];
              var data_m6 = [];
              var legendData = [];
              res.data.forEach(element => {
                this.areaMap.set(element.name, element.organId)
                legendData.push(element.name)
                data_m1.push(element.m1)
                data_m2.push(element.m2)
                data_m3.push(element.m3)
                data_m4.push(element.m4)
                data_m5.push(element.m5)
                data_m6.push(element.m6)
              });
              var dataSource = echarts.init(document.getElementById("practitioner"));  
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
              dataSource.setOption(option);
              dataSource.on('click', (params)=> {     
                var areaCode = (this.areaMap.get(params.name)).toString()
                this.$router.push({
                    path: '/enforcement/achive/crewZs',
                    query: {
                        areaCode: areaCode
                    }
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
    beforeDestroy() {},
    watch:{
    }
};
</script>
