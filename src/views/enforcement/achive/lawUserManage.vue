<style lang="less" scoped>
@import "../styles/achive.less";
// @import '../../../styles/common.less';
</style>

<template>
  <div>
    <Row>
      <Col span="4">
        <Card style="width:95%;position: relative;right:-1%;">
          <p slot="title">
            <Icon type="ios-folder"></Icon>机构树
          </p>
          <div class="LeftCardHead">
            <Input v-model="treeSearch" icon="ios-search" size="small"></Input>
          </div>
          <div class="leftTree" ref="leftTree" :style="'height:'+clientHeight+'px;overflow: auto;'">
            <Tree
              ref="deptTree"
              :data="filterTree"
              @on-select-change="selectTreeChange"
              empty-text="机构加载中..."
            ></Tree>
          </div>
        </Card>
      </Col>
      <Col span="20" style="position: relative;">
        <data-table
          ref="test"
          :url="'/LawEnforcementRepertory/getSystemUserPage'"
          :params="query"
          :columns="columns"
          @on-row-dblclick="handleEditdb"
        >
          <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
              <Row>
                <Col span="5">
                  <Form-item label="用户名：">
                    <input
                      @keyup.enter="initSearch()"
                      v-model="query.wheres.name"
                      placeholder="请输入..."
                      class="selec ivu-input"
                      id="input-line"
                    />
                  </Form-item>
                </Col>
                <Col span="5">
                  <Checkbox
                    style="margin-left:5px;margin-top:5px"
                    v-model="subDept"
                    @on-change="changeSubDept"
                  >子部门</Checkbox>
                </Col>
                <div class="btn-wrap" style="margin-left:20px">
                  <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                  <Button @click="handleReset()">重置</Button>
                  <Button @click="downloadMb()" type="warning">下载模板</Button>
                </div>
                <MyUpload
                  :action="'/LawEnforcementRepertory/importXls'"
                  :format="['xlsx','xls']"
                  :on-success="importXls"
                  :on-error="errorImportXls"
                  :on-format-error="handleFormatError"
                  style="width:74px;height:35px;float:right;margin-left:4px;"
                >
                  <Button type="info" icon="ios-cloud-download-outline">导入</Button>
                </MyUpload>
              </Row>
            </Form>
          </div>
        </data-table>
      </Col>
    </Row>
    <!-- 执法证弹窗-->
    <Modal
      :width="1200"
      :styles="{top: '100px','z-index':1000}"
      v-model="modal.newLaw"
      :title="lawTitle"
      :mask-closable="maskclosable"
    >
      <Form :label-width="80" :model="info" ref="info" :rules="ruleValidate">
        <Row>
          <Col span="18">
            <Row>
              <Col span="8">
                <Form-item label="姓名:" prop="name">
                  <Input v-model="info.name"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="性别:">
                  <Select v-model="info.gender">
                    <Option
                      v-for="item in genderArr"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="身份证号:" prop="idNumber">
                  <Input v-model="info.idNumber"></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <Form-item label="学历:">
                  <Input v-model="info.education"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="所在地区:">
                  <Input v-model="info.locality"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="县（市、区）:" :labelWidth="90">
                  <Input v-model="info.districity"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="6" style="text-align:center">
            <!-- <singleUpload :action="'edit'" :dataId="info.photoId" :moduleId="'lawUserManage'" :width="280" :height="200" :imgHeight="200"></singleUpload> -->
            <MyUpload action="/$admin/attachs" :data="uploadData" :on-success="uploadSuccess">
              <img style="width: 90%;max-width: 100px;height: auto;" :src="filePath" />
            </MyUpload>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item label="单位名称:">
              <Input v-model="info.organizationName"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="编制性质:">
              <Input v-model="info.organizationNature"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="职务:">
              <Input v-model="info.duty"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="执法证名称:">
              <Input v-model="info.lawEnforcerCardName"></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <Form-item label="发证部门:">
              <Input v-model="info.licenseDepartment"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="执法证编号:">
              <Input v-model="info.id"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="执法证有效期:" :labelWidth="90">
              <DatePicker type="date" v-model="info.certificateDeadline"></DatePicker>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="手机号码:" prop="mobile">
              <Input v-model="info.mobile"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal.newLaw=false">取消</Button>
        <Button type="info" @click="submit('info')">{{btnInfo}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import singleUpload from "@/views/components/Upload/SingleUpload.vue";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import { isNull } from "@/libs/common.js";
export default {
  name: "lawUserManage",
  components: {
    singleUpload,
    MyUpload
  },
  data() {
    return {
      ruleValidate: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        idNumber: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      fileId: "",
      getUUID: "",
      genderArr: [
        {
          label: "男",
          value: "男"
        },
        {
          label: "女",
          value: "女"
        }
      ],
      isEnforceArr: [
        {
          label: "否",
          value: "0"
        },
        {
          label: "是",
          value: "1"
        }
      ],
      info: {},
      maskclosable: false,
      deptTree: [],
      lawTitle: "",
      modal: {
        newLaw: false
      },
      deptQuery: {
        containOrgan: false
      },
      treeSearch: "",
      query: {
        page: 1,
        size: 10,
        wheres: {
          path: "",
          thisDept: "",
          name: "",
          isEnforce: "true"
        }
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          maxWidth: 80
        },
        {
          title: "用户名",
          key: "name",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "登录名",
          key: "username",
          align: "center"
        },
        {
          title: "所属部门",
          key: "deptname",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 400,
          render: (h, params) => {
            var _self = this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: _self.realColor(params.row.lawEnforcerCardList, "0"),
                    size: "small"
                  },
                  style: {},
                  on: {
                    click: () => {
                      _self.lawTitle = "渔政执法证";
                      let type = "0";
                      _self.watchMsg(params.row, type);
                    }
                  }
                },
                "渔政执法证"
              ),
              h(
                "Button",
                {
                  props: {
                    type: _self.realColor(params.row.lawEnforcerCardList, "1"),
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.lawTitle = "海监执法证";
                      let type = "1";
                      _self.watchMsg(params.row, type);
                    }
                  }
                },
                "海监执法证"
              ),
              h(
                "Button",
                {
                  props: {
                    type: _self.realColor(params.row.lawEnforcerCardList, "2"),
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.lawTitle = "行政执法证";
                      let type = "2";
                      _self.watchMsg(params.row, type);
                    }
                  }
                },
                "行政执法证"
              )
            ]);
          }
        }
      ],
      subDept: true,
      btnInfo: ""
    };
  },
  computed: {
    clientHeight() {
      return this.$store.state.app.treeHeight - 28;
    },
    filterTree() {
      var tree = this.$util.deepCopy(this.deptTree);
      return this.$util.diguiTree(tree, this.treeSearch);
    },
    uploadData() {
      return {
        moduleId: "lawUserManage",
        dataId: this.info.photoId
      };
    },
    filePath() {
      if (!this.fileId) return this.$util.avatar;
      return this.$basePath + "/$admin/attachs/stream/" + this.fileId;
    }
  },
  watch: {
    // 'info.photoId': {
    //     handler (val, oldVal) {
    //         this.loadFiles();
    //     },
    //     deep: true
    // }
  },
  methods: {
    //下载模板
    downloadMb() {
      window.open(this.$basePath + "/LawEnforcementRepertory/template");
    },
    uploadSuccess(response, file, fileList) {
      this.fileId = response.data.id;
    },
    loadFiles() {
      var _self = this;
      _self.$http
        .get("/$admin/attachs", {
          params: this.uploadData
        })
        .then(function(result) {
          if (result.success) {
            var data = result.data;
            if (!isNull(data) && data.length > 0) {
              _self.fileId = data[0].id;
            } else {
              _self.fileId = "";
            }
          }
        });
    },
    realColor(row, type) {
      if (row === undefined) {
        return "error";
      } else {
        var str = "";
        var flag = false;
        row.forEach(item => {
          if (item.type === type) {
            flag = true;
          }
        });
        if (flag) {
          str = "info";
        } else {
          str = "error";
        }
        return str;
      }
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var _self = this;
          if (_self.btnInfo === "新增") {
            _self.$http
              .post("/LawEnforcementRepertory/lawCardSave", _self.info)
              .then(res => {
                if (res.success) {
                  _self.$Message.info("新增成功");
                  _self.modal.newLaw = false;
                  _self.initSearch();
                } else {
                  _self.$Message.info(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else if (_self.btnInfo === "保存") {
            _self.$http
              .patch("/LawEnforcementRepertory/lawCardUpdate", _self.info)
              .then(res => {
                if (res.success) {
                  _self.$Message.info("修改成功");
                  _self.modal.newLaw = false;
                  _self.initSearch();
                } else {
                  _self.$Message.info(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        } else {
          this.$Message.error("信息填写未完全！");
        }
      });
    },
    watchMsg(row, type) {
      var _self = this;
      var flag = false;
      // _self.$refs['info'].resetFields();
      var data = {};
      if (row.lawEnforcerCardList === undefined) {
        _self.btnInfo = "新增";
        _self.info = {};
        _self.info.photoId = _self.getUUID;
        _self.info.type = type;
      } else {
        row.lawEnforcerCardList.forEach(item => {
          if (item.type === type) {
            flag = true;
            data = item;
          }
        });
        if (flag) {
          _self.btnInfo = "保存";
          _self.info = data;
        } else {
          _self.btnInfo = "新增";
          _self.info = {};
          _self.info.type = type;
        }
      }
      _self.info.dateId = row.id;
      _self.modal.newLaw = true;
    },
    changeSubDept(flag) {
      var _self = this;
      if (flag) {
        _self.query.wheres.thisDept = "0";
      } else {
        _self.query.wheres.thisDept = "1";
      }
      _self.initSearch();
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.name = "";
      this.query.wheres.isEnforce = "true";
      this.query.page = 1;
      this.query.size = 10;
      this.initSearch();
    },
    handleEditdb(ids) {
      this.info = ids;
      this.modal.watchMsg = true;
      // this.handleEdit(ids);
    },
    selectTreeChange(v) {
      var _self = this;
      _self.query.wheres.path = v[0].path;
      _self.initSearch();
    },
    showTree() {
      var _self = this;
      _self.$http
        .get("/$admin/depts/depstree", {
          params: {
            query: JSON.stringify(_self.deptQuery)
          }
        })
        .then(res => {
          if (res.success) {
            _self.deptTree = res.data;
          }
        });
    },
    importXls(res) {
      if (res.success) {
        this.$Message.info("导入成功！");
      } else {
        this.$Message.error("导入失败！");
      }
    },
    errorImportXls(res) {
      this.$Message.error("导入失败！请规范模板。");
    },
    handleFormatError(res) {
      this.$Message.error("导入的文件类型不正确！");
    }
  },
  mounted() {
    var _self = this;
    _self.showTree();
    _self.$http
      .get("/$admin/attachs/uuid")
      .then(res => {
        _self.getUUID = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>