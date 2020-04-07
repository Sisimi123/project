<style lang="less">
@import "./mytable.less";
</style>

<template>
  <!-- use ztree -->
  <div>
    <div v-if="withTree">
      <Row>
        <Col span="4">
          <div style="padding-right:10px">
            <Card>
              <p slot="title">
                <Icon type="ios-home"></Icon>
                {{treeTitle}}
              </p>

              <template v-if="useZtree">
                <div :style="'overflow:auto;height:'+ treeHeight +'px'">
                  <ztree
                    ref="ztreeTable"
                    v-if="status.showTree"
                    v-model="status.reload"
                    :withCard="false"
                    @transTreeNode="selectZtreeChange"
                    :treeData="filterTree"
                  ></ztree>
                </div>
              </template>
              <template v-else>
                <div>
                  <Input v-model="treeSearch" icon="ios-search" size="small" placeholder="请输入..."></Input>
                </div>
                <div :style="'overflow:auto;height:'+ treeHeight +'px'">
                  <Tree
                    @on-select-change="selectTreeChange"
                    :data="filterTree"
                    :loading="status.treeLoading"
                    empty-text="加载中..."
                  ></Tree>
                </div>
              </template>
            </Card>
          </div>
        </Col>
        <Col span="20">
          <Card>
            <Row>
              <div class="search-wrap search-bar" ref="search">
                <slot name="search"></slot>
              </div>
            </Row>
            <Row>
              <div class="table-wrap" ref="table">
                <Table
                  ref="table"
                  @on-sort-change="handleSortChange"
                  @on-current-change="radioRow"
                  @on-row-dblclick="handleEdit"
                  @on-selection-change="selectChange"
                  :height="WrapHeight"
                  border
                  :columns="columns"
                  :data="dataList"
                  :stripe="true"
                  :loading="status.isLoading"
                  :highlight-row="true"
                ></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom-wrap" ref="bottom">
                <Page
                  show-total
                  :total="totalNum"
                  show-sizer
                  show-elevator
                  placement="top"
                  @on-page-size-change="pageSizeChange"
                  :page-size="params.size"
                  :current="params.page"
                  @on-change="changePage"
                ></Page>
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
    <div v-else>
      <Card>
        <Row>
          <div class="search-wrap search-bar" ref="search">
            <slot name="search"></slot>
          </div>
        </Row>
        <Row>
          <div class="table-wrap" ref="table">
            <Table
              ref="table"
              @on-sort-change="handleSortChange"
              @on-current-change="radioRow"
              @on-row-dblclick="handleEdit"
              @on-selection-change="selectChange"
              :height="WrapHeight"
              border
              :columns="columns"
              :data="dataList"
              :stripe="true"
              :loading="status.isLoading"
              :highlight-row="true"
            ></Table>
          </div>
        </Row>
        <Row>
          <div class="bottom-wrap" ref="bottom">
            <Page
              show-total
              :total="totalNum"
              show-sizer
              show-elevator
              placement="top"
              @on-page-size-change="pageSizeChange"
              :page-size="params.size"
              :current="params.page"
              @on-change="changePage"
            ></Page>
          </div>
        </Row>
      </Card>
    </div>
  </div>
</template>
<script>
import ztree from "../treeGrid/ztree.vue";
export default {
  name: "MyTableNew",
  components: {
    ztree
  },
  props: {
    // default
    value: {
      type: Boolean,
      default: false
    },
    // ------
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    url: {
      type: String
    },
    treeUrl: {
      type: String
    },
    selections: {
      type: Array,
      default() {
        return [];
      }
    },
    params: {
      type: Object,
      default() {
        return {
          page: 1,
          size: 10,
          wheres: {},
          orders: "updateTime desc"
        };
      }
    },
    treeParams: {
      type: Object,
      default() {
        return {
          wheres: {}
        };
      }
    },
    withTree: {
      type: Boolean,
      default: false
    },
    treeTitle: {
      type: String,
      default: "组织机构"
    },
    useZtree: {
      type: Boolean,
      default: true
    },
    autoInitTable: {
      type: Boolean,
      default: true
    },
    autoInitTree: {
      type: Boolean,
      default: true
    },
    defaultExpandedKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // default
      totalNum: 0,
      dataList: [],
      treeData: [],
      treeSearch: "",
      letId: "",
      // params
      status: {
        isLoading: true,
        showTree: false,
        treeLoading: true,
        reload: false
      }
    };
  },
  computed: {
    treeHeight() {
      return this.$store.state.app.treeHeight - (this.useZtree ? 10 : 24);
    },
    WrapHeight() {
      // console.log(this.$store.state.app.orginalSinglePage, "orginalSinglePage");
      // console.log(this.$store.state.app.searchHeight, "searchHeight");
      // console.log(this.$store.state.app.bottomHeight, "bottomHeight");
      return this.$store.state.app.orginalSinglePage != 0
        ? this.$store.state.app.orginalSinglePage -
            this.$store.state.app.searchHeight -
            this.$store.state.app.bottomHeight -
            32 -
            6
        : this.$store.state.app.orginalFlexWrap -
            this.$store.state.app.searchHeight -
            this.$store.state.app.bottomHeight -
            32 -
            16;
    },
    filterTree() {
      var tree = this.$util.deepCopy(this.treeData);
      return this.$util.diguiTree(tree, this.treeSearch);
    }
  },
  methods: {
    // defalut
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
    withWheres() {
      if (!this.isEmpty(this.params.wheres)) {
        return true;
      }
      return false;
    },
    treeWithWheres() {
      if (!this.isEmpty(this.treeParams.wheres)) {
        return true;
      }
      return false;
    },
    handleSortChange(query) {
      if (query.order != "desc" && query.order != "asc") {
        this.params.orders = "";
      } else {
        this.params.orders = query.key + " " + query.order;
      }
      this.initSearch();
    },
    initSearch() {
      this.params.page = 1;
      this.handleSearch();
    },
    handleSearch() {
      this.status.isLoading = true;
      var search = {};
      if (this.withWheres()) {
        search.query = JSON.stringify(this.params);
      } else {
        for (const key in this.params) {
          search[key] = this.params[key];
        }
      }
      this.$http
        .get(this.url, {
          params: search
        })
        .then(res => {
          if (this.selections) {
            var r = this.selections;
            var m = new Map();
            for (var d in r) m.set(r[d], true);
            for (var f in res.data.data)
              res.data.data[f]._checked = m.get(res.data.data[f].id)
                ? true
                : false;
          }
          this.dataList = res.data.data;
          this.totalNum = res.data.total;
          this.status.isLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleEdit(row, index) {
      this.$emit("on-row-dblclick", row, index);
    },
    radioRow(currentRow) {
      this.$emit("on-current-change", currentRow);
    },
    handleReset() {
      for (let key in this.params.wheres) {
        this.params.wheres[key] = "";
      }
      this.params.page = 1;
      this.params.size = 10;
      this.initSearch();
    },
    initTree() {
      var search = {};
      if (this.treeWithWheres()) {
        search.query = JSON.stringify(this.treeParams);
      } else {
        for (const key in this.treeParams) {
          search[key] = this.treeParams[key];
        }
      }
      this.$http
        .get(this.treeUrl, {
          params: search
        })
        .then(res => {
          if (res.success) {
            this.treeData = res.data;
            if (!this.isEmpty(this.defaultExpandedKey)) {
              this.expandTree(this.treeData);
            }
            if (this.useZtree) {
              this.status.showTree = true;
            } else {
              this.status.treeLoading = false;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    expandTree(treeData) {
      for (const key in treeData) {
        if (treeData.hasOwnProperty(key)) {
          const element = treeData[key];
          if (element.id == this.defaultExpandedKey) {
            element.selected = true;
            return true;
          } else if (
            !this.isEmpty(element.children) &&
            this.expandTree(element.children)
          ) {
            element.expand = true;
            return true;
          } else {
            // 未匹配到继续执行
          }
        }
      }
      return false;
    },
    selectChange(selection) {
      this.$emit("on-selection-change", selection);
    },
    selectZtreeChange(node) {
      var nodes = [];
      nodes.push(node);
      this.selectTreeChange(nodes);
    },
    selectTreeChange(nodes) {
      // if(nodes.length === 0){
      //   return;
      // }
      this.$emit("on-select-change", nodes);
    },
    pageSizeChange(size) {
      this.params.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.params.page = page;
      this.handleSearch();
    }
    // method
  },
  mounted() {
    this.$nextTick(() => {
      var page = document.getElementsByClassName("content-wrapper");
      var wrap = document.getElementsByClassName("flex-wrap");
      var search = document.getElementsByClassName("search-wrap");
      var bottom = document.getElementsByClassName("bottom-wrap");
      if (search.length > 0) {
        this.$store.commit("setSearchHeight", search[0].clientHeight);
      }
      if (bottom.length > 0) {
        this.$store.commit("setBottomHeight", bottom[0].clientHeight);
      }
      if (page.length > 0) {
        this.$store.commit("setPageHeight", page[0].clientHeight);
      } else if (wrap.length > 0) {
        this.$store.commit("setWrapHeight", wrap[0].clientHeight);
      } else {
        console.log("error");
      }
    });

    if (this.autoInitTable) {
      this.handleSearch();
    }

    if (this.withTree && this.autoInitTree) {
      this.initTree();
    }
  },
  watch: {
    defaultExpandedKey(val) {
      if (!this.isEmpty(this.treeData)) {
        this.expandTree(this.treeData);
      }
    },
    treeUrl: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.treeUrl = newVal;
        if (this.autoInitTree)
          this.initTree();
      }
    },
    treeParams: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.treeParams = newVal;
        if (this.autoInitTree)
          this.initTree();
      }
    },
  }
};
</script>

<style scoped>
</style>
