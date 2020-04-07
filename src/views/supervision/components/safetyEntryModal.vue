<style lang="less">
.imageBox {
  float: left;
  margin-left: 10px;
}
.imageBox span {
  font-size: 14px;
}
.showSignature {
  color: blue;
  cursor: pointer;
  font-size: 12px !important;
}
</style>

<template>
  <Modal
    class-name="testModal"
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
    @on-visible-change="visibleChange"
  >
    <Form :label-width="120" :model="info" ref="info">
      <Row>
        <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
        <span icon="ios-add" class="title">基本信息</span>
      </Row>
      <Row v-if="isSpecial" style="margin-top:10px">
        <Col span="12">
          <Form-item label="任务名称:">
            <Input v-model="info.taskSourceName" :readonly="true"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="任务编号:">
            <Input v-model="info.taskCode" :readonly="true"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="12">
          <Form-item label="被检查对象:">
            <Input v-model="info.legalEntityName" :readonly="true"></Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="地址:">
            <Input v-model="info.regAddress" :readonly="true"></Input>
          </Form-item>
        </Col>
          <Col span="12">
          <Form-item label="法人代表人/负责人:">
            <Input v-model="info.leRep" :readonly="true"></Input>
          </Form-item>
        </Col>
        <template v-if="'EQUIPMENT' === info.checkObjectType && ext">
          <Col span="12">
            <Form-item label="船长（米）:">
              <Input v-model="ext.shipLength" :readonly="true"></Input>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="主机功率（千瓦）:">
              <Input v-model="ext.power" :readonly="true"></Input>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="作业类型:">
              <Input v-model="ext.worktype" :readonly="true"></Input>
            </Form-item>
          </Col>
        </template>
      </Row>
      <Row>
        <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
        <span icon="ios-add" class="title">检查事项</span>
      </Row>
      <Select :disabled="isView" v-model="formId" @on-change="formIdChange" style="width:200px;" v-show="false">
        <Option v-for="item in formList" :value="item.value" :key="item.value">{{ item.title }}</Option>
      </Select>
      <Row style="margin-top:10px">
        <safetyFormVue
          ref="safetyFormVue"
          :formLookId="formId"
          :taskId="taskid"
          :visible="visible"
          @isSuccess="getStatus"
        ></safetyFormVue>
      </Row>
      <Row style="margin-top:10px">
        <Icon type="ios-folder" size="20" style="margin-bottom:10px"></Icon>
        <span icon="ios-add" class="title">检查确认</span>
      </Row>
      <Row style="margin-top:10px" v-if="!isView">
        <Col span="12">
          <Form-item label="检查人员:">
            <Input v-model="info.checkUserNames">
              <Icon type="ios-add" slot="append" @click="status.selectCheckCrewModal = true"></Icon>
            </Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="短信提醒:">
            <Checkbox v-model="notice"/>
          </Form-item>
        </Col>
      </Row>
      <Row style="margin-top:10px" v-else>
        <Col span="12">
          <Form-item label="检查人员:">
            <template v-for="(item,i) in info.checkSupervisorList">
              <div class="imageBox" :key="i">
                <span>{{item.checkUserName}}</span>
                <span
                  v-if="item.checkSupervisorSignUrl"
                  class="showSignature"
                  @click="showSignature(item.checkSupervisorSignUrl)"
                >查看签名</span>
              </div>
            </template>
          </Form-item>
          <pic v-model="signaturePic" :img="signatureImageUrl"></pic>
        </Col>
      </Row>
      <Row style="margin-top:10px">
        <Col span="12">
          <Form-item label="被检查对象联系人:" :label-width="120">
            <Input v-model="info.userName">
              <Button
                v-if="isSignUrl(info)"
                slot="append"
                @click="showSignature(info.legalSupervisor.signUrl)"
              >签名</Button>
            </Input>
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="检查日期:">
            <DatePicker
              style="width: 450px"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              v-model="info.checkCompleteTime"
              :disabled="isView"
            ></DatePicker>
          </Form-item>
        </Col>
      </Row>
      <!-- <Row style="margin-top:10px" v-else>
        <Col span="12">
          <Form-item label="被检查对象签名:" :label-width="100">
            <Select v-if="info.positionName" v-model="info.positionName" disabled style="width:150px;float:left">
              <Option
                v-for="item in positionList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <template>
              <div class="imageBox">
                <span>{{info.userName}}</span>
                <span
                  class="showSignature"
                  v-if="info.legalSupervisor.signUrl"
                  @click="showSignature(info.legalSupervisor.signUrl)"
                >查看签名</span>
              </div>
            </template>
          </Form-item>
        </Col>
      </Row>
      <Row style="margin-top:10px;">
        <Col span="12">
          <Form-item label="录入人员:">
            <Input v-model="info.enterUserName" :readonly="isView"></Input>
          </Form-item>
        </Col>
      </Row>-->
      <Row style="margin-top:10px" v-if="isCheckNoWhereaboutsShow">
        <Col span="12">
          <Form-item label="是否查无下落:">
            <Input v-model="info.isCheckNoWhereaboutsShow" :readonly="true"></Input>
          </Form-item>
        </Col>
      </Row>
      <Row style="margin-top:10px" v-if="isCheckNoWhereaboutsShow">
        <Col span="24">
          <Form-item label="查无下落原因:">
            <Input
              v-model="info.checkNoWhereaboutsReason"
              :readonly="true"
              type="textarea"
              :rows="2"
            ></Input>
          </Form-item>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button @click="cancel">取消</Button>
      <Button v-if="!isView" type="success" @click="fallOnStonyGround()">查无下落</Button>
      <Button v-if="!isView" type="info" @click="saveInfo()">保存</Button>
    </div>
    <selectCheckCrew v-model="status.selectCheckCrewModal" @selectDiscretionaryPower="selectCrew"></selectCheckCrew>
    <Modal
      :width="1000"
      :scrollable="true"
      :styles="{top: '50px','z-index':1100}"
      v-model="status.fallOnStonyGround"
      title="查无下落"
      :mask-closable="false"
    >
      <Form :label-width="100" :model="noInfo" ref="noInfo">
        <Form-item label="附件上传:">
          <Button @click="status.fileShow = true" type="warning">附件</Button>
        </Form-item>
        <Form-item label="查无下落信息:">
          <Input v-model="noInfo.message" type="textarea" :rows="4" />
        </Form-item>
      </Form>
      <div slot="footer">
        <Button @click="status.fallOnStonyGround=false">取消</Button>
        <Button type="info" @click="saveNoInfo()">保存</Button>
      </div>
      <MultiUpload
        @getUrl="getUrlArr"
        :styles="{top: '200px','z-index':99999}"
        :mask-closable="false"
        uploadUrl="/standingbook/attachs/upload"
        v-model="status.fileShow"
        :dataId="taskid"
        moduleId="checkEntry"
      ></MultiUpload>
    </Modal>
  </Modal>
</template>

<script>
import pic from "@/views/components/pic/pic.vue";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import user from "../../../store/module/user";
import selectCheckCrew from "../components/selectCheckCrew.vue";
import safetyFormVue from "../safetyCheckFormSet/components/safetyFormVue";
import MultiUpload from "@/views/components/Upload/MultiUpload.vue";
import { isEmpty, isNull } from "@/libs/common";
export default {
  components: {
    selectCheckCrew,
    safetyFormVue,
    pic,
    MyUpload,
    MultiUpload
  },
  props: {
    isSpecial: {
      type: Boolean,
      default: false
    },
    moduleIdName: {
      type: String,
      default: ""
    },
    isView: {
      type: Boolean,
      default: false
    },
    taskid: {
      type: String,
      default: ""
    },
    info: {
      type: Object,
      default() {
        return {};
      }
    },
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
      default: "录入"
    },
    width: {
      type: [Number, String],
      default: 1200
    },
    okText: {
      type: String,
      default: "保存"
    },
    cancelText: {
      type: String,
      default: "取消"
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
    checkType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // isCheckNoWhereaboutsShow: false,
      showMainCheck: false,
      signaturePic: false,
      signatureImageUrl: "",
      noInfo: {},
      isChange: false,
      userIdArr: [],
      positionList: [
        {
          value: "法人(负责人)",
          label: "法人(负责人)"
        },
        {
          value: "总经理",
          label: "总经理"
        },
        {
          value: "工商联络员",
          label: "工商联络员"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      formList: [],
      sID: "",
      showPicId: "",
      showPic: false,
      datas: [],
      uploadList: [],
      formId: "",
      status: {
        safetyForm: false,
        selectCheckCrewModal: false,
        fallOnStonyGround: false,
        fileShow: false
      },
      cols: [
        {
          title: "序号",
          type: "index",
          align: "center",
          maxWidth: 80
        },
        {
          title: "表单名称",
          key: "formName",
          align: "center"
        },
        {
          title: "检查状态",
          key: "checkStatus",
          align: "center",
          render: (h, params) => {
            var str = "";
            if (params.row.checkStatus === "UNCHECK") {
              str = "未检查";
            } else if (params.row.checkStatus === "INCHECK") {
              str = "检查中";
            } else if (params.row.checkStatus === "COMPLETE_NORMAL") {
              str = "已查正常";
            } else if (params.row.checkStatus === "COMPLETE_ABNORMAL") {
              str = "已查异常";
            }
            return h("span", str);
          }
        },
        {
          title: "状态",
          key: "completeStatus",
          align: "center",
          render: (h, params) => {
            var str = "";
            if (params.row.completeStatus === "1") {
              str = "完结";
            } else if (params.row.completeStatus === "0") {
              str = "未完结";
            }
            return h("span", str);
          }
        },
        {
          title: "录入人员",
          key: "userName",
          align: "center"
        },
        {
          title: "检查日期",
          key: "checkTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    display:
                      params.row.completeStatus === "0"
                        ? "inline-block"
                        : "none"
                  },
                  on: {
                    click: () => {
                      this.luruFun(params.row);
                    }
                  }
                },
                "录入"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    display:
                      params.row.completeStatus === "0" &&
                      params.row.createUserId === user.state.userInfo.userId
                        ? "inline-block"
                        : "none",
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.row);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    display:
                      params.row.completeStatus === "1"
                        ? "inline-block"
                        : "none",
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      // this.handleDelete(params.row);
                      this.luruFun(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    display:
                      params.row.completeStatus === "0" &&
                      params.row.isCheck === "1" &&
                      params.row.createUserId !== user.state.userInfo.userId
                        ? "inline-block"
                        : "none",
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.noChecking(params.row, params.index);
                    }
                  }
                },
                "不检查"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    display:
                      params.row.completeStatus === "0" &&
                      params.row.isCheck === "0"
                        ? "inline-block"
                        : "none",
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.cancelMark(params.row, params.index);
                    }
                  }
                },
                "取消标记"
              )
            ]);
          }
        }
      ],
      visible: false,
      ext: '',
      notice: false
    };
  },
  methods: {
    getFormList() {
      var _self = this;
      _self.$http
        .get(`/supervision/formRelevance/tree`)
        .then(res => {
          if (res.success) {
            _self.formList = res.data.children;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    formIdChange(data) {
      if (data) {
        let _self = this;
        let formidlist = [];
        formidlist.push(data);
        _self.$http
          .post(`/supervision/safetyCheck/addForms`, {
            formIdList: formidlist,
            taskId: _self.taskid
          })
          .then(res => {
            if (res.success) {
            } else {
              _self.$Message.error(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    isSignUrl(val) {
      if (val.legalSupervisor) {
        if (val.legalSupervisor.signUrl) {
          return true;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    isEmpty: isEmpty,
    showSignature(v) {
      this.signaturePic = true;
      this.signatureImageUrl = `${this.$basePath}/attachment${v}`;
    },
    showAllData(v) {
      var _self = this;
      _self.getTaskList(v);
    },
    cancelMark(row, index) {
      var _self = this;
      _self.$http
        .get("/supervision/checkresult/mark?id=" + row.id + "&check=true")
        .then(res => {
          if (res.success) {
            _self.getTaskList(_self.showMainCheck);
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    noChecking(row, index) {
      var _self = this;
      _self.$http
        .get("/supervision/checkresult/mark?id=" + row.id + "&check=false")
        .then(res => {
          if (res.success) {
            // _self.datas.splice(index, 1);
            _self.getTaskList(_self.showMainCheck);
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveNoInfo() {
      var _self = this;
      if (
        _self.info.checkUserNames === undefined ||
        _self.info.checkUserNames === ""
      ) {
        _self.$Message.info("请选择检查人员");
        return;
      }
      if (_self.info.userName === undefined || _self.info.userName === "") {
        _self.$Message.info("请选择被检查对象");
        return;
      }
      if (
        _self.info.checkCompleteTime === undefined ||
        _self.info.checkCompleteTime === ""
      ) {
        _self.$Message.info("请选择检查日期");
        return;
      }
      if (
        _self.info.enterUserName === undefined ||
        _self.info.enterUserName === ""
      ) {
        _self.$Message.info("请选择录入人员");
        return;
      }
      _self.$http
        .patch("/supervision/examine/fallOnStonyGround", {
          taskId: _self.taskid,
          urls: _self.urlStr,
          message: _self.noInfo.message
        })
        .then(res => {
          if (res.success) {
            _self.$Message.info("保存成功。");
            if (this.isChange) {
              _self.saveCheckMan();
            }
            _self.status.fallOnStonyGround = false;
            this.visible = false;
            if (!this.loading) {
              this.$emit("input", this.visible);
            }
            this.$emit("on-ok");
            this.$emit("isSuccess", true);
          } else {
            _self.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUrlArr(v) {
      if (v === undefined) {
        this.urlStr = "";
      } else {
        this.urlStr = "";
        v.forEach((v, i) => {
          this.urlStr = v.url + "," + this.urlStr;
        });
      }
    },
    fallOnStonyGround() {
      for (let key in this.noInfo) {
        this.noInfo[key] = "";
      }
      this.$refs["noInfo"].resetFields();
      this.status.fallOnStonyGround = true;
    },
    saveInfo() {
      this.$refs.safetyFormVue.saveData();
    },
    saveCheckMan() {
      var _self = this;
      _self.$http
        .patch("/supervision/examine/dailyResultsUpdate", {
          checkCompleteTime: _self.info.checkCompleteTime,
          taskId: _self.taskid,
          userIds: _self.userIdArr,
          positionName: _self.info.positionName,
          userName: _self.info.userName,
          notice: _self.notice ? '1' : '0'
        })
        .then(res => {
          if (res.success) {
            this.userIdArr = [];
          } else {
            _self.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
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
        .then(res => {
          if (res.success) {
            _self.uploadList = res.data;
          }
        });
    },
    handleFormatError(file) {
      this.$Message.error("不支持该文件格式。");
    },
    uploadError(response, file, fileList) {},
    handleRemove(item, index) {
      var _self = this;
      _self.$http.delete("/standingbook/attachs/" + item.id).then(res => {
        if (res.success) {
          _self.uploadList.splice(index, 1);
        }
        _self.$Message.info(res.msg);
      });
    },
    handleView(item) {
      this.showPicId = item.id;
      this.showPic = true;
    },
    filePath(url) {
      return this.$basePath + "/attachment" + url;
    },
    getStatus(v) {
      if (v) {
        var _self = this;
        // if (_self.datas.length === 0) {
        //   _self.$Message.info("请添加检查事项");
        //   return;
        // }
        if (
          _self.info.checkUserNames === undefined ||
          _self.info.checkUserNames === ""
        ) {
          _self.$Message.info("请选择检查人员");
          return;
        }
        if (_self.info.userName === undefined || _self.info.userName === "") {
          _self.$Message.info("请选择被检查对象");
          return;
        }
        if (
          _self.info.checkCompleteTime === undefined ||
          _self.info.checkCompleteTime === ""
        ) {
          _self.$Message.info("请选择检查日期");
          return;
        }
        if (
          _self.info.enterUserName === undefined ||
          _self.info.enterUserName === ""
        ) {
          _self.$Message.info("请选择录入人员");
          return;
        }
        _self.$http
          .post("/supervision/examine/checkOver?taskId=" + _self.taskid)
          .then(res => {
            if (res.success) {
              _self.$Message.info("保存成功。");
              if (this.isChange) {
                _self.saveCheckMan();
              }
              this.visible = false;
              if (!this.loading) {
                this.$emit("input", this.visible);
              }
              this.$emit("on-ok");
              this.$emit("isSuccess", true);
            } else {
              _self.$Message.error(res.msg);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    luruFun(row) {
      this.formId = row.formId;
      this.taskid = row.taskId;
    },
    handleDelete(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          let deleteUrl = "";
          if (this.checkType == "SAFTY") {
            deleteUrl = "/supervision/safetyCheck/deleteForm";
          } else {
            deleteUrl = "/supervision/checkresult/deleteForm";
          }
          this.$http
            .delete(`${deleteUrl}?id=` + index.id)
            .then(res => {
              this.$Message.info("操作成功");
              this.getTaskList(this.showMainCheck);
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
    },
    getTaskList(showAll) {
      let formidlist = ['2c90835a70cd3a8b0170ce1d20d428bf'];
      this.$http
        .post(`/supervision/safetyCheck/addForms`, {
          formIdList: formidlist,
          taskId: this.taskid
        })
        .then(res => {
          if (res.success) {
            this.formId = '2c90835a70cd3a8b0170ce1d20d428bf';
            this.$http
              .get(`/supervision/safetyCheck/forms?taskId=` + this.taskid)
              .then(res => {
                console.log(res, "safetyCheck");
                // if (_self.isSpecial) {
                //   if (showAll) {
                //     _self.datas = res.data;
                //   } else {
                //     _self.datas = _self.jugArrShow(res.data);
                //   }
                // } else {
                //   _self.datas = res.data;
                // }
                this.datas = res.data;
                if (res.data.length > 0) {
                  this.formId = res.data[0].formId;
                } else {
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    jugArrShow(arr) {
      var result = new Array();
      arr.forEach((v, i) => {
        if (v.isCheck !== "0") {
          result.push(v);
        }
      });
      return result;
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      // this.status.fallOnStonyGround=val
      this.visible = val;
      this.$emit("visibleChange", val);
    },
    selectCrew(nodes) {
      this.userIdArr = [];
      var str = "";
      nodes.forEach((v, i) => {
        this.userIdArr.push(v.id);
        str = v.title + "," + str;
      });
      this.info.checkUserNames = str;
    }
  },
  computed: {
    uploadData() {
      var obj = {
        dataId: this.taskid,
        moduleId: this.moduleIdName,
        type: "attach"
      };
      return obj;
    },
    uploadUrl() {
      return "/standingbook/attachs/upload";
    },
    showPicPathWithBase() {
      return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
    },
    isCheckNoWhereaboutsShow() {
      var flag = false;
      if (this.info.isCheckNoWhereaboutsShow === "是" && this.isView === true) {
        flag = true;
      } else {
        flag = false;
      }
      return flag;
    }
  },
  watch: {
    userIdArr: {
      handler(val, oldVal) {
        if (val) {
          this.isChange = true;
        }
      },
      deep: true
    },
    "info.positionName"(val) {
      if (val) {
        this.isChange = true;
      }
    },
    "info.userName"(val) {
      if (val) {
        this.isChange = true;
      }
    },
    "info.ext"(val) {
      if(val) {
        this.ext = JSON.parse(val);
      }
      else {
        this.ext = null;
      }
    },
    notice(val) {
      this.isChange = true;
    },
    value(val) {
      this.visible = val;
      if (val) {
        this.notice = false; // 默认不选中
        this.showMainCheck = false;
        this.getTaskList(this.showMainCheck);
        this.loadFiles();
        this.getFormList();
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
/deep/ .testModal .ivu-modal-body {
  height: 700px;
  overflow-y: auto;
}
.title {
  font-size: 18px;
}
.uploadClsCover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.uploadCls:hover .uploadClsCover {
  display: block;
}
.uploadClsCover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.uploadCls {
  display: inline-block;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}
.uploadCls img {
  width: 100%;
  height: 100%;
}
</style>