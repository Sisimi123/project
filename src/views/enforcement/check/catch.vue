<style lang="less">
@import "../styles/achive.less";
</style>
<template>
<div>
  <data-table ref="test" 
        :url="'/checks/kbjc/getList'" :params="query" :columns="columns" 
        @on-row-dblclick="handleEdit">
        <div slot="search">
            <!-- label-width 长度根据实际情况自行调整 -->
            <Form :label-width="100" @submit.native.prevent>
              <Row>
                <Col span="6">
                    <Form-item label="船名:">
                      <Input v-model="query.shipName"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>        
                <Col span="6">
                    <Form-item label="检查人:">
                      <Input v-model="query.checkMan" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="创建起始时间:">
                      <DatePicker @on-change="gteChange" type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="startTime"></DatePicker>
                    </Form-item>
                </Col>
                <div class="btn-wrap">
                  <Button @click="handleSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>

              </Row>
              <Row>
                <Col span="6">
                    <Form-item label="准许情况:">
                      <Select v-model="query.allowStatus">
                        <Option value="">全部</Option>
                        <Option value="准许">准许</Option>
                        <Option value="不准许">不准许</Option>
                      </Select>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="检查单位:">
                      <Input v-model="query.checkUnit" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="创建终止时间:">
                      <DatePicker @on-change="lteChange" type="date" placeholder="请选择日期" format="yyyy-MM-dd" v-model="endTime"></DatePicker>
                    </Form-item>
                </Col>          
              </Row>
            </Form>
        </div>
    </data-table>
    <Modal :styles="{top: '40px'}" v-model="status.addModal" title="图表预览"  width=850 :mask-closable="false" z-index:10>
      <div  style="margin-top:5px;height:600px;overflow:auto;">
            <input v-model="formLeft.status" type="hidden" readonly>
           <table class="regisbg"  border="1px" width=750 style="margin: 0 auto;">
                <caption>休渔开捕检查登记表</caption>
                <tr>
                    <td colspan="1">船名号<span class="text-required">&nbsp;*</span></td>
                    <td colspan="2">
                      <Select style="width:115px" disabled v-model="formLeft.shipinfo.shipName" :filterable=true   :remote=true  placeholder="请输入关键词" :remote-method="searchShip" @on-change="loadInfo">
                            <Option  v-for="(item, index) in shipnameList" :key="'shipnameList_'+index"  :label="item"  :value="item" >{{item}}</Option>
                      </Select>	
                    </td>
                    <td colspan="1">船东<span class="text-required">&nbsp;*</span></td>
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.owner"></td>
                    <td colspan="1">手机<span class="text-required">&nbsp;*</span></td>
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.cellphone"></td>
                    <td colspan="1">家电</td>
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.tellphone"></td>
                </tr>
                <tr>
                    <td colspan=3 >联系地址<span class="text-required">&nbsp;*</span></td>
                    <td colspan="9">
                        <input readonly v-model="formLeft.shipinfo.address">					                        
                    </td>
                </tr>
             <tr>                 
                <td colspan="2">租赁/挂靠人姓名</td>  
                <td colspan="2"><input readonly class="sl" v-model="formLeft.shipinfo.rdName" /></td>
                <td colspan="3">租赁/挂靠人地址</td>
                <td colspan="5"><input readonly class="sl" v-model="formLeft.shipinfo.rdAddress" /></td>
             </tr>  
                 <tr>
                    <td colspan="12"><b>一、船舶、船员证书及救助设备、安全培训情况（根据实际情况在相应栏内打钩）</b></td>
                </tr>

             <tr>
                    <td colspan="2">类别</td>
                    <td colspan="1">有效</td>
                    <td colspan="1">无效</td>
                    <td colspan="2">类别</td>
                    <td colspan="1">有效</td>
                    <td colspan="1">无效</td>
                    <td colspan="1" rowspan="7">渔船应急部署与培训情况</td>
                    <td colspan="1">类别</td>
                    <td colspan="1">有</td>
                    <td colspan="1">无</td>
                </tr>
                <tr>
                    <td colspan="2">渔船检验证</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'inspectionCertificate'+i" >
                       <input disabled type="radio" class="checkbox_cl" :value="opt" v-model="formLeft.shipinfo.inspectionCertificate">
                    </td>
                    <td colspan="2">船长</td>
                     <td  v-for="(opt,i) in shipMessage" :key="'headOfShip'+i"  >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.headOfShip">
                    </td>
                    <td rowspan="2">部署表</td>
                     <td rowspan="2" v-for="(opt,i) in deploy" :key="'deploymentTable'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.deploymentTable">
                    </td>
                </tr>
                <tr>
                    <td colspan="2">渔船登记证</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'registeCertificate'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.registeCertificate">
                    </td>
                    <td colspan="2">轮机长</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'lunJiZhang'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.lunJiZhang">
                    </td>
                   
                </tr>
                 <tr>
                    <td colspan="2">捕捞许可证	</td>
                     <td   v-for="(opt,i) in shipMessage"  :key="'catchingCertificate'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.catchingCertificate">
                    </td>
                    <td colspan="2">船副/大副	</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'daFu'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.daFu">
                    </td>
                     <td rowspan="2">实操演练</td>
                     <td rowspan="2" v-for="(opt,i) in deploy"  :key="'practice'+i">
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.practice">
                    </td>
                    
                </tr> 
                <tr>
                    <td colspan="2">航行签证簿		</td>
                     <td  v-for="(opt,i) in shipMessage" :key="'drvingDaily'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.drvingDaily">
                    </td>
                    <td colspan="2">管轮/大管轮</td>
                     <td  v-for="(opt,i) in shipMessage" :key="'daGuanLun'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.daGuanLun">
                    </td>
                </tr>
                 <tr>
                    <td colspan="2">AIS九位码</td>
                     <td  v-for="(opt,i) in shipMessage" :key="'AISNumber'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.AISNumber">
                    </td>
                    <td colspan="2">助理船副/二副	</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'erFu'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.erFu">
                    </td>
                    <td rowspan="2">面对面培训</td>
                     <td rowspan="2" v-for="(opt,i) in deploy" :key="'contentOfTable'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.contentOfTable">
                    </td>
                </tr>
                 <tr>
                    <td colspan="2">卫星终端ID</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'satelliteTerminalId'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.satelliteTerminalId">
                    </td>
                    <td colspan="2">助理管轮/二管轮</td>
                     <td   v-for="(opt,i) in shipMessage" :key="'erGuanLun'+i" >
                       <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.shipinfo.erGuanLun">
                    </td>
                </tr> 

                 <tr>
                    <td colspan="12"><b>二、作业类型、网具及重点渔船改动情况</b></td>
                </tr>
               

                <tr>
                    <td colspan="2">类别</td>
                    <td colspan="2">主作</td>
                    <td colspan="2">兼作</td>
                    <td colspan="2" rowspan="3">网具数量</td>
                    <td colspan="2">规定要求（顶、张</td>
                    <td colspan="2">实际携带（顶、张）</td>
                </tr>

                <tr>
                    <td rowspan="2" colspan="2">证载作业方式</td>
                    <td rowspan="2" colspan="2"><input readonly v-model="formLeft.shipinfo.leadingZhengZaiWorkWay"></td>
                    <td rowspan="2" colspan="2"><input readonly v-model="formLeft.shipinfo.minorZhengZaiWorkWay"></td>                   
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.specifiedNetAmount"></td>
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.realNetAmount"></td>
                </tr>
                
                <tr>
									<td  colspan="4">
										<!-- <input type="radio" name="fishingNet.isNetAmountViolation" value="合规" v-model="formLeft.shipinfo"  class="checkbox_cl" style="margin-left:20px">合规&nbsp;&nbsp;&nbsp;&nbsp;	
										<input type="radio" name="fishingNet.isNetAmountViolation" value="不合规" class="checkbox_cl" style="margin-left:70px">不合规 -->
                    <RadioGroup  v-model="formLeft.shipinfo.isNetAmountViolation">
                        <Radio disabled label="合规"></Radio>
                        <Radio disabled label="不合规"></Radio>
                    </RadioGroup>
									</td>
								</tr>

                <tr>
                    <td rowspan="2" colspan="2">实际作业方式</td>
                    <td rowspan="2" colspan="2"><input readonly v-model="formLeft.shipinfo.leadingRealWorkWay"></td>
                    <td rowspan="2" colspan="2"><input readonly v-model="formLeft.shipinfo.minorRealWorkWay"></td>
                    <td colspan="2" rowspan="3">网目尺寸情况</td>
                    <td colspan="2">规定要求（mm)</td>
                    <td colspan="2">实际测量（mm）</td>
                </tr>

                 <tr>                    
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.netHoleSpecied"></td>
                    <td colspan="2"><input readonly v-model="formLeft.shipinfo.netHoleReal"></td>
                </tr>

                <tr>
                  <td colspan="2">证业是否相符</td>
									<td  colspan="4">
									  <RadioGroup v-model="formLeft.shipinfo.zhengYeSituation">
                        <Radio disabled label="相符"></Radio>
                        <Radio disabled label="不相符"></Radio>
                    </RadioGroup>
									</td>
                 	<td  colspan="4">
										<RadioGroup v-model="formLeft.shipinfo.isNetHoleViolation">
                        <Radio disabled label="合规"></Radio>
                        <Radio disabled label="不合规"></Radio>
                    </RadioGroup>
									</td>
                </tr> 
              
                  
              <tr>
                  <td colspan="2">拖虾</td>
									<td  colspan="10">
                    <CheckboxGroup v-model="tuo">
                        <Checkbox disabled label="有网板"></Checkbox>
                        <Checkbox disabled label="有拖网网具"></Checkbox>
                        <Checkbox disabled label="尾部有长滚筒"></Checkbox>
                        <Checkbox disabled label="尾部未封闭"></Checkbox>
                        <Checkbox disabled label="尾部有支架"></Checkbox>
                        <Checkbox disabled label="有电脉冲设备"></Checkbox>
                    </CheckboxGroup>
									</td>
                </tr> 
              <tr>
                  <td colspan="2">渔运船</td>
									<td  colspan="10">
                    <CheckboxGroup v-model="yuYun">
                        <Checkbox disabled label="有起网设备"></Checkbox>
                        <Checkbox disabled label="有捕捞网具"></Checkbox>
                    </CheckboxGroup>
									</td>
                </tr> 

                <tr>
                    <td colspan="12"><b>三、主要安全生产救助设备有效配备情况</b></td>
                </tr>

               <tr v-show="formLeft.newtype==1||DQtype=='sys'">
                    <td colspan="2">类别</td>
                    <td >有</td>
                    <td >无</td>
                    <td colspan="2">类别</td>
                    <td >有</td>
                    <td >无</td>
                    <td colspan="2">类别</td>
                    <td >有</td>
                    <td >无</td>
                </tr>
                
                <tr v-show="formLeft.newtype==1||DQtype=='sys'">
                     <td colspan="2">救生筏</td>
                     <td colspan="1" v-for="(opt,i) in shipMessage" :key="'lifeRaftStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.lifeRaftStatus" :value="opt">
                    </td>
                    <td colspan="2">烟火信号</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'fireworksSignalStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.fireworksSignalStatus" :value="opt">
                    </td>
                    <td colspan="2">尾灯</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'tailLightStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.tailLightStatus" :value="opt">
                    </td>
                </tr> 
                <tr v-show="formLeft.newtype==1||DQtype=='sys'">
                     <td colspan="2">救生衣</td>
                     <td colspan="1" v-for="(opt,i) in shipMessage" :key="'lifeJacketStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.lifeJacketStatus" :value="opt">
                    </td>
                    <td colspan="2">桅灯</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'rangeLightStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.rangeLightStatus" :value="opt">
                    </td>
                    <td colspan="2">闪光灯</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'fogLightStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.fogLightStatus" :value="opt">
                    </td>
                </tr> 
                <tr  v-show="formLeft.newtype==1||DQtype=='sys'">
                     <td colspan="2">救生圈</td>
                     <td colspan="1" v-for="(opt,i) in shipMessage" :key="'lifeBuoyStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.lifeBuoyStatus" :value="opt">
                    </td>
                    <td colspan="2">舷灯</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'sideLightStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.sideLightStatus" :value="opt">
                    </td>
                    <td colspan="2">单边带</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'singleSidebandStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.singleSidebandStatus" :value="opt">
                    </td>
                </tr> 
                <tr  v-show="formLeft.newtype==1||DQtype=='sys'">
                     <td colspan="2">灭火器</td>
                     <td colspan="1" v-for="(opt,i) in shipMessage" :key="'fireExtinguisherStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.fireExtinguisherStatus" :value="opt">
                    </td>
                    <td colspan="2">锚灯</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'ridingLightStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.ridingLightStatus" :value="opt">
                    </td>
                    <td colspan="2">雷达</td>
                    <td colspan="1" v-for="(opt,i) in shipMessage" :key="'radarStatus'+i" >
                       <input disabled type="radio" class="checkbox_cl" v-model="formLeft.shipinfo.radarStatus" :value="opt">
                    </td>
                </tr>

       
                  <tr  v-show="formLeft.newtype==2||DQtype!='sys'">
                    <td >类别</td>
                    <td >应配</td>
                    <td >实配</td>
                    <td >有效</td>
                    <td >类别</td>
                    <td >应配</td>
                    <td >实配</td>
                    <td >有效</td>
                    <td >类别</td>
                    <td >应配</td>
                    <td >实配</td>
                    <td >有效</td>
                </tr>
                <tr v-show="formLeft.newtype==2||DQtype!='sys'">
                    <td >救生筏</td>
                    <td ><input  v-model="formLeft.shipinfo.needLifeRaft"  ></td>
                    <td ><input  v-model="formLeft.shipinfo.realLifeRaft"  ></td>
                    <td ><input  v-model="formLeft.shipinfo.badConditionLifeRafeRaftAmount"  ></td>
                    <td>烟火信号</td>
                    <td><input   v-model="formLeft.shipinfo.needFireworksSignal" ></td>
                    <td ><input  v-model="formLeft.shipinfo.realFireworksSignal"  ></td>
                    <td ><input     ></td>                    
                    <td >尾灯</td>
                    <td ><input v-model="formLeft.shipinfo.needTailLight"   ></td>
                    <td ><input v-model="formLeft.shipinfo.realTailLight"  ></td>
                    <td ><input    ></td>                    
                </tr> 
                <tr v-show="formLeft.newtype==2||DQtype!='sys'">
                    <td >救生衣</td>
                    <td ><input   v-model="formLeft.shipinfo.needLifeJacket"  ></td>
                    <td ><input    v-model="formLeft.shipinfo.realLifeJacket" ></td>
                    <td ><input      ></td>
                    <td >桅灯</td>
                    <td ><input    v-model="formLeft.shipinfo.needRangeLight" ></td>
                    <td ><input    v-model="formLeft.shipinfo.realRangeLight" ></td>
                    <td ><input     ></td>
                    <td >闪光灯</td>
                    <td ><input    v-model="formLeft.shipinfo.needFogLight" ></td>
                    <td ><input    v-model="formLeft.shipinfo.realFogLight" ></td>
                    <td ><input      ></td>
                </tr> 
                <tr v-show="formLeft.newtype==2||DQtype!='sys'">
                    <td >救生圈</td>
                    <td ><input   v-model="formLeft.shipinfo.needLifeBuoy" ></td>
                    <td ><input   v-model="formLeft.shipinfo.realLifeBuoy" ></td>
                    <td ><input    ></td>
                    <td  >舷灯</td>
                    <td ><input  v-model="formLeft.shipinfo.needSideLight"  ></td>
                    <td ><input  v-model="formLeft.shipinfo.realSideLight" ></td>
                    <td ><input    ></td>
                    <td  >单边带</td>
                    <td ><input   v-model="formLeft.shipinfo.needSingleSideband" ></td>
                    <td ><input   v-model="formLeft.shipinfo.realSingleSideband" ></td>
                    <td ><input     ></td>
                </tr> 
                <tr v-show="formLeft.newtype==2||DQtype!='sys'">
                    <td >灭火器</td>
                    <td ><input  v-model="formLeft.shipinfo.needFireExtinguisher"   ></td>
                    <td ><input   v-model="formLeft.shipinfo.realfireExtinguisher"  ></td>
                    <td ><input      ></td>
                    <td  >锚灯</td>
                    <td ><input    v-model="formLeft.shipinfo.needRidingLight"  ></td>
                    <td ><input    v-model="formLeft.shipinfo.realRidingLight"  ></td>
                    <td ><input      ></td>
                    <td  >雷达</td>
                    <td ><input   v-model="formLeft.shipinfo.needRadar"   ></td>
                    <td ><input   v-model="formLeft.shipinfo.realRadar"   ></td>
                    <td ><input      ></td>
                </tr>

               <tr>
                     <td rowspan="2" colspan="2">拟整改</n>内容</td>
                     <td rowspan="2" colspan="6"><textarea readonly v-model="formLeft.simulationPunishment"></textarea></td>
                     <td rowspan="2" colspan="2">准许开捕情况<span class="text-required">&nbsp;*</span></td>
                     <td >准许</td>
                     <td >不准许</td>
                </tr> 
               <tr>
                  <td colspan="1" v-for="(opt,i) in kaiBuZhunXu" :key="i" >
                      <input disabled type="radio" class="checkbox_cl"  :value="opt" v-model="formLeft.allowCatchingCondition">
                  </td>
               </tr> 
                              
           <tr>
              <td colspan="2">检察人员<span class="text-required">&nbsp;*</span></td>
              <td colspan="5"><input readonly v-model="formLeft.checkMan"></td>
              <td colspan="2">检察日期<span class="text-required">&nbsp;*</span></td>
              <td colspan="3">
                <!-- <input > -->
                <DatePicker type="date" disabled placeholder="请选择日期" style="width: 200px" v-model="formLeft.fisherAdminCheckdate"></DatePicker>
              </td>
            </tr>  

            </table> 
       
      </div>
      <!-- <div style="margin-top:20px;margin-left:350px">
        <Upload  multiple  
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :with-credentials="true"
                :max-size="20480"
                :on-exceeded-size="handleMaxSize"
                :on-format-error="handleFormatError"
                :action="actionUrl">
          <Button type="warning" icon="ios-cloud-upload-outline">附件(图片)上传</Button>
        </Upload>
      </div> -->
      <div slot="footer">
              <i-Button   @click="clear">取消</i-Button>
              <!-- <i-Button  type="primary" @click="update" v-show="ifupdate==1">修改</i-Button>
              <i-Button  type="primary" @click="sava" v-show="ifupdate!=1">确定</i-Button>
              <i-Button type="warning" icon="ios-cloud-upload-outline" @click="UploadWin=true">附件(图片)上传</i-Button> -->
      </div>
    </Modal>
    <Modal v-model="UploadWin" z-index:100 width:200>
          <Upload  multiple  
            :show-upload-list="false"
            :on-success="handleSuccess"
            :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
            :format="['jpg','jpeg','png']"
            :with-credentials="true"
            :max-size="20480"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :action="actionUrl">
            <i-Button icon="ios-cloud-upload-outline" >附件(图片)上传</i-Button>
          </Upload>
          <div slot="footer">
            <i-Button   @click="UploadWin=false">取消</i-Button>
          </div>
    </Modal> 
    <Modal :styles="{top: '40px'}" v-model="status.fuJianModal" title="附件内容" width="825" class="upload1" :mask-closable="false" :transfer='false'>
        <div class="demo-upload-list" :key="index" v-for="(data,index) in uploadList">
            <a @click="handleView(data.url)" target="_blank"> <img class="pic" :title="data.attachname" :src="data.url" width="200" height="150"/></a>
        </div>
    </Modal> 
    <pic v-model="status.showPic" :img="showPicPathWithBase" ></pic>
</div>
</template>

<script>
import pic from "../../components/pic/pic.vue";

var formLeft = {
  id: "",
  managerid: "", // 渔船北斗属于哪个组织结构 (储存这艘渔船北斗组织的县级id )
  userType: "", // 谁上传的这张表 执法人(zfr) 船主(czzc) 基层核查(jchc) 2017年7月31日 改为 抽查 核查 检查 自查
  simulationPunishment: "", // 拟整改内容
  makingCorrections: "", // 整改措施
  status: "", // 状态码 保存为草稿(0) 保存为最终稿(1)
  selfCheckResult: "", // 自查结果
  fisherAdminCheckResult: "", // 渔政检查签字
  allowCatchingCondition: "", // 是否准许开捕 value 准许 或者 不准许
  selfCheckdate: "", // 自查时间
  grassrootsUnitCheckdate: "", // 基层检查时间
  fisherAdminCheckdate: "", // 渔政抽查时间
  checkUnit: "", // 检查单位
  checkMan: "", // 检查人员姓名
  hasPhotos: "", // 1 表示有照片,0表示没有照片
  wu: "", // 1表示无类船,0表示不是无类船
  areacode: "", // 渔船的属地
  kbtjSign: "", // 开捕报表统计标识 勿删
  newtype: "", // 2017年8月31日 新类型（newtype=1 为执法人员，2为公众人员）
  shipinfo: {
    //子类（渔船信息）  ============= 头 ============
    shipName: "",
    owner: "",
    cellphone: "",
    tellphone: "",
    address: "",
    rdName: "", // 租赁公司的名称
    rdAddress: "", // 租赁地址
    rdName2: "",
    rdAddress2: "",

    //  =============第一部分============

    inspectionCertificate: "", // 船舶检验证书
    registeCertificate: "", // 注册登记证书
    catchingCertificate: "", // 捕捞许可证书
    drvingDaily: "", // 航行日志
    AISNumber: "", // AIS 九位码
    satelliteTerminalId: "", // 卫星终点Id

    nameOfHead: "", // 船长姓名
    headOfShip: "", // 船长证书情况 有 有效 无效 无
    nameOfDafu: "", // 大副姓名
    daFu: "", // 大副证书情况
    nameOferFu: "", // 二副姓名
    erFu: "", // 二副证书情况
    nameOflunJiZhang: "", // 轮机长姓名
    lunJiZhang: "", // 轮机长证书情况
    nameOfDaGuanLun: "", // 大管轮姓名
    daGuanLun: "", // 大管轮证书情况
    nameOfErGuanLun: "", // 二管轮姓名
    erGuanLun: "", // 二管轮证书情况

    deploymentTable: "", // 部署表 有 无
    practice: "", // 实操演练 有 无
    contentOfTable: "", // 面对面培训 有 无

    //  =============第二部分============

    leadingZhengZaiWorkWay: "", // 主要证载作业方式
    minorZhengZaiWorkWay: "", // 次要证载作业方式
    leadingRealWorkWay: "", // 主要实际作业方式
    minorRealWorkWay: "", // 次要实际作业方式
    zhengYeSituation: "", // value 为 相等 不符
    specifiedNetAmount: "", // 规定数量
    realNetAmount: "", // 实际数量
    isNetAmountViolation: "", // 网具数量情况 合规 不合规
    netHoleSpecied: "", // 网目尺寸规定要求 (mm)
    netHoleReal: "", // 网目尺寸实际情况
    isNetHoleViolation: "", // 网目尺寸情况 合规 不合规

    tuoXia: "", // 拖虾 □有网板 □有拖网网具 □尾部有滚筒 □尾部未封闭 □尾部有支架 □有电脉冲设备
    yuYunChuan: "", // □有起网设备 □有捕捞网具

    // =========================第三部分================================

    lifeRaftStatus: "", // 救生筏状态
    needLifeRaft: "", // 救生筏应配 数量
    realLifeRaft: "", // 救生筏实配 数量

    lifeJacketStatus: "", // 救生衣状态
    needLifeJacket: "", // 救生衣应配
    realLifeJacket: "", // 救生衣实配

    lifeBuoyStatus: "", // 救生圈状态
    needLifeBuoy: "", // 救生圈应配
    realLifeBuoy: "", // 救生圈实配实配

    fireExtinguisherStatus: "", // 灭火机状态
    needFireExtinguisher: "", // 灭火机应配
    realfireExtinguisher: "", // 灭火机实配

    fireworksSignalStatus: "", // 烟火信号状态
    needFireworksSignal: "", // 烟火信号应配
    realFireworksSignal: "", // 烟火信号实配

    rangeLightStatus: "", // 桅灯状态
    needRangeLight: "", // 桅灯应配
    realRangeLight: "", // 桅灯实配

    sideLightStatus: "", // 舷灯状态
    needSideLight: "", // 舷灯应配
    realSideLight: "", // 舷灯实配

    ridingLightStatus: "", // 锚灯状态
    needRidingLight: "", // 锚灯应配
    realRidingLight: "", // 锚灯实配

    tailLightStatus: "", // 尾灯状态
    needTailLight: "", // 尾灯应配
    realTailLight: "", // 尾灯实配

    fogLightStatus: "", // 雾灯状态
    needFogLight: "", // 雾灯应配
    realFogLight: "", // 雾灯实配

    singleSidebandStatus: "", // 单边带状态
    needSingleSideband: "", // 单边带应配
    realSingleSideband: "", // 单边带实配

    radarStatus: "", // 雷达状态
    needRadar: "", // 雷达应配
    realRadar: "", // 雷达实配

    badConditionLifeRafeRaftAmount: "", // 数量为坏的救生筏
    badConditionLifeJacketAmount: "", //
    badConditonLifeBuoyAmount: "", //
    badConditonFireExtinguisherAmount: "", //
    badConditonFireworksSignalAmount: "", //
    badConditonRangeLightAmount: "", //
    badConditonSideLightAmount: "", //
    badConditonRidingLightAmount: "", //
    badConditonTailLightAmount: "", //
    badConditonFogLightAmount: "", //
    badConditonSingleSidebandAmount: "", //
    badConditonFadarAmount: "" //
  }
};

export default {
  name: "catch",
  components: {
    pic
  },
  data() {
    return {
      UploadWin: false,
      actionUrl: this.$basePath + "/$admin/attachs", //上传URL
      status: {
        isLoading: true,
        loadingCase: true,
        addModal: false,
        fuJianModal: false,
        showPic: false
      },
      startTime:"",
      endTime:"",
      ifupdate: 0,
      option: ["是", "否"],
      shipMessage: ["有效", "无效"],
      deploy: ["有", "无"],
      kaiBuZhunXu: ["准许", "不准许"],
      shipnameList: [],
      buttonStatus: "",
      title: "",
      totalNum: 0,
      showPicPathWithBase: "",
      height: "400",
      checkTypes: ["全部", "已完成", "未完成"],
      zhunXuTypes: ["全部", "准许", "不准许"],
      uploadList: [], //附件
      columns: [
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "center"
        },
        {
          key: "shipinfo.shipName",
          title: "船名号",
          align: "center",

          render: (h, params) => {
            return h("span", params.row.shipinfo.shipName);
          }
        },
        {
          key: "shipinfo.owner",
          title: "渔船所有人",
          align: "center",

          render: (h, params) => {
            return h("span", params.row.shipinfo.owner);
          }
        },
        {
          key: "createTime",
          title: "创建时间",
          align: "center"
        },
        {
          key: "checkMan",
          title: "检查人",
          align: "center"
        },
        {
          key: "checkUnit",
          title: "检查单位",
          align: "center"
        },
        {
          key: "userType",
          title: "检查类型",
          align: "center"
        },
        {
          key: "allowCatchingCondition",
          title: "准许情况",
          align: "center"
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          width: 180,
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
                      this.handleEdit(params.row);
                      this.status.addModal = true;
                    }
                  }
                },
                "预览"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "20px"
                  },
                  on: {
                    click: () => {
                      this.fuJian(params.row.id);
                    }
                  }
                },
                "附件"
              )
            );
            return h("div", temp);
          }
        }
      ],
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
          nametheShip_eq: ""
        }
      },
     
      query: {
        page: 1,
        size: 10,
        shipName: "",
        startTime: "",
        endTime: "",
        checkUnit: "",
        allowStatus: "",
        checkMan: ""
      },
      dataList: [],
      tuo: [],
      yuYun: [],
      formLeft: {
        shipinfo: {}
      },
      validation: [
        "shipinfo.shipName",
        "shipinfo.owner",
        "shipinfo.cellphone",
        "checkMan",
        "fisherAdminCheckdate",
        "allowCatchingCondition"
      ],
      DQtype: ""
    };
  },
  computed: {
    getFormItem() {
      return JSON.parse(JSON.stringify(formLeft)); //深拷贝
    },
    defaultUserType() {
      return this.$store.state.user.userInfo.userType;
    },
    defaultUser() {
      return this.$store.state.user.userInfo;
    },
    
    now() {
      return new Date();
    }
  },
  methods: {
    gteChange(value,value2){
      this.query.startTime = value;
    },
    lteChange(value,value2){
      this.query.endTime = value;
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    handleSearch() {
      this.$refs.test.handleSearch();
      
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    dateFormat(time) {
      if (this.isEmpty(time)) {
        return "";
      }
      var d = new Date(time);
      return (
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds()
      );
    },
    pageSizeChange(size) {
      this.query.size = size;
      this.handleSearch();
    },
    changePage(page) {
      this.query.page = page;
      this.handleSearch();
    },
    handleReset() {
      for (let key in this.query) {
        this.query[key] = "";
      }
      (this.query.page = 1), (this.query.size = 10), this.handleSearch();
    },
    // =============================== 详 情 ================================
    handleEdit(index) {
      this.ifupdate = 1;
      this.DQtype = this.defaultUserType;
      this.toEdit(index.id);
      if (index.shipinfo.tuoXia != null && index.shipinfo.tuoXia != "") {
        var t = index.shipinfo.tuoXia;
        this.tuo = t.split(",");
      }
      if (
        index.shipinfo.yuYunChuan != null &&
        index.shipinfo.yuYunChuan != ""
      ) {
        var y = index.shipinfo.yuYunChuan;
        this.yuYun = y.split(",");
      }
      this.shipnameList = [index.shipinfo.shipName];
      this.$nextTick(function() {
        this.formLeft =JSON.parse(JSON.stringify(index));
      });
      // this.formLeft = index;
    },
    toEdit(id) {},
    // 附件
    fuJian(id) {
      this.uploadList.length = 0;

      this.status.fuJianModal = true;
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
    handleView(url) {
      this.showPicPathWithBase = url;
      this.status.showPic = true;
    },
    handleEdit2(index) {
      // this.fuJian(index.id);
      this.handleEdit(index);
      // this.formLeft = index;
      this.status.addModal = true;
    },
    // ==================================== 修 改  ===========================================

    update() {
      if (!this.validateFields()) {
        return;
      }
      var _self = this;
      _self.formLeft.shipinfo.tuoXia = _self.tuo.toString();
      _self.formLeft.shipinfo.yuYunChuan = _self.yuYun.toString();
      let params = new URLSearchParams();
      let ids = [];
      for (let i = 0; i < this.uploadList.length; i++) {
        ids.push(this.uploadList[i].dataId);
      }
      this.formLeft.grassrootsUnitCheckdate = new Date(this.formLeft.grassrootsUnitCheckdate);
      params.append("ids", ids);
      params.append("jsonEntity", JSON.stringify(this.formLeft));
      this.$http
        .post("/checks/kbjc/modify", params) //修改对象状态
        .then(response => {
          this.handleSearch();
          this.status.addModal = false;
          // this.clear();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    // =============================== 新 增 ==================================
    daKai() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));

      this.ifupdate = 0;
      this.tuo = [];
      this.yuYun = [];
      this.uploadList = [];

      this.shipnameList = [];
      this.DQtype = this.defaultUserType;
      this.status.addModal = true;
      this.buttonStatus = 1;
    },
    //判断必填项方法
    validateFields() {
      for (var i = 0; i < this.validation.length; i++) {
        var key = this.validation[i];
        if (this.formLeft[key] == "") {
          this.$Message.error("标※号必填");
          return false;
        }
      }
      return true;
    },

    //【取消按钮】清空新增窗口
    clear() {
      this.formLeft = JSON.parse(JSON.stringify(formLeft));
      this.formLeft.shipinfo = [];
      this.tuo = [];
      this.yuYun = [];

      this.status.addModal = false;
      this.buttonStatus = "";
      this.ifupdate = 0;
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
      this.xinXi.wheres.nametheShip_eq = this.formLeft.shipinfo.shipName;
      if (this.status.loadingCase) {
        this.status.loadingCase = false;
        return;
      }
      this.$http
        //请求路径
        .get("/shiparchives/nybycjb/page", {
          //参数
          params: {
            query: JSON.stringify(this.xinXi)
          }
        })
        // 返回值
        .then(res => {
          //    渔船名 nametheShip、渔船所有人 namevesselOwner、所有人地址 addressshipOwner、联系电话 shipOwnerTelephone

          this.formLeft.shipinfo.owner = res.data.data[0].namevesselOwner;
          this.formLeft.shipinfo.cellphone =
            res.data.data[0].shipOwnerTelephone;
          this.formLeft.shipinfo.address = res.data.data[0].addressshipOwner;
          this.status.loadingCase = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //新增提交
    sava() {
      if (!this.validateFields()) {
        return;
      }
      let _self = this;
      _self.formLeft.shipinfo.tuoXia = _self.tuo.toString();
      _self.formLeft.shipinfo.yuYunChuan = _self.yuYun.toString();
      let params = new URLSearchParams();
      let ids = [];
      for (let i = 0; i < this.uploadList.length; i++) {
        ids.push(this.uploadList[i].dataId);
      }
      params.append("ids", ids);
      params.append("jsonEntity", JSON.stringify(this.formLeft));
      _self.$http
        .post("/checks/kbjc/add", params)
        .then(function(response) {
          _self.$Message.success("操作成功");
          _self.handleSearch();
          _self.clear();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // ========================================================================================
    /* 上传 */
    handleSuccess(response, file, fileList) {
      let attr = {
        name: response.data.name,
        dataId: response.data.id,
        status: "finished",
        url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
      };
      this.uploadList.push(attr);
      this.UploadWin = false
      this.$Message.success('上传成功。')
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
    // ========================================================================================
    // 导出生成一张 Excel表格
    // exportData() {
    //   this.$refs.table.exportCsv({
    //     filename: "开捕表数据"
    //   });
    // }
    // ========================================================================
  },
  mounted() {
    this.initSearch();
  }
};
</script>

<style scoped>
/* ============================================================= */
body,
th,
td {
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}
.text-required {
  display: inline-block;
  color: red;
}

table.regisbg {
  border-collapse: collapse;
}

table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}
table.regisbg td input {
  width: 100%;
  height: 100%;

  margin: 0%;
  padding: 0%;
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
  margin-top: 5px;
  width: 100%;
  height: 100%;
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
