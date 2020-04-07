<style lang="less">
@import "../styles/achive.less";
</style>
<template>
    <div>
        <data-table ref="test"
            :autoInitTable="false" :url="'/checks/shipsailor/getJzPage'" :params="query" :columns="columns"
            @on-row-dblclick="handleEdit">
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="6">
                        <Form-item label="姓名:">
                            <Input v-model="query.wheres.fidName_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="6">
                        <Form-item label="职务:">
                            <Input v-model="query.wheres.fidDuty_eq" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
        
        <Modal :width="1000" v-model="status.showDetail" title="详情窗口" :scrollable=true :mask-closable="true" :closable="false">
            <Form :label-width="100" :model="info" ref="info">
                <Row>
                    <Col span="12">
                        <Form-item label="姓名:">
                            <Input v-model="info.fidName" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务:">
                            <Input v-model="info.fidDuty" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="属地:">
                            <Input v-model="info.fidHomeplace" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务船员证书号:">
                            <Input v-model="info.fidDutyseafarer" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="证书有效期:" >
                            <Input v-model="info.fidUsedtime" readonly></Input>  
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="职务证书:">
                            <Input v-model="info.fidLetter" readonly></Input>  
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="身份证号码:">
                            <Input v-model="info.fidIdentitycard" readonly></Input>  
                        </Form-item>
                    </Col>         
                    <Col span="12">
                        <Form-item label="证书级别:">
                            <Input v-model="info.fidLevel" readonly></Input>  
                        </Form-item>
                    </Col>           
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="status.showDetail=false">关闭</Button>
            </div>            
        </Modal>
    </div>

</template>
<script>
export default {
  name: "crews",
  data() {
    return {
      status: {
        showDetail: false
      },
      columns: [
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
                    this.toEdit(params.row);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          fidName_like: '',
          fidDuty_eq: '',
        //   XM_like: "",
        //   area_like:"",
        //   ZSZW_MC_eq:"",
        },
        orders: "updateTime desc"
      },
      info: {},
      // ztreeNodeid:{
      //   node:'330900',
      //   childNode:''
      // }
    };
  },
  computed: {},
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleEdit(row,index) {
      this.toEdit(row);
    },
    toEdit(row) {
      this.info = row
      this.status.showDetail = true
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.initSearch();
    },
    initQuery(){
        var query = this.$route.query;
        if(!this.isEmpty(query.areaCode)){
            this.query.wheres.area_like = query.areaCode;
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
  mounted() {
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
