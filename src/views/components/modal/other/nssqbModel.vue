<style lang="less">
@import "./style/other.less";
</style>

<template>
<!-- 海洋渔业捕捞许可年审申请表  -->
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
            @on-ok="ok"
            @on-cancel="cancel"
            @on-visible-change="visibleChange">

            <div slot="header" v-if="showHeader">
                <slot name="header"></slot>
            </div>
            <div slot="close" v-if="showClose">
                <slot name="close"></slot>
            </div>
            <!-- <div slot="footer" v-if="showFooter">
                <slot name="footer"></slot>
            </div> -->
            <div slot="footer">
                <Button @click="handleAdd()" type="warning" >添加记录</Button>
                <Button  @click="ok">关闭</Button>
            </div>
            <Row>
            <Col span="24">
                <Row >
                    <div style="margin-top:10px">
                        <Table :loading="status.tableLoading" :columns="columns" :data="selectList" border :height="280"></Table>
                    </div>
                </Row>
            </Col>
            </Row>
        </Modal>

        <div>

        <Modal class="vertical-center-modal" :width="840" v-model="status.showDetail" title="详情" :scrollable=true :mask-closable="false">
            <div slot="footer">
                <Button @click="status.showDetail= false">取消</Button>
                <Button type="warning" @click="handleShowPicList()">上传附件</Button>
                <Button type="info" @click="handlePrint()">打印</Button>
                <Button type="primary" @click="handleSave()">保存</Button>
            </div>
            <div style="height:600px;overflow:auto;" class="printOrder-datanss">
                <table width="100%" class="sqb">
                    <caption><h2>海洋渔业捕捞许可年审申请表</h2></caption>
                    <caption>
                        <span style="position:relative;right:200px;">
                            渔船名：<input type="text" class="shipName" :placeholder="info.shipName" v-model="info.shipName">
                        </span>
                        <span style="position:relative;left:193px;">
                            联系电话：<input type="text" class="shipName" :placeholder="info.phone" v-model="info.phone">
                        </span>
                    </caption>
                    <tr>
                        <td class="zb">职务</td>
                        <td>姓名</td>
                        <td>证号</td>
                        <td>四小证证号</td>
                        <td>身份证号码</td>
                        <td class="zb">备注</td>
                    </tr>
                    <tr>
                        <td>船长</td>
                        <td><input type="text" :placeholder="info.cz" v-model="info.cz" name=""></td>
                        <td><input type="text" :placeholder="info.czzh" v-model="info.czzh" name=""></td>
                        <td><input type="text" :placeholder="info.czsxz" v-model="info.czsxz" name=""></td>
                        <td><input type="text" :placeholder="info.czsfz" v-model="info.czsfz" name=""></td>
                        <td><input type="text" :placeholder="info.czbz" v-model="info.czbz" name=""></td>
                    </tr>
                    <tr>
                        <td>大副</td>
                        <td><input type="text" :placeholder="info.df" v-model="info.df" name=""></td>
                        <td><input type="text" :placeholder="info.dfzh" v-model="info.dfzh" name=""></td>
                        <td><input type="text" :placeholder="info.dfsxz" v-model="info.dfsxz" name=""></td>
                        <td><input type="text" :placeholder="info.dfsfz" v-model="info.dfsfz" name=""></td>
                        <td><input type="text" :placeholder="info.dfbz" v-model="info.dfbz" name=""></td>
                    </tr>
                    <tr>
                        <td>二副</td>
                        <td><input type="text" :placeholder="info.ef" v-model="info.ef" name=""></td>
                        <td><input type="text" :placeholder="info.efzh" v-model="info.efzh" name=""></td>
                        <td><input type="text" :placeholder="info.efsxz" v-model="info.efsxz" name=""></td>
                        <td><input type="text" :placeholder="info.efsfz" v-model="info.efsfz" name=""></td>
                        <td><input type="text" :placeholder="info.efbz" v-model="info.efbz" name=""></td>
                    </tr>
                    <tr>
                        <td>轮机长</td>
                        <td><input type="text" :placeholder="info.ljz" v-model="info.ljz" name=""></td>
                        <td><input type="text" :placeholder="info.ljzzh" v-model="info.ljzzh" name=""></td>
                        <td><input type="text" :placeholder="info.ljzsxz" v-model="info.ljzsxz" name=""></td>
                        <td><input type="text" :placeholder="info.ljzsfz" v-model="info.ljzsfz" name=""></td>
                        <td><input type="text" :placeholder="info.ljzbz" v-model="info.ljzbz" name=""></td>
                    </tr>
                    <tr>
                        <td>大管轮</td>
                        <td><input type="text"  :placeholder="info.dgl" v-model="info.dgl"name=""></td>
                        <td><input type="text"  :placeholder="info.dglzh" v-model="info.dglzh"name=""></td>
                        <td><input type="text"  :placeholder="info.dglsxz" v-model="info.dglsxz"name=""></td>
                        <td><input type="text"  :placeholder="info.dglsfz" v-model="info.dglsfz"name=""></td>
                        <td><input type="text"  :placeholder="info.dglbz" v-model="info.dglbz"name=""></td>
                    </tr>
                    <tr>
                        <td>二管轮</td>
                        <td><input type="text" :placeholder="info.egl" v-model="info.egl" name=""></td>
                        <td><input type="text" :placeholder="info.eglzh" v-model="info.eglzh" name=""></td>
                        <td><input type="text" :placeholder="info.eglsxz" v-model="info.eglsxz" name=""></td>
                        <td><input type="text" :placeholder="info.eglsfz" v-model="info.eglsfz" name=""></td>
                        <td><input type="text" :placeholder="info.eglbz" v-model="info.eglbz" name=""></td>
                    </tr>
                    <tr>
                        <td>话务员</td>
                        <td><input type="text" :placeholder="info.hwy" v-model="info.hwy" name=""></td>
                        <td><input type="text" :placeholder="info.hwyzh" v-model="info.hwyzh" name=""></td>
                        <td><input type="text" :placeholder="info.hwysxz" v-model="info.hwysxz" name=""></td>
                        <td><input type="text" :placeholder="info.hwysfz" v-model="info.hwysfz" name=""></td>
                        <td><input type="text" :placeholder="info.hwybz" v-model="info.hwybz" name=""></td>
                    </tr>
                    <tr>
                        <td>船员</td>
                        <td><input type="text" :placeholder="info.cy1" v-model="info.cy1" name=""></td>
                        <td><input type="text" :placeholder="info.cyzh1" v-model="info.cyzh1" name=""></td>
                        <td><input type="text" :placeholder="info.cysxz1" v-model="info.cysxz1" name=""></td>
                        <td><input type="text" :placeholder="info.cysfz1" v-model="info.cysfz1" name=""></td>
                        <td><input type="text" :placeholder="info.cybz1" v-model="info.cybz1" name=""></td>
                    </tr>
                    <tr>
                        <td>船员</td>
                        <td><input type="text" :placeholder="info.cy2" v-model="info.cy2" name=""></td>
                        <td><input type="text" :placeholder="info.cyzh2" v-model="info.cyzh2" name=""></td>
                        <td><input type="text" :placeholder="info.cysxz2" v-model="info.cysxz2" name=""></td>
                        <td><input type="text" :placeholder="info.cysfz2" v-model="info.cysfz2" name=""></td>
                        <td><input type="text" :placeholder="info.cybz2" v-model="info.cybz2" name=""></td>
                    </tr>
                    <tr>
                        <td>船员</td>
                        <td><input type="text" :placeholder="info.cy3" v-model="info.cy3" name=""></td>
                        <td><input type="text" :placeholder="info.cyzh3" v-model="info.cyzh3" name=""></td>
                        <td><input type="text" :placeholder="info.cysxz3" v-model="info.cysxz3" name=""></td>
                        <td><input type="text" :placeholder="info.cysfz3" v-model="info.cysfz3" name=""></td>
                        <td><input type="text" :placeholder="info.cybz3" v-model="info.cybz3" name=""></td>
                    </tr>
                    <tr>
                        <td>作业类型</td>
                        <td colspan="2"><input type="text" :placeholder="info.jobType" v-model="info.jobType" name=""></td>
                        <td>船员总人数</td>
                        <td colspan="2"><input type="text" :placeholder="info.countNumber" v-model="info.countNumber" name=""></td>
                    </tr>
                    <tr>
                        <td>检验证书证号</td>
                        <td colspan="2"><input type="text" :placeholder="info.certificateNumber" v-model="info.certificateNumber" name=""></td>
                        <td>有效期</td>
                        <td colspan="2"><input type="text" :placeholder="info.cjzs" v-model="info.cjzs" name=""></td>
                    </tr>
                    <tr>
                        <td>登记证书证号</td>
                        <td colspan="2"><input type="text" :placeholder="info.registrationNumber" v-model="info.registrationNumber" name=""></td>
                        <td>有效期</td>
                        <td colspan="2"><input type="text" :placeholder="info.djzs" v-model="info.djzs" name=""></td>
                    </tr>
                    <tr>
                        <td>责任书（承诺书）签订情况</td>
                        <td><input type="text" :placeholder="info.productionSafety" v-model="info.productionSafety" name=""></td>
                        <td>渔船进出港签证情况</td>
                        <td><input type="text" :placeholder="info.responsibilitySafety" v-model="info.responsibilitySafety" name=""></td>
                        <td>捕捞日志（生产日记）</td>
                        <td><input type="text" :placeholder="info.fishingLog" v-model="info.fishingLog" name=""></td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="s1">所属渔业合作社意见：</span>
                            <p><textarea name="" id="" cols="38" rows="3" :placeholder="info.cooperative" v-model="info.cooperative"></textarea></p>
                            <div>
                                <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="info.headCooperative" v-model="info.headCooperative"></span><span class="s3">（盖章）</span>
                            </div>
                            <span class="s4"><input type="text" :placeholder="datatimehf.year" v-model="datatimehf.year" class="bb2"> 年<input type="text" :placeholder="datatimehf.month" v-model="datatimehf.month" class="bb2">月<input type="text" :placeholder="datatimehf.day" v-model="datatimehf.day" class="bb2">日</span>
                        </td>
                        <td colspan="3">
                            <span class="s1 s9">基层站意见：</span>
                            <p><textarea name="" id="" cols="38" rows="3" :placeholder="info.grassrootsComments" v-model="info.grassrootsComments"></textarea></p>
                            <div>
                                <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="info.grassrootsCooperative" v-model="info.grassrootsCooperative"></span><span class="s3">（盖章）</span>
                            </div>
                            <span class="s4"><input type="text" :placeholder="datatimejf.year" v-model="datatimejf.year" class="bb2"> 年<input type="text" :placeholder="datatimejf.month" v-model="datatimejf.month" class="bb2">月<input type="text" :placeholder="datatimejf.day" v-model="datatimejf.day" class="bb2">日</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="3">
                            <span class="s1">信息中心意见：</span>
                            <p><textarea name="" id="" cols="38" rows="3" :placeholder="info.informationCenter" v-model="info.informationCenter"></textarea></p>
                            <div>
                                <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="info.informationCooperative" v-model="info.informationCooperative"></span><span class="s3">（盖章）</span>
                            </div>
                            <span class="s4"><input type="text" :placeholder="datatimemf.year" v-model="datatimemf.year" class="bb2"> 年<input type="text" :placeholder="datatimemf.month" v-model="datatimemf.month" class="bb2">月<input type="text" :placeholder="datatimemf.day" v-model="datatimemf.day" class="bb2">日</span>
                        </td>
                        <td colspan="3">
                            <span class="s1">县局意见：</span>
                            <p><textarea name="" id="" cols="38" rows="3" :placeholder="info.countyBureau" v-model="info.countyBureau"></textarea></p>
                            <div>
                                <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="info.countyBureauCooperative" v-model="info.countyBureauCooperative"></span><span class="s3">（盖章）</span>
                            </div>
                            <span class="s4"><input type="text" :placeholder="datatimexf.year" v-model="datatimexf.year" class="bb2"> 年<input type="text" :placeholder="datatimexf.month" v-model="datatimexf.month" class="bb2">月<input type="text" :placeholder="datatimexf.day" v-model="datatimexf.day" class="bb2">日</span>
                        </td>
                    </tr>
                </table>
            </div>
        </Modal>
        
        <Modal :width="620" v-model="status.showPicList" title="详情"  :scrollable=true :mask-closable="false">
            <div class="pic-upload-list" v-for="item in uploadList" v-bind:key="item.id">
                <img :src="item.url">
                <div class="pic-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)" style="position: relative;left:10px"></Icon>
                    <Icon size="5" type="ios-close-outline" @click.native="handleRemove(item)" style="position: relative;left:20px;top:-40px"></Icon>
                </div>
            </div>
            <div class="pic-upload-list" >
                <div style="width: 100px;height:100px;line-height: 100px;"  @click="handleCamera">
                    <Icon type="ios-camera" size="80" style="line-height:100px"></Icon>
                </div>
            </div>
            <Upload
                :data="actionData"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                :format="['bmp','jpg','png','jpeg','tiff','gif','svg','wmf']"
                :with-credentials="true"
                :max-size="20480"
                multiple
                type="drag"
                :action="actionUrl"
                style="display: inline-block;width:100px;">
                <div style="width: 100px;height:100px;line-height: 100px;">
                    <Icon type="android-add-circle" size="80" style="line-height:100px"></Icon>
                </div>
            </Upload>
        </Modal>
        <pic v-model="imgVisible" :img="imgUrl"></pic>
        </div>
    </div>

</template>

<script>
import pic from "@/views/components/pic/pic.vue";
import user from '@/store/module/user.js';
export default {
    name: "nssqbModel",
    components: {
        pic
    },
    props: {
        // default
        shipName: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
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
            default: "详情"
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
            default() {
                return ["ease", "fade"];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        // ------
        
        id: {
            type: String,
        },
    },
    data() {
        
        return {
            // default
            visible: false,
            // ------
            status:{
                tableLoading: false,
                showDetail: false,
                showPicList: false,
            },
            totalNum:0,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    XM_like: ""
                },
                orders: "updateTime desc"
            },
            columns: [
                {
                    title: "序号",
                    type: "index",
                    align: "center",
                    minWidth: 80
                },
                {
                    key: "countNumber",
                    title: "船员总人数",
                    align: "center",
                    minWidth: 200
                },
                {
                    key: "jobType",
                    title: "作业类型",
                    align: "center",
                    minWidth: 120
                },
                {
                    key: "createTime",
                    title: "创建时间",
                    align: "center",
                    minWidth: 140
                },
                {
                    title: "操作",
                    key: "id",
                    align: "center",
                    minWidth: 140,
                    render: (h, params) => {
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                props: {
                                    type: "success",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.handleShowDetail(params.row, params.index);
                                    }
                                }
                                },
                                "详情"
                            )
                        );
                        temp.push(
                            h(
                                "Button",
                                {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.index);
                                    }
                                }
                                },
                                "删除"
                            )
                        );
                        return h("div", temp);
                    }
                }
            ],
            selectList: [],
            initial: "initial",
            orgin: {},
            base:{},
            info:{
                id:"",
            },
            uploadList: [],
            infoRules: {
            },
            selectIndex: "",
            imgUrl: "",
            imgVisible: false,
            

            datatimehf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimejf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimemf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimexf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            visible:this.value,
            modalSQB:{   
                id:"",                                           
                parameteFileId:"",
                type:"annualfishing",
                name:"海洋渔业捕捞许可年审申请表",
                content:{},
            },   
            content:{
                shipName:"",
                phone:"",
                cz:"",
                czzh:"",
                czsxz:"",
                czsfz:"",
                czbz:"",
                df:"",
                dfzh:"",
                dfsxz:"",
                dfsfz:"",
                dfbz:"",
                ef:"",
                efzh:"",
                efsxz:"",
                efsfz:"",
                efbz:"",
                ljz:"",
                ljzzh:"",
                ljzsxz:"",
                ljzsfz:"",
                ljzbz:"",
                egl:"",
                eglzh:"",
                eglsxz:"",
                eglsfz:"",
                eglbz:"",
                hwy:"",
                hwyzh:"",
                hwysxz:"",
                hwysfz:"",
                hwybz:"",
                cy1:"",
                cyzh1:"",
                cysxz1:"",
                cysfz1:"",
                cybz1:"",
                cy2:"",
                cyzh2:"",
                cysxz2:"",
                cysfz2:"",
                cybz2:"",
                cy3:"",
                cyzh3:"",
                cysxz3:"",
                cysfz3:"",
                cybz3:"",
                jobType:"",
                countNumber:"",
                certificateNumber:"",
                cjzs:"",
                registrationNumber:"",
                djzs:"",
                productionSafety:"",
                responsibilitySafety:"",
                fishingLog:"",
                cooperative:"",
                cooperativeTime:"",
                headCooperative:"",
                cooperativeStamp:"",
                grassrootsComments:"",
                grassrootsTime:"",
                grassrootsCooperative:"",
                grassrootsStamp:"",
                informationCenter:"",
                informationCenterTime:"",
                informationCooperative:"",
                informationStamp:"",
                countyBureau:"",
                countyBureauTime:"",
                countyBureauCooperative:"",
                countyBureauStamp:"",
                dgl:"",
                dglzh:"",
                dglsxz:"",
                dglsfz:"",
                dglbz:"",
            },      
        };
    },
    computed: {
        // default
        showFooter() {
            return this.$slots.footer == undefined ? false : true;
        },
        showHeader() {
            return this.$slots.header == undefined ? false : true;
        },
        showClose() {
            return this.$slots.close == undefined ? false : true;
        },
        // ------
        actionData() {
            return {
                // moduleId: "oneshiponefile_annualreview",
                // dataId: this.info.id,
                moduleId: 'nssqbModel',
                dataId: this.info.id,
                owner: this.owner,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName
            };
        },
        actionUrl(){
            return this.$basePath + '/standingbook/attachs/upload';
        },
    },
    mounted() {},
    methods: {
        // default
        close() {
            this.visible = false;
            this.$emit("input", false);
            this.$emit("on-cancel");
        },
        cancel () {
            this.close();
        },
        ok () {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-ok');
        },
        visibleChange(val){
            this.visible = val;
            if(!this.visible) this.close();
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        pageSizeChange(size) {
            this.query.size = size;
            this.handleSearch();
        },
        changePage(page) {
            this.query.page = page;
            this.handleSearch();
        },
        // ----
        reset(){
            this.info = {
                id:"",
            };
            for (let key in this.datatimejf) {
                if(key == "minutes"){
                    continue;
                }
                this.datatimejf[key] = "";
            }

            for (let key in this.datatimehf) {
                if(key == "minutes"){
                    continue;
                }
                this.datatimehf[key] = "";
            }

            for (let key in this.datatimemf) {
                if(key == "minutes"){
                    continue;
                }
                this.datatimemf[key] = "";
            }

            for (let key in this.datatimexf) {
                if(key == "minutes"){
                    continue;
                }
                this.datatimexf[key] = "";
            }

        },
        handleAdd() {
            this.reset();
            this.selectIndex = "";
            this.$http
                .get("/$admin/attachs/uuid")
                .then(res => {
                    console.log(res);
                    if(res.success){
                        this.info.id = res.data;
                        this.info.shipName = this.orgin.shipName;
                        this.info.sort = this.selectList.length;
                        this.info.createTime = new Date();
                        this.status.showDetail = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            
        },
        handleShowDetail(row, index) {
            this.reset();
            this.info = this.$util.deepCopy(row);

            var cooperativeTime = this.info.cooperativeTime.split("-");
            this.datatimehf.year = cooperativeTime[0];
            this.datatimehf.month = cooperativeTime[1];
            this.datatimehf.day = cooperativeTime[2].split(" ")[0];
            
            var grassrootsTime = this.info.grassrootsTime.split("-");
            this.datatimejf.year = grassrootsTime[0];
            this.datatimejf.month = grassrootsTime[1];
            this.datatimejf.day = grassrootsTime[2].split(" ")[0];

            var informationCenterTime = this.info.informationCenterTime.split("-");
            this.datatimemf.year = informationCenterTime[0];
            this.datatimemf.month = informationCenterTime[1];
            this.datatimemf.day = informationCenterTime[2].split(" ")[0];

            var countyBureauTime = this.info.countyBureauTime.split("-");
            this.datatimexf.year = countyBureauTime[0];
            this.datatimexf.month = countyBureauTime[1];
            this.datatimexf.day = countyBureauTime[2].split(" ")[0];

            this.selectIndex = this.$util.deepCopy(index) + "";
            this.initPic();
            this.status.showDetail = true;
        },
        init() {
            this.initData();
        },
        initPic() {
            this.uploadList = [];
            if(this.isEmpty(this.info.id)) {
                return;
            }
            this.$http
                .get("/$admin/attachs?dataId=" + this.info.id)
                .then(res => {
                    let attachs = res.data;
                    res.data.forEach(element => {
                        if(!this.isEmpty(element)){
                            let attr = {
                                dataId: element.id,
                                url: this.$basePath + "/$admin/attachs/stream/" + element.id
                            };
                            this.uploadList.push(attr);
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },

        initData() {
            this.$http
                .get("/standingbook/oneshiponefile/" + this.id)
                .then(res => {
                    if (res.success) {
                        console.log(res.data);
                        this.orgin = res.data;
                        var data = res.data.annualReview;
                        if (this.isEmpty(data)) {
                            this.selectList = [];
                            
                        } else {
                            this.selectList = data;
                        }
                        this.visible = true;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        initSearch(){
            this.$http.get("/standingbook/oneshiponefile/"+ this.id)
            .then(res => {
                if (res.success && !this.isEmpty(res.data)) {
                    this.orgin = res.data;
                    var data = this.$util.deepCopy(this.orgin.annualReview);
                    this.selectList = data;
                    this.totalNum = data.length;
                    this.status.tableLoading = false;
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        handleSearch() {
            this.status.tableLoading = true;
            var query = {

            }
            this.$http
                .get("/checks/shipsailor/page", {
                    params: {
                        query: JSON.stringify(this.query)
                    }
                })
                .then(res => {
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDelete(index) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    this.selectList.splice(index, 1);
                    var data = this.$util.deepCopy(this.selectList);
                    this.orgin.annualReview = data;
                    this.$http.post("/standingbook/oneshiponefile/save", this.orgin)
                        .then(res => {
                            if (res.success) {
                                
                            } else {
                                this.$Message.info(res.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
           
        },
        handleSave() {
            this.info.cooperativeTime = this.datatimehf.year+"-"+this.datatimehf.month+"-"+this.datatimehf.day+" "+this.datatimehf.minutes;
            this.info.grassrootsTime = this.datatimejf.year+"-"+this.datatimejf.month+"-"+this.datatimejf.day+" "+this.datatimejf.minutes;
            this.info.informationCenterTime = this.datatimemf.year+"-"+this.datatimemf.month+"-"+this.datatimemf.day+" "+this.datatimemf.minutes;
            this.info.countyBureauTime = this.datatimexf.year+"-"+this.datatimexf.month+"-"+this.datatimexf.day+" "+this.datatimexf.minutes;
            this.info.updateTime = new Date();
            this.status.showDetail = false;
            var data = this.$util.deepCopy(this.selectList);
            if(this.selectIndex == ""){
                this.info.sort = this.selectList.length;
                data.push(this.info);
            } else {
                data[this.selectIndex] = this.info;
            }
            console.log("selectList", this.selectList);
            this.orgin.annualReview = data;
            this.$http.post("/standingbook/oneshiponefile/save", this.orgin)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.annualReview);
                        this.selectList = data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handlePrint() {
            var newstr = document.getElementsByClassName('printOrder-datanss')[0].innerHTML
            document.body.innerHTML = newstr;
            window.print();
            // 重新加载页面，以刷新数据
            window.location.reload();
        },
        handleFormat(){
            var query = {
                wheres: {
                    XM_like: this.info.xm
                },
                orders: "updateTime desc"
            };
            this.$http
                .get("/checks/shipsailor", {
                    params: {
                        query: JSON.stringify(query)
                    }
                })
                .then(res => {
                    console.log("res",res);
                    if(res.success && res.data.length > 0) {
                        var id = this.$util.deepCopy(this.info.id);
                        var sort = this.$util.deepCopy(this.info.sort);
                        this.info = res.data[0];
                        this.info.id = id;
                        this.info.sort = sort;
                    }else {
                        this.$Message.info("系统暂无该记录");
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
        },
        handleView(url) {
            this.imgUrl = url;
            this.imgVisible = true;
        },
        handleRemove(file) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    for (var i = 0; i < this.uploadList.length; i++) {
                        if (this.uploadList[i].dataId == file.dataId) {
                            this.$http.delete('/standingbook/attachs/' + this.uploadList[i].dataId)
                                .then(res => {

                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            this.uploadList.splice(i, 1);
                            break;
                        }
                    }
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
        },
        handleSuccess(response, file, fileList) {
            let attr = {
                dataId: response.data.id,
                url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
            };
            this.uploadList.push(attr);
        },
        handleCamera(){
            // this.status.showCamera = true;
            window.open(this.$basePath+"/gpy/ws/ws_index.jsp?dataId=" + this.actionData.dataId + "&moduleId=" + this.actionData.moduleId);
        },
        handleShowPicList(){
            this.status.showPicList = true;
        }

    },
    watch: {
        value(val) {
            if (val) {
                this.initSearch();
                this.visible = true;
            }
        }
    },
    beforeDestroy() {
        this.visible = false;
        this.$emit("input", this.visible);
    },
};
</script>
<style scoped>
table.sqb{
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.sqb td{
    border:1px solid black;
    width:40px;
    height:32px;
    text-align:center;
    box-sizing:border-box;
}
table.sqb input{
    border:none;
    outline:none;
    width:90%;
    text-align:center;
    padding:0;
    margin:0;
}
table.sqb td input.bb2{
    width:8%;
}
table.sqb td input.nn{
    width:15%;
}
table.sqb input.shipName{
    border-bottom:1px solid gray;
    width:15%;
    margin-bottom:5px;
}
table.sqb span.s1{
    float:left;
    margin-top:10px;
    margin-left:10px;
}
table.sqb span.s1.s9{
    position:relative;
    bottom:2px;
}
table.sqb span.s2{
    position:relative;
    bottom:10px;
    right:5%;
}
table.sqb span.s3{
    position:relative;
    left:6%;
}
table.sqb span.s4{
    position:relative;
    left:20%;
    bottom:3px;
}
table.sqb textarea{
    border:none;
    outline:none;
    margin-top:15px;
    margin-bottom:3px;
}   
</style>


