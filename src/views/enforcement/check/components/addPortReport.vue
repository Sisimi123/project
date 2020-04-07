<style lang="less">
</style>

<template>
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
        <div slot="footer">
            <Button type="info" @click="cancel()">关闭</Button>
            <Button type="success"  @click="examine">提交审核结果</Button>
        </div>


        <Form :label-width="100" :model="detail" :rules="infoRules" ref="info">
            <Row>
                <Col span="24">
                    <p style="text-align:center;font-size:18px;margin-bottom:16px;">渔船基本信息</p>
                </Col>
            </Row> 
            <Row>
                <Col span="6">
                    <Form-item label="渔船名称：" >
                      <Input v-model="info.shipName"></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="船东：">
                        <Input v-model="info.shipOwner"></Input>  
                    </Form-item>
                </Col>              
                <Col span="6">
                    <Form-item label="手机：">
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
                  <Form-item label="基层组织：">
                      <Cascader v-model="cascaderValue" :data="cascaderData" change-on-select></Cascader>
                  </Form-item>
              </Col> 
              <Col span="6">
                    <Form-item label="报告港口名：">
                        <Input v-model="info.portName"></Input>  
                        <!-- <Cascader :data="portData" change-on-select style="width:100%"></Cascader> -->
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="出港时间：">
                        <DatePicker type="date" format="yyyy-MM-dd" v-model="info.chuGangTime"></DatePicker>
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
                    <Form-item label="捕捞许可证：">
                        <Radio-group v-model="info.fishingPermit" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="北斗终端：">
                        <Radio-group v-model="info.beiDouTermina" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="AIS：">
                        <Radio-group v-model="info.aIS" type="button">
                            <Radio label="有效">有效</Radio>
                            <Radio label="无效">无效</Radio>
                        </Radio-group>
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="应急部署：">
                        <Radio-group v-model="info.deployment" type="button">
                            <Radio label="已实施">已实施</Radio>
                            <Radio label="未实施">未实施</Radio>
                        </Radio-group>
                    </Form-item>   
                </Col>
                <Col span="8">               
                    <Form-item label="面对面培训：">
                        <Radio-group v-model="info.training" type="button">
                            <Radio label="已实施">已实施</Radio>
                            <Radio label="未实施">未实施</Radio>
                        </Radio-group>
                    </Form-item>   
                </Col>
                <Col span="8">    
                    <Form-item label="救生设配配备：">
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
                    <Form-item label="证载作业类型及辅助方式：" :label-width="160" prop="loadWorkZType">
                        <Col>
                            <Input v-model="info.loadWorkZType"></Input>
                            <!-- <Select v-model="info.loadWorkZType" :filterable="true" placeholder="请选择类型">
                                <Option v-for="option in loadWorkZBigs" :value="option" :key="option" :label="option"></Option>
                            </Select> -->
                        </Col>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="实际作业类型及辅助方式：" :label-width="160" prop="actualWorkZType">
                        <Col>
                            <Input v-model="info.actualWorkZType"></Input>
                            <!-- <Select   v-model="info.actualWorkZType">:filterable="true"> placeholder="请选择类型">
                                <i-Option  v-for="option in actualWorkZBigs" :value="option" :key="option" :label="option"></i-Option>
                            </Select> -->
                        </Col>
                    </Form-item>
                </Col>
            </Row> 
            <Row>
                <Col span=12>
                    <Form-item label="携带渔具数量：" :label-width="160">
                        <Input v-model="info.fishingGearNumber" placeholder="请输入携带渔具数量..."></Input>
                    </Form-item>
                </Col>
                <Col span=12>
                    <Form-item label="实际网目尺寸：" :label-width="160">
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
            <Row :key="index" v-for="(ports,index) in info.positionShipMan">
                <Col span="5">
                    <Form-item :label="ports.personType + ':'">
                        <Input v-model="ports.personName" placeholder="请输入姓名"></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="等级：" icon="star" v-if="ports.sort==1">
                        <div class="select-wrap"> 
                            <Select  v-model="ports.postGrades" :loading="loading">placeholder="请选择等级...">
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
                <Col span="2" offset="1" v-show="edit">
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
                <Row>
                    <Col span="10" offset="2">
                        <Form-item label="检查结果：" prop="checkResult">
                            <Radio-group v-model="detail.checkResult" type="button">
                                <Radio label="风险可控">风险可控</Radio>
                                <Radio label="风险不可控">风险不可控</Radio>
                            </Radio-group>
                        </Form-item> 
                    </Col>
                    <Col span="10" offset="2">
                        <Form-item label="日期：" prop="checkTime">
                            <DatePicker type="date" format="yyyy-MM-dd HH:mm" v-model="detail.checkTime"></DatePicker>
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
                            <DatePicker type="date" format="yyyy-MM-dd HH:mm" v-model="info.grassRootsTime"></DatePicker>
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
                            <DatePicker type="date" format="yyyy-MM-dd HH:mm" v-model="info.managementTime"></DatePicker>
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
            
            <!-- <Row>
                <Col span="12">
                    <Form-item label="报告人：">
                            <Input v-model="info.reportMan" placeholder="请输入填报人姓名"></Input>
                    </Form-item>
                </Col>
                <Col span="12">
                    <Form-item label="检查人：">
                        <Input v-model="info.CheckMan" placeholder="请输入检查人姓名"></Input>
                    </Form-item>
                </Col>
            </Row>		        -->
        </Form>
        
    </Modal>
</template>

<script>
export default {
  name: "addPortReport",
  props: {
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
      type: String
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
    return {
        // default
        visible: false,
        // ------
        detail:{
            checkResult:"",
            checkTime:"",
        },
        info: {},
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

            checkTime: [{required: true, type: 'string', message: '请输入检查时间', trigger: 'change'}],
            checkResult: [{required: true, type: 'string', message: '请选择检查结果', trigger: 'change'}],
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
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    searchShip() {
      if (this.shipOptions.length> 0) {
        return this.shipOptions.filter(item => {
          item => {
            item.nametheShip.indexOf(shipName)> -1;
          };
        });
      } else {
        return [];
      }
    }
  },
  mounted() {
    this.initOrganization();
    this.defaultDeptType();
  },
  methods: {
    // default
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
        this.visible = false;
        this.$refs['info'].validate(valid => {
            if(valid) {
                switch (this.deptType) {
                    case 10:
                        this.info.grassRoots = this.detail.checkResult;
                        this.info.grassRootsTime = this.detail.checkTime;
                        break;
                    default:
                        this.info.management = this.detail.checkResult;
                        this.info.managementTime = this.detail.checkTime;
                        break;
                }
                this.$http
                //请求路径
                    .post("/checks/portreport/check",this.info)
                    // 返回值
                    .then(res => {
                        if (res.success) {
                            this.deptType = res.data.type;
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
    initOrganization() {
      this.$http
        //请求路径
        .get("/checks/organization/cascader/" + 330000)
        // 返回值
        .then(res => {
          if (res.success) {
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
    get() {
      this.$http
        //请求路径
        .get("/checks/portreport/" + this.id)
        // 返回值
        .then(res => {
          if (res.success) {
            console.log(res.data);
            this.info = res.data;

            // 初始化部分缺失数据  默认数据
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
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    reset() {
      this.info = [];
      this.cascaderValue = [];
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
        this.reset();
        this.get();
      }
    }
  }
};
</script>
<style scoped>
.margin-left-8 {
  margin-left: 8px;
}
</style>


