<style lang="less">

</style>
<template>
<div>
    <data-content>
        <div>
            <Row>
                <Col :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title-select">
                            <span>
                                <Icon type="ios-pulse-strong"></Icon>
                                渔船区域记分统计
                            </span>
                            <span style="display:flex;align-items: center;">
                                <DatePicker v-model="barArea.startTime" type="date" show-week-numbers  placeholder="起始时间" placement="bottom"></DatePicker>
                                <DatePicker v-model="barArea.endTime" type="date" show-week-numbers  placeholder="截止时间(不包含当天)" placement="bottom"></DatePicker>
                            </span>
                            
                        </p>
                        <div class="data-source-row">
                            <bar-area :startTime="barArea.startTime" :endTime="barArea.endTime"></bar-area>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="ios-pulse-strong"></Icon>
                            船长、船东、公司涉嫌记分占比
                        </p>
                        <div class="data-source-row">
                            <data-source-pie></data-source-pie>
                        </div>
                    </Card>
                </Col>
                <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                    <Card>
                        <p slot="title" class="card-title">
                            <Icon type="ios-pulse-strong"></Icon>
                            当前在档人员记分占比
                        </p>
                        <div class="data-source-row">
                           <data-source-pie2></data-source-pie2>
                        </div>
                    </Card>
                </Col>

            </Row>
            <Row>
                <Card :padding="0">
                    <p slot="title" class="card-title">
                        <Icon type="map"></Icon>
                        历史各记分条例违反统计
                    </p>
                    <div>
                        <visite-volumea></visite-volumea> 
                    </div>
                </Card>
            </Row>
        </div>
    </data-content>
</div>
    

</template>

<script>

import barArea from './components/barArea.vue';
import visiteVolumeb from './components/pie-matter.vue';
import visiteVolumea from './components/markStatistics.vue';
import dataSourcePie from './components/pie-userScoreArea.vue';
import dataSourcePie2 from './components/pie-case.vue';

export default {
    name: 'shipScoreStatistics',
    components: {
        visiteVolumea,
        visiteVolumeb,
        dataSourcePie,
        dataSourcePie2,
        barArea
    },
    data () {
        return {
            barArea:{
                startTime:"",
                endTime:"",
            },
            
        };
    },
    computed: {
        
    },
    methods: {
        updateInfo(){
            
        }
    },
    mounted(){
         this.updateInfo();
    },
    beforeDestroy () {
        
    },
};
</script>
<style scoped>
.data-source-row{
    height: 300px;
}

.card-title-select{
    height: 24px;
    display:flex;
    justify-content: space-between;
}
</style>

