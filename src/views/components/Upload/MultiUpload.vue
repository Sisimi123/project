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
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <MyUpload v-if="action!='view'"
                    uploadStyle="display: inline"
                    :data="uploadData"  
                    :name="uploadData.type"
                    :action="uploadUrl"
                    :show-upload-list="false"
                    :on-success="uploadSuccess" 
                    :on-error="uploadError"
                    :on-format-error="onFormatError">
                    <Button type="primary">上传</Button>
                </MyUpload>
            </div>
            <Table height="300" border :columns="columns" :data="uploadList"></Table>
        </Modal>
        <pic v-model="showPic" :img="showPicPathWithBase"></pic>
    </div>
</template>

<script>
import MyUpload from './MyUpload.vue';
import pic from '@/views/components/pic/pic.vue';
import {isNull,isEmpty} from '@/libs/common.js';
import user from '@/store/module/user.js';
export default {
    name: "MultiUpload",
    components:{
        MyUpload,
        pic
    },
    props: {
        moduleType: {
            type: String,
            default: ''
        },
        shipName: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
        // creatorName: {
        //     type: String,
        //     default: ''
        // },
        uploadUrl: {
            type: String,
            default:"/$admin/attachs"
        },
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
            default: "附件上传"
        },
        width: {
            type: [Number, String],
            default: "700"
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
            default: false
        },
        dataId: {
            type: String,
            require: true
        },
        moduleId: {
            type: String,
            require: true
        },
        action: {
            type: String,
            require: true,
            default: "edit"
        }
    },
    data () {
        var _self=this;
        return {
            visible:this.value,
            showPic:false,
            showPicId:"",
            columns:[{
                title: '序号',
                key: 'id',
                type:"index",
                align: 'center',
                width:67
            },
            {
                title: '附件名称',
                key: 'name',
            },{
                title: '操作',
                key: 'action',
                width: 200,
                align: 'center',
                render: function(h, params) {
                    var buttons=[];
                    var row=params.row;
                    if(_self.isPic(row)){
                        buttons.push(h('Button', {
                            props: {
                                type: 'info',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: function() {
                                    _self.showFile(row);
                                }
                            }
                        }, '查看'));
                    }

                    buttons.push(h('Button', {
                        props: {
                            type: 'primary',
                            size: 'small'
                        },
                        style: {
                            marginRight: '5px'
                        },
                        on: {
                            click: function() {
                                _self.downloadFile(row);
                            }
                        }
                    }, '下载'));

                    if(_self.action!='view'){
                        buttons.push(h('Button', {
                            props: {
                                type: 'error',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: function() {
                                    _self.deleteFile(params.index,row);
                                }
                            }
                        }, '删除'));
                    }
                    return h('div', buttons);
                }
            }],
            uploadList:[]
        }
    },
    mounted () {
    },
    computed:{
        showPicPathWithBase(){
            return this.$basePath+"/$admin/attachs/stream/"+this.showPicId;
        },
        uploadData () {
            var obj = {};
            if (this.moduleType === 'other') {
                obj = {
                    dataId: this.dataId,
                    moduleId: this.moduleId,
                };
            } else {
                obj = {
                    dataId: this.dataId,
                    moduleId: this.moduleId,
                    type: "attach",
                    name: this.name,
                    owner: this.owner,
                    creatorName: user.state.userInfo.name,
                    shipName: this.shipName
                };
            }
            return obj;
        }
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
        uploadSuccess(response,file,fileList){
            if(response.success){
                this.$Message.success('上传成功!')
                this.loadFiles();
            }
        },
        uploadError(response,file,fileList){
            this.$Message.error('上传失败')
        },
        loadFiles:function(){
            var _self=this;
            _self.$http.get("/$admin/attachs",{
                params:_self.uploadData
            }).then(function(result){
                if(result.success)
                    _self.uploadList=result.data;
                    _self.$emit("getUrl",result.data);
            });
        },
        onFormatError(){
            this.$Message.error('文件格式错误!')
        },
        isPic(item){
            var name=item.name;
            var index=name.lastIndexOf(".");
            var suffix=index>0?name.substring(index):"";
            return suffix!='' && (".bmp,.jpg,.png,.jpeg,.tiff,.gif".indexOf(suffix.toLowerCase())>=0)
        },
        showFile:function(item){
            if(this.isPic(item)){
                this.showPicId=item.id;
                this.showPic=true;
            }else{
                window.open(this.$basePath+"/$admin/attachs/stream/"+item.id);
            }
        },
        downloadFile(item){
            window.open(this.$basePath+"/$admin/attachs/stream/"+item.id);
        },
        deleteFile:function(index,item){
            var _self=this;
            _self.$http.delete('/standingbook/attachs/'+item.id)
                .then(function(result){
                    if(result.success){
                        _self.uploadList.splice(index, 1);
                    }
                    _self.$Message.info(result.msg);
            });
        }
    },
    watch:{
        value(val){
            if(val){
                this.visible=val;
                this.loadFiles();
            }
        }
    }
};
</script>
