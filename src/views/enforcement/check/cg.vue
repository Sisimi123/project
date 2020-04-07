<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <Card>
    <Row style="margin-bottom: 5px;" >            
        <Col span="24" >
        <label>检查类型：</label>
        <Select  v-model="query.deptType" style="width:130px"    :loading="status.loading"     placeholder="请选择审查状态...">
            <Option v-for="item in depts" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label>船东：</label>
        <Input v-model="query.shipOwner"  placeholder="请输入船东..." style="width: 150px" ></Input>
        <label>船名：</label>
        <Input v-model="query.shipName"  placeholder="请输入船名..." style="width: 200px"  ></Input>
        <label>手机：</label>
        <Input v-model="query.mobilePhone"  placeholder="请输入手机电话..." style="width: 200px" ></Input>
        <label>基层组织：</label>
        <Input v-model="query.guiShu"  placeholder="请输入基层组织..." style="width: 200px" ></Input>
        </Col>
    </Row>    
    <Row style="margin-bottom: 10px;">
        <Col >
            <label>合格状态：</label>
            <Select  v-model="query.checkStatus" style="width:130px"   :loading="status.loading"   placeholder="请选择合格状态...">
                <Option v-for="item in checkStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <label>上传起始时间：</label>
            <DatePicker  type="date" placeholder="请选择日期" format="yyyy-MM-dd" style="width: 200px"  v-model="query.checkDate_gte"></DatePicker>
            <label>上传截止时间：</label>
            <DatePicker  type="date" placeholder="请选择日期" format="yyyy-MM-dd" style="width: 200px"  v-model="query.checkDate_lte"></DatePicker>
            <Button type="primary"  @click="handleSearch" icon="ios-search">搜索</Button>
            <Button @click="handleReset"   >重置</Button>                                                            
            <Button type="warning">统计</Button>            
        </Col>
    </Row>
    <Row>
        <Table  ref="table"  :height="height" border :columns="columns" :data="dataList" :stripe=true :loading="status.isLoading" :highlight-row=true></Table>
    </Row>
    <Row>
      <div class="bottom">
          <Page show-total :total="totalNum" show-sizer show-elevator  placement=top @on-page-size-change="pageSizeChange" :page-size="query.size"  :current="query.page" @on-change="changePage" ></Page>
      </div>
    </Row>


    <Modal v-model="cgModal" :title="title" :mask-closable="false" width="800" >    
        <h1 style="text-align:center">渔业船舶出渔港报告表</h1>    
        
    </Modal>





  </Card>  
</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
var formLeft = {};
export default {
  data() {
    return {
      depts: [],
      checkStatus: [],
      query: {
        page: 1,
        size: 10,
        wheres: {
          deptType: "",
          shipOwner: "",
          shipName: "",
          mobilePhone: "",
          guiShu: "",
          checkStatus: "",
          checkDate_gte: "",
          checkDate_lte: ""
        },
        orders: "updateTime desc"
      },
      depts: [
        { value: 0, label: "船东自查" },
        { value: 8, label: "乡镇核查" },
        { value: 3, label: "区县抽查" },
        { value: 4, label: "市局抽查" },
        { value: 5, label: "省局检查" }
      ],
      checkStatus: [
        { value: 0, label: "已自查" },
        { value: 1, label: "核查通过" },
        { value: 2, label: "核查不通过" },
        { value: 3, label: "区县抽查通过" },
        { value: 4, label: "区县抽查不通过" },
        { value: 5, label: "市局抽查通过" },
        { value: 6, label: "市局抽查不通过" },
        { value: 7, label: "省局检查通过" },
        { value: 8, label: "省局检查不通过" }
      ],
      title: "",

      infoRules: {
        shipName: [{required: true, message: '请填完整！',  trigger: 'blur'}],
        shipOwner: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        mobilePhone: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        city: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        county: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        portName: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        chuGangTime: [{required: true, type: 'date', message: '请填完整！', trigger: 'blur'}],
        fishingPermit: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        deployment: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        beiDouTermina: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        training: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        aIS: [{required: true,  message: '请填完整！', trigger: 'blur'}], 
        survivalEquipment: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        loadWorkZType: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        actualWorkZType: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        fishingGearNumber: [{required: true,  message: '请填完整！', trigger: 'blur'}],
        meshSize: [{required: true,  message: '请填完整！', trigger: 'blur'}],
      },

      status: {
        isLoading: false,
        loading: false
      },
      dataId: "",
      totalNum: 1,
      height: "450",

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
          render: function(h, params)  {
            return h("div", [
                        h("Icon", {
                            props: {
                                type: "person"
                            }
                        }),
                        h("strong", params.row.shipOwner)
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
          render:function(h, params) {
                var createTime=params.row.createTime;
                 /***截取字符串     */
                return h("span",createTime.substr(0,10) )
          }
        },
        {
          title: "所属基层组织",
          key: "city",
          align: "center",
          render:function(h, params) {
            var city=params.row.city;
            var county=params.row.county;
            var towns=params.row.towns;
            var village=params.row.village;
            if(village!=null){
                if(village=="其他"){
                    city=towns+village;
                    return h("span",city)
                }else{
                    return	heightIsSet("span",village);				          			
                }
            }else{
                if(towns!=null){
                    if(towns=="其他"||county=="市本级"){
                        towns=county+towns;
                        return	h("span",towns);	
                    }else{
                        return	h("span",towns);				          			
                    }
                }else{
                    if(county=="其他"||county=="市本级"){
                        city=city+county;
                        return h("span",city);
                    }else{
                        return h("span",county);
                    }
                }
            }
        } 
        },
        {
          title: "出港时间",
          key: "chuGangTime",
          align: "center",
          render:function(h, params) {
				          		var chuGangTime=params.row.chuGangTime;
				          		return h("span",chuGangTime.substr(0,10)) ;        /***截取字符串     */
				          }
        },
        {
          title: "检查类型",
          key: "deptType",
          align: "center"
        },
        {
          title: "合格状态",
          key: "management",
          align: "center"
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
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {

                    }
                  }
                },
                "抽查"
              )
            );
            return h("div", temp);
          }
        }
      ],

      formLeft: {
        items: []
      },

      dataList: [], //数据集
      showDetailInfo: "" //詳情
    };
  },

  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    },
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    now() {
      return new Date();
    }
  },
  mounted() {
    this.handleSearch();
  },
  // 方法.事件
  methods: {
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }
      this.$http
        //请求路径
        .get("/checks/promisehand/page", {
          //参数
          params: {
            query: JSON.stringify(this.query)
          }
        })
        // 返回值
        .then(res => {
          this.dataList = res.data.data;
          this.totalNum = res.data.total;
          this.status.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // 查询重置
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },

    // 页面条数选择
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },

    // 分页查询
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    }
  }
};
</script>

<style scoped>
.demo-auto-complete-item {
  border-bottom: 1px solid #f6f6f6;
  height: 200px !important;
  width: 100%;
  overflow: scroll;
}
/* .demo-auto-complete-group{
        font-size: 12px;
        width:100%;
        height: 200px !important;
        padding: 4px 6px; 
    } */
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.detail_info_modal {
  font-family: Microsoft YaHei !important;
}
.upload1 {
  position: relative;
  z-index: 10000;
}
.pic1 {
  position: relative;
  z-index: 10001;
}

.detail_info_modal label {
  font-weight: bolder;
  width: 25px;
  height: 40px;
  line-height: 40px;
}
.two {
  margin-left: 15px;
}
.bottom {
  width: 100%;
  height: 45px;
  padding-top: 10px;
  overflow: hidden;
}

.bottom .ivu-page {
  float: right;
}
fieldset.title {
  border: none;
  position: relative;
}
fieldset.title legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 16px;
}
fieldset.title button {
  position: absolute;
  left: 150px;
  top: 0;
}
.event-content {
  margin-top: 10px;
  max-height: 160px;
  overflow: auto;
}

.operate-wrap {
  border-left: 1px solid #eee;
  padding-left: 10px;
  float: right;
  /* display: inline-block;  */
}
.ivu-card-bordered {
  border: none !important;
}
.text-required {
  display: inline-block;
  color: red;
}
.ivu-select-dropdown .ivu-auto-complete {
  max-height: 200px !important;
}
</style>
