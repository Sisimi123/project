<template>
    <div style="width:100%;height:100%;" id="visite_volume_con2"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'visiteVolume',
    data () {
        return {
            allData:[],
            dataOne:[],
            dataTwo:[],
            dataThree:[],
        };
    },
    methods: {
        updateInfo(){
            this.allData = [],
            this.$http
                .get("/enanny/count/hallCount")
                .then(response =>{
                    let datas = response.data;
                    // for (const key in datas) {
                    //     if (datas.hasOwnProperty(key)) {
                    //         const element = datas[key];
                    //         this.dataOne.push(element.one);
                    //     }
                    // }

                    let data1 = {
                            name: '鹿城供电营业厅',
                            type: 'bar',
                            data: ["100","200","300"]
                    };
                    let data2 = {
                            name: '蝉街供电营业厅',
                            type: 'bar',
                            data: ["500","500","500"]
                    };
                    let data3 = {
                            name: '南浦供电营业厅',
                            type: 'bar',
                            data: ["400","400","400"]
                    };
                    let data4 = {
                            name: '新城供电营业厅',
                            type: 'bar',
                            data: ["300","300","300"]
                    };
                    let data5 = {
                            name: '仰义供电营业厅',
                            type: 'bar',
                            data: ["200","200","200"]
                    };
                    let data6 = {
                            name: '七都供电营业厅',
                            type: 'bar',
                            data: ["100","100","100"]
                    };
                    this.allData.push(data1);
                    this.allData.push(data2);
                    this.allData.push(data3);
                    this.allData.push(data4);
                    this.allData.push(data5);
                    this.allData.push(data6);


                    this.$nextTick(() => {
                        let visiteVolume = echarts.init(document.getElementById('visite_volume_con2'));
                        let xAxisData = [];

                        let data1 = [];
                        let data2 = [];
                        for (let i = 0; i < 20; i++) {
                            xAxisData.push('类目' + i);
                            data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                            data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                        }

                        const option = {
                            color: ['#ff9900', '#4cabce', '#ff9900', '#e5323e', '#495060', '#ed3f14'],
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
                                type: 'category',
                                data: ['近三月', '近二月','近一月'],
                                nameTextStyle: {
                                    color: '#c3c3c3'
                                }
                                
                            },
                            yAxis: {
                                
                                type: 'value',
                                boundaryGap: [0, 0.01]
                            },
                            series: this.allData,
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
        }
    },
    mounted () {
        this.updateInfo();
    },
    beforeDestroy () {
        clearTimeout(this.timeOut);
    },
};
</script>
