<template>
    <div>
    <Card>
        <!-- <data-table ref="test" 
            :url="'/site/finshing/tard/page'" 
            :params="query" 
            :columns="columns" 
            >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                    <Row>
                        <Col span="6">
                            <Form-item label="姓名:">
                                <Input v-model="query.wheres.name_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()"  >重置</Button>
                            <Button @click="newAdd()" type="info" icon="ios-add" >新增</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </data-table> -->
        <Row>
            <div style="margin-bottom:5px;">
                <label>姓名:&nbsp;&nbsp;</label>
                <span style="display:inline-block;width:250px;"><Input placeholder="请输入..."/></span>
                <Button type="primary" icon="ios-search">搜索</Button>
                <Button  >重置</Button>
                <Button type="info" icon="ios-add" @click="newAdd()">新增</Button>
            </div>
        </Row>
        <Row>
            <Table   
                height="450" 
                border 
                :columns="columns"  
                :data="dataList" 
                :loading="false"
            ></Table>
        </Row>
        <Row>
            <Page 
            show-total 
            :total="totalNum" 
            show-sizer 
            show-elevator 
            placement=top 
            @on-page-size-change="pageSizeChange" 
            :page-size="query.size" 
            :current="query.page" 
            @on-change="changePage" 
            ></Page>
        </Row>
    </Card>
    <!-- 新增/修改 -->
    <Modal :styles="{top: '220px'}" ref="modal" v-model="nuModal" :title="title" width="50%" >
        <Form  :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="姓名:">
                        <Input v-model="nuMessage.name"/>
                    </FormItem>
                </Col>   
                <Col span="12">
                    <FormItem label="联系方式:">
                        <Input v-model="nuMessage.phone"/>
                    </FormItem>
                </Col>                 
            </Row>
            <Row >
                <Col span="12">
                    <FormItem label="渔船:">
                        <Input v-model="nuMessage.shipname"/>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="标题:">
                        <Input v-model="nuMessage.title"/>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="状态:">
                        <Select v-model="nuMessage.state">
                            <Option value="0">0</Option>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                </Col>   
                <Col span="12">
                    <FormItem label="交易价格:">
                        <Input v-model="nuMessage.money"/>
                    </FormItem>
                </Col>                 
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="详情:">
                        <Input v-model="nuMessage.details"/>
                    </FormItem>
                </Col>   
                <Col span="12">
                    <FormItem label="交易时间:">
                        <Input v-model="nuMessage.built"/>
                    </FormItem>
                </Col>                 
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="宽度:">
                        <Input v-model="nuMessage.width"/>
                    </FormItem>
                </Col>                    
            </Row>
            <Row v-show="detailModal">
                <FormItem label="网友评论:">
                <div style="height:150px;overflow:auto;">
                    <Col span="24">
                        <Table   
                            height="150" 
                            border 
                            :columns="columnsMessage"  
                            :data="dataListMessage" 
                            :loading="false"
                        ></Table>
                    </Col>
                </div>
                <Col>
                    <Page 
                    show-total 
                    :total="totalNumX" 
                    show-sizer 
                    show-elevator 
                    placement=top 
                    @on-page-size-change="pageSizeChangeX" 
                    :page-size="queryX.size" 
                    :current="queryX.page" 
                    @on-change="changePageX" 
                    ></Page>
                </Col>
                </FormItem>
            </Row>
        </Form>	
        <div slot="footer">
            <Button @click="nuModal = false">取消</Button>
            <Button type="info" @click="saveData()">保存</Button>
            <Button type="info" v-show="detailModal" @click="saveDataMessageModal()">新增评论</Button>
        </div>         
    </Modal> 
    <!-- 评论信息 新增/修改 -->
    <Modal :styles="{top: '220px'}" v-model="messageModal" title="评论" width="50%" >
        <Form  :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="网友姓名:">
                        <Input v-model="nuMessagePinlun.name"/>
                    </FormItem>
                </Col>   
                <Col span="12">
                    <FormItem label="flag:">
                        <Select v-model="nuMessagePinlun.flag">
                            <Option value="0">0</Option>
                            <Option value="1">1</Option>
                        </Select>
                    </FormItem>
                </Col>                 
            </Row>
            <Row >
                <Col span="24">
                    <FormItem label="留言信息:">
                        <textarea v-model="nuMessagePinlun.content" name="" rows="3" style="width:100%;"></textarea>
                    </FormItem>
                </Col>
            </Row>
        </Form>	
        <div slot="footer">
            <Button @click="messageModal = false">取消</Button>
            <Button type="info" @click="saveDateMessage()">保存</Button>
        </div>         
    </Modal> 
    </div>     
</template>
<script>
import {isNull } from '@/libs/common.js' 
var nuMessage={
    name:"",
    phone:"",
    shipname:"",
    title:"",
    state:"",
    money:"",
    details:"",
    built:"",
};
var nuMessagePinlun={
        name:"",
        content:"",
        flag:"",
        mid:"",
    };
export default {
    name: 'SystemLog',
    components: {
    },
    data () {
        return {
            title:"",
            nuModal:false,
            detailModal:false,
            messageModal:false,
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '联系方式',
                    align: 'center',
                    key: 'phone'
                },
                {
                    title: '渔船',
                    align: 'center',
                    key: 'shipname'
                },
                {
                    title: '标题',
                    align: 'center',
                    key: 'title'
                },
                {
                    title: '宽度',
                    align: 'center',
                    key: 'width'
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'state'
                },
                {
                    title: '交易价格',
                    align: 'center',
                    key: 'money'
                },
                {
                    title: '交易时间',
                    align: 'center',
                    key: 'built'
                },
                {
                    title: '详情',
                    align: 'center',
                    key: 'details'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {  
                        var _self=this;                  
                        var id = params.row.id;                    
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        icon:"compose",
                                        type: "info",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                           _self.updateMessage(params.row);
                                        }
                                    }
                                },                            
                                "修改"
                            ), 
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                           _self.detailMessage(params.row);
                                        }
                                    }
                                },                            
                                "详情"
                            ), 
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                            _self.deleteMessage(id);
                                        }
                                    }
                                },                            
                                "删除"
                            ),                        
                        );
                        return h("div", temp);
                    }
                },
            ],
            dataList: [],
            totalNum:0,
            query:{
                page:1,
                size:10,
                key:"getPageList",
            },
            columnsMessage:[
                {   
                    title:'序号',
                    type: 'index',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'state'
                },
                {
                    title: 'flag',
                    align: 'center',
                    key: 'flag'
                },
                {
                    title: '内容',
                    align: 'center',
                    key: 'content'
                },
                {
                    title:"操作",
                    align:"center",
                    render: (h, params) => {  
                        var _self=this;                  
                        var id = params.row.id;                    
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        icon:"compose",
                                        type: "info",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                           
                                        }
                                    }
                                },                            
                                "修改"
                            ), 
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                            
                                        }
                                    }
                                },                            
                                "删除"
                            ),                        
                        );
                        return h("div", temp);
                    }
                },
            ],
            dataListMessage: [],
            totalNumX:0,
            queryX:{
                page:1,
                size:10,
                key:"getPageList",
                wheres:{
                    title:"",
                    id:"",
                },
            },
            title:"",
            id:"",
            nuMessage:{
                name:"",
                phone:"",
                shipname:"",
                title:"",
                state:"",
                money:"",
                details:"",
                built:"",
                width:"",
            },
            nuMessagePinlun:{
                name:"",
                content:"",
                flag:"",
                mid:"",
            },
        };
    },
    computed:{
        
    },
    methods: {
        // initSearch() {
        //     this.$refs.test.initSearch();
        // },
        // handleReset() {
        //     // for (let key in this.query.wheres) {
        //     //     this.query.wheres[key] = "";
        //     // }
        //     this.query.page = 1;
        //     this.query.size = 10;
        //     this.initSearch();
        // },
        saveDataMessageModal(){
            this.messageModal=true;
            this.nuMessagePinlun=JSON.parse(JSON.stringify(nuMessagePinlun));
        },
        saveDateMessage(){
            var _self=this;
            _self.$http.post("/site/finshing/message/save",_self.nuMessagePinlun)
            .then(res=>{
                if(res.success){
                    this.messageModal=false;
                    _self.$Message.info("操作成功");
                    _self.queryX.wheres.id=_self.id;
                    _self.queryX.wheres.title=_self.title;
                    _self.getPageListX();
                }
            }); 
        },
        newAdd(){
            this.nuModal=true;
            this.detailModal=false;
            this.title="新增";
            this.$refs.modal.$options.propsData.styles.top="220px";
            this.nuMessage=JSON.parse(JSON.stringify(nuMessage));
        },
        updateMessage(row){
            var _self=this;
            _self.nuModal=true;
            this.detailModal=false;
            this.title="修改";
            // this.$refs.modal.$options.propsData.styles.top="220px";
            _self.$http.post("/site/finshing/tard/save",row)
            .then(res=>{
                if(res.success){
                    _self.nuMessage=res.data;
                }
            }); 
        },
        detailMessage(row){
            var _self=this;
            _self.nuModal=true;
            this.detailModal=true;
            this.title="详情";
            // this.$refs.modal.$options.propsData.styles.top="100px";
            _self.$http.post("/site/finshing/tard/save",row)
            .then(res=>{
                if(res.success){
                    console.log(res,"详情2");
                    _self.nuMessage=res.data;
                    _self.title=res.data.title;
                    _self.id=res.data.id;
                    _self.queryX.wheres.id=res.data.id;
                    _self.queryX.wheres.title=res.data.title;
                    _self.getPageListX();
                }
            }); 
        },
        deleteMessage(id){
            var _self=this;
            _self.$http.delete("/site/finshing/tard/"+id)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("操作成功");
                    _self.getPageList();
                }
            });
        },
        saveData(){
            var  _self=this; 
            _self.$http.post("/site/finshing/tard/save",_self.nuMessage)
            .then(res=>{
                if(res.success){
                    _self.nuMessage=res.data;
                    _self.$Message.info("操作成功");
                    _self.nuModal=false;
                    _self.getPageList();
                }
            });
        },
        getPageListX(){
            var _self=this;
            _self.$http.get("/site/finshing/message/page",{
                params:{
                    _model:JSON.stringify(_self.queryX)
                }
            })
            .then(res=>{
                if(res.success){
                    console.log(111);
                    _self.dataListMessage=res.data.data;
                    _self.totalNumX=res.data.total;
                }
            })
        },
        getPageList(){
            var _self=this;
            _self.$http.get("/site/finshing/tard/page",{
                params:{
                    query:JSON.stringify(_self.query)
                }
            })
            .then(res=>{
                if(res.success){
                    // console.log(res,"测试");
                    _self.dataList=res.data.data;
                    _self.totalNum=res.data.total;
                }
            })
        },
        //搜索
        handleSearch(page) {
            this.query.page=1;
            this.getPageList();
        },  
        //重置
        handleReset(){   
            this.query.shipname="";
            this.getPageList();
        },
        // 页面条数选择
        pageSizeChangeX(size) {
            this.query.size = size;
            this.getPageListX();
        },
        // 分页查询
        changePageX(page) {
            this.query.page = page;
            this.getPageListX();
        },
        // 页面条数选择
        pageSizeChange(size) {
            this.query.size = size;
            this.getPageList();
        },
        // 分页查询
        changePage(page) {
            this.query.page = page;
            this.getPageList();
        },
    },
    mounted() {
        this.getPageList();
        // this.initSearch();
    },
};
</script>
        
    
    
    
    