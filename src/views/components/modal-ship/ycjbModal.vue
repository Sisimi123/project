<style lang="less">
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
                <i-col span="8">
                    <Form-item label="渔船名称:" >
                        <Input v-model="info.nametheShip" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="渔船编码:" >
                        <Input v-model="info.fishingCode" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="船舶类型:" >
                        <Input v-model="info.shipType" ></Input>  
                    </Form-item>
                </i-col>
            </Row>
            <Row>
                <i-col span="8">
                    <Form-item label="船舶所有人:" >
                        <Input v-model="info.namevesselOwner" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="所有人电话:" >
                        <Input v-model="info.shipOwnerTelephone" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="渔船所属地区:" >
                        <Input v-model="info.nametheFishingArea" ></Input>  
                    </Form-item>
                </i-col>

            </Row>
            <Row>
                <i-col span="24">
                    <Form-item label="所有人地址:" >
                        <Input v-model="info.addressshipOwner" ></Input>  
                    </Form-item>
                </i-col>
            </Row>
            <Row>
                <i-col span="8">
                    <Form-item label="型宽:" >
                        <Input v-model="info.typeWidth" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="型深:" >
                        <Input v-model="info.shipDepth" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="主机总功率:" >
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </i-col>
            </Row>
            <Row>
                <i-col span="8">
                    <Form-item label="船长:" >
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="总吨位:" >
                        <Input v-model="info.grossTonnage" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="船体材质:" >
                        <Input v-model="info.hullMaterialA" ></Input>  
                    </Form-item>
                </i-col>
            </Row>

            <Row>
                <i-col span="8">
                    <Form-item label="核准船长:" >
                        <Input v-model="info.approvedTypeLength" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="核准总吨:" >
                        <Input v-model="info.approvedGrossTonnage" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="8">
                    <Form-item label="双控功率:" >
                        <Input v-model="info.dualPowerControl" ></Input>  
                    </Form-item>
                </i-col>
            </Row>
            <Row>
                <i-col span="12">
                    <Form-item label="船舶呼号识别码:" >
                        <Input v-model="info.shipCallMarkIdenCode" ></Input>  
                    </Form-item>
                </i-col>
                <i-col span="12">
                    <Form-item label="船网工具指标批准书编号:" >
                        <Input v-model="info.indexShipNetToolsNo" ></Input>  
                    </Form-item>
                </i-col>
            </Row>
        </Form>
    </Modal>
</template>

<script>
export default {
    name: "modalYcjb",
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
            default: "渔船基本信息"
        },
        width: {
            type: [Number, String],
            default: 820
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
            // wrapShow: false,
            // showHead: true,
            // buttonLoading: false,
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
            .get("/shiparchives/nybycjb/get",{
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
                    this.$Message.error("暂无渔船数据");
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
