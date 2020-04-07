<template>
  <div>
    <data-table
      ref="main"
      :url="'/check/fishOff/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="渔船名:">
                <Input
                  v-model="query.wheres.shipname_like"
                  @on-keydown.enter="''"
                  placeholder="请输入..."
                />
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="作业方式:">
                <Input
                  v-model="query.wheres.worktype_like"
                  @on-keydown.enter="''"
                  placeholder="请输入..."
                />
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item clearable label="渔船类型:">
                <Input
                  v-model="query.wheres.shiptype_like"
                  @on-keydown.enter="''"
                  placeholder="请输入..."
                />
                <!-- <Select v-model="query.wheres.shiptype_like" placeholder="请选择...">
                                    <Option value="本市三无船">本市三无船</Option>
                                    <Option value="本省外市三无船">本省外市三无船</Option>
                                    <Option value="外省三无船">外省三无船</Option>
                </Select>-->
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset">重置</Button>
            </div>
            <span style="float:right;margin-bottom:10px">
              <ButtonGroup>
                <Button @click="newWin" type="info" icon="ios-add">新增</Button>
                <MyUpload
                  :action="'/check/fishOff/importExcel'"
                  :format="['xlsx','xls']"
                  :on-success="importXls"
                  :on-format-error="handleFormatError"
                  style="width:74px;height:35px;float:right;margin-left:4px;"
                >
                  <!-- <Button type="info" icon="ios-cloud-download-outline">导入</Button> -->
                  <Button type="success" icon="ios-folder">导入</Button>
                </MyUpload>
                <Button type="success" icon="ios-folder" @click="downloadMb()">下载模板</Button>
              </ButtonGroup>
            </span>
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
          <Col span="12">
            <FormItem label="渔船名:">
              <Input v-model="info.shipname" :readonly="ifEdit">
                <Icon
                  type="ios-search"
                  v-show="!ifEdit"
                  slot="append"
                  @click="modal.baseShipModal = true"
                >选择</Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="船东:">
              <Input v-model="info.owner" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="船籍港:">
              <Input v-model="info.cjg" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系方式:">
              <Input v-model="info.tel" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="渔船类型:">
              <Input v-model="info.shiptype" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="作业类型:">
              <Input v-model="info.worktype" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="作业方式:">
              <Input v-model="info.workmode" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="伏休期开始时间:">
              <DatePicker
                :disabled="ifEdit"
                v-model="info.startDate"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="伏休期结束时间:">
              <DatePicker
                :disabled="ifEdit"
                v-model="info.endDate"
                type="date"
                placeholder="请选择日期"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="备注:">
              <Input v-model="info.note" type="textarea" :rows="4" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal.showDetail=false">取消</Button>
        <Button type="primary" v-show="!ifEdit" @click="submitData">{{btnInfo}}</Button>
      </div>
    </Modal>
    <selectShipModal v-model="modal.baseShipModal" @on-select-ship="onSelectShip"></selectShipModal>
  </div>
</template>

<script>
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import selectShipModal from "@/views/components/selectModal/selectShipModal.vue";
export default {
  components: {
    MyUpload,
    selectShipModal
  },
  data() {
    return {
      ifEdit: false,
      btnInfo: "",
      maskclosable: false,
      info: {},
      title: "",
      modal: {
        showDetail: false,
        baseShipModal: false
      },
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipname_like: "",
          shiptype_like: "",
          worktype_like: ""
        }
      },
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80,
          align: "center"
        },
        {
          title: "渔船名",
          align: "center",
          key: "shipname"
        },
        {
          title: "船东",
          align: "center",
          key: "owner"
        },
        {
          title: "联系电话",
          align: "center",
          key: "tel"
        },
        {
          title: "渔船类型",
          align: "center",
          key: "shiptype"
        },
        {
          title: "作业类型",
          align: "center",
          key: "worktype"
        },
        {
          title: "作业方式",
          align: "center",
          key: "workmode"
        },
        {
          title: "操作",
          align: "center",
          width: 255,
          render: (h, params) => {
            var _self = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {},
                  on: {
                    click: () => {
                      _self.title = "查看";
                      _self.ifEdit = true;
                      _self.editWin(params.row);
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.title = "编辑";
                      _self.btnInfo = "保存";
                      _self.ifEdit = false;
                      _self.editWin(params.row);
                    }
                  }
                },
                "编辑"
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
      infoRules: {},
      dataId: ""
    };
  },
  methods: {
    handleDelete(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/check/fishOff/" + row.id)
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
    onSelectShip(row) {
      var _self = this;
      _self.info = row;
      _self.info.cjg = row.portregistry;
    },
    editWin(row) {
      var _self = this;
      _self.$refs["info"].resetFields();
      _self.dataId = row.id;
      // 对象深拷贝
      var data = JSON.parse(JSON.stringify(row));
      _self.info = data;
      _self.modal.showDetail = true;
    },
    submitData() {
      var _self = this;
      if (_self.title === "新增") {
        this.$http
          .post("/check/fishOff/saveShip", this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("新增成功");
              this.modal.showDetail = false;
              this.initSearch();
            } else {
              this.$Message.error(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (_self.title === "编辑") {
        this.$http
          .patch("/check/fishOff/update/" + _self.dataId, this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("修改成功");
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
    importXls(response, file, fileList) {
      if (response.success) {
        this.$Message.info("导入成功！");
        this.initSearch();
      } else {
        this.$Message.error(response.msg);
      }
    },
    handleFormatError(file) {
      this.$Message.error("文件格式不支持上传！");
    },
    newWin() {
      var _self = this;
      _self.title = "新增";
      _self.btnInfo = "确定";
      _self.ifEdit = false;
      this.$refs["info"].resetFields();
      for (let key in this.info) {
        this.info[key] = "";
      }
      _self.modal.showDetail = true;
    },
    handleExport() {},
    initSearch() {
      this.$refs.main.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.initSearch();
    },
    downloadMb() {
      window.open(this.$basePath + "/check/fishOff/downloadExcel");
    }
  },
  mounted() {
    this.initSearch();
  }
};
</script>

<style lang="less" scoped>
</style>