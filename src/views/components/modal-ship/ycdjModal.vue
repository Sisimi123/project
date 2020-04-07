// 渔船登记详情组件

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
        <Form :label-width="150" :model="info" ref="info">
            <Row class="change-length">
                <Col span="6">
                    <Form-item label="船名:" :label-width="80">
                        <Input v-model="info.nametheShip" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船名英文:"  :label-width="80">
                        <Input v-model="info.namevesselenglish" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="原船名:"  :label-width="80">
                        <Input v-model="info.originalName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船长:"  :label-width="80">
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row class="change-length">
                <Col span="6">
                    <Form-item label="主机总功率:"  :label-width="80">
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="总吨位:"  :label-width="80">
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船体材质:"  :label-width="80">
                        <Input v-model="info.hullMaterialA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船体材质英文:"  :label-width="90">
                        <Input v-model="info.hullMaterialEnglish" ></Input>  
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
                    <Form-item label="所有人英文名:" >
                        <Input v-model="info.namevesselOwnerenglish" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="所有人电话:" >
                        <Input v-model="info.shipOwnerTelephone" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="所有人地址:" >
                        <Input v-model="info.addressshipOwner" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="所有人英文地址:" >
                        <Input v-model="info.shipOwnerAddressenglish" ></Input>  
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
                    <Form-item label="船舶类型:" >
                        <Input v-model="info.shipType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船舶类型英文:" >
                        <Input v-model="info.shipTypeB" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                
                <Col span="8">
                    <Form-item  label="渔船所属地区名称:" >
                        <Input v-model="info.nametheFishingArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船所属地区代码:" >
                        <Input v-model="info.codefishingArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="批准文号:" >
                        <Input v-model="info.approvalNumber" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="船名申请书编号:" >
                        <Input v-model="info.nameNameVess" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="原渔业捕捞许可证编号:" >
                        <Input v-model="info.origFishLiceNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船名登记备案核准书编号:" >
                        <Input v-model="info.fishVessNameRegiFiliApprNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="远洋项目批准文号:" >
                        <Input v-model="info.oceaProjApprNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="注销登记证明书编号:" >
                        <Input v-model="info.cancCertNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船网工具指标批准书编号:" >
                        <Input v-model="info.indexShipNetToolsNo" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="申请人:" >
                        <Input v-model="info.applicantName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="身份证或企业注册号:" >
                        <Input v-model="info.applIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="申请人地址:" >
                        <Input v-model="info.applicantAddress" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="申请人电话:" >
                        <Input v-model="info.applicantTelephoneNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item  label="申请日期:" >
                        <Input v-model="info.applicationDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="更新时间:" >
                        <Input v-model="info.intfUpdateTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </Modal>
</template>

<script>
export default {
    name: 'ycdjModal',
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
            default: '船名登记信息详情'
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
                return ['ease', 'fade']
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
            default: ''
        }
    },
    data () {
        return {
            visible: this.value,
            info: {}
        }
    },
    watch: {
        value (val) {
            if(val)
                this.search();
        }
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
            .get("/achive/nybcmdj/get",{
                params: {
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
    }
}
</script>

<style lang="less" scoped>
    
</style>
