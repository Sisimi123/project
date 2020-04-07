<style lang="less" scoped>
    .ivu-btn-primary{
        background-color:#E4ECFF;
        outline: none !important;
        border: none;
        color:#4375FF;
        margin-left:5px;
        margin-bottom:5px
    }
</style>
<template>
    <div class="home-main" style="overfolw-y:hidden">
        <Row :gutter="10">
            <Col span="10" :style="{marginTop: '10px'}">
                <Card :padding="0"> 
                    <div id="fishArea" style="height:364px;overflow-y:auto;" ref="myEchart"></div>
                </Card>
            </Col>
            <Col span="6" :style="{marginTop: '10px'}">
                <Card>
                    <span style="font-size:18px;font-weight: bolder;color:#333333"> 按作业类型统计</span>
                    <span style="margin-left:100px">
                        <i-Select v-model="Statistics.work" @on-change="selectWork" style="width:120px" placeholder="选择作业类型">
                            <i-Option v-for="item in workStatus" :value="item.value" :key="item.value">{{item.name}}</i-Option>
                        </i-Select>
                    </span>
                    <div id="taskWork" style="height:300px;"></div>
                </Card>
            </Col>
            <Col span="8" :style="{marginTop: '10px'}">
                <Card>
                    <div id="current" style="height:332px;overflow:hidden;">                      
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="7" :padding="0" :style="{marginTop: '10px'}">
                <Card>
                    <div id="caseTime" style="height:400px;overflow-y:auto;"></div>
                </Card>
            </Col>
            <Col span="7" :style="{marginTop: '10px'}">
                <Card>
                    <div id="caseOrigin" style="height:400px;overflow-y:auto;"></div>
                </Card>
            </Col>
            <Col span="10" :style="{marginTop: '10px'}">
                <Card>
                    <div id="area" style="height:400px;overflow-y:auto;">
                        <span style="font-size:18px;font-weight: bolder;color:#333333">按地区统计</span>
                        <DatePicker type="daterange" placeholder="" v-model="daterange" style="width: 250px;margin-bottom:10px;margin-left:230px" format="yyyy-MM-dd"></DatePicker>
                        <Button style='float:right' shape="circle" icon="ios-folder" type="primary" @click="exportTable">导出</Button>
                        <MyTreeGrid 
                            ref="dataGrid"
                            :height="350"
                            :loading="loading"
                            size="small"
                            border 
                            :columns="columnList" 
                            :data="filterTree" 
                            expandUrl="/$admin/depts/node">
                        </MyTreeGrid>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import echarts from "echarts";
import MyTreeGrid from '../../components/treeGrid/MyTreeGrid.vue'
import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../../node_modules/echarts/extension/bmap/bmap.js' // 引入百度地图
export default {
    name:"caseCount",
    components: {
        MyTreeGrid
    },
    data () {
        return {
            daterange: '',
            Statistics: {
                work: ''
            },
            //当前统计数据
            currentSeries: [],
            //作业类型数据
            workStatus: [
                { name:'合计数量', value: 'total'},
                { name:'案件办理中', value: 'status1'},
                { name:'案件已完结', value: 'status2'},
                { name:'案件归档', value: 'status8'},
                { name:'移送案件', value: 'turnover'},
                { name:'移交统计', value: 'move'},
                { name:'移送人统计', value: 'transferNumber'}
            ],
            workSeries: [],
            workMap: new Map(),
            queryWork: {
                type:"workType",
                topNum:8
            },
            //案件时间数据
            queryTime: {
                type:"happenTime",
                sortType:"date",
                dataType:"yyyy-MM",
                topNum:12
            },
            //案件来源数据
            queryOrigin: {
                type:"source",
                topNum:10
            },
            //地区表格数据
            columnList: [
                // {   
                //     title:'序号',
                //     type: 'index',
                //     width: 70,
                //     align: 'center',
                //     key: 'id'
                // },
                {
                    title: '地区名称',
                    type: 'tree',
                    width: 200,
                    align: 'left',
                    key: 'name'
                },
                {
                    title: '案件办理中',
                    align: 'center',
                    key: 'status1'
                },
                {
                    title: '案件已完结',
                    align: 'center',
                    key: 'status2'
                },
                {
                    title: '案件归档',
                    align: 'center',
                    key: 'status8'
                },
                {
                    title: '三无渔船案件数',
                    align: 'center',
                    key: 'threeNoShip'
                },
                {
                    title: '移送案件',
                    align: 'center',
                    key: 'turnover'
                },
                {
                    title: '移交统计',
                    align: 'center',
                    key: 'move'
                },
                {
                    title: '移送人统计',
                    align: 'center',
                    key: 'transferNumber'
                },
                {
                    title: '合计数量',
                    align: 'center',
                    key: 'total'
                }
            ],
            dataList: [],
            query:{
                type:"region",
                beginTime:"",
                endTime:""
            }, 
            loading: true,
            //渔区数据
            queryFish: {
                type: "area"
            },
            shipMap: new Map(),
        }
    },
    methods: {
        exportTable() {
            Date.prototype.format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            var path = "";
            if (this.daterange[0]!="") {
                path += '&beginTime='+this.daterange[0].format("yyyy-MM-dd")+" 00:00:00";
            } 
            if (this.daterange[1]!="") {
                path += '&endTime='+this.daterange[1].format("yyyy-MM-dd")+" 23:59:59";
            } 
            window.open(this.$basePath+"/enforces/statistic/exportExcel?"+path.substr(1));
        },
        gotoRoute() {
            this.$router.push({
                path: '../enforcement/case/caseStatistics',
                query: {
                    
                }
            });
        },
        //作业类型下拉
        selectWork(value) {
            this.workSeries = this.workMap.get(value)
            this.initTaskWork()
        },
        //地区树表格
        loadDataTree(){
            var _self=this;
            this.$http.get('/enforces/statistic/getPage', {
                    params:{
                        query: JSON.stringify(_self.query)
                    }
                })
                .then(res => {
                    if(res.success){
                        _self.dataList=res.data;
                        _self.loading = false
                        _self.currentSeries = [
                            // {name: '案件办理中', data:res.data[0].status1},
                            // {name: '案件完结', data:res.data[0].status2},
                            // {name: '案件归档', data:res.data[0].status8},
                            // {name: '三无渔船', data:res.data[0].threeNoShip},
                            // {name: '移送案件', data:res.data[0].turnover},
                            {
                                name:'案件数量',
                                type:'line',
                                smooth:true, //设置折线平滑
                                itemStyle: {normal: {areaStyle: {color:'#F3F6FD',type: 'default'}}},
                                data: [res.data[0].status1,res.data[0].status2,res.data[0].status8]
                            }
                        ]
                        _self.initCurrent();
                    }
                })
                .catch(error => {
                    console.log(error);
                });           
        },
        //当前统计初始化
        initCurrent(){
            var option = {
                color: ['#096CFE'],
                tooltip : {
                    trigger: 'axis'
                },
                title:{
                    text:'按办理状态统计',
                    y: 20,
                    x: 20,
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['案件办理中','案件完结','案件归档']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : this.currentSeries
            };
            echarts.init(document.getElementById("current")).setOption(option)
        },
        //作业类型初始化
        taskWork_Data() {
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryWork)
                }
            }).then(res => {
                if (res.success) {
                    let mapArr_total = []
                    let mapArr_status1 = []
                    let mapArr_status2 = []
                    let mapArr_status8 = []
                    let mapArr_move = []
                    let mapArr_turnover = []
                    let mapArr_transferNumber = []
                    res.data.forEach(element => {
                        mapArr_total.push({name:element.workMode,value:element.total})
                        mapArr_status1.push({name:element.workMode,value:element.status1})
                        mapArr_status2.push({name:element.workMode,value:element.status2})
                        mapArr_status8.push({name:element.workMode,value:element.status8})
                        mapArr_move.push({name:element.workMode,value:element.move})
                        mapArr_turnover.push({name:element.workMode,value:element.turnover})
                        mapArr_transferNumber.push({name:element.workMode,value:element.transferNumber})
                    });
                    this.workMap.set('total', mapArr_total)
                    this.workMap.set('status1', mapArr_status1)
                    this.workMap.set('status2', mapArr_status2)
                    this.workMap.set('status8', mapArr_status8)
                    this.workMap.set('move', mapArr_move)
                    this.workMap.set('turnover', mapArr_turnover)
                    this.workMap.set('transferNumber', mapArr_transferNumber)
                    this.initTaskWork()
                }
            })
            .catch(error => {
                console.log(error);
            });         
        },
        initTaskWork(){
            if (this.workSeries.length === 0) {
                this.Statistics.work = this.workStatus[0].value
                let obj = this.workMap.get('total')
                this.workSeries = obj
            }
            // 获取作业类型
            var legendArr = [];
            for(var str in this.workSeries)
                legendArr.push(this.workSeries[str].name);
                
            var option = {
                color:['#1D4DFF','#F8D21E','#FA2016','#1CB36E','#733DF3'],
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                     x: 'right',
                     top: '20%',
                    orient: 'vertical',
                    data: legendArr
                },
                calculable : true,
                series : [
                    {
                        name:'按作业类型统计',
                        type:'pie',
                        radius: ['50%', '70%'],
                        center: ['40%', '50%'],
                        data: this.workSeries,
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                    }
                ]
            };
            echarts.init(document.getElementById("taskWork")).setOption(option)
        },
        //案件来源初始化
        initCaseOrigin() {
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryOrigin)
                }
            }).then(res => {
                if (res.success) {
                    var caseSource = [];
                    let arrTotal = [];
                    let arrStatus1 = [];
                    let arrStatus8 = [];
                    let arrStatus2 = [];
                    let arrMove = [];
                    let arrTurnover = [];
                    let arrTransferNumber = [];
                    res.data.forEach(element => {
                        caseSource.push(element.caseSource)
                        arrTotal.push(element.total)
                        arrStatus1.push(element.status1)
                        arrStatus8.push(element.status8)
                        arrStatus2.push(element.status2)
                        arrMove.push(element.move)
                        arrTurnover.push(element.turnover)   
                        arrTransferNumber.push(element.transferNumber)                    
                    });
                    caseSource= caseSource.reverse()
                    arrTotal = arrTotal.reverse()
                    arrStatus1 = arrStatus1.reverse()
                    arrStatus8 = arrStatus8.reverse()
                    arrStatus2 = arrStatus2.reverse()
                    arrMove = arrMove.reverse()
                    arrTurnover = arrTurnover.reverse()
                    arrTransferNumber = arrTransferNumber.reverse()
                    var caseSourceSeries = [
                        {
                            name:'案件办理中',
                            type:'bar',
                            stack: '总量',
                            barWidth: "20",
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    barBorderRadius: [10, 0, 0, 10] 
                                },
                                normal: {
                                    barBorderRadius: [10, 0, 0, 10] 
                                }
                            },
                            data:arrStatus1
                        },
                        {
                            name:'案件完结',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data:arrStatus2
                        },
                        {
                            name:'案件归档',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data:arrStatus8
                        },
                        {
                            name:'移送案件',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data:arrTurnover
                        },
                        {
                            name:'移交统计',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data:arrMove
                        },
                        {
                            name:'移送人统计',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            data:arrTransferNumber
                        },
                        {
                            name:'合计数量',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: false,
                                    position: 'insideRight'
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    barBorderRadius: [0, 10, 10, 0] 
                                },
                                normal: {
                                    barBorderRadius: [0, 10, 10, 0] 
                                }
                            },
                            data:arrTotal
                        },
                    ]
                    var option = {
                         title:{
                            text:'案件来源统计',
                            y: 8,
                            x: 5,
                            textStyle:{
                                fontWeight:'bolder'
                            }
                        },
                        grid: {
                            left: '28%',
                            top: '25%'
                        },
                        color: ["#0067FE", "#F1CE32","#1CB36E","#00AEFF","#733DF3","#191970","#FC2014"],
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['案件办理中','案件完结','案件归档','移送案件','移交统计','移送人统计','合计数量'],
                            top:'10%'
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'value',
                                show: false
                            }
                        ],
                        // yAxis : [
                        //     {
                        //         type : 'category',
                        //         axisLine: {
                        //             show: false
                        //         },
                        //         axisTick: {
                        //             show: false
                        //         },
                        //         data : caseSource
                        //     }
                        // ],
                        yAxis: [{
                            type: 'category',
                            data: caseSource,
                            splitLine: {show: false},
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            offset: 10,
                            nameTextStyle: {
                                fontSize: 15
                            }
                        }],
                        series : caseSourceSeries                
                    };
                    echarts.init(document.getElementById("caseOrigin")).setOption(option)                     
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //案件时间初始化
        initCaseTime() {
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryTime)
                }
            }).then(res => {
                if (res.success) {
                    var timeDate = [];
                    let arrTotal = [];
                    let arrStatus1 = [];
                    let arrStatus8 = [];
                    let arrStatus2 = [];
                    let arrTurnover = [];
                    let arrMove = [];
                    let arrThreeNoShip = [];
                    let arrTransferNumber = [];
                    res.data.forEach(element => {
                        timeDate.push(element.dataRule)
                        arrTotal.push(element.total)
                        arrStatus1.push(element.status1)
                        arrStatus8.push(element.status8)
                        arrStatus2.push(element.status2)
                        arrTurnover.push(element.turnover)
                        arrMove.push(element.move)
                        arrThreeNoShip.push(element.threeNoShip)    
                        arrTransferNumber.push(element.transferNumber)           
                    });
                    var timeSeries = [
                        {
                            name:'案件办理中',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrStatus1
                        },
                        {
                            name:'案件完结',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrStatus2
                        },
                        {
                            name:'案件归档',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrStatus2
                        },
                        {
                            name:'移送案件',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrTurnover
                        },
                        {
                            name:'移交统计',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrMove
                        },
                        {
                            name:'三无渔船',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrThreeNoShip
                        },
                        {
                            name:'合计数量',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrTotal
                        },
                        {
                            name:'移送人统计',
                            type:'bar',
                            barWidth: "10",
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                }
                            },
                            data:arrTransferNumber
                        },
                    ]
                    var option = {
                        color: ["#0067FE", "#F1CE32","#1CB36E","#00AEFF","#733DF3","#FC2014","#9400D3"],
                        title:{
                            text:'案发时间统计',
                            y: 8,
                            x: 5,
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: "shadow"
                            }
                        },
                        legend: {
                            data:['案件办理中','案件完结','案件归档','移送案件','移交统计','三无渔船','合计数量','移送人统计'],
                            top:'10%'
                        },
                        grid: {
                            top:'30%'
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                // boundaryGap : false,
                                data : timeDate
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                boundaryGap: [0, 0.01]
                            }
                        ],
                        series : timeSeries                
                    };
                    echarts.init(document.getElementById("caseTime")).setOption(option)                     
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //渔区初始化
        initFishArea() {
            var map = new BMap.Map("fishArea");            
            map.centerAndZoom(new BMap.Point(122.96118,29.160692), 6);
            map.enableScrollWheelZoom();
            var b = new BMap.Bounds(new BMap.Point(111.807819,26.026019),new BMap.Point(129.322046,36.879733));
            // BMapLib.AreaRestriction.setBounds(map, b);
            // map.disableDragging();
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryFish)
                }
            }).then(res => {
                if (res.success) {
                    for (var i = 0; i < res.data.splashes.length; i++) {
                        var strLon = 0;
                        var strlat = 0;
                        var value = 1;
                        if (res.data.splashes[i][0] - Math.floor(res.data.splashes[i][0]) <= 0.5){
                            strLon = Math.floor(res.data.splashes[i][0])
                        } else {
                            strLon = Math.floor(res.data.splashes[i][0])+0.5
                        }
                        if (res.data.splashes[i][1] - Math.floor(res.data.splashes[i][1]) <= 0.5) {
                            strlat = Math.floor(res.data.splashes[i][1])
                        } else {
                            strlat = Math.floor(res.data.splashes[i][1])+0.5
                        }
                        var strKey = strLon.toString()+'-'+strlat.toString()
                        if (this.shipMap.has(strKey)) {
                            this.shipMap.set(strKey,this.shipMap.get(strKey)+1)
                        } else {
                            this.shipMap.set(strKey,value)
                        }
                    }
                    var maxValue = 0
                    var colorArr = ['#FF0000','#FF4500','#FF7F00','#FFC125','#FFFF00']
                    this.shipMap.forEach(function (value, key, map) {
                         maxValue =  maxValue < value ? value : maxValue
                    });
                    var maxRatio = Math.floor(maxValue/5)
                    for (var i = 0; i < res.data.areas.length; i++) {
                        var lon = res.data.areas[i].lon;
                        var lat = res.data.areas[i].lat;
                        var value = 0;
                        var color = "#ffffff";
                        if (this.shipMap.has(lon+"-"+lat)) { 
                            if ( this.shipMap.get(lon+"-"+lat) == 0) {
                                color = "#ffffff"
                            } else if ( 0 < this.shipMap.get(lon+"-"+lat) && this.shipMap.get(lon+"-"+lat) < maxRatio) {
                                color = colorArr[4]
                            } else if ( maxRatio < this.shipMap.get(lon+"-"+lat) && this.shipMap.get(lon+"-"+lat) <= maxRatio*2) {
                                color = colorArr[3]
                            } else if ( maxRatio*2 < this.shipMap.get(lon+"-"+lat) && this.shipMap.get(lon+"-"+lat) <= maxRatio*3) {
                                color = colorArr[2]
                            } else if ( maxRatio*3 < this.shipMap.get(lon+"-"+lat) && this.shipMap.get(lon+"-"+lat) <= maxRatio*4 ) {
                                color = colorArr[1]
                            } else if ( maxRatio*4 < this.shipMap.get(lon+"-"+lat) && this.shipMap.get(lon+"-"+lat) <= maxValue) {
                                color = colorArr[0]
                            }
                        }                     
                        var polygon = new BMap.Polygon([
                            new BMap.Point(res.data.areas[i].lon, res.data.areas[i].lat+0.5),    //网格左上端点
                            new BMap.Point(res.data.areas[i].lon, res.data.areas[i].lat),  //网格左下端点
                            new BMap.Point(res.data.areas[i].lon+0.5, res.data.areas[i].lat),	 //网格右下端点
                            new BMap.Point(res.data.areas[i].lon+0.5, res.data.areas[i].lat+0.5)			//网格右上端点
                        ], {strokeColor:"blue", strokeWeight:1, strokeOpacity:0.1, fillColor:color});                   
                        if(this.shipMap.has(lon+"-"+lat)){
                            var infoValue = this.shipMap.get(lon+"-"+lat)
                            let point = new BMap.Point(lon+0.25,lat+0.25);
                            var opts = {
                                width : 200,     // 信息窗口宽度
                                height: 100,     // 信息窗口高度
                                title : "案件数量" , // 信息窗口标题
                            }
                            let infoWindow = new BMap.InfoWindow("数量:"+infoValue, opts);
                            polygon.addEventListener("mouseover",function(){
                                map.openInfoWindow(infoWindow,point);
                            }); 
                            // polygon.addEventListener("mouseout",function(){
                            //     map.closeInfoWindow(infoWindow,point);
                            // }); 
                        }
                        map.addOverlay(polygon);
                        // removeOverlay   
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });                  
        },
        //echarts初始化
        initEcharts(){
            this.initFishArea();
            this.initCaseTime();
            this.initCaseOrigin();
            this.taskWork_Data();
            this.initCurrent();
        },
    },
    computed:{
        filterTree(){
            var tree=this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
    },
    mounted () {
        this.initEcharts();
        this.loadDataTree();
    }
}
</script>


