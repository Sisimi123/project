<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <div>
            <Row>
                <Col span="24">
                    <Card>
                        <Row>
                            <Input v-model="query.name" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            <Button type="info" @click="newModel">新增</Button>
                            <MyUpload :action="'/workflow/models/uploadFile'"
								:format="['bpmn','xml']"  
								:on-success="uploadFile"
								:on-format-error="handleFormatError"
								style="display:contents;display: -webkit-inline-box;">
					            <Button type="warning" >导入</Button>
					        </MyUpload>
                        </Row>
                        <Row class="margin-top-5">
                            <Table  :height="clientHeight-222" size="small" border highlight-row :columns="columnList" :data="dataList"></Table>
                        </Row>
                        <Row class="margin-top-5">
                            <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
        <Modal v-model="dataModal" title="新增" :mask-closable=false width="620">
            <Form ref="dataInfo" :model="dataInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="24">
                        <FormItem label="名称:" prop="name">
                            <Input v-model="dataInfo.name" placeholder="请输入名称..."></Input>
                        </FormItem>
                        
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="类型:">
                            <Input v-model="dataInfo.category" placeholder="请输入类型..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="备注:">
                    <Input v-model="dataInfo.description" type="textarea" placeholder="请输入备注..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="dataModal=false">取消</Button>
                <Button type="primary" @click="saveModel">保存</Button>
            </div>
        </Modal>

        <Modal v-model="processModal" title="流程列表" :mask-closable=false width="720">
            <Table :height="300" size="small" border highlight-row :columns="processColumnList" :data="processDataList"></Table>
        </Modal>
    </div>
</template>

<script>
import {dataToParams} from '../../api/request';
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
    name: 'SystemLog',
    components: {
		MyUpload
    }, 
    data () {
        var _self=this;
        return {
            columnList: [
                {   
                    title:'ID',
                    width: 120,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '名称',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '部署ID',
                    width: 120,
                    align: 'center',
                    key: 'deploymentId'
                },
                {
                    title: '版本号',
                    width: 100,
                    align: 'center',
                    key: 'version'
                },
                {
                    title: '创建时间',
                    width: 160,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '更新时间',
                    width: 160,
                    align: 'center',
                    key: 'lastUpdateTime'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 400,
                    align: 'center',
                    render: (h, params) => {
                        var temp=[];
                        var row=params.row;
                        temp.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.editModel(row);
                                    }
                                }
                            }, '修改'));

                        temp.push(h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.openModeler(row);
                                    }
                                }
                            }, '流程图设计'));

                        temp.push(h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.deployModel(row);
                                    }
                                }
                            }, '部署'));
                        
                        temp.push(h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.deployModelList(row);
                                    }
                                }
                            }, '部署列表'));

                         temp.push(h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.exportModel(row);
                                    }
                                }
                            }, '导出'));

                         temp.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        _self.removeModel(row);
                                    }
                                }
                            }, '删除'));
                        return h('div', temp);
                    }
                }
            ],
            dataList: [],
            dataTotal:0,
            query:{
                page:1,
                size:20,
                name:""
            },
            dataModal:false,
            dataInfo:{},
            ruleValidate: {
                name: [
                    { required: true, message: '名称不能为空！', trigger: 'blur' }
                ],
                category: [
                    { required: true, message: '类型不能为空！', trigger: 'blur' },
                ]
            },
            processModal:false,
            processColumnList:[
                {
                    title: '名称',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '部署ID',
                    width: 120,
                    align: 'center',
                    key: 'deploymentId'
                },
                {
                    title: '版本号',
                    width: 100,
                    align: 'center',
                    key: 'version'
                },
                {
                    title: '状态',
                    width: 70,
                    align: 'center',
                    key: 'suspensionState',
                    render: (h, params) => {
                        var state=params.row.suspensionState;
                        return h('div', state=="1"?"激活":"挂起");
                    }
                },
                {
                    title: '部署时间',
                    width: 150,
                    align: 'center',
                    key: 'deployTime'
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     width: 100,
                //     align: 'center',
                //     render: (h, params) => {
                //         var temp=[];
                //         var row=params.row;
                //         var state=params.row.suspensionState;
                //         temp.push(h('Button', {
                //                 props: {
                //                     type: state==1?'error':'info',
                //                     size: 'small'
                //                 },
                //                 style: {
                //                     marginRight: '5px'
                //                 },
                //                 on: {
                //                     click: () => {
                //                         if(state==1)
                //                             _self.editModel(row);
                //                         else
                //                             _self.editModel(row);
                //                     }
                //                 }
                //             }, state!="1"?"激活":"挂起"));
                //         return h('div', temp);
                //     }
                // }
            ],
            processDataList:[]
        };
    },
    computed:{
        clientHeight(){
            return this.$store.state.app.clientHeight;
        }
    },
    methods: {
        newModel(){
            this.dataInfo={};
            this.dataModal=true
        },
        editModel(row){
            var _self=this;
            _self.$http.get("/workflow/models/"+row.id)
            .then(function(result){
                if(result.success){
                    _self.dataInfo=result.data;
                    _self.dataModal=true;
                }
            });
        },
        saveModel(){
            var _self=this;
            _self.$http.post("/workflow/models/save",dataToParams(_self.dataInfo))
            .then(function(result){
                if(result.success){
                    _self.getPageList();
                    _self.openModeler(result.data);
                    _self.dataModal=false;
                }
                _self.$Message.info(result.msg);
            });
        },
        removeModel(row){
            var _self=this;
            _self.$Modal.confirm({
                title:"请确认",
                content:"是否删除流程模型？",
                onOk:function(){
                    _self.$http.delete("/workflow/models/"+row.id)
                    .then(function(result){
                        if(result.success){
                            _self.getPageList();
                        }
                        _self.$Message.info(result.msg);
                    });
                }
            });
            
        },
        handleFormatError:function(file) {
            this.$Message.error("文件格式不支持上传！");
        },
        uploadFile(response, file, fileList){
            if(response.success){
                this.getPageList();
                this.$Message.info("导入成功！");
            }else{
                this.$Message.error(response.description);
            }
        },
        exportModel(row){
            var _self=this;
            _self.$Modal.confirm({
                title:"请确认",
                content:"是否导出流程模型？",
                onOk:function(){
                    window.open(this.$basePath+"/workflow/models/export/"+row.id);
                }
            });
        },
        deployModel(row){
            var _self=this;
            _self.$Modal.confirm({
                title:"请确认",
                content:"是否部署流程模型？",
                onOk:function(){
                    _self.$http.post("/workflow/deploys/model/"+row.id)
                    .then(function(result){
                        if(result.success){
                            _self.getPageList();
                        }
                        _self.$Message.info(result.msg);
                    });
                }
            });
        },
        deployModelList(row){
            var _self=this;
            console.log(row);
            _self.$http.get("/workflow/deploys/process",{
                params:{
                    key:row.key
                }
            })
            .then(function(result){
                if(result.success){
                    _self.processDataList=result.data;
                    _self.processModal=true;
                }
                _self.$Message.info(result.msg);
            });
        },
        openModeler(row){
            var _self=this;
            _self.$Modal.confirm({
                title:"请确认",
                content:"是否设计流程模型？",
                onOk:function(){
                    window.open(this.$basePath+"/static/modeler.html?modelId="+row.id);
                }
            });
        },
        handleSearch(){
            this.query.page=1;
            this.getPageList();
        },
        pageChange(page){
            this.query.page=page;
            this.getPageList();
        },
        pageSizeChange(size){
            this.query.size=size;
            this.getPageList();
        },
        getPageList(){
            var _self=this;
            _self.$http.get("/workflow/models",{
                params:  _self.query
            }).then(function(result){
                if(result.success){
                    console.log(result.data);
                    _self.dataList=result.data.data;
                    _self.dataTotal=result.data.total;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    },
    mounted() {
        var _self=this;
        this.getPageList();
    }
};
</script>
