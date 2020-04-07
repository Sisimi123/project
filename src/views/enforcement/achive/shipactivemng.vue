<style lang="less" scoped>
    @import '../styles/achive.less';
</style>
<template>
    <div>
        <Row>
            <Col span="24">
                <data-table ref="test" 
                    :url="'/check/bianzu/page'" 
                    :params="query" 
                    :columns="columns" 
                    @on-row-dblclick="handleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="64" @submit.native.prevent>
                            <Row>
                                <Col span="5">
                                    <Form-item label="编组名称:">
                                        <Input v-model="query.wheres.name"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <div class="btn-wrap">
                                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                    <Button @click="handleReset()"  >重置</Button>
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                                </div>         
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Col>
        </Row>
        <!-- 新增编组 -->
        <Modal v-model="newAddModal" :styles="{top: '220px'}" title="新增" width="30%">
            <Form :label-width="90" ref="bianZuName" :model="bianZuName" :rules="ruleValidateBianzu">
                <Row>
                    <FormItem label="编组名称：" prop="name">
                        <Input v-model="bianZuName.name" placeholder="请输入"/>
                    </FormItem>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="newAddModal = false">取消</Button>
                <Button type="info" @click="saveNewAdd('bianZuName')">保存</Button>
            </div>
        </Modal>
        <!-- 详情 -->
        <Modal v-model="detailModal" v-if="show" title="详情" width="980" :styles="{top: '150px'}">
            <Form :label-width="80">
                <Row>
                    <Table   
                        height="450" 
                        border 
                        :columns="columnsDetail"  
                        :data="dataListDetail" 
                        :loading="false" 
                    ></Table>
                </Row>
            </Form>
            <div slot="footer"> 
                <Button type="info" @click="detailModal = false">关闭</Button>
            </div>
        </Modal>
        <!-- 所有渔船信息 -->
        <Modal :width="860" :styles="{'z-index':1000,top: '180px'}" v-model="status.selectShip" title="渔船查询" :scrollable=true>
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
                    <Button @click="resetSelectShip()" >重置</Button>
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
    </div>
</template>
<script>
export default {
    name: "shipactivemng",
    data() {
        return {
            show:true,
            ruleValidateBianzu: {
                name: [
                    { required: true, message: '请输入渔船名', trigger: 'blur' }
                ],
            },
            status:{
                selectShip:false,
            },
            detailModal:false,
            newAddModal:false,
            totalNum:0,
            columns:[
                {
                    title: "序号",
                    type: "index",
                    align: 'center',
                    width:160
                },
                {
                    title: "编组名称",
                    align: 'center',
                    key: "name",
                },
                {
                    title: "创建时间",
                    align: 'center',
                    key: "createTime",
                },
                {
                    title: "操作",
                    align: 'center',
                    key:"id",
                    width:315,
                    render:(h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var buttons = [];
                        buttons.push(
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: ()=>{
                                        _self.newBianzu(params.row);                                      
                                    }
                                }
                                }, '新增编组渔船'), 
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: ()=>{
                                        _self.detail(params.row);                                      
                                    }
                                }
                                }, '详情'),   
                                h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: ()=>{
                                        _self.$Modal.confirm({
                                            title:"提示",
                                            content:"确定要删除当前栏目吗？",
                                            onOk:function(){
                                                _self.$http.delete("/check/bianzu/"+id).then(result =>{
                                                    if(result.success){
                                                        _self.initSearch();
                                                        _self.$Message.success('删除成功!');
                                                    }else{
                                                        _self.$Message.info(result.msg);
                                                    }
                                                });
                                            
                                            }
                                        });                                   
                                    }
                                }
                                }, '删除'),                   
                        );                      
                        return h('div', buttons);
                    }
                }
            ],
            dataList:[],
            totalNumDetail:0,
            columnsDetail:[
                {
                    title: "序号",
                    type: "index",
                    align: 'center',
                    width:150
                },
                {
                    title: "渔船名",
                    align: 'center',
                    key: "shipname",
                },
                {
                    title: "船东",
                    align: 'center',
                    key: "owner",
                },
                {
                    title: "联系方式",
                    align: 'center',
                    key: "tel",
                },
                {
                    title: "操作",
                    align: 'center',
                    key:"id",
                    render:(h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var buttons = [];
                        buttons.push(
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: ()=>{
                                        _self.removeShip(id);                                    
                                    }
                                }
                                }, '删除'),                        
                        );                      
                        return h('div', buttons);
                    }
                }
            ],
            dataListDetail:[],
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
                    "确认添加"
                    );
                }
                }
            ],
            selectShipList: [],
            queryDetail: {
                name:"",//（编组名称）
                shipName:"",//(渔船名)
                curPage:1,//（页码）
                pageSize:10,//（页面大小）
            },
            query: {
                key:"getPageList",
                page:1,//（页码）
                size:10,//（页面大小）
                wheres:{
                    name:"",
                }
            },
            bianZuName:{
                name:"",
            },
            dataInfo:{
                id:"",
                shipId:"",
                bianzhuId:"",
                shipname:"",//渔船名
                owner:"",//船东名字
                tel:"",//联系电话
                createTime:new Date(),//创建时间
            },
            name:"",
            shipId:"",
            bianzhuId:"",
        }
    },
    computed: {},
    methods: {
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
        newAdd(){//新增编组弹窗
            var _self=this;
            this.$refs["bianZuName"].resetFields();
            _self.newAddModal=true;
            _self.bianZuName.name="";
        },
        saveNewAdd(name){//新增编组
            var _self=this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    _self.$http.post("/check/bianzu",_self.bianZuName)
                    .then(res=>{
                        if(res.success){
                            _self.initSearch();
                            _self.newAddModal=false;
                            _self.$Message.info("操作成功");
                        }
                    })
                }else {
                    this.$Message.error('失败!');
                }
            })
        },
        handSearch(){//搜索
            this.initSearch();
        },
        handReset(){//重置
            this.query.wheres.name="";
            this.initSearch();
        },
        detailS(){
            var _self=this;
            _self.queryDetail.name=_self.name;
            _self.$http.get("/check/bianzu/select?shipName="+_self.queryDetail.shipName+"&name="+_self.queryDetail.name+"&curPage="+_self.queryDetail.curPage+"&pageSize"+_self.queryDetail.pageSize)
            .then(res=>{
                if(res.success){
                    _self.dataListDetail=res.data.data;
                    _self.totalNumDetail=res.data.total;
                    _self.detailModal=true;
                }
            })
        },
        detail(data){//详情弹窗
            var _self=this;
            _self.bianzhuId=data.id;
            _self.name=data.name;
            _self.queryDetail.name=data.name;
            _self.detailS();
        },
        newBianzu(data){
            var _self=this;
            _self.bianzhuId=data.id;
            _self.name=data.name;
            _self.queryDetail.name=data.name;
            this.selectShip();
        },
        handleEdit(msg){
            var _self=this;
            _self.bianzhuId=msg.id;
            _self.name=msg.name;
            _self.queryDetail.name=msg.name;
            _self.detailS();
        },
        removeShip(shipId){//删除编组渔船
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前栏目吗？",
                onOk:function(){
                    _self.$http.delete("/check/bianzu/deleteShuJu?id="+shipId)
                    .then(result =>{
                        if(result.success){
                            _self.show=false;
                            _self.detailS();
                            _self.show=true;
                            _self.$Message.success('删除成功!');
                        }else{
                            _self.$Message.info(result.msg);
                        }
                    });
                
                }
            });
        },
        handleSelectShip() {
            this.status.selectShip = true;
            this.selectShip();
        },
        resetSelectShip(){
            this.queryX.page = 1;
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
                this.status.selectShip=true;
                this.totalNumX= res.data.total;
                this.selectShipList = res.data.data;
                this.status.selectShiploading = false;
            })
        },
        selectedShip(info) {
            var _self=this;
            _self.dataInfo.shipname = info.nametheShip;
            _self.dataInfo.owner = info.namevesselOwner;
            _self.dataInfo.tel = info.shipOwnerTelephone;
            _self.dataInfo.shipId=info.uniqIdenVessInfo;
            _self.dataInfo.id=info.id;
            _self.dataInfo.bianzhuId=_self.bianzhuId;
            var dataInfo={
                shipId:_self.dataInfo.shipId,
                bianzhuId:_self.dataInfo.bianzhuId
            }
            var dataInfo2={
                id:_self.dataInfo.id,
                shipid:_self.dataInfo.shipId,
                shipname:_self.dataInfo.shipname,
                owner:_self.dataInfo.owner,
                tel:_self.dataInfo.tel
            }
            _self.$http.post("/check/bianzu/insert",dataInfo)
            .then(res=>{
                if(res.success){
                    _self.status.selectShip = false;
                    _self.$Message.info("操作成功");
                }else{
                    _self.$Message.error(res.msg);
                }
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
    },  
    mounted(){
    },
}
</script>

<style scoped>


</style>
      