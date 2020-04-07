// 渔业船网工具指标转移详情组件

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
                    <Form-item label="船名:" >
                        <Input v-model="info.nametheShip" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="作业类型:" >
                        <Input v-model="info.jobType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
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
                    <Form-item label="船网工具指标所属地名称:" :label-width = "150">
                        <Input v-model="info.namevesselNetToolIndex" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船网工具指标所属地代码:" :label-width = "150">
                        <Input v-model="info.shipNetToolIndexCode" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="国籍登记证书编号:" :label-width = "120">
                        <Input v-model="info.natiRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔船检验证书编号:" :label-width = "120">
                        <Input v-model="info.fishVessInspCertNo" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="渔业捕捞许可证编号:" :label-width = "140">
                        <Input v-model="info.fishingLicenseNumberA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔业船网工具指标转移证明书编号:" :label-width = "200">
                        <Input v-model="info.fishVessNetwToolIndeTranCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="买入方名称:" >
                        <Input v-model="info.buyerName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="买入方地址:" >
                        <Input v-model="info.buyPartyAddress" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="卖出方名称:" >
                        <Input v-model="info.sellerName" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="卖出方地址:" >
                        <Input v-model="info.sellerAddress" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                
                <Col span="8">
                    <Form-item label="开具部门:" >
                        <Input v-model="info.issuingDepartments" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="开具人:" >
                        <Input v-model="info.founder" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="开具时间:" >
                        <Input v-model="info.timeissue" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="资源费:" >
                        <Input v-model="info.collectionresourceFees" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="转移类型:" >
                        <Input v-model="info.transferType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
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
    name: 'ycgjzbzyModal',
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
            default: '渔业船网工具指标转移详情'
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
            .get('/achive/yccwgjzbzy/get', {
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
