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
        @on-cancel="cancel"
        @on-visible-change="visibleChange"
    >
        <div>
            <Form :labelWidth="80">
                <Row>
                    <Col span="6">
                        <FormItem label="主体类型:" >
                            <Select placeholder="请选择..." v-model="query.wheres.type" @on-change='selectType'>
                                <Option v-for="item in checkedObjList" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="统一信用代码/注册号:" :labelWidth="130">
                            <Input v-model="query.wheres.uniCode"/>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="主体名称:">
                            <Input v-model="query.wheres.name"/>
                        </FormItem>
                    </Col>
                    <Col span="4" style="margin-left:10px">
                        <Button type="primary" style='margin-right:10px' @click="handleSearch()">查询</Button>
                        <Button  @click="handleReset()">重置</Button>
                    </Col>
                </Row>
            </Form>
        </div>
        <div>
            <Row style="margin-top:10px">
                <Table ref="table" @on-selection-change="selectTable" border stripe :data="datas" :columns="cols" height="400"></Table>
            </Row>
            <div slot="footer">
                <Page show-total show-elevator show-sizer :total="total" :page-size="query.size" :current="query.page" @on-change="pageChange" @on-page-size-change="pageSizeChange"></Page>
            </div>
        </div>
        <div slot="footer">
            <Button @click="cancel">取消</Button>
            <Button type="info" @click="addList()">加入检查名单</Button>
        </div>
    </Modal>
</template>

<script>
export default {
    name: 'checkObjModal',
    props: {
        selectData: {
            type: Array,
            default () {
                return [];
            }
        },
        checkType: {
            type: String,
            default: 'DAILY'
        },
        isParams: {
            type: Boolean,
            default: false
        },
        checkObjectType: {
            type: String,
            default: ''
        },
        deptType: {
            type: String,
            default: ''
        },
        deptIdList: {
            type: Array,
            default () {
                return [];
            }
        },
        excludeUidList: {
            type: Array,
            default () {
                return [];
            }
        },
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
            default: '添加检查对象'
        },
        width: {
            type: [Number, String],
            default: 1200
        },
        okText: {
            type: String,
            default: '加入检查名单'
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
        }
    },
    data () {
        return {
            selectTableArr: [],
            visible: false,
            cols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                // {
                //     title: '序号',
                //     type: 'index',
                //     width: 60,
                //     align: 'center'
                // },
                {
                    title: '渔船/注册号',
                    align: 'center',
                    key: 'uniCode'
                },
                {
                    title: '主体名称',
                    align: 'center',
                    key: 'objName'
                },
                {
                    title: '联系地址',
                    align: 'center',
                    key: 'regAddress'
                },
                {
                    title: '联系方式',
                    align: 'center',
                    key: 'tel'
                }
                // {
                //     title: '许可类型',
                //     align: 'center',
                //     key: 'licType'
                // },
                // {
                //     title: '管辖单位',
                //     align: 'center',
                //     key: 'manageUnit'
                // },
                // {
                //     title: '所有者名称',
                //     align: 'center',
                //     key: 'owner'
                // },
                // {
                //     title: '所有者统一信用代码/身份证',
                //     align: 'center',
                //     key: 'ownerUniCode'
                // }
            ],
            datas: [],
            total: 0,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    type: 'SPECIFIC_POPULATION',
                    uniCode: '',
                    name: '',
                    deptType: '',
                    deptIdList: [],
                    excludeUidList: []
                }
            }
        };
    },
    methods: {
        selectType (v) {
            this.handleSearch();
        },
        // 对象生成方法
        makeObj (arr) {
            var objArr = [];
            arr.forEach((v, i) => {
                objArr.push({
                    fsUid: v.uid,
                    fsCode: v.uniCode,
                    fsName: v.objName,
                    checkObjectType: v.licType,
                    legalSupervisor: {
                        userName: v.owner
                    }
                });
            });
            return objArr;
        },
        addList () {
            if (this.selectTableArr.length === 0) {
                this.$Message.info('请选择需要添加的检查对象的数据。');
                return;
            }
            var obj = this.selectTableArr;
            if (this.checkType === 'DAILY') {
                this.$http.post('/supervision/examine/dailySaveList', obj)
                .then(res => {
                    if (res.success) {
                        this.$Message.info('添加成功。');
                        this.visible = false;
                        if (!this.loading) {
                            this.$emit('input', this.visible);
                        };
                        this.$emit('on-ok');
                        this.$emit('isSuccess', true);
                    } else {
                        this.$Message.error(res.msg);
                        this.$emit('isSuccess', false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else if (this.checkType === 'RANDOM') {
                this.$http.post('/supervision/randomExamine/saveList', obj)
                .then(res => {
                    if (res.success) {
                        this.$Message.info('添加成功。');
                        this.visible = false;
                        if (!this.loading) {
                            this.$emit('input', this.visible);
                        };
                        this.$emit('on-ok');
                        this.$emit('isSuccess', true);
                    } else {
                        this.$Message.error(res.msg);
                        this.$emit('isSuccess', false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else if (this.checkType === 'SAFTY') {
                this.$http.post('/supervision/safetyCheck/safetySaveList', obj)
                .then(res => {
                    if (res.success) {
                        this.$Message.info('添加成功。');
                        this.visible = false;
                        if (!this.loading) {
                            this.$emit('input', this.visible);
                        };
                        this.$emit('on-ok');
                        this.$emit('isSuccess', true);
                    } else {
                        this.$Message.error(res.msg);
                        this.$emit('isSuccess', false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else if (this.checkType === 'setTask') {
                this.$emit('selectVal', this.selectTableArr);
                this.$Message.info('添加成功。');
                this.visible = false;
                if (!this.loading) {
                    this.$emit('input', this.visible);
                };
                this.$emit('on-ok');
                this.$emit('isSuccess', true);
            }
            
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
        pageChange (page) {
            this.query.page = page;
            this.getPage();
        },
        pageSizeChange (size) {
            this.query.page = 1;
            this.query.size = size;
            this.getPage();
        },
        handleSearch () {
            this.query.page = 1;
            this.getPage();
        },
        handleReset () {
            this.query.wheres.name = ''
            this.query.wheres.uniCode = ''
            this.query.page = 1;
            this.query.size = 10;
            this.handleSearch();
        },
        getPage () {
            this.datas = [];
            if (this.isParams) {
                this.query.wheres.deptIdList = this.deptIdList;
                this.query.wheres.deptType = this.deptType;
                this.query.wheres.type = this.checkObjectType;
                this.query.wheres.excludeUidList = this.excludeUidList;
            } 
            this.$http.get('/regulatoryRepertory/getCheckObjectPage', {
                params: {
                    query: JSON.stringify(this.query)
                }
            }).then(res => {
                if (res.success) {
                    this.datas = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        selectTable (val) {
            var _self = this;
            _self.selectTableArr = val;
        }
    },
    computed: {
        checkedObjList () {
            return this.$store.getters.getDictList('regulatoryRepertory');
        }
    },
    watch: {
        value (val) {
            this.visible = val;
            if (val) {
                this.getPage();
            } else {
                this.selectTableArr = [];
            }
        },
        datas(val){
            console.log(val,'datas')
            console.log(this.selectData,'this.selectData')
            if(val.length > 0 && this.selectData.length > 0){
            for(let i in this.selectData){
              for (let j in val){
                if(val[j].uid == this.selectData[i].legalEntityId){
                    this.$refs.table.toggleSelect(j)
                }
              }
            }
          }
        }
    },
    mounted () {
    }
};
</script>