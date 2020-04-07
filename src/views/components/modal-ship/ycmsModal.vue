// 渔船灭失详情组件

<style lang="less">
@import "../../../styles/commonStyle.less";
</style>

<template>
    <Modal 
        v-model = "visible"
        :closable = "closable"
        :maskClosable = "maskClosable"
        :title = "title"
        :width = "width"
        :okText = "okText"
        :cancelText = "cancelText"
        :loading = "loading"
        :styles = "styles"
        :class = "className"
        :footerHide = "footerHide"
        :scrollable = "scrollable"
        :transitionNames = "transitionNames"
        :transfer = "transfer"
        @on-ok = "ok"
        @on-cancel = "cancel"
        @on-visible-change = "visibleChange">
        <slot name = "close"></slot>
        <slot name = "header"></slot>
        <slot name = "footer"></slot>
        <Form :label-width = "100" :model = "info" ref = "info">
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
                    <Form-item label="船籍港:" >
                        <Input v-model="info.portregistry" ></Input>  
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
                    <Form-item label="作业类型:" >
                        <Input v-model="info.jobType" ></Input>  
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
                    <Form-item label="总吨位:" >
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="渔船所属地区名称:" :label-width="120">
                        <Input v-model="info.nametheFishingArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔船所属地区代码:" :label-width="120">
                        <Input v-model="info.codefishingArea" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="船舶所有人名称:" :label-width="120">
                        <Input v-model="info.namevesselOwner" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船舶所有人地址:" :label-width="120">
                        <Input v-model="info.addressshipOwner" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="船舶所有人名身份证号或企业注册号:" :label-width="220">
                        <Input v-model="info.allPersNameIdNumbRegiNo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="建造完工日期:" :label-width="120">
                        <Input v-model="info.consCompDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="渔业船舶所有权登记证书编号:" :label-width="180">
                        <Input v-model="info.fishVessOwneRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔业船舶灭失证明书编号:" :label-width="160">
                        <Input v-model="info.certVessA" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <Form-item label="渔船检验证书编号:" :label-width="120">
                        <Input v-model="info.fishVessInspCertNo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="9">
                    <Form-item label="国籍登记证书编号:" :label-width="120">
                        <Input v-model="info.natiRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="9">
                    <Form-item label="渔业捕捞许可证编号:" :label-width="140">
                        <Input v-model="info.fishingLicenseNumberA" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="沉没时间:" >
                        <Input v-model="info.sinkTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="沉没地点:" >
                        <Input v-model="info.sunkenSite" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="沉没原因:" >
                        <Input v-model="info.sinkingReason" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="失踪时间:" :label-width="120">
                        <Input v-model="info.missingTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="其它灭失原因:" :label-width="120">
                        <Input v-model="info.otherCausesloss" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="灭失证明处理时间:" :label-width="120">
                        <Input v-model="info.lossCertProcTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="灭失证明处理地点:" :label-width="120">
                        <Input v-model="info.placeproofloss" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="经办人:" :label-width="120">
                        <Input v-model="info.manager" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="经办时间:" :label-width="120">
                        <Input v-model="info.handlingTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="证明机关:" :label-width="120">
                        <Input v-model="info.certificationOrgan" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="机关意见:" :label-width="120">
                        <Input v-model="info.organOpinion" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <Form-item label="更新时间:" :label-width="120">
                        <Input v-model="info.intfUpdateTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </Modal>
</template>

<script>
export default {
    name: 'ycmsModal',
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
            default: '渔船灭失详情'
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
            if (val)
                this.search()
        }
    },
    methods: {
        ok () {
            if (!this.loading)
                this.$emit('input', this.visible)
            this.$emit('on-ok')
        },
        cancel () {
            this.$emit('input', this.visible)
            this.$emit('on-cancel')
        },
        visibleChange (val) {
            this.$emit('on-visible-change', val)
        },
        search () {
            var _self = this;
            _self.$http
            .get('/achive/ycms/get', {
                params: {
                    id: this.unid,
                    uniqIdenVessInfo: this.shipId,
                    nametheShip: this.nametheShip
                }
            })
            .then(res => {
                if (res.success && !this.isEmpty(res.data)) {
                    this.info = res.data
                    this.visible = true
                }
                    
                else{
                    this.$Message.error('暂无捕捞许可数据')
                    this.$emit('input', this.visible)
                    this.$emit('on-cancel')
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        isEmpty (s) {
            if (s == null || s == "" || s == undefined) {
                return true
            }
            return false
        }
    }
}
</script>

<style lang="less" scoped>
    /deep/.ivu-modal .ivu-modal-body {
        max-height: 750px;
        overflow-y: scroll;
    }
</style>
