<style lang="less">
@import "../styles/achive.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/logStatistic/active'" :params="query" :columns="columns"
        @on-row-dblclick="watchMsg">
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
            <Row>
                <Col span="5">
                    <Form-item label="开始时间:">
                      <DatePicker format="yyyy-MM-dd" v-model="query.wheres.start" type="date" style="width: 200px"></DatePicker>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="结束时间:">
                      <DatePicker format="yyyy-MM-dd" v-model="query.wheres.end" type="date" style="width: 200px"></DatePicker>
                    </Form-item>
                </Col>
                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>
            </Row>
            </Form>
        </div>
    </data-table>
  </div>
</template>
<script>
export default {
  name: "userActivity",
  data() {
    return {
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          key: "userName",
          title: "用户",
          align: "center",
        },
        {
          key: "count",
          title: "登录次数",
          align: "center",
        },

        {
          key: "deptName",
          title: "所属单位",
          align: "center",
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
            start: '',
            end: '',
        },
        orders: "updateTime desc"
      },
    };
  },
  computed: {},  
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.initSearch();
    }
  },
  mounted() {}
};
</script>

<style scoped>

</style>
