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
      :url="'/check/shelter/page'"
      :params="query"
      :columns="columns"
      :withTree="true"
      :useZtree="false"
      :treeUrl="'/$admin/depts/depstree'"
      :treeParams="treeQuery"
      :treeTitle="'所属地区'"
      @on-select-change="selectTreeChange"
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
                    v-model="info.typhoonId"
                    filterable
                    @on-change="selectTf"
                    :label-in-value="true"
                    :disabled="tfEdit"
                  >
                    <Option
                      v-for="(item,index) in typhoonList"
                      :value="item.tfbh"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="避风点:">
                  <!-- <Input v-model="info.pointName" :readonly="ifEdit"/> -->
                  <Cascader :data="cascaderList" @on-change="selectCas" :disabled="ifEdit"></Cascader>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="双拖船数:">
                  <Input v-model="info.stcCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="单拖船数:">
                  <Input v-model="info.dtcCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="拖虾船数:">
                  <Input v-model="info.txCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="流刺网船数:">
                  <Input v-model="info.lcwCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="渔运船数:">
                  <Input v-model="info.yyCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="涨网船数:">
                  <Input v-model="info.zwCount" :readonly="ifEdit" />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="其他作业数:">
                  <Input v-model="info.qtcount" :readonly="ifEdit" />
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div slot="footer">
            <Button @click="modal.showDetail=false">取消</Button>
            <Button v-show="btnShow" type="primary" @click="submitData">{{this.btnInfo}}</Button>
          </div>
        </Modal>
        <Modal
          :width="1000"
          v-model="modal.statisticalModal"
          :styles="{top: '80px'}"
          title="避风情况上报统计"
        >
          <div class="tableBox">
            <table id="customFormTable" border="0" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <th colspan="2" style="width:20%">避风点\船只数</th>
                <th style="width:10%">双拖数</th>
                <th style="width:10%">单拖数</th>
                <th style="width:10%">拖虾数</th>
                <th style="width:10%">流刺网数</th>
                <th style="width:10%">渔运船数</th>
                <th style="width:10%">涨网船数</th>
                <th style="width:10%">其他作业数</th>
                <th style="width:10%">合计</th>
              </tr>
              <template v-for="(v,i) in itemList">
                <template v-for="(item,index) in v.list">
                  <tr :key="'itemList_'+i+'_'+index">
                    <td :rowspan="v.list.length" v-if="index==0">{{v.name}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.stcCount}}</td>
                    <td>{{item.dtcCount}}</td>
                    <td>{{item.txCount}}</td>
                    <td>{{item.lcwCount}}</td>
                    <td>{{item.yyCount}}</td>
                    <td>{{item.zwCount}}</td>
                    <td>{{item.qtcount}}</td>
                    <td>{{item.allCount}}</td>
                  </tr>
                </template>
              </template>
            </table>
          </div>
        </Modal>
      </div>
    </data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnInfo: "",
      btnShow: false,
      maskclosable: false,
      title: "",
      modal: {
        showDetail: false,
        statisticalModal: false
      },
      rendering: true,
      rendering2: true,
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
      info: {},
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "typhoonName",
          title: "台风名称",
          align: "center",
          minWidth: 140
        },
        {
          key: "pointName",
          title: "避风点名称",
          align: "center",
          minWidth: 140
        },
        {
          key: "stcCount",
          title: "双拖船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "dtcCount",
          title: "单拖船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "txCount",
          title: "拖虾船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "lcwCount",
          title: "流刺网船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "yyCount",
          title: "渔运船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "zwCount",
          title: "涨网船数",
          align: "center",
          minWidth: 140
        },
        {
          key: "qtcount",
          title: "其他作业数",
          align: "center",
          minWidth: 140
        },
        {
          title: "操作",
          align: "center",
          fixed: "right",
          minWidth: 220,
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
      typhoonList: [],
      yearsList: [],
      tfSelectQuery: "2019",
      tfEdit: false,
      ifEdit: false,
      dataId: "",
      cascaderList: [],
      itemList: []
    };
  },
  methods: {
    selectTreeChange(val) {
      this.query.wheres.deptid = val[0].id;
      this.initSearch();
    },
    initCascader() {
      this.$http
        .get("/check/shelter/point/select")
        .then(res => {
          if (res.success) {
            this.cascaderList = res.data;
            console.log(res.data);
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
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
            .delete("/check/shelter/" + index.id)
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
        _self.$Message.error("暂无台风数据");
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
          .post("/check/shelter/add", this.info)
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
          .put("/check/shelter/" + this.dataId, this.info)
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
    selectYear(value) {
      var _self = this;
      if (value === undefined || value === "") {
        value = new Date().getFullYear();
      }
      _self.rendering = false;
      _self.$http
        .get("/map/weather/typhoon?years=" + value)
        .then(res => {
          if (res.success) {
            _self.typhoonList = res.data;
            _self.rendering = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
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
      this.query.wheres.deptid = "";
      this.query.wheres.beginTime = "";
      this.query.wheres.endTime = "";
      this.query.page = 1;
      this.query.size = 10;
      this.tfSelectQuery = new Date().getFullYear().toString();
      this.initSearch();
    },
    selectCas(v, selectedData) {
      this.info.pointName = selectedData[1].label;
      this.info.pointId = selectedData[1].value;
    },
    statistical() {
      if(!this.query.wheres.deptid){
        this.$Message.error('请选择部门！')
        return
      }
      if(!this.query.wheres.typhoonId){
        this.$Message.error('请选择台风！')
        return
      }
      let params = new URLSearchParams();
      let json = JSON.stringify(this.query);
      params.append("query", json);
      this.modal.statisticalModal = true;
      this.$http
        .get(`/check/shelter/statistics`, {
          params: params
        })
        .then(res => {
          if (res.success) {
            this.itemList = res.data;
            console.log(this.itemList, "this.itemList");
          } else {
            this.itemList = [];
            this.$Message.error(res.msg);
            this.modal.statisticalModal = false;
          }
        })
        .catch(err => {
          this.itemList = [];
          this.modal.statisticalModal = false;
        });
    }
  },
  mounted() {
    var _self = this;
    _self.getYearsList();
    _self.initCascader();
    _self.tfSelectQuery = new Date().getFullYear().toString();
    _self.treeQuery.wheres.pathlike =
      _self.$store.state.user.userInfo.dept.path;
  }
};
</script>