<style lang="less">
    @import "../styles/achive.less";
</style>
<template>
  <Card>
        <Row>
            <Col :xs="3" :sm="3" :md="3" :lg="3" span="3">
                <Menu active-name="设备分布" :style="'width:auto'" @on-select="menuSelect">
                    <MenuGroup title="图表统计">
                        <MenuItem name="设备分布">
                            <Icon type="ios-paper"/>
                            设备分布
                        </MenuItem>
                        <MenuItem name="用户注册与流失">
                            <Icon type="ios-paper" />
                            用户注册与流失
                        </MenuItem>
                        <MenuItem name="活跃用户统计">
                            <Icon type="ios-paper" />
                            活跃用户统计
                        </MenuItem>
                        <MenuItem name="IP热力图">
                            <Icon type="ios-paper" />
                            IP热力图
                        </MenuItem>
                    </MenuGroup>
                </Menu>
            </Col>
            <Col :xs="21" :sm="21" :md="21" :lg="21" span="21">
                <!-- 设备分布 -->
                <div style="margin-left:17px" v-show="title=='设备分布'">
                    <Row>
                        <h3 style="padding-bottom: 20px">设备分布</h3>
                        <Col span="12">
                            <Table :columns="userDrivice" :data="userDriviceDate"></Table>
                        </Col>
                        <Col span="12">
                            <div id="drivice" style="float:right;width:600px;height:500px"></div>
                        </Col>
                    </Row>
                </div>
                <!-- 用户注册与流失 -->
                <div style="margin-left:17px" v-show="title=='用户注册与流失'">
                    <Row>
                        <h3 style="padding-bottom: 20px">用户注册与流失</h3>
                        <Col span="12">
                            <Table :columns="userDrivice" :data="userDriviceDate"></Table>
                        </Col>
                        <Col span="12">
                            <div id="registerAndLapsed" style="float:right;width:600px;height:500px"></div>
                        </Col>
                    </Row>
                </div>
                <!-- 活跃用户统计 -->
                <div style="margin-left:17px" v-show="title=='活跃用户统计'">

                </div>
                <!-- IP热力图 -->
                <div style="margin-left:17px" v-show="title=='IP热力图'">

                </div>
            </Col>
        </Row>
  </Card>
</template>
<script>
import echarts from 'echarts';
export default {
    name:"statistics",
    data(){
        return {
            title:"设备分布",//统计statistics左边栏开启状态
            // 设备分布-数据
            userDrivice: [
                {
                    title:"设备种类",
                    key:"name",
                },
                {
                    title:"使用数量",
                    key:"useCount",
                },
                {
                    title:"百分比(%)",
                    key:"value",
                },
                {
                    title:"用户活跃度(%)",
                    key:"userHot",
                }
            ],
            userDriviceDate:[
                {
                    name:"IOS",
                    useCount:"30000",
                    value:"30",
                    userHot:"49",
                },
                {
                    name:"ANDROID",
                    useCount:"50000",
                    value:"60",
                    userHot:"56",
                },
                {
                    name:"PC BROWSER",
                    useCount:"60000",
                    value:"10",
                    userHot:"19",
                },
            ],
            // 用户注册与流失-数据

        }
    },
    mounted(){
        this.echartsDrivice();
    },
    methods:{
        // 设备分布-图表
        echartsDrivice(){
            // 基于准备好的dom，初始化echarts实例
            var drivice = echarts.init(document.getElementById('drivice'));
            // 指定图表的配置项和数据
            var option = {
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '70%',
                        data:[],
                    }
                ]
            };
            option.series[0].data=this.userDriviceDate;
            // 使用刚指定的配置项和数据显示图表。
            drivice.setOption(option);
        },
        // 注册与流失-图表
        registerAndLapsed(){
            var drivice = echarts.init(document.getElementById('registerAndLapsed'));
            var posList = [
                'left', 'right', 'top', 'bottom',
                'inside',
                'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
            ];

            var config = {
                rotate: 90,
                align: 'left',
                verticalAlign: 'middle',
                position: 'insideBottom',
                distance: 15,
                onChange: function () {
                    var labelOption = {
                        normal: {
                            rotate: config.rotate,
                            align: config.align,
                            verticalAlign: config.verticalAlign,
                            position: config.position,
                            distance: config.distance
                        }
                    };
                    myChart.setOption({
                        series: [{
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }, {
                            label: labelOption
                        }]
                    });
                }
            };


            var labelOption = {
                normal: {
                    show: true,
                    position: config.position,
                    distance: config.distance,
                    align: config.align,
                    verticalAlign: config.verticalAlign,
                    rotate: config.rotate,
                    formatter: '{c}  {name|{a}}',
                    fontSize: 16,
                    rich: {
                        name: {
                            textBorderColor: '#fff'
                        }
                    }
                }
            };



            var option = {
                color: ['#4cabce', '#e5323e'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    // 表上每个x轴数据的字段名
                    data: ['Desert', 'Wetland']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {show: false},
                        // x轴分类参数
                        data: ['2012', '2013', '2014', '2015', '2016','2018']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Desert',
                        type: 'bar',
                        label: labelOption,
                        data: [150, 232, 201, 154, 190, 131]
                    },
                    {
                        name: 'Wetland',
                        type: 'bar',
                        label: labelOption,
                        data: [98, 77, 101, 99, 40, 121]
                    }
                ]
            };

            option.series[0].data=this.userDriviceDate;
            drivice.setOption(option);
        },

        // 左侧列表点击切换页面
        menuSelect(name){
            this.title=name;
            this.echartsRefresh();
        },
        // 刷新图表
        echartsRefresh(){
            this.echartsDrivice();
            this.registerAndLapsed();
        }
    }
}
</script>
<style scoped>

</style>
