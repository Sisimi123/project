<style lang="less">
  @import '../styles/achive.less';
</style>
<template>
  <Card>
    <Row>
      <div style="margin-bottom: 10px;">
        <Input v-model="query.wheres.XM_like" icon="ios-search"  style="width:20%" placeholder="请输入船员名..."></Input>
        <Button  @click="handleSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
        <Button  @click="handleReset" type="primary" >重置</Button>
      </div>
    </Row>
    <Row>
        <Table ref="table" @on-row-dblclick="handleEdit" :height="height" border :columns="columns" :data="dataList" :stripe=true :loading="status.isLoading" :highlight-row=true></Table>
    </Row>
    <Row>
      <div class="bottom">
          <Page show-total :total="totalNum" show-sizer 
        placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
        :current="query.page" @on-change="changePage" ></Page>
      </div>
    </Row>

    
    <Modal class="vertical-center-modal" :width="800" v-model="status.showDetail" title="详情窗口" :scrollable=true :mask-closable="true">
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
                        <Input v-model="info.zslx_MC" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="类别名称:" >
                        <Input v-model="info.lbdm_MC" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="证书等级:" >
                        <Input v-model="info.zsdj_MC" ></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="证书种类名称:" >
                        <Input v-model="info.zszldm_MC" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="证书职务:" >
                        <Input v-model="info.zszw_MC" ></Input>  
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
                        <Input v-model="info.qfjg_MC" ></Input>  
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
    </Modal>
  </Card>

</template>
<script>


export default {
  name: "crews",
  data() {
    return {
      status:{
        isLoading: true,
        showDetail: false,
      },
      totalNum:0,
      height:"450",
      columns: [
        {
            type: 'selection',
            width: 60,
            align: 'center',
        },
        {
            title:'序号',
            type: 'index',
            align: 'center',
            width:80,
        },
        {
            key: 'xm',
            title: '姓名',
            align: 'center',
            width:150,
        },
        {
            key: 'xb',
            title: '性别',
            align: 'center',
            width:100,
            render: (h, params) => {
              if(params.row.xb =="1"){
                return h('span', "男");
              } else {
                return h('span', "女");
              }
              // return h('span', this.$store.getters.getDictName("gender",params.row.xb));
            }
        },
        {
            key: 'sfzhm',
            title: '身份证号码',
            align: 'center',
            width:200,
        },
        {
            key: 'zszw_MC',
            title: '证书职务',
            align: 'center',
            width:120,
        },
        {
            key: 'zshm',
            title: '证书号码',
            align: 'center',
            width:200,
        },
        {
            key: 'hjdz',
            title: '户籍地址',
            align: 'center',
        },
        {
            title: "操作",
            key: "lsh",
            align: "center",
            width:100,
            render: (h, params) => {
            return h(
                "Button",
                {
                    props: {
                        type: "info",
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
        }}
      ],
      query: {
        page:1,
        size:10,
        wheres:{
            XM_like: "",
        },
        orders:"updateTime desc"
      },
      info:{},
      dataList: []
    };
  },
  computed: {},
  methods: {
    handleSearch() {
      this.$http
        .get("/checks/shipsailor/page" ,{
          params:{
            query: JSON.stringify(this.query),
          }
        })
        .then(res => {
          console.log(res.data.data);
          this.dataList = res.data.data;
          this.totalNum = res.data.total;
          this.status.isLoading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
        
    },
    handleEdit(index) {
      this.toEdit(index.id);
    },
    toEdit(id){
      this.$http
        .get("/checks/shipsailor/"+ id)
        .then(res => {
          console.log(res.data);
          this.info = res.data;
          this.status.showDetail = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleReset(){
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.page = 1,
      this.query.size = 10,

      this.handleSearch();
    },
    pageSizeChange(size){
      this.query.size=size;
      this.handleSearch();
    },
    changePage(page){
      this.query.page=page;
      this.handleSearch();
    },
  },
  mounted() {
    this.handleSearch();
  }
};
</script>

<style scoped>


</style>
