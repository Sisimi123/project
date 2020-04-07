<style lang="less" scoped>
    @import './styles/wzindex.less';
</style>
<template>
    <div class="nav-wrap homepageIndex" style="overflow: hidden !important;">
        <div class="chart-wrap l-ft">
            <div class="first" @click="openMap">
                <router-link to="" >
                    <p>渔船动态化监管</p>
                    <input type="button" value="查看海图" />
                </router-link>
            </div>
            <div class="jiange" ></div>
            <div class="second item-wrap">
                <div id="images" class="item img dayCheckcc">
                    <em>合作社简介</em>
                    <p class="wenzi">{{info.content}}</p>
                    <p v-if="quanXianShow" class="editorShowP" @click="editor()">图片编辑</p>
                    <p v-if="quanXianShow" class="editorShowW" @click="editorWords()">信息编辑</p>
                </div>
            </div>
        </div>
        <div class="block-wrap l-sd">
            <div class="item-wrap c-s">
                <router-link to="" class="item weather">
                    <b>{{city}}</b>
                    <span>{{text}}</span>
                    <span>{{code}}</span>
                    <span>{{wind}}</span>
                    <i></i>
                </router-link>
            </div>
            <div class="item-wrap c-z">
                <router-link to="/enforcement/cooperatebookIndex" class="item hzstz volkswagen">
                    <i></i>
                    <em>进入合作社台账</em>
                </router-link>
            </div>
            <div class="item-wrap c-x">
                <!-- <Card :padding="0" shadow style="width:100%;height:100%;"> -->
                    <certReminder style="width:100%;height:100%;"></certReminder>
                <!-- </Card> -->
            </div>
        </div>
        <div class="block-wrap l-st">
            <div class="item-wrap r-s">
                <router-link to="/enforcement/shipdanyanIndex" class="item  all-line ycdy"> 
                    <p>
                        <i></i>
                        <span>
                            <em>渔船点验</em>
                        </span> 
                    </p>
                </router-link>
                <router-link to="/enforcement/achive/filemanage" class="item all-line sy-tzgg">
                    <p>
                        <i></i>
                        <span>
                            <em>通知公告</em>
                        </span> 
                    </p>
                </router-link>
            </div>
            <div class="item-wrap r-z">
                <Card shadow style="width:100%;height:100%;">
                    <safeBooks class="item"></safeBooks>
                </Card>
            </div>
            <div class="item-wrap r-x">
                <Card shadow style="width:100%;height:100%;">
                    <shipStatus class="item"></shipStatus>
                </Card>
            </div>
        </div> 
        <MyImageEditor v-model="imageEditorModal" :aspectRatio=2 @on-ok="savePhoto"></MyImageEditor> 
        <Modal v-model="editorModal" :styles="{top: '220px'}" title="编辑信息" width="30%" :mask-closable=false>
            <Form :label-width="0" @submit.native.prevent>
                <Row>
                    <Col span="24">
                        <Form-item>
                            <Input type="textarea" v-model="info.content" :autosize="{minRows: 4,maxRows:6}"></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="editorModal=false">取消</Button>
                <Button @click="saveWords()" type="info">保存</Button>
            </div>
        </Modal>      
    </div>
</template>
<script>
import MyImageEditor from "@/views/components/image-editor/my-image-editor.vue";
import shipStatus from './shipStatus.vue';
import safeBooks from './safeBooks.vue';
import certReminder from './certReminder.vue';
export default {
    name:"enforcementIndex",
    components:{
    shipStatus,safeBooks,MyImageEditor,certReminder
    },
    data () {
        return {
            quanXianShow:false,
            //图文编辑
            prependImgUrl: this.$basePath +"/$admin/attachs/stream/",
            imageEditorModal:false,
            editorModal:false,
            info:{
                picId:'',
                content:"",
            },

            city:"",
            text:"",
            code:"",
            wind:"",
            weather:{
                name:"",
            },

        };
    },
    methods: {
        //图文编辑
        editorWords(){
            this.editorModal=true;
        },
        editor(){
            this.imageEditorModal=true;
        },
        saveWords(){
            this.info.content=this.info.content;
            this.save();
            this.editorModal=false;
        },
        savePhoto(value){
            this.info.picId = value.data.id;
            $("#images").css({
                'background-image':'url('+this.prependImgUrl+this.info.picId+')',
            });
            this.save();
        },
        save(){
            if(this.info.id==null || this.info.id==undefined){
                this.$http.post("standingbook/coop/tip/save",this.info)
                .then(res=>{
                    if(res.success){
                        this.$Message.info("编辑成功");
                    }else{
                        this.$Message.error("编辑失败");
                    }
                });
            }else{
                this.$http.patch("standingbook/coop/tip/"+this.info.id,this.info)
                .then(res=>{
                    console.log(res,"res");
                    if(res.success){
                        this.$Message.info("编辑成功");
                    }else{
                        this.$Message.error("编辑失败");
                    }
                });
            }
        },
        //
        handleSearch(){
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
        },
        openMap(){
            window.open(this.$basePath+"/attachment/map/newIndex.html");
            // window.open(this.$basePath+"/ycdtjg/MyMap.jsp");
            // window.open("http://122.228.31.152:8083/map/newIndex.html?_token="+this.$store.state.user.userInfo.refreshToken);
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        //下载图文信息
        downPw(){
            this.$http.get("/standingbook/coop/tip/getTip")
            .then(res=>{
                if(res.success){
                    if(res.data!=null){
                        this.info=res.data;
                        $("#images").css({
                            'background-image':'url('+this.prependImgUrl+this.info.picId+')',
                        });
                    }
                }
            });
        },
    },
    beforeMount() {
        this.downPw();
        // if(this.$hasRoles("cooperative")){
        // if(!this.$hasRoles("ADMIN")&&!this.$hasRoles("Manager")&&this.$hasRoles("cooperative")) {
            this.quanXianShow=true;
        // }else{
        //     this.quanXianShow=false;
        // }
    },
    created() {
        console.log(this.$route, "this.$route")
        if(!this.$hasRoles("ADMIN")&&!this.$hasRoles("Manager")&&this.$hasRoles("cooperative")) {
            this.$router.push("/enforcement/wzIndex");//首页路由地址
        } else {
            this.$router.push("/enforcement/index");//首页路由地址
        }
    },
    mounted() {
        this.handleSearch();
    }
};
</script>

<style scoped>
    .item-wrap.r-z /deep/ .ivu-card-body,.item-wrap.r-x /deep/ .ivu-card-body,.item-wrap.c-x /deep/ .ivu-card-body {
        height:100% !important;
        padding:0 !important;
    }

    .item-wrap /deep/ canvas{
        height:100% !important;
    }
</style>
    