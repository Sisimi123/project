<!-- 渔业船舶安全管理台州案卷 -->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>
<template>
<div>
        <data-table ref="test" 
            :url="'/standingbook/parameter/files/getList'" 
            :params="query" 
            :columns="columns" 
            @on-row-dblclick="handleEdit"
            >
            <div slot="search">
                <Form :label-width="56" @submit.native.prevent>
                    <Row>
                        <Col span="5">
                            <Form-item label="渔船名:">
                                <Input v-model="query.shipname"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()"  >重置</Button>
                            <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </data-table>
        <!--详情-->
        <Modal v-model="modelDetail" title="详情" width="1080">
            <Row>
                <Col span="12">
                    <Table   
                        height="400" 
                        border 
                        :columns="columnsTablesN"  
                        :data="dataListTablesN" 
                        :loading="false"
                    ></Table>
                </Col>
                <Col span="12">
                    <Table   
                        height="400" 
                        border 
                        :columns="columnsTables"  
                        :data="dataListTables" 
                        :loading="false"
                    ></Table>
                </Col>
            </Row>
            <div slot="footer">
                <Button type="info" @click="modelDetail=false">关闭</Button>
            </div>                        
        </Modal>
        <!--详情-详情(渔船安全登录检查)-->
        <aqdcjcModel v-model="subModel.sea_standingbook_fishingsafetycheck" :parameteFileId="parameteFileId" @on-ok="handleDTS" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></aqdcjcModel>
        <!--详情-详情(渔船安全登船检查表2)-->
        <ycaqdcjcModel v-model="subModel.sea_standingbook_safetyboarding"  :parameteFileId="parameteFileId" @on-ok="handleDTS" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></ycaqdcjcModel>
        <!--详情-详情(渔船隐患自查统计表)-->
        <aqzrsModel v-model="subModel.sea_standingbook_fishingboat" :parameteFileId="parameteFileId" @on-ok="handleDTS" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></aqzrsModel>
        <!--详情-详情(海洋渔业捕捞许可年审申请表)-->
        <nssqbModel v-model="subModel.sea_standingbook_annualfishing" :parameteFileId="parameteFileId" @on-ok="handleDTS"  :dtlmID="detailMolID" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></nssqbModel>
        <!--详情-详情(渔业专业合作社一船一档目录)-->
        <ycydmlModel v-model="subModel.sea_standingbook_professionalcooperative" :parameteFileId="parameteFileId" @on-ok="handleDTS" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></ycydmlModel>
        <!--详情-详情(浙苍渔船安全台账)-->
        <aqtzModel v-model="subModel.sea_standingbook_securityparameter" :parameteFileId="parameteFileId" @on-ok="handleDTS" :sID="sID" :tx="tx" :shipName="SnOn.shipName" :ownerName="SnOn.ownerName" :phone="SnOn.phone"></aqtzModel>      
        <!--新增/修改-->
        <Modal :styles="{top: '220px'}" v-model="modelAU" :title="title" width="50%" >
            <Form  :label-width="80"   ref="dataInfo" :model="dataInfo" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                        <FormItem label="渔船名:" prop="shipName">
                            <Input v-model="dataInfo.shipName">
                                <Button slot="append"  @click="handleSelectShip()" >查找</Button>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="船东名:"  prop="ownerName">
                            <Input v-model="dataInfo.ownerName"/>
                        </FormItem>
                    </Col>                 
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="作业类型:" prop="jobType">
                            <Input v-model="dataInfo.jobType"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系电话:" prop="phone">
                            <Input v-model="dataInfo.phone"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="年度:" prop="theAnnual">
                            <Input v-model="dataInfo.theAnnual" :placeholder="dataInfo.theAnnual"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="机构:" prop="institutions">
                            <Input v-model="dataInfo.institutions"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>	
            <div slot="footer">
                <Button @click="modelAU = false">取消</Button>
                <Button type="info" @click="saveData('dataInfo')">保存</Button>
            </div>         
        </Modal>
        <!-- 所有渔船信息 -->
        <Modal :width="700" :styles="{'z-index':1000}" v-model="status.selectShip" title="渔船查询" :scrollable=true>
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
                    <Button  @click="resetSelectShip()">重置</Button>
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
</div>
</template>       
<script>
import {isNull } from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
import ycydmlModel from './ycydmlModel.vue'
import aqdcjcModel from './aqdcjcModel.vue'
import aqtzModel from './aqtzModel.vue'
import aqzrsModel from './aqzrsModel.vue'
import nssqbModel from './nssqbModel.vue'
import ycaqdcjcModel from './ycaqdcjcModel.vue'
import user from '@/store/module/user.js';
var uid=user.state.userInfo.userId;
export default {
    name: "anjuan",
    components:{
        ycydmlModel,
        aqdcjcModel,
        aqtzModel,
        aqzrsModel,
        nssqbModel,
        ycaqdcjcModel,
    },
    data() {
        return { 
            title:"",
            status: {
                selectEvent: false,
                selectShip: false,
                selectShiploading: false
            },
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
            totalNumX:1,
            info: {
                shipName: "", // 涉及渔船名
                area: "", // 船籍港
                fishCertificate: "", // 捕捞许可证

                shipownerName: "", // 船东姓名
                shipownerIdCard: "", // 船东身份证号
                shipownerTel: "", // 船东联系电话
                shipownerScore: 0, // 船东本次记分/消分 数值

                captainName: "", // 船长姓名
                captainIdCard: "", // 船长身份证号
                captainTel: "", // 船长联系电话
                captainCNumber: "", // 船长证书编号（船长职务证书）
                captainScore: 0, // 船长本次记分/消分 数值

                companyName: "", // 公司名
                companyIdCard: "", // 公司注册号
                companyTel: "", // 公司联系电话
                companyScore: 0, // 公司本次记分/消分 数值

                noteTaker: "", // 记录人
                noteTakerTel: "", // 记录電話
                noteTime: "", // 违反时间
                // operatingType: "", // 操作类型  0 消分；1 记分
                remarks: "", // 备注说明

                matter: []
            },

            ruleValidate: {
                    shipName: [
                        { required: true, message: '请输入渔船名', trigger: 'blur' }
                    ],
                    ownerName: [
                        { required: true, message: '请输入船东名', trigger: 'blur' }
                    ],
                    jobType: [
                        { required: true, message: '请输入作业类型', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    theAnnual: [
                        { required: true, message: '请输入年度', trigger: 'blur' },
                    ],
                    institutions: [
                        { required: true, message: '请输入机构', trigger: 'blur' }
                    ],
            },
            columnsTables:[
                {
                    title:"序号",
                    type:"index",
                    width:80
                },
                {
                    title: "已添加",
                    key: "name",
                },
                {
                    title: "操作",
                    key: "id",
                    width:180,
                    render: (h, params) => {  
                        var _self=this;          
                        var id = params.row.id;
                        var temp = [];
                        temp.push(
                            h("Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },                               
                                    on: { 
                                        click: () => {             
                                            _self.subModel["sea_standingbook_"+params.row.type]=true;
                                            _self.sID=params.row.id;
                                            _self.tx="update";
                                        }
                                    }
                                },"编辑"), 
                            h("Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style:{
                                        marginLeft:"10px"
                                    },                               
                                    on: { 
                                        click: () => {              
                                            _self.subModel["sea_standingbook_"+params.row.type]=true;
                                            _self.sID=params.row.id;
                                            _self.tx="dayin";
                                        }
                                    }
                                },"打印"),  
                                h("Button",
                                    {
                                        props:{
                                            type:"error",
                                            size:"small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.$Modal.confirm({
                                                    title:"提示",
                                                    content:"确定要删除当前栏目吗？",
                                                    onOk:function(){
                                                        _self.$http.delete("/standingbook/word/table/"+id).then(result =>{
                                                            if(result.success){
                                                                _self.mtTables();
                                                                _self.$Message.success('删除成功!');
                                                            }else{
                                                                _self.$Message.info(result.msg);
                                                            }
                                                        });
                                                    
                                                    }
                                                });
                                            }
                                        }
                                    },"删除"),                 
                        );
                        return h("div", temp);
                    }
                },
            ],
            dataListTables:[],
            columnsTablesN:[
                {
                    title: "序号",
                    type: "index",
                    width:80
                },
                {
                    title: "相关事项",
                    key: "title",
                },
                {
                    title: "操作",
                    key: "id",
                    width:100,
                    render: (h, params) => {  
                        var _self=this;                  
                        var id = params.row.id;                    
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                            _self.subModel[params.row.value]=true;
                                            _self.tx="add";
                                        }
                                    }
                                },                            
                                "新增"
                            )                       
                        );
                        return h("div", temp);
                    }
                },
            ],          
            dataInfo:{
                //id:"",
                shipName:"",//渔船名
                jobType:"",//作业类型
                ownerName:"",//船东名字
                phone:"",//联系电话
                theAnnual:"",//年度
                createTime:new Date(),//创建时间
                institutions:"",
            },
            modelAU:false, 
            modelDetail:false,
            parameteFileId:"",
            SnOn:{
                shipName:"",
                ownerName:"",
                phone:"",
            },
            sID:"",
            tx:"",
            subModel:{
                sea_standingbook_annualfishing:false,
                sea_standingbook_fishingboat:false,
                sea_standingbook_safetyboarding:false,
                sea_standingbook_fishingsafetycheck:false,
                sea_standingbook_professionalcooperative:false,
                sea_standingbook_securityparameter:false,
            },
            detailPM:false, 
            detailCB:false,
            detailIF:false,
            detailPIC:false,
            detailMolID:"",
            totalNum: 0,//总条数
            query:{
                page:1,
                size:10,
                shipname:"",
            },
            querytables:{
                key:"getSeaWorldTablePage",
                wheres:{
                    parameteFileId:""
                },
                name:"海洋"
            },
            dataList: [], //表格中的数据集合  
            columns: [//表头 直接变量传值
                {
                    title: "序号",
                    type: "index",//序号展示
                    width:130
                },
                {
                    title: "船名号",
                    key: "shipName",
                },
                {
                    title: "作业类型",
                    key: "jobType",
                },
                {
                    title: "船东",
                    key: "ownerName",
                },
                {
                    title: "联系电话",
                    key: "phone",
                },
                {
                    title:"年度",
                    key:"theAnnual",
                },
                {
                    title:"机构",
                    key:"institutions",
                },
                {   
                    title:"创建时间",
                    key:"createTime",
                    width:160,
                },
                {
                    title: "操作",
                    key: "id",
                    width:180,
                    render: (h, params) => {
                        var id = params.row.id;
                        var temp = [];
                        temp.push(
                            h("Button",
                                {
                                    props: {
                                    type: "primary",
                                    size: "small"
                                    },
                                    on:{
                                        click:()=>{
                                            this.editData(params);
                                        }
                                    }                       
                                },"编辑"),
                            h("Button",
                                {
                                    props:{
                                        type:"info",
                                        size:"small"
                                    },
                                    style:{
                                        marginLeft:"10px"
                                    },
                                    on:{
                                        click:()=>{
                                        this.detailM(params);
                                        }
                                    }
                                },"详情"),
                            h("Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: "10px"
                                    },
                                    on: {
                                        click: () => {
                                        this.remove(id);                       
                                        }
                                    }
                                },"删除"),
                        );
                        return h("div", temp);
                    }
                },                   
            ],
        };
    },     
    mounted() {
        this.initSearch();
        // this.getPageList();
    },
    computed:{
        dataListTablesN(){
            return this.$store.getters.getDictList("sea_standingbook_parameterfiles");
        }
    },
    methods: {
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            // for (let key in this.query.wheres) {
            //     this.query.wheres[key] = "";
            // }
            this.query.shipname="";
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        handleSelectShip() {
            this.status.selectShip = true;
            this.selectShip();
        },
        resetSelectShip(){
            this.queryX.wheres.nametheShip_like ="";
            this.selectShip();
        },
        selectShip(value) {
            if (value == 1) {
                this.queryX.page = 1;
            }
            this.status.selectShiploading = true;
            this.$http
            .get("/shiparchives/normalnyb/getPage", {
            params: {
                query: JSON.stringify(this.queryX)
            }
            })
            .then(res => {
            this.totalNumX= res.data.total;
            this.selectShipList = res.data.data;
            this.status.selectShiploading = false;
            })
            .catch(error => {
            console.log(error);
            });
        },
        selectedShip(info) {
            var _self=this;
            _self.dataInfo.shipName = info.nametheShip;
            _self.dataInfo.ownerName = info.namevesselOwner;
            _self.dataInfo.phone = info.shipOwnerTelephone;
            _self.dataInfo.jobType=info.workmode;
            _self.status.selectShip = false;
        },  
        pageSizeChangeX(size){
            this.queryX.size = size;
            this.selectShip();
        },   
        changePageX(page){
            this.queryX.page = page;
            this.selectShip();
        },
        //渔船船舶安全管理台账案卷methods
            //新增
        newAdd(){
            this.title="新增";
            this.$refs["dataInfo"].resetFields();
            this.modelAU=true;
            this.dataInfo={};
            this.dataInfo.theAnnual=new Date().getFullYear().toString();
        },
            //修改 编辑页面信息进行修改(即把要改行的老数据请求（修改接口需要传id）过来下载到页面对应的数据列)
        editData(params){
            var _self=this;
            this.title="编辑";
            this.$refs["dataInfo"].resetFields();
            var dataInfo=params.row;//通过params拿到id再请求
            _self.$http.get("standingbook/parameter/files/"+dataInfo.id)
            .then(res=>{
                if(res.success){
                    _self.dataInfo=res.data;
                    _self.modelAU=true;
                }
            })
        },
        handleEdit(msg){
            var _self=this;
            this.title="编辑";
            this.$refs["dataInfo"].resetFields();
            var dataInfo=msg;//通过params拿到id再请求
            _self.$http.get("standingbook/parameter/files/"+dataInfo.id)
            .then(res=>{
                if(res.success){
                    _self.dataInfo=res.data;
                    _self.modelAU=true;
                }
            })
        },
            //保存数据用isNull函数来判断dataInfo.id如果为空则进行新增接口否则则进行更新接口
        saveData(name){
            var _self=this;
            var dataInfo=_self.dataInfo;
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(isNull(dataInfo.id)){
                            _self.$http.post("standingbook/parameter/files",dataInfo)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    // _self.getPageList();
                                    _self.modelAU=false;
                                    this.$Message.success('成功!');
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                        }else{
                            _self.$http.patch("standingbook/parameter/files/"+dataInfo.id,dataInfo)
                            .then(res=>{
                                if(res.success){
                                _self.initSearch();
                                // _self.getPageList();
                                _self.modelAU=false;
                                this.$Message.success('成功!');
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                        }
                    } else {
                        this.$Message.error('失败!');
                    }
                })
        },
            //删除
        remove(id){
            var _self=this;
            this.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前栏目吗？",
                onOk:function(){
                    this.$http.delete("standingbook/parameter/files/"+id).then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.success('删除成功!');
                        }else{
                            this.$Message.info(result.msg);
                        }
                    });
                
                }
            });
        }, 
        detailM(params){
            this.parameteFileId=params.row.id;
            this.modelDetail=true;
            this.mtTables();
            this.SnOn.shipName=params.row.shipName;
            this.SnOn.ownerName=params.row.ownerName;
            this.SnOn.phone=params.row.phone;
        }, 
            //详情子表数据挂载
        mtTables(){
            var _self=this;
            _self.querytables.wheres.parameteFileId=_self.parameteFileId;
            _self.$http.get("/standingbook/word/table",{
                params:{
                    _model:JSON.stringify(_self.querytables)
                }
            })
            .then(res=>{
                if(res.success){
                    _self.dataListTables=res.data;                  
                }
            })
            .catch(err=>{
                console.log(err);
            });
        },
            //详情子表数据重挂载,从Modal传来
        handleDTS(){
            this.mtTables();
        },
      }         
};
</script>
<style scoped>
    
#promiseB>h1,#promiseB>h4{
    text-align:center;
}
#promiseB>div>p{
    text-indent:25px;
    font-size:16px;
    margin:3px 0;
}
#detailIF>h1{
    text-align:center;
}
#detailIF>div>p{
    text-indent:20px;
}
table.pic,table.dtl{
    border-collapse: collapse;
    margin-bottom: 10px;
}
/*船员安全责任书签署现场照片PIC*/
table.pic td{
    border:1px solid black;
    width:60px;
    height:250px;
    font-size:15px;
}
table.pic td img{
    width:90%;
}
table.pic td>p>span.pi{
    float:right;
    margin-right:20%;
}
table.pic td>p.pi3,table.pic td>p.pi4{
    margin:2% 2%;
    position:relative;
    bottom:3%;
}
table.pic td>p>span.pi2{
    margin-left:10%;
}
table.pic td.sig{
    height:160px;
}
table.pic input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.dtl td{
    border:1px solid black;
    height:32px;
    text-align:center;
    font-size:15px;
}
</style> 
