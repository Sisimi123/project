<style lang="less">
// @import "../../../styles/commonStyle.less";
@import "../../styles/common.less";
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/enforces/synccase/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="船名:">
                <Input v-model="query.wheres.shipname" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="当事人名称:" :label-width="110">
                <Input v-model="query.wheres.name" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="案由:">
                <Input v-model="query.wheres.illegalAct" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="同步状态:">
                <Select v-model="query.wheres.success" @on-change="initSearch">
                    <Option value="">全部</Option>
                    <Option value="0">待同步</Option>
                    <Option value="1">同步成功</Option>
                    <Option value="2">同步失败</Option>
                    <Option value="3">删除同步</Option>
                </Select>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <div class="btn-right">
              <Button @click="batchSyn()" type="info">批量同步</Button>
            </div>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal v-model="issuedStatus" class="vertical-center-modal detail" title="公开状态" width="265">
      <Form :label-width="60" @submit.native.prevent>
        <Row>
          <Col span="24">
            <div style="position: relative; top: 1px;">
              <Form-item label="状态：">
                <RadioGroup type="button" v-model="issuedStatusData.status">
                  <span style="padding-left:10px">
                    <Radio label="1">已公开</Radio>
                  </span>
                  <span style="padding-left:10px">
                    <Radio label="0">未公开</Radio>
                  </span>
                </RadioGroup>
              </Form-item>
            </div>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <i-Button @click="issuedStatus=false">取消</i-Button>
        <i-Button type="info" @click="saveIssuedStatus">保存</i-Button>
      </div>
    </Modal>
  </div>
</template> 

<script>
export default {
  components: {},
  data() {
    return {
      issuedStatus: false,
      issuedStatusData: {
        id: "",
        caseId: "",
        status: ""
      },
      model: false,
      tableModel: false,
      addFooter: true,
      modal_loading: false,
      indeterminate: true,
      checkAll: false,
      title: "信息填写",
      columns: [
        {
          title: "序号",
          type: "index",
          width: 65,
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipname",
          align: "center"
        },
        {
          title: "当事人",
          key: "name",
          align: "center"
        },
        {
          title: "案由",
          key: "illegalAct",
          align: "center"
        },
        {
          title: "案件序列号",
          key: "fdsCaseid",
          align: "center"
        },
        {
          title: "案件编号",
          key: "caseNum",
          align: "center",
          width: 230,
          render: (h, params) => {
            let row = params.row;
              var caseNum =row.enforceType +"〔" +row.enforceYear +"〕" +row.enforceNum +"号";
            return h("span", caseNum);
          }
        },
        // {
        //   title: "案件年份",
        //   key: "enforceYear",
        //   align: "center",
        //   maxWidth: 80
        // },
        // {
        //   title: "案件编号",
        //   key: "enforceNum",
        //   align: "center",
        //   maxWidth: 80
        // },
        {
          title: "同步时间",
          key: "updateTime",
          align: "center",
          maxWidth: 160
        },
        {
          title: "同步状态",
          key: "success",
          width: 90,
          align: "center",
          render: (h, params) => {
            let success = params.row.success;
            switch (success) {
              case "0":
                success = "待同步 ";
                break;
              case "1":
                success = "同步成功";
                break;
              case "2":
                success = "同步失败 ";
                break;
              case "3":
                success = "删除同步 ";
                break;
            }
            return h("span", success);
          }
        },
        {
          title: "案件状态",
          key: "status",
          width: 90,
          align: "center",
          render: (h, params) => {
            var span="";
            let row = params.row;
            if(row.del!="0"){
              span="已删除"
            }else{
              let status = row.status;
              switch (status) {
                case "0":
                  span = "草稿 ";
                  break;
                case "1":
                  span = "案件办理中";
                  break;
                case "2":
                  span = "待结案 ";
                  break;
                case "8":
                  span = "已结案 ";
                  break;
              }
            }
            return h("span", span);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 320,
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
                      this.resetSyn(params.row);
                    }
                  }
                },
                "重置同步"
              ),
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
                      this.seeCase(params.row);
                    }
                  }
                },
                "查看案件"
              ),
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.getIssuedStatus(params.row);
                    }
                  }
                },
                "公开状态"
              ),
              h(
                "Button",
                {
                  props: { type: "primary", size: "small" },
                  style: { marginRight: "5px" },
                  on: {
                    click: () => {
                      this.syncNow(params.row);
                    }
                  }
                },
                "立即同步"
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
          shipname: "",
          name: "",
          illegalAct: ""
        }
        //   orders: "updateTime desc"
      },
      resetQuery: {
        id: ""
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
    saveIssuedStatus() {
      this.$http
        .post(
          "/enforces/synccase/setStatus?" +
            "id=" +
            this.issuedStatusData.id +
            "&caseId=" +
            this.issuedStatusData.caseId +
            "&status=" +
            this.issuedStatusData.status
        )
        .then(res => {
          if (res.success) {
            this.issuedStatus = false;
            this.$Message.info("保存成功");
            this.$refs.test.initSearch();
          } else {
            this.$Message.err(res.msg);
          }
        })
        .catch(error => {
          this.$Message.info("保存失败");
        });
    },
    getIssuedStatus(row) {
      this.issuedStatusData.id = row.lshId;
      this.issuedStatusData.caseId = row.caseId;
      this.$http
        .get("/enforces/synccase/getStatus?" + "caseId=" + row.caseId)
        .then(res => {
          if (res.success) {
            this.issuedStatusData.status = res.data;
          } else {
            this.$Message.err(res.msg);
          }
        })
        .catch(error => {
          this.$Message.info("获取失败");
        });
      this.issuedStatus = true;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.shipname = "";
      this.query.wheres.name = "";
      this.query.wheres.illegalAct = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    resetSyn(row) {
      console.log(row, "row");
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>确定是否要进行重置同步！</p>",
        onOk: () => {
          this.resetQuery.id = row.lshId;
          this.$http
            //请求路径
            .patch("/enforces/synccase/reset?id=" + row.lshId)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("重置成功");
                this.initSearch();
              }
            })
            .catch(error => {
              this.$Message.info("重置失败");
            });
        },
        onCancel: () => {}
      });
    },
    seeCase(row) {
      this.$router.push({
        path: "/enforcement/case/addCase",
        query: { view: "9", caseId: row.caseId }
      });
    },
    syncNow(row){
      this.$http
        .post(
          `/enforces/synccase/syncData?caseid=${row.caseId}`)
        .then(res => {
          if (res.success) {
            this.$Message.info("同步成功！");
            this.$refs.test.initSearch();
          } else {
            this.$Message.err(res.msg);
          }
        })
        .catch(error => {
          this.$Message.info("同步失败！");
        });
    },
    batchSyn(){
      this.$http
        .post(
          `/enforces/synccase/batchSyncData`)
        .then(res => {
          if (res.success) {
            this.$Message.info("批量同步成功！");
            this.$refs.test.initSearch();
          } else {
            this.$Message.err(res.msg);
          }
        })
        .catch(error => {
          this.$Message.info("同步失败！");
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
.btn-right{
  float: right;
}
/*  以上是表格 */

.searColumn {
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
  /* 				height:45px; */
  /* 				line-height:45px; */
  /* 				text-indent:20px; */
  margin: 10px 0px;
}
.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
  /* 				width%; */
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
}

/* upload 样式 */
.demo-upload-list,
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
}
</style>
