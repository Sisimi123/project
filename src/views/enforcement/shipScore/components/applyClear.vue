<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>
<!-- 消分申请 -->
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
        <div slot="footer" >
            <Button  @click="handleCancel">返回</Button>
            <Button type="primary"  @click="doubleCheck">确认</Button>
        </div>
        <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
          <Row>
            <Col span="24">
                <Form-item label="标题:" prop="title" >
                    <Input v-model="info.title" />
                </Form-item>
            </Col>
          </Row>
          <div>
              <fieldset class="title">
                  <legend>*消分人员列表</legend>
                  <Button size="small"  @click="handleSelectUser()" type="info">添加+</Button>
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
                        <Col span="7">
                            <Form-item label="证件号:">
                                <Input v-model="item.idCard"  readonly></Input> 
                            </Form-item>
                        </Col>
                        <!-- <Col span="6">
                            <Form-item label="类型:">
                                <Input v-model="item.idCard"  readonly></Input> 
                            </Form-item>
                        </Col> -->
                        <Col span="4">
                            <Form-item label="当前剩余记分:">
                                <Input v-model="item.currentScore"  readonly></Input> 
                            </Form-item>
                        </Col>
                        <Col span="2">
                            &nbsp;&nbsp;
                            <Button @click="deleteUser(index)" type="error" >移除</Button>
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
                      <Form-item label="申请消分值:"  prop="applyScore">
                          <Input v-model="info.applyScore" >
                            <span slot="append">分</span>
                          </Input>
                      </Form-item>
                  </Col>
                  <Col span="8">
                      <Form-item label="审核人:" prop="auditor">
                          <Input v-model="info.auditor" readonly>
                              <Button slot="append"  @click="handleSelectAuditor()">选择</Button>
                          </Input>
                      </Form-item>
                  </Col>
              </Row>
              <Row>
                  <Col span="24">
                      <Form-item label="申请说明:" prop="applyReason">
                          <Input v-model="info.applyReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" />
                      </Form-item>
                  </Col>
              </Row>
          </div>
        </Form>
    </Modal>

    <Modal :width="820" v-model="status.selectUser" title="人员查询" :scrollable=true>
      <div slot="footer">
          <Button type="info" @click="status.selectUser = false">关闭</Button>
      </div>
      <Row>
        <div>
          <span>用户：</span>
          <Input v-model="query.wheres.userName_like" @on-change="selectModal1(1)"  icon="ios-search" style="width:30%" placeholder="请输入..."></Input>
          <!-- <Button style="margin-left:5px" @click="selectModal1(1)" type="info" icon="ios-search" shape="circle">搜索</Button> -->
        </div>
      </Row>
      <Row>
        <div style="margin-top:10px">
          <Table :loading="status.selectModal1loading" :columns="columnsModal1" :data="selectList" border :height="300"></Table>
        </div>
      </Row>
      <Row>
        <div class="bottom">
            <Page show-total :total="totalNum" show-sizer 
          placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
          :current="query.page" @on-change="changePage" ></Page>
        </div>
      </Row>
    </Modal>

    <!-- <deptUsers 
    v-model="status.show" 
    okText="确定"
    @on-ok="selectedAuditor"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></deptUsers> -->
    <userselectModal v-model="userselect.show" 
        :selectIds="userselect.selectIds" 
        :deptIds="userselect.deptIds" 
        :roleIds="userselect.roleIds"  
        :selectMySelf=false
        :deptTypes="'30,45'"
        @on-select-change="selectedAuditor"
    ></userselectModal>
    

    <pic v-model="imgVisible" :img="imgUrl"></pic>

    <Modal v-model="status.selectEvent" width="630" title="条款选择" @on-ok="selectedEvent()" :scrollable=true :mask-closable="true">
        <div style="width:600px; overflow: auto">
            <Tree :data="eventTree" show-checkbox @on-check-change="onCheckChange"></Tree>
        </div>
    </Modal>
</div>
</template>

<script>
import userselectModal from '@/views/components/workflow/userselectModal.vue'
import * as validate from "../../../validateRule/validate.js";
import pic from "@/views/components/pic/pic.vue";
export default {
  name: "applyClear",
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
      default: false
    },
    title: {
      type: String,
      default: "消分申请"
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
    selectedList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    userselectModal,
    pic
  },
  computed: {
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    }
  },
  data() {
    return {
      options: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return new Date();
            },
            onClick: picker => {
              // this.$Message.info('Click today');
            }
          },
          {
            text: "昨天",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              // this.$Message.info('Click yesterday');
            }
          }
        ]
      },
      visible: false,
      info: {
        idCard: "", // 身份证号
        idCardType: "", // 用户类型； 0 船东；1 船长；2 公司
        userName: "", // 申请人
        userTel: "", // 申请人电话

        applyScore: 0, // 本次消除分值
        applyTime: "", // 时间
        applyReason: "", // 理由

        submitter: "", // 操作人
        auditorId: "", // 审核人id
        auditor: "", // 审核人
        shipName: "", // 渔船名
        users: []
      },
      infoRules: {
        title: [
          {
            required: true,
            type: "string",
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        applyReason: [
          {
            required: true,
            type: "string",
            message: "请输入申请具体原因",
            trigger: "blur"
          }
        ],
        applyScore: [
          {
            required: true,
            type: "number",
            validator: validate.positiveInteger,
            trigger: "change"
          }
          // { validator: validate.validate_sjh, trigger: "blur" }
        ],
        auditor: [
          {
            required: true,
            type: "string",
            message: "请选择审核人",
            trigger: "change"
          }
        ]
      },
      userselect:{
          show:false,
          deptIds:"",
          roleIds:"ShipScoreAdmin",
          selectIds:"",
      },
      status: {
        selectEvent: false,
        selectUser: false,
        selectModal1loading: false,
        show: false
      },
      eventTree: [],
      treeQuery: {
        key: "getScoreItemTreeWithScore"
      },
      query: {
        page: 1,
        size: 10,
        wheres: {
          userName_like: ""
        }
      },
      totalNum: 1,
      columnsModal1: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          key: "userName",
          title: "用户",
          align: "center",
          width: 120
        },
        {
          key: "userKey.userType",
          title: "用户类型",
          align: "center",
          width: 100,
          render: (h, params) => {
            var value = this.$store.getters.getDictName(
              "shipscore_idcardtype",
              params.row.userKey.userType
            );
            var c = "blank";
            if (value == "船长") {
              c = "blue";
            } else if (value == "船东") {
              c = "red";
            } else {
              // 默认
            }

            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              value
            );
          }
        },
        {
          key: "userKey.idCard",
          title: "证件号",
          align: "center",
          width: 170,
          render: (h, params) => {
            return h("span", params.row.userKey.idCard);
          }
        },
        // {
        //   key: "totalScore",
        //   title: "总记分",
        //   align: "center",
        //   width: 100,
        //   render: (h, params) => {
        //     return h("span", params.row.userKey.idCard);
        //   }
        // },
        {
          key: "erasableScore",
          title: "当前剩余记分",
          align: "center",
          render: (h, params) => {
            var value = params.row.unerasableScore + params.row.erasableScore;
            return h("span", value);
          }
        },
        // {
        //   key: "unerasableScore",
        //   title: "非申请消除分",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    var value =
                      params.row.unerasableScore + params.row.erasableScore;
                    if (value == 0) {
                      this.$Message.error("该用户当前剩余记分为 0 分");
                      return;
                    }
                    this.selectedUser(params.row);
                  }
                }
              },
              "添加+"
            );
          }
        }
      ],
      selectList: [],
      limitScore: 1,
      uploadList: [],
      actionUrl: this.$basePath + "/$admin/attachs/",
      actionData: {
        moduleId: "shipscoreclear"
      },
      imgUrl: "",
      imgVisible: false
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
    doubleCheck() {
      if (this.isEmpty(this.info.users)) {
        this.$Message.error("请至少添加一个消分人员！");
        return;
      }

      this.$refs["info"].validate(valid => {
        if (valid) {
          this.handleOk();
        }
      });
    },
    handleOk() {
      let params = new URLSearchParams();
      params.append("event", JSON.stringify(this.info));

      this.$http
        .post("/enforces/shipscoreclear/apply", params)
        .then(res => {
          if (res.success) {
            this.$Message.success("操作成功");
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
    handleSelectAuditor() {
      this.userselect.show = true;
    },
    handleSelectUser() {
      this.status.selectUser = true;
      this.selectModal1();
    },
    selectModal1(value) {
      if (value == 1) {
        this.query.page = "1";
      }
      this.status.selectModal1loading = true;
      this.$http
        .get("/enforces/shipscoreuser/page", {
          params: {
            query: JSON.stringify(this.query)
          }
        })
        .then(res => {
          this.totalNum = res.data.total;
          this.selectList = res.data.data;
          this.status.selectModal1loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteUser(index) {
      this.info.users.splice(index, 1);
    },
    selectedUser(item) {
      // 重复判断
      for (const key in this.info.users) {
        if (this.info.users.hasOwnProperty(key)) {
          const element = this.info.users[key];
          if (
            element.idCard === item.userKey.idCard &&
            element.userType === item.userKey.userType
          ) {
            this.$Message.error("请勿重复添加相同的人员！");
            return;
          }
        }
      }

      var user = {
        idCard: item.userKey.idCard,
        userType: item.userKey.userType,
        userName: item.userName,
        currentScore: item.erasableScore + item.unerasableScore
      };
      this.info.users.push(user);
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
    selectedAuditor(item) {
      this.info.auditor = item[0].title;
      this.info.auditorId = item[0].id;
    },
    handleSelectEvent() {
      if (this.isEmpty(this.info.idCard)) {
        this.$Message.info("请您先指定申请人。");
        return;
      }
      this.$http
        .get("/enforces/shipscoreitem/tree", {
          params: {
            query: JSON.stringify(this.treeQuery)
          }
        })
        .then(res => {
          if (res.success) {
            var tree = res.data;
            this.eventTree = tree[1].children;
            this.status.selectEvent = true;
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectedEvent() {
      if (this.$util.isNull(this.selectEvents)) {
        return;
      }
      this.uploadList = [];
      this.info.matter = [];
      this.selectEvents.forEach(element => {
        // 过滤无效父节点
        if (this.$util.isNull(element.children)) {
          var matter = {
            title: element.title,
            shipownerScore: element.shipownerScore,
            captainScore: element.captainScore,
            companyScore: element.companyScore,
            type: element.type,
            countervailable: element.countervailable
          };
          this.info.matter.push(matter);
          this.uploadList.push([]);
        }
      });
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
        name: response.data.name,
        dataId: response.data.id,
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };

      this.uploadList[index].push(attr);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      return true;
    },
    reset() {
      this.$refs["info"].resetFields();

      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (key == "users") {
            this.info[key] = [];
          } else if (key == "applyScore") {
            this.info[key] = 0;
          } else {
            this.info[key] = "";
          }
        }
      }
      this.uploadList = [];
      this.info.submitter = this.defaultUserName;
    },
    onCheckChange(items) {
      this.selectEvents = items;
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    pageSizeChange(size) {
      this.query.size = size;
      //this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.selectModal1();
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
        //this.checkAble();
        this.reset();
        this.visible = val;
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
  float: left;
}
fieldset.title button {
  left: 150px;
  top: 0;
}
fieldset.titleB {
  border: none;
  position: relative;
}
fieldset.titleB legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 18px;
  float: left;
}
fieldset.titleB button {
  left: 170px;
  top: 0;
}
.event-content {
  margin-top: 10px;
  max-height: 160px;
  overflow: auto;
}

.demo-auto-complete-item {
  padding: 4px 0;
  border-bottom: 1px solid #f6f6f6;
  max-height: 200px;
  overflow: auto;
}
.demo-auto-complete-group {
  font-size: 12px;
  padding: 4px 6px;
}
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.demo-auto-complete-group a {
  float: right;
}
.demo-auto-complete-count {
  float: right;
  color: #999;
}
.bottom {
  padding-top: 10px;
  overflow: hidden;
}
.ivu-page {
  float: right;
}
</style>