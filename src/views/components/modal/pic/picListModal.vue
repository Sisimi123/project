<style lang="less">

</style>

<template>
<!-- 图片列表  -->
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

            <div slot="header" v-if="showHeader">
                <slot name="header"></slot>
            </div>
            <div slot="close" v-if="showClose">
                <slot name="close"></slot>
            </div>
            <div slot="footer" v-if="showFooter">
                <slot name="footer"></slot>
            </div>

            <div class="markScore-upload-list" v-for="item in uploadList" v-bind:key="item.id">
                <img :src="item.url">
                <div class="markScore-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                </div>.
                <!-- :on-success="(response, file, fileList) => handleSuccess(response, file, fileList,index)" -->
            </div>
            <Upload
                :data="actionData"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :with-credentials="true"
                :max-size="20480"

                :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                multiple
                type="drag"
                :action="actionUrl"
                style="display: inline-block;width:100px;">
                <div style="width: 100px;height:100px;line-height: 100px;">
                    <Icon type="android-add-circle" size="80" style="line-height:100px"></Icon>
                </div>
            </Upload>
        </Modal>

        <pic v-model="imgVisible" :img="imgUrl"></pic>
    </div>
</template>

<script>
import pic from "@/views/components/pic/pic.vue";
export default {
    name: "crewDetail",
    components: {
        pic,
    },
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
            default: "详情"
        },
        width: {
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
            default() {
                return ["ease", "fade"];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        // ------
        moduleId: {
            type: String,
        }

    },
    data() {
        return {
            // default
            visible: false,
            // ------
            uploadList: [],
            imgUrl: "",
            imgVisible: false,
            
        };
    },
    computed: {
        // default
        showFooter() {
            return this.$slots.footer == undefined ? false : true;
        },
        showHeader() {
            return this.$slots.header == undefined ? false : true;
        },
        showClose() {
            return this.$slots.close == undefined ? false : true;
        },
        // ------
        actionData() {
            return {
                moduleId: this.moduleId
            };
        },
        actionUrl(){
            return this.$basePath + "/$admin/attachs/";
        } 
    },
    mounted() {},
    methods: {
        // default
        close() {
            this.visible = false;
            this.$emit("input", false);
            this.$emit("on-cancel");
        },
        cancel () {
            this.close();
        },
        ok () {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-ok');
        },
        visibleChange(val){
            this.visible = val;
            if(!this.visible) this.close();
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        pageSizeChange(size) {
            this.params.size = size;
            this.handleSearch();
        },
        changePage(page) {
            this.params.page = page;
            this.handleSearch();
        },
        // ----
        initSearch(){
            console.log("this.query",this.query);
            this.query.page = 1;
            this.handleSearch();
        },
        handleSearch() {
            this.status.tableLoading = true;
            this.$http
                .get("/checks/shipsailor/page", {
                params: {
                    query: JSON.stringify(this.query)
                }
                })
                .then(res => {
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleSave() {
            this.$Message.info("保存lalala");
        },
        handleView(url) {
            this.imgUrl = url;
            this.imgVisible = true;
        },
        handleRemove(file, index) {
            for (var i = 0; i < this.uploadList[index].length; i++) {
                if (this.uploadList[index][i].dataId == file.dataId) {
                    this.uploadList[index].splice(i, 1);
                break;
                }
            }
        },
        handleSuccess(response, file, fileList, index) {
            let attr = {
                dataId: response.data.id,
                url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
            };
            this.uploadList.push(attr);
        },
        reset(){
            this.uploadList = [];
            this.$http
                .get("/$admin/attachs?dataId="+"123456789")
                .then(res => {
                    let attachs = res.data;
                    console.log("attachs",attachs);
                    res.data.forEach(element => {
                        if(!this.isEmpty(element)){
                            let attr = {
                                dataId: element.id,
                                url: this.$basePath + "/$admin/attachs/stream/" + element.id
                            };
                            this.uploadList.push(attr);
                        }
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.reset();
                this.visible = true;
            }
        }
    },
    beforeDestroy() {
        this.visible = false;
        this.$emit("input", this.visible);
    },
};
</script>
<style scoped>
.markScore-upload-list {
  display: inline-block;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border: 1px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.markScore-upload-list img {
  width: 100%;
  height: 100%;
}
.markScore-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.markScore-upload-list:hover .markScore-upload-list-cover {
  display: block;
}
.markScore-upload-list-cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
}
</style>


