<style lang="less" scoped>
    @import '../styles/achive.less';
</style>
<template>
    <div>
        <Row>
            <Col span="4">
                <Card style="width:95%;position: relative;right:-1%;">
                    <p slot="title">
                        <Icon type="ios-folder"></Icon>
                        机构树
                        <Button type="info" style="float:right" icon="md-create" size="small" @click="editFontNodePre()"></Button>
                    </p>
                    <div class="leftTree" ref="leftTree" :style="'height:'+cliHeight+'px;overflow: auto;'">         
                        <Tree ref="tree" :data="areaTree" @on-select-change="selectTreeChange" empty-text="区域加载中..."></Tree>
                    </div>
                </Card>
            </Col>
            <Col span="20" style="position: relative;">
                <data-table ref="test" 
                    :url="'/LawEnforcementRepertory/getDingUserPage'" 
                    :params="query" 
                    :columns="columns" 
                    @on-row-dblclick="handleEditdb"
                >
                    <div slot="search" style="margin-bottom:5px;">
                        <Form :label-width="80" @submit.native.prevent>
                            <Row>
                                <Col span="5" >
                                    <Form-item label="用户名：">
                                        <input @keyup.enter="initSearch()" v-model="query.wheres.name"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                    </Form-item>
                                </Col>
                                <Col span="5">
                                    <Form-item label="是否为本部门:" :label-width="100">
                                        <Select v-model="query.wheres.isOrg" style="width:200px">
                                            <Option v-for="item in isOrgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <div class="btn-wrap" style="margin-left:20px">
                                    <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                    <Button @click="handleReset()" >重置</Button>
                                    <Button @click="syncStatus()" :disabled='isSync' type="info">{{btnInfo}}</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Col>             
        </Row>
            <!-- 新增/编辑节点 -->
            <Modal v-model="modal.editNodes" :styles="{top: '150px'}" title="编辑节点" :mask-closable="maskclosable">
                <Form :label-width="48"  @submit.native.prevent>
                    <Row>
                        <Col span="21" offset="1">
                            <FormItem label="名称：">
                                <Input placeholder="请输入名称"  @on-keydown.enter="saveChild()" v-model="NodeName"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button @click="modal.editNodes=false">取消</Button>
                    <Button type="info" @click="saveChild()">保存</Button>
                </div>
            </Modal>
            <!--查看窗口 -->
            <Modal :width="910" :styles="{top: '100px','z-index':1000}" v-model="modal.watchMsg" title="查看详情" :mask-closable="maskclosable">
                <Form :label-width="100" :model="info" ref="info">
                    <Row>
                        <Col span="6">
                            <div class="div-center">
                                <div class="modal-img">
                                    <img :src="info.avatar"/>
                                </div>
                            </div>
                        </Col>
                        <Col span="18">
                            <Row>
                                <Col span="12">
                                    <Form-item label="成员名称:" >
                                        <Input v-model="info.name" ></Input>  
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="职位信息:" >
                                        <Input v-model="info.position" ></Input>  
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="员工邮箱:" >
                                        <Input v-model="info.email" ></Input>  
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="企业邮箱:" >
                                        <Input v-model="info.orgEmail" ></Input>  
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="员工工号:" >
                                        <Input v-model="info.jobnumber" ></Input>  
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label="入职时间:" >
                                        <Input v-model="info.hiredDate" ></Input>  
                                    </Form-item>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="6">
                            <Form-item label="手机号:" :label-width="60">
                                <Input v-model="info.mobile" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="9">
                            <Form-item label="分机号:" >
                                <Input v-model="info.tel" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="9">
                            <Form-item label="办公地点:" >
                                <Input v-model="info.workPlace" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button @click="modal.watchMsg=false">取消</Button>
                </div>
            </Modal>
             <!-- 关联列表窗口 -->
            <Modal :width="1200" v-model="modal.associateList" title="关联列表" :mask-closable="maskclosable">
                <Table border highlight-row ref="associateList" :columns="columns_associate" :data="extendList"></Table>
                <div slot="footer">
                    <Button @click="modal.associateList=false">取消</Button>
                </div>
            </Modal>
            <!-- 用户列表 -->
            <Modal :width="1200" v-model="modal.userModel" title="系统用户列表" :mask-closable="maskclosable">
                    <noTreeTable ref="test_User" 
                        :url="userUrl" 
                        :params="query_User" 
                        :columns="columns_User"
                        :tableHeight="400"
                        @on-current-change='radioRow'
                        :reloadTable='reloadTable'
                    >
                        <div slot="search" style="margin-bottom:5px;">
                            <Form :label-width="80" @submit.native.prevent>
                                <Row>
                                    <Col span="5" >
                                        <Select v-model='modelVal' @on-change='selectModel'>
                                            <Option v-for="item in modelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="5" >
                                        <Form-item label="用户名：">
                                            <input  @keyup.enter="initSearch_User()" v-model="query_User.wheres.name"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                        </Form-item>
                                    </Col>
                                    <div class="btn-wrap" style="margin-left:20px">
                                        <Button @click="initSearch_User()" type="primary" icon="ios-search">搜索</Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </noTreeTable>
                <div slot="footer">
                    <Button @click="modal.userModel=false">取消</Button>
                    <Button @click="associate()" type="primary">关联</Button>
                </div>
            </Modal>
    </div>
</template>
<script>
    import { isNull, isEmpty } from '@/libs/common.js'
    import MyUpload from '@/views/components/Upload/MyUpload.vue';
    import noTreeTable from '@/views/components/content/noTreeTable.vue';
    import UEtor from '../../cms/MyUeditor.vue';
    export default {
        name: 'dingTalkManage',
        components: {
            UEtor, MyUpload, noTreeTable
        },
        data () {
            return {
                userUrl: '/LawEnforcementRepertory/getSystemUserPage',
                columns_User: [],
                btnInfo: '同步',
                isSync: false,
                reloadTable: true,
                extendList: [],
                columns_associate: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        maxWidth: 80
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '用户类型',
                        key: 'model',
                        align: 'center',
                        render: (h, params) => {
                            var temp = '';
                            if (params.row.model === '1') {
                                temp = '系统用户';
                            } else if (params.row.model === '2') {
                                temp = '易和用户';
                            }
                            return h('span', temp);
                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            var _self = this;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {},
                                    on: {
                                        click: () => {
                                            _self.untied(params.row);
                                        }
                                    }
                                }, '解绑')
                            ]);
                        }
                    }
                ],
                modelVal: '1',
                modelList: [
                    {
                        value: '1',
                        label: '系统用户'
                    },
                    {
                        value: '2',
                        label: '易和用户'
                    }
                ],
                isOrgList: [
                    {
                        value: '1',
                        label: '是'
                    },
                    {
                        value: '0',
                        label: '否'
                    }
                ],
                modal: {
                    editNodes: false,
                    watchMsg: false,
                    userModel: false,
                    associateList: false
                },
                NodeName: '',
                areaTree: [],
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        maxWidth: 80
                    },
                    {
                        title: '成员名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '职位信息',
                        key: 'position',
                        align: 'center'
                    },
                    {
                        title: '员工邮箱',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '手机号',
                        key: 'mobile',
                        align: 'center'
                    },
                    {
                        title: '办公地点',
                        key: 'workPlace',
                        align: 'center'
                    },
                    {
                        title: '员工工号',
                        key: 'jobnumber',
                        align: 'center'
                    },
                    {
                        title: '入职时间',
                        key: 'hiredDate',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            var _self = this;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.binding(params.row);
                                        }
                                    }
                                }, '关联'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.associateList(params.row);
                                        }
                                    }
                                }, '关联列表')
                            ]);
                        }
                    }
                ],
                query: {
                    page: 1,
                    size: 10,
                    wheres: {
                        dingOrganId: '11811094',
                        isOrg: '',
                        name: ''
                    }
                },
                query_User: {
                    page: 1,
                    size: 10,
                    wheres: {
                        path: '',
                        thisDept: '',
                        name: ''
                    }
                },
                columns_ehUser: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        maxWidth: 80
                    },
                    {
                        title: '登录名',
                        key: 'username',
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '身份证号',
                        key: 'idCard',
                        align: 'center'
                    },
                    {
                        title: '职称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '邮件',
                        key: 'email',
                        align: 'center'
                    },
                    {
                        title: '详细地址',
                        key: 'deptname',
                        align: 'center'
                    }
                ],
                columns_lawUser: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        maxWidth: 80
                    },
                    {
                        title: '用户名',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '更新时间',
                        key: 'updateTime',
                        align: 'center'
                    },
                    {
                        title: '登录名',
                        key: 'username',
                        align: 'center'
                    },
                    {
                        title: '所属部门',
                        key: 'deptname',
                        align: 'center'
                    }
                ],
                info: {},
                node: [],
                maskclosable: false,
                unionid: '',
                dateId: '',
                positionTimer: null
            };
        },
        computed: {
            cliHeight () {
                return this.$store.state.app.treeHeight - 6;
            }
        },
        methods: {
            addSetInterval () {
                var _self = this;
                this.positionTimer = setInterval(() => {
                    _self.$http.get('/dingTalk/getSyncStatus')
                        .then(res => {
                            if (res.data) {
                                this.btnInfo = '正在同步';
                                this.isSync = true;
                            } else {
                                this.btnInfo = '同步';
                                this.isSync = false;
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }, 3000);
            },
            syncStatus () {
                var _self = this;
                _self.$http.post('/dingTalk/sync')
                    .then(res => {
                        if (res.success) {
                            this.$Message.info('操作成功。');
                            // this.btnInfo = '正在同步';
                            // this.isSync = true;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            },
            associateList (row) {
                var _self = this;
                _self.extendList = row.extendList;
                _self.modal.associateList = true;
            },
            radioRow (v) {
                var _self = this;
                _self.dateId = v.id;
            },
            selectModel (value) {
                var _self = this;
                _self.reloadTable = false;
                if (_self.modelVal === '1') {
                    _self.userUrl = '/LawEnforcementRepertory/getSystemUserPage';
                    _self.columns_User = _self.columns_lawUser;
                    _self.reloadTable = true;
                    _self.initSearch_User();
                } else if (_self.modelVal === '2') {
                    _self.userUrl = '/LawEnforcementRepertory/getEhUserPage';
                    _self.columns_User = _self.columns_ehUser;
                    _self.reloadTable = true;
                    _self.initSearch_User();
                }
            },
            binding (row) {
                var _self = this;
                _self.modelVal = '1';
                _self.columns_User = _self.columns_lawUser;
                _self.dateId = '';
                _self.unionid = row.unionid;
                _self.modal.userModel = true;
            },
            untied (row) {
                var _self = this;
                _self.$http.delete('/dingTalkExtend/delete?id=' + row.dtueId)
                    .then(res => {
                        if (res.success) {
                            _self.modal.associateList = false;
                            _self.initSearch();
                        } else {
                            _self.$Message.error(res.msg);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            },
            associate () {
                var _self = this;
                if (_self.dateId === undefined || _self.dateId === '') {
                    _self.$Message.error('请选择一条数据!');
                    return;
                }
                _self.$http.post('dingTalkExtend/add?unionid=' + _self.unionid + '&dateId=' + _self.dateId + '&model=' + _self.modelVal)
                    .then(res => {
                        if (res.success) {
                            _self.modal.userModel = false;
                            _self.$Message.success('关联成功!');
                            _self.initSearch();
                        } else {
                            _self.$Message.error(res.msg);
                        }
                    }).catch(err => {
                        console.log(err);
                    });
            },
            // 编辑文件目录节点名称
            editFontNodePre () {
                if (this.node.length === 0) {
                    this.$Message.error('请先选择节点');
                    return;
                }
                this.NodeName = this.node[0].title;
                this.modal.editNodes = true;
            },
            // 按钮
            saveChild () {
                var _self = this;
                _self.modal.editNodes = false;
                _self.$http.post('/dingTalk/setOrganization?id=' + this.node[0].id + '&name=' + this.NodeName).then(res => {
                    this.showTree();
                }).catch(err => {
                    console.log(err);
                });
            },
            // 树节点触发事件
            selectTreeChange (v) {
                this.node = v;
                this.query.wheres.dingOrganId = v[0].id;
                this.initSearch();
            },
            initSearch () {
                this.$refs.test.initSearch();
            },
            initSearch_User () {
                this.$refs.test_User.initSearch();
            },
            handleReset () {
                this.query.wheres.name = '';
                this.query.page = 1;
                this.query.size = 10;
                this.initSearch();
            },
            handleEditdb (ids) {
                this.info = ids;
                this.modal.watchMsg = true;
                // this.handleEdit(ids);
            },
            showTree () {
                var _self = this;
                _self.$http.get('/dingTalk/getTree').then(res => {
                    if (res.success) {
                        _self.areaTree = res.data;
                    }
                });
            }
        },
        destroyed () {
            clearInterval(this.positionTimer);
            this.positionTimer = null;
        },
        mounted () {
            this.showTree();
            this.addSetInterval();
        }
    };
</script>
    
<style scoped>
    .div-center{
        text-align: center;
    }
    .modal-img{
        display: inline-block;
        width: 200px;
        height: 144px;
        text-align: center;
        line-height: 144px;
        border: 1px solid transparent;
        border-radius: 5px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(138, 130, 173, 0.171);
    }
    .modal-img img{
        width: 100%;
        height: 100%;
    }
</style>
      