<template>
  <div>
    <data-table
      ref="test"
      :url="'/check/shipContacts/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      :withTree="true"
      :useZtree="false"
      :treeUrl="'/$admin/depts/depstree'"
      :treeParams="treeQuery"
      :treeTitle="'所属地区'"
      @on-select-change="selectTreeChange"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
              <Form-item label="船名:">
                <Input v-model="query.wheres.shipname_like" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="船东:">
                <Input v-model="query.wheres.owner_like" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="手机号:">
                <Input v-model="query.wheres.tel_like" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>

            <span style="float:right;">
              <Button @click="add" type="info">新增</Button>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      :width="500"
      v-model="modal"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="false"
    >
      <Form :label-width="110" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="24">
            <FormItem label="姓名:" prop="name">
              <Input v-model="info.name">
                <Icon type="ios-search" slot="append" @click="userselectModal = true"></Icon>
              </Input>
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="联系人手机号码:" prop="mobile">
              <Input v-model="info.mobile" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="关系:" prop="relation">
              <Input v-model="info.relation" />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="类型:" prop="type">
              <Select v-model="info.type" style="width:358px">
                <Option value="1">普通监护人</Option>
                <Option value="2">村（社区）、公司（合作社）</Option>
                <Option value="3">乡镇（街道）</Option>
                <Option value="4">区县联络人（县（市、区）农业农村局）</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal=false">取消</Button>
        <Button type="primary" @click="submitData('info')">确定</Button>
      </div>
    </Modal>
    <Modal
      :width="800"
      v-model="tableModal"
      :styles="{top: '80px'}"
      :title="contactsTitle"
      :mask-closable="false"
    >
      <div>
        <Form
          :label-width="100"
          :model="contactsInfo"
          :rules="contactsInfoRules"
          ref="contactsInfo"
        >
          <Row>
            <Col span="12">
              <FormItem label="渔船名:" prop="shipname">
                <Input v-model="contactsInfo.shipname">
                  <Icon type="ios-search" slot="append" @click="baseShipModal = true">选择</Icon>
                </Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="船东:" prop="owner">
                <Input v-model="contactsInfo.owner"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系方式:" prop="tel">
                <Input v-model="contactsInfo.tel" />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div style="margin-bottom:10px">
          <span class="contactTitle">联系人</span>
          <Button
            v-show="contactsTitle != '详情'"
            @click="addContact"
            style="float:right"
            size="small"
            type="info"
          >新增</Button>
        </div>
        <Table border :columns="contactColumns" :data="contactData"></Table>
      </div>
      <div slot="footer">
        <Button @click="cancel('contactsInfo')">取消</Button>
        <Button v-show="contactsTitle != '详情'" type="primary" @click="sure('contactsInfo')">确定</Button>
      </div>
    </Modal>
    <selectShipModal v-model="baseShipModal" :inputShipName="contactsInfo.shipname" @on-select-ship="onSelectShip"></selectShipModal>
    <userselectModal v-model="userselectModal" @on-select-change="userSelectChange"></userselectModal>
  </div>
</template>

<script>
import selectShipModal from "@/views/components/selectModal/selectShipModal.vue";
import userselectModal from "@/views/components/workflow/userselectModal.vue";

export default {
  components: {
    selectShipModal,
    userselectModal
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value === "") {
        callback(new Error("请输入联系人手机号码"));
      } else if (!myreg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    const validateTel = (rule, value, callback) => {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (value === "") {
        callback(new Error("请输入联系方式"));
      } else if (!myreg.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      contactsInfoRules: {
        shipname: [
          { required: true, message: "渔船名称不能为空！", trigger: "blur" }
        ],
        owner: [{ required: true, message: "船东不能为空！", trigger: "blur" }],
        tel: [{ required: true, validator: validateTel, trigger: "blur" }]
      },
      infoRules: {
        name: [
          { required: true, message: "联系人不能为空！", trigger: "blur" }
        ],
        relation: [
          { required: true, message: "关系不能为空！", trigger: "blur" }
        ],
        mobile: [
          { required: true, validator: validateMobile, trigger: "blur" }
        ],
        type: [{ required: true, message: "类型不能为空！", trigger: "change" }]
      },
      modal: false,
      baseShipModal: false,
      userselectModal: false,
      tableModal: false,
      title: "新增",
      contactsTitle: "详情",
      index: "",
      info: {
        type: "",
        name: "",
        userid: "",
        mobile: "",
        relation: "",
        sort: ""
      },
      contactsInfo: {
        shipname: "",
        shipid: "",
        owner: "",
        tel: "",
        cjllr: [], //村级联络人
        xzllr: [], //乡级联络人
        qxllr: [], //区县联络人
        ptllr: [] //普通联络人
      },
      contactData: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipname",
          align: "center"
        },
        {
          title: "船东",
          key: "owner",
          align: "center"
        },
        {
          title: "手机号",
          key: "tel",
          align: "center"
        },
        {
          title: "关系",
          key: "relation",
          align: "center",
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.contacts(params.row);
                    }
                  }
                },
                "查看"
              )
            );
            return h("div", buttons);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "150px",
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "修改"
              )
            ),
              buttons.push(
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
                        this.deleteList(params.row);
                      }
                    }
                  },
                  "删除"
                )
              );
            return h("div", buttons);
          }
        }
      ],
      contactColumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "联系方式",
          key: "mobile",
          align: "center"
        },
        {
          title: "关系",
          key: "relation",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let type = params.row.type;
            if (type == "1") {
              type = "普通监护人";
            } else if (type == "2") {
              type = "村（社区）、公司（合作社）";
            } else if (type == "3") {
              type = "乡镇（街道）";
            } else {
              type = "区县联络人（县（市、区）农业农村局）";
            }
            return h("div", type);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: "150px",
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editContact(params.row);
                    }
                  }
                },
                "修改"
              )
            ),
              buttons.push(
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
                        this.delContact(params.row);
                      }
                    }
                  },
                  "删除"
                )
              );
            return h("div", buttons);
          }
        }
      ],
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipname_like: "",
          owner_like: "",
          tel_like: "",
          deptid: ""
        }
      },
      treeQuery: {
        key: "getDeptTreeGrid",
        orders: "sort asc",
        wheres: {
          pathlike: ""
        }
      },
    };
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.shipname_like = "";
      this.query.wheres.owner_like = "";
      this.query.wheres.tel_like = "";
      this.query.wheres.deptid = ""
      this.$refs.test.initSearch();
    },
    selectTreeChange(val) {
      this.query.wheres.deptid = val[0].id;
      this.initSearch();
    },
    selectChange() {},
    onSelectShip(row) {
      this.contactsInfo.shipname = row.shipname;
      this.contactsInfo.shipid = row.shipid;
      this.contactsInfo.owner = row.owner;
      this.contactsInfo.tel = row.tel;
    },
    userSelectChange(nodes) {
      this.info.userid = nodes[0].id;
      this.info.name = nodes[0].title;
      this.info.mobile = nodes[0].mobile
    },
    pushAction() {
      let arr = this.contactColumns.filter(key => {
        return key.key == "action";
      });
      if (arr.length < 1) {
        this.contactColumns.push({
          title: "操作",
          key: "action",
          align: "center",
          width: "150px",
          render: (h, params) => {
            let buttons = [];
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editContact(params.row);
                    }
                  }
                },
                "修改"
              )
            ),
              buttons.push(
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
                        this.delContact(params.row);
                      }
                    }
                  },
                  "删除"
                )
              );
            return h("div", buttons);
          }
        });
      }
    },
    add() {
      this.pushAction();
      this.contactsTitle = "新增";
      this.tableModal = true;
    },
    edit(row) {
      this.pushAction();
      this.contactsTitle = "修改";
      this.getContactsInfo(row);
    },
    submitData(name) {
      console.log(this.contactData);
      this.$refs[name].validate(valid => {
        if (valid) {
          let info = JSON.parse(JSON.stringify(this.info));
          if (this.title == "新增") {
            this.contactData.push(info);
            this.modal = false;
          } else {
            this.contactData.splice(this.index, 1);
            this.contactData.push(info);
            this.modal = false;
          }
        } else {
          this.$Message.error("填写存在错误");
          return;
        }
      });
    },
    deleteList(row) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http.delete("/check/shipContacts/" + row.id).then(res => {
            if (res.success) {
              this.initSearch();
              this.$Message.info("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
          });
        },
        onCancel: () => {}
      });
    },
    contacts(row) {
      this.contactsTitle = "详情";
      for (let i in this.contactColumns) {
        if (this.contactColumns[i].key == "action") {
          this.contactColumns.splice(i, 1);
        }
      }
      this.getContactsInfo(row);
    },
    cancel(name) {
      this.tableModal = false;
    },
    getContactsInfo(row) {
      this.tableModal = true;
      this.$http.get(`/check/shipContacts/${row.id}`).then(res => {
        if (res.success) {
          console.log(res, "res");
          this.contactsInfo = res.data;
          this.contactData = [
            ...res.data.qxllr,
            ...res.data.cjllr,
            ...res.data.xzllr,
            ...res.data.ptllr
          ];
        } else {
          this.$Message.error("请求失败");
        }
      });
    },
    sure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.contactsInfo.ptllr = this.contactData.filter(key => {
            return key.type == "1";
          });
          this.contactsInfo.cjllr = this.contactData.filter(key => {
            return key.type == "2";
          });
          this.contactsInfo.xzllr = this.contactData.filter(key => {
            return key.type == "3";
          });
          this.contactsInfo.qxllr = this.contactData.filter(key => {
            return key.type == "4";
          });
          console.log(this.contactsInfo);
          if (this.contactsTitle == "新增") {
            this.$http
              .post("/check/shipContacts", this.contactsInfo)
              .then(res => {
                if (res.success) {
                  this.initSearch();
                  this.tableModal = false;
                  this.$Message.info("新增成功");
                } else {
                  this.$Message.error("新增失败");
                }
              });
          } else {
            this.$http
              .put(
                `/check/shipContacts/${this.contactsInfo.id}`,
                this.contactsInfo
              )
              .then(res => {
                if (res.success) {
                  this.initSearch();
                  this.tableModal = false;
                  this.$Message.info("修改成功");
                } else {
                  this.$Message.error("修改失败");
                }
              });
          }
        } else {
          this.$Message.error("填写存在错误");
          return;
        }
      });
    },
    addContact() {
      this.modal = true;
      this.title = "新增";
    },
    editContact(row) {
      this.modal = true;
      this.info = row;
      this.index = row._index;
      this.title = "编辑";
    },
    delContact(row) {
      this.contactData.splice(row._index, 1);
    }
  },
  mounted() {
    this.initSearch();
  },
  watch: {
    modal(val) {
      if (val === false) {
        this.info = {
          type: "",
          name: "",
          userid: "",
          mobile: "",
          relation: "",
          sort: ""
        };
        // this.$refs["info"].resetFields();
      }
    },
    tableModal(val) {
      if (val === false) {
        this.contactsInfo = {
          shipname: "",
          shipid: "",
          owner: "",
          tel: "",
          cjllr: [], //村级联络人
          xzllr: [], //乡级联络人
          qxllr: [], //区县联络人
          ptllr: [] //普通联络人
        };
        this.contactData = []
        // this.$refs["info"].resetFields();
      }
    }
  }
};
</script>

<style scoped>
.contactTitle {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>