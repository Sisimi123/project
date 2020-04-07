
<template>
   <div>
      <Row :gutter="5" style="margin-left:0px;margin-right:0px" class-name="fisherAnalysisBox">
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card
               id-name="totalNum_count"
               :end-val="count.totalNum"
               iconType="ios-person-add"
               color="#2d8cf0"
               intro-text="渔船总数"
               :isCentage="false"
         ></infor-card>
      </Col>
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card
               id-name="onlineNum_count"
               :end-val="count.onlineNum"
               iconType="logo-buffer"
               color="#19be6b"
               intro-text="在线渔船数据"
               :isCentage="false"
         ></infor-card>
      </Col>
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card
               id-name="offline_count"
               :end-val="offlineNum"
               iconType="ios-people"
               color="#ffd572"
               :iconSize="50"
               intro-text="渔船离线数"
               :isCentage="false"
         ></infor-card>
      </Col> 
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card 
               id-name="onlineRate_count"
               :end-val="onlineRate"
               iconType="ios-shuffle"
               color="#64d572"
               intro-text="渔船在线率"
               :isCentage="true"
               :decimals="1"
         ></infor-card>
      </Col>
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card 
               id-name="inFishingPortNum_count"
               :end-val="count.inFishingPortNum"
               iconType="ios-shuffle"
               color="#f25e43"
               intro-text="在港渔船数"
               :isCentage="false"
         ></infor-card>
      </Col>
      <Col :xs="24" :sm="12" :md="4" :style="{marginBottom: '10px'}">
         <infor-card 
               id-name="FromEdNum_count"
               :end-val="count.FromEdNum"
               iconType="ios-shuffle"
               color="#f25e43"
               intro-text="渔船离编数"
               :isCentage="false"               
         ></infor-card>
      </Col>
   </Row>
   <Row :gutter="10" style="margin-left:0px;margin-right:0px">
            <Col :md="24" :lg="24" :style="{marginBottom: '10px'}">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <!-- <Icon type="ios-pulse-strong"></Icon> -->
                       出海作业天数统计
                    </p>
                    <div style="height:400px;">
                       <seaWorkDay></seaWorkDay>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="24">
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <!-- <Icon type="ios-pulse-strong"></Icon> -->
                        海上异常关机情况
                    </p>
                    <div style="height:400px;">
                       <abnormalTurnOff></abnormalTurnOff>
                    </div>
                </Card>
            </Col>
        </Row>
   </div>
</template>

<script>
import inforCard from '../../home/components/shipInforCard';
import seaWorkDay from './components/seaWorkDay'
import abnormalTurnOff from './components/abnormalTurnOff'

export default {
   name:"fisherAnalysis",
   components:{
        inforCard,
        seaWorkDay,
        abnormalTurnOff
   },
   data(){
      return{
         count:{
            totalNum:21597,
            onlineNum:16872,
            inFishingPortNum:3546,
            FromEdNum:321,
         }
      }
   },
   computed:{
      offlineNum(){
         return this.count.totalNum - this.count.onlineNum
      },
      onlineRate(){
         return (this.count.onlineNum/this.count.totalNum*100).toFixed(1)
      }
   }
}
</script>

<style>

</style>
