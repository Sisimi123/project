<style lang="less">
@import "../../../styles/commonStyle.less";
// @import '../../styles/common.less';
.task-modal {
  .ivu-modal-body {
    max-height: 650px;
    overflow-x: auto;
  }
}
</style>
<template>
  <div>
    <data-table
      ref="test"
      :url="'/supervision/examine/specialPlanPage'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
              <Form-item label="任务年度:">
                <Select v-model="query.wheres.createYear">
                  <Option value="2019">2019</Option>
                  <Option value="2018">2018</Option>
                  <Option value="2017">2017</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="检查任务名称:" :label-width="110">
                <Input v-model="query.wheres.planName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="任务状态:">
                <Select v-model="query.wheres.planStatus">
                  <Option value="1">待检查</Option>
                  <Option value="2">检查中</Option>
                  <Option value="3">已完结</Option>
                </Select>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset()">重置</Button>
              <Button @click="exportWord()" type="info">导出</Button>
            </div>
            <div style="float:right">
              <Button @click="addTask" type="success">添加任务</Button>
            </div>
          </Row>
          <Row>
            <Col span="10">
              <Form-item label="任务期限:">
                <DatePicker type="date" v-model="query.wheres.planTime_begin" placeholder="开始时间" style="width: 46%"></DatePicker>
                 - 
                <DatePicker type="date" v-model="query.wheres.planTime_end" placeholder="结束时间" style="width: 46%"></DatePicker>
              </Form-item>
            </Col>
            <Col span="5">
              <Form-item label="检查对象类型:" :label-width="110">
                <Select v-model="query.wheres.checkObjectType">
                  <Option v-for="(item,i) in checkObjectTypeList" :key="i" :value="item.value">{{item.title}}</Option>
                </Select> 
              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      v-model="modal"
      title="添加任务"
      width="1200"
      class-name="modal task-modal"
      :mask-closable="false"
      :styles="{top: '80px'}"
    >
      <div class="formBox">
        <!-- <Card :bordered="false" style="margin-bottom:15px">
          <p slot="title"></p> -->
          <Row style='margin-bottom:10px' v-if="isSubmit">
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'>第一步 设置基本信息</span>
          </Row>
          <Row style='margin-bottom:10px' v-else>
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'>基本信息</span>
          </Row>
          <Form ref="taskInfo" :model="taskInfo" :rules="ruleValidate" :label-width="300">
            <!-- <Row>
              <Col span="12"> -->
                <FormItem label="任务编号：" prop="planCode">
                  <Input v-model="taskInfo.planCode" :readonly="!isSubmit" style="width:400px"></Input>
                </FormItem>
              <!-- </Col>
              <Col span="12"> -->
                <FormItem label="任务名称：" prop="planName">
                  <Input v-model="taskInfo.planName" :readonly="!isSubmit" style="width:400px"></Input>
                </FormItem>
              <!-- </Col>
            </Row> -->
             <FormItem label="任务期限：">
                 <DatePicker type="date" :readonly="!isSubmit" v-model="taskInfo.planStartDate" placeholder="开始时间" style="width: 185px;margin-right:10px"></DatePicker>
                 -
                 <DatePicker type="date" :readonly="!isSubmit" v-model="taskInfo.planEndDate" placeholder="结束时间" style="width: 185px;margin-left:10px"></DatePicker>
             </FormItem>
             <FormItem label="任务说明：">
                 <Input :readonly="!isSubmit" v-model="taskInfo.planDesc" type="textarea" style="width:400px"></Input>
             </FormItem>
             <FormItem label="相关文献上传：">
               <upload @getUrl="getUrlArr" :headers="{'ipInfo': this.$store.state.ipInfo.cip}" :id="taskInfo.id" :show="uploadShow" ref="upload"></upload>
              </FormItem>
             <!-- <FormItem  v-show="taskInfo.urls" label="文件上传地址：">
                 <Input type="textarea" readonly v-model="taskInfo.urls"></Input>
             </FormItem> -->
             <FormItem label="本次任务检查对象类型：" prop="checkObjectType">
                 <RadioGroup v-model="taskInfo.checkObjectType">
                    <Radio :disabled="!isSubmit" v-for="(item,i) in checkObjectTypeList" :key="i" :label="item.value">{{item.title}}</Radio>
                </RadioGroup>
             </FormItem>
             <FormItem label="检查对象名单是否固定：" prop="checkObjectFixed">
                 <RadioGroup v-model="taskInfo.checkObjectFixed">
                    <Radio :disabled="!isSubmit" label="1">是,任务下发后不允许后续再添加</Radio>
                    <Radio :disabled="!isSubmit" label="0">否, 任务下发后允许各检查部门可自行添加检查对象</Radio>
                </RadioGroup>
             </FormItem>
             <Row>
                 <Col span="10">
                    <FormItem label="任务下发方式与范围：" prop="dispatchMode">
                        <RadioGroup v-model="taskInfo.dispatchMode">
                            <span @click="getCitiesData"><Radio :disabled="!isSubmit" label="1">地市</Radio></span>
                            <span @click="getCountyData"><Radio :disabled="!isSubmit" label="2">县区</Radio></span>
                        </RadioGroup>
                    </FormItem>
                 </Col>
                 <Col span="12" v-if="taskInfo.dispatchDepts">
                    <FormItem label="已选：" :label-width="60">
                        <Input type="textarea" readonly v-model="taskInfo.dispatchDepts"></Input>
                    </FormItem>
                 </Col>
             </Row>
          </Form>
        <!-- </Card> -->
        <!-- <Card :bordered="false" style="margin-bottom:15px">
          <p slot="title"></p> -->
          <Row style='margin-bottom:10px' v-if="isSubmit"> 
            <span style="margin-right:5px;color:red">*</span>
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'> 第二步 设置检查内容</span>
          </Row>
          <Row style='margin-bottom:10px' v-else> 
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'>检查内容</span>
          </Row>
          <div>
              <div v-if="isSubmit" class="btnBox">
              <Button @click="addForm" type="info">添加已有表单</Button>
              <Button @click="delForm" type="info">删除表单</Button>
              </div>
              <Table border :columns="formColumns" :data="taskInfo.checkItems" @on-selection-change="formChecked"></Table>
          </div>
        <!-- </Card> -->
        <!-- <Card :bordered="false">
          <p slot="title"></p> -->
          <Row style='margin:10px 0' v-if="isSubmit">
              <span style="margin-right:5px;color:red">*</span>
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'>第三步 添加检查对象</span>
          </Row>
          <Row style='margin:10px 0' v-else>
              <Icon type="ios-folder" size="20" style='margin-bottom:10px'></Icon>
              <span icon="ios-add" class='title'>检查对象</span>
          </Row>
          <div>
            <div v-if="isSubmit" class="btnBox">
              <Button @click="addTest" type="info">添加检查对象</Button>
              <Button @click="delTest" type="info">删除检查对象</Button>
            </div>
            <Table border :columns="testColumns" :data="taskInfo.legalEntitys" @on-selection-change="testChecked"></Table>
          </div>
        <!-- </Card> -->
      </div>
      <div v-show="isSubmit" slot="footer">
        <Button @click="cancel('taskInfo')">取消</Button>
        <Button type="info" @click="save('taskInfo')" style="margin-left: 8px">保存</Button>
        <Button type="primary" @click="submit('taskInfo')" style="margin-left: 8px">下发</Button>
      </div>
      <div v-show="!isSubmit" slot="footer">
        <Button @click="cancel('taskInfo')">取消</Button>
        <Button type="primary" @click="sure('taskInfo')" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="treeModal"
      title="地区选择"
      width="540"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
    <div style="padding:10px 20px">
        <newZtree :treeData="treeList" @checkList="selectTreeChange" :withCard="false" :chkboxType="{ 'Y' : '', 'N' : '' }" ref='tree'></newZtree>
    </div>
    <div slot="footer">
        <Button @click="treeCancel()">取消</Button>
        <Button type="primary" @click="treeSure()" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="tableModal"
      :title="tableTitle"
      width="800"
      class-name="modal"
      :mask-closable="false"
    >
    <Table max-height="550" border :columns="tableColumns" :data="tableData"></Table>
    </Modal>
    <checkObjModal v-model="tableModel" :checkType="'setTask'" @selectVal="getCheckObjList" :isParams='true' :selectData="taskInfo.legalEntitys" :excludeUidList="excludeUidList" :checkObjectType="taskInfo.checkObjectType" :deptIdList="areaIdList" :deptType="taskInfo.dispatchMode"></checkObjModal>
    <!-- <selectCheckCrew :value="tableModel" @selectDiscretionaryPower="getCrewList"></selectCheckCrew> -->
    <selectCheckForm v-model="formShow" @selectDiscretionaryPower="getFormList" :selectData="taskInfo.checkItems" :areaType="areaType"></selectCheckForm>
    <checkForm v-model="checkFormShow" :formLookId="formId"></checkForm>
  </div>
</template> 

<script>
import checkObjModal from '../components/checkObjModal.vue';
import selectCheckForm from '../components/selectCheckForm.vue';
import upload from "../components/upload"
// import selectCheckCrew from "../../components/interNetModule/selectCheckCrew"
import checkForm from '../components/checkForm.vue';
import newZtree from "@/views/components/treeGrid/newZtree"
export default {
  components: {
      checkObjModal,
      selectCheckForm,
      checkForm,
      upload,
      newZtree
  },
  data() {
    return {
      ruleValidate:{
          planCode:[
              {required: true, message: "任务编号不能为空！", trigger: "blur"}
          ],
          planName:[
              {required: true, message: "任务名称不能为空！", trigger: "blur"}
          ],
          checkObjectType:[
              {required: true, message: "请选择检查类型！", trigger: "change"}
          ],
          checkObjectFixed:[
              {required: true, message: "请选择检查对象名单是否固定！", trigger: "change"}
          ],
          dispatchMode:[
              {required: true, message: "请选择任务下发方式与范围！", trigger: "change"}
          ]
      },
      tableModal:false,
      treeModal:false,
      modal: false,
      tableModel: false,
      formShow:false,
      addFooter: true,
      modal_loading: false,
      indeterminate: true,
      checkAll: false,
      isSubmit:true,
      uploadShow:true,
      checkFormShow:false,
      checkObjectTypeList:[],
      formId:"",
      title: "信息填写",
      tableTitle: "任务总数量",
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "任务名称",
          key: "planName",
          align: "center"
        },
        {
          title: "任务来源",
          key: "taskSourceName",
          align: "center",
          render: (h, params) => {
            let deptName = params.row.deptName;
            let taskSourceName
            if(deptName == this.userInfo.dept.name){
                taskSourceName = "本部门设置"
            }else{
                taskSourceName = "其他部门设置"
            }
            return h("span", taskSourceName);
          }
        },
        {
          title: "任务状态",
          key: "planStatus",
          align: "center",
          render: (h, params) => {
            let planStatus = params.row.planStatus;
            switch (planStatus) {
              case "1":
                planStatus = "待检查";
                break;
              case "2":
                planStatus = "检查中";
                break;
              case "3":
                planStatus = "已完结";
                break;
            }
            return h("span", planStatus);
          }
        },
        {
          title: "任务开始时间",
          key: "planStartDate",
          align: "center",
          render: (h, params) => {
            let planStartDate = params.row.planStartDate;
            planStartDate = planStartDate.slice(0,planStartDate.indexOf(" "))
            return h("span", planStartDate);
          }
        },
        {
          title: "任务结束时间",
          key: "planEndDate",
          align: "center",
          render: (h, params) => {
            let planEndDate = params.row.planEndDate;
            planEndDate = planEndDate.slice(0,planEndDate.indexOf(" "))
            return h("span", planEndDate);
          }
        },
        {
          title: "检查对象类型",
          key: "checkObjectType",
          align: "center",
          render: (h, params) => {
            let checkObjectType = params.row.checkObjectType;
            checkObjectType = this.$store.getters.getDictName("regulatoryRepertory",checkObjectType)
            return h("span", checkObjectType);
          }
        },
        {
          title: "任务设置部门",
          key: "deptName",
          align: "center"
        },
        {
          title: "任务设置人",
          key: "userName",
          align: "center"
        },
        {
          title: "任务数",
          key: "total",
          width: 90,
          align: "center",
          render: (h, params) => {
            let buttons
            if(params.row.total){
              buttons = []
              buttons.push(
                h(
                    "Button",
                    {
                    props: {
                        type: "text",
                        size: "small"
                    },
                    style: {
                      color:"blue"
                    },
                    on: {
                        click: () => {
                        this.getAllData(params.row);
                        }
                    }
                    },
                    params.row.total
                ),
                );
            }else{
              buttons = "0"
            }
            return h("div", buttons);
          }
        },
        {
          title: "完成数",
          key: "finish",
          width: 90,
          align: "center",
          render: (h, params) => {
            let buttons
            if(params.row.finish){
              buttons = []
              buttons.push(
                h(
                    "Button",
                    {
                    props: {
                        type: "text",
                        size: "small"
                    },
                    style: {
                      color:"blue"
                    },
                    on: {
                        click: () => {
                        this.getFinishData(params.row);
                        }
                    }
                    },
                    params.row.finish
                ),
                );
            }else{
              buttons = "0"
            }
            return h("div", buttons);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
          render: (h, params) => {
            let buttons = [];
            let planStatus = params.row.planStatus;
            if(planStatus == "1"){
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
                        this.issue(params.row.id);
                        }
                    }
                    },
                    "下发"
                ),
                );
            }   
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
                      this.details(params.row);
                    }
                  }
                },
                "详情"
              ),
            );
            return h("div", buttons);
          }
        }
      ],
      formColumns:[
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查表单",
          key: "formName",
          align: "center"
        },
        {
          title: "职能部门",
          key: "dutyName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
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
                      this.formLook(params.row.formId);
                    }
                  }
                },
                "表单预览"
              ),
            );
            return h("div", buttons);
          }
        },
      ],
      testColumns:[
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查对象名称",
          key: "legalEntityName",
          align: "center"
        },
        {
          title: "统一信用代码/注册号",
          key: "legalEntityCode",
          align: "center"
        },
        {
          title: "所在地址",
          key: "regAddress",
          align: "center"
        },
        {
          title: "管辖单位",
          key: "manageUnit",
          align: "center"
        },
      ],
      tableColumns:[
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "检查人",
          key: "checkUserNames",
          align: "center",
        },
        {
          title: "检查部门名称",
          key: "deptName",
          align: "center",
        },
        {
          title: "检查对象类型",
          key: "checkObjectType",
          align: "center",
          render: (h, params) => {
            let checkObjectType = params.row.checkObjectType;
            checkObjectType = this.$store.getters.getDictName("regulatoryRepertory",checkObjectType)
            return h("span", checkObjectType);
          }
        },
        {
          title: "主体名称",
          key: "legalEntityName",
          align: "center",
        },
        {
          title: "任务状态",
          key: "taskStatus",
          align: "center",
          render: (h, params) => {
            let taskStatus = params.row.taskStatus;
            if(taskStatus == "FINISH"){
              taskStatus = "已完成"
            }else{
              taskStatus = "未完成"
            }
            return h("span", taskStatus);
          }
        },
      ],
      // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
            createYear:"",
            planName:"",
            planStatus:"",
            checkObjectType:"",
            planTime_begin:"",
            planTime_end:""
        }
        //   orders: "updateTime desc"
      },
      taskInfo:{
          id:"",
          urls:"",
          planCode:"",
          planName:"",
          planDesc:"",
          planType:"1",
          planStartDate:"",
          planEndDate:"",
          checkObjectType:"",
          checkObjectFixed:"",
          dispatchMode:"",
          checkItems:[],
          legalEntitys:[]
      },
      formCheckList:[],
      testCheckList:[],
      treeList:[],
      areaIdList:[],
      areaTitle:[],
      userInfo:{},
      urlStr:"",
      areaType:"",
      dispatchMode:"",
      excludeUidList:[],
      tableData:[]
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
      this.query.wheres.createYear = "";
      this.query.wheres.planName = "";
      this.query.wheres.planStatus = "";
      this.query.wheres.checkObjectType = "";
      this.query.wheres.planTime_begin = "";
      this.query.wheres.planTime_end = "";
      this.$refs.test.initSearch();
    },
    exportWord(){
       window.open(this.$basePath + '/supervision/examine/exportExcel?model=' + encodeURI(JSON.stringify(this.query)) + '&exportType=3'); 
    },
    selectChange() {},
    addTask() {
      this.modal = true;
      this.isSubmit = true
      this.uploadShow = true
      this.taskInfo = {
          id:"",
          urls:"",
          planCode:"",
          planName:"",
          planDesc:"",
          planType:"1",
          dutyCode:"",
          dutyName:"",
          lineCode:"",
          lineName:"",
          planStartDate:"",
          planEndDate:"",
          checkObjectType:"",
          checkObjectFixed:"",
          dispatchMode:"",
          dispatchDepts:"",
          dispatchDeptCodes:"",
          planStatus:"1",
          userName:"",
          deptName:"",
          checkItems:[],
          legalEntitys:[]
      }
      this.$http
      .get(`/$admin/attachs/uuid`)
      // 返回值
      .then(res => {
        if (res.success) {
          this.taskInfo.id = res.data
          this.$refs.upload.loadFiles()
        }else{
          this.taskInfo.id = ""
        }
      })
      .catch(error => {
          this.taskInfo.id = ""
      });  
    },
    details(res){
      this.$http
            .get(`/supervision/examine/getSpecialPlan?id=${res.id}`)
            // 返回值
            .then(res => {
              if (res.success) {
                this.taskInfo = res.data
                this.modal = true
                this.uploadShow = false
                this.isSubmit = false
                this.$refs.upload.loadFiles()
              }
            })
            .catch(error => {
              this.taskInfo = {}
            });
    },
    addForm(){
      if(!this.taskInfo.dispatchMode){
        this.$Message.error('请先选择下发方式与范围！')
        return
      }
        this.formShow = true
    },
    formLook(value){
        this.checkFormShow = true
        this.formId = value
    },
    clearFormLookId(){
      this.formId = ""
    },
    formChecked(value){
        this.formCheckList = value
    },
    delForm(){
        let checkItems = this.taskInfo.checkItems
        if(this.formCheckList.length ==checkItems.length){
            this.taskInfo.checkItems = []
        }else{
            for(let i in this.formCheckList){
                for(let j in checkItems){
                    if(this.formCheckList[i].formId == checkItems[j].formId){
                        this.taskInfo.checkItems.splice(j,1)
                    }
                }
            }
        }
    },
    testChecked(value){
        this.testCheckList = value
    },
    addTest(){
      if(!this.taskInfo.checkObjectType){
        this.$Message.error('请先选择检查对象类型！')
        return
      }
      if(!this.taskInfo.dispatchMode){
        this.$Message.error('请先选择下发方式与范围！')
        return
      }
      // this.areaIdList = []
      // this.areaTitle = []
      this.excludeUidList = []
      if(this.taskInfo.legalEntitys.length>0){
        for(let i in this.taskInfo.legalEntitys){
          this.excludeUidList.push(this.taskInfo.legalEntitys[i].legalEntityId)
        }
      }
      console.log(this.excludeUidList,'excludeUidList')
      this.tableModel = true
    },
    delTest(){
        let checkItems = this.taskInfo.legalEntitys
        if(this.testCheckList.length == checkItems.length){
            this.taskInfo.legalEntitys = []
        }else{
            for(let i in this.testCheckList){
                for(let j in checkItems){
                    if(this.testCheckList[i].legalEntityId == checkItems[j].legalEntityId){
                        this.taskInfo.legalEntitys.splice(j,1)
                    }
                }
            }
        }
    },
    getCheckObjList(value){
      this.taskInfo.legalEntitys = []
        for(let i in value){
            let obj = {
                planId:"",
                taskId:"",
                legalEntityId:value[i].uid,
                legalEntityName:value[i].objName,
                legalEntityCode:value[i].licNo,
                legalEntityType:value[i].licType,
                assignDept:"",
                assignDepCode:"",
                regAddress:value[i].regAddress,
                manageUnit:value[i].manageUnit

            }
            this.taskInfo.legalEntitys.push(obj)
        }
    console.log(this.taskInfo.legalEntitys,"this.taskInfo.legalEntitys")
    },
    getFormList(value){
        this.taskInfo.checkItems = []
        console.log(value)
        for(let i in value){
            let obj = {
                planId:"",
                formId:value[i].value,
                formName:value[i].title,
                dutyCode:"",
                dutyName:"",
                lineCode:"",
                lineName:""
            }
            this.taskInfo.checkItems.push(obj)
        }
        console.log(this.taskInfo.checkItems,'this.taskInfo.checkItems')
    },
    cancel(name){
        this.modal = false;
        this.$refs[name].resetFields();
        this.taskInfo = {
          id:"",
          urls:"",
          planCode:"",
          planName:"",
          planDesc:"",
          planType:"1",
          dutyCode:"",
          dutyName:"",
          lineCode:"",
          lineName:"",
          planStartDate:"",
          planEndDate:"",
          checkObjectType:"",
          checkObjectFixed:"",
          dispatchMode:"",
          dispatchDepts:"",
          dispatchDeptCodes:"",
          planStatus:"1",
          userName:"",
          deptName:"",
          checkItems:[],
          legalEntitys:[]
      }
    },
    save(name){
        this.$refs[name].validate(valid => {
        if (valid) {
            if(this.taskInfo.planStartDate == ""){
                this.$Message.error("请选择任务开始时间!");
                return
            }
            if(this.taskInfo.planEndDate == ""){
                this.$Message.error("请选择任务结束时间!");
                return
            }
            if(this.taskInfo.checkItems.length==0){
                this.$Message.error("设置检查内容!");
                return
            }
            if(this.taskInfo.legalEntitys.length==0){
                this.$Message.error("添加检查对象!");
                return
            }
            // let checkItems = this.taskInfo.legalEntitys
            // for(let i in checkItems){
            //     delete checkItems[i].manageUnit
            //     delete checkItems[i].regAddress
            // }
            this.$http
            .post(`/supervision/examine/specialSave`,this.taskInfo)
            // 返回值
            .then(res => {
              if (res.success) {
                  this.$Message.info("保存成功!")
                  this.cancel(name)
                  this.initSearch()
              }else{
                  this.$Message.info("保存失败!")
              }
            })
            .catch(error => {
                  this.$Message.info("保存失败!")
            });
            console.log(this.taskInfo,'this.taskInfo')
        } else {
          this.$Message.error("信息填写错误!");
        }
      })
    },
    submit(name){
        this.$refs[name].validate(valid => {
        if (valid) {
            if(this.taskInfo.planStartDate == ""){
                this.$Message.error("请选择任务开始时间!");
                return
            }
            if(this.taskInfo.planEndDate == ""){
                this.$Message.error("请选择任务结束时间!");
                return
            }
            if(this.taskInfo.checkItems.length==0){
                this.$Message.error("设置检查内容!");
                return
            }
            if(this.taskInfo.legalEntitys.length==0){
                this.$Message.error("添加检查对象!");
                return
            }
            // let checkItems = this.taskInfo.legalEntitys
            // for(let i in checkItems){
            //     delete checkItems[i].manageUnit
            //     delete checkItems[i].regAddress
            // }
            this.$http
            .post(`/supervision/examine/saveAndEmit`,this.taskInfo)
            // 返回值
            .then(res => {
              if (res.success) {
                  this.$Message.info("下发成功!")
                  this.cancel(name)
                  this.initSearch()
              }else{
                  this.$Message.info("下发失败!")
              }
            })
            .catch(error => {
                  this.$Message.info("下发失败!")
            });
            console.log(this.taskInfo,'this.taskInfo')
        } else {
          this.$Message.error("信息填写错误!");
        }
      })
    },
    getCitiesData(){
        if (this.isSubmit === false) {
            return;
        }
        let type = "includes:70,45"
        this.areaIdList = []
        this.areaTitle = []
        this.getTree(type, "cities")
    },
    getCountyData(){
      if (this.isSubmit === false) {
            return;
        }
        let type = "includes:70,45,30"
        this.areaIdList = []
        this.areaTitle = []
        this.getTree(type, "county")
    },
    getTree(type, treeType){
           this.$http
            .get(`/$admin/depts/authtree?containOrgan=false&type=${type}`)
            // 返回值
            .then(res => {
              if (res.success) {
                if("county"==treeType){
                  // 选择县区时只能选择子节点
                  this.treeList = res.data
                  this.treeList[0]["nocheck"] = true
                  for(let i in this.treeList[0].children){
                    let children = this.treeList[0].children[i]
                    if(children.children){
                      children["nocheck"] = true
                    }
                  }
                }else {
                  this.treeList = res.data
                }
                  this.treeModal = true
              }
            })
            .catch(error => {
                this.treeList = []
            });
    },
    selectTreeChange(value){
        // console.log(value)
        this.areaIdList = []
        this.areaTitle = []
        for(let i in value){
        this.areaIdList.push(value[i].id) 
        this.areaTitle.push(value[i].name) 
        }
        // if(this.taskInfo.dispatchMode == "2"){
        //   for(let i in value){
        //     if(!value[i].children){
        //         this.areaIdList.push(value[i].id) 
        //         this.areaTitle.push(value[i].name) 
        //     }
        // }
        // }else{
        //   for(let i in value){
        //     if(value[i].children && value[i].type == "45"){
        //         this.areaIdList.push(value[i].id) 
        //         this.areaTitle.push(value[i].name) 
        //     }
        // }
        // }
    },
    sure(name){
      this.cancel(name)
    },
    treeCancel(){
        this.areaIdList = []
        this.areaTitle = []
        this.treeModal = false
    },
    treeSure(){
        if(this.areaIdList.length == 0){
            this.$Message.error('请选择地区')
            return
        }
        this.taskInfo.dispatchDeptCodes = this.areaIdList.join(',')
        this.taskInfo.dispatchDepts = this.areaTitle.join(',')
        // this.treeCancel()
        console.log(this.areaIdList)
        this.treeModal = false
    },
    issue(id){
        this.$http
            .get(`/supervision/examine/emit?planId=${id}`)
            // 返回值
            .then(res => {
              if (res.success) {
                  this.$Message.info("下发成功!")
                  this.initSearch()
              }else{
                  this.$Message.info("下发失败!")
              }
            })
            .catch(error => {
                  this.$Message.info("下发失败!")
            });
    },
    getUrlArr (v) {
            if (v === undefined) {
                this.taskInfo.urls = '';
            } else {
                this.taskInfo.urls = '';
                v.forEach((v, i) => {
                    this.taskInfo.urls = v.url + ',' + this.taskInfo.urls;
                });
            }
        },
    getAllData(row){
      this.tableData = [...row.finishTaskList,...row.unfinishTaskList]
      this.tableTitle = `${row.planName}任务总数`
      this.tableModal = true
    },
    getFinishData(row){
      this.tableData = row.unfinishTaskList
      this.tableTitle = `${row.planName}未完成任务数`
      this.tableModal = true
    }
  },
  mounted() {
    //   if (!this.isEmpty(this.$route.query)) {
    //      this.initQuery();
    //  } else {
    //      this.initSearch();
    //  }
    this.initSearch();
    this.userInfo = this.$store.state.user.userInfo
    this.checkObjectTypeList = this.$store.getters.getDictList("regulatoryRepertory")
    console.log(this.$store.state.app.menuList,'this.$store.state.app.menuList')
  },
  watch:{
      "taskInfo.dispatchMode":function(value){
          if(value){
          if(value == "1"){
              this.dispatchMode = "0"
              this.areaType = "2"
          }else{
              this.dispatchMode = "1"
              this.areaType = "3"
          }
          }
      }
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
.btnBox{
    margin-bottom: 10px
}
.title{
  font-size: 18px
}
</style>
