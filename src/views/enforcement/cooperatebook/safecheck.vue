<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
    <div>
        <Row>
            <data-table ref="test" 
                :autoInitTable="false"
                :url="'/standingbook/coop/sc/scList'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="80" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="合作社名称:">
                                    <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="4">
                                <Form-item label="渔船名:">
                                    <Input v-model="query.wheres.shipName_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="2" style="float:right;text-align:right;">
                                <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                            </Col>
                            <div class="btn-wrap">
                                <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                <Button @click="handleReset()"  >重置</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </data-table>
        </Row>
        <!-- 新增 -->
        <Modal v-model="modalStatus.newAddModal" :styles="{top: '120px'}" :title="title" width="842px" :mask-closable="maskclosable">
            <div style="height:600px;overflow:auto;">
            <table class="sqb">
                <caption><h2>渔船安全检查整改情况登记表</h2></caption>
                <caption>
                    <p style="margin-bottom:5px;">
                        <span style="position:relative;left:250px;">
                            <input v-model="logDate.year":readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">年
                            <input v-model="logDate.month":readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">月
                            <input v-model="logDate.day":readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">日
                        </span>
                    </p>
                </caption>
                <tr>
                    <td>合作社</td>
                    <td>
                        <input type="text" v-model="newAddParams.coopName" :readonly="readonly" :title="newAddParams.coopName" class="ipt">
                    </td>
                    <td>船名号</td>
                    <td>
                        <!-- <input type="button" v-model="newAddParams.shipName":readonly="readonly" class="ipt"> -->
                        <Input v-model="newAddParams.shipName" :readonly="readonly" placeholder="请输入...">
                            <Button @click="selectShipModal()" slot="append" type="primary" style="width:40px;">
                                <span style="position: relative;left:-9px;">选择</span>
                            </Button>
                        </Input>                        
                    </td>
                    <td>船长</td>
                    <td>
                        <input type="text" v-model="newAddParams.captain":readonly="readonly" class="ipt">
                    </td>
                </tr>
                <tr>
                    <td>整改<br/>内容</td>
                    <td colspan="5" style="height:100%;">
                        <Input v-model="newAddParams.rectify":readonly="readonly" :maxlength=200 type="textarea" style="min-height: 134px; ":autosize="{minRows: 6}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.rectify" style="width:96%;height:90%;border:0;outline:0;"></textarea> -->
                    </td>
                </tr>
                <tr>
                    <td>整改期限</td>
                    <td colspan="5">
                        <DatePicker v-model="newAddParams.rectifyRange":readonly="readonly" type="date" placeholder="请选择日期" style="width: 200px;position:relative;right:230px;"></DatePicker>
                    </td>
                </tr>
                <tr>
                    <td>整改<br/>要求</td>
                    <td colspan="5" style="height:100%;">
                        <Input v-model="newAddParams.rectifyRequire":readonly="readonly" :maxlength=200 type="textarea" style="min-height: 134px; ":autosize="{minRows: 6}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.rectifyRequire" style="width:96%;height:90%;border:0;outline:0;"></textarea> -->
                    </td>
                </tr>
                <tr>
                    <td>完成<br/>情况</td>
                    <td colspan="5" style="height:100%;">
                        <Input v-model="newAddParams.complete":readonly="readonly" :maxlength=200 type="textarea" style="min-height: 134px; ":autosize="{minRows: 6}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.complete" style="width:96%;height:90%;border:0;outline:0;"></textarea> -->
                    </td>
                </tr>
            </table>          
            </div>
            <div slot="footer">
                <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
                <Button v-show="btnShow" type="info" @click="saveData()">保存</Button>
                <Button v-show="!btnShow" @click="modalStatus.newAddModal = false" type="info">关闭</Button>
            </div>
        </Modal>
        <!-- 附件上传 -->
        <!-- <Modal v-model="fileShow" :styles="{top: '220px'}" title="附件上传" width="500" :mask-closable="maskclosable">
                <div ref="DIV">
                    <newUpload
                        multiple 
                        action="/$admin/attachs"
                        :ifEdit="ifEdit"
                        :show-upload-list="false"
                        :data="uploadData"
                        :format="format"
                        name="securityparameter"
                        :on-format-error="uploadError"
                        :before-upload="beforeUpload"  
                        :on-success="uploadSuccess"
                        :uploadList="uploadList"
                        >
                    </newUpload>
                </div> 
                <div slot="footer">
                    <Button type="info"  @click="fileShow=false">关闭</Button>
                </div>
            </Modal> -->
            <MultiUpload :owner="owner_Data" :shipName="shipName_Data" :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow"  :dataId="sID" moduleId="safecheck"></MultiUpload>
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
            <selectShipModal v-model="baseShipModal.show"  :inputShipName="newAddParams.shipName"  @on-select-ship="onSelectShip"></selectShipModal>
    </div>     
</template>
<script>
import newUpload from '@/views/components/Upload/newUpload.vue';
import {isNull,isEmpty } from '@/libs/common.js'; 
import user from '@/store/module/user.js';
import userObj from '@/store/module/userId.js';
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

var name=user.state.userInfo.dept.name;
export default {
    name: 'safecheck',
    components: {
        newUpload,MultiUpload,selectShipModal
    },
    data () {
        return {
            baseShipModal:{
                show:false
            },
            owner_Data: '',
            shipName_Data: '',
            name_Data: '',
            ifEdit: true,
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
            totalNumX:1,
            selectShipList: [],
            status:{
                btnshow:false,
                selectShip:false,
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
            format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
            iSmanager:false,
            modalStatus:{
                newAddModal:false,
            },
            maskclosable:false,
            readonly:false,
            newAddParams:{
                scTime:"",		// 登记时间
                shipName:"",    // 船名
                coopName:"",	// 合作社名称
                captain:"",	    // 船长
                rectify:"",	    // 整改内容
                rectifyRange:"",// 整改期限
                rectifyRequire:"",  // 整改要求
                complete:"",	    // 完成情况
            },
            logDate:{
                year:"",
                month:"",
                day:"",
            },
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    maxWidth: 80,
                    // ellipsis:true,
                    align: 'center',
                },
                {
                    title: '合作社名称',
                    align: 'center',
                    key: 'coopName'
                },
                {
                    title: '船名号',
                    align: 'center',
                    key: 'shipName'
                },
                {
                    title: '船东',
                    align: 'center',
                    key: 'captain'
                },
                {
                    title: '登记日期',
                    width:200,
                    align: 'center',
                    key: 'scTime',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.scTime));
                    }
                },
                {
                    title: '整改期限',
                    width:200,
                    align: 'center',
                    key: 'rectifyRange',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.rectifyRange));
                    }
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
                    width:255,
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var temp = [];
                        if(_self.iSmanager){
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
                                            _self.title="查看";
                                            _self.watchMsg(params.row);
                                        }
                                    }                       
                                },"查看"));
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style:{
                                        marginLeft:"10px"
                                    },
                                    on:{
                                        click:()=>{
                                            this.ifEdit = true                                        
                                            _self.uploadFs(params.row);
                                        }
                                    }                       
                                },"附件"));
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
                        }else{
                            if(userObj.userId==params.row.creatorId){
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
                            }
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
                                            _self.title="查看";
                                            _self.watchMsg(params.row);
                                        }
                                    }                       
                                },"查看"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                this.ifEdit = false
                                                if(userObj.userId==params.row.creatorId){
                                                    this.ifEdit = true
                                                }                                                
                                                _self.uploadFs(params.row);
                                            }
                                        }                       
                                    },"附件"));
                            if(userObj.userId==params.row.creatorId){
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
                            }
                        }
                        return h("div", temp);
                    }
                },
            ],
            dataList: [],
            query:{
                page:1,
                size:10,
                wheres:{
                    search:"",
                    shipName_like:"",
                    withOutRule:"",
                },
            },
            title:"",
            btnShow:true,
            /////////////////////////////////////////////////////////////////////
            fileShow:false,
            sID:"",
            uploadList:[],
        }
    },
    computed:{ 
        /////////////////////////////////////////////////////////////////////
        uploadData(){//上传时附带的额外参数 :data
            return {
                "dataId":this.sID,
                "moduleId":"standingbook",
                "name":"securityparameter"
            }
        }, 
    },
    methods: {
            selectedShip(row){
                // this.$refs["newAddParams"].resetFields();
                this.newAddParams.shipName=row.nametheShip;
                this.newAddParams.captain=row.namevesselOwner;
                this.status.selectShip=false;
            },
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
            selectShipModal(){
                this.baseShipModal.show = true
                // this.queryX.page=1;
                // this.queryX.size=10;
                // this.queryX.wheres.nametheShip_like=this.newAddParams.shipName;
                // this.selectShip();
                // this.status.selectShip=true;
            },
            onSelectShip(res){
                console.log(res,'onSelectShip')
                this.newAddParams.shipName = res.shipname
                this.newAddParams.captain = res.owner
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
        //图片区域
            /**证据照片 */
            beforeUpload:function(){//:before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
                var _self=this;
                var id=_self.sID;
                if(isEmpty(id)){
                    _self.$Message.error("请保存案件信息！");
                    return false;
                }
                return true;
            },
            uploadError(file,fileList){
                var fileName=file.name.split(".");
                fileName=fileName[fileName.length-1];
                var count=0;
                for(var i=0;i<this.format.length;i++){
                    if(fileName==this.format[i]){
                        count++;
                        break;
                    }
                }
                if(count==0){
                    this.$Message.error("文件格式不支持");
                    return;
                }
            },
            uploadSuccess:function(response,file,fileList){//:on-success 文件上传成功时的钩子，返回字段为 response, file, fileList
                if(response.success){
                    this.loadFiles();
                }
            },
            loadFiles:function(){
                var _self=this;
                _self.$http.get("/$admin/attachs",{
                    params:_self.uploadData
                }).then(function(result){
                    if(result.success){
                        _self.uploadList=result.data;
                    }
                });
            },
            // show(url){
            //     window.open(url);
            // },
            // deleteFile:function(index,item){
            //     var _self=this;
            //     _self.$http.delete("/$admin/attachs/"+item.id)
            //         .then(function(result){
            //             if(result.success){
            //                 _self.uploadList.splice(index, 1);
            //             }
            //             _self.$Message.info(result.msg);
            //     });
            // },
            getImages(v){
                var _self=this;
                _self.$http.get("/$admin/attachs?dataId="+v+"&moduleId=standingbook")
                .then(res=>{
                    if(res.success){
                        _self.uploadList=res.data;
                        _self.fileShow=true;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            },
            uploadFs(row){
                this.name_Data = row.creatorName
                this.shipName_Data = row.shipName
                this.owner_Data = row.captain
                this.sID=row.id;
                this.uploadList=[];
                this.getImages(row.id);
            },


        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }

            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        transDate(v){
            var dt=new Date(v);
            var year=dt.getFullYear();
            var month=dt.getMonth()+1;
            var day=dt.getDate();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }
            return year+"-"+month+"-"+day;
        },
        newAdd(){
            this.newAddParams={};
            this.title="新增";
            this.newAddParams.rectifyRange=new Date();
            this.newAddParams.coopName=name;
            this.readonly=false;
            var dt=new Date();
            var query = this.$route.query;
            if(!this.isEmpty(query.shipName)){
                this.newAddParams.shipName = query.shipName;
                this.$set(this.newAddParams,'shipName',query.shipName)      
            }
            this.logDate={
                year:dt.getFullYear(),
                month:dt.getMonth()+1,
                day:dt.getDate(),
            };
            this.btnShow=true;
            this.modalStatus.newAddModal=true;
        },
        dbhandleEdit(msg){
            this.title="查看";
            this.watchMsg(msg);
        },
        watchMsg(row){
            var _self=this;
            if(_self.title=="查看"){
                this.readonly=true;
                _self.btnShow=false;
            }else{
                _self.btnShow=true;
                this.readonly=false;
            }
            _self.$http.get("/standingbook/coop/sc/"+row.id)
            .then(res=>{
                if(res.success){
                    _self.newAddParams=res.data;
                    let dt=new Date(res.data.scTime);
                    _self.logDate={
                        year:dt.getFullYear(),
                        month:dt.getMonth()+1,
                        day:dt.getDate(),
                    };
                    _self.modalStatus.newAddModal=true;
                }
            });
        },
        handleEdit(row){
            this.title="编辑";
            this.watchMsg(row);
        },
        delete(id){
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除此条安全检查吗？",
                onOk:function(){
                    _self.$http.delete("/standingbook/coop/sc/"+id)
                    .then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.success('删除成功');
                        }else{
                            this.$Message.error("删除失败");
                        }
                    });
                }
            });
        },
        saveData(){
            var _self=this;
            if(_self.newAddParams.coopName==""||_self.newAddParams.coopName==undefined||_self.newAddParams.coopName.trim()==""){
                this.$Message.error("请填写合作社名称");
                return;
            }
            if(_self.newAddParams.shipName==""||_self.newAddParams.shipName==undefined||_self.newAddParams.shipName.trim()==""){
                this.$Message.error("请填写船名号");
                return;
            }

            _self.newAddParams.scTime=_self.logDate.year+"-"+_self.logDate.month+"-"+_self.logDate.day+" "+"00:00:00";
            if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                _self.newAddParams.creatorName=userObj.name;
                _self.$http.post("/standingbook/coop/sc/save",_self.newAddParams)
                .then(res=>{
                    if(res.success){
                        _self.initSearch();
                        _self.modalStatus.newAddModal=false;
                        _self.$Message.info("新增成功");
                    }else{
                        _self.$Message.error("新增失败");
                    }
                });
            }else{
                _self.$http.patch("/standingbook/coop/sc/"+_self.newAddParams.id,_self.newAddParams)
                .then(res=>{
                    if(res.success){
                        _self.initSearch();
                        _self.modalStatus.newAddModal=false;
                        _self.$Message.info("编辑成功");
                    }else{
                        _self.$Message.error("编辑失败");
                    }
                });
            }
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
                this.query.wheres.shipName_like = query.shipName;
                this.query.wheres.withOutRule = "1";
                // this.newAddParams.shipName = query.shipName;
                // console.log(this.newAddParams.shipName)
                // this.$nextTick(function () {
                //     this.$set(this.newAddParams,'shipName',query.shipName)
                // })           
            }
            this.initSearch();
        },
    },
    beforeMount() {
        if(this.$hasRoles("ADMIN") || this.$hasRoles("cooperative")){
            this.iSmanager=true;
        }else{
            this.iSmanager=false;
        }
    },
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
table.sqb{
    width:210mm;
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.sqb td{
    border:1px solid black;
    width:35px;
    height:50px;
    text-align:center;
    box-sizing:border-box;
}
table.sqb input.ipt{
    width:90%;
    height:90%;
    border:0;
    outline:0;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
}
table.sqb .textarea{
    width:98%;
    height:100%;
    border:0;
    outline:none;
    margin-top:5px;
    margin-bottom:1px;
    padding-bottom:5px ;
}
.textarea /deep/ .ivu-input:focus{
    border-color: #fff!important;
    box-shadow: 0 0 0 0px rgba(0,0,0,0)!important;
}
.textarea /deep/ .ivu-input:hover{
    border-color: #fff!important;
}
.textarea /deep/ .ivu-input{
    border: 0px!important;
}

table.sqb .hidn{
    height:1px;
    visibility:hidden;
}
table.sqb input.captions{
    width:30px;
    border:0;
    outline:0;
    text-align:center;
}
</style>
                
    
    
    