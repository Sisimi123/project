<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>
<!-- 奖分申请 -->
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
            <div>
                <fieldset class="title">
                    <legend>*申请人信息</legend>
                    <Button size="small"  @click="handleSelectUser()" type="info">申请人选择</Button>
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
                        <Col span="8">
                            <Form-item label="当前可奖分申请消除分:" >
                                <Input v-model="limitScore" readonly>
                                <span slot="append">分</span>
                            </Input>
                            </Form-item>
                        </Col>
                    </Row>
                </template>
            </div>
            <div>
              <fieldset class="titleB">
                <legend>*奖分事件信息</legend>
                <Button size="small"  @click="handleSelectEvent()" type="warning">选择奖分条款+</Button>
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
                          <Row>
                            <Form-item label="附件:" >
                            <div class="markScore-upload-list" v-for="item in uploadList[index]" v-bind:key="item.id">
                                <img :src="item.url">
                                <div class="markScore-upload-list-cover">
                                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                                </div>
                            </div>
                            <Upload
                              :data=actionData
                              ref="upload"
                              :show-upload-list="false"
                              :on-success="(response, file, fileList) => handleSuccess(response, file, fileList,index)"
                              :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                              :format="['jpg','jpeg','png']"
                              :with-credentials="true"
                              :max-size="20480"
                              :on-format-error="handleFormatError"
                              :on-exceeded-size="handleMaxSize"
                              :before-upload="handleBeforeUpload"
                              multiple
                              type="drag"
                              :action="actionUrl"
                              style="display: inline-block;width:100px;">
                              <div style="width: 100px;height:80px;line-height: 80px;">
                                <Icon type="android-add-circle" size="50" style="line-height:80px"></Icon>
                              </div>
                            </Upload>
                            
                            </Form-item>
                          </Row>
                      </div>
                  </div>
                </template>
            </div>
            <div class="margin-top-10">
                <fieldset class="title">
                    <legend>*其他信息</legend>
                </fieldset>
                <Row>
                    <Col span="8">
                        <Form-item label="提交人:" >
                            <Input v-model="info.submitter" readonly/>
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="申请奖分值:"  prop="applyScore">
                            <Input v-model="info.applyScore"  readonly>
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
                        <Form-item label="申请说明:">
                            <Input v-model="info.applyReason" type="textarea" :autosize="{minRows: 2,maxRows: 3}" />
                        </Form-item>
                    </Col>
                </Row>
            </div>
        </Form>
    </Modal>

    <Modal :width="820" v-model="status.selectUser" title="人员查询" :scrollable=true>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span>用户：</span>
                <Input v-model="query.wheres.userName_like" @on-keydown.enter="selectModal1(1)"  style="width:30%" placeholder="请输入..."></Input>
                <Button style="margin-left:5px" @click="selectModal1(1)" type="info" icon="ios-search" shape="circle">搜索</Button>
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
          </Col>
        </Row>

        <userselectModal v-model="userselect.show" 
        :selectIds="userselect.selectIds" 
        :deptIds="userselect.deptIds" 
        :selectMySelf=false
        :roleIds="userselect.roleIds"  
        :deptTypes="'30,45'"
        @on-select-change="selectedAuditor"
        ></userselectModal>
    
            <!-- <deptUsers 
            v-model="status.show" 
            okText="确定"
            @on-ok="selectedAuditor"
            cancelText="返回"
            @on-cancel="handleDefault()"
            ></deptUsers> -->

    </Modal>

    <pic v-model="imgVisible" :img="imgUrl"></pic>
    <!-- <Modal class="vertical-center-modal" title="图片" v-model="imgVisible">
        <img :src="imgUrl" style="width: 100%">
    </Modal> -->
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
      default: "奖分申请"
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
    idCardTypeDic() {
      if (this.isEmpty(this.info) || this.isEmpty(this.info.idCardType)) {
        return "";
      } else {
        return this.$store.getters.getDictName(
          "shipscore_idcardtype",
          this.info.idCardType
        );
      }
    },
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
      userselect:{
          show:false,
          deptIds:"",
          roleIds:"ShipScoreAdmin",
          selectIds:"",
      },
      visible: false,
      info: {
        idCard: "", // 身份证号
        idCardType: "", // 用户类型； 0 船东；1 船长；2 公司
        userName: "", // 申请人
        userTel: "", // 申请人电话

        applyScore: "", // 本次消除分值
        applyTime: "", // 时间
        applyReason: "", // 理由

        submitter: "", // 操作人
        auditorId: "", // 审核人id
        auditor: "", // 审核人
        shipName: "", // 渔船名
        matter: []
      },
      infoRules: {
        applyScore: [
          {
            required: true,
            type: "number",
            message: "请输入消分数值",
            trigger: "change"
          }
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
          title: "可奖分申请消除分",
          align: "center"
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
                    this.selectedUser(params.row);
                  }
                }
              },
              "确认"
            );
          }
        }
      ],
      selectList: [],
      limitScore: 1,
      uploadList: [],
      actionUrl: this.$basePath + "/$admin/attachs/",
      actionData: {
        moduleId: "shipscoreapply"
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
      if (this.isEmpty(this.info.userName)) {
        this.$Message.error("请选择申请人！");
        return;
      }

      if (this.isEmpty(this.info.matter)) {
        this.$Message.error("请选择奖分条款！");
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

      var _self = this;
      for (let i = 0; i < _self.info.matter.length; i++) {
        let imgUrlList = [];
        _self.uploadList[i].forEach;
        _self.uploadList[i].forEach(element => {
          imgUrlList.push(element.dataId);
        });
        _self.info.matter[i].imgUrlList = imgUrlList.toString();
      }
      params.append("event", JSON.stringify(this.info));

      this.$http
        .post("/enforces/shipscoreapply/apply", params)
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

    selectedUser(item) {
      this.info.userName = item.userName;
      this.info.userTel = item.tel;
      this.info.idCard = item.userKey.idCard;
      this.info.idCardType = item.userKey.userType;
      this.info.shipName = item.shipName;
      this.limitScore = item.erasableScore;
      this.status.selectUser = false;

      this.addUpScore();
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
      this.addUpScore();
    },
    addUpScore() {
      if (this.isEmpty(this.info.matter)) {
        this.info.applyScore = 0;
        return;
      }

      var shipownerScore = 0;
      var captainScore = 0;
      var companyScore = 0;

      this.info.matter.forEach(element => {
        shipownerScore = shipownerScore + element.shipownerScore;
        captainScore = captainScore + element.captainScore;
        companyScore = companyScore + element.companyScore;
      });
      if (this.idCardTypeDic == "船长") {
        this.info.applyScore = captainScore;
      } else if (this.idCardTypeDic == "公司") {
        this.info.applyScore = companyScore;
      } else {
        this.info.applyScore = shipownerScore;
      }

      // if(this.limitScore < this.info.applyScore){
      //   this.$Notice.warning({
      //     title: "当前申请人可通过奖分申请达到上限！",
      //     desc: "申请人可申请消除分为 "+ this.limitScore+" 分,申请奖分分值已被调整为上限值"
      //   });
      //   this.info.applyScore = this.limitScore;
      // }
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
          if (key == "matter") {
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