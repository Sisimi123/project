<!--渔船隐患自查统计表-->
<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <Card>
      <Row style="margin-bottom: 10px;">       
              <label>渔船名：&nbsp;&nbsp;</label><input  v-model="query.wheres.shipName"  placeholder="请输入..."   style="width:300px" class="selec ivu-input"  id="input-line" >  
              <Button  @click="handleSearch(1)" type="info" icon="ios-search" shape="circle">搜索</Button>
              <Button  @click="handleReset" type="warning" >重置</Button>
              <Button type="primary"  style="margin-left:35px;"  @click="daKai">新增</Button>
      </Row>
      <Row>
          <Table  ref="table"  @on-row-dblclick="handleEdit" :height="height" border :columns="columns" :data="dataList" :stripe=true :loading="status.isLoading" :highlight-row=true></Table>
      </Row>
      <Row>
      <div class="bottom">
          <Page show-total :total="totalNum" show-sizer show-elevator  placement=top @on-page-size-change="pageSizeChange" :page-size="query.size"  :current="query.page" @on-change="changePage" ></Page>
      </div>
      </Row>

       <Modal :styles="{top: '40px'}" v-model="status.addModal" :title="title"  width=800 :mask-closable="false" >
        <div  style="height:600px;overflow:auto;">
           <table class="regisbg"   border="1px" width=750 style="margin: 0 auto;">
                <caption>渔船隐患自查统计表</caption>

                <tr>
                    <td colspan="6">一、船舶概况</td>
                    <td colspan="6">七、安全设备情况（根据时间情况在相应栏内打"√”）</td>
                </tr>

                <tr>
                    <td colspan="1" >船名号<span class="text-required">&nbsp;*</span></td>
                    <td colspan="3">
                        <Select  v-model="formLeft.shipName" :filterable=true  :remote=true  placeholder="请输入关键词" :remote-method="searchShip" @on-change="selectShip">
                            <Option  v-for="item in shipOptions" :key="item"  :label="item"  :value="item" >{{item}}</Option>
                        </Select>						                        
                    </td>
                    <td colspan="1" >所有人<span class="text-required">&nbsp;*</span></td>
                    <td colspan="1">
                        	<input type="text" v-model="formLeft.ownerName"  class="whole-width" >	                        
                    </td>
                     <td colspan="2" rowspan="2">类别</td>
                    <td rowspan="2">应配数量</td>
                    <td rowspan="2">合格</td>
                    <td rowspan="2">缺少</td>
                    <td rowspan="2">无</td>
                </tr>

                <tr>
                    <td colspan="1" >主机功率<span class="text-required">&nbsp;*</span></td>
                    <td colspan="2">
                       	<input type="text" v-model="formLeft.hostPower" class="whole-width" >	  					                        
                    </td>
                    <td colspan="1" >吨位<span class="text-required">&nbsp;*</span></td>
                    <td colspan="2">
                        	<input type="text" v-model="formLeft.tonnage"  class="whole-width" >	                        
                    </td>
                </tr>
             
                <tr>
                    <td colspan="6"> 二、船舶证书情况（根据实际情况在相应栏内打"√”）</td>
                    <td rowspan="3">救生设备</td>
                    <td>救生衣</td>
                    <td><input class="sl" v-model="formLeft.jsy1"  type="text"/></td>
                    <td v-for="(opt,index) in option2"  > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.jsy2"  :value="opt">
                    </td>
                </tr> 

                <tr>
                    <td colspan="2">类别</td>
                    <td >有</td>
                    <td >有效</td>
                    <td >无效</td>
                    <td >无</td>
                    <td>救生圈</td>
                    <td><input class="sl" v-model="formLeft.jsq1" type="text" /></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"    v-model="formLeft.jsq2" :value="opt">
                    </td>
                </tr>

               <tr>
                    <td colspan="2">登记证书</td>
                    <td ><input type="radio" class="checkbox_cl"    ></td>
                    <td width="" v-for="(opt,index) in option2"  ><input type="radio" class="checkbox_cl"  :value="opt"></td>
                    <td>救生筏</td>
                    <td><input class="sl" v-model="formLeft.jsf1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.jsf2" :value="opt">
                    </td>                
                </tr>
                <tr>
                    <td colspan="2">船检证书</td>
                    <td ><input type="radio" class="checkbox_cl"    ></td>
                    <td width="" v-for="(opt,index) in option2"  ><input type="radio" class="checkbox_cl"  :value="opt"></td>
                    <td rowspan="4">消防设备</td>
                    <td>灭火器</td>
                    <td><input class="sl" v-model="formLeft.mhq1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.mhq2" :value="opt">
                    </td>                
                </tr>

                <tr> 
                    <td colspan="2">许可证</td>
                    <td ><input type="radio" class="checkbox_cl"   ></td>
                    <td v-for="(opt,index) in option2">
                        <input  type="radio" class="checkbox_cl" :value="opt" >
                    </td>
                    <td>灭火弹</td>
                    <td><input class="sl" v-model="formLeft.mhd1"  type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.mhd2" :value="opt">
                    </td>
                </tr>
 
                <tr>
                    <td colspan="2">航行签证</td>
                    <td ><input type="radio" class="checkbox_cl"     ></td>
                    <td v-for="(opt,index) in option2"  > <input    type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>黄沙箱</td>
                    <td><input class="sl" v-model="formLeft.hsx1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.hsx2" :value="opt">
                    </td>
                    
                </tr>

                <tr>
                    <td colspan="6">三、船员持证情况（根据实际情况在相应栏内打"√”）</td>
                    <td>消防桶</td>
                    <td><input class="sl" v-model="formLeft.xft1"  type="text" /></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.xft2" :value="opt">
                    </td>                    
                </tr>

                <tr>
                    <td colspan="2">类别</td>
                    <td >有</td>
                    <td >有效</td>
                    <td>无效</td>
                    <td>无</td>
                    <td rowspan="7">信号设备</td>
                    <td>桅灯</td>
                    <td><input class="sl" v-model="formLeft.wde1" type="text" /></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.wde2" :value="opt">
                    </td>                    
                </tr>

                <tr>
                    <td colspan="2">船长</td>
                    <td ><input type="radio" class="checkbox_cl"  ></td>
                    <td v-for="(opt,index) in option2"   > <input type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>舷灯</td>
                    <td><input class="sl" v-model="formLeft.xd1"  type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.xd2" :value="opt">
                    </td>
                </tr>

                <tr>
                    <td colspan="2">大副</td>
                    <td ><input type="radio" class="checkbox_cl"     ></td>
                    <td v-for="(opt,index) in option2"  > <input    type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>锚灯</td>
                    <td><input class="sl" v-model="formLeft.zd1"  type="text" /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.zd2" :value="opt">
                    </td>
                </tr>
                
                <tr>
                    <td colspan="2">二副</td>
                    <td ><input type="radio" class="checkbox_cl"    ></td>
                    <td v-for="(opt,index) in option2"  > <input  type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>尾灯</td>
                    <td><input class="sl" v-model="formLeft.wed1" type="text"  /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.wed2" :value="opt">
                    </td>                    
                </tr>

                <tr>
                    <td colspan="2">轮机长</td>
                    <td ><input type="radio" class="checkbox_cl"   v-model="formLeft.lifeBuoyReality"></td>
                    <td v-for="(opt,index) in option2"  > <input v-model="formLeft.chiefEngineerQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>环照灯</td>
                    <td><input class="sl" v-model="formLeft.hzd1" type="text"  /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.hzd2" :value="opt">
                    </td>                    
                </tr>

                <tr>
                    <td colspan="2">大管轮</td>
                    <td ><input type="radio" class="checkbox_cl"    ></td>
                    <td v-for="(opt,index) in option2"  > <input   type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>号钟</td>
                    <td><input class="sl" v-model="formLeft.hz1"  type="text" /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"   v-model="formLeft.hz2" :value="opt">
                    </td>
                </tr>

                 <tr>
                    <td colspan="2">二管轮</td>
                    <td ><input type="radio" class="checkbox_cl"    ></td>
                    <td v-for="(opt,index) in option2"  > <input  type="radio" class="checkbox_cl" :value="opt"></td>
                    <td>号笛</td>
                    <td><input class="sl" v-model="formLeft.hj1" type="text" /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.hj2" :value="opt">
                    </td>
                </tr>

                <tr>
                    <td colspan="2"></td>
                    <td colspan="2">应持证人数</td>
                    <td colspan="2">实持证人数</td> 
                    <td rowspan="5">通导设备</td>
                    <td>AIS</td>
                    <td><input class="sl"  v-model="formLeft.ais1" type="text" /></td>
                    <td  v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl" v-model="formLeft.ais2"  :value="opt">
                    </td>
                </tr> 

                <tr>
                    <td colspan="2" >四小证</td>
                    <td colspan="2"><input type="text" v-model="formLeft.numberOfLicensees" class="whole-width" ></td>
                    <td colspan="2"><input type="text" v-model="formLeft.actualNumberOfLicensees" class="whole-width"></td>
                    <td>卫星</td>
                    <td><input class="sl" v-model="formLeft.wx1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.wx2" :value="opt">
                    </td>                    
                </tr>
                <tr>
                    <td colspan="4" >四、安全生产责任书(承诺书)签订情况</td>                   
                    <td colspan="2"><input type="text"  class="whole-width"  v-model="formLeft.productionSafety"  ></td>
                    <td>单边带</td>
                    <td><input class="sl"  v-model="formLeft.dbd1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.dbd2"  :value="opt">
                    </td>                    
                </tr>
                <tr>
                    <td colspan="4"  >五、财产人身保险落实情况</td>                   
                    <td colspan="2"><input type="text"  class="whole-width"  v-model="formLeft.implementationSituation" ></td>
                    <td>卫导</td>
                    <td><input class="sl"  v-model="formLeft.wd1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.wd2"  :value="opt">
                    </td>                    
                </tr>
                <tr>
                    <td colspan="4" >六、有无违章违法行为</td>                   
                    <td colspan="2"><input type="text" class="whole-width"  v-model="formLeft.wrongIllegalAct"  ></td>
                    <td>雷达</td>
                    <td><input class="sl"  v-model="formLeft.ld1" type="text"/></td>
                    <td v-for="(opt,index) in option2" > 
                        <input type="radio" class="checkbox_cl"  v-model="formLeft.ld2"  :value="opt">
                    </td>                    
                </tr>
                <tr>
                    <td colspan="2" >船东签名</td>                   
                    <td colspan="2"><input type="text" v-model="formLeft.ownerSignature"   class="whole-width"  ></td>
                    <td colspan="2" >是否编组编队</td>                   
                    <td colspan="2">          
                        <RadioGroup v-model="formLeft.organizeFormation">
                            <Radio label="0">是</Radio>
                            <Radio label="1">否</Radio>
                        </RadioGroup>
                    </td>
                    <td colspan="2" >是否按规定填写渔捞日志</td>                   
                    <td colspan="2">
                        <RadioGroup v-model="formLeft.fishingRequired">
                            <Radio label="0">是</Radio>
                            <Radio label="1">否</Radio>
                        </RadioGroup>
                    </td>
                </tr>
                <tr>
                    <td colspan="8" style="text-align:left">乡镇审核人：<input type="text" v-model="formLeft.townAuditor" style="width:80%"   ></td>
                    <td colspan="4" style="text-align:left">乡镇盖章</td>                   
                </tr> 
            </table> 
         
        </div>  
        <div slot="footer">
              <i-Button @click="clear" >取消</i-Button>
              <i-Button @click="update" type="primary" v-show="addFh!=1">修改</i-Button>                          
              <i-Button @click="add" type="primary" >保存</i-Button>
        </div>   
    </Modal> 
    
  </Card>
  
</div>
</template> 

<script>
import { isNull } from "@/libs/common.js";
var formLeft = {
     parameteFileId:"",//台账案卷ID，外键

    shipName:"",//渔船名
      
    ownerName:"",//船东名字、所有人

    hostPower:"",//主机功率

    tonnage:"",//吨位

    dengji1:"",//登记证书 0无，1有
    
    dengJi2:"",//登记证书 0无效，1有效

    chuanJian1:"",//船检证书 0无，1有
    
    chuanJian2:"",//船检证书  0无效，1有效

    bulao1:"",//捕捞许可证0无，1有
    
    bulao2:"",//捕捞许可证0无效，1有效

    qianZheng1:"",//航行签证薄0无，1有
    
    qianZheng2:"",//航行签证薄0无效，1有效

    jsy1:"",//救生衣
    
    jsy2:"",//救生衣0无，1合格，2缺少

    jsq1:"",//救生圈
    
    jsq2:"",//救生圈0无，1合格，2缺少

    jsf1:"",//救生筏
    
    jsf2:"",//救生筏0无，1合格，2缺少

    mhq1:"",//灭火器
    
    mhq2:"",//灭火器0无，1合格，2缺少

    mhd1:"",//灭火弹
    
    mhd2:"",//灭火弹0无，1合格，2缺少

    hsx1:"",//黄沙箱
    
    hsx2:"",//黄沙箱0无，1合格，2缺少

    xft1:"",//消防桶
    
    xft2:"",//消防桶0无，1合格，2缺少

    cz1:"",//船长0无，1有
    
    cz2:"",//船长0无效，1有效

    df1:"",//大副0无，1有
    
    df2:"",//大副0无效，1有效

    ef1:"",//二副0无，1有
    
    ef2:"",//二副0无效，1有效

    ljz1:"",//轮机长0无，1有
    
    ljz2:"",//轮机长0无效，1有效

    dgl1:"",//大管轮0无，1有
    
    dgl2:"",//大管轮0无效，1有效

    egl1:"",//二管轮0无，1有
    
    egl2:"",//二管轮0无效，1有效
    
    wde1:"",//桅灯

    wde2:"",//桅灯0无，1合格，2缺少
    
    xd1:"",//舷灯

    xd2:"",//舷灯0无，1合格，2缺少
    
    zd1:"",//轴灯

    zd2:"",//轴灯0无，1合格，2缺少
    
    wed1:"",//尾灯

    wed2:"",//尾灯0无，1合格，2缺少
    
    hzd1:"",//环照灯

    hzd2:"",//环照灯0无，1合格，2缺少
    
    hz1:"",//号钟

    hz2:"",//号钟0无，1合格，2缺少
    
    hj1:"",//号箭

    hj2:"",//号箭0无，1合格，2缺少

    numberOfLicensees:"",//四小证应持证人数

    actualNumberOfLicensees:"",//四小证实际持证人数

    ais1:"",//AIS
    
    ais2:"",//AIS0无，1合格，2缺少
    
    wx1:"",//卫星
    
    wx2:"",//卫星0无，1合格，2缺少
    
    dbd1:"",//单边带
    
    dbd2:"",//单边带0无，1合格，2缺少
    
    ld1:"",//雷达
    
    ld2:"",//雷达0无，1合格，2缺少
    
    wd1:"",//卫导
    
    wd2:"",//卫导0无，1合格，2缺少

    productionSafety:"",//安全生产责任书(承诺书)签订情况

    implementationSituation:"",//财产人生保险落实情况

    wrongIllegalAct:"",//有无违章违法行为

    ownerSignature:"",//船东签名

    organizeFormation:"",//是否组织编队 :0否 1是

    fishingRequired:"",//是否按规定填写渔捞日志: 0否 1是

    townAuditor:"",//乡镇审核人

    townsSealed:"",//乡镇盖章

};
export default {
  name: "yh",
  components: {
    
  },
  data() {
    return {
      shipOptions:[],
      addFh: 0,
      title: "",
      totalNum: 1,
      height: "450",
      waiJian:"",
      query: {
            page: 1,
            size: 10,
            key:"getFishingBoatCheckPage",
            wheres: {         
               parameteFileId:"", 
               shipName:""                
            },
            orders: "updateTime desc" 
        },
      dataList: [], //数据集
      infoRules: {
        shipName: [{ required: true, message: "请输入执法机关", trigger: "blur" }],
        ownerName: [{ required: true, message: "请输入摊主", trigger: "blur" }]
        },
      option: [0,1],
      option2: [0,1,2],
      status: {       
        addModal: false,
        isLoading:true,
        bianJi:false,
      },

      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "渔船名",
          key: "shipName",
          align: "center"
        },
        {
          title: "船东",
          key: "ownerName",
          align: "center"
        },
        {
          title: "主机功率",
          key: "hostPower",
          align: "center"
        },
        {
          title: "上传时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          render: (h, params) => {
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
                      this.remove(params.row.id)
                      
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

      formLeft: { }
    };
  },

  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    },
   },
  mounted() {
    this.init();
  },
    methods: {
       init() {
         console.log(this.$route.query)
      if (
        this.$util.isNull(this.$route.query) ||
        this.$route.query.row == undefined
      ) {
        console.log("is null");
        return;
      }                  
        this.query.wheres.parameteFileId = this.$route.query.row;
        this.waiJian=this.$route.query.row;
        console.log(this.query.wheres.parameteFileId)
        this.handleSearch();
    },
// ======================= ========================== ============================ 列 表、查 看 ============================== =============================== ========================
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }
      this.$http
        //请求路径
        .get("fishingBoat/check/statistical/page", {
          //参数
          params: {
              _model: JSON.stringify(this.query)
          }
        })
        // 返回值
        .then(res => {
          this.dataList = res.data.data;
          this.totalNum = res.data.total;
          this.status.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 查询重置
    handleReset() {
      (this.query.page = 1),(this.query.wheres.shipName = ""), (this.query.size = 10), this.handleSearch();
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
    },
    handleEdit(index) {      
        this.status.bianJi=true;
        this.shipOptions = [index.shipName];
        this.$nextTick(function() {
            this.formLeft = index;
        });     
        // this.$refs["formLeft"].resetFields(); //清除验证
        this.title = "修改数据";
        this.status.addModal = true;
    },
// ======================= ========================== ============================ 新 增 ============================== =============================== ===============================
    daKai() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));
      // this.$refs["formLeft"].resetFields(); //清除验证
      this.shipOptions = [];
      this.status.bianJi=false;      
      this.title = "新增数据";
      this.status.addModal = true;      
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

          this.formLeft.ownerName = res.data.owner;
          console.log(this.formLeft.ownerName)
        //   this.formLeft.jobType = res.data.worktype;                        
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    add(formLeft) {
      
            let params = new URLSearchParams();
            console.log(this.waiJian);
            console.log(this.formLeft.parameteFileId);
            this.formLeft.parameteFileId=this.waiJian;
            params.append("_model", JSON.stringify(this.formLeft));
            this.$http
              .post("fishingBoat/check/statistical", params)
              .then(response => {
                this.status.addModal = false;
                this.handleSearch();
              })
              .catch(function(error) {
                console.log(error);
              });
        
  
    },

// ======================= ========================== ============================ 修 改 ============================== =============================== ===============================   
     update(value){
     
          let params = new URLSearchParams();
          params.append("_model",JSON.stringify(this.formLeft));        
          this.$http
            .put("fishingBoat/check/statistical/id",params)
            .then(response => {
              this.status.addModal = false;
              this.handleSearch();
            })
            .catch(function(error) {
              console.log(error);
            });
       
    },
// ======================= ========================== ============================ 删 除 ============================== =============================== =============================== 
    remove(id){       
        this.$http
        .delete("fishingBoat/check/statistical/"+id)
        .then(res => {
            this.handleSearch();
        })
        .catch(function(error) {
            console.log(error);
        });
    },
    clear(formLeft) {
      // this.$refs["formLeft"].resetFields();      
      this.status.addModal = false;
    },

  }
};
</script>

<style scoped>
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
</style>
