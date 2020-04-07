<!--一船一档目录-->
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
    <div style="height:600px;overflow:auto;"class="printOrder-dataml" v-if="tx!=='dayin'">
        <table width="100%" class="yy">
            <caption><h2>渔业专业合作社一船一档目录</h2></caption>
            <tr>
                <td colspan="9" class="hh">一、渔船安全生产台账</td>
            </tr>
            <tr>
                <td colspan>序号</td>
                <td colspan="4">台账内容</td>
                <td>缺少</td>
                <td>齐全</td>
                <td colspan="2">备注</td>
            </tr>
            <tr>
                <td>1</td>
                <td colspan="4">渔船安全台账</td>
                <td><input type="radio" value="0" v-model="content.securityParameter" name=""></td>
                <td><input type="radio" value="1" v-model="content.securityParameter" name=""></td>
                <td colspan="2"><input type="text" v-model="content.securityParameter1" name=""></td>
            </tr>
            <tr>
                <td>2</td>
                <td colspan="4">责任书签署照片</td>
                <td><input type="radio" value="0" v-model="content.signePphoto" name=""></td>
                <td><input type="radio" value="1" v-model="content.signePphoto" name=""></td>
                <td colspan="2"><input type="text" v-model="content.signePphoto1" name=""></td>
            </tr>
            <tr>
                <td>3</td>
                <td colspan="4">渔船登船检查情况表</td>
                <td><input type="radio" value="0" v-model="content.fishingBoatCheck" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingBoatCheck" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingBoatCheck1" name=""></td>
            </tr>
            <tr>
                <td rowspan="5">4</td>
                <td rowspan="5" colspan="2">安全责任书</td>
                <td colspan="2">合作社与船老大责任书</td>
                <td><input type="radio" value="0" v-model="content.fishingBoatBoss" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingBoatBoss" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingBoatBoss1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">船长与船员责任书</td>
                <td><input type="radio" value="0" v-model="content.masterCrew" name=""></td>
                <td><input type="radio" value="1" v-model="content.masterCrew" name=""></td>
                <td colspan="2"><input type="text" v-model="content.masterCrew1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">船长和船员安全生产承诺书</td>
                <td><input type="radio" value="0" v-model="content.czycy" name=""></td>
                <td><input type="radio" value="1" v-model="content.czycy" name=""></td>
                <td colspan="2"><input type="text" v-model="content.czycy1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">渔船隐患自查统计表</td>
                <td><input type="radio" value="0" v-model="content.FishingBoatCheckstatistical" name=""></td>
                <td><input type="radio" value="1" v-model="content.FishingBoatCheckstatistical" name=""></td>
                <td colspan="2"><input type="text" v-model="content.FishingBoatCheckstatistical1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">渔船登舶检查表</td>
                <td><input type="radio" value="0" v-model="content.FishingSafetyCheck" name=""></td>
                <td><input type="radio" value="1" v-model="content.FishingSafetyCheck" name=""></td>
                <td colspan="2"><input type="text" v-model="content.FishingSafetyCheck1" name=""></td>
            </tr>
            <tr>
                <td colspan="9" class="hh">二、渔船基本情况</td>
            </tr>
            <tr>
                <td>5</td>
                <td  colspan="4">船舶检证书（复印件）</td>
                <td><input type="radio" value="0" v-model="content.shipCertificate" name=""></td>
                <td><input type="radio" value="1" v-model="content.shipCertificate" name=""></td>
                <td colspan="2"><input type="text" v-model="content.shipCertificate1" name=""></td>
            </tr>
            <tr>
                <td>6</td>
                <td  colspan="4">船舶登记（国籍）证书（复印件）</td>
                <td><input type="radio" value="0" v-model="content.hipRegistration" name=""></td>
                <td><input type="radio" value="1" v-model="content.hipRegistration" name=""></td>
                <td colspan="2"><input type="text" v-model="content.hipRegistration1" name=""></td>
            </tr>
            <tr>
                <td>7</td>
                <td  colspan="4">捕捞许可证（复印件）</td>
                <td><input type="radio" value="0" v-model="content.fishingLicense" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingLicense" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingLicense1" name=""></td>
            </tr>
            <tr>
                <td colspan="9" class="hh">三、船员基本情况</td>
            </tr>
            <tr>
                <td>8</td>
                <td  colspan="4">船员身份证（复印件）</td>
                <td><input type="radio" value="0" v-model="content.crewIdentification" name=""></td>
                <td><input type="radio" value="1" v-model="content.crewIdentification" name=""></td>
                <td colspan="2"><input type="text" v-model="content.crewIdentification1" name=""></td>
            </tr>
            <tr>
                <td>9</td>
                <td  colspan="4">职务船员证书（复印件）</td>
                <td><input type="radio" value="0" v-model="content.officerCertificate" name=""></td>
                <td><input type="radio" value="1" v-model="content.officerCertificate" name=""></td>
                <td colspan="2"><input type="text" v-model="content.officerCertificate1" name=""></td>
            </tr>
            <tr>
                <td>10</td>
                <td  colspan="4">安全员上岗证书（复印件）</td>
                <td><input type="radio" value="0" v-model="content.safetyOfficer" name=""></td>
                <td><input type="radio" value="1" v-model="content.safetyOfficer" name=""></td>
                <td colspan="2"><input type="text" v-model="content.safetyOfficer1" name=""></td>
            </tr>
            <tr>
                <td>11</td>
                <td  colspan="4">渔业单船船员变更表（复印件）</td>
                <td><input type="radio" value="0" v-model="content.fishingMasterChange" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingMasterChange" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingMasterChange1" name=""></td>
            </tr>
            <tr>
                <td colspan="9" class="hh">四、渔船其他情况</td>
            </tr>
            <tr>
                <td rowspan="6">12</td>
                <td rowspan="6" colspan="2">渔船其他材料</td>
                <td colspan="2">渔船、船员保险单据（复印件）</td>
                <td><input type="radio" value="0" v-model="content.crewDocumentation" name=""></td>
                <td><input type="radio" value="1" v-model="content.crewDocumentation" name=""></td>
                <td colspan="2"><input type="text" v-model="content.crewDocumentation1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">渔船边防户口薄</td>
                <td><input type="radio" value="0" v-model="content.fishingBoatThin" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingBoatThin" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingBoatThin1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">渔船签证薄</td>
                <td><input type="radio" value="0" v-model="content.fishingBoatVisa" name=""></td>
                <td><input type="radio" value="1" v-model="content.fishingBoatVisa" name=""></td>
                <td colspan="2"><input type="text" v-model="content.fishingBoatVisa1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">船员雇佣合同</td>
                <td><input type="radio" value="0" v-model="content.contractCrew" name=""></td>
                <td><input type="radio" value="1" v-model="content.contractCrew" name=""></td>
                <td colspan="2"><input type="text" v-model="content.contractCrew1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">各种奖励文件、证书（复印件）</td>
                <td><input type="radio" value="0" v-model="content.kindsFiles" name=""></td>
                <td><input type="radio" value="1" v-model="content.kindsFiles" name=""></td>
                <td colspan="2"><input type="text" v-model="content.kindsFiles1" name=""></td>
            </tr>
            <tr>
                <td colspan="2">行政执法处罚决定</td>
                <td><input type="radio" value="0" v-model="content.lawPunishmentDecision" name=""></td>
                <td><input type="radio" value="1" v-model="content.lawPunishmentDecision" name=""></td>
                <td colspan="2"><input type="text" v-model="content.lawPunishmentDecision1" name=""></td>
            </tr>
        </table>
    </div>
    <!-- ----------------------------------- -->
    <div style="height:600px;overflow:auto;"class="printOrder-dataml" v-if="tx=='dayin'">
            <table width="100%" class="yy">
                <caption><h2>渔业专业合作社一船一档目录</h2></caption>
                <tr>
                    <td colspan="9" class="hh">一、渔船安全生产台账</td>
                </tr>
                <tr>
                    <td colspan>序号</td>
                    <td colspan="4">台账内容</td>
                    <td>缺少</td>
                    <td>齐全</td>
                    <td colspan="2">备注</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td colspan="4">渔船安全台账</td>
                    <td><span>{{content.securityParameter=='0'?'√':''}}</span></td>
                    <td><span>{{content.securityParameter=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.securityParameter1" type="text" v-model="content.securityParameter1" name=""></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td colspan="4">责任书签署照片</td>
                    <td><span>{{content.signePphoto=='0'?'√':''}}</span> </td>
                    <td><span>{{content.signePphoto=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.signePphoto1" type="text" v-model="content.signePphoto1" name=""></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colspan="4">渔船登船检查情况表</td>
                    <td><span>{{content.fishingBoatCheck=='0'?'√':''}}</span> </td>
                    <td><span>{{content.fishingBoatCheck=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.fishingBoatCheck1" type="text" v-model="content.fishingBoatCheck1" name=""></td>
                </tr>
                <tr>
                    <td rowspan="5">4</td>
                    <td rowspan="5" colspan="2">安全责任书</td>
                    <td colspan="2">合作社与船老大责任书</td>
                    <td><span>{{content.fishingBoatBoss=='0'?'√':''}}</span></td>
                    <td><span>{{content.fishingBoatBoss=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.fishingBoatBoss1" type="text" v-model="content.fishingBoatBoss1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">船长与船员责任书</td>
                    <td><span>{{content.masterCrew=='0'?'√':''}}</span></td>
                    <td><span>{{content.masterCrew=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.masterCrew1" type="text" v-model="content.masterCrew1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">船长和船员安全生产承诺书</td>
                    <td><span>{{content.czycy=='0'?'√':''}}</span> </td>
                    <td><span>{{content.czycy=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.czycy1" type="text" v-model="content.czycy1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">渔船隐患自查统计表</td>
                    <td><span>{{content.FishingBoatCheckstatistical=='0'?'√':''}}</span> </td>
                    <td><span>{{content.FishingBoatCheckstatistical=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.FishingBoatCheckstatistical1" type="text" v-model="content.FishingBoatCheckstatistical1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">渔船登舶检查表</td>
                    <td><span>{{content.FishingSafetyCheck=='0'?'√':''}}</span> </td>
                    <td><span>{{content.FishingSafetyCheck=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.FishingSafetyCheck1" type="text" v-model="content.FishingSafetyCheck1" name=""></td>
                </tr>
                <tr>
                    <td colspan="9" class="hh">二、渔船基本情况</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td  colspan="4">船舶检证书（复印件）</td>
                    <td><span>{{content.shipCertificate=='0'?'√':''}}</span> </td>
                    <td><span>{{content.shipCertificate=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.shipCertificate1" type="text" v-model="content.shipCertificate1" name=""></td>
                </tr>
                <tr>
                    <td>6</td>
                    <td  colspan="4">船舶登记（国籍）证书（复印件）</td>
                    <td><span>{{content.hipRegistration=='0'?'√':''}}</span> </td>
                    <td><span>{{content.hipRegistration=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.hipRegistration1" type="text" v-model="content.hipRegistration1" name=""></td>
                </tr>
                <tr>
                    <td>7</td>
                    <td  colspan="4">捕捞许可证（复印件）</td>
                    <td><span>{{content.fishingLicense=='0'?'√':''}}</span> </td>
                    <td><span>{{content.fishingLicense=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.fishingLicense1" type="text" v-model="content.fishingLicense1" name=""></td>
                </tr>
                <tr>
                    <td colspan="9" class="hh">三、船员基本情况</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td  colspan="4">船员身份证（复印件）</td>
                    <td><span>{{content.crewIdentification=='0'?'√':''}}</span></td>
                    <td><span>{{content.crewIdentification=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.crewIdentification1" type="text" v-model="content.crewIdentification1" name=""></td>
                </tr>
                <tr>
                    <td>9</td>
                    <td  colspan="4">职务船员证书（复印件）</td>
                    <td><span>{{content.officerCertificate=='0'?'√':''}}</span></td>
                    <td><span>{{content.officerCertificate=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.officerCertificate1" type="text" v-model="content.officerCertificate1" name=""></td>
                </tr>
                <tr>
                    <td>10</td>
                    <td  colspan="4">安全员上岗证书（复印件）</td>
                    <td><span>{{content.safetyOfficer=='0'?'√':''}}</span> </td>
                    <td><span>{{content.safetyOfficer=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.safetyOfficer1" type="text" v-model="content.safetyOfficer1" name=""></td>
                </tr>
                <tr>
                    <td>11</td>
                    <td  colspan="4">渔业单船船员变更表（复印件）</td>
                    <td><span>{{content.fishingMasterChange=='0'?'√':''}}</span> </td>
                    <td><span>{{content.fishingMasterChange=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.fishingMasterChange1" type="text" v-model="content.fishingMasterChange1" name=""></td>
                </tr>
                <tr>
                    <td colspan="9" class="hh">四、渔船其他情况</td>
                </tr>
                <tr>
                    <td rowspan="6">12</td>
                    <td rowspan="6" colspan="2">渔船其他材料</td>
                    <td colspan="2">渔船、船员保险单据（复印件）</td>
                    <td><span>{{content.crewDocumentation=='0'?'√':''}}</span></td>
                    <td><span>{{content.crewDocumentation=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.crewDocumentation1" type="text" v-model="content.crewDocumentation1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">渔船边防户口薄</td>
                    <td><span>{{content.fishingBoatThin=='0'?'√':''}}</span> </td>
                    <td><span>{{content.fishingBoatThin=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.fishingBoatThin1" type="text" v-model="content.fishingBoatThin1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">渔船签证薄</td>
                    <td><span>{{content.fishingBoatVisa=='0'?'√':''}}</span> </td>
                    <td><span>{{content.fishingBoatVisa=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.fishingBoatVisa1" type="text" v-model="content.fishingBoatVisa1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">船员雇佣合同</td>
                    <td><span>{{content.contractCrew=='0'?'√':''}}</span> </td>
                    <td><span>{{content.contractCrew=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.contractCrew1" type="text" v-model="content.contractCrew1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">各种奖励文件、证书（复印件）</td>
                    <td><span>{{content.kindsFiles=='0'?'√':''}}</span></td>
                    <td><span>{{content.kindsFiles=='1'?'√':''}}</span></td>
                    <td colspan="2"><input :placeholder="content.kindsFiles1" type="text" v-model="content.kindsFiles1" name=""></td>
                </tr>
                <tr>
                    <td colspan="2">行政执法处罚决定</td>
                    <td><span>{{content.lawPunishmentDecision=='0'?'√':''}}</span> </td>
                    <td><span>{{content.lawPunishmentDecision=='1'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.lawPunishmentDecision1" type="text" v-model="content.lawPunishmentDecision1" name=""></td>
                </tr>
            </table>
        </div>
    <div slot="footer">
        <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'" @click="okML">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okML">保存</Button>
        <Button type="info" size="large" v-show="tx=='dayin'" @click="dayin">打印</Button>
    </div>
</Modal>
</template>
<script>
import {isNull } from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
export default {
    name:"ycydlModel",
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
            visible:this.value,
            modalML:{
                id:"",
                parameteFileId:"",
                type:"professionalcooperative",
                name:"海帆渔业专业合作社一船一档目录",
                content:{},
            },
            content:{
                yyaq:"",
                securityParameter:"",
                securityParameter1:"",
                zrqs:"",
                signePphoto:"",
                signePphoto1:"",
                ycdcjc:"",
                fishingBoatCheck:"",
                fishingBoatCheck1:"",
                aqzrs:"",
                fishingBoatBoss:"",
                fishingBoatBoss1:"",
                masterCrew:"",
                masterCrew1:"",
                czycy:"",
                czycy1:"",
                FishingBoatCheckstatistical:"",
                FishingBoatCheckstatistical1:"",
                FishingSafetyCheck:"",
                FishingSafetyCheck1:"",
                cbzs:"",
                shipCertificate:"",
                shipCertificate1:"",
                cbdj:"",
                hipRegistration:"",
                hipRegistration1:"",
                blxk:"",
                fishingLicense:"",
                fishingLicense1:"",
                cysfz:"",
                crewIdentification:"",
                crewIdentification1:"",
                zwcy:"",
                officerCertificate:"",
                officerCertificate1:"",
                aqsg:"",
                safetyOfficer:"",
                safetyOfficer1:"",
                cybg:"",
                fishingMasterChange:"",
                fishingMasterChange1:"",
                qtzl:"",
                crewDocumentation:"",
                crewDocumentation1:"",
                fishingBoatThin:"",
                fishingBoatThin1:"",
                fishingBoatVisa:"",
                fishingBoatVisa1:"",
                contractCrew:"",
                contractCrew1:"",
                kindsFiles:"",
                kindsFiles1:"",
                lawPunishmentDecision:"",
                lawPunishmentDecision1:"",
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
                var newstr = document.getElementsByClassName('printOrder-dataml')[0].innerHTML
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
        okML(){
            var _self=this;
            _self.modalML.content=JSON.stringify(_self.content);
            if(isNull(_self.modalML.parameteFileId)){
                _self.modalML.id=_self.sID;
                _self.modalML.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalML)
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
                _self.modalML.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalML)
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
        search(){
            var _self=this;
            if(_self.tx=="update"||_self.tx=="dayin"){
                var id=_self.sID;
                console.log(_self.sID,"子id222");
                _self.$http.get("/standingbook/word/table/"+id)
                .then(res=>{
                    if(res.success){
                        //console.log("信息下载成功");
                        _self.modalML=res.data;
                        _self.content=JSON.parse(res.data.content);
                        _self.visible=true;
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
                
                _self.content={};
                _self.modalML.id="";
            }
        },
    },
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else 
                this.modalML.parameteFileId=null;
        }
    }
}
</script>
<style scoped>
table.yy{
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.yy td{
    border:1px solid black;
    width:90px;
    height:32px;
    text-align:center;
}
table.yy td.hh{
    text-align:left;
    position:relative;
    left:0px;
}
table.yy input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
</style>