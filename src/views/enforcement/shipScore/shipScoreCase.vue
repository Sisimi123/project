<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/enforces/shipscoremark/page'" :params="query" :columns="columns" 
        @on-row-dblclick="handleEdit">
        <div slot="search">
            <!-- label-width 长度根据实际情况自行调整 -->
            <Form :label-width="80" @submit.native.prevent>
              <Row>
                <Col span="6">
                    <Form-item label="渔船名:">
                      <Input v-model="query.wheres.shipName_like" icon="ios-search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="公司名:">
                      <Input v-model="query.wheres.companyName_like" icon="ios-search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>

                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>

                <span style="float:right;">
                  <ButtonGroup shape="circle">
                    <Button @click="handleMark()" type="info" icon="ios-add" >添加记分</Button>
                  </ButtonGroup>
                </span>
              </span>
            </Row>
            </Form>
        </div>
    </data-table>
    <markScore 
    v-model="status.showMarkScore" 
    okText="确定"
    :id="dataId"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></markScore>

    <markScoreDetail 
    v-model="status.showMarkScoreDetail" 
    :id="dataId"
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></markScoreDetail>
  </div>


</template>
<script>
import markScore from "./components/markScore.vue";
import markScoreDetail from "./components/markScoreDetail.vue";

export default {
  name: "shipScoreCase",
  data() {
    return {
      canCancel: false,
      status: {
        isLoading: true,
        showMarkScore: false,
        showMarkScoreDetail: false,
        showMarkScoreModify: false
      },
      dataId: "",
      totalNum: 1,
      height: "450",
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "shipName",
          title: "渔船名",
          align: "center",
          width: 150
        },
        {
          key: "companyName",
          title: "公司名",
          align: "center",
          width: 150
        },

        {
          key: "shipownerScore",
          title: "船东本次记分",
          align: "center"
        },

        {
          key: "captainScore",
          title: "船长本次记分",
          align: "center"
        },

        {
          key: "companyScore",
          title: "公司本次记分",
          align: "center"
        },
        {
          key: "noteTaker",
          title: "记录人",
          align: "center",
          sortable: "custom",
          width: 120
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center",
          sortable: "custom",
          width: 180
        },
        {
          key: "noteTime",
          title: "违反时间",
          align: "center",
          sortable: "custom",
          width: 180
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 200,
          render: (h, params) => {
            var flag = params.row.creatorId == this.defaultUserId;
            var temp = [];
            temp.push(
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
                      this.handleEdit(params.row);
                    }
                  }
                },
                "详情"
              )
            );

            if (flag || this.canCancel) {
              temp.push(
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
                        this.handleModify(params.row.id);
                      }
                    }
                  },
                  "修改"
                )
              );
              temp.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.handleCancel(params.row.id);
                      }
                    }
                  },
                  "撤回"
                )
              );
            }
            return h("div", temp);
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          shipName_like: "",
          nametheShip_like: ""
        },
        orders: "createTime desc"
      },
      dataList: []
    };
  },
  components: {
    markScore,
    markScoreDetail
  },
  computed: {
    defaultUserId() {
      return this.$store.state.user.userInfo.userId;
    }
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null) {
        return false;
      }
      return true;
    },
    haveCancelRule(){
      this.$http
        .get("/enforces/shipscoremark/judgeRule")
        .then(res => {
          if(res.success){
            this.canCancel = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }

      this.$refs.test.handleSearch();
    },
    handleMark() {
      this.dataId = "";
      this.status.showMarkScore = true;
    },
    handleDefault() {
      this.handleSearch();
    },
    handleEdit(index) {
      this.toEdit(index.id);
    },
    toEdit(id) {
      console.log(id)
      this.dataId = id;
      this.status.showMarkScoreDetail = true;
    },
    handleModify(id) {
      this.dataId = id;
      this.status.showMarkScore = true;
    },
    handleCancel(id) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认撤回吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          var params = new URLSearchParams();
          params.append("id", id);
          this.$http
            .post("/enforces/shipscoremark/cancel", params)
            .then(res => {
              this.$Message.info("操作成功");
              this.handleSearch(1);
            })
            .catch(err => {
              console.log(error);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    }
  },
  mounted() {
    this.handleSearch();
    this.haveCancelRule();

  }
};
</script>

<style scoped>

fieldset.title {
  border: none;
  position: relative;
}
fieldset.title legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 16px;
}
fieldset.title button {
  position: absolute;
  left: 150px;
  top: 0;
}

.ivu-card-bordered {
  border: none !important;
}
</style>


