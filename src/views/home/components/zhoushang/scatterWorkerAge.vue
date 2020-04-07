<template>
    <div style="width:100%;height:100%;" id="scatter_worker_age"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'scatterWorkerAge',
    data() {
      return {
        info:[
          "30岁以下",
          "30~40岁",
          "40~50岁",
          "50~60岁",
          "60岁以上",
        ],
      }
    },
    props:{

    },
    methods: {
      sortData(data){
        var listData = [];
        listData.push({
          name: this.info[0],
          value: data.less30,
          count: Number(data.less30*100/data.total).toFixed(2)
        });
        listData.push({
          name: this.info[1],
          value: data.more30less40,
          count: Number(data.more30less40*100/data.total).toFixed(2)
        });
        listData.push({
          name: this.info[2],
          value: data.more40less50,
          count: Number(data.more40less50*100/data.total).toFixed(2)
        });
        listData.push({
          name: this.info[3],
          value: data.more50less60,
          count: Number(data.more50less60*100/data.total).toFixed(2)
        });
        listData.push({
          name: this.info[4],
          value: data.more60,
          count: Number(data.more60*100/data.total).toFixed(2)
        });

        listData.sort(function(a,b){
            return a.value-b.value});

        console.log("listData",listData);
        return listData;
      },
      pushData(seriesData,data){
          seriesData.push({
              name:data.name,
              type: 'scatter',
              symbol: 'circle',
              label: {
                  normal: {
                      show: true,
                      formatter: '{b}',
                      color: '#fff',
                      textStyle: {
                          fontSize: '20'
                      }
                  },
              },
              itemStyle: {
                  normal: {
                      color: data.color
                  }
              },
              data: [{
                  name: data.count + "%",
                  value: data.offset,
                  symbolSize: data.symbolSize,
                  label: {
                      normal: {
                          textStyle: {
                              fontSize: 14
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: data.color,
                          opacity: data.opacity
                      }
                  }
            }]
      });
      },
      init() {
        this.$nextTick(() => {
          this.$http
            .get("/checks/shipsailor/age",{
              params:{
                areaCode:"330900",
                type:"4",
              }
            })
            .then(res => {
                console.log("age",res);
                var result = res.data;
                var listData = this.sortData(result);
                var dataSource = echarts.init(document.getElementById("scatter_worker_age"));
                
                window.addEventListener("resize", function() {
                  dataSource.resize();
                });
                
                var scatterA = {
                  name: listData[0].name,
                  value: listData[0].value,
                  count: listData[0].count,
                  offset: [20, 45],
                  symbolSize: 80,
                  opacity: .95,
                  color: '#F997B0'
                };
                var scatterB = {
                    name: listData[4].name,
                    value: listData[4].value,
                    count: listData[4].count,
                    offset: [35, 65],
                    symbolSize: 160,
                    opacity: .88,
                    color: '#57A7FC'
                };
                var scatterC = {
                    name: listData[3].name,
                    value: listData[3].value,
                    count: listData[3].count,
                    offset: [50, 45],
                    symbolSize: 150,
                    opacity: .84,
                    color: '#81E0E6'
                };
                var scatterD = {
                    name: listData[2].name,
                    value: listData[2].value,
                    count: listData[2].count,
                    offset: [65, 70],
                    symbolSize: 120,
                    opacity: .8,
                    color: '#FFC296'
                };
                var scatterE = {
                    name: listData[1].name,
                    value: listData[1].value,
                    count: listData[1].count,
                    offset: [80, 85],
                    symbolSize: 70,
                    opacity: .75,
                    color: '#BC87FD'
                };
              
                var seriesData = [];

                this.pushData(seriesData,scatterA);
                
                this.pushData(seriesData,scatterC);
                this.pushData(seriesData,scatterD);
                this.pushData(seriesData,scatterB);
                this.pushData(seriesData,scatterE);
                console.log("seriesData",seriesData);
                var option = {
                    tooltip: {
                        trigger: "item",
                        formatter: "从业人员:<br/>{a}: {c} ({b}) "
                    },
                    grid: {
                        show: false,
                        top: 10,
                        bottom: 10
                    },
                    legend: {
                        bottom: 10,
                        data: this.info
                    },
                    xAxis: [{
                        gridIndex: 0,
                        type: 'value',
                        show: false,
                        min: 0,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 5
                    }],
                    yAxis: [{
                        gridIndex: 0,
                        min: 0,
                        show: false,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 30
                    }],
                    series: seriesData
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
