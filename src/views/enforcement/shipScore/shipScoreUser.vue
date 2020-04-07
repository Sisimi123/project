<style lang="less">
@import "../../..//styles/commonStyle.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/enforces/shipscoreuser/page'" :params="query" :columns="columns" 
        @on-row-dblclick="handleEdit">
        <div slot="search">
            <!-- label-width 长度根据实际情况自行调整 -->
            <Form :label-width="80" @submit.native.prevent>
              <Row>
                <Col span="6">
                    <Form-item label="人员姓名:">
                      <Input v-model="query.wheres.userName_like" icon="ios-search" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>

                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>
              </span>
            </Row>
            </Form>
        </div>
    </data-table>

    <shipScoreUserDetail 
    v-model="status.showDetail" 
    :idCard="idCard"
    :userType="userType"
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></shipScoreUserDetail>
  </div>
</template>
<script>
import shipScoreUserDetail from "./components/shipScoreUserDetail.vue";


export default {
  name: "shipScoreUser",
  data() {
    return {
      status: {
        showDetail: false,
      },
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "userName",
          title: "用户",
          align: "center",
          sortable: "custom",
          width: 160
        },
        {
          key: "userKey.userType",
          title: "用户类型",
          align: "center",
          width: 100,
          render: (h, params) => {
            var value = this.$store.getters.getDictName(
              "shipscore_idcardtype",
              params.row.userKey.userType
            );
            return h("span", value);
          }
        },
        {
          key: "isOver",
          title: "是否记满",
          sortable: "custom",
          align: "center",
          render: (h, params) => {
            var value = params.row.isOver === "1" ? "是" : "否";
            var c = params.row.isOver === "1" ? "red" : "blank";
            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              value
            );
          }
        },
        {
          key: "isBlank",
          title: "是否安全黑名单",
          sortable: "custom",
          align: "center",
          render: (h, params) => {
            var value = params.row.isBlank === "1" ? "是" : "否";
            var c = params.row.isBlank === "1" ? "red" : "blank";
            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              value
            );
          }
        },
        {
          key: "userKey.idCard",
          title: "证件号",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("span", params.row.userKey.idCard);
          }
        },
        {
          key: "tel",
          title: "联系手机号",
          align: "center",
          width: 150
        },
        {
          key: "totalScore",
          title: "当前剩余记分",
          sortable: "custom",
          align: "center"
        },
        {
          title: "操作",
          key: "userName",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.handleEdit(params.row);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          userName_like: ""
        },
        orders: "updateTime desc"
      },
      dataList: [],
      selectedList: [],
      idCard: "",
      userType: ""
    };
  },
  components: {
    shipScoreUserDetail,
  },
  computed: {},
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
    handleSortChange(query) {
      this.query.orders = query.key + " " + query.order;
      this.handleSearch(1);
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }

      this.$refs.test.handleSearch();
    },
    handleSign(selection) {
      this.selectedList = selection;
    },
    handleEdit(index) {
      this.toEdit(index);
    },
    toEdit(index) {
      this.idCard = index.userKey.idCard;
      this.userType = index.userKey.userType;
      this.status.showDetail = true;
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },
    handleDefault() {
      this.selectedList = [];
      this.handleSearch();
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
    // this.handleSearch();
  }
};
</script>

<style scoped>
.bottom {
  padding-top: 10px;
  overflow: hidden;
}

.bottom .ivu-page {
  float: right;
}
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
.event-content {
  margin-top: 10px;
  max-height: 160px;
  overflow: auto;
}

.operate-wrap {
  border-left: 1px solid #eee;
  padding-left: 10px;
  float: right;
  /* display: inline-block;  */
}
.ivu-card-bordered {
  border: none !important;
}
</style>

