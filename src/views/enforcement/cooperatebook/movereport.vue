<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
    <div>
        <Row>
            <data-table ref="test" :autoInitTable="false"
                :url="'/standingbook/coop/msr/msrList'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="渔船名:">
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
                    <caption><h2>基层渔业专业合作移泊报告</h2></caption>
                    <caption>
                        <p style="margin-bottom:5px;">
                            <span style="float:right;margin-right:50px;margin-bottom:3px;">
                                苍南 <input v-model="newAddParams.year":readonly="readonly"  onkeyup="value=value.replace(/[^\d]/g,'')" type="text" style="width:30px;border:0;outline:0;text-align:center;"> 
                                年第 <input v-model="newAddParams.num" :readonly="readonly" type="text" style="width:50px;border:0;border-bottom:1px solid black;outline:0;text-align:center;"> 号
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
                        <td colspan="7">船名号</td>
                        <td v-show="btnShow" colspan="9" style="position: relative;">
                            <input v-model="newAddParams.shipName" :readonly="readonly" type="text" class="ipt">
                            <Button  @click="selectShipModal()" type="primary"style="height: 35px;position: absolute;right:1px;top:10px;">查询</Button>
                        </td>
                        <td v-show="!btnShow" colspan="9" style="position: relative;">
                            <input v-model="newAddParams.shipName" :readonly="readonly" type="text" class="ipt">
                        </td>
                        <td colspan="7">作业类型</td>
                        <td colspan="9">
                            <input v-model="newAddParams.workType" :readonly="readonly" type="text" class="ipt">
                        </td>
                        <td colspan="7">船体材料</td>
                        <td colspan="9">
                            <input v-model="newAddParams.material" :readonly="readonly" type="text" class="ipt">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">船主（长）</td>
                        <td colspan="9">
                            <input v-model="newAddParams.captain" :readonly="readonly" type="text" class="ipt">
                        </td>
                        <td colspan="7">联系电话</td>
                        <td colspan="9">
                            <input v-model="newAddParams.tel" :readonly="readonly" type="text" class="ipt">
                        </td>
                        <td colspan="7">身份证号</td>
                        <td colspan="9" style="width:140px;">
                            <input v-model="newAddParams.idNumber" :readonly="readonly" type="text" class="ipt">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">移泊原因</td>
                        <td colspan="41">
                            <Checkbox v-model="newAddParams.maintain">维修</Checkbox>
                            <span style="margin:10px;"></span>
                            <Checkbox v-model="newAddParams.rushIce">充冰</Checkbox>
                            <span style="margin:10px;"></span>
                            <Checkbox v-model="newAddParams.refuel">加油</Checkbox>
                            <span style="margin:10px;"></span>
                            <Checkbox v-model="newAddParams.project">工程</Checkbox>
                            <span style="margin:10px;"></span>
                            其他：<input v-model="newAddParams.otherCause":readonly="readonly" type="text" style="width:100px;border:0;border-bottom:1px solid black;outline:0;">
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">移泊时间</td>
                        <td colspan="41">
                            开始时间：<DatePicker v-model="newAddParams.moveBegin" :readonly="readonly" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期时间" style="width: 200px"></DatePicker>
                            <span style="margin:10px;"></span>
                            结束时间：<DatePicker v-model="newAddParams.moveEnd" :readonly="readonly" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期时间" style="width: 200px"></DatePicker>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="24">船舶所有人</td>
                        <td colspan="24">备注</td>
                    </tr>
                    <tr>
                        <td colspan="24">
                            <p>
                                <span class="shipown">
                                    拟申报开往：
                                    <input v-model="newAddParams.shipMoveTo" :readonly="readonly" type="text" class="ipt xia">
                                </span>
                            </p>
                            <p>
                                <span class="shipown">
                                    厂长： 
                                    <input v-model="newAddParams.factoryKing" :readonly="readonly" type="text" class="ipt xia">
                                </span>
                            </p>
                            <p>
                                <span class="shipown">
                                    电话：
                                    <input v-model="newAddParams.kingTel" :readonly="readonly" type="text" class="ipt xia">
                                </span>
                            </p>
                            <p>
                                <span class="shipown">
                                    船主（长）签名：
                                    <input v-model="newAddParams.captainSign" :readonly="readonly" type="text" class="ipt xia">
                                </span>
                                <span style="float:right;margin-right:10px;margin-top:15px;">
                                    <input v-model="logDate.month" :readonly="readonly" type="text" style="width:20px;border:0;outline:0;text-align: center;">月
                                    <input v-model="logDate.day" :readonly="readonly" type="text" style="width:20px;border:0;outline:0;text-align: center;">日
                                </span>
                            </p>
                        </td>
                        <td colspan="24" style="height:100%;">
                            <Input v-model="newAddParams.remarks" :readonly="readonly" :maxlength="10" type="textarea" style="min-height: 218px; ":autosize="{minRows: 10}"  class="textarea"></Input>
                            <!-- <textarea v-model="newAddParams.remarks" style="width:96%;height:260px;border:0;outline:0;"></textarea> -->
                            <p>
                                <span style="display:inline-block;margin-left:45%;margin-bottom:10px;">保证人：<input v-model="newAddParams.warrantor" :readonly="readonly" type="text" style="border:0;outline:0;"></span>
                            </p>
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
                <MyUpload 
                    multiple 
                    action="/$admin/attachs"
                    :show-upload-list="false"
                    :data="uploadData"
                    :format="format"
                    :on-format-error="uploadError"
                    name="securityparameter"
                    :before-upload="beforeUpload"  
                    :on-success="uploadSuccess">
                    <Button  icon="ios-cloud-upload-outline" style="width:468px;">点击或拖拽上传文件</Button>
                </MyUpload>
                <ul style="list-style: none;width:100%;">
                    <li v-for="(item,index) in uploadList" style="width:100%; display: flex;margin:5px 0px;" :key="index"> 
                        <span style="display:inline-block;width:45%;margin:0px 5px;">{{item.name}}</span> 
                        <span style="width:110px; text-align: right;" >
                            <Button @click="show($util.basePath+'/attachment'+item.url)" size="small" type="primary">文件预览</Button>
                            <Button @click="deleteFile(index,item)" size="small" type="error">删除</Button>
                        </span>                                                                
                    </li>
                </ul>
            </div> 
            <div slot="footer">
                <Button type="info"  @click="fileShow=false">关闭</Button>
            </div>
        </Modal> -->
        <selectShipModal v-model="baseShipModal.show"  :inputShipName="newAddParams.shipName"  @on-select-ship="onSelectShip"></selectShipModal>
        <MultiUpload :owner="owner_Data" :shipName="shipName_Data" :creatorName="name_Data" v-model="fileShow"  uploadUrl="/standingbook/attachs/upload" :dataId="sID" moduleId="movereport"></MultiUpload>
    </div>     
</template>
<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue';
import {isNull,isEmpty } from '@/libs/common.js'  
import userObj from '@/store/module/userId.js';
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

export default {
    name: 'movereport',
    components: {
        MyUpload,MultiUpload,selectShipModal
    },
    data () {
        return {
            baseShipModal:{
                show:false
            },
            owner_Data: '',
            shipName_Data: '',
            name_Data: '',
            ifEdit: false,
            format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
            iSmanager:false,
            maskclosable:false,
            readonly:false,
            status:{
                btnshow:false,
                selectShip:false,
            },
            modalStatus:{
                newAddModal:false,
            },
            newAddParams:{
                year:"",
                num:"",
                shipName:"",	// 船名号
                workType:"",	// 作业类型
                material:"",	// 材质
                captain:"",		// 船长
                idNumber:"",	// 身份证
                tel:"",			// 联系电话
                maintain:"",	// 是否维修
                rushIce:"",		// 是否冲冰
                refuel:"",		// 是否加油
                project:"",		// 工程
                otherCause:"",	// 其他原因
                moveBegin:"",	// 移动开始时间
                moveEnd:"",		// 移动结束时间
                shipMoveTo:"",	// 拟申报开往地点(工厂)
                factoryKing:"",	// 厂长姓名
                kingTel:"",		// 厂长电话
                captainSign:"",	// 船长签名
                signDate:"",	// 船长签名时间
                remarks:"",		// 备注
                warrantor:"",	// 保证人
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
                    title: '渔船名',
                    align: 'center',
                    key: 'shipName'
                },
                {
                    title: '船长',
                    align: 'center',
                    key: 'captain'
                },
                {
                    title: '联系电话',
                    align: 'center',
                    key: 'tel'
                },
                {
                    title: '申报开往地点',
                    align: 'center',
                    key: 'shipMoveTo'
                },
                {
                    title: '移动开始时间',
                    align: 'center',
                    maxWidth: 180,
                    key: 'moveBegin',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.moveBegin));
                    }
                },
                {
                    title: '移动结束时间',
                    align: 'center',
                    maxWidth: 180,
                    key: 'moveEnd',
                    render:(h,params)=>{
                        return h("div",this.transDate(params.row.moveEnd));
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
                    width:300,
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
                                    },"附件上传"));
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
                                        },"附件上传"));
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
            logDate:{
                year:"",
                month:"",
                day:"",
            },
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
        onSelectShip(res){
            console.log(res,'onSelectShip')
            this.newAddParams.shipName = res.shipname	// 船名号
            this.newAddParams.workType = res.worktype	// 作业类型
            this.newAddParams.material = res.shipmate	// 材质
            this.newAddParams.captain = res.owner		// 船长
            this.newAddParams.idNumber = res.cardno	// 身份证
            this.newAddParams.tel = res.tel			// 联系电话
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
                this.owner_Data = row.captain
                this.sID=row.id;
                this.uploadList=[];
                this.getImages(row.id);
            },
        

        selectShipModal(){
            this.baseShipModal.show = true
            // this.queryX.wheres.nametheShip_like = this.newAddParams.shipName
            // this.selectShip();
            // this.status.selectShip=true;
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
            this.newAddParams.captain=row.namevesselOwner;
            this.newAddParams.material=row.material;
            this.newAddParams.tel=row.shipOwnerTelephone;
            this.newAddParams.workType=row.worktype;
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
            var hour=dt.getHours();
            var minute=dt.getMinutes();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }
            if(hour<10){
                hour="0"+hour;
            }
            if(minute<10){
                minute="0"+minute;
            }
            return year+"-"+month+"-"+day+" "+hour+":"+minute;
        },
        newAdd(){
            this.newAddParams={};
            this.title="新增";
            this.newAddParams.moveBegin=new Date();
            this.newAddParams.moveEnd=new Date();
            this.readonly=false;
            // this.status.btnshow=true;
            var query = this.$route.query;
            if(!this.isEmpty(query.shipName)){
                this.newAddParams.shipName = query.shipName;
                this.$set(this.newAddParams,'shipName',query.shipName)
            }            
            var dt=new Date();
            this.logDate={
                year:dt.getFullYear(),
                month:dt.getMonth()+1,
                day:dt.getDate(),
            };
            this.newAddParams.year=dt.getFullYear();
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
                // this.status.btnshow=false;
            }else{
                _self.btnShow=true;
                this.readonly=false;
                // this.status.btnshow=true;
            }
            _self.$http.get("/standingbook/coop/msr/"+row.id)
            .then(res=>{
                if(res.success){
                    _self.newAddParams=res.data;
                    let dt=new Date(res.data.signDate);
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
                content:"您确定要删除此条移泊报告吗？",
                onOk:function(){
                    _self.$http.delete("/standingbook/coop/msr/"+id)
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
            var nAP=_self.newAddParams;
            if((nAP.maintain==""||nAP.maintain==undefined)&&(nAP.rushIce==""||nAP.rushIce==undefined)&&(nAP.refuel==""||nAP.refuel==undefined)&&(nAP.project==""||nAP.project==undefined)&&(nAP.otherCause==""||nAP.otherCause==undefined||nAP.otherCause.trim()=="")){
                this.$Message.error("移泊原因不能为空");
                return ;
            }
            if(_self.newAddParams.moveBegin==""||_self.newAddParams.moveBegin==undefined){
                this.$Message.error("请填写移泊开始时间");
                return ;
            }
            if(_self.newAddParams.moveEnd==""||_self.newAddParams.moveEnd==undefined){
                this.$Message.error("请填写移泊结束时间");
                return ;
            }

            _self.newAddParams.signDate=_self.logDate.year+"-"+_self.logDate.month+"-"+_self.logDate.day+" "+"00:00:00";
            if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                _self.newAddParams.creatorName=userObj.name;
                _self.$http.post("/standingbook/coop/msr/save",_self.newAddParams)
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
                _self.$http.patch("/standingbook/coop/msr/"+_self.newAddParams.id,_self.newAddParams)
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
                this.query.wheres.search = query.shipName;
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
    width:135px;
    height:56px;
    text-align:center;
    box-sizing:border-box;
}
table.sqb input.ipt{
    width:90%;
    border:0;
    outline:0;
}
table.sqb input.ipt.xia{
    width:150px;
}
table.sqb .hidn{
    height:1px;
    visibility:hidden;
}
span.shipown{
    float:left;
    margin:15px 10px;
}


table.sqb .textarea{
    width:96%;
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
</style>
                
        
        
        