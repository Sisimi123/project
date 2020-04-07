<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap shipScoreIndex">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipScore/shipScoreCase"  class="item all-line jfgl">
                    <p>
                        <i></i>
                        <span>
                            <em>记分管理</em>
                            <em>Record</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="shipScoreCase" subName="Record" :double="true" iconClz="jfgl"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipScore/shipScoreApplyClear"  class="item ycjf-xfgl volkswagen">
                    <i></i>
                        <em>消分申请</em>
                </router-link>
                <router-link to="/enforcement/shipScore/shipScoreApplyReward"  class="item ycjf-jfsq volkswagen">
                    <i></i>
                    <em>奖分申请</em>
                </router-link> -->
                <routerItem moduleId="shipScoreApplyClear" iconClz="ycjf-xfgl"/>
                <routerItem moduleId="shipScoreApplyReward" iconClz="ycjf-jfsq"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipScore/shipScoreItem" class="item  all-line ycjf-jftl">
                    <P>
                        <i></i>
                        <span>
                            <em>记分条例</em>
                            <em>ScoringRules</em>
                        </span>
                    </P>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="shipScoreItem" subName="ScoringRules" :double="true" iconClz="ycjf-jftl"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipscore/shipScoreUser" class="item grcx volkswagen">
                    <i></i>
                    <em>个人查询</em>
                </router-link> 
                <router-link to="/enforcement/shipScore/tzSafety" class="item aqjc volkswagen">
                    <i></i>
                    <em>安全检查</em>
                </router-link> -->
                <routerItem moduleId="shipScoreUser" iconClz="grcx"/>
                <routerItem moduleId="shipScoreTzSafety" iconClz="aqjc"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipScore/shipScoreStatistics"  class="item all-line ycjf-tj">
                    <p>
                        <i></i>
                        <span>
                            <em>统计</em>
                            <em>Statistics</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="shipScoreStatistics" subName="Statistics" :double="true" iconClz="ycjf-tj"/>
            </div>
            <div class="item-wrap">
                <div class="item img safetyjfrc"></div>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap" style="height:178px">
                <div class="item all-line img routineInspection1"></div>
            </div>
            <div class="item-wrap">

            </div>
            <div class="item-wrap" style="height:178px">
                <!-- <router-link to="/enforcement/shipScore/shipScoreList" class="item ycjf-mfbd volkswagen">
                    <i></i>
                    <em>满分榜单</em>
                </router-link>
                
                <router-link to="/enforcement/shipscore/safeBlankList" class="item ycjf-aqhmd volkswagen">
                    <i></i>
                    <em>安全黑名单</em>
                </router-link>  -->
                <routerItem moduleId="shipscorelist" iconClz="ycjf-mfbd"/>
                <routerItem moduleId="safeblanklist" iconClz="ycjf-aqhmd"/>
            </div>
        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
    name:"caseIndex",
    components:{
       routerItem
    },
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon3.png);
}
</style>
