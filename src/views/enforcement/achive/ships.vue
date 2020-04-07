<style lang="less">
@import "../styles/achive.less";
</style>
<template>
<div>
  <data-table ref="test" 
      :withTree="true" :defaultExpandedKey="areaCodeKey" :useZtree="false" :treeUrl="treeUrl" :treeParams="treeQuery" :treeTitle="'组织机构'"
      :autoInitTable="false" :url="tableUrl" :params="query" :columns="columns" :autoInitTree="ifInitTree"
      @on-select-change="selectTreeChange">
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
        <Row>
            <Col span="5">
                <Form-item label="渔船名:">
                  <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="材质:">
                  <Input v-model="query.wheres.hullMaterialA_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <!-- <Form-item label="作业类型:">
                  <Input v-model="query.wheres.workType_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                </Form-item> -->
                <Form-item label="作业类型:">
                  <Select v-if="tableUrl=='/shiparchives/normalnyb/getInfoWithRule'" v-model="query.wheres.workType_like">
                    <Option v-for="item in defaultWorkType" :value="item.title" :key="item.value">{{ item.title }}</Option>
                  </Select>
                  <Select v-else-if="'/shiparchives/normaljz/getInfoWithRule'" v-model="query.wheres.workType_like">
                    <Option v-for="item in defaultWorkType2" :value="item.value" :key="item.value">{{ item.title }}</Option>
                  </Select>
                </Form-item>
            </Col>  
            <div class="btn-wrap">
              <Checkbox v-model="subArea" @on-change="changeSubArea">区域内</Checkbox>
              <Button  @click="initSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
              <Button  @click="handleReset" type="primary" >重置</Button>
            </div>
        </Row>
        <Row>
            <Col span="5">
                <Form-item label="船体长度:">
                  <Select v-model="baseQuery.typeLength" @on-change="typeLengthChange" placement="bottom" :transfer="true">
                      <Option value="小型渔船">小型渔船</Option>
                      <Option value="中型渔船">中型渔船</Option>
                      <Option value="大型渔船">大型渔船</Option>
                  </Select>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="主机功率:">
                  <Select v-model="baseQuery.masterPower" @on-change="masterPowerChange" placement="bottom" :transfer="true">
                      <Option value="0">全部</Option>
                      <Option value="3">异常数据</Option>
                      <Option value="1">60马力(44千瓦)以上</Option>
                      <Option value="2">60马力(44千瓦)以下</Option>
                  </Select>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="类别:"> 
                    <Select @on-change="changeUrl" v-model="dataType">
                        <Option value="0">农业部</Option>
                        <Option value="1">救助系统</Option>
                    </Select>
                </Form-item>
            </Col>
        </Row>
        </Form>
      </div>
  </data-table>
  <ycjyModal 
    v-model="modal.ycjy" 
    :nametheShip="info.nametheShip"
    okText="确定"
    cancelText="返回"

    ></ycjyModal>

    <ycblxkModal 
    v-model="modal.blxk" 
    :nametheShip="info.nametheShip"
    okText="确定"
    cancelText="返回"
    ></ycblxkModal>

    <ycsyqModal 
    v-model="modal.syq" 
    :nametheShip="info.nametheShip"
    okText="确定"
    cancelText="返回"
    ></ycsyqModal>
    <Modal
      v-model="seamanModal"
      title="船员列表"
      width="1200"
      class-name="modal"
      :mask-closable="false"
    >
    <Table border :data="seamanData" :columns="seamanColumns"></Table>
      <!-- <div slot="footer">
        <Button @click="seamanCancel()">取消</Button>
        <Button type="primary" @click="seamanSure()" style="margin-left: 8px">确定</Button>
      </div> -->
    </Modal>
    <bootRecord ref="bootRecord" :getShipid="shipid"></bootRecord>
</div>
</template>
<script>
import ycjyModal from "../../components/modal-ship/ycjyModal.vue";
import ycblxkModal from "../../components/modal-ship/ycblxkModal.vue";
import ycsyqModal from "../../components/modal-ship/ycsyqModal.vue";
import bootRecord from './components/bootRecord'
export default {
  name: "ships",
  data() {
    const info1 = (h, params) => {
      return h(
        "Button",
        {
          props: {
            type: "info",
            size: "small"
          },
          style: {
            margin: "0 5px"
          },
          on: {
            click: () => {
              this.info = params.row;
              this.modal.ycjy = true;
            }
          }
        },
        "船检"
      );
    };
    const info2 = (h, params) => {
      return h(
        "Button",
        {
          props: {
            type: "success",
            size: "small"
          },
          style: {
            margin: "0 5px"
          },
          on: {
            click: () => {
              this.info = params.row;
              this.modal.blxk = true;
            }
          }
        },
        "捕捞许可"
      );
    };
    const info3 = (h, params) => {
      return h(
        "Button",
        {
          props: {
            type: "warning",
            size: "small"
          },
          style: {
            margin: "0 5px"
          },
          on: {
            click: () => {
              this.info = params.row;
              this.modal.syq = true;
            }
          }
        },
        "所有权"
      );
    };
    const info4 = (h, params) => {
      return h(
        "Button",
        {
          props: {
            type: "info",
            size: "small"
          },
          style: {
            margin: "0 5px"
          },
          on: {
            click: () => {
              this.seamanModal = true
              this.seamanData = params.row.seaman
            }
          }
        },
        "船员"
      );
    };
    const info5 = (h, params) => {
      return h(
        "Button",
        {
          props: {
            type: "primary",
            size: "small"
          },
          style: {
            margin: "0 5px"
          },
          on: {
            click: () => {
              this.bootRecord(params.row)
            }
          }
        },
        "渔船开机记录"
      );
    };
    return {
      seamanModal:false,
      ifInitTree: true,
      treeUrl: '',
      tableUrl: '',
      dataType: '1',
      shipid:'',
      modal: {
        ycjy: false,
        syq: false,
        blxk: false
      },
      info: {},
      status: {
        isLoading: true,
        treeLoading: true
      },
      currNode: "",
      subArea: true,
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 65
        },
        {
          key: "nametheShip",
          title: "船名",
          align: "center",
          minWidth: 120
        },
        {
          key: "material",
          title: "材质",
          align: "center",
          minWidth: 100
        },
        {
          key: "namevesselOwner",
          title: "所有人",
          align: "center",
          minWidth: 120
        },
        {
          key: "shipOwnerTelephone",
          title: "所有人电话",
          align: "center",
          minWidth: 120
        },
        {
          key: "power",
          title: "主机功率",
          align: "center",
          minWidth: 100
        },
        {
          key: "typeLength",
          title: "船体长度",
          align: "center",
          minWidth: 100
        },
        {
          key: "workType",
          title: "作业类型",
          align: "center",
          minWidth: 100,
          render: (h,params) => {
            var str = ''
            if (this.tableUrl=="/shiparchives/normalnyb/getInfoWithRule") {
              str =  params.row.workType
            } else if (this.tableUrl=="/shiparchives/normaljz/getInfoWithRule") {
              for (let i = 0; i < this.defaultWorkType2.length; i++) {
                if (params.row.workType == this.defaultWorkType2[i].value) {
                  str = this.defaultWorkType2[i].title
                  break
                }
              }
            }
            return h('span',str)
          }
        },
        {
          title: "证书详情",
          key: "id",
          align: "center",
          minWidth: 380,
          render: (h, params) => {
            let children = [];
            if(this.dataType == '1'){
              children.push(info5(h, params))
            }
            children.push(info1(h, params));
            children.push(info2(h, params));
            children.push(info3(h, params));
            if(params.row.seaman && params.row.seaman.length>0){
              children.push(info4(h, params))
            }
            return h("div", children);
          }
        }
      ],
      seamanColumns:[
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 65
        },
        {
          title: "姓名",
          key: "fidName",
          align: "center",
          width: 80
        },
        {
          title: "职务",
          key: "fidDuty",
          align: "center",
          width: 90
        },
        {
          title: "身份证号码",
          key: "fidIdentitycard",
          align: "center",
          width: 160
        },
        {
          title: "属地",
          key: "fidHomeplace",
          align: "center",
        },
        {
          title: "职务船员证书号",
          key: "fidDutyseafarer",
          align: "center",
          width: 130
        },
        {
          title: "职务船员证书有效期",
          key: "fidUsedtime",
          align: "center",
          width: 150,
          render:(h,params) => {
            let fidUsedtime = params.row.fidUsedtime
            if(fidUsedtime){
              fidUsedtime = fidUsedtime.substring(0,fidUsedtime.indexOf(" "))
            }
            return h("span", fidUsedtime)
          }
        },
        // {
        //   title: "所属市区",
        //   key: "fidIsoutcity",
        //   align: "center",
        // },
        {
          title: "职务证书",
          key: "fidLetter",
          align: "center",
          width: 90
        },
        {
          title: "证书级别",
          key: "fidLevel",
          align: "center",
          width: 90
        },
      ],
      seamanData:[],
      query: {
        page: 1,
        size: 10,
        wheres: {
          codefishingArea_eq:"",
          codefishingArea_in:"",
          nametheShip_like: "",
          hullMaterialA_like:"",
          workType_like:"",
          typeLength_gte:"",
          typeLength_lte:"",
          masterPower_gte:"",
          masterPower_lte:"",
          masterPower_yc:"",
        },
        orders: "intfUpdateTime desc"
      },
      baseQuery: {
        typeLength:"",
        masterPower:"",
      },
      treeQuery: {
        organid:'',
        containOrgan: false,
        type: "1"
      },
      areaCodeKey:''
    };
  },
  components: {
    ycjyModal,
    ycblxkModal,
    ycsyqModal,
    bootRecord
  },
  computed: {
    defaultWorkType () {
      var dicTypes = this.$store.getters.getDictList('ship_work_type');
      var workType = [];
      dicTypes.forEach(element => {
          workType.push({
              title: element.title,
              value: element.value
          });
      });
      // workType.push({
      //     title: '辅助船',
      //     value: '辅助船'
      // });
      return workType;
    },
    defaultWorkType2 () {
      var dicTypes = this.$store.getters.getDictList('sea_map_shipinfo_worktype');
      var workType = [];
      dicTypes.forEach(element => {
          workType.push({
              title: element.title,
              value: element.value
          });
      });
      return workType;
    }
  },
  watch: {
    tableUrl: {
      deep: true,
      handler: function (newVal,oldVal){
          this.$nextTick(function(){
              this.tableUrl = newVal
              this.initSearch();
          })
      }
    },
    treeUrl: {
      deep: true,
      handler: function (newVal,oldVal){
          this.$nextTick(function(){
              this.treeUrl = newVal
          })
      }
    },
    treeQuery: {
      deep: true,
      handler: function (newVal,oldVal){
          this.$nextTick(function(){
              this.treeQuery = newVal
          })
      },
    }
  },
  created(){
    // this.tableUrl = '/shiparchives/normalnyb/getInfoWithRule'
    // this.treeUrl = '/$admin/depts/authtree'
    this.tableUrl = '/shiparchives/normaljz/getInfoWithRule'
    this.treeUrl = '/shiparchives/normaljz/getTree'
    this.query.organid = ''
    // if (!this.isEmpty(this.$route.query)) {
    //   this.ifInitTree = false
    // }
  },
  methods: {
    bootRecord(row){
      this.shipid = row.id
      this.$refs.bootRecord.init()
    },
    changeUrl(value) {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      if (value=="0") {
        this.tableUrl = '/shiparchives/normalnyb/getInfoWithRule'
        this.treeUrl = '/$admin/depts/authtree'
        var dept = this.$store.state.user.userInfo.dept;
        var query = this.$route.query;
        query.areaCode = dept.id + "";
        this.areaCodeKey = dept.id + "";
        this.query.wheres.codefishingArea_in = dept.id + "";
      } else if (value=="1") {
        this.tableUrl = '/shiparchives/normaljz/getInfoWithRule'
        this.treeUrl = '/shiparchives/normaljz/getTree'
        var dept = this.$store.state.user.userInfo.dept;
        var query = this.$route.query;
        query.areaCode = dept.organid + "";
        this.areaCodeKey = dept.organid + "";
      }
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    addArea() {
      if (this.subArea){
        this.query.wheres.codefishingArea_in = this.currNode.id;
        this.query.wheres.codefishingArea_eq = "";
      } else {
        this.query.wheres.codefishingArea_in = "";
        this.query.wheres.codefishingArea_eq = this.currNode.id;
      }
      
      // var areas = [];
      // if (this.currNode == "") {
      //   this.query.wheres.codefishingArea_in = [];
      //   return;
      // } else {
      //   areas.push(this.currNode.id);
      //   if (this.subArea && !this.$util.isNull(this.currNode.children)) {
      //     this.currNode.children.forEach(element1 => {
      //       areas.push(element1.id);

      //       // 子查询
      //       if (this.subArea && !this.$util.isNull(element1.children)) {
      //         element1.children.forEach(element2 => {
      //           areas.push(element2.id);

      //           // 子查询
      //           if (this.subArea && !this.$util.isNull(element2.children)) {
      //             element2.children.forEach(element3 => {
      //               areas.push(element3.id);
      //             });
      //           }
      //         });
      //       }
      //     });
      //   }
      // }
      // this.query.wheres.codefishingArea_in = areas;
    },
    changeSubArea(flag) {
      this.addArea();
      this.initSearch();
    },
    selectTreeChange(nodes) {
      this.currNode = nodes[0];
      this.addArea();
      this.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.baseQuery.masterPower = ""
      this.baseQuery.typeLength = ""
      this.initSearch();
    },
    typeLengthChange(val) {
      if(val == "中型渔船"){
        this.query.wheres.typeLength_gte = "12";
        this.query.wheres.typeLength_lte = "40";
      } else if(val == "大型渔船") {
        this.query.wheres.typeLength_gte = "40";
        this.query.wheres.typeLength_lte = "";
      } else {
        this.query.wheres.typeLength_gte = "";
        this.query.wheres.typeLength_lte = "12";
      }
      this.initSearch();
    },
    masterPowerChange(val) {
      if(val == "1"){
        this.query.wheres.masterPower_gte = "44";
        this.query.wheres.masterPower_lte = "";
        this.query.wheres.masterPower_yc="";
      } else if(val == "2") {
        this.query.wheres.masterPower_gte = "";
        this.query.wheres.masterPower_lte = "44";
        this.query.wheres.masterPower_yc="";
      }else if(val == "3") {
        this.query.wheres.masterPower_gte = "";
        this.query.wheres.masterPower_lte = "";
        this.query.wheres.masterPower_yc="1";
      }else {
        this.query.wheres.masterPower_gte = "";
        this.query.wheres.masterPower_lte = "";
        this.query.wheres.masterPower_yc="";
      }
      this.initSearch();
    },
    initQuery(){
      var query = this.$route.query;
      if(!this.isEmpty(query.areaCode)){
          this.query.wheres.codefishingArea_in = query.areaCode
          this.treeQuery.organid = query.areaCode
      }
      if(!this.isEmpty(query.hullMaterialA)){
          this.query.wheres.hullMaterialA_like = query.hullMaterialA;
      }
      if(!this.isEmpty(query.workType)){
        var str = ''
        for (let i = 0; i < this.defaultWorkType2.length; i++) {
          if (query.workType == this.defaultWorkType2[i].title) {
            str = this.defaultWorkType2[i].value
            break
          }
        }
        this.query.wheres.workType_like = str;
      }

      if(!this.isEmpty(query.masterPower_gte)){
          this.query.wheres.masterPower_gte = query.masterPower_gte;
          this.baseQuery.masterPower = "1";
      }
      if(!this.isEmpty(query.masterPower_lte)){
          this.query.wheres.masterPower_lte = query.masterPower_lte;
          this.baseQuery.masterPower = "2";
      }
      if(!this.isEmpty(query.masterPower_yc)){
          this.query.wheres.masterPower_yc = query.masterPower_yc;
          this.baseQuery.masterPower = "3";
      }


      if(!this.isEmpty(query.typeLength_gte)){
          this.query.wheres.typeLength_gte = query.typeLength_gte;
          this.baseQuery.typeLength = query.typeLength;
      }
      if(!this.isEmpty(query.typeLength_lte)){
          this.query.wheres.typeLength_lte = query.typeLength_lte;
          this.baseQuery.typeLength = query.typeLength;
      }

      if(!this.isEmpty(query.areaCode)){
          this.query.wheres.codefishingArea_in = query.areaCode;
          this.areaCodeKey = query.areaCode 
      }
      this.initSearch();
      
    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    seamanCancel(){

    },
    seamanSure(){

    }
  },
  mounted() {
    var dept = this.$store.state.user.userInfo.dept;
    var query = this.$route.query;
    query.areaCode = dept.organid + "";
    this.areaCodeKey = dept.organid + "";
    if (!this.isEmpty(this.$route.query)) {
      this.initQuery();
    } else {
      this.initSearch();
    }
  }
};
</script>

<style scoped>
</style>
