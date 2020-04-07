<style lang="less" scoped>
        @import '../../../styles/common.less';
</style>  
<template>
    <div>
        <Row>
            <data-table ref="test" 
                :url="'/standingbook/coop/logBook/logList'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="64" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="值班人员:">
                                    <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
            <Form :label-width="75">
                    <div style="height:600px;overflow:auto;" class="printOrder-datanss">
                        <table class="sqb">
                            <caption>
                                <h2>基层渔业专业合作社值班日志</h2>
                                <p style="margin-bottom:5px;">
                                    <span style="position:relative;right:200px;"> 
                                        值班人：<input v-model="newAddParams.duty" :readonly="readonly" type="text" style="border:0;border-bottom:1px solid gray;width:100px;outline:0;text-align:center;">
                                    </span>
                                    <span style="position:relative;left:200px;">
                                        <input v-model="logDate.year"  :readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">年
                                        <input v-model="logDate.month" :readonly="readonly"  onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">月
                                        <input v-model="logDate.day"  :readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">日
                                    </span>
                                </p>
                            </caption>
                            <tr>
                                <td rowspan="3">天气海况</td>
                                <td colspan="2">气  温(℃)</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.airTemp"  :readonly="readonly" type="text" class="ipt">
                                </td>
                                <td rowspan="3">渔船情况</td>
                                <td colspan="2">作  业</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.workType" :readonly="readonly"  type="text" class="ipt">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">风  力</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.windPower" :readonly="readonly"  type="text" class="ipt">
                                </td>
                                <td colspan="2">在   港</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.toPort"  :readonly="readonly" type="text" class="ipt">
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">海  浪</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.seaWave" :readonly="readonly"  type="text" class="ipt">
                                </td>
                                <td colspan="2">其  它</td>
                                <td colspan="2">
                                    <input v-model="newAddParams.otherCase" :readonly="readonly"  type="text" class="ipt">
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">系统运行</td>
                                <td colspan="2">类别</td>
                                <td>正常</td>
                                <td>不正常</td>
                                <td rowspan="2">事故险情</td>
                                <td colspan="3" rowspan="2" style="height:100%;">
                                    <Input v-model="newAddParams.danger" :readonly="readonly" :maxlength=200 type="textarea" style="min-height: 155px;" :autosize="{minRows: 7}"  class="textarea"></Input>
                                    <!-- <textarea v-model="newAddParams.danger" class="textarea btm"></textarea> -->
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">AIS/北斗</td>
                                <td v-for="(opt,index) in option" > 
                                    <input type="radio" class="checkbox_cl"  :disabled="readonly"  v-model="newAddParams.sata" :value="opt">
                                </td>
                            </tr>
                            <!-- <tr>
                                <td colspan="2">其  它</td>
                                <td v-for="(opt,index) in option" > 
                                    <input type="radio" class="checkbox_cl"  :disabled="readonly"  v-model="newAddParams.otherSate" :value="opt">
                                </td>
                            </tr> -->
                            <tr style="height:170px;">
                                <td>系统报警</td>
                                <td  colspan="4" style="height:100%;">
                                    <Input v-model="newAddParams.alarm" :readonly="readonly" :maxlength=200 type="textarea" style="min-height: 155px;" :autosize="{minRows: 7}"  class="textarea"></Input>
                                    <!-- <textarea v-model="newAddParams.alarm" class="textarea btm"></textarea> -->
                                </td>
                                <td >敏感水域</td>
                                <td  colspan="4" style="height:100%;">
                                    <Input v-model="newAddParams.areas" :readonly="readonly" :maxlength=200 type="textarea" style="min-height: 155px;" :autosize="{minRows: 7}"  class="textarea"></Input>
                                    <!-- <textarea v-model="newAddParams.areas" class="textarea btm"></textarea> -->
                                </td>
                            </tr>
                            <tr >
                                <td>备注</td>
                                <td colspan="9" style="height:100%;">
                                    <Input v-model="newAddParams.comment" :readonly="readonly" :maxlength=200 type="textarea" style="width:97%;min-height: 50px;" :autosize="{minRows: 2}"  class="textarea btm"></Input>
                                    <!-- <textarea v-model="newAddParams.comment" style="width:96%;height:90%;border:0;outline:0;"></textarea> -->
                                </td>
                            </tr>
                        </table>
                    </div>
            </Form>
            <div slot="footer">
                <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
                <Button v-show="btnShow" type="info" @click="saveData()">保存</Button>
                <Button v-show="!btnShow" type="info" @click="modalStatus.newAddModal = false">关闭</Button>
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
        <MultiUpload :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow"  :dataId="sID" moduleId="worknote"></MultiUpload>
    </div>     
</template>
<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue';
import newUpload from '@/views/components/Upload/newUpload.vue';
import {isNull,isEmpty } from '@/libs/common.js' 
import userObj from '@/store/module/userId.js';
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
export default {
    name: 'worknote',
    components: {
        newUpload,
        MyUpload,
        MultiUpload
    },
    data () {
        return {
            name_Data: '',
            option: ['正常','不正常'],
            ifEdit: false,
            format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
            iSmanager:false,
            modalStatus:{
                newAddModal:false,
            },
            btnShow:true,
            readonly:false,
            maskclosable:false,
            title:"",
            newAddParams:{
                airTemp:"",//气温
                windPower:"",//风力
                seaWave:"",//海浪
                workType:"",//作业
                toPort:"",//归港
                otherCase:"",//其他情况

                ais:"",//AIS运行系统
                beidou:"",//北斗
                otherSate:"",//其他卫星

                danger:"",//事故险情
                alarm:"",//系统报警
                areas:"",//敏感水域
                comment:"",//备注

                duty:"",//值班人员
                logDate:"",//值班登记时间
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
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title: '值班人员',
                    align: 'center',
                    key: 'duty'
                },
                {
                    title: '气温',
                    align: 'center',
                    key: 'airTemp'
                },
                {
                    title: '风力',
                    align: 'center',
                    key: 'windPower'
                },
                {
                    title: '海浪',
                    align: 'center',
                    key: 'seaWave'
                },
                {
                    title: '值班日期',
                    align: 'center',
                    maxWidth:200,
                    key: 'logDate',
                    render:(h,params)=>{
                        var dt=new Date(params.row.logDate);
                        var year=dt.getFullYear();
                        var month=dt.getMonth()+1;
                        var day=dt.getDate();
                        if(month<10){
                            month="0"+month;
                        }
                        if(day<10){
                            day="0"+day;
                        }
                        return h("div",year+"-"+month+"-"+day); 
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
                },
            },
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
            this.readonly=false;
            this.btnShow=true;
            var dt=new Date();
            this.logDate={
                year:dt.getFullYear(),
                month:dt.getMonth()+1,
                day:dt.getDate(),
            };
            this.modalStatus.newAddModal=true;
        },
        dbhandleEdit(msg){
            this.title="查看";
            this.watchMsg(msg);
        },
        watchMsg(row){
            var _self=this;
            if(this.title=="新增" || this.title=="编辑"){
                this.readonly=false;
                this.btnShow=true;
            }else if(this.title=="查看"){
                this.readonly=true;
                this.btnShow=false;
            }
            _self.$http.get("/standingbook/coop/logBook/"+row.id)
            .then(res=>{
                if(res.success){
                    _self.newAddParams=res.data;
                    _self.modalStatus.newAddModal=true;
                    let dt=new Date(res.data.logDate);
                    _self.logDate={
                        year:dt.getFullYear(),
                        month:dt.getMonth()+1,
                        day:dt.getDate(),
                    };
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
                content:"您确定要删除此条值班日志吗？",
                onOk:function(){
                    _self.$http.delete("/standingbook/coop/logBook/"+id)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("删除成功");
                            _self.initSearch();
                        }else{
                            _self.$Message.info("删除失败");
                        }
                    });
                }
            });
        },
        saveData(){
            var _self=this;
            if(_self.newAddParams.duty=="" || _self.newAddParams.duty==undefined||_self.newAddParams.duty.trim()==""){
                this.$Message.error("请填写值班人员");
                return ;
            }
            _self.newAddParams.logDate=_self.logDate.year+"-"+_self.logDate.month+"-"+_self.logDate.day+" "+"00:00:00";
            if(isNull(_self.newAddParams.id) ||_self.newAddParams.id==undefined ){
                _self.newAddParams.creatorName=userObj.name;
                _self.$http.post("/standingbook/coop/logBook/save",_self.newAddParams)
                .then(res=>{
                    if(res.success){
                        _self.modalStatus.newAddModal=false;
                        _self.$Message.info("新增成功");
                        _self.initSearch();
                    }else{
                        _self.$Message.error("新增失败");
                    }
                });
            }else{
                _self.$http.patch("/standingbook/coop/logBook/"+_self.newAddParams.id,_self.newAddParams)
                .then(res=>{
                    if(res.success){
                        _self.modalStatus.newAddModal=false;
                        _self.$Message.info("编辑成功");
                        _self.initSearch();
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
.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}
table.sqb{
    width:210mm;
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.sqb td{
    border:1px solid black;
    width:102px;
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
    width:90%;
    height:100%;
    border:0;
    outline:none;
    margin-top:10px;
    margin-bottom:1px;
    padding-bottom:1px ;
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

table.sqb input.captions{
    width:30px;
    border:0;
    outline:0;
    text-align:center;
}
table.sqb .hidn{
    height:1px;
    visibility:hidden;
}
</style>           
        
        