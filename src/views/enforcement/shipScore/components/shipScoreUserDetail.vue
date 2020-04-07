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
          <Button type="info" @click="handleOk">关闭</Button>
        </div>
        <div style="padding:8px 12px 0px 0px">
            <Tabs type="card" ref="tabsinfo" v-model="initial">
                <TabPane label="基本信息" name="initial">
                    <Form :label-width="120" :model="info" ref="info">
                        <Row>
                            <Col span="8">
                                <Form-item label="用户:" >
                                    <Input v-model="info.userName" readonly></Input> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="用户类型:">
                                    <Input v-model="idCardTypeDic" readonly/> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="联系电话:" >
                                    <Input v-model="info.tel" readonly/>
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="证件号码:" >
                                    <Input v-model="info.userKey.idCard" readonly/> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="是否记满:" >
                                    <Input v-model="isOverDic" readonly/> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="是否安全黑名单:" >
                                    <Input v-model="isBlankDic" readonly/> 
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="当前剩余记分:" >
                                    <Input v-model="info.totalScore" readonly>
                                        <span slot="append">分</span>
                                    </Input>
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Tooltip content="可通过奖分或消分申请流程抵消的分值"  placement="top" :delay="500">
                                   <Form-item label="当前可奖分抵消分:" >
                                        <Input v-model="info.erasableScore" readonly>
                                            <span slot="append">分</span>
                                        </Input> 
                                    </Form-item>
                                </Tooltip>
                            </Col>
                            <Col span="8">
                                <Tooltip content="需通过消分申请流程消除的分值"  placement="top" :delay="500">
                                    <Form-item label="当前不可奖分抵消分:" >
                                        <Input v-model="info.unerasableScore" readonly>
                                            <span slot="append">分</span>
                                        </Input> 
                                    </Form-item>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="累计总记分:" >
                                    <Input v-model="info.sumTotalMark" readonly>
                                        <span slot="append">分</span>
                                    </Input>
                                </Form-item>

                            </Col>
                            <Col span="8">
                                <Tooltip content="可通过奖分或消分申请流程抵消的分值"  placement="top" :delay="500">
                                    <Form-item label="累计记分(可奖分抵消分):" >
                                        <Input v-model="info.sumErasableScore" readonly>
                                            <span slot="append">分</span>
                                        </Input>
                                    </Form-item>
                                </Tooltip>
                            </Col>
                            <Col span="8">
                                <Tooltip content="需通过消分申请流程消除的分值"  placement="top" :delay="500">
                                    <Form-item label="累计记分(不可奖分抵消分):" >
                                        <Input v-model="info.sumUnerasableScore" readonly>
                                            <span slot="append">分</span>
                                        </Input>
                                    </Form-item>
                                </Tooltip>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="当前剩余奖分:" >
                                    <Input v-model="info.surplusRewardScore" readonly>
                                        <span slot="append">分</span>
                                    </Input> 
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Tooltip content="奖分申请累计获得的奖分值"  placement="top" :delay="500">
                                    <Form-item label="累计奖分:" >
                                        <Input v-model="info.sumRewardScore" readonly>
                                            <span slot="append">分</span>
                                        </Input>
                                    </Form-item>
                                </Tooltip>
                            </Col>
                            <Col span="8">
                                <Tooltip content="消分申请流程累计消除的分值"  placement="top" :delay="500">
                                    <Form-item label="累计消分:">
                                        <Input v-model="info.sumClearScore" readonly>
                                            <span slot="append">分</span>
                                        </Input> 
                                    </Form-item>
                                </Tooltip>
                            </Col>


                            <!-- <Col span="8">
                                <Form-item label="周期结算失效的奖分:">
                                    <Input v-model="info.invalidRewardScore" readonly>
                                        <span slot="append">分</span>
                                    </Input> 
                                </Form-item>
                            </Col> -->
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="本周期记满次数:" >
                                    <Input v-model="info.fullTime" readonly>
                                        <span slot="append">次</span>
                                    </Input> 
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                                <Form-item label="历史记满次数记录:" >
                                    <Input v-model="info.fullTimeHistory" type="textarea" :autosize="{minRows: 2,maxRows: 5}" readonly></Input> 
                                </Form-item>
                            </Col>
                        </Row>
                    </Form>
                </TabPane>
                <TabPane label="历史记录" name="name3">
                    <div class="tabPane-shipScore">
                        <Timeline color="blue">
                            <TimelineItem v-for="item in eventList" v-bind:key="item.id">
                                <p class="time">
                                    <span class="time-span">{{item.createTime}}</span>
                                    
                                    <span v-if="item.type == '1'">
                                        <!-- <Tag type="dot" color="error">记分</Tag> -->
                                        <Tag  color="error">记分</Tag>
                                        <Tag  color="error">违反时间:{{item.noteTime}}</Tag>
                                        <Tag v-show="!isEmpty(item.shipName)" color="error">{{item.shipName}}</Tag>
                                        <Tag  color="error">{{item.score}}分</Tag>    
  
                                    </span> 
                                    <span v-if="item.type == '0'">
                                        <!-- <Tag type="dot" color="success">奖分</Tag> -->
                                        <Tag  color="success">奖分</Tag>
                                        <Tag v-show="!isEmpty(item.shipName)" color="primary">{{item.shipName}}</Tag>
                                        <Tag  color="success">{{item.score}}分</Tag>
                                    </span>
                                    <span v-if="item.type == '2'">
                                        <Tag  color="#00DD00">消分</Tag>
                                        <!-- <Tag type="dot" color="success">消分</Tag> -->
                                        <Tag  color="#00DD00">申请分值：{{item.applyScore}}分</Tag>
                                        <Tag  color="#00DD00">实际分值：{{item.score}}分</Tag>
                                    </span>
                                    <span v-if="item.type == '3'">
                                        <!-- <Tag type="dot" color="primary">撤回</Tag> -->
                                        <Tag  color="primary">撤回</Tag>
                                        <Tag  color="primary">记分撤回</Tag>
                                    </span>
                                    <span v-if="item.type == '4'">
                                        <!-- <Tag type="dot" color="warning">修改</Tag> -->
                                        <Tag  color="warning">修改</Tag>
                                        <Tag  color="warning">记分修改重新生成</Tag>
                                    </span>
                                    <span v-if="item.type == '5'">
                                        <!-- <Tag type="dot" color="warning">修改</Tag> -->
                                        <Tag  color="#00AAAA">撤回</Tag>
                                        <Tag  color="#00AAAA">奖分撤回</Tag>
                                    </span>
                                    <span v-if="item.type == '6'">
                                        <!-- <Tag type="dot" color="warning">修改</Tag> -->
                                        <Tag  color="#BBBB00">撤回</Tag>
                                        <Tag  color="#BBBB00">消分撤回</Tag>
                                    </span>
                                </p>
                                <p class="content">原因：{{item.reason}}</p>
                                
                            </TimelineItem>
                        </Timeline>
                    </div>
                </TabPane>
            </Tabs>
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
      default: ""
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
    idCard: {
      type: String,
      default: ""
    },
    userType: {
      type: String,
      default: ""
    }
  },
  computed: {
    idCardTypeDic() {
      if (this.isEmpty(this.info.userKey.userType)) {
        return "";
      } else {
        return this.$store.getters.getDictName(
          "shipscore_idcardtype",
          this.info.userKey.userType
        );
      }
    },
    isOverDic() {
      if (this.isEmpty(this.info.isOver)) {
        return "";
      } else {
        return this.info.isOver === "1" ? "是" : "否";
      }
    },
    isBlankDic() {
      if (this.isEmpty(this.info.isBlank)) {
        return "";
      } else {
        return this.info.isBlank === "1" ? "是" : "否";
      }
    }
  },
  data() {
    return {
      visible: false,

      initial: "initial",
      info: {
        userName: "", // 姓名
        tel: "", // 联系电话
        totalScore: "", // 当前分数
        isBlank: "", // 是否安全黑名单用户    0 否；1 是
        isOver: "", // 是否已记满	0 否； 1 是
        sumUnerasableScore: 0, // 累计记分（不可奖分抵消分）
        sumErasableScore: 0, // 累计记分（可奖分抵消分）
        sumClearScore: 0, // 累计消分
        invalidRewardScore: 0, // 无效奖励分（周期结束后计算）
        sumRewardScore: 0, // 累计奖分
        surplusRewardScore: 0, // 剩余奖分值
        unerasableScore: 0, // 当前不可奖分抵消分
        erasableScore: 0, // 当前可奖分抵消分
        fullTime: 0, // 记满次数 船长、船东记满12分累加；公司 记满24分累加
        userKey: {},

        totalScore: 0, //当前分 手动计算
        sumTotalMark: 0 // 累计总记分 手动计算
      },
      eventList: []
    };
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
        .get("/enforces/shipscoreuser/info", {
          params: {
            idCard: this.idCard,
            userType: this.userType
          }
        })
        .then(res => {
          if (res.success) {
            this.info = res.data;
            this.info.totalScore =
              this.info.erasableScore + this.info.unerasableScore;
            this.info.sumTotalMark =
              this.info.sumErasableScore + this.info.sumUnerasableScore;
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.$http
        .get("/enforces/shipscorehistory/listinfo", {
          params: {
            idCard: this.idCard,
            userType: this.userType
          }
        })
        .then(res => {

          this.eventList = res.data;
          // this.info = res.data;
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
        this.initial = "initial";
        this.visible = val;
        this.handleSearch();
      }
    }
  }
};
</script>
<style scoped>

</style>


