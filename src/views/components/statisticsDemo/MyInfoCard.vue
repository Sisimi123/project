<style lang="less">

</style>

<template>
    <Card :padding="0">
        <div class="infor-card-con" :style="{backgroundColor: color, color: 'white', height: height}">
            <Col span="14" class="height-100">
                <Row type="flex" align="middle" justify="center" class="height-100">
                    <count-up 
                        class="" 
                        :id-name="idName" 
                        :end="endVal" 
                        :color="color"
                        :useGroup="true"
                    >
                    <div slot="left">
                        <span>{{ titleText }}</span>
                    </div>
                        <p class="infor-intro-text" slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
            <Col class="infor-card-icon-con" span="10">
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </Col>
            
        </div>
    </Card>
</template>

<script>
// import countUp from './countUp.vue';
import countUp from '../count-to/count-to-new.vue';
export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        color: String,
        height: String,
        iconType: String,
        titleText: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>

<style lang="less">
.infor-card-icon-con{
    height: 100%;
}
.height-100{
    height: 100%;
}
.infor-card-con{
    height: 100px;
    width: 100%;
    border-radius: 5px;
}
.infor-intro-text{
    font-size:12px;
    font-weight:500;
    columns: #666666;
}
</style>