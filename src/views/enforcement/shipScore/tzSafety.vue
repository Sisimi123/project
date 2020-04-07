<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/enforces/shipscoresafecheck/page'" :params="query" :columns="columns" 
    @on-selection-change="selectChange"
    >
    <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
                <Form-item label="船名:">
                  <Input v-model="query.wheres.shipName_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="检查人:">
                  <Input v-model="query.wheres.checkMan_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>

            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <span style="float:right;">

                <Button @click="getPage()" type="success">进出港数据</Button>
                <Button @click="addPage()" type="info" icon="ios-add" >新增</Button>

            </span>
          </span>
        </Row>
        </Form>
    </div>
  </data-table>


  <!-- 数据查看/新增-->
  <Modal :styles="{top: '40px'}" v-model="status.addModal" :title="title"   width=800 :mask-closable="false" >
      <div  style="height:600px;overflow:auto;">
          <input v-model="formLeft.status" type="hidden">
        <table class="regisbg"   border="1px" width=750 style="margin: 0 auto;">
              <caption>台州市渔船安全检查登记表</caption>

              <tr>
                  <td colspan="6">一、船舶概况</td>
                  <td colspan="6">五、安全设备情况（根据时间情况在相应栏内打"√”）</td>
              </tr>

              <tr>
                  <td >船名号<span class="text-required">&nbsp;*</span></td>                                     
                  <td colspan="3">

                      <input type="text" class="whole-width" :readonly="readonly"  v-model="formLeft.shipName" style="width:70%;">
                      <Button @click="loadInfo" size="small" type="info" style="float:right;font-size:12px;">匹配</Button>				                        
                  </td>
                  <td colspan="1">主机功率<span class="text-required">&nbsp;*</span></td>
                  <td colspan="1">
                          <input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.masterPower">
                  </td>
                  <td colspan="2">类别</td>
                  <td>应配数量</td>
                  <td>合格</td>
                  <td>缺少</td>
                  <td>无</td>
              </tr>

              <tr>
                  <td colspan="2">作业类型<span class="text-required">&nbsp;*</span></td>
                  <td colspan="2"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.workType"></td>
                  <td colspan="1">船舶长度<span class="text-required">&nbsp;*</span></td>
                  <td colspan="1"><input type="text" class="whole-width" :readonly="readonly" v-model="formLeft.typeLength" ></td>
                  <td rowspan="3">救生设备</td>
                  <td>救生衣</td>
                  <td><input class="sl" v-model="formLeft.equipmentA" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly"  v-model="formLeft.equipmentAstatus" :value="opt.value">
                  </td>
              </tr>

              <tr>
                  <td colspan="1" >所有人<span class="text-required">&nbsp;*</span></td>
                  <td colspan="1"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.namevesselOwner"></td>
                  <td colspan="2" >所有人联系电话<span class="text-required">&nbsp;*</span></td>
                  <td colspan="2"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.shipOwnerTelephone"></td>
                  <td>救生圈</td>
                  <td><input class="sl" v-model="formLeft.equipmentB" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentBstatus" :value="opt.value">
                  </td>
              </tr>

              <tr>
                <td colspan="2">所有人地址<span class="text-required">&nbsp;*</span></td>
                <td colspan="4"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.addressshipOwner"></td>
                <td>救生筏</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.equipmentC" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentCstatus" :value="opt.value">
                  </td>
              </tr>

              <tr>
                  <td colspan="6"> 二、船舶证书情况（根据实际情况在相应栏内打"√”）</td>
                  <td rowspan="5">消防设备</td>
                  <td>灭火器</td>                  
                  <td><input class="sl" v-model="formLeft.equipmentD" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentDstatus" :value="opt.value">
                  </td> 
              </tr>

              <tr>
                  <td colspan="2">类别</td>
                  <td colspan="2">有效</td>
                  <td >无效</td>
                  <td colspan="1">无</td>
                  <td>太平斧</td>         
                  <td><input class="sl" v-model="formLeft.equipmentE" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentEstatus" :value="opt.value">
                  </td>  
              </tr>

              <tr>
                  <td colspan="2">登记证书</td>
                  <td width="" v-for="(opt,index) in option"  :colspan="index ==0?2:1">
                      <input type="radio" :disabled="readonly" class="checkbox_cl" v-model="formLeft.certificateA" :value="opt.value">
                  </td>
                  <td>消防桶</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.equipmentF"  type="text" /></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentFstatus" :value="opt.value">
                  </td>  
              </tr>

              <tr> 
                  <td colspan="2">船检证书</td>
                  <td v-for="(opt,index) in option"   :colspan="index==0?2:1">
                      <input v-model="formLeft.certificateB" :disabled="readonly" type="radio" class="checkbox_cl" :value="opt.value" >
                  </td>
                  <td>消防栓</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.equipmentG" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly" v-model="formLeft.equipmentGstatus" :value="opt.value">
                  </td>
              </tr>

              <tr>
                  <td colspan="2">捕捞许可证</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1">
                      <input :disabled="readonly" v-model="formLeft.certificateC"  type="radio" class="checkbox_cl" :value="opt.value">
                  </td>
                  <td>水龙带</td>
                  <td><input class="sl" v-model="formLeft.equipmentH" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentHstatus"  :value="opt.value">
                  </td>               
              </tr>

              <tr>
                  <td colspan="2">航行签证薄</td>
                  <td v-for="(opt,index) in option" :colspan="index==0?2:1">
                      <input v-model="formLeft.certificateD"  :disabled="readonly" type="radio" class="checkbox_cl" :value="opt.value">
                  </td>
                  <td rowspan="7">信号设备</td>
                  <td>桅灯</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.equipmentI" type="text" /></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentIstatus" :value="opt.value">
                  </td> 
              </tr>

              <tr>
                  <td colspan="6">三、船员持证情况（根据实际情况在相应栏内打"√”）</td>
                  <td>舷灯</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.equipmentJ"  type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentJstatus" :value="opt.value">
                  </td>                    
              </tr>

              <tr>
                  <td colspan="2">类别</td>
                  <td colspan="2">有效</td>
                  <td>无效</td>
                  <td>无</td>
                  <td>锚灯</td>
                  <td><input class="sl" v-model="formLeft.equipmentL" :readonly="readonly"  type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly" v-model="formLeft.equipmentLstatus" :value="opt.value">
                  </td>                                   
              </tr>

              <tr>
                  <td rowspan="6">职务证书</td>
                  <td >船长</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.captain" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td>尾灯</td>
                  <td><input class="sl" v-model="formLeft.equipmentK" :readonly="readonly" type="text"  /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentKstatus" :value="opt.value">
                  </td>
              </tr>

              <tr>
                  <td >船副</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.assistantCaptainA" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td>信号灯</td>
                   <td><input class="sl" v-model="formLeft.equipmentM" :readonly="readonly" type="text"  /></td>
                   <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentMstatus" :value="opt.value">
                  </td> 
              </tr>
              
              <tr>
                  <td >助理船副</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.assistantCaptainB" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td>雾钟</td>
                  <td><input class="sl" v-model="formLeft.equipmentN" :readonly="readonly" type="text"  /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentNstatus" :value="opt.value">
                  </td>                    
              </tr>

              <tr>
                  <td >轮机长</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.engineer" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td>号笛</td>
                  <td><input class="sl" v-model="formLeft.equipmentO" :readonly="readonly" type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.equipmentOstatus" :value="opt.value">
                  </td>                   
              </tr>

              <tr>
                  <td >管轮</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.assistantEngineerA" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td rowspan="8">通导设备</td>
                  <td rowspan="2">类型</td>
                  <td colspan="2">是否配备</td>
                  <td rowspan="2">开机</td>
                  <td rowspan="2">关机</td>
              </tr>

              <tr>
                  <td >助理管轮</td>
                  <td v-for="(opt,index) in option"   :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.assistantEngineerB" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td>是</td>
                  <td>否</td> 
              </tr>


              <tr>
                  <td colspan="2">类别</td>
                  <td colspan="2">应持证人数</td>
                  <td colspan="2">实持证人数</td>
                  <td>AIS</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentP" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentPstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>                     
              </tr>

              <tr> 
                  <td colspan="2">六小证</td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certAnumber" type="text" /></td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certAnumberActual" type="text"  /></td>
                  <td>卫星定位终端</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentQ" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentQstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>                        
              </tr>
              <tr>
                  <td colspan="2">技能合格证</td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certBnumber" type="text" /></td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certBnumberActual" type="text"/></td>
                  <td>卫星电话/宽带</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentR" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentRstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>
                                
              </tr>
              <tr>
                  <td colspan="2">氨机操作员</td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certCnumber" type="text" /></td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.certCnumberActual" type="text"/></td>
                  <td>VHF/BSS</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentS" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentSstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>   
                  
              </tr>
              <tr>
                  <td rowspan="2">值班</td>
                  <td colspan="2">职务船员值班</td>
                  <td colspan="2" style="padding:0;">其他船员值班</td>
                  <td>无人值班 </td>
                  <td>雷达</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentT" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentTstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  
              </tr>
              <tr>
                  <td colspan="2">
                    <input  :disabled="readonly" class="checkbox_cl" value="1" type="radio" v-model="formLeft.onDuty">
                  </td>
                  <td colspan="2" style="padding:0;">
                    <input  :disabled="readonly" class="checkbox_cl" value="2" type="radio" v-model="formLeft.onDuty">
                  </td>
                  <td>
                    <input  :disabled="readonly" class="checkbox_cl" value="0" type="radio" v-model="formLeft.onDuty">
                  </td>
                  <td>罗经</td>
                  <td v-for="(opt,index) in option4"><input :disabled="readonly" v-model="formLeft.equipmentU" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option5"> <input :disabled="readonly" v-model="formLeft.equipmentUstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>
              </tr>
              <tr>
                  <td colspan="6">四、船名号情况（根据实际情况在相应栏内打"√”）</td>
                  <td colspan="6">六、救生设备安装使用情况</td>                                      
              </tr>

              <tr>
                  <td colspan="2" rowspan="2">船名号船籍港</td>
                  <td colspan="2">清楚</td>
                  <td>不清楚</td>
                  <td>无</td>
                  <td colspan="2" rowspan="2">救生筏安装是否规范</td>
                  <td colspan="2">规范</td>
                  <td colspan="2">不规范</td>
              </tr>

              <tr>
                  <td v-for="(opt,index) in option3"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.shipInfoA" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option6" colspan="2"><input :disabled="readonly" v-model="formLeft.equipmentVstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>
              </tr>
              <tr>
                  <td colspan="2" rowspan="2">船名牌</td>
                  <td colspan="2">清楚</td>
                  <td>不清楚</td>
                  <td>无</td>
                  <td colspan="2" rowspan="2">临水作业人员是否穿救生衣</td>
                  <td colspan="2">有</td>
                  <td colspan="2">无</td>
              </tr>
              <tr>
                  <td v-for="(opt,index) in option3"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.shipInfoB" type="radio" class="checkbox_cl" :value="opt.value"></td>
                  <td v-for="(opt,index) in option7" colspan="2"><input :disabled="readonly" v-model="formLeft.equipmentWstatus" type="radio" class="checkbox_cl" :value="opt.value"></td>
              </tr>
              <tr>
                  <td colspan="2" >七、其他违章情况：</td>
                  <td colspan="10" >
                      <textarea rows="2" cols="120" :readonly="readonly" v-model="formLeft.otherStatus"></textarea>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" >八、整改措施或处理措施：</td>
                  <td colspan="10">
                      <textarea rows="2" :readonly="readonly" v-model="formLeft.rectify" ></textarea>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" rowspan="2">                   
                    检查地点
                    <span class="text-required">&nbsp;*</span>
                  </td>
                  <td colspan="4" rowspan="2">
                      <input type="text" :readonly="readonly" class="whole-width" v-model="formLeft.checkAddress">
                  </td>
                  <td class="text-left" colspan="6" rowspan="2">日期:
                    <span class="text-required">&nbsp;*</span>
                      <!-- <DatePicker  placement="top" type="date" placeholder="选择时间" format="yyyy-MM-dd HH:mm" v-model="formLeft.checkDate" style="height:32px;" class="mid-whole-width"></DatePicker> -->
                      <DatePicker type="datetime" placeholder="选择时间" :readonly="readonly" v-model="formLeft.checkDate" style="width: 200px"></DatePicker>
                  </td>
              </tr>
              <tr></tr>
              <tr>
                  <td class="text-left" colspan="4" >船长（船东）签名：
                      <input class="qm" v-model="formLeft.signature" :readonly="readonly" type="text" />
                  </td>
                  <td class="text-left" colspan="4">检查单位:                                       
                      <input class="qm" v-model="formLeft.checkDept" :readonly="readonly" type="text" />
                  </td>
                  <td class="text-left" colspan="4">检查人员:  
                      <span class="text-required">&nbsp;*</span>                     
                      <input class="qm" v-model="formLeft.checkMan" :readonly="readonly" type="text" />
                  </td>                  
              </tr>
          </table> 

      </div> 

      <div slot="footer">
          <div v-show="xg==1">
            <i-Button @click="clearJcdj" >取消</i-Button>
            <i-Button v-if="UserId == defaultUserId" @click="updateAqjcdj" type="primary">修改</i-Button>
          </div>

          <!-- 如果noteShow = true 并且  没有归档   则显示  【取消】、【确定】 按钮 -->
          <div v-show="!status.noteShow && selectStatus != '5'&&xg!=1 ">                            
              <i-Button @click="clearJcdj" >取消</i-Button>
              <i-Button @click="submitAqjcdj" type="primary" >保存</i-Button>
          </div>

      </div>      
  </Modal> 


  <pic v-model="status.showPic" :img="showPicPathWithBase" ></pic>
  <portReportModal v-model="status.showPortReport" @on-selected="initModal"></portReportModal>
  <selectShipModal v-model="baseShipModal.show"  :inputShipName="formLeft.shipName"  @on-select-ship="onSelectShip"></selectShipModal>

</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
import portReportModal from "./components/portReportModal.vue";
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

var formLeft = {
  //系统字段
  creatorId:"",  //创建人id
  creatorDeptId: "",//创建部门id
  creatorSiteId:"",//站点id
  //时间
  createTime:"", //创建时间
  updateTime:"", //更新时间
  //船舶概况
  shipName:"", // 船名号
  masterPower:"", // 主机功率
  // grossTonnage:"", // 吨位
  workType:"", // 作业类型
  shipOwnerTelephone:"", // 所有人联系电话
  typeLength:"", //船舶长度
  namevesselOwner:"", // 所有人
  addressshipOwner:"", // 所有人地址
  //船舶证书情况
  certificateA:"", //登记证书 1：有效；0：无效；2：无
  certificateB:"", // 船检证书 1：有效；0：无效；2：无
  certificateC:"", //捕捞许可证 1：有效；0：无效；2：无
  certificateD:"", //航行签证簿 1：有效；0：无效；2：无
  //船员持证
  captain: "", // 船长
  assistantCaptainA: "", // 船副
  assistantCaptainB: "", // 助理船副
  engineer: "", // 轮机长
  assistantEngineerA: "", // 管轮
  assistantEngineerB: "", // 助理管轮
  //技能证书
  certAnumber: "", // 六小证应持有
  certAnumberActual: "", // 六小证实际持有

  certBnumber: "", // 技能合格证应持有数量
  certBnumberActual: "", // 技能合格证实际持有

  certCnumber:"", // 氨机操作员应持证人数
  certCnumberActual:"",  // 氨机操作员实际持证人数
  
  onDuty:"", // 值班情况 1：职务船员值班；0：无人值班；2：其他船员值班
  // 船名号情况
  shipInfoA: "", // 船名号和船籍港（清楚、不清楚、无）
  shipInfoB: "", // 船名牌（清楚、不清楚、无）
  //安全设备情况
  equipmentA: "", // 救生衣数量
  equipmentAstatus: "", // 救生衣实际情况（合格，缺少，无）

  equipmentB: "", // 救生圈数量
  equipmentBstatus: "", // 救生圈实际情况（合格，缺少，无）

  equipmentC: "", // 救生浮数量
  equipmentCstatus: "", // 救生浮实际情况（合格，缺少，无）

  lifeRaftCount: "", // 救生筏数量
  lifeRaftReality: "", // 救生筏实际情况（合格，缺少，无）
  // 消防设备
  equipmentD: "", // 灭火器数量
  equipmentDstatus: "", // 灭火机实际情况 (1：合格；2：缺少；0：无)

  equipmentE:"", //太平斧应配数量
  equipmentEstatus:"", // 太平斧合格状态 (1：合格；2：缺少；0：无)

  equipmentG:"",  // 消防栓应配数量
  equipmentGstatus:"", // 消防栓合格状态 (1：合格；2：缺少；0：无)

  equipmentH:"", // 水龙带应配数量
  equipmentHstatus:"",  // 水龙带合格状态 (1：合格；2：缺少；0：无)

  equipmentF: "", // 消防桶数量
  equipmentFstatus: "", // 消防桶情况（合格，缺少，无）

  // 信号灯设备
  equipmentI: "", // 桅灯数量
  equipmentIstatus: "", // 桅灯数量情况（合格，缺少，无）

  equipmentJ: "", // 舷灯数量
  equipmentJstatus: "", // 舷灯数量情况（合格，缺少，无）

  equipmentL: "", // 锚灯数量
  equipmentLstatus: "", // 锚灯数量情况（合格，缺少，无）

  equipmentK: "", // 尾灯数量
  equipmentKstatus: "", // 尾灯数量情况（合格，缺少，无）

  equipmentN:"", // 雾钟应配数量
  equipmentNstatus:"", // 雾钟合格状态 1：合格；2：缺少；0：无

  equipmentN: "", // 雾钟数量
  equipmentNstatus: "", // 雾钟情况（合格，缺少，无）

  equipmentO: "", // 号笛数量
  equipmentOstatus: "", // 号笛数量情况（合格，缺少，无）
  // 通导设备
  equipmentS: "", //  VHF/SSB是否配备 1：是；0：否
  equipmentSstatus: "", // VHF/SSB状态 1：开机；0：关机

  equipmentP: "", // AIS是否配备 1：是；0：否
  equipmentPstatus: "", // AIS状态 1：开机；0：关机

  equipmentQ: "", // 卫星定位终端是否配备 1：是；0：否
  equipmentQstatus: "", // 卫星定位终端状态 1：开机；0：关机

  equipmentR:"", // 卫星电话/宽带是否配备 1：是；0：否
  equipmentRstatus:"", // 卫星电话/宽带状态 1：开机；0：关机

  equipmentT: "", // 雷达是否配备 1：是；0：否
  equipmentTstatus: "", // 雷达状态 1：开机；0：关机

  equipmentU: "", // 罗经是否配备 1：是；0：否
  equipmentUstatus: "", // 罗经状态 1：开机；0：关机
  // 值班情况
  watchState: "", // 值班情况（职务船员值班、其他船员值班、无人值班）
  // 救生设备安装使用情况
  equipmentVstatus:"", // 救生筏安装是否规范 1：规范；0：不规范
  equipmentWstatus: "",  // 临水作业人员是否穿救生衣 1：有；0：无
  //其他违规情况
  rectify: "", // 整改措施
  otherStatus:"", // 其他违规情况


  checkAddress: "", // 检查地址
  checkDate: "", // 检查时间
  signature:"", // 船东签名
  checkDept:"", // 检查部门
  checkMan:"", // 检查人

};
export default {
  components: {
    pic,
    portReportModal,
    selectShipModal
  },
  data() {
    return {
      baseShipModal:{
        show:false,
      },
      readonly:false,
      showPicPathWithBase: "",
      title: "",
      imgName:"",
      xg:0,
      // 加载状态
      status: {
        isLoading: true,
        showPic: false,

        noteShow: false,

        addModal: false,
        fkForm: false,
        loading: false,
        loadingCase: true,
        uploadModal: false, //上传签名
        bigPicModal: false, //大图展示
        visible:false,
        showPortReport: false,
      },
      selectId: "",
      selectStatus: "", //状态 == status   0=不合格 1 = 一开始就合格 2 船东已经更正等待反馈 3 执法人员已经反馈还未合格 4 已经更正合格 5 归档
      selectMasterSignature: "",
      dataId: "",
      totalNum: 1,
      dataList: [],
      shipnameList: [],
      UserId:"",
      
      qmList: [], //签名集合
      option:[
        {title:"有效",value:"1"},
        {title:"无效",value:"0"},
        {title:"无",value:"2"}
      ],
      option2:[
        {title:"合格",value:"1"},
        {title:"缺少",value:"2"},
        {title:"无",value:"0"}
      ],
      option3:[
        {title:"清楚",value:"1"},
        {title:"不清楚",value:"2"},
        {title:"无",value:"0"}
      ],
      option4:[
        {title:"是",value:"1"},
        {title:"否",value:"0"}
      ],
      option5:[
        {title:"开机",value:"1"},
        {title:"关机",value:"0"}
      ],
      option6:[
        {title:"规范",value:"1"},
        {title:"不规范",value:"0"}
      ],
      option7:[
        {title:"有",value:"1"},
        {title:"无",value:"0"}
      ],
      height: "450",
      note: {
        fknr: "",
        picModuleid: "",
        uploadList: [] //不上传的内容,做显示图片用
      },
      fishQuery: {
        page: 1,
        size: 100,
        wheres: {
          nametheShip_like: ""
        },
        orders: "createTime desc"
      },
      xinXi: {
        page: 1,
        size: 1,
        wheres: {
          nametheShip_like: "",
        }
      },
      getOne: {
        page: 1,
        size: 1,
        wheres: {
          id_eq: ""
        }
      },
      // 查询条件
      query: {
        page: 1,
        size: 10,
        wheres: {
          shipName_like: "",
          status_eq: "",
          masterName_like: ""
        },
        orders: "updateTime desc"
      },
      validation: ["shipName", "masterPower", "workType", "namevesselOwner","addressshipOwner","tpyeLength","checkMan","checkAddress","checkDate","shipOwnerTelephone"],
      // validation:[]
      // result: [
      //   { status: "0", value: "不合格" },
      //   { status: "1", value: "合格" },
      //   { status: "2", value: "待核实" },
      //   { status: "3", value: "待改正" },
      //   { status: "4", value: "已合格" },
      //   { status: "5", value: "已归档" }
      // ],
      resultMap: {
        itemk: ["yczsjg", "cyczjg", "jssbjg", "xfsbjg", "xhsbjg", "tdsbjg"],
        itemv: [
          [
            "certificateA",
            "certificateB",
            "certificateC",
            "certificateD"
          ], //渔船证书
          [
            "captain",
            "assistantCaptainA",
            "assistantCaptainB",
            "engineer",
            "assistantEngineerA",
            "assistantEngineerB"
          ], //船员证书
          [
            "equipmentAstatus",
            "equipmentBstatus",
            "equipmentCstatus",
            // "lifeJacketReality"
          ], //救生设备
          [
            "equipmentDstatus",
            "equipmentEstatus",
            "equipmentFstatus",
            "equipmentGstatus",
            "equipmentHstatus"
          ], //消防设备
          [
            "equipmentIstatus",
            "equipmentJstatus",
            "equipmentKstatus",
            "equipmentLstatus",
            "equipmentMstatus",
            "equipmentNstatus",
            "equipmentOstatus"
          ], //信号设备
          [
            "equipmentPstatus",
            "equipmentQstatus",
            "equipmentRstatus",
            "equipmentSstatus",
            "equipmentTstatus",
            "equipmentUstatus"
          ]
        ],
        itemY:[
            [
              "equipmentP",
              "equipmentQ",
              "equipmentR",
              "equipmentS",
              "equipmentT",
              "equipmentU"
            ],
            [
              "equipmentPstatus",
              "equipmentQstatus",
              "equipmentRstatus",
              "equipmentSstatus",
              "equipmentTstatus",
              "equipmentUstatus"
            ]
        ],
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          title: "船名号",
          key: "shipName",
          align: "center"
        },
        {
          title: "渔船所有人",
          key: "namevesselOwner",
          align: "center"
        },
        {
          title: "检查时间",
          key: "checkDate",
          align: "center"
        },
        {
          title: "检查人",
          key: "checkMan",
          align: "center"
        },
        {
          title: "检查地点",
          key: "checkAddress",
          align: "center"
        },
        // {
        //   title: "检查结果",
        //   key: "status",
        //   align: "center",
        //   render: function(h, params) {
        //     if (params.row.status == "0") {
        //       return h("span", "不合格");
        //     }
        //     if (params.row.status == "1") {
        //       return h("span", "合格");
        //     }
        //     if (params.row.status == "2") {
        //       return h("span", "待核实");
        //     }
        //     if (params.row.status == "3") {
        //       return h("span", "待改正");
        //     }
        //     if (params.row.status == "4") {
        //       return h("span", "已合格");
        //     }
        //     if (params.row.status == "5") {
        //       return h("span", "已归档");
        //     }
        //   }
        // },
        {
          title: "操作",
          key: "id",
          align: "center",
          render: (h, params) => {
            var flag = params.row.creatorId == this.defaultUserId;              
            var buttons = [

            ];

            buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // if (
                      //   params.row.status == "1" ||
                      //   params.row.status == "4"
                      // ) 
                      // {
                      //   //合格或者已经改正为合格,就不让显示提交反馈
                      //   this.status.fkForm = false;
                      // } else {
                      //   this.status.fkForm = true;
                      // }                   
                      this.handleEdit(params.row);
                      console.log(params)
                      this.UserId = params.row.creatorId
                      this.title = "详细信息";
                      this.xg=1;
                      this.status.addModal = true;
                      this.status.noteShow = true;
                    }
                  }
                },
                "详情"
              )
            );
              if(flag){
                buttons.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginLeft: '5px'
                  },
                  on: {
                    click: () => {
                      this.delete(params.row)
                    }
                  }
                },
                "删除"
              )
            ); 
              }     
            return h("div", buttons);
          }
        }
      ],
      formLeft: {
        notes: []
      },
      fkList: [],
      showDetailInfo: "",
      userSelection:[],
    };
  },
  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    },
    defaultUserName() {
      return this.$store.state.user.userInfo.name;
    },
    defaultUserId() {
      return this.$store.state.user.userInfo.userId;
    },
    now() {
      return new Date();
    },
    uploadData() {
      return {
        docid: this.selectId,
        moduleid: "anjc" //安全检查签名
      };
    },
    uploadData2: function() {
      var _self = this;
      return {
        docid: this.selectId,
        moduleid: _self.uuid()
      };
    }
  },
  // 方法.事件
  methods: {
    onSelectShip(res){
      console.log(res,'onSelectShip')
      this.formLeft.namevesselOwner= res.owner;
      this.formLeft.shipOwnerTelephone = res.tel;
      this.formLeft.addressshipOwner = res.address;
      this.formLeft.workType = res.shipmate;
      this.formLeft.typeLength = res.length;
      this.formLeft.masterPower = res.power;
      this.formLeft.shipName = res.shipname
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleSearch(value) {
      if (value == 1) {
        this.query.page = 1;
      }
      this.$refs.test.handleSearch();
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
    getPage(){
      this.status.showPortReport = true;
    },
    initModal(row){
      var _self = this;
      _self.formLeft = JSON.parse(JSON.stringify(formLeft));
      _self.formLeft.shipName = row.shipname;
      _self.title = "新增记录";
      _self.shipnameList = [];
      _self.formLeft.checkDate = _self.nowdate();
      _self.setDefaultValue();
      _self.status.noteShow = false;
      _self.selectStatus = "";
      _self.selectId = "";
      _self.status.addModal = true;
      _self.xg=0;
      _self.status.loadingCase = true;
    },
    // 分页查询
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    },
    select(selection) {
      var _self = this;
      _self.selectId = selection.id;
      _self.selectStatus = selection.status;
      _self.selectMasterSignature = selection.masterSignature;
    },

    //===================================== 新 增 方 法 ===================================
    addPage() {
      var _self = this;
      _self.formLeft = JSON.parse(JSON.stringify(formLeft));
      _self.title = "新增记录";
      _self.shipnameList = [];
      _self.formLeft.checkDate = _self.nowdate();
      _self.setDefaultValue();
      _self.status.noteShow = false;
      _self.selectStatus = "";
      _self.selectId = "";
      _self.status.addModal = true;
      _self.xg=0;
      _self.status.loadingCase = true;
    },
    setDefaultValue() {
      var _self = this;
      var arr = _self.resultMap.itemv;
      var arrY =  _self.resultMap.itemY
      _self.formLeft.shipInfoA = "1";
      _self.formLeft.shipInfoB = "1";
      _self.formLeft.onDuty = "1";
      _self.formLeft.equipmentVstatus = "1";
      _self.formLeft.equipmentWstatus = "1";
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i];
        for (var j = 0; j < arr2.length; j++) {
          var key = arr2[j];
          if (i <= 1) {
            _self.formLeft[key] = "1";
          } else {
            _self.formLeft[key] = "1";
          }
        }
      }
      for (var i = 0; i < arrY.length; i++) {
        var arrY2 = arrY[0];
        var arrY3 = arrY[1];
        for (var j = 0; j < arrY2.length; j++) {
          var key = arrY2[j];
          if (i <= 1) {
            _self.formLeft[key] = "1";
          } 
        }
        for (var j = 0; j < arrY3.length; j++) {
          var key = arrY3[j];
          if (i <= 1) {
            _self.formLeft[key] = "1";
          } 
        }
      }
    },
    //【取消按钮】清空新增窗口
    clearJcdj() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));
      this.status.addModal = false;
    },
    //判断必填项方法
    validateFields() {
      for (var i = 0; i < this.validation.length; i++) {
        var key = this.validation[i];
        if (this.formLeft[key] == "") {
          this.$Message.error("请填写必要项");
          return false;
        }
      }
      return true;
    },
    checkItemResult() {
      var _self = this;
      var itemk = _self.resultMap.itemk;
      var itemv = _self.resultMap.itemv;
      for (var i = 0; i < itemk.length; i++) {
        var k = itemk[i];
        var v = itemv[i];
        for (var j = 0; j < v.length; j++) {
          var vk = v[j];
          if (_self.formLeft[vk] != "合格" && _self.formLeft[vk] != "有效") {
            _self.formLeft[k] = "不合格";
            break;
          }
          if (j == v.length - 1) {
            _self.formLeft[k] = "合格";
          }
        }
      }
      for (var i = 0; i < itemk.length; i++) {
        var key = itemk[i];
        if (_self.formLeft[key] == "不合格") {
          _self.formLeft.status = "0"; //不合格
        }
      }
    },
    //新增提交
    submitAqjcdj() {
      delete this.formLeft.notes;
      if (!this.validateFields()) {
        return;
      }
      // if (this.formLeft.status == "") {
      //   this.formLeft.status = "1";
      //   this.checkItemResult();
      // }
      let _self = this;
      console.log("formLeft", _self.formLeft);
      _self.$http
        .post("/enforces/shipscoresafecheck/save", _self.formLeft)
        .then(function(response) {
          _self.$Message.success("操作成功");
          _self.handleSearch();
          _self.status.addModal = false;
          _self.clearJcdj();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //漁船搜索方法
    searchShip(shipName) {
      if (shipName == null || shipName == "") {
        return;
      }
      this.fishQuery.wheres.nametheShip_like=shipName;
      this.status.loading = true;
      this.status.loadingCase = false;
      this.$http
        //请求路径
        .get("/shiparchives/nybycjb/page", {
          //参数
          params: {
            query: JSON.stringify(this.fishQuery)
          }
        })
        // 返回值
        .then(res => {
          var ship = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if (
              res.data.data[i].nametheShip != "" &&
              res.data.data[i].nametheShip != null
            ) {
              ship.push(res.data.data[i].nametheShip);
            }
          }
          this.shipnameList = ship;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 得到渔船名 自动补全 船东，船名，地址，电话 方法
    loadInfo() {
      this.baseShipModal.show = true
      // this.xinXi.wheres.nametheShip_like = this.formLeft.shipName;
      // // if (this.status.loadingCase) {
      // //   this.status.loadingCase = false;
      // //   return;
      // // }
      // this.$http
      //   //请求路径
      //   .get("/shiparchives/normalnyb/getShipInfo", {
      //     //参数
      //     params: {
      //       query: JSON.stringify(this.xinXi)
      //     }
      //   })
      //   // 返回值
      //   .then(res => {
      //     console.log(res)
      //     //    渔船名 nametheShip、渔船所有人 namevesselOwner、所有人地址 addressshipOwner、联系电话 shipOwnerTelephone
      //     this.formLeft.namevesselOwner= res.data.data[0].namevesselOwner;
      //     this.formLeft.shipOwnerTelephone = res.data.data[0].shipOwnerTelephone;
      //     this.formLeft.addressshipOwner = res.data.data[0].addressshipOwner;
      //     this.formLeft.workType = res.data.data[0].workType;
      //     this.formLeft.typeLength = res.data.data[0].typeLength;
      //     this.formLeft.masterPower = res.data.data[0].power;
      //     this.formLeft.shipName = res.data.data[0].nametheShip
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    // 时间
    nowdate() {
      var date = new Date();
      return (
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },

    //====================================== 上 传 方 法 ==================================
    //上传签名
    handleSuccess(response, file, fileList) {
      let attr = {
        name: response.data.name,
        dataId: response.data.id,
        status: "finished",
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };
      // this.qmList.push(attr);
      this.formLeft.masterSignature = attr.dataId;

      this.$http
        .put("/checks/safecheck/" + this.formLeft.id, this.formLeft)
        .then(response => {
          this.status.uploadModal = false;
          this.handleSearch();
          this.$Message.success("上传成功");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //上传反馈照片
    handleSuccess2(response, file, fileList) {
      let attr = {
        name: response.data.name,
        dataId: response.data.id,
        status: "finished",
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };
      this.note.uploadList.push(attr);
      //  this.formLeft.notes.push(attr);
    },

    handleRemove(file) {
      var index = 0;
      for (var i = 0; i < this.note.uploadList.length; i++) {
        if (this.note.uploadList[i].dataId == file.dataId) index = i;
      }
      this.note.uploadList.splice(index, 1);
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
          " is incorrect, please select jpg or png or jpeg."
      });
    },

    //===================================== 改变状态（检查结果）=========================================
    //   归档   确认合格
    gd(type) {
      if(this.userSelection.length!=1){
          this.$Message.error({
              content:"请选择一条数据"
          });
          return;
      }
      var selection = this.userSelection[0];
      this.selectId = selection.id;
      this.selectStatus = selection.status;
      this.selectMasterSignature = selection.masterSignature;
      var _self = this;
      if (type == "5") {
        if (_self.selectStatus == "") {
          this.$Message.error("请选中一条记录");
          return;
        } else if (_self.selectStatus == "5") {
          this.$Message.error("已归档记录");
          return;
        } else if (_self.selectStatus != "4" && _self.selectStatus != "1") {
          this.$Message.error("检查还未合格");
          return;
        }
      }
      this.formLeft.id = this.selectId; //先获取ID查询到对象
      this.$http
        .get("/checks/safecheck/" + this.formLeft.id)
        .then(response => {
          this.formLeft = response.data;
          this.formLeft.status = type;
          this.$http
            .put("/checks/safecheck/" + this.formLeft.id, this.formLeft) //修改对象状态
            .then(response => {
              this.handleSearch();
              this.status.addModal = false;
              this.$Message.success("操作成功！");
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //===================================== 反馈内容 ====================================
    //修改
    updateAqjcdj(){
         delete this.formLeft.notes;
      if (!this.validateFields()) {
        return;
      }
      // if (this.formLeft.status == "") {
      //   this.formLeft.status = "1";
      //   this.checkItemResult();
      // }    
      let _self = this;       
      _self.$http
        .put("/enforces/shipscoresafecheck/save" + this.formLeft.id, _self.formLeft)
        .then(function(response) {
          _self.$Message.success("修改成功");
          _self.handleSearch();
          _self.status.addModal = false;
          _self.clearJcdj();
        })
        .catch(function(error) {
          console.log(error);
        })
    },
    //提交
    fkSubmit() {
      var _self = this;
      if (_self.note.fknr == "" && _self.note.uploadList.length == 0) {
        _self.$Message.error("没有反馈的内容或者图片");
        return;
      }
      this.formLeft.status = "3";
      var sc = [];
      for (let i = 0; i < this.note.uploadList.length; i++) {
        sc.push(this.note.uploadList[i].dataId);
      }
      var str = sc.toString();
      let test = {
        fknr: this.note.fknr,
        picIdList: str,
        createDate: new Date()
      };
      this.formLeft.notes.push(test);
      this.$http
        .put("/checks/safecheck/" + this.formLeft.id, this.formLeft) //修改对象状态
        .then(response => {
          this.note.fknr = "";
          this.note.uploadList = [];
          this.note.picModuleid = "";
          this.$refs.upload2.fileList = [];
          this.$Message.success("操作成功！");
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    uuid() {
      //先从反馈中获取moduleid,如果存在说明已经有图片上传过,就取当前的
      if (this.note.picModuleid != "") {
        return this.note.picModuleid;
      } else {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        this.note.picModuleid = uuid; //把uuid 赋给反馈
        return uuid;
      }
    },

    //取消
    clearFknote() {
      this.clearJcdj();
      this.note.fknr = "";
      this.note.picModuleid = "";
      this.note.uploadList = [];
      for (var i = 0; i < this.note.uploadList.length; i++) {
        this.note.uploadList.splice(i, 1);
        this.$http
          .delete("/$admin/attachs/" + file.dataId)
          .then(response => {})
          .catch(function(error) {
            console.log(error);
          });
      }
      this.status.addModal = false;
    },
    selectChange(selection){

      this.userSelection = selection;
    },

    //   详情
    handleEdit(index) {
      this.formLeft.id = index.id;
      this.$http
        .get("/enforces/shipscoresafecheck/" + this.formLeft.id)
        .then(response => {
          console.log("response",response);
          this.shipnameList = [response.data.shipName];
          this.$nextTick(function() {
            this.formLeft = response.data;
          });

          this.note.fknr = "";
          this.note.uploadList = [];
          this.note.picModuleid = "";
        })
        .catch(function(error) {
          console.log(error);
        });

      this.toEdit(index.id);
    },
    getImgUrl(fk) {
      var idList = fk.picIdList.split(",");
      var urlList = [];
      idList.forEach(element => {
        let url = this.$basePath + "/$admin/attachs/stream/" + element;
        urlList.push(url);
      });
      return urlList;
    },
    handleView(url) {
      this.showPicPathWithBase = url;
      this.status.showPic = true;
    },
    toEdit(id) {
      this.dataId = id;
    },
    handleEdit2(index) {   
      //状态 == status   0=不合格 1 = 一开始就合格 2 船东已经更正等待反馈 3 执法人员已经反馈还未合格 4 已经更正合格 5 归档  
      if(index.status==5||index.status==1||index.status==4){
        this.readonly=true;
      }else{
        this.readonly=false;
      }
      this.handleEdit(index);
      
      this.xg=1;
      this.title = "修改记录";      
      this.status.addModal = true;
    },
    //====================================     签名    ===========================================
    handleView1 (ID) {
      this.imgName = ID;
      this.status.visible = true;
    },
    //删除签名
    handleRemoveitem(masterSignature) {
      // this.formLeft.masterSignature=null;
      // this.formLeft.id = masterSignature;
      //
      //  this.$http
      // .get("/checks/safecheck/" + this.formLeft.id)
      // .then(response => {
      //   this.formLeft = response.data;
      //
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
      // co
      // this.$http
      // .put("/checks/safecheck/" + this.formLeft.id, this.formLeft)
      // .then(response => {
      //   this.$Message.success("删除成功");
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
    },

    //上传签名(打开窗口)
    uploadSignature() {
      if(this.userSelection.length!=1){
          this.$Message.error({
              content:"请选择一条数据"
          });
          return;
      }
      var selection = this.userSelection[0];
      this.selectId = selection.id;
      this.selectStatus = selection.status;
      this.selectMasterSignature = selection.masterSignature;
      if (this.selectStatus == "5") {
        this.$Message.error("已经归档不能上传签名");
        return false;
      }

      if (
        this.selectMasterSignature != null &&
        this.selectMasterSignature != "" &&
        this.selectMasterSignature != "0"
      ) {
        //0表示没有签名
        this.$Message.error("签名已经存在");
        return false;
      }
      this.formLeft.id = this.selectId;
      this.$http
        .get("/checks/safecheck/" + this.formLeft.id)
        .then(response => {
          this.formLeft = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.status.uploadModal = true;
    },
    //删除记录
    delete(index){
      this.formLeft.id = index.id;
      this.$Modal.confirm({                   
                    content: '<p>你确定要删除这条数据吗？</p>',
                    onOk: () => {
                        this.$http
        .delete("/enforces/shipscoresafecheck/" + this.formLeft.id)
        .then(response => {
          console.log("response",response);
          this.$Message.success("操作成功");
          this.handleSearch();
        })
        .catch(function(error) {
          console.log(error);
        });
                    },
                    onCancel: () => {
                    }
                });
      
    }
  },
  mounted() {
    this.handleSearch();
    var _self = this;
    Date.prototype.toISOString = function() {
      return (
        this.getFullYear() +
        "-" +
        (this.getMonth() + 1) +
        "-" +
        this.getDate() +
        " " +
        this.getHours() +
        ":" +
        this.getMinutes()
      );
    };
  }
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
