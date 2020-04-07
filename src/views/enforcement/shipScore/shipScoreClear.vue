<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
  <Card>
    <Row>
      <div style="margin-bottom: 10px;">
        <span>申请人：</span>
        <Input v-model="query.wheres.userName_like" icon="ios-search"  style="width:20%" placeholder="请输入..."></Input>
        
        <Select class="searchCon" v-model="query.wheres.eventType_eq" placeholder="请选择申请状态">
            <Option v-for="item in eventType" :value="item.value" :key="item.value">{{ item.title }}</Option>
          </Select>
        <Button  @click="handleSearch(1)" type="info" icon="ios-search" shape="circle">搜索</Button>
        <Button  @click="handleReset" type="primary" >重置</Button>
        <span class="operate-wrap">
            <Button @click="handleApply" type="warning" >奖分申请</Button>
        </span>
      </div>
    </Row>
    <Row>
        <Table ref="table" @on-row-dblclick="handleEdit" :height="height" border :columns="columns" :data="dataList" :stripe=true :loading="status.isLoading" :highlight-row=true></Table>
    </Row>
    <Row>
      <div class="bottom">
          <Page show-total :total="totalNum" show-sizer 
        placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
        :current="query.page" @on-change="changePage" ></Page>
      </div>
    </Row>

    <applyClear 
    v-model="status.show" 
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></applyClear>
 
    <applyClearDetail 
    v-model="status.showDetail" 
    :id="dataId"
    okText="确定"
    @on-ok="handleDefault()"
    cancelText="返回"
    @on-cancel="handleDefault()"
    ></applyClearDetail>
  </Card>

</template>
<script>
import applyClear from "./components/applyClear.vue";
import applyClearDetail from "./components/applyClearDetail.vue";

export default {
  name: "shipScoreCase",
  data() {
    return {
      status: {
        isLoading: true,
        show: false,
        showDetail: false
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
          key: "userName",
          title: "申请人",
          align: "center",
          width: 150
        },
        {
          key: "userTel",
          title: "申请人电话",
          align: "center",
          width: 160
        },
        {
          key: "idCardType",
          title: "身份类型",
          align: "center",
          width: 100,
          render: (h, params) => {
            var value = this.$store.getters.getDictName(
              "shipscore_idcardtype",
              params.row.idCardType
            );
            return h("span", value);
          }
        },
        {
          key: "idCard",
          title: "证件号",
          align: "center",
          width: 180
        },
        {
          key: "submitter",
          title: "提交人",
          align: "center"
        },
        {
          key: "auditor",
          title: "审核人",
          align: "center"
        },
        {
          key: "applyScore",
          title: "申请奖分值",
          align: "center"
        },
        {
          key: "eventType",
          title: "状态",
          align: "center",
          render: (h, params) => {
            var value = this.$store.getters.getDictName(
              "shipscore_eventType",
              params.row.eventType
            );
            return h("span", value);
          }
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 100,
          render: (h, params) => {
            var flag = params.row.auditorId == this.defaultUserId;
            var flag2 = params.row.eventType == "0";
            return h(
              "Button",
              {
                props: {
                  type: flag && flag2 ? "error" : "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.handleEdit(params.row);
                  }
                }
              },
              // 申请中 && 创建人
              flag && flag2 ? "审理" : "详情"
            );
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          userName_like: "",
          eventType_eq: ""
        },
        orders: "updateTime desc"
      },
      dataList: [],
      checkAllGroup: ""
    };
  },
  components: {
    applyClear,
    applyClearDetail
  },
  computed: {
    defaultUserId() {
      return this.$store.state.user.userInfo.userId;
    },
    eventType() {
      return this.$store.getters.getDictList("shipscore_eventType");
    }
  },
  methods: {
    isEmpty(s) {
      if (s == "" || s == undefined || s == null) {
        return false;
      }
      return true;
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }

      this.$http
        .get("/enforces/shipscoreapply/getPage", {
          params: {
            page: this.query.page,
            size: this.query.size,
            userName: this.query.wheres.userName_like,
            eventType: this.query.wheres.eventType_eq
          }
        })
        .then(res => {
          this.dataList = res.data.data;
          this.totalNum = res.data.total;
          this.status.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleApply() {
      this.status.show = true;
    },
    handleDefault() {
      this.handleSearch();
    },
    handleEdit(index) {
      this.toEdit(index.id);
    },
    toEdit(id) {
      this.dataId = id;
      this.status.showDetail = true;
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

