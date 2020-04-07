<template>
    <div>
        <data-table ref='main'
            :withTree="true"
            :useZtree="false"
            :treeUrl="'/$admin/depts/illegalShipTree'"
            :treeParams="treeQuery"
            :treeTitle="'组织机构'"
            :url="tableUrl"
            :params="query"
            :columns="columns"
            @on-select-change="selectTreeChange"
            @on-selection-change="selectTable"
            :autoInitTable = "false"
        >
        <div slot="search">
            <Form :label-width="100" @submit.native.prevent>
                <Row>
                    <Col span="4">
                        <Form-item label="船名号:">
                            <Input v-model="query.wheres.shipName_like" @on-keydown.enter="''" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="起始时间:">
                            <DatePicker v-model="query.wheres.beginTime" @on-change="initSearch" type="date" placeholder="请选择日期" format="yyyy-MM-dd"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="4">
                    <Form-item label="结束时间:">
                            <DatePicker v-model="query.wheres.endTime" @on-change="initSearch" type="date" placeholder="请选择日期" format="yyyy-MM-dd"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="是否移送司法机关:" :label-width='120'>
                            <Select clearable placeholder="请选择..." @on-change="initSearch" v-model="query.wheres.deportationToJA">
                                <Option value='是'>是</Option>
                                <Option value='否'>否</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item clearable label="船舶类型:">
                            <Select v-model="query.wheres.shipType" @on-change="initSearch" placeholder="请选择...">
                                <Option value="本市三无船">本市三无船</Option>
                                <Option value="本省外市三无船">本省外市三无船</Option>
                                <Option value="外省三无船">外省三无船</Option>
                            </Select>
                        </Form-item>
                    </Col>                                                    
                </Row>
                <Row>
                    <Col span="4">
                        <Form-item label="状态查询:">
                            <Select clearable placeholder="请选择..." @on-change="initSearch" v-model="query.wheres.status">
                                <Option value="全部">全部</Option>
                                <Option value="0">未结案</Option>
                                <Option value="9">已结案</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="4">
                        <Form-item label="移交状态:">
                            <Select clearable v-model="turnOver_status" @on-change="selectTurnOver">
                                <Option value="0">我移交的案件</Option>
                                <Option value="1">移交给我的案件</Option>
                            </Select>
                        </Form-item>
                    </Col>                    
                    <Col span="4">
                        <Form-item label="船长:">
                            <Select clearable v-model="query.wheres.shipLength" @on-change="initSearch" placeholder="请选择...">
                                <Option value="12米以下">12米以下</Option>
                                <Option value="12米至24米">12米至24米</Option>
                                <Option value="24米以上">24米以上</Option>
                            </Select>
                        </Form-item>
                    </Col> 
                    <Col span="6">
                        <Form-item label="违规行为:">
                            <Input v-model="query.wheres.unlawfulAct" placeholder="请选择..">
                                <span slot="append" @click="discretionary.show1=true">选择</span>
                            </Input>
                        </Form-item>
                    </Col>  
                    <div class="btn-wrap">
                        <Button @click="initSearch" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset" >重置</Button>
                    </div>
                    <span style="float:right;margin-bottom:10px">                                                                         
                        <ButtonGroup >
                            <Button @click="newWin" type="info" icon="ios-add" v-show="ifAdd">新增</Button>
                            <Button  @click="turnOver" type="success"  :disabled="!visable" icon="ios-folder">移交案件</Button>
                        </ButtonGroup> 
                    </span>                                                                                                           
                </Row>                                                                                      
            </Form>
        </div>
        </data-table>
        <!-- 新增修改弹窗 -->
        <Modal v-model="modalStatus.newAddModal" :styles="{top: '80px'}" :title="title" width="1200px" :mask-closable="false">
            <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
                <Row>
                    <Col span="12">
                        <FormItem label="填报单位:">
                            <Input v-model="info.reportedDept" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="查获时间:" prop="examineTime">
                            <DatePicker v-model="info.examineTime" type="date" placeholder="请选择日期" :disabled="ifEdit" format="yyyy-MM-dd"></DatePicker>
                        </FormItem>                        
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="查获地点:" prop="place">
                            <Select placeholder="请选择..." @on-change="areaSelect" v-model="info.place" :disabled="ifEdit">
                                <Option value="港口">港口</Option>
                                <Option value="海上">海上</Option>
                                <Option value="陆上">陆上</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if="isShow_area">
                        <FormItem :label="areaLabel">
                            <Input v-model="info.portName" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="!isShow_area">
                        <FormItem label="渔区:">
                            <Input v-model="info.area" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="!isShow_area">
                        <FormItem label="小区:">
                            <Input v-model="info.smallArea" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>                    
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="违规主体:">
                            <Select placeholder="请选择..." v-model="info.subject" :disabled="ifEdit">
                                <Option value="船舶">船舶</Option>
                                <Option value="非船舶">非船舶</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12" v-if="this.info.subject == '船舶'">
                        <FormItem label="船舶类型:" prop="shipType">
                            <Select placeholder="请选择..." v-model="info.shipType" :disabled="ifEdit">
                                <Option value="本市三无船">本市三无船</Option>
                                <Option value="本省外市三无船">本省外市三无船</Option>
                                <Option value="外省三无船">外省三无船</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <div v-if="this.info.subject == '船舶'">
                    <Row>
                        <Col span="8">
                            <FormItem label="船名号:" prop="shipName">
                                <Input v-model="info.shipName" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="船长(米):" prop="shipLength">
                                <Select placeholder="请选择..." v-model="info.shipLength" :disabled="ifEdit">
                                    <Option value="12米以下">12米以下</Option>
                                    <Option value="12米至24米">12米至24米</Option>
                                    <Option value="24米以上">24米以上</Option>
                            </Select>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="船舶材质:" prop="textrue">
                                <Select placeholder="请选择..." v-model="info.textrue" :disabled="ifEdit">
                                    <Option value="钢质">钢质</Option>
                                    <Option value="木质">木质</Option>
                                    <Option value="玻璃钢">玻璃钢</Option>
                                    <Option value="泡沫">泡沫</Option>
                                    <Option value="其他">其他</Option>
                            </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="实际违法人:">
                                <Input v-model="info.parts" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际违法人身份证号:" :label-width="130">
                                <Input v-model="info.realPartsIdNumber" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际违法人户籍:">
                                <Input v-model="info.realPartsCenReg" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="实际主机功率:(KW)">
                                <Input v-model="info.realPower" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际作业类型:">
                                <Input v-model="info.realWorkType" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="实际作业方式:">
                                <Input v-model="info.realWorkMode" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <div v-if="this.info.subject == '非船舶'">
                    <Row>
                        <Col span="12">
                            <FormItem label="单位名称:">
                                <Input v-model="info.cName" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="法定代表人:">
                                <Input v-model="info.legalPerson" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>                        
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="单位地址:">
                                <Input v-model="info.legalAddress" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="联系电话:">
                                <Input v-model="info.legalTel" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <FormItem label="个人姓名:">
                                <Input v-model="info.parts" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="身份证号:">
                                <Input v-model="info.realPartsIdNumber" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem label="联系电话:">
                                <Input v-model="info.tel" :readonly="ifEdit"/>
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span="8">
                        <FormItem label="案件类型:" prop="caseType">
                            <Input v-model="info.caseType" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="违规行为:" prop="unlawfulAct">
                            <Input v-model="info.unlawfulAct"   placeholder="请选择.." :readonly="ifEdit">
                                    <span slot="append"  @click="discretionary.show2=!ifEdit">选择</span>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="this.info.subject == '船舶'"> 
                    <Col span="8">
                        <FormItem label="船只暂扣情况:">
                            <Select v-model="info.shipDetain" :disabled="ifEdit">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8" v-if="this.info.shipDetain=='是'">
                        <FormItem label="船只暂扣起始时间:">
                            <DatePicker v-model="info.shipDetainTimeBegin" type="date" placeholder="请选择日期" @on-change="''" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem label="船只暂扣结束时间:" v-if="this.info.shipDetain=='是'">
                            <DatePicker v-model="info.shipDetainTimeEnd" type="date" placeholder="请选择日期" @on-change="''" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="是否移送司法机关:">
                            <Select v-model="info.deportationToJA" :disabled="ifEdit">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="8"  v-if="this.info.deportationToJA=='是'">
                        <FormItem label="移送人数:">
                            <Input :readonly="ifEdit" v-model="info.deportationToJANum"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem label="处置结果:">
                            <Select v-model="actionResult.title" @on-change="actionResultSelect" :disabled="ifEdit">
                                <Option value="没收违法所得(万元)">没收违法所得(万元)</Option>
                                <Option value="没收网具(顶)">没收网具(顶)</Option>
                                <Option value="没收渔网物(KG)">没收渔网物(KG)</Option>
                                <Option value="罚款(万元)">罚款(万元)</Option>
                                <Option value="吊销许可证">吊销许可证</Option>
                                <Option value="没收(拆解)渔船">没收(拆解)渔船</Option>
                                <Option value="其他备注">其他备注</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="isShow_actionResult1">
                        <FormItem :label="actionResultLable">
                            <Input  v-model="actionResult.num" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <Col span="6" v-if="isShow_actionResult2">
                        <FormItem label="类型:">
                            <Input  v-model="actionResult.type" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                    <!-- <Col span="4">
                        <span style="float:right;margin-bottom:10px">
                             <Button @click="addActionResult" type="primary" icon="plus-round">添加处置结果</Button>
                        </span>
                        <span style="float:right;margin-bottom:10px">
                             <Button @click="removeActionResult" type="error" icon="ios-close">删除</Button>
                        </span>                        
                    </Col> -->
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注:">
                            <Input type="textarea" :rows="2" v-model="info.comment" :readonly="ifEdit"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button v-show="btnShow" type="info"  @click="modalStatus.newAddModal=false">取消</Button>
                <Button v-show="!btnShow" type="info"  @click="modalStatus.newAddModal=false">关闭</Button>
                <Button v-show="btnShow" type="primary"  @click="submitData">{{this.btnInfo}}</Button>
            </div>                
        </Modal>
        <!-- 部门移交 -->
        <Modal v-model="modalStatus.tunOverModal" title="部门信息列表">
            <div>
                <Input v-model="treeSearch"  placeholder="请输入..."></Input>
                <Tree @on-select-change="selectTreeChange2" :data="filterTree" style="height:250px;overflow:auto;"></Tree>
            </div>
            <div slot="footer">
                <Button type="info"  @click="modalStatus.tunOverModal=false">关闭</Button>
                <Button type="primary"  @click="transfer" >移交</Button>
            </div>   
        </Modal>
        <!-- 历史状态 -->
        <Modal v-model="modalStatus.hisModal" title="案件历史" :width="800">
            <span>案件当前位置:</span>
            <span>{{this.hislocation}}</span>
            <Table border :columns="columns_his" :data="data_his"></Table>
            <div slot="footer">
                <Button type="info"  @click="modalStatus.hisModal=false">关闭</Button>
            </div>
        </Modal>
        <!-- 用户移交 -->
        <userselectModal v-model="modalStatus.userModal"     
            :selectIds="userselect.selectIds"
            :deptIds="userselect.deptIds"
            :roleIds="userselect.roleIds"
            @on-select-change="userSelectChange"
            @on-ok="ok">
        </userselectModal>
        <discretionaryModal v-model="discretionary.show1" @selectDiscretionaryPower="selectDiscretionaryPower1"></discretionaryModal>
        <discretionaryModal v-model="discretionary.show2" @selectDiscretionaryPower="selectDiscretionaryPower2"></discretionaryModal>
    </div>
</template>
<script>
import user from '@/store/module/user.js';
import userObj from '@/store/module/userId.js';
import { getDiscretionarys } from '../../../api/laws';
import {isNull,getAge,deepCopy} from '@/libs/common.js';
import userselectModal from '../../components/workflow/userselectModal.vue'
import discretionaryModal from '@/views/components/case/discretionaryModal.vue';
var dept = user.state.userInfo.dept
export default {
    name: 'illegalShip',
    components:{
        userselectModal,discretionaryModal
    },
    data() {
        return {
            hislocation: '',
            treeQuery: {},
            columns_his: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '详情',
                    key: 'details',
                    align: 'center'
                },
                {
                    title: '时间',
                    key: 'time',
                    align: 'center'
                },
                {
                    title: '状态',
                    key: 'status',
                    align: 'center'
                }
            ],
            data_his: [],
            ifAdd: false,
            cancel: '',
            visable:true,
            tipsVal:'',
            selectUserId:'',
            userselect:{
                show:false,
                deptIds:"",
                roleIds:"Enforcer",
                selectIds:"",
            },
            transferParams2: {
                lawIds:[],
                toUserId:'',
                toDeptId:'',
                type:'',
            },
            transferParams: {
                lawId:'',
                toUserId:'',
                toDeptId:'',
                type:'',
            },     
            defaultExpandedKey:'',
            treeData:[],
            treeSearch:'',
            query_turnOver: {
                lawId:'',
                type:'',
            },
            selectTableArr: [],
            selectTreeId:'',
            tableUrl:'',
            turnOver_status:'',
            ifEdit: false,
            discretionary:{
                show1:false,
                show2:false,
            },
            actionResult: {
                title:'',
                num:'',
                type:'',
            },
            btnShow:true,
            btnInfo:'保存',
            areaLabel:'',
            isShow_area:false,
            actionResultLable: '金额(万元):',
            isShow_actionResult1: true,
            isShow_actionResult2: true,
            info: {
                shipLength:'',
                textrue:'',
                reportedDept:'',
                examineTime:'',
                place:'',
                portName:'',
                smallArea:'',
                area:'',
                subject:'',
                shipType:'',
                actionResult:'',
                shipName:'',
                parts:'',
                realPartsIdNumber:'',
                realPartsCenReg:'',
                realPower:'',
                realWorkType:'',
                cName:'',
                legalPerson:'',
                legalAddress:'',
                legalTel:'',
                tel:'',
                realPartsIdNumber:'',
                caseType:'',
                unlawfulAct:'',
                shipDetainTimeBegin:'',
                shipDetainTimeEnd:'',
                comment:'',        
                shipDetain:'',
                deportationToJA:'',
                deportationToJANum:'',
                status:'0'
            },
            caseId:'',
            closeCase:{
                lawId:''
            },
            infoRules:{
                examineTime: [{required: true, type: 'date', message: '请填写查获时间', trigger: 'change' }],
                place: [{required: true, type: 'string', message: '请填写查获地点', trigger: 'change',transform:value=>value?value.trim():'' }],                              
                shipType: [{required: true, type: 'string', message: '请填写船舶类型', trigger: 'change',transform:value=>value?value.trim():'' }],
                shipLength: [{required: true, type: 'string', message: '请填写船长', trigger: 'change',transform:value=>value?value.trim():'' }],
                textrue: [{required: true, type: 'string', message: '请填写船舶材质', trigger: 'change',transform:value=>value?value.trim():'' }],
                caseType: [{required: true, type: 'string', message: '请填写案件类型', trigger: 'change',transform:value=>value?value.trim():'' }],
                unlawfulAct: [{required: true, type: 'string', message: '请填写违法行为', trigger: 'change',transform:value=>value?value.trim():''}],
                shipName: [{required: true, type: 'string', message: '请填写船名号', trigger: 'change',transform:value=>value?value.trim():'' }],
            },
            title:'新增案件',
            modalStatus:{
                newAddModal:false,
                tunOverModal: false,
                userModal: false,
                chooseType: false,
                hisModal: false,
            },
            query: {
                page: 1,
                size:20,
                wheres:{
                    isOrg:'',
                    type:'',
                    deptId:'',
                    shipName_like:'',
                    beginTime:'',
                    endTime:'',
                    shipType:'',
                    shipLength_under:'',
                    shipLength_above:'',
                    unlawfulAct:'',
                    repetition:'',
                    status_order_desc: 'on'
                }

            },
            columns: [
                {
                    title:'序号',
                    type: 'selection',
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title:'违规主体',
                    align:'center',
                    key:'shipName'
                },
                 {
                    title:'查处机构',
                    align:'center',
                    key:'reportedDept'
                },
                 {
                    title:'查获时间',
                    align:'center',
                    key:'examineTime',
                    render: (h, params) => {
                        var str = params.row.examineTime.substr(0,10);
                        return h("span", str)
                    }
                },

                 {
                    title:'查获地点',
                    align:'center',
                    key:'place'
                },
                 {
                    title:'处置结果',
                    align:'center',
                    key:'actionResult',
                    render: (h, params) => {
                        // var json = JSON.stringify(params.row.actionResult)
                        var obj = JSON.parse(params.row.actionResult);
                        return h("span", obj.title)
                    }
                },
                 {
                    title:'备注',
                    align:'center',
                    key:'comment'
                },
                 {
                    title:'状态',
                    align:'center',
                    key:'status',
                    render: (h,params) => {
                        var str = ''
                        if (isNull(params.row.sendBack)) {
                           if (params.row.status=="0") {
                               str = '未结案'
                           } else if (params.row.status=="9") {
                               str='已结案'
                           }
                        } else {
                            // if (params.row.sendBack=='0'&&params.row.status=='0') {
                            //     str = '未结案(已退回)'
                            // } else if (params.row.sendBack=='0'&&params.row.status=='9') {
                            //     str = '已结案(已退回)'
                            // } else if (params.row.sendBack=='1'&&params.row.status=='0') {
                            //     str = '未结案(已撤回)'
                            // } else if (params.row.sendBack=='1'&&params.row.status=='9') {
                            //     str = '已结案(已撤回)'
                            // }
                            if (params.row.status=='0') {
                                str = '未结案';
                            } else if (params.row.status=='9') {
                                str = '已结案';
                            }
                        }
                        return h("span", str);
                    }
                },
                 {
                    title:'操作',
                    align:'center',
                    width:255,
                    render: (h,params) => {
                        var _self = this;
                        return h('div', [
                            h('Button', 
                            {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {

                                },
                                on: {
                                    click:()=> {
                                        this.title="查看案件";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '查看'),
                            h('Button', 
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                style: {
                                    display:params.row.edit == "1"?"inline-block":"none",
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.title="编辑案件";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', 
                            {
                                props: {
                                    type: "success",
                                    size: "small"
                                },
                                style: {
                                    display:params.row.settle == "1"?"inline-block":"none",
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.title="结案";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '结案'),
                            h('Button', 
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    display:params.row.back == "1"?"inline-block":"none",
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.sendBack(params.row)
                                        this.cancel = '撤回'
                                    }
                                }
                            }, '撤回'),
                            h('Button', 
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    display:params.row.back == "2"?"inline-block":"none",
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.sendBack(params.row)
                                        this.cancel = '退回'
                                    }
                                }
                            }, '退回'),
                            h('Button',
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.history(params.row)
                                    }
                                }
                            }, '历史')
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        history (row) {
            this.$http.get('/enforces/threeNoShips/getHistory?lawId=' + row.id).then(res => {
                if (res.success) {
                    this.data_his = res.data.history;
                    this.hislocation = res.data.past0;
                    this.modalStatus.hisModal = true;
                } else {
                    this.$Message.info(res.msg);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        sendBack (value) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认操作吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    if(this.cancel == '撤回') {
                        this.$http.post("/enforces/threeNoShips/recall",{
                                lawId: value.id
                        }).then(res => {
                                if (res.success) {
                                    this.$Message.success(res.data);
                                    this.initSearch()
                                } else {
                                    this.$Message.info(res.data);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                        });
                    } else if(this.cancel == '退回') {
                        this.$http.post("/enforces/threeNoShips/sendBack",{
                                lawId: value.id
                        }).then(res => {
                                if (res.success) {
                                    this.$Message.success(res.data);
                                    this.initSearch()
                                } else {
                                    this.$Message.info(res.data);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                        });
                    }
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
        },
        ok () {
            if (this.selectTableArr.length != 1) {
                this.transferParams2.type = "0"
                this.transferParams2.toUserId = this.selectUserId
                this.transferParams2.toDeptId = ""
                for (let i =0;i<this.selectTableArr.length;i++) {
                    this.transferParams2.lawIds.push(this.selectTableArr[i].id)
                }
                this.$http.post("/enforces/threeNoShips/turnBatch",this.transferParams2)
                    .then(res => {
                        if (res.success) {
                                this.$Message.success(res.data);
                                this.selectTableArr = []
                                this.transferParams2.lawIds = []
                                this.initSearch()
                        } else {
                            this.$Message.info(res.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                this.transferParams.type = "0"
                this.transferParams.toUserId = this.selectUserId
                this.transferParams.toDeptId = ""
                this.$http.post("/enforces/threeNoShips/turn",this.transferParams)
                    .then(res => {
                        if (res.success) {
                                this.$Message.success(res.data);
                                this.selectTableArr = []
                                this.initSearch()
                        } else {
                            this.$Message.info(res.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        userSelectChange (value) {
            this.selectUserId = value[0].id
        },
        isEmpty(s) {
            if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
        },
        //移交给部门
        transfer () {
            if (this.selectTableArr.length != 1){
                if (this.selectTreeId == '') {
                    this.$Message.info('请选择部门。');
                    return;
                }
                this.transferParams2.type = "1"
                this.transferParams2.toDeptId = this.selectTreeId
                this.transferParams2.toUserId = ""
                for (let i =0;i<this.selectTableArr.length;i++) {
                    this.transferParams2.lawIds.push(this.selectTableArr[i].id)
                }
                this.$http.post("/enforces/threeNoShips/turnBatch",this.transferParams2)
                    .then(res => {
                        if (res.success) {
                            this.$Message.success(res.data);
                            this.selectTableArr = []
                            this.transferParams2.lawIds = []
                            this.modalStatus.tunOverModal=false;
                            this.initSearch()
                        } else {
                            this.$Message.info(res.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            } else {
                if (this.selectTreeId == '') {
                    this.$Message.info('请选择部门。');
                    return;
                }
                this.transferParams.type = "1"
                this.transferParams.toDeptId = this.selectTreeId
                this.transferParams.toUserId = ""
                this.$http.post("/enforces/threeNoShips/turn",this.transferParams)
                    .then(res => {
                        if (res.success) {
                            this.$Message.success(res.data);
                            this.selectTableArr = []
                            this.modalStatus.tunOverModal=false;
                            this.initSearch()
                        } else {
                            this.$Message.info(res.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }           
        },
        selectTreeChange2 (nodes) {
            this.selectTreeId = nodes[0].id
        },
        expandTree(treeData){
            for (const key in treeData) {
                if (treeData.hasOwnProperty(key)) {
                    const element = treeData[key];
                    if(element.id == this.defaultExpandedKey){
                        element.selected = true;
                        return true;
                    } else if(!this.isEmpty(element.children) && this.expandTree(element.children)){
                        element.expand = true;
                        return true;
                    } else {
                    // 未匹配到继续执行
                    }
                }
            }
            return false;
        },        
        initTree () {
            var search = {}
            for (const key in this.treeQuery) {
                search[key] = this.treeQuery[key];
            }
            this.$http.get('/$admin/depts/authtree', {
                params: search
                })
                .then(res => {
                if (res.success) {
                    this.treeData = res.data;
                    if(!this.isEmpty(this.defaultExpandedKey)){
                        this.expandTree(this.treeData);
                    }
                }
                })
                .catch(error => {
                console.log(error);
            });
        },
        //获取单个案件移交列表
        turnOver () {
            if (this.selectTableArr.length == 0) {
                this.$Message.info('请选择案件。')
                return;
            } else {
                var flag = false
                for (let i = 0; i < this.selectTableArr.length; i++) {
                    if (this.selectTableArr[i].status == '9'||this.selectTableArr[i].move=='0'){
                        this.$Message.info('该案件不可移交。')
                        flag = true
                        return;
                    }
                }
                if (!flag) {
                    this.query_turnOver.lawId = this.selectTableArr[0].id
                    this.query_turnOver.type = "2"
                    this.transferParams.lawId = this.selectTableArr[0].id
                    this.$http.get("/enforces/threeNoShips/getTurn",{
                            params: this.query_turnOver
                        }).then(res => {
                            if (res.success) {
                                if (res.data.type == -1) {
                                    // this.modalStatus.chooseType = true
                                    this.modalStatus.tunOverModal = true
                                    this.initTree()
                                } else if (res.data.type == 0) {
                                    this.$Message.info('已移交至用户。')
                                } else if (res.data.type == 1) {
                                    this.userselect.selectIds = user.state.userInfo.userId
                                    this.userselect.deptIds = ""
                                    this.modalStatus.userModal = true
                                }                   
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            }          
        },
        selectTable (selection) {
            var arr = []           
            for (let i = 0;i < selection.length; i++) {
                arr.push(selection[i].type)
            }
            var set = new Set(arr)
            if (set.size == 1) {
                this.selectTableArr = selection
                this.visable = true
            } else {
                this.visable = false
                if (selection.length!=0) 
                this.$Message.info('请选择相同状态的案件。')
                return;
            }                    
        },
        selectTurnOver (value) {
            if (value == "0") {
                this.tableUrl = '/enforces/threeNoShips/getMyTurnPage' //我移交的
            } else if (value == "1") {
                this.tableUrl = '/enforces/threeNoShips/getTurnFromPage' //移交给我的
                this.query.wheres.type = '2'
            } else {
                this.tableUrl = '/enforces/threeNoShips/getPage' 
            }
        },
        selectDiscretionaryPower1 (nodes) {
            this.query.wheres.unlawfulAct = nodes.illegalAct
            this.discretionary.show1=false;
        },
        selectDiscretionaryPower2 (nodes) {
            this.info.unlawfulAct = nodes.illegalAct
            this.discretionary.show2=false;
        },
        initSearch() {
            if (this.query.wheres.status == "全部") {
                this.query.wheres.status = ""
            };
            this.$refs.main.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.turnOver_status = "";
            this.tableUrl = '/enforces/threeNoShips/getPage'
            this.selectTableArr = []
            this.initSearch();            
        },
        areaSelect (value) {
            if (value == '海上') {
                this.isShow_area = false
            } else if (value == '港口') {
                this.areaLabel ='港口名称:'
                this.isShow_area = true
            } else if (value == '陆上') {
                this.areaLabel = '陆上名称:'
                this.isShow_area = true
            }
        },
        actionResultSelect (value) {
            if(value=="没收违法所得(万元)") {
                this.actionResultLable = '金额(万元):'
                this.isShow_actionResult1 = true
                this.isShow_actionResult2 = false
            } else if (value=="没收网具(顶)") {
                this.actionResultLable = '数量(顶):'
                this.isShow_actionResult1 = true
                this.isShow_actionResult2 = true
            } else if (value=="没收渔网物(KG)") {
                this.actionResultLable = '重量(KG):'
                this.isShow_actionResult1 = true
                this.isShow_actionResult2 = false
            } else if (value=="罚款(万元)") {
                this.actionResultLable = '罚款(万元):'
                this.isShow_actionResult1 = true
                this.isShow_actionResult2 = false
            } else if (value=="吊销许可证") {
                this.isShow_actionResult1 = false
                this.isShow_actionResult2 = false
            } else if (value=="没收(拆解)渔船") {
                this.isShow_actionResult1 = false
                this.isShow_actionResult2 = false
            } else if (value=="其他备注") {
                this.actionResultLable = '备注:'
                this.isShow_actionResult1 = true
                this.isShow_actionResult2 = false
            }
        },
        selectTreeChange (value) {
            this.query.wheres.deptId = value[0].id
            this.initSearch();
        },
        editWin(row) {
            this.caseId = row.id
            this.$refs["info"].resetFields();
            if (this.title == '查看案件') {
                this.btnShow = false
                this.ifEdit = true
            } else if ( this.title == '结案') {
                this.btnInfo = '结案'
                this.btnShow = true
                this.ifEdit = false
            } else {
                this.btnShow = true
                this.btnInfo = '保存'
                this.ifEdit = false
            }
            this.$http.get("/enforces/threeNoShips/"+this.caseId)
            .then(res => {
                if (res.success) {
                    this.info = res.data
                    if (!isNull(row.actionResult)) {
                        const strObj = JSON.parse(row.actionResult)
                        this.actionResult.title = strObj.title
                        this.actionResult.num = strObj.num
                        this.actionResult.type = strObj.type
                        }
                    this.modalStatus.newAddModal=true;
                } else {
                    this.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        judgeNull(obj) {
            var flag = true
            if (obj.subject == '船舶') {
                delete obj.legalAddress
                delete obj.legalTel
                // delete obj.parts
                // delete obj.realPartsIdNumber
                delete obj.tel
                delete obj.cName
                delete obj.legalPerson
                if (obj.shipDetain == "否") {
                    delete obj.shipDetainTimeBegin
                    delete obj.shipDetainTimeEnd
                }
            } else if (obj.subject == '非船舶') {
                delete obj.realPartsCenReg
                delete obj.realPower
                delete obj.realWorkType
                delete obj.realWorkMode
                delete obj.shipDetain
                delete obj.shipDetainTimeBegin
                delete obj.shipDetainTimeEnd
            }
            if (obj.deportationToJA == '否') {
                delete obj.deportationToJANum
            }
            if (obj.place != '海上') {
                delete obj.area
                delete obj.smallArea
            } else if (obj.place == '海上')
                delete obj.portName
            delete obj.lastStaffId        
            for(var key in obj){
                if(obj[key]) 
                {               
                }else{
                    flag=false;
                }    
            }
            if(!flag){
                return false
            }else{
                if (this.actionResult.title ==""||this.actionResult.title == undefined) {
                    this.$Message.warning("请填写处置结果");
                    flag = false
                }            
                if (this.isShow_actionResult1) {
                    if (this.actionResult.num =="") {
                        this.$Message.warning("请填写处置结果");
                        flag = false
                    } 
                }
                if (this.isShow_actionResult2) {
                    if (this.actionResult.type =="") {
                        this.$Message.warning("请填写处置结果");
                        flag = false
                    }
                } 
                return flag;                                                
            }
        },
        submitData () {
            if (typeof(this.info.examineTime)=='string') {
                this.info.examineTime = (this.info.examineTime).replace(/-/g,"/");
                this.info.examineTime = new Date(this.info.examineTime);
            }
            this.$refs['info'].validate(valid => {
            if(valid) {
                var obj = {
                    'title' : this.actionResult.title,
                    'num' : this.actionResult.num,
                    'type' : this.actionResult.type
                };
                this.info.actionResult = JSON.stringify(obj);
                if (this.title == '新增案件' ) {
                    this.info.status = '0'
                    this.$http.post("/enforces/threeNoShips/save",this.info)
                    .then(res => {
                        if (res.success) {
                            this.$Message.info("操作成功");
                            this.query.wheres.unlawfulAct = ''
                            this.modalStatus.newAddModal=false;
                            this.initSearch()
                        } else {
                            this.$Message.info(res.msg);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
                } else if (this.title == '结案') {
                    var judge = this.judgeNull(this.info)
                    if (judge) {
                        this.$http.patch("/enforces/threeNoShips/"+this.caseId,this.info)
                        .then(res=>{
                            if(res.success){
                                this.closeCase.lawId = this.caseId
                                this.$http.post("/enforces/threeNoShips/settleLaw",this.closeCase)
                                .then(res => {
                                    if (res.success) {
                                    } else {
                                        this.$Message.info(res.data);
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                });           
                                this.$Message.info("操作成功");
                                this.query.wheres.unlawfulAct = ''
                                this.modalStatus.newAddModal=false; 
                                this.initSearch()                  
                            } else {
                                this.$Message.info(res.data)
                            }
                        }).catch(error => {
                            console.log(error);
                        })
                    } else {
                        this.$Message.error('请填写所有项。');
                    }
                } else if (this.title == '编辑案件') {
                    this.$http.patch("/enforces/threeNoShips/"+this.caseId,this.info)
                    .then(res=>{
                         if(res.success){                   
                            this.$Message.info("操作成功");
                            this.query.wheres.unlawfulAct = ''
                            this.modalStatus.newAddModal=false; 
                            this.initSearch()                  
                        } else {
                            this.$Message.info(res.msg)
                        }
                    }).catch(error => {
                        console.log(error);
                    })
                }
                }
            })
        },
        newWin () {
            this.modalStatus.newAddModal = true
            this.title = '新增案件'
            this.btnShow = true
            this.ifEdit = false
            this.btnInfo = '保存'
            for (let key in this.info) {
                this.info[key] = "";
            }
            for (let key in this.actionResult) {
                this.actionResult[key] = ''
            }
            this.$refs["info"].resetFields();
            this.info.reportedDept = dept.name
            this.info.subject = '船舶'
            this.info.place = '海上'
            var nowDate = new Date();
            var y = nowDate.getFullYear();
            var m = nowDate.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;  
            var d = nowDate.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var dateStr = y + '-' + m + '-' + d;
            this.info.examineTime = dateStr
        }
    },
    mounted () {
        this.initSearch()
        // this.loadDiscretionaryPower();
    },
    beforeMount() {
        if (this.$hasRoles("Enforcer")) {
            this.ifAdd = true
        } else {
            this.ifAdd = false
        }
    },
    created () {
        this.tableUrl = '/enforces/threeNoShips/getPage'
    },
    watch:{
        tableUrl: {
            deep: true,
            handler: function (newVal,oldVal){
                this.$nextTick(function(){
                    this.tableUrl = newVal
                    this.initSearch();
                })
            }
        },
        // unlawfulAct: {
        //     deep: true,
        //     handler: function (newVal,oldVal){
        //         this.$nextTick(function(){
        //             this.initSearch();
        //         })
        //     }
        // },
        unlawfulActChange(val){
            this.initSearch();
        },  
        defaultExpandedKey(val) {
            if(!this.isEmpty(this.treeData)){
                this.expandTree(this.treeData);
            }
        },
    },
    computed: {
        unlawfulActChange(){
            return this.query.wheres.unlawfulAct;
        },
        filterTree () {
            var tree = this.$util.deepCopy(this.treeData);
            return this.$util.diguiTree(tree, this.treeSearch);
        },       
    }
}
</script>
<style lang="less" scoped>

</style>
