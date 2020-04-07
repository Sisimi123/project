<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/detailRelevance/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="表单名称:">
                <Input v-model="query.wheres.detailName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
            </div>
            <Button @click="add" type="success" style="float:right">新增</Button>
          </Row>
        </Form>
      </div>
    </data-table>
    <fineItemSet :detailId="detailId" ref="fineItemSet"></fineItemSet>
  </div>
</template>

<script>
import fineItemSet from "./components/fineItemSet"
export default {
  components:{
    fineItemSet
  },
  data() {
    return {
      query: {
        page: 1,
        size: 20,
        wheres: {
          detailName: ""
        }
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "详细项模板名称",
          key: "detailName",
          align: "left"
        },
        // {
        //   title: "分组名称",
        //   key: "groupName",
        //   align: "left"
        // },
        // {
        //   title: "是否必填",
        //   key: "required",
        //   align: "center",
        //   maxWidth: 100,
        //   render: (h, params) => {
        //     let required = params.row.required;
        //     switch (required) {
        //       case "0":
        //         required = "否";
        //         break;
        //       case "1":
        //         required = "是";
        //         break;
        //     }
        //     return h("span", required);
        //   }
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 180,
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
                      this.edit(params.row);
                    }
                  }
                },
                "编辑"
              )
            );
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.del(params.row);
                    }
                  }
                },
                "删除"
              )
            );
            return h("div", buttons);
          }
        }
      ],
      detailId:""
    };
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.detailName = "";
      this.$refs.test.initSearch();
    },
    clearDetailIdId(){
      this.detailId = ""
    },
    add() {
      this.detailId = ""
      this.$refs.fineItemSet.show()
    },
    edit(row) {
      this.$refs.fineItemSet.show()
      this.detailId = row.id
    },
    del(row) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(`/supervision/detailRelevance/delete?id=${row.id}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("删除成功");
                this.initSearch();
              }
            })
            .catch(error => {
              this.$Message.info("删除成功");
            });
        },
        onCancel: () => {}
      });
    },
  },
  mounted() {
    this.initSearch();
  },
  watch: {
  }
};
</script>

<style>
</style>