<style lang="less" scoped>
    @import "../../../styles/common.less";
    @import "../../system/components/table.less";
</style>
<template>
    <div>
        <Row>
            <data-table 
            ref="test" 
            :withTree="true" 
            :useZtree="false"
            :treeParams="cities"
            :treeUrl="'/check/dy/tree'"
            @on-select-change="selectTreeChange" 
            :url="'/check/dy/whitelist'" 
            :params="query" 
            :columns="columns"
            @on-row-dblclick="handleEdit"
            >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="船名号:">
                                    <Input v-model="query.wheres.shipname" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="2" style="float:right;text-align:right;">
                                <Button @click="newAddModal()" type="success" icon="ios-add">新增</Button>
                            </Col>
                            <div class="btn-wrap">
                                <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                <Button @click="handleReset()" >重置</Button>
                                <Checkbox true-value="1" v-model="query.type" false-value="0" @on-change="sonDeptShow">子部门</Checkbox>
                            </div>
                        </Row>
                    </Form>
                </div>
            </data-table>
        </Row>
        <!--新增/修改-->
        <Modal :styles="{top: '220px'}" v-model="newModal" :title="title" width="50%" :mask-closable="maskclosable">
            <Form :label-width="70" ref="newAddMsg" :model="newAddMsg" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                        <FormItem label="渔船名:" prop="shipname">
                            <Input v-model="newAddMsg.shipname">
                                <Button slot="append" @click="checkShipLists">查询</Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="渔船状态:" prop="yczt" :label-width="100">
                            <Select v-model="newAddMsg.yczt">
                                <Option value="1">停航保养</Option>
                                <Option value="2">港内</Option>
                                <Option value="3">其他</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注:" prop="note" :label-width="58">
                            <Input v-model="newAddMsg.note" type="textarea" :autosize="{minRows: 3,maxRows: 5}">
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="newModal = false">取消</Button>
                <Button type="info" @click="saveData('newAddMsg')">保存</Button>
            </div>
        </Modal>
        <!-- 渔船信息 -->
        <Modal :width="860" :styles="{'z-index':1000,top: '130px'}" v-model="selectShipModal" title="渔船查询" :scrollable=true>
            <div slot="footer" >
                <Button  @click="selectShipModal = false">关闭</Button>
            </div>
            <Row>
            <Col span="24">
                <Row>
                <div>
                    <span>渔船名：</span>
                    <Input v-model="queryShip.wheres.shipname" @on-keydown.enter="searchShip(1)"  style="width:30%" placeholder="请输入..."></Input>
                    <Button style="margin-left:5px" @click="searchShip(1)" type="primary"  icon="ios-search">搜索</Button>
                    <Button @click="resetSearchShip()" >重置</Button>
                </div>
                </Row>
                <Row >
                <div style="margin-top:10px">
                    <Table :columns="columnsShip" :data="selectShipList" border :height="300"></Table>
                </div>
                </Row>
                <Row>
                <div class="bottom">
                    <Page show-total :total="totalNumShip" show-sizer show-elevator 
                    placement=top @on-page-size-change="pageSizeChangeShip" :page-size="queryShip.size" 
                    :current="queryShip.page" @on-change="changePageShip" ></Page>
                </div>
                </Row>
            </Col>
            </Row>
        </Modal>
    </div>     
</template>
<script>
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import { isNull, isEmpty } from "../../../libs/common";
export default {
    name: 'whitemenu',
    components: {
    },
    data () {
        return {
            ruleValidate: {
                yczt: [
                    { required: true, message: '请选择渔船状态', trigger: 'blur' }
                ],
                shipname: [
                    { required: true, message: '请选择渔船', trigger: 'blur' }
                ],
                note: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ],
            },
            maskclosable:false,
            selectShipModal:false,
            totalNumShip:0,
            queryShip:{
                key:"",//点击的机构id
                page:1,
                size:10,
                wheres:{
                    shipname:"",
                }
            },
            selectShipList: [],
            columnsShip: [
                {
                    title: "序号",
                    type: "index",
                    width: 80,
                    align: "center"
                },
                {
                    key: "b",
                    title: "船名号",
                    align: "center"
                },
                {
                    key: "c",
                    title: "渔船所有人",
                    align: "center"
                },
                {
                    key: "i",
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
            newModal:false,
            cities:{},
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '船名号',
                    align: 'center',
                    key: 'shipname'
                },
                {
                    title: '渔船状态',
                    align: 'center',
                    key: 'yczt',
                    render:(h,params)=>{
                        var yczt=params.row.yczt;
                        if(params.row.yczt=="1"){
                            return h("div","停航保养");
                        }else if(params.row.yczt=="2"){
                            return h("div","港内");
                        }else{
                            return h("div","其他");
                        }
                    }
                },
                {
                    title: '所属机构',
                    align: 'center',
                    key: 'organName'
                },
                {
                    title: '备注',
                    align: 'center',
                    ellipsis:true,
                    key: 'note'
                },
                {
                    title: '创建日期',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var temp = [];
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on:{
                                        click:()=>{
                                           _self.handleEdit2(id);
                                        }
                                    }                       
                                },"编辑"));
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    style: {
                                        marginLeft: '5px'
                                    },
                                    on:{
                                        click:()=>{
                                            _self.delete(id);
                                        }
                                    }                       
                                },"删除"));
                        return h("div", temp);
                    }
                },
            ],
            dataList: [],
            dataTotal:0,
            query:{
                key:"",//点击的机构id，如果不传，则指定用户所在机构的id为organid
                type:"1",//是否显示子部门 0 不显示   1 显示
                page:1,
                size:10,
                wheres:{
                    shipname:"",
                },
            },
            newAddMsg:{
                shipid:"",
                shipname:"",
                note:"",
                yczt:"",
            },
            sid:"",//机构id
            newUpdate:"",
            title:"",
            bid:"",//白名单记录id
        };
    },
    computed:{
        
    },
    methods: {
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.query.page = 1;
            this.query.size = 20;
            this.initSearch();
        },
        sonDeptShow(){
            this.initSearch();
        },
        selectTreeChange(msg){//树点击 刷新列表
            this.query.key=msg[0].id;
            this.initSearch();
            this.sid=msg[0].id;
        },
        checkShipLists(){//渔船信息列表
            var _self=this;
            _self.queryShip.key=_self.sid;
            _self.$http.get("/check/dy/yclist",{
                params:{
                    query:JSON.stringify(_self.queryShip)
                }
            })
            .then(res=>{
                if(res.success){
                    _self.selectShipModal=true;
                    _self.totalNumShip=res.data.total;
                    _self.selectShipList=res.data.data;
                }
            });
        },
        searchShip(value){//搜索
            this.checkShipLists();
        },
        resetSearchShip(){//重置
            this.queryShip.page = 1;
            this.queryShip.wheres.shipname="";
            this.searchShip();
        },
        selectedShip(info){//添加渔船
            this.newAddMsg.shipname=info.b;
            this.newAddMsg.shipid=info.a;
            this.selectShipModal=false;
        },
        handleEdit(msg){//双击 显示编辑弹窗
            this.handleEdit2(msg.id);
        },
        handleEdit2(id){//显示编辑弹窗
            var _self=this;
            this.newAddMsg.shipname="";
            this.newUpdate="修改";
            this.title="编辑白名单";
            this.$refs["newAddMsg"].resetFields();
            _self.$http.get("/check/dy/bmdinfo?bmdid="+id)
            .then(res=>{
                if(res.success){
                    _self.newModal=true;
                    _self.newAddMsg.shipname=res.data.shipname;
                    _self.newAddMsg=res.data;
                    _self.newAddMsg.yczt=res.data.yczt+"";
                    _self.bid=res.data.id;
                }
            });
        },
        newAddModal(){
            this.newAddMsg={};
            this.newUpdate="";
            this.title="新增白名单";
            this.$refs["newAddMsg"].resetFields();
            if(this.sid==""){
                this.$Message.error("请选择组织机构");
                return ;
            }
            this.newModal=true;
        },
        delete(id){
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除选中的白名单吗？",
                onOk:function(){
                    _self.$http.get("/check/dy/delbmd?id="+id)
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
        saveData(name){
            var _self=this;
            var params=null;
            if(_self.newUpdate=="修改"){
                params="/check/dy/updatebmd?id="+_self.bid+"&note="+_self.newAddMsg.note+"&yczt="+_self.newAddMsg.yczt+"&shipname="+_self.newAddMsg.shipname; 
            }else{
                params="/check/dy/addbmd?shipid="+_self.newAddMsg.shipid+"&note="+_self.newAddMsg.note+"&yczt="+_self.newAddMsg.yczt+"&shipname="+_self.newAddMsg.shipname; 
            }
            _self.$refs[name].validate((valid) => {
                if(valid){
                    _self.$http.get(params)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("操作成功");
                            _self.initSearch();
                            _self.newModal=false;
                        }else{
                            _self.$Message.error(res.msg);
                        }
                    });
                }
            })
        },
        pageSizeChangeShip(size){
            this.queryShip.size = size;
            this.searchShip();
        },   
        changePageShip(page){
            this.queryShip.page = page;
            this.searchShip();
        },
    },
    mounted() {
    },
};
</script>
        
    
    
    
    