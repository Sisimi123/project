<template>
    <div>
        <!-- class="content-wrap transactionInpro" -->
        <!-- <div style="padding-left:10px;padding-top:10px;"> -->
            <Row class-name="searColumn">
                <data-table 
                ref="test" 
                :url="'/check/dxjb/query'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="handleEdit">
                    <div slot="search">
                        <Form :label-width="43" @submit.native.prevent>
                            <Row>
                                <Col span="3">
                                  <Form-item label="船名:">
                                      <Input v-model="query.shipname" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                  </Form-item>
                                </Col>
                                <Col span="3" style="margin-left:10px;">
                                  <Form-item label="状态:">
                                      <Select v-model="query.status" placeholder="全部" @on-change="searchPage(1)"  >
                                        <Option value="">全部</Option>
                                        <Option value="0">未审核</Option>
                                        <Option value="1">审核通过</Option>
                                        <Option value="2">审核不通过</Option>
                                      </Select>
                                  </Form-item>
                                </Col>
                                <Col span="4" style="margin-left:8px;">
                                    <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                    <Button @click="handleReset()" >重置</Button>
                                    <Button @click="addPage()" type="success" icon="ios-add">新增</Button>
                                </Col>
                                <Col span="2"  class-name="xlsupload">
                                  <MyUpload action="/check/dxjb/importXls"  
                                    :format="['xlsx','xls']"  
                                    :on-success="importXls"
                                        :on-format-error="handleFormatError"
                                        :show-upload-list="false">
                                        <Button type="error"  style="width:100%"  >导入</Button>
                                  </MyUpload>
                                  </Col>
                                  <Button type="success"  style="float:right;margin-top:0px;"  v-on:click="download">下载模版</Button>                    
                            </Row>
                        </Form>
                    </div>
                </data-table>
                </Row>

        <!-- 查看弹出窗 -->
            <Modal v-model="dxjbModal2"  :title="title"  width="800"  :mask-closable="false"  >
              <div class="ls_cbws">
                  <table cellpadding=0 cellspacing=0>
                    <tbody>
                      <tr>
                        <th>船名</th>
                        <td>
                          <!-- <Select v-model="dxjb.shipname" filterable remote :readonly="readOnly" placeholder="请输入关键词" :remote-method="searchShip" @change="selectShip" :loading="loading">
                            <Option v-for="option in shipOptions" :key="option" :label="option" style="width:90%" :value="option"> </Option>
                          </Select> -->
                          {{dxjb.shipname}}
                        </td>
                        <th>捕捞许可证编号</th>
                        <!-- <td><input type="text" class="fullline" v-model="dxjb.blxkh" :readOnly="readOnly"></td> -->
                        <td>{{dxjb.blxkh}}</td>
                      </tr>
                      <tr>
                        <th>所有人姓名</th>
                        <!-- <td><input type="text" class="fullline" v-model="dxjb.owner" :readOnly="readOnly"></td> -->
                        <td>{{dxjb.owner}}</td>
                        <th>作业类型</th>
                        <!-- <td><input type="text" class="fullline" v-model="dxjb.worktype" :readOnly="readOnly"></td> -->
                        <td>{{dxjb.worktype}}</td>
                      </tr>
                      <tr>
                        <th>双控功率</th>
                        <!-- <td><input type="text" class="fullline" v-model="dxjb.dpower" :readOnly="readOnly"></td> -->
                        <td>{{dxjb.dpower}}</td>
                        <th>实船功率</th>
                        <!-- <td><input type="text" class="fullline" v-model="dxjb.rpower" :readOnly="readOnly"></td> -->
                        <td>{{dxjb.rpower}}</td>
                      </tr>
                      <tr>
                        <th>多休时间</th>
                        <td colspan="3">
                            <!-- <Select style="width:90px" v-model="dxjb.multiMonths" :readonly="readOnly">
                              <Option v-for="item in monthOptions" :value="item" :key="item">{{item}}</Option>
                            </Select>--><input type="text" style="width:40px;border:none;text-align:center" v-model="dxjb.multiMonths" :readOnly="readOnly">
                            <label>月&nbsp;&nbsp;又</label> 
                            <!-- <Select style="width:90px" v-model="dxjb.multiDays"  :readonly="readOnly">
                              <Option v-for="item in dayOptions" :value="item" :key="item">{{item}}</Option>
                            </Select> --><input type="text" style="width:40px;border:none;text-align:center" v-model="dxjb.multiDays" :readOnly="readOnly">
                            <label>天</label>
                        </td>
                      </tr>
                      <tr>
                        <th>多休减捕方案</th>
                        <td colspan="3">
                          <div class="ls_xydd" >
                          <Row style="width:99%;">
                          <Form :label-width="40">
                              <Col span="4">
                                  <span class="ztss">渔休经纬度：</span>
                              </Col>
                              <Col span="2">
                                  <span class="ztss">经度:</span>
                              </Col>
                              <Col span="4">
                                  <!-- <Input  v-model="dxjb.jd" readOnly class="kdbs" ></Input> -->
                                  {{dxjb.jd}}
                              </Col>
                              <Col span="1">
                                &nbsp;
                              </Col>
                              <Col span="2">
                                  <span class="ztss">纬度:</span>
                              </Col>
                              <Col span="4">
                                  <!-- <Input readOnly v-model="dxjb.wd" class="kdbs"></Input> -->
                                  {{dxjb.wd}}
                              </Col>
                          </Form>
                        </Row>
                          </div>
                          <div class="ls_xytime">
                            <div class="ls_xy">休渔时间：</div>
                            <div class="ls_xyjj">
                              <div style="float:left">从<Date-picker  :readonly="true" style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s1" confirm  @on-ok="checkDate('s1','e1')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker :readonly="true"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e1" confirm  @on-ok="checkDate('s1','e1')"></Date-picker></div>
                              <div style="clear:both;"></div>
                              <div style="float:left">从<Date-picker  :readonly="true" style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s2" confirm  @on-ok="checkDate('s2','e2')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker  :readonly="true"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e2" confirm  @on-ok="checkDate('s2','e2')"></Date-picker></div>
                              <div style="clear:both;"></div>
                              <div style="float:left">从<Date-picker  :readonly="true" style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s3" confirm  @on-ok="checkDate('s3','e3')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker  :readonly="true"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e3" confirm  @on-ok="checkDate('s3','e3')"></Date-picker></div>
                              <div style="clear:both;"></div>
                              <div style="float:left">从<Date-picker  :readonly="true" style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s4" confirm  @on-ok="checkDate('s4','e4')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker  :readonly="true"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e4" confirm  @on-ok="checkDate('s4','e4')"></Date-picker></div>
                            </div>
                          </div>
                          <!-- <div style="text-align:right;">申报人：<input style="width:100px;margin-right:30px;" type="text" v-model="dxjb.sbr" :readOnly="readOnly"></div> -->
                          <div style="text-align:right;margin-right:52px">申报人：{{dxjb.sbr}}</div>
                          <div style="text-align:right;">日期:<Date-picker :readonly="true"  style="width: 150px;padding-right:20px;" placeholder="选择日期"  type="date"  format="yyyy年MM月dd日" v-model="dxjb.sbsj" ></Date-picker></div>
                          
                        </td>
                      </tr>
                      <tr>
                        <th>备注</th>
                        <td colspan="3">
                          <!-- <input type="text" class="fullline" V-model="dxjb.note" :readOnly="readOnly"> -->
                          {{dxjb.note}}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div slot="footer">
                       <Button @click="dxjbModal2=false">关闭</Button>                       
                </div>
            </Modal>
          
        <!-- 新增 -->
           <Modal v-model="dxjbModal" style="margin-top:40px" :title="title"  width="800"    :mask-closable="false" >
            <Form ref="dxjb" :label-width="80" :model="dxjb"  :rules="infoRules" >
              <Row>
                <Col span="12">
                  <FormItem :label-width="90" label="渔船名:"  >
                     <Select  v-model="dxjb.shipname" :filterable=true v-show="dxjb.status!=0||baoCun==1" :remote=true  :readonly="readOnly" placeholder="请输入关键词" :remote-method="searchShip" @on-change="selectShip"  style="width:280px;">
                        <Option  v-for="item in shipOptions" :key="item"  :label="item"  :value="item" >{{item}}</Option>
                     </Select>
                     <Input  v-model="dxjb.shipname" :readonly="readOnly" style="width:95%" v-show="dxjb.status==0&&baoCun!=1"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem :label-width="90" label="捕捞许可证:" prop="blxkh">
                    <Input placeholder="请输入捕捞许可证:" v-model="dxjb.blxkh" :readonly="readOnly"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem  :label-width="90" label="所有人姓名" prop="owner" >
                    <Input v-model="dxjb.owner" placeholder="请输入所有人姓名" style="width:280px;" :readonly="readOnly"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="作业类型:" :label-width="90" prop="worktype" >
                    <Input placeholder="请输入作业类型" v-model="dxjb.worktype" :readonly="readOnly"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="双控功率">
                    <Input v-model="dxjb.dpower" :readonly="readOnly" placeholder="请输入双控功率"></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="实船功率:">
                    <Input placeholder="请输入实船功率" v-model="dxjb.rpower" :readonly="readOnly"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="6" style="postion:releative;">
                  <FormItem label="多休时间:">
                    <Select v-model="dxjb.multiMonths" v-show="dxjb.status!=0||baoCun==1" :readonly="readOnly" placeholder="多休月数">
                      <Option v-for="item in monthOptions" :value="item" :key="item">{{item}}</Option>
                    </Select>
                     <Input  v-model="dxjb.multiMonths" :readonly="readOnly" style="width:95%" v-show="dxjb.status==0&&baoCun!=1"></Input>
                  </FormItem>
                  <label style="position:absolute;top:10px;;right:-30px;">个月</label>
                </Col>
                <Col span="6" style="postion:releative;">
                  <FormItem>
                    <Select v-model="dxjb.multiDays"   v-show="dxjb.status!=0||baoCun==1" :readonly="readOnly" placeholder="多休天数">
                      <Option v-for="item in dayOptions" :value="item" :key="item">{{item}}</Option>
                    </Select>
                     <Input  v-model="dxjb.multiDays" :readonly="readOnly" style="width:95%" v-show="dxjb.status==0&&baoCun!=1"></Input>
                  </FormItem>
                  <label style="position:absolute;top:10px;;right:-20px;">天</label>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <FormItem label="渔休地点">
                    <Input v-model="dxjb.xydz" :readonly="readOnly" v-show="dxjb.status!=0||baoCun==1">
                      <Button slot="append"  icon="location"   @click="openAMap"></Button>
                    </Input>
                    <Input  v-model="dxjb.xydz" :readonly="readOnly" style="width:100%" v-show="dxjb.status==0&&baoCun!=1"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                  <FormItem label="渔休经度">
                    <Input v-model="dxjb.jd" placeholder="点击地图获取"  :readonly="readOnly"> </Input>
                  </FormItem>
                </Col>
                <Col span="11">
                  <FormItem label="渔休纬度">
                    <Input v-model="dxjb.wd" placeholder="点击地图获取"  :readonly="readOnly"></Input>
                  </FormItem>
                </Col>
                </Row>
              <Row>
                <Col span="12">
                  <FormItem :label-width="100" label="渔休开始时间:">
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s1"
                      confirm @on-ok="checkDate('s1','e1')"></Date-picker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="结束时间:">
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e1"
                      confirm @on-ok="checkDate('s1','e1')"></Date-picker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem :label-width="100">
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s2" confirm @on-ok="checkDate('s2','e2')"></Date-picker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e2" confirm @on-ok="checkDate('s2','e2')"></Date-picker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem :label-width="100">
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s3" confirm @on-ok="checkDate('s3','e3')"></Date-picker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e3" confirm @on-ok="checkDate('s3','e3')"></Date-picker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem :label-width="100">
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s4" confirm @on-ok="checkDate('s4','e4')"></Date-picker>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem>
                    <Date-picker class="yxsj" :readonly="readOnly" style="width:250px;" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e4" confirm @on-ok="checkDate('s4','e4')"></Date-picker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <FormItem label="申报人">
                    <Input v-model="dxjb.sbr" :readonly="readOnly" placeholder="请输入申报人">
                      <</Input>
                  </FormItem>
                </Col>
                <Col span="12">
                  <FormItem label="申报时间">
                    <Date-picker class="yxsj" :readonly="readOnly" placeholder="选择日期" type="date" format="yyyy年MM月dd日" v-model="dxjb.sbsj"></Date-picker>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="备注">
                    <Input v-model="dxjb.note" :readonly="readOnly" placeholder="备注">
                      <</Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <div slot="footer">
              <!-- 状态码  0:没有审批 1 已经审批 2审批没有通过 -->
              <Button @click="close">关闭</Button>  
              <Button type="primary" @click="shenPi('2')" v-show="baoCun==0">审核不通过</Button>
              <Button type="primary" @click="shenPi('1')" v-show="baoCun==0">审核通过</Button>  
              <Button type="primary" @click="save('dxjb')" v-show="baoCun==2&&dxjb.status==2">修改</Button>
              <Button type="primary" @click="save('dxjb')" v-show="baoCun==1">保存</Button>
            </div>
            </Modal>

        <amapModal v-model="showAMapModal" @on-ok="selectAMap" ></amapModal>
    </div> 
</template>
<script>
import { isNull } from "@/libs/common.js";
import amapModal from "@/views/components/aMap/amapModal.vue";
import MyUpload from '@/views/components/Upload/MyUpload.vue';
import util from '../../../libs/util';
var dxjb={
    id: "",
        uid: "", //执法人id
        deptId: "", //执法人部门id
        puserId: "", //公众号id
        //	 areacode:"",//地区
        shipname: "", //
        blxkh: "", //捕捞许可号
        owner: "", //所有人
        sbr: "", //申报人
        worktype: "", //作业类型
        dpower: "", //双控功率
        rpower: "", //实船功率
        //多休地点有三个字段组成
        city: "", // 城市
        village: "", //区县
        portname: "", //港口
        multiMonths: "", //多休 多少个月
        multiDays: "", //多少个天
        sbsj: "", //申报时间
        lastUpdate: "", //审批时间（更新）
        createDate: "",
        note: "", //备注
        status: "", //状态码  0:没有审批 1 已经审批通过 2审批没有通过
        xydz: "", //休渔地址
        jd: "", //经度
        wd: "", //纬度
        s1: "", //第一个日期开始
        e1: "", //第一个日期结束
        s2: "",
        e2: "",
        s3: "",
        e3: "",
        s4: "",
        e4: ""
};
export default {
  name: "dxjb",
  components: {
    amapModal,
    MyUpload
  },
  data() {
    return {
      // url:this.$basePath+"/check/dxjb/importXmls", //导入URL,
      dxjbList: [],
      height: "450",
      totalNum:1,  
    
     
        page: 1,
        size: 10,
        shipname: "",
        status: "",
        baoCun: 0,
        query:{
            page: 1,
            size: 10,
            status: "",
            shipname: "",
        },
      readOnly: false,
      isLoading: true,
      loading: false,
      loadingCase: true,
      showAMapModal: false, //高德地图组件
      shipOptions: [],
      infoRules: {
        //验证
        shipname: [
          { required: true, message: "请输入渔船名", trigger: "blur" }
        ],
        owner: [{ required: true, message: "请输入所有人", trigger: "blur" }],
        blxkh: [{ required: true, message: "请输入许可证号", trigger: "blur" }],
        worktype: [
          { required: true, message: "请输入作业类型", trigger: "blur" }
        ]
      },
      monthOptions: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
      ],
      dayOptions: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31"
      ],
      title: "",
      curLineStatus: "",
      dxjbModal2: false,
      dxjbModal: false,
      dxjb: {
      
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 150,
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipname"
        },
        {
          title: "状态",
          key: "status",
          render: function(h, params) {
            var status = params.row.status;
            if (status == "1") {
              return h("span", "审核通过");
            } else if (status == "0") {
              return h("span", "未审核");
            } else if (status == "2") {
              return h("span", "审核不通过");
            }
          }
        },
        {
          title: "上传时间",
          key: "createTime"
        },
        {
          title: "操作",
          key: "id",
          width: 90,
          align: "center",
          render: (h, params) => {
            var buttons = [];
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
                    click: () => {
                      this.title = "查看编辑"; //状态码  0:没有审批 1 已经审批通过  2审批没有通过
                      this.baoCun = 0;

                      // if (
                      //   params.row.status == "0" ||
                      //   params.row.status == "1"
                      // ) {
                        this.readOnly = true;
                      // } else {
                      //   this.readOnly = false;
                      // }

                      this.chaxun(params.row);
                    }
                  }
                },
                "查看"
              )
            );
            return h("div", buttons);
          }
        }
      ]
    };
  },
  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(dxjb)); //深拷贝
    }
  },
  methods: {
    initSearch() {
        this.$refs.test.initSearch();
    },
    handleReset() {
        this.query.page = 1;
        this.query.size = 10;
        this.query.status = "";
        this.query.shipname = "";
        this.initSearch();
    },
    // ======================= =========================== =========================== 上 传 下 载 =========================== =========================== ===========================
    //下载模板
    download() {
      window.open(this.$basePath+'/static/dxjbmb.xls');            
    },
    changePage(curPage) {
        this.query.page = curPage;
        this.searchPage();
    },
      //导入
    importXls(response, file, fileList){
      if(response.success){
        this.$Message.info("导入成功！");
        this.changePage(this.current);
      }else{
        this.$Message.error(response.description);
      }
    },
    handleFormatError:function(file) {
          this.$Message.error("文件格式不支持！");
    },
    // ======================= =========================== =========================== 列 表 =========================== =========================== ===========================
    searchPage(value) {
      if (value == 1) {
        this.query.curPage = 1;
      }
      this.initSearch();
    },
    // ======================= =========================== =========================== 新 增 =========================== =========================== ===========================
    addPage() {
      this.title = "数据增加";
      this.readOnly = false;
      this.dxjb=JSON.parse(JSON.stringify(dxjb))
      // for (const key in this.dxjb) {
      //   this.dxjb[key] = "";
      // }
      this.shipOptions = [];
      this.dxjbModal = true;
      this.baoCun = 1;
    },
    // 渔休时间比较
    checkDate: function(begin, end) {
      var d1 = Date.parse(this.dxjb[begin]);
      var d2 = Date.parse(this.dxjb[end]);
      if (d1 > d2) {
        this.dxjb[begin] = "";
        this.dxjb[end] = "";
        this.$Message.error("结束日期不能早于开始日期");
      }
    },
    // 打开地图
    openAMap() {
      this.showAMapModal = true;
    },
    selectAMap(lon, lat, address) {
      this.dxjb.xydz = address;
       var jdDegrees=lon.toString().split(".")[0];     //度
        var wdDegrees=lat.toString().split(".")[0];  
        var jdMin=((lon-jdDegrees)*60).toString();  //分
        var wdMin=((lat-wdDegrees)*60).toString();  
        var jdSecond = ((jdMin-jdMin.split(".")[0])*60).toString();   //秒
        var wdSecond = ((wdMin-wdMin.split(".")[0])*60).toString();   

      this.dxjb.jd = jdDegrees+"度"+jdMin.split(".")[0]+"分"+jdSecond.split(".")[0]+"秒";;
      this.dxjb.wd = wdDegrees+"度"+wdMin.split(".")[0]+"分"+wdSecond.split(".")[0]+"秒";;
    },

    save(dxjb) {
      this.$refs["dxjb"].validate(valid => {
        if (valid) {
            if(this.dxjb.createDate==""||this.dxjb.createDate==null){
              this.dxjb.createDate=new Date();
            }
            console.log(this.dxjb.createDate)
            let params = new URLSearchParams();
            console.log(this.dxjb)
            params.append("_model", JSON.stringify(this.dxjb));
            this.$http
              .post("check/dxjb/xiugai", params)
              .then(response => {
                this.dxjbModal = false;
                this.initSearch();
              })
              .catch(function(error) {
                console.log(error);
              });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },

    searchShip(shipName) {
      if (shipName == null || shipName == "") {
        return;
      }
      this.loading = true;
      this.loadingCase = false;
      this.$http
      .get("/check/dxjb/searchShip", {
          params: {
            query: shipName
          }
        })
      .then(res => {
        this.shipOptions = res.data;
      })
      .catch(function(error) {
          console.log(error);
      });
    },

    selectShip(shipname) {
      if (isNull(shipname)) {
        return;
      }
      this.$http
        //请求路径
        .get("/check/dxjb/selectShip", {
          params: {
            shipname: shipname
          }
        })
        .then(res => {
          console.log(res);
          this.dxjb.blxkh = res.data.blxkh;
          this.dxjb.dpower = res.data.dpower;
          this.dxjb.owner = res.data.owner;
          this.dxjb.worktype = res.data.worktype;                        
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    close: function() {
      this.dxjbModal = false;
      this.readOnly = false;
      this.clear(this.dxjb);
    },
    // ======================= =========================== =========================== 查 看 =========================== =========================== ===========================
    handleEdit(msg){
      this.baoCun = 2;
      if(msg.status=="2"){
        this.readOnly=false;
      }else{
        this.readOnly=true;
      }
      this.chaxun(msg);
    },
    chaxun(index) {
      this.curLineStatus = index.status;
      if (this.curLineStatus == "1") {
        this.dxjbModal2 = true;
      } else {
        // this.baoCun=2;
        this.dxjbModal = true;
      }
      this.shipOptions = [index.shipname];
      

      //经纬度转换      
        var jdDegrees=index.jd.split(".")[0];     //度
        var wdDegrees=index.wd.split(".")[0];  
        var jdMin=((index.jd-jdDegrees)*60).toString();  //分
        var wdMin=((index.wd-wdDegrees)*60).toString();  
        var jdSecond = ((jdMin-jdMin.split(".")[0])*60).toString();   //秒
        var wdSecond = ((wdMin-wdMin.split(".")[0])*60).toString();   
        
      // this.dxjb.jd=jdDegrees+"度"+jdMin.split(".")[0]+"分"+jdSecond+"秒";
      // this.dxjb.wd=wdDegrees+"度"+wdMin.split(".")[0]+"分"+wdSecond+"秒";
      var str="12.2323";
      console.log(((index.jd-jdDegrees)*60).toString())
      this.$nextTick(function() {
        this.dxjb = index;
        if(this.dxjb.jd.indexOf(".")!=-1||this.dxjb.wd.indexOf(".")!=-1){
            this.dxjb.jd=jdDegrees+"度"+jdMin.split(".")[0]+"分"+jdSecond.split(".")[0]+"秒";
            this.dxjb.wd=wdDegrees+"度"+wdMin.split(".")[0]+"分"+wdSecond.split(".")[0]+"秒";
        }else{
              console.log("有汉字！")
        }
        
      });
    },
    clear() {
      this.curLineStatus = "";
      this.dxjb=JSON.parse(JSON.stringify(dxjb))
      // for (const key in this.dxjb) {
      //   this.dxjb[key] = "";
      // }
    },

    shenPi(value) {
      this.dxjb.status = value;
      var dxjb = this.dxjb;
      this.$refs["dxjb"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          // params.append("id", dxjb.id);
          // params.append("status", dxjb.status);
          params.append("_model", JSON.stringify(dxjb));
          this.$http
            .post("/check/dxjb/shenpi", params)
            .then(response => {
              this.dxjbModal = false;
              this.initSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    }
  },
  mounted: function() {
    // this.spqx = "true"; //权限
    // this.searchPage();
  }
};
</script>

<style lang="less" scoped>
.xlsupload{
  float:right;
  text-align:center;
  /* text-indent:5px; */
  width:5%;
}
.el-input__inner {
  height: 32px;
  border: none;
  outline-style: none;
}

.text-required {
  display: inline-block;
  color: red;
}

.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}

.fk-title {
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
  background: #f8f8f9;
}

.fk-content {
  /* 				height:45px; */
  /* 				line-height:45px; */
  /* 				text-indent:20px; */
  margin: 10px 0px;
}

.fk-lyr {
  font-weight: bold;
  text-indent: 20px;
  float: left;
  /* 				width%; */
}

.fk-text {
  float: left;
  width: 80%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 20px;
}

.fk-img {
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 130px;
  height: 120px;
}

p.mark {
  font-size: 12px;
  margin: 0 auto;
}

input:readonly {
  border: none;
  background-color: #fff;
  color: #aca899;
}

.ls_cbws table {
  width: 100%;
  border-left: 1px solid #666;
  border-top: 1px solid #666;
}

.ls_cbws table td,
.ls_cbws table th {
  border-bottom: 1px solid #666;
  border-right: 1px solid #666;
  font-weight: normal;
  color: #333;
  font-size: 14px;
  text-indent: 4px;
  padding: 6px 0;
}

.ls_cbws table th {
  text-align: left;
  width: 20%;
}
.ls_cbws table select {
  width: 100%;
}
.ls_cbws table td {
  width: 30%;
}

.ls_xydd {
  margin: 30px 0 10px;
  overflow: hidden;
  position: relative;
}

.clearfix:after {
  display: block;
  clear: both;
  /* content: ""; */
  visibility: hidden;
  height: 0;
}

.clearfix {
  zoom: 1;
}

.ls_xydd em {
  float: left;
  font-style: normal;
}

.ls_xydd input {
  border: none;
  background-color: transparent;
  outline: none;
  height: 21px;
  line-height: 21px;
  font-size: 14px;
  float: left;
  color: #333;
  width: 80%;
}

.ls_xytime {
  overflow: hidden;
}

.ls_xy {
  float: left;
}

.ls_xyjj {
  float: left;
}

.ls_xysj input {
  border: none;
  background-color: transparent;
  outline: none;
  height: 21px;
  line-height: 21px;
  font-size: 14px;
  color: #333;
  width: 40px;
  text-align: center;
  border-bottom: 1px solid #333;
  margin-bottom: 14px;
}

.ls_sbr {
  float: right;
  margin-right: 20px;
}

.ls_sbr input {
  border: none;
  background-color: transparent;
  outline: none;
  height: 21px;
  line-height: 21px;
  font-size: 14px;
  color: #333;
  width: 120px;
}

.ls_nyr {
  float: right;
  width: 100%;
  text-align: right;
  margin-right: 20px;
}

.ls_nyr input {
  border: none;
  background-color: transparent;
  outline: none;
  height: 21px;
  line-height: 21px;
  font-size: 14px;
  color: #333;
  width: 40px;
}

input.fullline {
  width: 98%;
}

.dxinput {
  width: 30px;
  height: 100%;
  text-align: center;
}

.rq2 {
  border: none;
  width: 100px !important;
  background-image: url();
}
</style>
