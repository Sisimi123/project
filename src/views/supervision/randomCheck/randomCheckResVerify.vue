<template>
    <div>
        <data-table ref='test'
            :url="'/supervision/randomExamine/page'"
            :params="query"
            :columns="columns"
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
                            <Form-item label="检查日期:">
                                <DatePicker type="date" v-model="query.wheres.checkCompleteTime_begin"></DatePicker>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item :label-width="10" label="-">
                                <DatePicker type="date" v-model="query.wheres.checkCompleteTime_end" @on-change="endTimeChange"></DatePicker>
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
                    </Row>
                </Form>
            </div>
        </data-table>
        <Modal :width="600" :scrollable='true' :styles="{top: '50px','z-index':1100}" v-model="status.entryModal" title="审核" :mask-closable="maskclosable">
            <Form :label-width="80" :model="info" ref="info">
                <Form-item label="审核状态:" >
                    <Select placeholder="请选择..." v-model="info.review">
                        <Option value='1'>公开</Option>
                        <Option value='0'>不公开</Option>
                    </Select>
                </Form-item>
            </Form>
            <div slot="footer">
                <Button @click="status.entryModal=false">取消</Button>
                <Button type="info" @click="saveInfo()">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'dailyCheckResInquire',
    data () {
        return {
            info: {},
            datas: [],
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
                    title: '检查完成日期',
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
                    title: '审核状态',
                    key: 'review',
                    align: 'center',
                    render: (h, params) => {
                        var str = '';
                        if (params.row.review === undefined || params.row.review === '') {
                            str = '不公开';
                        } else if (params.row.review === '0') {
                            str = '不公开';
                        } else if (params.row.review === '1') {
                            str = '公开';
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
                            }, '审核')
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
                    taskType: 'RANDOM',
                    review: ''
                }
            },
            taskId: ''
        };
    },
    methods: {
        handleExport () {
            // 导出
            window.open(this.$basePath + '/supervision/examine/exportExcel?model=' + encodeURI(JSON.stringify(this.query)) + '&exportType=10');
        },
        saveInfo () {
            var _self = this;
            _self.$http.post('/supervision/randomExamine/review?taskId=' + _self.taskId + '&review=' + _self.info.review)
                .then(res => {
                    if (res.success) {
                        _self.$Message.info('操作成功。');
                        _self.status.entryModal = false;
                        _self.initSearch();
                    } else {
                        _self.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        endTimeChange (v) {
            var s = v + ' 23:59:59';
            s = s.replace(/-/g, '/');
            this.query.wheres.checkCompleteTime_end = new Date(s);
        },
        initSearch () {
            this.$refs.test.initSearch();
        },
        entryWin (row) {
            var _self = this;
            _self.info.review = row.review;
            _self.taskId = row.taskId;
            _self.status.entryModal = true;
        },
        handleReset () {
            this.query.page = 1;
            this.query.size = 10;
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            };
            this.query.wheres.statusType = 'RESULT';
            this.query.wheres.taskType = 'RANDOM';
            this.initSearch();
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
    .title{
        font-size: 18px;
    }
    /deep/ .testModal .ivu-modal-body{
        height: 800px;
        overflow-y: auto;
    }
</style>