<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" :autoInitTable="false"
    :url="'/checks/portreport/getPage'" :params="query" :columns="columns" 
    >
    <div slot="search">
        <!-- label-width 长度根据实际情况自行调整 -->
        <Form :label-width="100" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="船东:">
                <Input v-model="query.shipOwner"  placeholder="请输入船东..." />
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="船名:">
                <Input v-model="query.shipName"  placeholder="请输入船名..." />
              </Form-item>
            </Col>
            
            <Col span="4">
              <Form-item label="船东手机:">
                <Input v-model="query.mobilePhone"  placeholder="请输入船东手机..." />
              </Form-item>
            </Col>
            
            <Col span="4">
              <Form-item label="上传起始时间:" :label-width="110">
                  <Date-picker @on-change="gteChange" type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="createTime_gte"></Date-picker>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <div class="func-wrap">
              <Button @click="handleAdd()" type="info" icon="ios-add" v-show="false">新增</Button>
              <Button @click="handleStatistics" type="warning" icon="ios-stats">统计表格</Button>
            </div>

          </Row>
          <Row>
            <Col span="4">
              <Form-item label="所属组织:">
                  <Input v-model="query.organization"  placeholder="请输入组织名..." />
              </Form-item>
            </Col>
            <Col span="4">
              <Form-item label="检查类型:">
                <Select v-model="query.deptType" placeholder="请选择检查类型...">
                  <Option v-for="item in deptType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                </Select>
              </Form-item>
            </Col>
            
            <Col span="4">
              <Form-item label="合格状态:">
                <Select v-model="query.checkStatus" placeholder="请选择合格状态...">
                  <Option v-for="item in checkStatusDic" :value="item.value" :key="item.value">{{ item.title }}</Option>
                </Select>
              </Form-item>
            </Col>
            
            <Col span="4">
              <Form-item label="上传截止时间:" :label-width="110">
                  <Date-picker @on-change="lteChange" type="date" placeholder="请选择日期" format="yyyy-MM-dd"  v-model="createTime_lte"></Date-picker>
              </Form-item>
            </Col>
          </Row>
        </Form>
    </div>
  </data-table>

  <portReportDetail 
    v-model="modal.portReportModal" 
    :id="dataId"
    :edit="modal.edit"
    :title="'详情'"
    :width="'1200'"
    :shipName = getShipName
    :nowDate = getTime
    @on-ok="handleDefault()"
    >
    </portReportDetail>

    <portReportStatistics 
    v-model="modal.statistics" 
    :title="'详情'"
    :width="'1440'"
    @on-ok="handleDefault()"
    @on-cancel="handleDefault()"
    >
    </portReportStatistics>
</div>
</template>

<script>
import portReportDetail from "./components/portReportDetail.vue";
import portReportStatistics from "./components/portReportStatistics.vue";
import user from '../../../store/module/user';
var userType = user.state.userInfo.dept.type;
export default {
  components: {
    portReportDetail,
    portReportStatistics
  },
  data() {
    return {
      checkButtomName: this.$store.getters.getDictName("sea_portreport_buttom", (userType<=20?20:userType<=30?30:userType<=45?45:userType<=70?70:userType>70?70:userType)+""),
      getTime:"",
      getShipName:"",
      createTime_gte:"",
      createTime_lte:"",
      query: {
        page: 1,
        size: 10,
        shipName: "",
        shipOwner: "",
        mobilePhone: "",
        organization: "",
        drafts:"0",
      },
      modal: {
        edit: false,
        portReportCount: false,
        portReportModal: false,
        statistics: false
      },
      status: {
        isLoading: false,
        loading: false
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "船东",
          key: "shipOwner",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("span", params.row.shipOwner)
            ]);
          }
        },
        {
          title: "船名",
          key: "shipName",
          align: "center"
        },
        {
          title: "上传时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            var createTime = params.row.createTime;
            return h("span", createTime.substr(0, 10));
          }
        },
        {
          title: "所属基层组织",
          key: "city",
          align: "center",
          render: (h, params) => {
            var city = params.row.city;
            var county = params.row.county;
            var towns = params.row.towns;
            var village = params.row.village;
            if (!this.isEmpty(village)) {
              if (village == "其他") {
                city = towns + "/" + village;
                return h("span", city);
              } else {
                return h("span", village);
              }
            } else {
              if (!this.isEmpty(towns)) {
                if (towns == "其他" || county == "市本级") {
                  towns = county + "/" + towns;
                  return h("span", towns);
                } else {
                  return h("span", towns);
                }
              } else {
                if (county == "其他" || county == "市本级") {
                  city = city + "/" + county;
                  return h("span", city);
                } else {
                  return h("span", county);
                }
              }
            }
          }
        },
        {
          title: "出港时间",
          key: "chuGangTime",
          align: "center",
          render: (h, params) => {
            var chuGangTime = params.row.chuGangTime;
            var text = "";
            if(chuGangTime) text = chuGangTime.substr(0,chuGangTime.indexOf(" "));
            return h("span", text); /***截取字符串     */
          }
        },
        {
          title: "检查类型",
          key: "deptType",
          align: "center",
          render: (h, params) => {
            return h("span",this.$store.getters.getDictName("sea_portreport_depttype",params.row.deptType));
          }
        },
        {
          title: "检查结果类型",
          key: "level",
          align: "center"
        },
        {
          title: "检查结果描述",
          key: "level",
          align: "center",
          render: (h, params) => {
            var result = null;
            if (!this.isEmpty(params.row.management)) {
              result = params.row.management;
            } else if (!this.isEmpty(params.row.grassRoots)) {
              result = params.row.grassRoots;
            }
            return h("span", result==null||result=="null"?"已自查":result);
          }
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          render: (h, params) => {
            var id = params.row.id;
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.modal.edit = false;
                      this.modal.portReportModal = true;
                      this.dataId = id;
                    }
                  }
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      this.modal.edit = true;
                      this.modal.portReportModal = true;
                      this.dataId = id;
                    }
                  }
                },
                this.checkButtomName
              )
            );
            return h("div", temp);
          }
        }
      ],
      dataId: "",
    };
  },
  computed: {
    checkStatusDic () {
      return [
          {
              value: '风险可控',
              title: '风险可控'
          },
          {
              value: '风险不可控',
              title: '风险不可控'
          },
      ];
    },
    deptType() {
      return this.$store.getters.getDictList("sea_portreport_depttype");
    }
  },
  mounted() {
    if (!this.isEmpty(this.$route.query)) {
        this.initQuery();
    } else {
        this.initSearch();
    }
  },
  // 方法.事件
  methods: {
    gteChange(value,value2){
      this.query.createTime_gte = value;
    },
    lteChange(value,value2){
      // if(!value) {
      //   console.log(1)
      // }
      value = new Date(value)
      value = value.setTime(value.getTime()+59*1000+59*60*1000+15*60*60*1000)
      var newDate = new Date(value)
      var y = newDate.getFullYear();
      var m = newDate.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;  
      var d = newDate.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = newDate.getHours();  
      h=h < 10 ? ('0' + h) : h;  
      var minute = newDate.getMinutes();  
      minute = minute < 10 ? ('0' + minute) : minute;  
      var second=newDate.getSeconds();  
      second=second < 10 ? ('0' + second) : second;
      newDate = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
      this.query.createTime_lte = newDate;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    isEmpty(s) {
        if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
            return true;
        }
        return false;
    },
    handleDefault() {
      this.initSearch();
    },
    handleStatistics() {
      this.modal.statistics = true;
    },
    // 查询重置
    handleReset() {
      for (let key in this.query) {
        this.query[key] = "";
      }
      this.createTime_gte = "";
      this.createTime_lte = ""; 
      this.query.drafts = "0"
      this.initSearch();
    },
    timeFormate() {
        var nowDate = new Date();
        var y = nowDate.getFullYear();
        var m = nowDate.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;  
        var d = nowDate.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = nowDate.getHours();  
        h=h < 10 ? ('0' + h) : h;  
        var minute = nowDate.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        var second=nowDate.getSeconds();  
        second=second < 10 ? ('0' + second) : second;
        this.getTime = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },    
    handleAdd() {
      this.modal.edit = true;
      this.dataId = "";
      this.modal.portReportModal = true;
      // this.timeFormate();
    },
    initQuery(){
      var query = this.$route.query;
      if(!this.isEmpty(query.shipName)){
          this.query.shipName = query.shipName;
          this.getShipName = query.shipName;
      }
      this.initSearch();
    },
  }
};
</script>
