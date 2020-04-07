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
                            <Form-item label="姓名:">
                                 <Input v-model="query.wheres.XM_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="证书职位:">
                                 <Input v-model="query.wheres.ZSZW_MC_eq" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
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
        <Modal :width="800" v-model="status.showDetail" title="详情窗口" :scrollable=true :mask-closable="true" :closable="false">
            <Form :label-width="100" :model="info" ref="info">
                <Row>
                    <Col span="8">
                        <Form-item label="姓名:" >
                            <Input v-model="info.xm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="姓名拼音:" >
                            <Input v-model="info.xmpy" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="出生日期:" >
                            <Input v-model="info.csrq" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="身份证号码:" >
                            <Input v-model="info.sfzhm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="16">
                        <Form-item label="户籍地址:" >
                            <Input v-model="info.hjdz" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="证书类型:" >
                            <Input v-model="info.zslx_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="类别名称:" >
                            <Input v-model="info.lbdm_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书等级:" >
                            <Input v-model="info.zsdj_mc" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="证书种类名称:" >
                            <Input v-model="info.zszldm_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书职务:" >
                            <Input v-model="info.zszw_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书号码:" >
                            <Input v-model="info.zshm" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>

                    <Col span="8">
                        <Form-item label="签发官员姓名:" >
                            <Input v-model="info.qfgyxm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="16">
                        <Form-item label="签发机关名称:" >
                            <Input v-model="info.qfjg_mc" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="签发日期:" >
                            <Input v-model="info.qfrq" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="截止日期:" >
                            <Input v-model="info.jzrq" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="status.showDetail=false">关闭</Button>
            </div>            
        </Modal>
    </div>
</template>

<script>
export default {
    data () {
        return {
            info: {},
            status: {
                showDetail: false
            },
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    minWidth: 50
                },
                {
                    key: 'xm',
                    title: '姓名',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'sfzhm',
                    title: '身份证号码',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'zszw_mc',
                    title: '证书职务',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'zshm',
                    title: '证书号码',
                    align: 'center',
                    minWidth: 90
                },
                // {
                //     key: 'hjcs',
                //     title: '户籍城市',
                //     align: 'center',
                //     minWidth: 90
                // },
                // {
                //     key: 'hjqx',
                //     title: '户籍区县',
                //     align: 'center',
                //     minWidth: 90
                // },
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
                                        _self.handleEdit(params.row);
                                    }
                                }
                            }, '详情');
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
                    type: '2',
                    ZSZW_MC_eq: '',
                    XM_like: '',
                    deptId: ''
                }
            }
        };
    },
    methods: {
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
            this.query.wheres.type = '2';
            this.query.page = 1;
            this.query.size = 10;
            this.initSearch();
        },
        handleEdit (row) {
            var _self = this;
            _self.status.showDetail = true;
            _self.info = row;
        },
        handleEditdb (ids) {
            this.info = ids;
            this.status.showDetail = true;
            this.handleEdit(ids);
        },
        selectTreeChange (v) {
            var _self = this;
            _self.query.wheres.deptId = v[0].id;
            _self.initSearch();
        }
    },
    mounted () {

    }
}
</script>