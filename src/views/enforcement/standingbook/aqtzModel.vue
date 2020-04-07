<!--安全台账-->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>
<template>
<Modal
    v-model="visible" 
    :closable="closable"
    :maskClosable="maskClosable"
    :title="title"
    width="45%"
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
    @on-visible-change="visibleChange"
>
    <div style="height:600px;overflow:auto;" class="printOrder-datatz">
        <table width="100%" class="tz">
            <caption><h2>渔船安全台账</h2></caption>
            <tr>
                <td colspan="2">渔船名：<input type="text" :placeholder="content.shipName" v-model="content.shipName"></td>
                <td colspan="2">船长：<input type="text" :placeholder="content.ownerName" v-model="content.ownerName" name=""></td>
                <td colspan="2">双控指标：<input type="text" :placeholder="content.doubleControlIndicators" v-model="content.doubleControlIndicators" name=""></td>
                <td colspan="2">作业方式：<input type="text" :placeholder="content.jobType" v-model="content.jobType" name=""></td>
            </tr>
            <tr class="ig" v-for="(item,index) in uploadList" :key="index">
                <td colspan="2"></td>
                <td colspan="4" style="position:relative;" class="tdtd">
                    <!-- <span style="opacity:0;font-size:20px;color:lightseagreen;border-radius:3px;position:absolute;background:rgba(67, 104, 141,0.9);z-index:1000;left:7%;width:88%;height:100%;text-align:center;line-height:200px;">点击图片删除当前图片并进行更新</span> -->
                    <MyUpload multiple type="drag" 
                        action="/$admin/attachs"
                        :show-upload-list="false"
                        :data="uploadData"  
                        name="securityparameter"
                        :before-upload="beforeUpload"  
                        :on-success="uploadSuccess">
                        <img :src="$util.basePath+'/attachment'+item.url" @click="deleteFile(index,item)" title="点击图片进行删除更新" alt=""/>
                    </MyUpload>
                </td>
                <td colspan="2"></td>
            </tr>
            <tr class="ig" v-for="(item,index) in (3-uploadList.length)"  :key="index">
                    <td colspan="2"></td>
                    <td colspan="4">  
                        <MyUpload multiple type="drag" 
                            action="/$admin/attachs"
                            :show-upload-list="false"
                            :data="uploadData"  
                            name="securityparameter"
                            :before-upload="beforeUpload"  
                            :on-success="uploadSuccess">
                            <div style="padding: 20px 0" v-show="tx!=='dayin'">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或拖动上传图片</p>
                            </div>
                        </MyUpload>
                    </td>
                    <td colspan="2"></td>
                </tr>
            <tr>
                <td colspan="5">
                    <p><span class="tz4">实船配备一下情况：</span> </p>
                    <textarea :placeholder="content.actualEquipmentFollows" v-model="content.actualEquipmentFollows" cols="30" rows="4"></textarea>
                    <p><span class="tz5">台账管理人员签字：<input type="text" :placeholder="content.tzglqz" v-model="content.tzglqz" class="tzq"></span></p>
                </td>
                <td colspan="3">
                    <p class="ppd"><span>合作社负责人签字：<input type="text" :placeholder="content.cooperative" v-model="content.cooperative" class="tzq"></span></p>
                    <p class="ppd ppd2 tz7"><span>（盖章）</span></p>
                    <p class="ppd ppd2"><span class="tz8">时间：<input type="text" :placeholder="datatime.year" v-model="datatime.year" class="tzt"> 年<input type="text" v-model="datatime.month" :placeholder="datatime.month" class="tzt">月<input type="text" :placeholder="datatime.day" v-model="datatime.day" class="tzt">日</span></p>
                </td>
            </tr>
        </table>
    </div>
    <div slot="footer">
        <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'" @click="okTZ">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okTZ">保存</Button>
        <Button type="info" size="large" v-show="tx=='dayin'" @click="dayin">打印</Button>
    </div>
</Modal>
</template>
<script>
import {isNull,isEmpty} from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
    name:"aqtzModel",
    components:{
        MyUpload,
    },
    props:{
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
        parameteFileId:{
            type: [Number, String],
        },
        sID:{
            type: [Number, String],
        },
        tx:{
            type: [Object, String],
        },
        shipName:{
            type: String,
        },
        ownerName:{
            type: String,
        },
        phone:{
            type: [Number, String],
        },
    },
    data(){
        return {
            datatime:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            uploadList:[],
            visible:this.value,
            modalTZ:{
                //id:"",
                parameteFileId:"",//台账案卷ID，外
                type:"securityparameter",
                name:"安全台账",
                content:{},
            },
            content:{
                shipName:"",
                ownerName:"",
                doubleControlIndicators:"",
                jobType:"",
                actualEquipmentFollows:"",
                tzglqz:"",
                cooperative:"",
                cooperativeTime:"",//合作社负责人签字时间
                cooperativeStamp:"",
            }
        }
    },
    computed:{
        uploadData(){//上传时附带的额外参数 :data
            return {
                "dataId":this.sID,
                "moduleId":"standingbook",
                "name":"securityparameter"
            }
        },
    },
    methods:{
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
                if(result.success)
                    _self.uploadList=result.data;
            });
        },
        deleteFile:function(index,item){
            var _self=this;
            _self.$http.delete("/$admin/attachs/"+item.id)
                .then(function(result){
                    if(result.success){
                        _self.uploadList.splice(index, 1);
                    }
                    //console.log(result,"圣诞节佛山店");
                    _self.$Message.info(result.msg);
            });
        },
        getImages(v){
            var _self=this;
            _self.$http.get("/$admin/attachs?dataId="+v+"&moduleId=standingbook")
            .then(res=>{
                if(res.success){
                    console.log(res,"zong");
                    _self.uploadList=res.data;
                }
            })
            .catch(err=>{
                console.log(err);
            });
        },

        ok() {
        if (!this.loading)
            this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        dayin(){
            console.log(window.location,"好的佛啊");
            var newstr = document.getElementsByClassName('printOrder-datatz')[0].innerHTML
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload()
        },
        cancel(){
            this.visible=false;
            this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        //新增
        okTZ(){
            var _self=this;
            if(isNull(_self.modalTZ.parameteFileId)){
                _self.modalTZ.id=_self.sID;
                _self.content.cooperativeTime=_self.datatime.year+"-"+_self.datatime.month+"-"+_self.datatime.day+" "+_self.datatime.minutes;
                _self.modalTZ.content=JSON.stringify(_self.content);
                _self.modalTZ.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalTZ)
                .then(res => {
                    //console.log(res,"你好世界");
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }else{
                _self.content.cooperativeTime=_self.datatime.year+"-"+_self.datatime.month+"-"+_self.datatime.day+" "+_self.datatime.minutes;
                _self.modalTZ.content=JSON.stringify(_self.content);
                _self.modalTZ.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalTZ)
                .then(res => {
                    console.log(res,"你好世界");
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        checkt(s,d){
            var arr=s.split(" 00:00:00")[0];
            console.log(arr,"djdj");
            arr=arr.split("-");
            if(arr.length<=2){
                d.year="";
                d.month="";
                d.day="";
            }else{
                d.year=arr[0];
                d.month=arr[1];
                d.day=arr[2];
            }
            return d;
        },
        search(){
            var _self=this;
            if(_self.tx=="update"||_self.tx=="dayin"){
                var id=_self.sID;
                console.log(_self.sID,"行");
                _self.$http.get("/standingbook/word/table/"+id)
                .then(res=>{
                    if(res.success){
                        //console.log("信息下载成功");
                        _self.modalTZ=res.data;//==》modalCB里面的parameteFileId就有值了
                        _self.content=JSON.parse(res.data.content);
                        _self.visible=true;
                        console.log(_self.modalTZ,"你好");
                        _self.getImages(_self.modalTZ.id);
                        _self.datatime=_self.checkt(_self.content.cooperativeTime,_self.datatime);
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            }else if(_self.tx=="add"){
                //生成字表id
                _self.$http.get("/$admin/attachs/uuid")
                .then(res=>{
                    console.log(res,"型");
                    _self.sID=res.data;
                })
                .catch(err=>{
                    console.log(err);
                });        
                _self.datatime.year="";
                _self.datatime.month="";
                _self.datatime.day="";
                _self.uploadList=[];
                _self.content={};
                _self.content.shipName=_self.shipName;
                _self.content.ownerName=_self.ownerName;
                _self.modalTZ.id="";
            }
        },
    },
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else 
                this.modalTZ.parameteFileId=null;
        }
    },
}
</script>
<style scoped>
table.tz{
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.tz td{
    border:1px solid black;
    width:140px;
    height:32px;
    text-align:left;
    padding-left:1%;
}
table.tz td.tdtd span{
    text-align:center;
    transition:all 0.5s linear;
}
/* table.tz td.tdtd:hover span{
    opacity:0.8;
} */
table.tz td img{
    width:90%;
    min-height:200px;
    max-height:250px;
}
table.tz tr.ig{
    height:220px;
}
table.tz input{
    border:none;
    outline:none;
    text-align:center;
    width:55%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.tz input.tzt{
    width:17%;
}
table.tz input.tzq{
    width:20%;
}
table.tz td>p>span.tz4{
    display:inline-block;
    margin:2% 2%;
}
table.tz td>p>span.tz5{
    display:inline-block;
    margin-left:40%;
    margin-bottom:5%;
}
table.tz td>p>span.tz8{
    float:left;
    margin-left:40%;
}
table.tz td>p.ppd{
    position:relative;
    top:-145%;
}
table.tz td>p.ppd.ppd2.tz7{
    text-align:center;
    position:relative;
    top:35%;
}
table.tz td>p.ppd.ppd2{
    position:relative;
    top:105%;
}
table.tz textarea{
    width:80%;
    border:0;
    outline:0;
    position:relative;
    left:10%;
}
</style>