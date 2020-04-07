<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
<div>
<Row>
    <data-table ref="test" 
        :url="'/standingbook/coop/hotWork/hotList'" 
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
<Modal v-model="modalStatus.newAddModal" :styles="{top: '100px'}" :title="title" width="842px" :mask-closable="maskclosable">
    <div style="height:600px;overflow:auto;" ref="zerenbook" id="zerenbook">
        <table class="sqb">
            <caption><h2>渔船动火作业备案表</h2></caption>
            <caption>
                <p style="margin-bottom:5px;">
                    <span style="float:left;">
                        申请日期：
                        <input v-model="logDate.year" :readonly="readonly" onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">年
                        <input v-model="logDate.month" :readonly="readonly"  onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">月
                        <input v-model="logDate.day" :readonly="readonly"  onkeyup="value=value.replace(/[^\d]/g,'')" type="text" class="captions">日
                    </span>
                </p>
            </caption>
            <tr style="height:1px;border:1px solid transparent;border-bottom:1px solid black;">
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
                <td style="height:1px;border:1px solid transparent;border-bottom:1px solid black;"></td>
            </tr>
            <tr>
                <td rowspan="2" colspan="4">申请渔船</td>
                <td colspan="4">船名号</td>
                <td v-show="btnShow" colspan="4" style="position: relative;">
                    <input v-model="newAddParams.shipName" :readonly="readonly"  type="text" class="ipt">
                    <Button @click="selectShipModal()" type="primary"style="height: 35px;position: absolute;right:1px;top:7px;">查询</Button>
                </td>
                <td v-show="!btnShow" colspan="4">
                    <input v-model="newAddParams.shipName" :readonly="readonly"  type="text" class="ipt">
                </td>
                <td colspan="4">船质</td>
                <td colspan="4">
                    <input v-model="newAddParams.shipQuality" :readonly="readonly"  type="text" class="ipt">
                </td>
            </tr>
            <tr>
                <td colspan="4">所有人</td>
                <td colspan="4">
                    <input v-model="newAddParams.owner" :readonly="readonly"  type="text" class="ipt">
                </td>
                <td colspan="4">联系电话</td>
                <td colspan="4">
                    <input v-model="newAddParams.tel" :readonly="readonly"  type="text" class="ipt">
                </td>
            </tr>
            <tr>
                <td colspan="4">动火原因</td>
                <td colspan="16">
                    <input v-model="newAddParams.workCause" :readonly="readonly" type="text" class="ipt" style="width:95%;">
                    <!-- <Select v-model="newAddParams.workCause" :readonly="readonly"  style="width:50%;text-align: left;"> 
                        <Option v-for="(item,i) in reasons" :value="item.value" :key="i">{{item.title}}</Option>
                    </Select> -->
                </td>
            </tr>
            <tr>
                <td colspan="4">动火部位</td>
                <td colspan="8">
                    <input v-model="newAddParams.workLocation" :readonly="readonly" type="text" class="ipt">
                    <!-- <Select v-model="newAddParams.workLocation" :readonly="readonly"  style="text-align: left;"> 
                        <Option v-for="(item,i) in positions" :value="item.value" :key="i">{{item.title}}</Option>
                    </Select> -->
                </td>
                <td colspan="4">动火方式</td>
                <td colspan="4">
                    <input v-model="newAddParams.workType" :readonly="readonly" type="text" class="ipt">
                    <!-- <Select v-model="newAddParams.workType" :readonly="readonly"  style="text-align: left;"> 
                        <Option v-for="(item,i) in styles" :value="item.value" :key="i">{{item.title}}</Option>
                    </Select> -->
                </td>
            </tr>
            <tr>
                <td colspan="4">作业时间</td>
                <td colspan="16">
                    开始日期：<DatePicker  v-model="newAddParams.workDateStart" :readonly="readonly"  type="date" placeholder="请选择开始日期" style="width: 200px"></DatePicker>
                    <span style="margin:10px;"></span>
                    结束日期：<DatePicker  v-model="newAddParams.workDateEnd" :readonly="readonly"  type="date" placeholder="请选择结束日期" style="width: 200px"></DatePicker>
                </td>
            </tr>
            <tr>
                <td colspan="4">作业地点</td>
                <td colspan="16">
                    <input v-model="newAddParams.workPlace" :readonly="readonly"  type="text" class="ipt" style="width:95%;">
                </td>
            </tr>
            <tr>
                <td colspan="4">现场监护人</td>
                <td colspan="8">
                    <input v-model="newAddParams.siteGua" :readonly="readonly"  type="text" class="ipt"></td></td>
                <td colspan="4">操作人员</td>
                <td colspan="4">
                    <input v-model="newAddParams.performer" :readonly="readonly"  type="text" class="ipt"></td>
                </td>
            </tr>
            <tr style="height:150px;">
                <td colspan="4">动火作业已采取的安全措施及承诺</td>
                <td colspan="16">
                    <p class="pp">1.动火作业渔船已采取了安全措施，保证动火作业期间的安全：</p>
                    <p class="pp">
                        <span class="sp">（1）现场配备有灭火器、消防水</span>
                        <span style="margin:0 40px;"></span>
                        <RadioGroup v-model="newAddParams.fireExting" :readonly="readonly" >
                            <Radio label="true">有</Radio>
                            <Radio label="false">无</Radio>
                        </RadioGroup>
                    </p>
                    <p class="pp">
                        <span class="sp">（2）现场配备有隔离砂</span>
                        <span style="margin:0 40px;"></span>
                        <RadioGroup v-model="newAddParams.sand" :readonly="readonly" >
                            <Radio label="true">有</Radio>
                            <Radio label="false">无</Radio>
                        </RadioGroup>
                    </p>
                    <p class="pp">
                        <span class="sp">（3）现场无易燃易爆物品</span>
                        <span style="margin:0 40px;"></span>
                        <RadioGroup v-model="newAddParams.fac" :readonly="readonly" >
                            <Radio label="true">有</Radio>
                            <Radio label="false">无</Radio>
                        </RadioGroup>
                    </p>
                    <p class="pp">
                        <span class="sp">（4）现场有专业监护</span>
                        <span style="margin:0 40px;"></span>
                        <RadioGroup v-model="newAddParams.professional" :readonly="readonly" >
                            <Radio label="true">有</Radio>
                            <Radio label="false">无</Radio>
                        </RadioGroup>
                    </p>
                    <p class="pp">2.动火作业渔船承担因动火作业造成的责任。</p>
                    <p style="position: relative;width:400px;left:225px;">
                        <span>
                            申请人：<input v-model="newAddParams.propose"  :readonly="readonly" type="text" class="ipt2">
                        </span>
                        <span>
                            作业人签名：<input v-model="newAddParams.performerSign" :readonly="readonly"  type="text" class="ipt2">
                        </span>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="4">渔业合作社审批意见</td>
                <td colspan="16" >
                    <Input v-model="newAddParams.coopIdea" :readonly="readonly"  type="textarea" style="min-height: 71px;" :autosize="{minRows: 3}"  class="textarea"></Input>
                    <p style="width:200px;margin-left:237px;margin-bottom:5px;">
                        <span>
                            审核人：<input v-model="newAddParams.auditor" :readonly="readonly"  type="text"  class="ipt2">
                        </span>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="4">动火作业安全规定</td>
                <td colspan="16" style="height:100%;">
                    <Input v-model="newAddParams.content" :maxlength=400 style="min-height: 410px;" :readonly="readonly" type="textarea" :autosize="{minRows: 18}" class="textarea"></Input>
                </td>
            </tr>
            <tr>
                <td colspan="4">备注</td>
                <td colspan="16" style="height:100%;">
                    <Input v-model="newAddParams.comment" :maxlength=200 style="min-height: 92px;" :readonly="readonly" type="textarea" :autosize="{minRows: 4}"  class="textarea"></Input>
                </td>
            </tr>
        </table>
    </div>
    <div slot="footer">
        <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
        <Button v-show="btnShow" type="info" @click="saveData()">保存</Button>
        <Button v-show="!btnShow" @click="modalStatus.newAddModal = false" type="info">关闭</Button>
        <Button v-show="!btnShow" @click="print" type="success">打印</Button>
    </div>
</Modal>
    <!-- 所有渔船信息 -->   
    <Modal :width="700" :styles="{top: '180px','z-index':1000}" v-model="status.selectShip" title="渔船查询" :scrollable=true>
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
        <selectShipModal v-model="baseShipModal.show"  :inputShipName="newAddParams.shipName"  @on-select-ship="onSelectShip"></selectShipModal>
        <MultiUpload :owner="owner_Data" :shipName="shipName_Data" :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow"  :dataId="sID" moduleId="firework"></MultiUpload>
</div>     
</template>
<script>
import newUpload from '@/views/components/Upload/newUpload.vue';
import {isNull,isEmpty } from '@/libs/common.js'  
import userObj from '@/store/module/userId.js';
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

export default {
    name: 'rulesmng',
    components: {
        newUpload,MultiUpload,selectShipModal
    },
    data () {
        return {
        baseShipModal:{
            show:false
        },
        owner_Data: '',
        shipName_Data:'',
        name_Data: '',
	    ifEdit:true,
            format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
            iSmanager:false,
            maskclosable:false,
            readonly:false,
            status:{
                selectShip:false,
            },
            modalStatus:{
                newAddModal:false,
            },
            logDate:{
                year:"",
                month:"",
                day:"",
            },
            newAddParams:{
                signTime:"",//申请日期
                shipName:"",	// 船名号
                owner:"",		// 所有人
                shipQuality:"",	// 船质
                tel:"",         //联系电话
                workCause:"",		// 动火原因
                workLocation:"",	// 动火位置
                workType:"",		// 动火方式  电焊/气焊/
                workDateStart:"",	// 作业开始时间
                workDateEnd:"",		// 作业结束时间
                workPlace:"",		// 作业地点
                siteGua:"",	        // 现场监护人
                performer:"",		// 操作员
                fireExting:"",	// 现场是否有灭火器
                sand:"",		// 现场是否有隔离沙
                fac:"",			// 现场是否有易燃易爆物品
                professional:"",// 现场是否有专业监护
                propose:"",		// 申请人
                performerSign:"",// 作业人签名
                coopIdea:"",	// 合作社审批意见
                auditor:"",		// 审核人
                content:"",     //动火作业安全规定
                comment:"",     //备注
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
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    maxWidth: 80,
                    // ellipsis:true,
                    align: 'center',
                },
                {
                    title: '船名号',
                    align: 'center',
                    key: 'shipName'
                },
                {
                    title: '船质',
                    align: 'center',
                    key: 'shipQuality'
                    // render:(h,params)=>{
                    //     var shipQuality=params.row.shipQuality;
                    //     var workType=params.row.workType;
                        // if(shipQuality==undefined&&workType!=undefined){
                        //     return h("div",workType);
                        // }
                        // if(shipQuality!=undefined&&workType==undefined){
                        //     return h("div",shipQuality);
                        // }
                        // if(shipQuality!=undefined&&workType!=undefined){
                        //     return h("div",shipQuality+"、"+workType);
                        // }
                        // if(shipQuality==undefined&&workType==undefined){
                        //     return h("div","");
                        // }
                    // }
                },
                {
                    title: '所有人',
                    align: 'center',
                    key: 'owner'
                },
                {
                    title: '动火原因',
                    align: 'center',
                    ellipsis:true,
                    key: 'workCause',
                    // render:(h,params)=>{
                    //     var workCause=params.row.workCause;
                    //     var reasons=this.reasons
                    //     for(var i=0;i<reasons.length;i++){
                    //         if(reasons[i].value==workCause){
                    //             return h("div",reasons[i].title);
                    //         }
                    //     }
                    // }
                },
                {
                    title: '操作员',
                    align: 'center',
                    key: 'performer'
                },
                {
                    title: '开始日期',
                    align: 'center',
                    maxWidth: 180,
                    key: 'workDateStart',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.workDateStart));
                    }
                },
                {
                    title: '结束日期',
                    align: 'center',
                    maxWidth: 180,
                    key: 'workDateEnd',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.workDateEnd));
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
            title:"",
            btnShow:true,
            /////////////////////////////////////////////////////////////////////
            fileShow:false,
            sID:"",
            uploadList:[],
        }
    },
    computed:{  
        reasons(){ 
            return this.$store.getters.getDictList("reasons");
        },
        positions(){ 
            return this.$store.getters.getDictList("positions");
        },
        styles(){ 
            return this.$store.getters.getDictList("styles");
        },
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
         onSelectShip(res){
             console.log(res,'onSelectShip')
             this.newAddParams.shipName = res.shipname
             this.newAddParams.shipQuality = res.shipmate
             this.newAddParams.owner = res.owner
             this.newAddParams.tel = res.tel
         },
         bindData(){
            //搞定 type=text, 同时如果checkbox,radio,select>option的值有变化, 也绑定一下, 这里忽略button
            $("input,select option").each(function(){
                $(this).attr('value',$(this).val());
            });
            
            //搞定 type=checkbox,type=radio 选中状态
            $("input[type='checkbox'],input[type='radio']").each(function(){
                if($(this).attr('checked'))
                    $(this).attr('checked',true);
                else
                    $(this).removeAttr('checked');
            });
            
            //搞定select选中状态
            $("select option").each(function(){
                if($(this).attr('selected'))
                    $(this).attr('selected',true);
                else
                    $(this).removeAttr('selected');
            });
            
            //搞定 textarea
            $("textarea").each(function(){
                $(this).html($(this).val());
            });
        },
        //打印
            print() {
                this.bindData()
                var form = $("#zerenbook").html();
                window.document.body.innerHTML = form
                window.print()
                // 重新加载页面，以刷新数据
                window.location.reload()
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
            show(url){
                window.open(url);
            },
            deleteFile:function(index,item){
                var _self=this;
                _self.$http.delete("/$admin/attachs/"+item.id)
                    .then(function(result){
                        if(result.success){
                            _self.uploadList.splice(index, 1);
                        }
                        _self.$Message.info(result.msg);
                });
            },
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
                this.owner_Data = row.owner
                this.sID=row.id
                this.uploadList=[];
                this.getImages(row.id);
            },


        selectShipModal(){
            // this.selectShip();
            // this.status.selectShip=true;
            this.baseShipModal.show = true
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
        },
        selectedShip(row) {
            this.newAddParams.shipName=row.nametheShip;
            this.newAddParams.owner=row.namevesselOwner;
            this.newAddParams.shipQuality=row.material;
            this.newAddParams.tel=row.shipOwnerTelephone;
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
            this.newAddParams.workDateStart=new Date();
            this.newAddParams.workDateEnd=new Date();
            this.readonly=false;
            var dt=new Date();
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
            console.log(row)
            var _self=this;
            if(_self.title=="查看"){
                this.readonly=true;
                _self.btnShow=false;
            }else{
                _self.btnShow=true;
                this.readonly=false;
            }
            _self.$http.get("/standingbook/coop/hotWork/"+row.id)
            .then(res=>{
                if(res.success){
                    _self.newAddParams=res.data;
                    let dt=new Date(res.data.signTime);
                    _self.logDate={
                        year:dt.getFullYear(),
                        month:dt.getMonth()+1,
                        day:dt.getDate(),
                    };
                    if(_self.newAddParams.fireExting==true){
                        _self.newAddParams.fireExting="true";
                    }else{
                        _self.newAddParams.fireExting="false";
                    }
                    if(_self.newAddParams.sand==true){
                        _self.newAddParams.sand="true";
                    }else{
                        _self.newAddParams.sand="false";
                    }
                    if(_self.newAddParams.fac==true){
                        _self.newAddParams.fac="true";
                    }else{
                        _self.newAddParams.fac="false";
                    }
                    if(_self.newAddParams.professional==true){
                        _self.newAddParams.professional="true";
                    }else{
                        _self.newAddParams.professional="false";
                    }
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
                content:"您确定要删除此条明火作业吗？",
                onOk:function(){
                    _self.$http.delete("/standingbook/coop/hotWork/"+id)
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
        saveData(){
            var _self=this;
            if(_self.newAddParams.shipName==""||_self.newAddParams.shipName==undefined||_self.newAddParams.shipName.trim()==""){
                this.$Message.error("请填写船名号");
                return ;
            }
            if(_self.newAddParams.workCause==""||_self.newAddParams.workCause==undefined||_self.newAddParams.workCause.trim()==""){
                this.$Message.error("请填写动火原因");
                return ;
            }
            if(_self.newAddParams.workDateStart==""||_self.newAddParams.workDateStart==undefined){
                this.$Message.error("请填写作业开始时间");
                return ;
            }
            if(_self.newAddParams.workDateEnd==""||_self.newAddParams.workDateEnd==undefined){
                this.$Message.error("请填写作业结束时间");
                return ;
            }
            if(_self.newAddParams.workPlace==""||_self.newAddParams.workPlace==undefined||_self.newAddParams.workPlace.trim()==""){
                this.$Message.error("请填写作业地点");
                return ;
            }
            if(_self.newAddParams.performer==""||_self.newAddParams.performer==undefined||_self.newAddParams.performer.trim()==""){
                this.$Message.error("请填写操作人员");
                return ;
            }


            _self.newAddParams.signTime=_self.logDate.year+"-"+_self.logDate.month+"-"+_self.logDate.day+" "+"00:00:00";
            if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                _self.newAddParams.creatorName=userObj.name;
                _self.$http.post("/standingbook/coop/hotWork/save",_self.newAddParams)
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
                _self.$http.patch("/standingbook/coop/hotWork/"+_self.newAddParams.id,_self.newAddParams)
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
    height:297mm;
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.sqb td{
    border:1px solid black;
    width:52px;
    height:51px;
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
    /* height:100%; */
    border:0;
    outline:none;
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
span.sp{
    margin-left:5px;
    width: 200px;
    text-align: left;
}
p.pp{
    display:flex;
    text-align: left;
    margin:3px;
}
input.ipt2{
    width:100px;
    border:0;
    outline:0;
}
</style>
                        
        
        
        