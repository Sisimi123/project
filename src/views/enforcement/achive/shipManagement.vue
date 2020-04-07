<style lang="less" scoped>
@import "../styles/achive.less";
.iconlist {
  width: auto;
  height: 400px;
  overflow: auto;
}
.iconlist .img-wrap {
  /* border: 1px solid #eee; */
  border: none;
  position: relative;
  width: 80px;
  height: 80px;
  margin: auto;
  overflow: hidden;
  margin-bottom: 5px;
}
.iconlist .img-wrap span {
  position: absolute;
  transform: rotate(45deg);
  right: -15px;
  width: 50px;
  top: 4px;
  font-size: 10px;
  background-color: #2d8cf0;
  color: #fff;
  text-align: center;
}
.iconlist img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 10px;
}
.icondesc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95px;
  margin: auto;
}
.iconbean {
  float: left;
  width: 12.5%;
  margin: 10px 0px;
  text-align: center;
  box-sizing: border-box;
  background-color: white;
}
.iconbean:hover {
  color: red;
}
</style>
<template>
<div>
  <data-table ref="test"
      :withTree="true" 
      :defaultExpandedKey="areaCodeKey" 
      :useZtree="false" 
      :treeUrl="'/achive/shipinfo/figureTree'" 
      :treeParams="{'_model':{'treeQuery': treeQuery, 'queryModel': query}}" 
      :treeTitle="'组织机构'"
      :autoInitTree="false" 
      :autoInitTable="false" 
      :url="'/achive/shipinfo/page'" 
      :params="query" 
      :columns="columns" 
      @on-select-change="selectTreeChange">
      <div slot="search">
        <Form ref="formValidate" :label-width="80" @submit.native.prevent>
        <Row>
            <Col span="5">
                <Form-item label="渔船名:">
                  <Input v-model="query.wheres.shipname" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="材质:">
                  <Input v-model="query.wheres.shipmate" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="作业类型:">
                  <!-- <Input v-model="query.wheres.worktype" @on-keydown.enter="initSearch" placeholder="请输入..."></Input> -->
                  <Select v-model="query.wheres.worktype">
                    <Option v-for="item in defaultWorkType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                  </Select>
                </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button  @click="initSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
              <Button  @click="handleReset" type="primary" >重置</Button>
            </div>
        </Row>
        <Row>
            <Col span="5">
                <Form-item label="船体长度:">
                  <Select v-model="query.wheres.length" placement="bottom" :transfer="true">
                      <Option value="0">全部</Option>
                      <Option value="1">12米以上</Option>
                      <Option value="2">12米以下</Option>
                  </Select>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="主机功率:">
                  <Select v-model="query.wheres.power" placement="bottom" :transfer="true">
                      <Option value="0">全部</Option>
                      <Option value="1">60马力(44千瓦)以上</Option>
                      <Option value="2">60马力(44千瓦)以下</Option>
                  </Select>
                </Form-item>
            </Col>
        </Row>
        </Form>
      </div>
  </data-table>
  <Modal :width="840" v-model="status.showDetail" :title="titleShipName">
    <div class="iconlist" >
      <div class="iconbean" @click="handleShowItem(1)">
        <div class="img-wrap">
          <span>{{count.cydy}}人</span>
          <img src="../../../images/船员档案.png" >
        </div>
        <div class="icondesc">船员档案</div>
      </div> 
      <div class="iconbean" @click="handleShowItem(6)">
        <div class="img-wrap">
          <span>{{count.insurance}}%</span>
          <img src="../../../images/渔船互保.png" >
        </div>
        <div class="icondesc">渔船互保保单</div>
      </div>
      <div class="iconbean" @click="handleShowItem(7)">
        <div class="img-wrap">
          <span>{{count.crewInsurance}}条</span>
          <img src="../../../images/雇主互保.png" >
        </div>
        <div class="icondesc">雇主互保保单</div>
      </div>
      <div class="iconbean" @click="handleShowItem(8)">
        <div class="img-wrap">
          <span>{{count.shipDuty}}条</span>
          <img src="../../../images/责任书.png" >
        </div>
        <div class="icondesc">渔船责任书</div>
      </div>
      <div class="iconbean" @click="handleShowItem(13)">
        <div class="img-wrap">
          <span>{{count.crewDuty}}条</span>
          <img src="../../../images/船员责任书.png" >
        </div>
        <div class="icondesc">船员责任书</div>
      </div>
      <div class="iconbean" @click="handleShowItem(9)">
        <div class="img-wrap">
          <span>{{count.safecheck}}条</span>
          <img src="../../../images/安全检查记录.png" >
        </div>
        <div class="icondesc">安全检查记录</div>
      </div>
      <div class="iconbean" @click="handleShowItem(10)">
        <div class="img-wrap">
          <span>{{count.annualReview}}条</span>
          <img src="../../../images/年审申请表.png">
        </div>
        <div class="icondesc">年审申请表</div>
      </div>
      <div class="iconbean" @click="handleShowItem(11)">
        <div class="img-wrap">
          <span>{{count.dangerCheck}}条</span>
          <img src="../../../images/渔船隐患自查.png">
        </div>
        <div class="icondesc">渔船隐患自查</div>
      </div>

      <div v-if="isShowPortReport" class="iconbean" @click="handleShowItem(14)">
        <div class="img-wrap">
          <span>{{count.portReport}}条</span>
          <img src="../../../images/出港检查.png">
        </div>
        <div class="icondesc">出港报告</div>
      </div>
      <div class="iconbean" @click="handleShowItem(16)">
        <div class="img-wrap">
          <span>{{count.moveShipReport}}条</span>
          <img src="../../../images/移泊报告.png">
        </div>
        <div class="icondesc">移泊报告</div>
      </div>
      <div class="iconbean" @click="handleShowItem(17)">
        <div class="img-wrap">
          <span>{{count.guardians}}条</span>
          <img src="../../../images/监护人管理.png">
        </div>
        <div class="icondesc">监护人</div>
      </div>
      <div class="iconbean" @click="handleShowItem(18)">
        <div class="img-wrap">
          <span>{{count.drlc}}条</span>
          <img src="../../../images/定人联船.png">
        </div>
        <div class="icondesc">定人联船</div>
      </div>
      <div class="iconbean" @click="handleShowItem(19)">
        <div class="img-wrap">
          <span>{{count.groupShip}}条</span>
          <img src="../../../images/渔船编组.png">
        </div>
        <div class="icondesc">渔船编组</div>
      </div>
      <div class="iconbean" @click="handleShowItem(20)">
        <div class="img-wrap">
          <span>{{count.labor}}条</span>
          <img src="../../../images/渔船编组.png">
        </div>
        <div class="icondesc">船员劳动合同书</div>
      </div>
      <div class="iconbean" @click="handleShowItem(12)">
        <div class="img-wrap">
          <img src="../../../images/当前报位.png">
        </div>
        <div class="icondesc">最后一次报位</div>
      </div>
    </div>
  </Modal>
  <Modal :width="840" v-model="status.showLabor" title="详情" :maskClosable="true">
      <div slot="footer">
          <Button  @click="status.showLabor = false">关闭</Button>
      </div>
      <Row>
      <Col span="24">
        <Row >
          <div style="margin-top:10px">
            <Table :columns="columns_labor" :data="laborData" border :height="280"></Table>
          </div>
        </Row>
      </Col>
      </Row>
  </Modal>
  <Modal v-model="modal.position" title="调位" :maskClosable="true" :width="400">
    <div>
        <Input v-model="treeSearch"  placeholder="请输入..."></Input>
        <Tree @on-select-change="selectTreeChange2" :data="filterTree" style="height:250px;overflow:auto;"></Tree>
    </div>
    <div slot="footer">
      <Button type="primary" @click="startPositon()">确定</Button>
      <Button  @click="modal.position = false">关闭</Button>
    </div>
  </Modal>
  <crewDetail1 :width="'840'" v-model="status.showCrewDetail" :id="selectedRow.id" @on-ok="reloadPoint"></crewDetail1>
  <crewInsurance1 v-model="status.showCrewInsurance" :id="selectedRow.id"  :shipName="selectedRow.shipName" @on-ok="reloadPoint"></crewInsurance1>
  <shipInsurance1 v-model="status.showShipInsurance" :id="selectedRow.id"  @on-ok="reloadPoint"></shipInsurance1>
  <ycjyModal v-model="modal.ycjy" :nametheShip="info.shipname" okText="确定" cancelText="返回"></ycjyModal>
  <ycblxkModal v-model="modal.blxk"  :nametheShip="info.shipname" okText="确定" cancelText="返回" ></ycblxkModal>
  <ycsyqModal  v-model="modal.syq"  :nametheShip="info.shipname" okText="确定" cancelText="返回" ></ycsyqModal>
  <shipDuty1 v-model="status.showShipDuty" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></shipDuty1>
  <crewDuty1 v-model="status.showCrewDuty" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></crewDuty1>
  <nssqbModel1 v-model="status.showNssqbModel" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></nssqbModel1>
  <aqzrsModel1 v-model="status.showAqzrsModel" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></aqzrsModel1>
  <shipPosition v-model="status.showShipPosition" :shipName="titleShipName" @on-ok="reloadPoint"></shipPosition>
</div>
</template>
<script>
import ycjyModal from "../../components/modal-ship/ycjyModal.vue";
import crewDetail1 from '@/views/components/modal/crew/crewDetail1';
import ycblxkModal from "../../components/modal-ship/ycblxkModal.vue";
import ycsyqModal from "../../components/modal-ship/ycsyqModal.vue";
import shipDuty1 from '@/views/components/modal/other/shipDuty1';
import crewDuty1 from '@/views/components/modal/other/crewDuty1';
import nssqbModel1 from '@/views/components/modal/other/nssqbModel1';
import aqzrsModel1 from '@/views/components/modal/other/aqzrsModel1';
import shipInsurance1 from '@/views/components/modal/insurance/shipInsuranceDetail1';
import crewInsurance1 from '@/views/components/modal/insurance/crewInsuranceDetail1';
import shipPosition from '@/views/components/modal/other/shipPosition';


import user from '@/store/module/user.js';
var path = user.state.userInfo.dept.path;
var dept = user.state.userInfo.dept;
export default {
  name: "ships",
  components: {
    crewDuty1,
    shipDuty1,
    ycjyModal,
    crewDetail1,
    ycblxkModal,
    ycsyqModal,
    crewInsurance1,
    nssqbModel1,
    aqzrsModel1,
    shipInsurance1,
    shipPosition
  },
  data() {
    return {
      isShowPortReport: false,
      treeSearch: '',
      defaultExpandedKey:'',
      treeData:[],
      selectTreeId: '',
      noteId: '',
      laborData: [],
      columns_labor: [
          {
              title:'序号',
              type: 'index',
              maxWidth:80,
              align: 'center',
          },
          {
              title:'甲方',
              align:'center',
              key:'jiafang'
          },
            {
              title:'乙方',
              align:'center',
              key:'yifang'
          },
            {
              title:'职务',
              align:'center',
              key:'duty'
          },
            {
              title:'鉴定单位',
              align:'center',
              key:'appraiser'
          },
          {
              title:'签订日期',
              align:'center',
              key:'signingDate'
          },
            {
              title:'操作',
              align:'center',
              width:100,
              render: (h,params) => {
                  var _self = this;
                  return h('div', [
                      h('Button', 
                      {
                          props: {
                              type: "info",
                              size: "small"
                          },
                          style: {
                          },
                          on: {
                              click:()=> {
                                  // this.title="劳务合同";
                                  // this.editWin(params.row)
                                  this.goRounter(params.row)
                              }
                          }
                      }, '劳务合同'),
                  ])
              }
          }
      ],
      modal: {
        ycjy: false,
        syq: false,
        blxk: false,
        position: false
      },
      info: {},
      status: {
        showNssqbModel: false,
        showAqzrsModel:false,
        showCrewDuty:false,
        showShipDuty: false,
        showCrewInsurance: false,
        showCrewDetail: false,
        showShipInsurance: false,
        isLoading: true,
        treeLoading: true,
        showDetail: false,
        showLabor: false,
        showShipPosition:false,
      },
      currNode: "",
      subArea: true,
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 50
        },
        {
          key: "shipname",
          title: "船名",
          align: "center",
          minWidth: 100
        },
       
        {
          key: "owner",
          title: "船东",
          align: "center",
          minWidth: 80
        },
        {
          key: "tel",
          title: "联系电话",
          align: "center",
          minWidth: 100
        },
        {
          key: "shiptype",
          title: "船舶类型",
          align: "center",
          minWidth: 80
        },
        {
          key: "worktype",
          title: "作业类型",
          align: "center",
          minWidth: 80
        },
        {
          key: "workmode",
          title: "作业方式",
          align: "center",
          minWidth: 80
        },
        {
          key: "shipmate",
          title: "材质",
          align: "center",
          minWidth: 50
        },
        {
          key: "power",
          title: "主机功率",
          align: "center",
          minWidth: 65
        },
        {
          key: "length",
          title: "船长",
          align: "center",
          minWidth: 50
        },
        {
          key: "width",
          title: "型宽",
          align: "center",
          minWidth: 50
        },
        {
          key: "depth",
          title: "型深",
          align: "center",
          minWidth: 50
        },
        {
          key: "intfUpdateTime",
          title: "更新时间",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            let intfUpdateTime = params.row.intfUpdateTime;
            let result = "";
            if (intfUpdateTime) {
              let indexOf = intfUpdateTime.indexOf(".");
              if(indexOf>-1){
                result = intfUpdateTime.substring(0, indexOf);
              } else {
                result = intfUpdateTime;
              }
            }
            return h('span', result);
          }
        },
        {
          title: "证书详情",
          key: "id",
          align: "center",
          minWidth: 320,
          render: (h, params) => {
            return h("div",[
                h("Button", {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      margin: "0 5px"
                    },
                    on: {
                      click: () => {
                        this.handleShowDetail(params.row);
                      }
                    }
                  },"详情"),
                h("Button", {
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
                  },"船检"),
                h("Button",{
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
                  },"捕捞许可"),
                h("Button",{
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
                },"所有权"),
                h("Button",{
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    margin: "0 5px"
                  },
                  on: {
                    click: () => {
                      this.openPositopn(params.row);
                    }
                  }
                },"调位")
            ]);
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          deptId:"",
          shipname: "",
          shipmate:"",
          worktype:"",
          length:"",
          power:""
        }
      },
      treeQuery: {
        containOrgan: false,
        type: "2"
      },
      areaCodeKey:'',
      selectedRow: {},
      titleShipName: '',
      count: {
          cydy: '',
          cj: '',
          blxk: ''
      },
    };
  },
  computed: {
    defaultWorkType () {
        var dicTypes = this.$store.getters.getDictList('ship_work_type');
        var workType = [];
        dicTypes.forEach(element => {
            workType.push({
                title: element.title,
                value: element.title
            });
        });
        workType.push({
            title: '辅助船',
            value: '辅助船'
        });
        return workType;
    },
    filterTree () {
        var tree = this.$util.deepCopy(this.treeData);
        return this.$util.diguiTree(tree, this.treeSearch);
    },  
  },
  watch: {
    defaultExpandedKey(val) {
        if(!this.isEmpty(this.treeData)){
            this.expandTree(this.treeData);
        }
    },
  },
  methods: {
    expandTree(treeData){
        for (const key in treeData) {
            if (treeData.hasOwnProperty(key)) {
                const element = treeData[key];
                if(element.id == this.defaultExpandedKey){
                    element.selected = true;
                    return true;
                } else if(!this.isEmpty(element.children) && this.expandTree(element.children)){
                    element.expand = true;
                    return true;
                } else {
                // 未匹配到继续执行
                }
            }
        }
        return false;
    },        
    initTree () {
        var search = {}
        for (const key in this.treeQuery) {
            search[key] = this.treeQuery[key];
        }
        this.$http.get('/$admin/depts/authtree', {
            params: search
            })
            .then(res => {
            if (res.success) {
                this.treeData = res.data;
                if(!this.isEmpty(this.defaultExpandedKey)){
                    this.expandTree(this.treeData);
                }
            }
            })
            .catch(error => {
            console.log(error);
        });
    },
    selectTreeChange2(nodes) {
      this.treeSearch = nodes[0].name
      this.selectTreeId = nodes[0].id
    },
    openPositopn(row) {
      this.noteId = row.id
      this.modal.position = true
      this.initTree()
    },
    startPositon() {
      this.$http.post('/achive/shipinfo/adjustShipDept?id='+this.noteId+'&toDeptId='+this.selectTreeId)
      .then(res=> {
        if (res.success) {
          this.$Message.info('操作成功');
        } else {
          this.$Message.error(res.msg);
        }
        this.modal.position = false
      }).catch(err=> {
        console.log(err)
      })
    },
    reloadPoint () {
        for (let key in this.count) {
            this.count[key] = 0;
        }
        if (this.isEmpty(this.selectedRow.id)) {
            return;
        }
        this.$http
        .get('/standingbook/oneshiponefile/getRelationInfo/' + this.selectedRow.id)
        .then(res => {
            if (res.success) {
                this.count = res.data;
            } else {
                this.$Message.info(res.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    goRounter(row) {
      this.$router.push({
          path: '/enforcement/cooperatebook/laborContract',
          query: {
              shipName:this.selectedRow.shipname,
              jiafang:row.jiafang,
              yifang:row.yifang
          }
      });
    },
    handleShowItem (val) {
      var shipName = '';
      switch (val) {
          case 1:
              this.status.showCrewDetail = true;
              break;
          case 6:
              this.status.showShipInsurance = true;
              break;
          case 7:
              this.status.showCrewInsurance = true;
              break;
          case 8:
              this.status.showShipDuty = true;
              break;
          case 9:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/check/safety',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 10:
              this.status.showNssqbModel = true;
              break;
          case 11:
              this.status.showAqzrsModel = true;
              break;
          case 12:
              this.status.showShipPosition = true;
              break;
          case 13:
              this.status.showCrewDuty = true;
              break;
          case 14:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/check/portreport',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 15:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/case/caseDone',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 16:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/cooperatebook/movereport',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 17:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/check/guardian',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 18:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/cooperatebook/drlc',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 19:
              shipName = this.selectedRow.shipname;
              this.$router.push({
                  path: '/enforcement/cooperatebook/bianzu',
                  query: {
                      shipName: shipName
                  }
              });
              break;
          case 20:
              this.initLaborData(this.selectedRow.shipname)
              this.status.showLabor = true
              break;
          default:
              console.log('error format', val);
              break;
      }
    },
    initLaborData(shipName) {
            this.$http
            .get('/standingbook/labor/getLaborContractByShipName?shipName=' + shipName)
            .then(res => {
                if (res.success) {
                    this.laborData = res.data
                } else {
                    this.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
    reloadPointAndShowDetail () {
        for (let key in this.count) {
            this.count[key] = 0;
        }
        this.$http
        .get('/standingbook/oneshiponefile/getRelationInfo/' + this.selectedRow.id)
        .then(res => {
            if (res.success) {
                this.count = res.data;
                this.status.showDetail = true;
            } else {
                this.$Message.info(res.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    },
    handleShowDetail(index) {
      if (this.$store.state.user.moduleCodes['portreport']) {
        this.isShowPortReport = true
      } else {
        this.isShowPortReport = false
      }
      this.selectedRow = index;
      this.titleShipName = index.shipname;
      this.reloadPointAndShowDetail();
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    selectTreeChange(nodes) {
      var node = nodes[0];
      if(node){
        this.query.wheres.deptId=node.id;
        this.initSearch();
      }
    },
    handleReset(){
      this.$refs["formValidate"].resetFields();
    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.initSearch();
    this.$refs.test.initTree();
  }
};
</script>