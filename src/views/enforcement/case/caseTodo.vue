<template>
    <div>
        <data-table ref="test" 
            :url="'/enforces/wenshou/page'" :params="query" :columns="columnList" 
            >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="5">
                        <Form-item label="状态:">
                            <Select v-model="query.key" @on-change="initSearch" >
                                <Option value="todoWenshouTask">待办审批</Option>
                                <Option value="doingWenshouInstance">在办审批</Option>
                                <Option value="doneWenshouInstance">办结审批</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="查询条件:">
                             <Input v-model="query.wheres.search" placeholder="请输入渔船名..."  @on-enter="initSearch"></Input>
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

        <workflowModal v-model="workflow.show" :taskId="workflow.taskId" :instanceId="workflow.instanceId" :businessKey="workflow.businessKey" :category="workflow.category" @on-complete="initSearch"></workflowModal>
    </div>

     
</template>
<script>
import { isNull } from "@/libs/common.js";

import workflowModal from "@/views/components/workflow/workflowModal.vue";

import { openPageOffice } from "../../../api/laws";

export default {
  name: "caseTodo",
  components: {
    workflowModal
  },
  data() {
    var _self = this;
    return {
      dataList: [],

      query: {
        key: "todoWenshouTask",
        page: 1,
        size: 20,
        wheres: {
          search: ""
        }
      },
      workflow: {
        show: false,
        taskId: "",
        instanceId: "",
        businessKey: "",
        category: ""
      }
    };
  },
  computed: {
    clientHeight() {
      return this.$store.state.app.clientHeight;
    },
    _token() {
      return this.$store.state.user.userInfo.refreshToken;
    },
    columnList() {
      var _self = this;
      var columns = [
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
          title: "文书名称",
          key: "dname"
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
        }
      ];

      if (_self.query.key == "todoWenshouTask")
        columns.push({
          title: "进度",
          key: "taskname",
          width: 130
        });
      if (_self.query.key == "doneWenshouInstance")
        columns.push({
          title: "耗时",
          key: "pduration",
          width: 130
        });

      columns.push({
        title: "操作",
        key: "action",
        width: 250,
        align: "center",
        render: function(h, params) {
          var buttons = [];
          buttons.push(
            h(
              "Button",
              {
                props: {
                  type: "info",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: function() {
                    _self.$router.push({
                      path: "/enforcement/case/addCase",
                      query: { view: "4", caseId: params.row.caseId }
                    });
                  }
                }
              },
              "查看案件"
            )
          );

          buttons.push(
            h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: function() {
                    // _self.openPageOffice({
                    //     type:"wenshou",
                    //     action:"view",
                    //     docType:params.row.dtype,
                    //     wsId:params.row.id
                    // });
                    openPageOffice(_self, {
                      action: "view",
                      caseId: params.row.caseId,
                      type: "wenshou",
                      docType: params.row.dtype,
                      wsId: params.row.id
                    });
                  }
                }
              },
              "查看文书"
            )
          );
          // if(_self.query.key=='todoWenshouTask')
          buttons.push(
            h(
              "Button",
              {
                props: {
                  type: "warning",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: function() {
                    _self.workflow = {
                      show: true,
                      taskId: params.row.taskId,
                      instanceId: params.row.instanceId,
                      businessKey: params.row.id,
                      category: params.row.dtype
                    };
                  }
                }
              },
              _self.query.key == "todoWenshouTask" ? "审批" : "查看流程"
            )
          );
          return h("div", buttons);
        }
      });
      return columns;
    }
  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.search = "";
      this.initSearch();
    },

    // getPageList() {
    //   var _self = this;
    //   _self.$http
    //     .get("/enforces/wenshou/page", {
    //       params: {
    //         query: JSON.stringify(_self.query)
    //       }
    //     })
    //     .then(function(result) {
    //       if (result.success) {
    //         _self.dataList = result.data.data;
    //         _self.dataTotal = result.data.total;
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
    // openPageOffice(params){
    //     var args={
    //         _token:this._token,
    //         params:params
    //     }
    //     if(args.params.docTyp==null)
    //         args.params.docType=this.docType;
    //     args.params.caseId=this.caseId;
    //     if(args.params.wsId==null)
    //         args.params.wsId=this.wsId;
    //     var url=this.$basePath+'/static/pageOffice/index';
    //     // POBrowser.openWindowModeless(url,'width=1250px;height=800px;',JSON.stringify(args));
    //     POBrowser.openWindowModeless(url,'left=0px;top=0px;resizable=no;fullscreen=yes;',JSON.stringify(args));
    // },
  },
  mounted() {
          console.log(this.$store.state.app.orginalSinglePage)
            console.log(this.$store.state.app.searchHeight)
            console.log(this.$store.state.app.bottomHeight)
            console.log(this.$store.state.app.orginalFlexWrap)
  }
};
</script>

<style>
</style>
