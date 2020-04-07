<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'visiteVolume',
    data () {
        return {
            timeOut:{},
        };
    },
    methods: {
        updateInfo(){
            this.$http
                .get("/enanny/count/orderStatus")
                .then(response =>{
                    if (this.isEmpty(response.data.all)){
                        response.data.all = 0;
                        response.data.finish = 0;
                    }else if (this.isEmpty(response.data.finish)){
                        response.data.finish = 0;
                    }
                    
                this.$nextTick(() => {
                    let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
                    let xAxisData = [];

                    let data1 = [];
                    let data2 = [];
                    for (let i = 0; i < 20; i++) {
                        xAxisData.push('类目' + i);
                        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                    }

                    const option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        grid: {
                            top: 0,
                            left: '2%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        },
                        yAxis: {
                            type: 'category',
                            data: ['发布订单', '已办结'],
                            nameTextStyle: {
                                color: '#19be6b',
                            }
                        },
                        series: [
                            {
                                name: '数量（单）',
                                type: 'bar',
                                data: [
                                    {value: response.data.all, name: '发布订单', itemStyle: {normal: {color: '#2d8cf0'}}},
                                    {value: response.data.finish, name: '已办结', itemStyle: {normal: {color: '#19be6b'}}},
                                ]
                            },
                        ]
                    };

                    visiteVolume.setOption(option);

                    window.addEventListener('resize', function () {
                        visiteVolume.resize();
                    });

                    this.timeOut = setTimeout(() => {
                        this.updateInfo();
                    }, 15000);
                });
                }).catch(err=>{
                    console.log(err);
                }); 
        },
        isEmpty(s){
            if(s=="" || s == undefined || s == null){
                return true;
            }
            return false;
        },
    },
    mounted () {
        this.updateInfo();
    },
    beforeDestroy () {
        clearTimeout(this.timeOut);
    },
};
</script>
