<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/checks/promisehand/page'" :params="query" :columns="columns" 
    @on-row-dblclick="handleEdit2">
    <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
                <Form-item label="起始时间:">
                  <DatePicker  type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="query.wheres.checkDate_gte"></DatePicker>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="截止时间:">
                  <DatePicker  type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="query.wheres.checkDate_lte"></DatePicker>
                </Form-item>
            </Col>


            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <span style="float:right;">
              <Button @click="daKai()" type="success" icon="ios-add" >新增</Button>
            </span>

          </Row>
        </Form>
    </div>
  </data-table>

  <Modal :styles="{top: '40px'}" v-model="status.showFileModal" title="附件内容" width="825" class="upload1" :mask-closable="false">
      <div class="demo-upload-list" :key="index" v-for="(data,index) in uploadList">
          <a @click="showFile(data)" target="_blank"> <img class="pic" :title="data.attachname" :src="data.url" width="200" height="150"/></a>
      </div>
  </Modal> 

  <!-- 查看详情 -->
  <Modal :styles="{top: '40px'}" v-model="status.showDetailInfoModal" title="查看详细信息" width="50%"  :mask-closable="false">
    <!-- <div class="detail_info_modal">
          <Row>
              <i-col span="2">
                <label>执法机关：</label>
              </i-col>
              <i-col span="22">
                <i-input :value="showDetailInfo.enforceParty" readonly></i-input>
              </i-col>
            </Row>
          <Row>
            <Col span="2">
              <label >执法人员：</label>
            </Col>
            <Col span="10" >
              <Input :value="showDetailInfo.lawMan1" readonly></Input>
            </Col>
            <Col span="2">
              <label class="two">执法号：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.lawMan1Number" readonly></Input>
            </Col>
          </Row>
          <Row>
            <Col span="2">
              <label>执法人员：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.lawMan2" readonly></Input>
            </Col>
            <Col span="2">
              <label class="two">执法号：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.lawMan2Number" readonly></Input>
            </Col>
          </Row>
          <Row>
            <Col span="2">
              <label>检查时间：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.checkDate" readonly></Input>
            </Col>
            <Col span="2">
              <label class="two">检查地点：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.checkPlace" readonly></Input>
            </Col>
          </Row>

          <Row>
            <Col span="2">
              <label>当事人：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.boothOwner" readonly></Input>
            </Col>
            <Col span="2">
              <label class="two">身份证号：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.ownerCardId" readonly></Input>
            </Col>
          </Row>	
          <Row>
            <Col span="2">
              <label>手机号：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.mobileNumber" readonly></Input>
            </Col>
            <Col span="2">
              <label class="two">现住址：</label>
            </Col>
            <Col span="10">
              <Input :value="showDetailInfo.ownerAddress" readonly></Input>
            </Col>
          </Row>
          <Row>
            <Col span="2">
              <label>承诺：</label>
            </Col>
            <Col span="22">
              <Input :value="showDetailInfo.promises" readonly></Input>
            </Col>
          </Row>		
          <Row>
            <Col span="2">
              <label >备注说明：</label>
            </Col>
            <Col span="22">
              <Input :value="showDetailInfo.remark" readonly></Input>
            </Col>
          </Row>			            				 
      </div> -->
      <table class="table" width="100%" style="margin: 0 auto;">
        <tr>
          <td class="title" colspan="1">执法机关：</td>
          <td colspan="11">
            <i-input :value="showDetailInfo.enforceParty" readonly></i-input>
          </td>
        </tr>
        <tr>
          <td class="title">执法人员：</td>
          <td><i-input :value="showDetailInfo.lawMan1" readonly></i-input></td>
          <td class="title">执法号：</td>
          <td><Input :value="showDetailInfo.lawMan1Number" readonly></Input></td>
        </tr>
        <tr>
          <td class="title">执法人员：</td>
          <td><i-input :value="showDetailInfo.lawMan2" readonly></i-input></td>
          <td class="title">执法号：</td>
          <td><Input :value="showDetailInfo.lawMan2Number" readonly></Input></td>
        </tr>
        <tr>
          <td class="title">检查时间：</td>
          <td><Input :value="showDetailInfo.checkDate" readonly></Input></td>
          <td class="title">检查地点：</td>
          <td><Input :value="showDetailInfo.checkPlace" readonly></Input></td>
        </tr>
        <tr>
          <td class="title">当事人：</td>
          <td><Input :value="showDetailInfo.boothOwner" readonly></Input></td>
          <td class="title">身份证号：</td>
          <td><Input :value="showDetailInfo.ownerCardId" readonly></Input></td>
        </tr>
        <tr>
          <td class="title">手机号：</td>
          <td><Input :value="showDetailInfo.mobileNumber" readonly></Input></td>
          <td class="title">现住址：</td>
          <td><Input :value="showDetailInfo.ownerAddress" readonly></Input></td>
        </tr>
        <tr>
          <td class="title"  colspan="1">承诺：</td>
          <td colspan="11">
            <i-input :value="showDetailInfo.promises" readonly></i-input>
          </td>
        </tr>
        <tr>
          <td class="title" colspan="1">备注说明：</td>
          <td colspan="11">
            <i-input :value="showDetailInfo.promises" remark></i-input>
          </td>
        </tr>
      </table>
      <!-- 种类列表 -->
      <!-- <p style="margin-left:45%;margin-top:15px;font-size:15px;"><b>缴纳的渔获物</b></p> -->
      <div class="promise_attachment">
        <Table size="small" highlight-row height="200" width="48%" :columns="columns2"  :data="showDetailInfo.items"></Table>		
      </div>
      <div slot="footer">
          <Button  type="primary" @click="fuJian2(showDetailInfo.id)">附件</Button>
          <Button  @click="status.showDetailInfoModal=false" >确认</Button>
      </div> 
  </Modal>

  <Modal v-model="status.uploadModal" title="附件上传" width="500"  class="upload1" :mask-closable="false">
      <Row>
        <Col span="24">
          <div class="demo-upload-list" :key="index" v-for="(item,index) in uploadList">
            <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.dataId)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :with-credentials="true"
            :max-size="20480"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            multiple
            type="drag"
            :action="actionUrl">
            <div style="padding: 5px 0">
                <Icon type="ios-cloud-upload" size="48" style="color: #3399ff"></Icon>
                <p>上传图片</p>
            </div>
          </Upload>
        </Col>
    </Row>
  </Modal>

  <Modal title="查看大图" v-model="status.visible" class="upload1">
      <img :src="datuUrl + this.imgName" v-if="status.visible" style="width: 100%;">
  </Modal>

  <!-- 新增、修改 -->
  <Modal :styles="{top: '40px'}" v-model="status.updateDetailInfoModal" :title="title" width="50%" :mask-closable="false" >
      <Form :label-width="80" :model="formLeft" :rules="infoRules" ref="formLeft">
          <Row>
              <Col span="24">
                <FormItem label="执法机关:" prop="enforceParty">
                      <Input v-model="formLeft.enforceParty"/>
                </FormItem>
                </Col>
          </Row>
          <Row>
                <Col span="12">
                  <FormItem label="执法人员：">
                      <Input v-model="formLeft.lawMan1"/>
                  </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="执法号:" prop="lawMan1Number">
                        <Input v-model="formLeft.lawMan1Number"/>
                    </FormItem>
                </Col>
          </Row>
          <Row>
              <Col span="12">
                <FormItem label="执法人员：">
                      <Input v-model="formLeft.lawMan2"/>
                  </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="执法号:">
                      <Input v-model="formLeft.lawMan2Number"/>
                  </FormItem>
                </Col>
          </Row>
          <Row>
              <Col span="12">
                <FormItem label="检查时间：">
                      <DatePicker  :transfer=true type="date"  style="width:100%" placeholder="请选择日期" format="yyyy-MM-dd" v-model="formLeft.checkDate"></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="检查地点：">
                      <Input v-model="formLeft.checkPlace"/>
                  </FormItem>
                </Col>
          </Row>

          <Row>
              <Col span="12">
                <FormItem label="当事人：" prop="boothOwner">
                      <Input v-model="formLeft.boothOwner" ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="身份证：" prop="ownerCardId">
                      <Input v-model="formLeft.ownerCardId"/>
                  </FormItem>
                </Col>
          </Row>	
          <Row>
              <Col span="12">
                <FormItem label="手机号：" prop="mobileNumber">
                      <Input v-model="formLeft.mobileNumber" ></Input>
                  </FormItem>
                </Col>
                <Col span="12">
                <FormItem label="现住址：" prop="ownerAddress">
                      <Input v-model="formLeft.ownerAddress"/>
                  </FormItem>
                </Col>
          </Row>

          <Row>
            <Col span="24">
                <FormItem label="承诺：">
                      <Input v-model="formLeft.promises"/>
                  </FormItem>
                </Col>
          </Row>

          <Row>
              <Col span="24">
                <FormItem label="备注说明：">
                      <Input v-model="formLeft.remark"/>
                  </FormItem>
                </Col>
          </Row>			
      
          <Row style="text-align:center;" >
            <h3>缴纳渔获物</h3>
          </Row>
          <Row style="text-align:center;" >
              <Col span="5" >
                      <b>名称</b>
              </Col>
              <Col span="3" style="margin-left:5px">
                      <b>规格</b>
              </Col>                    
              <Col span="3" style="margin-left:5px">
                      <b>数量</b>
              </Col>
              <Col span="8" style="margin-left:5px">
                      <b>备注</b>
              </Col>  
              <Col span="4" >
                      <b>操作</b>
              </Col>                   
          </Row> 
              <Row class="addRow" :key="index" v-for="(temp,index) in formLeft.items" style="margin-top:8px;">
                  <Col span="5">
                        <FormItem :label-width="10">
                              <Select v-model="temp.itemName" :placement="'top'"
                                    :clearable="true"  :filterable="true" :remote="true" :on-query-change="searchFish" :remote-method="searchFish" @on-clear="searchFish()">
                                  <Option v-for="(item,index) in fishListCopy" :value="item" :key="index">{{ item }}</Option>
                              </Select>
                        </FormItem>                                              
                  </Col>
                  
                  <Col span="3" style="margin-left:5px">
                      <FormItem  :label-width="10">
                          <Input v-model=" temp.standard" ></Input>
                      </FormItem>
                  </Col>                    
                  <Col span="3" style="margin-left:5px">
                      <FormItem :label-width="10">
                              <Input v-model="temp.amount"></Input>
                      </FormItem>
                  </Col>
                  <Col span="8" style="margin-left:5px">
                      <FormItem  :label-width="10">
                          <Input v-model="temp.remark"  placeholder="备注..."></Input>
                      </FormItem>
                  </Col>                     
                  <Col span="4" >
                          <Button type="dashed" style="width:100%;margin-left:10px"  @click="removeHW(index)" >删除</Button>
                  </Col>
              </Row> 
              <Row style="margin-top:8px;margin-bottom:10px">
                  <Col span="24">
                          <Button type="dashed" style="width:100%;" @click="addHW()" icon="plus-round">增加货物</Button>
                  </Col>
              </Row>
      </Form>	
        <div slot="footer">
          <Button  @click="clear('formLeft')" >取消</Button>
          <Button type="info" @click="status.uploadModal=true" >附件上传</Button>
          <Button  type="success" @click="update('formLeft')" v-show="addFh!=1">保存修改</Button>
          <Button  type="success" @click="add('formLeft')" v-show="addFh==1">保存</Button>
      </div>         
  </Modal>

  <pic class="pic1"  v-model="status.showPic" :img="showPicPathWithBase"></pic>
</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
var formLeft = {
  //   deptId:"",  //部门ID
  enforceParty: "", //执法机关
  boothOwner: "", //摊主
  ownerCardId: "", //摊主身份证号
  ownerAddress: "", // 摊主住址
  mobileNumber: "", // 摊主手机号码
  checkDate: new Date(), // 检查时间
  checkPlace: "", // 检查地点
  promises: "", // 承诺
  lawMan1: "", // 执法人1
  lawMan2: "", // 执法人2
  lawMan1Number: "", // 执法号1
  lawMan2Number: "", // 执法号2
  remark: "", // 备注
  items: [
    {
      //   id:"",
      itemName: "", //名称
      standard: "", //规格
      amount: "", //数量
      remark: "" //备注
    }
  ]
};
export default {
  name: "zysjcn",
  components: {
    pic
  },
  data() {
    return {
      addFh: 0,
      title: "",
      infoRules: {
        //验证
        enforceParty: [
          { required: true, message: "请输入执法机关", trigger: "blur" }
        ],
        boothOwner: [
          { required: true, message: "请输入摊主", trigger: "blur" }
        ],
        ownerCardId: [
          { required: true, message: "请输入摊主身份证", trigger: "blur" }
        ],
        ownerAddress: [
          { required: true, message: "请输入摊主地址", trigger: "blur" }
        ],
        mobileNumber: [
          { required: true, message: "请输入摊主电话", trigger: "blur" }
        ],
        lawMan1Number: [
          { required: true, message: "请输入执法号", trigger: "blur" }
        ]
      },
      remote: true,
      actionUrl: this.$basePath + "/$admin/attachs", //上传URL
      datuUrl: this.$basePath + "/$admin/attachs/stream/",
      showPicPathWithBase: "",
      status: {

        showFileModal: false,
        showDetailInfoModal: false,
        updateDetailInfoModal: false,
        showPic: false,
        addModal: false,
        uploadModal: false,
        openModal: false,
        visible: false
      },
      dataId: "",
      totalNum: 1,
      height: "450",
      imgName: "",
      // visible: false,
      yuHuocolumns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "品种名称",
          key: "title",
          width: 100,
          align: "center"
        },

        {
          title: "操作",
          key: "index",
          width: 70,
          align: "center",
          render: (h, params) => {
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
                      var _self = this;
                      _self.formLeft.items[_self.index].itemName =
                        params.row.title;
                      _self.status.openModal = false;
                    }
                  }
                },
                "确认"
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
          width: 80,
          align: "center"
        },
        {
          title: "检查时间",
          key: "checkDate",
          align: "center",
          render: function(h, params) {
            var checkTime = params.row.checkDate;

            var checkDate = checkTime.substr(0, 10); //截取字符串

            return h("span", checkDate);
          }
        },
        {
          title: "检查地点",
          key: "checkPlace",
          align: "center"
        },
        {
          title: "当事人姓名",
          key: "boothOwner",
          align: "center"
        },
        {
          title: "当事人地址",
          key: "ownerAddress",
          align: "center"
        },
        {
          title: "当事人手机",
          key: "mobileNumber",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          width: 90,
          align: "center",
          render: (h, params) => {
            var id = params.row.id;
            var temp = [];
            temp.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var _self = this;
                      _self.handleEdit(params.row);
                      _self.status.showDetailInfoModal = true;
                    }
                  }
                },
                "详情"
              )

            );
            return h("div", temp);
          }
        }
      ],
      index: 0,
      formLeft: {
        items: []
      },
      columns2: [
        {
          title: "名称",
          key: "itemName"
          // width: 150
        },
        {
          title: "规格",
          key: "standard"
          // width: 150
        },
        {
          title: "数量",
          key: "amount"
          // width: 150
        }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          checkDate_gte: "",
          checkDate_lte: ""
        },
        orders: "updateTime desc"
      },

      showDetailInfo: "", //詳情
      uploadList: [], //附件
      fishList: [],
      fishListCopy: []
    };
  },

  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    },
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    now() {
      return new Date();
    }
  },
  mounted() {
    this.handleSearch();
    var fish = this.$store.getters.getDictList("fish_type");

    for (let i = 0; i < fish.length; i++) {
      var fish2 = fish[i].title;
      this.fishList.push(fish2);
    }
    
    this.fishListCopy = this.fishList;
  },
  // 方法.事件
  methods: {
    initSearch() {

      var value = this.query.wheres.checkDate_lte.setTime(this.query.wheres.checkDate_lte.getTime()+59*1000+59*60*1000+23*60*60*1000)
      var newDate = new Date(value)
      var y = newDate.getFullYear();
      var m = newDate.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;  
      var d = newDate.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      var h = newDate.getHours();  
      h=h < 10 ? ('0' + h) : h;  
      var minute = newDate.getMinutes();  
      minute = minute < 10 ? ('0' + minute) : minute;  
      var second=newDate.getSeconds();  
      second=second < 10 ? ('0' + second) : second;
      newDate = y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;      
      this.query.wheres.checkDate_lte = newDate;      
      this.$refs.test.initSearch();
    },
    handleView(ID) {
      this.imgName = ID;
      this.status.visible = true;
    },
    open(index) {
      this.index = index;
      this.status.openModal = true;
    },

    handleSearch(value) {
      var _self = this;
      if (value == 1) {
        _self.query.page = 1;
      }

      this.$refs.test.handleSearch();
    },
    daKai() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));
      this.$refs["formLeft"].resetFields(); //清除验证
      this.formLeft.lawMan1 = this.defaultUserName;
      this.uploadList = [];
      this.addFh = 1;
      this.title = "新增数据";
      // this.status.addModal = true;
      this.status.updateDetailInfoModal = true;
      this.fishListCopy = this.fishList;
    },
    //新增数据
    add(formLeft) {
      var _self = this;
      _self.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < _self.uploadList.length; i++) {
            ids.push(_self.uploadList[i].dataId);
          }
          params.append("ids", ids);
          params.append("jsonEntity", JSON.stringify(_self.formLeft));
          _self.$http
            .post("/checks/promisehand/add", params)
            .then(response => {
              // this.status.addModal = false;
              _self.status.updateDetailInfoModal = false;
              // this.add=0;
              _self.handleSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },
    searchFish(value) {
      var _self = this;
      if (value == null || value == "")
        return (_self.fishListCopy = _self.fishList);
      // 第一种方法   【过滤写法】
      var temp = _self.fishList.filter(item => item.indexOf(value) > -1);

      if (temp.length == 0 || temp == null) {
        temp.push(value);
      }
      _self.fishListCopy = temp;
    },

    //新增货物
    addHW() {
      var items = this.formLeft.items;
      items.splice(items.length, 0, {
        itemName: "", //名称
        standard: "", //规格
        amount: "", //数量
        remark: "" //备注
      });
    },
    //删除货物
    removeHW(index) {
      var items = this.formLeft.items;
      items.splice(index, 1);
    },

    /* 上传 */
    handleSuccess(response, file, fileList) {
      let attr = {
        name: response.data.name,
        dataId: response.data.id,
        status: "finished",
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };
      this.uploadList.push(attr);
    },

    handleRemove(file) {
      var index = 0;
      for (var i = 0; i < this.uploadList.length; i++) {
        if (this.uploadList[i].dataId == file.dataId) index = i;
      }
      this.uploadList.splice(index, 1);
      this.$http
        .delete("/$admin/attachs/" + file.dataId)
        .then(response => {})
        .catch(function(error) {
          console.log(error);
        });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
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
    //    双击修改显示
    handleEdit2(index) {
      this.$refs["formLeft"].resetFields(); //清除验证
      this.fuJian(index.id);
      this.formLeft = index;
      this.addFh = 0;
      this.title = "修改数据";
      this.status.updateDetailInfoModal = true;
    },

    //保存修改
    update(formLeft) {
      var _self = this;
      _self.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < _self.uploadList.length; i++) {
            ids.push(_self.uploadList[i].dataId);
          }
          params.append("ids", ids);
          params.append("jsonEntity", JSON.stringify(_self.formLeft));
          _self.$http
            .post("/checks/promisehand/modify", params)
            .then(res => {
              _self.handleSearch();
              _self.$refs["formLeft"].resetFields();
              _self.status.updateDetailInfoModal = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          _self.$Message.error("表单验证失败!");
        }
      });
    },
    clear(formLeft) {
      this.$refs["formLeft"].resetFields();
      this.status.updateDetailInfoModal = false;
    },
    //查看详情
    handleEdit(index) {
      var _self = this;
      // _self.toEdit(index.id);
      // _self.fishListCopy = [index.items.itemName];
      // console.log(index,'index')
      _self.showDetailInfo = index;
    },
    toEdit(id) {
      var _self = this;
      _self.dataId = id;
      _self.status.showDetailInfoModal = true;
    },

    // 附件
    fuJian(id) {
      var _self = this;
      _self.uploadList.length = 0;
      //  this.status.showFileModal = true;

      _self.$http
        .get("/$admin/attachs?dataId=" + id)
        .then(response => {
          let attachs = response.data;
          for (let i = 0; i < attachs.length; i++) {
            let systemAttach = {
              name: attachs[i].name,
              dataId: attachs[i].id,
              status: "finished",
              url: _self.$basePath + "/$admin/attachs/stream/" + attachs[i].id
            };
            _self.uploadList.push(systemAttach);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fuJian2(id) {
      var _self = this;
      _self.uploadList.length = 0;
      _self.status.showFileModal = true;
      _self.$http
        .get("/$admin/attachs?dataId=" + id)
        .then(response => {
          let attachs = response.data;
          for (let i = 0; i < attachs.length; i++) {
            let systemAttach = {
              name: attachs[i].name,
              dataId: attachs[i].id,
              status: "finished",
              url: _self.$basePath + "/$admin/attachs/stream/" + attachs[i].id
            };
            _self.uploadList.push(systemAttach);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //开启一个新窗口展示附件图片
    showFile(data) {
      this.showPicPathWithBase =
        this.$basePath + "/$admin/attachs/stream/" + data.dataId;
      this.status.showPic = true;
    },
    // 查询重置
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },

    // 页面条数选择
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },

    // 分页查询
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
}
.table tr {
  margin-bottom: 2px;
}
.demo-auto-complete-item {
  border-bottom: 1px solid #f6f6f6;
  height: 200px !important;
  width: 100%;
  overflow: scroll;
}
/* .demo-auto-complete-group{
        font-size: 12px;
        width:100%;
        height: 200px !important;
        padding: 4px 6px; 
    } */
.demo-auto-complete-group span {
  color: #666;
  font-weight: bold;
}
.detail_info_modal {
  font-family: Microsoft YaHei !important;
}
.upload1 {
  position: relative;
  z-index: 10000;
}
.pic1 {
  position: relative;
  z-index: 10001;
}

.detail_info_modal label {
  font-weight: bolder;
  width: 25px;
  height: 40px;
  line-height: 40px;
}
.two {
  margin-left: 15px;
}
.bottom {
  width: 100%;
  height: 45px;
  padding-top: 10px;
  overflow: hidden;
}

.bottom .ivu-page {
  float: right;
}
fieldset.title {
  border: none;
  position: relative;
}
fieldset.title legend {
  margin: 0 10px;
  padding: 0 15px;
  font-size: 16px;
}
fieldset.title button {
  position: absolute;
  left: 150px;
  top: 0;
}
.event-content {
  margin-top: 10px;
  max-height: 160px;
  overflow: auto;
}

.operate-wrap {
  border-left: 1px solid #eee;
  padding-left: 10px;
  float: right;
  /* display: inline-block;  */
}
.ivu-card-bordered {
  border: none !important;
}
.text-required {
  display: inline-block;
  color: red;
}
.ivu-select-dropdown .ivu-auto-complete {
  max-height: 200px !important;
}
</style>
