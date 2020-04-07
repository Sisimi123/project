<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
<!-- 舟山首页 -->
    <div class="home-main" style="overfolw-y:hidden">
        <Row :gutter="10">
            <Col span="13" :style="{marginTop: '10px'}">
                <Row :gutter="10">
                    <Col class="margin-bottom-20" :xs="24" :sm="12" :md="6">
                        <div @click="showA()">
                            <infor-card
                                id-name="totalAreaWorker"
                                :end-val="count.totalAreaWorker"
                                iconType="person-stalker"
                                :iconSize=60
                                color="#1189FA"
                                titleText="从业人员总数"
                            ></infor-card>
                        </div>
                    </Col>            
                    <Col class="margin-bottom-20" :xs="24" :sm="12" :md="6" >
                        <!-- <div @click="showB()"> -->
                        <div @click="toShips()">    
                            <infor-card
                                id-name="totalShip"
                                :end-val="count.totalShip"
                                iconType="android-boat"
                                :iconSize=60
                                color="#00CC97"
                                titleText="渔船总数"
                            ></infor-card>
                        </div>
                    </Col>        
                    <Col :xs="24" :sm="12" :md="6" >
                        <infor-card
                            id-name="totalAreaWorker"
                            :end-val="count.onlineUser"
                            iconType="ios-person"
                            :iconSize=60
                            color="#FCBC27"
                            titleText="系统在线用户"
                        ></infor-card>
                    </Col>
                    <Col  :xs="24" :sm="12" :md="6" >
                        <infor-card2
                            id-name="weather"
                            iconType="ios-sunny-outline"
                            :iconSize=80
                            color="#78CBFE"
                        >
                        <b>{{city}} {{text}}</b>
                        <b>{{code}} {{wind}}</b>
                        </infor-card2>
                    </Col>
                </Row>
                <Row :gutter="10">
                    <Col span="10" :style="{marginTop: '10px'}">
                        <Card>
                            <p slot="title" class="card-title-select">
                                <span style="font-size:18px">
                                    <!-- <Icon type="ios-pulse-strong"></Icon> -->
                                    渔船数据统计
                                </span>
                                <span>
                                <Select v-model="pieShipType.area" placement="bottom" size="small" style="width:100px;margin-right:10px;" :transfer="true">
                                    <Option v-for="(item,index) in areas" :value="item.code" :key="index">{{ item.name }}</Option>
                                </Select>
                                </span>
                                <div>
                                    <RadioGroup v-model="pieShipType.type"> 
                                    <Radio label="1">作业类型</Radio>
                                    <Radio label="2">渔船材质</Radio>
                                    <Radio label="3">渔船大小</Radio>
                                    <Radio label="4">渔船功率</Radio>
                                </RadioGroup>
                                </div>
                            </p>
                            <div style="height:350px">
                                <pieShipType ref="pieShipType" :areaCode="pieShipType.area" :type="pieShipType.type"></pieShipType>
                            </div>
                        </Card>
                        <Card :style="{marginTop: '10px'}">
                            <p slot="title" style="font-size:18px" class="card-title">
                                从业人员年龄分布
                            </p>
                            <div style="height:148px">
                                <div class="ageDistributed">
                                    <div class="ageDistributed_div">
                                        <img src="../../styles/a.png" />
                                        <span>30岁以下</br><p>{{less30}}</P></span>
                                    </div>
                                    <div class="ageDistributed_div">
                                        <img src="../../styles/b.png" />
                                        <span>40-50岁</br><p>{{more40less50}}</P></span>
                                    </div>
                                    <div  class="ageDistributed_div">
                                        <img src="../../styles/c.png" />
                                        <span>60岁以上</br><p>{{more60}}</P></span>
                                    </div>
                                </div>
                                <div class="ageDistributed2">
                                    <div class="ageDistributed2_div">
                                        <img src="../../styles/d.png" />
                                        <span>30-40岁</br><p>{{more30less40}}</P></span>
                                    </div>
                                    <div class="ageDistributed2_div">
                                        <img src="../../styles/e.png" />
                                        <span>50-60岁</br><p>{{more50less60}}</P></span>
                                    </div>
                                    <div class="ageDistributed2_div">
                                        <img src="../../styles/a.png" />
                                        <span>无信息</br><p>{{other}}</P></span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span="14" :style="{marginTop: '10px'}">
                        <Card>
                            <!-- <p slot="title" class="card-title-select">
                                <span>
                                    <Icon type="ios-pulse-strong"></Icon>
                                    船员职务统计
                                </span>
                            </p> -->
                            <div style="height:256px">
                                <pieAreaWorkerType :areaCode="pieAreaWorkerType.area" :areas="areas"></pieAreaWorkerType>
                            </div>
                        </Card>
                        <Card :style="{marginTop: '10px'}">
                            <div style="height:370px">
                                <calendarDate></calendarDate>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col span="11" :style="{marginTop: '10px'}">
                <Card :padding="0">
                    <!-- <p slot="title" class="card-title">
                       证书有效期统计
                    </p> -->
                    <div style="height:400px;">
                        <cerificateValidTerm></cerificateValidTerm>
                    </div>
                </Card>
                <Card :padding="0" :style="{marginTop: '10px'}">
                    <!-- <p slot="title" class="card-title">
                        从业人员分布统计
                    </p> -->
                    <div style="height:400px;">
                        <barAreaWorker></barAreaWorker>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>
<script>
import barAreaWorker from './components/zhoushang/barAreaWorker';
import barShipGroup from './components/zhoushang/barShipGroup';
import pieAreaWorkerType from './components/zhoushang/pieAreaWorkerType';
import pieShipType from './components/zhoushang/pieShipType';
import calendarDate from './components/zhoushang/calendarDate';
import scatterWorkerAge from './components/zhoushang/scatterWorkerAge';
import cerificateValidTerm from './components/zhoushang/cerificateValidTerm';
import areaShip from './components/areaShip';

// 统计的资料小卡片
import inforCard from '@/views/components/statisticsDemo/MyInfoCard.vue';
import inforCard2 from '@/views/components/statisticsDemo/MyInfoCardSlot.vue';

export default {
    name: 'zshome',
    components: {
        inforCard,
        inforCard2,
        barAreaWorker,
        barShipGroup,
        pieAreaWorkerType,
        pieShipType,
        calendarDate,
        scatterWorkerAge,
        areaShip,
        cerificateValidTerm
    },
    data () {
        return {
            less30:"",
            more30less40:"",
            more40less50:"",
            more50less60:"",
            other:"",
            more60:"",
            city:"",
            text:"",
            code:"",
            wind:"",
            // 数据概览
            shipList:[],
            count: {
                totalAreaWorker: 0,     // 从业人员总数
                totalShip: 0,       // 渔船总数
                onlineUser: 0,
            },
            areas:[
                {
                    name:"舟山市",
                    code:"4021"
                },
                {
                    name:"市本级",
                    code:"5331"
                },
                {
                    name:"定海区",
                    code:"5205"
                },
                {
                    name:"普陀区",
                    code:"5190"
                },
                {
                    name:"岱山县",
                    code:"5185"
                },
                {
                    name:"嵊泗县",
                    code:"5200"
                },
                {
                    name:'远洋渔船',
                    code:"5618"
                }
            ],
            // areas:[],
            shipType:"作业类型",
            status: {
                showB: false,
            },
            pieShipType:{
                area:"4021",
                type:"1",
            },
            pieAreaWorkerType:{
                area:"4021",
                type:"",
            },
        };
    },
    methods:{
        showA(){
            this.$router.push({
                path: '/enforcement/achive/crewZs',
                query: {
                    areaCode:this.pieAreaWorkerType.area
                }
            });
        },
        showB(){
            this.status.showB = true;
            this.shipList.forEach(element => {
                element = 0;
            });
            this.$http
                .get("/shiparchives/nybstatistics/areaShip",{
                    params:{
                        node:"330900"
                    }
                })
                .then(res => {
                    this.shipList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        toShips(){
            this.$router.push({
                path: '/enforcement/achive/ships',
                query: {
                    // areaCode: item.codefishingArea
                    areaCode:this.pieAreaWorkerType.area
                }
            });
        },
        // pieAreaWorkerTypeChange(val){
        //     if(val == '330900'){
        //         this.pieAreaWorkerType.type = "2";
        //     } else {
        //         this.pieAreaWorkerType.type = "3";
        //     }
        // }
    },
    mounted(){
        // this.$http.get("/shiparchives/nybstatistics/xAxis")
        // .then(res => {
        //     let data = res.data
        //     this.areas = data
        //     this.pieAreaWorkerType.area = data[0].code
        //     this.pieAreaWorkerType.type = data[1].type
        //     this.pieShipType.area = data[0].code
        // })
        // .catch(error => {
        //   console.log(error);
        // });
        this.$http.get("/achive/zs/sailorcount")
        .then(res => {
            if (res.success) {              
               this.count.totalAreaWorker = res.data;
            }
        })
        .catch(error => {
          console.log(error);
        });

        this.$http.get("/achive/zs/shipcount")
        .then(res => {
            if (res.success) {
               this.count.totalShip = res.data;
            }
        })
        .catch(error => {
          console.log(error);
        });

        this.$http.get("/scd/onlineCount")
        .then(res => {
            if (res.success) {
               this.count.onlineUser = res.data;
            }
        })
        .catch(error => {
          console.log(error);
        });

        this.$http
        .get("/cms/weather/getWeather")
        .then(res => {
            var w = res.data;
            this.city = w.name;
            this.text = w.text_day == w.text_night ? w.text_day : w.text_day + "转" +  w.text_night;
            this.code = w.low+'℃~'+w.high +'℃';
            this.wind = w.wind_direction + "风 " + w.wind_scale + "级"; 
        })
        .catch(error => {
            console.log(error);
        });
        this.$http
        .get("/achive/zs/age").then(res => {
            var total = 0
            for (let i = 0; i < res.data.length; i++) {
                total += res.data[i].count
            }
            this.less30 = Number(res.data[0].count*100/total).toFixed(2) + '%'
            this.more30less40 = Number(res.data[1].count*100/total).toFixed(2) + '%'
            this.more40less50 = Number(res.data[2].count*100/total).toFixed(2) + '%'
            this.more50less60 = Number(res.data[3].count*100/total).toFixed(2) + '%'
            this.more60 = Number(res.data[4].count*100/total).toFixed(2) + '%'
            this.other = Number(res.data[5].count*100/total).toFixed(2) + '%'
        }).catch(err => {
            console.log(err)
        })
    },
};
</script>

<style scoped lang="less">
.ageDistributed{
    height:55%;
    width:100%;
    border-bottom:1px dashed #000;
    .ageDistributed_div{
        float:left;
        width:33%;
        height:100%;
        margin-bottom:10px;
        img{
            float:left;
            height:60%;
            width:40%;
            // position:relative;
            // top:20%;
        }
        span{
            float:left;
            height:50%;
            margin-left:5px;
        }
        p{
            font-size:18px;
            color:#4C95FD;
        }
    }
}
.ageDistributed2{
    height:45%;
    width:100%;
    .ageDistributed2_div{
        float:left;
        width:33%;
        height:100%;
        img{
            float:left;
            height:70%;
            width:40%;
        }
        span{
            float:left;
            height:50%;
            margin-left:5px;
        }
        p{
            font-size:18px;
            color:#4C95FD;
        }
    }
}
// .ivu-card-head {
//     border-bottom: none;
//     padding: 14px 16px;
//     line-height: 1;
// }
.card-title{
    height: 24px;
}
.card-title-select{
    height: 24px;
    display:flex;
    justify-content: space-between;
}
/* .ivu-col{
    margin-bottom: 10px;
} */

.weather-card{
    height: 100px;
    width: 100%;
    border-radius: 5px;
}
</style>
