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
          <Button  @click="handleCancel">返回</Button>
          <Button type="info" @click="handleOk">确定</Button>
        </div>
        <div>
            <Form :label-width="120" :model="info" ref="info">
                <div>
                    <fieldset class="title">
                        <legend>*用户信息</legend>
                    </fieldset>
                    <div>
                        <Row>
                            <Col span="8">
                                <Form-item label="用户" >
                                    <Input v-model="info.userName" readonly></Input> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="身份类型:" >
                                    <Input v-model="idCardTypeDic" readonly></Input> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="所属渔船:" >
                                    <Input v-model="info.shipName" readonly></Input> 
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="联系电话:">
                                    <Input v-model="info.userTel" readonly/>
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="身份证或企业注册号:">
                                    <Input v-model="info.idCard" readonly/>
                                </Form-item>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div>
                    <fieldset class="title">
                        <legend>
                            *其他信息
                        </legend>
                    </fieldset>
                    <div>
                        <Row>
                            <Col span="8">
                                <Form-item label="处理人:">
                                <!-- <Form-item label="操作人/审核人:"> -->
                                    <Input v-model="info.operator" readonly/>
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="本次消分:">
                                    <Input v-model="info.clearScore" readonly/>
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="处理时间:">
                                    <DatePicker type="datetime" v-model="info.applyTime" readonly></DatePicker>
                                </Form-item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                                <Form-item label="消分事由:">
                                    <Input v-model="info.applyReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" readonly/>
                                </Form-item>
                            </Col>
                        </Row>
                    </div>

                </div>
            </Form>
        </div>
    </Modal>
</div>
</template>

<script>
export default {
  name: "shipScoreUserDetail",
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
      default: ""
      // default:"vertical-center-modal"
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
    detailData: {},
    idCard: {
      type: String,
      default: ""
    },
    userType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,

      initial: "initial",
      info: {},
      eventList: []
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
    handleOk() {
      this.ok();
    },
    handleSearch() {
      this.$http
        .get("/enforces/shipscoreclear/info", {
          params: {
            idCard: this.idCard,
            userType: this.userType
          }
        })
        .then(res => {
          this.info = res.data;
        })
        .catch(error => {
          console.log(error);
        });
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
        if (!this.isEmpty(this.detailData)) {
          this.info = this.detailData;
          return;
        }
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
</style>


