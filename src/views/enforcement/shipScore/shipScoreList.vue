<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/enforces/shipscoreuser/page'" :params="query" :columns="columns" 
    >
    <div slot="search">
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
</div>

</template>
<script>
import * as api from "../../../api/shipscore";
import { isNull, isEmpty } from "../../../libs/common";
export default {
  name: "shipScoreList",
  data() {
    return {
      status: {
        isLoading: true,
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
          title: "用户名",
          align: "center",
          sortable:'custom',
          width: 140,
          
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
          align: "center",
          sortable:'custom',
        },
        {
          key: "enterTime",
          title: "上榜时间",
          align: "center",
          sortable:'custom',
        },
        {
          key: "deadline",
          title: "消分截止时间",
          align: "center",
          sortable:'custom',
        },
      ],
      totalNum: 0,
      query: {
        page: 1,
        size: 10,
        wheres: {
          userName_like: "",
          isOver_eq:"1",
        },
        orders: "updateTime desc"
      },
      
      dataList: [],
      selectedList:[],
    };
  },
  components: {},
  computed: {
    tableHeight() {
      return 450;
    }
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleSortChange(query){
      this.query.orders = query.key + " " + query.order;
      this.handleResearch();
    },
    handleResearch() {
      this.query.page = 1;
      this.handleSearch();
    },
    handleSearch() {
      this.status.isLoading = false;
      this.$refs.test.handleSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        if(key === "isOver_eq"){
          continue;
        }
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },
    handleSign(selection) {
      this.selectedList = selection;
    },
    handleEdit(index) {
      
    },
    handleDefault() {
      this.selectedList = [];
      this.handleResearch();
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
    this.handleResearch();
  }
};
</script>

<style scoped>

</style>
