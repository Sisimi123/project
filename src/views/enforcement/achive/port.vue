<!-- 港口 -->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>
<template>
    <div>
        <Row>
            <data-table 
            ref="test" 
            :withTree="true" 
            :useZtree="true"
            :treeParams="cities"
            :treeUrl="'/$admin/depts/custree'"
            @on-select-change="selectTreeChange" 
            :url="'/shiparchives/port/page'" 
            :params="query" 
            :columns="columns"
            @on-row-dblclick="handleEdit">
                <div slot="search">
                    <Form :label-width="64" @submit.native.prevent>
                        <Row>
                            <Col span="6">
                            <Form-item label="港口名称:">
                                <Input v-model="query.wheres.portName" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                            </Form-item>
                            </Col>
                            <Col span="2" style="float:right;text-align:right;">
                                <Button @click="newAdd()" type="success" icon="ios-add">新增</Button>
                            </Col>
                            <div class="btn-wrap">
                                <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                <Button @click="handleReset()" >重置</Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </data-table>
        </Row>
        <!--新增/修改-->
        <Modal :styles="{top: '220px'}" v-model="pmodel" :title="title" width="50%" :mask-closable="maskclosable">
            <Form :label-width="80" ref="dataInfo" :model="dataInfo" :rules="ruleValidate">
                <Row>
                    <Col span="12">
                    <FormItem label="港口名称:" prop="portName">
                        <Input v-model="dataInfo.portName" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="经度:">
                        <Input v-model="dataInfo.ln" />
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="纬度:">
                        <Input v-model="dataInfo.lt" />
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="备注:" prop="note">
                        <Input v-model="dataInfo.note" />
                    </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="pmodel = false">取消</Button>
                <Button type="info" @click="saveData('dataInfo')">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import {
        isNull
    } from '@/libs/common.js'
    import ztree from './ztree.vue'
    import user from '@/store/module/user.js';
    var uid=user.state.userInfo.userId;
    export default {
        name: "port",
        components: {
            ztree,
        },
        data() {
            return {
                cities:{
                    includes:"10,20,30,45,70,99",
                },
                title: "",
                areaTreeVisible: false, //数据加载完后再在ztree组件中显示
                maskclosable:false,
                areaTree: [],
                status: {
                    treeLoading: true,
                },
                ruleValidate: {
                    portName: [{
                        required: true,
                        message: '请输入港口名称',
                        trigger: 'blur'
                    }],
                    ln: [{
                        required: true,
                        message: '请输入经度',
                        trigger: 'blur'
                    }],
                    lt: [{
                        required: true,
                        message: '请输入纬度',
                        trigger: 'blur'
                    }],
                },
                dataInfo: {
                    portName: "", //港口名称
                    ln: "", //经度
                    lt: "", //纬度
                    note: "", //备注
                    parentId: "",
                    deptname:"",
                },
                totalNum: 0, //总条数
                query: {
                    page: 1,
                    size: 10,
                    key: "getPortPage",
                    wheres: {
                        path: "",
                        portName: ""
                    },
                },
                id: "",
                pmodel: false,
                dataList: [], //表格中的数据集合  
                columns: [ //表头 直接变量传值
                    {
                        title: "序号",
                        type: "index", //序号展示
                        maxWidth:80
                    },
                    {
                        title: "港口名称",
                        key: "portName",
                    },
                    {
                        title: "经度",
                        key: "ln",
                    },
                    {
                        title: "纬度",
                        key: "lt",
                    },
                    {
                        title:"所属区域",
                        key:"deptname",
                    },
                    {
                        title: "备注",
                        ellipsis:true,
                        key: "note",
                    },
                    {
                        title: "操作",
                        width:150,
                        key: "id",
                        render: (h, params) => {
                            var id = params.row.id;
                            var _self = this;
                            var temp = [];
                            // console.log(params.row);
                            // console.log(params.row.creatorId,uid,"测试",params.row.creatorId==uid);
                            if(params.row.creatorId==uid){
                                temp.push(
                                    h("Button", {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                _self.editData(id);
                                            }
                                        }
                                    }, "编辑"),
                                    h("Button", {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style: {
                                            marginLeft: "10px"
                                        },
                                        on: {
                                            click: () => {
                                                _self.remove(id);
                                            }
                                        }
                                    }, "删除"),
                                );
                            }else{
                                temp.push(
                                    h("Button", {
                                        props: {
                                            type: "dashed",
                                            size: "small",
                                            disabled:true
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, "编辑"),
                                    h("Button", {
                                        props: {
                                            type: "dashed",
                                            size: "small",
                                            disabled:true
                                        },
                                        style: {
                                            marginLeft: "20px"
                                        },
                                        on: {
                                            click: () => {
                                            }
                                        }
                                    }, "删除"),
                                );
                            }
                            return h("div", temp);
                        }
                    },
                ],
                nodes:[],
                path:"",
                deptname:"",
            };
        },
        mounted() {
            this.initSearch();
        },
        computed: {},
        methods: {
            initSearch() {
                this.query.wheres.path = this.path;
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

            //   左侧
            selectTreeChange(treeNode) {
                this.id=treeNode[0].id;
                this.path=treeNode[0].path;
                this.nodes=treeNode;
                this.deptname=treeNode[0].title;
                this.initSearch();
            },
            zhengCeYanZheng(v){
                var number=/^[0-9]{0,}$/;
                var bool=number.test(v);
                return bool;
            },
            //新增
            newAdd() {
                if(this.nodes.length==0){
                    this.$Message.error("请选择所属区域");
                    return ;
                } 
                this.title = "新增";
                this.$refs["dataInfo"].resetFields();
                this.pmodel = true;
                this.dataInfo = {};
            },
            //修改 编辑页面信息
            editData(id) {
                var _self = this;
                this.title="编辑";
                this.$refs["dataInfo"].resetFields();
                _self.$http.get("/shiparchives/port/" + id)
                .then(res => {
                    if (res.success) {
                        _self.dataInfo = res.data;
                        _self.pmodel = true;
                    }
                })
            },
            handleEdit(msg){
                this.editData(msg.id);
            },
            //新增/修改
            saveData(name) {
                var _self = this;
                _self.dataInfo.parentId = _self.id;
                _self.dataInfo.deptname=_self.deptname;
                var dataInfo = _self.dataInfo;
                if((dataInfo.ln!=undefined) && !(_self.zhengCeYanZheng(dataInfo.ln))){
                    _self.$Message.error("请输入正确的经度格式");
                    return ;
                }
                if((dataInfo.lt!=undefined) && !(_self.zhengCeYanZheng(dataInfo.lt))){
                    _self.$Message.error("请输入正确的纬度格式");
                    return ;
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (isNull(dataInfo.id)) {
                            _self.$http.post("/shiparchives/port", dataInfo)
                                .then(res => {
                                    if (res.success) {
                                        _self.initSearch();
                                        _self.pmodel = false;
                                        _self.$Message.success('success');
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        } else {
                            _self.$http.patch("/shiparchives/port/" + dataInfo.id, dataInfo)
                                .then(res => {
                                    if (res.success) {
                                        _self.initSearch();
                                        _self.pmodel = false;
                                        _self.$Message.success('success');
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        }
                    } else {
                        this.$Message.error('失败!');
                    }
                })
            },
            //删除
            remove(id) {
                var _self = this;
                this.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除当前列表项吗？",
                    onOk:function(){
                        this.$http.delete("/shiparchives/port/"+id)
                        .then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功!');
                            }else{
                                this.$Message.info(result.msg);
                            }
                        });
                    
                    }
                });
            },
        }
    };
</script>
<style scoped>
    .leftTree {
        width: 100%;
        height: 526px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>