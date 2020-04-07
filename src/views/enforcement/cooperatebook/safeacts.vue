<style lang="less" scoped>
        @import '../../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row>
                <data-table ref="test" 
                    :url="'/standingbook/coop/sa/saList'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="65" @submit.native.prevent>
                            <Row>
                                <Col span="4">
                                    <Form-item label="活动名称:">
                                        <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="4" style="float: right;text-align: right;">
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
            <Modal v-model="modalStatus.newAddModal" :styles="{top: '100px'}" :title="title" width="842px" :mask-closable="maskclosable">
                <div style="height:600px;overflow:auto;">
                    <table class="sqb">
                        <caption><h2>安全活动记录表</h2></caption>
                        <tr class="ct">
                            <td>活动名称</td>
                            <td colspan="4">
                                <input v-model="newAddParams.activeName":readonly="readonly"  type="text" class="ipt" style="width:96%;">
                            </td>
                        </tr>
                        <tr class="ct">
                            <td>活动时间</td>
                            <td colspan="2" style="position: relative;">
                                <DatePicker v-model="newAddParams.activeDate":readonly="readonly"  type="datetime" placeholder="请选择日期时间" style="width: 100%;position: absolute;top:10px;left:0px;z-index:100000;"></DatePicker>
                            </td>
                            <td>活动地点</td>
                            <td colspan="2">
                                <input v-model="newAddParams.place":readonly="readonly"  type="text" class="ipt">
                            </td>
                        </tr>
                        <tr class="ct">
                            <td>负责人</td>
                            <td colspan="2">
                                <input v-model="newAddParams.leader":readonly="readonly"  type="text" class="ipt">
                            </td>
                            <td>记录人</td>
                            <td colspan="2">
                                <input v-model="newAddParams.recorder":readonly="readonly"  type="text" class="ipt">
                            </td>
                        </tr>
                        <tr v-show="btnShow" class="ct">
                            <td>参加人员</td>
                            <td colspan="4" style="height:100%;">
                                <Input v-model="newAddParams.parts":readonly="readonly" :maxlength=200 type="textarea" style="min-height: 134px; " :autosize="{minRows: 6}"  class="textarea"></Input>
                                <!-- <textarea v-model="newAddParams.parts" class="textarea btm"></textarea> -->
                            </td>    
                        </tr>
                        <tr v-show="btnShow" class="ct">
                            <td>活动内容摘要</td>
                            <td colspan="4" style="height:100%;">
                                <Input v-model="newAddParams.content":readonly="readonly" :maxlength=200 type="textarea" style="min-height: 134px; " :autosize="{minRows: 10}"  class="textarea"></Input>
                            </td>  
                        </tr>
                        <tr v-show="!btnShow">
                            <td colspan="5" style="height:100%;">
                                <div style="width:99%;min-height: 134px;" id="peoples"></div>
                            </td>    
                        </tr>
                        <tr v-show="!btnShow">
                            <td colspan="5" style="height:100%;">
                                <div style="width:99%;min-height: 210px;" id="wenzi"></div>
                            </td>    
                        </tr>
                        <tr class="ct">
                            <td>活动图片</td>
                            <td colspan="4">   
                                <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="'uploadList_'+index">
                                    <template v-if="item.id">
                                        <img :src= "basepath+'/$admin/attachs/stream/'+item.id">
                                        <div class="demo-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="showFile(item)"></Icon>
                                            <Icon v-show="btnShow" type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                    </template>
                                </div>
                                <MyUpload
                                    v-show="btnShow" 
                                    ref="upload"
                                    :show-upload-list="false"
                                    :default-file-list="defaultList"
                                    :on-success="handleSuccess"
                                    :on-format-error="handleFormatError"
                                    :before-upload="handleBeforeUpload"
                                    :data="uploadData"  
                                    multiple
                                    type="drag"
                                    :format="['bmp','jpg','png','jpeg','tiff','gif']"  
                                    :action="'/$admin/attachs?dataId='+this.uploadData.docid+'&moduleId='+this.uploadData.moduleid"
                                    style="display: inline-block;width:58px;">
                                    <div style="width: 58px;height:58px;line-height: 58px;">
                                        <Icon type="camera" size="20"></Icon>
                                    </div>
                                </MyUpload>
                                <Modal title="查看图片" v-model="visible">
                                    <img :src="basepath+imgName" v-if="visible" style="width: 100%">
                                </Modal>              
                            </td>
                        </tr>
                    </table>
                </div>
                <div slot="footer">
                    <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
                    <Button v-show="btnShow" type="info" @click="saveData()">保存</Button>
                    <Button v-show="!btnShow" @click="modalStatus.newAddModal = false" >关闭</Button>
                </div>
            </Modal>
            <pic v-model="showPic" :img="showPicPathWithBase"></pic>   
            <!-- 附件上传 -->
            <!-- <Modal v-model="fileShow" :styles="{top: '220px'}" title="附件上传" width="500" :mask-closable="maskclosable">
                    <div ref="DIV">
                        <newUpload
                            multiple 
                            action="/$admin/attachs"
                            :ifEdit="ifEdit"
                            :show-upload-list="false"
                            :data="uploadDataList"
                            :format="format"
                            name="securityparameter"
                            :on-format-error="uploadError"
                            :before-upload="beforeUploadList"  
                            :on-success="uploadSuccessList"
                            :uploadList="uploadListList"
                            >
                        </newUpload>
                    </div> 
                    <div slot="footer">
                        <Button type="info"  @click="fileShow=false">关闭</Button>
                    </div>
                </Modal>    -->
                <MultiUpload :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow"  :dataId="sID" moduleId="safeacts"></MultiUpload>
        </div>     
    </template>
    <script>
    import newUpload from "@/views/components/Upload/newUpload.vue";
    import MyUpload from "@/views/components/Upload/MyUpload.vue";
    import pic from "@/views/components/pic/pic.vue";
    import {isNull,isEmpty } from '@/libs/common.js'  
    import userObj from '@/store/module/userId.js';
    import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
    export default {
        name: 'safeacts',
        components: {
            MyUpload,
            newUpload,
            pic,
            MultiUpload
        },
        data () {
            return {
                name_Data: '',
                ifEdit: true,
                format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
                iSmanager:false,
                defaultList: [],
                imgName: "",
                visible: false,
                uploadList: [],
                showPic: false,
                showPicId: "",
                basepath: this.$basePath,
                modalStatus:{
                    newAddModal:false,
                },
                newAddParams:{
                    filesId:"",   // 通用接口文件保存的id
                    activeName:"",// 活动名称
                    activeDate:"",// 活动时间
                    leader:"",    // 负责人
                    place:"",     // 活动地点
                    recorder:"",  // 记录人
                    parts:"",     // 参加人员
                    content:"",   // 活动内容摘要
                    unfoldCount:0,// 展开次数
                    activeCount:0,// 检察次数
                    isRead:0,     // 是否已读
    
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
                        title: '活动名称',
                        align: 'center',
                        key: 'activeName'
                    },
                    {
                        title: '负责人',
                        align: 'center',
                        key: 'leader'
                    },
                    {
                        title: '记录人',
                        align: 'center',
                        key: 'recorder'
                    },
                    {
                        title: '活动地点',
                        ellipsis:true,
                        align: 'center',
                        key: 'place'
                    },
                    {
                        title: '活动时间',
                        align: 'center',
                        maxWidth: 200,
                        key: 'activeDate'
                    },
                    {
                        title: '创建人',
                        align: 'center',
                        key: 'creatorName',
                        maxWidth:140
                    },
                    {
                        title: '操作',
                        width:255,
                        align: 'center',
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
                                                _self.uploadFsList(params.row);
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
                                                    _self.uploadFsList(params.row);
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
                        search:"",//activeName(合作社名) 的模糊查询
                    },
                },
                title:"",
                btnShow:true,
                sid:"",
                /////////////////////////////////////////////////////////////////////
                fileShow:false,
                sID:"",
                uploadListList:[],
                maskclosable:false,
                readonly:false,
            }
        },
        computed:{  
            uploadData: function() {
            return {
                docid: this.sid,
                moduleid: "standingbook"
            };
            },
            importData: function() {
                return {
                    viewId: this.query.viewId
                };
            },
            showPicPathWithBase() {
            return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
            },
            /////////////////////////////////////////////////////////////////////
            uploadDataList(){//上传时附带的额外参数 :data
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
            beforeUploadList:function(){//:before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
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
            uploadSuccessList:function(response,file,fileList){//:on-success 文件上传成功时的钩子，返回字段为 response, file, fileList
                if(response.success){
                    this.loadFilesList();
                }
            },
            loadFilesList:function(){
                var _self=this;
                _self.$http.get("/$admin/attachs",{
                    params:_self.uploadDataList
                }).then(function(result){
                    if(result.success){
                        _self.uploadListList=result.data;
                    }
                });
            },
            showList(url){
                window.open(url);
            },
            deleteFileList:function(index,item){
                var _self=this;
                _self.$http.delete("/$admin/attachs/"+item.id)
                    .then(function(result){
                        if(result.success){
                            _self.uploadListList.splice(index, 1);
                        }
                        _self.$Message.info(result.msg);
                });
            },
            getImagesList(v){
                var _self=this;
                _self.$http.get("/$admin/attachs?dataId="+v+"&moduleId=standingbook")
                .then(res=>{
                    if(res.success){
                        _self.uploadListList=res.data;
                        _self.fileShow=true;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            },
            uploadFsList(row){
                this.name_Data = row.creatorName
                this.sID=row.id;
                this.uploadListList=[];
                this.getImagesList(row.id);
            },


            handleRemove: function(file, index) {
                var _self = this;
                this.$http.delete("/$admin/attachs/" + file.id)
                .then(response => {
                    if (response.success) {
                    var fileList = _self.uploadList;
                    fileList.splice(index, 1);
                    }
                });
            },
            handleSuccess: function(res, file) {
                this.attachs();
            },
            handleFormatError: function(file) {
                this.$Message.error("文件格式不支持上传！");
            },
            handleBeforeUpload: function() {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Message.error("最多只能上传 5 张图片。");
                }
                return check;
            },
            showFile: function(item) {
                this.showPicId = item.id;
                this.showPic = true;
            },
            attachs: function() {
                var _self = this;
                this.$http.get("/$admin/attachs?dataId=" +
                        _self.uploadData.docid +
                        "&moduleId=" +
                        _self.uploadData.moduleid
                    )
                    .then(response => {
                    if (response.success) {
                        _self.uploadList = response.data;
                    }
                });
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
                this.$http.get("/$admin/attachs/uuid")
                .then(res=>{
                    this.sid=res.data;
                })
                .catch(err=>{
                    console.log(err);
                }); 
                this.newAddParams={};
                this.newAddParams.activeDate=new Date();
                this.title="新增";
                this.btnShow=true;
                this.uploadList=[];
                this.uploadListList=[];
                this.modalStatus.newAddModal=true;
            },
            dbhandleEdit(msg){
                this.title="查看";
                this.watchMsg(msg);
            },
            watchMsg(row){
                console.log(row)
                this.sid=row.filesId;
                var _self=this;
                if(_self.title=="查看"){
                    _self.btnShow=false;
                    _self.readonly=true;
                }else{
                    _self.btnShow=true;
                    _self.readonly=false;
                }
                _self.$http.get("/standingbook/coop/sa/"+row.id)
                .then(res=>{
                    if(res.success){
                        _self.newAddParams=res.data;
                        _self.modalStatus.newAddModal=true;
                        _self.uploadData.docid=row.filesId;
                        _self.attachs();

                        if(_self.title=="查看"){
                            if(_self.newAddParams.content==undefined){
                                _self.newAddParams.content="";
                            }
                            $("#wenzi").html("");
                            $("#wenzi").html("<div style='width:100%;text-align:left;'><span style='display:inline-block;text-align:left;margin-left:10px;'>活动内容摘要：</span><div style='margin-left:10px;text-indent:25px;'>"+_self.newAddParams.content+"</div></div>");
                            if(_self.newAddParams.parts==undefined){
                                _self.newAddParams.parts="";
                            }
                            $("#peoples").html("");
                            $("#peoples").html("<div style='width:100%;text-align:left;'><span style='display:inline-block;text-align:left;margin-left:10px;'>参加人员：</span><div style='margin-left:10px;text-indent:25px;'>"+_self.newAddParams.parts+"</div></div>");
                        }
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
                    content:"您确定要删除此条安全活动吗？",
                    onOk:function(){
                        _self.$http.delete("/standingbook/coop/sa/"+id)
                        .then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功!');
                            }else{
                                this.$Message.error("删除失败");
                            }
                        });
                    }
                });
            },
            saveData(){
                var _self=this;
                if(_self.newAddParams.activeName==""||_self.newAddParams.activeName==undefined||_self.newAddParams.activeName.trim()==""){
                    this.$Message.error("请填写活动名称");
                    return ;
                }
                if(_self.newAddParams.activeDate==""||_self.newAddParams.activeDate==undefined){
                    this.$Message.error("请填写活动时间");
                    return ;
                }
                if(_self.newAddParams.place==""||_self.newAddParams.place==undefined||_self.newAddParams.place.trim()==""){
                    this.$Message.error("请填写活动地点");
                    return ;
                }
                if(_self.newAddParams.leader==""||_self.newAddParams.leader==undefined||_self.newAddParams.leader.trim()==""){
                    this.$Message.error("请填写负责人");
                    return ;
                }
                if(_self.newAddParams.recorder==""||_self.newAddParams.recorder==undefined||_self.newAddParams.recorder.trim()==""){
                    this.$Message.error("请填写记录人");
                    return ;
                }

                if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                    _self.newAddParams.filesId=_self.sid;
                    _self.newAddParams.creatorName=userObj.name;
                    _self.$http.post("/standingbook/coop/sa/save",_self.newAddParams)
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
                    _self.$http.patch("/standingbook/coop/sa/"+_self.newAddParams.id,_self.newAddParams)
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
table.sqb tr.ct>td{
    border:1px solid black;
    width:130px;
    height:50px;
    text-align:center;
    box-sizing:border-box;
}
table.sqb td{
    border:1px solid black;
    width:130px;
    height:50px;
    box-sizing:border-box;
}
table.sqb input.ipt{
    width:90%;
    height:90%;
    border:0;
    outline:0;
}
table.sqb .textarea{
    width:99%;
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
    font-size:12px !important;
}
tr /deep/ table.edui-default{
    display:none !important;
}
table.sqb .hidn{
    height:1px;
    visibility:hidden;
}


.ivu-input-icon {
  margin-top: 8px;
}
.ivu-modal {
  top: 20px;
}
.ivu-modal-body {
  padding: 8px;
}
.ivu-form-item {
  margin-bottom: 5px;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
    </style>
                    
        
        
        