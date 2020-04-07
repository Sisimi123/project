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
            <Row>
              <Col span="24">
                  <Form-item label="标题:" prop="title" >
                      <Input v-model="info.title" readonly/>
                  </Form-item>
              </Col>
            </Row>
            <div>
                <fieldset class="title">
                    <legend>*消分人员列表</legend>
                </fieldset>
                  <template v-for="(item,index) in info.users">
                  <div :key="item.id">
                      <Row>
                          <Col span="6">
                              <Form-item :label="'人员'+(index+1)+':'">
                                  <Input v-model="item.userName" readonly></Input> 
                              </Form-item>
                          </Col>
                          <Col span="5">
                              <Form-item label="身份类型:">
                                  <Input :value="idCardTypeDic(index)"  readonly></Input> 
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="证件号:">
                                  <Input v-model="item.idCard"  readonly></Input> 
                              </Form-item>
                          </Col>
                          <Col span="5">
                              <Form-item label="当前剩余记分:">
                                  <Input v-model="item.currentScore" readonly></Input> 
                              </Form-item>
                          </Col>

                      </Row>
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
                          <Form-item label="申请消分:">
                              <Input v-model="info.applyScore" readonly>
                                <span slot="append"> 分 </span>
                              </Input>
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

    <Modal :width="400" v-model="doubleConfirm" title="关闭订单原因" :scrollable=true>
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
        .post("/enforces/shipscoreclear/check", params)
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
        .get("/enforces/shipscoreclear/" + this.id)
        .then(res => {
          this.info = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    idCardTypeDic(index) {
      if (
        this.isEmpty(this.info.users[index]) ||
        this.isEmpty(this.info.users[index].userType)
      ) {
        return "";
      } else {
        return this.$store.getters.getDictName(
          "shipscore_idcardtype",
          this.info.users[index].userType
        );
      }
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
</style>


