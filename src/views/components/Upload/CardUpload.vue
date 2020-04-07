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
            <div slot="footer">
                <Button @click="cancel">关闭</Button>
            </div>
            <Row style="overflow-x:hidden;overflow-y:auto;max-height:300px;">
                <Col span="12" style="padding:5px">
                    <SingleUpload :dataId="dataId" :moduleId="moduleId" type="cardzm" :action="action" title="身份证正面"></SingleUpload>
                </Col>
                <Col span="12" style="padding:5px">
                    <SingleUpload :dataId="dataId" :moduleId="moduleId" type="cardfm" :action="action" title="身份证反面"></SingleUpload>
                </Col>
            </Row>
        </Modal>
</template>

<script>
import SingleUpload from './SingleUpload.vue';
import {isNull,isEmpty} from '@/libs/common.js';
export default {
    name: "workflowModal",
    components:{
        SingleUpload
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
            default: false
        },
        title: {
            type: String,
            default: "身份证上传"
        },
        width: {
            type: [Number, String],
            default: "900"
        },
        height:{
            type: [Number, String],
            default: 520
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
        dataId: {
            type: String,
            require: true
        },
        moduleId:{
            type: String,
            require: true
        },
        action:{
            type: String,
            require:true,
            default: "view"
        }
    },
    data () {
        return {
           visible:this.value,
           dataInfo:{
               cardzm:"",
               cardfm:""
           }
        };
    },
    methods: {
        isEmpty,
         ok() {
            if (!this.loading)
                this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.visible=false;
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        test(){
            console.log(this.dataId);
        }
    },
    watch:{
        value(val){
            console.log(val)
            if(val){
                this.visible=val;
                
            }
        }
    }
};
</script>
