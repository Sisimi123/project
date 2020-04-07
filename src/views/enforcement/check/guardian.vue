<style lang="less" scoped>
        @import '../../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row>
                <data-table 
                    ref="test" 
                    :autoInitTable="false"
                    :withTree="showtree" 
                    :useZtree="false" 
                    :treeParams="cities"
                    :treeUrl="'/$admin/depts/authtree'" 
                    @on-select-change="selectTreeChange"
                    :url="'/check/jhr/list'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="52" @submit.native.prevent>
                            <Row>
                                <Col span="4" v-show="quanXianShow">
                                    <Form-item label="审核状态:" :label-width="65">
                                       <Select v-model="query.wheres.status" @on-change="statusCheck">
                                           <!-- <Option value="0" >所有</Option> -->
                                           <Option value="1">申请待审核</Option>
                                           <Option value="2" selected>申请通过</Option>
                                           <Option value="3">申请不通过</Option>
                                           <Option value="4">撤销待审核</Option>
                                           <Option value="5">撤销成功</Option>
                                       </Select>
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Form-item label="船名号:" :label-width="75">
                                        <Input v-model="query.wheres.search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="5">
                                    <Form-item label="监护人:" :label-width="75">
                                        <Input v-model="query.wheres.jhr" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <div class="btn-wrap">
                                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                    <Button @click="handleReset()"  >重置</Button>
                                    <Checkbox true-value="1" v-model="query.wheres.sub" false-value="0" @on-change="handleSearch">子部门</Checkbox>
                                </div>
                                <div v-show="downShow" class="func-wrap">
                                    <Button @click="newAdd()" type="success" icon="ios-add" v-show="quanXianShow">新增</Button>
                                    <Button @click="downloadMb()" type="warning">下载模板</Button>
                                    <MyUpload :action="'/check/jhr/importXls'"
										:data="importData"
										:format="['xlsx','xls']"  
                                        :on-success="importXls"
                                        :on-format-error="handleFormatError"
                                        style="width:74px;height:35px;float:right;margin-left:4px;"
										>
                                        <Button type="info" @click="checkDeptid()" icon="ios-cloud-download-outline" v-show="quanXianShow">导入</Button>
                                    </MyUpload>
                                </div>
                                <div v-show="!downShow" class="func-wrap">
                                    <Button @click="newAdd()" type="success" icon="ios-add" v-show="quanXianShow">新增</Button>
                                    <Button @click="downloadMb()" type="warning">下载模板</Button>
                                    <MyUpload :action="'/check/jhr/importXls'"
										:data="importData"
										:format="['xlsx','xls']"  
                                        :on-success="importXls"
                                        :on-format-error="handleFormatError"
                                        style="width:74px;height:35px;float:right;margin-left:4px;"
										>
                                        <Button type="info" @click="checkDeptid()" icon="ios-cloud-download-outline" v-show="quanXianShow">导入</Button>
                                    </MyUpload>
                                </div>
                                <!-- <Col span="2" style="float:right;text-align:right;">
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                                </Col> -->
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Row>
            <!-- 新增 -->
            <Modal :styles="{top: '40px'}" v-model="modalStatus.newAddModal" title="监护人申报表"  width=800 :mask-closable="maskclosable">
                <div  style="height:650px;overflow:auto;">
                <table class="regisbg" border="1px" width=750 style="margin: 0 auto;">
                    <tr>
                        <td class="tdGK" rowspan="6">船舶概况</td>
                        <td class="tdCM">船名</td>
                        <td colspan="2" style="position: relative;">
                            <input class="sl" v-model="formLeft.shipname" readonly type="text"/>
                            <!-- <Button v-show="title=='新增'||title=='编辑'" @click="selectShipModal()" type="primary" style="height: 35px;position: absolute;right:1px;top:6px;">渔船查询</Button> -->
                            <Button v-show="title=='新增'||title=='编辑'" @click="baseShipModal.show=true" type="primary" style="height: 35px;position: absolute;right:1px;top:6px;">渔船查询</Button>
                        </td>
                        <td class="tdCM">所属部门</td>
                        <td>
                            <input class="sl" v-model="deptname" readonly type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdCM">材质</td>
                        <td colspan="2">
                            <input class="sl" v-model="formLeft.shipmate" readonly type="text"/>
                        </td>
                        <td class="tdCM">功率(千瓦)</td>
                        <td>
                            <input class="sl" v-model="formLeft.power" readonly type="text"/>
                        </td>
                    </tr>
                    <tr v-if="show">
                        <td class="tdCM">船东（持证人）</td>
                        <td colspan="2">
                            <input class="sl" v-model="formLeft.owner" readonly type="text"/>
                        </td>
                        <td class="tdCM">手机</td>
                        <td>
                            <input class="sl" v-model="formLeft.ownerTel" readonly type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td rowspan="2">船长</td>
                        <td colspan="2" rowspan="2">
                            <input class="sl" v-model="formLeft.captain"  :readonly="onlyread" type="text"/>
                        </td>
                        <td class="tdCM">手机</td>
                        <td>
                            <input class="sl" v-model="formLeft.captainTel" :readonly="onlyread" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdCM">卫星电话</td>
                        <td>
                            <input class="sl" v-model="formLeft.captainWxdh" :readonly="onlyread" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdCM">责任人</td>
                        <td colspan="2">
                            <input class="sl" v-model="formLeft.pic" :readonly="onlyread" type="text"/>
                        </td>
                        <td>手机</td>
                        <td>
                            <input class="sl" v-model="formLeft.picTel" :readonly="onlyread" type="text"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdGK" rowspan=5>申请人（监护人）信息</td>
                        <td colspan="2">姓名</td>
                        <td colspan="3" style="text-align: left;padding-left: 8px">
                            <input class="sl" id="name"  v-model="formLeft.jhrname" :readonly="onlyread"  type="text" style="width:390px"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">身份证号码</td>
                        <td colspan="3" style="text-align: left;padding-left: 8px">
                            <input class="sl" v-model="formLeft.jhrIdcard" :readonly="onlyread" type="text" style="width:272px;position:relative;top:7px"/>
                            <!-- 查看申请人 -->
                            <Button v-show="title=='新增'||title=='编辑'" type="primary" @click="watchPeople()" :readonly="onlyread" style="float: right;position: relative;height: 35px;right: 1px;">
                                信息查询
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">联系电话（手机）</td>
                        <td colspan="3" style="text-align: left;padding-left: 8px">
                            <input class="sl" id="phone"  v-model="formLeft.jhrTel" :readonly="onlyread" type="text" style="width:390px"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">现居住地址</td>
                        <td colspan="3" style="text-align: left;padding-left: 8px">
                            <input class="sl" id="address"  v-model="formLeft.jhrAddress" :readonly="onlyread" type="text" style="width:390px"/>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">与被监护渔船（船长）关系</td>
                        <td colspan="3" style="text-align: left;padding-left: 8px">
                            <input class="sl" id="contactWithCaptain"  v-model="formLeft.relationship" :readonly="onlyread" type="text" style="width:390px"/>
                        </td>
                    </tr>
                    <tr>
                        <td class="tdGK" style="height:100px">申请人声明</td>
                        <td class="statement" colspan="5" style="text-align:left;padding-left:8px">本人声明：<br>
                            <span style="position: relative;left: 60px;">愿意履行渔船监护人职责，担任 
                                <input class="sl" v-model="formLeft.shipname" :readonly="onlyread" type="text" style="width:130px;text-align:center"/> 
                                渔船安全监护人。
                            </span><br>
                            <span style="text-align: right;padding-left: 300px">申请人签名：
                                <input class="sl" v-model="formLeft.jhrSign" :readonly="onlyread" type="text"/>
                            </span><br>
                            <span style="text-align: right;padding-left: 282px">
                                <input class="sl" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="dimDateString.year" :readonly="onlyread" type="text" style="width:50px;text-align:right"/> 年 
                                <input class="sl" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="dimDateString.mouth" :readonly="onlyread" type="text" style="width:20px;text-align:right"/> 月 
                                <input class="sl" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="dimDateString.day" :readonly="onlyread" type="text" style="width:20px;text-align:right"/> 日
                            </span>
                        </td>
                    </tr>
                    <tr v-show="title=='审核'|| title=='撤销'">
                        <!--  title=='审核' || title=='查看'-->
                        <td style="height:150px">{{title_jhr}}</td>
                        <td colspan="5" style="text-align:right;padding-right:20px;position: relative;">
                            <span style="position: absolute;top:20px;left:15px;">
                                <textarea :readonly="checkonly"  v-model="formLeft.cjyj" class="sl"  type="text" name="" id="" style="width:600px;border:none;outline:none;" rows="3"></textarea>
                            </span>
                            <span style="position: absolute;top:85px;right:82px;">
                                审核人：<input :readonly="checkonly"  type="text" v-model="formLeft.cjauditor"  style="border:none;outline:none;"/>
                            </span>
                            <span style="position: absolute;bottom:10px;right:100px;">
                                <!-- <DatePicker :readonly="checkonly" class="sl" v-model="formLeft.cjauditDate" style="width:152px;text-align:left;border:0;outline:0;"  type="date"  placeholder="请选择日期时间" ></DatePicker> -->
                                审核时间：
                                <input class="sl"  v-model="nowDate.year" readonly type="text" style="width:50px;text-align:left"/> 年 
                                <input class="sl"  v-model="nowDate.month" readonly type="text" style="width:20px;text-align:left"/> 月 
                                <input class="sl"  v-model="nowDate.day" readonly type="text" style="width:20px;text-align:left"/> 日
                            </span>
                        </td>
                    </tr>
                </table>
                <div v-show="title!='新增'&&this.Records.length!=0">
                    <table class="regisbg" border="1px" width=750 style="margin: 0 auto;">
                        <tr>
                            <td style="width:125px">审核记录(序号)</td>
                            <td>类型</td>
                            <td>审核人</td>
                            <td>审核时间</td>
                            <td>审核意见</td>
                        </tr>
                        <tr v-for="item in Records">
                            <td>{{item['index']}}</td>
                            <td>{{item['type']}}</td>
                            <td>{{item['auditor']}}</td>
                            <td>{{item['createTime']}}</td>
                            <td>{{item['message']}}</td>
                        </tr>     
                    </table>               
                </div>
                </div>
                <div slot="footer">
                    <Button v-show="title=='新增'||title=='编辑'|| title=='审核'|| title=='撤销'" @click="modalStatus.newAddModal=false">取消</Button>
                    <Button v-show="title=='新增'||title=='编辑'" type="primary" @click="saveData">保存</Button>
                    <Button v-show="title=='审核'" type="error" @click="checkFailure">不通过</Button>
                    <Button v-show="title=='审核'||title=='撤销'" type="success" @click="checkSuccess">{{btnLabel}}</Button>
                    <Button v-show="title=='查看'" type="info" @click="modalStatus.newAddModal=false">关闭</Button>
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
            <selectShipModal v-model="baseShipModal.show"  @on-select-ship="onSelectShip"></selectShipModal>
        </div>     
    </template>
    <script>
    import {isNull } from '@/libs/common.js'  
    import MyUpload from "@/views/components/Upload/MyUpload.vue";
    import user from '@/store/module/user.js';
    import userObj from '@/store/module/userId.js';
    import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';
    var dept=user.state.userInfo.dept;
    export default {
        name: 'rulesmng',
        components: {
            MyUpload,selectShipModal
        },
        data () {
            return {
                btnLabel:'通过',
                nowDate: {
                    year: '',
                    month: '',
                    day: ''
                },
                baseShipModal: {
                    show: false
                },
                Records:[],
                title_jhr: '审核意见',
                downShow:false,
                checkonly:false,
                quanXianShow:true,
                maskclosable:false,
                onlyread:true,
                cities:{
                    containOrgan:false,
                    type:"includes:5,20,30,35"
                },
                modalStatus:{
                    newAddModal:false,
                },
                status:{
                    selectShip:false,
                }, 
                formLeft:{
                    shipid:"",        //渔船id
                    deptid:"",        // 所属部门，不能修改
                    shipname:"",      // 船名
                    deptname:"",      //部门名称，该属性不入库
                    shipmate:"",      // 材质
                    power:"",         // 功率
                    owner:"",         // 船东(持证人)
                    ownerTel:"",      // 船东手机
                    captain:"",       // 船长
                    captainTel:"",    // 船长手机
                    captainWxdh:"",   // 船长卫星电话
                    pic:"",           //责任人,person in charge 
                    picTel:"",        // 责任人电话
                    jhrname:"",       // 申请人（监护人）姓名
                    jhrIdcard:"",     // 申请人（监护人）身份证
                    jhrTel:"",        // 申请人（监护人）手机
                    jhrAddress:"",    // 申请人（监护人）住址
                    relationship:"",  // 申请人（监护人）与被监护渔船（船长）关系
                    applyDate:"",     // 申请人（监护人）声明时间
                    jhrSign:"",       //申请人签名

                    status:"",        //该申请是否完成  0:进行中   ，1：申请成功，  2：申请失败              
                    cjyj:"",          //审核意见
                    cjauditor:"",     //审核人
                    cjauditDate:"",   //审核时间
                },
                columns: [
                    {   
                        title:'序号',
                        type: 'index',
                        maxWidth:80,
                        // ellipsis:true,
                        align: 'center',
                    },
                    {
                        title: '船名号',
                        align: 'center',
                        key: 'shipname'
                    },
                    {
                        title: '船东(持证人)',
                        align: 'center',
                        key: 'owner'
                    },
                    {
                        title: '船东手机',
                        align: 'center',
                        key: 'ownerTel'
                    },
                    {
                        title: '监护人',
                        align: 'center',
                        key: 'jhrname'
                    },
                    {
                        title: '监护人手机',
                        align: 'center',
                        key: 'jhrTel'
                    },
                    {
                        title: '所属部门',
                        align: 'center',
                        key: 'deptname'
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
                            var _self = this;
                            var id = params.row.id;
                            return h('div', [
                                h('Button',
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    style: {
                                        display:(_self.quanXianShow)&&(params.row.source=="0"&&params.row.actualStatus=="2")?"inline-block":"none",
                                    },
                                    on:{
                                        click:()=>{
                                            _self.title="编辑",
                                            _self.handleEdit(params.row);
                                        }
                                    }
                                },"编辑"),
                                h('Button',
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    style: {
                                        display:(parseInt(user.state.userInfo.areaType)<45)&&(!_self.quanXianShow)?"none":"inline-block",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click:()=>{
                                            _self.title="查看";
                                            _self.watchMsg(params.row);
                                        }
                                    }
                                },"查看"),
                                h('Button',
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    style: {
                                        display:params.row.creatorId == user.state.userInfo.userId?"inline-block":"none",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click:()=> {
                                            _self.delete(id);
                                        }
                                    }
                                },"删除"),
                                h('Button',
                                {
                                    props: {
                                        type: "warning",
                                        size: "small"
                                    },
                                    style: {
                                        display:(_self.quanXianShow)&&(params.row.actualStatus=="2")?"inline-block":"none",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click:()=> {
                                            _self.title="撤销";
                                            _self.title_jhr = "撤销意见"
                                            _self.btnLabel = '撤销'
                                            _self.formLeft={};
                                            _self.handleEdit(params.row);
                                        }
                                    }
                                },"撤销"),
                                h('Button',
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    style: {
                                        display:(_self.quanXianShow)&&((params.row.actualStatus=="1"&&params.row.tempStatus=="1")||(params.row.actualStatus=="2"&&params.row.tempStatus=="2"))?"inline-block":"none",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click:()=> {
                                            _self.title="审核";
                                            _self.title_jhr = "审核意见"
                                            _self.btnLabel = '通过'
                                            _self.cjauditDate=new Date();
                                            _self.formLeft={};
                                            _self.handleEdit(params.row);
                                        }
                                    }
                                },"审核"),
                            ])
                        }
                    },
                ],
                dataList: [],
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
                query:{
                    key:"",//deptid 为空则默认为当前用户的部门id
                    page:1,
                    size:10,
                    wheres:{
                        //只有监护人管理员才可以审核公众用户的申请，所以如果普通管理员传任何值后台都会处理成"1"
                        status:"2",//字符串，0未审核 1审核 2审核失败 3所有
                        search:"",//渔船名
                        sub:"1",//是否显示子部门 1表示显示
                        jhr:"",//监护人 或 监护人手机号
                    },
                },
                showtree:false,
                dimDateString:{
                    year:"",
                    mouth:"",
                    day:""
                },
                deptid:"",
                deptname:"",
                nodes:[],
                show:true,
                title:"",
                checkTxt:"",
            }
        },
        computed:{  
            importData: function() {
                return {
                    deptid: this.deptid
                };
            },
        },
        methods: {
            onSelectShip(row) {
                this.formLeft.shipid=row.id;
                this.formLeft.shipname=row.shipname;
                this.formLeft.shipmate=row.shipmate;
                this.formLeft.power=row.power;
                this.formLeft.owner=row.owner;
                this.formLeft.ownerTel=row.tel;
                this.deptname=row.deptName;
                this.status.selectShip=false;              
                var _self=this;
                _self.$http.post("/check/drlc/picinfo?shipid="+row.id)
                .then(res=>{
                    _self.show=false;
                    if(res.success){
                        // if(res.data.captain!=undefined){
                        //     _self.formLeft.captain=res.data.captain;
                        // }
                        //浙嵊渔20118 测试
                        // if(res.data.captainTel!=undefined){
                        //     _self.formLeft.captainTel=res.data.captainTel;
                        // }
                        // if(res.data.captainWxdh!=undefined){
                        //     _self.formLeft.captainWxdh=res.data.captainWxdh;
                        // }
                        if(res.data.pic!=undefined){
                            _self.formLeft.pic=res.data.pic;
                        }
                        if(res.data.picTel!=undefined){
                            _self.formLeft.picTel=res.data.picTel;
                        }
                    } else {
                        this.$Message.error(res.msg);
                    }
                    _self.show=true;
                });
            },
            //导入
            importXls: function(response, file, fileList) {
                // if(this.nodes.length==0&&this.showtree==true){
                //     this.$Message.error("请选择部门");
                //     return ;
                // }
                if (response.success) {
                    this.$Message.info("导入成功！");
                    this.initSearch();
                } else {
                    this.$Message.error(response.msg);
                }
            },
            handleFormatError: function(file) {
                this.$Message.error("文件格式不支持上传！");
            },
            checkDeptid(){
                // if(this.nodes.length==0&&this.showtree==true){
                //     this.$Message.error("请先选择部门");
                //     return;
                // }
            },
            //下载模板
            downloadMb(){
                window.open(this.$basePath+"/check/jhr/template");
            },
            checkSuccess(){//审核成功
                this.checkTxt="通过";
                var value='true';
                this.check(value);
            },
            checkFailure(){//审核失败
                this.checkTxt="不通过";
                var value='false';
                this.check(value);
            },
            check(v){
                var _self=this;
                if (v=="true") {
                    var boolean = true
                } else if (v=="false") {
                    var boolean = false
                }                 
                // _self.formLeft.status=v;
                // var date=new Date(_self.formLeft.cjauditDate);
                // var year=date.getFullYear();
                // var month=date.getMonth()+1;
                // var day=date.getDate();
                // if(month<10){
                //     month="0"+month;
                // }
                // if(day<10){
                //     day="0"+day;
                // }
                // _self.formLeft.cjauditDate=year+"-"+month+"-"+day;
                if (_self.title=="审核") {
                    _self.$http.post("/check/jhr/audit?agree="+boolean+"&message="+ _self.formLeft.cjyj+"&jhrid="+ _self.formLeft.id)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("审核成功");
                            _self.initSearch();
                            _self.modalStatus.newAddModal=false;
                        }else{
                            _self.$Message.error(res.msg);
                        }
                    });
                } else if (_self.title=="撤销") {
                    _self.$http.post("/check/jhr/auditRepeal?agree="+boolean+"&message="+ _self.formLeft.cjyj+"&jhrid="+ _self.formLeft.id)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("撤销成功");
                            _self.initSearch();
                            _self.modalStatus.newAddModal=false;
                        }else{
                            _self.$Message.error(res.msg);
                        }
                    });
                }
            },
            statusCheck(v){//审核状态下拉框
                this.query.wheres.status=v;
                this.initSearch();
            },
            selectShipModal(){
                // this.queryX.wheres.nametheShip_like = this.formLeft.shipname;                
                this.selectShip();
                this.status.selectShip=true; 
            },
            handleSelectShip() {
                this.status.selectShip = true;
                this.selectShip();
            },
            resetSelectShip(){
                this.queryX.wheres.nametheShip_like ="";
                this.selectShip();
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
                this.formLeft.shipid=row.id;
                this.formLeft.shipname=row.nametheShip;
                this.formLeft.shipmate=row.material;
                this.formLeft.power=row.power;
                this.formLeft.owner=row.namevesselOwner;
                this.formLeft.ownerTel=row.shipOwnerTelephone;
                this.status.selectShip=false;              
                var _self=this;
                var params = {
                    shipid : row.id
                }
                _self.$http.post("/check/jhr/info",params)
                .then(res=>{
                    _self.show=false;
                    if(res.success){
                        // if(res.data.captain!=undefined){
                        //     _self.formLeft.captain=res.data.captain;
                        // }
                        //浙嵊渔20118 测试
                        // if(res.data.captainTel!=undefined){
                        //     _self.formLeft.captainTel=res.data.captainTel;
                        // }
                        // if(res.data.captainWxdh!=undefined){
                        //     _self.formLeft.captainWxdh=res.data.captainWxdh;
                        // }
                        if(res.data.pic!=undefined){
                            _self.formLeft.pic=res.data.pic;
                        }
                        if(res.data.picTel!=undefined){
                            _self.formLeft.picTel=res.data.picTel;
                        }
                    } else {
                        this.$Message.error(res.msg);
                    }
                    _self.show=true;
                });
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
                this.query.wheres.search = "";
                this.query.wheres.jhr = "";
                this.query.wheres.status = "2";
                this.query.page = 1;
                this.query.size = 10;
                this.initSearch();
            },
            selectTreeChange(nodes){
                this.deptname=nodes[0].title;
                this.deptid=nodes[0].id;
                this.query.key=nodes[0].id;
                this.nodes=nodes;
                this.initSearch();
                this.downShow=true;
            },
            handleSearch(){
                this.initSearch();
            },
            watchPeople(){
                var _self=this;
                _self.formLeft.jhrname="";
                _self.formLeft.jhrTel="";
                _self.formLeft.jhrAddress="";
                _self.formLeft.relationship="";
                if(_self.formLeft.jhrIdcard==undefined){
                    _self.$Message.error("先请输入身份证号");
                    return ;
                }else{
                    _self.$http.post("/check/jhr/idCardInfo?idcard="+_self.formLeft.jhrIdcard)
                    .then(res=>{
                        if(res.data==undefined){
                            _self.$Message.error("暂无该身份证号信息");
                            return ;
                        }else{
                            if(res.success){
                                this.show=false;
                                _self.formLeft.jhrname=res.data.jhrname;
                                _self.formLeft.jhrTel=res.data.jhrTel;
                                _self.formLeft.jhrAddress=res.data.jhrAddress;
                                _self.formLeft.relationship=res.data.relationship;
                                _self.$Message.success("查询成功");
                                this.show=true;
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }
                    })
                }
            },
            newAdd(){
                // if(this.nodes.length==0 && this.showtree==true){
                //     this.$Message.error("请选择部门");
                //     return ;
                // }
                this.formLeft={};
                this.dimDateString={};
                // this.formLeft.cjyj="同意";
                // this.formLeft.zjyj="同意";
                // this.formLeft.xjyj="同意";
                this.title="新增";
                this.onlyread=false;
                var query = this.$route.query;
                if(!this.isEmpty(query.shipName)){
                    this.formLeft.shipname = query.shipName;
                    this.$set(this.formLeft,'shipName',query.shipName)
                }                
                var date=new Date();
                this.dimDateString.year=date.getFullYear();
                this.dimDateString.mouth=date.getMonth()+1;
                this.dimDateString.day=date.getDate();
                this.modalStatus.newAddModal=true;
            },
            dbhandleEdit(msg){
                this.title="查看";
                this.modalStatus.newAddModal=true;
                this.watchMsg(msg);
            },
            watchMsg(row){
                if(this.title=="新增" || this.title=="编辑"){
                    this.onlyread=false;
                }
                this.modalStatus.newAddModal=true;
                this.formLeft=JSON.parse(JSON.stringify(row));
                this.deptname=this.formLeft.deptname;
                var applyDate=new Date(this.formLeft.applyDate);
                this.dimDateString.year=applyDate.getFullYear();
                this.dimDateString.mouth=applyDate.getMonth()+1;
                this.dimDateString.day=applyDate.getDate();
                this.formLeft.cjauditDate=new Date(this.formLeft.cjauditDate);
                if(this.title=="查看"){
                    this.onlyread=true;
                    this.checkonly=true;
                }else if(this.title=="审核" || this.title=="撤销"){
                    this.checkonly=false;
                    this.formLeft.cjyj="";
                    this.formLeft.cjauditor=userObj.name;
                }
                this.Records = []
                this.initRecords(row.id)
            },
            initRecords(id) {
                this.$http.get('/check/jhr/records?jhrid='+id+'&asc=true')
                .then(res=> {
                    if (res.success) {
                        for (let i = 0; i < res.data.length; i++) {
                            var type = ''
                            if (res.data[i].type=='1') {
                                type="申请创建"
                            } else if(res.data[i].type=='2') {
                                type="申请撤销"
                            }
                            this.Records.push({
                                index: i+1,
                                type:type,
                                auditor:res.data[i].auditor,
                                createTime:res.data[i].createTime,
                                message:res.data[i].message
                            })
                        }          
                    } else {
                        this.$Message.error(res.msg);
                    }
                }).catch(error=> {
                    console.log(error)
                })                
            },
            handleEdit(row){
                this.modalStatus.newAddModal=true;
                this.watchMsg(row);
            },
            delete(id){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除此条记录？",
                    onOk:function(){
                        _self.$http.delete("/check/jhr/"+id)
                        .then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功!');
                            }else{
                                this.$Message.error(result.msg);
                            }
                        });
                    }
                });
            },
            saveData(){
                var _self=this;
                if(!this.formLeft.shipname){
                    this.$Message.error("船名号不能为空");
                    return ;
                }
                if(!this.deptname){
                    this.$Message.error("所属部门不能为空");
                    return ;
                }
                if(!this.formLeft.captain){
                    this.$Message.error("船长不能为空");
                    return ;
                }
                if(!this.formLeft.captainTel){
                    this.$Message.error("船长手机号不能为空");
                    return ;
                }
                // if(!this.formLeft.captainWxdh){
                //     this.$Message.error("船长卫星电话号不能为空");
                //     return ;
                // }
                if(!this.formLeft.jhrname){
                    this.$Message.error("申请人（监护人）不能为空");
                    return ;
                }
                if(!this.formLeft.jhrIdcard){
                    this.$Message.error("申请人（监护人）身份证号不能为空");
                    return ;
                }
                if(!this.formLeft.jhrTel){
                    this.$Message.error("申请人（监护人）手机号不能为空");
                    return ;
                }
                if(_self.dimDateString.year==""||_self.dimDateString.mouth==""||_self.dimDateString.day==""){
                    this.$Message.error("请按正确的格式填写日期");
                    return;
                }
                _self.formLeft.applyDate=_self.dimDateString.year+"-"+_self.dimDateString.mouth+"-"+_self.dimDateString.day+" 00:00:00";
                if(_self.formLeft.id==undefined || isNull(_self.formLeft.id)){
                    _self.formLeft.creatorName=userObj.name;
                    _self.formLeft.deptid=_self.deptid;
                    _self.$http.post("/check/jhr",_self.formLeft)
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
                    _self.$http.patch("/check/jhr/update",_self.formLeft)
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
                    this.formLeft.shipname = query.shipName;
                    this.$set(this.formLeft,'shipName',query.shipName)
                }
                this.initSearch();
            },
        },
        beforeMount() {
            if(dept.type=="5"){
                this.showtree=false;
                this.downShow=true;
                this.query.key=dept.id;
                this.deptid=dept.id;
                this.deptname=dept.name;
            }else{
                this.showtree=true;
            }
            if(this.$hasRoles("JhrManager")){
                this.quanXianShow=true;
            }else{
                this.quanXianShow=false;
            }
        },
        mounted() {
            if (!this.isEmpty(this.$route.query)) {
                this.initQuery();
            } else {
                this.initSearch();
            }
            var date=new Date();
            this.nowDate.year=date.getFullYear();
            this.nowDate.month=date.getMonth()+1;
            this.nowDate.day=date.getDate();
        },
    };
    </script>      
    <style scoped>
        th,
        td {
            font-size: 14px;
            margin: 0px;
            padding: 0px;
        }
    
        table.regisbg {
            border-collapse: collapse;
            margin-bottom: 10px;
        }
    
        caption {
            font-size: 25px;
            font-weight: 700;
            padding-bottom: 10px;
        }
    
        table.regisbg th,
        table.regisbg td {
            border: 1px solid black;
            text-align: center;
            height: 49px;
        }
    
        .tdGK{
            width: 125px;
        }
    
        .tdCM{
            width: 100px;
        }
    
        input.sl {
            outline: none;
            border: 0px;
            text-indent: 2px;
        }
    </style>
                    
        
        
        