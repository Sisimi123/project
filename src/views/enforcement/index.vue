<style lang="less" scoped>
    @import './styles/index.less';
</style>
<template>
    <div class="nav-wrap homepageIndex">
        <div class="chart-wrap" @click="openMap">
            <router-link to="#" >
                <p>渔船动态化监管</p>
                <input type="button" value="查看海图" />
            </router-link>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <router-link to="" class="item weather">
                    <i></i>
                    <b>{{city}}</b>
                    <span class="s1">{{text}}</span>
                    <span class="s2">{{code}}</span>
                    <span class="s3">{{wind}}</span>
                </router-link>
                <!-- <router-link to="/enforcement/achiveIndex" class="item xxcx volkswagen">
                    <i></i>
                    <em>信息查询</em>
                </router-link> -->
                <routerItem moduleId="achiveIndex"  iconClz="xxcx"/>
            </div>
            <div class="item-wrap">
                <router-link to=""  class="item all-line ldjk">
                    <p>
                        <i></i>
                        <span>
                            <em>雷达监控</em>
                            
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
                <!-- <router-link to="/enforcement/cooperatebookIndex" class="item hzstz volkswagen">
                    <i></i>
                    <em>合作社台账</em>
                </router-link> -->
                <routerItem moduleId="cooperatebookIndex"  iconClz="hzstz"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="" class="item dzzz volkswagen">
                    <i></i>
                    <em>电子证照</em>
                </router-link> -->
<!-- 
                <router-link to="/enforcement/shipScoreIndex" class="item ycaqjf index volkswagen">
                    <i></i>
                    <em>渔船安全记分</em>
                </router-link> -->
                <routerItem moduleId="shipScoreIndex"  iconClz="ycaqjf"/>
            </div>
        </div>
        <div class="block-wrap">
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/caseIndex"  class="item all-line ajbl">
                    <p>
                        <i></i>
                        <span>
                            <em>案件办理</em>
                            <em>Transaction</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link> -->
                <routerItem moduleId="caseIndex" subName="Transaction" :double="true" iconClz="ajbl"/>
            </div>
            <div class="item-wrap">
                <router-link to="/home" class="item xtgl volkswagen">
                    <i></i>
                    <em>系统管理</em>
                </router-link>
                <!-- <router-link to="/enforcement/checkIndex" class="item rcjc volkswagen"> 
                    <i></i>
                    <em>日常检查</em>
                </router-link> -->
                <routerItem moduleId="checkIndex"  iconClz="rcjc"/>
            </div>
            <div class="item-wrap">
                <!-- <router-link to="/enforcement/shipdanyanIndex" class="item ycdy volkswagen"> 
                    <i></i>
                    <em>渔船点验</em>
                </router-link> -->
                <routerItem moduleId="shipdanyan"  iconClz="ycdy"/>
                <router-link to=""  class="item all-line spjk">
                    <p>
                        <i></i>
                        <span>
                            <em>视频监控</em>
                            <em>Video</em>
                        </span> 
                    </p>
                    <input type="button" name="" value="">
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import routerItem from '@/views/components/module/routerItem.vue';
export default {
    name:"enforcementIndex",
    components:{
       routerItem
    },
    data () {
        return {
            city:"",
            text:"",
            code:"",
            wind:"",
            weather:{
                name:"",
            },

        };
    },
    computed: {
        moduleCodes(){
            return this.$store.state.app.moduleCodes;
        }
    },
    methods: {
        handleSearch(){
            this.$http
                .get("/cms/weather/getWeather")
                .then(res => {
                    console.log(res);
                    var w = res.data;
                    this.city = w.name;
                    this.text = w.text_day == w.text_night ? w.text_day : w.text_day + "转" +  w.text_night;
                    this.code = w.low+'℃~'+w.high +'℃';
                    this.wind = w.wind_direction + "风 " + w.wind_scale + "级"; 
                })
                .catch(error => {
                    console.log(error);
                });
        },
        openMap(){
            window.open(this.$basePath+"/attachment/h5/map/newIndex.html");
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
    },
    beforeRouteLeave(to, from, next){
        var urls = location.href.split("#")[1]
        if (urls==="/login") {
            next(false)
        } else {
            next()
        }
    },
    mounted() {
        this.handleSearch();
    },
};
</script>

<style scoped>
</style>
