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
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <div class="title">表格基本内容</div>
          <FormItem label="表单名称：" prop="formName">
            <Input v-model="formValidate.formName" placeholder="请输入表单名称" style="width: 400px"></Input>
          </FormItem>
          <FormItem label="表单描述：" prop="formDesc">
            <Input
              v-model="formValidate.formDesc"
              placeholder="请输入表单名称"
              style="width: 400px"
              type="textarea"
            ></Input>
          </FormItem>
          <FormItem label="是否有效：" prop="isValid">
            <RadioGroup v-model="formValidate.isValid">
              <Radio label="1">有效</Radio>
              <Radio label="2">失效</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="表格类型：" prop="formType">
            <RadioGroup v-model="formValidate.formType">
              <Radio label="CHECK">检查表格</Radio>
              <Radio label="SCORE">评分表格</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="适用范围类型：" prop="areaType">
            <RadioGroup v-model="formValidate.areaType">
              <Radio label="1">适用全省</Radio>
              <Radio label="2">适用地市</Radio>
              <Radio label="3">适用区县</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="检查类型：" prop="checkTypeList">
            <CheckboxGroup v-model="formValidate.checkTypeList">
              <Checkbox label="DAILY">日常检查</Checkbox>
              <Checkbox label="RANDOM">随机抽查</Checkbox>
              <Checkbox label="SPECIAL">专项检查</Checkbox>
              <Checkbox label="SAFTY">安全检查</Checkbox>
              <Checkbox label="TEMPORARY">临时</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div class="title" style="border-top: 1px #ccc solid;">
            <span>选择自定义模板</span>
            <!-- <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增检查细项</Button> -->
          </div>
          <FormItem label="自定义模板：" prop="customTemplateId">
            <Select v-model="formValidate.customTemplateId" clearable style="width:400px">
              <Option
                v-for="(v,i) in customList"
                :value="v.customTemplateId"
                :key="i"
              >{{ v.customTemplateName }}</Option>
            </Select>
          </FormItem>
          <customTable :customObjList="customObjList" ref="customTable"></customTable>
          <div class="title" style="border-top: 1px #ccc solid;">
            <span>设置检查内容</span>
            <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增检查细项</Button>
          </div>
          <div class="tableBox" v-for="(v,i) in formValidate.itemList" :key="i">
            <div class="tableTitle">
              <span class="tableTitle_text">{{i+1}}. {{v.itemName}}</span>
              <Button style="float:right;" type="error" @click="removeItem(i,v)">删除</Button>
              <Button
                style="float:right;margin-right:5px"
                @click="addcheckPoint(i)"
                type="primary"
              >新增检查点</Button>
              <Button
                style="float:right;margin-right:5px"
                @click="editItemList(i,v)"
                type="info"
              >编辑检查细项</Button>
            </div>
            <Table :columns="columns" :data="v.ckCheckPointDutyDtoList"></Table>
          </div>
          <div class="title" style="border-top: 1px #ccc solid;">
            <span>选择检查结果模板</span>
            <!-- <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增检查细项</Button> -->
          </div>
          <FormItem label="检查结果模板：" prop="resultTemplateId">
            <Select v-model="formValidate.resultTemplateId" clearable style="width:400px">
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
    <Modal v-model="itemModal" title="添加检查细项" class-name="modal" :mask-closable="false">
      <div>
        检查细项名称：
        <Input type="text" v-model="itemName" placeholder="请输入检查细项名称" style="width:400px"></Input>
      </div>
      <div slot="footer">
        <Button @click="itemCancel()">取消</Button>
        <Button type="primary" @click="itemSave()">保存</Button>
      </div>
    </Modal>
    <Modal
      v-model="checkPointModal"
      title="添加检查点"
      class-name="modal"
      width="540"
      :mask-closable="false"
    >
      <div>
        <span class="lable">检查细项名称：</span>
        <Input type="textarea" v-model="checkPointName" placeholder="请输入检查点名称" style="width:400px"></Input>
      </div>
      <div style="margin-top:15px">
        <span class="lable">操作要领：</span>
        <Input type="textarea" v-model="operationEssentials" placeholder="请输入操作要领" style="width:400px"></Input>
      </div>
      <div slot="footer">
        <Button @click="checkPointCancel()">取消</Button>
        <Button type="primary" @click="checkPointSave()">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import customTable from "./customTable";
import resultTable from "./resultTable";

export default {
  components: {
    customTable,
    resultTable
  },
  props: {
    formEditId: String
  },
  data() {
    return {
      ruleValidate: {
        formName: [
          { required: true, message: "表单名称不能为空！", trigger: "blur" }
        ],
        checkTypeList:[
            { required: true, type: 'array', min: 1, message: '请勾选表单检查类型！', trigger: 'change' },
        ]
      },
      formValidate: {
        formName: "", //表单名称
        formDesc: "", //表单描述
        isValid: "1", //是否有效 1 有效 2 失效
        formType: "CHECK", //表格类型 评分表格SCORE; 检查表格CHECK;
        customTemplateId: "",
        resultTemplateId: "",
        areaType: "1", //适用范围类型 适用全省1;适用地市2;适用区县3;
        checkType: "DAILY", //检查类型：日常检查 DAILY;随机抽查 RANDOM;专项 SPECIAL;临时 TEMPORARY;
        checkTypeList:[],
        formCode: "", // 检查表单编码 双随机事项Code
        scoreTotal: "", // 总分 非评分类型可为空
        itemList: []
      },
      columns: [
        {
          title: "检查点名称",
          key: "pointName",
          align: "center"
        },
        // {
        //   title: "检查点类型",
        //   key: "pointType",
        //   align: "center"
        // },
        {
          title: "操作要领",
          key: "operationEssentials",
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
                        this.editCheckPoin(params);
                      }
                    }
                  },
                  "编辑"
                )
              );
            // }
            buttons.push(
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
            );
            return h("div", buttons);
          }
        }
      ],
      modal: false,
      itemModal: false,
      checkPointModal: false,
      loading: false,
      isAdd: true,
      isEdit: false,
      modalTitle: "新增自定义表单",
      itemName: "",
      checkPointName: "",
      checkPointIndex: null,
      itemListIndex: null,
      pointIndex: null,
      operationEssentials: "",
      customList: [],
      resultList: [],
      customObjList: [],
      resultObjList: [],
      itemListTurn:false,
      editPointTurn:false,
    };
  },
  methods: {
    show() {
      this.modal = true;
      let obj = {
        type: "customTemplate",
        page: 1,
        size: 999,
        wheres: {
          search: "" //模板名或表名，模糊查询
        }
      };
      let params = new URLSearchParams();
      let query = JSON.stringify(obj);
      params.append("query", query);
      this.$http
        .get("/supervision/form/list", {
          params: params
        })
        // 返回值
        .then(res => {
          if (res.success) {
            this.customList = res.data.data;
          }
        })
        .catch(error => {
          this.$Message.info("操作失败");
        });
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
    visibleChange(value) {
      if (value == false) {
        this.customObjList = [];
        this.resultObjList = [];
        this.$parent.clearFormEditId();
        this.handleReset("formValidate");
      }
    },
    checkItem() {
      this.itemModal = true;
      this.itemListTurn = false
    },
    itemCancel() {
      this.itemModal = false;
      this.itemName = "";
    },
    itemSave() {
      if (this.itemListTurn) {
        if (this.itemName == "") {
          this.$Message.error("检查细项名称不能为空");
          return;
        }
        this.formValidate.itemList[
          this.checkPointIndex
        ].itemName = this.itemName;
        this.itemCancel();
      } else {
        if (this.itemName == "") {
          this.$Message.error("检查细项名称不能为空");
          return;
        }
        let itemName = this.itemName;
        let obj = {
          itemName: itemName,
          ckCheckPointDutyDtoList: []
        };
        this.formValidate.itemList.push(obj);
        this.itemCancel();
      }
    },
    delHttp(url, id, type, data) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(url + `?id=${id}&type=${type}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("删除成功");
                if (type == 2) {
                  this.formValidate.itemList.splice(index, 1);
                } else {
                  let itemList = this.formValidate.itemList;
                  for (let i in itemList) {
                    if (itemList[i].itemId == data.row.itemId) {
                      this.formValidate.itemList[
                        i
                      ].ckCheckPointDutyDtoList.splice(res.index, 1);
                    }
                  }
                }
              }
            })
            .catch(error => {
              this.$Message.info("删除成功");
            });
        },
        onCancel: () => {}
      });
    },
    removeItem(index, v) {
      if (this.formEditId) {
        console.log(v, "v");
        let url = "/supervision/form/deleteForm";
        let type = 2;
        let id = v.itemId;
        this.delHttp(url, id, type);
      } else {
        this.formValidate.itemList.splice(index, 1);
      }
    },
    removeCheckPoin(res) {
      if (res.row.pointId) {
        let url = "/supervision/form/deleteForm";
        let type = 3;
        let id = res.row.pointId;
        this.delHttp(url, id, type, res);
      } else {
        this.formValidate.itemList[
          res.row.checkPointIndex
        ].ckCheckPointDutyDtoList.splice(res.index, 1);
      }
    },
    editCheckPoin(res) {
      this.editPointTurn = true
      this.checkPointModal = true;
      this.pointIndex = res.index;
      if(res.row.pointId){
      let itemList = this.formValidate.itemList;
      for (let i in itemList) {
        if (itemList[i].itemId == res.row.itemId) {
          this.checkPointIndex = i;
          this.checkPointName = this.formValidate.itemList[
            i
          ].ckCheckPointDutyDtoList[res.index].pointName;
          this.operationEssentials = this.formValidate.itemList[
            i
          ].ckCheckPointDutyDtoList[res.index].operationEssentials;
        }
      }
      }else{
        //   console.log(res,this.checkPointIndex)
          this.checkPointName = this.formValidate.itemList[
            this.checkPointIndex
          ].ckCheckPointDutyDtoList[res.index].pointName;
          this.operationEssentials = this.formValidate.itemList[
            this.checkPointIndex
          ].ckCheckPointDutyDtoList[res.index].operationEssentials;
      }
    },
    addcheckPoint(i) {
      this.checkPointModal = true;
      this.editPointTurn = false
      this.checkPointIndex = i;
    },
    editItemList(i, v) {
      this.checkPointIndex = i;
      this.itemModal = true;
      this.itemListTurn = true
      this.itemName = v.itemName;
    },
    checkPointCancel() {
      this.checkPointModal = false;
    //   this.checkPointIndex = null;
      this.checkPointName = "";
      this.operationEssentials = "";
    },
    checkPointSave() {
      if (this.editPointTurn) {
        if (this.checkPointName == "") {
          this.$Message.error("检查点名称不能为空");
          return;
        }
        this.formValidate.itemList[this.checkPointIndex].ckCheckPointDutyDtoList[
          this.pointIndex
        ].pointName = this.checkPointName;
        this.formValidate.itemList[this.checkPointIndex].ckCheckPointDutyDtoList[
          this.pointIndex
        ].operationEssentials = this.operationEssentials;
        this.checkPointCancel();
      } else {
        if (this.checkPointName == "") {
          this.$Message.error("检查点名称不能为空");
          return;
        }
        let checkPointName = this.checkPointName;
        let checkPointIndex = this.checkPointIndex;
        let operationEssentials = this.operationEssentials;
        let obj = {
          pointName: checkPointName,
          pointType: "CHECK",
          numberDesc: "",
          pointCode: "",
          isNumber: "",
          pointDesc: "",
          pointOrder: "",
          operationEssentials: operationEssentials,
          checkPointIndex: checkPointIndex
        };
        this.formValidate.itemList[
          this.checkPointIndex
        ].ckCheckPointDutyDtoList.push(obj);
        this.checkPointCancel();
      }
    },
    handleReset(name) {
      this.modal = false;
      this.$refs[name].resetFields();
      this.formValidate = {
        formName: "",
        isValid: "1",
        formType: "CHECK",
        customTemplateId: "",
        resultTemplateId: "",
        areaType: "1",
        checkType: "DAILY",
        checkTypeList: [],
        formCode: "",
        scoreTotal: "",
        itemList: []
      };
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          for (let i in this.formValidate.itemList) {
            let itemList = this.formValidate.itemList[i]
              .ckCheckPointDutyDtoList;
            for (let j in itemList) {
              console.log(itemList);
              delete itemList[j].checkPointIndex;
            }
          }
          this.formValidate.checkType = this.formValidate.checkTypeList.join(',')
          this.$http
            .post("/supervision/form/addTaskForm", this.formValidate)
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
          for (let i in this.formValidate.itemList) {
            let itemList = this.formValidate.itemList[i]
              .ckCheckPointDutyDtoList;
            for (let j in itemList) {
              console.log(itemList);
              delete itemList[j].checkPointIndex;
            }
          }
          this.formValidate.checkType = this.formValidate.checkTypeList.join(',')
          this.$http
            .put(`/supervision/form/updateFullForm?id=${this.formEditId}`, this.formValidate)
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
      console.log(this.formValidate);
    },
    customChange(value) {
      if (value) {
        this.loading = true;
        this.$http
          .get(`/supervision/form/getCustomTemplate?id=${value}`)
          // 返回值
          .then(res => {
            if (res.success) {
              this.loading = false;
              this.customObjList = res.data.resultItemList;
            }
          })
          .catch(error => {
            this.$Message.info("操作失败");
          });
      } else {
        this.customObjList = [];
      }
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
        .get(`/supervision/form/getForm?id=${id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.formValidate = res.data;
            this.formValidate.checkTypeList = this.formValidate.checkType.split(',')
            this.show();
          }
        })
        .catch(error => {
          this.$Message.info("数据获取失败");
        });
    }
  },
  watch: {
    // formEditId: {
    //   handler(newValue, oldValue) {
    //     if (Object.keys(newValue).length > 0) {
    //       this.formValidate = newValue;
    //       this.show();
    //       this.isAdd = false;
    //       this.isEdit = true;
    //       this.modalTitle = "修改自定义表单";
    //     } else {
    //       this.isAdd = true;
    //       this.isEdit = false;
    //       this.modalTitle = "新增自定义表单";
    //     }
    //   },
    //   deep: true
    // },
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
    customTemplateId(value) {
      this.customChange(value);
    },
    resultTemplateId(value) {
      this.resultChange(value);
    }
  },
  computed: {
    customTemplateId() {
      return this.formValidate.customTemplateId;
    },
    resultTemplateId() {
      return this.formValidate.resultTemplateId;
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