<style lang="less">
@import "../../../styles/commonStyle.less";
.inputDiv{
   overflow: hidden;
   display: block;
   margin-bottom: 15px
}
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/map/fuxiualarm/page'" :params="query" :columns="columns" :autoInitTable="false"
    @on-selection-change="selectChange">
    <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
                <Form-item label="船名:">
                  <Input v-model="query.wheres.shipname_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>

            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <span style="float:right;">
               <Button @click="configuration($event)" type="info" >配置</Button>
            </span>
          </span>
        </Row>
        </Form>
    </div>
  </data-table>
  <Modal v-model="model" title="伏休预警配置" width="1000" :mask-closable="false" :footer-hide="true">
     <div class="inputDiv">
        <Col span="5">
            <Form label="船名:">
            <Input v-model="tableQuery.wheres.name_like" placeholder="请输入..."></Input>
            </Form>
      </Col>
     <div class="btn-wrap">
         <Button @click="tableInitSearch()" type="primary" icon="ios-search" >搜索</Button>
         <Button @click="tableHandleReset()"  >重置</Button>
      </div>
      <span style="float:right;">
         <Button @click="addList()" type="success" >新增</Button>
      </span>
     </div>
     <Table border :columns="tableColumns" :data="data"></Table>
  </Modal>
  <Modal v-model="tableModel" :title="title" width="800" :mask-closable="false">
     <Form :model="formItem" :label-width="100" ref="formCustom" :rules="ruleCustom">
        <Row>
            <Col span="12">
              <FormItem label="开始时间：">
                 <Input v-model="startMonth" placeholder="" style="width:80px"></Input><span style="margin-left:10px">月</span>
                 <Input v-model="startDay" placeholder="" style="width:80px"></Input><span style="margin-left:10px">日</span>
              </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="结束时间：">
                 <Input v-model="endMonth" placeholder="" style="width:80px"></Input><span style="margin-left:10px">月</span>
                 <Input v-model="endDay" placeholder="" style="width:80px"></Input><span style="margin-left:10px">日</span>
              </FormItem>
            </Col>
         </Row>
        <FormItem label="伏休期名称：" prop="name">
                <Input v-model="formItem.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="终端类型：" prop="shiptypes">
           <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
               <Checkbox
                     :indeterminate="indeterminate"
                     :value="checkAll"
                     @click.prevent.native="handleCheckAll">全选</Checkbox>
            </div>  
            <CheckboxGroup  v-model="shiptypes"  @on-change="getCheckData" >
                <Checkbox label="1">拖网</Checkbox>
                <Checkbox label="2">围网</Checkbox>
                <Checkbox label="3">刺网</Checkbox>
                <Checkbox label="4">张网</Checkbox>
                <Checkbox label="5">钓具</Checkbox>
                <Checkbox label="6">笼壶</Checkbox>
                <Checkbox label="7">杂鱼具</Checkbox>
                <Checkbox label="8">陷阱</Checkbox>
                <Checkbox label="9">耙刺</Checkbox>
                <Checkbox label="10">渔运船</Checkbox>
                <Checkbox label="11">冷藏船</Checkbox>
                <Checkbox label="12">渔油船</Checkbox>
                <Checkbox label="13">油污船</Checkbox>
                <Checkbox label="16">科学教研</Checkbox>
                <Checkbox label="17">工程船</Checkbox>
                <Checkbox label="19">渔政船</Checkbox>
                <Checkbox label="20">海监艇</Checkbox>
                <Checkbox label="21">其他</Checkbox>
            </CheckboxGroup >     
        </FormItem>
      </Form> 
     <div v-show="addFooter" slot="footer">
        <Button @click="cancel('formCustom')">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="sure('formCustom')">确定</Button>
      </div>
      <div v-show="!addFooter" slot="footer">
        <Button @click="cancel('formCustom')">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="save('formCustom')">保存</Button>
      </div>
  </Modal>
</div>
</template> 

<script>
// import pic from "../../components/pic/pic.vue";
// import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

var formLeft = {

};
export default {
  components: {
   //  pic,
   //  selectShipModal
  },
  data() {
    return {
       ruleCustom:{
          name:[
             { required: true, message: "伏休期名称不能为空！", trigger: "blur" },
          ],
          shiptypes:[
             { required: true, message: "请勾选终端类型！", trigger: "blur" },
          ]
       },
       model:false,
       tableModel:false,
       addFooter:true,
       modal_loading:false,
       indeterminate: true,
       checkAll: false,
       title:"信息填写",
       columns:[
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "船名号",
          key: "shipname",
          align: "center"
        },
        {
          title: "经度",
          key: "lon",
          align: "center",
          render: (h, params) => {
             let lon = this.getLon(params.row.lon)
             return h("span", lon);
          }
        },
        {
          title: "纬度",
          key: "lat",
          align: "center",
          render: (h, params) => {
             let lat = this.getLat(params.row.lat)
             return h("span", lat);
          }
        },
        {
          title: "报位时间",
          key: "posTime",
          align: "center",
          render: (h, params) => {
             let time = this.getTime(params.row.posTime)
             return h("span", time);
          }
        },
        {
          title: "报位类型",
          key: "type",
          align: "center",
          render: (h, params) => {
             const type = params.row.type == 0 ? "出港":"入港";
             return h("span", type);
          }
        },
       ],
       // 查询条件
      query: {
        page: 1,
        size: 20,
        wheres: {
          shipname_like: "",
        },
      //   orders: "updateTime desc"
      },
      tableColumns:[
         {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "伏休期名称",
          key: "name",
          align: "center"
        },
        {
          title: "作业类型",
          key: "shiptypes",
          align: "center",
          render: (h, params) => {
             let shiptypes = this.changeType(params.row.shiptypes)
             return h("span", shiptypes);
          }
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            let buttons = []
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
                        this.amend(params.row);
                      }
                    }
                  },
                  "修改"
                )
              ),
              buttons.push(
                 h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.deleteList(params.row);
                      }
                    }
                  },
                  "删除"
                )
              )
            return h("div", buttons);
          }
        }
      ],
      data:[],
      tableQuery:{
         wheres:{
            name_like:"",
         }
      },
      formItem:{
         startTime:'',
         endTime:'',
         name:'',
         shiptypes:'',
      },
      startMonth:'',
      startDay:'',
      endMonth:'', 
      endDay:'',
      shiptypes:[]
    };
  },
  computed: {
   //  getFormItem() {
   //    return JSON.parse(JSON.stringify(formLeft)); //深拷贝
   //  },
   //  defaultUserName() {
   //    return this.$store.state.user.userInfo.name;
   //  },
  },
  // 方法.事件
  methods: {
     initSearch() {
      this.$refs.test.initSearch();
    },
     handleReset(){
        this.query.wheres.shipname_like = ""
        this.$refs.test.initSearch();
     },
     selectChange(){
        
     },
   //   initQuery(){
   //       var query = this.$route.query;
   //       if(!this.isEmpty(query.shipName)){
   //             this.query.wheres.shipName_like = query.shipName;
   //             this.query.wheres.withOutRule = "1";  
   //       }
   //       this.initSearch();
   //  },
    getTableData(){
       this.$http
        //请求路径
        .get("/map/fuxiuconfig", {
          //参数
          params: {
            query: JSON.stringify(this.tableQuery)
          }
        })
        // 返回值
        .then(res => {
           console.log(res,'res')
           this.data = res.data
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tableInitSearch(){
       this.getTableData()
    },
    tableHandleReset(){
       this.tableQuery.wheres.name_like = ""
       this.getTableData()
    },
    getTime(time){
      var date = new Date(time*1000)
     let y = date.getFullYear(); 
      let m = date.getMonth() + 1; 
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate(); 
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes(); 
      let second = date.getSeconds(); 
      minute = minute < 10 ? ('0' + minute) : minute; second = second < 10 ? ('0' + second) : second; 
      // console.log( y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second) 
      let dates = y + '-' + m + '-' + d  + ' ' + h + ':' + minute + ':' + second;
      return dates
    },
    getLon(lon){
      lon = lon/10000000
      let lonDre
      let lonMin
      let lonSec
      if (lon) {
         lonDre = parseInt(lon) + '°'
         lonMin = parseInt((lon - parseInt(lon)) * 60) + "'"
         lonSec = parseInt(((lon - parseInt(lon)) * 60 - parseInt((lon - parseInt(lon)) * 60)) * 60) + ' ' + '"E'
      } else {
         lonDre = "";
         lonMin = "";
         lonSec = ""
      }
      return lonDre + ' ' + lonMin + ' ' + lonSec
    },
    getLat(lat){
      lat = lat/10000000
      let latDre
      let latMin
      let latSec
      if (lat) {
         latDre = parseInt(lat) + '°'
         latMin = parseInt((lat - parseInt(lat)) * 60) + "'"
         latSec = parseInt(((lat - parseInt(lat)) * 60 - parseInt((lat - parseInt(lat)) * 60)) * 60) + ' ' + '"N'
      } else {
         latDre = "";
         latMin = "";
         latSec = ""
      }
      return latDre + ' ' + latMin + ' ' + latSec
    },
    isEmpty(s) {
        if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
            return true;
        }
        return false;
    },
    configuration(e){
       this.model = true
       console.log(e,'target')
      //  console.log(e.currentTarget ,'currentTarget ')
       this.getTableData()
    },
    changeType(type){
      //  console.log(type,'type')
       let typeList = []
       var workTypeReverse = {
         "1": "拖网",
         "2": "围网",
         "3": "刺网",
         "4": "张网",
         "5": "钓具",
         "6": "笼壶",
         "7": "杂鱼具",
         "8": "陷阱",
         "9": "耙刺",
         "10": "渔运船",
         "11": "冷藏船",
         "12": "渔油船",
         "13": "油污船",
         "16": "科学教研",
         "17": "工程船",
         "19": "渔政船",
         "20": "海监艇",
         "21": "其他"
         };
       type = type.split(',')
       for(var i =0 ;i<type.length;i++){
             typeList.push(workTypeReverse[type[i]])
       }
       typeList = typeList.join(',')
       return typeList
      //  console.log(typeList,'typeList')
    },
    addList(){
       this.tableModel = true
       this.addFooter = true
       this.title = "信息填写"
       delete this.formItem.id
       this.formItem.startTime = ""
       this.formItem.endTime = ""
       this.formItem.name = ""
       this.startMonth = ""
       this.startDay = ""
       this.endMonth = ""
       this.endDay = ""
       this.formItem.shiptypes = ""
       this.shiptypes = []
    },
    amend(row){
       console.log(row,"row")
       this.tableModel = true
       this.addFooter = false
       this.title = "信息修改"
       this.formItem.id = row.id
       this.formItem.startTime = row.startTime
       this.formItem.endTime = row.endTime
       this.formItem.name = row.name
       this.startMonth = (row.startTime).split('-')[0]
       this.startDay = (row.startTime).split('-')[1]
       this.endMonth = (row.endTime).split('-')[0]
       this.endDay = (row.endTime).split('-')[1]
       this.formItem.shiptypes = row.shiptypes
       this.shiptypes = (row.shiptypes).split(',')
      //  console.log( this.formItem,' this.formItem')
    },
    deleteList(row){
      //  console.log(row)
      this.$Modal.confirm({
        title: "操作确认",
        content: "<p>你确定要删除该条数据吗？</p>",
        onOk: () => {
          this.$http
            .delete("/map/fuxiuconfig/" + row.id)
            .then(res => {
              console.log(res);
              if (res.success) {
                  this.getTableData();
                  this.$Message.info("删除成功");
              } else {
                  this.$Message.error("删除失败");
              }
            });
        },
        onCancel: () => {}
      });
    },
    sure(name){
       if(this.startMonth == ""){
         this.$Message.error("开始时间月份不能为空！");
         return
      }
      if(this.startDay == ""){
         this.$Message.error("开始时间日期不能为空！");
         return
      }
      if(this.endMonth == ""){
         this.$Message.error("结束时间月份不能为空！");
         return
      }
      if(this.endDay == ""){
         this.$Message.error("结束时间日期不能为空！");
         return
      }
       this.formItem.shiptypes = (this.shiptypes).join(',')
       this.$refs[name].validate((valid) => {
        if (valid) {
            if(this.startMonth.indexOf("0") == -1){
               this.startMonth = '0' + this.startMonth
            }
            if(this.startDay.indexOf("0") == -1){
               this.startDay = '0' + this.startDay
            }
            if(this.endMonth.indexOf("0") == -1){
               this.endMonth = '0' + this.endMonth
            }
            if(this.endDay.indexOf("0") == -1){
               this.endDay = '0' + this.endDay
            }
            this.formItem.startTime = this.startMonth + '-' + this.startDay
            this.formItem.endTime = this.endMonth + '-' + this.endDay
            // console.log( this.formItem,' this.formItem')
            this.$http.post("/map/fuxiuconfig",this.formItem)
                     .then(res=>{
                        if(res.success){
                              this.getTableData();
                              this.tableModel=false;
                              this.$Message.info("新增成功");
                        }else{
                              this.$Message.error("新增失败");
                        }
                     });
        } else {
          this.$Message.error("填写存在错误");
          return;
        }
      });
    },
    save(name){
       if(this.startMonth == ""){
         this.$Message.error("开始时间月份不能为空！");
         return
      }
      if(this.startDay == ""){
         this.$Message.error("开始时间日期不能为空！");
         return
      }
      if(this.endMonth == ""){
         this.$Message.error("结束时间月份不能为空！");
         return
      }
      if(this.endDay == ""){
         this.$Message.error("结束时间日期不能为空！");
         return
      }
       this.formItem.shiptypes = (this.shiptypes).join(',')
       this.$refs[name].validate(valid => {
        if (valid) {
            if(this.startMonth.indexOf("0") == -1){
               this.startMonth = '0' + this.startMonth
            }
            if(this.startDay.indexOf("0") == -1){
               this.startDay = '0' + this.startDay
            }
            if(this.endMonth.indexOf("0") == -1){
               this.endMonth = '0' + this.endMonth
            }
            if(this.endDay.indexOf("0") == -1){
               this.endDay = '0' + this.endDay
            }
            this.formItem.startTime = this.startMonth + '-' + this.startDay
            this.formItem.endTime = this.endMonth + '-' + this.endDay
            this.$http.patch("/map/fuxiuconfig/"+this.formItem.id,this.formItem)
                     .then(res=>{
                        if(res.success){
                              this.getTableData();
                              this.tableModel=false;
                              this.$Message.info("修改成功");
                        }else{
                              this.$Message.error("修改失败");
                        }
                     });
        } else {
          this.$Message.error("填写存在错误");
          return;
        }
      });
    },
    cancel(name){
       this.$refs['formCustom'].resetFields();
       this.tableModel = false
    },
   getCheckData(data) {
      this.formItem.shiptypes = data
      if (data.length === 18) {
         this.indeterminate = false;
         this.checkAll = true;
      } else if (data.length > 0) {
         this.indeterminate = true;
         this.checkAll = false;
      } else {
         this.indeterminate = false;
         this.checkAll = false;
      }
   },
  handleCheckAll(){
     if (this.indeterminate) {
         this.checkAll = false;
      } else {
         this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
         this.shiptypes = ['1','2','3','4','5','6','7','8','9','10','11','12','13','16','17','19','20','21'];
         this.formItem.shiptypes = (this.shiptypes).join(',')
      } else {
         this.shiptypes = [];
         this.formItem.shiptypes = (this.shiptypes).join(',')
      }
  },
  },
  mounted() {
   //   if (!this.isEmpty(this.$route.query)) {
   //      this.initQuery();
   //  } else {
   //      this.initSearch();
   //  }
   this.initSearch()
  },
};
</script>

<style scoped>
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}

.text-left {
  text-align: left !important;
  text-indent: 2px;
}

th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input[type="checkbox" i] {
  margin: 0px !important;
}
input {
  outline: none;
  border: 0px;
  width: 65px;
  text-indent: 2px;
}
input.return_sj {
  width: 156px;
}
input.sl {
  width: 59px;
}

input.qm {
  width: 35%;
}
.mid-whole-width {
  width: 80%;
}
.whole-width {
  width: 100%;
}

caption {
  font-size: 25px;
  font-weight: 700;
}

.checkbox_cl {
  width: 15px !important;
  height: 15px !important;
  margin: 0 auto;
}

/*  以上是表格 */

.searColumn {
  padding: 10px 20px 10px 20px;
}
.fk-box {
  border: 1px solid #cccccc;
  padding-bottom: 20px;
}
label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}

label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}

label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}

.selec {
  width: 120px;
}

.selec2 {
  width: 85px;
}

.both-white-padding {
  margin: 0 20px;
}

th.ivu-table-column-left div.ivu-table-cell {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.el-input {
  font-size: 12px;
  border: none;
  out-line: none;
  color: #000;
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
.fk-box1 {
  border-bottom: 1px solid #cccccc;
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
  width: 90%;
}

.fk-time {
  background: #ece9e9;
  text-align: right;
  padding-right: 40px;
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
input:disabled {
  border: none;
  background-color: #fff;
  color: #aca899;
}

/* upload 样式 */
.demo-upload-list,
.qm-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.qm-upload-list {
  width: 200px;
  height: 200px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
