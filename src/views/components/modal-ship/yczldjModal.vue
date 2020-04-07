// 渔船租赁登记详情组件

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
                    <Form-item label="船舶种类:" >
                        <Input v-model="info.shipTypeA" ></Input>  
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
                    <Form-item label="主机总功率:" >
                        <Input v-model="info.masterPower" ></Input>  
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
                    <Form-item label="建造完工日期:" >
                        <Input v-model="info.consCompDate" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item  label="主机数量:" >
                        <Input v-model="info.hostNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船舶呼号识别码:" >
                        <Input v-model="info.shipCallMarkIdenCode" ></Input>  
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
                    <Form-item label="船舶所有人电话:" :label-width="120">
                        <Input v-model="info.shipOwnerTelephone" ></Input>  
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
                <Col span="6">
                    <Form-item label="船籍港:" :label-width="80">
                        <Input v-model="info.portregistry" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="所有人所占股份:" >
                        <Input v-model="info.sharesHeldByAll" ></Input>  
                    </Form-item>
                </Col>
                <Col span="10">
                    <Form-item label="渔业船舶临时国籍证书编号:" :label-width="160">
                        <Input v-model="info.tempNatiCertFishVessNo" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="6">
                    <Form-item label="审批人:" >
                        <Input v-model="info.approver" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="审批机关:" >
                        <Input v-model="info.examAuth" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="审批机关意见:" >
                        <Input v-model="info.approvalOrganOpinion" ></Input>  
                    </Form-item>
                </Col>
                
                <Col span="6">
                    <Form-item label="审批时间:" >
                        <Input v-model="info.approvalTime" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Form-item label="租赁船舶所有权人-居民身份证号码或企业注册号:" :label-width="280">
                        <Input v-model="info.owneShipIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <Form-item label="承租人-名称:" >
                        <Input v-model="info.namelessee" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="承租人-地址:" >
                        <Input v-model="info.addresslessee" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="承租人-联系电话:" :label-width="120">
                        <Input v-model="info.tenantTelephoneNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="承租人-身份证或公司注册号:" :label-width="180">
                        <Input v-model="info.lessIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="租赁契约号:" >
                        <Input v-model="info.leaseContractNo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="租金:" >
                        <Input v-model="info.rent" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="起租日期:" >
                        <Input v-model="info.datelease" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="租赁方式:" >
                        <Input v-model="info.leaseMode" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="租赁申请日期:" >
                        <Input v-model="info.dateleaseApplication" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="租赁终止日期:" >
                        <Input v-model="info.terminationDatelease" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="出租方批准文件编号:" :label-width="140">
                        <Input v-model="info.lessApprDocuNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="承租方批准文件编号:" :label-width="140">
                        <Input v-model="info.lessApprDocuNumbA" ></Input>  
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
                    <Form-item label="渔业船舶国籍证书编号:" :label-width="140">
                        <Input v-model="info.fishVessNatiCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Form-item label="抵押权人同意出租证明文件编号:" :label-width="200">
                        <Input v-model="info.mortHoldAgreNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="持证人名称:" >
                        <Input v-model="info.nameholder" ></Input>  
                    </Form-item>
                </Col>
                
                <Col span="12">
                    <Form-item label="持证人电话:" >
                        <Input v-model="info.bearerTelephone" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="持证人身份证或公司注册号:" :label-width="160">
                        <Input v-model="info.holdIdenCardNumbRegiNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
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
    name: 'yczldjModal',
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
            default: '渔船租凭登记详情'
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
            .get('/achive/yczldj/get', {
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
