<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/formRelevance/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="表单名称:">
                <Input v-model="query.wheres.relevanceName" placeholder="请输入..."></Input>
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
    <formSet ref="formSet" :formEditId="formEditId"></formSet>
    <safetyForm :formLookId="formLookId" :isUsable="isUsable" v-model="formShow"></safetyForm>
  </div>
</template>

<script>
import formSet from "./components/formSet";
import safetyForm from "./components/safetyForm"
export default {
  components: {
    formSet,
    safetyForm
  },
  data() {
    return {
      query: {
        page: 1,
        size: 20,
        wheres: {
          relevanceName: ""
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
          title: "关联名称",
          key: "relevanceName",
          align: "left"
        },
        {
          title: "备注",
          key: "comment",
          align: "left"
        },
        // {
        //   title: "模板类型",
        //   key: "customTemplateType",
        //   align: "center",
        //   maxWidth: 100,
        //   render: (h, params) => {
        //     let type = params.row.customTemplateType;
        //     switch (type) {
        //       case "0":
        //         type = "自定义";
        //         break;
        //       case "1":
        //         type = "公用";
        //         break;
        //     }
        //     return h("span", type);
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.lookForm(params.row);
                    }
                  }
                },
                "渲染"
              )
            );
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
      formEditId: "",
      formLookId: "",
      isUsable: false,
      formShow: false
    };
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.relevanceName = "";
      this.$refs.test.initSearch();
    },
    add() {
      this.formEditId = "";
      this.$refs.formSet.show();
    },
    edit(row) {
      this.formEditId = row.id;
      this.$refs.formSet.show();
    },
    del(row) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(`/supervision/formRelevance/delete?id=${row.id}`)
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
    lookForm(row) {
      // this.$http
      //       //请求路径
      //       .get(`/supervision/safetyCheck/getFormById?formId=${row.id}`)
      //       // 返回值
      //       .then(res => {
      //         if (res.success) {
      //           console.log(res,'res')
      //         }
      //       })
      //       .catch(error => {
      //       });
      this.formShow = true
      this.formLookId = row.id
    },
    clearFormEditId() {
      this.formEditId = "";
    }
  },
  mounted() {
    this.initSearch();
  }
};
</script>

<style>
</style>