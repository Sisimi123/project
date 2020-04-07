<template>
    <div>
        <div v-if="ifEdit">
            <Upload 
                :action="actionWithBase"
                :headers="headers"
                :multiple="multiple"
                :data="data"
                :name="name"
                :with-credentials="withCredentials"
                :show-upload-list="showUploadList"
                :type="type"
                :accept="accept"
                :format="format"
                :max-size="maxSize"
                :before-upload="beforeUpload"
                :on-progress="onProgress"
                :on-success="onSuccess"
                :on-error="onError"
                :on-preview="onPreview"
                :on-remove="onRemove"
                :on-format-error="onFormatError"
                :on-exceeded-size="onExceededSize"
                :default-file-list="defaultFileList">
            <Button  style="width:468px;" icon="ios-cloud-upload-outline" title="支持格式：图片、doc、xls、ppt、rar">点击或拖拽上传文件</Button>    
            </Upload>
        </div>
        <div>
            <ul style="list-style: none;width:100%;">
                <li v-for="(item,index) in uploadList" :key="index" style="width:100%; display: flex;margin:20px 0px;"> 
                    <span style="display:inline-block;width:40%;" v-if="isShow">{{item.name}}</span>
                    <span v-if="!isShow" style="display:inline-block;width:40%;"><p>没有已上传附件</p></span>
                    <span style="width:110px; text-align:center;">
                        <Button size="small" @click="show($util.basePath+'/attachment'+item.url)" type="primary">文件预览</Button>
                        <Button size="small" @click="deleteFile(index,item)" type="error">删除</Button>
                    </span>                                                                
                </li>
            </ul>
        </div>
    </div>     
</template>

<script>
    export default {
        name: 'newUpload',
        props: {
            isShow: {
                type: Boolean,
                default: true
            },
            uploadList: {
                type: Array,
                default: []
            },
            ifEdit: {
                type: Boolean,
                default: true
            },
            action: {
                type: String,
                required: true,
                default:"/$admin/attachs"
            },
            headers: {
                type: Object,
                default () {
                    return {
                        "ipInfo": this.$store.state.ipInfo.cip
                    };
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object
            },
            name: {
                type: String,
                default: 'file'
            },
            withCredentials: {
                type: Boolean,
                default: true
            },
            showUploadList: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
            },
            format: {
                type: Array,
                default () {
                    return ['bmp','jpg','png','jpeg','tiff','gif','svg','wmf','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'];
                }
            },
            accept: {
                type: String
            },
            maxSize: {
                type: Number,
                default:10240
            },
            beforeUpload: Function,
            onProgress: {
                type: Function,
                default () {
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default () {
                    return {};
                }
            },
            onError: {
                type: Function,
                default () {
                    return {};
                }
            },
            onRemove: {
                type: Function,
                default () {
                    return {};
                }
            },
            onPreview: {
                type: Function,
                default () {
                    return {};
                }
            },
            onExceededSize: {
                type: Function,
                default () {
                    return {};
                }
            },
            onFormatError: {
                type: Function,
                default () {
                    return {};
                }
            },
            defaultFileList: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        // data() {
        //     return {
        //         isShow: true
        //     }
        // },
        methods: {
            show(url){
                window.open(url);
            },
            deleteFile(index,item){
                var _self=this;
                _self.$http.delete("/$admin/attachs/"+item.id)
                    .then(function(result){
                        if(result.success){
                            _self.uploadList.splice(index, 1);
                        }
                        _self.$Message.info(result.msg);
                });                           
            }
        },
        computed: {
            actionWithBase () {
                return this.$basePath+this.action;
            },
        }
    };
</script>

<style>

</style>
