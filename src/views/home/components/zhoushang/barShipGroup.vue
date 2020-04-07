<template>
    <div style="width:100%;height:100%;" id="bar_area_group"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'barArea',
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
            this.$http
                .get("/enforces/shipscorestatistics/mark")
                .then(res =>{

                    var xAxisData = [];
                    var count = [];
                    var shipowner = [];
                    var captain = [];
                    var same = [];
                    var shipowner_captain = [];
                    var company = [];
                    
                    let datas = res.data;

                    // datas.forEach(element => {
                    //     xAxisData.push(element.area);
                    //     count.push(element.count);
                    //     shipowner.push(element.shipowner);
                    //     captain.push(element.captain);
                    //     same.push(element.same);
                    //     shipowner_captain.push(element.shipowner + element.captain - element.same);
                    // });

                    xAxisData = ["全市","市辖区","定海区","普陀区","岱山县","嵊泗县"]
                    count = [500,20,100,200,100,90],
                    shipowner_captain = [1214,56,214,516,188,201],
                    this.$nextTick(() => {
                        let visiteVolume = echarts.init(document.getElementById('bar_area_group'));

                        const option = {
                            color: ['#00CC97','#FCB409', '#FFDE53'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {
                                data: ['编组数量', '在组渔船数量']
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                data: xAxisData,
                            },
                            yAxis: {
                                type: 'value',
                                boundaryGap: [0, 0.01]
                            },
                            series: [
                                {
                                    name: '编组数量',
                                    type: 'bar',
                                    barWidth: '30',
                                    data: count
                                },
                                {
                                    name: '在组渔船数量',
                                    type: 'bar',
                                    barWidth: '30',
                                    data: shipowner_captain
                                },
                            ]
                        };

                        visiteVolume.setOption(option);

                        window.addEventListener('resize', function () {
                            visiteVolume.resize();
                        });

                        

                        // this.timeOut = setTimeout(() => {
                        //     this.updateInfo();
                        // }, 15000);
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
        // clearTimeout(this.timeOut);
    },
};
</script>
