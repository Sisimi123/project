<style lang="less" scoped>
@import "../../../styles/common.less";
</style>  
<template>
  <div>
    <div>
      <data-table
        ref="test"
        :url="'/check/dy/list'"
        :params="query"
        :columns="columns"
        @on-row-dblclick="handleEdit"
      >
        <div slot="search">
          <Form :label-width="80" @submit.native.prevent>
            <Row>
              <Col span="2">
                <Select v-model="query.type" @on-change="showTypes">
                  <Option value="1" selected>全部</Option>
                  <Option value="2">离线</Option>
                  <Option value="3">离编</Option>
                </Select>
              </Col>
              <Col span="4">
                <Form-item label="渔船名字:">
                  <Input
                    v-model="query.wheres.shipname"
                    @on-keydown.enter="initSearch"
                    placeholder="请输入..."
                  ></Input>
                </Form-item>
              </Col>
              <Col span="4">
                <Form-item label="终端号码:">
                  <Input
                    v-model="query.wheres.termno"
                    @on-keydown.enter="initSearch"
                    placeholder="请输入..."
                  ></Input>
                </Form-item>
              </Col>
              <div class="btn-wrap">
                <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset()">重置</Button>
              </div>
              <span style="float:right;margin-right:10px;">
                <Button
                  @click="showExcelDetail()"
                  type="info"
                  icon="ios-cloud-upload-outline"
                  style="margin-right:10px;"
                >导出Excel</Button>
              </span>
            </Row>
          </Form>
        </div>
      </data-table>
    </div>
    <Modal :styles="{top: '50px'}" v-model="checkDetailModal" title="审核信息" width="50%">
      <div style="height:550px;overflow: auto;padding:0px 10px 0px 0px">
        <Form :label-width="105" ref="queryCheck" :model="queryCheck" :rules="ruleValidate">
          <Row>
            <Col span="24">
              <span style="font-size:14px;color:red;font-weight:bold;">点验信息:</span>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="点验日期:">
                <Input v-model="queryDetail.dydate" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="点验时间:">
                <Input v-model="queryDetail.dytime" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="渔船状态:">
                <Input v-model="queryDetail.offline" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="是否离编:">
                <Input v-model="queryDetail.outgroup" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="点验状态:">
                <Input v-model="queryDetail.state" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="核查人姓名:">
                <Input v-model="queryDetail.auditorname" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <span style="font-size:14px;color:red;font-weight:bold;">渔船静态资料:</span>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="渔船名:">
                <Input v-model="queryDetail.shipname" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="所属机构:">
                <Input v-model="queryDetail.organname" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="船主姓名:">
                <Input v-model="queryDetail.hostname" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="船东姓名:">
                <Input v-model="queryDetail.owner" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="船员人数:">
                <Input v-model="queryDetail.count" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="联系电话:">
                <Input v-model="queryDetail.tel" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="卫星电话:">
                <Input v-model="queryDetail.marineid" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="航行状态:">
                <Input v-model="queryDetail.sailStatus" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <span style="font-size:14px;color:red;font-weight:bold;">渔船动态资料:</span>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="经度:">
                <Input v-model="queryDetail.lon" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="纬度:">
                <Input v-model="queryDetail.lat" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="航速:">
                <Input v-model="queryDetail.heading" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="渔区:">
                <Input v-model="queryDetail.grid" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="最后报位时间:">
                <Input v-model="queryDetail.postime" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="港内港外:">
                <Input v-model="queryDetail.port" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="最后报位终端:">
                <Input v-model="queryDetail.termname" readonly></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="最后报位终端号:">
                <Input v-model="queryDetail.termno" readonly></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <span style="font-size:14px;color:red;font-weight:bold;">渔船动态核实情况记录:</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="联系记录:">
                <Input
                  v-model="queryCheck.contactlog"
                  type="textarea"
                  :readonly="readonly"
                  :autosize="{minRows: 3,maxRows: 5}"
                ></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="渔船实际状态:">
                <Select v-model="queryCheck.actualStatus" :readonly="readonly">
                  <Option value="1">在港</Option>
                  <Option value="2">作业</Option>
                  <Option value="3">出航</Option>
                  <Option value="4">返航</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem :label-width="5">
                <Input v-model="queryCheck.actualNote" :readonly="readonly"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="离线原因:">
                <Select v-model="queryCheck.offreason" :readonly="readonly">
                  <Option value="1">故障</Option>
                  <Option value="2">停港</Option>
                  <Option value="3">生产</Option>
                  <Option value="4">维修</Option>
                  <Option value="5">无故不开机</Option>
                  <Option value="6">数据异常</Option>
                  <Option value="7">船买卖</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="船员人数:">
                <Input v-model="queryCheck.sailorcount" :readonly="readonly"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="10">
              <FormItem label="状态确认:" prop="status">
                <RadioGroup v-model="queryCheck.status">
                  <Radio label="疑似失联"></Radio>
                  <Radio label="确认安全"></Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <FormItem label="备注:">
                <Input
                  v-model="queryCheck.note"
                  type="textarea"
                  :readonly="readonly"
                  :autosize="{minRows: 3,maxRows: 5}"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
        <Form :label-width="43">
          <Row>
            <Col span="24">
              <span style="font-size:14px;color:red;font-weight:bold;">补充处置记录:</span>
            </Col>
            <Col span="24">
              <FormItem>
                <div style="margin-top:5px;">
                  <Table border :columns="columnsPlus" :data="dataListPlus" :loading="false"></Table>
                </div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="checkDetailModal=false">关闭</Button>
        <Button type="info" @click="BJpublishModal=true">补充处置编辑</Button>
      </div>
    </Modal>
    <Modal :styles="{top: '220px'}" v-model="publishModal" title="发布信息" width="35%">
      <Form :label-width="65">
        <Row>
          <Col span="12">
            <FormItem label="发布人:">
              <Input v-model="checkPub.name" readonly />
            </FormItem>
          </Col>
          <Col span="24">
            <FormItem label="发布内容:">
              <Input
                v-model="checkPub.content"
                type="textarea"
                readonly
                :autosize="{minRows: 3,maxRows: 5}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button @click="publishModal=false">关闭</Button>
      </div>
    </Modal>
    <!-- 编辑发布信息 -->
    <Modal :styles="{top: '220px'}" v-model="BJpublishModal" title="补充处置内容" width="35%">
      <div>
        <Input
          v-model="queryPlus.content"
          type="textarea"
          style="margin-top:5px;"
          :autosize="{minRows: 8,maxRows: 8}"
        ></Input>
      </div>
      <div slot="footer">
        <Button @click="BJpublishModal=false">取消</Button>
        <Button type="info" @click="savePlusMsg()">发布</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import { isNull, isEmpty } from "../../../libs/common";
export default {
  name: "dyhistoryjump",
  components: {
    MyTreeGrid
  },
  data() {
    return {
      ruleValidate: {
        status: [
          { required: true, message: "请选择状态确认", trigger: "change" }
        ]
      },
      dataTotal: 0,
      dataListPlus: [],
      columnsPlus: [
        {
          title: "序号",
          align: "center",
          type: "index",
          maxWidth: 80
        },
        {
          title: "用户名称",
          align: "center",
          key: "name",
          maxWidth: 150
        },
        {
          title: "补充记录",
          align: "center",
          key: "content"
        },
        {
          title: "创建时间",
          align: "center",
          maxWidth: 150,
          key: "createTime"
        }
        // {
        //     title: "操作",
        //     align:"center",
        //     render:(h,params)=>{
        //         var _self=this;
        //         var id = params.row.id;
        //         var temp = [];
        //             temp.push(
        //                 h("Button",
        //                 {
        //                     props: {
        //                         type: "primary",
        //                         size: "small"
        //                     },
        //                     on:{
        //                         click:()=>{
        //                            _self.checkPub={};
        //                            _self.checkPub.name=params.row.name;
        //                            _self.checkPub.content=params.row.content;
        //                            _self.publishModal=true;
        //                         }
        //                     }
        //                 },"查看"));
        //         return h("div", temp);
        //     }
        // },
      ],
      columns: [
        {
          title: "序号",
          align: "center",
          type: "index",
          width: 100
        },
        {
          title: "渔船名",
          align: "center",
          key: "shipname"
        },
        {
          title: "离线状态",
          align: "center",
          key: "offline",
          render: (h, params) => {
            if (params.row.offline == "1") {
              return h("div", "离线");
            } else {
              return h("div", "非离线");
            }
          }
        },
        {
          title: "部门名称",
          align: "center",
          key: "deptname"
        },
        {
          title: "部门代码",
          align: "center",
          key: "organId"
        },
        {
          title: "终端号码",
          align: "center",
          key: "termno"
        },
        {
          title: "终端类型",
          align: "center",
          key: "termtype"
        },
        {
          title: "经度",
          align: "center",
          key: "lon",
          render: (h, params) => {
            var lon = this.cacuLonLat(parseInt(params.row.lon));
            if (params.row.lon == undefined) {
              return h("div", "");
            } else {
              return h("div", lon + "E");
            }
          }
        },
        {
          title: "纬度",
          align: "center",
          key: "lat",
          render: (h, params) => {
            var lat = this.cacuLonLat(parseInt(params.row.lat));
            if (params.row.lat == undefined) {
              return h("div", "");
            } else {
              return h("div", lat + "N");
            }
          }
        },
        {
          title: "航行状态",
          align: "center",
          key: "sailStatus",
          render: (h, params) => {
            // console.log(params.row.sailStatu);
            var sailStatus = params.row.sailStatus;
            if (sailStatus == undefined) {
              return h("div", "");
            } else if (sailStatus == "0") {
              return h("div", "出航");
            } else if (sailStatus == "1") {
              return h("div", "返航");
            }
          }
        },
        {
          title: "数据类型",
          align: "center",
          key: "status",
          render: (h, params) => {
            var ofl = params.row.status;
            if (ofl == "0") {
              return h("div", "当前数据");
            } else if (ofl == "1") {
              return h("div", "历史数据");
            } else if (ofl == "2") {
              return h("div", "临时数据");
            } else {
              return h("div", "异常数据");
            }
          }
        },
        {
          title: "核查状态",
          align: "center",
          key: "hc",
          render: (h, params) => {
            var _self = this;
            if (params.row.hc == "1") {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.ifCheck = "已核查";
                        _self.checkDetail(params.row);
                      }
                    }
                  },
                  "已核查"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "a",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    class: "show",
                    on: {
                      click: () => {
                        _self.ifCheck = "未核查";
                        _self.checkDetail(params.row);
                      }
                    }
                  },
                  "未核查"
                )
              ]);
            }
          }
        },
        {
          title: "点验日期时间",
          align: "center",
          key: "version",
          width: 150,
          render: (h, params) => {
            var vs = params.row.version + "";
            var year = vs.slice(0, 4);
            var month = vs.slice(4, 6);
            var day = vs.slice(6, 8);
            var time = vs.slice(8);
            vs = year + "-" + month + "-" + day + " " + time + ":00";
            return h("div", vs);
          }
        }
      ],
      queryDetail: {
        //点验信息
        dydate: "", //点验日期
        dytime: "", //点验时间
        offline: "", //是否离线   0：非离线    1：离线
        outgroup: "", //是否离编   0：非离编    1：离编
        state: "", //点验状态     0:未核查     1:已核查
        // auditorId: "",//核查人id
        auditorname: "", //核查人姓名
        // auditorOrgan:"",//核查人机构
        //渔船静态资料
        shipname: "", //渔船信息
        organname: "", //所属机构名称
        hostname: "", //船主名称
        owner: "", //船东
        count: "", //船员人数
        tel: "", //联系方式
        marineid: "", //海事卫星电话
        //渔船动态资料
        lon: "", //经度
        lat: "", //纬度
        // sog:"",//航向
        heading: "", //航速
        grid: "", //渔区
        port: "", //港内港外：
        postime: "", //最后报位时间
        termname: "", //最后报位终端
        termno: "", //最后报位终端号
        sailStatus: "" //航行状态
      },
      query: {
        key: "",
        type: "1", //1全部 2离线 3离编
        page: 1,
        size: 10,
        wheres: {
          shipname: "", //渔船名
          termno: "", //终端号码
          organid: "", //机构id（必填）
          mode: "" //1待核查 2已核查 3在港 4作业 5未联系 6出航 7返航
        }
      },
      queryCheck: {
        dyId: "",
        contactlog: "", //联系记录
        actualStatus: "", //实际状态，1，2，3，4，下拉选   1: 在港  2：作业  3：出航   4：返航
        actualNote: "", //实际状态备注，当上面选择为其他时需要填写信息
        sailorcount: "", //船员数量
        offreason: "", //离线原因；1故障 2停港 3生产 4维修 5无故不开机 6数据异常 7船买卖
        status: "", //状态确认   1表示疑似失联  2表示安全
        note: "" //备注
      },
      queryPlus: {
        content: "",
        dyId: "" //对应的点验记录主键,只有逻辑关系，没有orm映射
      },
      dyId: "",
      checkDetailModal: false,
      ifCheck: "",
      checkPub: {
        name: "",
        content: ""
      },
      publishModal: false,
      BJpublishModal: false,
      readonly: true,
      transModal: true,
      timestamp: 0,
      detailId: {
        id: ""
      }
    };
  },
  computed: {},
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleReset() {
      this.query.wheres.shipname = "";
      this.query.wheres.termno = "";
      this.query.type = "1";
      this.query.page = 1;
      this.query.size = 10;
      this.initSearch();
    },
    cacuLonLat(a) {
      var b = a / 10000000;
      var degree = parseInt(b);
      var min = parseInt((b - degree) * 60);
      var sec = parseInt((b - degree) * 3600 - min * 60);
      return degree + "°" + min + "'" + sec + '"';
    },
    beback() {
      this.transModal = true;
      this.query.type = "1";
      this.query.wheres.termno = "";
      this.query.wheres.mode = "";
      this.loadDataTree(this.version);
    },
    handleEdit(msg) {
      if (msg.hc == "1") {
        this.ifCheck = "已核查";
      } else {
        this.ifCheck = "未核查";
      }
      this.checkDetail(msg);
    },
    showTypes() {
      this.initSearch();
    },
    savePlusMsg() {
      var _self = this;
      var current = new Date().getTime();
      var cha = current - _self.timestamp;
      _self.timestamp = current;
      if (cha < 2000) {
        return;
      }
      if (
        _self.queryPlus.content == "" ||
        _self.queryPlus.content == undefined
      ) {
        _self.$Message.error("发布内容不能为空");
        return;
      }
      if (_self.queryPlus.content == "") {
        this.$Message.error("发布内容不能为空");
        return;
      }
      _self.queryPlus.dyId = _self.dyId;
      _self.$http.post("/check/dy/bcczjl", _self.queryPlus).then(res => {
        if (res.success) {
          _self.$Message.info("发布成功");
          _self.initSearch();
          _self.checkDetail(_self.detailId);
          _self.BJpublishModal = false;
        } else {
          _self.$Message.error(res.msg);
        }
      });
    },
    transDate(v) {
      var dt = new Date(v);
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      var hour = dt.getHours();
      var minute = dt.getMinutes();
      var second = dt.getSeconds();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    checkDetail(row) {
      var _self = this;
      _self.dyId = row.id;
      _self.detailId.id = row.id;
      _self.$http.get("/check/dy/info?dyid=" + row.id).then(res => {
        if (res.success) {
          _self.checkDetailModal = true;
          _self.readonly = true;
          var data = res.data;
          if (_self.ifCheck == "已核查") {
            _self.queryCheck = data;
          } else if (_self.ifCheck == "未核查") {
            _self.queryCheck = {};
          }
          _self.queryPlus = {};
          _self.dataListPlus = data.bcjl;
          _self.queryDetail = data;
          var sailStatus = data.sailStatus;
          // console.log(sailStatus,"data");
          if (sailStatus == undefined) {
            _self.queryDetail.sailStatus = "";
          } else if (sailStatus == "0") {
            _self.queryDetail.sailStatus = "出航";
          } else if (sailStatus == "1") {
            _self.queryDetail.sailStatus = "返航";
          }
          if (data.postime == undefined) {
            _self.queryDetail.postime = "";
          } else {
            _self.queryDetail.postime = _self.transDate(data.postime * 1000);
          }
          var lat = this.cacuLonLat(parseInt(data.lat));
          var lon = this.cacuLonLat(parseInt(data.lon));
          if (data.lat == undefined) {
            _self.queryDetail.lat = "";
          } else {
            _self.queryDetail.lat = lat + "N";
          }
          if (data.lon == undefined) {
            _self.queryDetail.lon = "";
          } else {
            _self.queryDetail.lon = lon + "E";
          }
          var offline = data.offline;
          var outgroup = data.outgroup;
          var state = data.state;
          if (offline == "0") {
            offline = "非离线";
          } else {
            offline = "离线";
          }
          if (outgroup == "0") {
            outgroup = "非离编";
          } else {
            outgroup = "离编";
          }
          if (state == 0) {
            state = "未核查";
          } else {
            state = "核查";
          }
          _self.queryDetail.offline = offline;
          _self.queryDetail.outgroup = outgroup;
          _self.queryDetail.state = state;
          var vs = data.version + "";
          var year = vs.slice(0, 4);
          var month = vs.slice(4, 6);
          var day = vs.slice(6, 8);
          var time = vs.slice(8);
          _self.queryDetail.dydate = year + "-" + month + "-" + day;
          _self.queryDetail.dytime = time + ":00";
        //   console.log(data, "data");
          if (data.heading) {
            _self.queryDetail.heading = data.heading / 10 + "节";
          }
        }
      });
    },
    showExcelDetail() {
      window.open(
        this.$basePath +
          "/check/dy/exportListXls?query=" +
          encodeURI(JSON.stringify(this.query))
      );
    }
  },
  beforeMount() {
    this.query.key = this.$route.query.key;
    this.query.type = this.$route.query.type;
    this.query.wheres.mode = this.$route.query.mode;
    this.query.wheres.organid = this.$route.query.organid;
  },
  mounted() {}
};
</script>      
<style scoped>
.menuitem.ivu-menu-item {
  color: #2fa4e7;
  height: 30px;
  line-height: 30px;
  padding: 0;
}
</style>
                    
        
        
        