<style lang="less">
    @import "../../../styles/commonStyle.less";
</style>

<template>
<div>
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
                <Col span="7">
                    <div class="div-center">
                        <!-- <div class="modal-img" v-if="!isEmpty(info.shipOwnerPhotos)">
                            <img :src="shipOwnerPhotos"/>
                            <div class="modal-img-cover">
                                <Tooltip content="预览大图" placement="top">
                                    <Icon type="ios-eye-outline" @click.native="handleSeeOwner"></Icon>
                                </Tooltip>
                            </div>
                        </div>
                        <div class="modal-img" v-else>
                            <img src="../../../images/defaultHeader.jpg"/>
                        </div> -->
                        <div class="modal-img">
                            <img src="../../../images/defaultHeader.jpg"/>
                        </div>
                    </div>
                </Col>

                <Col span="16">
                    <Row>
                        <Col span="12">
                            <Form-item label="船舶所有人:" >
                                <Input v-model="info.namevesselOwner" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="船舶所有人名称英文:" >
                                <Input v-model="info.namevesselOwnerenglish" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item label="所有人电话:" >
                                <Input v-model="info.shipOwnerTelephone" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="所有人所占股份:" >
                                <Input v-model="info.sharesHeldByAll" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <Form-item label="所有人地址:" >
                                <Input v-model="info.addressshipOwner" type="textarea" :autosize="{minRows: 2,maxRows: 2}"></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>

            <Row>
                <Col span="16">
                    <Row>
                         <Col span="12">
                            <Form-item label="渔船名称:" >
                                <Input v-model="info.nametheShip" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="船舶类型:" >
                                <Input v-model="info.shipType" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <Form-item label="船籍港:" >
                                <Input v-model="info.portregistry" ></Input>  
                            </Form-item>
                        </Col>
                        <Col span="12">
                            <Form-item label="渔船所属地区:" >
                                <Input v-model="info.nametheFishingArea" ></Input>  
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
                            <Form-item label="呼号识别码:" >
                                <Input v-model="info.shipCallMarkIdenCode" ></Input>  
                            </Form-item>
                        </Col>
                    </Row>
                   
                </Col>

                <Col span="7">
                    <div class="div-center">
                        <!-- <div class="modal-img" v-if="!isEmpty(info.shipPhotos)">
                            <img :src="shipPhotos"/>
                            <div class="modal-img-cover">
                                <Tooltip content="预览大图" placement="top">
                                    <Icon type="ios-eye-outline" @click.native="handleSeeShip"></Icon>
                                </Tooltip>
                            </div>
                        </div>
                        <div class="modal-img" v-else>
                            <img src="../../../images/defaultShip.jpg"/>
                        </div> -->
                        <div class="modal-img" >
                            <img src="../../../images/defaultShip.jpg"/>
                        </div>
                    </div>
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
                    <Form-item label="建造完工日期:" >
                        <Input v-model="info.consCompDate" ></Input>  
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
                    <Form-item :label-width="180" label="所有权国籍登记申请日期:" >
                        <Input v-model="info.owneNatiRegiDate" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item :label-width="200" label="所有权国籍登记申请书编号:" >
                        <Input v-model="info.owneNatiRegiApplNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <!-- <Row>
                <Col span="8">
                    <Form-item :label-width="180" label="所有权国籍登记审批人:" >
                        <Input v-model="info.owneNatiRegiAppr" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item :label-width="200" label="所有权国籍登记审批时间:" >
                        <Input v-model="info.owneNatiRegiExamTime" ></Input>  
                    </Form-item>
                </Col>
            </Row> -->

            <Row>
                <Col span="8">
                    <Form-item :label-width="180" label="渔业船舶登记证书有效期:" >
                        <Input v-model="info.valiDateVessRegiCert" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item :label-width="200" label="渔业船舶所有权登记证书编号:" >
                        <Input v-model="info.fishVessOwneRegiCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item :label-width="180" label="渔业船舶国籍证书有效期:" >
                        <Input v-model="info.fishVessNatiCertValiPeri" ></Input>  
                    </Form-item>
                </Col>
                <Col span="16">
                    <Form-item :label-width="200" label="渔业船舶国籍证书编号:" >
                        <Input v-model="info.fishVessNatiCertNumb" ></Input>  
                    </Form-item>
                </Col>
            </Row>

        </Form>
    </Modal>

    <pic v-model="showPic" :img="showPicUrl"></pic>
</div>
</template>

<script>
import pic from '@/views/components/pic/pic.vue';
export default {
    
    name: "ycsyqModal",
    components: {
        pic,
    }, 
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
            default: "渔船所有权信息"
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
            // wrapShow: false,
            // showHead: true,
            // buttonLoading: false,
            visible: this.value,
            showPic: false,
            showPicUrl:"",
            defaultHeader:"../../../images/defaultHeader.jpg",
            defaultShip:"../../../images/defaultShip.jpg",
            shipOwnerPhotos:"",
            shipPhotos:"",
            info:{},
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
            .get("/shiparchives/nybgjsyq/get",{
                params:{
                    id: this.unid,
                    uniqIdenVessInfo: this.shipId,
                    nametheShip: this.nametheShip
                }
            })
            .then(res => {
                if(res.success && !this.isEmpty(res.data)){
                    this.info = res.data;
                    this.visible = true;
                }
                else{
                    this.$Message.error("暂无所有权数据");
                    this.visible = false;
                    this.$emit("input",this.visible);
                    this.$emit("on-cancel");
                    
                }  
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        handleSeeShip(){
            this.shipPhotos = this.$basePath+"/$admin/attachs/stream/"+this.info.shipPhotos;
            this.showPic = true;
        },
        handleSeeOwner(){
            this.shipOwnerPhotos = this.$basePath+"/$admin/attachs/stream/"+this.info.shipOwnerPhotos;
            this.showPic = true;
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
.div-center{
    text-align: center;
}
.modal-img{
    display: inline-block;
    width: 200px;
    height: 144px;
    text-align: center;
    line-height: 144px;
    border: 1px solid transparent;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(138, 130, 173, 0.171);
}
.modal-img img{
    width: 100%;
    height: 100%;
}
.modal-img-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.modal-img:hover .modal-img-cover{
    display: block;
}
.modal-img-cover i{
    color: #fff;
    font-size: 40px;
    cursor: pointer;
    margin: 0 2px;
}
.ivu-form-item{
    margin-bottom: 10px !important;
}
</style>


