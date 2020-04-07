<template>
    <div style="width:100%;height:100%;" id="active-and-lost" @change="this.userTypeChange"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'activeAndLost',
    props:{
        defaultData:{
            type:Array,
            required:true,
        },
        userType:{
            type:Array,
            required:true,
        }
    },
    data () {
        return {
            tit:[],
            backupTit:[],
            arr:[],
            backupArr:[],
            sys:[],
            site:[],
        };
    },
    watch:{
        "userType":function(){
            this.userTypeChange();
        }
    },
    methods:{
        userTypeChange(){
            var _self=this;
            if(_self.userType.length==2){
                _self.tit=_self.backupTit;
                _self.arr=_self.backupArr;
            }else if(_self.userType[0]=="管理用户"){
                _self.tit=_self.backupTit;
                _self.arr=_self.sys;
            }else if(_self.userType[0]=="注册用户"){
                _self.tit=_self.backupTit;
                _self.arr=_self.site;
            }else{
                _self.tit=["未选择用户"];
                _self.arr=JSON.parse("[{\"value\":0,\"name\":\"未选择用户\",\"itemStyle\":{\"normal\": {\"color\": \"#b6a2df\"}}"+"}]");
            }
            _self.doDrow();
        },
        getSigninAndLostData(){
            var _self=this;
            this.$http.get("/scd/activeAndLost",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=JSON.parse(result.data);
                    var key=resultData.activeAndLostK;
                    var value =resultData.activeAndLostV;
                    var value2=resultData.activeAndLostSysV;
                    var colour=["#b6a2df","#29cac5","#59b1f0","#82c9b9","#e14f60","#2d8cf0","#0078a5","#6e9866","#98668d","#988966"]
                    var jsonV ="[";
                    var jsonV2="[";
                    var jsonV3="[";
                    for(var loop=0;loop<key.length;loop++){
                        if(loop==key.length-1){
                            jsonV +="{\"value\":"+value [loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"}]";
                            jsonV2+="{\"value\":"+value2[loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"}]";
                            jsonV3+="{\"value\":"+(value[loop]-value2[loop])+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"}]";
                        }else{
                            jsonV +="{\"value\":"+value [loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"},";
                            jsonV2+="{\"value\":"+value2[loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"},";
                            jsonV3+="{\"value\":"+(value[loop]-value2[loop])+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"},";
                        }
                    }
                    _self.tit =key;
                    _self.backupTit=_self.tit;
                    _self.arr =JSON.parse(jsonV );
                    _self.backupArr=_self.arr;
                    _self.sys =JSON.parse(jsonV2);
                    _self.site=JSON.parse(jsonV3);
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self=this;
            this.$nextTick(() => {
                var _self=this;
                var dataSourcePie = echarts.init(document.getElementById('active-and-lost'));
                const option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: _self.tit,
                    },
                    series: [
                        {
                            name: '用户分析:',
                            type: 'pie',
                            radius: '70%',
                            center: ['50%', '60%'],
                            data: _self.arr,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                dataSourcePie.setOption(option);
                window.addEventListener('resize', function () {
                    dataSourcePie.resize();
                });
            });
        },
        init(){
            this.doDrow();
            this.getSigninAndLostData();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
