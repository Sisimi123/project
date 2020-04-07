<template>
    <Upload :action="actionWithBase"
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
            :default-file-list="defaultFileList" 
            :style="uploadStyle">
        <slot></slot>
    </Upload>
</template>
<script>
    export default {
        name: 'MyUpload',
        props: {
            action: {
                type: String,
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
                default:51200
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
            },
            uploadStyle: {
                type: String,
                default :""
            }
        },
        computed: {
            actionWithBase () {
                return this.$basePath+this.action;
            },
        },
        methods:{
        }
    };
</script>