<style lang="less">
@import "../../../styles/commonStyle.less";
// @import '../../styles/common.less';
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/syncLog/getPage'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="8">
              <Form-item label="同步时间:">
                <DatePicker
                  type="date"
                  v-model="query.wheres.createTime_begin"
                  placeholder="开始时间"
                  style="width: 46%"
                ></DatePicker>-
                <DatePicker
                  type="date"
                  v-model="query.wheres.createTime_end"
                  placeholder="结束时间"
                  style="width: 46%"
                ></DatePicker>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="同步状态:">
                <Select v-model="query.wheres.status">
                  <Option value="0">失败</Option>
                  <Option value="1">成功</Option>
                  <Option value="2">储存</Option>
                  <Option value="9">推送等待</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="任务状态:">
                <Select v-model="query.wheres.type">
                  <Option value="0">重复下发</Option>
                  <Option value="1">结果回传</Option>
                  <Option value="2">任务下载</Option>
                </Select>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <!-- <div style="float:right">
              <Button @click="addTask" type="success">添加任务</Button>
            </div>-->
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal v-model="modal" title="同步记录" width="1200" class-name="modal" :mask-closable="false">
      <Table :columns="tableColumns" :data="data" border @on-selection-change="select"></Table>
      <div slot="footer">
        <Button @click="cancel()">取消</Button>
        <Button type="primary" @click="sure()" style="margin-left: 8px">批量同步</Button>
      </div>
    </Modal>
  </div>
</template> 

<script>
export default {
  components: {},
  data() {
    return {
      modal: false,
      data: [],
      title: "信息填写",
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let type = params.row.type;
            switch (type) {
              case "0":
                type = "重复下发";
                break;
              case "1":
                type = "结果回传";
                break;
              case "2":
                type = "任务下载";
                break;
            }
            return h("span", type);
          }
        },
        {
          title: "同步状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status;
            switch (status) {
              case "0":
                status = "待检查";
                break;
              case "1":
                status = "检查中";
                break;
              case "2":
                status = "已完结";
                break;
              case "9":
                status = "已完结";
                break;
            }
            return h("span", status);
          }
        },
        {
          title: "同步时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime.slice(0, createTime.indexOf(" "));
            return h("span", createTime);
          }
        },
        {
          title: "同步记录数",
          key: "infoCount",
          align: "center"
        },
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
                      this.details(params.row);
                    }
                  }
                },
                "查看同步记录"
              )
            );
            return h("div", buttons);
          }
        }
      ],
      tableColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: (h, params) => {
            let type = params.row.type;
            switch (type) {
              case "0":
                type = "重复下发";
                break;
              case "1":
                type = "结果回传";
                break;
              case "2":
                type = "任务下载";
                break;
            }
            return h("span", type);
          }
        },
        {
          title: "同步状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            let status = params.row.status;
            switch (status) {
              case "0":
                status = "待检查";
                break;
              case "1":
                status = "检查中";
                break;
              case "2":
                status = "已完结";
                break;
              case "9":
                status = "已完结";
                break;
            }
            return h("span", status);
          }
        },
        {
          title: "同步时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            let createTime = params.row.createTime;
            createTime = createTime.slice(0, createTime.indexOf(" "));
            return h("span", createTime);
          }
        }
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          createTime_begin: "",
          createTime_end: "",
          status: "",
          type: ""
        }
        //   orders: "updateTime desc"
      },
      selectData: []
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
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.createTime_begin = "";
      this.query.wheres.createTime_end = "";
      this.query.wheres.status = "";
      this.query.wheres.type = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    details(res) {
      this.modal = true;
      this.$http
        .get(`/supervision/syncLog/getSyncInfo?taskId=${res.taskId}`)
        // 返回值
        .then(res => {
          if (res.success) {
            this.data = res.data;
          }
        })
        .catch(error => {
          this.taskInfo = {};
        });
    },
    select(data) {
      console.log(data, "data");
    },
    cancel() {
      this.selectData = [];
      this.modal = false
    },
    sure() {
      if (this.selectData.length == 0) {
        this.$Message.error("请选择要同步的数据");
        return;
      }
      let idList = [];
      for (let i in this.selectData) {
        idList.push(this.selectChange[i].taskId);
      }
      this.$http
        .post(`/supervision/syncLog/syncManualOperation`, idList)
        // 返回值
        .then(res => {
          if (res.success) {
            this.$Message.success("推送成功");
            this.modal = false
          } else {
            this.$Message.error("推送失败");
          }
        })
        .catch(error => {
          this.$Message.error("推送失败");
        });
    }
  },
  mounted() {
    this.initSearch();
  },
  watch: {}
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
.btnBox {
  margin-bottom: 10px;
}
.title {
  font-size: 18px;
}
</style>
