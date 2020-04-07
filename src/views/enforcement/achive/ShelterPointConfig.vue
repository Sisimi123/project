<template>
    <div>
        <Row>
            <Col span="24" class="padding-left-6">
                <Card :style="'height:'+(clientHeight-113)+'px'">
                    <Row>
                        <Input v-model="dataFilter" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                    </Row>
                    <Row style="margin-top:5px">
                        <MyTreeGrid ref="dataGrid" :height="clientHeight-180" size="small" border :columns="columnList" :data="filterTree"></MyTreeGrid>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal :width="600" v-model="modal.showDetail" :styles="{top: '80px'}" title="新增" :mask-closable="maskclosable">
            <Form :label-width="80" :model="info" ref="info">
                <Row>
                    <Col span="24">
                        <FormItem label="类型:">
                            <Select v-model="info.type" filterable @on-change='selectType'>
                                <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="名称:">
                            <Input v-model="info.name"/>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="modal.showDetail=false">取消</Button>
                <Button type="primary" @click="submitData">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import MyTreeGrid from '../../components/treeGrid/MyTreeGrid.vue';
import {isNull} from '../../../libs/common';
export default {
    components: {
        MyTreeGrid
    },
    data () {
        return {
            typeList: [
                {
                    label: '瑞安 ',
                    value: '1'
                },
                {
                    label: '外地 ',
                    value: '2'
                },
                {
                    label: '海上生产及返回途中',
                    value: '3'
                }
            ],
            info: {},
            modal: {
                showDetail: false
            },
            title: '',
            maskclosable: false,
            columnList: [
                {
                    title: '序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '地区',
                    type: 'tree',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '部门名称',
                    align: 'center',
                    key: 'deptName'
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '更新时间',
                    align: 'center',
                    key: 'updateTime'
                },
                {
                    title: '操作',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    display: params.row.deptName === undefined ? "inline-block": "none",
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.newWin(params.row);
                                    }
                                }
                            }, '新增'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    display: params.row.deptName !== undefined ? "inline-block": "none",
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.row);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataList: [],
            dataFilter: ''
        };
    },
    computed: {
        clientHeight () {
            return this.$store.state.app.clientHeight;
        },
        filterTree () {
            var tree = this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree, this.dataFilter, function (node, filter) {
                return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        }
    },
    methods: {
        submitData () {
            this.$http.post('/check/shelter/point/add', this.info)
                .then(res => {
                    if (res.success) {
                        this.$Message.info('操作成功!');
                        this.modal.showDetail = false;
                        this.loadDataTree();
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        newWin () {
            var _self = this;
            _self.info = {};
            this.$refs['info'].resetFields();
            this.modal.showDetail = true;
        },
        selectType (v) {
            this.info.type = v;
        },
        handleDelete (index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    this.$http
                        .delete('/check/shelter/point/' + index.id)
                        .then(res => {
                            this.$Message.info('操作成功');
                            this.loadDataTree();
                        }).catch(err => {
                            console.log(err);
                        });
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        handleSearch () {

        },
        loadDataTree () {
            var _self = this;
            _self.$http.get('/check/shelter/point/list')
                .then(res => {
                    if (res.success) {
                        _self.dataList = res.data;
                    } else {
                        this.$Message.error(res.msg)
                    }
                }).catch(err => {
                    console.log(err);
                });
        }
    },
    mounted () {
        this.loadDataTree();
    }
};
</script>

<style lang="less" scoped>
    @import '../styles/achive.less';
</style>