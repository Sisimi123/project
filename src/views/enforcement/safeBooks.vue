<template>
    <div style="width:100%;height:100%;" id="pie-zx"></div>
</template>

<script>
import echarts from "echarts";
export default {
    name: "safeBooks",
    data() {
        return {
            title:[],
            data:[],
            xFontsize:14,
        };
    },
    computed: {
    
    },
    methods: {
        updateInfosb(){
            var _self=this;
            var dataSource=echarts.init(
                document.getElementById('pie-zx')
            );
            var option={
                //背景色
                // backgroundColor: 'lightblue',
                // 标题
                title: {
                    text: '安全检查书',
                    textStyle:{
                        fontSize:'20'
                    }
                    // subtext: '数据来源：华秉科技-dancer'
                },
                tooltip: {//鼠标悬浮效果
                    trigger: 'axis',
                    axisPointer: {//设置垂直虚线悬浮效果
                        type: 'line',
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgb(193, 222, 254)'
                        }
                    },
                },
                //图例名
                legend: {
                    type:"plain",
                    data:['安全检查书数量',],
                    left:"right",
                    textStyle:{
                        fontSize:'16'
                    },
                    // itemHeight:"13",
                    // itemWidth:"13",
                },
                grid: {
                    // top:"1%",
                    left: '1%',
                    right: '2%',
                    bottom: '1%',
                    containLabel: true,
                    // width:'auto',
                    // height:'auto'
                },
                //工具框，可以选择
                toolbox: {
                    // feature: {
                    //     saveAsImage: {}//图片下载
                    // },
                },
                //x轴信息样式
                xAxis: {
                    type: 'category',
                    // boundaryGap: false,
                    data: _self.title,
                    //坐标轴
                    axisLine:{
                        lineStyle:{
                            color:'rgb(193, 193, 193)',
                        },
                        show:false
                    },
                    //x轴文字
                    axisLabel:{
                        rotate:0,
                        interval:0,
                        fontSize:_self.xFontsize,
                        textStyle:{
                            color:'rgb(153, 153, 153)'
                        },
                    },
                    splitLine: {
                        show: false,
                        lineStyle:{
                            color: ['blue'],
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisTick:{
                        show:false,
                    },
                },
                dataZoom: [
                    {
                        type: 'inside'
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        gridIndex:0,
                        axisLabel : {
                            interval:0,
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
                series: [
                    //实线
                    {
                        name:'安全检查书数量',
                        type:'line',
                        symbol:'circle',
                        symbolSize:10,//拐点圆的大小
                        itemStyle:{
                            normal:{
                                color:'rgb(14, 129, 250)',
                                borderColor:'rgb(14, 129, 250)',  //拐点边框颜色
                                lineStyle: {
                                    color: "rgb(14, 129, 250)",
                                    // width: 5,  //折线的线条宽度
                                }
                            },
                            
                        },
                        data:_self.data,
                    },
                ]
            }
            dataSource.setOption(option);
            window.addEventListener("resize", function() {
              dataSource.resize();
            });
        },  
        safeBooks(){
            this.$nextTick(() => {
                var _self=this;
                this.$http.get("/standingbook/coop/sc/resStatistic")
                .then(res=>{
                    if(res.success){
                        _self.data=res.data.counts;
                        var titles=res.data.mon;
                        for(var i=0;i<titles.length;i++){
                            if(titles[i]=="1"){
                                titles[i]="一月";
                            }else if(titles[i]=="2"){
                                titles[i]="二月";
                            }else if(titles[i]=="3"){
                                titles[i]="三月";
                            }else if(titles[i]=="4"){
                                titles[i]="四月";
                            }else if(titles[i]=="5"){
                                titles[i]="五月";
                            }else if(titles[i]=="6"){
                                titles[i]="六月";
                            }else if(titles[i]=="7"){
                                titles[i]="七月";
                            }else if(titles[i]=="8"){
                                titles[i]="八月";
                            }else if(titles[i]=="9"){
                                titles[i]="九月";
                            }else if(titles[i]=="10"){
                                titles[i]="十月";
                            }else if(titles[i]=="11"){
                                titles[i]="十一月";
                            }else if(titles[i]=="12"){
                                titles[i]="十二月";
                            }
                        }
                        _self.title=titles;
                        _self.updateInfosb();
                    }
                });
            });
        },
    },
    beforeMount() {
    },
    mounted() {
        this.safeBooks();
    },
  
};
</script>
