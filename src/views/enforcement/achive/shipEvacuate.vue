<style lang="less" scoped>
@import "../styles/achive.less";
.tableBox td {
  padding: 4px;
}
#customFormTable th {
  border: 1px solid #e9eaec;
  height: 30px;
  line-height: 30px;
}
#customFormTable td {
  border: 1px solid #e9eaec;
  /* height: 50px; */
  /* line-height: 50px; */
  text-align: center;
}
</style>
<template>
  <div>
    <data-table
      ref="test"
      :withTree="true"
      :useZtree="false"
      :treeUrl="'/$admin/depts/depstree'"
      :treeParams="treeQuery"
      :treeTitle="'所属地区'"
      @on-select-change="selectTreeChange"
      :url="'/check/evacuate/page'"
      :params="query"
      :columns="columns"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="所属台风:">
                <Select filterable @on-change="selectYear" v-model="tfSelectQuery">
                  <Option
                    v-for="item in yearsList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="2">
              <Form-item :label-width="10">
                <Select v-if="rendering" v-model="query.wheres.typhoonId" filterable>
                  <Option
                    v-for="item in typhoonList"
                    :value="item.tfbh"
                    :key="item.tfbh"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="开始时间:">
                <DatePicker v-model="query.wheres.beginTime" type="datetime" placeholder="请选择日期时间"></DatePicker>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="结束时间:">
                <DatePicker v-model="query.wheres.endTime" type="datetime" placeholder="请选择日期时间"></DatePicker>
              </Form-item>
            </Col>
            <div class="btn-wrap" style="margin-right:20px">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <span style="float:right;margin-bottom:10px">
              <ButtonGroup>
                <Button @click="newWin" type="info" icon="ios-add">新增</Button>
                <Button @click="statistical" type="primary">统计</Button>
              </ButtonGroup>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      :width="800"
      v-model="modal.showDetail"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="maskclosable"
    >
      <Form :label-width="120" :model="info" ref="info">
        <Row>
          <Col span="12">
            <FormItem v-if="rendering2" label="所属台风:">
              <Select
                v-if="rendering"
                v-model="info.typhoonId"
                filterable
                @on-change="selectTf"
                :label-in-value="true"
                :disabled="tfEdit"
              >
                <Option
                  v-for="item in typhoonList"
                  :value="item.tfbh"
                  :key="item.tfbh"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="渔船总数:">
              <Input v-model="info.allCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="已在港渔船:">
              <Input v-model="info.inPortCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="受台风影响范围外渔船:" :label-width="140">
              <Input v-model="info.unaffectedCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="实际应撤离渔船数:">
              <Input v-model="info.shouldEvacuateCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="已撤离渔船数:">
              <Input v-model="info.evacuatedCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="在撤离渔船数:">
              <Input v-model="info.evacuatingCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="未撤离渔船数:">
              <Input v-model="info.notEvacuateCount" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="备注:">
              <Input v-model="info.note" type="textarea" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal.showDetail=false">取消</Button>
        <Button v-show="btnShow" type="primary" @click="submitData">{{this.btnInfo}}</Button>
      </div>
    </Modal>
    <Modal :width="1000" v-model="modal.statisticalModal" :styles="{top: '80px'}" title="渔船撤离情况统计">
      <Table stripe border :columns="statisticalColumns" :data="statisticalData" :height="500"></Table>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rendering: true,
      tfEdit: false,
      btnShow: false,
      ifEdit: false,
      btnInfo: "",
      maskclosable: false,
      modal: {
        showDetail: false,
        statisticalModal: false
      },
      tfSelectQuery: "2019",
      title: "",
      treeQuery: {
        key: "getDeptTreeGrid",
        orders: "sort asc",
        wheres: {
          pathlike: ""
        }
      },
      query: {
        page: 1,
        size: 10,
        wheres: {
          typhoonId: "",
          deptid: "",
          beginTime: "",
          endTime: ""
        }
      },
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          minWidth: 140
        },
        {
          key: "typhoonName",
          title: "所属台风",
          align: "center",
          minWidth: 140
        },
        {
          key: "allCount",
          title: "渔船总数",
          align: "center",
          minWidth: 140
        },
        {
          key: "inPortCount",
          title: "已在港渔船",
          align: "center",
          minWidth: 140
        },
        {
          key: "unaffectedCount",
          title: "受台风影响范围外渔船",
          align: "center",
          minWidth: 140
        },
        {
          key: "shouldEvacuateCount",
          title: "实际应撤离渔船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "evacuatedCount",
          title: "已撤离渔船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "evacuatingCount",
          title: "正在撤离渔船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "notEvacuateCount",
          title: "未撤离渔船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "updateTime",
          title: "更新时间",
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
      yearsList: [],
      typhoonList: [],
      info: {
        typhoonName: ""
      },
      dataId: "",
      rendering2: true,
      statisticalColumns:[
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 50
        },
        {
          key: "name",
          title: "名称",
          align: "center",
        },
        {
          key: "allCount",
          title: "渔船总数",
          align: "center",
        },
        {
          key: "evacuatedCount",
          title: "已撤离渔船数",
          align: "center",
        },
        {
          key: "shouldEvacuateCount",
          title: "应该撤离渔船数",
          align: "center",
        },
        {
          key: "inPortCount",
          title: "已进港渔船数",
          align: "center",
        },
        {
          key: "notEvacuateCount",
          title: "未撤离渔船数",
          align: "center",
        },
        {
          key: "unaffectedCount",
          title: "受台风影响范围外渔船",
          align: "center",
        },
      ],
      statisticalData:[]
    };
  },
  methods: {
    selectTreeChange(val) {
      this.query.wheres.deptid = val[0].id;
      this.initSearch();
    },
    selectTf(v) {
      var _self = this;
      _self.info.typhoonName = v.label;
    },
    handleDelete(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/check/evacuate/" + index.id)
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
    editWin(row) {
      var _self = this;
      _self.rendering2 = true;
      if (_self.typhoonList.length === 0) {
        // _self.selectYear();
        _self.$Message.error("暂无台风数据！");
        return;
      }
      this.dataId = row.id;
      this.$refs["info"].resetFields();
      if (this.title === "详情") {
        this.btnShow = false;
        this.ifEdit = true;
        this.tfEdit = true;
      } else if (this.title === "编辑") {
        this.btnShow = true;
        this.btnInfo = "保存";
        this.ifEdit = false;
        this.tfEdit = true;
      }
      this.info = row;
      this.modal.showDetail = true;
    },
    submitData() {
      if (this.title === "新增") {
        this.$http
          .post("/check/evacuate/add", this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("操作成功!");
              this.modal.showDetail = false;
              this.rendering2 = false;
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
          .put("/check/evacuate/" + this.dataId, this.info)
          .then(res => {
            if (res.success) {
              this.$Message.info("操作成功");
              this.modal.showDetail = false;
              this.rendering2 = false;
              this.initSearch();
            } else {
              this.$Message.info(res.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    newWin() {
      var _self = this;
      _self.info = {};
      _self.rendering2 = true;
      if (_self.typhoonList.length === 0) {
        _self.selectYear();
      }
      this.title = "新增";
      this.tfEdit = false;
      this.btnShow = true;
      this.ifEdit = false;
      this.btnInfo = "保存";
      this.$refs["info"].resetFields();
      this.modal.showDetail = true;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.typhoonId = "";
      this.query.wheres.beginTime = "";
      this.query.wheres.endTime = "";
      this.query.wheres.deptid = "";
      this.query.page = 1;
      this.query.size = 10;
      this.tfSelectQuery = new Date().getFullYear().toString();
      this.initSearch();
    },
    getYearsList() {
      var _self = this;
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      year = parseInt(year);
      for (let i = year - 2015; i >= 0; i--) {
        _self.yearsList.push({
          label: 2015 + i + "",
          value: 2015 + i + ""
        });
      }
    },
    // getDefaultTf () {
    //     var _self = this;
    //     _self.$http.get('/map/weather/typhoon?years=' + '2019')
    //         .then(res => {
    //             console.log(_self.typhoonList,'1')
    //             _self.typhoonList = res.data;
    //         }).catch(err => {
    //             console.log(err);
    //         });
    // },
    statistical() {
      if (!this.query.wheres.deptid) {
        this.$Message.error("请选择部门！");
        return;
      }
      if (!this.query.wheres.typhoonId) {
        this.$Message.error("请选择台风！");
        return;
      }
      let params = new URLSearchParams();
      let json = JSON.stringify(this.query);
      params.append("query", json);
      this.modal.statisticalModal = true;
      this.$http
        .get(`/check/evacuate/statistic`, {
          params: params
        })
        .then(res => {
          if (res.success) {
            this.statisticalData = res.data;
            console.log(this.itemList, "this.itemList");
          } else {
            this.statisticalData = [];
            this.$Message.error(res.msg);
          }
        })
        .catch(err => {
          this.statisticalData = [];
        });
    },
    selectYear(value) {
      var _self = this;
      if (value === undefined || value === "") {
        value = new Date().getFullYear();
      }
      _self.rendering = false;
      _self.$http
        .get("/map/weather/typhoon?years=" + value)
        .then(res => {
          console.log(res, "typhoon");
          if (res.success) {
            _self.typhoonList = res.data;
            _self.rendering = true;
          }
          // _self.$nextTick(() => {
          //     _self.typhoonList = res.data;
          // });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    var _self = this;
    _self.getYearsList();
    _self.tfSelectQuery = new Date().getFullYear().toString();
    _self.treeQuery.wheres.pathlike =
      _self.$store.state.user.userInfo.dept.path;
  }
};
</script>