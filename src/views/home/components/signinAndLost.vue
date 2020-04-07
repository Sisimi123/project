<template>
    <div style="width:100%;height:100%;" id="signin-and-lost"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'signinAndLost',
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
        getSigninAndLostData(){
            var _self=this;
            this.$http.get("/scd/signinAndLost",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    console.log("========获取注册与流失用户数========");
                    var resultData=JSON.parse(result.data);
                    console.log(resultData);
                    _self.data0=resultData.monthRule;

                    var newSignin=resultData.Signin;
                    var intSignin=new Array();
                    for(var loop=0;loop<newSignin.length;loop++){
                        intSignin[loop]=parseInt(newSignin[loop]);
                    }
                    _self.dataLeft=intSignin;

                    var newLostUser=resultData.LostUser;
                    var intLostUser=new Array();
                    for(var loop=0;loop<newLostUser.length;loop++){
                        intLostUser[loop]=parseInt(newLostUser[loop]);
                    }
                    _self.dataRight=intLostUser;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self=this;
            this.$nextTick(() => {
                var dataSource = echarts.init(document.getElementById('signin-and-lost'));
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
                        data: ['注册数','流失数'],
                        left: 'right',
                    },
                    xAxis: [{
                        type:'category',
                        data: _self.data0,
                        axisPointer:{
                            type:'shadow'
                        }
                    }],
                    yAxis: [{
                        type:'value',
                        name:'数值',
                        axisLabel: {
                            formatter: function (a) {
                                a = +a;
                                return isFinite(a)
                                    ? echarts.format.addCommas(+a)
                                    : '';
                            }
                        }
                    }],
                    series: [{
                        name:'注册数',
                        type:'bar',
                        data:_self.dataLeft,
                    },{
                        name:'流失数',
                        type:'bar',
                        data:_self.dataRight
                    }]
                };
                dataSource.setOption(option);
                window.addEventListener('resize', function () {
                    dataSource.resize();
                });
            });
        }
    },
    mounted () {
        this.doDrow();
        this.getSigninAndLostData();
    }
};
</script>
