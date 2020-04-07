<style lang="less">
    @import '../../../styles/common.less';
    @import './image-editor.less';
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

        <div slot="header" v-if="header">
            <slot name="header"></slot>
        </div>
        <div slot="close" v-if="close">
            <slot name="close"></slot>
        </div>
        <div slot="footer" v-if="footer">
            <slot name="footer"></slot>
        </div>
        <!-- 主体 -->
        <div class="image-editor">
        <Row :gutter="10">
            <Col span="24">
              <Row :gutter="10">
                <Col span="12" class="image-editor-con1">
                    <div class="cropper">
                        <img id="cropimg" alt="">
                    </div>
                </Col>
                <Col span="7" class="image-editor-con1">
                    <Row type="flex" justify="center" align="middle" class="image-editor-con1-preview-con">
                        <div id="preview1"></div>
                    </Row>
                    <div class="image-editor-con1-btn-con margin-top-10">
                        <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChangePic" id="fileinput1" class="fileinput" />
                        <label class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</label>
                        <span><Button @click="handlecrop" type="primary" icon="crop">裁剪预览</Button></span>
                        <ButtonGroup style="margin-top:5px">
                          <Tooltip content="逆时针旋转" placement="top">
                            <Button @click="cropper.rotate(-90)" type="primary"><Icon :size="14" type="arrow-return-left"></Icon></Button>
                          </Tooltip>
                          <Tooltip content="顺时针旋转" placement="top">
                            <Button @click="cropper.rotate(90)" type="primary"><Icon :size="14" type="arrow-return-right"></Icon></Button>
                          </Tooltip>
                          <Tooltip content="放大" placement="top">
                            <Button @click="cropper.zoom(0.1)" type="primary"><Icon :size="14" type="plus-round"></Icon></Button>
                          </Tooltip>
                          <Tooltip content="缩小" placement="top">
                            <Button @click="cropper.zoom(-0.1)" type="primary"><Icon :size="14" type="minus-round"></Icon></Button>
                          </Tooltip>
                          <Tooltip content="水平对换" placement="top">
                            <Button @click="cropper.scaleX(-cropper.getData().scaleX)" type="primary"><Icon :size="14" type="android-more-horizontal"></Icon></Button>
                          </Tooltip>
                          <Tooltip content="垂直对换" placement="top">
                            <Button @click="cropper.scaleY(-cropper.getData().scaleY)" type="primary"><Icon :size="14" type="android-more-vertical"></Icon></Button>
                          </Tooltip>
                            
                        </ButtonGroup>
                    </div>
                </Col>
                <Col span="4" class="image-editor-con2">
                    <p><b>坐标x:</b>{{ cropdata.x }}</p>
                    <p><b>坐标y:</b>{{ cropdata.y }}</p>
                    <p><b>宽度:</b>{{ cropdata.w }}</p>
                    <p><b>高度:</b>{{ cropdata.h }}</p>
                    <p><b>角度:</b>{{ cropdata.deg }}</p>
                    <p><b>反转x:</b>{{ cropdata.scaleX }}</p>
                    <p><b>反转y:</b>{{ cropdata.scaleY }}</p>
                    <div class="margin-top-10" style="text-align: center;">
                    </div>
                </Col>
              </Row>
            </Col>
          </Row>
      </div>

    

    </Modal>
    <Modal v-model="option.showCropedImage" title="预览">
        <img :src="option.cropedImg" style="width: 100%;">
    </Modal>
  </div>
</template>

<script>
import Cropper from 'cropperjs';
import './cropper.min.css';

export default {
  name: "myModal",
  props: {
    // default
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
      default: "上传图片"
    },
    width: {
      type: [Number, String],
      default: 1080
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "返回"
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
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    // ------
    aspectRatio: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      // default
      visible: false,
      // ------
      cropper: {},
      option: {
          showCropedImage: false,
          cropedImg: ''
      },
      cropdata: {
          x: '',
          y: '',
          w: '',
          h: '',
          deg: '',
          scaleX: '',
          scaleY: ''
      },
    };
  },
  computed: {
    // default
    footer() {
      return this.$slots.footer == undefined ? false : true;
    },
    header() {
      return this.$slots.header == undefined ? false : true;
    },
    close() {
      return this.$slots.close == undefined ? false : true;
    },
    // ------

  },
  mounted() {
    this.init();
  },
  methods: {
    // default
    ok() {
      this.savePhoto();
      if (!this.loading) this.$emit("input", this.visible);
      //this.$emit("on-ok");
      
    },
    cancel() {
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    // ------
    handleChangePic (e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
          this.cropper.replace(reader.result);
          reader.onload = null;
      };
      reader.readAsDataURL(file);
    },
    handlecrop () {
        let file = this.cropper.getCroppedCanvas().toDataURL();
        this.option.cropedImg = file;
        this.option.showCropedImage = true;
    },
    savePhoto () {
      let file = this.cropper.getCroppedCanvas().toDataURL();
      let params = new URLSearchParams();
      params.append("file", file);
      params.append("dataId", "");
      params.append("moduleId", "");
      this.$http
        .post("/$admin/attachs/base64", 
          params,
        )
        .then(res => {
          this.$emit("on-ok",res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    init(){
      let img = document.getElementById('cropimg');
      this.cropper = new Cropper(img, {
          aspectRatio:this.aspectRatio,
          dragMode: 'move',
          preview: '#preview1',
          restore: false,
          center: false,
          highlight: false,
          cropBoxMovable: false,
          toggleDragModeOnDblclick: false,
      });
      img.addEventListener('crop', (e) => {
          this.cropdata.x = parseInt(e.detail.x);
          this.cropdata.y = parseInt(e.detail.y);
          this.cropdata.w = parseInt(e.detail.width);
          this.cropdata.h = parseInt(e.detail.height);
          this.cropdata.deg = parseInt(e.detail.rotate);
          this.cropdata.scaleX = parseInt(e.detail.scaleX);
          this.cropdata.scaleY = parseInt(e.detail.scaleY);
      });
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
      }
    }
  }
};
</script>
<style scoped>

</style>


