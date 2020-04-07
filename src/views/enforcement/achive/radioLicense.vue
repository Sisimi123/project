<style lang="less">
@import "../styles/achive.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/checks/radiolicense/getPage'" :params="query" :columns="columns"
        @on-row-dblclick="watchMsg">
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
            <Row>
                <Col span="5">
                    <Form-item label="船名:">
                      <Input v-model="query.wheres.shipname"  @on-keydown.enter="initSearch" placeholder="互保凭证号..."></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="电台执照编号:" :label-width="120">
                      <Input v-model="query.wheres.licenseNo" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="所有人:">
                      <Input v-model="query.wheres.owner" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                  <Button @click="exportDetail()" type="success" >导出</Button>
                </div>
            </Row>
            </Form>
        </div>
    </data-table>
    <Modal :width="1000" v-model="status.showDetail" title="详情窗口" :mask-closable="true" :closable="false">
      <Form :label-width="80" :model="info" ref="info">
        <Row>
            <Col span="6">
                <Form-item label="船名:" >
                    <Input v-model="info.shipName" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="MMSI:" >
                    <Input v-model="info.MMSI" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="渔船编码:" >
                    <Input v-model="info.shipNumber" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="船舶类型:" >
                    <Input v-model="info.shipbusinesstype" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="船籍港:" >
                    <Input v-model="info.shipRegistry" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="船舶所有人:" >
                    <Input v-model="info.shipMaster" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="电台执照编号:" >
                    <Input v-model="info.stationLicenseNum" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="证书状态:" >
                    <Input v-model="info.licensebol" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="总吨位:" >
                    <Input v-model="info.shiptotaltonnage" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="发照日期:" >
                    <Input v-model="info.issuingdate" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="主机总功率:" >
                    <Input v-model="info.shipmainpower" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="发照地点:" >
                    <Input v-model="info.issuingplace" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="结束有效期:" >
                    <Input v-model="info.endvalidperiod" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="经办人:" >
                    <Input v-model="info.handling" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="船主地址:" >
                    <Input v-model="info.shipmasteraddress" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="发照机关:" >
                    <Input v-model="info.issuingauth" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="船主电话:" >
                    <Input v-model="info.shipmastertel" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="船长:" >
                    <Input v-model="info.shiplength" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="起始有效期:" >
                    <Input v-model="info.startvalidperiod" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="通过日期:" >
                    <Input v-model="info.passdate" ></Input>  
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
  name: "radioLicense",

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
          width: 70
        },
        {
          key: "shipName",
          title: "船名",
          align: "center",
        },
        {
          key: "mmsi",
          title: "MMSI",
          align: "center",
        },

        {
          key: "shipNumber",
          title: "渔船编码",
          align: "center",
        },
        {
          key: "shipRegistry",
          title: "船籍港",
          align: "center",
        },
        {
          key: "shipMaster",
          title: "船舶所有人",
          align: "center",
        },
        {
          key: "stationLicenseNum",
          title: "电台执照编号",
          align: "center",

        },
        {
          key: "licensebol",
          title: "证书状态",
          align: "center"
        },
        {
          key: "issuingdate",
          title: "发照日期",
          align: "center",
        },
        {
          key: "startvalidperiod",
          title: "起始有效期",
          align: "center",
        },
        {
          key: "endvalidperiod",
          title: "结束有效期",
          align: "center",
        },
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
            shipname: '',
            licenseNo: '',
            owner: ''
        },
        orders: "updateTime desc"
      },
      info: {}
    };
  },
  computed: {},  
  methods: {
    exportDetail() {
      var path = "";
      if (this.query.wheres.shipname!="") {
            path += '&shipname='+this.query.wheres.shipname;
      }
      if (this.query.wheres.licenseNo!="") {
            path += '&licenseNo='+this.query.wheres.licenseNo;
      } 
      if (this.query.wheres.owner!="") {
            path += '&owner='+this.query.wheres.owner;
      } 
      window.open(this.$basePath+"/checks/radiolicense/exportExcel?page=1&size=20"+path);
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    watchMsg(row) {
      this.status.showDetail = true
      this.info = row
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.initSearch();
    }
  },
  mounted() {}
};
</script>

<style scoped>

</style>
