<style lang="less">
    @import '../../styles/common.less';
</style>

<template>
    <div>
        <data-table ref='main'
            :withTree="true"
            :useZtree="true"
            :treeUrl="'/$admin/apps/getAppModule'"
            :treeParams="treeQuery"
            :treeTitle="'模块树'"
            :url="'/$admin/guides/page'"
            :params="query"
            :columns="columns"
            @on-select-change="selectTreeChange"
        >
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <!-- <Col span="6">
                        <Form-item label="模块名:">
                            <Input v-model="query.wheres.moduleId_eq" @on-keydown.enter="''" placeholder="请输入..."/>
                        </Form-item>
                    </Col> -->
                    <Col span="6">
                        <Form-item label="标题:">
                            <Input v-model="query.wheres.title_like" @on-keydown.enter="''" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button @click="initSearch" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset">重置</Button>
                    </div>
                    <span style="float:right;margin-bottom:10px">                                                                         
                        <ButtonGroup >
                            <Button @click="newWin" type="info" icon="ios-add">新增</Button>
                        </ButtonGroup> 
                    </span>            
                </Row>                                                                
            </Form>
        </div>
        </data-table>
        <Modal v-model="modalStatus.newAddModal" :styles="{top: '80px'}" :title="title" width="900px" :mask-closable="false">
            <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
                <Row>
                    <Col span="12">
                        <FormItem label="元素id:">
                            <Input v-model="info.element"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="标题:">
                            <Input v-model="info.title"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="描述:">
                            <Input v-model="info.description"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="排序:">
                            <Input v-model="info.sort"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="位置:">
                            <Select placeholder="请选择..." v-model="info.position">
                                <Option value="left">左边</Option>
                                <Option value="right">右边</Option>
                                <Option value="top">上边</Option>
                                <Option value="bottom">下边</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="状态:">
                            <Select placeholder="请选择..." v-model="info.status">
                                <Option value="0">禁用</Option>
                                <Option value="1">启用</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="modalStatus.newAddModal=false">取消</Button>
                <Button type="primary" @click="submitData">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            treeQuery: {
                appId: 'f3453122804d11e9a28a54bf64101e4d'
            },
            query: {
                page: 1,
                size: 20,
                wheres: {
                    moduleId_eq: '',
                    title_like: ''
                }
            },
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    maxWidth: 80,
                    align: 'center'
                },
                {
                    title: '元素id',
                    align: 'center',
                    key: 'element'
                },
                {
                    title: '标题',
                    align: 'center',
                    key: 'title'
                },
                {
                    title: '描述',
                    align: 'center',
                    key: 'description'
                },
                {
                    title: '位置',
                    align: 'center',
                    key: 'position',
                    render: (h, params) => {
                        let str = '';
                        if (params.row.position === 'left') {
                            str = '左边';
                        } else if (params.row.position === 'right') {
                            str = '右边';
                        } else if (params.row.position === 'top') {
                            str = '上边';
                        } else if (params.row.position === 'buttom') {
                            str = '下边';
                        }
                        return h('span', str);
                    }
                },
                {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    render: (h, params) => {
                        let str = '';
                        if (params.row.status === '0') {
                            str = '禁用';
                        } else if (params.row.status === '1') {
                            str = '启用';
                        }
                        return h('span', str);
                    }
                },
                {
                    title: '创建时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 255,
                    render: (h, params) => {
                        var _self = this;
                        return h('div', [
                            h('Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.title = '编辑';
                                            _self.editWin(params.row);
                                        }
                                    }
                                }, '编辑'),
                            h('Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginLeft: '10px'
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
            title: '',
            modalStatus: {
                newAddModal: false
            },
            info: {},
            infoRules: {},
            moduleId: '',
            dataId: ''
        };
    },
    methods: {
        editWin (row) {
            var _self = this;
            _self.$refs['info'].resetFields();
            _self.dataId = row.id;
            // 对象深拷贝
            var data = JSON.parse(JSON.stringify(row));
            _self.info = data;
            this.modalStatus.newAddModal = true;
        },
        handleDelete (row) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    this.$http
                        .delete('/$admin/guides/' + row.id)
                        .then(res => {
                            this.$Message.info('操作成功');
                            this.initSearch();
                        }).catch(err => {
                            console.log(err);
                        });
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        submitData () {
            var _self = this;
            if (_self.title === '新增') {
                this.$http.post('/$admin/guides/save', this.info)
                    .then(res => {
                        if (res.success) {
                            this.$Message.info('新增成功');
                            this.modalStatus.newAddModal = false;
                            this.initSearch();
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            } else if (_self.title === '编辑') {
                this.$http.patch('/$admin/guides/' + _self.dataId, this.info)
                    .then(res => {
                        if (res.success) {
                            this.$Message.info('修改成功');
                            this.modalStatus.newAddModal = false;
                            this.initSearch();
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            }
        },
        selectTreeChange (v) {
            var _self = this;
            _self.query.wheres.moduleId_eq = v[0].id;
            _self.moduleId = v[0].id;
            _self.initSearch();
        },
        newWin () {
            if (this.moduleId === '' || this.moduleId === undefined) {
                this.$Message.info('请选择模块。');
                return;
            };
            this.title = '新增';
            this.$refs['info'].resetFields();
            for (let key in this.info) {
                this.info[key] = '';
            }
            this.info.moduleId = this.moduleId;
            this.modalStatus.newAddModal = true;
        },
        initSearch () {
            this.$refs.main.initSearch();
        },
        handleReset () {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            };
            this.initSearch();
        }
    }
};
</script>

<style lang="less" scoped>

</style>