<style lang="less">
@import "./style/crew.less";
</style>

<template>
<!-- 合作社台账-船员列表  -->
    <div>
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

            <div slot="header" v-if="showHeader">
                <slot name="header"></slot>
            </div>
            <div slot="close" v-if="showClose">
                <slot name="close"></slot>
            </div>
            <!-- <div slot="footer" v-if="showFooter">
                <slot name="footer"></slot>
            </div> -->
            <div slot="footer">
                <Button @click="handleAdd()" type="warning" >添加船员</Button>
                <Button  @click="ok">关闭</Button>
            </div>
            <Row>
            <Col span="24">
                <!-- <Row>
                    <div>
                        <span>姓名：</span>
                        <Input v-model="query.wheres.XM_like" @on-keydown.enter="initSearch()"  style="width:200px" placeholder="请输入..."></Input>
                        <Button style="margin-left:5px" @click="initSearch()" type="info" icon="ios-search" shape="circle">搜索</Button>
                        <div style="float:right;">
                            <Button style="margin-left:5px" @click="handleAdd()" type="info" >添加船员</Button>
                        </div>
                    </div>
                </Row> -->
                <Row >
                    <div style="margin-top:10px">
                        <Table :loading="status.tableLoading" :columns="columns" :data="selectList" border :height="280"></Table>
                    </div>
                </Row>
            </Col>
            </Row>

        </Modal>

        <div>
        <Modal :width="640" v-model="status.showDetail" title="详情" ok-text="保存" @on-ok="handleSave" cancel-text="关闭"  :scrollable=true :mask-closable="false">
            <Row>
                <Col>
                    <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
                        <Tabs type="card" v-model="initial">
                            <TabPane label="基本信息" name="initial">
                                <Row>
                                    <Col span="12">
                                        <Form-item label="姓名:" prop="xm">
                                            <Input v-model="info.xm">
                                                <Button slot="append" type="primary" @click="handleFormat()" >检索匹配</Button>
                                            </Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="性别:" prop="xb">
                                            <RadioGroup v-model="info.xb" type="button">
                                                <Radio label="1">男</Radio>
                                                <Radio label="0">女</Radio>
                                            </RadioGroup>
                                            <!-- <Input v-model="info.xb" ></Input>   -->
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <Form-item label="出生日期:" prop="csrq">
                                            <Input v-model="info.csrq" ></Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="身份证号码:" prop="sfzhm">
                                            <Input v-model="info.sfzhm" ></Input>  
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <Form-item label="户籍地址:" prop="hjdz">
                                            <Input v-model="info.hjdz" ></Input>  
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <Form-item label="证书职务:" prop="zszw_MC">
                                            <Input v-model="info.zszw_MC" ></Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="证书号码:" prop="zshm">
                                            <Input v-model="info.zshm" ></Input>  
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <Form-item label="签发官员姓名:" prop="qfgyxm">
                                            <Input v-model="info.qfgyxm" ></Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="签发机关名称:" prop="qfjg_MC">
                                            <Input v-model="info.qfjg_MC" ></Input>  
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <Form-item label="签发日期:" prop="qfrq">
                                            <Input v-model="info.qfrq" ></Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="截止日期:" prop="jzrq">
                                            <Input v-model="info.jzrq" ></Input>  
                                        </Form-item>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane label="原件" name="pic">
                                <div class="pic-upload-list" v-for="item in uploadList" v-bind:key="item.id">
                                    <img :src="item.url">
                                    <div class="pic-upload-list-cover"> 
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.url)" style="position: relative;left:10px"></Icon>
                                        <Icon size="5" type="ios-close-outline" @click.native="handleRemove(item)" style="position: relative;left:20px;top:-40px"></Icon>
                                    </div>
                                </div>
                                <div class="pic-upload-list" >
                                    <div style="width: 100px;height:100px;line-height: 100px;"  @click="handleCamera">
                                        <Icon type="ios-camera" size="80" style="line-height:100px"></Icon>
                                    </div>
                                </div>
                                <Upload
                                    :data="actionData"
                                    ref="upload"
                                    :show-upload-list="false"
                                    :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                                    :on-success="handleSuccess"
                                    :format="['bmp','jpg','png','jpeg','tiff','gif','svg','wmf']"
                                    :with-credentials="true"
                                    :max-size="20480"
                                    multiple
                                    type="drag"
                                    :action="actionUrl"
                                    style="display: inline-block;width:100px;">
                                    <div style="width: 100px;height:100px;line-height: 100px;">
                                        <Icon type="android-add-circle" size="80" style="line-height:100px"></Icon>
                                    </div>
                                </Upload>
                            </TabPane>
                        </Tabs>
                    </Form>
                </Col>
            </Row>
        </Modal>
        <selectCrew v-model="status.showSelectCrew" :keyParam="this.info.xm" @on-selected="selectedCrew"></selectCrew>
        <pic v-model="imgVisible" :img="imgUrl"></pic>
        <!-- <ws v-model="status.showCamera" @on-ok='saveCameraPic'/> -->
        </div>
    </div>

</template>

<script>
import pic from '@/views/components/pic/pic.vue';
import selectCrew from '@/views/components/selectModal/selectCrew.vue';
import user from '@/store/module/user.js';
export default {
    name: 'crewDetail',
    components: {
        pic,
        selectCrew
    },
    props: {
        // default
        version: {
            type: String,
            default: 'normal'
        },
        shipName: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
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
            default: '详情'
        },
        width: {
            type: [Number, String],
            default: 1280
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
        // ------

        id: {
            type: String
        }
    },
    data () {
        const v_form = (rule, value, callback) => {
            var baseValue = this.base[rule.fullField];
            if (
                !this.isEmpty(baseValue) &&
                !this.isEmpty(value) &&
                baseValue != value
            ) {
                callback(new Error('系统数据：' + baseValue));
            }
            if (this.isEmpty(baseValue) && this.isEmpty(value)) {
                callback(new Error('暂无数据'));
            }
            callback();
        };
        return {
            // default
            visible: false,
            // ------
            status: {
                tableLoading: false,
                showDetail: false,
                showPicList: false,
                showSelectCrew: false,
                showCamera: false
            },
            dataId: '',
            totalNum: 0,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    XM_like: ''
                },
                orders: 'updateTime desc'
            },
            columns: [
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    minWidth: 80
                },
                {
                    key: 'xm',
                    title: '姓名',
                    align: 'center',
                    minWidth: 150
                },
                {
                    key: 'sfzhm',
                    title: '身份证号码',
                    align: 'center',
                    minWidth: 200
                },
                {
                    key: 'zszw_MC',
                    title: '证书职务',
                    align: 'center',
                    minWidth: 120
                },

                {
                    title: '操作',
                    key: 'lsh',
                    align: 'center',
                    minWidth: 100,
                    render: (h, params) => {
                        var temp = [];
                        temp.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleShowDetail(params.row, params.index);
                                        }
                                    }
                                },
                                '详情'
                            )
                        );
                        temp.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(params.row, params.index);
                                        }
                                    }
                                },
                                '删除'
                            )
                        );
                        return h('div', temp);
                    }
                }
            ],
            selectList: [],
            initial: 'initial',
            orgin: {},
            base: {},
            info: {
                lsh: ''
            },
            uploadList: [],
            infoRules: {
                xm: [{ validator: v_form, trigger: 'change' }], xb: [{ validator: v_form, trigger: 'change' }], jzrq: [{ validator: v_form, trigger: 'change' }], qfrq: [{ validator: v_form, trigger: 'change' }], qfjg_MC: [{ validator: v_form, trigger: 'change' }], qfgyxm: [{ validator: v_form, trigger: 'change' }], zshm: [{ validator: v_form, trigger: 'change' }], zszw_MC: [{ validator: v_form, trigger: 'change' }], hjdz: [{ validator: v_form, trigger: 'change' }], sfzhm: [{ validator: v_form, trigger: 'change' }], csrq: [{ validator: v_form, trigger: 'change' }]
            },
            selectIndex: '',
            imgUrl: '',
            imgVisible: false,
        };
    },
    computed: {
        // default
        showFooter () {
            return this.$slots.footer != undefined;
        },
        showHeader () {
            return this.$slots.header != undefined;
        },
        showClose () {
            return this.$slots.close != undefined;
        },
        // ------
        actionData () {
            return {
                moduleId: 'crewDetail',
                dataId: this.info.lsh,
                name: this.info.xm,
                owner: this.owner,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName
            };
        },
        actionUrl () {
            return this.$basePath + '/standingbook/attachs/upload';
        }
    },
    mounted () {
        
    },
    methods: {
        // default
        close () {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-cancel');
        },
        cancel () {
            this.close();
        },
        ok () {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-ok');
        },
        visibleChange (val) {
            this.visible = val;
            if (!this.visible) this.close();
        },
        isEmpty (s) {
            if (s == null || s == '' || s == undefined) {
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
        },
        // ----
        reset () {
            this.info = {
                lsh: ''
            };
            this.base = {};
            this.initial = 'initial';
            this.$refs['info'].resetFields();
        },
        handleAdd () {
            this.reset();
            this.selectIndex = '';
            this.$http
                .get('/$admin/attachs/uuid')
                .then(res => {
                    if (res.success) {
                        this.info.lsh = res.data;
                        this.info.sort = this.selectList.length;
                        this.status.showDetail = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleShowDetail (row, index) {
            this.reset();
            this.info = this.$util.deepCopy(row);
            this.selectIndex = this.$util.deepCopy(index) + '';
            this.nameCrew = row.xm;
            this.getBase();
            this.initPic();
            this.status.showDetail = true;
        },
        init () {
            this.$refs['info'].resetFields();
            this.initial = 'initial';
            this.initData();
        },
        initPic () {
            this.uploadList = [];
            if (this.isEmpty(this.info.lsh)) {
                return;
            }
            this.$http
                .get('/$admin/attachs?dataId=' + this.info.lsh)
                .then(res => {
                    let attachs = res.data;
                    res.data.forEach(element => {
                        if (!this.isEmpty(element)) {
                            let attr = {
                                dataId: element.id,
                                url: this.$basePath + '/$admin/attachs/stream/' + element.id
                            };
                            this.uploadList.push(attr);
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getBase () {
            var query = {
                wheres: {
                    XM_like: this.info.xm
                },
                orders: 'updateTime desc'
            };
            this.$http
                .get('/checks/shipsailor', {
                    params: {
                        query: JSON.stringify(query)
                    }
                })
                .then(res => {
                    if (res.success && res.data.length > 0) {
                        this.base = res.data[0];
                        this.$refs['info'].validate();
                    } else {
                        // this.$Message.info("系统暂无该记录");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        initData () {
            this.base = {};
            if (this.version == 'normal') {
                this.$http
                .get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = res.data.sailorCertificate;
                        if (this.isEmpty(data)) {
                            this.selectList = [];
                        } else {
                            this.selectList = data;
                        }
                        this.visible = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else if (this.version == 'simple') {
                this.$http
                .get('/standingbook/oneshiponefile/getSailorCertificateList?id=' + this.id)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = res.data.sailorCertificate;
                        if (this.isEmpty(data)) {
                            this.selectList = [];
                        } else {
                            this.selectList = data;
                        }
                        this.visible = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        initSearch () {
            if (this.version == 'normal') {
                this.$http.get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.sailorCertificate);
                        this.selectList = data;
                        this.totalNum = data.length;
                        this.status.tableLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else if (this.version == 'simple') {
                this.$http.get('/standingbook/oneshiponefile/getSailorCertificateList?id=' + this.id)
                .then(res => {
                    this.selectList = res.data;
                    this.totalNum = res.data.length;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        handleSearch () {
            this.status.tableLoading = true;
            var query = {

            };
            this.$http
                .get('/checks/shipsailor/page', {
                    params: {
                        query: JSON.stringify(this.query)
                    }
                })
                .then(res => {
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDelete (row,index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    if (this.version == 'normal') {
                        this.selectList.splice(index, 1);
                        var data = this.$util.deepCopy(this.selectList);
                        this.orgin.sailorCertificate = data;
                        this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                        .then(res => {
                            if (res.success) {

                            } else {
                                this.$Message.info(res.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    } else if (this.version == 'simple') {
                        this.$http.delete('/standingbook/oneshiponefile/deleteSailorCertificate?id='+row.lsh)
                        .then(res => {
                            if (res.success) {
                                this.initSearch();
                            } else {
                                this.$Message.info(res.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    }
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        handleSave () {
            var data = this.$util.deepCopy(this.selectList);
            if (this.selectIndex == '') {
                var flag = false;
                for (const key in this.selectList) {
                    if (this.selectList.hasOwnProperty(key)) {
                        const element = this.selectList[key];
                        if (this.info.xm == element.xm) {
                            this.$Message.error('保存失败，已存在该船员：' + element.xm);
                            flag = true;
                            return;
                        }
                    }
                }
                this.info.sort = this.selectList.length;
                data.push(this.info);
            } else {
                data[this.selectIndex] = this.info;
            }
            this.orgin.sailorCertificate = data;
            this.info.fileId = this.id
            if(this.version == 'normal') {
                this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.sailorCertificate);
                        this.selectList = data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            } else if (this.version == 'simple') {
                this.$http.post('/standingbook/oneshiponefile/saveSailorCertificate', this.info)
                .then(res => {
                    if (res.success) {
                        this.initSearch();
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        selectedCrew (selected) {
            var lsh = this.$util.deepCopy(this.info.lsh);
            var sort = this.$util.deepCopy(this.info.sort);
            this.info = selected;
            this.info.lsh = lsh;
            this.info.sort = sort;
        },
        handleFormat () {
            this.status.showSelectCrew = true;
        },
        handleCopyBase () {
            this.info = this.base;
        },
        handleView (url) {
            this.imgUrl = url;
            this.imgVisible = true;
        },
        handleRemove (file) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    for (var i = 0; i < this.uploadList.length; i++) {
                        if (this.uploadList[i].dataId == file.dataId) {
                            this.$http.delete('/standingbook/attachs/' + this.uploadList[i].dataId)
                                .then(res => {
                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            this.uploadList.splice(i, 1);
                            break;
                        }
                    }
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
        },
        handleSuccess (response, file, fileList) {
            let attr = {
                dataId: response.data.id,
                url: this.$basePath + '/$admin/attachs/stream/' + response.data.id
            };
            this.uploadList.push(attr);
        },
        handleCamera () {
            this.status.showCamera = true;
            // window.open(this.$basePath + '/gpy/ws/ws_index.jsp?dataId=' + this.actionData.dataId + '&moduleId=' + this.actionData.moduleId);
        },
        saveCameraPic (base64) {
            let params = new URLSearchParams();
            params.append('file', base64);
            params.append('dataId', this.actionData.dataId);
            params.append('moduleId', this.actionData.moduleId);
            this.$http
                .post('/$admin/attachs/base64withoutname', params)
                .then(res => {
                    if (res.success) {
                        this.initPic();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

    },
    watch: {
        value (val) {
            if (val) {
                this.initSearch();
                this.visible = true;
            }
        },
        // 'info.xm': {
        //   handler(newValue, oldValue) {
        //     this.nameCrew = oldValue
        //   },
        //   deep: true
        // }
    },
    beforeDestroy () {
        this.visible = false;
        this.$emit('input', this.visible);
    }
};
</script>
<style scoped>

</style>


