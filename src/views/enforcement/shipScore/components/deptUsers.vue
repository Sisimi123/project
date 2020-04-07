<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>

<template>
<div>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
        :okText="okText"
        :cancelText="cancelText"
        :loading="loading"
        :styles="styles"
        :class="className"
        :footerHide="footerHide"
        :scrollable="scrollable"
        :transitionNames="transitionNames"
        :transfer="transfer"
        @on-ok="handleOk"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <slot name="close"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>

        <div slot="footer">
          <Button type="info" @click="handleCancel">关闭</Button>
        </div>

        <div>
            <Row>
                <Col span="6" class="height-100" >
                    <Card>
                        <p slot="title">
                            <Icon type="ios-home"></Icon>
                            组织机构
                        </p>
                        <Row>
                            <div class="leftCard">
                                <div class="LeftCardHead">
                                    <Input v-model="treeSearch" icon="ios-search" size="small"></Input>
                                </div>
                                <div class="leftCardContent" >
                                    <Tree ref="deptTree" :data="filterTree" @on-select-change="deptSelect" ></Tree>
                                </div>
                            </div>
                        </Row>
                    </Card>
                </Col>
                <Col span="18" class="padding-left-6">
                    <Card>
                      <Row>
                          <Input v-model="query.wheres.name_like" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                      </Row>
                      <Row class="margin-top-5">
                          <Table ref="userTable" :height="tableHeight" size="small" border :columns="columnList" :data="dataList"></Table>
                      </Row>
                      <Row class="bottom">
                          <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                      </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    </Modal>
</div>
</template>

<script>
import MyUpload from "@/views/components/Upload/MyUpload.vue";
export default {
  name: "deptUsers",
  components: {
    MyUpload
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "详情"
    },
    width: {
      type: [Number, String],
      default: 960
    },
    okText: {
      type: String
    },
    cancelText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String,
      default: ""
      // default:"vertical-center-modal"
    },
    // for instance
    footerHide: {
      type: Boolean,
      default: false
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    transitionNames: {
      type: Array,
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    }
    //-----------------------------------------------
  },
  data() {
    return {
      visible: false,
      search: "",
      treeSearch: "",
      deptTree: [],
      columnList: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center",
          key: "id"
        },
        {
          title: "登录名",
          width: 120,
          align: "center",
          key: "username"
        },
        {
          title: "姓名",
          width: 120,
          align: "center",
          key: "name"
        },
        {
          title: "所属部门",
          align: "center",
          key: "deptname"
        },
        {
          title: "操作",
          key: "action",
          width: 75,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.selectUser(params.row);
                    }
                  }
                },
                "确认"
              )
            ]);
          }
        }
      ],
      dataList: [],
      dataTotal: 0,
      query: {
        key: "getPage_tz",
        page: 1,
        size: 10,
        wheres: {
          username: "",
          pathlike: "/root/330000/331000",
          patheq: "",
          status: "1"
        },
        orders: "name asc,createTime desc"
      },
      userSelection: [],
      userModal: false,
      isNew: true,
      userInfo: {
        id: "",
        name: "",
        username: "",
        photo: "",
        password: "",
        sex: "1",
        status: "",
        position: "",
        mobile: "",
        telephone: "",
        sfz: "",
        note: "",
        dept: {
          id: ""
        }
      },
      ruleValidate: {
        name: [{ required: true, message: "姓名不能为空！", trigger: "blur" }],
        sex: [{ required: true, message: "性别不能为空！", trigger: "blur" }],
        username: [
          { required: true, message: "登录名不能为空！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空！", trigger: "change" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空！", trigger: "change" }
        ]
      },
      deptQuery: {
        key: "getDeptTree_tz",
        wheres: {
          name: "",
          path_like: "/root/330000/331000"
        }
      },
      subDept: true,
      userDeptModal: false,
      userRoleModal: false,
      userRoles: {
        roles: [],
        keys: []
      },
      tableHeight: 325
    };
  },
  computed: {
    defaultUserId() {
      return this.$store.state.user.userInfo.userId;
    },
    filterTree() {
      var tree = this.$util.deepCopy(this.deptTree);
      return this.$util.diguiTree(tree, this.treeSearch);
    },
  },
  methods: {
    ok() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    handleCancel() {
      this.cancel();
    },
    handleOk() {
      this.ok();
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    selectUser(params) {
      if(this.defaultUserId === params.id){
        this.$Message.error("审核人不能为当前用户");
        return;
      }

      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-ok", params);
    },
    handleSearch() {
      this.query.page = 1;
      this.getPageList();
    },
    pageChange(page) {
      this.query.page = page;
      this.getPageList();
    },
    pageSizeChange(size) {
      this.query.size = size;
      this.getPageList();
    },
    changeSubDept(flag) {
      var _self = this;
      if (flag) {
        _self.query.wheres.pathlike = _self.query.wheres.patheq;
        _self.query.wheres.patheq = "";
      } else {
        _self.query.wheres.patheq = _self.query.wheres.pathlike;
        _self.query.wheres.pathlike = "";
      }
      _self.getPageList();
    },
    deptSelect(node) {
      var _self = this;
      var n = node[0];
      if (_self.subDept) {
        _self.query.wheres.pathlike = n.path;
        console.log(_self.query.wheres.pathlike);
        _self.query.wheres.patheq = "";
      } else {
        _self.query.wheres.pathlike = "";
        console.log(_self.query.wheres.pathlike);
        _self.query.wheres.patheq = n.path;
      }
      _self.getPageList();
    },
    getPageList() {
      var _self = this;
      _self.$http
        .get("/$admin/users/page", {
          params: {
            query: JSON.stringify(_self.query)
          }
        })
        .then(function(result) {
          if (result.success) {
            _self.dataList = result.data.data;
            _self.dataTotal = result.data.total;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDeptTree() {
      var _self = this;
      _self.$http
        .get("/$admin/depts/tree", {
          params: {
            query: JSON.stringify(_self.deptQuery)
          }
        })
        .then(function(result) {
          if (result.success) {
            _self.deptTree = result.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.visible = false;
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
        this.getPageList();
        this.getDeptTree();
        // this.handleSearch();
      }
    }
  }
};
</script>
<style scoped>
.bottom {
  padding-top: 10px;
  overflow: hidden;
}
.ivu-page {
  float: right;
}
.leftCardContent {
  height: 300px;
  overflow: auto;
}
</style>


