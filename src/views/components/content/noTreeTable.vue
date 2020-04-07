<template>
  <div>
    <Row>
        <div>
            <slot name="search"></slot>
        </div>
    </Row>
    <Row>
        <div v-if="reloadTable">
            <Table @on-sort-change="handleSortChange" @on-current-change="radioRow" @on-row-dblclick="handleEdit" @on-selection-change="selectChange" :height="tableHeight" border :columns="columns" :data="dataList" :stripe=true :loading="status.isLoading" :highlight-row=true></Table>
        </div>
    </Row>
    <Row>
        <div>
            <Page show-total :total="totalNum" show-sizer show-elevator
        placement=top @on-page-size-change="pageSizeChange" :page-size="params.size" 
        :current="params.page" @on-change="changePage" ></Page>
        </div>
    </Row>
  </div>
</template>
<script>
export default {
  name: "noTreeTable",
  props: {
    reloadTable : {
      type: Boolean,
      default: true
    },
    value: {
      type: Boolean,
      default: false
    },
    tableHeight: {
      type: Number,
      default: 400
    },
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
    selections:{
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
    treeParams:{
      type: Object,
      default() {
        return {
          wheres: {},
        };
      }
    },
    autoInitTable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // default
      totalNum: 0,
      dataList: [],
      letId:"",
      // params
      status: {
        isLoading: true,
        showTree: false,
        treeLoading: true,
        reload: false,
      }
    };
  },
  computed: {
  },
  methods: {
    // defalut
    isEmpty(s) {
      if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
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
    handleSortChange(query) {
      if(query.order != "desc" && query.order != "asc"){
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
      this.$http.get(this.url, {
          params: search
        })
        .then(res => {
          if(this.selections){
            var r = this.selections;
            var m = new Map();
            for(var d in r) m.set(r[d], true);
            for(var f in res.data.data) res.data.data[f]._checked = m.get(res.data.data[f].id)?true:false;
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
    selectChange(selection) {
      this.$emit("on-selection-change", selection);
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
    if(this.autoInitTable){
      this.handleSearch();
    }
  },
  watch: {
  }
};
</script>

<style scoped>
</style>
