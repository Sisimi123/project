<style lang="less">
@import "../styles/achive.less";
</style>

<template>
    <div>
        <data-table
            ref="test"
            :withTree="true"
            :useZtree="false"
            :treeUrl="'/$admin/depts/authtree'" 
            :treeParams="treeQuery" 
            :treeTitle="'机构树'"
            :url="'/regulatoryRepertory/get'"
            :params="query"
            :columns="columns"
            @on-select-change="selectTreeChange"
            @on-row-dblclick="handleEditdb"
        >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                    <Row>
                        <Col span="4">
                            <Form-item label="检查结果:">
                                <Select placeholder="请选择..." v-model="query.wheres.dateType" @on-change='selectType'>
                                    <Option value='0'>全部</Option>
                                    <Option value='1'>异常数据</Option>
                                    <Option value='2'>重复数据</Option>
                                </Select>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="船名:">
                                 <Input v-model="query.wheres.name" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="所有人:">
                                 <Input v-model="query.wheres.owner" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="电话:">
                                 <Input v-model="query.wheres.tel" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Checkbox style="margin-left:5px;margin-top:5px" v-model="subDept" @on-change="changeSubDept">子部门</Checkbox>
                        </Col>
                        <div class="btn-wrap" style="margin-left:20px">
                            <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                            <Button @click="handleReset()" >重置</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </data-table>
        <!-- 差异字段列表窗口 -->
        <Modal :width="1200" v-model="modal.diffList" title="差异字段" :mask-closable="maskclosable">
            <Table border ref="diffList" :columns="columns_diffList" :data="diffList"></Table>
            <div slot="footer">
                <Button @click="modal.diffList=false">取消</Button>
                <Button @click="submit" type='success'>保存</Button>
            </div>
        </Modal>
        <!-- 显示对比窗口 -->
        <Modal :width="1200" v-model="modal.contrastWin" title="显示对比" :mask-closable="maskclosable">
            <Table border ref="contrast" :columns="columns_contrast" :data="contrast"></Table>
            <div slot="footer">
                <Button @click="modal.contrastWin=false">取消</Button>
            </div>
        </Modal>
        <ycjyModal 
            v-model="modal.ycjy" 
            :nametheShip="shipName"
            okText="确定"
            cancelText="返回"
        ></ycjyModal>
        <ycblxkModal 
            v-model="modal.blxk" 
            :nametheShip="shipName"
            okText="确定"
            cancelText="返回"
        ></ycblxkModal>
        <ycsyqModal 
            v-model="modal.syq" 
            :nametheShip="shipName"
            okText="确定"
            cancelText="返回"
        ></ycsyqModal>
    </div>
</template>

<script>
import ycjyModal from '@/views/components/modal-ship/ycjyModal.vue';
import ycblxkModal from '@/views/components/modal-ship/ycblxkModal.vue';
import ycsyqModal from '@/views/components/modal-ship/ycsyqModal.vue';
export default {
    components: {
        ycjyModal, ycblxkModal, ycsyqModal
    },
    data () {
        return {
            contrast: [],
            shipName: '',
            columns_contrast: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 80
                },
                {
                    key: 'shipname',
                    title: '船名',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'owner',
                    title: '船东',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'tel',
                    title: '联系电话',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'shiptype',
                    title: '船舶类型',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'shipmate',
                    title: '材质',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'del',
                    title: '有效',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        let str = '';
                        if (params.row.del === '0') {
                            str = '有效';
                        } else {
                            str = '无效';
                        }
                        return h('div', str);
                    }
                },
                {
                    key: 'intfUpdateTime',
                    title: '更新时间',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'blxkzEffectiveTime',
                    title: '捕捞许可有效期',
                    align: 'center',
                    minWidth: 120
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 200,
                    render: (h, params) => {
                        return h('div', [
                            h('Button',
                                {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '0 5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.setTrueShip(params.row.id);
                                        }
                                    }
                                }, '设置')
                            // h('Button',
                            //     {
                            //         props: {
                            //             type: 'error',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             margin: '0 5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.shipName = params.row.shipname;
                            //                 this.modal.ycjy = true;
                            //             }
                            //         }
                            //     }, '船检'),
                            // h('Button',
                            //     {
                            //         props: {
                            //             type: 'success',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             margin: '0 5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.shipName = params.row.shipname;
                            //                 this.modal.blxk = true;
                            //             }
                            //         }
                            //     }, '捕捞许可'),
                            // h('Button',
                            //     {
                            //         props: {
                            //             type: 'warning',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             margin: '0 5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 this.shipName = params.row.shipname;
                            //                 this.modal.syq = true;
                            //             }
                            //         }
                            //     }, '所有权')
                        ]);
                    }
                }
            ],
            isShow: true,
            fieldList: [
                {
                    value: 'owner',
                    label: '船东'
                },
                {
                    value: 'shiptype',
                    label: '船舶类型'
                },
                {
                    value: 'worktype',
                    label: '作业类型'
                },
                {
                    value: 'workmode',
                    label: '作业方式'
                },
                {
                    value: 'power',
                    label: '主机功率'
                },
                {
                    value: 'shipmate',
                    label: '船体材料'
                },
                {
                    value: 'tel',
                    label: '联系方式'
                },
                {
                    value: 'length',
                    label: '船长'
                },
                {
                    value: 'width',
                    label: '船宽'
                },
                {
                    value: 'depth',
                    label: '船深'
                },
                {
                    value: 'nation',
                    label: '国籍'
                },
                {
                    value: 'tonnage',
                    label: '总吨位'
                },
                {
                    value: 'mannum',
                    label: '核定人数'
                },
                {
                    value: 'callNum',
                    label: '呼号'
                },
                {
                    value: 'cardno',
                    label: '持证人身份证或工商注册号'
                },
                {
                    value: 'address',
                    label: '联系地址'
                }
            ],
            columns_diffList: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 80
                },
                {
                    title: '字段名',
                    key: 'field',
                    align: 'center',
                    maxWidth: 150,
                    render: (h, params) => {
                        var temp = '';
                        this.fieldList.forEach((v, i) => {
                            if (v.value === params.row.field) {
                                temp = v.label;
                            }
                        });
                        return h('span', temp);
                    }
                },
                {
                    key: 'ycjb',
                    title: '渔船基本信息',
                    align: 'center',
                    render: (h, params) => {
                        var _self = this;
                        if (params.row.ycjb === null || params.row.ycjb === undefined) {
                            return [
                                h('Icon', {
                                    props: {
                                        type: 'md-close',
                                        size: 'small',
                                        color: 'red'
                                    }
                                })
                            ];
                        } else {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'info'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.realVal = params.row.ycjb;
                                            _self.diffList[params.index].realVal = params.row.ycjb;
                                        }
                                    }
                                },
                                params.row.ycjb
                            );
                        }
                    }
                },
                {
                    key: 'ycjy',
                    title: '渔船检验证书',
                    align: 'center',
                    render: (h, params) => {
                        var _self = this;
                        if (params.row.ycjy === null || params.row.ycjy === undefined) {
                            return [
                                h('Icon', {
                                    props: {
                                        type: 'md-close',
                                        size: 'small',
                                        color: 'red'
                                    }
                                })
                            ];
                        } else {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'info'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.realVal = params.row.ycjy;
                                            _self.diffList[params.index].realVal = params.row.ycjy;
                                        }
                                    }
                                },
                                params.row.ycjy
                            );
                        }
                    }
                },
                {
                    key: 'ycblxkz',
                    title: '捕捞许可证',
                    align: 'center',
                    render: (h, params) => {
                        var _self = this;
                        if (params.row.ycblxkz === null || params.row.ycblxkz === undefined) {
                            return [
                                h('Icon', {
                                    props: {
                                        type: 'md-close',
                                        size: 'small',
                                        color: 'red'
                                    }
                                })
                            ];
                        } else {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'info'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.realVal = params.row.ycblxkz;
                                            _self.diffList[params.index].realVal = params.row.ycblxkz;
                                        }
                                    }
                                },
                                params.row.ycblxkz
                            );
                        }
                    }
                },
                {
                    key: 'gjsyqjd',
                    title: '国籍所有权',
                    align: 'center',
                    render: (h, params) => {
                        var _self = this;
                        if (params.row.gjsyqjd === null || params.row.gjsyqdj === undefined) {
                            return [
                                h('Icon', {
                                    props: {
                                        type: 'md-close',
                                        size: 'small',
                                        color: 'red'
                                    }
                                })
                            ];
                        } else {
                            return h(
                                'Button',
                                {
                                    props: {
                                        type: 'info'
                                    },
                                    on: {
                                        click: () => {
                                            params.row.realVal = params.row.gjsyqdj;
                                            _self.diffList[params.index].realVal = params.row.gjsyqdj;
                                        }
                                    }
                                },
                                params.row.gjsyqdj
                            );
                        }
                    }
                },
                {
                    title: '正确值',
                    align: 'center',
                    // key: 'ycjy',
                    render: (h, params) => {
                        var _self = this;
                        return h(
                            'Input',
                            {
                                props: {
                                    type: 'text',
                                    value: params.row.realVal
                                },
                                on: {
                                    'on-change': (event) => {
                                        params.row.realVal = event.target.value;
                                        _self.diffList[params.index].realVal = event.target.value;
                                        // _self.fieldValue = params.row.realVal;
                                    }
                                }
                            }
                        );
                    }
                }
            ],
            diffList: [],
            maskclosable: false,
            modal: {
                ycjy: false,
                syq: false,
                blxk: false,
                contrastWin: false,
                diffList: false
            },
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: 'shipname',
                    title: '船名',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'owner',
                    title: '船东',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'tel',
                    title: '联系电话',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'shiptype',
                    title: '船舶类型',
                    align: 'center',
                    minWidth: 90
                },
                {
                    key: 'worktype',
                    title: '作业类型',
                    align: 'center',
                    minWidth: 90
                },
                {
                    key: 'workmode',
                    title: '作业方式',
                    align: 'center',
                    minWidth: 90
                },
                {
                    key: 'shipmate',
                    title: '材质',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: 'power',
                    title: '主机功率',
                    align: 'center',
                    minWidth: 65
                },
                {
                    key: 'length',
                    title: '船长',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: 'width',
                    title: '型宽',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: 'depth',
                    title: '型深',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: "action",
                    title: "操作",
                    width:150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.pageTo(params.row);
                                    }
                                }
                                },'详情')
                        ])
                    }
                }
            ],
            treeQuery: {
                containOrgan: false,
                type: '1'
            },
            subDept: true,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    type: '1',
                    thisDept: '',
                    name: '',
                    deptId: '',
                    owner: '',
                    tel: '',
                    showDiff: 'true',
                    dateType: '0'
                }
            },
            shipname: '',
            editList: [],
            // judegKey: ''
            owner: ''
        };
    },
    methods: {
        setTrueShip (row) {
            var _self = this;
            _self.$http.post('/regulatoryRepertory/comparison?id=' + row)
                .then(res => {
                    if (res.success) {
                        _self.$Message.info('设置成功。');
                        _self.modal.contrastWin = false;
                        _self.initSearch();
                    } else {
                        _self.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        selectType (v) {
            var _self = this;
            if (_self.columns.length >= 12) {
                _self.columns = _self.columns.slice(0,11)
            }
            if (v === '1') {
                _self.columns.push(
                    {
                        title: '操作',
                        align: 'center',
                        minWidth: 180,
                        render: (h, params) => {
                            var _self = this;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                    },
                                    on: {
                                        click: () => {
                                            _self.diffListFun(params.row);
                                        }
                                    }
                                }, '差异字段')
                            ]);
                        }
                    }
                );
            } else if (v === '2') {
                _self.columns.push(
                    {
                        key: 'diffCount',
                        title: '重复数量',
                        align: 'center',
                        minWidth: 90
                    },
                    {
                        title: '操作',
                        align: 'center',
                        minWidth: 180,
                        render: (h, params) => {
                            var _self = this;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                    },
                                    on: {
                                        click: () => {
                                            _self.contrastWin(params.row);
                                        }
                                    }
                                }, '显示对比')
                            ]);
                        }
                    }
                );
            }
            this.initSearch();
        },
        // selectField (row) {
        //     var _self = this;
        //     var str = row.trim().split(' ');
        // _self.editList.push(
        //     {
        //         field: str[0],
        //         value: str[1]
        //     }
        // );
        // },
        contrastWin (row) {
            var _self = this;
            _self.$http.get('/regulatoryRepertory/comparison?shipname=' + row.shipname)
                .then(res => {
                    if (res.success) {
                        _self.contrast = res.data;
                        _self.modal.contrastWin = true;
                    } else {
                        _self.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        submit () {
            var _self = this;
            var obj = {};
            _self.editList = [];
            _self.diffList.forEach((v, i) => {
                if (v.realVal !== '') {
                    // var str = v.realVal.trim().split(' ');
                    _self.editList.push(
                        {
                            field: v.field,
                            value: v.realVal
                        }
                    );
                }
            });
            obj = {
                owner: _self.owner,
                shipname: _self.shipname,
                editList: _self.editList
            };
            _self.$http.post('/regulatoryRepertory/setRevise', obj)
                .then(res => {
                    if (res.success) {
                        _self.modal.diffList = false;
                        _self.initSearch();
                    } else {
                        _self.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        diffListFun (row) {
            var _self = this;
            _self.owner = row.owner;
            _self.shipname = row.shipname;
            _self.diffList = row.diffList;
            _self.diffList.forEach((v, i) => {
                v.realVal = '';
            });
            _self.modal.diffList = true;
        },
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
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            }
            this.query.wheres.dateType= '0';
            this.query.wheres.type = '1';
            this.query.page = 1;
            this.query.size = 10;
            if (this.columns.length >= 12) {
                this.columns = this.columns.slice(0,11)
            }
            this.initSearch();
        },
        handleEditdb (ids) {
            // this.info = ids;
            // this.modal.watchMsg = true;
            // this.handleEdit(ids);
        },
        selectTreeChange (v) {
            var _self = this;
            _self.query.wheres.deptId = v[0].id;
            _self.initSearch();
        },
        /**
         * @desc 操作中的详情 根据shipId从后端拿数据，接着跳转页面
         */
        pageTo(row) {
            this.getDetail(row.shipId).then(res => {
                this.$router.push({
                    path: "/supervision/details/shipPortrait",
                    query: { info: JSON.stringify(res) }
                })
            }).catch(err => {
                this.$Message.error(err);
            });
        },
        /**
         * @desc 根据shipId获取列表中item的全部信息
         */
        getDetail(shipId) {
            return this.$http.get('/robot/assistant/getShipInfoByShipId?shipId=' + shipId).then(res => {
                if (res.success) {
                    return Promise.resolve(res.data);
                }
                else {
                    return Promise.reject(res.msg);
                }
            }).catch(err => {
                return Promise.reject(err.msg);
            })
        }
    },
    mounted () {
    }
}
</script>