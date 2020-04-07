<style lang="less">
</style>

<template>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        
        <div slot="footer" >
            <Button  @click="cancel()">关闭</Button>
        </div>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span>人员名：</span>
                <Input v-model="query.wheres.realName" @on-keydown.enter="initSearch()"  style="width:30%" placeholder="请输入..."></Input>
                <span>联系电话：</span>
                <Input v-model="query.wheres.tel" @on-keydown.enter="initSearch()"  style="width:30%" placeholder="请输入..."></Input>
                <Button style="margin-left:5px" @click="initSearch()" type="info" icon="ios-search" shape="circle">搜索</Button>
              </div>
            </Row>
            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.tableLoading" :columns="mixColumns" :data="selectList" border :height="280"></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom-wrap">
                  <Page show-total :total="totalNum" show-sizer 
                placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
                :current="query.page" @on-change="changePage" ></Page>
              </div>
            </Row>
          </Col>
        </Row>

    </Modal>
</template>

<script>
export default {
    name: 'selectEleUser',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: '人员'
        },
        width: {
            type: [Number, String],
            default: 820
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        className: {
            type: String
        },
        // for instance
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default () {
                return ['ease', 'fade'];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        // 参数
        keyParam: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: '2'
        },
        exclude: {
            type: String,
            default: ''
        }
    },
    computed: {
        mixColumns () {
            // 电工
            if (this.type === '2') {
                return this.columnsEle;
            } else {
                return this.columnsUser;
            }
        }
    },
    data () {
        return {
            visible: false,
            totalNum: 0,
            status: {
                tableLoading: false
            },
            query: {
                page: 1,
                size: 10,
                wheres: {
                    realName: '',
                    tel: '',
                    type: ''
                },
                orders: ''
            },
            columnsEle: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    key: 'realName',
                    title: '姓名'
                },
                {
                    key: 'tel',
                    title: '联系电话'
                },
                {
                    key: 'evaluate',
                    title: '评价',
                    render: (h, params) => {
                        var evaluate = params.row.evaluateEle;
                        var evaLuateEleCount = params.row.evaLuateEleCount;
                        var msg = '暂无评价';
                        if (!this.isEmpty(evaluate)) {
                            msg = evaluate / evaLuateEleCount.toFixed(1) + '星';
                        }
                        return h('span', msg);
                    }
                },
                {
                    title: '选择',
                    key: 'id',
                    align: 'center',
                    width: 100,
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
                                        this.selectedUser(params.row);
                                    }
                                }
                            },
                            '确认'
                        );
                    }
                }
            ],
            columnsUser: [
                {
                    title: '序号',
                    type: 'index',
                    width: 80,
                    align: 'center'
                },
                {
                    key: 'realName',
                    title: '姓名'
                },
                {
                    key: 'tel',
                    title: '联系电话'
                },
                {
                    title: '选择',
                    key: 'id',
                    align: 'center',
                    width: 100,
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
                                        this.selectedUser(params.row);
                                    }
                                }
                            },
                            '确认'
                        );
                    }
                }
            ],
            selectList: []
        };
    },
    methods: {
        ok () {
            this.visible = false;
            if (!this.loading) this.$emit('input', this.visible);
            this.$emit('on-ok');
        },
        cancel () {
            this.visible = false;
            this.$emit('input', this.visible);
            this.$emit('on-cancel');
        },
        visibleChange (val) {
            this.visible = val;
            this.$emit('on-visible-change', val);
        },
        selectedUser (row) {
            this.$emit('on-selected', row);
            this.ok();
        },
        initSearch () {
            this.query.page = 1;
            this.handleSearch();
        },
        handleSearch () {
            this.status.tableLoading = true;
            this.$http
                .get('/enanny/userinfo/getPageByType', {
                    params: {
                        query: JSON.stringify(this.query)
                    }
                })
                .then(res => {
                    console.log('getPageByType', res);
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        isEmpty (s) {
            if (s === null || s === '' || s === undefined) {
                return true;
            }
            return false;
        },
        pageSizeChange (size) {
            this.query.size = size;
            this.handleSearch();
        },
        changePage (page) {
            this.query.page = page;
            this.handleSearch();
        }

    },
    watch: {
        value (val) {
            this.visible = val;
            if (val) {
                this.query.wheres.type = this.type;
                this.query.wheres.exclude = this.exclude;
                this.initSearch();
            }
        }
    }
};
</script>

<style scoped>
.bottom-wrap {
    padding-top: 10px;
    overflow: hidden;
    
}
.bottom-wrap .ivu-page {
    float: right;
}
</style>