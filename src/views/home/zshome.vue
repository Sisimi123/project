<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
<!-- 舟山首页 -->
    <div class="home-main">
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
            <Col  :xs="24" :sm="12" :md="6" >
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
            <Col span="15" :style="{marginBottom: '10px'}">
                <Card :padding="0">
                    <p slot="title">
                        <!-- <Icon type="ios-pulse-strong"></Icon> -->
                        从业人员分布统计
                    </p>
                    <div style="height:400px;">
                        <barAreaWorker></barAreaWorker>
                    </div>
                </Card>
            </Col>
            <Col span="9">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        日历
                    </p>
                    <div style="height:395px;">
                        <calendarDate></calendarDate>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="15" :style="{marginBottom: '10px'}">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <!-- <Icon type="ios-pulse-strong"></Icon> -->
                       证书有效期统计
                    </p>
                    <div style="height:400px;">
                        <!-- <barShipGroup></barShipGroup> -->
                        <cerificateValidTerm></cerificateValidTerm>
                    </div>
                </Card>
            </Col>
            <Col span="9">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <!-- <Icon type="ios-pulse-strong"></Icon> -->
                        从业人员年龄分布
                    </p>
                    <div style="height:400px;">
                        <scatterWorkerAge></scatterWorkerAge>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title-select">
                        <span>
                            <Icon type="ios-pulse-strong"></Icon>
                            船员职务统计
                        </span>
                        <span style="display:flex;align-items: center;">
                            <Select v-model="pieAreaWorkerType.area"  placement="bottom" size="small" style="width:100px;margin-right:10px;" :transfer="true">
                                <Option v-for="(item,index) in areas" :value="item.code" :key="index">{{ item.name }}</Option>
                            </Select>
                        </span>
                    </p>
                    <div style="height:300px">
                        <pieAreaWorkerType :areaCode="pieAreaWorkerType.area" :areas="areas"></pieAreaWorkerType>
                    </div>
                </Card>
            </Col>


            <Col span="12" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title-select">
                        <span>
                            <Icon type="ios-pulse-strong"></Icon>
                            渔船数据统计
                        </span>
                        <span style="display:flex;align-items: center;">
                            <Select v-model="pieShipType.area" placement="bottom" size="small" style="width:100px;margin-right:10px;" :transfer="true">
                                <Option v-for="(item,index) in areas" :value="item.code" :key="index">{{ item.name }}</Option>
                            </Select>
                            <RadioGroup v-model="pieShipType.type"> 
                                <Radio label="1">作业类型</Radio>
                                <Radio label="2">渔船材质</Radio>
                                <Radio label="3">渔船大小</Radio>
                                <Radio label="4">渔船功率</Radio>
                            </RadioGroup>
                        </span>
                    </p>
                    <div style="height:300px">
                        <pieShipType ref="pieShipType" :areaCode="pieShipType.area" :type="pieShipType.type"></pieShipType>
                    </div>
                </Card>
            </Col>
        </Row>


        <!-- <Modal :width="640" v-model="status.showB" title="各地区渔船数量" ok-text="确认" cancel-text="关闭"  :scrollable=true :mask-closable="true">
            <Row :gutter="10">
                <div v-for="(item,index) in shipList" :key="index" @click="toShips(item)">
                    <Col :xs="24" :sm="12" :md="8">
                        <infor-card
                            :id-name="item.name + index"
                            :end-val="item.count"
                            iconType="android-boat"
                            :iconSize=60
                            color="#00CC97"
                            :titleText="item.name"
                        ></infor-card>
                    </Col>
                </div>
                
            </Row>
        </Modal> -->
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
            // areas:[
            //     {
            //         name:"全市",
            //         code:"330900"
            //     },
            //     {
            //         name:"市辖区",
            //         code:"330901"
            //     },
            //     {
            //         name:"定海区",
            //         code:"330902"
            //     },
            //     {
            //         name:"普陀区",
            //         code:"330903"
            //     },
            //     {
            //         name:"岱山县",
            //         code:"330921"
            //     },
            //     {
            //         name:"嵊泗县",
            //         code:"330922"
            //     }
            // ],
            areas:[],
            shipType:"作业类型",
            status: {
                showB: false,
            },
            pieShipType:{
                area:"",
                type:"1",
            },
            pieAreaWorkerType:{
                area:"",
                type:"",
            },
        };
    },
    methods:{
        showA(){
            this.$router.push({
                path: '/enforcement/achive/crews',
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
                    console.log("test",res.data);
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
        this.$http.get("/shiparchives/nybstatistics/xAxis")
        .then(res => {
            console.log("xAxis",res.data);
            let data = res.data
            this.areas = data
            this.pieAreaWorkerType.area = data[0].code
            this.pieAreaWorkerType.type = data[1].type
            this.pieShipType.area = data[0].code
        })
        .catch(error => {
          console.log(error);
        });
        this.$http.get("/checks/shipsailor/count", {
          params: {
              areaCode:"330900",
              type:4,
          }
        })
        .then(res => {
            console.log("areaWorker",res);
            if (res.success) {
               this.count.totalAreaWorker = res.data.count;
            }
        })
        .catch(error => {
          console.log(error);
        });

        this.$http.get("/shiparchives/nybstatistics/countAreaShip", {
          params: {
              areaCode:"330900",
          }
        })
        .then(res => {
            console.log("totalShip",res);
            if (res.success) {
               this.count.totalShip = res.data.count;
            }
        })
        .catch(error => {
          console.log(error);
        });

        this.$http.get("/scd/onlineCount")
        .then(res => {
            console.log("onlineCount",res);
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
            console.log(res);
            var w = res.data;
            this.city = w.name;
            this.text = w.text_day == w.text_night ? w.text_day : w.text_day + "转" +  w.text_night;
            this.code = w.low+'℃~'+w.high +'℃';
            this.wind = w.wind_direction + "风 " + w.wind_scale + "级"; 
            // <Icon type="ios-sunny-outline"></Icon>
            // <Icon type="ios-rainy-outline"></Icon>
            // <Icon type="ios-thunderstorm-outline"></Icon>
            // <Icon type="ios-partlysunny-outline"></Icon>
            // <Icon type="ios-snowy"></Icon>
            // <Icon type="ios-cloudy-outline"></Icon>
        })
        .catch(error => {
            console.log(error);
        });

    },
};
</script>

<style scoped>
.card-title{
    height: 24px;
}
.card-title-select{
    height: 24px;
    display:flex;
    justify-content: space-between;
}
.ivu-col{
    margin-bottom: 10px;
}

.weather-card{
    height: 100px;
    width: 100%;
    border-radius: 5px;
}
</style>
