<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageRoutineInspection">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/oneShipOneFile" class="item all-line ycyd">
                    <p>
                        <i></i>
                        <span>
                            <em>一船一档</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <!-- <routerItem moduleId="shipFile" :double="true" iconClz="ycyd"/> -->
                <routerItem moduleId="shipManagement" subName="ship management" :double="true" iconClz="ycyd"/>
                <!-- <routerItem moduleId="shipManagement" :double="true" iconClz="ycyd"/> -->
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/rulesmng"  class="item gzzd volkswagen">
                    <i></i>
                    <em>规章制度</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/filemng" class="item wjgl volkswagen">
                    <i></i>
                    <em>文件管理</em>
                </router-link> -->
                <routerItem moduleId="rulesmng" iconClz="gzzd"/>
                <routerItem moduleId="filemng" iconClz="wjgl"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/worknote" class="item zbrz volkswagen">
                    <i></i>
                    <em>值班日志</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/certificateReminder" class="item zsdq volkswagen">
                    <i></i>
                    <em>证书到期</em>
                </router-link> -->
                <routerItem moduleId="worknote" iconClz="zbrz"/>
                <routerItem moduleId="certificateReminder" iconClz="zsdq"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/bianzu" class="item all-line ycbz">
                    <p>
                        <i></i>
                        <span>
                            <em>渔船编组</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="bianzu" :double="true" iconClz="ycbz"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/check/guardian" class="item all-line jhrgl">
                    <p>
                        <i></i>
                        <span>
                            <em>监护人管理</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="guardian" :double="true" iconClz="jhrgl"/>
            </div> 
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/drlc" class="item volkswagen drlc">
                    <i></i>
                    <em>定人联船</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/attachLibrary" class="item wjgl volkswagen">
                    <i></i>
                    <em>附件库</em>
                </router-link> -->
                <routerItem moduleId="drlc" iconClz="drlc"/>
                <routerItem moduleId="attachLibrary" iconClz="wjgl"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/safecheck" class="item volkswagen hzs-aqjc">
                    <i></i>
                    <em>安全检查</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/laborContract" class="item wjgl volkswagen">
                    <i></i>
                    <em>船员劳动合同书</em>
                </router-link> -->
                <routerItem moduleId="safecheck" iconClz="hzs-aqjc"/>
                <routerItem moduleId="laborContract" iconClz="wjgl"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/safeacts" class="item aqhd volkswagen">
                    <i></i>
                    <em>安全活动</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/firework" class="item mhzy volkswagen">
                    <i></i>
                    <em>明火作业</em>
                </router-link> -->
                <routerItem moduleId="safeacts" iconClz="aqhd"/>
                <routerItem moduleId="firework" iconClz="mhzy"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/cooperatebook/movereport" class="item ybbg volkswagen">
                    <i></i>
                    <em>移泊报告</em>
                </router-link>
                <router-link to="/enforcement/cooperatebook/seafishevents" class="item hshy volkswagen">
                    <i></i>
                    <em>海事渔事</em>
                </router-link> -->
                <routerItem moduleId="movereport" iconClz="ybbg"/>
                <routerItem moduleId="seafishevents" iconClz="hshy"/>
            </div>
        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
   name:"achiveIndex",
   components:{
       routerItem
    },
};
</script>

<style scoped>
.item i{
    background-image: url(../../images/icon2.png);
}
</style>
