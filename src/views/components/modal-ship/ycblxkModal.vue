<style lang="less">
@import "../../../styles/commonStyle.less";
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
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <slot name="close"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <Form :label-width="100" :model="info" ref="info">
            <Row>
                <Col span="8">
                    <Form-item label="渔船名称:" >
                        <Input v-model="info.nametheShip" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船舶呼号识别码:" >
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
                    <Form-item label="持证人:" >
                        <Input v-model="info.holder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="身份证号或企业注册号:" >
                        <Input v-model="info.idenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船所属地区:" >
                        <Input v-model="info.nametheFishingArea" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="船籍港:" >
                        <Input v-model="info.portregistry" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="所有人地址:" >
                        <Input v-model="info.holderAddress" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
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
                
                <Col span="8">
                    <Form-item  label="渔船类别:" >
                        <Input v-model="info.fishingCategory" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="船长:" >
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="型宽:" >
                        <Input v-model="info.typeWidth" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="型深:" >
                        <Input v-model="info.shipDepth" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item  label="双控功率:" >
                        <Input v-model="info.dualPowerControl" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="总吨位:" >
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="净吨位:" >
                        <Input v-model="info.netTonnage" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="主机型号一:" >
                        <Input v-model="info.hostModelOne" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="渔业捕捞许可证编号:" >
                        <Input v-model="info.fishingLicenseNumberA" ></Input>  
                    </Form-item>
                </Col>

            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="主机功率一:" >
                        <Input v-model="info.hostPowerOne" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="国籍登记证书编号:" >
                        <Input v-model="info.natiRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>

            </Row>
            
            <Row>
                <Col span="8">
                    <Form-item label="申请部门:" >
                        <Input v-model="info.applicationDepartment" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="申请类型:" >
                        <Input v-model="info.applicationType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="申请人电话:" >
                        <Input v-model="info.applicantTelephoneNumber" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="申请许可证类型:" >
                        <Input v-model="info.applicationlicenseType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="申请书编号:" >
                        <Input v-model="info.applicationNumber" ></Input>  
                    </Form-item>
                </Col>

                <Col span="8">
                    <Form-item label="申请日期:" >
                        <Input v-model="info.applicationDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="签发部门:" >
                        <Input v-model="info.issuingDepartment" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="签发人:" >
                        <Input v-model="info.issuer" ></Input>  
                    </Form-item>
                </Col>
                
                <Col span="8">
                    <Form-item label="签发时间:" >
                        <Input v-model="info.timeFiled" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row v-if="!isEmpty(info.mainJobFirsJobModeEndjTime)">
                <Col span="8">
                    <Form-item label="主作业开始时间:" >
                        <Input v-model="info.mainJobFirsJobModeJobStarTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主作业结束时间:" >
                        <Input v-model="info.mainJobFirsJobModeEndjTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主作业类型:" >
                        <Input v-model="info.mainJobType" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row v-if="!isEmpty(info.mainJobFirsJobModeEndjTime)">
                <Col span="8">
                    <Form-item label="主作业渔具名称:" >
                        <Input v-model="info.mainJobFirsOperModeFishGearName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主作业类型:" >
                        <Input v-model="info.mainJobType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主作业第一作业方式:" >
                        <Input v-model="info.mainJobFirstOperationMode" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row v-if="!isEmpty(info.mainJobFirsJobModeEndjTime)">
                <Col span="8">
                    <Form-item label="主作业第一作业场所:" >
                        <Input v-model="info.mainJobFirsOperModeSpecPlacName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="主要捕捞品种:" >
                        <Input v-model="info.mainJobFirsOperModeMainFishVari" ></Input>  
                    </Form-item>
                </Col>

            </Row>

            <Row v-if="!isEmpty(info.endjobOperation)">
                <Col span="8">
                    <Form-item label="辅助作业开始时间:" >
                        <Input v-model="info.auxiliaryJobStartTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="辅助作业结束时间:" >
                        <Input v-model="info.endjobOperation" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="辅助作业方式:" >
                        <Input v-model="info.auxiOperAssiMode" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
        </Form>
    </Modal>
</template>

<script>
export default {
    name: "ycblxkModal",
    props: {
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
            default: "渔船捕捞许可信息"
        },
        width: {
            type: [Number, String],
            default: 960
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
            type:Object
        },
        className: {
            type: String,
            default:"vertical-center-modal"
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
        unid: {
            type: String,
            default: ""
        },
        shipId: {
            type: String,
            default: ""
        },
        nametheShip: {
            type: String,
            default: ""
        }
    },
    data () {
        return {
            visible: this.value,
            info:{}
        };
    },
    methods: {
        ok() {
            if (!this.loading)
                this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        search() {
            var _self=this;
            _self.$http
            .get("/shiparchives/nybycblxk/get",{
                params:{
                    id: this.unid,
                    uniqIdenVessInfo: this.shipId,
                    nametheShip: this.nametheShip
                }
            })
            .then(res => {
                if(res.success && !this.isEmpty(res.data)){
                    this.info = res.data;
                    this.visible= true;
                }
                    
                else{
                    this.$Message.error("暂无捕捞许可数据");
                    this.$emit("input",this.visible);
                    this.$emit("on-cancel");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
    },
    watch:{
        value(val){
            if(val)
                this.search();
        }
    }
};
</script>
<style scoped>
    .ivu-form-item{
        margin-bottom: 10px !important;
    }
</style>
