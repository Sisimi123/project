<template>
    <div style="width:100%;height:100%;" id="agricultural-data-chart"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'agriculturalDataChart',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data0:[],               // DateRule
    shipSurveyList:[],      // 船检表
    ownerList:[],           // 所有权证书
    fishingLincenseList:[], // 捕捞许可证证书
    shipInfoList:[],        // 船基本信息

    data () {
        return {
            
        };
    },
    methods:{
        getAgriculturalDataChart(){
            var _self = this;
            this.$http.get("/scd/agriculturalDataChart",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=JSON.parse(result.data);
                    _self.data0=resultData.monthRule;
                    _self.shipSurveyList=resultData.shipSurveyList;
                    _self.ownerList=resultData.ownerList;
                    _self.fishingLincenseList=resultData.fishingLincenseList;
                    _self.shipInfoList=resultData.shipInfoList;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self = this;
            this.$nextTick(() => {
                var dataSource = echarts.init(document.getElementById('agricultural-data-chart'));
                var posList = [
                    'left', 'right', 'top', 'bottom',
                    'inside',
                    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
                ];

                var labelOption = {
                    normal: {
                        show: true,
                        position: 'insideBottom',
                        distance: 15,
                        align: 'left',
                        verticalAlign: 'middle',
                        rotate: 90,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                };

                var option = {
                    color: ['#59b1f0', '#29cac5', '#b6a2df', '#82c9b9'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['船检表', '所有权证书', '捕捞许可证', '船基本信息'],
                        left: 'left',
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: _self.data0
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '船检表',
                            type: 'bar',
                            barGap: 0,
                            label: labelOption,
                            data: _self.shipSurveyList
                        },
                        {
                            name: '所有权证书',
                            type: 'bar',
                            label: labelOption,
                            data: _self.ownerList
                        },
                        {
                            name: '捕捞许可证',
                            type: 'bar',
                            label: labelOption,
                            data: _self.fishingLincenseList
                        },
                        {
                            name: '船基本信息',
                            type: 'bar',
                            label: labelOption,
                            data: _self.shipInfoList
                        }
                    ]
                };
                dataSource.setOption(option);
                window.addEventListener('resize', function () {
                    dataSource.resize();
                });
            });
        },
        init(){
            this.doDrow();
            this.getAgriculturalDataChart();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
