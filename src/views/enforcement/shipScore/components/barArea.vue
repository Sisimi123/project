<template>
    <div style="width:100%;height:100%;" id="bar_area1"></div>
</template>

<script>

import {dateFormat,isNull} from '@/libs/common.js';
import echarts from 'echarts';
export default {
    name: 'barArea',
    props: {
        startTime: {
            type: Date,
            default: "",
        },
        endTime: {
            type: Date,
            default: "",
        },
    },
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
                .get("/enforces/shipscorestatistics/mark",{
                    params:{
                        startTime: isNull(this.startTime) ? "" : dateFormat(this.startTime,"yyyy-MM-dd"),
                        endTime: isNull(this.endTime) ? "" : dateFormat(this.endTime,"yyyy-MM-dd"),
                    }
                })
                .then(res =>{
                    var xAxisData = [];
                    var count = [];
                    var shipowner = [];
                    var captain = [];
                    var same = [];
                    var shipowner_captain = [];
                    var company = [];
                    
                    let datas = res.data;

                    datas.forEach(element => {
                        xAxisData.push(element.area);
                        count.push(element.count);
                        shipowner.push(element.shipowner);
                        captain.push(element.captain);
                        same.push(element.same);
                        company.push(element.company);
                        shipowner_captain.push(element.shipowner + element.captain - element.same);
                    });



                    this.$nextTick(() => {
                        let visiteVolume = echarts.init(document.getElementById('bar_area1'));

                        const option = {
                            color: ['#00CC97','#FCB409', '#FFDE53'],
                            title: {
                                text: '区域统计',
                                subtext: '渔船记分区域统计'
                            },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                }
                            },
                            legend: {
                                // data: ['总记分次数', '船东船长记分次数', '渔业公司记分次数']
                                data: ['总记分次数', '船东、船长记分次数', '公司记分次数']
                                // data: ['总记分次数', '船东记分次数', '船长记分次数', '一次记分船长船东相同', '公司记分次数']
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
                                    name: '总记分次数',
                                    type: 'bar',
                                    data: count
                                },
                                {
                                    name: '船东、船长记分次数',
                                    type: 'bar',
                                    data: shipowner_captain
                                },
                                // {
                                //     name: '船东记分次数',
                                //     type: 'bar',
                                //     data: shipowner
                                // },
                                // {
                                //     name: '船长记分次数',
                                //     type: 'bar',
                                //     data: captain
                                // },
                                // {
                                //     name: '一次记分船长船东相同',
                                //     type: 'bar',
                                //     data: same
                                // },
                                {
                                    name: '公司记分次数',
                                    type: 'bar',
                                    data: company
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
    watch:{
        startTime(val){
            console.log("beginTime",val);
            this.updateInfo();
        },
        endTime(val){
            console.log("endTime",val);
            this.updateInfo();
        },
    }
};
</script>
