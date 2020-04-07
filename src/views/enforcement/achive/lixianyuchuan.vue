<style lang="less" scoped>
    @import '../styles/achive.less';
</style>
<template>
<div>
    <Row v-show="!listIF">
    <div style="margin-top:0px;">
        <data-table 
            ref="test"             
            :url="'/check/offLineShip/getDianYan'" 
            :params="query" 
            :columns="columns" 
            @on-row-dblclick="handleEdit"
            @on-selection-change="selectChange"
        >
        <div slot="search" style="margin-bottom:10px;">
            <Form :label-width="70" @submit.native.prevent>
                <Row>
                    <Col span="3" >
                        <Select @on-change="handleStatus" v-model="status" placeholder="请选择信息状态">
                            <Option value="0">待处理</Option>
                            <Option value="1">已处理</Option>
                            <Option value="2">公示</Option>
                        </Select>
                    </Col>
                    <div class="btn-wrap">
                            <label>渔船名：</label>
                            <input  @keyup.enter="initSearch()" v-model="query.shipName" placeholder="请输入..." style="width:200px" class="selec ivu-input"  id="input-line"/>
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()" >重置</Button>
                            <Button @click="publish()" type="info">发布</Button>
                    </div>
                </Row>
            </Form>
        </div>
        </data-table>
    </div>
    </Row>
    <Card v-show="listIF">
        <Row style="margin-bottom: 10px;">     
            <Col span="3" >
                <Select @on-change="handleStatus" v-model="status" placeholder="请选择信息状态">
                    <Option value="0">待处理</Option>
                    <Option value="1">已处理</Option>
                    <Option value="2">公示</Option>
                </Select>
            </Col>
            <Col span="10">
                <div style="margin-left:15px;">
                    <label>渔船名：&nbsp;&nbsp;</label>
                    <input  @keyup.enter="initSearch()" v-model="query.shipName" placeholder="请输入..." style="width:200px" class="selec ivu-input"  id="input-line"/>
                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                    <Button @click="handleReset()" >重置</Button>
                    <Button @click="publish()" type="info">发布</Button>
                </div>
            </Col>
        </Row>
        <Row style="margin-top:10px;">
            <!-- <Table   
                height="450" 
                border 
                :columns="columns"  
                :data="dataList" 
                :loading="false"
                v-show="!listIF"
                @on-selection-change="getUids"
            ></Table> -->
            <Table   
                height="470" 
                border 
                :columns="columnsIF"  
                :data="dataListIF" 
                :loading="false"
            ></Table>
            <Page 
                :styles="{'margin-left': '65%','margin-top': '10px'}"
                show-elevator
                show-sizer
                show-total
                :current="query.page" 
                :page-size="query.size"
                :total="totalNum"
                @on-page-size-change="pageSizeChangeIF"
                @on-change="changePageIF"
            ></Page>
        </Row>
    </Card>
         <Modal :styles="{top: '50px'}" v-model="modalDY" title="处理信息" width="50%" >
            <Form  :label-width="100" ref="data" :model="data" :rules="ruleValidate">
                <Row>
                    <Col span="24">
                        <span style="color:red;position:relative;left:13px;font-weight:bold;">渔船基本信息:</span>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="渔船名:">
                            <Input v-model="data.shipname" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="船主姓名:">
                            <Input v-model="data.owner" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="联系方式:">
                            <Input v-model="data.tel" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="渔船类型:">
                            <Input v-model="data.shiptype" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="主机功率:">
                            <Input v-model="data.power" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="作业类型:">
                            <Input v-model="data.worktype" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属市:">
                            <Input v-model="data.szcs" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="作业方式:">
                            <Input v-model="data.workmode" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属县区:">
                            <Input v-model="data.szxq" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="终端号码:">
                            <Input v-model="data.termno" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="所属乡镇:">
                            <Input v-model="data.szxz" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="终端类型:">
                            <Input v-model="data.termtype" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="24">
                        <span style="color:red;position:relative;left:13px;font-weight:bold;">渔船离线信息:</span>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="最后定位经度:">
                            <Input v-model="data.lastlon" readonly>
                            </Input> 
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="最后定位纬度:">
                            <Input v-model="data.lastlat" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="最后定位时间:">
                            <Input v-model="data.lasttime" readonly>
                            </Input> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="24">
                        <span style="color:red;position:relative;left:13px;font-weight:bold;">信息反馈以及处理结果:</span>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="离线原因:"  prop="offline">
                           <Select v-model="data.offline">
                                <Option value="故障">故障</Option>
                                <Option value="停港">停港</Option>
                                <Option value="生产">生产</Option>
                                <Option value="维修">维修</Option>
                                <Option value="无故不开机">无故不开机</Option>
                                <Option value="数据异常">数据异常</Option>
                                <Option value="船买卖">船买卖</Option>
                           </Select>
                        </FormItem>
                    </Col>     
                    <Col span="12">
                        <FormItem label="有效期限:"  prop="yxq">
                            <Input v-model="data.yxq">
                            </Input>
                        </FormItem>
                    </Col>            
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="跟踪原因:"  prop="reason">
                                <Input type="textarea" v-model="data.reason" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入内容"/> 
                        </FormItem>
                    </Col>                 
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="跟踪情况:"  prop="result">
                                <Input type="textarea"  v-model="data.result" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入内容"/> 
                        </FormItem>
                    </Col>                 
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="modalDY=false">取消</Button>
                <Button @click="dianyan('data')" type="info">保存</Button>
            </div>
         </Modal>
         <!-- 公示详情表 -->
         <Modal :styles="{top: '220px'}" v-model="modeliIFS" title="公示详情表" width="50%">
            <Row>
                <Table   
                    height="450" 
                    border 
                    :columns="columnsIFS"  
                    :data="dataListIFS" 
                    :loading="false"
                ></Table>
            </Row>
            <div slot="footer">
                <Button @click="modeliIFS=false" type="info">关闭</Button>
            </div>
         </Modal>
</div>
</template>
<script>
export default {
    name: "lixainyuchuan",
    data() {
        return {
            ruleValidate: {
                offline: [
                    { required: true, message: '请填写离线原因', trigger: 'blur' }
                ],
                yxq: [
                    { required: true, message: '请填写有效期限', trigger: 'blur' }
                ],
                reason: [
                    { required: true, message: '请填写跟踪原因', trigger: 'blur' },
                    { type: 'string', min: 0,  trigger: 'blur' }
                ],
                result: [
                    { required: true, message: '请填写跟踪情况', trigger: 'blur' },
                    { type: 'string', min: 0,  trigger: 'blur' }
                ],
            },
            status:"",
            uids:"",
            uidsLength:0,
            listIF:false,
            modalDY:false,
            modeliIFS:false,
            dataListIFS:[],
            columnsIFS:[
                {
                    title: "序号",
                    type: "index",//序号展示
                    width:96
                },
                {
                    title: "船名号",
                    key: "shipname",
                    width:135
                },
                {
                    title: "船东",
                    key: "owner",
                    width:135
                },
                {
                    title: "联系方式",
                    key: "tel",
                    width:135
                },
                {
                    title: "终端号码",
                    key: "termno",
                    width:135
                },
                {
                    title: "最后一次报位时间",
                    key: "lastpostime",
                    width:135
                },
                {
                    title: "公示次数",
                    key: "offLineCount",
                    width:135
                },
            ],
            dataListIF: [], 
            columnsIF:[
                {
                    title: "序号",
                    type: "index",//序号展示
                    align: 'center',
                },
                {
                    title: "名单",
                    key: "title",
                    align: 'center',
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    align: 'center',
                },
                {
                    title: "更新时间",
                    key: "updateTime",
                    align: 'center',
                },
                {
                    title: "操作",
                    key: "userId",
                    align: 'center',
                    render:(h,params)=>{
                        var _self=this;
                        var id = params.row.id;
                        var buttons = [];                      
                        buttons.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small'
                            },
                            style: {
                                "margin-right": '15px'
                            },
                            on: {
                                click: () =>{
                                    _self.modeliIFS=true;
                                    _self.$http.get("/check/offLinePublish/loadPublishInfo?publishId="+id)
                                    .then(res=>{
                                        _self.dataListIFS=res.data;
                                    });                       
                                }
                            }
                        }, '查看'));
                        return h("div", buttons);
                    },
                },
            ],
            dataList: [],   
            columns: [
                {
                    type: 'selection',
                    width: 120,
                    align: 'center'
                },
                {
                    title: "船名号",
                    key: "shipname",
                    align: 'center',
                },
                {
                    title: "船东",
                    key: "owner",
                    align: 'center',
                },
                {
                    title: "联系电话",
                    align: 'center',
                    key: "tel",
                },
                {
                    title: "船舶类型",
                    key: "shiptype",
                    align: 'center',
                },
                {
                    title:"作业类型",
                    key:"worktype",
                    align: 'center',
                },
                {
                    title:"作业方式",
                    key:"workmode",
                    align: 'center',
                },
                {   
                    title:"创建时间",
                    key:"createTime",
                    align: 'center',
                },
                {
                    title: "状态",
                    key: "id",
                    align: 'center',
                    width:190,
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var buttons = [];                      
                            if(_self.status == "0"|| _self.status==""){//如果考试是否发布 是否可以删除
                                buttons.push(h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: () =>{
                                        _self.getMessage(id);                       
                                    }
                                }
                                }, '待处理'));
                            }else if(_self.status == "1"){
                                buttons.push(h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: () =>{
                                        _self.getMessage(id);
                                    }
                                }
                                }, '已处理'));           
                            }
                        return h("div", buttons);
                    }
                },                   
            ],
            pageQuery:{
                id:"",
                offline:"",
                yxq:"",
                reason:"",
                result:""
            },
            totalNum:0,
            query:{
                sfdy:"0",
                shipName:"",
                page:1,
                size:10,
            },
            data:{
                shipname:"",//渔船名
                owner:"",//船主姓名
                tel:"",//联系方式
                shiptype:"",//渔船类型
                power:"",//主机功率
                worktype:"",//作业类型
                szcs:"",//所属市
                workmode:"",//作业方式
                szxq:"",//所属县区
                termno:"",//终端号码
                szxz:"",//所属乡镇
                termtype:"",//终端类型
                lastlon:"",//最后定位经度
                lastlat:"",//最后定位纬度
                lasttime:"",//最后定位时间
                offline:"",//离线原因
                reason:"",//跟踪原因
                result:"",//跟踪情况
                yxq:"",//有效期限
            },
        }
    },
    computed: {},
    methods: {
        initSearch() {
            var _self=this;
            if(_self.status=="" || _self.status=="0"){
                _self.query.sfdy="0"
                this.$refs.test.initSearch();
            }else if(_self.status=="1"){
                _self.query.sfdy="1"
                this.$refs.test.initSearch();
            }
        },
        handleReset() {
            this.query.shipName="";
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        selectChange(v){
            var uids=[];
            for(var i=0;i<v.length;i++){
                uids[i]=v[i].id;
            }
            this.uidsLength=uids.length;
            uids=uids.join(",");
            this.uids=uids;
        },

        liXianReason(v){
            this.data.offline=v;
        },
        publish(){//发布
            var _self=this;
            var nowTime=new Date();
            var year=nowTime.getFullYear();
            var month=nowTime.getMonth()+1;
            var day=nowTime.getDate();
            var title=year+"年"+month+"月"+day+"号"+"港外离线渔船名单";
            if(this.uidsLength==0 ||_self.status=="" || _self.status=="0"){
                if(this.uidsLength==0){
                    this.$Message.error("请先选择渔船");
                    return;
                }else{
                    this.$Message.error("请先点验渔船");
                    return;
                }
            }else{
                _self.$http.post("/check/offLinePublish/publish?unids="+_self.uids+"&title="+title)
                .then(res=>{
                    if(res.success){
                        _self.initSearch();
                        _self.$Message.info("success");
                    }
                })
            }
        },
        getPageListIF(){
            var _self=this;
            _self.$http.get("/check/offLinePublish/select?page="+_self.query.page+"&size="+_self.query.size)
            .then(res=>{
                _self.dataListIF=res.data;
                _self.totalNum=res.total;     
            })
        },
        pageSizeChangeIF(size) {
            this.query.size = size;
            this.getPageListIF();
        },
        changePageIF(page) {
            this.query.page = page;
            this.getPageListIF();
        },
        getMessage(id){//点验弹窗 获取信息
            var _self=this;
            this.$refs["data"].resetFields();
            _self.modalDY=true;
            _self.data={};
            _self.pageQuery.id=id;
            _self.$http.get("/check/offLineShip/"+id)
            .then(res=>{
                if(res.success){
                    _self.data=res.data;
                    _self.data.power=_self.data.power+"w";
                    _self.data.lastlat=_self.cacuLonLat(_self.data.lastlat);
                    _self.data.lastlon=_self.cacuLonLat(_self.data.lastlon);
                }
            });
        },
        handleEdit(msg){
            this.getMessage(msg.id);
        },
        cacuLonLat(a) {
            var degree = parseInt(a);
            var min = parseInt((a - degree) * 60);
            var sec = parseInt((a - degree) * 3600 - min * 60);
            return degree + ' ° ' + min + ' ′ ' + sec + ' ″ ';
        },
        dianyan(data){//点验修改保存数据
            var _self=this;
            _self.$refs[data].validate((valid) => {
                if(valid){
                    _self.pageQuery.offline=_self.data.offline;
                    _self.pageQuery.reason=_self.data.reason;
                    _self.pageQuery.result=_self.data.result;
                    _self.pageQuery.yxq=_self.data.yxq;
                    _self.$http.post("/check/offLineShip/offLineToDo",_self.pageQuery)
                    .then(res=>{
                        if(res.success){
                            _self.initSearch();
                            _self.modalDY=false;
                            _self.$Message.info("success");
                        }
                    });
                } else {
                    this.$Message.error('失败!');
                }
            })
        },
        handleStatus(s){
            var _self=this;
            if(s=="0"){
                _self.listIF=false;
                _self.status="0";
                _self.uidsLength=0;
                _self.initSearch();
            }else if(s=="1"){
                _self.listIF=false;
                _self.status="1";
                _self.uidsLength=0;
                _self.initSearch();
            }else if(s=="2"){//公示
                _self.listIF=true;
                _self.status="3";
                _self.uidsLength=0;
                _self.getPageListIF();
            }
        },
    },  
    mounted(){
    },
}
</script>

<style scoped>
</style>
      