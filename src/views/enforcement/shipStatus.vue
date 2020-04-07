<template>
        <div style="width:100%;height:100%;" id="pie-yz"></div>
    </template>
    
    <script>
    import echarts from "echarts";
    
    export default {
      name: "dataSourcePie",
      data() {
        return {
          timeOut:{},
          dataType:[],
          data:[0,0,0,0,0],
          xFontsize:14,
        };
      },
      computed: {
    
      },
      methods: {
        updateInfo(){
            var _self=this;
            var dataSource=echarts.init(
                document.getElementById('pie-yz')
            );
            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            var option={
                title: {
                    text: '渔船状态',
                    textStyle:{
                        fontSize:'20'
                    }
                    // subtext: '数据来源：华秉科技-dancer'
                },
                //图例名
                legend: {
                    type:"plain",
                    data:['渔船数量',],
                    left:"right",
                    textStyle:{
                        fontSize:'16'
                    },
                    // itemHeight:"13",
                    // itemWidth:"13",
                },
                color: ['rgb(50, 209, 62)'],//圆柱和legend上的图标颜色
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle:{
                            // shadowBlur:10,
                            // color:'rgb(236, 250, 237)'
                        }
                    }
                },
                grid: {
                    left: '1%',
                    right: '2%',
                    bottom: '1%',
                    containLabel: true
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                xAxis : [
                    {
                        type : 'category',
                        fontSize:_self.xFontsize,
                        data : ['在港', '港外在线', '港外离线', '设备故障', '其他',],
                        axisLine:{
                            lineStyle:{
                                color:'rgb(193, 193, 193)',
                            },
                            show:false
                        },
                        // max: function(value) {
                        //     return value.max;-20;
                        // },
                        axisLabel:{
                            interval: 0,
                            rotate:0,
                            textStyle:{
                                color:'rgb(153, 153, 153)'
                            },
                        },
                        axisTick: {
                            interval:0,
                            alignWithLabel: true,
                            show:false,
                        },
                        xisLine:{
                            lineStyle:{
                                color:'rgb(193, 193, 193)'
                            },
                            show:false
                        },
                        splitLine: {
                            show: false,
                            lineStyle:{
                                color: ['rgba(204, 204, 204,0.25)'],
                                width: 1,
                                type: 'solid'
                            }
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value}',
                            textStyle:{
                                color:'rgb(153, 153, 153)'
                            },
                        },
                        axisLine:{
                            lineStyle:{
                                color:'rgb(193, 193, 193)'
                            },
                            show:false
                        },
                        axisTick:{
                            interval:0,
                            show:false,
                        },
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ['rgba(204, 204, 204,0.25)'],
                                width: 1,
                                type: 'solid'
                            }
                        }
                    }
                ],
                series : [
                    {
                        name:'渔船数量',
                        type:'bar',
                        barWidth: '30%',
                        data:this.data
                    }
                ]
            }
            dataSource.setOption(option);
        },
        getStatistic(){
            this.$http.get("/standingbook/shipStatus/get")
            .then(res=>{
                if(res.success){
                    this.data=res.data;
                    this.updateInfo();
                }
            });
        },

      },
      mounted() {
        this.updateInfo();
        this.getStatistic();
      },
    };
    </script>
    <style scoped>
        
    </style>
    