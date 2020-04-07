<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageInfoSearch">
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/ships"  class="item all-line ycda">
                    <p>
                        <i></i>
                        <span>
                            <em>证书查询</em>
                            <em>Certificate query</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="ships" subName="Certificate query" :double="true" iconClz="ycda"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/crews" class="item cyda volkswagen">
                    <i></i>
                    <em>船员档案</em>
                </router-link>
                <router-link to="/enforcement/achive/maillist" class="item txl volkswagen">
                    <i></i>
                    <em>通讯录</em>
                </router-link> -->
                <routerItem moduleId="crews" iconClz="cyda"/>
                <routerItem moduleId="maillist" iconClz="txl"/>
            </div>
            <!-- <div class="item-wrap">
                <router-link to=""  class="item all-line yzda">
                    <p>
                        <i></i>
                        <span>
                            <em>养殖档案</em>
                            <em>Breed record</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div> -->
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/employerInsurance" class="item gzzrhb volkswagen">
                    <i></i>
                    <em>雇主责任互保</em>
                </router-link>
                <router-link to="/enforcement/achive/shipInsurance" class="item yczrhb volkswagen">
                    <i></i>
                    <em>渔船互保</em>
                </router-link> -->
                <routerItem moduleId="employerInsurance" iconClz="gzzrhb"/>
                <routerItem moduleId="shipInsurance" iconClz="yczrhb"/>
            </div>
            <div class="item-wrap">
                <div class="item-wrap">
                    <!-- <router-link to="/enforcement/achive/filemanage" class="item all-line tzgg">
                        <p>
                            <i></i>
                            <span>
                                <em>通知公告</em>
                                <em>Announcement</em>
                            </span> 
                        </p>
                        <input type="button" name="" value="">
                    </router-link> -->
                    <routerItem moduleId="filemanage" subName="Announcement"  iconClz="tzgg"/>
                    <routerItem moduleId="radioLicense" iconClz="ycda"/>
                </div>
            </div>

            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/crewFile" class="item cyda_jzxt all-line">
                    <p>
                        <i></i>
                        <span>
                            <em>船员档案(救助系统)</em>
                            <em>Crew file</em>
                        </span>
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="crewFile" subName="Crew file"  iconClz="cyda_jzxt"/>
                <routerItem moduleId="testLicense" iconClz="txl"/>
            </div>
        </div>
        <div class="block-wrap">
             <div class="item-wrap" style="height:178px">
                <!--舟山船员档案-->
                <!-- <router-link to="/enforcement/achive/crewZs" class="item cyda volkswagen">
                    <i></i>
                    <em>船员档案</em>
                </router-link>-->
                <routerItem moduleId="crewZs" iconClz="cyda"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/shipFile" class="item ycda all-line">
                    <p>
                        <i></i>
                        <span>
                            <em>渔船档案</em>
                            <em>Fishing vessel files</em>
                        </span>
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <!-- <router-link to="/enforcement/achive/exam" class="item ksgl volkswagen">
                    <i></i>
                    <em>考试管理</em>
                </router-link> -->
                <routerItem moduleId="shipFile" subName="Fishing vessel files" :double="true" iconClz="ycda"/>
                <routerItem moduleId="exam" iconClz="ksgl"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/achive/shipManagement" class="item ycda all-line">
                    <p>
                        <i></i>
                        <span>
                            <em>船舶管理</em>
                            <em>ship management </em>
                        </span>
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="shipManagement" subName="ship management" :double="true" iconClz="ycda"/>
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
