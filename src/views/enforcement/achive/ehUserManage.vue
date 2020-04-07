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
                    </p>
                    <div class="leftTree" ref="leftTree" :style="'height:'+cliHeight+'px;overflow: auto;'">
                        <Tree ref="tree" :data="areaTree" @on-select-change="selectTreeChange" empty-text="机构加载中..."></Tree>
                    </div>
                </Card>
            </Col>
            <Col span="20" style="position: relative;">
                <data-table ref="test" 
                    :url="'/LawEnforcementRepertory/getEhUserPage'" 
                    :params="query" 
                    :columns="columns" 
                    @on-row-dblclick="handleEditdb"
                >
                    <div slot="search" style="margin-bottom:5px;">
                        <Form :label-width="80" @submit.native.prevent>
                            <Row>
                                <Col span="5" >
                                    <Form-item label="用户名：">
                                        <input  @keyup.enter="initSearch()" v-model="query.wheres.name"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                    </Form-item>
                                </Col>
                                <!-- <Col span="5">
                                    <Checkbox style="margin-left:5px;margin-top:5px" v-model="subDept" @on-change="changeSubDept">子部门</Checkbox>
                                </Col> -->
                                <div class="btn-wrap" style="margin-left:20px">
                                    <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                    <Button @click="handleReset()" >重置</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    name: 'ehUserManage',
    data () {
        return {
            areaTree: [],
            subDept: true,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    // path: '',
                    // thisDept: '',
                    deptId: '',
                    name: ''
                }
            },
            columns: [
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
                    title: '部门地址',
                    key: 'deptname',
                    align: 'center'
                }
            ]
        };
    },
    computed: {
        cliHeight () {
            return this.$store.state.app.treeHeight - 6;
        }
    },
    methods: {
        changeSubDept (flag) {
            var _self = this;
            if (flag) {
                _self.query.wheres.thisDept = '0';
            } else {
                _self.query.wheres.thisDept = '1';
            }
            _self.initSearch();
        },
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset () {
            this.query.wheres.name = '';
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        handleEditdb (ids) {
            // this.info = ids;
            // this.modal.watchMsg = true;
        },
        showTree () {
            var _self = this;
            _self.$http.get('/supervision/ehOrganization/getEHTree').then(res => {
                if (res.success) {
                    _self.areaTree = res.data;
                }
            }).catch(err => {
                console.log(err);
            });
        },
        selectTreeChange (v) {
            var _self = this;
            _self.query.wheres.deptId = v[0].id;
            _self.initSearch();
        }
    },
    mounted () {
        this.showTree();
    }
};
</script>