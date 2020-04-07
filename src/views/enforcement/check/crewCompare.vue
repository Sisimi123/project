<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
    <div>
        <data-table ref="test"
        :url="'/shipContrast/getSeamanContrastPage'" :params="query" :columns="columns">
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="6">
                        <Form-item label="船员名:">
                            <Input v-model="query.wheres.name" icon="ios-search" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset()" >重置</Button>
                    </div>
                </Row>
            </Form>
        </div>
        </data-table>
        <Modal v-model="status.itemModal" width="860" title="查看">
            <div class="note3"></div>
            <i-table border :columns="modalColumns" :data="itemList" ></i-table>
            <div class="note">
            <span style="margin-right:10px;margin-left:10px;">备注:</span><Icon type="md-close" color="red" size="small"></Icon>
            表示此系统没有数据
            </div>
            <div slot="footer">
                <i-Button  @click="status.itemModal=false">关闭</i-Button>
            </div>
        </Modal>
        <Modal v-model="status.compareModal" class="vertical-center-modal detail"  title="船员对比"  width="860" >
            <Row>
                <table class="zcl_ls_table2" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <th></th>
                        <th>农业部数据</th>
                        <th>救助系统数据</th>
                    </tr>
                    <tr>
                        <td>船员证书</td>
                        <td>
                            <template v-if="compareData[0].cerNum.sailor!= ''">
                                {{compareData[0].cerNum.sailor}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                        <td>
                            <template v-if="compareData[0].cerNum.seaman!= ''">
                                {{compareData[0].cerNum.seaman}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td>证书级别</td>
                        <td>
                            <template v-if="compareData[0].grade.sailor!= ''">
                                {{compareData[0].grade.sailor}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                        <td>
                            <template v-if="compareData[0].grade.seaman!= ''">
                                {{compareData[0].grade.seaman}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td>职务</td>
                        <td>
                            <template v-if="compareData[0].duty.sailor!= ''">
                                {{compareData[0].duty.sailor}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                        <td>
                            <template v-if="compareData[0].duty.seaman!= ''">
                                {{compareData[0].duty.seaman}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td>
                            <template v-if="compareData[0].name.sailor!= ''">
                                {{compareData[0].name.sailor}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                        <td>
                            <template v-if="compareData[0].name.seaman!= ''">
                                {{compareData[0].name.seaman}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                    </tr>
                    <tr>
                        <td>证书有效期</td>
                        <td>
                            <template v-if="compareData[0].validity.sailor!= ''">
                                {{compareData[0].validity.sailor}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                        <td>
                            <template v-if="compareData[0].validity.seaman!= ''">
                                {{compareData[0].validity.seaman}}
                            </template>
                            <template v-else>
                                <Icon type="md-close" color="red" size="small"></Icon>
                            </template>
                        </td>
                    </tr>
                </table>
            </Row>
            <div slot="footer">
                <i-Button  @click="status.compareModal=false">关闭</i-Button>
            </div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: 'crewCompare',
    data () {
        return {
            compareData: [
                {
                    cerNum: {
                        seamanCerNum: '',
                        sailorCerNum: ''
                    },
                    grade: {
                        sailorGrade: '',
                        seamanGrade: ''
                    },
                    name: {
                        sailorName: '',
                        seamanName: ''
                    },
                    duty: {
                        sailorDuty: '',
                        seamanDuty: ''
                    },
                    validity: {
                        sailorValidity: '',
                        seamanValidity: ''
                    }
                }
            ],
            status: {
                itemModal: false,
                compareModal: false
            },
            itemList: [],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    name: ''
                }
            },
            modalColumns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '农业部数据',
                    key: 'sailor',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.sailor);
                    }
                },
                {
                    title: '救助系统数据',
                    key: 'seaman',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.seaman);
                    }
                }
            ]
        };
    },
    computed: {
        columns () {
            return [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    width: 50
                },
                {
                    title: '身份证',
                    key: 'idCard',
                    align: 'center'
                },
                {
                    title: '船员',
                    key: 'name',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.name.nameStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.name);
                                    }
                                }
                            },
                            this.realValue(params.row.name.nameStatus, params.row.name)
                        );
                    }
                },
                {
                    title: '职务船员证书号',
                    key: 'cerNum',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.cerNum.cerNumStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.cerNum);
                                    }
                                }
                            },
                            this.realValue(params.row.cerNum.cerNumStatus, params.row.cerNum)
                        );
                    }
                },
                {
                    title: '证书级别',
                    key: 'grade',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.grade.gradeStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.grade);
                                    }
                                }
                            },
                            this.realValue(params.row.grade.gradeStatus, params.row.grade)
                        );
                    }
                },
                {
                    title: '职务',
                    key: 'duty',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.duty.dutyStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.duty);
                                    }
                                }
                            },
                            this.realValue(params.row.duty.dutyStatus, params.row.duty)
                        );
                    }
                },
                {
                    title: '证书有效期',
                    key: 'validity',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.validity.validityStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.validity);
                                    }
                                }
                            },
                            this.realValue(params.row.validity.validityStatus, params.row.validity)
                        );
                    }
                },
                {
                    title: '操作',
                    key: 'id',
                    align: 'center',
                    width: 120,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showDetails(params.row);
                                    }
                                }
                            }, '详情')
                        ]);
                    }
                }
            ];
        }
    },
    methods: {
        showDetails (row) {
            this.compareData = [];
            this.compareData.push(row)
            this.status.compareModal = true;
        },
        showEachVal (row) {
            this.itemList = [];
            this.itemList.push(row);
            this.status.itemModal = true;
        },
        showTd (h, value) {
            if (value === '') {
                return [
                    h('Icon', {
                        props: {
                            type: 'close-round',
                            size: 'small',
                            color: 'red'
                        }
                    })
                ];
            } else {
                return h('span', value);
            }
        },
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset () {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            };
            this.initSearch();
        },
        realColor (value) {
            if (value === '0') {
                return 'warning';
            } else if (value === '1') {
                return 'success';
            } else if (value === '2') {
                return 'info';
            }
        },
        realValue (value, index) {
            if (value === '0') {
                return '不符';
            } else if (value === '1') {
                return index.sailor;
            } else if (value === '2') {
                return index.sailor === '' ? index.seaman : index.sailor;
            }
        }
    }
};
</script>

<style scoped>
.detail .ivu-form-item{
    margin-bottom: 10px !important;
}

.note {
  height: 48px;
  line-height: 48px;
  border: 1px solid #e9eaec;
  border-top: none;
  text-align: center;
}
.note2,
.note3 {
  height: 35px;
  line-height: 35px;
  border: 1px solid #e9eaec;
  border-top: none;
  text-align: center;
}
.note3 {
  height: 35px;
  border: 1px solid #e9eaec;
  font-weight: 700;
  border-bottom: none;
  background: #f8f8f9;
}

.zcl_ls_table,
.zcl_ls_table2 {
  width: 100%;
  font-size: 12px;
  text-align: center;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  margin_bottom: 10px;
}
.zcl_ls_table th,
.zcl_ls_table2 th {
  height: 30px;
  background-color: #f8f8f9;
}
.zcl_ls_table2 td {
  height: 35px;
  width: 139px;
  text-align: center;
}

.zcl_ls_table th,
.zcl_ls_table td,
.zcl_ls_table2 th,
.zcl_ls_table2 td {
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  /* 			padding-left: 10px; */
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
}
</style>

