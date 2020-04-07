<style lang="less">
@import "../styles/achive.less";
</style>

<template>
  <div>
    <data-table
      ref="test"
      :url="'/regulatoryRepertory/getEnterprisePage'"
      :params="query"
      :columns="columns"
      @on-row-dblclick="handleEditdb"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="统一代码:">
                <Input
                  v-model="query.wheres.uniCode"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="主体名称:">
                <Input
                  v-model="query.wheres.entName"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="负责人:">
                <Input
                  v-model="query.wheres.leRep"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="联系电话:">
                <Input
                  v-model="query.wheres.tel"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="地址:">
                <Input
                  v-model="query.wheres.dom"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="设置人:">
                <Input
                  v-model="query.wheres.setUserName"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
          </Row>
          <Row>
            <Col span="4">
              <Form-item label="许可证名称:">
                <Input
                  v-model="query.wheres.licName"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="许可证编号:">
                <Input
                  v-model="query.wheres.licNO"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="许可发证机关:" :label-width="90">
                <Input
                  v-model="query.wheres.licSendDeptName"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="所属区域:">
                <Input
                  v-model="query.wheres.divAddressName"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                ></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap" style="margin-left:20px">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <span style="float:right;margin-bottom:10px">
              <ButtonGroup>
                <Button @click="newWin" type="warning" icon="ios-add">新增</Button>
                <MyUpload
                  :action="'/regulatoryRepertory/importExcel'"
                  :format="['xlsx','xls']"
                  :on-success="importXls"
                  :on-format-error="handleFormatError"
                  style="width:60px;height:35px;float:right;margin-left:5px;"
                >
                  <Button type="info" icon="ios-add">导入</Button>
                </MyUpload>
                <Button type="success" icon="ios-folder" @click="downloadMb()">下载模板</Button>
              </ButtonGroup>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <!-- 详情窗口 -->
    <Modal
      :width="1200"
      v-model="modal.showDetail"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="maskclosable"
    >
      <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="7">
            <FormItem label="统一信用代码:" prop="uniCode">
              <Input v-model="info.uniCode" :readonly="ifEdit">
                <Button slot="append" :disabled="ifEdit" @click="uniCodeSearch">搜索</Button>
              </Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="企业名称:">
              <Input v-model="info.entName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="负责人:">
              <Input v-model="info.leRep" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="登记机关:">
              <Input v-model="info.regOrgName" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="经营范围:">
              <Input v-model="info.opScope" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="登记地址:">
              <Input v-model="info.dom" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="所属区域:">
              <Input v-model="info.divAddressName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="许可证编号:">
              <Input v-model="info.licNO" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="检查部门:">
              <Input v-model="info.checkDeptName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="许可证名称:">
              <Input v-model="info.licName" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="专项库(大类):">
              <Input v-model="info.specialName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="许可证批准日期:">
              <DatePicker
                v-model="info.licApprDate"
                type="date"
                placeholder="请选择日期"
                :disabled="ifEdit"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="专项库(小类):">
              <Input v-model="info.markName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="许可有效期至:">
              <DatePicker
                v-model="info.licSaveEndDate"
                type="date"
                placeholder="请选择日期"
                :disabled="ifEdit"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="许可发证机关:">
              <Input v-model="info.licSendDeptName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="设置人:">
              <Input v-model="info.setUserName" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="设置日期:">
              <DatePicker
                v-model="info.creatTime"
                type="date"
                placeholder="请选择日期"
                :disabled="ifEdit"
                format="yyyy-MM-dd"
              ></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="设置部门:">
              <Input v-model="info.setDeptName" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="cancel('info')">取消</Button>
        <Button v-show="btnShow" type="primary" @click="submitData('info')">{{this.btnInfo}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import MyUpload from "@/views/components/Upload/MyUpload.vue";
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      btnInfo: "保存",
      btnShow: false,
      ifEdit: false,
      maskclosable: false,
      modal: {
        showDetail: false
      },
      title: "详情",
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "uniCode",
          title: "统一代码",
          align: "center",
          minWidth: 140
        },
        {
          key: "entName",
          title: "主体名称",
          align: "center",
          minWidth: 140
        },
        {
          key: "concreteType",
          title: "类型",
          align: "center",
          minWidth: 140
        },
        {
          key: "specialName",
          title: "专项库(大类)",
          align: "center",
          minWidth: 140
        },
        {
          key: "markName",
          title: "专项库(小类)",
          align: "center",
          minWidth: 140
        },
        {
          key: "checkDeptName",
          title: "检查部门",
          align: "center",
          minWidth: 140
        },
        {
          key: "licName",
          title: "许可证名称",
          align: "center",
          minWidth: 140
        },
        {
          key: "licNO",
          title: "许可证编号",
          align: "center",
          minWidth: 140
        },
        {
          key: "licApprDate",
          title: "许可批准日期",
          align: "center",
          minWidth: 140
        },
        {
          key: "licSaveEndDate",
          title: "许可有效期至",
          align: "center",
          minWidth: 140
        },
        {
          key: "divAddressName",
          title: "所属区域",
          align: "center",
          minWidth: 140
        },
        {
          key: "dom",
          title: "地址",
          align: "center",
          minWidth: 140
        },
        {
          key: "regOrgName",
          title: "登记机关",
          align: "center",
          minWidth: 140
        },
        {
          key: "leRep",
          title: "负责人",
          align: "center",
          minWidth: 140
        },
        {
          key: "tel",
          title: "联系电话",
          align: "center",
          minWidth: 140
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          minWidth: 180,
          render: (h, params) => {
            // var _self = this;
            return h("div", [
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
                      this.title = "详情";
                      this.editWin(params.row);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.title = "编辑";
                      this.editWin(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
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
          uniCode: "",
          entName: "",
          leRep: "",
          tel: "",
          licName: "",
          licNO: "",
          licSendDeptName: "",
          dom: "",
          setUserName: "",
          licSaveStartDate: "",
          licSaveEndDate: "",
          specialName: "",
          markName: "",
          regOrgName: "",
          checkDeptName: "",
          divCityCode: "",
          divCountyCode: "",
          divStreetCode: ""
        }
      },
      info: {
        uniCode: ""
      },
      infoRules: {
        uniCode: [
          { required: true, message: "请输入统一信用代码", trigger: "blur" }
        ]
      },
      searchParams: {
        uniscId: "",
        companyName: "",
        registerNo: "",
        entType: "E"
      }
    };
  },
  methods: {
    uniCodeSearch() {
      if (!this.info.uniCode) {
        this.$Message.error("请输入统一信用代码！");
        return;
      }
      this.searchParams.uniscId = this.info.uniCode;
      this.$http
        .post("/regulatoryRepertory/enterpriseSearch", this.searchParams)
        .then(res => {
          console.log(res, "uniCodeSearch");
          if (res.success) {
            if (res.data.length > 0) {
              this.info.entName = data.companyName;
              this.info.regOrgName = data.regOrg;
              this.info.legalPerson = data.leRep;
              this.info.opScope = data.opScope;
              this.info.dom = data.companyAddr;
            } else {
              this.$Message.error('未搜索到相关数据！');
            }
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch(error => {
          this.$Message.error('搜索失败！');
          console.log(error);
        });
    },
    editWin(row) {
      this.$refs["info"].resetFields();
      if (this.title === "详情") {
        this.btnShow = false;
        this.ifEdit = true;
      } else if (this.title === "编辑") {
        this.btnShow = true;
        this.btnInfo = "保存";
        this.ifEdit = false;
      }
      this.info = row;
      this.modal.showDetail = true;
    },
    newWin() {
      this.modal.showDetail = true;
      this.title = "新增";
      this.btnShow = true;
      this.ifEdit = false;
      this.btnInfo = "保存";
      for (let key in this.info) {
        this.info[key] = "";
      }
      this.$refs["info"].resetFields();
    },
    submitData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.title === "新增") {
            this.$http
              .post("/regulatoryRepertory/enterpriseSave", this.info)
              .then(res => {
                if (res.success) {
                  this.$Message.info("操作成功!");
                  this.modal.showDetail = false;
                  this.initSearch();
                } else {
                  this.$Message.info(res.msg);
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else if (this.title === "编辑") {
            this.$http
              .patch("/regulatoryRepertory/enterprisePatch", this.info)
              .then(res => {
                if (res.success) {
                  this.$Message.info("操作成功");
                  this.modal.showDetail = false;
                  this.initSearch();
                } else {
                  this.$Message.info(res.msg);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          this.$Message.error("请填写完全！");
        }
      });
    },
    cancel(name) {
      this.modal.showDetail = false;
      this.$refs[name].resetFields();
    },
    handleDelete(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/regulatoryRepertory/enterpriseDelete?id=" + index.id)
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
    downloadMb() {
      window.open(this.$basePath + "/regulatoryRepertory/downloadExcel");
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
    }
  },
  mounted() {}
};
</script>