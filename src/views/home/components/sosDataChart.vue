<template>
    <div style="width:100%;height:100%" id="sos-data-chart"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'sosDataChart',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data0:[],
    siteInfoList:[],
    errSiteInfoList:[],
    data () {
        return {

        }
    },
    methods:{
        getSosDataChart(){
            var _self = this;
            this.$http.get("/scd/sosDataChart",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=JSON.parse(result.data);
                    _self.data0=resultData.monthRule;
                    _self.siteInfoList=resultData.siteInfoList;
                    _self.errSiteInfoList=resultData.errSiteInfoList;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self = this;
            var dataSource = echarts.init(document.getElementById('sos-data-chart'));
            var option = {
                color: ['#59b1f0', '#29cac5', '#b6a2df', '#82c9b9'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["正常渔船报位量","异常船报位量"],
                    left: 'left',
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis:  {
                    type: 'value'
                },
                xAxis: {
                    type: 'category',
                    data: _self.data0
                },
                series: [
                    {
                        name: '正常渔船报位量',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: _self.siteInfoList
                    },
                    {
                        name: '异常船报位量',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: _self.errSiteInfoList
                    }
                ]
            };
            dataSource.setOption(option);
            window.addEventListener('resize', function () {
                dataSource.resize();
            });
        },
        init(){
            this.doDrow();
            this.getSosDataChart();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
