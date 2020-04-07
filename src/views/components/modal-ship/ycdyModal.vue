// 渔船抵押登记详情组件

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
                <Col span="6">
                    <Form-item label="船名:" >
                        <Input v-model="info.nametheShip" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船舶种类:" >
                        <Input v-model="info.shipTypeA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船体材质:" >
                        <Input v-model="info.hullMaterialA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船体材质英文:" >
                        <Input v-model="info.hullMaterialEnglish" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <Form-item label="船长:" >
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="型宽:" >
                        <Input v-model="info.typeWidth" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="型深:" >
                        <Input v-model="info.shipDepth" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="主机数量:" >
                        <Input v-model="info.hostNumber" ></Input>
                    </Form-item>
                </Col>
            </Row>
            <Row>
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
                <Col span="8">
                    <Form-item label="主机总功率:" >
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </Col>
                
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="船籍港:" >
                        <Input v-model="info.portregistry" ></Input>  
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
                    <Form-item label="渔船所属地区:" >
                        <Input v-model="info.fishingArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船所属地区名称:" :label-width = "120">
                        <Input v-model="info.nametheFishingArea" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船所属地区代码:" :label-width = "120">
                        <Input v-model="info.codefishingArea" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="渔业船舶抵押权登记证书编号:" :label-width = "180">
                        <Input v-model="info.fishShipMortRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="所有人所占股份:" >
                        <Input v-model="info.sharesHeldByAll" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="渔业船舶所有权登记证书编号:" :label-width = "180">
                        <Input v-model="info.fishVessOwneRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="6">
                    <Form-item label="持证人名称:" >
                        <Input v-model="info.nameholder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="7">
                    <Form-item label="持证人电话:" >
                        <Input v-model="info.bearerTelephone" ></Input>  
                    </Form-item>
                </Col>
                <Col span="11">
                    <Form-item label="持证人居民身份证号码或公司注册号:" :label-width = "220">
                        <Input v-model="info.holdIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="8">
                    <Form-item label="抵押权人-姓名:" >
                        <Input v-model="info.nametheMortgageHolder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="抵押权人-地址:" >
                        <Input v-model="info.addresstheMortgageHolder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="抵押合同编号:" >
                        <Input v-model="info.mortgageContractNumber" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="抵押权人-所占股份:" :label-width = "120">
                        <Input v-model="info.shareHeldBymortgageHolder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item label="抵押权人-居民身份证号码或企业注册号:" :label-width = "240">
                        <Input v-model="info.mortHoldResiIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="抵押人-居民身份证号码或企业注册号:" :label-width = "220">
                        <Input v-model="info.mortIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="评估价:" >
                        <Input v-model="info.assessmentPrice" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="清偿情况:" >
                        <Input v-model="info.liquidation" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="抵押金额:" >
                        <Input v-model="info.mortgageAmount" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="8">
                    <Form-item label="申请日期:" >
                        <Input v-model="info.applicationDate" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="抵押终止日期:" >
                        <Input v-model="info.expiryDatemortgage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="移转抵押日期:" >
                        <Input v-model="info.transferMortgageDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <Form-item label="审批人:" >
                        <Input v-model="info.approver" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="审批时间:" >
                        <Input v-model="info.approvalTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="审批机关:" >
                        <Input v-model="info.examAuth" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="审批机关意见:" >
                        <Input v-model="info.approvalOrganOpinion" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="船舶所有人名称:" >
                        <Input v-model="info.namevesselOwner" ></Input>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船舶所有人电话:" >
                        <Input v-model="info.shipOwnerTelephone" ></Input>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="建造完工日期:" >
                        <Input v-model="info.consCompDate" ></Input>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船舶呼号识别码:" >
                        <Input v-model="info.shipCallMarkIdenCode" ></Input>
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
    name: 'ycdyModal',
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
            default: '渔船抵押登记详情'
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
            .get('/achive/ycdydj/get', {
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
