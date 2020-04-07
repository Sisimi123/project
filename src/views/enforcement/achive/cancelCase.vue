<style lang="less">
@import "../styles/achive.less";
</style>

<template>
    <div>
        <data-table
            ref="test"
            :withTree="false"
            :url="'/enforces/case/getDeletedEnfPage'"
            :params="query"
            :columns="columns"        >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                    <Row>
                        <Col span="4">
                            <Form-item label="查询内容:">
                                 <Input v-model="query.wheres.search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
                        </Col>
                        <div class="btn-wrap" style="margin-left:20px">
                            <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                            <Button @click="handleReset()" >重置</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </data-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {},
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    minWidth: 10
                },
                {
                    key: 'XM',
                    title: '当事人',
                    align: 'center',
                    minWidth: 100,
                    render: function (h, params) {
                        var temp = params.row.shipinfo.shipname + '(' + params.row.litigants.name + ')';
                        return h('span', temp);
                    }
                },
                {
                    key: 'illegalAct',
                    title: '涉案案由',
                    align: 'center',
                    minWidth: 150
                },
                {
                    key: 'ZSZW_MC',
                    title: '案件编号',
                    align: 'center',
                    minWidth: 100,
                    render: function(h, params) {
                        var row = params.row;
                        var caseNum =
                        params.row.enforceType +
                        "〔" +
                        params.row.enforceYear +
                        "〕" +
                        params.row.enforceNum +
                        "号";
                        return h("span", caseNum);
                    }
                },
                {
                    key: 'status',
                    title: '进度',
                    align: 'center',
                    minWidth: 90,
                    render: function (h, params) {
                        var temp = '';
                        if (params.row.status === '0') {
                            temp = '草稿';
                        } else if (params.row.status === '1') {
                            temp = '案件办理中';
                        } else if (params.row.status === '2') {
                            temp = '行政处罚审批中';
                        } else if (params.row.status === '3') {
                            temp = '实施处罚';
                        } else if (params.row.status === '4') {
                            temp = '结案审批中';
                        } else if (params.row.status === '8') {
                            temp = '结案';
                        } else if (params.row.status === '9') {
                            temp = '移送';
                        }
                        return h('span', temp);
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    minWidth: 80,
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        var _self = this;
                                        _self.recoverEnf(params.row);
                                    }
                                }
                            }, '恢复');
                    }
                }
            ],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    search: ''
                }
            }
        };
    },
    methods: {
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset () {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            }
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        recoverEnf (row) {
            var _self = this;
            _self.$Modal.confirm({
                title: '提示',
                content: '请确认是否恢复案件?',
                onOk: function () {
                    _self.$http.post('/enforces/case/recoverEnf/' + row.id)
                        .then(res => {
                            if (res.success) {
                                _self.$Message.info('操作成功!');
                                _self.initSearch();
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                }
            });
        }
    },
    mounted () {

    }
}
</script>