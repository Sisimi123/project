<style lang="less">
@import "../../../../styles/commonStyle.less";
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
        @on-ok="handleOk"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <slot name="close"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>

        <div slot="footer">
          
          <template v-if="canAudite">
            <Button  @click="handleCancel">返回</Button>
            <Button type="error" @click="handleNotAccess">驳回</Button>
            <Button type="success" @click="handleAccess">审核通过</Button>
          </template>
          <template v-else>
            <Button type="info" @click="handleCancel">关闭</Button>
          </template>
          
        </div>
        <div>
          <Form :label-width="100" :model="info" ref="info">
              <div>
                  <fieldset class="title">
                      <legend>*申请人信息</legend>
                      <!-- <Button size="small"  @click="handleSelectUser()" type="error">申请人选择</Button> -->
                  </fieldset>
                  <template v-if="!isEmpty(info.userName)">
                      <Row>
                          <Col span="8">
                              <Form-item label="申请人:" >
                                  <Input v-model="info.userName" readonly/>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="申请人身份:" >
                                  <Input v-model="idCardTypeDic" readonly/>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="证件号:" >
                                  <Input v-model="info.idCard" readonly/>
                              </Form-item>
                          </Col>
                      </Row>
                      <Row>
                          <Col span="8">
                              <Form-item label="联系电话:" >
                                  <Input v-model="info.userTel" />
                              </Form-item>
                          </Col>
                          <!-- <Col span="8">
                              <Form-item label="所属渔船:" >
                                  <Input v-model="info.shipName"></Input> 
                              </Form-item>
                          </Col> -->
                      </Row>
                  </template>
              </div>
              <div>
                <fieldset class="title">
                  <legend>*奖分事件信息</legend>
                </fieldset>
                 <template v-for="(item,index) in info.matter">
                    <div :key="item.id">
                        <div>
                            <Row>
                                <Col span="18">
                                    <Form-item :label="'事项'+(index+1)+':'" >
                                        <Input v-model="item.title" type="textarea" :autosize="{minRows: 1,maxRows: 3}" readonly></Input> 
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label="奖分:">
                                      <template v-if="idCardTypeDic =='船长'">
                                        <Input v-model="item.captainScore"  readonly>
                                          <span slot="append">分</span>
                                        </Input>
                                      </template>
                                      <template v-else-if="idCardTypeDic =='公司'">
                                        <Input v-model="item.companyScore"  readonly>
                                          <span slot="append">分</span>
                                        </Input>
                                      </template>
                                      <template v-else>
                                        <Input v-model="item.shipownerScore"  readonly>
                                          <span slot="append">分</span>
                                        </Input>
                                      </template>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row v-if="!isEmpty(item.imgUrlList)">
                                <Form-item label="附件:" >
                                    <div class="markScore-upload-list" v-for="url in getImgUrl(item)" v-bind:key="url">
                                          <img :src="url">
                                          <div class="markScore-upload-list-cover">
                                              <Icon type="ios-eye-outline" @click.native="handleView(url)"></Icon>
                                          </div>
                                    </div>
                                </Form-item>
                            </Row>
                        </div>
                    </div>
                  </template>
              </div>
              <div class="margin-top-10">
                  <fieldset class="title">
                      <legend>*审核相关信息</legend>
                  </fieldset>
                  <Row>
                      <Col span="8">
                          <Form-item label="提交人:" >
                              <Input v-model="info.submitter" readonly/>
                          </Form-item>
                      </Col>
                      <Col span="8">
                          <Form-item label="申请奖分:">
                              <Input v-model="info.applyScore" readonly>
                                <span slot="append"> 分 </span>
                              </Input>
                              <!-- <InputNumber :max="limitScore" :min="0" v-model="info.applyScore"></InputNumber> -->
                          </Form-item>
                      </Col>
                      <Col span="8">
                          <Form-item label="提交时间:" >
                              <DatePicker type="datetime" v-model="info.applyTime" readonly></DatePicker>
                          </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="8">
                          <Form-item label="审核人:" >
                              <Input v-model="info.auditor" readonly>
                                  <!-- <Button slot="append"  @click="handleSelectAuditor()">选择</Button> -->
                              </Input>
                          </Form-item>
                      </Col>
                      <Col span="8">
                          <Form-item label="审核状态:" >
                              <Input v-model="eventTypeDic" readonly>
                              </Input>
                          </Form-item>
                      </Col>
                      <Col span="8" v-if="info.eventType != '0'">
                          <Form-item label="审核时间:" >
                            <DatePicker type="datetime" v-model="info.auditorTime" readonly></DatePicker>
                          </Form-item>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="24">
                          <Form-item label="申请说明:">
                              <Input v-model="info.applyReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" readonly/>
                          </Form-item>
                      </Col>
                  </Row>
                  <Row v-if="info.eventType != '0'">
                      <Col span="24">
                          <Form-item label="审核结果:">
                              <Input v-model="info.eventReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" readonly/>
                          </Form-item>
                      </Col>
                  </Row>
              </div>
          </Form>
        </div>
    </Modal>

    <Modal :width="400" v-model="doubleConfirm" title="驳回" :scrollable=true>
        <div slot="footer" >
          <Button  @click="doubleConfirm = false">返回</Button>
          <Button type="primary"  @click="editInfo()">确定</Button>
        </div>
        <div>
          <Row>
            <Alert type="info" show-icon>请填写审核结果说明...</Alert>
          </Row>
          <Row>
            <i-col span="24">
              <Input v-model="eventReason_save" type="textarea" :autosize="{minRows: 2,maxRows: 3}"></Input>
            </i-col>
          </Row>
        </div>
      </Modal>
      <pic v-model="imgVisible" :img="imgUrl"></pic>
</div>
</template>

<script>
import pic from "@/views/components/pic/pic.vue";
export default {
  name: "shipScoreUserDetail",
  components: {
    pic
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
      default: true
    },
    title: {
      type: String,
      default: "详情"
      // default: ""
    },
    width: {
      type: [Number, String],
      default: 960
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
      type: String,
      // default: ""
      default: "vertical-center-modal"
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
    //-----------------------------------------------
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,

      initial: "initial",
      info: {},
      uploadList: [],
      imgUrl: "",
      imgVisible: false,
      eventType_save: "",
      eventReason_save: "",
      doubleConfirm: false
    };
  },
  computed: {
    idCardTypeDic() {
      if (this.isEmpty(this.info.idCardType)) {
        return "";
      } else {
        return this.$store.getters.getDictName(
          "shipscore_idcardtype",
          this.info.idCardType
        );
      }
    },
    eventTypeDic() {
      if (this.isEmpty(this.info.eventType)) {
        return "";
      } else {
        return this.$store.getters.getDictName(
          "shipscore_eventType",
          this.info.eventType
        );
      }
    },
    canAudite() {
      if (
        this.info.eventType == "0" &&
        this.info.auditorId == this.$store.state.user.userInfo.userId
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    ok() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    handleCancel() {
      this.cancel();
    },
    handleAccess() {
      this.eventType_save = "1";
      this.eventReason_save = "审核通过。";
      this.doubleConfirm = true;
    },
    handleNotAccess() {
      this.eventType_save = "2";
      this.eventReason_save = "审核未通过。";
      this.doubleConfirm = true;
    },
    editInfo() {
      this.doubleConfirm = false;

      let params = new URLSearchParams();
      params.append("id", this.info.id);
      params.append("type", this.eventType_save);
      params.append("reason", this.eventReason_save);
      this.$http
        .post("/enforces/shipscoreapply/check", params)
        .then(res => {
          if (res.success) {
            this.ok();
          } else {
            this.$Message.info(res.msg);
            this.cancel();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleOk() {
      this.ok();
    },
    handleSearch() {
      this.uploadList = [];
      this.initial = "initial";

      this.$http
        .get("/enforces/shipscoreapply/" + this.id)
        .then(res => {
          this.info = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getImgUrl(item) {
      var idList = item.imgUrlList.split(",");
      var urlList = [];
      idList.forEach(element => {
        let url = this.$basePath + "/$admin/attachs/stream/" + element;
        urlList.push(url);
      });
      return urlList;
    },
    handleView(url) {
      this.imgUrl = url;
      this.imgVisible = true;
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    this.visible = false;
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
        this.handleSearch();
      }
    }
  }
};
</script>
<style scoped>
fieldset.title {
  border: none;
  position: relative;
}
fieldset.title legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 18px;
}
fieldset.title button {
  position: absolute;
  left: 200px;
  top: 0;
}

.ivu-tabs-tabpane {
  overflow: auto;
}
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


