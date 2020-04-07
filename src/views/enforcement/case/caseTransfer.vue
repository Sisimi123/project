<template>
    <div>
        <data-table ref="test" :url="'/enforces/case/getTransferNumberPage'" :params="query" :columns="columnList" >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
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
        <userselectModal v-model="userselect.show" :selectIds="userselect.selectIds" :deptTypes="userselect.deptTypes" :deptIds="userselect.deptIds" :roleIds="userselect.roleIds"  @on-select-change="userSelectChange"></userselectModal>
    </div>
</template>
<script>
import { isNull } from "@/libs/common.js";
import userselectModal from '@/views/components/workflow/userselectModal.vue'
export default {
  name: "caseDoing",
  components:{
    userselectModal
  },
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
          key: "illegalActText",
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
          title: "移送人数",
          key: "transferNumber",
          width: 130,
        },
        {
          title: "操作",
          key: "action",
          width: 250,
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
            
            if(params.row.handlerFlag=="1"&&params.row.handlerStatus=="0"&&_self.query.wheres.me!='3'){
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
                          _self.caseInfo=params.row;
                          _self.userselect.show=true;
                        }
                    }
                }, '移交'));
              }else if(params.row.handlerFlag=="2"){
                if(_self.query.wheres.me=="4"){
                  if (status == "0")
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
                                query: { view: "1", caseId: params.row.id }
                              });
                            }
                          }
                        },
                        "立案"
                      )
                    );

                  if (status == "1")
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
                  // console.log(params.row);
                  if (status == "2")
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
                }
              }
            return h("div", buttons);
          }
        }
      ],
      query: {
        page: 1,
        size: 20,
        wheres: {
        //   me: "4",
          search: "",
          status: "0,1,2"
        }
      },
      userselect:{
          show:false,
          deptIds:"",
          roleIds:"Enforcer",
          selectIds:"",
          deptTypes:"30,40,44,65"
      },
      caseInfo:undefined
    };
  },
  computed: {},
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.search = '';
      this.initSearch();
    },
    userSelectChange(nodes,ids,names){
      this.$Modal.confirm({
          title:"提示",
          content:"请确认是移送案件？",
          onOk:()=>{
              this.$http.patch("/enforces/case/handedCase",{
                  dataId:this.caseInfo.id,
                  handler:names,
                  handlerId:ids
              }).then((res)=>{
                  if(res.success){
                      this.initSearch();
                  }
                  this.$Message.info(res.msg);
              })
          }
      });
    }
  },
  mounted() {}
};
</script>

<style>
</style>
