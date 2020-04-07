<style lang="less">
 @import "./style/insurance.less";
</style>

<template>
<!-- 合作社台账-雇主互保  -->
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
                <Button @click="openUrl()" type="success">保险查询</Button>
                <Button @click="handleAdd()" type="warning" >添加雇主互保</Button>
                <Button  @click="ok">关闭</Button>
            </div>
            <Row>
                <Col span="24">
                    <Row>
                        <div style="margin-top:10px">
                            <Table :loading="status.tableLoading" :columns="columns" :data="selectList" border :height="280"></Table>
                        </div>
                    </Row>
                </Col>
            </Row>

        </Modal>

        <div>
        <Modal :width="1080" v-model="status.showDetail" title="详情" ok-text="保存" @on-ok="handleSave" cancel-text="关闭"  :scrollable=true :mask-closable="false">
            <Row>
                <Col>
                    <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
                        <Tabs type="card" v-model="initial">
                            <TabPane label="基本信息" name="initial">
                                <Row>
                                    <Col span="8">
                                        <Form-item label="会员名:" >
                                            <Input v-model="info.memberName">
                                                <Button slot="append" type="primary" @click="handleFormat()" >检索匹配</Button>
                                            </Input>  
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="身份证:" >
                                            <Input v-model="info.idCard"/>

                                        </Form-item>
                                    </Col>
                                    
                                    <Col span="8">
                                        <Form-item label="联系电话:" >
                                            <Input v-model="info.tel"/>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="8">
                                        <Form-item label="村公司:" >
                                            <Input v-model="info.villageCompany"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="经办机构:">
                                            <Input v-model="info.agency"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="经办人:">
                                            <Input v-model="info.manager"/>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="8">
                                        <Form-item label="市:" >
                                            <Input v-model="info.city"/> 
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="县市区:" >
                                            <Input v-model="info.countyArea"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="镇乡:">
                                            <Input v-model="info.zhenXiang"/> 
                                        </Form-item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span="8">
                                        <Form-item label="船名号:">
                                            <Input :value="info.nametheShip + info.fishingCode"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="船舶种类:">
                                            <Input v-model="info.shipType"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="航区:">
                                            <Input v-model="info.shipArea"/> 
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="8">
                                        <Form-item label="保险人数:">
                                            <Input v-model="info.insuranceNum "/>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <!-- <Row>
                                    <Col span="8">
                                        <Form-item label="船名号:">
                                            <Input :value="info.nametheShip + info.fishingCode"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="船舶种类:">
                                            <Input v-model="info.shipType"/>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="航区:">
                                            <Input v-model="info.shipArea"/> 
                                        </Form-item>
                                    </Col>
                                </Row> -->

                            </TabPane>
                            <TabPane label="互保信息" name="otherA">
                                <div class="wrapper1">
                                    <div class="info-wrap1">
                                        <p class="info-title1"><i></i>保额保费合计</p>
                                        <div class="info-content1">
                                            <ul class="info-list1">
                                                <li>
                                                    <label>合计保额:</label>
                                                    <span><input v-model="info.totalAmountmillionYuan"/></span>
                                                </li>
                                                <li>
                                                    <label>中央补贴:</label>
                                                    <span><input v-model="info.centralSubsidy"/></span>
                                                </li>

                                                <li>
                                                    <label>市级补贴:</label>
                                                    <span><input v-model="info.municipalSubsidies"/></span>
                                                </li>
                                                <li>
                                                    <label>乡镇补贴:</label>
                                                    <span><input v-model="info.townshipSubsidy"/></span>
                                                </li>
                                                <li>
                                                    <label>优惠比例:</label>
                                                    <span><input v-model="info.preferentialRatio"/></span>
                                                </li>
                                                <li>
                                                    <label>应收互保费:</label>
                                                    <span><input v-model="info.premiumReceivable"/></span>
                                                </li>
                                            </ul>
                                            <ul class="info-list1">
                                                <li>                      
                                                    <label>合计保费:</label>
                                                    <span><input v-model="info.totalPremium"/></span>
                                                </li>
                                                <li>
                                                    <label>省级补贴:</label>
                                                    <span><input v-model="info.provincialSubsidies"/></span>
                                                </li>
                                                <li>
                                                    <label>县级补贴:</label>
                                                    <span><input v-model="info.countySubsidy"/></span>
                                                </li>
                                                <li>                     
                                                    <label>补贴总额:</label>
                                                    <span><input v-model="info.totalFinancialSubsidies"/></span>
                                                </li>
                                                <li>                      
                                                    <label>优惠金额：</label>
                                                    <span><input v-model="info.discountAmount"/></span>
                                                </li>
                                                <li>                     
                                                    <label>应实缴互保费：</label>
                                                    <span><input v-model="info.paidpremium"/></span>
                                                </li>   
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane label="互保责任" name="otherB">
                                <div class="info-wrap1 main1">
                                    <p class="info-title1"><i></i>互保责任</p>
                                    <table border="1" bordercolor="#e9eaec">
                                        <tr>
                                            <th>责任类别</th>
                                            <th>每人保额（万元）</th>
                                            <th>主险保额（万元）</th>      
                                            <th>每人互保费</th>
                                            <th>主险互保费</th>
                                        </tr>
                                        <tr>
                                            <td ><input class="table-input1" v-model="info.mutualResponsibility"/></td> 
                                            <td ><input class="table-input1" v-model="info.amountPerMillionYuan"/></td>
                                            <td ><input class="table-input1" v-model="info.mainInsuCoveMillYuan"/></td>
                                            <td ><input class="table-input1" v-model="info.mutuInsuFeePerPers"/></td>
                                            <td ><input class="table-input1" v-model="info.masterPremium"/></td>
                                        </tr>
                                        <tr>
                                            <td ><input class="table-input1" v-model="info.additionalLiability"/></td> 
                                            <td ><input class="table-input1" v-model="info.onePerMillAddiLiabCove"/></td>
                                            <td ><input class="table-input1" v-model="info.aMillAddiLiabInsu"/></td>
                                            <td ><input class="table-input1" v-model="info.addiLiabPerPers"/></td>
                                            <td ><input class="table-input1" v-model="info.additionalLiabilityA"/></td>
                                        </tr>
                                        <tr>          
                                            <td ><input class="table-input1" v-model="info.additionalLiabilityTwo"/></td> 
                                            <td ><input class="table-input1" v-model="info.amounttwoPerPerson"/></td>
                                            <td ><input class="table-input1" v-model="info.twoAddiLiabCoveMillYuan"/></td>
                                            <td ><input class="table-input1" v-model="info.mutuInsuFeetPerPers"/></td>
                                            <td ><input class="table-input1" v-model="info.addiLiabTwoMutuPrem"/></td>
                                        </tr>
                                        <tr>
                                            <td ><input class="table-input1" v-model="info.additionalLiabilityThree"/></td> 
                                            <td ><input class="table-input1" v-model="info.amountthreePerPerson"/></td>
                                            <td ><input class="table-input1" v-model="info.threAddiLiabCoveMillYuan"/></td>
                                            <td ><input class="table-input1" v-model="info.mutuInsuFeetPerPersA"/></td>
                                            <td ><input class="table-input1" v-model="info.addiLiabThreMutuPrem"/></td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="appoint1">
                                    <p class="info-title1"><i></i>特别约定</p>
                                    <p><i>1、</i><span>条款适用：本凭证适用雇主责任互助保险条款（2015版）。</span></p>
                                    <p><i>2、</i>除外责任1：凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</span></p>
                                    <p><i>3、</i>除外责任2：除投保时另有约定的项目外，其它船舶技术检验证书中未载明且主管部门未规定要求配备的仪器和设备，本会不负责赔偿。</span></p>
                                </div>
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
                                    :on-success="handleSuccess"
                                    :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
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
        <pic v-model="imgVisible" :img="imgUrl"></pic>
        <ws v-model="status.showCamera" @on-ok='saveCameraPic'/>
        </div>
    </div>

</template>

<script>
import pic from '@/views/components/pic/pic.vue';
import user from '@/store/module/user.js';
export default {
    name: 'crewDetail',
    components: {
        pic
    },
    props: {
        shipName: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
        // default
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
            default: 840
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
                    width: 70
                },
                {
                    key: 'mutuInsuCertNo',
                    title: '互保凭证号',
                    align: 'center',
                    width: 185
                },
                {
                    key: 'memberName',
                    title: '会员名',
                    align: 'center'
                },
                {
                    key: 'totalPremium',
                    title: '合计保费',
                    align: 'center'
                },
                {
                    key: 'insuranceNum ',
                    title: '保险人数',
                    align: 'center'
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
                                            this.handleDelete(params.index);
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
            info: {},
            uploadList: [],
            infoRules: {
                xm: [{ validator: v_form, trigger: 'change' }], xb: [{ validator: v_form, trigger: 'change' }], jzrq: [{ validator: v_form, trigger: 'change' }], qfrq: [{ validator: v_form, trigger: 'change' }], qfjg_MC: [{ validator: v_form, trigger: 'change' }], qfgyxm: [{ validator: v_form, trigger: 'change' }], zshm: [{ validator: v_form, trigger: 'change' }], zszw_MC: [{ validator: v_form, trigger: 'change' }], hjdz: [{ validator: v_form, trigger: 'change' }], sfzhm: [{ validator: v_form, trigger: 'change' }], csrq: [{ validator: v_form, trigger: 'change' }]
            },
            selectIndex: '',
            imgUrl: '',
            imgVisible: false

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
                moduleId: 'crewInsurance',
                dataId: this.info.id,
                owner: this.owner,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName
            };
        },
        actionUrl () {
            return this.$basePath + '/standingbook/attachs/upload';
        }
    },
    mounted () {},
    methods: {
        // default
        openUrl () {
            window.open('http://www.zfmi.com/zfmi-web-query/');
        },
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
        // ----
        reset () {
            this.info = {};
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
                        this.info.id = res.data;
                        this.actionData.dataId = res.data
                        this.info.sort = this.selectList.length;
                        var fishingCode = this.orgin.shipName.replace(/[^0-9]/ig, '');
                        var nametheShip = this.orgin.shipName.replace(/[^[\u4e00-\u9fa5]/ig, '');
                        this.info.nametheShip = nametheShip;
                        this.info.fishingCode = fishingCode;
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
            if (this.isEmpty(this.info.id)) {
                return;
            }
            this.$http
                .get('/$admin/attachs?dataId=' + this.info.id)
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
                    console.log('res', res);
                    if (res.success && res.data.length > 0) {
                        this.base = res.data[0];
                        this.$refs['info'].validate();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        initData () {
            this.base = {};
            this.$http
                .get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = res.data.crewInsurance;
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
        },
        initSearch () {
            this.$http.get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.crewInsurance);
                        this.selectList = data;
                        this.totalNum = data.length;
                        this.status.tableLoading = false;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDelete (index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    this.selectList.splice(index, 1);
                    var data = this.$util.deepCopy(this.selectList);
                    this.orgin.crewInsurance = data;
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
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        handleSave () {
            var data = this.$util.deepCopy(this.selectList);
            if (this.selectIndex == '') {
                this.info.sort = this.selectList.length;
                data.push(this.info);
            } else {
                data[this.selectIndex] = this.info;
            }
            this.orgin.crewInsurance = data;
            this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.crewInsurance);
                        this.selectList = data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },

        handleFormat () {
            var query = {
                wheres: {
                    memberName_like: this.info.memberName,
                    nametheShip_like: this.info.nametheShip,
                    fishingCode_like: this.info.fishingCode,
                    mutualInsuranceCategory_eq: '雇主责任互保'
                },
                orders: 'mutualCheckPeriod desc'
            };
            this.$http
                .get('/shiparchives/insurance', {
                    params: {
                        query: JSON.stringify(query)
                    }
                })
                .then(res => {
                    if (res.success && res.data.length > 0) {
                        this.base = res.data[0];
                        this.handleCopyBase();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
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
    beforeDestroy () {
        this.visible = false;
        this.$emit('input', this.visible);
    },
    watch: {
        value (val) {
            if (val) {
                this.initSearch();
                this.visible = true;
            }
        }
    }

};
</script>
<style scoped>

</style>


