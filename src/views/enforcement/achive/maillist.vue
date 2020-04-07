<style lang="less">
@import "../../../styles/commonStyle.less";
@import "../../../styles/common.less";
@import "./components/table.less";
</style>

<template>
  <div>
    <data-table ref="test"
      :withTree="true" :useZtree="false" :treeParams="deptQuery" :treeUrl="'/$admin/depts/custree'" :treeTitle="'组织机构'"
      :url="'/$admin/users/page'" :params="query" :columns="columnList" 
      @on-row-dblclick="showDetail"
      @on-select-change="deptSelect" >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
        <Row>
            <Col span="6">
                <Form-item label="姓名:">
                  <Input v-model="query.wheres.name_like" @on-keydown.enter="initSearch" placeholder="请输入姓名..."/>
                </Form-item>
            </Col>
            <div class="btn-wrap">
              <Checkbox v-model="subDept" @on-change="changeSubDept">区域内</Checkbox>
              <Button  @click="initSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>
        </Row>
        </Form>
      </div>
  </data-table>
    <Modal v-model="showModal" title="详情" width="620" :closable="false">
        <Form ref="userInfo" :model="userInfo"  :label-width="80">
            <Row>
                <Col span="19">
                    <Row>
                        <Col span="12">
                            <FormItem label="真实姓名:" >
                                <Input v-model="userInfo.name" placeholder="请输入姓名..."></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="性别:">
                                <RadioGroup v-model="userInfo.sex" type="button">
                                    <Radio label="1">男</Radio>
                                    <Radio label="0">女</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="12">
                            <FormItem label="登录名:">
                                <Input v-model="userInfo.username" placeholder="请输入姓名..." :readonly="!isNew"></Input>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="手机号:">
                                <Input v-model="userInfo.mobile" placeholder="请输入手机号..."></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Col>
                <Col span="5" style="text-align:center">
                    <img style="width: 90%;max-width: 100px;height: auto;" :src="userPhoto"/>
                </Col>
            </Row>

            <Row>
                <Col span="12">
                    <FormItem label="职位:">
                        <Input v-model="userInfo.position" placeholder="请输入职位..."></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="办公电话:">
                        <Input v-model="userInfo.telephone" placeholder="请输入办公电话..."></Input>
                    </FormItem>
                </Col>
            </Row>
            
            <FormItem label="备注:">
                <Input v-model="userInfo.note" type="textarea" placeholder="请输入备注..."></Input>
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="showModal=false">关闭</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import user from '@/store/module/user.js';
var path=user.state.userInfo.dept.path;
export default {
  name: "SystemUser",
  components: {
    MyUpload
  },
  data() {
    return {
      search: "",
      columnList: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "姓名",
          align: "center",
          key: "name"
        },
        {
          title: "所属部门",
          align: "center",
          key: "deptname"
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime"
        },
        {
          title: "操作",
          key: "action",
          width: 120,
          align: "center",
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
                    this.showDetail(params.row);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
      dataList: [],
      dataTotal: 0,
      query: {
        key: "getPage_mail",
        page: 1,
        size: 10,
        wheres: {
          username: "",
          pathlike: path,
          patheq: "",
          contacteq: "1"
        },
        orders: "name asc,createTime desc"
      },
      userSelection: [],
      userModal: false,
      showModal: false,
      isNew: true,
      userInfo: {
        id: "",
        name: "",
        username: "",
        photo: "",
        password: "",
        sex: "1",
        contact: "",
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
        type: 1,
      },
      subDept: true,
    };
  },
  computed: {
    userPhoto() {
      if (!this.userInfo.photo) return this.$util.avatar;
      return this.$basePath + "/$admin/attachs/stream/" + this.userInfo.photo;
    },

  },
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    selectChange(selection) {
      this.userSelection = selection;
    },
    showDetail(index) {
      this.$http.get("/$admin/users/" + index.id).then(result => {
        if (result.success) {
          this.userInfo = result.data;
          this.showModal = true;
        }
      });
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.wheres.contacteq = "1";
      (this.query.page = 1), (this.query.size = 10), this.initSearch();
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
      this.initSearch();
    },
    deptSelect(node) {
      var _self = this;
      var n = node[0];
      if (_self.subDept) {
        _self.query.wheres.pathlike = n.path;
        _self.query.wheres.patheq = "";
      } else {
        _self.query.wheres.pathlike = "";
        _self.query.wheres.patheq = n.path;
      }
      this.initSearch();
    },

  },
  mounted() {

  }
};
</script>
<style scoped>
</style>


