<template>
    <div style="width:100%;height:100%;" id="login-and-active"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'loginAndActive',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data0:[],
    dataLeft:[],
    dataRight:[],
    methods:{
        getLoginAndActiveData(){
            var _self=this;
            this.$http.get("/scd/loginAndActive",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=result.data;
                    var jsonData=JSON.parse(resultData);
                    _self.data0=jsonData.monthRule;

                    var newValue=jsonData.monthValue;
                    var intValue=new Array();
                    for(var loop=0;loop<newValue.length;loop++){
                        intValue[loop]=parseInt(newValue[loop]);
                    }
                    _self.dataLeft=intValue;

                    var newActive=jsonData.monthActive;
                    var intActive=new Array();
                    for(var loop=0;loop<newActive.length;loop++){
                        intActive[loop]=parseInt(newActive[loop]);
                    }
                    _self.dataRight=intActive;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self=this;
            this.$nextTick(() => {
                var dataSource = echarts.init(document.getElementById('login-and-active'));
                var option = {
                    color: ['#59b1f0', '#29cac5', '#b6a2df', '#82c9b9'],
                    tooltip:{
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    legend: {
                        data: ['用户登录数','活跃数'],
                        left: 'left',
                    },
                    xAxis: [{
                        type:'category',
                        // x轴数据(日期)
                        data: _self.data0,
                        axisPointer:{
                            type:'shadow'
                        }
                    }],
                    yAxis: [{
                        type:'value',
                        name:'用户登录数',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a)
                                    : '';
                            }
                        }
                    },{
                        type:'value',
                        name:'活跃数',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a)
                                    : '';
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        name:'用户登录数',
                        type:'bar',
                        // 天数数据
                        data:_self.dataLeft
                    },{
                        name:'活跃数',
                        type:'line',
                        yAxisIndex: 1,
                        // 活跃度数据
                        data:_self.dataRight
                    }]
                };
                dataSource.setOption(option);
                window.addEventListener('resize', function () {
                    dataSource.resize();
                });
            });
        },
        init(){
            this.doDrow();
            this.getLoginAndActiveData();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
