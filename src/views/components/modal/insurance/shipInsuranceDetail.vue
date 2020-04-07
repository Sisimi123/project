<style lang="less" scoped>
 @import "./style/insurance.less";
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
            <Button @click="openUrl()" type="success">保险查询</Button>
            <Button type="primary"  @click="handleOk">保存修改</Button>            
            <Button  @click="cancel">返回</Button>
        </div>

        <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
            <Tabs type="card" v-model="initial">
                <TabPane label="基本信息" name="initial">
                    <div class="wrapper1">
                        <div class="info-wrap1 main1">    
                            <p class="info-title1"><i></i>基本信息</p>
                            <div class="info-content1">
                                <ul class="info-list1">
                                    <li>
                                        <label>互保类别</label>
                                        <span><input v-model="info.mutualInsuranceCategory"/></span>
                                    </li>
                                    <li>
                                        <label>会员名</label>
                                        <span><input v-model="info.memberName"   /></span>
                                    </li>
                                    <li>
                                        <label>互保凭证号</label>
                                        <span><input v-model="info.mutuInsuCertNo"  /></span>
                                    </li>
                                    <li>
                                        <label>核保日期</label>
                                        <span><input v-model="info.underwritingDate"  /></span>
                                    </li>
                                    <li>
                                        <label>互保起期</label>
                                        <span><input v-model="info.fromdatemutualInsurance"  /></span>
                                    </li>
                                    <li>
                                        <label>互保止期</label>
                                        <span><input v-model="info.mutualCheckPeriod"  /></span>
                                    </li>
                                </ul>
                                <ul  class="info-list1">
                                    <li>
                                        <label>市</label>
                                        <span ><input v-model="info.city"  /></span>
                                    </li>
                                    <li>
                                        <label>县市区</label>
                                        <span><input v-model="info.countyArea"  /></span>
                                    </li>
                                    <li>
                                        <label>镇乡</label>
                                        <span><input v-model="info.zhenXiang"  /></span>
                                    </li>
                                    <li>
                                        <label>村公司</label>
                                        <span><input v-model="info.villageCompany"  /></span>
                                    </li>
                                    <li>
                                        <label>经办机构</label>
                                        <span><input v-model="info.agency"  /></span>
                                    </li>
                                    <li>
                                        <label>经办人</label>
                                        <span><input v-model="info.manager"  /></span>
                                    </li> 
                                </ul>
                            </div>
                        </div>
                        <div class="info-wrap1 main1">
                            <p class="info-title1"><i></i>船舶信息</p>
                            <div class="info-content1">
                                <ul class="info-list1">
                                    <li>
                                        <label>船名</label>
                                        <span>
                                            <Input v-model="info.nametheShip" >
                                                <Button slot="append" type="primary" @click="handleFormat()" >检索匹配</Button>
                                            </Input>
                                        </span>
                                    </li>
                                    <li>
                                        <label>船号</label>
                                        <span><input v-model="info.fishingCode"  /></span>
                                    </li>
                                    <li>
                                        <label>所有人</label>
                                        <span><input v-model="info.memberName"  /></span>
                                    </li>
                                    <li>
                                        <label>作业方式</label>
                                        <span><input v-model="info.operationMode"  /></span>
                                    </li>
                                    <li>
                                        <label>船质</label>
                                        <span><input v-model="info.shipQuality"  /></span>
                                    </li>
                                </ul>
                                <ul class="info-list1">
                                    <li>
                                        <label>主机功率(千瓦)</label>
                                        <span><input v-model="info.powerPs"  /></span>
                                    </li>
                                    <li>
                                        <label>吨位(吨)</label>
                                        <span><input v-model="info.grossTonnage"  /></span>
                                    </li>
                                
                                    <li>
                                        <label>船区</label>
                                        <span><input v-model="info.navigationArea"  /></span>
                                    </li>
                                    
                                    <li>
                                        <label>船龄年</label>
                                        <span><input v-model="info.ageship"  /></span>
                                    </li>
                                    <li>
                                        <label>船舶价值(万元)</label>
                                        <span><input v-model="info.shipValue"  /></span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="wrapper1 free1">
                        <div class="info-wrap1 main1">
                            <p class="info-title1"><i></i>互保责任</p>
                            <div class="info-content1 free1">
                                <ul class="info-free-four1">
                                    <li>
                                        <label>责任类别</label>
                                        <span><input v-model="info.mutualResponsibility"/></span>
                                    </li>
                                    <li>
                                        <label>费率</label>
                                        <span><input v-model="info.rate"/></span>
                                    </li>
                                    <li>
                                        <label>互保比例(%)</label>
                                        <span><input v-model="info.mutualProportion"/></span>
                                    </li>
                                    <li>
                                        <label>合计保额（万元）</label>
                                        <span><input v-model="info.totalAmountmillionYuan"/></span>
                                    </li>
                                    <li>
                                        <label>合计保费（元）</label>
                                        <span><input v-model="info.totalPremium"/></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="info-wrap1 main1">
                            <p class="info-title1"><i></i>缴费计划</p>
                            <div class="info-content1 free1">
                                <ul class="info-free-four1">
                                    <li>
                                        <label>是否分期：</label>
                                        <span><input v-model="info.isStaging"/></span>
                                    </li>
                                    <li>
                                        <label>应收保费（元）：</label>
                                        <span><input v-model="info.interAnnualPremium"/></span>
                                    </li>
                                    <li>
                                        <label>是否实收：</label>
                                        <span><input v-model="info.isRealIncome"/></span>
                                    </li>
                                    <li>
                                        <label>是否注销：</label>
                                        <span><input v-model="info.isWriteOff"/></span>
                                    </li>
                                    <li>
                                        <label>经办人：</label>
                                        <span><input v-model="info.manager"/></span>
                                    </li>
                                    <li>
                                        <label>录单员：</label>
                                        <span><input v-model="info.recordClerk"/></span>
                                    </li>
                                    <li>
                                        <label>核保员：</label>
                                        <span><input v-model="info.underwriter"/></span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </TabPane>
                <TabPane label="保费详情" name="otherA">
                    <div class="wrapper">
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
                        <div class="appoint1">
                            <p class="info-title1"><i></i>特别约定</p>
                            <p><i>1、</i><span>条款适用：本凭证适用雇主责任互助保险条款（2015版）。</span></p>
                            <p><i>2、</i>无理赔：凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</span></p>
                            <p><i>3、</i>除外责任：除投保时另有约定的项目外，其它船舶技术检验证书中未载明且主管部门未规定要求配备的仪器和设备，本会不负责赔偿。</span></p>
                            <p><i>4、</i>绝对理赔：无论会员是否违反条款有关会员义务的约定，部分损失至少须扣减绝对免赔额800元或绝对免赔率10％，两者以高者为准,互保渔船发生互保责任范围内的损失，本会根据失责程度按下列约定扣除免赔率：（1）未按约定时间报案影响本会及时查勘、准确理赔的，按30％以上扣除免赔率，直至拒赔。（2）未经本会同意，擅自向第三者支付赔偿或相应报酬的，一律按拒赔处理。（3）因会员过失致使本会不能行使代位追偿权利的，按30％以上扣除免赔率，直至拒赔</span></p>
                            <p><i>5、</i>免赔：下列情况或支出费用的，不属于附加机损责任赔偿范围：（1）被保渔船在正常维修保养过程中发生的机损；（2）未按规定进行维修保养或使用非合格产品导致的机损； （3）机损后维修使用的油料及易损、易耗品； （4）机损后未经协会理赔机构同意擅自更换零部件的。2、在一次事故中，对承保范围内的受损项目，本会按下列约定的金额为限给予赔偿，对被保险机器设备在修复或重置过程中发生的任何变更、性能增加或改进所产生的额外费用，本会不负责赔偿。 其中、主机个数:一个，机损主机功率：220(千瓦)，桨的材质：铜和不锈钢；（1）曲轴：3.20万元；（2）上下机体：2.80万元；（3）主机维修费：1.20万元；（4）中间轴：0.14万元；（5）尾轴：0.52万元；（6）桨：1.42万元；（7）舵：0.56万元。</span></p>
                        </div>
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
        
    </Modal>

    <pic v-model="imgVisible" :img="imgUrl"></pic>
    <ws v-model="status.showCamera" @on-ok='saveCameraPic'/>
</div>

</template>

<script>
import pic from '@/views/components/pic/pic.vue';
import user from '@/store/module/user.js';

export default {
    name: 'cbjy',
    components: {
        pic

    },
    props: {
    // default
        shipName_attach: {
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
                addressshipOwner: [{ validator: v_form, trigger: 'change' }],
                allowArea: [{ validator: v_form, trigger: 'change' }],
                allowJobType: [{ validator: v_form, trigger: 'change' }],
                allowPeople: [{ validator: v_form, trigger: 'change' }],
                approvedGrossTonnage: [{ validator: v_form, trigger: 'change' }],
                approvedTypeLength: [{ validator: v_form, trigger: 'change' }],
                checkAddress: [{ validator: v_form, trigger: 'change' }],
                checkApplyTime: [{ validator: v_form, trigger: 'change' }],
                checkDept: [{ validator: v_form, trigger: 'change' }],
                checkFinishTime: [{ validator: v_form, trigger: 'change' }],
                checkLevel: [{ validator: v_form, trigger: 'change' }],
                checkRemind: [{ validator: v_form, trigger: 'change' }],
                checkStartTime: [{ validator: v_form, trigger: 'change' }],
                checkType: [{ validator: v_form, trigger: 'change' }],
                codefishingArea: [{ validator: v_form, trigger: 'change' }],
                consCompDate: [{ validator: v_form, trigger: 'change' }],
                deckLayers: [{ validator: v_form, trigger: 'change' }],
                designDraft: [{ validator: v_form, trigger: 'change' }],
                designDrainage: [{ validator: v_form, trigger: 'change' }],
                designSpeed: [{ validator: v_form, trigger: 'change' }],
                dualPowerControl: [{ validator: v_form, trigger: 'change' }],
                effectiveTime: [{ validator: v_form, trigger: 'change' }],
                emergencyPowerMode: [{ validator: v_form, trigger: 'change' }],
                emergencyPowerModeEnglish: [{ validator: v_form, trigger: 'change' }],
                emergencyPowerModel: [{ validator: v_form, trigger: 'change' }],
                emergencyPowerModelEnglish: [{ validator: v_form, trigger: 'change' }],
                fishingCode: [{ validator: v_form, trigger: 'change' }],
                fishroomNo: [{ validator: v_form, trigger: 'change' }],
                fishroomVolume: [{ validator: v_form, trigger: 'change' }],
                grossTonnage: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberOne: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberThree: [{ validator: v_form, trigger: 'change' }],
                hostComputerNumberTwo: [{ validator: v_form, trigger: 'change' }],
                hostComputerOneSpeed: [{ validator: v_form, trigger: 'change' }],
                hostComputerThreeSpeed: [{ validator: v_form, trigger: 'change' }],
                hostComputerTwoSpeed: [{ validator: v_form, trigger: 'change' }],
                hostModelOne: [{ validator: v_form, trigger: 'change' }],
                hostModelThree: [{ validator: v_form, trigger: 'change' }],
                hostModelTwo: [{ validator: v_form, trigger: 'change' }],
                hostNumber: [{ validator: v_form, trigger: 'change' }],
                hostPowerOne: [{ validator: v_form, trigger: 'change' }],
                hostPowerThree: [{ validator: v_form, trigger: 'change' }],
                hostPowerTwo: [{ validator: v_form, trigger: 'change' }],
                hullMaterialA: [{ validator: v_form, trigger: 'change' }],
                hullMaterialEnglish: [{ validator: v_form, trigger: 'change' }],
                indexShipNetToolsNo: [{ validator: v_form, trigger: 'change' }],
                intfUpdateTime: [{ validator: v_form, trigger: 'change' }],
                issuanceCertEffectiveTime: [{ validator: v_form, trigger: 'change' }],
                issuanceCertMode: [{ validator: v_form, trigger: 'change' }],
                issuanceCertNumber: [{ validator: v_form, trigger: 'change' }],
                issuanceCertSendAddress: [{ validator: v_form, trigger: 'change' }],
                issuanceCertSendDate: [{ validator: v_form, trigger: 'change' }],
                keelInstallDate: [{ validator: v_form, trigger: 'change' }],
                lastVisaEffectiveTime: [{ validator: v_form, trigger: 'change' }],
                leftLifeboatLoad: [{ validator: v_form, trigger: 'change' }],
                leftLifeboatModel: [{ validator: v_form, trigger: 'change' }],
                leftLifeboatNumber: [{ validator: v_form, trigger: 'change' }],
                lifeBuoyModel: [{ validator: v_form, trigger: 'change' }],
                lifeBuoyNumber: [{ validator: v_form, trigger: 'change' }],
                lifeJacketModel: [{ validator: v_form, trigger: 'change' }],
                lifeJacketNumber: [{ validator: v_form, trigger: 'change' }],
                lifeToolTotalLoad: [{ validator: v_form, trigger: 'change' }],
                liferaftOneLoad: [{ validator: v_form, trigger: 'change' }],
                liferaftOneModel: [{ validator: v_form, trigger: 'change' }],
                liferaftOneNumber: [{ validator: v_form, trigger: 'change' }],
                liferaftTwoLoad: [{ validator: v_form, trigger: 'change' }],
                liferaftTwoModel: [{ validator: v_form, trigger: 'change' }],
                liferaftTwoNumber: [{ validator: v_form, trigger: 'change' }],
                lifesavingToolLoad: [{ validator: v_form, trigger: 'change' }],
                lifesavingToolModel: [{ validator: v_form, trigger: 'change' }],
                lifesavingToolNumber: [{ validator: v_form, trigger: 'change' }],
                masterPower: [{ validator: v_form, trigger: 'change' }],
                maxSpeed: [{ validator: v_form, trigger: 'change' }],
                nametheFishingArea: [{ validator: v_form, trigger: 'change' }],
                nametheShip: [{ validator: v_form, trigger: 'change' }],
                namevesselOwner: [{ validator: v_form, trigger: 'change' }],
                namevesselOwnerenglish: [{ validator: v_form, trigger: 'change' }],
                namevesselenglish: [{ validator: v_form, trigger: 'change' }],
                netTonnage: [{ validator: v_form, trigger: 'change' }],
                nextCheckTime: [{ validator: v_form, trigger: 'change' }],
                nextCheckType: [{ validator: v_form, trigger: 'change' }],
                operatingInstructions: [{ validator: v_form, trigger: 'change' }],
                resistanceWindLevel: [{ validator: v_form, trigger: 'change' }],
                rightLifeboatLoad: [{ validator: v_form, trigger: 'change' }],
                rightLifeboatModel: [{ validator: v_form, trigger: 'change' }],
                rightLifeboatNumber: [{ validator: v_form, trigger: 'change' }],
                sailArea: [{ validator: v_form, trigger: 'change' }],
                shipCallMarkIdenCode: [{ validator: v_form, trigger: 'change' }],
                shipCheckRegister: [{ validator: v_form, trigger: 'change' }],
                shipDepth: [{ validator: v_form, trigger: 'change' }],
                shipLoadTotal: [{ validator: v_form, trigger: 'change' }],
                shipOwnerAddressenglish: [{ validator: v_form, trigger: 'change' }],
                shipOwnerTelephone: [{ validator: v_form, trigger: 'change' }],
                shipType: [{ validator: v_form, trigger: 'change' }],
                shipTypeA: [{ validator: v_form, trigger: 'change' }],
                shipTypeB: [{ validator: v_form, trigger: 'change' }],
                shipTypeCode: [{ validator: v_form, trigger: 'change' }],
                shipyardAddress: [{ validator: v_form, trigger: 'change' }],
                shipyardName: [{ validator: v_form, trigger: 'change' }],
                shipyardNameEnglish: [{ validator: v_form, trigger: 'change' }],
                shipyardTelephone: [{ validator: v_form, trigger: 'change' }],
                totalLength: [{ validator: v_form, trigger: 'change' }],
                typeLength: [{ validator: v_form, trigger: 'change' }],
                typeWidth: [{ validator: v_form, trigger: 'change' }],
                uniqIdenVessInfo: [{ validator: v_form, trigger: 'change' }],
                uniqIdenVessInspInfo: [{ validator: v_form, trigger: 'change' }],
                updateOperation: [{ validator: v_form, trigger: 'change' }],
                upperDeckLength: [{ validator: v_form, trigger: 'change' }]
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
                moduleId: 'shipInsurance',
                dataId: this.info.id,
                owner: this.owner,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName_attach
            };
        },
        actionUrl () {
            return this.$basePath + '/standingbook/attachs/upload';
        },
        shipName () {
            if (this.isEmpty(this.info.fishingCode)) {
                return this.info.nametheShip;
            } else {
                return this.info.nametheShip + this.info.fishingCode;
            }
        }
    },
    mounted () {},
    methods: {
        openUrl () {
            window.open('http://www.zfmi.com/zfmi-web-query/');
        },
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
            this.orgin.insurance = this.info;
            if(!this.orgin.insurance.id){
                this.$http.get("/$admin/attachs/uuid")
                .then(res=>{
                    this.orgin.insurance.id = res.data;
                    this.saveOneShipOneFile();
                });
            }else{
                this.saveOneShipOneFile();
            }
        },
        saveOneShipOneFile () {
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

                        var data = res.data.insurance;
                        if (this.isEmpty(data)) {
                            var fishingCode = res.data.shipName.replace(/[^0-9]/ig, '');
                            var nametheShip = res.data.shipName.replace(/[^[\u4e00-\u9fa5]/ig, '');
                            this.info.nametheShip = nametheShip;
                            this.info.fishingCode = fishingCode;
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
            this.orgin.insurance = this.info;
            this.$http.post('/standingbook/oneshiponefile/save', this.orgin)
                .then(res => {
                    if (res.success) {
                        this.info = res.data.insurance;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        getBase (val) {
            var query = {
                wheres: {
                    nametheShip_like: this.info.nametheShip,
                    fishingCode_like: this.info.fishingCode,
                    mutualInsuranceCategory_eq: '渔船互保'
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
                        if (val) {
                            this.handleCopyBase();
                            this.onlySave();
                        }
                    }
                })
                .catch((error) => {
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
<style>

</style>


