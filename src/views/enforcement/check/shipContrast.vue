<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
    <div>
        <data-table ref="test"
        :url="'/shipContrast/getPage'" :params="query" :columns="columns"
        @on-select-change="selectTreeChange"
        >
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="6">
                        <Form-item label="船名:">
                            <Input v-model="query.wheres.shipName" icon="ios-search" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset()" >重置</Button>
                    </div>
                    <span style="float:right;">
                        <Button @click="viewCount2" type="warning">统计</Button>
                        <!-- <Button @click="viewCount" type="success">四库汇总</Button> -->
                    </span>
                </Row>
            </Form>
        </div>
        </data-table>
        
        <Modal v-model="status.compareModal" class="vertical-center-modal detail"  title="船舶对比"  width="860" >
            <Form ref="compareData"  :model="compareData" :label-width="100">
                <Row>
                    <Col span="12">
                        <Form-item label="渔船名：" >
                            <Input v-model="compareData.shipName"  placeholder="请输入渔船名" readonly></Input> 
                        </Form-item>
                    </Col>
                </Row>
                <!-- <Row>
                    <Col span="8">
                        <Form-item :label="'船检'+dateYear.near3+''" :label-width="90">
                            <Radio-group v-model="compareData.cjNear3"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'船检'+dateYear.near2+''" :label-width="90">
                            <Radio-group v-model="compareData.cjNear2"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'船检'+dateYear.near1+''" :label-width="90">
                            <Radio-group v-model="compareData.cjNear1"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item :label="'年审'+dateYear.near3+''" :label-width="90">
                            <Radio-group v-model="compareData.nsNear3"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'年审'+dateYear.near2+''" :label-width="90">
                            <Radio-group v-model="compareData.nsNear2"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'年审'+dateYear.near1+''" :label-width="90">
                            <Radio-group v-model="compareData.nsNear1"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item :label="'油补'+dateYear.near3+''" :label-width="90">
                            <Radio-group v-model="compareData.ybNear3"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'油补'+dateYear.near2+''" :label-width="90">
                            <Radio-group v-model="compareData.ybNear2"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item :label="'油补'+dateYear.near1+''" :label-width="90">
                            <Radio-group v-model="compareData.ybNear1"  type="button">
                                <Radio label="有" ></Radio>
                                <Radio label="无" ></Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                </Row> -->
                <Row>
                    <table class="zcl_ls_table2" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <th></th>
                            <th>救助系统</th>
                            <th>渔船检验</th>
                            <th>捕捞许可证</th>
                            <th>渔船基本信息</th>
                            <th>国籍所有权</th>
                        </tr>
                        <tr v-for="item in compareData.fields" :key="item.id">
                            <td >{{item.fieldName}}</td>
                            <td >
                                <template v-if="item['救助系统'] != null">
                                    {{item['救助系统']}}
                                </template>
                                <template v-else>
                                    <Icon type="md-close" color="red" size="small"></Icon>
                                </template>
                            </td>
                            <td>
                                <template v-if="item['渔船检验证书'] != null">
                                    {{item['渔船检验证书']}}
                                </template>
                                <template v-else>
                                    <Icon type="md-close" color="red" size="small"></Icon>
                                </template>
                            </td>
                            <td>
                                <template v-if="item['捕捞许可证']!= null">
                                    {{item['捕捞许可证']}}
                                </template>
                                <template v-else>
                                    <Icon type="md-close" color="red" size="small"></Icon>
                                </template>
                            </td>
                            <td>
                                <template v-if="item['渔船基本信息'] != null">
                                    {{item['渔船基本信息']}}
                                </template>
                                <template v-else>
                                    <Icon type="md-close" color="red" size="small"></Icon>
                                </template>
                            </td>
                            <td >
                                <template v-if="item['国籍所有权证书'] != null">
                                    {{item['国籍所有权证书']}}
                                </template>
                                <template v-else>
                                    <Icon type="md-close" color="red" size="small"></Icon>
                                </template>
                            </td>
                        </tr>                        
                    </table>
                    <div class="note2" >
                        <span style="margin-right:10px;">备注:</span><Icon type="md-close" color="red" size="small"></Icon>
                        表示此系统没有渔船,空白表示有渔船但没数据
                    </div>
                </Row>
                <Row style="margin-top:10px;">
                    <Col span="8">
                        <Form-item label="船检证书：" :label-width="80">
                            <Radio-group v-model="compareData.cjzsTimeStatus" type="button">
                                <Radio label="0" >有效</Radio>
                                <Radio label="1" >过期</Radio>
                                <Radio label="-1" >不存在</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="捕捞证书：" :label-width="80">
                            <Radio-group v-model="compareData.blxkTimeStatus" type="button">
                                <Radio label="0" >有效</Radio>
                                <Radio label="1" >过期</Radio>
                                <Radio label="-1" >不存在</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="所有权证书：" :label-width="90">
                            <Radio-group v-model="compareData.syqTimeStatus" type="button">
                                <Radio label="0" >有效</Radio>
                                <Radio label="1" >过期</Radio>
                                <Radio label="-1" >不存在</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <i-Button  @click="status.compareModal=false">关闭</i-Button>
            </div>
        </Modal>      

        <compareCount 
        v-model="status.showCount" 
        okText="确定"
        @on-ok="handleDefault()"
        cancelText="返回"
        @on-cancel="handleDefault()"
        ></compareCount>

        <compareCount2 
        v-model="status.showCount2" 
        :title="currNode.title"
        :area="currNode"
        okText="确定"
        @on-ok="handleDefault()"
        cancelText="返回"
        @on-cancel="handleDefault()"
        ></compareCount2>  

        <Modal v-model="status.itemModal" width="860" title="查看">
            <div class="note3">{{eachLine.shipname}}</div>
            <i-table border :columns="modalColumns" :data="eachLine.itemList" ></i-table>
            <div class="note">
            <span style="margin-right:10px;margin-left:10px;">备注:</span><Icon type="md-close" color="red" size="small"></Icon>
            表示此系统没有渔船,空表示有渔船但没数据
            </div>
            <div slot="footer">
                <i-Button  @click="status.itemModal=false">关闭</i-Button>
            </div>
        </Modal>
        <Modal v-model="status.itemModal2" width="860" title="查看">
            <div class="note3">{{eachLine.shipname}}</div>
            <i-table border :columns="modalColumns2" :data="eachLine.itemList2"></i-table>
            <div slot="footer">
                <i-Button  @click="status.itemModal2=false">关闭</i-Button>
            </div>
        </Modal>
    </div>
    
</template>

<script>
import compareCount from './components/compareCount.vue';
import compareCount2 from './components/compareCount2.vue';
export default {
    name: 'shipContrast',
    components: {
        compareCount,
        compareCount2
    },
    data () {
        return {
            modalColumns2: [
                {
                    title: '姓名',
                    key: 'fidName',
                    align: 'center'
                },
                {
                    title: '证书有效期',
                    key: 'fidUsedtime',
                    align: 'center'
                },
                {
                    title: '证书级别',
                    key: 'fidLevel',
                    align: 'center'
                },
                {
                    title: '属地',
                    key: 'fidHomeplace',
                    align: 'center'
                },
                {
                    title: '职务证书',
                    key: 'fidLetter',
                    align: 'center'
                },
                {
                    title: '职务',
                    key: 'fidDuty',
                    align: 'center'
                }
            ],
            modalColumns: [
                {
                    title: '名称',
                    key: 'fieldName',
                    align: 'center'
                },
                {
                    title: '救助系统',
                    key: '救助系统',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.救助系统);
                    }
                },
                {
                    title: '渔船检验证书',
                    key: '渔船检验证书',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.渔船检验证书);
                    }
                },
                {
                    title: '捕捞许可证',
                    key: '捕捞许可证',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.捕捞许可证);
                    }
                },
                {
                    title: '渔船基本信息',
                    key: '渔船基本信息',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.渔船基本信息);
                    }
                },
                {
                    title: '国籍所有权',
                    key: '国籍所有权证书',
                    align: 'center',
                    render: (h, params) => {
                        return this.showTd(h, params.row.国籍所有权证书);
                    }
                }
            ],
            eachLine: {
                itemList: [],
                itemList2: [],
                shipname: ''
            },
            currNode: {},
            compareData: {
                fields: []
            },
            status: {
                compareModal: false,
                showCount: false,
                showCount2: false,
                itemModal: false,
                itemModal2: false
            },
            query: {
                page: 1,
                size: 10,
                wheres: {
                    shipName: ''
                }
            },
            dateYear: {
                current: '',
                near1: '',
                near2: '',
                near3: ''
            }
        };
    },
    computed: {
        currentYear () {
            return new Date().getFullYear();
        },
        columns () {
            return [
                {
                    title: '序号',
                    type: 'index',
                    // fixed: 'left',
                    align: 'center'
                },
                {
                    title: '渔船名',
                    key: 'shipName',
                    align: 'center'
                    // fixed: 'left',
                },
                {
                    title: '船东',
                    key: 'shipowner',
                    width: 300,
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.shipownerStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '船东');
                                    }
                                }
                            },
                            this.realValue(params.row.shipownerStatus, params.row.shipowner)
                        );
                    }
                },
                {
                    title: '型宽',
                    key: 'shipWidth',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.shipWidthStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '型宽');
                                    }
                                }
                            },
                            this.realValue(params.row.shipWidthStatus, params.row.shipWidth)
                        );
                    }
                },
                {
                    title: '船长',
                    key: 'shipLength',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.shipLengthStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '船长');
                                    }
                                }
                            },
                            this.realValue(params.row.shipLengthStatus, params.row.shipLength)
                        );
                    }
                },
                {
                    title: '作业方式',
                    key: 'workType',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.workTypeStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '作业方式');
                                    }
                                }
                            },
                            this.realValue(params.row.workTypeStatus, params.row.workType)
                        );
                    }
                },
                {
                    title: '主机功率',
                    key: 'shipPower',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.shipPowerStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '主机功率');
                                    }
                                }
                            },
                            this.realValue(params.row.shipPowerStatus, params.row.shipPower)
                        );
                    }
                },
                {
                    title: '完工时间',
                    key: 'consCompDate',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.consCompDateStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '完工时间');
                                    }
                                }
                            },
                            this.realValue(params.row.consCompDateStatus, params.row.consCompDate)
                        );
                    }
                },
                {
                    title: '核载人数',
                    key: 'allowPeople',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.allowPeopleStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal(params.row.id, '核载人数');
                                    }
                                }
                            },
                            this.realValue(params.row.allowPeopleStatus, params.row.allowPeople)
                        );
                    }
                },
                {
                    title: '船员配备',
                    key: 'manning',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'Button',
                            {
                                props: {
                                    type: this.realColor(params.row.manningStatus)
                                },
                                on: {
                                    click: () => {
                                        this.showEachVal2(params.row.id, '船员配备');
                                    }
                                }
                            },
                            this.realValue(params.row.manningStatus, params.row.manning)
                        );
                    }
                },
                // {
                //     title: 'AIS',
                //     key: 'ais',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         if (this.isEmpty(params.row.ais)) {
                //             return h(
                //                 'Icon',
                //                 {
                //                     props: {
                //                         type: 'close-round',
                //                         color: 'red',
                //                         size: 'small'
                //                     }
                //                 },
                //                 params.row.ais
                //             );
                //         } else {
                //             return h('span', params.row.ais);
                //         }
                //     }
                // },
                // {
                //     title: '船检' + (this.currentYear - 1),
                //     key: 'cj',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.cj, this.currentYear - 1)
                //                 }
                //             },
                //             this.haveValue(params.row.cj, this.currentYear - 1)
                //         );
                //     }
                // },
                // {
                //     title: '船检' + (this.currentYear - 2),
                //     key: 'cj',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.cj, this.currentYear - 2)
                //                 }
                //             },
                //             this.haveValue(params.row.cj, this.currentYear - 2)
                //         );
                //     }
                // },
                // {
                //     title: '船检' + (this.currentYear - 3),
                //     key: 'cj',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.cj, this.currentYear - 3)
                //                 }
                //             },
                //             this.haveValue(params.row.cj, this.currentYear - 3)
                //         );
                //     }
                // },
                // {
                //     title: '油补' + (this.currentYear - 1),
                //     key: 'yb',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.yb, this.currentYear - 1)
                //                 }
                //             },
                //             this.haveValue(params.row.yb, this.currentYear - 1)
                //         );
                //     }
                // },
                // {
                //     title: '油补' + (this.currentYear - 2),
                //     key: 'yb',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.yb, this.currentYear - 2)
                //                 }
                //             },
                //             this.haveValue(params.row.yb, this.currentYear - 2)
                //         );
                //     }
                // },
                // {
                //     title: '油补' + (this.currentYear - 3),
                //     key: 'yb',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.yb, this.currentYear - 3)
                //                 }
                //             },
                //             this.haveValue(params.row.yb, this.currentYear - 3)
                //         );
                //     }
                // },
                // {
                //     title: '年审' + (this.currentYear - 1),
                //     key: 'ns',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.ns, this.currentYear - 1)
                //                 }
                //             },
                //             this.haveValue(params.row.ns, this.currentYear - 1)
                //         );
                //     }
                // },
                // {
                //     title: '年审' + (this.currentYear - 2),
                //     key: 'ns',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.ns, this.currentYear - 2)
                //                 }
                //             },
                //             this.haveValue(params.row.ns, this.currentYear - 2)
                //         );
                //     }
                // },
                // {
                //     title: '年审' + (this.currentYear - 3),
                //     key: 'ns',
                //     width: 120,
                //     align: 'center',
                //     render: (h, params) => {
                //         return h(
                //             'Button',
                //             {
                //                 props: {
                //                     type: this.color(params.row.ns, this.currentYear - 3)
                //                 }
                //             },
                //             this.haveValue(params.row.ns, this.currentYear - 3)
                //         );
                //     }
                // },
                {
                    title: '操作',
                    key: 'id',
                    align: 'center',
                    // fixed: 'right',
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
    mounted () {
        let now = new Date().getFullYear();
        this.dateYear.current = now;
        this.dateYear.near1 = now;
        this.dateYear.near2 = now - 1;
        this.dateYear.near3 = now - 2;
    },
    methods: {
        showTd (h, value) {
            if (value === undefined) {
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
                return h('span', value);
            }
        },
        viewCount () {
            this.status.showCount = true;
        },
        viewCount2 () {
            this.status.showCount2 = true;
        },
        showEachVal2 (id, name) {
            if (this.isEmpty(id)) {
                return;
            }
            this.eachLine.itemList2 = [];
            this.eachLine.shipname = '';
            this.$http
                .get('/shipContrast/get?id=' + id)
                .then(res => {
                    this.eachLine.itemList2 = res.data.crew;
                    this.eachLine.shipname = res.data.shipName;
                    this.status.itemModal2 = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showEachVal (id, name) {
            if (this.isEmpty(id)) {
                return;
            }
            this.eachLine.itemList = [];
            this.eachLine.shipname = '';
            this.$http
                .get('/shipContrast/get?id=' + id)
                .then(res => {
                    for (let i = 0; i < res.data.tableList.length; i++) {
                        if (name === res.data.tableList[i]['fieldName']) {
                            this.eachLine.itemList.push(res.data.tableList[i]);
                        }
                    }
                    this.eachLine.shipname = res.data.shipName;
                    this.status.itemModal = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showDetails (value) {
            if (this.isEmpty(value)) {
                return;
            }
            this.$http
                .get('/shipContrast/get?id=' + value.id)
                .then(res => {
                    this.compareData.shipName = res.data.shipName;
                    res.data.tableList.pop();
                    this.compareData.fields = res.data.tableList;
                    this.compareData.blxkTimeStatus = res.data.certificateExpires.blxkTimeStatus;
                    this.compareData.cjzsTimeStatus = res.data.certificateExpires.cjzsTimeStatus;
                    this.compareData.syqTimeStatus = res.data.certificateExpires.syqTimeStatus;
                    // 船检
                    // if (res.data.cj.years && res.data.cj.years.includes(this.dateYear.near3 + '')) {
                    //     this.compareData.cjNear3 = '有';
                    // } else {
                    //     this.compareData.cjNear3 = '无';
                    // }
                    // if (res.data.cj.years && res.data.cj.years.includes(this.dateYear.near2 + '')) {
                    //     this.compareData.cjNear2 = '有';
                    // } else {
                    //     this.compareData.cjNear2 = '无';
                    // }
                    // if (res.data.cj.years && res.data.cj.years.includes(this.dateYear.near1 + '')) {
                    //     this.compareData.cjNear1 = '有';
                    // } else {
                    //     this.compareData.cjNear1 = '无';
                    // }
                    // // 年审
                    // if (res.data.ns.years && res.data.cj.years.includes(this.dateYear.near3 + '')) {
                    //     this.compareData.nsNear3 = '有';
                    // } else {
                    //     this.compareData.nsNear3 = '无';
                    // }
                    // if (res.data.ns.years && res.data.cj.years.includes(this.dateYear.near2 + '')) {
                    //     this.compareData.nsNear2 = '有';
                    // } else {
                    //     this.compareData.nsNear2 = '无';
                    // }
                    // if (res.data.ns.years && res.data.cj.years.includes(this.dateYear.near1 + '')) {
                    //     this.compareData.nsNear1 = '有';
                    // } else {
                    //     this.compareData.nsNear1 = '无';
                    // }
                    // // 油补
                    // if (res.data.yb.years && res.data.cj.years.includes(this.dateYear.near3 + '')) {
                    //     this.compareData.ybNear3 = '有';
                    // } else {
                    //     this.compareData.ybNear3 = '无';
                    // }
                    // if (res.data.yb.years && res.data.cj.years.includes(this.dateYear.near2 + '')) {
                    //     this.compareData.ybNear2 = '有';
                    // } else {
                    //     this.compareData.ybNear2 = '无';
                    // }
                    // if (res.data.yb.years && res.data.cj.years.includes(this.dateYear.near1 + '')) {
                    //     this.compareData.ybNear1 = '有';
                    // } else {
                    //     this.compareData.ybNear1 = '无';
                    // }
                    this.status.compareModal = true;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        isEmpty (s) {
            if (s == '' || s == undefined || s == null) {
                return true;
            }
            return false;
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
        selectTreeChange (nodes) {
            this.currNode = nodes[0];
            this.query.areaPath = this.currNode.path;
            this.initSearch();
        },
        realValue (index, value) {
            if (index == -1) {
                return '无数据';
            } else if (index == 0) {
                return value[Object.keys(value)[0]];
            } else if (index == 1) {
                return '不符';
            } else if (index == 2) {
                return value[Object.keys(value)[0]];
            } else {
                return '无数据';
            }
        },
        realColor (value) {
            if (value == -1) {
                return 'warning';
            } else if (value == 1) {
                return 'error';
            } else if (value == 2) {
                return 'info';
            } else {
                return 'success';
            }
        },
        haveValue (value, index) {
            if (value.includes(index + '')) {
                return '有';
            } else {
                return '无';
            }
        },
        color (value, index) {
            if (value.includes(index + '')) {
                return 'success';
            } else {
                return 'error';
            }
        },
        handleDefault () {

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
