<style scoped style lang="less">
    .anchorBL{
        display: none;
    }
    .content{
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        width: 100%;
    }
    .fontSty{
        display: inline-block;
        width: 40px;
        height: 30px;
        line-height: 30px;        
    }

</style>
<template>
    <div class="content">
        <Row :gutter="10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card title="当前统计" icon="ios-pulse-strong">
                    <div id="current" style="height:400px;overflow:auto;width:500px;">                      
                    </div>                    
                </Card>
            </Col>
            <Col :md="24" :lg="16" :style="{marginBottom: '10px'}">
                <Card title="按地区统计" icon="ios-pulse-strong">
                    <div id="area" style="height:400px;overflow-y:auto;">
                        <label class="fontSty">时间 :</label>
                        <DatePicker type="daterange" placeholder="" v-model="daterange" @on-change="selectTime" style="width: 250px;margin-bottom:10px" format="yyyy-MM-dd"></DatePicker>
                        <Button type="primary"  icon="ios-search" style="margin-left:10px;" @click="searchByTime">搜索</Button>
                        <Button type="success"  icon="ios-folder" style="margin-left:10px;" @click="exportTable">导出</Button>
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
        <Row :gutter="10">
            <!-- <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card title="按案由统计" icon="ios-pulse-strong">
                    <div style="height:400px;overflow:auto;width:500px;">
                        <label class="fontSty">案由</label>
                        <i-Select v-model="Statistics.result" @on-change="selectResult" style="width:300px" placeholder="">
                            <i-Option v-for="item in resultDate" :value="item" :key="item">{{item}}</i-Option>
                        </i-Select>
                        <div id="caseResult" style="height:350px;margin-top:10px;width:500px;"></div>
                    </div>                    
                </Card>
            </Col> -->
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card title="按作业类型统计" icon="ios-pulse-strong">
                    <div style="height:400px;overflow:auto;width:500px;">
                        <label class="fontSty">状态</label>
                        <i-Select v-model="Statistics.work" @on-change="selectWork" style="width:120px" placeholder="">
                            <i-Option v-for="item in workStatus" :value="item.value" :key="item.value">{{item.name}}</i-Option>
                        </i-Select>
                        <div id="taskWork" style="height:350px;margin-top:10px;width:500px;"></div>                        
                    </div>                    
                </Card>
            </Col>            
            <Col :md="24" :lg="16" :style="{marginBottom: '10px'}">
                <Card title="按渔区统计" icon="ios-pulse-strong">
                    <div id="fishArea" style="height:400px;overflow-y:auto;" ref="myEchart"></div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10">
            <!-- <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <Card title="按执法人员统计" icon="ios-pulse-strong">
                    <div id="lawMan" style="height:400px;overflow-y:auto;"></div>
                </Card>
            </Col> -->
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <Card title="按案件来源统计" icon="ios-pulse-strong">
                    <div id="caseOrigin" style="height:400px;overflow-y:auto;"></div>
                </Card>
            </Col>
            <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                <Card title="按案发时间统计" icon="ios-pulse-strong">
                    <div id="caseTime" style="height:400px;overflow-y:auto;"></div>
                </Card>
            </Col>
        </Row>                   
    </div>
</template>

<script>
import { isNull } from '@/libs/common.js'
import MyTreeGrid from '../../components/treeGrid/MyTreeGrid.vue'
import echarts from "echarts";
import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
import '../../../../node_modules/echarts/extension/bmap/bmap.js' // 引入百度地图
export default {
    name:"caseStatistics",
    components: {
        MyTreeGrid
    }, 
    data() {
        var _self=this;
        return {
            daterange:'',
            shipMap: new Map(),
            loading: true,
            infoValue: 0,
            Statistics: {
                work: '',
                result: ''
            },                                   
            columnList: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
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
                    title: '合计数量',
                    align: 'center',
                    key: 'total'
                }
            ],
            //地区表格数据
            dataList: [],
            query:{
                type:"region",
                beginTime:"",
                endTime:""
            },            
            //工作类型数据
            workStatus: [
                { name:'合计数量', value: 'total'},
                { name:'案件办理中', value: 'status1'},
                { name:'案件已完结', value: 'status2'},
                { name:'案件归档', value: 'status8'},
                { name:'移送案件', value: 'turnover'},
                { name:'移交统计', value: 'move'}
            ],
            workSeries: [],
            workMap: new Map(),
            queryWork: {
                type:"workType",
                topNum:8
            },
            work_total: 0,
            //案由数据            
            // resultDate: [],
            // resultMap: new Map(),
            // resultSeries: [],            
            // queryResult: {
            //     type:"reason",
            //     topNum:10
            // },
            //案件时间数据
            queryTime: {
                type:"happenTime",
                sortType:"date",
                dataType:"yyyy-MM",
                topNum:12
            },
            //渔区数据
            queryFish: {
                type: "area"
            },
            //执法人员数据
            // queryLawMan: {
            //     type:"people",
            //     topNum:5
            // },
            //案件来源数据
            queryOrigin: {
                type:"source",
                topNum:10
            },
            //当前统计数据
            currentSeries: [],
        }
    },
    computed:{
        filterTree(){
            var tree=this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
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
                            {name: '案件办理中', value:res.data[0].status1},
                            {name: '案件完结', value:res.data[0].status2},
                            {name: '案件归档', value:res.data[0].status8},
                            {name: '三无渔船', value:res.data[0].threeNoShip},
                            {name: '移送案件', value:res.data[0].turnover},
                            {name: '移交统计', value:res.data[0].move}
                        ]
                        _self.initCurrent();
                    }
                })
                .catch(error => {
                    console.log(error);
                });           
        },
        caseResult_Data() {
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryResult)
                }
            }).then(res => {
                if (res.success) {
                    res.data.forEach(element => {
                        this.resultDate.push(element.punishAccording)
                        this.resultMap.set(element.punishAccording,element)
                    });
                    this.Statistics.result = this.resultDate[0]
                    this.initCaseResult()
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
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
                    let mapArr_turnover = []
                    res.data.forEach(element => {
                        mapArr_total.push({name:element.workMode,value:element.total})
                        mapArr_status1.push({name:element.workMode,value:element.status1})
                        mapArr_status2.push({name:element.workMode,value:element.status2})
                        mapArr_status8.push({name:element.workMode,value:element.status8})
                        mapArr_turnover.push({name:element.workMode,value:element.turnover})
                    });
                    this.workMap.set('total', mapArr_total)
                    this.workMap.set('status1', mapArr_status1)
                    this.workMap.set('status2', mapArr_status2)
                    this.workMap.set('status8', mapArr_status8)
                    this.workMap.set('turnover', mapArr_turnover)
                    this.initTaskWork()
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
            BMapLib.AreaRestriction.setBounds(map, b);
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
                            polygon.addEventListener("mouseout",function(){
                                map.closeInfoWindow(infoWindow,point);
                            }); 
                        }
                        map.addOverlay(polygon);
                        // removeOverlay   
                    }
                    $('#fishArea div.anchorBL').remove();    //去除左下角水印
                }
            })
            .catch(error => {
                console.log(error);
            });                  
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
                    res.data.forEach(element => {
                        caseSource.push(element.caseSource)
                        arrTotal.push(element.total)
                        arrStatus1.push(element.status1)
                        arrStatus8.push(element.status8)
                        arrStatus2.push(element.status2)
                        arrMove.push(element.move)
                        arrTurnover.push(element.turnover)                       
                    });
                    caseSource= caseSource.reverse()
                    arrTotal = arrTotal.reverse()
                    arrStatus1 = arrStatus1.reverse()
                    arrStatus8 = arrStatus8.reverse()
                    arrStatus2 = arrStatus2.reverse()
                    arrMove = arrMove.reverse()
                    arrTurnover = arrTurnover.reverse()
                    var caseSourceSeries = [
                        {
                            name:'案件办理中',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus1
                        },
                        {
                            name:'案件完结',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus2
                        },
                        {
                            name:'案件归档',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus8
                        },
                        {
                            name:'移送案件',
                            type:'bar',
                            stack: '总量',
                            data:arrTurnover
                        },
                        {
                            name:'移交统计',
                            type:'bar',
                            stack: '总量',
                            data:arrMove
                        },
                        {
                            name:'合计数量',
                            type:'bar',
                            stack: '总量',
                            data:arrTotal
                        },
                    ]
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['案件办理中','案件完结','案件归档','移送案件','移交统计','合计数量']
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                data : caseSource,
                                barCategoryGap:'50%',
                                axisLabel: {
                                    interval:0,
                                    rotate:40 
                                }
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : caseSourceSeries                
                    };
                    echarts.init(document.getElementById("caseOrigin")).setOption(option)                     
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        //案由初始化
        initCaseResult() {
            if (this.resultSeries.length === 0) {
                let obj = this.resultMap.get(this.resultDate[0])
                this.resultSeries = [
                    {name: '合计数量', value:obj.total},
                    {name: '案件办理中', value:obj.status1},
                    {name: '案件完结', value:obj.status2},
                    {name: '案件归档', value:obj.status8},
                    {name: '移交统计', value:obj.turnover},
                ]
            }
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['合计数量','案件办理中','案件完结','案件归档','移交统计']
                },
                calculable : true,
                series : [
                    {
                        name:'按案由统计',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: this.resultSeries
                    }
                ]
            };
            echarts.init(document.getElementById("caseResult")).setOption(option)
        },
        //当前统计初始化
        initCurrent(){
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['案件办理中','案件完结','案件归档','三无渔船','移送案件','移交统计']
                },
                calculable : true,
                series : [
                    {
                        name:'按工作类型统计',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: this.currentSeries
                    }
                ]
            };
            echarts.init(document.getElementById("current")).setOption(option)
        },
        //工作类型初始化
        initTaskWork(){
            if (this.workSeries.length === 0) {
                this.Statistics.work = this.workStatus[0].value
                let obj = this.workMap.get('total')
                this.workSeries = obj
            }
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['合计数量','案件办理中','案件完结','案件归档','移交统计']
                },
                calculable : true,
                series : [
                    {
                        name:'按工作类型统计',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: this.workSeries
                    }
                ]
            };
            echarts.init(document.getElementById("taskWork")).setOption(option)
        },
        //执法人员初始化
        initLawMan(){
            this.$http.get('/enforces/statistic/getPage', {
                params: {
                    query: JSON.stringify(this.queryLawMan)
                }
            }).then(res=> {
                if (res.success) {
                    var lawDate = [];
                    let arrTotal = [];
                    let arrStatus1 = [];
                    let arrStatus8 = [];
                    let arrStatus2 = [];
                    let arrTurnover = [];
                    res.data.forEach(element => {
                        lawDate.push(element.lawMan)
                        arrTotal.push(element.total)
                        arrStatus1.push(element.status1)
                        arrStatus8.push(element.status8)
                        arrStatus2.push(element.status2)
                        arrTurnover.push(element.turnover)                       
                    });
                    var lawSeries = [
                        {
                            name:'案件办理中',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus1
                        },
                        {
                            name:'案件完结',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus2
                        },
                        {
                            name:'案件归档',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus2
                        },
                        {
                            name:'移交统计',
                            type:'bar',
                            stack: '总量',
                            data:arrTurnover
                        },
                        {
                            name:'合计数量',
                            type:'bar',
                            stack: '总量',
                            data:arrTotal
                        },
                    ]
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['案件办理中','案件完结','案件归档','移交统计','合计数量']
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                // boundaryGap : false,
                                data : lawDate
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : lawSeries                
                    };
                    echarts.init(document.getElementById("lawMan")).setOption(option)                     
                }
            }).catch(error=> {
                console.log(error);
            })
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
                    res.data.forEach(element => {
                        timeDate.push(element.dataRule)
                        arrTotal.push(element.total)
                        arrStatus1.push(element.status1)
                        arrStatus8.push(element.status8)
                        arrStatus2.push(element.status2)
                        arrTurnover.push(element.turnover)     
                        arrThreeNoShip.push(element.threeNoShip)                  
                        arrMove.push(element.move)
                    });
                    var timeSeries = [
                        {
                            name:'案件办理中',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus1
                        },
                        {
                            name:'案件完结',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus2
                        },
                        {
                            name:'案件归档',
                            type:'bar',
                            stack: '总量',
                            data:arrStatus2
                        },
                        {
                            name:'三无渔船',
                            type:'bar',
                            stack: '总量',
                            data:arrThreeNoShip
                        },
                        {
                            name:'移送案件',
                            type:'bar',
                            stack: '总量',
                            data:arrTurnover
                        },
                        {
                            name:'移交统计',
                            type:'bar',
                            stack: '总量',
                            data:arrMove
                        },
                        {
                            name:'合计数量',
                            type:'bar',
                            stack: '总量',
                            data:arrTotal
                        },
                    ]
                    var option = {
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['案件办理中','案件完结','案件归档','三无渔船','移送案件','移交统计','合计数量']
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
                                type : 'value'
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
        //案由下拉
        selectResult(value) {
            let obj = this.resultMap.get(value)
            this.resultSeries = [
                {name: '合计数量', value:obj.total},
                {name: '案件办理中', value:obj.status1},
                {name: '案件完结', value:obj.status2},
                {name: '案件归档', value:obj.status8},
                {name: '移交统计', value:obj.turnover},
            ]
            this.initCaseResult()
        },
        //工作类型下拉
        selectWork(value) {
            console.log(value)
            this.workSeries = this.workMap.get(value)
            this.initTaskWork()
        },
        //时间选择框
        selectTime(data) {
            // this.loadDataTree();  
            this.query.beginTime = data[0]
            this.query.endTime = data[1]
        },
        searchByTime() {
            this.loading = true
            this.loadDataTree();
        },
        //echarts初始化
        initEcharts(){
            this.taskWork_Data();
            // this.caseResult_Data();
            this.initCaseTime();
            // this.initLawMan();
            this.initCurrent();    
            this.initCaseOrigin(); 
            this.initFishArea();
        },
    },
    created(){
 
    },
    mounted(){        
        this.loadDataTree();
        this.initEcharts();
    },
    // watch: {
    //     value(val) {
    //         if (val) {
    //             this.initEcharts();
    //         }
    //     }        
    // }
}
</script>




