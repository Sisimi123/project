<template>
  <div id="resultSet">
    <Modal
      v-model="modal"
      :title="title"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-visible-change="modalChange"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
        <div class="title">细项模板基本内容</div>
        <FormItem label="详细项模板名称：" prop="detailName">
          <Input
            v-model="formValidate.detailName"
            placeholder="请输入详细项模板名称"
            type="textarea"
            style="width: 400px"
          ></Input>
        </FormItem>
        <div class="title" style="border-top: 1px #ccc solid;">
          <span>设置详细项</span>
          <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增详细项</Button>
        </div>
        <div class="tableBox" v-for="(v,i) in formValidate.relevanceDetailItem" :key="i">
          <div class="tableTitle">
            <span class="tableTitle_text">{{i+1}}. {{v.itemName}}</span>
            <Button style="float:right;" type="error" @click="removeItem(i,v)">删除</Button>
            <Button
              style="float:right;margin-right:5px"
              @click="addcheckPoint(i)"
              type="primary"
            >新增详细项子项</Button>
            <Button style="float:right;margin-right:5px" @click="editItem(i,v)" type="info">编辑模板细项</Button>
          </div>
          <Table :columns="columns" :data="v.pointList"></Table>
        </div>
      </Form>
      <div v-show="isResultAdd" slot="footer">
        <Button @click="handleReset('formValidate')">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </div>
      <div v-show="isResultEdit" slot="footer">
        <Button @click="handleReset('formValidate')">取消</Button>
        <Button type="primary" @click="edithandleSubmit('formValidate')" style="margin-left: 8px">保存</Button>
      </div>
    </Modal>
    <!-- 模板添加详细项弹窗 -->
    <Modal
      v-model="itemModal"
      :title="itemTitle"
      width="540"
      class-name="modal"
      :mask-closable="false"
    >
      <Form
        ref="itemModalfrom"
        :model="itemModalfrom"
        :rules="ruleItemModalfrom"
        :label-width="120"
      >
        <FormItem label="详细项名称：" prop="itemName">
          <Input
            type="text"
            v-model="itemModalfrom.itemName"
            placeholder="请输入模板细项名称"
            style="width:400px"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="itemCancel('itemModalfrom')">取消</Button>
        <Button type="primary" @click="itemSave('itemModalfrom')">保存</Button>
      </div>
    </Modal>
    <!-- 添加详细项子项弹窗 -->
    <Modal
      v-model="resultItemModal"
      title="添加结果项"
      width="540"
      class-name="modal"
      :mask-closable="false"
    >
      <Form ref="resultItemfrom" :model="resultItemfrom" :rules="ruleResultItem" :label-width="120">
        <FormItem label="详细项子项名称：" prop="pointName">
          <Input
            type="text"
            v-model="resultItemfrom.pointName"
            placeholder="请输入详细项子项名称"
            style="width:400px"
          ></Input>
        </FormItem>
        <FormItem label="是否默认选中：">
          <RadioGroup v-model="resultItemfrom.defaultValue">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="resultItemCancel('resultItemfrom')">取消</Button>
        <Button type="primary" @click="resultItemSave('resultItemfrom')">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    detailId: String
  },
  data() {
    return {
      ruleValidate: {
        detailName: [
          { required: true, message: "模板名称不能为空！", trigger: "blur" }
        ]
      },
      ruleItemModalfrom: {
        itemName: [
          { required: true, message: "详细项名称不能为空！", trigger: "blur" }
        ]
      },
      ruleResultItem: {
        pointName: [
          { required: true, message: "结果项名称不能为空！", trigger: "blur" }
        ]
      },
      //结果模板对象
      formValidate: {
        detailName: "",
        relevanceDetailItem: []
      },
      //增加模板细项对象
      itemModalfrom: {
        itemName: "",
        itemOrder: ""
      },
      //新增结果项对象
      resultItemfrom: {
        pointName: "",
        itemOrder: "",
        defaultValue: ""
      },
      modal: false,
      itemModal: false,
      resultItemModal: false,
      isResultAdd: true,
      isResultEdit: false,
      editCustomTurn: false,
      itemListIndex: null,
      editResultTurn: false,
      editResultPointTurn: false,
      editResultPointIndex: null,
      title: "",
      itemTitle: "添加模板细项",
      columns: [
        {
          title: "详细项子项名称",
          key: "pointName",
          align: "center"
        },
        // {
        //   title: "是否选中",
        //   key: "defaultValue",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0"
                  },
                  on: {
                    click: () => {
                      this.editResultPoint(params);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0"
                  },
                  on: {
                    click: () => {
                      this.removeCheckPoin(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    show() {
      this.modal = true;
    },
    modalChange(value) {
      if (!value) {
        this.handleReset("formValidate");
      }
    },
    checkItem() {
      this.itemModal = true;
      this.editResultTurn = false;
      this.itemTitle = "添加模板细项";
    },
    editItem(i, v) {
      this.itemModal = true;
      this.editResultTurn = true;
      this.itemTitle = "编辑模板细项";
      this.itemListIndex = i;
      this.itemModalfrom.itemName = v.itemName;
    },
    removeItem(i, v) {
      this.formValidate.relevanceDetailItem.splice(i, 1);
    },
    addcheckPoint(i) {
      this.resultItemModal = true;
      this.itemListIndex = i;
      this.editResultPointTurn = false;
    },
    itemCancel(name) {
      this.$refs[name].resetFields();
      this.itemModal = false;
      this.itemModalfrom.itemName = "";
    },
    itemSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editResultTurn) {
            this.formValidate.relevanceDetailItem[
              this.itemListIndex
            ].itemName = this.itemModalfrom.itemName;
            this.formValidate.relevanceDetailItem[
              this.itemListIndex
            ].itemOrder = this.itemModalfrom.itemOrder;
            this.itemCancel(name);
          } else {
            let itemName = this.itemModalfrom.itemName;
            let itemOrder = this.itemModalfrom.itemOrder;
            let obj = {
              itemName: itemName,
              itemOrder: itemOrder,
              pointList: []
            };
            this.formValidate.relevanceDetailItem.push(obj);
            this.itemCancel(name);
          }
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },
    resultItemCancel(name) {
      this.$refs[name].resetFields();
      this.resultItemModal = false;
      this.itemModalfrom.itemName = "";
      this.itemModalfrom.itemOrder = "";
      this.itemModalfrom.defaultValue = "";
    },
    resultItemSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editResultPointTurn) {
            this.formValidate.relevanceDetailItem[this.itemListIndex].pointList[
              this.editResultPointIndex
            ].pointName = this.resultItemfrom.pointName;

            this.formValidate.relevanceDetailItem[this.itemListIndex].pointList[
              this.editResultPointIndex
            ].itemOrder = this.resultItemfrom.itemOrder;

            this.formValidate.relevanceDetailItem[this.itemListIndex].pointList[
              this.editResultPointIndex
            ].defaultValue = this.resultItemfrom.defaultValue;
            this.resultItemCancel(name);
          } else {
            let pointName = this.resultItemfrom.pointName;
            let itemOrder = this.resultItemfrom.itemOrder;
            let defaultValue = this.resultItemfrom.defaultValue;
            let itemListIndex = this.itemListIndex;
            let obj = {
              pointName: pointName,
              itemOrder: itemOrder,
              defaultValue: defaultValue,
              itemListIndex: itemListIndex
            };
            this.formValidate.relevanceDetailItem[
              this.itemListIndex
            ].pointList.push(obj);
            this.resultItemCancel(name);
          }
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },
    editResultPoint(res) {
      this.editResultPointTurn = true;
      this.resultItemModal = true;
      this.editResultPointIndex = res.index;
      if (res.row.relevanceDetailPointId) {
        for (let i in this.formValidate.relevanceDetailItem) {
          let detailId = this.formValidate.relevanceDetailItem[i].id;
          if (detailId == res.row.relevanceDetailPointId) {
            this.itemListIndex = i;
            this.resultItemfrom.pointName = this.formValidate.relevanceDetailItem[
              i
            ].pointList[res.index].pointName;
            this.resultItemfrom.itemOrder = this.formValidate.relevanceDetailItem[
              i
            ].pointList[res.index].itemOrder;
            this.resultItemfrom.defaultValue = this.formValidate.relevanceDetailItem[
              i
            ].pointList[res.index].defaultValue;
          }
        }
      } else {
        this.resultItemfrom.pointName = this.formValidate.relevanceDetailItem[
          res.row.itemListIndex
        ].pointList[res.index].pointName;
        this.resultItemfrom.itemOrder = this.formValidate.relevanceDetailItem[
          res.row.itemListIndex
        ].pointList[res.index].itemOrder;
        this.resultItemfrom.defaultValue = this.formValidate.relevanceDetailItem[
          res.row.itemListIndex
        ].pointList[res.index].defaultValue;
      }
      console.log(res);
    },
    removeCheckPoin(res) {
      console.log(res);
      if (res.row.relevanceDetailPointId) {
        for (let i in this.formValidate.relevanceDetailItem) {
          let detailId = this.formValidate.relevanceDetailItem[i].id;
          if (detailId == res.row.relevanceDetailPointId) {
            this.itemListIndex = i;
            this.formValidate.relevanceDetailItem[
              this.itemListIndex
            ].pointList.splice(res.index, 1);
          }
        }
      } else {
        this.formValidate.relevanceDetailItem[
          res.row.itemListIndex
        ].pointList.splice(res.index, 1);
      }
    },
    handleReset(name) {
      this.modal = false;
      this.$refs[name].resetFields();
      this.$parent.clearDetailIdId();
      this.formValidate = {
        detailName: "",
        relevanceDetailItem: []
      };
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.relevanceDetailItem.length < 1) {
            this.$Message.error("请增加详细项！");
            return;
          }
          for (let i in this.formValidate.relevanceDetailItem) {
            let pointList = this.formValidate.relevanceDetailItem[i].pointList;
            for (let j in pointList) {
              delete pointList[j].itemListIndex;
            }
          }
          this.$http
            .post("/supervision/detailRelevance/save", this.formValidate)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.handleReset(name);
                this.modal = false;
                this.$parent.initSearch();
              }
            })
            .catch(error => {
              this.$Message.info("操作失败");
            });
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },
    edithandleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.formValidate.relevanceDetailItem.length < 1) {
            this.$Message.error("请增加详细项！");
            return;
          }
          for (let i in this.formValidate.relevanceDetailItem) {
            let pointList = this.formValidate.relevanceDetailItem[i].pointList;
            for (let j in pointList) {
              delete pointList[j].itemListIndex;
            }
          }
          this.$http
            .patch(
              `/supervision/detailRelevance/updata?id=${this.detailId}`,
              this.formValidate
            )
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.handleReset(name);
                this.modal = false;
                this.$parent.initSearch();
              }
            })
            .catch(error => {
              this.$Message.info("操作失败");
            });
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },

    getFormData(id) {
      this.$http
        .get(`/supervision/detailRelevance/get?id=${id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.formValidate = res.data;
          }
        })
        .catch(error => {
          this.$Message.info("数据获取失败");
        });
    }
  },
  watch: {
    detailId(vaule) {
      if (vaule) {
        this.getFormData(vaule);
        this.isResultAdd = false;
        this.isResultEdit = true;
        this.customTitle = "编辑模板";
      } else {
        this.isResultAdd = true;
        this.isResultEdit = false;
        this.customTitle = "新增模板";
      }
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
  line-height: 40px;
}
.tableBox {
  margin-bottom: 25px;
}
.tableTitle {
  border: 1px solid #abdcff;
  background-color: #f0faff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 5px 15px;
  overflow: hidden;
}
.tableTitle_text {
  font-size: 22px;
}
.lable {
  display: inline-block;
  width: 90px;
}
</style>