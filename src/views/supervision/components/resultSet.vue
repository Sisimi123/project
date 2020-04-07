<template>
  <div id="resultSet">
    <Modal
      v-model="resultModal"
      :title="resultTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-visible-change="resultChange"
    >
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <div class="title">结果模板基本内容</div>
        <FormItem label="模板名称：" prop="resultTemplateName">
          <Input
            v-model="formValidate.resultTemplateName"
            placeholder="请输入模板名称"
            style="width: 400px"
          ></Input>
        </FormItem>
        <FormItem label="表单描述：" prop="formDesc">
          <Input
            v-model="formValidate.resultTemplateDesc"
            placeholder="请输入表单名称"
            style="width: 400px"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="模板类型：" prop="resultTemplateType">
          <RadioGroup v-model="formValidate.resultTemplateType">
            <Radio label="1">公用</Radio>
            <Radio label="0">自定义</Radio>
          </RadioGroup>
        </FormItem>
        <div class="title" style="border-top: 1px #ccc solid;">
          <span>设置模板细项</span>
          <Button style="float:right;margin-top:10px" @click="checkItem" type="success">新增模板细项</Button>
        </div>
        <div class="tableBox" v-for="(v,i) in formValidate.resultItemList" :key="i">
          <div class="tableTitle">
            <span class="tableTitle_text">{{i+1}}. {{v.resultItemName}}</span>
            <span style="color:red;" v-if="v.resultItemRequired == 1">（必填）</span>
            <Button style="float:right;" type="error" @click="removeItem(i,v)">删除</Button>
            <Button
              style="float:right;margin-right:5px"
              @click="addcheckPoint(i)"
              type="primary"
            >新增结果项</Button>
            <Button style="float:right;margin-right:5px" @click="editItem(i,v)" type="info">编辑模板细项</Button>
          </div>
          <Table :columns="columns" :data="v.elementList"></Table>
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
    <!-- 结果模板添加细项弹窗 -->
    <Modal v-model="itemModal" :title="itemTitle" width="540" class-name="modal" :mask-closable="false">
      <Form
        ref="itemModalfrom"
        :model="itemModalfrom"
        :rules="ruleItemModalfrom"
        :label-width="120"
      >
        <FormItem label="模板细项名称：" prop="resultItemName">
          <Input
            type="text"
            v-model="itemModalfrom.resultItemName"
            placeholder="请输入模板细项名称"
            style="width:400px"
          ></Input>
        </FormItem>
        <FormItem label="模板细项类型：" prop="resultItemType">
          <RadioGroup v-model="itemModalfrom.resultItemType">
            <Radio label="CHECKBOX">多选</Radio>
            <Radio label="ARDIO">单选</Radio>
            <Radio label="TEXT">文本输入</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否必填：" prop="resultItemRequired">
          <RadioGroup v-model="itemModalfrom.resultItemRequired">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="itemCancel('itemModalfrom')">取消</Button>
        <Button type="primary" @click="itemSave('itemModalfrom')">保存</Button>
      </div>
    </Modal>
    <!-- 结果模板添加检查点弹窗 -->
    <Modal
      v-model="resultItemModal"
      title="添加结果项"
      width="540"
      class-name="modal"
      :mask-closable="false"
    >
      <Form ref="resultItemfrom" :model="resultItemfrom" :rules="ruleResultItem" :label-width="120">
        <FormItem label="结果项名称：" prop="elementTitle">
          <Input
            type="text"
            v-model="resultItemfrom.elementTitle"
            placeholder="请输入结果项名称"
            style="width:400px"
          ></Input>
        </FormItem>
        <!-- <FormItem label="结果项类型：" prop="elementType">
          <RadioGroup v-model="resultItemfrom.elementType">
            <Radio label="CHECKBOX">多选</Radio>
            <Radio label="RADIO">单选</Radio>
            <Radio label="TEXT">输入框</Radio>
          </RadioGroup>
        </FormItem>-->
        <FormItem label="是否默认选中：" prop="elementChecked">
          <RadioGroup v-model="resultItemfrom.elementChecked">
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

    <Modal
      v-model="customBoxModal"
      :title="customTitle"
      width="1000"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
      @on-visible-change="customChange"
    >
      <Form ref="customTemplate" :model="customTemplate" :rules="ruleCustomForm" :label-width="100">
        <div class="title">自定义模板基本内容</div>
        <FormItem label="模板名称：" prop="customTemplateName">
          <Input
            v-model="customTemplate.customTemplateName"
            placeholder="请输入模板名称"
            style="width: 400px"
          ></Input>
        </FormItem>
        <FormItem label="表单描述：" prop="formDesc">
          <Input
            v-model="customTemplate.customTemplateDesc"
            placeholder="请输入表单名称"
            style="width: 400px"
            type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="模板类型：" prop="customTemplateType">
          <RadioGroup v-model="customTemplate.customTemplateType">
            <Radio label="1">公用</Radio>
            <Radio label="0">自定义</Radio>
          </RadioGroup>
        </FormItem>
        <div class="title" style="border-top: 1px #ccc solid;">
          <span>设置模板细项</span>
          <Button style="float:right;margin-top:10px" @click="addCustomList" type="success">新增模板细项</Button>
        </div>
        <div class="tableBox" v-for="(v,i) in customTemplate.resultItemList" :key="i">
          <div class="tableTitle">
            <span class="tableTitle_text">{{i+1}}. {{v.resultItemName}}</span>
            <span style="color:red;" v-if="v.resultItemRequired == 1">（必填）</span>
            <Button style="float:right;" type="error" @click="removeCustomItem(i,v)">删除</Button>
            <Button
              style="float:right;margin-right:5px"
              @click="addCustomCheckPoint(i)"
              type="primary"
            >新增结果项</Button>
            <Button
              style="float:right;margin-right:5px"
              @click="editCustomList(i,v)"
              type="info"
            >编辑模板细项</Button>
          </div>
          <Table :columns="customColumns" :data="v.elementList"></Table>
        </div>
      </Form>
      <div v-show="isCustomAdd" slot="footer">
        <Button @click="customhandleReset('customTemplate')">取消</Button>
        <Button
          type="primary"
          @click="customhandleSubmit('customTemplate')"
          style="margin-left: 8px"
        >提交</Button>
      </div>
      <div v-show="isCustomEdit" slot="footer">
        <Button @click="customhandleReset('customTemplate')">取消</Button>
        <Button
          type="primary"
          @click="customEditSubmit('customTemplate')"
          style="margin-left: 8px"
        >保存</Button>
      </div>
    </Modal>
    <!-- 自定义模板添加细项弹窗 -->
    <Modal
      v-model="customModal"
      title="添加模板细项"
      width="540"
      class-name="modal"
      :mask-closable="false"
    >
      <Form
        ref="customModalfrom"
        :model="customModalfrom"
        :rules="rulecustomModalfrom"
        :label-width="120"
      >
        <FormItem label="模板细项名称：" prop="resultItemName">
          <Input
            type="text"
            v-model="customModalfrom.resultItemName"
            placeholder="请输入模板细项名称"
            style="width:400px"
          ></Input>
        </FormItem>
        <FormItem label="模板细项类型：" prop="resultItemType">
          <RadioGroup v-model="customModalfrom.resultItemType">
            <Radio label="CHECKBOX">多选</Radio>
            <Radio label="ARDIO">单选</Radio>
            <Radio label="TEXT">文本输入</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="是否必填：" prop="resultItemRequired">
          <RadioGroup v-model="customModalfrom.resultItemRequired">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="customCancel('customModalfrom')">取消</Button>
        <Button type="primary" @click="customSave('customModalfrom')">保存</Button>
      </div>
    </Modal>
    <!-- 自定义模板添加检查点弹窗 -->
    <Modal
      v-model="customItemModal"
      title="添加结果项"
      width="540"
      class-name="modal"
      :mask-closable="false"
    >
      <Form ref="customItemfrom" :model="customItemfrom" :rules="ruleCustomItem" :label-width="120">
        <FormItem label="结果项名称：" prop="elementTitle">
          <Input
            type="text"
            v-model="customItemfrom.elementTitle"
            placeholder="请输入结果项名称"
            style="width:400px"
          ></Input>
        </FormItem>
        <!-- <FormItem label="结果项类型：" prop="elementType">
          <RadioGroup v-model="resultItemfrom.elementType">
            <Radio label="CHECKBOX">多选</Radio>
            <Radio label="RADIO">单选</Radio>
            <Radio label="TEXT">输入框</Radio>
          </RadioGroup>
        </FormItem>-->
        <FormItem label="是否默认选中：" prop="elementChecked">
          <RadioGroup v-model="customItemfrom.elementChecked">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="customItemCancel('customItemfrom')">取消</Button>
        <Button type="primary" @click="customItemSave('customItemfrom')">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: {
    customEditId: String,
    resultEditId: String
  },
  data() {
    return {
      ruleValidate: {
        resultTemplateName: [
          { required: true, message: "模板名称不能为空！", trigger: "blur" }
        ]
      },
      ruleItemModalfrom: {
        resultItemName: [
          { required: true, message: "模板细项名称不能为空！", trigger: "blur" }
        ],
        resultItemType: [
          { required: true, message: "请选择模板类型！", trigger: "change" }
        ],
        resultItemRequired: [
          { required: true, message: "请选择是否必填！", trigger: "change" }
        ]
      },
      ruleResultItem: {
        elementTitle: [
          { required: true, message: "结果项名称不能为空！", trigger: "blur" }
        ],
        // elementType: [
        //   { required: true, message: "请选择结果项类型！", trigger: "change" }
        // ],
        elementChecked: [
          { required: true, message: "请选择是否选中！", trigger: "change" }
        ]
      },
      //自定义模板检索
      ruleCustomForm: {
        customTemplateName: [
          { required: true, message: "模板名称不能为空！", trigger: "blur" }
        ]
      },

      rulecustomModalfrom: {
        resultItemName: [
          { required: true, message: "模板细项名称不能为空！", trigger: "blur" }
        ],
        resultItemType: [
          { required: true, message: "请选择模板类型！", trigger: "change" }
        ],
        resultItemRequired: [
          { required: true, message: "请选择是否必填！", trigger: "change" }
        ]
      },
      ruleCustomItem: {
        elementTitle: [
          { required: true, message: "结果项名称不能为空！", trigger: "blur" }
        ],
        // elementType: [
        //   { required: true, message: "请选择结果项类型！", trigger: "change" }
        // ],
        elementChecked: [
          { required: true, message: "请选择是否选中！", trigger: "change" }
        ]
      },
      //结果模板对象
      formValidate: {
        resultTemplateName: "",
        resultTemplateType: "1",
        resultTemplateDesc: "",
        resultItemList: []
      },
      //增加模板细项对象
      itemModalfrom: {
        resultItemName: "",
        resultItemType: "",
        resultItemRequired: ""
      },
      //新增结果项对象
      resultItemfrom: {
        elementTitle: "",
        elementType: "",
        elementChecked: ""
      },
      //自定义模板对象
      customTemplate: {
        customTemplateName: "",
        customTemplateDesc: "",
        customTemplateType: "1",
        resultItemList: []
      },
      //自定义模板细项对象
      customModalfrom: {
        resultItemName: "",
        resultItemType: "",
        resultItemRequired: ""
      },
      //自定义新增结果项对象
      customItemfrom: {
        elementTitle: "",
        elementType: "",
        elementChecked: ""
      },
      resultModal: false,
      customBoxModal: false,
      itemModal: false,
      resultItemModal: false,
      customModal: false,
      customItemModal: false,
      isCustomAdd: true,
      isCustomEdit: false,
      isResultAdd: true,
      isResultEdit: false,
      editCustomTurn: false,
      itemListIndex: null,
      customListIndex: null,
      editCustomPointTurn: false,
      editCustomPointIndex: null,
      editResultTurn: false,
      editResultPointTurn: false,
      editResultPointIndex: null,
      customTitle: "",
      resultTitle: "",
      itemTitle:"添加模板细项",
      columns: [
        {
          title: "结果项名称",
          key: "elementTitle",
          align: "center"
        },
        // {
        //   title: "结果项类型",
        //   key: "elementType",
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
      ],
      customColumns: [
        {
          title: "结果项名称",
          key: "elementTitle",
          align: "center"
        },
        // {
        //   title: "结果项类型",
        //   key: "elementType",
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
                      this.editCustomPoin(params);
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
                      this.removeCustomPoin(params);
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
    resultShow() {
      this.resultModal = true;
    },
    customShow() {
      this.customBoxModal = true;
    },
    resultChange(vaule) {
      if (vaule == false) {
        this.$parent.clearResultEditId();
        this.handleReset("formValidate");
      }
    },
    customChange(vaule) {
      if (vaule == false) {
        this.$parent.clearCustomEditId();
        this.customhandleReset("customTemplate");
      }
    },
    checkItem() {
      this.itemModal = true;
      this.editResultTurn = false;
      this.itemTitle = "添加模板细项"
    },
    editItem(i, v) {
      this.itemModal = true;
      this.editResultTurn = true;
      this.itemTitle = "编辑模板细项"
      this.itemListIndex = i;
      this.itemModalfrom.resultItemName = v.resultItemName;
      this.itemModalfrom.resultItemType = v.resultItemType;
      this.itemModalfrom.resultItemRequired = v.resultItemRequired;
    },
    removeItem(i, v) {
      if (this.resultEditId) {
        let type = 3;
        let id = v.resultItemId;
        this.delHttp(id, type, i);
      } else {
        this.formValidate.resultItemList.splice(i, 1);
      }
    },
    addcheckPoint(i) {
      this.resultItemModal = true;
      this.itemListIndex = i;
      this.editResultPointTurn = false;
    },
    itemCancel(name) {
      this.$refs[name].resetFields();
      this.itemModal = false;
      this.itemModalfrom.resultItemName = "";
      this.itemModalfrom.resultItemType = "";
      this.itemModalfrom.resultItemRequired = "";
    },
    itemSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editResultTurn) {
            this.formValidate.resultItemList[
              this.itemListIndex
            ].resultItemName = this.itemModalfrom.resultItemName;
            this.formValidate.resultItemList[
              this.itemListIndex
            ].resultItemType = this.itemModalfrom.resultItemType;
            this.formValidate.resultItemList[
              this.itemListIndex
            ].resultItemRequired = this.itemModalfrom.resultItemRequired;
            this.itemCancel(name);
          } else {
            let resultItemName = this.itemModalfrom.resultItemName;
            let resultItemType = this.itemModalfrom.resultItemType;
            let resultItemRequired = this.itemModalfrom.resultItemRequired;
            let obj = {
              resultItemName: resultItemName,
              resultItemType: resultItemType,
              resultItemRequired: resultItemRequired,
              resultItemCode: "",
              resultItemOrder: "",
              elementList: []
            };
            this.formValidate.resultItemList.push(obj);
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
      this.itemModalfrom.resultItemName = "";
      this.itemModalfrom.resultItemType = "";
      this.itemModalfrom.resultItemRequired = "";
    },
    resultItemSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editResultPointTurn) {
            this.formValidate.resultItemList[this.itemListIndex].elementList[
              this.editResultPointIndex
            ].elementTitle = this.resultItemfrom.elementTitle;
            this.formValidate.resultItemList[this.itemListIndex].elementList[
              this.editResultPointIndex
            ].elementChecked = this.resultItemfrom.elementChecked;
            this.formValidate.resultItemList[this.itemListIndex].elementList[
              this.editResultPointIndex
            ].elementType = this.resultItemfrom.elementType;
            this.resultItemCancel(name);
          } else {
            let elementTitle = this.resultItemfrom.elementTitle;
            let elementType = this.resultItemfrom.elementType;
            let elementChecked = this.resultItemfrom.elementChecked;
            let itemListIndex = this.itemListIndex;
            let obj = {
              elementTitle: elementTitle,
              elementType: elementType,
              elementChecked: elementChecked,
              itemListIndex: itemListIndex
            };
            this.formValidate.resultItemList[
              this.itemListIndex
            ].elementList.push(obj);
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
      if (res.row.elementId) {
        let itemList = this.formValidate.resultItemList;
        for (let i in itemList) {
          if (itemList[i].resultItemId == res.row.resultItemId) {
            this.itemListIndex = i;
            this.resultItemfrom.elementTitle = this.formValidate.resultItemList[
              i
            ].elementList[res.index].elementTitle;
            this.resultItemfrom.elementChecked = this.formValidate.resultItemList[
              i
            ].elementList[res.index].elementChecked;
            this.resultItemfrom.elementType = this.formValidate.resultItemList[
              i
            ].elementList[res.index].elementType;
          }
        }
      } else {
        this.resultItemfrom.elementTitle = this.formValidate.resultItemList[
          this.itemListIndex
        ].elementList[res.index].elementTitle;
        this.resultItemfrom.elementChecked = this.formValidate.resultItemList[
          this.itemListIndex
        ].elementList[res.index].elementChecked;
        this.resultItemfrom.elementType = this.formValidate.resultItemList[
          this.itemListIndex
        ].elementList[res.index].elementType;
      }
      console.log(res);
    },
    removeCheckPoin(res) {
      console.log(res);
      if (res.row.elementId) {
        let type = 4;
        let id = res.row.elementId;
        this.delHttp(id, type, res.index, res);
      } else {
        this.formValidate.resultItemList[
          res.row.itemListIndex
        ].elementList.splice(res.index, 1);
      }
    },
    handleReset(name) {
      this.resultModal = false;
      this.$refs[name].resetFields();
      this.formValidate = {
        resultTemplateName: "",
        resultTemplateType: "1",
        resultTemplateDesc: "",
        resultItemList: []
      };
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          for (let i in this.formValidate.resultItemList) {
            let resultItemList = this.formValidate.resultItemList[i]
              .elementList;
            for (let j in resultItemList) {
              delete resultItemList[j].itemListIndex;
            }
          }
          console.log(this.formValidate);
          this.$http
            .post("/supervision/form/addResultTemplate", this.formValidate)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.handleReset(name);
                this.resultModal = false;
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
          for (let i in this.formValidate.resultItemList) {
            let resultItemList = this.formValidate.resultItemList[i]
              .elementList;
            for (let j in resultItemList) {
              delete resultItemList[j].itemListIndex;
            }
          }
          console.log(this.formValidate);
          this.$http
            .put(`/supervision/form/updateResultTemplate?id=${this.resultEditId}`, this.formValidate)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.handleReset(name);
                this.resultModal = false;
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

    //自定义模板
    addCustomList() {
      this.customModal = true;
      this.editCustomTurn = false;
    },
    editCustomList(i, v) {
      this.customModal = true;
      this.editCustomTurn = true;
      this.customListIndex = i;
      this.customModalfrom.resultItemName = v.resultItemName;
      this.customModalfrom.resultItemType = v.resultItemType;
      this.customModalfrom.resultItemRequired = v.resultItemRequired;
    },
    customCancel(name) {
      this.$refs[name].resetFields();
      this.customModal = false;
      this.customModalfrom.resultItemName = "";
      this.customModalfrom.resultItemType = "";
      this.customModalfrom.resultItemRequired = "";
    },
    customSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editCustomTurn) {
            console.log(this.customTemplate);
            this.customTemplate.resultItemList[
              this.customListIndex
            ].resultItemName = this.customModalfrom.resultItemName;
            this.customTemplate.resultItemList[
              this.customListIndex
            ].resultItemType = this.customModalfrom.resultItemType;
            this.customTemplate.resultItemList[
              this.customListIndex
            ].resultItemRequired = this.customModalfrom.resultItemRequired;
            this.customCancel(name);
          } else {
            let resultItemName = this.customModalfrom.resultItemName;
            let resultItemType = this.customModalfrom.resultItemType;
            let resultItemRequired = this.customModalfrom.resultItemRequired;
            let obj = {
              resultItemName: resultItemName,
              resultItemType: resultItemType,
              resultItemRequired: resultItemRequired,
              resultItemCode: "",
              resultItemOrder: "",
              elementList: []
            };
            this.customTemplate.resultItemList.push(obj);
            this.customCancel(name);
          }
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },
    removeCustomItem(i, v) {
      if (this.customEditId) {
        let type = 3;
        let id = v.resultItemId;
        this.delHttp(id, type, i);
      } else {
        this.customTemplate.resultItemList.splice(i, 1);
      }
    },
    addCustomCheckPoint(i) {
      this.customItemModal = true;
      this.editCustomPointTurn = false;
      this.customListIndex = i;
    },
    customItemCancel(name) {
      this.$refs[name].resetFields();
      this.customItemModal = false;
      this.customItemfrom.resultItemName = "";
      this.customItemfrom.resultItemType = "";
      this.customItemfrom.resultItemRequired = "";
    },
    customItemSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.editCustomPointTurn) {
            this.customTemplate.resultItemList[
              this.customListIndex
            ].elementList[
              this.editCustomPointIndex
            ].elementTitle = this.customItemfrom.elementTitle;
            this.customTemplate.resultItemList[
              this.customListIndex
            ].elementList[
              this.editCustomPointIndex
            ].elementChecked = this.customItemfrom.elementChecked;
            this.customTemplate.resultItemList[
              this.customListIndex
            ].elementList[
              this.editCustomPointIndex
            ].elementType = this.customItemfrom.elementType;
            this.customItemCancel(name);
          } else {
            let elementTitle = this.customItemfrom.elementTitle;
            let elementType = this.customItemfrom.elementType;
            let elementChecked = this.customItemfrom.elementChecked;
            let customListIndex = this.customListIndex;
            let obj = {
              elementTitle: elementTitle,
              elementType: elementType,
              elementChecked: elementChecked,
              customListIndex: customListIndex
            };
            this.customTemplate.resultItemList[
              this.customListIndex
            ].elementList.push(obj);
            this.customItemCancel(name);
          }
        } else {
          this.$Message.error("信息填写错误!");
        }
      });
    },
    editCustomPoin(res) {
      this.editCustomPointTurn = true;
      this.customItemModal = true;
      this.editCustomPointIndex = res.index;
      if (res.row.elementId) {
        let itemList = this.customTemplate.resultItemList;
        for (let i in itemList) {
          if (itemList[i].resultItemId == res.row.resultItemId) {
            this.customListIndex = i;
            this.customItemfrom.elementTitle = this.customTemplate.resultItemList[
              i
            ].elementList[res.index].elementTitle;
            this.customItemfrom.elementChecked = this.customTemplate.resultItemList[
              i
            ].elementList[res.index].elementChecked;
            this.customItemfrom.elementType = this.customTemplate.resultItemList[
              i
            ].elementList[res.index].elementType;
          }
        }
      } else {
        this.customItemfrom.elementTitle = this.customTemplate.resultItemList[
          this.customListIndex
        ].elementList[res.index].elementTitle;
        this.customItemfrom.elementChecked = this.customTemplate.resultItemList[
          this.customListIndex
        ].elementList[res.index].elementChecked;
        this.customItemfrom.elementType = this.customTemplate.resultItemList[
          this.customListIndex
        ].elementList[res.index].elementType;
      }
      console.log(res);
    },
    removeCustomPoin(res) {
      console.log(res);
      if (res.row.elementId) {
        let type = 4;
        let id = res.row.elementId;
        this.delHttp(id, type, res.index, res);
      } else {
        this.customTemplate.resultItemList[
          res.row.customListIndex
        ].elementList.splice(res.index, 1);
      }
    },
    customhandleReset(name) {
      this.customBoxModal = false;
      this.$refs[name].resetFields();
      this.customTemplate = {
        resultTemplateName: "",
        resultTemplateType: "1",
        resultTemplateDesc: "",
        resultItemList: []
      };
    },
    customhandleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          for (let i in this.customTemplate.resultItemList) {
            let resultItemList = this.customTemplate.resultItemList[i]
              .elementList;
            for (let j in resultItemList) {
              delete resultItemList[j].customListIndex;
            }
          }
          console.log(this.customTemplate);
          this.$http
            .post("/supervision/form/addCustomTemplate", this.customTemplate)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.customhandleReset(name);
                this.customBoxModal = false;
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
    customEditSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          for (let i in this.customTemplate.resultItemList) {
            let resultItemList = this.customTemplate.resultItemList[i]
              .elementList;
            for (let j in resultItemList) {
              delete resultItemList[j].customListIndex;
            }
          }
          console.log(this.customTemplate);
          this.$http
            .put(
              `/supervision/form/updateCustomTemplate?id=${this.customEditId}`,
              this.customTemplate
            )
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("操作成功");
                this.customhandleReset(name);
                this.customBoxModal = false;
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
    getCustomData(id) {
      this.$http
        .get(`/supervision/form/getCustomTemplate?id=${id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.customTemplate = res.data;
            this.customBoxModal = true;
          }
        })
        .catch(error => {
          this.$Message.info("数据获取失败");
        });
    },
    getResultData(id) {
      this.$http
        .get(`/supervision/form/getResultTemplate?id=${id}`)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res);
            this.formValidate = res.data;
            console.log(this.formValidate)
            this.resultModal = true;
          }
        })
        .catch(error => {
          this.$Message.info("数据获取失败");
        });
    },
    delHttp(id, type, i, data) {
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            //请求路径
            .delete(`/supervision/form/deleteTemplate?id=${id}&type=${type}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.$Message.info("删除成功！");
                if (this.customEditId) {
                  if (type == 3) {
                    this.customTemplate.resultItemList.splice(i, 1);
                  } else {
                    let itemList = this.customTemplate.resultItemList;
                    for (let j in itemList) {
                      if (itemList[j].resultItemId == data.row.resultItemId) {
                        this.customTemplate.resultItemList[
                          j
                        ].elementList.splice(i, 1);
                      }
                    }
                  }
                } else {
                  if (type == 3) {
                    this.formValidate.resultItemList.splice(i, 1);
                  } else {
                    let itemList = this.formValidate.resultItemList;
                    for (let j in itemList) {
                      if (itemList[j].resultItemId == data.row.resultItemId) {
                        this.formValidate.resultItemList[j].elementList.splice(
                          i,
                          1
                        );
                      }
                    }
                  }
                }
              }
            })
            .catch(error => {
              this.$Message.info("删除失败！");
            });
        },
        onCancel: () => {}
      });
    }
  },
  watch: {
    customEditId(vaule) {
      if (vaule) {
        this.getCustomData(vaule);
        this.isCustomAdd = false;
        this.isCustomEdit = true;
        this.customTitle = "编辑自定义模板";
      } else {
        this.isCustomAdd = true;
        this.isCustomEdit = false;
        this.customTitle = "新增自定义模板";
      }
    },
    resultEditId(vaule) {
      if (vaule) {
        this.getResultData(vaule);
        this.isResultAdd = false;
        this.isResultEdit = true;
        this.resultTitle = "编辑检查结果模板";
      } else {
        this.isResultAdd = true;
        this.isResultEdit = false;
        this.resultTitle = "新增检查结果模板";
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