<style lang="less" scoped>
        @import '../../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row>
                <data-table 
                    ref="test" 
                    :withTree="showtree" 
                    :autoInitTable="false"
                    :useZtree="false"
                    :treeTitle="'部门'"
                    :treeParams="cities"
                    :treeUrl="'/$admin/depts/authtree'" 
                    @on-select-change="selectTreeChange"
                    
                    :url="'/check/drlc/list'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="52" @submit.native.prevent>
                            <Row>
                                <Col span="4">
                                    <Form-item label="船名号:">
                                        <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <div class="btn-wrap">
                                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                    <Button @click="handleReset()"  >重置</Button>
                                    <Checkbox true-value="1" v-model="query.wheres.sub" false-value="0" @on-change="handleSearch">子部门</Checkbox>
                                </div>
                                <div v-show="downShow" class="func-wrap">
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                                    <Button @click="downloadMb()" type="warning">下载模板</Button>
                                    <MyUpload :action="'/check/drlc/importXls'"
										:data="importData"
										:format="['xlsx','xls']"  
                                        :on-success="importXls"
                                        :before-upload="handleUpload"
                                        :on-format-error="handleFormatError"
                                        style="width:74px;height:35px;float:right;margin-left:4px;"
										>
                                        <Button type="info"  @click="checkDeptid()" icon="ios-cloud-download-outline">导入</Button>
                                    </MyUpload>
                                </div>
                                <div v-show="!downShow" class="func-wrap">
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                                    <Button @click="downloadMb()" type="warning">下载模板</Button>
                                    <MyUpload :action="'/check/drlc/importXls'"
										:data="importData"
										:format="['xlsx','xls']"  
                                        :on-success="importXls"
                                        :before-upload="handleUpload"
                                        :on-format-error="handleFormatError"
                                        style="width:74px;height:35px;float:right;margin-left:4px;"
										>
                                        <Button type="info"  @click="checkDeptid()" icon="ios-cloud-download-outline">导入</Button>
                                    </MyUpload>
                                    <!-- <Button type="info"  @click="checkDeptid()" icon="ios-cloud-download-outline">导入</Button> -->
                                </div>
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Row>
            <!-- 新增 -->
            <Modal v-model="modalStatus.newAddModal" :styles="{top: '100px'}" title="定人联船信息登记表" width="850px" :mask-closable="maskclosable">
                    <Form v-if="show" :label-width="80" :model="newAddParams" ref="newAddParams" :rules="rules">
                            <!-- <Row>
                                <Col span="24">
                                    <h2 style="text-align: center;">定人联船信息登记表</h2>
                                </Col>
                            </Row> -->
                            <Row>
                                <Col span="24" class="titles">
                                    <h4 style="text-align: left;">渔船信息</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item label="船名号:" prop="shipname">
                                        <Input v-model="newAddParams.shipname" placeholder="请输入..." readonly>
                                            <!-- <Button @click="selectShipModal()" slot="append" type="primary" style="width:40px;">
                                                <span style="position: relative;left:-9px;">选择</span>
                                            </Button> -->
                                            <Button  @click="baseShipModal.show=true" slot="append" type="primary" style="width:40px;">
                                                <span style="position: relative;left:-9px;">选择</span>
                                            </Button>                                    
                                        </Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="船东:" prop="pic" :label-width="66" >
                                        <Input v-model="newAddParams.pic" placeholder="请输入..." readonly></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="联络号码:" prop="picTel" :label-width="90" >
                                        <Input v-model="newAddParams.picTel" placeholder="请输入..." readonly></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24" class="titles">
                                    <h4 style="text-align: left;">渔船监护人信息</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item label="监护人:">
                                        <Input v-model="newAddParams.guardian" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="联络号码:" :label-width="90">
                                        <Input v-model="newAddParams.guardianTel" placeholder="请输入...">
                                            <Button @click="getMessageJian()" slot="append" type="primary" style="width:40px;">
                                                <span style="position: relative;left:-9px;">查询</span>
                                            </Button>
                                        </Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24" class="titles">
                                    <h4 style="text-align: left;">村（社区）、公司（合作社）</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item label="联络人:">
                                        <Input v-model="newAddParams.cjllr" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="职务:" :label-width="65">
                                        <Input v-model="newAddParams.cjllrZw" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="联络号码:" :label-width="90" prop="cjllrTel">
                                        <!-- @on-blur="getMessageCun()" -->
                                        <Input v-model="newAddParams.cjllrTel" placeholder="请输入...">
                                            <Button @click="getMessageCun()" slot="append" type="primary" style="width:40px;">
                                                <span style="position: relative;left:-9px;">查询</span>
                                            </Button>
                                        </Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24" class="titles">
                                    <h4 style="text-align: left;">乡镇（街道）</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item label="联络人:">
                                        <Input v-model="newAddParams.xzjllr" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="职务:" :label-width="65">
                                        <Input v-model="newAddParams.xzllrZw" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="联络号码:" :label-width="90" prop="xzllrTel">
                                        <!-- @on-blur="getMessageXiang()" -->
                                        <Input v-model="newAddParams.xzllrTel" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="24" class="titles">
                                    <h4 style="text-align: left;">县（市、区）海洋与渔业局</h4>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item label="联络人:">
                                        <Input v-model="newAddParams.qxllr" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="职务:" :label-width="65">
                                        <Input v-model="newAddParams.qxllrZw" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <!-- @on-blur="getMessageXian()" -->
                                    <Form-item label="联络号码:" :label-width="90" prop="qxllrTel">
                                        <Input v-model="newAddParams.qxllrTel" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                    </Form>
                <div slot="footer">
                    <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
                    <Button v-show="btnShow" type="info" @click="saveData('newAddParams')">保存</Button>
                    <Button v-show="!btnShow" @click="modalStatus.newAddModal = false" type="info">关闭</Button>
                </div>
            </Modal>
            <!-- 所有渔船信息 -->   
            <Modal :width="700" :styles="{top: '130px','z-index':1000}" v-model="status.selectShip" title="渔船查询" :scrollable=true>
                <div slot="footer" >
                    <Button type="info" @click="status.selectShip = false">关闭</Button>
                </div>
                <Row>
                <Col span="24">
                    <Row>
                    <div>
                        <span>渔船名：</span>
                        <Input v-model="queryX.wheres.nametheShip_like" @on-keydown.enter="selectShip(1)"  style="width:30%" placeholder="请输入..."></Input>
                        <Button style="margin-left:5px" @click="selectShip(1)" type="primary"  icon="ios-search">搜索</Button>
                        <Button @click="resetSelectShip()">重置</Button>
                    </div>
                    </Row>
                    <Row >
                    <div style="margin-top:10px">
                        <Table :loading="status.selectShiploading" :columns="columnsShip" :data="selectShipList" border :height="300"></Table>
                    </div>
                    </Row>
                    <Row>
                    <div class="bottom">
                        <Page show-total :total="totalNumX" show-sizer show-elevator 
                        placement=top @on-page-size-change="pageSizeChangeX" :page-size="queryX.size" 
                        :current="queryX.page" @on-change="changePageX" ></Page>
                    </div>
                    </Row>
                </Col>
                </Row>
            </Modal>     
            <selectShipModal v-model="baseShipModal.show"  @on-select-ship="onSelectShip"></selectShipModal>
        </div>     
    </template>
    <script>
    import {isNull } from '@/libs/common.js'  
    import MyUpload from "@/views/components/Upload/MyUpload.vue";
    import user from '@/store/module/user.js';
    import userObj from '@/store/module/userId.js';
    import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';
    var dept=user.state.userInfo.dept;
    export default {
        name: 'drlc',
        components: {
            MyUpload,selectShipModal
        },
        data () {
            var _self = this;
            var  phoneXian = function(rule, value, callback){
                if(_self.newAddParams.qxllr!=undefined){
                    if(value=="" ||value==undefined){
                        return callback(new Error("联络号码不能为空"));
                    }
                }
                callback();
            };
            var  phoneXiang = function(rule, value, callback){
                if(_self.newAddParams.xzjllr!=undefined){
                    if(value==undefined){
                        return callback(new Error("联络号码不能为空"));
                    }
                }
                callback();
            };
            var  phoneCun = function(rule, value, callback){
                if(_self.newAddParams.cjllr!=undefined){
                    if(value==undefined){
                        return callback(new Error("联络号码不能为空"));
                    }
                }
                callback();
            };
            return {
                baseShipModal: {
                    show: false
                },
                iSmanager:false,
                downShow:false,
                maskclosable:false,
                // newAddParams: {
                //     shipname: '',
                //     pic: '',
                //     picTel: '',
                    
                // },
                rules:{
                    shipname: [
                        { required: true, message: '船名号不能为空', trigger: 'blur' }
                        
                    ],
                    pic: [
                        { required: true, message: '责任人不能为空', trigger: 'blur' }
                        
                    ],
                    picTel: [
                        { required: true, message: '联络号码不能为空', trigger: 'blur' }
                        
                    ],
                },
                showtree:false,
                show:true,
                status:{
                    btnshow:false,
                    selectShip:false,
                },
                modalStatus:{
                    newAddModal:false,
                },
                cities:{
                    containOrgan:false,
                    type:"includes:5,20,30,35"
                },
                totalNumX:1,
                queryX: {
                    page: 1,
                    size: 10,
                    wheres: {
                        nametheShip_like: "",
                        codefishingArea_in: ""
                    },
                    orders: "intfUpdateTime desc"
                },
                columnsShip: [
                    {
                    title: "序号",
                    type: "index",
                    width: 80,
                    align: "center"
                    },
                    {
                    key: "nametheShip",
                    title: "渔船名称",
                    align: "center"
                    },
                    {
                    key: "namevesselOwner",
                    title: "渔船所有人",
                    align: "center"
                    },
                    {
                        key: "shipOwnerTelephone",
                        title: "联系方式",
                        align: "center"
                    },
                    {
                    title: "选择",
                    key: "id",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        return h(
                        "Button",
                        {
                            props: {
                            type: "info",
                            size: "small"
                            },
                            on: {
                            click: () => {
                                this.selectedShip(params.row);
                            }
                            }
                        },
                        "确认"
                        );
                    }
                    }
                ],
                selectShipList: [],


                newAddParams:{
                    shipname:"",//渔船名
	                shipid:"",//渔船id
	                pic:"",//责任人,person in charge
	                picTel:"",//责任人联络号码
	                guardian:"",//guardian
	                guardianTel:"",//监护人手机号码
	                cjllr:"",//村级联络人（村（社区）、公司（合作社）联络人）
	                cjllrTel:"",//村级联络人号码（村（社区）、公司（合作社）联络人）
	                cjllrZw:"",//村级联络人职务（村（社区）、公司（合作社）联络人）
	                xzjllr:"",//乡镇联络人（乡镇（街道））
	                xzllrTel:"",//乡镇联络人号码（乡镇（街道））
	                xzllrZw:"",//乡镇联络人职务（乡镇（街道））
	                qxllr:"",//区县联络人（县（市、区）海洋与渔业局）
	                qxllrTel:"",//区县联络人号码（县（市、区）海洋与渔业局）
	                qxllrZw:"",//区县联络人职务（县（市、区）海洋与渔业局）
                    deptid:"",//关联的部门id
                    createTime:"",//登记时间
                },
                columns: [
                    {
                        title: "序号",
                        type: "index",
                        maxWidth: 80,
                        align: "center"
                    },
                    {
                        key: "shipname",
                        title: "船名号",
                        align: "center"
                    },
                    {
                        key: "pic",
                        title: "责任人",
                        align: "center"
                    },
                    {
                        key: "picTel",
                        title: "责任人联系方式",
                        align: "center"
                    },
                    {
                        key: "guardian",
                        title: "监护人",
                        align: "center"
                    },
                    {
                        key: "guardianTel",
                        title: "监护人联系方式",
                        align: "center"
                    },
                    {
                        key: "deptname",
                        title: "部门",
                        align: "center",  
                    },
                    {
                    title: '创建人',
                        align: 'center',
                        key: 'creatorName',
                        maxWidth:140
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:200,
                        render: (h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var temp = [];
                            // if(_self.iSmanager){
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.handleEdit(params.row);
                                            }
                                        }                       
                                    },"编辑"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.checkMsg(params.row);
                                            }
                                        }                       
                                    },"查看"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.delete(id);
                                            }
                                        }                       
                                    },"删除"));
                            // }else{
                                // if(userObj.userId==params.row.creatorId){
                                //     temp.push(
                                //         h("Button",
                                //         {
                                //             props: {
                                //                 type: "primary",
                                //                 size: "small"
                                //             },
                                //             on:{
                                //                 click:()=>{
                                //                     _self.handleEdit(params.row);
                                //                 }
                                //             }                       
                                //         },"编辑"));
                                // }
                                // if(userObj.userId==params.row.creatorId){
                                //     temp.push(
                                //     h("Button",
                                //     {
                                //         props: {
                                //             type: "info",
                                //             size: "small"
                                //         },
                                //         style:{
                                //             marginLeft:"10px"
                                //         },
                                //         on:{
                                //             click:()=>{
                                //                 _self.checkMsg(params.row);
                                //             }
                                //         }                       
                                //     },"查看"));
                                // }else{
                                //     temp.push(
                                //     h("Button",
                                //     {
                                //         props: {
                                //             type: "info",
                                //             size: "small"
                                //         },
                                //         on:{
                                //             click:()=>{
                                //                 _self.checkMsg(params.row);
                                //             }
                                //         }                       
                                //     },"查看"));
                                // }
                            //     if(userObj.userId==params.row.creatorId){
                            //     temp.push(
                            //         h("Button",
                            //         {
                            //             props: {
                            //                 type: "error",
                            //                 size: "small"
                            //             },
                            //             style:{
                            //                 marginLeft:"10px"
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     _self.delete(id);
                            //                 }
                            //             }                       
                            //         },"删除"));
                            // }
                            // }
                            return h("div", temp);
                        }
                    },
                ],
                dataList: [],
                query:{
                    key:"",//deptid为空则默认为当前用户的部门id 
                    page:1,
                    size:10,
                    wheres:{
                        search:"",//渔船名
                        sub:"1",//是否显示子部门，1表示显示
                    },
                },
                title:"",
                btnShow:true,
                logDate:{
                    year:"",
                    month:"",
                    day:"",
                },
                deptid:"",
                node:[],
                differ:"",
            }
        },
        watch:{
        },
        computed:{  
            importData: function() {
                return {
                    deptid: this.deptid
                };
            },
        },
        methods: {
            onSelectShip(row) {
                var _self = this
                _self.$refs["newAddParams"].resetFields();
                _self.newAddParams.shipid=row.id;
                _self.newAddParams.shipname=row.shipname;
                _self.newAddParams.pic=row.owner;
                _self.newAddParams.picTel=row.tel;
                _self.newAddParams.guardian=""
                _self.$http.get("/check/jhr/jhrinfoByid?shipid="+row.id)
                .then(res=>{
                    this.show = false
                    if(res.success){
                        _self.newAddParams.guardian=res.data.name;
                        _self.newAddParams.guardianTel=res.data.phone;
                    }
                    this.show = true
                });
                // this.$http.get("/check/drlc/check?",{
                //         params:{
                //             shipid:row.id
                //         }
                //     })
                // .then(res=>{
                //     if(res.success){
                //         this.status.selectShip=false;
                //     }else{
                //         this.$Message.error(res.msg);
                //     }
                // }); 
            },
            handleUpload () {
                // if(this.node.length==0&&this.showtree==true){
                //     this.$Message.error("请选择部门");
                //     return ;
                // }
                // return false
            },
            importXls: function(response, file, fileList) {
                // if(this.node.length==0&&this.showtree==true){
                //     this.$Message.error("请选择部门");
                //     return ;
                // }
                if (response.success) {
                    this.$Message.info("导入成功！");
                    this.initSearch();
                } else {
                    this.$Message.error(response.msg);
                }
            },
            handleFormatError: function(file) {
                this.$Message.error("文件格式不支持上传！");
            },
            checkDeptid(){
                // if(this.node.length==0&&this.showtree==true){
                //     this.$Message.error("请先选择部门");
                //     return ;
                // }
            },

            selectTreeChange(treeNode){
                this.query.key=treeNode[0].id;
                this.deptid=treeNode[0].id;
                this.node=treeNode;
                this.initSearch();
                this.downShow=true;
            },

            selectShipModal(){
                this.queryX.page=1;
                this.queryX.size=10;
                this.queryX.wheres.nametheShip_like=this.newAddParams.shipname;;
                this.selectShip();
                this.status.selectShip=true;
            },
            selectShip(value) {
                if (value == 1) {
                    this.queryX.page = 1;
                }
                this.status.selectShiploading = true;
                this.$http.get("/shiparchives/normalnyb/getPage", {
                    params: {
                        query: JSON.stringify(this.queryX)
                    }
                })
                .then(res => {
                    this.totalNumX= res.data.total;
                    this.selectShipList = res.data.data;
                    this.status.selectShiploading = false;
                })
            },
            getMessage(tel){//选择监护人手机号 村级联络人号码 乡镇联络人 区县联络人获取信息
                var _self=this;
                var type=0;
                if(_self.differ=="监"){
                    type=1;
                }else if(_self.differ=="村"){
                    type=2;
                }else if(_self.differ=="乡"){
                    type=3;
                }else if(_self.differ=="县"){
                    type=4;
                }
                if(tel==undefined || tel==''){
                    return this.$Message.error("暂无信息");
                }
                _self.$http.get("/check/drlc/info?tel="+tel+"&type="+type)
                .then(res=>{
                    this.show=false;
                    if(res.success){
                        // console.log(res,"tel测试");
                        var c=JSON.parse(JSON.stringify(_self.newAddParams));
                        var data=res.data;
                        if(type==2){
                            if(c.cjllr==undefined || c.cjllr==""){
                                _self.newAddParams.cjllr=data.cjllr;
                            }
                            if(c.cjllrZw==undefined || c.cjllrZw==""){
                                _self.newAddParams.cjllrZw=data.cjllrZw;
                            }
                        }else{
                            if((c.cjllr==undefined || c.cjllr=="") && (c.cjllrTel==undefined || c.cjllrTel=="") && (c.cjllrZw==undefined || c.cjllrZw=="")){
                                if(data.cjllr!=undefined){
                                    _self.newAddParams.cjllr=data.cjllr;
                                }
                                if(data.cjllrTel!=undefined){
                                    _self.newAddParams.cjllrTel=data.cjllrTel;
                                }
                                if(data.cjllrZw!=undefined){
                                    _self.newAddParams.cjllrZw=data.cjllrZw;
                                }
                            }
                        }
                        if(type==3){
                            if(c.xzjllr==undefined || c.xzjllr==""){
                                _self.newAddParams.xzjllr=data.xzjllr;
                            }
                            if(c.xzllrZw==undefined || c.xzllrZw==""){
                                _self.newAddParams.xzllrZw=data.xzllrZw;
                            }
                        }else{
                            if((c.xzjllr==undefined || c.xzjllr=="") && (c.xzllrTel==undefined || c.xzllrTel=="") && (c.xzllrZw==undefined || c.xzllrZw=="")){
                                // 乡
                                if(data.xzjllr!=undefined){
                                    _self.newAddParams.xzjllr=data.xzjllr;
                                }
                                if(data.xzllrTel!=undefined){
                                    _self.newAddParams.xzllrTel=data.xzllrTel;
                                }
                                if(data.xzllrZw!=undefined){
                                    _self.newAddParams.xzllrZw=data.xzllrZw;
                                }
                            }
                        }
                        if(type==4){
                            if(c.qxllr==undefined || c.qxllr==""){
                                _self.newAddParams.qxllr=data.qxllr;
                            }
                            if(c.qxllrZw==undefined || c.qxllrZw==""){
                                _self.newAddParams.qxllrZw=data.qxllrZw;
                            }
                        }else{
                            if((c.qxllr==undefined || c.qxllr=="") && (c.qxllrTel==undefined || c.qxllrTel=="") && (c.qxllrZw==undefined || c.qxllrZw=="")){
                                //县
                                if(data.qxllr!=undefined){
                                    _self.newAddParams.qxllr=data.qxllr;
                                }
                                if(data.qxllrTel!=undefined){
                                    _self.newAddParams.qxllrTel=data.qxllrTel;
                                }
                                if(data.qxllrZw!=undefined){
                                    _self.newAddParams.qxllrZw=data.qxllrZw;
                                }
                            }
                        }
                            //监
                        if(type==1){
                            if(c.guardian==undefined || c.guardian==""){
                                if(data.guardian!=undefined){
                                    _self.$forceUpdate();
                                    _self.$set(_self.newAddParams,'guardian',data.guardian);
                                }
                            }
                        }
                        _self.$Message.info("查询成功");
                    }else{
                        _self.$Message.error(res.msg);
                    }
                    this.show=true;
                });
            },
            getMessageJian(){
                this.differ="监";
                this.getMessage(this.newAddParams.guardianTel);
            },
            getMessageCun(){
                this.differ="村";
                this.getMessage(this.newAddParams.cjllrTel);
            },
            getMessageXiang(){
                this.differ="乡";
                this.getMessage(this.newAddParams.xzllrTel);
            },
            getMessageXian(){
                this.differ="县";
                this.getMessage(this.newAddParams.qxllrTel);
            },
            // selectedShip(row) {//选择渔船信息 并获得监护人信息
            //     this.$refs["newAddParams"].resetFields();
            //     this.newAddParams.shipid=row.id;
            //     this.newAddParams.shipname=row.nametheShip;
            //     this.newAddParams.pic=row.namevesselOwner;
            //     this.newAddParams.picTel=row.shipOwnerTelephone;
            //     // this.newAddParams.guardian="";
            //     // this.newAddParams.guardianTel="";
            //     this.$http.get("/check/drlc/jhrinfoByid",{
            //         params:{
            //             shipid:row.id
            //         }
            //     })
            //     .then(res=>{
            //         if(res.success){
            //             this.newAddParams.guardian=res.data.name;
            //             this.newAddParams.guardianTel=res.data.phone;
            //         }
            //     }); 
            //     this.$http.get("/check/drlc/check",{
            //         params:{
            //             shipid:row.id
            //         }
            //         })
            //     .then(res=>{
            //         if(res.success){
            //             this.status.selectShip=false;
            //         }else{
            //             this.$Message.error(res.msg);
            //         }
            //     });   
            // },  
            resetSelectShip(){
                this.queryX.wheres.nametheShip_like ="";
                this.selectShip();
            },
            pageSizeChangeX(size){
                this.queryX.size = size;
                this.selectShip();
            },   
            changePageX(page){
                this.queryX.page = page;
                this.selectShip();
            },


 
            initSearch() {
                this.$refs.test.initSearch();
            },
            handleReset() {
                this.query.wheres.search = "";
                this.query.page = 1;
                this.query.size = 10;
                this.initSearch();
            },
            handleSearch(){
                this.initSearch();
            },
            downloadMb(){
                window.open(this.$basePath+"/check/drlc/template");
            },
            newAdd(){
                // if(this.node.length==0&&this.showtree==true){
                //     this.$Message.error("请先选择部门");
                //     return ;
                // }
                this.newAddParams={};
                this.title="新增";
                this.$refs["newAddParams"].resetFields();
                var query = this.$route.query;
                if(!this.isEmpty(query.shipName)){
                    this.newAddParams.shipname = query.shipName;
                    this.$set(this.newAddParams,'shipname',query.shipName)
                }                
                var dt=new Date();
                this.logDate={
                    year:dt.getFullYear(),
                    month:dt.getMonth()+1,
                    day:dt.getDate(),
                };
                this.btnShow=true;
                this.modalStatus.newAddModal=true;
            },
            checkMsg(row){
                this.title="查看";
                this.$refs["newAddParams"].resetFields();
                this.btnShow=false;
                this.modalStatus.newAddModal=true;
                this.newAddParams=JSON.parse(JSON.stringify(row));
                var dt=new Date(this.newAddParams.createTime);
                this.logDate={
                    year:dt.getFullYear(),
                    month:dt.getMonth()+1,
                    day:dt.getDate(),
                };
            },
            dbhandleEdit(msg){
                this.title="查看";
                this.$refs["newAddParams"].resetFields();
                this.btnShow=false;
                this.modalStatus.newAddModal=true;
                this.newAddParams=JSON.parse(JSON.stringify(msg));
                var dt=new Date(this.newAddParams.createTime);
                this.logDate={
                    year:dt.getFullYear(),
                    month:dt.getMonth()+1,
                    day:dt.getDate(),
                };
            },
            handleEdit(row){
                this.newAddParams={};
                this.title="编辑";
                this.$refs["newAddParams"].resetFields();
                this.btnShow=true;
                this.modalStatus.newAddModal=true;
                this.newAddParams=JSON.parse(JSON.stringify(row));
                var dt=new Date(this.newAddParams.createTime);
                this.logDate={
                    year:dt.getFullYear(),
                    month:dt.getMonth()+1,
                    day:dt.getDate(),
                };
            },
            delete(id){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除此条关联渔船吗？",
                    onOk:function(){
                        _self.$http.delete("/check/drlc/"+id)
                        .then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.info('删除成功');
                            }else{
                                this.$Message.error(result.msg);
                            }
                        });
                    }
                });
            },
            saveData(name){
                var _self=this;
                _self.newAddParams.createTime=_self.logDate.year+"-"+_self.logDate.month+"-"+_self.logDate.day+" "+"00:00:00";
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                            _self.newAddParams.deptid=_self.deptid;
                            _self.newAddParams.creatorName=userObj.name;
                            _self.$http.post("/check/drlc",_self.newAddParams)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    _self.modalStatus.newAddModal=false;
                                    _self.$Message.info("新增成功");
                                }else{
                                    _self.$Message.error(res.msg);
                                }
                            });
                        }else{
                            _self.$http.patch("/check/drlc/update",_self.newAddParams)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    _self.modalStatus.newAddModal=false;
                                    _self.$Message.info("编辑成功");
                                }else{
                                    console.log(1)
                                    _self.$Message.error(res.msg);
                                }
                            });
                        }
                    }
                });
            },
            isEmpty(s) {
                if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
                    return true;
                }
                return false;
            },
            initQuery(){
                var query = this.$route.query;
                if(!this.isEmpty(query.shipName)){
                    this.query.wheres.search = query.shipName;
                    this.newAddParams.shipname = query.shipName;
                    this.$set(this.newAddParams,'shipname',query.shipName)
                }
                this.initSearch();
            },
        },
        beforeMount() {
            if(dept.type=="5"){
                this.showtree=false;
                this.downShow=true;
                this.query.key=dept.id;
                this.deptid=dept.id;
            }else{
                this.showtree=true;
            }
            if(this.$hasRoles("ADMIN") || this.$hasRoles("cooperative")){
                this.iSmanager=true;
            }else{
                this.iSmanager=false;
            }
        },
    //     watch: {
    //       'newAddParams.guardian': function(newVal){
    //           console.log(newVal)
    //       },
    //       'newAddParams.guardianTel': function(newVal){
    //           console.log(newVal)
    //       }
    //   },
        mounted() {
            if (!this.isEmpty(this.$route.query)) {
                this.initQuery();
            } else {
                this.initSearch();
            }
        },
    };
    </script>      
    <style scoped>
.titles{
    margin-bottom:10px;
}
    </style>
            
            
            