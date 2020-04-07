<style lang="less">
// @import "../../../styles/commonStyle.less";
@import "../../styles/common.less";
</style>
<template>
  <div style="background: #fff">
    <Row>
      <Col span="24">
        <div class="btn-right">
          <MyUpload
            uploadStyle="display: inline"
            :action="'/$admin/attachs'"
            :show-upload-list="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-format-error="onFormatError"
          >
            <Button type="success">上传</Button>
          </MyUpload>
        </div>
      </Col>
    </Row>
    <div style="padding:10px">
      <Table :columns="columns" :data="data" stripe border height="780"></Table>
    </div>
  </div>
</template> 

<script>
import MyUpload from "../components/Upload/MyUpload";
export default {
  components: {
    MyUpload
  },
  data() {
    return {
      model: false,
      title: "新增",
      data: [],
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "下载地址",
          key: "path",
          align: "center"
        },
        {
          title: "版本",
          key: "version",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
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
                      this.download(params.row);
                    }
                  }
                },
                "下载"
              )
            );
            //   buttons.push(
            //     h(
            //       "Button",
            //       {
            //         props: {
            //           type: "error",
            //           size: "small"
            //         },
            //         style: {
            //           marginRight: "5px"
            //         },
            //         on: {
            //           click: () => {
            //             this.del(params.row);
            //           }
            //         }
            //       },
            //       "删除"
            //     )
            //   );
            return h("div", buttons);
          }
        }
      ]
    };
  },
  computed: {},
  // 方法.事件
  methods: {
    initSearch() {
      this.$http
        .post(`/map/dist/latest`)
        // 返回值
        .then(res => {
          if (res.success) {
            if (res.data) {
              this.data = res.data;
            }
          } else {
          }
        })
        .catch(error => {});
    },
    uploadSuccess(res) {
        if(res.success){
            this.initSearch()
        }
    },
    uploadError(res) {},
    onFormatError(res) {},
    sure(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.title == "新增") {
            this.$http
              .post(`/clientDataSync`, this.info)
              // 返回值
              .then(res => {
                if (res.success) {
                  this.model = false;
                  this.$Message.success("新增成功");
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                this.$Message.error("操作失败");
              });
          } else {
            this.$http
              .put(`/clientDataSync/` + row.id, this.info)
              // 返回值
              .then(res => {
                if (res.success) {
                  this.model = false;
                  this.$Message.success("修改成功");
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                this.$Message.error("操作失败");
              });
          }
        } else {
          this.$Message.error("请填写完全");
          return false;
        }
      });
    },
    del(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/clientDataSync/" + row.id)
            .then(res => {
              this.$Message.success("操作成功");
              this.initSearch();
            })
            .catch(err => {
              console.log(error);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
    }
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
  }
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}

.btn-right {
  float: right;
  margin-top: 10px;
}
</style>
