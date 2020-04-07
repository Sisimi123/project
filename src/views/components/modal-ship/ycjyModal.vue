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
                    <Form-item label="船舶类型:" >
                        <Input v-model="info.shipType" ></Input>  
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
                    <Form-item label="船舶所有人:" >
                        <Input v-model="info.namevesselOwner" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="所有人电话:" >
                        <Input v-model="info.shipOwnerTelephone" ></Input>  
                    </Form-item>
                </Col>
                 <Col span="8">
                    <Form-item label="所有人地址:" >
                        <Input v-model="info.addressshipOwner" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="核准总吨:" >
                        <Input v-model="info.approvedGrossTonnage" ></Input>  
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
                    <Form-item label="核准船长:" >
                        <Input v-model="info.approvedTypeLength" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船长:" >
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="总长:" >
                        <Input v-model="info.totalLength" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
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
                <Col span="8">
                    <Form-item label="船体材质:" >
                        <Input v-model="info.hullMaterialA" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="造船厂名称:" >
                        <Input v-model="info.shipyardName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="建造完工日期:" >
                        <Input v-model="info.consCompDate" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="龙骨安放日期:" >
                        <Input v-model="info.keelInstallDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="设计航速:" >
                        <Input v-model="info.designSpeed" ></Input>  
                    </Form-item>
                </Col>

                <Col span="8">
                    <Form-item label="设计吃水:" >
                        <Input v-model="info.designDraft" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="设计排水量:" >
                        <Input v-model="info.designDrainage" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="主机总功率:" >
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="双控功率:" >
                        <Input v-model="info.dualPowerControl" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="应急电源原动机型号:" >
                        <Input v-model="info.emergencyPowerModel" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="主机型号一:" >
                        <Input v-model="info.hostModelOne" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机功率一:" >
                        <Input v-model="info.hostPowerOne" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机1转速:" >
                        <Input v-model="info.hostComputerOneSpeed" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row v-if="!isEmpty(info.hostModelTwo)">
                <Col span="8">
                    <Form-item label="主机型号二:" >
                        <Input v-model="info.hostModelTwo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机功率二:" >
                        <Input v-model="info.hostPowerTwo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机2转速:" >
                        <Input v-model="info.hostComputerTwoSpeed" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row v-if="!isEmpty(info.hostModelThree)">
                <Col span="8">
                    <Form-item label="主机型号三:" >
                        <Input v-model="info.hostModelThree" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机功率三:" >
                        <Input v-model="info.hostPowerThree" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="主机3转速:" >
                        <Input v-model="info.hostComputerThreeSpeed" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="检验类型:" >
                        <Input v-model="info.checkLevel" ></Input>  
                    </Form-item>
                </Col>

                <Col span="8">
                    <Form-item label="检验日期:" >
                        <Input v-model="info.checkStartTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="下次检验日期:" >
                        <Input v-model="info.nextCheckTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="16">
                    <Form-item label="检验部门:" >
                        <Input v-model="info.checkDept" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="检验地点:" >
                        <Input v-model="info.checkAddress" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <!-- <Row>
                <Col span="24">
                    <Form-item label="本次发放文件:" >
                        <Input v-model="info.issuanceCertMode" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                    </Form-item>
                </Col>
            </Row> -->

            <Row v-if="!isEmpty(info.checkRemind)">
                <Col span="8">
                    <Form-item label="检验记事:" >
                        <Input v-model="info.checkRemind" type="textarea" :autosize="{minRows: 1,maxRows: 3}"></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <Form-item label="渔业船舶检验证书编号:" >
                        <Input v-model="info.issuanceCertNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船网工具指标批准书编号:" >
                        <Input v-model="info.indexShipNetToolsNo" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="渔业船舶检验证书发证日期:" >
                        <Input v-model="info.issuanceCertSendDate" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔业船舶检验证书有效期:" >
                        <Input v-model="info.issuanceCertEffectiveTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="上次签证有效期:" >
                        <Input v-model="info.lastVisaEffectiveTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="准许该船航行与作业区域:" >
                        <Input v-model="info.allowArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="准许该船从事:" >
                        <Input v-model="info.allowJobType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="核载人数:" >
                        <Input v-model="info.allowPeople" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            

            <Row>
                <Col span="6">
                    <Form-item label="救生圈型式:" >
                        <Input v-model="info.lifeBuoyModel" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="救生圈数量:" >
                        <Input v-model="info.lifeBuoyNumber" ></Input>  
                    </Form-item>
                </Col>                
                <Col span="6">
                    <Form-item label="救生衣型式:" >
                        <Input v-model="info.lifeJacketModel" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="救生衣数量:" >
                        <Input v-model="info.lifeJacketNumber" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row v-if="!isEmpty(info.liferaftOneModel)">
                <Col span="8">
                    <Form-item label="救生筏型式1:" >
                        <Input v-model="info.liferaftOneModel" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="救生筏数量1:" >
                        <Input v-model="info.liferaftOneNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="救生筏定员1:" >
                        <Input v-model="info.liferaftOneLoad" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            
        </Form>
    </Modal>
</template>

<script>
export default {
    name: "ycjyModal",
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
            default: "渔船检验信息"
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
            type: Object
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
            visible: false,
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
            var _self = this;
            this.$http
            .get("/shiparchives/nybycjy/get",{
                params:{
                    id: _self.unid,
                    uuid: _self.shipId,
                    name: _self.nametheShip
                }
            })
            .then(res => {
                if(res.success && !this.isEmpty(res.data)){
                    this.info = res.data;
                    this.visible= true;
                }
                else{
                    this.$Message.error("暂无船检数据");
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


