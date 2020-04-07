<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                             <Row type="flex" class="user-infor">
                                <!--<Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <em style="background-image:url(/src/images/sr.png)"></em>
                                        <img class="avator-img" style="border-radius: 50%;" src="/src/images/sr.png" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <span>总营业额 {{totalSal}} 元</span><br/>
                                            <span>今日收入 {{todaySal}} 元</span>
                                        </div>
                                    </Row>
                                </Col>
                                -->
                                <div class="yye-wrap">
                                    <div class="yye-title">
                                        <em>收入</em>
                                    </div>
                                    <div class="yye-info">
                                        <span><label>总收入额</label><em><i>{{totalSal}}</i><b>元</b></em></span>
                                        <span><label>今日收入</label><em><i>{{todaySal}}</i><b>元</b></em></span>
                                    </div>
                                </div>
                            </Row>
                            <!-- <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2018.03.08-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">温州</Col>
                            </Row> -->
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="podium"></Icon>
                                接单排行榜
                            </p>
                            <div style="height:200px; overflow:auto">
                                <ul class="ranking-wrap">
                                        <li v-for="(item, index) in rankList">
                                            <span class="number"><i>{{index+1}}</i></span>
                                            <span class="photo">
                                                <img :src="actionUrl +item.photoUrl" style="width:50px;height:50px; border-radius: 50%;"/>
                                            </span>
                                            <span class="user-name">{{item.realName}}</span>
                                            <span class="orderCount">{{item.orderCount}}</span>
                                        </li>
                                </ul>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="android-person-add"
                            color="#2d8cf0"
                            intro-text="今日新增用户"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="social-buffer"
                            color="#ffd572"
                            intro-text="今日订单数"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="ios-people"
                            color="#64d572"
                            :iconSize="50"
                            intro-text="在线电工"
                        ></infor-card>
                    </Col>
                    
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card 
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="ios-shuffle"
                            color="#f25e43"
                            intro-text="今日服务调用量"
                        ></infor-card>
                    </Col>
                </Row>
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="map"></Icon>
                            近三月营业厅订单
                        </p>
                        <div class="data-source-row" style="height:300px">
                                <visite-volumea></visite-volumea> 
                        </div>
                    </Card>
                </Row>
            </Col>
        </Row>
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        近一周订单完成情况
                    </p>
                    <div class="data-source-row">
                        <data-source-pieb></data-source-pieb>
                        <!-- <visite-volume></visite-volume> -->
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        历史订单类型分布图
                    </p>
                    <div class="data-source-row">
                        <data-source-pie></data-source-pie>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        历史收入统计（元）
                    </p>
                    <div class="data-source-row">
                        <data-source-piea></data-source-piea>
                    </div>
                </Card>
            </Col>
            <!-- <Col :md="24" :lg="8">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-wifi"></Icon>
                        各类用户服务调用变化统计
                    </p>
                    <div class="data-source-row">
                        <user-flow></user-flow>
                    </div>
                </Card>
            </Col> -->
        </Row>
        <!-- <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>
import homeMap from './components/map.vue';
import dataSourcePie from './components/pie-orderType.vue';
import dataSourcePiea from './components/pie-orderPrice.vue';
import dataSourcePieb from './components/pie-orderStatus.vue';
import visiteVolume from './components/NewVisiteVolume.vue';
import visiteVolumea from './components/NewVisiteVolume2.vue';
import serviceRequests from './components/serviceRequests.vue';
import userFlow from './components/userFlow.vue';
import countUp from './components/countUp.vue';
import inforCard from './components/inforCard.vue';
import mapDataTable from './components/mapDataTable.vue';

export default {
    name: 'home',
    components: {
        homeMap,
        dataSourcePie,
        dataSourcePiea,
        dataSourcePieb,
        visiteVolume,
        visiteVolumea,
        serviceRequests,
        userFlow,
        inforCard,
        countUp,
        
    },
    data () {
        return {
            timeOut:{},
            actionUrl: this.$basePath +"/$admin/attachs/stream/",
            rankList:[
            ],
            count: {
                createUser: 0,
                visit: 0,
                collection: 0,
                transfer: 0
            },

            totalSal: 0,
            todaySal: 0,
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        updateInfo(){
            this.$http
                .get("/enanny/count/salTotal")
                .then(res => {
                    this.totalSal = this.$util.isEmpty(res.data[0].total)? 0 : res.data[0].total;
                    this.todaySal = this.$util.isEmpty(res.data[0].today)? 0 : res.data[0].today;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$http
                .get("/enanny/count/onlineCount")
                .then(res => {
                     this.count.visit = res.data;
                    // this.count.visit =256;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$http
                .get("/enanny/count/userOrderCount")
                .then(res => {
                    this.rankList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$http
                .get("/enanny/count/newUserCount")
                .then(res => {
                    this.count.createUser = res.data;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$http
                .get("/enanny/count/repairCount")
                .then(res => {
                    this.count.collection = res.data;
                })
                .catch(err => {
                    console.log(err);
                });

            this.$http
                .get("/enanny/count/interfaceCount")
                .then(res => {
                    this.count.transfer = res.data;
                })
                .catch(err => {
                    console.log(err);
                });

            this.timeOut = setTimeout(() => {
                this.updateInfo();
            }, 30000);
        }
    },

    mounted(){
         this.updateInfo();
    },
    beforeDestroy () {
        console.log("beforeDestroy");
        clearTimeout(this.timeOut);
    },
};
</script>
