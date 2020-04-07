<style lang="less" scoped>
@import "../../styles/common.less";
</style>  
    <template>
  <div>
    <Row>
      <data-table
        ref="test"
        :url="'/enforces/wenshou/config/list'"
        :params="query"
        :columns="columns"
        @on-row-dblclick="dbhandleEdit"
      >
        <div slot="search">
          <Form :label-width="52" @submit.native.prevent>
            <Row>
              <Col span="4">
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
                <Button @click="newAdd()" type="success" icon="ios-add">新增</Button>
              </div>
            </Row>
          </Form>
        </div>
      </data-table>
    </Row>
    <!-- 新增 -->
    <Modal v-model="modalStatus.newAddModal" :styles="{top: '220px'}" :title="title2" width="32%">
      <Form :label-width="74" :model="newAddParams" ref="newAddParams" :rules="rules">
        <Row>
          <Col span="24">
            <Form-item label="文书名称:" prop="name">
              <Input v-model="newAddParams.name" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <Form-item label="办理阶段:">
              <Select v-model="newAddParams.phase">
                <Option
                  v-for="(item,index) in lawN"
                  :value="item.value"
                  :key="item.value"
                >{{item.title}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="数量:" prop="count">
              <Input v-model="newAddParams.count" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="排序:">
              <Input v-model="newAddParams.sort" placeholder="请输入..."></Input>
            </Form-item>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <Form-item label="流程审批:" prop="workflow">
              <RadioGroup v-model="newAddParams.workflow" type="button">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="必须制作:" prop="need">
              <RadioGroup v-model="newAddParams.need" type="button">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="前置文书:" prop="prews">
              <RadioGroup v-model="newAddParams.prews" type="button">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="简易案件:" prop="prews">
              <RadioGroup v-model="newAddParams.simpleLaw" type="button">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label="区域范围:" prop="prews">
              <RadioGroup type="button" @on-change="getCitiesData" v-model="citiesData">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </Col>
          <Col span="12" v-if="newAddParams.coverageDeptNames">
            <FormItem label="已选：" :label-width="60">
              <Input type="textarea" readonly v-model="newAddParams.coverageDeptNames"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modalStatus.newAddModal = false">取消</Button>
        <Button type="info" @click="saveData('newAddParams')">保存</Button>
      </div>
    </Modal>
    <!-- 地区选择 -->
    <Modal
      v-model="treeModal"
      title="地区选择"
      width="540"
      class-name="modal"
      :mask-closable="false"
      :styles="{top: '20px'}"
    >
      <div style="padding:10px 20px">
        <newZtree
          :treeData="treeList"
          @checkList="selectTreeChange"
          :withCard="false"
          :chkboxType="{ 'Y' : '', 'N' : '' }"
          ref="tree"
        ></newZtree>
      </div>
      <div slot="footer">
        <Button @click="treeCancel()">取消</Button>
        <Button type="primary" @click="treeSure()" style="margin-left: 8px">确定</Button>
      </div>
    </Modal>
    <!-- 文书模板分页 -->
    <Modal v-model="modalStatus.wsmoban" title="文书模板列表" width="980" :styles="{top: '100px'}">
      <Form :label-width="75">
        <Row>
          <Col span="6">
            <Form-item label="模板名称:">
              <Input
                v-model="queryMoban.wheres.search"
                @on-keydown.enter="watchMsg()"
                placeholder="请输入..."
              ></Input>
            </Form-item>
          </Col>
          <Col span="10" style="margin-left:4px;">
            <Button @click="watchMsg()" type="primary" icon="ios-search">搜索</Button>
            <Button @click="reset()">重置</Button>
            <Button @click="newAddMoban()" type="success" icon="ios-add">新增</Button>
          </Col>
        </Row>
        <Row>
          <Table height="450" border :columns="columnsMoban" :data="dataListMoban" :loading="false"></Table>
          <Page
            show-elevator
            show-sizer
            show-total
            :current="queryMoban.page"
            :page-size="queryMoban.size"
            :total="totalNum"
            @on-page-size-change="pageSizeChange"
            @on-change="changePage"
          ></Page>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="info" @click="modalStatus.wsmoban = false">关闭</Button>
      </div>
    </Modal>
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
    <Modal v-model="modalStatus.process" title="流程配置" width="500" :styles="{top: '100px'}">
      <div class="search-bar">
        <Form :label-width="70" @submit.native.prevent>
          <Row>
            <Col span="14">
              <Form-item label="流程名称:">
                <Input
                  v-model="processQuery.wheres.name"
                  @on-keydown.enter="getProcessData"
                  placeholder="请输入..."
                  style="width:200px"
                ></Input>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="getProcessData()" type="primary" icon="ios-search">搜索</Button>
              <Button @click="resetProcess()">重置</Button>
            </div>
          </Row>
        </Form>
      </div>
      <!-- <Table
        @on-selection-change="processChange"
        height="500"
        :columns="processColumns"
        :data="processData"
        ref="processTable"
        border
        stripe
      ></Table>
      <div class="bottom-wrap">
        <Page
          show-elevator
          show-sizer
          show-total
          :current="processQuery.page"
          :page-size="processQuery.size"
          :total="processTotal"
          @on-page-size-change="processPageSizeChange"
          @on-change="processChangePage"
        ></Page>
      </div> -->
      <div style="max-height:400px;overflow:hidden">
        <Tree :data="processData" @on-check-change="processChange" show-checkbox></Tree>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="info" @click="saveProcess">保存</Button>
      </div>
    </Modal>
  </div>
</template>
    <script>
import { isNull, isEmpty } from "@/libs/common.js";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import newZtree from "@/views/components/treeGrid/newZtree";
import user from "../../store/module/user";
var userId = user.state.userInfo.userId;
export default {
  name: "wenshu",
  components: {
    MyUpload,
    newZtree
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
      treeModal: false,
      citiesData: "",
      treeList: [],
      areaIdList: [],
      areaTitle: [],
      uploadList: [],
      processCheckList: [],
      modalStatus: {
        newAddModal: false,
        wsmoban: false,
        wsnewmoban: false,
        process: false
      },
      newAddParams: {
        name: "",
        phase: "", //案件办理阶段，1立案及调查阶段 2告知阶段 3决定及执行阶段 4结案阶段
        workflow: "", //1流程审批 0普通文书
        need: "", //1必须制作 0非必须
        prews: "", //前置文书 1立案前可制作 0立案前不可制作
        count: "", //一个案件可制作当前文书数量
        sort: "", //排序
        simpleLaw: "", //是否为简易案件，0为否，1为是
        coverageDeptIds: "", //区域范围id（所属区域的deptId，这里只保存到市级），用","隔开
        coverageDeptNames: "" //区域范围
      },
      totalNum: 0,
      dataListMoban: [],
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
        {
          title: "操作",
          align: "center",
          width: 190,
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
                  on: {
                    click: () => {
                      _self.wenshuBianji(params.row);
                    }
                  }
                },
                "编辑"
              )
            );
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.deleteMoban(id);
                    }
                  }
                },
                "删除"
              )
            );
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
          title: "文书名",
          align: "center",
          key: "name"
        },
        {
          title: "办理阶段",
          align: "center",
          key: "phase",
          width: 150,
          render: (h, params) => {
            var phase = params.row.phase;
            var lawN = this.lawN;
            for (var i = 0; i < lawN.length; i++) {
              if (lawN[i].value == phase) {
                return h("div", lawN[i].title);
              }
            }
          }
        },
        {
          title: "流程审批",
          align: "center",
          key: "workflow",
          width: 90,
          render: (h, params) => {
            var workflow = params.row.workflow;
            if (workflow == "1") {
              return h("div", "是");
            } else {
              return h("div", "否");
            }
          }
        },
        {
          title: "必须制作",
          align: "center",
          width: 90,
          key: "need",
          render: (h, params) => {
            var need = params.row.need;
            if (need == "1") {
              return h("div", "是");
            } else {
              return h("div", "否");
            }
          }
        },
        {
          title: "前置文书",
          align: "center",
          width: 90,
          key: "prews",
          render: (h, params) => {
            var prews = params.row.prews;
            if (prews == "1") {
              return h("div", "是");
            } else {
              return h("div", "否");
            }
          }
        },
        {
          title: "简易案件",
          align: "center",
          width: 90,
          key: "prews",
          render: (h, params) => {
            var simpleLaw = params.row.simpleLaw;
            if (simpleLaw == "1") {
              return h("div", "是");
            } else {
              return h("div", "否");
            }
          }
        },
        {
          title: "数量",
          align: "center",
          width: 70,
          key: "count"
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
          width: 300,
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
                      _self.watchMsg(params.row);
                    }
                  }
                },
                "模板管理"
              )
            );
            if(params.row.workflow == "1"){
              temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.configuration(params.row.id);
                    }
                  }
                },
                "流程配置"
              )
            );
            }       
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  on: {
                    click: () => {
                      _self.handleEdit(params.row);
                    }
                  }
                },
                "编辑"
              )
            );
            if (userId == params.row.creatorId) {
              temp.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginLeft: "10px"
                    },
                    on: {
                      click: () => {
                        _self.delete(id);
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            return h("div", temp);
          }
        }
      ],
      processColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          maxWidth: 80,
          align: "center"
        },
        {
          title: "用户组",
          align: "center",
          key: "name"
        },
        {
          title: "流程类型",
          align: "center",
          key: "category"
        },
        {
          title: "版本号",
          align: "center",
          key: "version"
        }
      ],
      processData: [],
      dataList: [],
      query: {
        page: 1,
        size: 20,
        wheres: {
          search: ""
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
      processQuery: {
        page: 1,
        size: 999,
        wheres: {
          category: "",
          name: ""
        }
      },
      processTotal: 0,
      processId: "",
      title: "",
      title2: "",
      id: "", //文件上传id参数
      fileName: "",
      formCheck: false
    };
  },
  computed: {
    uploadData() {
      //上传时附带的额外参数 :data
      return {
        docType: this.newMobanParams.docType
      };
    },
    lawN() {
      return this.$store.getters.getDictList("system_law");
    }
  },
  methods: {
    getCitiesData(type) {
      if (type == "0") {
        this.areaIdList = [];
        this.areaTitle = [];
        this.newAddParams.coverageDeptIds = "";
        this.newAddParams.coverageDeptNames = "";
      } else {
        let type = "includes:70,45";
        this.areaIdList = [];
        this.areaTitle = [];
        this.getTree(type, "cities");
      }
    },
    getTree(type, treeType) {
      this.$http
        .get(`/$admin/depts/authtree?containOrgan=false&type=${type}`)
        // 返回值
        .then(res => {
          if (res.success) {
            if ("county" == treeType) {
              // 选择县区时只能选择子节点
              this.treeList = res.data;
              this.treeList[0]["nocheck"] = true;
              for (let i in this.treeList[0].children) {
                let children = this.treeList[0].children[i];
                if (children.children) {
                  children["nocheck"] = true;
                }
              }
            } else {
              this.treeList = res.data;
            }
            this.treeModal = true;
          }
        })
        .catch(error => {
          this.treeList = [];
        });
    },
    selectTreeChange(value) {
      // console.log(value)
      this.areaIdList = [];
      this.areaTitle = [];
      for (let i in value) {
        this.areaIdList.push(value[i].id);
        this.areaTitle.push(value[i].name);
      }
      this.newAddParams.coverageDeptIds = "," + this.areaIdList.join(",") + ",";
      this.newAddParams.coverageDeptNames = this.areaTitle.join(",");
    },
    treeCancel() {
      this.areaIdList = [];
      this.areaTitle = [];
      this.treeModal = false;
    },
    treeSure() {
      if (this.areaIdList.length == 0) {
        this.$Message.error("请选择地区");
        return;
      }
      this.newAddParams.coverageDeptIds = "," + this.areaIdList.join(",") + ",";
      this.newAddParams.coverageDeptNames = this.areaTitle.join(",");
      // this.treeCancel();
      this.treeModal = false;
    },
    delFileList(index) {
      let _self = this;
      _self.newMobanParams.file.splice(index, 1);
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
    watchMsg() {
      //文书模板分页查询
      var _self = this;
      _self.$http
        .get(
          "/enforces/wenshou/template/list?query=" +
            encodeURI(JSON.stringify(_self.queryMoban))
        )
        .then(res => {
          if (res.success) {
            _self.dataListMoban = res.data.data;
            _self.totalNum = res.data.total;
            _self.modalStatus.wsmoban = true;
          }
        });
    },
    reset() {
      //文书模板重置查询
      this.queryMoban.page = 1;
      this.queryMoban.size = 10;
      this.queryMoban.wheres.search = "";
      this.watchMsg();
    },
    newAddMoban() {
      this.newMobanParams.name = "";
      this.newMobanParams.id = "";
      this.newMobanParams.file = [];
      this.newMobanUpdate.file = [];
      this.$refs["newMobanParams"].resetFields();
      this.title = "新增文书模板";
      this.formCheck = true;
      this.fileName = "";
      this.modalStatus.wsnewmoban = true;
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
    pageSizeChange(size) {
      this.queryMoban.size = size;
      this.watchMsg();
    },
    changePage(page) {
      this.queryMoban.page = page;
      this.watchMsg();
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.query.page = 1;
      this.query.size = 10;
      this.initSearch();
    },
    newAdd() {
      this.newAddParams = {};
      this.$refs["newAddParams"].resetFields();
      this.title2 = "新增文书";
      this.modalStatus.newAddModal = true;
    },
    handleEdit(row) {
      this.$refs["newAddParams"].resetFields();
      // this.$refs ["newAddParams"].fields.forEach(function (e) {
      //     if (e.prop == 'count') {
      //         e.resetField()
      //     }
      // });
      this.title2 = "编辑文书";
      this.newAddParams = JSON.parse(JSON.stringify(row));
      if (this.newAddParams.coverageDeptNames == "") {
        this.citiesData = "0";
      } else {
        this.citiesData = "1";
      }
      this.modalStatus.newAddModal = true;
    },
    dbhandleEdit(msg) {
      this.queryMoban.key = msg.id;
      this.newMobanParams.docType = msg.id;
      this.watchMsg();
    },
    delete(id) {
      var _self = this;
      _self.$Modal.confirm({
        title: "提示",
        content: "您确定要删除选中的列表项吗？",
        onOk: function() {
          _self.$http.delete("/enforces/wenshou/config/" + id).then(result => {
            if (result.success) {
              _self.initSearch();
              _self.$Message.info("删除成功");
            } else {
              this.$Message.error(result.msg);
            }
          });
        }
      });
    },
    saveData(name) {
      var _self = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (!_self.newAddParams.coverageDeptNames) {
            _self.newAddParams.coverageDeptIds = ",330000,";
            _self.newAddParams.coverageDeptNames = "浙江省";
          }
          if (
            _self.newAddParams.id == undefined ||
            isNull(_self.newAddParams.id)
          ) {
            _self.$http
              .post("/enforces/wenshou/config/", _self.newAddParams)
              .then(res => {
                if (res.success) {
                  _self.initSearch();
                  _self.modalStatus.newAddModal = false;
                  _self.$Message.info("新增成功");
                } else {
                  _self.$Message.error("新增失败");
                }
              });
          } else {
            _self.$http
              .patch("/enforces/wenshou/config/update", _self.newAddParams)
              .then(res => {
                if (res.success) {
                  if (res.success) {
                    _self.initSearch();
                    _self.modalStatus.newAddModal = false;
                    _self.$Message.info("编辑成功");
                  } else {
                    _self.$Message.error("编辑失败");
                  }
                }
              });
          }
        }
      });
    },
    configuration(row) {
      console.log(row, "row");
      this.processQuery.wheres.category = row;
      this.modalStatus.process = true;
      this.getProcessData();
    },
    getProcessData() {
      this.processData = [];
      let params = new URLSearchParams();
      let json = JSON.stringify(this.processQuery);
      params.append("query", json);
      this.$http
        .get(`/workflow/relation/page`, {
          params: params
        })
        .then(res => {
          console.log(res, "res");
          if (res.success) {
            this.processData = res.data.data;
             for(let i in this.processData){
                if(this.processData[i].name){
                    this.processData[i].title = this.processData[i].name
                }
            }
            // this.$nextTick(() => {
            // for(let i in this.processData){
            //     if(this.processData[i].selected){
            //         this.$refs.processTable.toggleSelect(i)
            //     }
            // }
            // })
            this.processTotal = res.data.total;
          } else {
            this.processData = [];
          }
        })
        .catch(err => {
          this.processData = [];
        });
    },
    resetProcess() {
        this.processQuery.page = 1
        this.processQuery.size = 999
        this.processQuery.wheres.name = ""
        this.getProcessData();
    },
    processChange(value) {
        console.log(value)
        this.processCheckList = value
    },
    processPageSizeChange(value) {
      this.processQuery.size = value;
      this.getProcessData();
    },
    processChangePage(value) {
      this.processQuery.page = value;
      this.getProcessData();
    },
    cancel(){
        this.modalStatus.process = false;
        this.processCheckList = []
    },
    saveProcess(){
        if(this.processCheckList.length < 1){
            this.$Message.error('至少选择一条数据！')
            return
        }
        let arr = []
        for(let i in this.processCheckList){
            arr.push(this.processCheckList[i].processKey)
        }
        this.$http
        .post(`/workflow/relation/save`, {
          category:this.processQuery.wheres.category,
          selectedProcessKeys:arr
        })
        .then(res => {
          console.log(res, "res");
          if (res.success) {
              this.$Message.info('操作成功！')
              this.modalStatus.process = false;
              this.initSearch()
          } else {
              this.$Message.error(res.msg)
          }
        })
        .catch(err => {
              this.$Message.error('操作失败！')
        });
    },
  },
  mounted() {}
};
</script>      
    <style scoped>
</style>
                    
        
        
        