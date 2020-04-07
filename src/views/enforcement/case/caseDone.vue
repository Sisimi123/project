<template>
    <div>
        <data-table ref="test" :autoInitTable="false"
            :url="'/enforces/case/page'" :params="query" :columns="columnList" 
            >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="5">
                        <Form-item label="类型:">
                            <Select v-model="query.wheres.me" @on-change="initSearch">
                                <!-- <Option value="0">全部</Option>
                                <Option value="1">个人</Option> -->
                                <Option value="2">全省/市/县</Option>
                                <Option value="0">本部门</Option>
                                <Option value="1">个人</Option>
                                <Option value="4">接收案件</Option>
                                <Option value="3">移交案件</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="查询条件:">
                            <Input v-model="query.wheres.search" placeholder="请输入查询条件..." @on-enter="initSearch"></Input>
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
import { isNull,isEmpty } from "@/libs/common.js";

export default {
  name: "caseDone",
  data() {
    var _self = this;
    return {
      columnList: [
        {
          title: "序号",
          key: "id",
          align: "center",
          width: 67,
          type: "index"
        },
        {
          title: "当事人",
          key: "name",
          width: 190,
          render: function(h, params) {
              var temp=isNull(params.row.name)?params.row.unitName:params.row.name;
					    if(!isNull(params.row.shipname)){
                if("1"==params.row.enforceMain)
                    temp+="("+params.row.shipname+")";
                else
                    temp=params.row.shipname+"("+temp+")";
              }
					    return h("span",temp);
          }
        },
        {
          title: "涉案案由",
          key: "illegalAct",
          sortable: "custom",
          render: function(h, params) {
            var text = params.row.illegalAct;
            var temp = text.length > 28 ? text.substring(0, 28) + "..." : text;
            return h("span", temp);
          }
        },
        {
          title: "案件编号",
          key: "caseNum",
          width: 230,
          sortable: "custom",
          render: function(h, params) {
            var row = params.row;
            var caseNum =
              row.enforceType +
              "〔" +
              row.enforceYear +
              "〕" +
              row.enforceNum +
              "号";
            return h("span", caseNum);
          }
        },
        {
          title: "进度",
          key: "statusDescri",
          width: 130,
          render: function(h, params) {
            var status = params.row.status;
            var descri = "";
            if (status == "0") descri = "草稿";
            else if (status == "1") descri = "案件办理中";
            else if (status == "2") descri = "待结案";
            else if (status == 8) descri = "已结案";
            else if (status == 9) descri = "已移送";
            return h("span", descri);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: function(h, params) {
            var buttons = [];
            var status = params.row.status;
            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: function() {
                      _self.$router.push({
                        path: "/enforcement/case/addCase",
                        query: { view: "9", caseId: params.row.id }
                      });
                    }
                  }
                },
                "查看"
              )
            );

            if (status == "1" && _self.$isOwn(params.row.creatorId))
              buttons.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: function() {
                        _self.$router.push({
                          path: "/enforcement/case/addCase",
                          query: { view: "2", caseId: params.row.id }
                        });
                      }
                    }
                  },
                  "案件办理"
                )
              );

            if (status == "2" && _self.$isOwn(params.row.creatorId))
              buttons.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: function() {
                        _self.$router.push({
                          path: "/enforcement/case/addCase",
                          query: { view: "8", caseId: params.row.id }
                        });
                      }
                    }
                  },
                  "结案"
                )
              );

            if(status=="9")
                buttons.push(h('Button', {
                    props: {
                        type: 'success',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: function() {
                          window.location.href=_self.$basePath+"/enforces/case/transfer/"+params.row.id;
                        }
                    }
                }, '移送导出'));
            return h("div", buttons);
          }
        }
      ],
      query: {
        page: 1,
        size: 20,
        wheres: {
          me: "0",
          search: "",
          status: "8"
        }
      }
    };
  },
  computed: {},
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.search = "";
      this.initSearch();
    },
    isEmpty(s) {
        if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
            return true;
        }
        return false;
    },
    initQuery(){
      var query = this.$route.query;
      if(!this.isEmpty(query.shipName)){
          this.query.wheres.search = query.shipName;
      }
      this.initSearch();
    },
  },
  mounted() {
    if (!this.isEmpty(this.$route.query)) {
        this.initQuery();
    } else {
        this.initSearch();
    }
  }
};
</script>

<style>
</style>
