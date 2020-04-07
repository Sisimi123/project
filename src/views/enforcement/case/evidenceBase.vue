<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
    <data-table ref="test" 
        :url="'/enforces/evidence/page'" :params="query" :columns="columns" 
        >
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
            <Row>
                <Col span="5">
                    <Form-item label="名称:">
                        <Input  v-model="query.wheres.uName"  placeholder="请输入..." />
                    </Form-item>
                </Col>

                <div class="btn-wrap">
                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                    <Button @click="handleReset()"  >重置</Button>
                </div>
                <div class="func-wrap">
                    <Button @click="daKai()" type="success" icon="ios-add" >新增</Button>
                </div>
            </Row>
            </Form>
        </div>
    </data-table>


    <Modal v-model="status.addmodel" :title="title" width="500" :mask-closable="false" >
        <Form :label-width="80" :model="formLeft" :rules="infoRules" ref="formLeft">
            <Row>
                <Col span="23">
                    <FormItem label="名称:" prop="uName">
                        <Input v-model="formLeft.uName" type="textarea" :autosize="{minRows: 2,maxRows: 3}" ></Input> 
                    </FormItem>
                </Col>                    
            </Row>
        </Form>	
        <div slot="footer">
            <Button  @click="status.addmodel = false" >取消</Button>
            <Button v-if="addFh==1" type="success" @click="add()" >保存</Button>
            <Button v-else type="success" @click="update()">保存修改</Button>
        </div>         
    </Modal>

    <Modal v-model="status.fenXiang" title="分享" width="500" :mask-closable="false" >
        <Form :label-width="80" :model="formLeft">
            <Row>
                <Col span="12">
                    <FormItem label="编码:" >
                        <Input v-model="formLeft.uNum" :readonly="true"/>
                    </FormItem>
                </Col><Col span="12">
                    <FormItem label="密码:" >
                        <Input v-model="formLeft.uPwd" :readonly="true"/>
                    </FormItem>
                </Col>
            </Row>
        </Form>	
        <div slot="footer">
            <Button  @click="status.fenXiang = false" >取消</Button>
            <Button type="success" @click="refreshCode" >刷新</Button>
        </div>         
    </Modal>

    <Modal  v-model="status.uploadModal" title="附件上传" width="500"  class="upload1" :mask-closable="false">
        <div slot="footer">
            <Button type="info" @click="status.uploadModal = false">关闭</Button>
        </div> 
        <div>
            <div class="markScore-upload-list" v-for="item in uploadList" v-bind:key="item.id">
                <img :src="item.url">
                <div class="markScore-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.id)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </div>
            <Upload
              :data="uploadData"
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
              :format="['jpg','jpeg','png']"
              :with-credentials="true"
              :max-size="20480"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              name="attach"
              :action="actionUrl"
              style="display: inline-block;width:100px;">
              <div style="width: 100px;height:80px;line-height: 80px;">
                <Icon type="android-add-circle" size="50" style="line-height:80px"></Icon>
              </div>
            </Upload>
        </div>
    </Modal>
  
    <Modal title="查看大图" v-model="status.visible" class="upload1">
        <img :src="datuUrl + this.imgName" v-if="status.visible" style="width: 100%;">
    </Modal>
</div>
</template> 

<script>
export default {
  name: "evidenceBase",
  data() {
    return {
      id: "",
      imgName: "",
      uploadList: [],
      actionUrl: this.$basePath + "/$admin/attachs", //上传URL
      datuUrl: this.$basePath + "/$admin/attachs/stream/", //查看大图
      infoRules: {
        //验证规则
        uName: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },
      status: {
        isLoading: true,
        loadingCase: false,
        addmodel: false,
        fenXiang: false,
        visible: false,
        uploadModal: false
      },
      formLeft: {
        uName:""
      },
      query: {
        page: 1,
        size: 20,
        key: "getEvidencePage",
        wheres: {
          uName: ""
        }
      },
      title: "",
      addFh: 1,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "名称",
          key: "uName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "修改时间",
          key: "updateTime",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 280,
          render: (h, params) => {
            var id = params.row.id;
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.handleEdit(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.status.uploadModal = true;                     
                      this.id = params.row.id;
                      this.seaUpload(params.row.id);
                    }
                  }
                },
                "上传图片"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.showOther(params.row);
                    }
                  }
                },
                "分享"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.remove(params.row.id);
                    }
                  }
                },
                "删除"
              )
            );
            return h("div", temp);
          }
        }
      ]
    };
  },
  computed: {
    uploadData() {
      return {
        dataId: this.id,
        type: "attach",
        moduleId: "EnforceCaseEvidenceBase"
      };
    }
  },
  mounted() {},
  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    daKai() {
      this.$refs["formLeft"].resetFields(); //清除验证
      this.title = "新增信息";
      this.status.addmodel = true;
      this.addFh = 1;
    },
    //新增数据
    add(formLeft) {
      this.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("_model", JSON.stringify(this.formLeft));
          this.$http
            .post("/enforces/evidence/", params)
            .then(response => {
              this.status.addmodel = false;
              this.initSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    },
    showOther(row) {
      console.log("row", row);
      this.shareMethod(row.id);
      this.status.fenXiang = true;
    },
    remove(id) {
      var _self=this;
      _self.$Modal.confirm({
          title:"提示",
          content:"您确定要删除当前列表项吗？",
          onOk:function(){
              _self.$http.delete("/enforces/evidence/" + id).then(res =>{
                  if(res.success){
                      _self.initSearch();
                      _self.$Message.success('删除成功!');
                  }else{
                      _self.$Message.info(res.msg);
                  }
              }).catch(function(error) {
                console.log(error)
              });
          
          }
      });      
      // this.$http
      //   .delete("/enforces/evidence/" + id)
      //   .then(res => {
      //     this.initSearch();
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    // 双击修改显示
    handleEdit(index) {
      this.$http
        .get("/enforces/evidence/" + index.id)
        .then(response => {
          this.formLeft = response.data;
          this.addFh = 0;
          this.title = "修改数据";
          this.status.addmodel = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update(value) {
      this.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          params.append("_model", JSON.stringify(this.formLeft));
          this.$http
            .put("/enforces/evidence/id", params)
            .then(response => {
              this.status.addmodel = false;
              this.initSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    // 查询重置
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.initSearch();
    },
    seaUpload(id) {
      this.uploadList.length = 0;
      this.$http.get("/$admin/attachs", { params: this.uploadData }).then(result => {
        var temp = result.data;
        for (var i = 0; i < temp.length; i++) {
          let attr = {
            id: temp[i].id,
            name: temp[i].name,
            dataId: temp[i].dataId,
            status: "finished",
            url: this.$basePath + "/$admin/attachs/stream/" + temp[i].id
          };
          this.uploadList.push(attr);
        }
      });
    },

    refreshCode() {
      this.shareMethod(this.formLeft.id);
    },
    /* 上传成功 */
    handleSuccess(response, file, fileList) {
      let attr = {
        id: response.data.id,
        name: response.data.name,
        dataId: response.data.dataId,
        status: "finished",
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };
      this.uploadList.push(attr);
    },

    shareMethod(id) {
      let params = new URLSearchParams();
      params.append("id", id);
      this.$http
        .post("/enforces/evidence/share/", params)
        .then(response => {
          console.log("response", response.data);
          this.formLeft = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleView(ID) {
      this.imgName = ID;
      this.status.visible = true;
    },

    handleRemove(file) {
      var index = 0;
      for (var i = 0; i < this.uploadList.length; i++) {
        if (this.uploadList[i].dataId == file.dataId) index = i;
      }
      this.uploadList.splice(index, 1);
      this.$http
        .delete("/$admin/attachs/" + file.id)
        .then(response => {
          this.$Message.info("操作成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleFormatError(file) {
      // this.$Notice.warning({
      //   title: "The file format is incorrect",
      //   desc:
      //     "File format of " +
      //     file.name +
      //     " is incorrect, please select jpg or png."
      // });
      this.$Message.error('文件格式错误!')
    },
    handleMaxSize(file) {
      // this.$Notice.warning({
      //   title: "Exceeding file size limit",
      //   desc: "File  " + file.name + " is too large, no more than 2M."
      // });
      this.$Message.error('文件大小超出限制!')
    },
    handleBeforeUpload() {
      return true;
    },
    clear(formLeft) {
      this.status.addmodel = false;
    },

    toEdit(id) {
      this.dataId = id;
      this.status.showDetailInfoModal = true;
    }
  }
};
</script>

<style scoped>
.markScore-upload-list {
  display: inline-block;
  width: 100px;
  height: 80px;
  text-align: center;
  line-height: 80px;
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
