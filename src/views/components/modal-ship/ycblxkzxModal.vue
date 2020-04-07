// 渔船捕捞许可注销详情组件

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
        <Form :label-width = "90" :model = "info" ref = "info">
            <Row>
                <Col span="8">
                    <Form-item label="船名:" >
                        <Input v-model="info.nametheShip" ></Input>  
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
                <Col span="6">
                    <Form-item label="净吨位:" >
                        <Input v-model="info.netTonnage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="总吨位:" >
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="主机总功率:" >
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="双控功率:" >
                        <Input v-model="info.dualPowerControl" ></Input>  
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
                    <Form-item label="捕捞许可注销证明书编号:" :label-width="150">
                        <Input v-model="info.uniqIdenLiceCancelNumber" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="国籍或登记证书编号:" :label-width="130">
                        <Input v-model="info.nationalityCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="渔业捕捞许可证编号:" :label-width="150">
                        <Input v-model="info.fishingLicenseNumberA" ></Input>  
                    </Form-item>
                </Col>
                
                <Col span="12"> 
                    <Form-item label="渔船检验证书编号:" :label-width="130">
                        <Input v-model="info.fishVessInspCertNo" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="签发人:" >
                        <Input v-model="info.issuer" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="签发日期:" >
                        <Input v-model="info.issueDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="发证机关:" >
                        <Input v-model="info.issuingOrgan" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="发证机关意见:" >
                        <Input v-model="info.issuingOrganOpinion" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="持证人名称:" >
                        <Input v-model="info.holder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="持证人地址:" >
                        <Input v-model="info.holderAddress" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="居民身份证号码或公司注册号:" :label-width="180">
                        <Input v-model="info.idenCardNumbRegiNumb" ></Input>  
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
                    <Form-item label="注销理由:" >
                        <Input v-model="info.cancelReason" ></Input>  
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
            default: '渔船捕捞许可注销详情'
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
            .get('/achive/ycblxkzx/get', {
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

<style>

</style>
