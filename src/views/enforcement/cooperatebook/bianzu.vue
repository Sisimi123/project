<style lang="less" scoped>
    @import '../../../styles/common.less';
</style>  
<template>
    <div>
        <Row>
            <data-table 
                ref="test" 
                :withTree="showtree" 
                :autoInitTable="false"
                :useZtree="false"
                :treeTitle="'部门'"
                :treeParams="cities"
                :treeUrl="'/$admin/depts/authtree'" 
                @on-select-change="selectTreeChange"

                :url="'/check/fishingGroup/list'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="3">
                                <!-- <Form-item label="编组类型:":label-width="64"> -->
                                    <Select v-model="query.type" @on-change="bianzuStyle" placeholder="正式编组">
                                        <Option value="1">正式编组</Option>
                                        <Option value="2">临时编组</Option>
                                    </Select>
                                <!-- </Form-item> -->
                            </Col>
                            <Col span="4" style="margin-left: 10px;">
                                <Form-item label="编组名:">
                                    <Input v-model="query.wheres.groupname"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="4" style="margin-left: 10px;">
                                <Form-item label="船名号:">
                                    <Input v-model="query.wheres.shipname"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="2" style="float:right;text-align:right;">
                                <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                            </Col>
                            <div class="btn-wrap">
                                <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                <Button @click="handleReset()"  >重置</Button>
                                <Checkbox true-value="1" v-model="query.wheres.sub" false-value="0" @on-change="handleSearch">子部门</Checkbox>
                            </div>
                        </Row>
                    </Form>
                </div>
            </data-table>
        </Row>
        <!-- 新增 -->
        <Modal v-model="modalStatus.newAddModal" title="编组渔船登记表" width="900px" :mask-closable="maskclosable">
            <Form :label-width="74" :model="newAddParams" ref="newAddParams" :rules="rules">
                <Row v-if="showCheckMsg">
                    <Col span="8">
                        <Form-item label="编组名称:" prop="name":label-width="76">
                            <Input v-model="newAddParams.name" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="组长姓名:" prop="groupLeader" :label-width="92">
                            <Input v-model="newAddParams.groupLeader" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="联系方式:" prop="groupLeaderTel" :label-width="92">
                            <Input v-model="newAddParams.groupLeaderTel" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row v-if="showCheckMsg">
                    <Col span="8">
                        <Form-item label="组长船名号:" :label-width="76">
                            <Input v-model="newAddParams.groupShipname" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="安全联络员姓名:" prop="safeLiaison" :label-width="128">
                            <Input v-model="newAddParams.safeLiaison" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="联系方式:" prop="safeLiaisonTel" :label-width="92">
                            <Input v-model="newAddParams.safeLiaisonTel" :maxlength=255 placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <div  style="max-height:398px;overflow: auto;">               
                    <Row  v-for="(item,index) in newAddParams.ships" :key="index">
                        <Col span="20" class="titles">
                            <h4 style="text-align: left;">{{"编组渔船"+parseInt(index+1)+":"}}</h4>
                        </Col>
                        <!-- 删除按钮 -->
                        <Col span="4" style="text-align: right;">
                            <Button type="primary" @click="zuZhangship(item)" size="small">设为组长</Button>
                            <Button type="error" @click="deleteBzShip(index,item)" size="small">删除</Button>
                        </Col>
                        <Col span="6">
                            <Form-item label="船名号:">
                                <Input v-model="item.shipname" :maxlength=255 placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="船东姓名:">
                                <Input v-model="item.owner" :maxlength=255 placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="联系方式:">
                                <Input v-model="item.tel" :maxlength=255 placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="作业方式:" :lable-width="94">
                                <Input v-model="item.workmode" :maxlength=255 placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="船质:" :lable-width="58">
                                <Input v-model="item.shipmate" :maxlength=255 placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="功率:" :lable-width="58">
                                <Input v-model="item.power" :maxlength=255 placeholder="请输入...">
                                    <span slot="append">千瓦</span>
                                </Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="频率:" :lable-width="58" v-show="isFrequency">
                                <Input v-model="item.frequency" :maxlength=255 placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="排序:">
                                <Input v-model="item.sort" :maxlength=255 placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="24">
                            <Form-item label="备注:">
                                    <Input v-model="item.note" type="textarea" :autosize="{minRows: 1,maxRows: 2}"></Input> 
                            </Form-item>
                        </Col>
                    </Row>
                </div>
            </Form>
            <div slot="footer">
                <Button v-show="btnShow" @click="modalStatus.newAddModal = false">取消</Button>
                <Button v-show="btnShow" @click="selectShipModal()" type="success" icon="ios-add">添加渔船</Button>
                <Button v-show="btnShow" type="info" @click="saveData('newAddParams')">保存</Button>
                <Button v-show="!btnShow" type="info" @click="modalStatus.newAddModal = false">关闭</Button>
            </div>
        </Modal>
        <!-- 查看 -->
        <Modal v-model="modalStatus.check" title="编组渔船登记表" width="900px" :mask-closable="maskclosable">
            <Form :label-width="74">
                <Row>
                    <Col span="8">
                        <Form-item label="编组名称:" :label-width="76">
                            <Input v-model="newAddParams.name" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="组长姓名:" :label-width="90">
                            <Input v-model="newAddParams.groupLeader" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="联系方式:" :label-width="90">
                            <Input v-model="newAddParams.groupLeaderTel" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="组长船名号:" :label-width="76">
                            <Input v-model="newAddParams.groupShipname" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="安全联络员姓名:" :label-width="126">
                            <Input v-model="newAddParams.safeLiaison" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="联系方式:" :label-width="90">
                            <Input v-model="newAddParams.safeLiaisonTel" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <div style="max-height:400px;overflow: auto;">
                            <Table 
                                :columns="columnsBShipsIF" 
                                :data="dataListShips" 
                                border 
                            ></Table>
                        </div>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button type="info" @click="modalStatus.check = false">关闭</Button>
            </div>
        </Modal>
        <!-- 通信 -->
            <Modal v-model="modalStatus.infromMsgModal" :styles="{'max-height':'800px',overflow:'auto'}" title="通信" width="900px" :mask-closable="maskclosable">
                <Form :label-width="82">
                    <Row>
                        <Col span="24" style="margin-bottom:10px;">
                            <h3 style="text-align: left;">编组渔船信息：</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" style="max-height: 300px;overflow: auto;">
                            <table>
                                <tr>
                                    <td class="td1">选择</td>
                                    <td class="td2">船名号</td>
                                    <td class="td3">关联人</td>
                                </tr>
                                <tr v-for="(item,i) in trMsgs" :key="item.shipname">
                                    <td>
                                        <Checkbox v-model="item.selAll" @on-change="handleChange(item)"></Checkbox>
                                    </td>
                                    <td>{{item.shipname}}</td>
                                    <td class="tdL">
                                        <span class="margS"></span>
                                        船东：<Checkbox @on-change="handleChangeSelAllIF(item)" v-model="item.ownerSel">{{item.owner}}({{item.ownerTel}})</Checkbox>
                                        <span class="jiange1"></span>
                                        <span v-if="item.drlcPic!=undefined">
                                            定人联船责任人：<Checkbox @on-change="handleChangeSelAllIF(item)" v-model="item.drlcSel">{{item.drlcPic}}({{item.drlcPictel}})</Checkbox>
                                        </span>
                                        <span v-if="item.jhr!=undefined" style="display: block;width:100%; border-bottom:1px solid rgba(233, 234, 236,0.6);margin:2px 0px;"></span>
                                        <span v-if="item.jhr!=undefined">
                                            监护人：<span v-for="(v,index) in item.jhr" :key="v.jhrSel">
                                                <Checkbox @on-change="handleChangeSelAllIF(item)" v-model="v.jhrSel">{{v.jhrname}}({{v.jhrTel}})</Checkbox>
                                                <span class="jiange2"></span>
                                            </span>
                                        </span>
                                        <span class="margX"></span>
                                    </td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" class="titles2">
                            <h3 style="text-align: left;">短信内容：</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Input v-model="queryMessage.wheres.content" type="textarea" :autosize="{minRows: 3,maxRows: 4}" placeholder="请输入..."></Input>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button type="info" @click="informMsg()">发送</Button>
                    <Button @click="modalStatus.infromMsgModal = false">取消</Button>
                </div>
            </Modal>
            <!-- :disableUrlParams="" -->
            <!-- <selectShip 
                :multiple="true"
                :cutomsUrl="selectShipDic.cutomsUrl"
                :cutomsUrlParams="selectShipDic.cutomsUrlParams"
                :cutomsColumns="selectShipDic.cutomsColumns"
                :text="selectShipDic.text"
                :disableUrl="selectShipDic.disableUrl"
                :disableUrlParams="selectShipDic.disableUrlParams"  
                :disableShips="selectShipDic.disableShips" 
                v-model="status.showSelectShip" 
                @on-selectedList="addShips">
                多选模式参数  multiple 是否多选； disableUrl 获取不可勾选渔船名列表  disableShips 已勾选渔船 
            </selectShip> -->
            <selectShip 
                v-model="status.showSelectShip" 
                :multiple="true"
                shipUrl="/check/fishingGroup/findPageCus"
                :shipList="newAddParams.ships"
                :delRelation="delRelation"
                @on-select-ship="onSelectShip"
                >
            </selectShip>
    </div>     
</template>
<script>
import {isNull } from '@/libs/common.js'  
import user from '@/store/module/user.js';
import selectShip from "@/views/components/selectModal/selectShipForBianzunew.vue";
import userObj from '@/store/module/userId.js';
var dept=user.state.userInfo.dept;
export default {
    name: 'bianzu',
    components: {
        selectShip,
    },
    data () {
        return {  
            ifEdit: true,
            isFrequency: true,
            adminMng:false,
            iSmanager:false,
            copyTel:[],

            showCheckMsg:true,
            maskclosable:false,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            disableUrlParams:{
                groupId:"",
            },
            urlParams: {
                page: 1,
                size: 10,
                wheres: {
                    shipname:"",
                    groupId: "",
                },
            },
            columnsSelectShip: [
                {
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: "序号",
                    type: "index",
                    width: 80,
                    align: "center"
                },
                {
                    key: "shipname",
                    title: "渔船名称",
                    align: "center"
                },
                {
                    key: "owner",
                    title: "渔船所有人",
                    align: "center"
                },
                {
                    key: "tel",
                    title: "联系电话",
                    align: "center"
                },
            ],
            rules:{
                name: [
                    { required: true, message: '编组名称不能为空', trigger: 'blur' }
                    
                ],
                groupLeader: [
                    { required: true, message: '组长名称不能为空', trigger: 'blur' }
                    
                ],
                groupLeaderTel: [
                    { required: true, message: '联系方式不能为空', trigger: 'blur' },
                    { type: 'string',pattern:/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,message:'请填写正确的手机号', trigger:'blur'},                  
                ],
                safeLiaison: [
                    { required: true, message: '联络员不能为空', trigger: 'blur' }
                    
                ],
                safeLiaisonTel: [
                    { required: true, message: '联系方式不能为空', trigger: 'blur' },
                    { type: 'string',pattern:/^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,message:'请填写正确的手机号', trigger:'blur'},  
                ],
            },
            cities:{
                containOrgan:false,
                type:"includes:5,20,30,35"
            },
            // 所有渔船信息
            status:{
                selectShip:false,
                showSelectShip: false,
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
                // title: "序号",
                // type: "index",
                type:"selection",
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
            ],
            selectShipList: [],
            //编组渔船信息
            dataListShips:[],   
            columnsBShipsIF: [
                {
                    title: "序号",
                    type: "index",
                    maxWidth: 70,
                    align: "center"
                },
                {
                    key: "shipname",
                    title: "船名号",
                    ellipsis:false,
                    align: "center"
                },
                {
                    key: "owner",
                    title: "船东姓名",
                    ellipsis:true,
                    align: "center"
                },
                {
                    key: "tel",
                    title: "联系方式",
                    align: "center"
                },
                {
                    key: "workmode",
                    title: "作业方式",
                    align: "center"
                },
                {
                    key: "power",
                    title: "功率(千瓦)",
                    maxWidth: 120,
                    align: "center"
                },
                {
                    key: "shipmate",
                    title: "船质",
                    maxWidth: 75,
                    align: "center"
                },
                // {
                //     key: "frequency",
                //     title: "频率",
                //     maxWidth: 75,
                //     align: "center"
                // },
                {
                    key: "note",
                    title: "备注",
                    maxWidth: 75,
                    ellipsis:true,
                    align: "center"
                },
            ],
            selectedShips:[],
            modalStatus:{
                newAddModal:false,
                infromMsgModal:false,
                check:false,
            },
            newAddParams:{
                deptid:"",//关联的部门id
                name:"",//组名
                groupLeader:"",//组长
                groupShipname:"",
                groupLeaderTel:"",//组长电话
                safeLiaison:"",//安全联络员
                safeLiaisonTel:"",//安全联络员电话
                ships:[],//渔船列表
            },
            shipParams:{
                shipid:"",//渔船id
                shipname:"",//渔船name
                owner:"",//船长
                workmode:"",// 作业方式
                shipmate:"",// 船质
                power:"",// 功率
                frequency:"",//频率
                tel:"",// 联系方式
                note:"",//备注
                sort:"",
            },
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 70,
                    // ellipsis:true,
                    align: 'center',
                },
                {
                    title: '编组名',
                    align: 'center',
                    key: 'name',
                    minWidth:80
                },
                {
                    title: '组长',
                    align: 'center',
                    key: 'groupLeader',
                    minWidth:80
                },
                {
                    title: '组长联系方式',
                    align: 'center',
                    minWidth:120,
                    key: 'groupLeaderTel'
                },
                {
                    title: '安全联络员',
                    align: 'center',
                    minWidth:100,
                    key: 'safeLiaison'
                },
                {
                    title: '安全联络员联系方式',
                    align: 'center',
                    minWidth:150,
                    key: 'safeLiaisonTel'
                },
                {
                    title: '部门',
                    align: 'center',
                    key: 'deptname',
                    minWidth:80
                },
                {
                    title: '创建人',
                    align: 'center',
                    key: 'creatorName',
                    minWidth:80
                },
                {
                    title: '操作',
                    align: 'center',
                    width:250,
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var temp = [];
                        if(_self.query.type=="1"){
                            // if(_self.iSmanager || _self.adminMng){
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "success",
                                            size: "small"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.informMsgModal(params.row);
                                            }
                                        }                       
                                    },"通信"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
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
                                                _self.watchMsg(params.row);
                                            }
                                        }                       
                                    },"查看"));
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
                            // }else{
                            //     if(userObj.userId==params.row.creatorId){
                            //         temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "success",
                            //                     size: "small"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.informMsgModal(params.row);
                            //                     }
                            //                 }                       
                            //             },"通信"));
                            //         if(_self.query.type=="1"){
                            //             temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "primary",
                            //                     size: "small"
                            //                 },
                            //                 style:{
                            //                     marginLeft:"10px"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.handleEdit(params.row);
                            //                     }
                            //                 }                       
                            //             },"编辑"));
                            //         }
                            //     }
                            //     temp.push(
                            //         h("Button",
                            //         {
                            //             props: {
                            //                 type: "info",
                            //                 size: "small"
                            //             },
                            //             style:{
                            //                 marginLeft:"10px"
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     _self.watchMsg(params.row);
                            //                 }
                            //             }                       
                            //         },"查看"));
                            //     if(userObj.userId==params.row.creatorId){
                            //         if(_self.query.type=="1"){
                            //             temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "error",
                            //                     size: "small"
                            //                 },
                            //                 style:{
                            //                     marginLeft:"10px"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.delete(id);
                            //                     }
                            //                 }                       
                            //             },"删除"));
                            //         }
                            //     }
                            // }
                        }else{
                            // if(_self.iSmanager){
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "success",
                                            size: "small"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.informMsgModal(params.row);
                                            }
                                        }                       
                                    },"通信"));
                                // temp.push(
                                //     h("Button",
                                //     {
                                //         props: {
                                //             type: "primary",
                                //             size: "small"
                                //         },
                                //         style:{
                                //             marginLeft:"10px"
                                //         },
                                //         on:{
                                //             click:()=>{
                                //                 _self.handleEdit(params.row);
                                //             }
                                //         }                       
                                //     },"编辑"));
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
                                                _self.watchMsg(params.row);
                                            }
                                        }                       
                                    },"查看"));
                                // temp.push(
                                //     h("Button",
                                //     {
                                //         props: {
                                //             type: "error",
                                //             size: "small"
                                //         },
                                //         style:{
                                //             marginLeft:"10px"
                                //         },
                                //         on:{
                                //             click:()=>{
                                //                 _self.delete(id);
                                //             }
                                //         }                       
                                //     },"删除"));
                            // }else{
                            //     if(userObj.userId==params.row.creatorId){
                            //         temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "success",
                            //                     size: "small"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.informMsgModal(params.row);
                            //                     }
                            //                 }                       
                            //             },"通信"));
                            //         if(_self.query.type=="1"){
                            //             temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "primary",
                            //                     size: "small"
                            //                 },
                            //                 style:{
                            //                     marginLeft:"10px"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.handleEdit(params.row);
                            //                     }
                            //                 }                       
                            //             },"编辑"));
                            //         }
                            //     }
                            //     temp.push(
                            //         h("Button",
                            //         {
                            //             props: {
                            //                 type: "info",
                            //                 size: "small"
                            //             },
                            //             style:{
                            //                 marginLeft:"10px"
                            //             },
                            //             on:{
                            //                 click:()=>{
                            //                     _self.watchMsg(params.row);
                            //                 }
                            //             }                       
                            //         },"查看"));
                            //     if(userObj.userId==params.row.creatorId){
                            //         if(_self.query.type=="1"){
                            //             temp.push(
                            //             h("Button",
                            //             {
                            //                 props: {
                            //                     type: "error",
                            //                     size: "small"
                            //                 },
                            //                 style:{
                            //                     marginLeft:"10px"
                            //                 },
                            //                 on:{
                            //                     click:()=>{
                            //                         _self.delete(id);
                            //                     }
                            //                 }                       
                            //             },"删除"));
                            //         }
                            //     }
                            // }
                        }
                        
                        return h("div", temp);
                    }
                },
            ],
            dataList: [],
            query:{
                key:"",//deptid 传空默认为当前用户的部门提升后的部门id
                type:"1",
                page:1,
                size:10,
                wheres:{
                    groupname:"",//编组名检索
                    shipname:"",//搜索渔船名
                    sub:"1",//是否显示子部门，“1”表示显示
                    
                },
            },
            queryMessage:{
                key:"",//编组 id
                wheres:{
                    // shipNames:[],//渔船名数组
                    // jhr:true,//是否发送监护人
                    // drlc:true,//是否发送定人联船责任人
                    content:"",//发送短信的内容
                    tels:[],
                },
            },
            shipNamesMsg:[],
            title:"",
            shipmsgs:[],
            shipNames:"",
            btnShow:true,
            deptid:"",
            showShips:true,
            deleteUpdate:[],
            groupId:"",
            showtree:false,
            node:[],
            scrollShow:true,
            selectedShipName:"",
            ///////
            contacts:[],//总船数和关联人
            trMsgs:[],
        }
    },
    computed:{  
        selectShipDic() {
            if(this.query.type == "1"){
                return {
                    cutomsUrl:"/check/fishingGroup/shipsPage",
                    cutomsUrlParams: this.urlParams,
                    cutomsColumns:this.columnsSelectShip,
                    text:"已在其他编组中或已加入当前组的渔船不可选中，请在对应编组删除编组后操作。",
                    disableUrl:"/check/fishingGroup/grouped",
                    disableUrlParams:this.disableUrlParams,
                    disableShips:this.selectedShips,
                };
            } else {
                return {
                    cutomsUrl:"",
                    cutomsUrlParams:{},
                    cutomsColumns:[],
                    text:"",
                    disableUrl:"",
                    disableUrlParams:{},
                    disableShips:this.selectedShips,
                };
            }
        }
    },
    watch:{
        deleteUpdate(v){
            this.showShips=true;
        },
    },
    methods: {
        zuZhangship(item){
            this.showCheckMsg=false;
            this.newAddParams.groupLeader=item.owner;
            this.newAddParams.groupShipname=item.shipname;
            this.newAddParams.groupLeaderTel=item.tel;
            this.showCheckMsg=true;
        },
        bianzuStyle(v){
            if(v=="1"){
                this.query.type="1";
                this.initSearch();
            }else if(v=="2"){
                this.query.type="2";
                this.initSearch();
            }
        },

        selectShipModal(){
            this.status.showSelectShip = true;
            this.disableUrlParams.groupId=this.groupId;
            this.urlParams.wheres.groupId=this.groupId;
            this.selectedShips=[];
            var sps=[];
            var ships=this.newAddParams.ships;
            for(var i=0;i<ships.length;i++){
                sps[i]=ships[i].shipname;
            }
            this.selectedShips=sps;
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
        deleteBzShip(i,v){
            // this.newAddParams.groupLeader=item.owner;
            // this.newAddParams.groupShipname=item.shipname;
            // this.newAddParams.groupLeaderTel=item.tel;
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除此条编组渔船吗？",
                onOk:function(){
                    _self.showShips=false;
                    if(v.shipname==_self.newAddParams.groupShipname){
                        _self.newAddParams.groupShipname="";
                    }
                    if(v.owner==_self.newAddParams.groupLeader){
                        _self.newAddParams.groupLeader="";
                    }
                    if(v.tel==_self.newAddParams.groupLeaderTel){
                        _self.newAddParams.groupLeaderTel="";
                    }
                    _self.newAddParams.ships.splice(i,1);
                    _self.deleteUpdate=_self.newAddParams.ships;
                }
            });
        },
        addShips(selectList){//渔船信息弹窗 确定按钮
            var _self=this;
            var names=[];
            var shipmsgs=[];
            for(var i=0;i<selectList.length;i++){
                var obj={};
                var vs=selectList[i];
                obj['shipid']=vs.id;
                obj['shipname']=vs.shipname;
                obj['owner']=vs.owner;
                obj['workmode']=vs.workmode;
                obj['shipmate']=vs.shipmate;
                obj['power']=vs.power;
                obj['frequency']="";//频率?暂设为空
                obj['tel']=vs.tel;
                obj['note']="";
                obj['sort']="";
                names[i]=vs.shipname;
                shipmsgs.push(obj);
            }
            this.shipNames=names;
            this.shipmsgs=shipmsgs;//所有渔船信息

            var ships=this.newAddParams.ships;
            var shipNames=this.shipNames;
            this.selectedShipName="";
            var errors=[];
            for(var j=0;j<shipNames.length;j++){
                for(var h=0;h<ships.length;h++){
                    if(shipNames[j]==ships[h].shipname){
                        errors.push(shipNames[j]);
                    }
                }
            }

            for(var i=0;i<shipmsgs.length;i++){
                _self.newAddParams.ships.push(shipmsgs[i]);
            }
            if(_self.newAddParams.ships.length!=0){
                _self.scrollShow=true;
            }
            _self.status.selectShip=false;
        },


        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            this.query.wheres.shipname="";
            this.query.wheres.groupname="";
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        selectTreeChange(treeNode){//树选择触发事件
            this.query.key=treeNode[0].id;
            this.deptid=treeNode[0].id;
            this.node=treeNode;
            this.initSearch();
        },
        handleSearch(){//子部门 选择
            this.initSearch();
        },


        informMsgModal(row){//通信
            this.queryMessage.wheres.content="";
            this.title="通信";
            this.copyTel=[];
            this.getMsg(row);
        },
        informMsg(){//通信 发送按钮
            var _self=this;
            var tels=[];
            for(var i=0;i<this.trMsgs.length;i++){
                const trMsg=this.trMsgs[i];
                if(trMsg.drlcSel!=undefined){
                    if(trMsg.drlcSel){
                        tels.push(trMsg.drlcPictel);
                    }
                }
                if(trMsg.ownerSel!=undefined){
                    if(trMsg.ownerSel){
                        tels.push(trMsg.ownerTel);
                    }
                }
                if(trMsg.jhr!=undefined){
                    for(var k=0;k<trMsg.jhr.length;k++){
                        if(trMsg.jhr[k].jhrSel){
                            tels.push(trMsg.jhr[k].jhrTel);
                        }
                    }
                }
            }
            _self.queryMessage.wheres.tels=tels;
            if(_self.queryMessage.wheres.tels.length==0){
                this.$Message.error("请选择发送人员");
                return ;
            }
            if(_self.queryMessage.wheres.content==""){
                this.$Message.error("短信内容不能为空");
                return ;
            }
            _self.$http.post("/check/fishingGroup/communication",_self.queryMessage)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("发送成功");
                    _self.modalStatus.infromMsgModal=false;
                }else{
                    _self.$Message.error(res.msg);
                }
            });
        },
        handleChangeSelAllIF(v){
            var arr=[];
            if(v.drlcSel!=undefined){
                arr.push(v.drlcSel);
            }
            arr.push(v.ownerSel);
            if(v.jhr!=undefined){
                for(var i=0;i<v.jhr.length;i++){
                    arr.push(v.jhr[i].jhrSel);
                }
            }
            var count=0;
            for(var k=0;k<arr.length;k++){
                if(arr[k]){
                    count++;
                }
            }
            for(var h=0;h<this.trMsgs.length;h++){
                if(this.trMsgs[h].shipname==v.shipname){
                    if(count<arr.length){
                        this.trMsgs[h].selAll=false;
                    }else{
                        this.trMsgs[h].selAll=true;
                    }
                }
            }
        },
        handleChange(v){
            if(!v.selAll){
                for(var i=0;i<this.trMsgs.length;i++){
                    if(this.trMsgs[i].shipname==v.shipname){
                        if(this.trMsgs[i].drlcSel!=undefined){
                            this.trMsgs[i].drlcSel=false;
                        }
                        this.trMsgs[i].ownerSel=false;
                        if(this.trMsgs[i].jhr!=undefined){
                            for(var h=0;h<this.trMsgs[i].jhr.length;h++){
                                this.trMsgs[i].jhr[h].jhrSel=false;
                            }
                        }
                        break;
                    }
                }
            }else{
                for(var i=0;i<this.trMsgs.length;i++){
                    if(this.trMsgs[i].shipname==v.shipname){
                        if(this.trMsgs[i].drlcSel!=undefined){
                            this.trMsgs[i].drlcSel=true;
                        }
                        this.trMsgs[i].ownerSel=true;
                        if(this.trMsgs[i].jhr!=undefined){
                            for(var h=0;h<this.trMsgs[i].jhr.length;h++){
                                this.trMsgs[i].jhr[h].jhrSel=true;
                            }
                        }
                        break;
                    }
                }
            }
        },
        getMsg(msg){
            var _self=this;
            _self.groupId=msg.id;
            _self.$http.get("/check/fishingGroup/communicationPage?id="+msg.id)
            .then(res=>{
                if(res.success){
                    // console.log(res,"fsdf");
                    _self.contacts=res.data.contacts;
                    _self.dataListShips=res.data.group.ships;
                    _self.trMsgs=[];
                    for(var i=0;i<_self.dataListShips.length;i++){
                        var trMsgs={};
                        trMsgs.selAll=false;
                        trMsgs.shipname=_self.dataListShips[i].shipname;
                        const sn=trMsgs.shipname;
                        trMsgs.ownerSel=false;
                        trMsgs.owner=_self.dataListShips[i].owner;
                        trMsgs.ownerTel=_self.dataListShips[i].tel;
                        if(_self.contacts[sn].drlc!=undefined){
                            trMsgs.drlcSel=false;
                            trMsgs.drlcPic=_self.contacts[sn].drlc.pic;
                            trMsgs.drlcPictel=_self.contacts[sn].drlc.picTel;
                        }
                        if(_self.contacts[sn].jhr.length!=0){
                            trMsgs.jhr=_self.contacts[sn].jhr;
                            const jhr=trMsgs.jhr;                          
                            for(var k=0;k<jhr.length;k++){
                                trMsgs.jhr[k]["jhrSel"]=false;
                            }
                        }
                        _self.trMsgs.push(trMsgs);
                    }
                    _self.queryMessage.key=res.data.group.id;
                    _self.newAddParams=res.data.group;
                    if(_self.title=="查看"){
                        _self.modalStatus.check=true;
                    }else if(_self.title=="通信"){
                        _self.modalStatus.infromMsgModal=true;
                    }else{
                        _self.modalStatus.newAddModal=true;
                    }
                }
            });
        },



        newAdd(){
            // if(this.node.length==0&&this.showtree==true){
            //     this.$Message.error("请先选择部门");
            //     return ;
            // }
            this.newAddParams={};
            //上面的 addShips()方法问题
            this.newAddParams.ships=[];
            this.newAddParams.type = this.query.type;
            // 初始化渔船选择组件参数
            

            this.scrollShow=false;
            this.groupId="";
            this.title="新增";
            this.isFrequency = false
            this.ifEdit = true
            this.btnShow=true;
            this.$refs["newAddParams"].resetFields();
            this.modalStatus.newAddModal=true;
        },
        dbhandleEdit(msg){
            this.newAddParams={};
            this.title="查看";
            this.ifEdit = true
            this.isFrequency = false
            this.btnShow=false;
            this.$refs["newAddParams"].resetFields();
            this.getMsg(msg);
        },
        watchMsg(row){
            this.newAddParams={};
            this.title="查看";
            this.isFrequency = false
            this.ifEdit = true
            this.btnShow=false;
            this.$refs["newAddParams"].resetFields();
            this.getMsg(row);
        },
        handleEdit(row){
            this.newAddParams={};
            this.scrollShow=true;
            this.title="编辑";
            this.isFrequency = false
            this.ifEdit = true
            this.btnShow=true;
            this.$refs["newAddParams"].resetFields();
            this.getMsg(row);
        },
        delete(id){
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除此编组吗？",
                onOk:function(){
                    _self.$http.delete("/check/fishingGroup/"+id)
                    .then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.info('删除成功');
                        }else{
                            this.$Message.error(result.msg);
                        }
                    });
                }
            });
        },
        saveData(name){
            var _self=this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(_self.newAddParams.id==undefined || isNull(_self.newAddParams.id)){
                        var urls="";
                        if(_self.query.type=="1"){
                            urls="/check/fishingGroup";
                        }else if(_self.query.type=="2"){
                            urls="/check/fishingGroup/dynamic";
                        }
                        _self.newAddParams.deptid=_self.deptid;
                        _self.newAddParams.creatorName=userObj.name;
                        _self.$http.post(urls,_self.newAddParams)
                        .then(res=>{
                            if(res.success){
                                _self.initSearch();
                                _self.modalStatus.newAddModal=false;
                                _self.$Message.info("新增成功");
                            }else{
                                _self.$Message.error(res.msg);
                            }
                        });
                    }else{
                        _self.$http.patch("/check/fishingGroup/update",_self.newAddParams)
                        .then(res=>{
                            if(res.success){
                                _self.initSearch();
                                _self.modalStatus.newAddModal=false;
                                _self.$Message.info("编辑成功");
                            }else{
                                _self.$Message.error(res.msg);
                            }
                        });
                    }
                }
            });
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
                this.query.wheres.shipname = query.shipName;
            }
            this.query.type = "1";
            this.initSearch();
        },
        onSelectShip(selectships){
            // console.log(selectships);
            // var ships=this.newAddParams.ships;
            // for(var i=0;i<selectships.length;i++){
            //     var flag=false;
            //     var vs=selectships[i];
            //     for(var j=0;j<ships.length;j++){
            //         if(vs.shipname==ships[j].shipname){
            //             flag=true;
            //             break;
            //         }
            //     }
            //     if(flag) continue;
            //     var obj={};
            //     obj['shipid']=vs.id;
            //     obj['shipname']=vs.shipname;
            //     obj['owner']=vs.owner;
            //     obj['workmode']=vs.workmode;
            //     obj['shipmate']=vs.shipmate;
            //     obj['power']=vs.power;
            //     obj['frequency']="";//频率?暂设为空
            //     obj['tel']=vs.tel;
            //     obj['note']="";
            //     obj['sort']="";
            //     ships.splice(ships.length,0,obj);
            // }
            // console.log(this.newAddParams.ships);
            this.newAddParams.ships=selectships;
        },
        delRelation(ship, callback){
            console.log(ship);
            this.$http.delete("/check/fishingGroup/exit",{
                params:{
                    shipid:ship.shipid
                }
            })
            .then(res=>{
                if(res.success){
                    callback();
                }
                this.$Message.error(res.msg);
            });
    }
    },
    beforeMount() {
        if(dept.type=="5"){
            this.showtree=false;
            this.query.key=dept.id;
            this.deptid=dept.id;
        }else{
            this.showtree=true;
        }
        if(this.$hasRoles("ADMIN")){
            this.adminMng=true;
        }else{
            if(this.$hasRoles("coopAdmin") || this.$hasRoles("cooperative")){
                this.iSmanager=true;
            }else{
                this.iSmanager=false;
            }
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
.titles{
    margin-bottom:10px;
}
.titles2{
    margin:10px 0px;
}
table{
    width:100%;
    max-height:300px;
    border:1px solid rgb(233, 234, 236);
    text-align: center;
    border-collapse: collapse;
    border-spacing: 10px;
}
table>tr,table>td{
    min-height:40px;
    border:1px solid rgb(233, 234, 236);
}
table>tr>td.td1{
    width:60px;
}
table>tr>td.td2{
    width:250px;
}
table>tr>td.tdL{
    text-align: left;
}
td.td1,td.td2,td.td3{
    font-size: 14px;
    font-weight: bold;
    height:30px;
}
span.jiange1{
    display: inline-block;
    width:20px;
}
span.jiange2{
    display: inline-block;
    width:10px;
}
span.margS{
    display: block;
    margin-top:10px;
}
span.margX{
    display: block;
    margin-bottom:10px;
}
</style>
                
    
    
    