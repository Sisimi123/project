<template>
    <div style="width:100%;height:90%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data () {
        return {
            tit:[],
            arr:[],
        };
    },
    methods:{
        getDevicePieData(){
            var _self=this;
            this.$http.get("/scd/devicePie",{
                params:{
                    startingDate: this.defaultData[0],
                    endDate: this.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    var resultData=JSON.parse(result.data);
                    var key=resultData.devicePieK;
                    var value=resultData.devicePieV;
                    var colour=["#b6a2df","#29cac5","#59b1f0","#82c9b9","#e14f60","#2d8cf0","#0078a5","#6e9866","#98668d","#988966"]
                    var jsonV="[";
                    for(var loop=0;loop<key.length;loop++){
                        if(loop==key.length-1){
                            jsonV+="{\"value\":"+value[loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"}]";
                        }else{
                            jsonV+="{\"value\":"+value[loop]+",\"name\":\""+key[loop]+"\",\"itemStyle\":{\"normal\": {\"color\": \""+colour[loop]+"\"}}"+"},";
                        }
                    }
                    _self.tit=key;
                    _self.arr=JSON.parse(jsonV);
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self=this;
            this.$nextTick(() => {
                var _self=this;
                var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
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
                            name: '设备名称:',
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
            this.getDevicePieData();
        }
    },
    mounted () {
        this.init();
    }
};
</script>
