<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
    <div>
        <Row>
            <data-table ref="test" 
                :url="'standingbook/coop/mcc/mccList'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="渔船名:">
                                    <Input v-model="query.wheres.search "  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
            <div style="height:493px;overflow:auto;">
            <table class="sqb">
                <caption><h2>事故险情登记表</h2></caption>
                <tr>
                    <td>报案人</td>
                    <td>
                        <input v-model="newAddParams.alarmPeople":readonly="readonly" type="text" class="ipt">
                    </td>
                    <td>报案人电话</td>
                    <td colspan="2">
                        <input v-model="newAddParams.alarmTel":readonly="readonly" type="text" class="ipt">
                    </td>
                    <td>报案时间</td>
                    <td colspan="2">
                        <DatePicker v-model="newAddParams.alarmTime":readonly="readonly" type="datetime" placeholder="请选择日期时间" style="width: 100%;"></DatePicker>
                    </td>
                </tr>
                <tr>
                    <td>渔船名</td>
                    <td>
                        <input v-model="newAddParams.shipName":readonly="readonly" type="text" class="ipt">
                    </td>
                    <td>事故地点</td>
                    <td colspan="2">
                        <input v-model="newAddParams.accidentPlace":readonly="readonly" type="text" class="ipt">
                    </td>
                    <td>发生时间</td>
                    <td colspan="2">
                        <DatePicker v-model="newAddParams.accidentTime":readonly="readonly" type="datetime" placeholder="请选择日期时间" style="width: 100%;"></DatePicker>
                    </td>
                </tr>
                <tr>
                    <td>事故内容</td>
                    <td colspan="7" style="height:100%;">
                        <Input v-model="newAddParams.accidentContent":readonly="readonly" :maxlength="200" type="textarea" style="min-height: 155px; ":autosize="{minRows: 7}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.accidentContent" style="width:96%;height:90%;border:0;outline:0;"></textarea> -->
                    </td>
                </tr>
                <tr>
                    <td>损坏情况</td>
                    <td  colspan="7" style="height:100%;">
                        <Input v-model="newAddParams.damage":readonly="readonly" :maxlength="200" type="textarea" style="min-height: 155px; ":autosize="{minRows: 7}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.damage"></textarea> -->
                    </td>
                </tr>
                <tr>
                    <td>处理结果</td>
                    <td colspan="7" style="height:100%;">
                        <Input v-model="newAddParams.handing":readonly="readonly" :maxlength="200" type="textarea" style="min-height: 71px; ":autosize="{minRows: 3}"  class="textarea"></Input>
                        <!-- <textarea v-model="newAddParams.handing"></textarea> -->
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
        </Modal>-->
        <MultiUpload :shipName="shipName_Data" :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow"  :dataId="sID" moduleId="seafishevents"></MultiUpload>
    </div>     
</template>
<script>
import newUpload from '@/views/components/Upload/newUpload.vue';
import {isNull,isEmpty } from '@/libs/common.js'  
import userObj from '@/store/module/userId.js';
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
export default {
    name: 'seafishevents',
    components: {
        newUpload,MultiUpload
    },
    data () {
        return {
            shipName_Data: '',
            name_Data: '',
            ifEdit: true,
            format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
            iSmanager:false,
            modalStatus:{
                newAddModal:false,
            },
            readonly:false,
            maskclosable:false,
            newAddParams:{
                alarmTime:"",//报案时间
                alarmPeople:"",//办案人
                alarmTel:"",//办案人电话
                shipName:"",//船名

                accidentTime:"",//发生事故时间
                accidentPlace:"",//事故地点
                accidentContent:"",//事故内容
                damage:"",//损坏情况
                handing:"",//处理结果
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
                    title: '渔船名',
                    align: 'center',
                    key: 'shipName'
                },
                {
                    title: '事故地点',
                    align: 'center',
                    ellipsis:true,
                    key: 'accidentPlace'
                },
                {
                    title: '报案人',
                    align: 'center',
                    key: 'alarmPeople'
                },
                {
                    title: '报案时间',
                    align: 'center',
                    maxWidth: 190,
                    key: 'alarmTime'
                },
                {
                    title: '事故发生时间',
                    align: 'center',
                    maxWidth: 190,
                    key: 'accidentTime'
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
        newAdd(){
            this.newAddParams={};
            this.title="新增";
            this.newAddParams.alarmTime=new Date();
            this.newAddParams.accidentTime=new Date();
            this.readonly=false;
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
            _self.$http.get("/standingbook/coop/mcc/"+row.id)
            .then(res=>{
                if(res.success){
                    _self.newAddParams=res.data;
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
                content:"您确定要删除此条海事渔事吗？",
                onOk:function(){
                    _self.$http.delete("/standingbook/coop/mcc/"+id)
                    .then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.info('删除成功');
                        }else{
                            this.$Message.error("删除失败");
                        }
                    });
                }
            });
        },
        // datetimeTrans(v){
        //     var dt=new Date(v);
        //     var year=dt.getFullYear();
        //     var month=dt.getMonth()+1;
        //     var day=dt.getDate();
        //     var hour=dt.getHours();
        //     var minute=dt.getMinutes();
        //     var second=dt.getSeconds();
        //     return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        // },
        saveData(){
            var _self=this;
            if(_self.newAddParams.alarmPeople==""||_self.newAddParams.alarmPeople==undefined||_self.newAddParams.alarmPeople.trim()==""){
                this.$Message.error("请填写报案人");
                return ;
            }
            if(_self.newAddParams.alarmTel==""||_self.newAddParams.alarmTel==undefined||_self.newAddParams.alarmTel.trim()==""){
                this.$Message.error("请填写报案人电话");
                return ;
            }
            if(_self.newAddParams.alarmTime==""||_self.newAddParams.alarmTime==undefined){
                this.$Message.error("请填写报案时间");
                return ;
            }
            if(_self.newAddParams.shipName==""||_self.newAddParams.shipName==undefined||_self.newAddParams.shipName.trim()==""){
                this.$Message.error("请填写船名号");
                return ;
            }
            if(_self.newAddParams.accidentPlace==""||_self.newAddParams.accidentPlace==undefined||_self.newAddParams.accidentPlace.trim()==""){
                this.$Message.error("请填写事故地点");
                return ;
            }
            if(_self.newAddParams.accidentTime==""||_self.newAddParams.accidentTime==undefined){
                this.$Message.error("请填写发生时间");
                return ;
            }

            if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                _self.newAddParams.creatorName=userObj.name;
                _self.$http.post("/standingbook/coop/mcc/save",_self.newAddParams)
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
                _self.$http.patch("/standingbook/coop/mcc/"+_self.newAddParams.id,_self.newAddParams)
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
    },
    beforeMount() {
        if(this.$hasRoles("ADMIN") || this.$hasRoles("cooperative")){
            this.iSmanager=true;
        }else{
            this.iSmanager=false;
        }
    },
    mounted() {
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
        width:114px;
        height:60px;
        text-align:center;
        box-sizing:border-box;
    }
    table.sqb input.ipt{
        width:90%;
        height:90%;
        border:0;
        outline:0;
    }
    table.sqb .textarea{
        width:98%;
        height:100%;
        border:0;
        outline:none;
        margin-top:10px;
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
        height:5px;
        visibility:hidden;
    }
</style>
                    
        
        
        