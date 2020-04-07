<template>
    <div>
        <data-table ref='test'
            :url="'/supervision/examine/dailyPage'"
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
                            <Form-item label="检查日期:">
                                <DatePicker type="date" v-model="query.wheres.checkCompleteTime_begin"></DatePicker>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item :label-width="10" label="-">
                                <DatePicker type="date" v-model="query.wheres.checkCompleteTime_end" @on-change="endTimeChange"></DatePicker>
                            </Form-item>
                        </Col>
                        <!-- <Col span="4">
                            <Form-item label="检查结果:">
                                <Select placeholder="请选择..." v-model="query.wheres.checkResult">
                                    <Option value='NORMAL'>正常</Option>
                                    <Option value='ABNORMAL'>异常</Option>
                                    <Option value='NOCHECK'>缺项</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="后续处置:">
                                <Select placeholder="请选择..." v-model="query.wheres.completeStatus">
                                    <Option value='1'>已完结</Option>
                                    <Option value='0'>未完结</Option>
                                    <Option value='2'>全部</Option>
                                </Select>
                            </Form-item>
                        </Col> -->
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
                    </Row>
                </Form>
            </div>
        </data-table>
        <entryModal :isView='true' moduleIdName='dailyCheckEntry' :taskid='taskid' :info='info' :width="1200" v-model="status.entryModal" @visibleChange="statusChange" :mask-closable="maskclosable" :styles="{top: '20px','z-index':1000}"></entryModal>
    </div>
</template>

<script>
import entryModal from '../components/entryModal.vue';
export default {
    name: 'dailyCheckResInquire',
    components: {
        entryModal
    },
    data () {
        return {
            info: {},
            maskclosable: false,
            status: {
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
                    title: '检查日期',
                    key: 'checkCompleteTime',
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
                // {
                //     title: '检查结果',
                //     key: 'CheckResultForm',
                //     align: 'center',
                //     render: (h, params) => {
                //         var str = '';
                //         if (params.row.checkResult === 'NORMAL') {
                //             str = '正常';
                //         } else if (params.row.checkResult === 'ABNORMAL') {
                //             str = '异常';
                //         } else if (params.row.checkResult === 'NOCHECK') {
                //             str = '缺项';
                //         } else {
                //             str = '无检查事项';
                //         }
                //         return h('span', str);
                //     }
                // },
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
                            }, '详情')
                        ]);
                    }
                }
            ],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    checkCompleteTime_begin: '',
                    checkCompleteTime_end: '',
                    legalEntityName: '',
                    checkResult: '',
                    completeStatus: '',
                    checkObjectType: '',
                    statusType: 'RESULT',
                    taskType: 'DAILY'
                }
            },
            taskid: ''
        };
    },
    methods: {
        endTimeChange (v) {
            var s = v + ' 23:59:59';
            s = s.replace(/-/g, '/');
            this.query.wheres.checkCompleteTime_end = new Date(s);
        },
        handleExport () {
            // 导出
            window.open(this.$basePath + '/supervision/examine/exportExcel?model=' + encodeURI(JSON.stringify(this.query)) + '&exportType=1');
        },
        entryWin (row) {
            var _self = this;
            _self.taskid = row.taskId;
            _self.$http.get('/supervision/examine/getCheckResult?taskId=' + row.taskId)
                .then(res => {
                    _self.info = res.data;
                    // res.data.isCheckNoWhereabouts === '1' ? _self.isCheckNoWhereaboutsShow = true : _self.isCheckNoWhereaboutsShow = false;
                    _self.info.isCheckNoWhereaboutsShow = res.data.isCheckNoWhereabouts === '1' ? '是' : '否';
                    _self.info.positionName = res.data.legalSupervisor.positionName;
                    _self.info.userName = res.data.legalSupervisor.userName;
                }).catch(err => {
                    console.log(err);
                });
            // if (row.legalSupervisor === undefined) {
            //     _self.info.checkedObjType_item = '';
            // } else {
            //     _self.info.checkedObjType_item = row.legalSupervisor.userName;
            // };
            _self.status.entryModal = true;
        },
        tableClick(row){
            this.entryWin(row)
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
            this.query.wheres.statusType = 'RESULT';
            this.query.wheres.taskType = 'DAILY';
            this.initSearch();
        },
        statusChange(value){
            this.status.entryModal = value
        }
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