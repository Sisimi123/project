<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>

<template>
<div>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="handleOk"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <slot name="close"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <div slot="footer" >

            <Button type="primary"  @click="visible = false">关闭</Button>
        </div>
        <Form :label-width="100" :model="info" ref="info">
            <div>
                <fieldset class="title">
                    <legend>*渔船信息</legend>
                </fieldset>

                <Row>
                    <Col span="8">
                        <Form-item label="渔船名:" >
                            <Input v-model="info.shipName" readonly/>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="船籍港:" >
                            <Input v-model="info.area" readonly></Input> 
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="捕捞许可证号:" >
                            <Input v-model="info.fishCertificate" readonly/>
                        </Form-item>
                    </Col>
                </Row>
            </div>

            <div>
                <fieldset class="title">
                    <legend>
                        *责任人信息
                    </legend>
                </fieldset>
                <div>
                    <Row>
                        <Col span="8">
                            <Form-item label="船东:" >
                                <Input v-model="info.shipownerName" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船东身份证号:" >
                                <Input v-model="info.shipownerIdCard" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船东手机号:" >
                                <Input v-model="info.shipownerTel" readonly/>
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="船长:" >
                                <Input v-model="info.captainName" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船长身份证号:" >
                                <Input v-model="info.captainIdCard" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船长手机号:" >
                                <Input v-model="info.captainTel" readonly/>
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="公司名:">
                                <Input v-model="info.companyName" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="企业注册号:">
                                <Input v-model="info.companyIdCard" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="负责人手机号:">
                                <Input v-model="info.companyTel" readonly/>
                            </Form-item>
                        </Col>
                        
                    </Row>
                    <!-- <Row>
                        <Col span="12">
                            <Form-item label="船长职务证书编号:" >
                                <Input v-model="info.captainCNumber" readonly/>
                            </Form-item>
                        </Col>
                    </Row> -->
                </div>
            </div>

            <div>
                <fieldset class="title">
                    <legend>*涉及记分事件信息</legend>
                </fieldset>
                <template v-for="(item,index) in info.matter">
                    <div :key="item.id">
                        <div>
                            <Row>
                                <Col span="12">
                                    <Form-item :label="'涉嫌'+(index+1)+':'" >
                                        <Input v-model="item.title" type="textarea" :autosize="{minRows: 1,maxRows: 3}" readonly></Input> 
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Form-item label="船东记分:" >
                                    <Input v-model="item.shipownerScore"  readonly>
                                        <span slot="append">分</span>
                                    </Input>
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Form-item label="船长记分:" >
                                    <Input v-model="item.captainScore"  readonly>
                                        <span slot="append">分</span>
                                    </Input>
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Form-item label="公司记分:" >
                                    <Input v-model="item.companyScore"  readonly>
                                        <span slot="append">分</span>
                                    </Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row v-if="!isEmpty(item.imgUrlList)">
                                <Form-item label="附件:" >
                                    <div class="markScore-upload-list" v-for="url in getImgUrl(item)" v-bind:key="url">
                                            <img :src="url">
                                            <div class="markScore-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                                            </div>
                                    </div>
                                </Form-item>
                            </Row>
                        </div>
                    </div>
                </template>
                <Row>
                    <Col span="6">
                        <Form-item label="记录人员:" >
                            <Input v-model="info.noteTaker" readonly/>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="违反时间:" >
                            <DatePicker type="datetime" v-model="info.noteTime" readonly></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="船东总记分:" >
                            <Input v-model="info.shipownerScore" readonly>
                                <span slot="append">分</span>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="船长总记分:" >
                            <Input v-model="info.captainScore" readonly>
                                <span slot="append">分</span>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="公司总记分:" >
                            <Input v-model="info.companyScore" readonly>
                                <span slot="append">分</span>
                            </Input>
                        </Form-item>
                    </Col>
                    
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="备注说明:" >
                            <Input v-model="info.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 3}" readonly/>
                        </Form-item>
                    </Col>
                </Row>
            </div>
        </Form>

    </Modal>
    <pic v-model="imgVisible" :img="imgUrl"></pic>
    <!-- <Modal class="vertical-center-modal" title="图片" v-model="imgVisible">
      <img :src="imgUrl" style="width: 100%">
    </Modal> -->
</div>
</template>

<script>
import pic from '@/views/components/pic/pic.vue';
export default {
    name: "markScoreDetail",
    components: {
        pic,
    }, 
    props: {
        value: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "记分详情"
            //default: ""
        },
        width: {
            type: [Number, String],
            default: 1080
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        className: {
            type: String,
            default:"vertical-center-modal"
        },
        // for instance
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default () {
                return ['ease', 'fade'];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        //-----------------------------------------------
        id: {
            type: String,
            default: ""
        },
    },
    data () {
        return {
            visible: false,
            info:{
                shipownerName:"", // 船东姓名
                shipownerIdCard:"", // 船东身份证号
                shipownerTel:"", // 船东联系电话
                fishCertificate:"", // 捕捞许可证
                shipownerScore:"", // 船东本次记分/消分 数值

                captainName:"", // 船长姓名
                captainIdCard:"", // 船长身份证号
                captainTel:"", // 船长联系电话
                captainCNumber:"", // 船长证书编号（船长职务证书）
                captainScore:"", // 船长本次记分/消分 数值
                matter:[],
            },

            uploadList: [],
            initial: "initial",
            imgUrl: "",
            imgVisible: false
        };
    },
    methods: {
        ok() {
            this.visible = false;
            this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.visible = false;
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        handleOk(){
            this.ok();
        },
        handleSearch(){
            this.uploadList = [];
            this.initial = "initial";

            this.$http
                .get("/enforces/shipscoremark/get?id=" + this.id)
                .then(res => {
                    console.log("info",res);
                    this.info = res.data;
                    var matters = this.info.matter;
                })
                .catch(error => {
                    console.log(error);
                });

           
        },
        getImgUrl(item){
            var idList = item.imgUrlList.split(",");
            var urlList = [];
            idList.forEach(element => {
                let url = this.$basePath + "/$admin/attachs/stream/" + element;
                urlList.push(url);
            });
            return urlList;
        },
        handleView(url) {
            this.imgUrl = url;
            this.imgVisible = true;
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
    },
    mounted() {
        this.visible = false;
    },
    beforeDestroy(){
        this.visible = false;
        this.$emit("input",this.visible);
    },
    watch:{
        value(val){
            if(val){
                this.visible = val;
                this.handleSearch();
            }
        }
    }
};
</script>
<style scoped>
fieldset.title{
    border:none;
    position: relative;
    
}
fieldset.title legend{
    margin: 0 10px;
    padding: 0 15px;
    font-size: 18px;
}
fieldset.title button{
    position: absolute;
    left: 200px;
    top: 0;
}
.event-content{
    margin-top: 10px;
    max-height: 160px;
    overflow: auto;
}

.ivu-tabs-tabpane{
    overflow: auto;
}
.markScore-upload-list{
    display: inline-block;
    width: 100px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border: 1px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 10px;
}
.markScore-upload-list img{
    width: 100%;
    height: 100%;
}
.markScore-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.markScore-upload-list:hover .markScore-upload-list-cover{
    display: block;
}
.markScore-upload-list-cover i{
    color: #fff;
    font-size: 30px;
    cursor: pointer;
    margin: 0 2px;
}
</style>


