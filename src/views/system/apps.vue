<style lang="less">
@import "../../styles/common.less";
@import "./components/table.less";
</style>

<template>
  <div>
    <div>
      <Row>
        <Col span="24">
          <Card>
            <Row>
              <!-- <Select v-model="query.wheres.type_eq" style="width:100px;" @on-change="handleSearch">
                                <Option value="">全部</Option>
                                <Option v-for="(item,index) in apptype" :value="item.value" :key="'apptype_'+index">{{item.title}}</Option>
              </Select>-->
              <Input
                v-model="query.wheres.title_like"
                icon="ios-search"
                @on-click="handleSearch"
                @on-enter="handleSearch"
                placeholder="请输入查询条件..."
                style="width: 200px"
              />
              <div style="float:right">
                <Button type="info" @click="newAppInfo">新增应用类型</Button>
                <!-- <Button type="primary" @click="editAppInfo">修改应用</Button> -->
              </div>
            </Row>
            <Row class="margin-top-5">
              <!-- <Table ref="appTable" :height="clientHeight-223" size="small" border :columns="columnList" :data="dataList" @on-selection-change="selectChange"></Table> -->
              <MyTreeGrid
                ref="appTable"
                :height="clientHeight-180"
                size="small"
                border
                :columns="columnList"
                :data="dataList"
                @on-selection-change="selectChange"
                expandUrl="/$admin/apps/node"
              ></MyTreeGrid>
            </Row>
            <!-- <Row class="margin-top-5">
                            <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
            </Row>-->
          </Card>
        </Col>
      </Row>
    </div>
    <Modal v-model="appModal.show" :title="'编辑'" :mask-closable="false" width="620">
      <Form ref="appInfo" :model="appModal.appInfo" :rules="ruleValidate" :label-width="80">
        <Row>
          <Col span="12">
            <FormItem label="应用名称:" prop="title">
              <Input v-model="appModal.appInfo.title" placeholder="请输入应用名称..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="应用类型:" prop="type">
              <!-- <Select v-model="appModal.appInfo.type" >
                                <Option v-for="(item,index) in apptype" :value="item.value" :key="'apptype_'+index">{{item.title}}</Option>
              </Select>-->
              <RadioGroup v-model="appModal.appInfo.type" type="button" :disabled="appTypeDisable">
                <Radio label="T" :disabled="appTypeDisable">应用类型</Radio>
                <Radio label="A" :disabled="appTypeDisable">应用</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="状态:" prop="status">
              <RadioGroup v-model="appModal.appInfo.status" type="button">
                <Radio label="1">启用</Radio>
                <Radio label="0">禁用</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
              <FormItem label="排序:" prop="status">
                <InputNumber v-model="appModal.appInfo.sort" placeholder="请输入排序..."></InputNumber>
              </FormItem>
            </Col>
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
              <Col span="12">
            <FormItem label="根部门:" prop="rootName">
              <Input v-model="appModal.appInfo.rootName" placeholder="请选择根部门..." readonly>
                <Button slot="append" @click="areaselectShow=true">选择</Button>
              </Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="模块权限:" prop="withAcl">
              <RadioGroup v-model="appModal.appInfo.withAcl" type="button">
                <Radio label="1">启用</Radio>
                <Radio label="0">禁用</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
          <Col span="12">
            <FormItem label="首页路由:">
              <Input v-model="appModal.appInfo.home" placeholder="请输入首页路由..."></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="登录页路由:">
              <Input v-model="appModal.appInfo.login" placeholder="请输入登录页路由..."></Input>
            </FormItem>
          </Col>
          
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
          <Col span="24">
            <FormItem label="父组件路由:">
              <Input v-model="appModal.appInfo.main" placeholder="父组件路由..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
          <Col span="24">
            <FormItem label="接口地址:">
              <Input v-model="appModal.appInfo.basePath" placeholder="请输入接口地址..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
          <Col span="24">
            <FormItem label="项目地址:">
              <Input v-model="appModal.appInfo.href" placeholder="请输入项目地址..."></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="appModal.appInfo.type=='A'">
          <Col span="24">
            <FormItem label="版权所有:">
              <Input v-model="appModal.appInfo.copyright" placeholder="请输入版权所有..."></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="备注:">
          <Input v-model="appModal.appInfo.note" type="textarea" placeholder="请输入备注..."></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="appModal.show=false">取消</Button>
        <Button type="primary" @click="saveAppInfo">保存</Button>
      </div>
    </Modal>
    <Modal v-model="appSecretModal.show" :title="'编辑'" :mask-closable="false" width="920">
      <template v-if="!appSecretModal.isNew">
        <Row class="margin-top-5">
          <Table
            ref="appSecretTable"
            size="small"
            border
            :columns="appSecretModal.columnList"
            :data="appSecretModal.dataList"
          ></Table>
        </Row>
      </template>
      <template v-else>
        <Form ref="secretInfo" :model="appSecretModal.secretInfo" :label-width="80">
          <Row>
            <Col span="24">
              <FormItem label="密钥类型:" prop="type">
                <Input v-model="appSecretModal.secretInfo.type" placeholder="请输入密钥类型..."></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </template>
      <div slot="footer">
        <Button @click="appSecretModal.show=false" v-if="!appSecretModal.isNew">关闭</Button>
        <Button type="info" @click="newAppSecret" v-if="!appSecretModal.isNew">新增密钥</Button>
        <Button @click="appSecretModal.isNew=false" v-if="appSecretModal.isNew">返回</Button>
        <Button type="info" @click="saveAppSecret" v-if="appSecretModal.isNew">保存密钥</Button>
      </div>
    </Modal>
    <Modal
      v-model="appModuleModal.show"
      :title="'关联模块'"
      :mask-closable="false"
      width="450"
      style="max-height:500px"
    >
      <newZtree ref="appModuleTree" :treeData="appModuleModal.treeData" :withCard="false"></newZtree>
      <div slot="footer">
        <Button @click="appModuleModal.show=false">关闭</Button>
        <Button type="info" @click="saveAppModule">保存</Button>
      </div>
    </Modal>
    <areaselectModal
      v-model="areaselectShow"
      :selectLeaf="false"
      :selectMySelf="false"
      deptTypes="70"
      deptflag="30"
      @on-select-change="selectDept"
    ></areaselectModal>
  </div>
</template>

<script>
import MyTreeGrid from "../components/treeGrid/MyTreeGrid.vue";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import areaselectModal from "@/views/components/workflow/areaselectModal.vue";
import newZtree from "@/views/components/treeGrid/newZtree.vue";
import { isNull, isEmpty } from "../../libs/common";
export default {
  name: "SystemApp",
  components: {
    MyUpload,
    areaselectModal,
    newZtree,
    MyTreeGrid
  },
  data() {
    var _self = this;
    return {
      areaselectShow: false,
      appSelection: [],
      appModal: {
        show: false,
        appInfo: {}
      },
      appSecretModal: {
        show: false,
        isNew: false,
        secretInfo: {
          appId: "",
          type: ""
        },
        columnList: [
          {
            title: "类型",
            align: "left",
            width: 100,
            key: "type"
          },
          {
            title: "appKey",
            align: "left",
            key: "appKey"
          },
          {
            title: "appSecret",
            align: "left",
            key: "appSecret"
          },
          {
            title: "操作",
            width: 160,
            align: "center",
            key: "action",
            render: (h, params) => {
              return h("div", [
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
                      click: () => {
                        this.refreshAppSecret(params.row);
                      }
                    }
                  },
                  "刷新密钥"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.deleteAppSecret(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        dataList: []
      },
      appModuleModal: {
        show: false,
        appId: "",
        treeData: []
      },
      dataTotal: 0,
      query: {
        page: 1,
        size: 10,
        wheres: {
          title_like: ""
        },
        orders: "sort asc,createTime desc"
      },
      ruleValidate: {
        title: [
          { required: true, message: "应用名称不能为空！", trigger: "blur" }
        ],
        rootName: [
          { required: true, message: "部门不能为空！", trigger: "change" }
        ],
        status: [
          { required: true, message: "状态不能为空！", trigger: "change" }
        ],
        sort: [
          { required: true, message: "排序不能为空！", trigger: "change" }
        ]
      },
      columnList: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center",
          key: "id"
        },
        {
          title: "应用名称",
          align: "left",
          key: "title",
          type: "tree"
        },
        {
          title: "应用",
          align: "left",
          width: 100,
          key: "type",
          render: (h, params) => {
            var type = params.row.type;
            if (type == "T") return h("span", "应用类型");
            else if (type == "A") return h("span", "应用");
            return h("span", type);
            // return h("span",_self.$store.getters.getDictName("system_apptype",type))
          }
        },
        {
          title: "根部门",
          align: "left",
          width: 150,
          key: "rootName"
        },
        {
          title: "版权所有",
          align: "left",
          width: 200,
          key: "copyright"
        },
        {
          title: "登录页",
          align: "left",
          width: 200,
          key: "login"
        },
        {
          title: "首页",
          align: "left",
          width: 200,
          key: "home"
        },
        {
          title: "父组件路由",
          align: "main",
          width: 100,
          key: "main"
        },
        {
          title: "状态",
          width: 70,
          align: "left",
          key: "status",
          render: (h, params) => {
            var flag = params.row.status == "1";
            return h("span", flag ? "启用" : "禁用");
          }
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            var buttons = [];

            // h('Button', {
            //     props: {
            //         type: 'info',
            //         size: 'small',
            //     },
            //     style: {
            //         marginRight: '5px'
            //     },
            //     on: {
            //         click: () => {
            //             this.appModule(params);
            //         }
            //     }
            // }, '关联模块'),
            // h('Button', {
            //     props: {
            //         type: 'warning',
            //         size: 'small',
            //     },
            //     style: {
            //         marginRight: '5px'
            //     },
            //     on: {
            //         click: () => {
            //             this.appSecret(params.row.id);
            //         }
            //     }
            // }, "密钥")

            if (params.row.type != "A")
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
                      click: () => {
                        this.newAppInfo(params.row);
                      }
                    }
                  },
                  "新增"
                )
              );

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
                    click: () => {
                      this.editAppInfo(params.row);
                    }
                  }
                },
                "修改"
              )
            );

            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.deleteAppInfo(params.row);
                    }
                  }
                },
                "删除"
              )
            );

            return h("div", buttons);
          }
        }
      ],
      dataList: []
    };
  },
  computed: {
    clientHeight() {
      return this.$store.state.app.clientHeight;
    },
    apptype() {
      return this.$store.getters.getDictList("system_apptype");
    },
    appTypeDisable() {
      return (
        !isEmpty(this.appModal.appInfo.id) ||
        this.appModal.appInfo.parentId == "root"
      );
    }
  },
  methods: {
    pageChange(page) {
      this.query.page = page;
      this.getPageList();
    },
    pageSizeChange(size) {
      this.query.page = 1;
      this.query.size = size;
      this.getPageList();
    },
    handleSearch() {
      this.query.page = 1;
      this.getPageList();
    },
    selectChange(selection) {
      this.appSelection = selection;
    },
    getPageList() {
      var _self = this;
      _self.$http
        .get("/$admin/apps/tree", {
          params: {
            query: JSON.stringify(_self.query)
          }
        })
        .then(function(result) {
          if (result.success) {
            _self.dataList = result.data;
            // _self.dataTotal=result.data.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    newAppInfo(row) {
      this.appModal.appInfo = {
        parentId: isNull(row) || isEmpty(row.id) ? "root" : row.id,
        type: "T"
      };
      this.appModal.show = true;
    },
    editAppInfo(row) {
      var _self = this;
      var id = row.id;
      _self.$http.get("/$admin/apps/" + id).then(function(result) {
        if (result.success) {
          _self.appModal.appInfo = result.data;
          _self.appModal.show = true;
        }
      });
    },
    saveAppInfo() {
      var _self = this;
      _self.$refs["appInfo"].validate(valid => {
        if (valid) {
          if (isEmpty(_self.appModal.appInfo.id)) {
            _self.$http
              .post("/$admin/apps", _self.appModal.appInfo)
              .then(function(result) {
                if (result.success) {
                  _self.appModal.show = false;
                  _self.getPageList();
                }
              });
          } else {
            var id = _self.appModal.appInfo.id;
            _self.$http
              .patch("/$admin/apps/" + id, _self.appModal.appInfo)
              .then(function(result) {
                if (result.success) {
                  _self.appModal.show = false;
                  _self.getPageList();
                }
              });
          }
        }
      });
    },
    deleteAppInfo(row) {
      var _self = this;
      _self.$Modal.confirm({
        title: "提示",
        content: "请确认是否要删除应用？",
        onOk() {
          var id = row.id;
          _self.$http.delete("/$admin/apps/" + id).then(function(result) {
            if (result.success) {
              _self.getPageList();
            }
            _self.$Message.info(result.msg);
          });
        }
      });
    },
    selectDept(nodes, ids, names) {
      this.appModal.appInfo.rootId = ids;
      this.appModal.appInfo.rootName = names;
    },
    appModule(params) {
      var row = params.row;
      this.$http
        .get("/$admin/apps/getAppModule", {
          params: {
            appId: row.id
          }
        })
        .then(res => {
          if (res.success) {
            this.appModuleModal.treeData = res.data;
            this.appModuleModal.appId = row.id;
            this.appModuleModal.show = true;
          }
        });
    },
    saveAppModule() {
      this.$Modal.confirm({
        title: "提示",
        content: "请确认是否变更应用关联的模块？",
        onOk: () => {
          var nodes = this.$refs["appModuleTree"].getCheckedNodes();
          var ids = "";
          nodes.forEach(e => {
            ids += "," + e.id;
          });
          ids = ids.substring(1);
          let params = new URLSearchParams();
          params.append("appId", this.appModuleModal.appId);
          params.append("moduleIds", ids);
          console.log(this.appModuleModalappId, ids);
          this.$http.post("/$admin/apps/saveAppModules", params).then(res => {
            if (res.success) {
              this.appModuleModal.show = false;
            }
            this.$Message.info(res.msg);
          });
        }
      });
    },
    appSecret(appId) {
      this.appSecretModal.secretInfo.appId = appId;
      this.$http
        .get("/$admin/apps/getAppSecrets", {
          params: {
            appId: appId
          }
        })
        .then(res => {
          if (res.success) {
            this.appSecretModal.dataList = res.data;
            this.appSecretModal.show = true;
            this.appSecretModal.isNew = false;
          }
          // this.$Message.info(res.msg);
        });
    },
    newAppSecret() {
      this.appSecretModal.isNew = true;
    },
    saveAppSecret() {
      let params = new URLSearchParams();
      params.append("appId", this.appSecretModal.secretInfo.appId);
      params.append("type", this.appSecretModal.secretInfo.type);
      this.$http.post("/$admin/apps/saveAppSecret", params).then(res => {
        if (res.success) {
          this.appSecret(this.appSecretModal.secretInfo.appId);
        }
        this.$Message.info(res.msg);
      });
    },
    refreshAppSecret(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "请确认是否刷新密钥？",
        onOk: () => {
          let params = new URLSearchParams();
          params.append("id", row.id);
          this.$http.post("/$admin/apps/refreshAppSecret", params).then(res => {
            if (res.success) {
              this.appSecret(row.appId);
            }
            this.$Message.info(res.msg);
          });
        }
      });
    },
    deleteAppSecret(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "请确认是否删除密钥？",
        onOk: () => {
          this.$http
            .delete("/$admin/apps/deleteAppSecret/" + row.id)
            .then(res => {
              if (res.success) {
                this.appSecret(row.appId);
              }
              this.$Message.info(res.msg);
            });
        }
      });
    }
  },
  mounted() {
    this.getPageList();
  }
};
</script>

