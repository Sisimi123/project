<style lang="less">
 @import "./style/shipCertificate.less";
</style>

<template>
<!-- 渔业船舶检验证书  -->
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
            <Button  @click="cancel">返回</Button>
            <Button type="primary"  @click="handleOk">保存修改</Button>
        </div>

        <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
            <Tabs type="card" v-model="initial">
                <TabPane label="基本信息" name="initial">
                    <Row>
                        <Col span="8">
                            <Form-item :label-width="160" label="渔业船舶国籍证书有效期:" prop="fishVessNatiCertValiPeri">
                                <Input v-model="info.fishVessNatiCertValiPeri" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="16">
                            <Form-item :label-width="200" label="渔船国籍登记申请书编号:" prop="owneNatiRegiApplNumb">
                                <Input v-model="info.owneNatiRegiApplNumb" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="渔船名称:" prop="nametheShip">
                                <Input v-model="info.nametheShip" >
                                    <Button slot="append" type="primary" @click="handleFormat()" >检索匹配</Button>
                                </Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船籍港:" prop="portregistry">
                                <Input v-model="info.portregistry" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船舶类型:" prop="shipType">
                                <Input v-model="info.shipType" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="船舶所有人:" prop="namevesselOwner">
                                <Input v-model="info.namevesselOwner" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="所有人电话:" prop="shipOwnerTelephone">
                                <Input v-model="info.shipOwnerTelephone" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="所有人所占股份:" prop="sharesHeldByAll">
                                <Input v-model="info.sharesHeldByAll" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form-item label="所有人地址:" prop="addressshipOwner">
                                <Input v-model="info.addressshipOwner" type="textarea" :autosize="{minRows: 2,maxRows: 2}"></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="渔船所属地区:" prop="nametheFishingArea">
                                <Input v-model="info.nametheFishingArea" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="渔船编码:" prop="fishingCode">
                                <Input v-model="info.fishingCode" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="呼号识别码:" prop="shipCallMarkIdenCode">
                                <Input v-model="info.shipCallMarkIdenCode" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="8">
                            <Form-item label="船舶种类:" >
                                <Input v-model="info.shipTypeA" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船体材质:" >
                                <Input v-model="info.hullMaterialA" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="建造完工日期:" >
                                <Input v-model="info.consCompDate" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="船长:" prop="typeLength">
                                <Input v-model="info.typeLength" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="型宽:" prop="typeWidth">
                                <Input v-model="info.typeWidth" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="型深:" prop="shipDepth">
                                <Input v-model="info.shipDepth" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="6">
                            <Form-item label="主机型号:" prop="hostModelOne">
                                <Input v-model="info.hostModelOne" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="主机总功率:" prop="masterPower">
                                <Input v-model="info.masterPower" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="总吨位:" prop="grossTonnage">
                                <Input v-model="info.grossTonnage" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="净吨位:" prop="netTonnage">
                                <Input v-model="info.netTonnage" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    

                </TabPane>
                <!-- <TabPane label="其他信息" name="otherB">
                    <Row>
                        <Col span="8">
                            <Form-item label="主机型号一:" prop="hostModelOne">
                                <Input v-model="info.hostModelOne" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="主机功率一:" prop="hostPowerOne">
                                <Input v-model="info.hostPowerOne" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="主机型号二:" prop="hostModelTwo">
                                <Input v-model="info.hostModelTwo" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="主机功率二:" prop="hostPowerTwo">
                                <Input v-model="info.hostPowerTwo" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row >
                        <Col span="8">
                            <Form-item label="主机型号三:" prop="hostModelThree">
                                <Input v-model="info.hostModelThree" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="主机功率三:" prop="hostPowerThree">
                                <Input v-model="info.hostPowerThree" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                </TabPane> -->
                <!-- <TabPane label="其他B" name="otherB">

                </TabPane> -->
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
        
    </Modal>

    <pic v-model="imgVisible" :img="imgUrl"></pic>
    <ws v-model="status.showCamera" @on-ok='saveCameraPic'/>
</div>

</template>

<script>
import pic from '@/views/components/pic/pic.vue';
import user from '@/store/module/user.js';

export default {
    name: 'gj',
    components: {
        pic
    },
    props: {
    // default
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
        },
        query: {
            type: Object
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
                showCamera: false
            },
            initial: 'initial',
            orgin: {},
            base: {},
            info: {},
            uploadList: [],
            imgUrl: '',
            imgVisible: false,
            infoRules: {
                uniqIdenOwneRegiInfo: [{ validator: v_form, trigger: 'change' }], uniqIdenVessInfo: [{ validator: v_form, trigger: 'change' }], intfUpdateTime: [{ validator: v_form, trigger: 'change' }], updateOperation: [{ validator: v_form, trigger: 'change' }], codefishingArea: [{ validator: v_form, trigger: 'change' }], nametheFishingArea: [{ validator: v_form, trigger: 'change' }], fishVessOwneRegiCertNumb: [{ validator: v_form, trigger: 'change' }], fishVessNatiCertNumb: [{ validator: v_form, trigger: 'change' }], valiDateVessRegiCert: [{ validator: v_form, trigger: 'change' }], fishingArea: [{ validator: v_form, trigger: 'change' }], portregistry: [{ validator: v_form, trigger: 'change' }], portregistryA: [{ validator: v_form, trigger: 'change' }], owneNatiRegiExamAuth: [{ validator: v_form, trigger: 'change' }], owneNatiRegiExamOrgaOpin: [{ validator: v_form, trigger: 'change' }], owneNatiRegiAppr: [{ validator: v_form, trigger: 'change' }], owneNatiRegiExamTime: [{ validator: v_form, trigger: 'change' }], owneNatiRegiApplNumb: [{ validator: v_form, trigger: 'change' }], owneNatiRegiDate: [{ validator: v_form, trigger: 'change' }], sharesHeldByAll: [{ validator: v_form, trigger: 'change' }], tempNatiCertFishVessNo: [{ validator: v_form, trigger: 'change' }], titlCertVessUndeCons: [{ validator: v_form, trigger: 'change' }], nameholder: [{ validator: v_form, trigger: 'change' }], nameholderenglish: [{ validator: v_form, trigger: 'change' }], holderAddress: [{ validator: v_form, trigger: 'change' }], holderAddressenglish: [{ validator: v_form, trigger: 'change' }], holdIdenCardNumbRegiNumb: [{ validator: v_form, trigger: 'change' }], bearerTelephone: [{ validator: v_form, trigger: 'change' }], fishVessNatiCertValiPeri: [{ validator: v_form, trigger: 'change' }], commonPersonInformation: [{ validator: v_form, trigger: 'change' }], shipOperator: [{ validator: v_form, trigger: 'change' }], shipHandlingFangYingwen: [{ validator: v_form, trigger: 'change' }], flagA: [{ validator: v_form, trigger: 'change' }], englishFlag: [{ validator: v_form, trigger: 'change' }], addressvesselOperator: [{ validator: v_form, trigger: 'change' }], addressvesselOperatorA: [{ validator: v_form, trigger: 'change' }], fishingCode: [{ validator: v_form, trigger: 'change' }], nametheShip: [{ validator: v_form, trigger: 'change' }], namevesselenglish: [{ validator: v_form, trigger: 'change' }], shipTypeA: [{ validator: v_form, trigger: 'change' }], typeLength: [{ validator: v_form, trigger: 'change' }], typeWidth: [{ validator: v_form, trigger: 'change' }], shipDepth: [{ validator: v_form, trigger: 'change' }], grossTonnage: [{ validator: v_form, trigger: 'change' }], netTonnage: [{ validator: v_form, trigger: 'change' }], masterPower: [{ validator: v_form, trigger: 'change' }], hostModelOne: [{ validator: v_form, trigger: 'change' }], hostModelTwo: [{ validator: v_form, trigger: 'change' }], hostModelThree: [{ validator: v_form, trigger: 'change' }], hostPowerOne: [{ validator: v_form, trigger: 'change' }], hostPowerTwo: [{ validator: v_form, trigger: 'change' }], hostPowerThree: [{ validator: v_form, trigger: 'change' }], hullMaterialA: [{ validator: v_form, trigger: 'change' }], hullMaterialEnglish: [{ validator: v_form, trigger: 'change' }], consCompDate: [{ validator: v_form, trigger: 'change' }], hostNumber: [{ validator: v_form, trigger: 'change' }], shipCallMarkIdenCode: [{ validator: v_form, trigger: 'change' }], shipName: [{ validator: v_form, trigger: 'change' }], subVesselsNo: [{ validator: v_form, trigger: 'change' }], totalShipPower: [{ validator: v_form, trigger: 'change' }], namevesselOwner: [{ validator: v_form, trigger: 'change' }], namevesselOwnerenglish: [{ validator: v_form, trigger: 'change' }], addressshipOwner: [{ validator: v_form, trigger: 'change' }], shipOwnerAddressenglish: [{ validator: v_form, trigger: 'change' }], shipOwnerTelephone: [{ validator: v_form, trigger: 'change' }], shipType: [{ validator: v_form, trigger: 'change' }], shipTypeB: [{ validator: v_form, trigger: 'change' }], hostComputerNumberOne: [{ validator: v_form, trigger: 'change' }], hostComputerNumberTwo: [{ validator: v_form, trigger: 'change' }], hostComputerNumberThree: [{ validator: v_form, trigger: 'change' }], indexShipNetToolsNo: [{ validator: v_form, trigger: 'change' }], dualPowerControl: [{ validator: v_form, trigger: 'change' }], approvedTypeLength: [{ validator: v_form, trigger: 'change' }], approvedGrossTonnage: [{ validator: v_form, trigger: 'change' }], shipPhotos: [{ validator: v_form, trigger: 'change' }], shipOwnerPhotos: [{ validator: v_form, trigger: 'change' }], typecertificateIssued: [{ validator: v_form, trigger: 'change' }], operatingInstructions: [{ validator: v_form, trigger: 'change' }], natiOwneRegiInfo: [{ validator: v_form, trigger: 'change' }], cancelOwneRegiInfo: [{ validator: v_form, trigger: 'change' }], cancelOwneRegiCertNumb: [{ validator: v_form, trigger: 'change' }], cancelCertNumb: [{ validator: v_form, trigger: 'change' }], cancelNatiCertInfo: [{ validator: v_form, trigger: 'change' }], cancelNatiCertNumb: [{ validator: v_form, trigger: 'change' }], applyReason: [{ validator: v_form, trigger: 'change' }], applyType: [{ validator: v_form, trigger: 'change' }]
            }
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
                moduleId: 'gj',
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
            if (s == null || s == '' || s == undefined || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
        },
        // ----
        handleOk () {
            this.orgin.gj = this.info;
            this.orgin.gj.codefishingArea = this.orgin.organizationCode;
            this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.ok();
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        initData () {
            this.base = {};
            this.$http.get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.orgin = res.data;

                        var data = res.data.gj;
                        if (this.isEmpty(data)) {
                            this.info.nametheShip = res.data.shipName;
                            // 处理首次图片保存问题问题，手动调用保存接口
                            this.getBase(true);
                        } else {
                            this.info = data;
                            this.getBase();
                        }
                        this.visible = true;

                        this.initPic();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
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
        init () {
            this.$refs['info'].resetFields();
            this.initial = 'initial';
            this.initData();
        },
        onlySave () {
            this.orgin.gj = this.info;
            this.orgin.gj.codefishingArea = this.orgin.organizationCode;
            this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.info = res.data.gj;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getBase (val) {
        // 系统数据.
            this.$http
                .get('/shiparchives/nybgjsyq/get', {
                    params: {
                        nametheShip: this.info.nametheShip
                    }
                })
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.base = res.data;
                        this.$refs['info'].validate();
                        // 无数据，自动填充保存
                        if (val) {
                            this.handleCopyBase();
                            this.onlySave();
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleFormat () {
            if (this.isEmpty(this.base)) {
                this.$Message.error('系统暂无该船数据');
            } else {
                this.handleCopyBase();
            }
        },
        handleCopyBase () {
            var id = this.info.id;
            this.info = this.$util.deepCopy(this.base);
            this.info.id = id;
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
                this.init();
            }
        }
    }
};
</script>
<style scoped>

</style>


