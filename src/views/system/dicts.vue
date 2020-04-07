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
                            <MyTreeGrid ref="dataGrid" :height="clientHeight-180" size="small" border :columns="columnList" :data="filterTree" expandUrl="/$admin/dicts/node"></MyTreeGrid>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="dataModal" :title="modelTitle" :mask-closable=false width="720">
            <Form ref="dataInfo" :model="dataInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="字典名称:" prop="name">
                            <Input v-model="dataInfo.name" placeholder="请输入字典名称..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="排序:" prop="sort">
                            <InputNumber v-model="dataInfo.sort" placeholder="请输入排序..." style="width:100%"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="isRoot">
                    <Col span="12">
                        <FormItem label="字典代码:" prop="code">
                            <Input v-model="dataInfo.code" placeholder="请输入字典代码..." :readonly="readOnly"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="字典类型:" prop="type" >
                            <Select v-model="dataInfo.type" :disabled="readOnly">
                                <Option v-for="item in dictTypes" :value="item.value" :key="item.value">{{item.title}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="showValue">
                    <Col span="24">
                        <FormItem label="字典值:" prop="value">
                            <Input v-model="dataInfo.value" placeholder="请输入字典值..." :readonly="readOnly"></Input>
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
    </div>
</template>

<script>
import MyTreeGrid from '../components/treeGrid/MyTreeGrid.vue';
import {saveDict,getDictById,getDictTreeGrid,deleteDictById} from '../../api/system';
import {isNull,isEmpty} from '../../libs/common'
export default {
    name: 'SystemDict',
    components: {
        MyTreeGrid
    },
    data () {
        var _self=this;
        return {
            columnList: [
                {
                    title:'序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '字典代码',
                    align: 'center',
                    width: 200,
                    align: 'left',
                    key: 'code'
                },
                {
                    title: '字典名称',
                    type: 'tree',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '字典值',
                    align: 'center',
                    key: 'value'
                },
                {
                    title: '字典类型',
                    align: 'center',
                    key: 'type',
                    render: (h, params) => {
                        return h('span',_self.$store.getters.getDictName("system_dicttype",params.row.type));
                    }
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
            // ruleValidate: {
            //     name: [
            //         { required: true, message: '模块名称不能为空！', trigger: 'blur' }
            //     ],
            //     code: [
            //         { required: true, message: '模块代码不能为空！', trigger: 'blur' },
            //     ],
            //     type: [
            //         { required: true, message: '模块类型不能为空！', trigger: 'change' },
            //     ]
            // },
            dataModal:false,
            dataInfo:{
            },
        };
    },
    computed:{
        isRoot(){
            return this.dataInfo.parentId=='root';
        },
        showValue(){
            return !this.isRoot||this.dataInfo.type=="3";
        },
        ruleValidate(){
            var rules={};
            rules["name"]=[{required: true, message: '模块名称不能为空！', trigger: 'blur' }];
            if(this.isRoot){
                rules["code"]=[{required: true, message: '模块代码不能为空！', trigger: 'blur' }];
                rules["type"]=[{ required: true, message: '模块类型不能为空！', trigger: 'blur' }];
            }
            if(this.showValue)
                rules["value"]=[{ required: true, message: '模块值不能为空！', trigger: 'blur' }];

            return rules;
        },
        dictTypes(){
            return this.$store.getters.getDictList("system_dicttype");
        },
        readOnly(){
            return !isEmpty(this.dataInfo.id);
        },
        modelTitle(){
            return isEmpty(this.dataInfo.id)?"新增字典":"编辑字典";
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
            _self.dataModal=true;
        },
        editDataInfo(params){         
            var _self = this;
            _self.handleReset("dataInfo");
            getDictById(params.row.id)
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
                saveDict({_model:_self.dataInfo})
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
                deleteDictById(params.row.id)
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
            getDictTreeGrid({
                key:"getDictTreeGrid",
                orders:"sort asc"
            }).then(function(result){
                if(result.success){
                    _self.dataList=result.data;
                }
            });
        },
        handleReset(name){
            this.$refs[name].resetFields();
        }
    },
    mounted() {
        var _self=this;
        this.loadDataTree();
        // console.log(this.dictTypes);
    }
};
</script>
