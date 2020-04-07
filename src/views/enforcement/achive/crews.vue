<style lang="less">
@import "../styles/achive.less";
</style>
<template>
    <div>
        <data-table ref="test"
            :withTree="useTree" :defaultExpandedKey="areaCodeKey" :useZtree="false" :treeUrl="'/$admin/depts/authtree'" :treeParams="treeQuery" :treeTitle="'所属地区'" 
            :autoInitTable="false" :url="tableUrl" :params="query" :columns="columns"
            @on-select-change="selectTreeChange"
            @on-row-dblclick="handleEdit">
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="6">
                        <Form-item label="类别:"> 
                            <Select @on-change="changeUrl" v-model="dataType">
                                <Option value="0">农业部</Option>
                                <Option value="1">救助系统</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="姓名:">
                            <Input v-model="query.wheres.XM_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="证书职务:">
                            <Input v-model="query.wheres.ZSZW_MC_eq" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                    <Button @click="handleReset()"  >重置</Button>
                    </div>
                </Row>
                </Form>
            </div>
        </data-table>
        
        <Modal :width="800" v-model="status.showDetail" title="详情窗口" :scrollable=true :mask-closable="true" :closable="false">
            <Form :label-width="100" :model="info" ref="info">
                <Row>
                    <Col span="8">
                        <Form-item label="姓名:" >
                            <Input v-model="info.xm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="姓名拼音:" >
                            <Input v-model="info.xmpy" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="出生日期:" >
                            <Input v-model="info.csrq" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="身份证号码:" >
                            <Input v-model="info.sfzhm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="16">
                        <Form-item label="户籍地址:" >
                            <Input v-model="info.hjdz" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="证书类型:" >
                            <Input v-model="info.zslx_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="类别名称:" >
                            <Input v-model="info.lbdm_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书等级:" >
                            <Input v-model="info.zsdj_mc" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="证书种类名称:" >
                            <Input v-model="info.zszldm_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书职务:" >
                            <Input v-model="info.zszw_mc" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="证书号码:" >
                            <Input v-model="info.zshm" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>

                    <Col span="8">
                        <Form-item label="签发官员姓名:" >
                            <Input v-model="info.qfgyxm" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="16">
                        <Form-item label="签发机关名称:" >
                            <Input v-model="info.qfjg_mc" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <Form-item label="签发日期:" >
                            <Input v-model="info.qfrq" ></Input>  
                        </Form-item>
                    </Col>
                    <Col span="8">
                        <Form-item label="截止日期:" >
                            <Input v-model="info.jzrq" ></Input>  
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="status.showDetail=false">关闭</Button>
            </div>            
        </Modal>
        <Modal :width="1000" v-model="status.showDetail_jz" title="详情窗口" :scrollable=true :mask-closable="true" :closable="false">
            <Form :label-width="100" :model="info_jz" ref="info_jz">
                <Row>
                    <Col span="12">
                        <Form-item label="姓名:">
                            <Input v-model="info_jz.fidName" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务:">
                            <Input v-model="info_jz.fidDuty" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="属地:">
                            <Input v-model="info_jz.fidHomeplace" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务船员证书号:">
                            <Input v-model="info_jz.fidDutyseafarer" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="证书有效期:" >
                            <Input v-model="info_jz.fidUsedtime" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务证书:">
                            <Input v-model="info_jz.fidLetter" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="身份证号码:">
                            <Input v-model="info_jz.fidIdentitycard" readonly></Input>  
                        </Form-item>
                    </Col>         
                    <Col span="12">
                        <Form-item label="证书级别:">
                            <Input v-model="info_jz.fidLevel" readonly></Input>  
                        </Form-item>
                    </Col>           
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="status.showDetail_jz=false">关闭</Button>
            </div>            
        </Modal>
    </div>

</template>
<script>
export default {
  name: "crews",
  data() {
    return {
      useTree:true,
      dataType: '0',
      tableUrl:'',
      status: {
        showDetail: false,
        showDetail_jz: false
      },
      columns: [],
      columns_ny: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 80
        },
        {
          key: "xm",
          title: "姓名",
          align: "center",
          minWidth: 100
        },
        // {
        //   key: "xb",
        //   title: "性别",
        //   align: "center",
        //   minWidth: 80,
        //   render: (h, params) => {
        //     if (params.row.xb == "1") {
        //       return h("span", "男");
        //     } else {
        //       return h("span", "女");
        //     }
        //   }
        // },
        {
          key: "sfzhm",
          title: "身份证号码",
          align: "center",
          minWidth: 180
        },
        {
          key: "zszw_mc",
          title: "证书职务",
          align: "center",
          minWidth: 120
        },
        {
          key: "zshm",
          title: "证书号码",
          align: "center",
          minWidth: 180
        },
        {
          key: "city",
          title: "户籍城市",
          align: "center",
          minWidth: 80
        },
        {
          key: "county",
          title: "户籍区县",
          align: "center",
          minWidth: 80
        },
        // {
        //   key: "hjdz",
        //   title: "户籍地址",
        //   align: "center",
        //   minWidth: 240
        // },
        {
          title: "操作",
          key: "lsh",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.toEdit(params.row.lsh);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      columns_jz: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 80
        },
        {
          key: "fidName",
          title: "姓名",
          align: "center",
          minWidth: 100
        },
        {
          key: "fidIdentitycard",
          title: "身份证号码",
          align: "center",
          minWidth: 180
        },
        {
          key: "fidLetter",
          title: "证书职务",
          align: "center",
          minWidth: 120
        },
        {
          key: "fidDutyseafarer",
          title: "证书号码",
          align: "center",
          minWidth: 180
        },
        {
          key: "fidHomeplace",
          title: "属地",
          align: "center",
          minWidth: 80
        },
        {
          key: "fidDutyseafarer",
          title: "职务船员证书号",
          align: "center",
          minWidth: 80
        },
        {
          title: "操作",
          key: "lsh",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.toEdit_jz(params.row);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      treeQuery: {
        containOrgan: false,
        type: "1"
      },
      areaCodeKey:"",
      query: {
        page: 1,
        size: 10,
        wheres: {
          XM_like: "",
          area_like:"",
          ZSZW_MC_eq:"",
        },
        orders: "updateTime desc"
      },
      info: {},
      info_jz: {},
      // ztreeNodeid:{
      //   node:'330900',
      //   childNode:''
      // }
    };
  },
  computed: {},
  methods: {
    changeUrl(value) {
      if (value=="0") {
        this.tableUrl = '/checks/shipsailor/page'
        this.useTree = true
        this.columns = this.columns_ny
      } else if (value=="1") {
        this.tableUrl = '/checks/shipsailor/getJzPage'
        this.columns = this.columns_jz
        this.useTree = false
      }
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleEdit(row,index) {
      this.toEdit(row.lsh);
    },
    toEdit(id) {
      this.$http
        .get("/checks/shipsailor/" + id)
        .then(res => {
          this.info = res.data;
          this.info.csrq = res.data.csrq.substring(0,10)
          this.status.showDetail = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toEdit_jz(row) {
      this.info_jz = row
      this.status.showDetail_jz = true
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.initSearch();
    },
    selectTreeChange(val) {
        this.query.wheres.area_like = val[0].id;
        this.initSearch();
    },
    initQuery(){
        var query = this.$route.query;
        if(!this.isEmpty(query.areaCode)){
            this.query.wheres.area_like = query.areaCode;
            this.areaCodeKey = query.areaCode;
        }

        if(!this.isEmpty(query.workType)){
            this.query.wheres.ZSZW_MC_eq = query.workType;
        }
        this.initSearch();

    },
    isEmpty(s) {
      if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
  },
  created () {
        this.tableUrl = '/checks/shipsailor/page'
        this.columns = this.columns_ny
  },
  watch:{
        tableUrl: {
            deep: true,
            handler: function (newVal,oldVal){
                this.$nextTick(function(){
                    this.tableUrl = newVal
                    this.initSearch();
                })
            }
        },
        columns: {
          deep: true,
            handler: function (newVal,oldVal){
                this.$nextTick(function(){
                    this.columns = newVal
                    this.initSearch();
                })
            }
        }
    },
  mounted() {
    var dept = this.$store.state.user.userInfo.dept;
    var query = this.$route.query;
    query.areaCode = dept.id + "";
    this.areaCodeKey = dept.id + "";
    if (!this.isEmpty(this.$route.query)) {
      this.initQuery();
    } else {
        this.initSearch();
    }
    
    // if(this.$route.query.areaCode == "330900"){
    //   this.ztreeNodeid.childNode = ''
    // }else{
    //   this.ztreeNodeid.childNode = this.$route.query.areaCode
    // }
  }
};
</script>

<style scoped>
</style>
