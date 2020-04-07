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
                            <Form-item label="渔船名称:"  prop="nametheShip">
                                <Input v-model="info.nametheShip">
                                    <Button slot="append" type="primary" @click="handleFormat()" >检索匹配</Button>
                                </Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="渔船编码:"  prop="fishingCode">
                                <Input v-model="info.fishingCode" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="船舶呼号识别码:"  prop="shipCallMarkIdenCode">
                                <Input v-model="info.shipCallMarkIdenCode" ></Input>  
                            </Form-item>
                        </Col>
                        <!-- <Col span="8">
                            <Form-item label="船舶类型:" >
                                <Input v-model="info.shipType" ></Input>  
                            </Form-item>
                        </Col> -->
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="持证人:"  prop="holder">
                                <Input v-model="info.holder" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="身份证号或企业注册号:"  prop="idenCardNumbRegiNumb">
                                <Input v-model="info.idenCardNumbRegiNumb" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="渔船所属地区:"  prop="nametheFishingArea">
                                <Input v-model="info.nametheFishingArea" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="8">
                            <Form-item label="船籍港:" prop="portregistry">
                                <Input v-model="info.portregistry" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="16">
                            <Form-item label="所有人地址:"  prop="holderAddress">
                                <Input v-model="info.holderAddress" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="船体材质:"  prop="hullMaterialA">
                                <Input v-model="info.hullMaterialA" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="建造完工日期:"  prop="consCompDate">
                                <Input v-model="info.consCompDate" ></Input>  
                            </Form-item>
                        </Col>
                        
                        <Col span="8">
                            <Form-item  label="渔船类别:"  prop="fishingCategory">
                                <Input v-model="info.fishingCategory" ></Input>  
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
                        <Col span="8">
                            <Form-item  label="双控功率:" prop="dualPowerControl">
                                <Input v-model="info.dualPowerControl" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="总吨位:" prop="grossTonnage">
                                <Input v-model="info.grossTonnage" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="净吨位:" prop="netTonnage">
                                <Input v-model="info.netTonnage" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
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
                </TabPane>
                <TabPane label="证书信息" name="otherA">
                    <Row>
                        <Col span="12">
                            <Form-item label="渔业捕捞许可证编号:" prop="fishingLicenseNumberA">
                                <Input v-model="info.fishingLicenseNumberA" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="国籍登记证书编号:" prop="natiRegiCertNumb">
                                <Input v-model="info.natiRegiCertNumb" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业开始时间:" prop="mainJobFirsJobModeJobStarTime">
                                <Input v-model="info.mainJobFirsJobModeJobStarTime" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业结束时间:" prop="portregistry">
                                <Input v-model="info.mainJobFirsJobModeEndjTime" ></Input>  
                            </Form-item>
                        </Col>
 
                    </Row>
                    <Row>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业渔具名称:" prop="mainJobFirsOperModeFishGearName">
                                <Input v-model="info.mainJobFirsOperModeFishGearName" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业类型:" prop="mainJobType">
                                <Input v-model="info.mainJobType" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业第一作业方式:" prop="mainJobFirstOperationMode">
                                <Input v-model="info.mainJobFirstOperationMode" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8" v-show='mainShip'>
                            <Form-item label="主作业第一作业场所:" prop="mainJobFirsOperModeSpecPlacName">
                                <Input v-model="info.mainJobFirsOperModeSpecPlacName" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="16" v-show='mainShip'>
                            <Form-item label="主要捕捞品种:" prop="mainJobFirsOperModeMainFishVari">
                                <Input v-model="info.mainJobFirsOperModeMainFishVari" ></Input>  
                            </Form-item>
                        </Col>

                    </Row>

                    <Row>
                        <Col span="8" v-show='helpShip'>
                            <Form-item label="辅助作业开始时间:" prop="auxiliaryJobStartTime">
                                <Input v-model="info.auxiliaryJobStartTime" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8" v-show='helpShip'>
                            <Form-item label="辅助作业结束时间:" prop="endjobOperation">
                                <Input v-model="info.endjobOperation" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8" v-show='helpShip'>
                            <Form-item label="辅助作业方式:" prop="auxiOperAssiMode">
                                <Input v-model="info.auxiOperAssiMode" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane label="其他信息" name="otherB">
                    <Row>
                        <Col span="8">
                            <Form-item label="申请部门:" prop="applicationDepartment">
                                <Input v-model="info.applicationDepartment" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="申请类型:" prop="applicationType">
                                <Input v-model="info.applicationType" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="申请人电话:" prop="applicantTelephoneNumber">
                                <Input v-model="info.applicantTelephoneNumber" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="8">
                            <Form-item label="申请许可证类型:" prop="applicationlicenseType">
                                <Input v-model="info.applicationlicenseType" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="申请书编号:" prop="applicationNumber">
                                <Input v-model="info.applicationNumber" ></Input>  
                            </Form-item>
                        </Col>

                        <Col span="8">
                            <Form-item label="申请日期:" prop="applicationDate">
                                <Input v-model="info.applicationDate" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="8">
                            <Form-item label="签发部门:" prop="issuingDepartment">
                                <Input v-model="info.issuingDepartment" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="签发人:" prop="issuer">
                                <Input v-model="info.issuer" ></Input>  
                            </Form-item>
                        </Col>
                        
                        <Col span="8">
                            <Form-item label="签发时间:" prop="timeFiled">
                                <Input v-model="info.timeFiled" ></Input>  
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
// import ws from '@/views/components/modal/highmeter/ws/wsModal.vue';
export default {
    name: 'blxk',
    components: {
        pic
        // ws
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
            helpShip: true,
            mainShip: true,
            visible: false,
            // ------
            initial: 'initial',
            status: {
                showCamera: false
            },
            orgin: {},
            base: {},
            info: {},
            uploadList: [],
            imgUrl: '',
            imgVisible: false,
            infoRules: {
                uniqIdenLiceInfo: [{ validator: v_form, trigger: 'change' }],
                uniqIdenVessInfo: [{ validator: v_form, trigger: 'change' }],
                intfUpdateTime: [{ validator: v_form, trigger: 'change' }],
                updateOperation: [{ validator: v_form, trigger: 'change' }],
                codefishingArea: [{ validator: v_form, trigger: 'change' }],
                nametheFishingArea: [{ validator: v_form, trigger: 'change' }],
                fishingLicenseNumberA: [{ validator: v_form, trigger: 'change' }],
                holder: [{ validator: v_form, trigger: 'change' }],
                idenCardNumbRegiNumb: [{ validator: v_form, trigger: 'change' }],
                holderAddress: [{ validator: v_form, trigger: 'change' }],
                applicationDepartment: [{ validator: v_form, trigger: 'change' }],
                applicationDate: [{ validator: v_form, trigger: 'change' }],
                applicantPostalCode: [{ validator: v_form, trigger: 'change' }],
                applicantTelephoneNumber: [{ validator: v_form, trigger: 'change' }],
                applicationlicenseType: [{ validator: v_form, trigger: 'change' }],
                applicationType: [{ validator: v_form, trigger: 'change' }],
                reasonsapplication: [{ validator: v_form, trigger: 'change' }],
                issuer: [{ validator: v_form, trigger: 'change' }],
                issuingDepartment: [{ validator: v_form, trigger: 'change' }],
                timeFiled: [{ validator: v_form, trigger: 'change' }],
                nametheShip: [{ validator: v_form, trigger: 'change' }],
                fishingCategory: [{ validator: v_form, trigger: 'change' }],
                fishingCode: [{ validator: v_form, trigger: 'change' }],
                fishVessInspCertNo: [{ validator: v_form, trigger: 'change' }],
                natiRegiCertNumb: [{ validator: v_form, trigger: 'change' }],
                portregistry: [{ validator: v_form, trigger: 'change' }],
                shipCallMarkIdenCode: [{ validator: v_form, trigger: 'change' }],
                consCompDate: [{ validator: v_form, trigger: 'change' }],
                typeLength: [{ validator: v_form, trigger: 'change' }],
                typeWidth: [{ validator: v_form, trigger: 'change' }],
                shipDepth: [{ validator: v_form, trigger: 'change' }],
                grossTonnage: [{ validator: v_form, trigger: 'change' }],
                netTonnage: [{ validator: v_form, trigger: 'change' }],
                masterPower: [{ validator: v_form, trigger: 'change' }],
                hostModelOne: [{ validator: v_form, trigger: 'change' }],
                hostModelTwo: [{ validator: v_form, trigger: 'change' }],
                hostModelThree: [{ validator: v_form, trigger: 'change' }],
                hostPowerOne: [{ validator: v_form, trigger: 'change' }],
                hostPowerTwo: [{ validator: v_form, trigger: 'change' }],
                hostPowerThree: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberOne: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberTwo: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberThree: [{ validator: v_form, trigger: 'change' }],
                hostNumber: [{ validator: v_form, trigger: 'change' }],
                originalHostPower: [{ validator: v_form, trigger: 'change' }],
                hullMaterialA: [{ validator: v_form, trigger: 'change' }],
                fishroomNo: [{ validator: v_form, trigger: 'change' }],
                cubagefishHold: [{ validator: v_form, trigger: 'change' }],
                indexShipNetToolsNo: [{ validator: v_form, trigger: 'change' }],
                dualPowerControl: [{ validator: v_form, trigger: 'change' }],
                shipName: [{ validator: v_form, trigger: 'change' }],
                subVesselsNo: [{ validator: v_form, trigger: 'change' }],
                totalShipPower: [{ validator: v_form, trigger: 'change' }],
                modelsubShipHost: [{ validator: v_form, trigger: 'change' }],
                subShipHostsNo: [{ validator: v_form, trigger: 'change' }],
                mainJobType: [{ validator: v_form, trigger: 'change' }],
                mainJobFirstOperationMode: [{ validator: v_form, trigger: 'change' }],
                mainJobFirsJobModeWork: [{ validator: v_form, trigger: 'change' }],
                mainJobFirsOperModeSpecPlacName: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsJobModeJobStarTime: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsJobModeEndjTime: [{ validator: v_form, trigger: 'change' }],
                mainJobFirsOperModeOperTimeLimiDesc: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsOperModeFishGearName: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkFirsOperModeFishGearSpec: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsOperModeFishGearQuan: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsOperModeMainFishVari: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainOperFirsOperModeFishQuot: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainOperFirsOperMethFishAquaProdQuanUnit: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobFirsOperModeMiniMeshSize: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobSecoOperModeOperMode: [{ validator: v_form, trigger: 'change' }],
                mainJobSecoOperModeAppl: [{ validator: v_form, trigger: 'change' }],
                mainJobSecoOperModeSpecSiteName: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobSecoJobModeJobStarTime: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobSecoJobModeEndjTime: [{ validator: v_form, trigger: 'change' }],
                mainJobSecoJobModeApplDeadDesc: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishGearName: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishGearSpec: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishGearQuan: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeMainFishVari: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishQuot: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishUnit: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainJobSecoOperModeMiniMeshSize: [
                    { validator: v_form, trigger: 'change' }
                ],
                concurrentOperationType: [{ validator: v_form, trigger: 'change' }],
                homeFirsOperMode: [{ validator: v_form, trigger: 'change' }],
                homeFirsHomeMethWork: [{ validator: v_form, trigger: 'change' }],
                simuHomeJobnSpecPlac: [{ validator: v_form, trigger: 'change' }],
                simuHomeFirsJobStarTime: [{ validator: v_form, trigger: 'change' }],
                homeFirsAssiEndTime: [{ validator: v_form, trigger: 'change' }],
                simuHomeFirsJobMethOperTimeLimiDesc: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuHomeFirsOperFishGearName: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperFirsOperMethFishGearSpec: [
                    { validator: v_form, trigger: 'change' }
                ],
                homeFirsOperModeFishGearQuan: [
                    { validator: v_form, trigger: 'change' }
                ],
                homeFirsOperModeMainFishVari: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperFirsOperMethFishQuot: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperFirsOperFishUnit: [{ validator: v_form, trigger: 'change' }],
                simuOperMiniMeshSizeSize: [{ validator: v_form, trigger: 'change' }],
                homeSecoOperModeOperMode: [{ validator: v_form, trigger: 'change' }],
                homeSecoWorkPlac: [{ validator: v_form, trigger: 'change' }],
                assiSecoSpecSiteName: [{ validator: v_form, trigger: 'change' }],
                homeSecoJobModeStarTime: [{ validator: v_form, trigger: 'change' }],
                homeSecoJobModeEndTime: [{ validator: v_form, trigger: 'change' }],
                operTimeDescJobMeth: [{ validator: v_form, trigger: 'change' }],
                homeSecoOperModeFishGearName: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperSecoOperMethFishGearSpec: [
                    { validator: v_form, trigger: 'change' }
                ],
                homeSecoOperModeFishGearQuan: [
                    { validator: v_form, trigger: 'change' }
                ],
                secoMainFishMeth: [{ validator: v_form, trigger: 'change' }],
                simuOperSecoOperMethFishQuot: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperSecoOperMethFishUnit: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperSecoOperMiniMeshSize: [
                    { validator: v_form, trigger: 'change' }
                ],
                auxiOperAssiMode: [{ validator: v_form, trigger: 'change' }],
                auxiliaryWorkPlace: [{ validator: v_form, trigger: 'change' }],
                auxiliaryWorkSite: [{ validator: v_form, trigger: 'change' }],
                auxiliaryJobStartTime: [{ validator: v_form, trigger: 'change' }],
                endjobOperation: [{ validator: v_form, trigger: 'change' }],
                auxiJobScheDesc: [{ validator: v_form, trigger: 'change' }],
                otheRestOper: [{ validator: v_form, trigger: 'change' }],
                operatingInstructions: [{ validator: v_form, trigger: 'change' }],
                mainWorkFirsOperModeFishGearBelo: [
                    { validator: v_form, trigger: 'change' }
                ],
                mainWorkSecoOperModeFishGearBelo: [
                    { validator: v_form, trigger: 'change' }
                ],
                simuOperFirsOperFishGearStan: [
                    { validator: v_form, trigger: 'change' }
                ],
                stanGearWithHomeSeco: [{ validator: v_form, trigger: 'change' }],
                applicationNumber: [{ validator: v_form, trigger: 'change' }]
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
                moduleId: 'blxk',
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
            if (
                s == null ||
        s == '' ||
        s == undefined ||
        JSON.stringify(s) === '{}'
            ) {
                return true;
            }
            return false;
        },
        // ----
        handleOk () {
            this.info.updateTime = new Date();
            this.orgin.ycblxk = this.info;
            this.orgin.ycblxk.codefishingArea = this.orgin.organizationCode;
            this.$http
                .post('/standingbook/oneshiponefile/save', this.orgin)
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
            this.$http
                .get('/standingbook/oneshiponefile/' + this.id)
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.orgin = res.data;
                        var data = res.data.ycblxk;
                        if (res.data.shipTypeA == '捕捞辅助船' || res.data.shipTypeA == '其他辅助船' || res.data.shipTypeA == '养殖船') {
                            this.mainShip = false;
                            this.helpShip = true;
                        } else {
                            this.mainShip = true;
                            this.helpShip = false;
                        }
                        if (this.isEmpty(data)) {
                            this.info.nametheShip = res.data.shipName;
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
        // 手动更新时间
            this.info.updateTime = new Date();
            this.orgin.ycblxk = this.info;
            this.orgin.ycblxk.codefishingArea = this.orgin.organizationCode;
            this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.info = res.data.ycblxk;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getBase (val) {
            // 系统数据.
            this.$http
                .get('/shiparchives/nybycblxk/get', {
                    params: {
                        nametheShip: this.info.nametheShip
                    }
                })
                .then(res => {
                    if (res.success && !this.isEmpty(res.data)) {
                        this.base = res.data;
                        this.$refs['info'].validate();
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


