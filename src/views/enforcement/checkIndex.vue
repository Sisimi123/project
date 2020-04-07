<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap shipDayCheck">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/catch" class="item all-line kbjc">
                    <p>
                        <i></i>
                        <span>
                            <em>开捕检查</em>
                            <em>Check for Fishery</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="catch" subName="Check for Fishery" :double="true"  iconClz="kbjc"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/portreport" class="item cgjc volkswagen">
                    <i></i>
                    <em>出港报告</em>
                </router-link> -->
                <routerItem moduleId="portreport" iconClz="cgjc"/>
                <div class="item img dayCheckcs"></div>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/safety"  class="item all-line daycheck-aqjc">
                    <p>
                        <i></i>
                        <span>
                            <em>安全检查</em>
                            <em>Safety inspection</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="safety" subName="Safety inspection" :double="true" iconClz="daycheck-aqjc"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/skdb" class="item skdb volkswagen">
                    <i></i>
                    <em>四库对比</em>
                </router-link> -->
                <!-- <router-link to="/enforcement/check/skhc" class="item skjc volkswagen">
                    <i></i>
                    <em>三库核查</em>
                </router-link> -->
                <routerItem moduleId="skdb" iconClz="skdb"/>
                <routerItem moduleId="skhc" iconClz="skjc"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/zysjcn" class="item all-line zysjcns">
                    <p>
                        <i></i>
                        <span>
                            <em>自愿上缴承诺书</em>
                            <em>Letter of undertaking</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>              -->
                <routerItem moduleId="zysjcn" subName="Letter of undertaking" :double="true" iconClz="zysjcns"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/dailyCheck" class="item all-line dailyCheck">
                    <p>
                        <i></i>
                        <span>
                            <em>日常执法检查数据报送</em>
                            <em>Daily Law Enforcement</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="dailyCheck" subName="Daily Law Enforcement" :double="true" iconClz="dailyCheck"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap" style="height:178px">
		        <routerItem moduleId="shipContrast" iconClz="dailyCheck"/>
                <routerItem moduleId="crewCompare" iconClz="skdb"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/wjyhwjsd" class="item all-line wjyhjyd">
                    <p>
                        <i></i>
                        <span>
                            <em>违禁渔获物检查单</em>
                            <em>Illegal catch</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="wjyhwjsd" subName="Illegal catch" :double="true" iconClz="wjyhjyd"/>
            </div>
            <div class="item-wrap">           
                <!-- <router-link to="/enforcement/check/newdxjb"  class="item all-line dxjb">
                    <p>
                        <i></i>
                        <span>
                            <em>多休减捕</em>
                            <em>Reduce fishing</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="newdxjb" subName="Reduce fishing" :double="true" iconClz="dxjb"/>
            </div>
        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
    name:"checkIndex",
    components:{
       routerItem
    },
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon4.png);
}
</style>
