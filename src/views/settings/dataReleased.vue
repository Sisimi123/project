<style lang="less">
// @import "../../../styles/commonStyle.less";
@import "../../styles/common.less";
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/clientDataSync/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="全类名:">
                <Input v-model="query.wheres.tableName_like" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <div class="btn-right">
              <Button @click="add()" type="success" icon="ios-add">新增</Button>
            </div>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      v-model="model"
      :title="title"
      width="750"
      class-name="modal"
      :mask-closable="false"
      @on-ok="sure('info')"
      @on-cancel="cancel('info')"
    >
      <Form ref="info" :model="info" :rules="rules" :label-width="100">
        <Row>
          <Col :span="12">
            <FormItem label="类型：" prop="syncType">
              <RadioGroup v-model="info.syncType">
                <Radio label="1">类</Radio>
                <Radio label="2">表名</Radio>
                <Radio label="3">sql</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="增量更新：" prop="incrUpdate">
              <RadioGroup v-model="info.incrUpdate">
                <Radio label="0">否</Radio>
                <Radio label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col :span="12" v-show="info.syncType == '1'">
            <FormItem label="类全名：" prop="className">
              <Input v-model="info.className" style="width:auto"></Input>
            </FormItem>
          </Col>
          <Col :span="12" v-show="info.syncType == '2'">
            <FormItem label="表名：" prop="tableName">
              <Input v-model="info.tableName" style="width:auto"></Input>
            </FormItem>
          </Col>
          <Col :span="12">
            <FormItem label="cron：" prop="cron">
              <Input v-model="info.cron" style="width:auto"></Input>
            </FormItem>
          </Col>
          <Col :span="12" v-show="info.syncType != '1'">
            <FormItem label="主键列名：" prop="idColumn">
              <Input v-model="info.idColumn" style="width:auto"></Input>
            </FormItem>
          </Col>
          <Col :span="24" v-show="info.syncType == '3'">
            <FormItem label="sql/select语句：" prop="dataSql">
              <Input type="textarea" v-model="info.dataSql" style="width:550px"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template> 

<script>
export default {
  components: {},
  data() {
    return {
      model: false,
      title: "新增",
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "类名",
          key: "className",
          align: "center"
        },
        {
          title: "表名",
          key: "tableName",
          align: "center"
        },
        {
          title: "列名",
          key: "columns",
          align: "center"
        },
        {
          title: "类型",
          key: "syncType",
          align: "center",
          render: (h, params) => {
            let syncType = params.row.syncType;
            switch (syncType) {
              case 1:
                syncType = "类";
                break;
              case 2:
                syncType = "表名";
                break;
              case 3:
                syncType = "sql";
                break;
            }
            return h("span", syncType);
          }
        },
        {
          title: "sql/select 语句",
          key: "dataSql",
          align: "center"
        },
        {
          title: "增量更新",
          key: "incrUpdate",
          align: "center",
          render: (h, params) => {
            let incrUpdate = params.row.incrUpdate;
            switch (incrUpdate) {
              case 0:
                incrUpdate = "否";
                break;
              case 1:
                incrUpdate = "是";
                break;
            }
            return h("span", incrUpdate);
          }
        },
        // {
        //   title: "是否开启",
        //   key: "open",
        //   align: "center",
        //   width: 80,
        //   render: (h, params) => {
        //      let isOpen = params.row.open
        //      switch(isOpen){
        //          case 0:
        //             isOpen = "关闭 "
        //             break;
        //          case 1:
        //             isOpen = "开启"
        //             break;
        //      }
        //      return h("span",isOpen)
        //   }
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
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
              );
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
                        this.del(params.row);
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
      info: {},
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          tableName_like: ""
        }
        //   orders: "updateTime desc"
      }
    };
  },
  computed: {
    rules() {
      var _self = this;
      return {
        syncType: [
          {
            required: true,
            type: "string",
            message: "请选择类型",
            trigger: "change"
          }
        ],
        incrUpdate: [
          {
            required: true,
            type: "string",
            message: "请选择增量更新",
            trigger: "change"
          }
        ],
        cron: [
          {
            required: true,
            type: "string",
            message: "请选择cron",
            trigger: "blur"
          }
        ],
        className: [
          {
            validator: function(rule, value, callback) {
              var syncType = _self.info.syncType;
              if (syncType == "1") {
                if (!_self.info.className) {
                  return callback(new Error("请填写类全名"));
                }
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        tableName: [
          {
            validator: function(rule, value, callback) {
              var syncType = _self.info.syncType;
              if (syncType == "2") {
                if (!_self.info.tableName) {
                  return callback(new Error("请填写表名"));
                }
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        idColumn: [
          {
            validator: function(rule, value, callback) {
              var syncType = _self.info.syncType;
              if (syncType == "2" || syncType == "3") {
                if (!_self.info.idColumn) {
                  return callback(new Error("请填写主键列名"));
                }
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        dataSql: [
          {
            validator: function(rule, value, callback) {
              var syncType = _self.info.syncType;
              if (syncType == "3") {
                if (!_self.info.dataSql) {
                  return callback(new Error("请填写sql/select语句"));
                }
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      };
    }
  },
  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.search = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    radioChange(value) {
      this.initSearch();
    },
    add() {
      this.title = "新增";
      this.model = true;
      this.info = {}
      this.$refs['info'].resetFields();
    },
    sure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.title == "新增") {
            this.$http
              .post(`/clientDataSync`, this.info)
              // 返回值
              .then(res => {
                if (res.success) {
                  this.model = false;
                  this.$Message.success("新增成功");
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                this.$Message.error("操作失败");
              });
          } else {
            this.$http
              .put(`/clientDataSync/`+ row.id, this.info)
              // 返回值
              .then(res => {
                if (res.success) {
                  this.model = false;
                  this.$Message.success("修改成功");
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                this.$Message.error("操作失败");
              });
          }
        } else {
          this.$Message.error("请填写完全");
          return false
        }
      });
    },
    cancel(name) {},
    edit(row) {
      this.info = row
    },
    del(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/clientDataSync/" + row.id)
            .then(res => {
              this.$Message.success("操作成功");
              this.initSearch();
            })
            .catch(err => {
              console.log(error);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
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

.btn-right {
  float: right;
}
</style>
