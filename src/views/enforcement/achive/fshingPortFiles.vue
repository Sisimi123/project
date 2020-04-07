<template>
  <div>
    <data-table
      ref="main"
      :url="'/shiparchives/fishingPortFiles/page'"
      :params="query"
      :columns="columns"
      :autoInitTable="false"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="4">
              <Form-item label="渔港名称:">
                <Input v-model="query.wheres.portName" @on-keydown.enter="''" placeholder="请输入..." />
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Button @click="initSearch" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset">重置</Button>
            </div>
            <span style="float:right;margin-bottom:10px">
              <ButtonGroup>
                <Button @click="newWin" type="info" icon="ios-add">新增</Button>
                <MyUpload
                  :action="'/shiparchives/fishingPortFiles/importExcel'"
                  :format="['xlsx','xls']"
                  :on-success="importXls"
                  :on-format-error="handleFormatError"
                  style="width:74px;height:35px;float:right;margin-left:4px;"
                >
                  <!-- <Button type="info" icon="ios-cloud-download-outline">导入</Button> -->
                  <Button type="success" icon="ios-folder">导入</Button>
                </MyUpload>
                <Button type="success" icon="ios-folder" @click="downloadMb()">下载模板</Button>
              </ButtonGroup>
            </span>
          </Row>
        </Form>
      </div>
    </data-table>
    <Modal
      :width="900"
      v-model="modal.showDetail"
      :styles="{top: '80px'}"
      :title="title"
      :mask-closable="maskclosable"
    >
      <Form :label-width="120" :model="info" :rules="infoRules" ref="info">
        <Row>
          <Col span="12">
            <FormItem label="渔港名称:" prop="portName">
              <Input v-model="info.portName" :readonly="ifEdit"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="所属区县:">
              <Input v-model="info.deptName" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="经度:" prop="lon">
              <Input v-model="info.lon" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="纬度:" prop="lat">
              <Input v-model="info.lat" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="渔港等级:">
              <Input v-model="info.portLevel" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="陆域面积:">
              <Input v-model="info.landArea" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="水域面积:">
              <Input v-model="info.waterArea" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="避风等级:">
              <Input v-model="info.shelterLevel" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="避风水域面积:">
              <Input v-model="info.shelterWaterArea" :readonly="ifEdit" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="12级风可容纳避风渔船数:">
              <Input v-model="info.shelterShipInRank12Capacity" :readonly="ifEdit" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="modal.showDetail=false">取消</Button>
        <Button type="primary" v-show="!ifEdit" @click="submitData('info')">{{btnInfo}}</Button>
      </div>
    </Modal>
    <!-- <selectShipModal v-model="modal.baseShipModal" @on-select-ship="onSelectShip"></selectShipModal> -->
  </div>
</template>

<script>
import MyUpload from "@/views/components/Upload/MyUpload.vue";
// import selectShipModal from "@/views/components/selectModal/selectShipModal.vue";
export default {
  components: {
    MyUpload
    // selectShipModal
  },
  data() {
    const validateLon = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入经度"));
      } else if (value > 180 || value < 0) {
        callback(new Error("请输入正确的经度"));
      } else {
        callback();
      }
    };
    const validateLat = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入纬度"));
      } else if (value > 90 || value < 0) {
        callback(new Error("请输入正确的纬度"));
      } else {
        callback();
      }
    };
    return {
      ifEdit: false,
      btnInfo: "",
      maskclosable: false,
      info: {
        portName: "",
        lon: null,
        lat: null
      },
      title: "",
      modal: {
        showDetail: false,
        baseShipModal: false
      },
      query: {
        page: 1,
        size: 20,
        wheres: {
          portName: ""
        }
      },
      columns: [
        {
          title: "序号",
          type: "index",
          maxWidth: 80,
          align: "center"
        },
        {
          title: "渔港名称",
          align: "center",
          key: "portName"
        },
        {
          title: "经度",
          align: "center",
          key: "lon",
          render: (h, params) => {
            let lon = "";
            if (params.row.lon) {
              lon = this.getLonLat(params.row.lon);
            }
            return h("span", lon);
          }
        },
        {
          title: "纬度",
          align: "center",
          key: "lat",
          render: (h, params) => {
            let lat = "";
            if (params.row.lat) {
              lat = this.getLonLat(params.row.lat);
            }
            return h("span", lat);
          }
        },
        {
          title: "所属区县",
          align: "center",
          key: "deptName"
        },
        {
          title: "	渔港等级",
          align: "center",
          key: "portLevel"
        },
        {
          title: "陆域面积",
          align: "center",
          key: "landArea"
        },
        {
          title: "水域面积",
          align: "center",
          key: "waterArea"
        },
        {
          title: "避风等级",
          align: "center",
          key: "shelterLevel"
        },
        {
          title: "避风水域面积",
          align: "center",
          key: "shelterWaterArea"
        },
        {
          title: "12级风可容纳避风渔船数（艘）",
          align: "center",
          key: "shelterShipInRank12Capacity"
        },
        {
          title: "操作",
          align: "center",
          width: 180,
          render: (h, params) => {
            var _self = this;
            return h("div", [
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "info",
              //         size: "small"
              //       },
              //       style: {},
              //       on: {
              //         click: () => {
              //           _self.title = "查看";
              //           _self.ifEdit = true;
              //           _self.editWin(params.row);
              //         }
              //       }
              //     },
              //     "查看"
              //   ),
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
                      _self.title = "编辑";
                      _self.btnInfo = "保存";
                      _self.ifEdit = false;
                      _self.editWin(params.row);
                    }
                  }
                },
                "编辑"
              ),
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
                      this.handleDelete(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      infoRules: {
        portName: [
          { required: true, message: "请输入渔港名称", trigger: "blur" }
        ],
        lon: [{ required: true, validator: validateLon, trigger: "blur" }],
        lat: [{ required: true, validator: validateLat, trigger: "blur" }]
      }
    };
  },
  methods: {
    getLonLat(val) {
      if ((val.toString()).indexOf('°')>-1) {
        return val;
      } else {
        let lonDre;
        let lonMin;
        let lonSec;
        lonDre = parseInt(val) + "°";
        lonMin = parseInt((val - parseInt(val)) * 60) + "'";
        lonSec = parseInt(
          ((val - parseInt(val)) * 60 - parseInt((val - parseInt(val)) * 60)) *
            60
        ) + `"`;
        return lonDre + " " + lonMin + " " + lonSec;
      }
    },
    handleDelete(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        okText: "继续",
        cancelText: "返回",
        onOk: () => {
          this.$http
            .delete("/shiparchives/fishingPortFiles/delete?id=" + row.id)
            .then(res => {
              this.$Message.info("操作成功");
              this.initSearch();
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel: () => {
          console.log("onCancel");
        }
      });
    },
    onSelectShip(row) {
      var _self = this;
      _self.info = row;
      _self.info.cjg = row.portregistry;
    },
    editWin(row) {
      var _self = this;
      _self.$refs["info"].resetFields();
      // 对象深拷贝
      var data = JSON.parse(JSON.stringify(row));
      _self.info = data;
      _self.modal.showDetail = true;
    },
    submitData(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.title === "新增") {
            this.$http
              .post("/shiparchives/fishingPortFiles/save", this.info)
              .then(res => {
                if (res.success) {
                  this.$Message.info("新增成功");
                  this.modal.showDetail = false;
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else if (this.title === "编辑") {
            this.$http
              .patch(
                "/shiparchives/fishingPortFiles/update",
                this.info
              )
              .then(res => {
                if (res.success) {
                  this.$Message.info("修改成功");
                  this.modal.showDetail = false;
                  this.initSearch();
                } else {
                  this.$Message.error(res.msg);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else {
          this.$Message.error("信息填写存在错误!");
        }
      });
    },
    importXls(response, file, fileList) {
      if (response.success) {
        this.$Message.info("导入成功！");
        this.initSearch();
      } else {
        this.$Message.error(response.msg);
      }
    },
    handleFormatError(file) {
      this.$Message.error("文件格式不支持上传！");
    },
    newWin() {
      var _self = this;
      _self.title = "新增";
      _self.btnInfo = "确定";
      _self.ifEdit = false;
      this.$refs["info"].resetFields();
      for (let key in this.info) {
        this.info[key] = "";
      }
      _self.modal.showDetail = true;
    },
    handleExport() {},
    initSearch() {
      this.$refs.main.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.initSearch();
    },
    downloadMb() {
      window.open(
        this.$basePath + "/shiparchives/fishingPortFiles/excelTemplate"
      );
    }
  },
  mounted() {
    this.initSearch();
  }
};
</script>

<style lang="less" scoped>
</style>