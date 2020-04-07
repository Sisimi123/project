<template>
    <div>
        <data-table ref='test'
            :url="'/supervision/randomExamine/page'"
            :params="query"
            :columns="columns"
            @on-row-dblclick="tableClick"
        >
            <div slot="search">
                <Form :label-width="100" @submit.native.prevent>
                    <Row>
                        <Col span="4">
                            <Form-item label="主体关键字:">
                                <Input @keyup.enter="initSearch()" v-model="query.wheres.legalEntityName" placeholder="请输入..."/>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="审核状态:">
                                <Select placeholder="请选择..." v-model="query.wheres.review">
                                    <Option value='1'>公开</Option>
                                    <Option value='0'>不公开</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="任务状态:">
                                <Select placeholder="请选择..." v-model="query.wheres.taskStatus">
                                    <Option value='NOCHECK'>待检查</Option>
                                    <Option value='INCHECK '>检查中</Option>
                                    <Option value='NOFINISH '>未完结</Option>
                                    <!-- <Option value='FINISH '>已完结</Option> -->
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="检查对象类型:">
                                <Select placeholder="请选择..." v-model="query.wheres.checkObjectType">
                                    <Option v-for="item in checkedObjList" :value="item.value" :key="item.value">{{ item.title }}</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()" >重置</Button>
                            <Button @click="handleExport()" type="info">导出</Button>
                        </div>
                        <span style="float:right;margin-bottom:10px">                                                                         
                            <ButtonGroup >
                                <Button @click="status.checkObjModal = true" type="info" icon="ios-add">新增检查</Button>
                            </ButtonGroup> 
                        </span>
                    </Row>
                </Form>
            </div>
        </data-table>
        <entryModal moduleIdName='randomCheckEntry' :taskid='taskid' @isSuccess='getEntryStatus' :info='info' :width="900" v-model="status.entryModal" @visibleChange="statusChange" :mask-closable="maskclosable"></entryModal>
        <checkObjModal :checkType="'RANDOM'" @isSuccess='getStatus' v-model="status.checkObjModal"></checkObjModal>
    </div>
</template>

<script>
import user from '@/store/module/user.js';
import checkObjModal from '../components/checkObjModal.vue';
import entryModal from '../components/entryModal.vue';
export default {
    name: 'dailyCheckResEntry',
    components: {
        checkObjModal, entryModal
    },
    data () {
        return {
            taskid: '',
            info: {},
            maskclosable: false,
            status: {
                checkObjModal: false,
                entryModal: false
            },
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    maxWidth: 80
                },
                {
                    title: '主体名称',
                    key: 'legalEntityName',
                    align: 'center'
                },
                {
                    title: '检查对象类型',
                    key: 'checkObjectType',
                    align: 'center',
                    render: (h, params) => {
                        var str = '';
                        this.checkedObjList.forEach((v, i) => {
                            if (v.value === params.row.checkObjectType) {
                                str = v.title;
                            }
                        });
                        return h('span', str);
                    }
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center'
                },
                {
                    title: '任务状态',
                    key: 'taskStatus',
                    align: 'center',
                    render: (h, params) => {
                        var str = '';
                        if (params.row.taskStatus === 'NOCHECK') {
                            str = '待检查';
                        } else if (params.row.taskStatus === 'INCHECK') {
                            str = '检查中';
                        } else if (params.row.taskStatus === 'NOFINISH') {
                            str = '未完结';
                        } else if (params.row.taskStatus === 'FINISH') {
                            str = '已完结';
                            if(params.row.isCheckNoWhereabouts === '1')
                                str += "(查无下落)";
                        }
                        return h('span', str);
                    }
                },
                {
                    title: '检查部门',
                    key: 'deptName',
                    align: 'center'
                },
                {
                    title: '检查人员',
                    key: 'checkUserNames',
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
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {},
                                on: {
                                    click: () => {
                                        _self.entryWin(params.row);
                                    }
                                }
                            }, '录入')
                        ]);
                    }
                }
            ],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    legalEntityName: '',
                    taskSourceName: '',
                    taskStatus: '',
                    checkObjectType: '',
                    statusType: 'NOT_FINISH',
                    taskType: 'RANDOM',
                    review: ''
                }
            }
        };
    },
    methods: {
        getEntryStatus (v) {
            if (v) {
                this.initSearch();
            }
        },
        handleExport () {
            // 导出
            window.open(this.$basePath + '/supervision/examine/exportExcel?model=' + encodeURI(JSON.stringify(this.query)) + '&exportType=8');
        },
        entryWin (row) {
            var _self = this;
            // _self.info = row;
            _self.taskid = row.taskId;
            _self.sID = row.taskId;
            _self.$http.get('/supervision/examine/getCheckResult?taskId=' + row.taskId)
                .then(res => {
                    _self.info = res.data;
                    _self.info.positionName = res.data.legalSupervisor.positionName;
                    _self.info.userName = res.data.legalSupervisor.userName;
                    if (_self.info.checkCompleteTime === undefined || _self.info.checkCompleteTime === '') {
                        _self.info.checkCompleteTime = new Date();
                    }
                    if (_self.info.enterUserName === undefined || _self.info.enterUserName === '') {
                        _self.info.enterUserName = user.state.userInfo.name;
                    }
                }).catch(err => {
                    console.log(err);
                });
            _self.status.entryModal = true;
        },
        tableClick(row){
            this.entryWin(row)
        },
        getStatus (v) {
            if (v) {
                this.initSearch();
            }
        },
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset () {
            this.query.page = 1;
            this.query.size = 10;
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            };
            this.query.wheres.statusType = 'NOT_FINISH';
            this.query.wheres.taskType = 'RANDOM';
            this.initSearch();
        },
        statusChange(value){
            this.status.entryModal = value
        }
    },
    watch: {
    },
    computed: {
        checkedObjList () {
            return this.$store.getters.getDictList('regulatoryRepertory');
        }
    }
};
</script>

<style lang="less" scoped>
</style>