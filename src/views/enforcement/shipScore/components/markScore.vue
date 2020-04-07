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
        <div slot="footer" >
            <Button  @click="handleCancel">返回</Button>
            <Button type="primary"  @click="handleOk">确认</Button>
        </div>

        <div>
              <Form :label-width="100" :model="info" :rules="infoRules" ref="info">
                <div>
                  <fieldset class="title">
                      <legend>*渔船信息</legend>
                  </fieldset>
                  <Row>
                      <Col span="8">
                          <Form-item label="渔船名:" prop="shipName">
                              <Input v-model="info.shipName">
                                  <Button slot="append"  @click="handleSelectShip()" >查找</Button>
                              </Input> 
                          </Form-item>
                      </Col>
                      <Col span="8">
                          <Form-item label="所属地区:" prop="area">
                          <!-- <Form-item label="所属地区:" prop="iviewArea"> -->
                              <!-- <al-cascader  v-model="iviewArea" level="2" searchable=true @on-change="iviewAreaChange"></al-cascader > -->
                              <Input v-model="info.area" @on-focus="selectArea"></Input> 
                          </Form-item>
                      </Col>
                      <Col span="8">
                          <Form-item label="捕捞许可证号:">
                              <Input v-model="info.fishCertificate"/>
                          </Form-item>
                      </Col>
                  </Row>
                </div>

                <div>
                  <fieldset class="title">
                      <legend>
                          *责任人信息
                      </legend>
                  </fieldset>
                      <div>
                        <Row>
                          <Col span="8">
                              <Form-item label="船东:" prop="shipownerName">
                                  <Input v-model="info.shipownerName">
                                    <Button slot="append"  @click="handleSelectPerson(0)" >查找</Button>
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="船东身份证号:" prop="shipownerIdCard">
                                  <Input v-model="info.shipownerIdCard" />
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="船东手机号:" prop="shipownerTel">
                                  <Input v-model="info.shipownerTel" />
                              </Form-item>
                          </Col>

                      </Row>
                      <Row>
                          <Col span="8">
                              <Form-item label="船长:" prop="captainName">
                                  <Input v-model="info.captainName">
                                    <Button slot="append"  @click="handleSelectPerson(1)" >查找</Button>
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="船长身份证号:" prop="captainIdCard">
                                  <Input v-model="info.captainIdCard"/>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="船长手机号:" prop="captainTel">
                                  <Input v-model="info.captainTel"/>
                              </Form-item>
                          </Col>
                      </Row>
                      <!-- <Row>
                          <Col span="12">
                              <Form-item label="船长职务证书编号:" prop="captainCNumber">
                                  <Input v-model="info.captainCNumber"/>
                              </Form-item>
                          </Col>
                      </Row> -->
                      <Row>
                          <Col span="8">
                              <Form-item label="公司名:" prop="companyName">
                                  <Input v-model="info.companyName">
                                    <Button slot="append"  @click="handleSelectPerson(2)" >查找</Button>
                                  </Input>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="企业注册号:" prop="companyIdCard">
                                  <Input v-model="info.companyIdCard"/>
                              </Form-item>
                          </Col>
                          <Col span="8">
                              <Form-item label="负责人手机号:" prop="companyTel">
                                  <Input v-model="info.companyTel"/>
                              </Form-item>
                          </Col>
                      </Row>
                  </div>

                </div>

                <div>
                    <fieldset class="title">
                        <legend>*涉及记分事件信息</legend>
                        <Button size="small"  @click="handleSelectEvent()" type="error">选择记分条款+</Button>
                    </fieldset>
                    <template v-for="(item,index) in info.matter">
                        <div :key="item.id">
                            <div>
                                <Row>
                                    <Col span="12">
                                        <Form-item :label="'涉嫌'+(index+1)+':'" >
                                            <Input v-model="item.title" type="textarea" :autosize="{minRows: 1,maxRows: 3}" readonly></Input> 
                                        </Form-item>
                                    </Col>
                                    <Col span="4">
                                        <Form-item label="船东记分:" >
                                          <Input v-model="item.shipownerScore"  readonly>
                                            <span slot="append">分</span>
                                          </Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="4">
                                        <Form-item label="船长记分:" >
                                          <Input v-model="item.captainScore"  readonly>
                                            <span slot="append">分</span>
                                          </Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="4">
                                        <Form-item label="公司记分:" >
                                          <Input v-model="item.companyScore"  readonly>
                                            <span slot="append">分</span>
                                          </Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                  <Form-item label="附件:" >
                                  
                                  <div class="markScore-upload-list" v-for="item in uploadList[index]" v-bind:key="item.id">
                                        <img :src="item.url">
                                        <div class="markScore-upload-list-cover">
                                            <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
                                        </div>
                                  </div>
                                  <Upload
                                    :data=actionData
                                    ref="upload"
                                    :show-upload-list="false"
                                    :on-success="(response, file, fileList) => handleSuccess(response, file, fileList,index)"
                                    :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                                    :format="['jpg','jpeg','png']"
                                    :with-credentials="true"
                                    :max-size="20480"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :before-upload="handleBeforeUpload"
                                    multiple
                                    type="drag"
                                    :action="actionUrl"
                                    style="display: inline-block;width:100px;">
                                    <div style="width: 100px;height:80px;line-height: 80px;">
                                      <Icon type="android-add-circle" size="50" style="line-height:80px"></Icon>
                                    </div>
                                  </Upload>
                                  
                                  </Form-item>
                                </Row>
                            </div>
                        </div>
                        </template>
                    <Row>
                        <Col span="6">
                            <Form-item label="记录人员:" >
                                <Input v-model="info.noteTaker" readonly/>
                            </Form-item>
                        </Col>
                        <Col span="6">
                            <Form-item label="违反时间:" prop="noteTime">
                                <DatePicker v-model="info.noteTime" type="datetime" show-week-numbers :options="options"  placeholder="请选择时间" placement="top" ></DatePicker>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="船东总记分:" >
                                <Input v-model="info.shipownerScore" readonly>
                                  <span slot="append">分</span>
                                </Input>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="船长总记分:" >
                                <Input v-model="info.captainScore" readonly>
                                  <span slot="append">分</span>
                                </Input>
                            </Form-item>
                        </Col>
                        <Col span="4">
                            <Form-item label="公司总记分:" >
                                <Input v-model="info.companyScore" readonly>
                                  <span slot="append">分</span>
                                </Input>
                            </Form-item>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                            <Form-item label="备注说明:">
                                <Input :autosize="{minRows: 2,maxRows: 3}" v-model="info.remarks"  type="textarea"/>
                            </Form-item>
                        </Col>
                    </Row>
                </div>
              </Form>
        </div>
        
    </Modal>

    <Modal :width="720" v-model="status.selectShip" title="渔船查询" :scrollable=true>
        <div slot="footer" >
            <Button  @click="status.selectShip = false">关闭</Button>
        </div>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span>渔船名：</span>
                <Input v-model="query.wheres.nametheShip_like" @on-keydown.enter="selectShip(1)"  style="width:30%" placeholder="请输入..."></Input>
                <Button style="margin-left:5px" @click="selectShip(1)" type="info" icon="ios-search" shape="circle">搜索</Button>
              </div>
            </Row>
            <Row >
              <div style="margin-top:10px">
                <Table :loading="status.selectShiploading" :columns="columnsShip" :data="selectShipList" border :height="280"></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom">
                  <Page show-total :total="totalNum" show-sizer 
                placement=top @on-page-size-change="pageSizeChange" :page-size="query.size" 
                :current="query.page" @on-change="changePage" ></Page>
              </div>
            </Row>
          </Col>
        </Row>
    </Modal>

    <Modal :width="720" v-model="status.selectPerson" title="责任人查询" :scrollable=true>
        <div slot="footer" >
            <Button  @click="status.selectPerson = false">关闭</Button>
        </div>
        <Row>
          <Col span="24">
            <Row>
              <div>
                <span>名称：</span>
                <Input v-model="queryPerson.wheres.name"  style="width:30%" placeholder="请输入..."></Input>
                <Button style="margin-left:5px" @click="selectPerson()" type="info" icon="ios-search" shape="circle">搜索</Button>
              </div>
            </Row>
            <Row>
              <div style="margin-top:10px">
                <Table :loading="status.selectPersonloading" :columns="columnsPerson" :data="selectPersonList" border :height="280"></Table>
              </div>
            </Row>
            <Row>
              <div class="bottom">
                  <Page show-total :total="totalNumA" show-sizer 
                placement=top @on-page-size-change="pageSizeChangeA" :page-size="queryPerson.size" 
                :current="queryPerson.page" @on-change="changePageA" ></Page>
              </div>
            </Row>
          </Col>
        </Row>
    </Modal>

    <pic v-model="imgVisible" :img="imgUrl"></pic>

    <Modal v-model="status.showArea" width="300" title="区域选择" :scrollable=true :mask-closable="true">
        <div style="height:300px; overflow: auto">
            <Tree :data="areaTree" @on-select-change="selectedArea"></Tree>
        </div>
    </Modal>

    <Modal v-model="status.selectEvent" width="630" title="条款选择" @on-ok="selectedEvent()" :scrollable=true :mask-closable="true">
        <div style="width:600px; overflow: auto">
            <Tree :data="eventTree" show-checkbox @on-check-change="onCheckChange"></Tree>
        </div>
    </Modal>
    <selectShipModal v-model="baseShipModal.show"  :inputShipName="inputShipName"  @on-select-ship="onSelectShip"></selectShipModal>
</div>
</template>

<script>
import * as validate from "../../../validateRule/validate.js";
import pic from "@/views/components/pic/pic.vue";
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

export default {
  name: "markScore",
  components: {
    pic,
    selectShipModal
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
      default: "记分"
      //default: ""
    },
    width: {
      type: [Number, String],
      default: 1080
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
      default: "vertical-center-modal"
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
    },
    //-----------------------------------------------
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    const v_shipName = (rule, value, callback) => {
      if (
        this.isEmpty(value) &&
        (this.info.shipownerScore > 0 || this.info.captainScore > 0)
      ) {
        callback(new Error("非仅公司记分场景,渔船名必填"));
      }
      callback();
    };
    // const v_iviewArea = (rule, value, callback) => {
    //   if (this.isEmpty(value) || value.length != 3 || this.isEmpty(value[2])) {
    //     callback(new Error("请选择船籍港"));
    //   }
    //   callback();
    // };
    const v_shipowner_name = (rule, value, callback) => {
      if (this.info.shipownerScore > 0 && value == "") {
        callback(new Error("存在船东记分,请输入船东姓名"));
      }
      callback();
    };
    const v_shipowner_sfz = (rule, value, callback) => {
      if (this.info.shipownerScore > 0) {
        if (value == "") {
          callback(new Error("存在船东记分,请输入船东身份证号"));
        } else if (
          !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
            value
          )
        ) {
          callback(new Error("请输入有效的身份证号"));
        }
      }
      callback();
    };
    const v_captain_name = (rule, value, callback) => {
      if (this.info.captainScore > 0 && value == "") {
        callback(new Error("存在船长记分,请输入船长姓名"));
      }
      callback();
    };
    const v_captain_sfz = (rule, value, callback) => {
      if (this.info.captainScore > 0) {
        if (value == "") {
          callback(new Error("存在船长记分,请输入船长身份证号"));
        } else if (
          !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
            value
          )
        ) {
          callback(new Error("请输入有效的身份证号"));
        }
      }
      callback();
    };
    const v_company_name = (rule, value, callback) => {
      if (this.info.companyScore > 0 && value == "") {
        callback(new Error("存在公司记分,请输入公司名"));
      }
      callback();
    };
    const v_company_sfz = (rule, value, callback) => {
      if (this.info.companyScore > 0) {
        if (value == "") {
          callback(new Error("存在公司记分,请输入企业注册号"));
        }
      }
      callback();
    };

    const v_phone = (rule, value, callback) => {
      if (value == "" || value == undefined || value == null) {
        callback();
      } else {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value) && !/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value)) {
          callback(new Error("请输入有效联系电话"));
        } else {
          callback();
        }
      }
    };
    return {
      options: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return new Date();
            },
            onClick: picker => {
              // this.$Message.info('Click today');
            }
          },
          {
            text: "昨天",
            value() {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              return date;
            },
            onClick: picker => {
              // this.$Message.info('Click yesterday');
            }
          }
        ]
      },
      iviewArea: [],
      visible: false,
      info: {
        shipName: "", // 涉及渔船名
        area: "", // 船籍港
        fishCertificate: "", // 捕捞许可证

        shipownerName: "", // 船东姓名
        shipownerIdCard: "", // 船东身份证号
        shipownerTel: "", // 船东联系电话
        shipownerScore: 0, // 船东本次记分/消分 数值

        captainName: "", // 船长姓名
        captainIdCard: "", // 船长身份证号
        captainTel: "", // 船长联系电话
        captainCNumber: "", // 船长证书编号（船长职务证书）
        captainScore: 0, // 船长本次记分/消分 数值

        companyName: "", // 公司名
        companyIdCard: "", // 公司注册号
        companyTel: "", // 公司联系电话
        companyScore: 0, // 公司本次记分/消分 数值

        noteTaker: "", // 记录人
        noteTakerTel: "", // 记录電話
        noteTime: "", // 违反时间
        // operatingType: "", // 操作类型  0 消分；1 记分
        remarks: "", // 备注说明

        matter: []
      },
      infoRules: {
        shipName: [{ validator: v_shipName, trigger: "change" }],
        shipownerName: [{ validator: v_shipowner_name, trigger: "change" }],
        shipownerIdCard: [{ validator: v_shipowner_sfz, trigger: "change" }],
        captainName: [{ validator: v_captain_name, trigger: "change" }],

        captainIdCard: [{ validator: v_captain_sfz, trigger: "change" }],
        companyName: [{ validator: v_company_name, trigger: "change" }],
        companyIdCard: [{ validator: v_company_sfz, trigger: "change" }],

        shipownerTel: [{ validator: v_phone, trigger: "blur" }],
        captainTel: [{ validator: v_phone, trigger: "blur" }],
        companyTel: [{ validator: v_phone, trigger: "blur" }],
        area: [{required: true, type: 'string', message: '请选择所属地区', trigger: 'change'}],
        noteTime: [{required: true, type: 'date', message: '请选择时间', trigger: 'change'}],
      },
      selectedPersonType:"",
      status: {
        selectEvent: false,
        selectShip: false,
        selectPerson: false,
        selectShiploading: false,
        selectPersonloading: false,
        showArea: false,
        showAreaLoading: true,
      },
      eventTree: [],
      areaTree: [],
      treeQuery: {
        key: "getScoreItemTreeWithScore"
      },
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: "",
          codefishingArea_in: ""
        },
        orders: "intfUpdateTime desc"
      },
      queryPerson:{
          key:'getPage',
          page:1,
          size:10,
          wheres:{
              name:"",
          },
          orders:"updateTime desc"
      },
      totalNum: 1,
      
      columnsShip: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          key: "nametheShip",
          title: "渔船名称",
          align: "center"
        },
        {
          key: "namevesselOwner",
          title: "渔船所有人",
          align: "center"
        },
        {
          title: "选择",
          key: "id",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.selectedShip(params.row);
                  }
                }
              },
              "确认"
            );
          }
        }
      ],
      totalNumA: 1,
      columnsPerson: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          key: "name",
          title: "名称",
          align: "center"
        },
        {
          key: "idCard",
          title: "证件号",
          align: "center"
        },
        {
          title: "选择",
          key: "id",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.selectedPerson(params.row);
                  }
                }
              },
              "确认"
            );
          }
        }
      ],
      selectShipList: [],
      selectPersonList: [],
      shipOptions: [],
      noteTime: "",
      areas: [],
      uploadList: [],
      actionUrl: this.$basePath + "/$admin/attachs/",
      actionData: {
        moduleId: "shipscoremark"
      },
      imgUrl: "",
      imgVisible: false,
      baseShipModal:{
        show:false
      },
      inputShipName:""
    };
  },
  methods: {
    onSelectShip(res){
      console.log(res,'onSelectShip')
      this.info.shipName = res.shipname
      this.info.shipownerName = res.owner;
      this.info.shipownerIdCard = res.cardno;
      this.info.shipownerTel = res.tel;
      this.info.fishCertificate = res.fishingLicenseNumberA;
    },
    checkinfo() {
      return this.info.shipownerScore;
    },
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
    initArea(){
      this.status.showAreaLoading = true;
      this.$http
        .get("/$admin/depts/custree", {
          params: {
            includes: "30,44",
            type:1,
          }
        })
        .then(res => {
          this.status.showAreaLoading = false;
          if (res.success) {
            this.areaTree = res.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedArea(node){
      if(!/(?!00)..$/.test(node[0].division)){
        this.$Message.info("请选择具体地区");
        return;
      }
      this.info.area = node[0].title;
      this.info.areaCode = node[0].division;
      this.status.showArea = false;
    },
    selectArea(){
      this.status.showArea = true;
      
    },
    selectedPerson(row){
      this.status.selectPerson = false;
      if(this.selectedPersonType == "0"){
        this.info.shipownerName = row.name;
        this.info.shipownerIdCard = row.idCard;
        this.info.shipownerTel = row.tel;
      } else if (this.selectedPersonType == "1") {
        this.info.captainName = row.name;
        this.info.captainIdCard = row.idCard;
        this.info.captainTel = row.tel;
      } else if (this.selectedPersonType == "2") {
        this.info.companyName = row.name;
        this.info.companyIdCard = row.idCard;
        this.info.companyTel = row.tel;
      }

    },
    selectPerson(){
      this.status.selectPersonloading = true;
      this.$http
        .get("/enforces/shipscorerelation/page", {
          params: {
            query: JSON.stringify(this.queryPerson)
          }
        })
        .then(res => {
          if (res.success) {
            this.totalNumA = res.data.total;
            this.selectPersonList = res.data.data;
            this.status.selectPersonloading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelectPerson(type) {
      this.status.selectPerson = true;
      this.selectedPersonType = type;
      this.queryPerson.wheres.name = "";
      this.queryPerson.page = 1;
      this.queryPerson.key = "getPerson" + "_" + type
      this.selectPerson();
    },
    handleOk() {
      if (this.isEmpty(this.info.matter) || this.info.matter.length == 0) {
        this.$Notice.warning({
          title: "请至少添加一条条款！",
          desc: "请在 '涉及记分事件信息' 点击 '选择记分条款+'。"
        });
        return;
      }

      this.$refs["info"].validate(valid => {
        if (valid) {
          var _self = this;
          for (let i = 0; i < _self.info.matter.length; i++) {
            let imgUrlList = [];
            _self.uploadList[i].forEach(element => {
              imgUrlList.push(element.dataId);
            });
            _self.info.matter[i].imgUrlList = imgUrlList.toString();
          }

          var params = new URLSearchParams();
          params.append("event", JSON.stringify(_self.info));

          // 分支流程 存在数据id 走修改流程
          if (this.isEmpty(this.id)) {
            this.$http
              .post("/enforces/shipscoremark/addevent", params)
              .then(res => {
                if (res.success) {
                  this.ok();
                } else {
                  this.$Message.info(res.msg);
                  this.cancel();
                }
              })
              .catch(error => {
                console.log(error);
              });
          } else {
            params.append("id", this.id);
            this.$http
              .post("/enforces/shipscoremark/modify", params)
              .then(res => {
                if (res.success) {
                  this.ok();
                } else {
                  this.$Message.info(res.msg);
                  this.cancel();
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      });
    },
    checkIdCard(value) {
      if (
        /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          value
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    handleSelectShip() {
      //this.query.wheres.nametheShip_like = this.info.shipName;
      // this.status.selectShip = true;
      this.inputShipName = this.info.shipName
      // console.log(this.ShipName,'ShipName')
      this.baseShipModal.show = true
      // this.selectShip();
    },
    selectShip(value) {
      if (value == 1) {
        this.query.page = 1;
      }

      this.status.selectShiploading = true;
      this.$http
        .get("/shiparchives/nybycjb/page", {
          params: {
            query: JSON.stringify(this.query)
          }
        })
        .then(res => {
          this.totalNum = res.data.total;
          this.selectShipList = res.data.data;
          this.status.selectShiploading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectedShip(info) {
      this.info.shipName = info.nametheShip;
      // this.info.area = info.nametheFishingArea;

      this.$http
        .get("/enforces/case/selectShip", {
          params: {
            shipname: info.nametheShip
          }
        })
        .then(res => {
          if (res.success) {
            this.info.shipownerName = res.data.owner;
            this.info.shipownerIdCard = res.data.cardno;
            this.info.shipownerTel = res.data.tel;
            this.info.fishCertificate = res.data.fishingLicense;
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.status.selectShip = false;
    },
    handleView(url) {
      this.imgUrl = url;
      this.imgVisible = true;
    },
    handleRemove(file, index) {
      for (var i = 0; i < this.uploadList[index].length; i++) {
        if (this.uploadList[index][i].dataId == file.dataId) {
          this.uploadList[index].splice(i, 1);
          break;
        }
      }
    },
    handleSuccess(response, file, fileList, index) {
      let attr = {
        dataId: response.data.id,
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };

      this.uploadList[index].push(attr);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
    handleBeforeUpload() {
      return true;
    },
    handleSelectEvent() {
      this.$http
        .get("/enforces/shipscoreitem/tree", {
          params: {
            query: JSON.stringify(this.treeQuery)
          }
        })
        .then(res => {
          if (res.success) {
            var tree = res.data;
            this.eventTree = tree[0].children;
            this.status.selectEvent = true;
          } else {
            this.$Message.info(res.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    selectedEvent() {
      if (this.$util.isNull(this.selectEvents)) {
        return;
      }
      // this.$refs["info"].resetFields();

      this.uploadList = [];
      this.info.matter = [];
      this.selectEvents.forEach(element => {
        // 过滤无效父节点
        if (this.$util.isNull(element.children)) {
          var matter = {
            title: element.title,
            shipownerScore: element.shipownerScore,
            captainScore: element.captainScore,
            companyScore: element.companyScore,
            type: element.type,
            countervailable: element.countervailable
          };
          this.info.matter.push(matter);
          this.uploadList.push([]);
        }
      });

      this.addUpScore();
      // 校验刷新
      this.$refs["info"].validate();
    },
    addUpScore() {
      if (this.isEmpty(this.info.matter)) {
        return;
      }
      this.info.shipownerScore = 0;
      this.info.captainScore = 0;
      this.info.companyScore = 0;

      this.info.matter.forEach(element => {
        this.info.shipownerScore =
          this.info.shipownerScore + element.shipownerScore;
        this.info.captainScore = this.info.captainScore + element.captainScore;
        this.info.companyScore = this.info.companyScore + element.companyScore;
      });
    },
    reset() {
      this.$refs["info"].resetFields();

      for (const key in this.info) {
        if (this.info.hasOwnProperty(key)) {
          if (key == "matter") {
            this.info[key] = [];
          } else if (
            key == "shipownerScore" ||
            key == "captainScore" ||
            key == "companyScore"
          ) {
            this.info[key] = 0;
          } else {
            this.info[key] = "";
          }
        }
      }
      this.info.noteTime = new Date();
      this.info.noteTaker = this.defaultUserName;
      this.selectEvents = [];
      this.uploadList = [];
    },
    getDate() {
      this.uploadList = [];

      this.$http
        .get("/enforces/shipscoremark/get?id=" + this.id)
        .then(res => {
          this.info = res.data;
          // 重载用户信息
          this.info.noteTaker = this.defaultUserName;
          // this.info.noteTime = new Date();

          this.info.matter.forEach(element => {
            var idList = element.imgUrlList.split(",");
            var urlList = [];
            
            idList.forEach(element => {
              if(!this.isEmpty(element)){
                let attr = {
                  dataId: element,
                  url: this.$basePath + "/$admin/attachs/stream/" + element
                };
                urlList.push(attr);
              }
            });

            this.uploadList.push(urlList);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    onCheckChange(items) {
      this.selectEvents = items;
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    pageSizeChange(size) {
      this.query.size = size;
      //this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.selectShip();
    },
    pageSizeChangeA(size) {
      this.queryPerson.size = size;
      //this.handleSearch();
    },
    changePageA(page) {
      this.queryPerson.page = page;
      this.selectPerson();
    },
    initTree() {
      this.status.selectShiploading = true;
      this.$http
        .get("/$admin/areas/get/331000")
        .then(res => {
          if (res.success) {
            var areasTree = res.data[0];
            this.areas = [];
            this.areas.push(areasTree.id);
            areasTree.children.forEach(element => {
              this.areas.push(element.id);
            });

            this.query.wheres.codefishingArea_in = this.areas;
            this.status.selectShiploading = false;
          }
        })
        .catch(error => {
          console.log(error);
        });
        
        // this.$http
        //   .get("/shiparchives/normalnyb/getPage", {
        //     params: {
        //       query: JSON.stringify(this.query)
        //     }
        //   })
        //   .then(res => {
        //     console.log(res);
        //     this.totalNum = res.data.total;
        //     this.selectShipList = res.data.data;
        //     this.status.selectShiploading = false;
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        
    }
  },
  mounted() {
    this.visible = false;
    this.initTree();
    this.initArea();
  },

  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  computed: {
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    now() {
      return new Date();
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.reset();
        this.visible = val;
        if (!this.isEmpty(this.id)) {
          this.getDate();
        }
      }
    }
  }
};
</script>
<style scoped>
fieldset.title {
  border: none;
  position: relative;
}
fieldset.title legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 18px;
  float: left;
}
fieldset.title button {
  left: 200px;
  top: 0;
}
.event-content {
  margin-top: 10px;
  max-height: 160px;
  overflow: auto;
}

.demo-auto-complete-item {
  padding: 4px 0;
  border-bottom: 1px solid #f6f6f6;
  max-height: 200px;
  overflow: auto;
}
.demo-auto-complete-group {
  font-size: 12px;
  padding: 4px 6px;
}
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.demo-auto-complete-group a {
  float: right;
}
.demo-auto-complete-count {
  float: right;
  color: #999;
}
.bottom {
  padding-top: 10px;
  overflow: hidden;
}
.ivu-page {
  float: right;
}

.ivu-tabs-tabpane {
  overflow: auto;
}
.markScore-upload-list {
  display: inline-block;
  width: 100px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  border: 1px solid transparent;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
}
.markScore-upload-list img {
  width: 100%;
  height: 100%;
}
.markScore-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.markScore-upload-list:hover .markScore-upload-list-cover {
  display: block;
}
.markScore-upload-list-cover i {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  margin: 0 2px;
}

</style>


