<style lang="less">
@import "../styles/achive.less";
.show-modal {
  // .ivu-modal-body {
  //   max-height: 730px;
  //   overflow-x: auto;
  //   margin-bottom: 18px;
  // }

  // .modal-title {
  //   font-size: 18px;
  //   margin-bottom: 12px;
  // }

  // .modal-trace {
  //   margin: 12px 0;

  //   &-content {
  //     width: 600px;
  //     height: 500px;
  //     // margin: 12px 0;

  //     .picview {
  //       width: 600px;
  //       height: 500px;
  //       position: relative;
  //     }

  //     .picview-pop {
  //       position: absolute;

  //       img {
  //         width: 600px !important;
  //         height: 500px !important;
  //         left: 0;
  //       }
  //     }
  //   }
  // }
}

</style>

<template>
  <div>
    <data-table
      ref="test"
      :url="'/patrol/getPage'"
      :params="query"
      :columns="columns"
      @on-row-dblclick="handleEditdb"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="执法人员:">
                <Input
                  v-model="query.wheres.lawMan"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <!-- <Col span="4">
                            <Form-item label="执法号:">
                                 <Input v-model="query.wheres.lawManNo" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>  
                            </Form-item>
            </Col>-->
            <Col span="4">
              <Form-item label="渔船名:">
                <Input
                  v-model="query.wheres.shipname"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <!-- <Col span="4">
                            <Form-item label="巡航开始:">
                                <DatePicker v-model="query.wheres.startTime" type="date" placeholder="请选择日期" format="yyyy-MM-dd"></DatePicker>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="巡航结束:">
                                <DatePicker v-model="query.wheres.endTime" type="date" placeholder="请选择日期" format="yyyy-MM-dd"></DatePicker> 
                            </Form-item>
            </Col>-->
            <div class="btn-wrap" style="margin-left:20px">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
              <Button @click="newWin()" type="success">新增</Button>
            </div>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      :width="900"
      v-model="modal.showDetail"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="maskclosable"
    >
      <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="24">
            <FormItem label="标题:">
              <Input v-model="info.title" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="渔船名:">
              <Input v-model="info.shipname" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="执法人员:">
              <Input v-model="info.lawMan" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="巡航开始时间:">
              <DatePicker
                v-model="info.startTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="巡航结束时间:">
              <DatePicker
                v-model="info.endTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="内容:">
              <Input v-model="info.note" type="textarea" :rows="4" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal.showDetail=false">取消</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>
    <Modal
      :width="900"
      v-model="modal.pointInfo"
      :styles="{top: '80px'}"
      title="点位信息"
      :mask-closable="maskclosable"
    >
      <Table border stripe :data="datas" :columns="cols"></Table>
      <div slot="footer">
        <Button @click="modal.pointInfo=false">取消</Button>
      </div>
    </Modal>
    <Modal
      :width="1200"
      v-model="modal.relation"
      :styles="{top: '80px'}"
      title="检查任务"
      :mask-closable="maskclosable"
    >
      <Table border stripe :data="relationData" :columns="relationColumns" height="520"></Table>
      <div slot="footer">
        <Button @click="modal.relation=false">取消</Button>
      </div>
    </Modal>
    <pic v-model="modal.showPic" :img="showPicPathWithBase"></pic>
    <MultiUpload
      :mask-closable="maskclosable"
      uploadUrl="/standingbook/attachs/upload"
      v-model="modal.fileShow"
      :dataId="sID"
      moduleId="cruiseCheck"
    ></MultiUpload>

    <!-- 查看弹窗 包括以前的编辑、轨迹图、任务 -->
    <Modal
      :width="900"
      v-model="modal.isShowDetail"
      :styles="{top: '20px'}"
      title="查看"
      :mask-closable="maskclosable"
      class-name="show-modal"
    >
      <div class="modal-title">
        <Icon type="ios-folder" />
        基本信息
      </div>
      <Form :label-width="120" :model="info">
        <Row>
          <Col span="24">
            <FormItem label="标题:">
              <!-- <Input v-model="info.title" disabled/> -->
              <Input v-model="info.title" readonly/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="渔船名:">
              <Input v-model="info.shipname" readonly/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="执法人员:">
              <Input v-model="info.lawMan" readonly/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="巡航开始时间:">
              <DatePicker
                readonly
                v-model="info.startTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="巡航结束时间:">
              <DatePicker
                readonly
                v-model="info.endTime"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="内容:">
              <Input v-model="info.note" type="textarea" :rows="4" readonly/>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div v-if="modal.isShowPic">
        <div class="modal-title">
          <Icon type="ios-folder" />
          轨迹图
        </div>
        <div class="modal-trace">
          <div class="modal-trac-default" v-if="!isShowTrac" @click="showTrac">
            <img :src="showPicPathWithBase" alt="" width="100" height="100">
          </div>
          <div class="modal-trace-content" @click="isShowTrac=false;">
            <pic v-model="modal.isShowDetail && isShowTrac" :img="showPicPathWithBase"></pic>
          </div>
        </div>
      </div>
      <div class="modal-title">
        <Icon type="ios-folder" />
        任务
      </div>
      <Table border stripe :data="relationData" :columns="relationColumns" height="170"></Table>
      <div slot="footer">
        <Button type="primary" @click="modal.isShowDetail=false;">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import pic from "@/views/components/pic/pic.vue";
import MultiUpload from "@/views/components/Upload/MultiUpload.vue";
export default {
  components: {
    MultiUpload,
    pic
  },
  data() {
    return {
      title: "",
      relationData: [],
      relationColumns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "taskType",
          title: "任务类型",
          align: "center",
          width: 100,
          render: (h, params) => {
            let taskType = params.row.taskType;
            if (taskType == "DAILY") {
              taskType = "日常检查";
            } else if (taskType == "SPECIAL") {
              taskType = "专项检查";
            } else {
              taskType = "随机检查";
            }
            return h("div", taskType);
          }
        },
        {
          key: "taskCode",
          title: "任务名称",
          align: "center",
          width: 100,
        },
        {
          key: "taskInstruction",
          title: "任务说明",
          align: "center",
          width: 100,
        },
        {
          key: "taskSourceCode",
          title: "任务来源",
          align: "center",
          width: 120,
        },
        {
          key: "taskSourceName",
          title: "任务来源名称",
          align: "center",
          width: 120,
        },
        {
          key: "taskStatus",
          title: "任务状态",
          align: "center",
          width: 100,
          render: (h, params) => {
            var str = "";
            if (params.row.taskStatus === "NOCHECK") {
              str = "待检查";
            } else if (params.row.taskStatus === "INCHECK") {
              str = "检查中";
            } else if (params.row.taskStatus === "NOFINISH") {
              str = "未完结";
            } else if (params.row.taskStatus === "FINISH") {
              str = "已完结";
              if (params.row.isCheckNoWhereabouts === "1") str += "(查无下落)";
            }
            return h("span", str);
          }
        },
        {
          key: "uniCode",
          title: "会信用代码",
          align: "center",
          width: 140,
        },
        {
          key: "legalEntityName",
          title: "主体名称",
          align: "center",
          width: 160,
        },
        {
          key: "leRep",
          title: "法人",
          align: "center",
          width: 100,
        },
        {
          key: "regAddress",
          title: "注册地址",
          align: "center",
          width: 160,
        },
        {
          title: "检查对象类型",
          key: "checkObjectType",
          align: "center",
          width: 100,
          render: (h, params) => {
            var str = "";
            this.checkedObjList.forEach((v, i) => {
              if (v.value === params.row.checkObjectType) {
                str = v.title;
              }
            });
            return h("span", str);
          }
        },
        {
          key: "checkCompleteTime",
          title: "检查完成日期",
          align: "center",
          width: 160,
        },
        {
          key: "checkUserNames",
          title: "检查人",
          align: "center",
          width: 140,
        },
      ],
      datas: [],
      cols: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "lon",
          title: "经度",
          align: "center"
        },
        {
          key: "lat",
          title: "纬度",
          align: "center"
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center"
        }
      ],
      showPicId: "",
      sID: "",
      // fileShow: false,
      infoRules: {},
      maskclosable: false,
      modal: {
        showDetail: false,
        showPic: false,
        pointInfo: false,
        fileShow: false,
        relation: false,
        isShowDetail: false,
        isShowPic: false,
      },
      info: {},
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "shipname",
          title: "渔船名",
          align: "center"
        },
        {
          key: "title",
          title: "标题",
          align: "center"
        },
        {
          key: "note",
          title: "内容",
          align: "center"
        },
        {
          key: "lawMan",
          title: "执法人员",
          align: "center"
        },
        {
          key: "startTime",
          title: "巡航开始时间",
          align: "center"
        },
        {
          key: "endTime",
          title: "巡航结束时间",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 300,
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.viewTask(params.row);
              //       }
              //     }
              //   },
              //   "查看任务"
              // ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showDetail(params.row);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editWin(params.row);
                    }
                  }
                },
                "编辑"
              ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "warning",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.pointInfo(params.row);
              //       }
              //     }
              //   },
              //   "点位"
              // ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.showFile(params.row);
              //       }
              //     }
              //   },
              //   "轨迹图"
              // ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "success",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.fileShow(params.row);
              //       }
              //     }
              //   },
              //   "附件"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleDelete(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          lawMan: "",
          lawManNo: "",
          shipname: "",
          startTime: "",
          endTime: ""
        }
      },
      isShowTrac: false
    };
  },
  computed: {
    showPicPathWithBase() {
      return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
    },
    uploadData() {
      var obj = {
        dataId: this.sID,
        moduleId: "patrolRecord",
        moduleType: "other"
      };
      return obj;
    },
    checkedObjList() {
      return this.$store.getters.getDictList("regulatoryRepertory");
    }
  },
  methods: {
    fileShow(row) {
      this.sID = row.id;
      this.modal.fileShow = true;
    },
    newWin() {
      this.title = "新增";
      this.$refs["info"].resetFields();
      for (let key in this.info) {
        this.info[key] = "";
      }
      this.info.pointList = [];
      this.modal.showDetail = true;
    },
    loadFiles() {
      var _self = this;
      _self.$http
        .get("/$admin/attachs", {
          params: _self.uploadData
        })
        .then(res => {
          if (res.success) {
            _self.showPicId = res.data[0].id;
            _self.modal.showPic = true;
          }
        });
    },
    showFile(row) {
      this.sID = row.id;
      this.loadFiles();
    },
    pointInfo(row) {
      this.$http
        .get("/patrol/get?id=" + row.id)
        .then(res => {
          if (res.success) {
            this.datas = res.data.pointList;
            this.modal.pointInfo = true;
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitData() {
      if (this.title === "新增") {
        this.$http
          .post("/patrol/save", this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("操作成功");
              this.modal.showDetail = false;
              this.initSearch();
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.title === "编辑") {
        this.$http
          .patch("/patrol/update", this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("操作成功");
              this.modal.showDetail = false;
              this.initSearch();
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    editWin(row) {
      this.title = "编辑";
      this.$refs["info"].resetFields();
      this.$http
        .get("/patrol/get?id=" + row.id)
        .then(res => {
          this.info = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      this.modal.showDetail = true;
    },
    handleDelete(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/patrol/delete?id=" + row.id)
            .then(res => {
              this.$Message.info("操作成功");
              this.initSearch();
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
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.wheres.type = "1";
      this.query.page = 1;
      this.query.size = 10;
      this.initSearch();
    },
    handleEditdb(ids) {
      // this.info = ids;
      // this.$refs["info"].resetFields();
      // this.modal.watchMsg = true;
      // this.handleEdit(ids);
    },
    viewTask(row) {
      this.modal.relation = true;
      this.$http
        .get("/patrol/getRelation?relationId=" + row.relationId)
        .then(res => {
          if (res.success) {
            console.log(res.data);
            this.relationData = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showTrac() {
      this.isShowTrac = true;
    },
    /**
     * @desc 操作中的 编辑、轨迹图、查看任务合并统一为 查看；依次调用 获取详情、获取轨迹图、获取查看任务接口。
     * @param {object} row 点击的item
     */
    showDetail(row) {
      this.modal.isShowPic = true;
      this.isShowTrac = false;
      // 详情
      this.getDetailApi(row.id).then(res => {
        this.info = res
      }).catch(err => {
        this.$Message.error(err);
      });
      // 轨迹图
      this.sID = row.id;
      this.getTraceApi().then(res => {
        this.showPicId = res;
        this.modal.isShowPic = true;
        this.$nextTick(() => {
          this.modal.isShowDetail = true;
        })
      }).catch(() => {
        this.modal.isShowPic = false;
        this.modal.isShowDetail = true;
      });
      // 查看任务
      this.getTaskApi(row.relationId).then(res => {
        this.relationData = res;
      }).catch(err => {
        this.$Message.error(err);
      });
      // 防止轨迹图接口没有返回数据
      // setTimeout(() => {
      //   this.$nextTick(() => {
      //     (!this.modal.isShowDetail) && (this.modal.isShowDetail = true);
      //   })
      // }, 400);
    },
    /**
     * @desc 获取item详情接口
     * @param {string} id 查询id
     */
    getDetailApi(id) {
      return  this.$http
        .get("/patrol/get?id=" + id)
        .then(res => {
          // this.info = res.data;
          return Promise.resolve(res.data);
        })
        .catch(err => {
          return Promise.reject(err.msg);
        });
    },
    /**
     * @desc 获取轨迹图接口
     */
    getTraceApi() {
      return this.$http
        .get("/$admin/attachs", {
          params: this.uploadData
        })
        .then(res => {
          if (res.success) {
            return Promise.resolve(res.data[0].id);
            // this.showPicId = res.data[0].id;
            // this.modal.showPic = true;
          }
          else {
            return Promise.reject(res.msg);
          }
        }).catch(err => {
          return Promise.reject(err.msg);
        });
    },
    /**
     * @desc 获取查看任务接口
     * @param {string} relationId
     */
    getTaskApi(relationId) {
      return this.$http
        .get("/patrol/getRelation?relationId=" + relationId)
        .then(res => {
          if (res.success) {
            // this.relationData = res.data;
            return Promise.resolve(res.data);
          } else {
            // this.$Message.error(res.msg);
            return Promise.reject(res.msg);
          }
        })
        .catch(err => {
          return Promise.reject(err.msg);
        });
    }
  }
};
</script>