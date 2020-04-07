<style lang="less" scoped>
@import "../../styles/common.less";
</style>  
    <template>
  <div>
    <Row>
      <Col span="4">
        <Card class="MainLeftCard" :style="'height:'+(clientHeight-113)+'px'">
          <p slot="title">文书类型</p>
          <div :style="'height:'+(clientHeight-191)+'px'" class="LeftCardBody">
            <Tree ref="typeTree" :data="treeData" @on-select-change="typeSelect"></Tree>
          </div>
        </Card>
      </Col>
      <Col span="20" style="padding-left:10px">
        <data-table
          ref="test"
          :url="'/enforces/wenshou/template/issueList'"
          :params="query"
          :columns="columnsMoban"
          @on-row-dblclick="dbhandleEdit"
        >
          <div slot="search">
            <Form :label-width="66" @submit.native.prevent>
              <Row>
                <Col span="5">
                  <Form-item label="文书名:">
                    <Input
                      v-model="query.wheres.search"
                      @on-keydown.enter="initSearch"
                      placeholder="请输入..."
                    ></Input>
                  </Form-item>
                </Col>
                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                  <Button @click="handleReset()">重置</Button>
                </div>
              </Row>
            </Form>
          </div>
        </data-table>
      </Col>
    </Row>
    <!-- 新增文书模板 -->
    <Modal v-model="modalStatus.wsnewmoban" :title="title" width="450" :styles="{top: '150px'}">
      <Form :label-width="120" :model="newMobanParams" ref="newMobanParams" :rules="ruleValidate">
        <Row>
          <Col span="20">
            <Form-item label="模板名称:" prop="name">
              <Input v-model="newMobanParams.name" placeholder="请输入..." style="width:205px;"></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="文件上传:" prop="file">
              <Upload
                ref="upload"
                :format="['docx','doc']"
                :before-upload="handleUpload"
                :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                action="/enforces/wenshou/template/save"
              >
                <div style="width:100%;">
                  <Button icon="ios-cloud-upload-outline">点击或者拖拽到此上传文件</Button>
                </div>
              </Upload>
              <div>
                <ul
                  style="list-style: none;"
                  v-if="formCheck"
                  v-for="(list,index) in newMobanParams.file"
                  :key="index"
                >
                  <li>
                    文件名:
                    <span>{{ list.name }}</span>
                    <!-- <Icon type="md-close" size="20" style="float:right;margin-right:90px;margin-top:6px;" @click="delFileList(index)"></Icon> -->
                  </li>
                </ul>
                <ul
                  style="list-style: none;"
                  v-if="!formCheck"
                  v-for="(list,index) in newMobanUpdate.file"
                  :key="index"
                >
                  <li>
                    文件名:
                    <span>{{ list.name }}</span>
                  </li>
                </ul>
                <ul v-if="fileName!=''">
                  <li>
                    文件名:
                    <span>{{ fileName }}</span>
                  </li>
                </ul>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modalStatus.wsnewmoban = false">取消</Button>
        <Button type="info" @click="saveMoban('newMobanParams')">保存</Button>
      </div>
    </Modal>
  </div>
</template>
    <script>
import { isNull, isEmpty } from "@/libs/common.js";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
export default {
  name: "wenshu",
  components: {
    MyUpload
  },
  data() {
    var _self = this;
    var validinter = function(rule, value, callback) {
      if (_self.formCheck) {
        if (value.length == 0) {
          return callback(new Error("上传文件不能为空"));
        }
      }
      callback();
    };
    return {
      ruleValidate: {
        name: [
          { required: true, message: "模板名称不能为空", trigger: "blur" }
        ],
        file: [{ validator: validinter, trigger: "blur" }]
      },
      rules: {
        name: [
          { required: true, message: "文书名称不能为空", trigger: "blur" }
        ],
        workflow: [
          { required: true, message: "请选择流程审批", trigger: "change" }
        ],
        need: [
          { required: true, message: "请选择必须制作", trigger: "change" }
        ],
        prews: [
          { required: true, message: "请选择前置文书", trigger: "change" }
        ],
        count: [
          {
            required: true,
            type: "number",
            message: "数量不能为空",
            trigger: "blur",
            transform(value) {
              return Number(value);
            }
          }
        ]
      },
      treeData: [],
      uploadList: [],
      modalStatus: {
        wsnewmoban: false
      },
      newAddParams: {
        name: "",
        phase: "", //案件办理阶段，1立案及调查阶段 2告知阶段 3决定及执行阶段 4结案阶段
        workflow: "", //1流程审批 0普通文书
        need: "", //1必须制作 0非必须
        prews: "", //前置文书 1立案前可制作 0立案前不可制作
        count: "", //一个案件可制作当前文书数量
        sort: "", //排序
        simpleLaw: "" //是否为简易案件，0为否，1为是
      },
      totalNum: 0,
      columnsMoban: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80,
          align: "center"
        },
        {
          title: "模板名称",
          align: "center",
          key: "name"
        },
        {
          title: "创建时间",
          width: 160,
          align: "center",
          key: "createTime"
        },
        {
          title: "更新时间",
          width: 160,
          align: "center",
          key: "updateTime"
        },
        // {
        //   title: "状态",
        //   align: "center",
        //   width: 160,
        //   key: "prews",
        //   render: (h, params) => {
        //     var checked = params.row.checked;
        //     if("1"==checked){
        //         return h("div", "已审核");
        //     }else{
        //       var issued = params.row.issued;
        //       if("1"==issued){
        //         return h("div", "已发布");
        //       }else{
        //         return h("div", "未发布");
        //       }
        //     }
        //   }
        // },
        {
          title: "操作",
          align: "center",
          width: 320,
          render: (h, params) => {
            var _self = this;
            var id = params.row.id;
            var checkedButtom = params.row.checkedButtom;
            var issueButtom = params.row.issueButtom;
            var editButtom = params.row.editButtom;
            var docType = params.row.docType;
            var temp = [];
            // 审核
            if(checkedButtom==1){
                temp.push(h("Button",{props: { type: "info", size: "small" },
                      style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                      on: { click: () => {
                          _self.checked(id, "1");
                      }}},
                    "通过"
                  )
                );
                temp.push(h("Button",{props: { type: "error", size: "small" },
                      style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                      on: { click: () => {
                          _self.checked(id, "0");
                      }}},
                    "不通过"
                  )
                );
            }else if(checkedButtom==2){
                // 撤销审核
                temp.push(
                    h("Button",
                    {props:{type: "error",size: "small"},
                        style:{marginLeft:temp.length==0?"0px":"10px"},
                        on:{click:()=>{_self.checked(id, "0");}}
                    },"撤销审核")
                );
            }
            // 发布
            if(issueButtom==1){
              // 发布
              temp.push(h("Button",{props: { type: "info", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {
                      _self.issued(id, "1");
                  }}},
                "发布"
              ));
            }else if(issueButtom==2){
              // 取消发布
              temp.push(h(
                "Button",
                {props: { type: "error", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {
                      _self.issued(id, "0");
                  }}},
                "取消发布"
              ));
            }
            // 编辑
            if(editButtom==1){
              temp.push(h(
                "Button",
                { props: { type: "info", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {
                    _self.wenshuBianji(params.row);
                  }}},
                "编辑"
              ));
              temp.push(h(
                "Button",
                {props: { type: "error", size: "small" },
                  style: { marginLeft: "10px" },
                  on: { click: () => {
                    _self.deleteMoban(id);
                  }}},
                "删除"
              ));
            }
            var flag = params.row.flag;
            // 设置默认
            if (flag == "1") {
              var deptid = params.row.deptid;
              temp.push(h(
                "Button",
                { props: { type: "info", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {
                      _self.setDefault(id, docType, "0");
                  }}},
                "取消默认"
              ));
            } else {
              // 非本人的模板不让设置默认
              temp.push(h(
                "Button",
                { props: { type: "info", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {
                      _self.setDefault(id, docType, "1");
                  }}},
                "设置默认"
              ));
            }
            if (temp.length == 0) {
              temp.push(h(
                "Button",
                { props: { type: "info", size: "small" },
                  style: { marginLeft: temp.length == 0 ? "0px" : "10px" },
                  on: { click: () => {} }
                },
                "暂无操作"
              ));
            }
            return h("div", temp);
          }
        }
      ],
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80,
          // ellipsis:true,
          align: "center"
        },
        {
          title: "文书编号",
          align: "center",
          key: "id",
          width: 150
        },
        {
          title: "文书名",
          align: "center",
          key: "name"
        },
        {
          title: "所属地区",
          align: "center",
          key: "prews",
          render: (h, params) => {
            var coverageDeptNames = params.row.coverageDeptNames;
            if (coverageDeptNames && coverageDeptNames.length > 0) {
              return h("div", coverageDeptNames);
            } else {
              var deptid = params.row.deptid;
              if (deptid == "*") {
                return h("div", "全省");
              } else if (deptid != "330000") {
                return h("div", "全市");
              }
            }
          }
        },
        {
          title: "创建时间",
          align: "center",
          width: 150,
          key: "createTime"
        },
        {
          title: "操作",
          align: "center",
          width: 150,
          render: (h, params) => {
            var _self = this;
            var id = params.row.id;
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.queryMoban.key = id;
                      _self.newMobanParams.docType = id;
                      _self.queryMoban.page = 1;
                      _self.watchMsg(params.row);
                    }
                  }
                },
                "模板管理"
              )
            );
            return h("div", temp);
          }
        }
      ],
      dataList: [],
      query: {
        page: 1,
        size: 20,
        wheres: {
          search: ""
          // statusType: "0"
        }
      },
      queryMoban: {
        key: "", //文书配置id
        page: 1,
        size: 10,
        wheres: {
          search: ""
        }
      },
      newMobanParams: {
        docType: "",
        name: "", //文书模板名称
        id: "", //文书配置记录的id
        file: []
      },
      newMobanUpdate: {
        docType: "",
        name: "", //文书模板名称
        id: "", //文书配置记录的id
        file: []
      },
      title: "",
      title2: "",
      id: "", //文件上传id参数
      fileName: "",
      formCheck: false
    };
  },
  computed: {
    lawN() {
      return this.$store.getters.getDictList("system_law");
    },
    clientHeight() {
      return this.$store.state.app.clientHeight;
    }
  },
  methods: {
    //获取文书类型列表
    getwenshouList() {
      this.$http.get("/enforces/wenshou/config/wenshouList").then(res => {
        console.log(res, "res");
        if (res.success) {
          this.treeData = res.data;
        }
      });
    },
    //获取文书类型
    typeSelect(val) {
      this.query.key = val[0].id;
      this.initSearch();
      //   console.log(val);
    },
    statusChange(type) {
      this.$refs.test.initSearch();
    },
    delFileList(index) {
      let _self = this;
      _self.newMobanParams.file.splice(index, 1);
    },
    setDefault(id, docType, type) {
      // 设置默认
      var _self = this;
      _self.$http
        .post(
          "/enforces/wenshou/template/setDefault/" +
            id +
            "/" +
            docType +
            "/" +
            type
        )
        .then(res => {
          if (res.success) {
            if (type == "1") {
              _self.$Message.info("已设置默认");
            } else {
              _self.$Message.info("已取消默认");
            }
            _self.initSearch();
          }
        });
    },
    issued(id, type) {
      var _self = this;
      _self.$http.post("/enforces/wenshou/template/issued/" + id).then(res => {
        if (res.success) {
          if (type == "1") {
            _self.$Message.info("已发布");
          } else {
            _self.$Message.info("已取消发布");
          }
          _self.initSearch();
        }
      });
    },
    checked(id, type) {
      // 审核
      var _self = this;
      _self.$http
        .post("/enforces/wenshou/template/checked/" + id + "/" + type)
        .then(res => {
          if (res.success) {
            if (type == "1") {
              _self.$Message.info("已通过审核");
            } else {
              _self.$Message.info("已取消审核");
            }
            _self.initSearch();
          }
        });
    },
    saveMoban(name) {
      var that = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          //多个文件上传
          //创建 formData 对象
          var formData = new FormData();
          var id = that.newMobanParams.id;
          var docType = that.queryMoban.key;
          var name = that.newMobanParams.name;
          //向 formData 对象中添加文件--其他参数
          formData.append("id", id);
          formData.append("docType", docType);
          formData.append("name", name);
          if (that.formCheck) {
            formData.append("files", that.newMobanParams.file[0]);
          }
          if (!that.formCheck) {
            if (
              that.newMobanParams.file.length == 0 &&
              that.newMobanParams.id != ""
            ) {
              formData.append("files", null);
            } else {
              formData.append("files", that.newMobanParams.file[0]);
            }
          }
          that.$http
            .post("/enforces/wenshou/template/save", formData, {
              timeout: 10000,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(function(rdata) {
              if (rdata.success) {
                that.$Message.info("操作成功");
                that.watchMsg();
                that.modalStatus.wsnewmoban = false;
              } else {
                that.$Message.error("操作失败");
              }
            })
            .catch(function(error) {
              that.$Message.error("服务器错误" + error);
            });
        }
      });
    },
    wenshuBianji(row) {
      this.newMobanParams.file = [];
      this.newMobanUpdate.file = [];
      this.$refs["newMobanParams"].resetFields();
      this.title = "编辑文书模板";
      this.formCheck = false;
      this.fileName = "";
      this.id = row.id;
      var _self = this;
      _self.$http
        .get("/enforces/wenshou/template/find?id=" + row.id)
        .then(res => {
          if (res.success) {
            _self.newMobanParams = res.data;
            _self.newMobanParams.file = [];
            _self.modalStatus.wsnewmoban = true;
            var data = JSON.parse(JSON.stringify(res.data));
            if (data.url == undefined || data.url == null) {
              return;
            }
            var url = data.url.split(".");
            _self.fileName = data.name + "." + url[url.length - 1];
          }
        });
    },
    deleteMoban(id) {
      var _self = this;
      _self.$Modal.confirm({
        title: "提示",
        content: "您确定要删除选中的列表项吗？",
        onOk: function() {
          _self.$http.delete("/enforces/wenshou/template/" + id).then(res => {
            if (res.success) {
              _self.watchMsg();
              _self.$Message.info("删除成功");
            } else {
              this.$Message.error("删除失败");
            }
          });
        }
      });
    },
    handleUpload(file) {
      this.fileName = "";
      var name1 = file.name.split(".");
      var name2 = name1[name1.length - 1];
      if (name2 != "docx" && name2 != "doc") {
        file = [];
        this.$Message.error("上传文件支持类型：.docx或.doc");
        return false;
      }
      this.newMobanParams.file = [];
      this.newMobanUpdate.file = [];
      this.newMobanParams.file.push(file);
      this.newMobanUpdate.file.push(file);
      return false;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.page = 1;
      this.initSearch();
    },
    dbhandleEdit(msg) {
      this.queryMoban.key = msg.id;
      this.newMobanParams.docType = msg.id;
      this.watchMsg();
    }
  },
  mounted() {
    this.getwenshouList();
  }
};
</script>      
    <style scoped>
</style>