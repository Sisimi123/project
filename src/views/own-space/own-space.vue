<style lang="less">
@import "./own-space.less";
</style>

<template>
    <div>
      <Card>
          <p slot="title">
              <Icon type="person"></Icon>
              个人信息
          </p>
          <div>
            <Form ref="info" :model="info"  :label-width="120" :rules="inforValidate">
                <Row>
                    <Col span="4">
                        <div class="user-photo">
                            <div class="modal-img" v-if="showPhoto" :key="info.id">
                                <img :src="prependImgUrl + info.photo"/>
 
                            </div>
                            <div class="modal-img" v-else>
                                <img src="../../images/defaultHeader.jpg"/>
                            </div>
                        </div>

                        <div style="text-align:center;margin-top:10px;">
                          <Button @click="uploadPhoto"  type="info" >上传头像</Button>
                        </div>
                        <!-- <div style="text-align:center;margin-top:10px;">
                          <Button @click="uploadQrCode" v-show="isAdmin"  type="info" >上传系统支付二维码</Button>
                        </div> -->
 
                    </Col> 
                    <Col span="18">
                      <Row>
                        <Col span="12">
                            <FormItem label="登录用户名：">
                              <Input v-model="info.username" readonly/>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="登录密码：">
                                <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                            </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span="12">
                            <FormItem label="真实姓名：">
                              <Input v-model="info.name" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="性别：">
                              <RadioGroup v-model="info.sex" type="button">
                                  <Radio label="1">男</Radio>
                                  <Radio label="0">女</Radio>
                              </RadioGroup>
                            </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span="12">
                            <FormItem label="身份证号：">
                              <Input v-model="info.sfz" />
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="手机号：">
                              <Input v-model="info.mobile" />
                            </FormItem>
                        </Col>
                      </Row>
                      <Row>
                        <Col span="12" >
                            <FormItem label="执法号：">
                                <Input v-model="ext.code" />
                            </FormItem>
                        </Col>
                        <Col span="12" >
                            <FormItem label="执法机关：">
                                <Input v-model="ext.department" />
                            </FormItem>
                        </Col>
                      </Row>
                      <!-- <Row>
                        <Col span="12">
                            <FormItem label="执法同伴：">
                                <Input v-model="ext.partner" /> 
                            </FormItem>
                        </Col>
                        <Col span="12" >
                            <FormItem label="同伴执法号：">
                                <Input v-model="ext.partnerCode" />
                            </FormItem>
                        </Col>
                      </Row> -->
                    </Col>    
                </Row>

                <div class="button-wrap">
                    <Button type="info" style="width: 200px;" @click="cancelEditUserInfor">返回</Button>
                    <Button type="primary" style="width: 200px;margin-left:100px" :loading="save_loading" @click="saveUserInfo">保存</Button>
                </div>
            </Form>
          </div>
      </Card>
      <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
          <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
          <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
              <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                  <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
              </FormItem>
              <FormItem label="新密码" prop="newPass">
                  <Input v-model="editPasswordForm.newPass" type="password" placeholder="请输入新密码，至少6位字符" ></Input>
              </FormItem>
              <FormItem label="确认新密码" prop="rePass">
                  <Input v-model="editPasswordForm.rePass" type="password" placeholder="请再次输入新密码" ></Input>
              </FormItem>
          </Form>
          <div slot="footer">
              <Button type="text" @click="editPasswordModal = false">取消</Button>
              <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
          </div>
      </Modal>

      <MyImageEditor v-model="imageEditorModal" @on-ok="savePhoto"></MyImageEditor>
      <updateInfo v-model="updateInfoModal" :title="'同步数据入口。只有admin账户展示入口。请谨慎操作'"></updateInfo>
    </div>
</template>

<script>
import MyImageEditor from "@/views/components/image-editor/my-image-editor.vue";
import updateInfo from "./components/update-info.vue";
export default {
  name: "ownspace_index",
  data() {
    const valideRePassword = (rule, value, callback) => {
      if (value !== this.editPasswordForm.newPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    return {
      prependImgUrl: this.$basePath +"/$admin/attachs/stream/",
      showPhoto: false,
      info: {}, // 用户信息
      ext: {
        partners: []
      }, // 扩展信息
      imageEditorModal: false,
      qrCodeModal: false,
      updateInfoModal: false,
      save_loading: false,
      editPasswordModal: false, // 修改密码模态框显示
      savePassLoading: false,
      oldPassError: "",
      inforValidate: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      editPasswordForm: {
        oldPass: "",
        newPass: "",
        rePass: ""
      },
      passwordValidate: {
        oldPass: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 6, message: "请至少输入6个字符", trigger: "blur" },
          { max: 32, message: "最多输入32个字符", trigger: "blur" }
        ],
        rePass: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          { validator: valideRePassword, trigger: "blur" }
        ]
      }
    };
  },
  computed:{
    shipOwnerPhotos () {
      return this.$store.getters.getDictList("needCheck");
    },
    isAdmin () {
      if("admin" == this.$store.state.user.userInfo.username){
        return true;
      }
      return false;
    },
  },
  components: {
    MyImageEditor,
    updateInfo
  },
  methods: {
    isEmpty(s){
        if(s == null || s == "" || s == undefined){
            return true;
        }
        return false;
    },
    showEditPassword() {
      this.$refs["editPasswordForm"].resetFields();
      this.editPasswordModal = true;
    },
    cancelEditUserInfor() {
      this.$router.go(-1)
      // this.$store.commit("removeTag", "ownspace_index");
      // localStorage.pageOpenedList = JSON.stringify(
      //   this.$store.state.app.pageOpenedList
      // );
      // let lastPageName = "";
      // if (this.$store.state.app.pageOpenedList.length > 1) {
      //   lastPageName = this.$store.state.app.pageOpenedList[1].name;
      // } else {
      //   lastPageName = this.$store.state.app.pageOpenedList[0].name;
      // }
      // this.$router.push({
      //   name: lastPageName
      // });
    },
    savePhoto(value){
      if(this.qrCodeModal){
        this.qrCodeModal = false;
        this.saveQrCode(value);
        return;
      }
      this.info.photo = value.data.id;
      this.showPhoto = true;

    },
    saveQrCode(value){
      
      console.log(value);
      let data = {
        id:"330300",
        areaId: "330300",
        areaName: "温州市",
        pic: value.data.id,
        picUrl: value.data.url,
      }
      this.$http
        .post("/enanny/qrcode/save", data)
        .then(res => {
          if (res.success) {
            this.$Message.info("操作成功");
          } else {
            this.$Message.info("保存失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveUserInfo() {
      this.info.ext = JSON.stringify(this.ext);
      this.$http
        .patch("/$admin/users/updateWithView", this.info)
        .then(res => {
          if (res.success) {
            this.$Message.info("操作成功");
            this.reloadUser();
          } else {
            this.$Message.info("保存失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveEditPass() {
      this.$refs["editPasswordForm"].validate(valid => {
        if (valid) {
          this.savePassLoading = true;
          let params = new URLSearchParams();
          params.append("pwd", this.editPasswordForm.newPass);
          params.append("oldPwd", this.editPasswordForm.oldPass);
          this.$http
            .patch("/$admin/users/modifyPwd", params)
            .then(res => {
              if (res.success) {
                this.editPasswordModal = false;
              } else {
                this.editPasswordModal = false;
                this.$Message.error(res.msg);
              }
              this.savePassLoading = false;
            })
            .catch(error => {
              this.$Message.error("系统异常，请稍后重试！");
              this.savePassLoading = false;
            });
        }
      });
    },
    init() {
      this.$http
        .get("/$admin/users/" + this.$store.state.user.userInfo.userId)
        .then(res => {
          if (res.success) {
            if (!this.$util.isNull(res.data.ext)) {
              this.ext = JSON.parse(res.data.ext);
            }
            this.info = res.data;
            if(!this.isEmpty(this.info.photo)){
              this.showPhoto = true;
            }
          } else {
            console.log(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    uploadQrCode(){
      this.imageEditorModal = true;
      this.qrCodeModal = true;
    },
    uploadPhoto(){
      this.imageEditorModal = true;
    },
    reloadUser(){
      this.$http
        .get("/authentication/me")
        .then(res => {
          if (res.success) {
            this.$store.commit('setUserInfo',res.data);
          } else {
            console.log(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
      
    },
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.modal-img{
  border-radius: 50%;
}
.button-wrap{
  text-align: center;
  margin: 15px 0;
}
.modal-img{
  box-shadow: none;
  display: flex;
  flex-direction: column;
}
.user-photo{
  justify-content: center;
  display: flex;
  margin-top: 16px;
}
</style>

