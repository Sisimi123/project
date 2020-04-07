<template>
  <div>
    <MyUpload
      style="display:block"
      multiple
      type="select"
      action="/$admin/attachs"
      :data="uploadData"
      :show-upload-list="false"
      :before-upload="beforeUpload"
      :on-success="uploadSuccess"
      v-if="show"
    >
    <Button icon="ios-cloud-upload-outline" type="info">{{buttonText}}</Button>
    </MyUpload>
    <ul class="ivu-upload-list">
      <li
        class="ivu-upload-list-file ivu-upload-list-file-finish"
        v-for="(item,index) in uploadList"
        :key="index"
        style="float:left;margin-right:10px"
      >
        <span @click="showFile(item)">
          <i class="ivu-icon ivu-icon-image"></i>
          {{item.name}}
        </span>
        <span @click="showFile(item)" style="color:blue">预览</span>
        <span @click="deleteFile(index,item)" v-if="show" style="color:red">删除</span>
        <!-- <i class="ivu-icon ivu-icon-ios-close-empty ivu-upload-list-remove"  @click="deleteFile(index,item)" ></i> -->
      </li>
    </ul>
    <pic v-model="showPic" :img="showPicPathWithBase"></pic>
  </div>
</template>

<script>
import MyUpload from "../../components/Upload/MyUpload"
import pic from "../../components/pic/pic"
export default {
 components:{
     MyUpload,
     pic
 },
  props: {
    id: {
      type: String,
      default: ""
    },
    show:{
        type:Boolean,
        default:true,
    },
    buttonText:{
        type:String,
        default:"点击上传文献"
    }
  },
  data() {
    return {
      uploadList: [],
      uploadData: {
        dataId: "",
        moduleId: "setTask",
        type: "file"
      },
      uploadId:"",
      showPicId:"",
      showPic:false,
    };
  },
  methods: {
    beforeUpload() {
    //   this.uploadData.dataId = this.uploadId;
    },
    uploadSuccess(response, file, fileList) {
      if (response.success) {
        this.loadFiles();
      }
    },
    loadFiles() {
      var _self = this;
      _self.$http
        .get("/$admin/attachs", {
          params: _self.uploadData
        })
        .then(function(result) {
          if (result.success) _self.uploadList = result.data;
           _self.$emit("getUrl",result.data);
        });
    },
    showFile(item) {
        console.log(item)
      var name = item.name;
      var index = name.lastIndexOf(".");
      var suffix = index > 0 ? name.substring(index) : "";
      if (
        suffix != "" &&
        ".bmp,.jpg,.png,.jpeg,.tiff,.gif".indexOf(suffix.toLowerCase()) >= 0
      ) {
        // window.open("showImage.jsp?bigAttUrl="+item.attachpath,"_blank");
        // window.location.href=this.$basePath+"/$admin/attachs/stream/"+item.id;
        this.showPicId = item.id;
        this.showPic = true;
      } else
        window.location.href =
          this.$basePath + "/$admin/attachs/stream/" + item.id;
    },
    deleteFile(index, item) {
      var _self = this;
      _self.$http.delete("/$admin/attachs/" + item.id).then(function(result) {
        if (result.success) {
          _self.uploadList.splice(index, 1);
          _self.loadFiles()
        }
        _self.$Message.info(result.description);
      });
    }
  },
  watch:{
      id(value){
        console.log(value)
          this.uploadData.dataId = value
      }
  },
  computed:{
    showPicPathWithBase() {
      return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
    },
  }
};
</script>

<style>
</style>