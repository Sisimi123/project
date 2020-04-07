// 渔业船网工具指标详情组件

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
                    <Form-item label="核准船名英文:" >
                        <Input v-model="info.approvalvesselNameenglish" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="核准请船籍港:" >
                        <Input v-model="info.approvedPortregistry" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船体材料:" >
                        <Input v-model="info.hullMaterial" ></Input>  
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
                    <Form-item label="总吨位:" >
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="子船数量:" >
                        <Input v-model="info.subVesselsNo" ></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="子船总功率:" >
                        <Input v-model="info.totalShipPower" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="双控功率:" >
                        <Input v-model="info.dualPowerControl" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="申请功率指标:" >
                        <Input v-model="info.applicationPowerIndicator" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="已有功率指标合计:" :label-width = "120">
                        <Input v-model="info.totalExistingPowerIndex" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="申请类型:" >
                        <Input v-model="info.applicationType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="捕捞证件类型:" >
                        <Input v-model="info.fishingDocumentType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="捕捞辅助类型:" >
                        <Input v-model="info.fishingAidType" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <Row>
                <Col span="12">
                    <Form-item label="作业类型:" >
                        <Input v-model="info.jobType" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="兼作业类型:" >
                        <Input v-model="info.concurrentOperationType" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="船舶种类:" >
                        <Input v-model="info.shipTypeA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="作业场所:" >
                        <Input v-model="info.workplace" ></Input>  
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
                    <Form-item label="签发部门:" >
                        <Input v-model="info.issuingDepartment" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="签发时间:" >
                        <Input v-model="info.timeFiled" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="证书有效期:" >
                        <Input v-model="info.certificateValidity" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <Form-item label="船网工具指标所属地名称:" :label-width = "160">
                        <Input v-model="info.namevesselNetToolIndex" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="船网工具指标所属地代码:" :label-width = "160">
                        <Input v-model="info.shipNetToolIndexCode" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="渔业船网工具指标申请书编号:" :label-width = "180">
                        <Input v-model="info.fishVessNetwToolIndeApplNumb" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="渔业船网工具指标申请日期:" :label-width = "180">
                        <Input v-model="info.fishVessNetwToolIndeApplDate" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            
            <!-- // 显示企业申请信息 -->
            <div v-if = 'info.nameenterprise'>
                <Row>
                    <Col span="24">
                        <fieldset>
                            <legend>企业申请</legend>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="企业名称:" >
                            <Input v-model="info.nameenterprise" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="电话:" >
                            <Input v-model="info.enteApplTele" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="地址:" >
                            <Input v-model="info.enteApplAddr" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="企业性质:" >
                            <Input v-model="info.enteApplNatu" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="企业注册号:" >
                            <Input v-model="info.enteRegiNumb" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="邮政编码:" >
                            <Input v-model="info.enteApplCode" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="法人代表:" >
                            <Input v-model="info.enteApplRepr" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="现有渔船数量:" >
                            <Input v-model="info.enteApplFishVess" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="现有渔船总功率:" >
                            <Input v-model="info.enteApplPoweFishVess" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="申请理由:" >
                            <Input v-model="info.enteApplReas" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
            </div>

            <!-- // 显示个人申请信息 -->
            <div v-else>
                <Row>
                    <Col span="24">
                        <fieldset>
                            <legend>个人申请</legend>
                        </fieldset>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="姓名:" >
                            <Input v-model="info.personalName" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="电话:" >
                            <Input v-model="info.personalCall" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="地址:" >
                            <Input v-model="info.personalAddress" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="居民身份证号码:" >
                            <Input v-model="info.persIdenCardNumb" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="是否渔业人口:" >
                            <Input v-model="info.indiApplFishPopu" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="目前职业:" >
                            <Input v-model="info.applyyourCurrentJob" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="现有渔船数量:" >
                            <Input v-model="info.exisFishBoatApplNo" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="现有渔船总功率:" >
                            <Input v-model="info.indiApplPoweFishVess" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="邮政编码:" >
                            <Input v-model="info.zipCodeAppl" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="申请理由:" >
                            <Input v-model="info.reasIndi" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col span="12">
                    <Form-item label="更新时间:" >
                        <Input v-model="info.intfUpdateTime" ></Input>  
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="备注:" >
                        <Input v-model="info.remarks" ></Input>  
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </Modal>
</template>

<script>
export default {
    name: 'ycgjzbModal',
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
            default: '渔业船网工具指标详情'
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
            .get('/achive/yycwgjzb/get', {
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
    /deep/.ivu-modal {
        fieldset {
            border: none;
            border-top: 1px solid #000;

            legend {
                font-size: 18px;
                font-weight: bold;
            }
        }

        .ivu-modal-body {
            max-height: 750px;
            overflow-y: scroll;
        }
    }
</style>
