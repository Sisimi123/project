<style lang="less">
@import "../../../styles/commonStyle.less";
// @import '../../styles/common.less';
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/examine/getAssignPage'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
      @on-row-dblclick="tableClick"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="检查对象类型:" :label-width="90">
                <Select v-model="query.wheres.checkObjectType">
                  <Option v-for="item in checkedObjList" :value="item.value" :key="item.value">{{ item.title }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="是否指派:">
                <Select v-model="query.wheres.assigned">
                  <Option value="0">未指派</Option>
                  <Option value="1">已指派</Option>
                  <Option value="2">全部</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="主体名称:" :label-width="110">
                <Input v-model="query.wheres.fsName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="检查人员:" :label-width="110">
                <Input v-model="query.wheres.checkUserName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
              <Button @click="exportWord()" type="info">导出</Button>
            </div>
            <div style="float:right">
              <Button @click="taskAssigned" type="success">任务指派</Button>
            </div>
          </Row>
        </Form>
      </div>
    </data-table>
    <!-- <checkObjModal v-model="tableModel" @selectVal="getCheckObjList"></checkObjModal> -->
    <selectCheckCrew v-model="tableModel" @selectDiscretionaryPower="getCrewList" @input="close"></selectCheckCrew>
    <!-- <selectCheckForm v-model="formShow" @selectDiscretionaryPower="getFormList"></selectCheckForm>
    <checkForm :formLookId="formId"></checkForm>-->
  </div>
</template> 

<script>
// import checkObjModal from "../../components/interNetModule/checkObjModal"
// import selectCheckForm from "../../components/interNetModule/selectCheckForm"
import selectCheckCrew from '../components/selectCheckCrew.vue';
// import checkForm from "../../settings/formSet/checkForm"
export default {
  components: {
    //   checkObjModal,
    selectCheckCrew
    //   checkForm,
  },
  data() {
    return {
      tableModel: false,
      isDbClick:false,
      formId: "",
      title: "信息填写",
      columns: [
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
          title: "任务名称",
          key: "planName",
          align: "center",
          render: (h, params) => {
              let planName
              if(params.row.planInfo){
                planName = params.row.planInfo.planName;
              } else {
                planName = params.row.taskCode;
              }
              if (planName) {
                planName = planName.replace("&ldquo;", "“").replace("&rdquo;", "”");
              }
            return h("span", planName);
          }
        },
        {
          title: "指派状态",
          key: "status",
          align: "center",
            render: (h, params) => {
                let status
                if(params.row.planInfo){
                  if(!params.row.planInfo.assignDepCode){
                      status = "未指派"
                  }else{
                      status = "已指派"
                  }
                } else {
                  if (params.row.checkUserNames) {
                      status = "已指派"
                  }else{
                      status = "未指派"
                  }
                }
              return h("span", status);
            }
        },
        {
          title: "任务创建日期",
          key: "createTime",
          align: "center",
          render: (h, params) => {
              let createTime
              if(params.row.planInfo){
                createTime = params.row.planInfo.createTime;
              }
              if (!createTime) {
                createTime = params.row.createTime;
              }
            return h("span", createTime);
          }
        },
        {
          title: "检查对象名称",
          key: "legalEntityName",
          align: "center"
        },
        {
          title: "统一信用代码/注册号",
          key: "uniCode",
          align: "center"
        },
        {
          title: "检查人员",
          key: "checkUserNames",
          align: "center"
        },
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          taskType: "SPECIAL",
          checkObjectType: "",
          fsName: "",
          assigned: "",
          checkUserName: ""
        }
        //   orders: "updateTime desc"
      },
      formCheckList: [],
      testCheckList: [],
      treeList: [],
      areaIdList: [],
      areaTitle: [],
      dbTaskIds:[],
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
      this.query.wheres.taskType = "SPECIAL";
      this.query.wheres.checkObjectType = "";
      this.query.wheres.fsName = "";
      this.query.wheres.assigned = "";
      this.query.wheres.checkUserName = "";
      this.$refs.test.initSearch();
    },
    tableClick(row){
      this.dbTaskIds = []
      this.dbTaskIds.push(row)
      this.tableModel = true;
      this.isDbClick = true
    },
    close(value){
      this.isDbClick = value
    },
    taskAssigned() {
      if (this.formCheckList.length == 0) {
        this.$Message.error("请先选择要指派的任务！");
        return;
      }
      this.tableModel = true;
    },
    selectChange(value) {
      console.log(value);
      this.formCheckList = value;
    },
    //任务指派
    getCrewList(value) {
      let taskIds = [];
      let userIds = [];
      if(this.isDbClick){
        for (let i in this.dbTaskIds) {
        taskIds.push(this.dbTaskIds[i].taskId);
      }
      }else{
        for (let i in this.formCheckList) {
        taskIds.push(this.formCheckList[i].taskId);
      }
      }
      for (let i in value) {
        userIds.push(value[i].id);
      }
      let obj = {
        taskIds: taskIds,
        userIds: userIds,
        statusType:"ASSIGN"
      };
      this.$http
        .post(`/supervision/examine/assign`, obj)
        // 返回值
        .then(res => {
          if (res.success) {
            this.$Message.info("指派成功！");
            this.initSearch()
          }else{
            this.$Message.error(res.msg);
          }
        })
        .catch(error => {
          this.$Message.error("指派失败！");
        });
    },
    //导出
    exportWord(){
       window.open(this.$basePath + '/supervision/examine/exportExcel?model=' + encodeURI(JSON.stringify(this.query)) + '&exportType=4'); 
    },
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
  },
  computed: {
      checkedObjList () {
          return this.$store.getters.getDictList('regulatoryRepertory');
      }
  },
  watch: {}
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

.formBox {
  background: #eee;
  padding: 15px;
  max-height: 800px;
  overflow-y: auto;
}
.btnBox {
  margin-bottom: 10px;
}
</style>
