<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/checks/receive/page'" :params="query" :columns="columns" 
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

    <Modal :styles="{top: '120px'}" v-model="status.showFileModal" title="附件内容" class="upload1" width="825" :transfer='false'>
        <div class="demo-upload-list" :key="index" v-for="(data,index) in uploadList">
            <a @click="showFile(data)" target="_blank"> <img class="pic" :title="data.attachname" :src="data.url" width="200" height="150"/></a>
        </div>
    </Modal> 

    <!-- 查看详情 -->
    <Modal :styles="{top: '150px'}" v-model="status.showDetailInfoModal" title="查看详细信息" width="50%" :transfer='false'>
        <div class="detail_info_modal">
       		    <Row>
                <i-col span="4">
                  <label>执法机关：</label>
                </i-col>
                <i-col span="20">
                  <i-input :value="showDetailInfo.enforceParty" readonly></i-input>
                </i-col>
             </Row>
              <Row>
            	<i-col span="4">
            		<label>执法人员：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.lawMan1" readonly></i-input>
            	</i-col>
            	<i-col span="4">
            		<label class="two">执法号：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.lawMan1Number" readonly></i-input>
            	</i-col>
            </Row>
            <Row>
            	<i-col span="4">
            		<label>执法人员：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.lawMan2" readonly></i-input>
            	</i-col>
            	<i-col span="4">
            		<label class="two">执法号：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.lawMan2Number" readonly></i-input>
            	</i-col>
            </Row>
            <Row>
            	<i-col span="4">
            		<label>检查时间：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.checkDate" readonly></i-input>
            	</i-col>
            	<i-col span="4">
            		<label class="two">检查地点：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.checkPlace" readonly></i-input>
            	</i-col>
            </Row>

            <Row>
            	<i-col span="4">
            		<label>接收日期：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.acceptDate" readonly></i-input>
            	</i-col>
            	<i-col span="4">
            		<label class="two">接收单位：</label>
            	</i-col>
            	<i-col span="8">
            		<i-input :value="showDetailInfo.acceptUnit" readonly></i-input>
            	</i-col>
            </Row>	
            
            <Row>
            	<i-col span="4">
            		<label>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
            	</i-col>
            	<i-col span="20">
            		<i-input :value="showDetailInfo.remark" readonly></i-input>
            	</i-col>
            </Row>
        </div>
       
        <!-- 种类列表 -->
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
                :on-success="handleSuccess"
                :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
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

<!-- 新增、修改 -->
    <Modal :styles="{top: '40px'}" v-model="status.updateDetailInfoModal" :title="title" width="50%" :mask-closable="false">
        <Form :label-width="90" :model="formLeft" :rules="infoRules" ref="formLeft">          
       		  <Row>
              <Col span="24">
                  <Form-item label="执法机关：" prop="enforceParty">
                        <Input v-model="formLeft.enforceParty"/>
                    </Form-item>
               </Col>
            </Row>
            <Row>
              <Col span="12">
                  <Form-item label="执法人员：">
                        <Input v-model="formLeft.lawMan1"/>
                    </Form-item>
              </Col>
              <Col span="12">    
                  <Form-item label="执法号：" prop="lawMan1Number">
                        <Input v-model="formLeft.lawMan1Number"/>
                    </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                  <Form-item label="执法人员：">
                        <Input v-model="formLeft.lawMan2"/>
                    </Form-item>
                 </Col>
                  <Col span="12">
                  <Form-item label="执法号：">
                        <Input v-model="formLeft.lawMan2Number"/>
                    </Form-item>
                 </Col>
            </Row>
            <Row>
              <Col span="12">
                  <Form-item label="检查时间：">
                        <DatePicker  :transfer=true type="date" placeholder="请选择日期"  style="width:100%" format="yyyy-MM-dd" v-model="formLeft.checkDate"></DatePicker>
                    </Form-item>
                 </Col>
                  <Col span="12">
                  <Form-item label="检查地点：">
                        <Input v-model="formLeft.checkPlace"/>
                    </Form-item>
                 </Col>
            </Row>
            <Row>
            		 <Col span="12">
                  <Form-item label="接收单位：">
                        	<Input v-model="formLeft.acceptUnit" ></Input>
                    </Form-item>
                 </Col>
                  <Col span="12">
                  <Form-item label="接受日期：" prop="acceptDate" >
                        <DatePicker  :transfer=true type="date" style="width:100%" placeholder="请选择日期" format="yyyy-MM-dd" v-model="formLeft.acceptDate"></DatePicker>
                    </Form-item>
                 </Col>              
            </Row>
            <Row>
               <Col span="24">
                  <Form-item label="状态：">
                        	<Input v-model="formLeft.status" ></Input>
                    </Form-item>
                 </Col>
            </Row>			
            <Row>
               <Col span="24">
                  <Form-item label="备注说明：">
                        	<Input v-model="formLeft.remark" ></Input>
                    </Form-item>
                 </Col>
            </Row>		 
           <Row style="text-align:center;" >
              <h3>缴纳渔获物</h3>
            </Row>
                <Row style="text-align:center" >
                    <Col span="5">
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
                                      :clearable="true"  :filterable="true">
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
                    <Col span="4">
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

  <Modal title="查看大图" v-model="status.visible" class="upload1">
        <img :src="datuUrl + this.imgName" v-if="status.visible" style="width: 100%;">
    </Modal>
   

  <pic class="pic1" v-model="status.showPic" :img="showPicPathWithBase"></pic>
</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
var formLeft = {
  enforceParty: "", //执法机关
  checkDate: new Date(), // 检查日期
  checkPlace: "", // 检查地点
  acceptUnit: "", // 接受单位
  acceptDate: "", // 接受日期
  lawMan1: "", // 执法人1
  lawMan2: "", // 执法人2
  lawMan1Number: "", // 执法号1
  lawMan2Number: "", // 执法号2
  status: "",
  remark: "", // 备注
  items: [
    {
      itemName: "", //名称
      standard: "", //规格
      amount: "", //数量
      remark: "" //备注
    }
  ]
};
export default {
  name: "wjyhwjsd",
  components: {
    pic
  },
  data() {
    return {
      addFh: 0,
      title: "",
      validation: [
        //手动验证
        "enforceParty",
        "acceptDate",
        "lawMan1Number"
      ],
      infoRules: {
        //组件验证
        enforceParty: [
          { required: true, message: "请输入执法机关", trigger: "blur" }
        ],
        acceptDate: [
          {
            required: true,
            type: "date",
            message: "请选择接受日期",
            trigger: "change"
          }
        ],
        lawMan1Number: [
          { required: true, message: "请输入执法号", trigger: "blur" }
        ]
      },
      actionUrl: this.$basePath + "/$admin/attachs", //上传URL
      datuUrl: this.$basePath + "/$admin/attachs/stream/",
      showPicPathWithBase: "",
      status: {
        isLoading: true,
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
                      this.formLeft.items[this.index].itemName =
                        params.row.title;
                      this.status.openModal = false;
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
      index: 0,
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
          render: (h, params) => {
            var checkTime = params.row.checkDate;
            return h("span", this.isNull(checkTime) ? "" : checkTime.substr(0, 10));
          }
        },
        {
          title: "检查地点",
          key: "checkPlace",
          align: "center"
        },
        {
          title: "接受时间",
          key: "acceptDate",
          align: "center",
          render: (h, params) => {
            var acceptDate = params.row.acceptDate;
            return h("span", this.isNull(acceptDate) ? "" : acceptDate.substr(0, 10));
          }
        },
        {
          title: "接收单位",
          key: "acceptUnit",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          width:90,
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
                      this.handleEdit(params.row);
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
      dataList: [], //数据集
      showDetailInfo: "", //詳情
      uploadList: [], //附件
      fishList: [], //渔获物集合
      fishListCopy:[]
    };
  },
  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //生拷贝
    },
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    now() {
      return new Date();
    }
  },

  // 方法.事件
  methods: {
    initSearch() {
      this.$refs.test.initSearch();
    },
    gteChange(value,value2){
      this.query.wheres.checkDate_gte = value ;
    },
    lteChange(value,value2){
      this.query.wheres.checkDate_lte = value;
    },
    isNull(o) {
      return o == null || o == undefined || o == "";
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
      if (value == 1) {
        this.query.page = 1;
      }
      this.$refs.test.handleSearch();
      // this.$http
      //   //请求路径
      //   .get("/checks/receive/page", {
      //     //参数
      //     params: {
      //       query: JSON.stringify(this.query)
      //     }
      //   })
      //   // 返回值
      //   .then(res => {
      //     this.dataList = res.data.data;
      //     this.totalNum = res.data.total;
      //     this.status.isLoading = false;
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },

    daKai() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));
      this.formLeft.lawMan1 = this.defaultUserName;
      this.$refs["formLeft"].resetFields(); //清除验证
      this.uploadList = [];
      this.addFh = 1;
      this.title = "新增数据";
      this.status.updateDetailInfoModal = true;
      this.fishListCopy = this.fishList;
    },

    add(formLeft) {
      this.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < this.uploadList.length; i++) {
            ids.push(this.uploadList[i].dataId);
          }
          params.append("ids", ids);
          params.append("jsonEntity", JSON.stringify(this.formLeft));
          this.$http
            .post("/checks/receive/add", params)
            .then(response => {
              this.status.updateDetailInfoModal = false;
              this.handleSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
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
      this.$refs["formLeft"].validate(valid => {
        if (valid) {
          let params = new URLSearchParams();
          let ids = [];
          for (let i = 0; i < this.uploadList.length; i++) {
            ids.push(this.uploadList[i].dataId);
          }
          params.append("ids", ids);
          params.append("jsonEntity", JSON.stringify(this.formLeft));
          this.$http
            .post("/checks/receive/modify", params)
            .then(res => {
              this.handleSearch();
              this.$refs["formLeft"].resetFields(); //清除验证
              this.status.updateDetailInfoModal = false;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("表单验证失败!");
        }
      });
    },

    clear(formLeft) {
      this.$refs["formLeft"].resetFields(); //清除验证
      this.status.updateDetailInfoModal = false;
    },

    //查看详情
    handleEdit(index) {
      this.toEdit(index.id);
      console.log(index)
      // this.fishListCopy=[index.items.itemName];
      this.showDetailInfo = index;
      this.showDetailInfo.acceptDate = this.showDetailInfo.acceptDate.substr(0, 10);
      this.showDetailInfo.checkDate = this.showDetailInfo.checkDate.substr(0, 10);
    },
    toEdit(id) {
      this.dataId = id;
      this.status.showDetailInfoModal = true;
    },

    // 附件
    fuJian(id) {
      this.uploadList.length = 0;
      // this.status.showFileModal = true;
      this.$http
        .get("/$admin/attachs?dataId=" + id)
        .then(response => {
          let attachs = response.data;
          for (let i = 0; i < attachs.length; i++) {
            let systemAttach = {
              name: attachs[i].name,
              dataId: attachs[i].id,
              status: "finished",
              url: this.$basePath + "/$admin/attachs/stream/" + attachs[i].id
            };
            this.uploadList.push(systemAttach);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fuJian2(id) {
      this.uploadList.length = 0;
      this.status.showFileModal = true;
      this.$http
        .get("/$admin/attachs?dataId=" + id)
        .then(response => {
          let attachs = response.data;
          for (let i = 0; i < attachs.length; i++) {
            let systemAttach = {
              name: attachs[i].name,
              dataId: attachs[i].id,
              status: "finished",
              url: this.$basePath + "/$admin/attachs/stream/" + attachs[i].id
            };
            this.uploadList.push(systemAttach);
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
  },
  mounted() {
    this.handleSearch();
    this.handleSearch();
    var fish = this.$store.getters.getDictList("fish_type");
    for (let i = 0; i < fish.length; i++) {
      //  var fish2=fish[i];
      var fish2 = fish[i].title;
      this.fishList.push(fish2);
    }
    fish.splice(16, 1);
    this.fishListCopy=this.fishList;
  }
};
</script>

<style scoped>
.text-required {
  display: inline-block;
  color: red;
}
.demo-auto-complete-item {
  border-bottom: 1px solid #f6f6f6;
  height: 200px !important;
  width: 100%;
  overflow: scroll;
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
.detail_info_modal .ivu-row {
  padding: 2px;
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
.detail_info_modal .ivu-input {
  width: 150px;
  margin-top: 3px;
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
</style>
