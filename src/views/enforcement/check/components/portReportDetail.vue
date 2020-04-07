<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>

<template>

<div>
    <Modal
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :edit="edit"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">

        <div slot="header" v-if="header">
            <slot name="header"></slot>
        </div>
        <div slot="close" v-if="close">
            <slot name="close"></slot>
        </div>
        <div slot="footer" v-if="footer">
            <slot name="footer"></slot>
        </div>
        <!-- 主体 -->
        <div slot="footer" v-if="edit">
            <Button type="info" @click="cancel()">关闭</Button>
            <Button type="success"  @click="examine">提交审核结果</Button>
        </div>
        <div slot="footer" v-else>
            <Button type="info" @click="cancel()">关闭</Button>
        </div>

        <Form :label-width="110" :model="info" :rules="infoRules" ref="info">
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;margin-bottom:16px;">渔船基本信息</p>
                </Col>
            </Row> 
            <Row>
                <Col span="6">
                    <Form-item label="渔船名称：" prop="shipName">
                      <Input v-model="info.shipName">
                        <Button slot="append"  @click="handleSelectShip()" >查找</Button>
                      </Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船东：" prop="shipOwner">
                        <Input v-model="info.shipOwner"></Input>  
                    </Form-item>
                </Col>              
                <Col span="6">
                    <Form-item label="手机：" >
                        <Input v-model="info.mobilePhone"></Input>  
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="家庭电话：">
                        <Input v-model="info.homePhone"></Input>  
                    </Form-item>
                </Col>
            </Row>     
            <Row>
              <Col span="12">    
                  <Form-item label="基层组织：" prop="cityId">
                      <Input readonly v-model="baseOrgan"></Input>
                      <!-- <Cascader v-model="cascaderValue" :data="cascaderData" change-on-select @on-change="cascaderChange"></Cascader> -->
                  </Form-item>
              </Col> 
              <Col span="6" v-if="false">
                    <Form-item label="报告港口名：" prop="portName">
                      <Input v-model="info.portName">
                        <Button slot="append"  @click="handleSelectPort()" >查找</Button>
                      </Input>  
                        <!-- <Cascader :data="portData" change-on-select style="width:100%"></Cascader> -->
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="出港时间：" prop="chuGangTime">
                        <DatePicker format="yyyy年MM月dd日" type="datetime" v-model="info.chuGangTime" :value="info.chuGangTime"></DatePicker>
                    </Form-item> 
                </Col>
            </Row>  
             
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;margin-bottom:16px;">一、	船舶及安全基本情况</p>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="捕捞许可证：" prop="fishingPermit">
                        <Radio-group v-model="info.fishingPermit" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="北斗终端：" prop="beiDouTermina">
                        <Radio-group v-model="info.beiDouTermina" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="AIS：" prop="aIS">
                        <Radio-group v-model="info.aIS" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="应急部署：" prop="deployment">
                        <Radio-group v-model="info.deployment" type="button">
                            <Radio label="已实施">已实施</Radio>
                            <Radio label="未实施">未实施</Radio>
                        </Radio-group>
                    </Form-item>   
                </Col>
                <Col span="8">               
                    <Form-item label="面对面培训：" prop="training">
                        <Radio-group v-model="info.training" type="button">
                            <Radio label="已实施">已实施</Radio>
                            <Radio label="未实施">未实施</Radio>
                        </Radio-group>
                    </Form-item>   
                </Col>
                <Col span="8">    
                    <Form-item label="救生设配配备：" prop="survivalEquipment">
                        <Radio-group v-model="info.survivalEquipment" type="button">
                            <Radio label="已实施">已实施</Radio>
                            <Radio label="未实施">未实施</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;margin-bottom:16px;">二、作业类型情况</p>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <Form-item label="证载作业类型及辅助方式：" :label-width="180" prop="loadWorkZType">
                        <Col>
                            <!-- <Input v-model="info.loadWorkZType"></Input> -->
                            <Select v-model="info.loadWorkZType" >
                                <Option v-for="item in defaultWorkType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>
                        </Col>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="实际作业类型及辅助方式：" :label-width="180" prop="actualWorkZType">
                        <Col>
                            <!-- <Input v-model="info.actualWorkZType"></Input> -->
                            <Select v-model="info.actualWorkZType" >
                                <Option v-for="item in defaultWorkType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                            </Select>

                        </Col>
                    </Form-item>
                </Col>
            </Row> 
            <Row>
                <Col span=12>
                    <Form-item label="携带渔具数量：" :label-width="180" prop="fishingGearNumber">
                        <Input v-model="info.fishingGearNumber" placeholder="请输入携带渔具数量..."></Input>
                    </Form-item>
                </Col>
                <Col span=12>
                    <Form-item label="实际网目尺寸：" :label-width="180" prop="meshSize">
                        <Input v-model="info.meshSize"  name="mm" placeholder="请输入实际网目尺寸...">
                            <span slot="append">mm</span>
                        </Input>
                    </Form-item>
                </Col>
            </Row>  
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;">三、船员基本情况</p>
                    <p style="text-align:center;font-size:10px;margin-bottom:16px">职务船员</p>
                </Col>
            </Row> 

            <Row :key="index + 100" v-for="(ports,index) in info.positionShipMan">
                <Col span="5">
                    <Form-item :label="ports.personType + ':'">
                        <Input v-model="ports.personName" placeholder="请输入姓名"></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="等级：" icon="star" v-if="ports.sort==1">
                        <div class="select-wrap"> 
                            <Select  v-model="ports.postGrades" :loading="loading" placeholder="请选择等级...">
                                <i-option v-for="item in levels1" :value="item" :key="item">{{ item }}</i-option>
                            </Select> 
                        </div> 
                    </Form-item>
                    <Form-item label="等级：" v-else-if="ports.sort==2">
                        <div class="select-wrap">
                            <Select  v-model="ports.postGrades" :loading="loading"  placeholder="请选择等级...">
                                <i-option v-for="item in levels2" :value="item" :key="item">{{ item }}</i-option>
                            </Select>
                        </div>
                    </Form-item>
                    <Form-item label="等级：" v-else-if="ports.sort==3">                                        
                        <div class="select-wrap">
                            <Select  v-model="ports.postGrades" :loading="loading"  placeholder="请选择等级...">
                                <i-option v-for="item in levels3" :value="item" :key="item">{{ item }}</i-option>
                            </Select>
                        </div>
                    </Form-item> 
                    <Form-item label="等级：" v-else>                                        
                        <div class="select-wrap">
                            <Select  v-model="ports.postGrades" :loading="loading"  placeholder="请选择等级...">
                                <i-option v-for="item in levels4" :value="item" :key="item">{{ item }}</i-option>
                            </Select>
                        </div>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="联系电话：">
                        <Input v-model="ports.phone" placeholder="请输入联系电话"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="身份证号：">
                        <Input v-model="ports.idCard" placeholder="请输入身份证号"></Input>
                    </Form-item>
                </Col> 
                <Col span="2" offset="1" v-if="edit">
                  <div>
                    <Button type="warning" @click="removePositionShipMan(index)" v-show="(ports.personType!='船长'&&ports.personType!='轮机长')">删除</Button>
                  </div>
                </Col>
            </Row>
            <Row v-show="edit">
                <Col span="12">
                    <Form-item>
                        <Button type="info" style="width:100%;margin-left:-50px" @click="handleAdd(1)" icon="plus-round">增加船副</Button>
                    </Form-item>  
                </Col>
                <Col span="12">
                    <Form-item>
                        <Button type="info" style="width:100%;margin-left:-50px" @click="handleAdd(2)" icon="plus-round">增加管轮</Button>
                    </Form-item>
                </Col>
            </Row> 
            
            <p style="text-align:center;font-size:10px;margin-bottom:16px">普通船员</p>
                                                    
            <Row :key="index" v-for="(puTong,index) in info.ordinaryShipMan">
                <Col span="10">
                    <Form-item label="姓名：">
                        <Input v-model="puTong.personName" placeholder="姓名"></Input>
                    </Form-item>
                </Col>
                <Col span="10">
                    <Form-item label="身份证号：">
                        <Input v-model="puTong.idCard" placeholder="身份证号"></Input>
                    </Form-item>
                </Col>
                <Col span="2" offset="2" v-show="edit">
                    <Button type="warning" @click="removeHandleAddPT(index)">删除</Button>
                </Col>
            </Row>
            <Row v-show="edit">
                <Col span="24">
                    <Form-item>
                        <Button type="primary" style="width:100%;margin-left:-50px" @click="handleAddPT()" icon="plus-round">增加普通船员</Button>
                    </Form-item>
                </Col>
            </Row> 
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;">四、检查结果</p>
                    
                </Col>
            </Row>
            <template v-if="edit">
                <div v-if="isGrassRoots">
                    <Row>
                        <Col span="10" offset="2">
                            <Form-item label="核查结果：" prop="grassRoots">
                                <Radio-group v-model="info.grassRoots" type="button">
                                    <Radio label="风险可控">风险可控</Radio>
                                    <Radio label="风险不可控">风险不可控</Radio>
                                </Radio-group>
                            </Form-item> 
                        </Col>
                        <Col span="10" offset="2">
                            <Form-item label="日期：" prop="grassRootsTime">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="info.grassRootsTime" :value="info.grassRootsTime"></DatePicker>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" >
                            <Form-item label="整改方案：">
                                <Input v-model="info.rectificationScheme" type="textarea" :autosize="{minRows: 2,maxRows: 3}"></Input>  
                            </Form-item> 
                        </Col>
                    </Row>
                </div>
                <div v-if="isManagement">
                    <Row>
                        <Col span="10" offset="2">
                            <Form-item label="抽查结果：" prop="management">
                                <Radio-group v-model="info.management" type="button">
                                    <Radio label="风险可控">风险可控</Radio>
                                    <Radio label="风险不可控">风险不可控</Radio>
                                </Radio-group>
                            </Form-item> 
                        </Col>
                        <Col span="10" offset="2">
                            <Form-item label="日期：" prop="managementTime">
                                <DatePicker type="date" format="yyyy-MM-dd" v-model="info.managementTime" :value="info.managementTime"></DatePicker>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24" >
                            <Form-item label="整改方案：">
                                <Input v-model="info.rectificationScheme" type="textarea" :autosize="{minRows: 2,maxRows: 3}"></Input>  
                            </Form-item> 
                        </Col>
                    </Row>
                </div>
                
                
            </template>
            <template v-else>
                <Row v-show="!isEmpty(info.grassRoots)">
                    <Col span="10" offset="2">
                        <Form-item label="基层组织核查：">
                            <Radio-group v-model="info.grassRoots" type="button">
                                <Radio label="风险可控">风险可控</Radio>
                                <Radio label="风险不可控">风险不可控</Radio>
                            </Radio-group>
                        </Form-item> 
                    </Col>
                    <Col span="10" offset="2">
                        <Form-item label="日期：">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="info.grassRootsTime" :value="info.grassRootsTime"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row v-show="!isEmpty(info.management)">
                    <Col span="10" offset="2">
                        <Form-item label="管理部门抽查：">
                            <Radio-group v-model="info.management" type="button">
                                <Radio label="风险可控">风险可控</Radio>
                                <Radio label="风险不可控">风险不可控</Radio>
                            </Radio-group>
                        </Form-item> 
                    </Col>
                    <Col span="10" offset="2">
                        <Form-item label="日期：">
                            <DatePicker type="date" format="yyyy-MM-dd" v-model="info.managementTime" :value="info.managementTime"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="整改方案：">
                            <Input v-model="info.rectificationScheme" type="textarea" :autosize="{minRows: 2,maxRows: 3}"></Input>  
                        </Form-item> 
                    </Col>
                </Row>
            </template>
        </Form>
        
    </Modal>

    <select-ship v-model="status.showShips" :keyParam="nametheShip" @on-selected="selectedShip"></select-ship>
    <select-port v-model="status.showPorts" :keyParam="portName" @on-selected="selectedPort"></select-port>
</div>

</template>

<script>
import selectShip from "@/views/components/selectModal/selectShip.vue";
import selectPort from "@/views/components/selectModal/selectPort.vue";
export default {
  name: "portReportDetail",
  components: {
    selectShip,
    selectPort,
  },
  props: {
    shipName: {
        type: String
    },
    nowDate: {
        type: String
    },
    // default
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
   loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String,
      default:"vertical-center-modal"
    },
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    transitionNames: {
      type: Array,
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    // ------
    id: {
      type: String
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const v_time = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback(new Error("请选择出港时间"));
      } else {
        callback();
      }
    };
    return {
        // default
        baseOrgan: '',
        visible: false,
        // ------
        nametheShip: "",
        portName: "",
        status: {
            isAdd: false,
            showShips: false,
            showPorts: false,
        },

        detail:{
            checkResult:"",
            checkTime:"",
        },
        info: {
            shipName:"",
            shipOwner:"",
            mobilePhone:"",
            homePhone:"",
            portName:"",
            chuGangTime:"",
            management:"",
            managementTime:"",
            grassRoots:"",
            grassRootsTime:"",
        },
        shipOptions: [],
        cascaderData: [],
        cascaderValue: [],
        deptType:"",
        levels1: ["一级船长", "二级船长", "三级船长", "机架长"],
        levels2: ["一级轮机长", "二级轮机长", "三级轮机长"],
        levels3: [
            "一级船长",
            "二级船长",
            "三级船长",
            "一级船副",
            "二级船副",
            "助理船副"
        ],
        levels4: [
            "一级轮机长",
            "二级轮机长",
            "三级轮机长",
            "一级管轮",
            "二级管轮",
            "助理管轮"
        ],
        infoRules:{
            shipName: [{required: true, type: 'string', message: '请输入渔船名', trigger: 'change'}],
            shipOwner: [{required: true, type: 'string', message: '请输入船东', trigger: 'change'}],
            cityId: [{required: true, type: 'string', message: '请选择基层组织', trigger: 'change'}],
            portName: [{required: true, type: 'string', message: '请输入港口名称', trigger: 'change'}],
            chuGangTime: [{required: true,  type: 'date', message: '请选择时间', trigger: 'change'}],
            fishingPermit: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            beiDouTermina: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            aIS: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            deployment: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            training: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            survivalEquipment: [{required: true, type: 'string', message: '请选择必填项', trigger: 'change'}],
            loadWorkZType: [{required: true,  type: 'string', message: '请选择', trigger: 'change'}],
            actualWorkZType: [{required: true,  type: 'string', message: '请选择', trigger: 'change'}],
            fishingGearNumber: [{required: true,  type: 'string', message: '请输入渔具数量', trigger: 'blur'}],
            meshSize: [{required: true,  type: 'string', message: '请输入网目尺寸', trigger: 'blur'}],  
            grassRoots: [{required: true, type: 'string', message: '请选择检查结果', trigger: 'change'}],
            grassRootsTime: [{required: true, type: 'date', message: '请输入检查时间', trigger: 'change'}],
            management: [{required: true, type: 'string', message: '请选择检查结果', trigger: 'change'}],
            managementTime: [{required: true, type: 'date', message: '请输入检查时间', trigger: 'change'}],
        },
    };
  },
  computed: {
    // default
    footer() {
      return this.$slots.footer == undefined ? false : true;
    },
    header() {
      return this.$slots.header == undefined ? false : true;
    },
    close() {
      return this.$slots.close == undefined ? false : true;
    },
    // ------
    isGrassRoots() {
        if(this.isEmpty(this.deptType)){
            return false;
        }
        if(this.deptType == "20"){
            return true;
        } else {
            return false;
        }     
    },
    isManagement() {
        if(this.isEmpty(this.deptType)){
            return false;
        }
        if(this.deptType == "30" || this.deptType == "45" || this.deptType == "70"){
            return true;
        } else {
            return false;
        }     
    },
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    defaultWorkType(){
        var dicTypes = this.$store.getters.getDictList("ship_work_type");
        var workType = [];
        dicTypes.forEach(element => {
            workType.push({
                title:element.title,
                value:element.title,
            })
        });
        
        workType.push({
            title:"辅助船",
            value:"辅助船",
        });
        return workType;
    },
  },
  mounted() {
    this.initOrganization();
    this.defaultDeptType();
    // this.timeFormate();
  },
  methods: {
    ok() {
      this.visible = false;
      if (!this.loading) this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    // ------
    examine(){
        if(typeof this.info.managementTime != 'object'){
            if(this.info.managementTime.indexOf(":")<0) this.info.managementTime = this.info.managementTime + " 00:00:00";
        }
        if(typeof this.info.grassRootsTime != 'object'){
            if(this.info.grassRootsTime.indexOf(":")<0) this.info.grassRootsTime = this.info.grassRootsTime + " 00:00:00";
        }
        this.$refs['info'].validate(valid => {
            if(valid) {
                this.$http
                //请求路径
                    .post("/checks/portreport/check",this.info)
                    // 返回值
                    .then(res => {
                        if (res.success) {
                            this.deptType = res.data.deptType2;
                            this.$Message.info("操作成功");
                            this.ok();
                        } else {
                            this.$Message.info(res.msg);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        })
        
    },
    defaultDeptType(){
      this.$http
        //请求路径
        .get("/$admin/users/"+ this.$store.state.user.userInfo.userId +"/dept")
        // 返回值
        .then(res => {
          if (res.success) {
            this.deptType = res.data.type;
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 指定删除船员
    removeHandleAddPT(index) {
      this.info.ordinaryShipMan.splice(index, 1);
    },
    //指定删除职务船员
    removePositionShipMan(index) {
      this.info.positionShipMan.splice(index, 1);
    },
    /***增加普通船员**/
    handleAddPT() {
      if (this.isEmpty(this.info.ordinaryShipMan)) {
        this.info.ordinaryShipMan = [];
      }
      var entity = {
        personName: "",
        idCard: ""
      };

      this.info.ordinaryShipMan.push(entity);
    },
    handleAdd(index) {
        console.log(this.info);
        var shipMan = this.info.positionShipMan;
        var personType = "";
        var sort = 0;
        if (index == 1) {
            personType = "船副";
            sort = 3;
        }
        if (index == 2) {
            personType = "管轮";
            sort = 4;
        }
        var entity = {
            personType: personType,
            sort: sort
        };
        
            this.info.positionShipMan.push(entity);
        
        
      
    },
    voidMethod() {
      console.log("voidMethod");
    },
    loadShipInfo() {
      console.log("onchange");
    },
    adjustTree(data){
        for(var l in data){
            data[l].label = data[l].name;
            data[l].value = data[l].id;
            data[l].path = data[l].path.replace("/root","");
            if(data[l].children){
                this.adjustTree(data[l].children);
            }
        }
    },
    initOrganization() {
      this.$http
        //请求路径
        .get("/$admin/depts/authtree", {
            params: {
                containOrgan: true,
                type: "includes:5"
            }
        })
        // 返回值
        .then(res => {
            if (res.success) {
                this.adjustTree(res.data);
                this.cascaderData = res.data[0].children;
            } else {
                this.$Message.info(res.msg);
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initShip() {
      var query = {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: ""
        },
        orders: "intfUpdateTime desc"
      };
      this.$http
        //请求路径
        .get("/shiparchives/nybycjb/page", {
          //参数
          params: {
            query: JSON.stringify(query)
          }
        })
        // 返回值
        .then(res => {
          if (res.success) {
            this.shipOptions = res.data.data;
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getById() {
      this.$http
        //请求路径
        .get("/checks/portreport/" + this.id)
        // 返回值
        .then(res => {
          if (res.success) {
            var city = ''
            var county = ''
            var towns = ''
            var village = ''
            if (res.data.city=="" || res.data.city == null || res.data.city == undefined) {
                city = ''
            } else {
                city = res.data.city+'/'
            }
            if (res.data.county=="" || res.data.county == null || res.data.county == undefined) {
                county = ''
            } else {
                county = res.data.county+'/'
            }
            if (res.data.towns=="" || res.data.towns == null || res.data.towns == undefined) {
                towns = ''
            } else {
                towns = res.data.towns+'/'
            }
            if (res.data.village=="" || res.data.village == null || res.data.village == undefined) {
                village = ''
            } else {
                village = res.data.village
            }
            this.baseOrgan = city+county+towns+village
            this.info = res.data;
            // 初始化部分缺失数据  默认数据
            var nowDate = new Date();
            var y = nowDate.getFullYear();
            var m = nowDate.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;  
            var d = nowDate.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var dateStr = y + '-' + m + '-' + d;           
            if(this.isEmpty(this.info.zicha)){
              this.info.zicha = "风险可控";
            }
            this.info.checkMan = this.defaultUserName;
            if (!this.isEmpty(this.info.cityId))
              this.cascaderValue.push(this.info.cityId);
            if (!this.isEmpty(this.info.countyId))
              this.cascaderValue.push(this.info.countyId);
            if (!this.isEmpty(this.info.townsId))
              this.cascaderValue.push(this.info.townsId);
            if (!this.isEmpty(this.info.villageId))
              this.cascaderValue.push(this.info.villageId);
            if (this.isEmpty(this.info.grassRootsTime)){
                this.info.grassRootsTime = dateStr
            }
            if (this.isEmpty(this.info.managementTime)){
                this.info.managementTime = dateStr
            }
            this.$refs["info"].resetFields();
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset() {
        
        this.info = {
            positionShipMan: [],
            ordinaryShipMan: [],
        };
        this.cascaderValue = [];
    },
    initInfo(){
        this.info.positionShipMan.push({
            personType: "船长",
            sort: "1"
        })
        this.info.positionShipMan.push({
            personType: "轮机长",
            sort: "2"
        })
        this.info.ordinaryShipMan = [];
    },
    handleSelectShip(){
        this.nametheShip = this.info.shipName;
        this.status.showShips = true;
    },
    handleSelectPort(){
        this.portName = this.info.portName;
        this.status.showPorts = true;
    },
    selectedShip(entity) {
        this.info.shipName = entity.nametheShip;
        this.info.shipOwner = entity.namevesselOwner;
        this.info.mobilePhone = entity.shipOwnerTelephone;
        this.info.loadWorkZType = entity.workType;

    },
    selectedPort(entity) {
        this.info.portName = entity.portName;
    },
    cascaderChange(value,select){

        if(select.length == 0){
            this.info.city = "";
            this.info.cityId = "";
        }
        if(select.length > 0) {
            this.info.city = select[0].label;
            this.info.cityId = select[0].id;
        }
        if(select.length > 1) {
            this.info.county = select[1].label;
            this.info.countyId = select[1].id;
        }
        if(select.length > 2) {
            this.info.towns = select[2].label;
            this.info.townsId = select[2].id;
        }
        if(select.length > 3) {
            this.info.village = select[3].label;
            this.info.villageId = select[3].id;
        }
        
    },
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
        this.reset();
        if(!this.isEmpty(this.id)){
            this.status.isAdd = false;
            this.getById();
        } else {
            // 初始化数据结构
            this.status.isAdd = true;
            this.initInfo();
            this.$refs["info"].resetFields();
        }
        if(!this.isEmpty(this.shipName)){
            this.info.shipNmae = this.shipName
            this.$set(this.info,'shipName',this.shipName)
        }
        if(!this.isEmpty(this.nowDate)){
            this.info.chuGangTime = this.nowDate
        }
      }
    }
  },
};
</script>
<style scoped>
.margin-left-8 {
  margin-left: 8px;
}
</style>


