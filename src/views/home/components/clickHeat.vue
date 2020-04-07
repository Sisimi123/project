<template>
    <div style="width:100%;height:100%" id="click-heat"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'clickHeat',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data0:[],
    dataLeft:[],
    data () {
        return {
            //
        };
    },
    methods:{
        getClickHeat(){
            var _self = this;
            this.$http.get("/scd/clickHeat",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=JSON.parse(result.data);
                    _self.data0=resultData.actions;
                    _self.dataLeft=resultData.countClazz;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self = this;
            var dataSource = echarts.init(document.getElementById('click-heat'));
            var option = {
                color: ['#59b1f0', '#29cac5', '#b6a2df', '#82c9b9'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                calculable : true,
                legend: {
                    data:['接口调用量'],
                    left: 'right',
                    itemGap: 5
                },
                grid: {
                    top: '8%',
                    left: '3%',
                    right: '3%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type : 'category',
                        data : _self.data0
                    }
                ],
                yAxis: [
                    {
                        type : 'value',
                        name : '调用数',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a)
                                    : '';
                            }
                        }
                    }
                ],
                dataZoom: [
                    {
                        // x轴滑块是否显示
                        show: false,
                        // x轴显示位置(此例标识显示所有数据的10%,其余需要通过鼠标拉选)
                        start: 0,
                        end: 10,
                        bottom: 0,
                        height: '4%',
                    },
                    {
                        type: 'inside',
                        start: 0,
                        end: 100
                    }
                ],
                series : [
                    {
                        name: '接口调用量',
                        type: 'bar',
                        data: _self.dataLeft
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
            this.getClickHeat();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
