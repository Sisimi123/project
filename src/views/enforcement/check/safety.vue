<style lang="less">
@import "../../../styles/commonStyle.less";
</style>
<template>
<div>
  <data-table ref="test" 
    :url="'/checks/safecheck/page'" :params="query" :columns="columns" :autoInitTable="false"
    @on-selection-change="selectChange">
    <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
                <Form-item label="船名:">
                  <Input v-model="query.wheres.shipName_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="状态:">
                  <Select v-model="query.wheres.status_eq">
                      <Option v-for="item in result" :value="item.status" :key="item.status" >{{ item.value }}</Option>
                  </Select>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item label="所有人:">
                  <Input v-model="query.wheres.masterName_like" placeholder="请输入..."></Input>
                </Form-item>
            </Col>

            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <span style="float:right;">
              <!-- <ButtonGroup shape="circle"></ButtonGroup> -->
              <Button @click="addPage()" type="info" icon="ios-add" >新增</Button>
              <Button @click="uploadSignature()" type="info" >上传签名</Button>
              <Button @click="gd(5)" type="info">归档</Button>          
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
              <caption>浙江省渔船安全检查登记表</caption>

              <tr>
                  <td colspan="6">一、船舶概况</td>
                  <td colspan="6">五、安全设备情况（根据时间情况在相应栏内打"√”）</td>
              </tr>

              <tr>
                  <td colspan="2" >船名号<span class="text-required">&nbsp;*</span></td>
                  <td colspan="4">
                      <!-- <Select  v-model="formLeft.shipName" :filterable=true  v-show="formLeft.status!=5&&formLeft.status!=1&&formLeft.status!=4" :remote=true  placeholder="请输入关键词" :remote-method="searchShip" @on-change="loadInfo">
                          <Option  v-for="item in shipnameList" :key="item"  :label="item"  :value="item" >{{item}}</Option>
                      </Select>	 -->
                      <input type="text" style="width:80%;height:100%" :readonly="readonly" v-model="formLeft.shipName">		
                      <Button @click="loadInfo" size="small" type="info" style="float:right;font-size:12px;margin-top:3px">搜索</Button>				                                          
                  </td>
                  <td colspan="2">所有人地址<span class="text-required">&nbsp;*</span></td>
                  <td colspan="4">
                          <input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.masterAddress">
                  </td>
              </tr>

              <tr>
                  <td colspan="2" >所有人<span class="text-required">&nbsp;*</span></td>
                  <td colspan="4"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.masterName"></td>
                  <td colspan="2">类别</td>
                  <td>应配数量</td>
                  <td>合格</td>
                  <td>缺少</td>
                  <td>无</td>
              </tr>

              <tr>
                  <td colspan="2" >联系电话<span class="text-required">&nbsp;*</span></td>
                  <td colspan="4"><input type="text"  class="whole-width" :readonly="readonly" v-model="formLeft.masterPhone"></td>
                  <td rowspan="4">救生设备</td>
                  <td>救生衣</td>
                  <td><input class="sl" v-model="formLeft.lifeJacketCount" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly"  v-model="formLeft.lifeJacketReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="6"> 二、船舶证书情况（根据实际情况在相应栏内打"√”）</td>
                  <td>救生圈</td>
                  <td><input class="sl" v-model="formLeft.lifeBuoyCount" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.lifeBuoyReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="2">类别</td>
                  <td colspan="2">有效</td>
                  <td >无效</td>
                  <td colspan="1">无</td>
                  <td>救生浮</td>
                  <td><input class="sl" v-model="formLeft.lifeFloatCount" :readonly="readonly" type="text" /></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"   v-model="formLeft.lifeFloatReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="2">登记证书</td>
                  <td width="" v-for="(opt,index) in option"  :colspan="index ==0?2:1"><input type="radio" :disabled="readonly" class="checkbox_cl" v-model="formLeft.registerQualifications" :value="opt"></td>
                  <td>救生筏</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.lifeRaftCount" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.lifeRaftReality" :value="opt">
                  </td>                
              </tr>

              <tr> 
                  <td colspan="2">船检证书</td>
                  <td v-for="(opt,index) in option"   :colspan="index==0?2:1">
                      <input v-model="formLeft.shipCheckQualifications" :disabled="readonly" type="radio" class="checkbox_cl" :value="opt" >
                  </td>
                  <td rowspan="4">消防设备</td>
                  <td>灭火机</td>
                  <td><input class="sl" v-model="formLeft.fireExtinguisherCount" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.fireExtinguisherReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="2">捕捞许可证</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.catchLicence"  type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>灭火弹</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.fireExtinguisherBombCount" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly" v-model="formLeft.fireExtinguisherBombReality" :value="opt">
                  </td>
                  
              </tr>

              <tr>
                  <td colspan="2">航行签证薄</td>
                  <td v-for="(opt,index) in option" :colspan="index==0?2:1"> <input v-model="formLeft.navigationCertificate"  :disabled="readonly" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>黄沙箱</td>
                  <td><input class="sl" v-model="formLeft.sandBoxCount" :readonly="readonly" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.sandBoxReality"  :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="6">三、船员持证情况（根据实际情况在相应栏内打"√”）</td>
                  <td>消防桶</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.fireBucketCount"  type="text" /></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.fireBucketReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td colspan="2">类别</td>
                  <td colspan="2">有效</td>
                  <td>无效</td>
                  <td>无</td>
                  <td rowspan="6">信号设备</td>
                  <td>桅灯</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.rangeLightCount" type="text" /></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.rangeLightReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td rowspan="6">职务证书</td>
                  <td >船长</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.captainQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>舷灯</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.sideLightCount"  type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.sideLightReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td >大副</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.firstMateQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>锚灯</td>
                  <td><input class="sl" v-model="formLeft.ridingLightCount" :readonly="readonly"  type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl"  :disabled="readonly" v-model="formLeft.ridingLightReality" :value="opt">
                  </td>
              </tr>
              
              <tr>
                  <td >二副</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.secondMateQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>尾灯</td>
                  <td><input class="sl" v-model="formLeft.tailLightCount" :readonly="readonly" type="text"  /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.tailLightReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td >轮机长</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.chiefEngineerQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>雾钟</td>
                  <td><input class="sl" v-model="formLeft.fogBellCount" :readonly="readonly" type="text"  /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.fogBellReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td >大管轮</td>
                  <td v-for="(opt,index) in option"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.secondEngineerQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td>号笛</td>
                  <td><input class="sl" v-model="formLeft.hooterCount" :readonly="readonly" type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.hooterReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td >二管轮</td>
                  <td v-for="(opt,index) in option"   :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.thirdEngineerQualifications" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td rowspan="6">通导设备</td>
                  <td>VHF</td>
                  <td><input class="sl" v-model="formLeft.vhfcount" :readonly="readonly" type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.vhfreality" :value="opt">
                  </td>
              </tr>


              <tr>
                  <td colspan="2" rowspan="2">四小证</td>
                  <td colspan="2">应持证人数</td>
                  <td colspan="2">实持证人数</td>
                  <td>单边带</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.singleSidebandCount" type="text"/></td>
                  <td v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.singleSidebandReality" :value="opt">
                  </td>                    
              </tr>

              <tr> 
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.fourSmallCardMust" type="text" /></td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.fourSmallCardReality" type="text"  /></td>
                  <td>卫导</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.satelliteNavigatorCount" type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.satelliteNavigatorReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td colspan="2">技能合格证</td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.skillCertificateMust" type="text" /></td>
                  <td colspan="2"><input :readonly="readonly" v-model="formLeft.skillCertificateReality" type="text"/></td>
                  <td>雷达</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.radarCount"  type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.radarReality" :value="opt">
                  </td>
              </tr>

              <tr>
                  <td colspan="6">四、船名号情况（根据实际情况在相应栏内打"√”）</td>
                  <td>罗经</td>
                  <td><input class="sl" :readonly="readonly" v-model="formLeft.compassCount" type="text" /></td>
                  <td  v-for="(opt,index) in option2" > 
                      <input type="radio" class="checkbox_cl" :disabled="readonly"  v-model="formLeft.compassReality" :value="opt">
                  </td>                    
              </tr>

              <tr>
                  <td colspan="2" rowspan="2">船名号船籍港</td>
                  <td colspan="2">清楚</td>
                  <td>不清楚</td>
                  <td>无</td>
                  <td colspan="6">六、值班情况</td>
              </tr>

              <tr>
                  <td v-for="(opt,index) in option3"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.shipNumberIsClearly" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td colspan="2" rowspan="2">有人值班</td>
                  <td colspan="2">职务船员值班</td>
                  <td colspan="2"><input type="radio" class="checkbox_cl" :disabled="readonly" value="职务船员值班" v-model="formLeft.watchState"></td>
              </tr>
              <tr>
                  <td colspan="2" rowspan="2">船名</td>
                  <td colspan="2">清楚</td>
                  <td>不清楚</td>
                  <td>无</td>
                  <td colspan="2">其他船员值班</td>
                  <td colspan="2"><input type="radio" :disabled="readonly" class="checkbox_cl" value="其他船员值班" v-model="formLeft.watchState" ></td>
              </tr>
              <tr>
                  <td v-for="(opt,index) in option3"  :colspan="index==0?2:1"> <input :disabled="readonly" v-model="formLeft.shipNameIsClearly" type="radio" class="checkbox_cl" :value="opt"></td>
                  <td colspan="4">无人值班</td>
                  <td colspan="2"><input type="radio" :disabled="readonly" class="checkbox_cl" value="无人值班" v-model="formLeft.watchState"></td>
              </tr>
              <tr>
                  <td colspan="2" >七、其他违章情况：</td>
                  <td colspan="10" >
                      <textarea rows="2" cols="120" :readonly="readonly" v-model="formLeft.otherViolations"></textarea>
                  </td>
              </tr>
              <tr>
                  <td colspan="2" >八、整改措施：</td>
                  <td colspan="10">
                      <textarea rows="2" :readonly="readonly" v-model="formLeft.makingCorrections" ></textarea>
                  </td>
              </tr>
              <tr>
                  <td class="text-left" colspan="4" rowspan="2">船长（船东）签名：</td>
                  <td class="text-left" colspan="4">检查人:
                      <input class="qm" v-model="formLeft.checkUser1" :readonly="readonly" type="text" />、
                      <input class="qm" v-model="formLeft.checkUser2" :readonly="readonly" type="text" />
                  </td>
                  <td class="text-left" colspan="4" rowspan="2">日期:
                      <!-- <DatePicker  placement="top" type="date" placeholder="选择时间" format="yyyy-MM-dd HH:mm" v-model="formLeft.checkDate" style="height:32px;" class="mid-whole-width"></DatePicker> -->
                      <DatePicker type="date" placeholder="选择时间" :readonly="readonly" v-model="formLeft.checkDate" style="width: 200px"></DatePicker>
                  </td>
              </tr>
            <tr>
                  <td class="text-left" colspan="4">执法证号:
                      <input class="qm" v-model="formLeft.checkUserCardNo1" :readonly="readonly" type="text" />、
                      <input class="qm" v-model="formLeft.checkUserCardNo2" :readonly="readonly" type="text" />
                  </td>
              </tr>

              <tr>
                  <td class="text-left" colspan="12">检查地址:<input :readonly="readonly" class="mid-whole-width" v-model="formLeft.checkAddress" type="text" /></td>
              </tr>  
              
              <tr>
                  <td colspan="12"  >
                      说明：1、第二、三栏内的"有效”指所持证书在"有效期内”，"无效”指所持证书"超过有效期”或"船、证不符”或"人、证不符”；
                      2、第五栏内应配数量按船检证书记载内容填写，无船检证书的按实际配备数量填写。
                  </td>
              </tr> 

          </table> 
    
      <!--控制显示已经提交的反馈  -->
          <div class="fk-box" id="fk" v-show="status.noteShow&&xg!=1"   style="margin:30px auto 0 auto; ">
                  <p class="fk-title">反馈历史记录</p>
                    <div class="fk-box1" :key="index" v-for="(fk,index) in formLeft.notes">
                        <span :key="index" v-for="(url,index) in getImgUrl(fk)">                              
                            <a  @click="handleView(url)" ><img  class="fk-img" :src="url" ></a>                              
                        </span>  
                        <p class="fk-content">
                            <div class="fk-lyr">{{fk.type=="1"?"执法人员":"船东"}}：</div>
                            <div class="fk-text">{{fk.fknr}}</div>
                        </p>
                        <p class="fk-time">{{fk.type=="1"?'反馈时间':'留言时间' }}：{{fk.createDate}}</p> 
                  </div>
              <!-- 这里控制要不要显示提交反馈内容 -->
              <Form ref="fk"  :model="note" v-if="status.fkForm"   >
                  <Row>
                      <p class="fk-title">新增反馈意见</p>
                  </Row>
                  <Row>
                      <Col span="24">
                          <FormItem label="反馈内容：" >
                              <Input type="textarea" v-model="note.fknr"  placeholder="反馈内容......"  resize="none" ></Input> 
                          </FormItem>
                      </Col>
                  </Row>
                  <Row >
                      <Col span="24" >
                          <FormItem label="反馈照片："  :style="{'margin-bottom':'0px'}" >
                              <div class="demo-upload-list" :key="index" v-for="(item,index) in note.uploadList">
                                  <template v-if="item.status === 'finished'">
                                      <img :src="item.url">
                                      <div class="demo-upload-list-cover">
                                          <icon type="ios-eye-outline" @click.native="handleView1(item.dataId)"></icon>
                                          <icon type="ios-trash-outline" @click.native="handleRemove(item)"></icon>
                                      </div>
                                  </template>
                                  <template v-else>
                                      <i-progress v-if="item.showProgress" :percent="item.percentage" hide-info></i-progress>
                                  </template>
                              </div>
                              <Upload
                                  ref="upload2"
                                  multiple
                                  type="drag"
                                  :show-upload-list="false"
                                  :with-credentials="true"
                                  :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                                  :on-success="handleSuccess2"
                                  :on-format-error="handleFormatError"
                                  :on-exceeded-size="handleMaxSize"                   
                                  :format="['jpg','png','jpeg']"  
                                  :action="actionUrl"
                                  :data="uploadData2" 
                                  style="display: inline-block;width:58px;">
                                      <div style="width: 58px;height:58px;line-height: 58px;">
                                          <Icon type="camera" size="20"></Icon>
                                      </div>
                              </Upload>
                          </FormItem>
                      </Col>
                  </Row>
              </Form>        
          </div> 
      </div> 

      <div slot="footer">
          <div v-show="xg==1">
            <i-Button @click="clearJcdj" >取消</i-Button>
            <i-Button @click="updateAqjcdj" type="primary" v-show="addFh!=1&&(formLeft.status!=5&&formLeft.status!=1&&formLeft.status!=4)">修改</i-Button>
          </div>

          <!-- 如果noteShow = true 并且  没有归档   则显示  【取消】、【确定】 按钮 -->
          <div v-show="!status.noteShow && selectStatus != '5'&&xg!=1 ">                            
              <i-Button @click="clearJcdj" >取消</i-Button>
              <i-Button @click="submitAqjcdj" type="primary" >保存</i-Button>
          </div>
          <!-- 如果noteShow = false 并且 不是【一开始就合格】 并且不是【已经更正合格】 并且没有 【归档】 则显示【取消】【提交】【确定合格】按钮   （0不合格，2船东已经更正等待反馈 3执法人员已经反馈还未合格）    -->
          <div v-show="status.noteShow && selectStatus !='1' && selectStatus != '4' && selectStatus != '5' && xg!=1">
              <i-Button @click="clearFknote" >取消</i-Button>
              <i-Button type="primary"  @click="fkSubmit">提交</i-Button>
              <i-Button type="success" @click="gd('4')">确定合格</i-Button>
          </div>
      </div>      
  </Modal> 

  <Modal v-model="status.uploadModal" title="上传签名" width="500"  class="upload1" :mask-closable="false">
    <Upload
      ref="upload"
      :on-success="handleSuccess"
      :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
      :format="['jpg','jpeg','png']"
      :with-credentials="true"
      :max-size="20480"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      multiple
      type="drag"
      :action=actionUrl>
      <div style="padding: 5px 0">
          <Icon type="ios-cloud-upload" size="48" style="color: #3399ff"></Icon>
          <p>上传签名</p>
      </div>
    </Upload>
    
    <div slot="footer"></div>
  </Modal>

  <!-- 查看签名 -->
  <Modal v-model="status.qmModal" title="签名查看" width=450 >
      <div class="demo-upload-list"  >   
          <!-- <img :src="item.attachpath"> -->
          <img :src="qianMingUrl + this.formLeft.masterSignature"/>
          <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="bigPic"></Icon>
              <!-- <Icon type="ios-trash-outline" @click.native="handleRemoveitem(this.formLeft.masterSignature)"></Icon> -->
          </div>
      </div>
      <div slot="footer"></div>
  </Modal>
  
  <Modal title="查看大图" v-model="status.visible" class="upload1">
    <img :src="qianMingUrl + this.imgName" v-if="status.visible" style="width: 100%;">
  </Modal>
  

  <Modal class="vertical-center-modal" title="大图预览" v-model="status.bigPicModal">
    <img :src="qianMingUrl + this.formLeft.masterSignature" style="width: 100%">
  </Modal>

  <pic v-model="status.showPic" :img="showPicPathWithBase" ></pic>
  <selectShipModal v-model="baseShipModal.show"  :inputShipName="formLeft.shipName"  @on-select-ship="onSelectShip"></selectShipModal>
  <!-- <pic v-model="imgVisible" :img="imgUrl"></pic> -->
</div>
</template> 

<script>
import pic from "../../components/pic/pic.vue";
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';

var formLeft = {
  id: "",
  deptId: "",
  registerQualifications: "", // 登记证书
  shipCheckQualifications: "", // 船检证书
  catchLicence: "", // 捕捞许可证
  navigationCertificate: "", // 航行签证簿
  captainQualifications: "", // 船长
  firstMateQualifications: "", // 大副
  secondMateQualifications: "", // 二副
  chiefEngineerQualifications: "", // 轮机长
  secondEngineerQualifications: "", // 大管轮
  thirdEngineerQualifications: "", // 二管轮
  fourSmallCardMust: "", // 四小证应持有
  fourSmallCardReality: "", // 四小证实际持有
  skillCertificateMust: "", // 技能合格证应持有数量
  skillCertificateReality: "", // 技能合格证实际持有
  shipNumberIsClearly: "", // 船名号和船籍港（清楚、不清楚、无）
  shipNameIsClearly: "", // 船名（清楚、不清楚、无）
  lifeJacketCount: "", // 救生衣数量
  lifeJacketReality: "", // 救生衣实际情况（合格，缺少，无）
  lifeBuoyCount: "", // 救生圈数量
  lifeBuoyReality: "", // 救生圈实际情况（合格，缺少，无）
  lifeFloatCount: "", // 救生浮数量
  lifeFloatReality: "", // 救生浮实际情况（合格，缺少，无）
  lifeRaftCount: "", // 救生筏数量
  lifeRaftReality: "", // 救生筏实际情况（合格，缺少，无）
  // 消防设备
  fireExtinguisherCount: "", // 灭火机数量
  fireExtinguisherReality: "", // 灭火机实际情况（合格，缺少，无）
  fireExtinguisherBombCount: "", // 灭火弹数量
  fireExtinguisherBombReality: "", // 灭火弹实际情况（合格，缺少，无）

  sandBoxCount: "", // 黄沙箱数量
  sandBoxReality: "", // 黄沙箱实际情况（合格，缺少，无）
  fireBucketCount: "", // 消防桶数量
  fireBucketReality: "", // 消防桶情况（合格，缺少，无）

  // 信号灯设备
  rangeLightCount: "", // 桅灯数量
  rangeLightReality: "", // 桅灯数量情况（合格，缺少，无）
  sideLightCount: "", // 舷灯数量
  sideLightReality: "", // 舷灯数量情况（合格，缺少，无）

  ridingLightCount: "", // 锚灯数量
  ridingLightReality: "", // 锚灯数量情况（合格，缺少，无）

  tailLightCount: "", // 尾灯数量
  tailLightReality: "", // 尾灯数量情况（合格，缺少，无）

  fogBellCount: "", // 雾钟数量
  fogBellReality: "", // 雾钟情况（合格，缺少，无）

  hooterCount: "", // 号笛数量
  hooterReality: "", // 号笛数量情况（合格，缺少，无）
  // 通导设备
  vhfcount: "", // VHF(very high frequency)无线电数量
  vhfreality: "", // VHF桶情况（合格，缺少，无）

  singleSidebandCount: "", // 单边带数量
  singleSidebandReality: "", // 消防桶情况（合格，缺少，无）

  satelliteNavigatorCount: "", // 卫星导航仪数量
  satelliteNavigatorReality: "", // 卫星导航仪情况（合格，缺少，无）

  radarCount: "", // 雷达数量
  radarReality: "", // 雷达数量情况（合格，缺少，无）

  compassCount: "", // 罗经数量
  compassReality: "", // 罗经数量情况（合格，缺少，无）
  // 值班情况
  watchState: "", // 值班情况（职务船员值班、其他船员值班、无人值班）

  otherViolations: "", // 其他违章情况
  makingCorrections: "", // 整改措施

  masterSignature: "", // 船东（负责人）签名
  checkUser1: "", // 检查人员1
  checkUser2: "", // 检查人员2

  checkUserCardNo1: "", // 检查证号1
  checkUserCardNo2: "", // 检查证号2

  checkAddress: "", // 检查地址
  checkDate: "", // 检查时间

  shipName: "", // 船名号
  masterName: "", // 船主
  masterAddress: "", // 船主住址

  masterPhone: "", //船主手机号码

  yczsjg: "", //渔船证书合格情况
  cyczjg: "", //船员持证合格情况
  jssbjg: "", //救生设备合格情况
  xfsbjg: "", //消防设备合格情况
  xhsbjg: "", //信号设备合格情况
  tdsbjg: "", //通导设备合格情况
  status: "", //
  type: "", //

  createDate: "",
  updateDate: "",
  notes: []
};
export default {
  components: {
    pic,
    selectShipModal
  },
  data() {
    return {
      baseShipModal:{
        show:false
      },
      row: {},
      readonly:false,
      actionUrl: this.$basePath + "/$admin/attachs", //上传URL
      qianMingUrl: this.$basePath + "/$admin/attachs/stream/",
      addFh:0,
      showPicPathWithBase: "",
      title: "",
      imgName:"",
      xg:0,
      // 加载状态
      status: {
        isLoading: true,
        showPic: false,
        showDetailInfoModal: false,
        noteShow: false,
        shipPic: false,
        addModal: false,
        qmModal: false, //查看签名
        fkForm: false,
        loading: false,
        loadingCase: true,
        uploadModal: false, //上传签名
        bigPicModal: false, //大图展示
        visible:false,
      },
      selectId: "",
      selectStatus: "", //状态 == status   0=不合格 1 = 一开始就合格 2 船东已经更正等待反馈 3 执法人员已经反馈还未合格 4 已经更正合格 5 归档
      selectMasterSignature: "",
      dataId: "",
      totalNum: 1,
      dataList: [],
      shipnameList: [],

      qmList: [], //签名集合
      option: ["有效", "无效", "无"],
      option2: ["合格", "缺少", "无"],
      option3: ["清楚", "不清楚", "无"],
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
          nametheShip_eq: ""
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
      validation: ["shipName", "masterName", "masterAddress", "masterPhone"],
      result: [
        { status: "0", value: "不合格" },
        { status: "1", value: "合格" },
        { status: "2", value: "待核实" },
        { status: "3", value: "待改正" },
        { status: "4", value: "已合格" },
        { status: "5", value: "已归档" }
      ],
      resultMap: {
        itemk: ["yczsjg", "cyczjg", "jssbjg", "xfsbjg", "xhsbjg", "tdsbjg"],
        itemv: [
          [
            "registerQualifications",
            "shipCheckQualifications",
            "catchLicence",
            "navigationCertificate"
          ], //渔船证书
          [
            "captainQualifications",
            "firstMateQualifications",
            "secondMateQualifications",
            "chiefEngineerQualifications",
            "secondEngineerQualifications",
            "thirdEngineerQualifications"
          ], //船员证书
          [
            "lifeRaftReality",
            "lifeFloatReality",
            "lifeBuoyReality",
            "lifeJacketReality"
          ], //救生设备
          [
            "fireBucketReality",
            "sandBoxReality",
            "fireExtinguisherBombReality",
            "fireExtinguisherReality"
          ], //消防设备
          [
            "hooterReality",
            "fogBellReality",
            "tailLightReality",
            "ridingLightReality",
            "sideLightReality",
            "rangeLightReality"
          ], //信号设备
          [
            "compassReality",
            "radarReality",
            "satelliteNavigatorReality",
            "vhfreality",
            "singleSidebandReality"
          ]
        ]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          key: "masterName",
          align: "center"
        },
        {
          title: "检查时间",
          key: "checkDate",
          align: "center"
        },
        {
          title: "检查结果",
          key: "status",
          align: "center",
          render: function(h, params) {
            if (params.row.status == "0") {
              return h("span", "不合格");
            }
            if (params.row.status == "1") {
              return h("span", "合格");
            }
            if (params.row.status == "2") {
              return h("span", "待核实");
            }
            if (params.row.status == "3") {
              return h("span", "待改正");
            }
            if (params.row.status == "4") {
              return h("span", "已合格");
            }
            if (params.row.status == "5") {
              return h("span", "已归档");
            }
          }
        },
        {
          title: "操作",
          key: "id",
          align: "center",
          render: (h, params) => {
            var buttons = [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         window.open(
              //           "aqjcdj/aqjcdjPrint.jsp?id=" + params.row.id,
              //           "_blank"
              //         );
              //       }
              //     }
              //   },
              //   "打印"
              // )
            ];
            if (
              params.row.masterSignature != null &&
              params.row.masterSignature != "" &&
              params.row.masterSignature != "0"
            ) {
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
                        this.seeQm(params.row.masterSignature);
                      }
                    }
                  },
                  "查看签名"
                )
              );
            }
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
                      if (
                        params.row.status == "1" ||
                        params.row.status == "4"
                      ) {
                        //合格或者已经改正为合格,就不让显示提交反馈
                        this.status.fkForm = false;
                      } else {
                        this.status.fkForm = true;
                      }

                      this.handleEdit(params.row);
                      this.title = "详细信息";
                      this.xg=0;
                      this.status.addModal = true;
                      this.status.noteShow = true;
                    }
                  }
                },
                "详情"
              )
            );
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
      this.formLeft.masterName = res.owner;
      this.formLeft.masterPhone = res.tel;
      this.formLeft.masterAddress = res.address;
      this.formLeft.shipName = res.shipname
    },
    loadInfo(){
      this.baseShipModal.show = true
    },
    isEmpty(s) {
            if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
    },
    initQuery(){
            var query = this.$route.query;
            if(!this.isEmpty(query.shipName)){
                this.query.wheres.shipName_like = query.shipName;
                this.query.wheres.withOutRule = "1";  
            }
            this.initSearch();
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
      _self.formLeft.shipName = _self.query.wheres.shipName_like;
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
      _self.formLeft.shipNumberIsClearly = "清楚";
      _self.formLeft.shipNameIsClearly = "清楚";
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i];
        for (var j = 0; j < arr2.length; j++) {
          var key = arr2[j];
          if (i <= 1) {
            _self.formLeft[key] = "有效";
          } else {
            _self.formLeft[key] = "合格";
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
      if (this.formLeft.status == "") {
        this.formLeft.status = "1";
        this.checkItemResult();
      }
      let _self = this;
      _self.$http
        .post("/checks/safecheck", _self.formLeft)
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
    // loadInfo() {
    //   this.xinXi.wheres.nametheShip_eq = this.formLeft.shipName;
    //   if (this.status.loadingCase) {
    //     this.status.loadingCase = false;
    //     return;
    //   }
    //   this.$http
    //     //请求路径
    //     .get("/shiparchives/nybycjb/page", {
    //       //参数
    //       params: {
    //         query: JSON.stringify(this.xinXi)
    //       }
    //     })
    //     // 返回值
    //     .then(res => {
    //       //    渔船名 nametheShip、渔船所有人 namevesselOwner、所有人地址 addressshipOwner、联系电话 shipOwnerTelephone
    //       this.formLeft.masterName = res.data.data[0].namevesselOwner;
    //       this.formLeft.masterPhone = res.data.data[0].shipOwnerTelephone;
    //       this.formLeft.masterAddress = res.data.data[0].addressshipOwner;
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
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
        date.getMinutes()+
        ":" +
        date.getSeconds()
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
          // this.status.uploadModal = false;
          this.formLeft={};
          this.handleSearch();
          this.$Message.success("上传成功");
          // tp_
          this.userSelection = [];
          $(".ivu-upload-list-remove").click();
          $(".ivu-modal-close .ivu-icon-ios-close-empty").click();
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
      if(this.userSelection.length!=1 && type == "5"){
          this.$Message.error({
              content:"请选择一条数据"
          });
          return;
      }
      if (type == "4") {
        this.selectId = this.row.id;
        this.selectStatus = this.row.status;
        this.selectMasterSignature = this.row.masterSignature;
      } else if (type =="5") {
        var selection = this.userSelection[0];
        this.selectId = selection.id;
        this.selectStatus = selection.status;
        this.selectMasterSignature = selection.masterSignature;
      }
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
      if (this.formLeft.status == "") {
        this.formLeft.status = "1";
        this.checkItemResult();
      }
      let _self = this;
      _self.$http
        .put("/checks/safecheck/" + this.formLeft.id, _self.formLeft)
        .then(function(response) {
          _self.$Message.success("修改成功");
          _self.handleSearch();
          _self.status.addModal = false;
          _self.clearJcdj();
        })
        .catch(function(error) {
          console.log(error);
        });
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
      this.selectStatus = ''
      this.formLeft.id = index.id;
      this.row = index;
      this.$http
        .get("/checks/safecheck/" + this.formLeft.id)
        .then(response => {
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
    //查看签名
    seeQm(id) {
      this.status.qmModal = true;
      this.formLeft.masterSignature = id;
    },

     handleView1 (ID) {
                this.imgName = ID;
                this.status.visible = true;
            },
    //查看大图
    bigPic() {
      this.status.bigPicModal = true;
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
    }
  },
  mounted() {
    // this.handleSearch();
    // console.log(this.$route.query,'$route.query')
    var _self = this;
    if (!_self.isEmpty(_self.$route.query)) {
            _self.initQuery();
    } else {
        _self.initSearch();
    }
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
