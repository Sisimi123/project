<style lang="less">
@import "../styles/achive.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/checks/crewExamInfo/getPage'" :params="query" :columns="columns"
        @on-row-dblclick="watchMsg">
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
            <Row>
                <Col span="5">
                    <Form-item label="身份证姓名:">
                      <Input v-model="query.wheres.idcardname"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="申请状态:" :label-width="120">
                      <Input v-model="query.wheres.status" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
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
    <Modal :width="1000" v-model="status.showDetail" title="详情窗口" :mask-closable="true" :closable="false">
      <Form :label-width="80" :model="info" ref="info">
        <Row>
            <Col span="6">
                <Form-item label="申请类型:" >
                    <Input v-model="info.applytype" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="报给机构:" >
                    <Input v-model="info.quotebody" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="身份证姓名:" >
                    <Input v-model="info.idcardname" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="证书等级:" >
                    <Input v-model="info.centlev" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="身份证拼音:" >
                    <Input v-model="info.idcardnamepinyin" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="户籍地:" >
                    <Input v-model="info.idcardhradd" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="联系电话:" >
                    <Input v-model="info.tel" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="渔船类型:" >
                    <Input v-model="info.shiptype" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="证书职务:" >
                    <Input v-model="info.centpost" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="申请状态:" >
                    <Input v-model="info.applystatus" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="申请单位:" >
                    <Input v-model="info.issuebody" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="身份证号:" >
                    <Input v-model="info.idcardno" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="民族:" >
                    <Input v-model="info.idcardnation" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="生日:" >
                    <Input v-model="info.idcardbirth" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="申请时间:" >
                    <Input v-model="info.issuedate" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="性别:" >
                    <Input v-model="info.idcardsex" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="6">
                <Form-item label="申办员:" >
                    <Input v-model="info.issueper" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="证书类型:" >
                    <Input v-model="info.centtype" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="联系地址:" >
                    <Input v-model="info.linkaddress" ></Input>  
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="邮编:" >
                    <Input v-model="info.zip" ></Input>  
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
  name: "testLicense",

  data() {
    return {
      status:{
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
          key: "applytype",
          title: "申请类型",
          align: "center",
        },
        {
          key: "idcardname",
          title: "身份证姓名",
          align: "center",
        },

        {
          key: "centpost",
          title: "证书职务",
          align: "center",
        },
        {
          key: "idcardno",
          title: "身份证号",
          align: "center",
        },
        {
          key: "idcardnation",
          title: "民族",
          align: "center",
        },
        {
          key: "idcardsex",
          title: "性别",
          align: "center",

        },
        {
          key: "centlev",
          title: "证书等级",
          align: "center"
        },
        {
          key: "applystatus",
          title: "申请状态",
          align: "center",
        },
        {
          key: "centtype",
          title: "证书类型",
          align: "center",
        },
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
            idcardname: '',
            status: '',
        },
        orders: "updateTime desc"
      },
      info:{}
    };
  },
  computed: {},  
  methods: {
    watchMsg(row) {
      this.status.showDetail = true
      this.info = row
    },
    initSearch() {
      this.$refs.test.initSearch();
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
