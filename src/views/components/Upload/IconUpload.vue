<template>
    <div style="text-align:center">
        <template v-if="action=='edit'">
            <template v-if="isEmpty(path)">
                <MyUpload type="drag" :name="type"
                action="/$admin/attachs"
                :data="uploadData"
                :show-upload-list="false"
                :on-success="uploadSuccess" :style="'width:'+width+'px;'">
                    <slot name="upload">
                        <div>
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>点击或将文件拖拽到这里上传</p>
                        </div>
                    </slot>
                </MyUpload>
            </template>
            <template v-else>
                <div class="single-upload-list" :style="'width:'+width+'px;height:'+height+'px'">
                    <img :src="filePath" :style="'width:100%;height:100%;border:0px'">
                    <div class="single-upload-list-cover">
                        <!-- <Icon type="ios-eye-outline" :size="height/2" @click.native="handleView(item.name)"></Icon> -->
                        <Icon type="ios-trash-outline"  @click.native="deleteFile()"></Icon>
                    </div>
                </div>
            </template>
        </template>
        <template v-else>
            <img :src="filePath" :style="'width:100%;height:'+height+'px;border:0px'">
        </template>
        <p>{{title}}</p> 
    </div>
</template>

<script>
import MyUpload from './MyUpload.vue';
import {isNull,isEmpty} from '@/libs/common.js';
export default {
    name: "SingleUpload",
    components:{
        MyUpload
    },
    props: {
        value:{
            type: String,
            require: true
        },
        dataId: {
            type: String,
            default: "attachs"
        },
        moduleId:{
            type: String,
           default: "attachs"
        },
        type:{
            type: String,
            require: true,
            default: "file"
        },
        action:{
            type: String,
            require: true,
            default: "view"
        },
        title:{
            type:String,
            default:""
        },
        width:{
            type:Number,
            default:400
        },
        height:{
            type:Number,
            default:250
        }
    },
    data() {
        return {
           path:this.value
        };
    },
    computed:{
        filePath(){
            if(!isEmpty(this.path))
                return  this.$basePath+"/attachment"+this.path;
            return require('@/images/img-default.jpg');
        },
        uploadData(){
            return {
                dataId:this.dataId,
                moduleId:this.moduleId,
                type:this.type
            }
        }
    },
    methods: {
        isEmpty,
        uploadSuccess:function(response,file,fileList){
            if(response.success){

                this.$emit("input",response.data.url)
            }
        },
        deleteFile(){
            this.$emit("input","");
        }
    },
    watch:{
        value(val, oldVal){
            this.path=this.value;
        }
    }
};
</script>
<style scoped>
    .single-upload-list{
        display: inline-block;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .single-upload-list img{
        width: 100%;
        height: 100%;
    }
    .single-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .single-upload-list:hover .single-upload-list-cover{
        display: block;
    }
    .single-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>