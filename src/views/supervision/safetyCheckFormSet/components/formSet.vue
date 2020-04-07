<template>
  <div id="customFormSet">
    <Modal
      v-model="modal"
      :title="modalTitle"
      class-name="modal"
      width="1000"
      :mask-closable="false"
      @on-visible-change="visibleChange"
      :styles="{top: '20px'}"
      :loading="loading"
    >
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
          <div class="title">表格基本内容</div>
          <FormItem label="关联名称：" prop="relevanceName">
            <Input v-model="formValidate.relevanceName" placeholder="请输入关联名称" style="width: 400px"></Input>
          </FormItem>
          <div class="title" style="border-top: 1px #ccc solid;">
            <span>选择表单模板</span>
            <Button style="float:right;margin-top:10px" @click="checkItem" type="success">选择</Button>
          </div>
          <div class="tableBox" v-for="(v,i) in formValidate.relevanceFormList" :key="i">
            <div class="tableTitle">
              <span class="tableTitle_text">{{i+1}}. {{v.formName}}</span>
              <Button style="float:right;" type="error" @click="removeItem(i,v)">删除</Button>
            </div>
            <Table :columns="columns" :data="v.formItemPointDetailList"></Table>
          </div>
          <div class="title" style="border-top: 1px #ccc solid;">
            <span>选择检查结果模板</span>
            <!-- <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增检查细项</Button> -->
          </div>
          <FormItem label="检查结果模板：" prop="formTemplateId">
            <Select v-model="formValidate.formTemplateId" clearable style="width:400px">
              <Option
                v-for="(v,i) in resultList"
                :value="v.resultTemplateId"
                :key="i"
              >{{ v.resultTemplateName }}</Option>
            </Select>
          </FormItem>
          <resultTable :resultObjList="resultObjList" ref="resultTable"></resultTable>
        </Form>
      </div>
      <div v-show="isAdd" slot="footer">
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
      </div>
      <div v-show="isEdit" slot="footer">
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="handleSubmitEdit('formValidate')">保存</Button>
      </div>
    </Modal>
    <Modal v-model="itemModal" title="关联详细项" class-name="modal" :mask-closable="false">
      <Table
        border
        ref="table"
        :columns="itemColumns"
        :data="detailList"
        @on-selection-change="checkChange"
      ></Table>
      <div slot="footer">
        <Button @click="checkPointCancel()">取消</Button>
        <Button type="primary" @click="checkPointSave()">保存</Button>
      </div>
    </Modal>
    <selectCheckForm v-model="selectCheckFormModal" @selectDiscretionaryPower="selectForm"></selectCheckForm>
  </div>
</template>

<script>
import resultTable from "../../components/resultTable";
import selectCheckForm from "../../components/selectCheckForm";

export default {
  components: {
    resultTable,
    selectCheckForm
  },
  props: {
    formEditId: String
  },
  data() {
    return {
      ruleValidate: {
        relevanceName: [
          { required: true, message: "表单名称不能为空！", trigger: "blur" }
        ],
        formTemplateId: [
          { required: true, message: "请选择结果模板！", trigger: "change" }
        ]
      },
      formValidate: {
        relevanceName: "",
        comment: "",
        itemOrder: "",
        formTemplateId: "",
        relevanceFormList: []
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "表单检查点名称",
          key: "taskFromItemPointName",
          align: "center"
        },
        {
          title: "关联详细项名称",
          key: "detailName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            let buttons = [];
            // if (params.row.pointId) {
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    color: "#2d8cf0"
                  },
                  on: {
                    click: () => {
                      this.relevance(params.row);
                    }
                  }
                },
                "关联详细项"
              )
            );
            return h("div", buttons);
          }
        }
      ],
      itemColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "详细项模板名称",
          key: "detailName",
          align: "center"
        }
      ],
      modal: false,
      itemModal: false,
      selectCheckFormModal: false,
      checkPointModal: false,
      loading: false,
      isAdd: true,
      isEdit: false,
      modalTitle: "新增关联表单",
      detailId: "",
      formIndex: "",
      index: "",
      resultList: [],
      resultObjList: [],
      formIdList: [],
      detailList: [],
      checkList: [],
      detailObj: {}
    };
  },
  methods: {
    show() {
      this.geDetailtList();
      this.modal = true;
      let obj2 = {
        type: "resultTemplate",
        page: 1,
        size: 999,
        wheres: {
          search: "" //模板名或表名，模糊查询
        }
      };
      let params2 = new URLSearchParams();
      let query2 = JSON.stringify(obj2);
      params2.append("query", query2);
      this.$http
        .get("/supervision/form/list", {
          params: params2
        })
        // 返回值
        .then(res => {
          if (res.success) {
            this.resultList = res.data.data;
          }
        })
        .catch(error => {
          this.$Message.info("操作失败");
        });
    },
    geDetailtList() {
      this.detailList = [];
      let obj = {
        page: 1,
        size: 999,
        wheres: {
          detailName: ""
        }
      };
      let params = new URLSearchParams();
      let query = JSON.stringify(obj);
      params.append("query", query);
      this.$http
        .get("/supervision/detailRelevance/page", {
          params: params
        })
        // 返回值
        .then(res => {
          if (res.success) {
            this.detailList = res.data.data;
            this.$nextTick(() => {
              for (let i in this.detailList) {
                for (let j in this.checkList) {
                  if (this.detailList[i].id == this.checkList[j]) {
                    this.$refs.table.objData[i]._isChecked = true;
                  }
                }
              }
            });
          }
        })
        .catch(error => {
          this.$Message.info("操作失败");
        });
    },
    visibleChange(value) {
      if (value == false) {
        this.$parent.clearFormEditId();
        this.handleReset("formValidate");
      }
    },
    checkItem() {
      this.selectCheckFormModal = true;
      this.formValidate.relevanceFormList = []
    },
    handleReset(name) {
      this.modal = false;
      this.$refs[name].resetFields();
      this.formValidate = {
        relevanceName: "",
        comment: "",
        itemOrder: "",
        formTemplateId: "",
        relevanceFormList: []
      };
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // for (let i in this.formValidate.relevanceFormList) {
          //   let itemList = this.formValidate.relevanceFormList[i]
          //     .formItemPointDetailList;
          //   for (let j in itemList) {
          //     if (!this.itemList[j].detailId) {
          //       this.$Message.error(`请关联详细项！`);
          //       return;
          //     }
          //   }
          // }
          this.$http
            .post("/supervision/formRelevance/save", this.formValidate)
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
    handleSubmitEdit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // for (let i in this.formValidate.relevanceFormList) {
          //   let itemList = this.formValidate.relevanceFormList[i]
          //     .formItemPointDetailList;
          //   for (let j in itemList) {
          //     if (!this.itemList[j].detailId) {
          //       this.$Message.error(`请关联详细项！`);
          //       return;
          //     }
          //   }
          // }
          this.$http
            .patch(
              `/supervision/formRelevance/updata?id=${this.formEditId}`,
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
    resultChange(value) {
      if (value) {
        this.loading = true;
        this.$http
          .get(`/supervision/form/getResultTemplate?id=${value}`)
          // 返回值
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.resultObjList = res.data.resultItemList;
            }
          })
          .catch(error => {
            this.$Message.info("操作失败");
          });
      } else {
        this.resultObjList = [];
      }
    },
    getFormData(id) {
      this.$http
        .get(`/supervision/formRelevance/get?id=${id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.formValidate = res.data;
            // this.show();
          }
        })
        .catch(error => {
          this.$Message.info("数据获取失败");
        });
    },
    selectForm(data) {
      this.formIdList = [];
      for (let i in data) {
        this.formIdList.push(data[i].value);
      }
      let params = new URLSearchParams();
      let query = JSON.stringify(this.formIdList);
      params.append("query", query);
      this.$http
        .get(`/supervision/safetyCheck/getFormsByIds`, {
          params: params
        })
        .then(res => {
          let data = res.data;
          for (let i in data) {
            let obj = {
              formId: data[i].formId,
              formName: data[i].formName,
              itemOrder: "",
              formItemPointDetailList: []
            };
            this.formValidate.relevanceFormList.push(obj);
            for (let j in data[i].itemList) {
              let itemList = data[i].itemList;
              for (let n in itemList[j].ckCheckPointDutyDtoList) {
                let pointList = itemList[j].ckCheckPointDutyDtoList;
                let obj2 = {
                  taskFormItemPointId: pointList[n].pointId,
                  taskFromItemPointName: pointList[n].pointName,
                  detailId: "",
                  detailName: "",
                  itemOrder: ""
                };
                this.formValidate.relevanceFormList[
                  i
                ].formItemPointDetailList.push(obj2);
              }
            }
          }
        });
    },
    removeItem(i, v) {
      this.formValidate.relevanceFormList.splice(i, 1);
    },
    relevance(row) {
      console.log(row);
      this.itemModal = true;
      // this.detailId = row.detailId;
      this.checkList = row.detailId.split(",");
      this.geDetailtList();
      this.index = row._index;
      for (let i in this.formValidate.relevanceFormList) {
        let detailList = this.formValidate.relevanceFormList[i]
          .formItemPointDetailList;
        for (let j in detailList) {
          if (detailList[j].taskFormItemPointId == row.taskFormItemPointId) {
            this.formIndex = i;
          }
        }
      }
    },
    checkPointCancel() {
      this.itemModal = false;
    },
    checkPointSave() {
      // debugger
      // if (this.checkList.length < 1) {
      //   this.$Message.error("请选择详细项！");
      //   return;
      // }
      // let arr = this.detailList.filter(key => {
      //   return key.id == this.detailId;
      // });
      let detailIdList = [];
      let detailNameList = [];
      for (let i in this.checkList) {
        detailIdList.push(this.checkList[i].id);
        detailNameList.push(this.checkList[i].detailName);
      }
      this.formValidate.relevanceFormList[
        this.formIndex
      ].formItemPointDetailList[this.index].detailId = detailIdList.join(",");
      this.formValidate.relevanceFormList[
        this.formIndex
      ].formItemPointDetailList[this.index].detailName = detailNameList.join(
        ","
      );
      this.itemModal = false;
    },
    checkChange(data) {
      this.checkList = data;
    }
  },
  watch: {
    formEditId(value) {
      if (value) {
        this.getFormData(value);
        this.isAdd = false;
        this.isEdit = true;
        this.modalTitle = "修改自定义表单";
      } else {
        this.isAdd = true;
        this.isEdit = false;
        this.modalTitle = "新增自定义表单";
      }
    },
    formTemplateId(value) {
      this.resultChange(value);
    },
    itemModal(value) {
      if (!value) {
        this.detailId = "";
      }
    }
  },
  computed: {
    formTemplateId() {
      return this.formValidate.formTemplateId;
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