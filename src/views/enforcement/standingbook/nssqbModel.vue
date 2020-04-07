<!--年审申请表-->
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
    <div style="height:600px;overflow:auto;"class="printOrder-datanss">
            <table width="100%" class="sqb">
                <caption><h2>海洋渔业捕捞许可年审申请表</h2></caption>
                <caption>
                    <span style="position:relative;right:200px;">
                        浙苍渔：<input type="text" class="shipName" :placeholder="content.shipName" v-model="content.shipName">
                    </span>
                    <span style="position:relative;left:193px;">
                        联系电话：<input type="text" class="shipName" :placeholder="content.phone" v-model="content.phone">
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
                    <td><input type="text" :placeholder="content.cz" v-model="content.cz" name=""></td>
                    <td><input type="text" :placeholder="content.czzh" v-model="content.czzh" name=""></td>
                    <td><input type="text" :placeholder="content.czsxz" v-model="content.czsxz" name=""></td>
                    <td><input type="text" :placeholder="content.czsfz" v-model="content.czsfz" name=""></td>
                    <td><input type="text" :placeholder="content.czbz" v-model="content.czbz" name=""></td>
                </tr>
                <tr>
                    <td>大副</td>
                    <td><input type="text" :placeholder="content.df" v-model="content.df" name=""></td>
                    <td><input type="text" :placeholder="content.dfzh" v-model="content.dfzh" name=""></td>
                    <td><input type="text" :placeholder="content.dfsxz" v-model="content.dfsxz" name=""></td>
                    <td><input type="text" :placeholder="content.dfsfz" v-model="content.dfsfz" name=""></td>
                    <td><input type="text" :placeholder="content.dfbz" v-model="content.dfbz" name=""></td>
                </tr>
                <tr>
                    <td>二副</td>
                    <td><input type="text" :placeholder="content.ef" v-model="content.ef" name=""></td>
                    <td><input type="text" :placeholder="content.efzh" v-model="content.efzh" name=""></td>
                    <td><input type="text" :placeholder="content.efsxz" v-model="content.efsxz" name=""></td>
                    <td><input type="text" :placeholder="content.efsfz" v-model="content.efsfz" name=""></td>
                    <td><input type="text" :placeholder="content.efbz" v-model="content.efbz" name=""></td>
                </tr>
                <tr>
                    <td>轮机长</td>
                    <td><input type="text" :placeholder="content.ljz" v-model="content.ljz" name=""></td>
                    <td><input type="text" :placeholder="content.ljzzh" v-model="content.ljzzh" name=""></td>
                    <td><input type="text" :placeholder="content.ljzsxz" v-model="content.ljzsxz" name=""></td>
                    <td><input type="text" :placeholder="content.ljzsfz" v-model="content.ljzsfz" name=""></td>
                    <td><input type="text" :placeholder="content.ljzbz" v-model="content.ljzbz" name=""></td>
                </tr>
                <tr>
                    <td>大管轮</td>
                    <td><input type="text"  :placeholder="content.dgl" v-model="content.dgl"name=""></td>
                    <td><input type="text"  :placeholder="content.dglzh" v-model="content.dglzh"name=""></td>
                    <td><input type="text"  :placeholder="content.dglsxz" v-model="content.dglsxz"name=""></td>
                    <td><input type="text"  :placeholder="content.dglsfz" v-model="content.dglsfz"name=""></td>
                    <td><input type="text"  :placeholder="content.dglbz" v-model="content.dglbz"name=""></td>
                </tr>
                <tr>
                    <td>二管轮</td>
                    <td><input type="text" :placeholder="content.egl" v-model="content.egl" name=""></td>
                    <td><input type="text" :placeholder="content.eglzh" v-model="content.eglzh" name=""></td>
                    <td><input type="text" :placeholder="content.eglsxz" v-model="content.eglsxz" name=""></td>
                    <td><input type="text" :placeholder="content.eglsfz" v-model="content.eglsfz" name=""></td>
                    <td><input type="text" :placeholder="content.eglbz" v-model="content.eglbz" name=""></td>
                </tr>
                <tr>
                    <td>话务员</td>
                    <td><input type="text" :placeholder="content.hwy" v-model="content.hwy" name=""></td>
                    <td><input type="text" :placeholder="content.hwyzh" v-model="content.hwyzh" name=""></td>
                    <td><input type="text" :placeholder="content.hwysxz" v-model="content.hwysxz" name=""></td>
                    <td><input type="text" :placeholder="content.hwysfz" v-model="content.hwysfz" name=""></td>
                    <td><input type="text" :placeholder="content.hwybz" v-model="content.hwybz" name=""></td>
                </tr>
                <tr>
                    <td>船员</td>
                    <td><input type="text" :placeholder="content.cy1" v-model="content.cy1" name=""></td>
                    <td><input type="text" :placeholder="content.cyzh1" v-model="content.cyzh1" name=""></td>
                    <td><input type="text" :placeholder="content.cysxz1" v-model="content.cysxz1" name=""></td>
                    <td><input type="text" :placeholder="content.cysfz1" v-model="content.cysfz1" name=""></td>
                    <td><input type="text" :placeholder="content.cybz1" v-model="content.cybz1" name=""></td>
                </tr>
                <tr>
                    <td>船员</td>
                    <td><input type="text" :placeholder="content.cy2" v-model="content.cy2" name=""></td>
                    <td><input type="text" :placeholder="content.cyzh2" v-model="content.cyzh2" name=""></td>
                    <td><input type="text" :placeholder="content.cysxz2" v-model="content.cysxz2" name=""></td>
                    <td><input type="text" :placeholder="content.cysfz2" v-model="content.cysfz2" name=""></td>
                    <td><input type="text" :placeholder="content.cybz2" v-model="content.cybz2" name=""></td>
                </tr>
                <tr>
                    <td>船员</td>
                    <td><input type="text" :placeholder="content.cy3" v-model="content.cy3" name=""></td>
                    <td><input type="text" :placeholder="content.cyzh3" v-model="content.cyzh3" name=""></td>
                    <td><input type="text" :placeholder="content.cysxz3" v-model="content.cysxz3" name=""></td>
                    <td><input type="text" :placeholder="content.cysfz3" v-model="content.cysfz3" name=""></td>
                    <td><input type="text" :placeholder="content.cybz3" v-model="content.cybz3" name=""></td>
                </tr>
                <tr>
                    <td>作业类型</td>
                    <td colspan="2"><input type="text" :placeholder="content.jobType" v-model="content.jobType" name=""></td>
                    <td>船员总人数</td>
                    <td colspan="2"><input type="text" :placeholder="content.countNumber" v-model="content.countNumber" name=""></td>
                </tr>
                <tr>
                    <td>检验证书证号</td>
                    <td colspan="2"><input type="text" :placeholder="content.certificateNumber" v-model="content.certificateNumber" name=""></td>
                    <td>有效期</td>
                    <td colspan="2"><input type="text" :placeholder="content.cjzs" v-model="content.cjzs" name=""></td>
                </tr>
                <tr>
                    <td>登记证书证号</td>
                    <td colspan="2"><input type="text" :placeholder="content.registrationNumber" v-model="content.registrationNumber" name=""></td>
                    <td>有效期</td>
                    <td colspan="2"><input type="text" :placeholder="content.djzs" v-model="content.djzs" name=""></td>
                </tr>
                <tr>
                    <td>责任书（承诺书）签订情况</td>
                    <td><input type="text" :placeholder="content.productionSafety" v-model="content.productionSafety" name=""></td>
                    <td>渔船进出港签证情况</td>
                    <td><input type="text" :placeholder="content.responsibilitySafety" v-model="content.responsibilitySafety" name=""></td>
                    <td>捕捞日志（生产日记）</td>
                    <td><input type="text" :placeholder="content.fishingLog" v-model="content.fishingLog" name=""></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <span class="s1">所属渔业合作社意见：</span>
                        <p><textarea name="" id="" cols="38" rows="3" :placeholder="content.cooperative" v-model="content.cooperative"></textarea></p>
                        <div>
                            <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="content.headCooperative" v-model="content.headCooperative"></span><span class="s3">（盖章）</span>
                        </div>
                        <span class="s4"><input type="text" :placeholder="datatimehf.year" v-model="datatimehf.year" class="bb2"> 年<input type="text" :placeholder="datatimehf.month" v-model="datatimehf.month" class="bb2">月<input type="text" :placeholder="datatimehf.day" v-model="datatimehf.day" class="bb2">日</span>
                    </td>
                    <td colspan="3">
                        <span class="s1 s9">基层站意见：</span>
                        <p><textarea name="" id="" cols="38" rows="3" :placeholder="content.grassrootsComments" v-model="content.grassrootsComments"></textarea></p>
                        <div>
                            <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="content.grassrootsCooperative" v-model="content.grassrootsCooperative"></span><span class="s3">（盖章）</span>
                        </div>
                        <span class="s4"><input type="text" :placeholder="datatimejf.year" v-model="datatimejf.year" class="bb2"> 年<input type="text" :placeholder="datatimejf.month" v-model="datatimejf.month" class="bb2">月<input type="text" :placeholder="datatimejf.day" v-model="datatimejf.day" class="bb2">日</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <span class="s1">信息中心意见：</span>
                        <p><textarea name="" id="" cols="38" rows="3" :placeholder="content.informationCenter" v-model="content.informationCenter"></textarea></p>
                        <div>
                            <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="content.informationCooperative" v-model="content.informationCooperative"></span><span class="s3">（盖章）</span>
                        </div>
                        <span class="s4"><input type="text" :placeholder="datatimemf.year" v-model="datatimemf.year" class="bb2"> 年<input type="text" :placeholder="datatimemf.month" v-model="datatimemf.month" class="bb2">月<input type="text" :placeholder="datatimemf.day" v-model="datatimemf.day" class="bb2">日</span>
                    </td>
                    <td colspan="3">
                        <span class="s1">县局意见：</span>
                        <p><textarea name="" id="" cols="38" rows="3" :placeholder="content.countyBureau" v-model="content.countyBureau"></textarea></p>
                        <div>
                            <span class="s2">经办人签字：<input type="text" class="nn" :placeholder="content.countyBureauCooperative" v-model="content.countyBureauCooperative"></span><span class="s3">（盖章）</span>
                        </div>
                        <span class="s4"><input type="text" :placeholder="datatimexf.year" v-model="datatimexf.year" class="bb2"> 年<input type="text" :placeholder="datatimexf.month" v-model="datatimexf.month" class="bb2">月<input type="text" :placeholder="datatimexf.day" v-model="datatimexf.day" class="bb2">日</span>
                    </td>
                </tr>
            </table>
    </div>
    <div slot="footer">
        <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'" @click="okSQB">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okSQB">保存</Button>
        <Button type="info" size="large" v-show="tx=='dayin'" @click="dayin">打印</Button>
    </div>
</Modal>
</template>
<script>
import {isNull } from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
export default {
    name:"nssqbModel",
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
    data(){
        return {
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
        }
    },
    methods:{
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
            var newstr = document.getElementsByClassName('printOrder-datanss')[0].innerHTML
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
        okSQB(){
            var _self=this;
            if(isNull(_self.modalSQB.parameteFileId)){
                _self.modalSQB.id=_self.sID;
                _self.content.cooperativeTime=_self.datatimehf.year+"-"+_self.datatimehf.month+"-"+_self.datatimehf.day+" "+_self.datatimehf.minutes;
                _self.content.grassrootsTime=_self.datatimejf.year+"-"+_self.datatimejf.month+"-"+_self.datatimejf.day+" "+_self.datatimejf.minutes;
                _self.content.informationCenterTime=_self.datatimemf.year+"-"+_self.datatimemf.month+"-"+_self.datatimemf.day+" "+_self.datatimemf.minutes;
                _self.content.countyBureauTime=_self.datatimexf.year+"-"+_self.datatimexf.month+"-"+_self.datatimexf.day+" "+_self.datatimexf.minutes;
                _self.modalSQB.content=JSON.stringify(_self.content);
                _self.modalSQB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalSQB)
                .then(res => {
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");//不用传值
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }else{
                _self.content.cooperativeTime=_self.datatimehf.year+"-"+_self.datatimehf.month+"-"+_self.datatimehf.day+" "+_self.datatimehf.minutes;
                _self.content.grassrootsTime=_self.datatimejf.year+"-"+_self.datatimejf.month+"-"+_self.datatimejf.day+" "+_self.datatimejf.minutes;
                _self.content.informationCenterTime=_self.datatimemf.year+"-"+_self.datatimemf.month+"-"+_self.datatimemf.day+" "+_self.datatimemf.minutes;
                _self.content.countyBureauTime=_self.datatimexf.year+"-"+_self.datatimexf.month+"-"+_self.datatimexf.day+" "+_self.datatimexf.minutes;
                _self.modalSQB.content=JSON.stringify(_self.content);
                _self.modalSQB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalSQB)
                .then(res => {
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
            _self.$http.get("/standingbook/word/table/"+id)
            .then(res=>{
                if(res.success){
                    //console.log("信息下载成功");
                    _self.modalSQB=res.data;
                    _self.content=JSON.parse(res.data.content);
                    _self.visible=true;
                    _self.datatimehf=_self.checkt(_self.content.cooperativeTime,_self.datatimehf);
                    _self.datatimejf=_self.checkt(_self.content.grassrootsTime,_self.datatimejf);
                    _self.datatimemf=_self.checkt(_self.content.informationCenterTime,_self.datatimemf);
                    _self.datatimexf=_self.checkt(_self.content.countyBureauTime,_self.datatimexf);
                }
            })
            .catch(err=>{
                console.log(err);
            });
        }else if(_self.tx=='add'){
            //生成字表id
            _self.$http.get("/$admin/attachs/uuid")
            .then(res=>{
                console.log(res,"型1");
                _self.sID=res.data;
            })
            .catch(err=>{
                console.log(err);
            });

            _self.datatimehf.year="";
            _self.datatimehf.month="";
            _self.datatimehf.day="";

            _self.datatimejf.year="";
            _self.datatimejf.month="";
            _self.datatimejf.day="";

            _self.datatimemf.year="";
            _self.datatimemf.month="";
            _self.datatimemf.day="";

            _self.datatimexf.year="";
            _self.datatimexf.month="";
            _self.datatimexf.day="";
            _self.content={};
            _self.content.shipName=_self.shipName;
            _self.content.phone=_self.phone;
            _self.modalSQB.id="";
        }
    },
},
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else    
                this.modalSQB.parameteFileId=null;
        }
    },
    mounted(){
        
    },
}
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