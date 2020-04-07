<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <div>
            <Row>
                <Col span="24" class="padding-left-6">
                    <Card :style="'height:'+(clientHeight-113)+'px'">
                        <Row>
                            <Input v-model="dataFilter" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                        </Row>
                        <Row class="margin-top-5">
                            <MyTreeGrid ref="dataGrid" :height="clientHeight-180" size="small" border :columns="columnList" :data="filterTree" expandUrl="/$admin/roles/node"></MyTreeGrid>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="dataModal" :title="modelTitle" :mask-closable=false width="720">
            <Form ref="dataInfo" :model="dataInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="角色名称:" prop="name">
                            <Input v-model="dataInfo.name" placeholder="请输入角色名称..."></Input>
                        </FormItem>
                        <FormItem label="角色代码:" prop="code">
                            <Input v-model="dataInfo.code" placeholder="请输入角色代码..." :readonly="readOnly"></Input>
                        </FormItem>
                        <FormItem label="排序:" prop="code">
                            <InputNumber v-model="dataInfo.sort" placeholder="请输入排序..." style="width:100%"></InputNumber>
                        </FormItem>
                        <FormItem label="备注:">
                            <Input v-model="dataInfo.note" type="textarea" placeholder="请输入备注..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="11" offset="1">
                        <div style="height:230px;border:1px solid #FFF">
                            <!-- <Tree ref="moduleTree" :data="filterModuleTree" show-checkbox></Tree> -->
                            <newZtree ref="moduleTree" :treeData="filterModuleTree" maxHeight="230" :withCard=false></newZtree>
                        </div>
                    </Col>
                </Row>
            </Form>
            </Row>
            <div slot="footer">
                <Button @click="dataModal=false">取消</Button>
                <Button type="primary" @click="saveDataInfo()" style="margin-right: 8px">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import MyTreeGrid from '../components/treeGrid/MyTreeGrid.vue';
import newZtree from '@/views/components/treeGrid/newZtree.vue';
import {saveRole,getRoleById,getRoles,deleteRoleById} from '../../api/system';
import {isNull,isEmpty} from '../../libs/common'
export default {
    name: 'SystemRole',
    components: {
        MyTreeGrid,
        newZtree
    },
    data () {
        var _self=this;
        return {
            columnList: [
                {   
                    title:'序号',
                    type: 'selection',
                    width: 58,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '角色名称',
                    type: 'tree',
                    width: 200,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '角色代码',
                    width: 200,
                    align: 'center',
                    key: 'code'
                },
                {
                    title: '描述',
                    align: 'center',
                    key: 'note'
                },
                {
                    title: '修改时间',
                    width: 150,
                    align: 'center',
                    key: 'updateTime',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        var id=params.row.id;
                        var buttons=[];
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
                                        _self.newDataInfo(params);
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
                    { required: true, message: '角色姓名不能为空！', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '角色代码不能为空！', trigger: 'blur' },
                ],
            },
            dataModal:false,
            dataInfo:{
            },
            moduleTree:[],
        };
    },
    computed:{
        readOnly(){
            return !isEmpty(this.dataInfo.id);
        },
        modelTitle(){
            return isEmpty(this.dataInfo.id)?"新增角色":"编辑角色";
        },
        filterTree(){
            var tree=this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree,this.dataFilter,function(node,filter){
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
        filterModuleTree(){
            var tree=this.$util.deepCopy(this.moduleTree);
            return this.$util.diguiTree(tree,"");
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        }
    },
    methods: {
        handleSearch(){
            // var tree=this.$util.deepCopy(this.dataList);
            // return this.$util.diguiTree(tree,this.dataFilter);
        },
        newDataInfo(params){
            var _self=this;
            _self.handleReset("dataInfo");
            _self.dataInfo={
                parentId:params.row.id,
                status:'1'
            };
            _self.getModuleTree();
            _self.dataModal=true;
        },
        editDataInfo(params){         
            var _self = this;
            _self.handleReset("dataInfo");
            getRoleById(params.row.id)
            .then(function(result){
                if(result.success){
                    _self.dataInfo=result.data;
                    _self.dataModal=true;
                }
            });
            _self.getModuleTree(params.row.id);
        },
        saveDataInfo(params){
            var _self = this;
            var modules=_self.$refs["moduleTree"].getCheckedNodes();
            var moduleIds=[];
            for(var i=0;i<modules.length;i++)
                moduleIds.push(modules[i].id);
            var model={entity:_self.dataInfo,params:{moduleIds:moduleIds}};
            _self.$util.validateForm(_self,"dataInfo",function(){
                saveRole({"_model":model})
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
                deleteRoleById(params.row.id)
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
            getRoles({
                key:"getRoleTree",
                orders:"sort asc"
            }).then(function(result){
                if(result.success){
                    _self.dataList=result.data;
                }
            });
        },
        getModuleTree(roleId){
            var _self=this;
            _self.$http.get("/$admin/roles/appModuleTree",{params:{id:roleId}})
            .then(function(result){
                if(result.success){
                    var tree=result.data;
                    // _self.$util.expandTree(tree,pId);
                    _self.moduleTree=tree;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        },
        handleReset(name){
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        var _self=this;
        this.loadDataTree();
    }
};
</script>
