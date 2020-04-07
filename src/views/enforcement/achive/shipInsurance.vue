<style lang="less">
@import "../styles/achive.less";
</style>
<template>
  <div>
    <data-table ref="test" 
        :url="'/shiparchives/insurance/page'" :params="query" :columns="columns" 
        @on-row-dblclick="handleEdit">
        <div slot="search">
            <Form :label-width="80" @submit.native.prevent>
            <Row>
                <Col span="5">
                    <Form-item label="凭证号:">
                      <Input v-model="query.wheres.mutuInsuCertNo_like" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="渔船编号:">
                      <Input v-model="query.wheres.fishingCode_like" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="5">
                    <Form-item label="会员名:">
                      <Input v-model="query.wheres.memberName_like" @on-keydown.enter="initSearch"  placeholder="请输入..."></Input>
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
  </div>
  
  </template>
  <script>
  export default {
    name: "shipInsurance",

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
            minWidth: 70
          },
          {
            key: "mutuInsuCertNo",
            title: "互保凭证号",
            align: "center",
            minWidth: 185
          },
          {
            key: "nametheShip",
            title: "船名",
            align: "center",
            minWidth: 120,
            render: (h, params) => {
              return h("span",params.row.nametheShip + params.row.fishingCode);
            }
          },
          {
            key: "memberName",
            title: "会员名",
            align: "center",
            minWidth: 120,
          },
          {
            key: "countyArea",
            title: "县市区",
            align: "center",
            minWidth: 100
          },
          {
            key: "villageCompany",
            title: "村公司",
            align: "center",
            minWidth: 120,
          },
          {
            key: "premiumReceivable",
            title: "应收互保费",
            align: "center",
            minWidth: 120
          },
          {
            key: "underwritingDate",
            title: "核保日期",
            align: "center",
            minWidth: 120,
          },
          {
            key: "isWriteOff",
            title: "是否注销",
            align: "center",
            minWidth: 80,
          },
          {
            title: "操作",
            key: "id",
            align: "center",
            minWidth: 100,
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
                      let argu = { row: params.row };
                      this.$router.push({
                        path: "/enforcement/achive/shipxiangQing",
                        query: argu
                      });
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
            mutuInsuCertNo_like: "",
            mutualInsuranceCategory_eq: "渔船互保"
          },
          orders: "updateTime desc"
        },
        info: {},
        dataList: []
      };
    },
    computed: {},
    methods: {
      initSearch() {
        this.$refs.test.initSearch();
      },
      handleEdit(index) {
        let argu = { row: index };
        this.$router.push({
          path: "/enforcement/achive/shipxiangQing",
          query: argu
        });
      },
      handleReset() {
        for (let key in this.query.wheres) {
          if (key === "mutualInsuranceCategory_eq") {
            continue;
          }
          this.query.wheres[key] = "";
        }
        (this.query.page = 1), (this.query.size = 10), this.initSearch();
      },

    },
    mounted() {
    }
  };
  </script>
  
  <style scoped>
  </style>
  