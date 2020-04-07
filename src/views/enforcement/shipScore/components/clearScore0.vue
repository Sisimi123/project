<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>
<!-- 手动消分 -->
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
            <Button  @click="handleCancel">返回</Button>
            <Button type="success"  @click="doubleCheck">提交</Button>
        </div>

        <div>
            <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
                <div>
                    <fieldset class="title">
                        <legend>*申请人信息</legend>
                        <template v-for="(item,index) in selectedList">
                        <div :key="item.createTime">
                            <div>
                                <Row>
                                    <Col span="8">
                                        <Form-item :label="'用户'+(index+1)+':'" >
                                            <Input v-model="item.userName" readonly></Input> 
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="身份类型:" >
                                            <Input v-model="idCardTypeDic" readonly></Input> 
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="当前总记分:" >
                                            <Input v-model="item.totalScore" readonly/>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="8">
                                        <Form-item label="联系电话:">
                                            <Input v-model="item.tel" readonly/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="身份证或企业注册号:">
                                            <Input v-model="item.userKey.idCard" readonly/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="所属渔船:">
                                            <Input v-model="item.shipName"/>
                                        </Form-item>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        </template>
                    </fieldset>
                </div>

                <div>
                    <fieldset class="title">
                        <legend>
                            *操作
                        </legend>
                    </fieldset>
                    <div>
                        <Row>
                            <Col span="8">
                                <Form-item label="操作人:">
                                    <Input v-model="info.operator" readonly/>
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="本次消分:" prop="clearScore">
                                    <InputNumber :max="limitScore" :min="1" v-model="info.clearScore">
                                    </InputNumber>
                                </Form-item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                                <Form-item label="消分事由:">
                                    <Input v-model="info.applyReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" />
                                </Form-item>
                            </Col>
                        </Row>
                    </div>

                </div>

            </Form>
        </div>
        
    </Modal>

    <Modal :width="700" v-model="status.selectModal1" title="渔船查询" :scrollable=true>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span>用户：</span>
                <Input v-model="query.wheres.userName_like" @on-keydown.enter="selectModal1()"  style="width:30%" placeholder="请输入..."></Input>
                <Button style="margin-left:5px" @click="selectModal1()" type="info" icon="ios-search" shape="circle">搜索</Button>
              </div>
            </Row>
            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.selectModal1loading" :columns="columnsModal1" :data="selectList" border :height="300"></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom">
                  <Page show-total :total="totalNum" show-sizer 
                placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
                :current="query.page" @on-change="changePage" ></Page>
              </div>
            </Row>
          </Col>
        </Row>
    </Modal>

</div>
</template>

<script>
import * as validate from "../../../validateRule/validate.js";
export default {
    name: "markScore",
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
            default: false
        },
        title: {
            type: String,
            default: "手动消分"
        },
        width: {
            type: [Number, String],
            default: 960
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
            // default:"vertical-center-modal"
            default:""
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
        selectedList:{
            type: Array,
            default () {
                return [];
            }
        },
    },
    computed: {
        idCardTypeDic(){
            if(this.isEmpty(this.selectedList) || this.selectedList.length != 1){
                return "";
            }else {
                return this.$store.getters.getDictName("shipscore_idcardtype",this.selectedList[0].userKey.userType);
            }
        },
        idCardTypeDic(){
            if(this.isEmpty(this.selectedList) || this.selectedList.length != 1){
                return "";
            }else {
                return this.$store.getters.getDictName("shipscore_idcardtype",this.selectedList[0].userKey.userType);
            }
        }
    },
    data () {
        return {
            options: {
                shortcuts: [
                    {
                        text: '今天',
                        value () {
                            return new Date();
                        },
                        onClick: (picker) => {
                            // this.$Message.info('Click today');
                        }
                    },
                    {
                        text: '昨天',
                        value () {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            return date;
                        },
                        onClick: (picker) => {
                            // this.$Message.info('Click yesterday');
                        }
                    },
                ]
            },
            visible: false,
            info:{
                idCard:"", // 身份证号
                idCardType:"", // 用户类型； 0 船东；1 船长；2 公司
                userName:"", // 申请人
                userTel:"", // 申请人电话

                clearScore:1, // 本次消除分值
                applyTime:"", // 时间
                applyType:"", // 类型：0 手动消分； 1 申请消分
                applyReason:"", // 理由

                operator:"", // 操作人
                shipName:"", // 渔船名
                eventType:"", // 事件状态: 0 审核中:"", 1 已生效:"",
            },
            infoRules:{
                clearScore: [
                    {required: true,type: 'number', message: '请输入消分数值', trigger: 'change'}
                ],
                shipownerName: [
                    {required: true, type: 'string', message: '请输入船东姓名', trigger: 'change'}
                ],
                shipownerTel: [
                    {required: true, type: 'string', message: '请输入船东电话', trigger: 'change'},
                    {validator:validate.validate_sjh, trigger: 'blur'},
                ],
                shipownerIdCard: [
                    {required: true, type: 'string', message: '请输入身份证号或企业注册号', trigger: 'change'}
                ],
                captainName: [
                    {required: true, type: 'string', message: '请输入船长姓名', trigger: 'change'}
                ],
                captainTel: [
                    {required: true, type: 'string', message: '请输入船长电话', trigger: 'change'},
                    {validator:validate.validate_sjh, trigger: 'blur'},
                ],
                captainIdCard: [
                    {required: true, type: 'string', message: '请输入身份证号', trigger: 'change'},
                    {validator:validate.validate_sfz, trigger: 'blur'},
                ],
            },
            status:{
                selectEvent:false,
                selectModal1:false,
                selectModal1loading:false,
            },
            query: {
                page: 1,
                size: 10,
                wheres: {
                    userName_like: "",
                },
            },
            totalNum:1,
            columnsModal1:[
                {
                    title:'序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    key: 'userName',
                    title: '用户',
                    align: 'center',
                    width: 120,
                },
                {
                    key: 'tel',
                    title: '联系电话',
                    align: 'center',
                    width: 120,
                },
                {
                    key: 'userKey.idCard',
                    title: '证件号',
                    align: 'center',
                    render: (h, params) => {
                        return h("span",params.row.userKey.idCard);
                    }
                },
                {
                    title: "操作",
                    key: "id",
                    align: "center",
                    width:100,
                    render: (h, params) => {
                    return h(
                        "Button",
                        {
                            props: {
                                type: "success",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.selected(params.row);
                                }
                            }
                        },
                        "确认"
                    );
                }}
            ],
            selectList:[],
            shipOptions:[],
            noteTime:"",
            limitScore: 1,
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
        handleCancel(){
            this.cancel();
        },
        doubleCheck(){
            this.$Modal.confirm({
                title: "提示",
                content: "<p>继续操作吗？</p>",
                okText:"继续",
                cancelText:"返回",
                onOk: () => {
                    this.handleOk();
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
        },
        handleOk(){
            let params = new URLSearchParams();
            params.append("list", JSON.stringify(this.selectedList));
            params.append("event", JSON.stringify(this.info));

            this.$http  
                .post("/enforces/shipscoreclear/addevent",params)
                .then(res => {
                    if(res.success){
                        this.$Message.success("操作成功");
                        this.ok();
                    }else{
                        this.$Message.info(res.msg);
                        this.cancel();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSelectUser(){
            this.query.wheres.userName_like = this.info.userName;
            this.status.selectModal1 = true;

            this.selectModal1();
           
        },
        selectModal1(){
            this.status.selectModal1loading = true;
            this.$http
                .get("/enforces/shipscoreuser/page" ,{
                    params:{
                        query: JSON.stringify(this.query),
                    }
                })
                .then(res => {
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.selectModal1loading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        shipSearch(){

        },
        selected(info){
            this.status.selectModal1 = false;
        },
        reset(){
            this.$refs["info"].resetFields();

            for (const key in this.info) {
                if (this.info.hasOwnProperty(key)) {
                    if(key == "matter"){
                        this.info[key] = [];
                    } else if(key == "clearScore"){
                         this.info[key] = 1;
                    } else {
                        this.info[key] = "";
                    }
                    
                }
            }
            this.limitScore = this.selectedList[0].totalScore;
            this.noteTime = "";
            this.info.operator = this.$store.state.user.userInfo.name;
            this.selectEvents = [];
        },
        onCheckChange(items){
            this.selectEvents = items;
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        pageSizeChange(size) {
            this.query.size = size;
            //this.handleSearch();
        },
        changePage(page) {
            this.query.page = page;
            this.selectShip();
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

                if(this.isEmpty(this.selectedList)){
                    this.cancel();
                    this.$Notice.warning({
                        title: '请勾选一条记录进行消分操作',
                        desc: '需要您在表格左侧勾选一条用户信息。'
                    });
                    return;
                }
                
                if(this.selectedList.length != 1){
                    this.cancel();
                    this.$Notice.warning({
                        title: '一次仅支持修改一个用户',
                        desc: '一次仅支持修改一个用户'
                    });
                    return;
                }
                //this.checkAble();
                this.reset();
                this.visible = val;
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


.demo-auto-complete-item{
    padding: 4px 0;
    border-bottom: 1px solid #F6F6F6;
    max-height: 200px;
    overflow: auto;
}
.demo-auto-complete-group{
    font-size: 12px;
    padding: 4px 6px;
}
.demo-auto-complete-group span{
    color: #666;
    font-weight: bold;
}
.demo-auto-complete-group a{
    float: right;
}
.demo-auto-complete-count{
    float: right;
    color: #999;
}
.bottom {
  padding-top: 10px;
  overflow: hidden;
}
.ivu-page {
    float: right;
}

</style>