<!--渔船安全登船检查表2-->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>
<template>
<Modal 
    v-model="visible" 
    :closable="closable"
    :maskClosable="maskClosable"
    :title="title"
    width="43%"
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
    <div style="height:600px;overflow:auto;"class="printOrder-data2">
        <table width="100%" class="ycaqdljcb">
            <caption><h2>渔船安全登船检查表2</h2></caption>
            <tr>
                <td class="ss2">船名号</td>
                <td class="ss2"><input type="text" :placeholder="content.shipName" v-model="content.shipName" name=""></td>
                <td class="ss2">持证人</td>
                <td class="ss2"><input type="text" :placeholder="content.ownerName" v-model="content.ownerName" name=""></td>
                <td class="ss2">检查时间</td>
                <td class="ss2"><input type="text" :placeholder="content.jcrysj" v-model="content.jcrysj" name=""></td>
            </tr>
            <tr>
                <td class="ss2">住址</td>
                <td colspan="3" class="ss2"><input type="text" :placeholder="content.address" v-model="content.address" name=""></td>
                <td class="ss2">联系电话</td>
                <td class="ss2"><input type="text" :placeholder="content.phone" v-model="content.phone" name=""></td>
            </tr>
            <tr class="jc">
                <td colspan="6">
                    <p>船舶核实情况：</p>
                    <textarea :placeholder="content.verificationShip" v-model="content.verificationShip" name="" id="" cols="30" rows="3"></textarea> 
                </td>
            </tr>
            <tr class="jc">
                <td colspan="6">
                    <p>登船检查以下情况：</p>
                    <textarea :placeholder="content.boardCheckFollowing" v-model="content.boardCheckFollowing" name="" id="" cols="30" rows="3"></textarea> 
                </td>
            </tr>
            <tr class="jc">
                <td colspan="6">
                    <p>处理情况：</p>
                    <textarea :placeholder="content.processingConditions" v-model="content.processingConditions" name="" id="" cols="30" rows="3">
                        基本正常
                    </textarea>
                </td>
            </tr>
            <tr class="jcjc">
                <td colspan="3" class="ss2 sdfd" v-for="(item,index) in uploadList">
                    <MyUpload multiple type="drag" 
                        action="/$admin/attachs"
                        :show-upload-list="false"
                        :data="uploadData" 
                        name="safetyboarding"
                        :before-upload="beforeUpload"  
                        :on-success="uploadSuccess"  >
                        <img :src="$util.basePath+'/attachment'+item.url" @click="deleteFile(index,item)" title="点击图片进行删除更新" alt=""/>
                    </MyUpload>                      
                </td>
                <td colspan="3" class="ss2" v-for="(item,index) in (2-uploadList.length)" >
                    <MyUpload multiple type="drag" 
                        action="/$admin/attachs"
                        :show-upload-list="false"
                        :data="uploadData"  
                        name="safetyboarding"
                        :before-upload="beforeUpload"  
                        :on-success="uploadSuccess">
                        <div style="padding: 20px 0" v-show="tx!=='dayin'">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或拖动上传图片</p>
                        </div>
                    </MyUpload>
                </td>
            </tr>
            <tr class="jc">
                <td colspan="3">
                    <p>检查人员：<input type="text" :placeholder="content.inspectors" v-model="content.inspectors" class="j2"></p>
                    <span class="ss5"><span>时间：</span><input type="text" :placeholder="datatimeck.year" v-model="datatimeck.year" class="j4"> <span>年</span><input type="text" :placeholder="datatimeck.month" v-model="datatimeck.month" class="j4"><span>月</span><input type="text" :placeholder="datatimeck.day" v-model="datatimeck.day" class="j4"><span>日</span></span>   
                </td>
                <td colspan="3">
                    <p class="gg2">合作社负责人签字：<input type="text" :placeholder="content.cooperative" v-model="content.cooperative" class="j2"></p>
                    <p class="ss4" style="margin-top:50px;">（盖章）</p>
                    <span class="ss5 ss6"><span>时间：</span><input type="text" :placeholder="datatimect.year" v-model="datatimect.year" class="j4"> <span>年</span><input type="text" :placeholder="datatimect.month" v-model="datatimect.month" class="j4"><span>月</span><input type="text" :placeholder="datatimect.day" v-model="datatimect.day" class="j4"><span>日</span></span>   
                </td>
            </tr>
        </table>                                          
    </div>
    <div slot="footer">
        <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'" @click="okJCB">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okJCB">保存</Button>
        <Button type="info" size="large" v-show="tx=='dayin'" @click="dayin">打印</Button>
    </div>
</Modal>
</template>
<script>
import {isNull,isEmpty} from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
    name:"ycaqdcjcModel",
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
    components:{
        MyUpload,
    },
    data(){
        return {
            datatimeck:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimect:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            uploadList:[],
            visible:this.value,
            modalJCB:{
                id:"",
                parameteFileId:"",
                type:"safetyboarding",
                name:"渔船安全登船检查表2",
                content:{},
            },
            content:{
                shipName:"",
                ownerName:"",
                checkTime:"",
                address:"",
                phone:"",
                verificationShip:"",
                boardCheckFollowing:"",
                processingConditions:"",
                inspectors:"",
                cooperative:"",
                jcrysj:"",//检查人员签字时间
                cooperativeTime:"",//合作社负责人签字时间
                cooperativeStamp:"",
            },
        }
    },
    computed:{
        uploadData(){//上传时附带的额外参数 :data
            return {
                "dataId":this.sID,
                "moduleId":"standingbook",
                "name":"safetyboarding"
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
            var newstr = document.getElementsByClassName('printOrder-data2')[0].innerHTML
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
        okJCB(){
            var _self=this;
            if(isNull(_self.modalJCB.parameteFileId)){
                _self.modalJCB.id=_self.sID;
                _self.content.checkTime=_self.datatimeck.year+"-"+_self.datatimeck.month+"-"+_self.datatimeck.day+" "+_self.datatimeck.minutes;            
                _self.content.cooperativeTime=_self.datatimect.year+"-"+_self.datatimect.month+"-"+_self.datatimect.day+" "+_self.datatimect.minutes;
                //console.log("你好",_self.content.checkTime,_self.content.cooperativeTime);
                _self.modalJCB.content=JSON.stringify(_self.content);
                _self.modalJCB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalJCB)
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
                _self.content.checkTime=_self.datatimeck.year+"-"+_self.datatimeck.month+"-"+_self.datatimeck.day+" "+_self.datatimeck.minutes;
                _self.content.cooperativeTime=_self.datatimect.year+"-"+_self.datatimect.month+"-"+_self.datatimect.day+" "+_self.datatimect.minutes;
                //console.log("你好",_self.content.checkTime,_self.content.cooperativeTime);
                _self.modalJCB.content=JSON.stringify(_self.content);
                _self.modalJCB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalJCB)
                .then(res => {
                    //console.log(res,"你好世界");
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
                //console.log(_self.sID,"子id222");
                _self.$http.get("/standingbook/word/table/"+id)
                .then(res=>{
                    if(res.success){
                        //console.log("信息下载成功");
                        _self.modalJCB=res.data;
                        _self.content=JSON.parse(res.data.content);
                        _self.visible=true;
                        _self.getImages(_self.modalJCB.id);
                        _self.datatimeck=_self.checkt(_self.content.checkTime,_self.datatimeck);
                        _self.datatimect=_self.checkt(_self.content.cooperativeTime,_self.datatimect);
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

                _self.datatimeck.year="";
                _self.datatimeck.month="";
                _self.datatimeck.day="";
                _self.datatimect.year="";
                _self.datatimect.month="";
                _self.datatimect.day="";
                _self.datack="";
                _self.uploadList=[];
                _self.content={};
                _self.content.shipName=_self.shipName;
                _self.content.ownerName=_self.ownerName;
                _self.content.phone=_self.phone;
                _self.modalJCB.id="";
            }
        },
    },
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else    
                this.modalJCB.parameteFileId=null;
        }
    }
}
</script>
<style scoped>
table.ycaqdljcb{
     border-collapse: collapse;
    margin-bottom: 10px;
}
table.ycaqdljcb td{
    border:1px solid black;
    width:60px;
    height:32px;
    text-align:left;
}
table.ycaqdljcb td.sdfd{
    text-align:center;
}
table.ycaqdljcb td img{
    width:90%;
    min-height:200px;
    max-height:250px;
}
table.ycaqdljcb tr.jc{
    height:100px;
}
table.ycaqdljcb p.gg2{
    position:relative;
    left:0px;
    top:30px;
}
table.ycaqdljcb tr.jcjc{
    height:150px;
}
table.ycaqdljcb textarea{
    width:90%;
    margin-left:5%;
    border:0;
    outline:0;
}
table.ycaqdljcb input{
    border:none;
    outline:none;
    width:90%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.ycaqdljcb input.j2{
    width:20%;
}
table.ycaqdljcb input.j4{
    width:9%;
}
table.ycaqdljcb td.ss2{
    text-align:center;
}
table.ycaqdljcb td>p.ss4{
    text-align:center;
}
table.ycaqdljcb td>span.ss5{
    float:right;
    margin-top:50px;
    margin-right:50px;
}
table.ycaqdljcb td>span.ss5>span,table.ycaqdljcb td>span.ss5>input{
    text-align:center;
    position:relative;
    left:50%;
}
table.ycaqdljcb td>span.ss5.ss6{
    position:relative;
    bottom:34px;
}
#detailIF p.pp{
    text-align:center;
}
#detailIF p{
    font-size:18px;
    margin:3px 0;
}
</style>