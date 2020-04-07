<style lang="less">
@import "../../../styles/commonStyle.less";
.inputDiv {
  overflow: hidden;
  display: block;
  margin-bottom: 15px;
}
</style>
<template>
  <div>
    <data-table ref="test" :url="'/check/shipsillegal/page'" :params="query" :columns="columns" :autoInitTable="false" @on-selection-change="selectChange">
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
            <Form-item label="船名:">
              <Input v-model="query.wheres.shipname_like" placeholder="请输入..."></Input>
            </Form-item>
            </Col>

            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>

            <span style="float:right;">
              <Button @click="sms" type="primary">短信模板设置</Button>
              <Button @click="addList" type="info">新增</Button>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal :width="900" v-model="showDetail" :styles="{top: '80px'}" :title="title" :mask-closable="maskclosable">
      <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="12">
          <FormItem label="渔船名:" prop="shipname">
            <Input v-model="info.shipname" :readonly="true?title == '修改': title== '新增'">
            <Icon type="ios-search" v-show="title == '新增'" slot="append" @click="baseShipModal = true">选择</Icon>
            </Input>
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
        <Button @click="showDetail=false">取消</Button>
        <Button type="primary" @click="submitData('info')">确定</Button>
      </div>
    </Modal>
    <selectShipModal v-model="baseShipModal" @on-select-ship="onSelectShip"></selectShipModal>
    <callPoliceSms ref="callPoliceSms" :type="type" :template="template" :title="smsTitle" :templateObj="templateObj" :labelWidth="75"></callPoliceSms>
  </div>
</template> 

<script>
import selectShipModal from "@/views/components/selectModal/selectShipModal.vue";
import callPoliceSms from "./components/callPoliceSms";

export default {
  components: {
    selectShipModal,
    callPoliceSms
  },
  data() {
    return {
      infoRules: {
        shipname: [
          { required: true, message: "渔船名称不能为空！", trigger: "blur" }
        ]
      },
      model: false,
      showDetail: false,
      baseShipModal: false,
      ifEdit: false,
      maskclosable: false,
      title: "新增",
      type: "wjczcg_bj",
      smsTitle: "违禁船只出港提醒短信模板",
      template: {
        template1: "回港提醒",
        template2: "返航提醒"
      },
      templateObj: {
        template1: "",
        template2: ""
      },
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
          title: "联系电话",
          key: "tel",
          align: "center"
        },
        // {
        //   title: "船籍港",
        //   key: "cjg",
        //   align: "center"
        // },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status;
            if (status == "1") {
              status = "在港";
            } else if (status == "2") {
              status = "正在回港";
            } else if (status == "3") {
              status = "从事作业";
            } else {
              status = "未知";
            }
            return h("span", status);
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
                      this.amend(params.row);
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
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipname_like: "",
          organId: "4409"
        }
        // orders: "updateTime desc"
      },
      data: [],
      info: {
        shipname: "",
        shipid: "",
        note: ""
      }
    };
  },
  computed: {
    //  getFormItem() {
    //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    //  },
    //  defaultUserName() {
    //    return this.$store.state.user.userInfo.name;
    //  },
  },
  // 方法.事件
  methods: {
    sms() {
      this.$refs.callPoliceSms.modal = true;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.shipname_like = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    onSelectShip(row) {
      this.info = row;
    },
    //   initQuery(){
    //       var query = this.$route.query;
    //       if(!this.isEmpty(query.shipName)){
    //             this.query.wheres.shipName_like = query.shipName;
    //             this.query.wheres.withOutRule = "1";
    //       }
    //       this.initSearch();
    //  },
    isEmpty(s) {
      if (
        s == "" ||
        s == undefined ||
        s == null ||
        JSON.stringify(s) === "{}"
      ) {
        return true;
      }
      return false;
    },
    addList() {
      this.showDetail = true;
      this.title = "新增";
      this.info = {};
    },
    amend(row) {
      this.showDetail = true;
      this.title = "修改";
      this.info = row;
    },
    deleteList(row) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http.delete("/check/shipsillegal/" + row.id).then(res => {
            console.log(res);
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
    submitData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          console.log(this.title);
          if (this.title == "新增") {
            this.$http.post("/check/shipsillegal", this.info).then(res => {
              if (res.success) {
                this.initSearch();
                this.showDetail = false;
                this.$Message.info("新增成功");
              } else {
                this.$Message.error("新增失败");
              }
            });
          } else {
            this.$http
              .put(`/check/shipsillegal/${this.info.id}`, this.info)
              .then(res => {
                if (res.success) {
                  this.initSearch();
                  this.showDetail = false;
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
    cancel(name) {
      this.$refs["info"].resetFields();
      this.showDetail = false;
    }
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
  }
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}

/*  以上是表格 */

/* .searColumn {
  padding: 10px 20px 10px 20px;
}
.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}
label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}

label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}

.selec {
  width: 120px;
}

.selec2 {
  width: 85px;
}

.both-white-padding {
  margin: 0 20px;
}

th.ivu-table-column-left div.ivu-table-cell {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-input {
  font-size: 12px;
  border: none;
  out-line: none;
  color: #000;
}
.el-input__inner {
  height: 32px;
  border: none;
  outline-style: none;
}
.text-required {
  display: inline-block;
  color: red;
}
.fk-box1 {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
}
.fk-title {
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  background: #f8f8f9;
}
.fk-content {
  margin: 10px 0px;
}
.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
}
.fk-text {
  float: left;
  width: 90%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 40px;
}
.fk-img {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 130px;
  height: 120px;
}
p.mark {
  font-size: 12px;
  margin: 0 auto;
}
input:disabled {
  border: none;
  background-color: #fff;
  color: #aca899;
} */

/* upload 样式 */
/* .demo-upload-list,
.qm-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.qm-upload-list {
  width: 200px;
  height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
} */
</style>
