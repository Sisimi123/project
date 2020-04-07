<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <div>
            <Row>
                <Col span="5" class="height-100" >
                    <Card class="MainLeftCard" :style="'height:'+(clientHeight-113)+'px'">
                        <p slot="title">
                            <Icon type="ios-home"></Icon>
                            应用管理
                        </p>
                        <Row>
                            <div class="LeftCardBody" :style="'height:'+(clientHeight-165)+'px;'">
                                <!-- <div class="LeftCardHead" v-if="false">
                                    <Input v-model="treeSearch" icon="ios-search" size="small"></Input>
                                </div> -->
                                <div class="LeftCardContent" style="padding-top: 8px !important;" >
                                    <Tree ref="appTree" :data="appTree" @on-select-change="selectChange" ></Tree>
                                </div>
                            </div>
                        </Row>
                    </Card>
                </Col>
                <Col span="19" class="padding-left-6">
                    <Card :style="'height:'+(clientHeight-113)+'px'">
                        <Row>
                            <Input v-model="dataFilter" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            <!-- <Button type="info" @click="newModuleInfo">新增菜单</Button>
                            <Button type="primary" @click="editModuleInfo">修改菜单</Button>
                            <Button type="error" @click="removeModule">删除菜单</Button> -->
                            <div style="float:right">
                                <Button type="info" @click="newDataInfo">新增大模块</Button>
                                <!-- <Button type="primary" @click="editAppInfo">修改应用</Button> -->
                            </div>
                        </Row>
                        <Row class="margin-top-5">
                            <MyTreeGrid ref="dataGrid" :height="clientHeight-180" size="small" border :columns="columnList" :data="filterTree" expandUrl="/$admin/modules/node"></MyTreeGrid>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="dataModal" :title="modelTitle" :mask-closable=false width="820">
            <Form ref="dataInfo" :model="dataInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="19">
                        <Row>
                            <Col span="8">
                                <FormItem label="菜单名称:" prop="name">
                                    <Input v-model="dataInfo.name" placeholder="请输入菜单名称..."></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="菜单代码:" prop="code" >
                                    <Input v-model="dataInfo.code" placeholder="请输入菜单代码..." ></Input>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="类型:" prop="type">
                                    <Select v-model="dataInfo.type"  :disabled="true">
                                        <Option v-for="item in moduleTypes" :value="item.value" :key="item.value">{{item.title}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <FormItem label="状态:" prop="status">
                                    <Select v-model="dataInfo.status" >
                                        <Option v-for="item in moduleStatuss" :value="item.value" :key="item.value">{{item.title}}</Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <!-- <Col span="8">
                                <FormItem label="菜单图标:" prop="icon">
                                    <Input v-model="dataInfo.icon" placeholder="请输入菜单图标..."></Input>
                                </FormItem>
                            </Col> -->
                            <!-- <Col span="8">
                                <FormItem label="模块归属:" prop="icon">
                                    <Select v-model="dataInfo.belong" >
                                        <Option value="0">桌面端和移动端</Option>
                                        <Option value="1">桌面端和管理版</Option>
                                        <Option value="2">仅桌面端</Option>
                                        <Option value="3">桌面端和公众版</Option>
                                        <Option value="4">仅移动端</Option>
                                        <Option value="5">仅管理版</Option>
                                        <Option value="6">仅公众版</Option>
                                    </Select>
                                </FormItem>
                            </Col>  -->
                          
                            <Col span="8">
                                <FormItem label="缓存:" prop="notCache">
                                    <RadioGroup v-model="dataInfo.notCache" type="button">
                                        <Radio label="1">不缓存</Radio>
                                        <Radio label="0">缓存</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="左侧菜单:" prop="showInMenu">
                                    <RadioGroup v-model="dataInfo.showInMenu" type="button">
                                        <Radio label="1">显示</Radio>
                                        <Radio label="0">隐藏</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <FormItem label="父菜单:" prop="showAlways">
                                    <RadioGroup v-model="dataInfo.showAlways" type="button">
                                        <Radio label="1">显示</Radio>
                                        <Radio label="0">隐藏</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="面包屑:" prop="showInBread">
                                    <RadioGroup v-model="dataInfo.showInBread" type="button">
                                        <Radio label="1">显示</Radio>
                                        <Radio label="0">隐藏</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <Col span="8">
                                <FormItem label="排序:" prop="sort">
                                    <InputNumber v-model="dataInfo.sort" placeholder="请输入排序..." style="width:100%"></InputNumber>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="5" >
                        <IconUpload v-model="dataInfo.icon" moduleId="modules" action="edit" :width="160" :height="150" style="margin-left:5px;">
                            <div slot="upload" style="height:150px;padding-top:40px">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>请上传模块图标！</p>
                            </div>
                        </IconUpload>
                    </Col>
                </Row>
                 <Row>
                    <Col span="24">
                        <FormItem label="路由地址:" prop="rpath">
                            <Input v-model="dataInfo.rpath" placeholder="请输入路由地址..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="菜单组件:" prop="component">
                            <Input v-model="dataInfo.component" placeholder="请输入菜单组件..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="外部链接:" prop="component">
                            <Input v-model="dataInfo.href" placeholder="请输入外部链接..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="备注:" prop="note">
                            <Input v-model="dataInfo.note" placeholder="请输入备注..."></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            </Row>
            <div slot="footer">
                <Button @click="dataModal=false">取消</Button>
                <Button type="primary" @click="saveDataInfo()" style="margin-right: 8px">保存</Button>
            </div>
        </Modal>

        <Modal v-model="authorizeModal" :mask-closable=false width="720">
            <h3 slot="header" style="color:#2D8CF0;margin-left:5px">模块授权</h3>
            <Form ref="authorizeModal" :model="dataInfo" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="模块名称:">
                            <Input v-model="dataInfo.name"  readonly></Input>
                        </FormItem>
                        <FormItem label="模块代码:">
                            <Input v-model="dataInfo.code"  readonly></Input>
                        </FormItem>
                        <FormItem label="模块组件:">
                            <Input v-model="dataInfo.component" type="textarea" :autosize="{minRows: 2,maxRows: 3}"  readonly></Input>
                        </FormItem>
                    </Col>
                    <Col span="11" offset="1">
                        <div style="height:250px;overflow-y:auto;border:1px solid #FFF">
                            <!-- <Tree ref="roleTree" :data="filterRoleTree" show-checkbox empty-text="数据加载中。。。"></Tree> -->
                            <newZtree ref="roleTree" :treeData="filterRoleTree" :chkboxType="{'Y':'','N':''}" :withCard="false"></newZtree>
                        </div>
                    </Col>
                </Row>
            </Form>
            </Row>
            <div slot="footer">
                <Button @click="authorizeModal=false">取消</Button>
                <Button type="primary" @click="saveRoleInfo()" style="margin-right: 8px">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import MyTreeGrid from '../components/treeGrid/MyTreeGrid.vue';
import IconUpload from '../components/Upload/IconUpload.vue';
import newZtree from '@/views/components/treeGrid/newZtree.vue';
import {saveModule,getModuleById,getModules,deleteModuleById,saveModuleRole,getModuleTree} from '../../api/system';
import {isNull,isEmpty} from '../../libs/common'
export default {
    name: 'SystemModule',
    components: {
        MyTreeGrid,
        IconUpload,
        newZtree
    },
    data () {
        var _self=this;
        return {
            authorizeModal: false,
            roleTree:[],
            columnList: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '菜单名称',
                    type: "tree",
                    width: 300,
                    align: 'left',
                    key: 'name'
                },
                {
                    title: '菜单代码',
                    width: 200,
                    align: 'left',
                    key: 'code'
                },
                {
                    title: '组件',
                    align: 'left',
                    key: 'component'
                },
                {
                    title: '类型',
                    width: 100,
                    align: 'center',
                    key: 'type',
                    render: (h, params) => {
                        return h('span',_self.$store.getters.getDictName("system_moduletype",params.row.type));
                    }
                },
                {
                    title: '状态',
                    width: 70,
                    align: 'center',
                    key: 'status',
                    render: (h, params) => {
                        return h('span',_self.$store.getters.getDictName("system_modulestatus",params.row.status));
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 240,
                    align: 'center',
                    render: (h, params) => {
                        var id=params.row.id;
                        var buttons=[];
                        if(params.row.type=="T"||params.row.type=="M")
                            buttons.push(h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.newDataInfo(params.row);
                                        }
                                    }
                                }, '新增'));
                        buttons.push(h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.editDataInfo(params);
                                    }
                                }
                            }, '修改'));
                        
                        buttons.push(h('Button', {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.authorize(params);
                                    }
                                }
                            }, '授权'));

                        buttons.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        _self.removeDataInfo(params);
                                    }
                                }
                            }, '删除'))

                        return h('div', buttons);
                    }
                }
            ],
            dataFilter:"",
            dataList: [],
            dataTotal:0,
            ruleValidate: {
                name: [
                    { required: true, message: '模块名称不能为空！', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '模块代码不能为空！', trigger: 'blur' },
                ],
                // component: [
                //     { required: true, message: '模块组件不能为空！', trigger: 'blur' },
                // ],
                component:[{validator:function(rule, value, callback){
                    var component= _self.dataInfo.component;
                    var href= _self.dataInfo.href;
                    if (isEmpty(component)&& isNull(href)) {
                        return callback(new Error('模块组件和链接不能都为空！'));
                    }
                    callback();
                },trigger: 'blur'}],
                type: [
                    { required: true, message: '模块类型不能为空！', trigger: 'change' },
                ],
                showInMenu: [
                    { required: true, message: '左侧菜单不能为空！', trigger: 'change' },
                ],
                showInBread: [
                    { required: true, message: '面包屑不能为空！', trigger: 'change' },
                ],
                showAlways: [
                    { required: true, message: '父菜单不能为空！', trigger: 'change' },
                ],
                belong: [
                    { required: true, message: '模块归属不能为空！', trigger: 'change' },
                ],
                status: [
                    { required: true, message: '状态不能为空！', trigger: 'change' },
                ],
                // sort: [
                //     { required: true, message: '排序不能为空！', trigger: 'blur' },
                // ]
            },
            dataModal:false,
            dataQuery:{
                appId:"",
                status:"1,2,3"
            },
            dataInfo:{
            },
            appQuery:{
                wheres:{
                    status_eq:"1"
                },
                orders:"sort asc,createTime desc"
            },
            appTree:[]
        };
    },
    computed:{
        moduleTypes(){
            return this.$store.getters.getDictList("system_moduletype");
        },
        moduleStatuss(){
            return this.$store.getters.getDictList("system_modulestatus");
        },
        readOnly(){
            return !isEmpty(this.dataInfo.id);
        },
        modelTitle(){
            return isEmpty(this.dataInfo.id)?"新增模块":"编辑模块";
        },
        filterRoleTree(){
            var tree=this.$util.deepCopy(this.roleTree);
            return this.$util.diguiTree(tree,"");
        },
        filterTree(){
            var tree=this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        }
    },
    methods: {
        loadAppTree(){
            this.$http.get("/$admin/apps/tree",{params:{
                query:JSON.stringify(this.appQuery)
            }})
            .then(res=>{
                if(res.success){
                    this.appTree=res.data;
                }
            })
        },
        selectChange(nodes){
            if(nodes.length>0){
                this.dataQuery.appId=nodes[0].id
            }else{
                this.dataQuery.appId="";
            }
            this.loadDataTree();
        },
        handleSearch(){
            // var tree=this.$util.deepCopy(this.dataList);
            // return this.$util.diguiTree(tree,this.dataFilter);
        },
        newDataInfo(row){
            var _self=this;

            var nodes=this.$refs["appTree"].getSelectedNodes();
            if(nodes.length==0||nodes[0].type!='A'){
                this.$Message.info("请选择应用！");
                return;
            }
            
            _self.handleReset("dataInfo");
            var flag=(isNull(row)||isEmpty(row.id));
            var type="";
            if(flag){
                type="T"
            }else if(row.type=="T"){
                type="M"
            }else if(row.type=="M"){
                type="V"
            }

            _self.dataInfo={
                parentId:flag?"root":row.id,
                type:type,
                status:'1',
                sort:100,
                creatorAppId:nodes[0].id,
                code:""
            };
            _self.dataModal=true;
        },
        authorize(params){
            getModuleById(params.row.id)
            .then(result => {
                if(result.success){
                    this.dataInfo=result.data;
                    this.authorizeModal=true;
                }
            });

            this.$http
                .get("/$admin/modules/"+params.row.id+"/roleTree")
                .then(result => {
                    this.roleTree = result.data;
                })
                .catch(error =>{
                    console.log(error);
                });
        },
        editDataInfo(params){         
            var _self = this;
            _self.handleReset("dataInfo");
            getModuleById(params.row.id)
            .then(function(result){
                if(result.success){
                    _self.dataInfo=result.data;
                    _self.dataModal=true;
                }
            });
        },
        saveDataInfo(params){
            var _self = this;
            _self.$util.validateForm(_self,"dataInfo",function(){
                saveModule({_model:_self.dataInfo})
                .then(function(result){
                    if(result.success){
                        _self.dataModal=false;
                        _self.loadDataTree();
                    }
                    _self.$Message.info(result.msg);
                });
            });
        },
        removeDataInfo(params){
            var _self=this;
            _self.$util.delConfirm(_self,function(){
                deleteModuleById(params.row.id)
                .then(function(result){
                    if(result.success){
                        _self.loadDataTree();
                    }
                    _self.$Message.info(result.msg);
                });
            });
        },
        loadDataList(){
            var _self=this;
        },
        loadDataTree(){
            var _self=this;
            // getModules({
            //     key:"getModuleTree",
            //     orders:"sort asc"
            // })
            getModuleTree(this.dataQuery)
            .then(function(result){
                if(result.success){
                    // console.log(result.data)
                    _self.dataList=result.data;
                }
            });
        },
        saveRoleInfo(){
            var _self = this;
            var roles=_self.$refs["roleTree"].getCheckedNodes();
            var roleIds=[];
            for(var i=0;i<roles.length;i++)
                roleIds.push(roles[i].id);
            
            var model={entity:_self.dataInfo,params:{roleIds:roleIds}};
            saveModuleRole({"_model":model})
            .then(result =>{
                if(result.success){
                    this.authorizeModal=false;
                    this.loadDataTree();
                }
                _self.$Message.info(result.msg);
            });

        },
        getRoleTree(moduleId){
            this.$http.get("/$admin/modules/"+roleId+"/roleTree")
            .then(result =>{
                if(result.success){
                    this.roleTree = result.data;
                }
            })
            .catch(error =>{
                console.log(error);
            });
        },
        // handlerExpand(node){
        //     console.log(node);
        //     expandModule(node).then(function(result){
                
        //     });
        // },
        handleReset(name){
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        var _self=this;
        this.loadAppTree();
        this.loadDataTree();
    }
};
</script>
