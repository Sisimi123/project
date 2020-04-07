<style lang="less">
// @import "../../../styles/commonStyle.less";
@import "../../../styles/common.less";
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/form/list'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="8">
              <Form-item label="表单类型:" :label-width="110">
                <RadioGroup v-model="query.type" type="button" @on-change="radioChange">
                  <Radio label="form">自定义表单</Radio>
                  <Radio label="customTemplate">自定义模板</Radio>
                  <Radio label="resultTemplate">检查结果模板</Radio>
                </RadioGroup>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="表单名称:">
                <Input v-model="query.wheres.search" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()" >重置</Button>
            </div>
            <Button @click="add" type="success" style="float:right">新增</Button>
          </Row>
        </Form>
      </div>
    </data-table>
    <customFormSet :formEditId="formEditId" ref="customFormSet"></customFormSet>
    <resultSet :customEditId="customEditId" :resultEditId="resultEditId" ref="resultSet"></resultSet>
    <checkForm :formLookId="formLookId" :taskId="taskId" :isUsable="isUsable" v-model="formShow"></checkForm>
    <!-- <checkForm ref="checkForm" v-if="hackReset"></checkForm> -->
  </div>
</template> 

<script>
import customFormSet from "../components/customFormSet"
import resultSet from "../components/resultSet"
import checkForm from "../components/checkForm"

export default {
  components: {
      customFormSet,
      resultSet,
      checkForm
  },
  data() {
    return {
      model: false,
      tableModel: false,
      addFooter: true,
      modal_loading: false,
      indeterminate: true,
      checkAll: false,
      hackReset:false,
      isUsable:false,
      formShow:false,
      title: "信息填写",
      columns: [],
      formColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "自定义表单名称",
          key: "formName",
          align: "left"
        },
        {
          title: "自定义表单描述",
          key: "formDesc",
          align: "left"
        },
        {
          title: "是否有效",
          key: "isValid",
          align: "center",
          maxWidth: 100,
          render: (h, params) => {
            let isValid = params.row.isValid;
            switch (isValid) {
              case "1":
                isValid = "有效";
                break;
              case "2":
                isValid = "失效";
                break;
            }
            return h("span", isValid);
          }
        },
        {
          title: "表格类型",
          key: "formType",
          align: "center",
          maxWidth: 120,
          render: (h, params) => {
            let formType = params.row.formType;
            switch (formType) {
              case "SCORE":
                formType = "评分表格";
                break;
              case "CHECK":
                formType = "检查表格";
                break;
            }
            return h("span", formType);
          }
        },
        {
          title: "检查类型",
          key: "checkType",
          align: "left",
          render: (h, params) => {
            let textList = []
            let checkType = params.row.checkType;
            if(checkType.indexOf('DAILY')>-1){
              textList.push("日常检查")
            }
            if(checkType.indexOf('RANDOM')>-1){
              textList.push("随机抽查")
            }
            if(checkType.indexOf('SPECIAL')>-1){
              textList.push("专项检查")
            }
            if(checkType.indexOf('SAFTY')>-1){
              textList.push("安全检查")
            }
            if(checkType.indexOf('TEMPORARY')>-1){
              textList.push("临时")
            }
            textList = textList.join(',')
            return h("span", textList);
          }
        },
        {
          title: "适用范围类型",
          key: "areaType",
          align: "center",
          maxWidth: 120,
          render: (h, params) => {
            let areaType = params.row.areaType;
            switch (areaType) {
              case "1":
                areaType = "适用全省";
                break;
              case "2":
                areaType = "适用地市";
                break;
              case "3":
                areaType = "适用区县";
                break;
            }
            return h("span", areaType);
          }
        },
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
                      this.lookFormList(params.row);
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
                      this.editFormList(params.row);
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
                      this.delFormList(params.row);
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
      customColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "自定义模板名称",
          key: "customTemplateName",
          align: "left"
        },
        {
          title: "自定义模板描述",
          key: "customTemplateDesc",
          align: "left"
        },
        {
          title: "模板类型",
          key: "customTemplateType",
          align: "center",
          maxWidth: 100,
          render: (h, params) => {
            let type = params.row.customTemplateType;
            switch (type) {
              case "0":
                type = "自定义";
                break;
              case "1":
                type = "公用";
                break;
            }
            return h("span", type);
          }
        },
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
                      this.editCustomList(params.row);
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
                      this.delCustomList(params.row);
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
      resultColumns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查结果模板名称",
          key: "resultTemplateName",
          align: "left"
        },
        {
          title: "检查结果模板描述",
          key: "resultTemplateDesc",
          align: "left"
        },
        {
          title: "模板类型",
          key: "resultTemplateType",
          align: "center",
          render: (h, params) => {
            let type = params.row.resultTemplateType;
            switch (type) {
              case "0":
                type = "自定义";
                break;
              case "1":
                type = "公用";
                break;
            }
            return h("span", type);
          }
        },
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
                      this.editResultList(params.row);
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
                      this.delResultList(params.row);
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
      // 查询条件
      query: {
        page: 1,
        size: 20,
        type: "form",
        wheres: {
          search: ""
        }
      },
      formEditId:"",
      customEditId:"",
      resultEditId:"",
      formLookId:"",
      taskId:"",
    };
  },
  computed: {
    //  getFormItem() {
    //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    //  },
    //  defaultUserName() {
    //    return this.$store.state.user.userInfo.name;
    //  },
  },
  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.search = "";
      this.$refs.test.initSearch();
    },
    selectChange() {},
    radioChange(value) {
      if (value == "form") {
        this.columns = this.formColumns;
      }
      if (value == "customTemplate") {
        this.columns = this.customColumns;
      }
      if (value == "resultTemplate") {
        this.columns = this.resultColumns;
      }
      this.initSearch();
    },
    delFormList(res) {
      let url = "/supervision/form/deleteForm";
      let id = res.formId;
      let type = 1;
      this.delHttp(url, id, type);
    },
    editCustomList(res){
      this.resultEditId = ""
      this.customEditId = res.customTemplateId
    },
    delCustomList(res) {
      let url = "/supervision/form/deleteTemplate";
      let id = res.customTemplateId;
      let type = 1;
      this.delHttp(url, id, type);
    },
    delResultList(res) {
      let url = "/supervision/form/deleteTemplate";
      let id = res.resultTemplateId;
      let type = 2;
      this.delHttp(url, id, type);
    },
    editResultList(res){
      this.customTemplateId = ""
      this.resultEditId = res.resultTemplateId
    },
    delHttp(url, id, type) {
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
    add() {
        if(this.query.type == "form"){
          this.formEditId = ""
          this.$refs.customFormSet.show()
        }
        if(this.query.type == "customTemplate"){
          this.customEditId = ""
            this.$refs.resultSet.customShow()
        }
        if(this.query.type == "resultTemplate"){
           this.resultEditId = ""
            this.$refs.resultSet.resultShow()
        }
    },
    lookFormList(res){
      this.formShow = true
      this.formLookId = res.formId
      // this.hackReset = true
      // this.$nextTick(() => {
      //   this.formLookId = res.formId
      //   this.taskId = ""
      //   this.isUsable = true
      // })
    },
    editFormList(res){
      this.formEditId = res.formId
    },
    clearFormEditId(){
      this.formEditId = ""
    },
    clearCustomEditId(){
      this.customEditId = ""
    },
    clearResultEditId(){
      this.resultEditId = ""
    },
    clearFormLookId(){
      this.formLookId = ""
      this.hackReset = false
    },
    // clearTaskId(){
    //   this.taskId = ""
    // }
  },
  mounted() {
    this.columns = this.formColumns;
    this.initSearch();
    for(let i in this.listArr){
      this.listArr[0]['elementChecked'] = false
      this.listArr[1]['elementChecked'] = true
      this.listArr[2]['elementChecked'] = false  
    }
    console.log(this.listArr)
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

/*  以上是表格 */

.searColumn {
  padding: 10px 20px 10px 20px;
}
.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}
label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}

label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}

.selec {
  width: 120px;
}

.selec2 {
  width: 85px;
}

.both-white-padding {
  margin: 0 20px;
}

th.ivu-table-column-left div.ivu-table-cell {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-input {
  font-size: 12px;
  border: none;
  out-line: none;
  color: #000;
}
.el-input__inner {
  height: 32px;
  border: none;
  outline-style: none;
}
.text-required {
  display: inline-block;
  color: red;
}
.fk-box1 {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 20px;
}
.fk-title {
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  background: #f8f8f9;
}
.fk-content {
  /* 				height:45px; */
  /* 				line-height:45px; */
  /* 				text-indent:20px; */
  margin: 10px 0px;
}
.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
  /* 				width%; */
}
.fk-text {
  float: left;
  width: 90%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 40px;
}
.fk-img {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 130px;
  height: 120px;
}
p.mark {
  font-size: 12px;
  margin: 0 auto;
}
input:disabled {
  border: none;
  background-color: #fff;
  color: #aca899;
}

/* upload 样式 */
.demo-upload-list,
.qm-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.qm-upload-list {
  width: 200px;
  height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
