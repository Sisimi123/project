<style lang="less" scoped>
@import "../../../styles/common.less";
@import "../styles/child.less";
</style>
<template>
  <div class="content-wrap transactionRegist">
    <!-- <menu class="left-menu" v-show="showleftMenu">
            <template v-for="item in leftMenu">
                <nav v-show="item.show" @click="selectLeftMenu(item.id)" :class="{active: leftActive == item.id}" :key="item.id">{{item.name}}</nav>
            </template>
    </menu>-->
    <data-content>
      <!-- <div class="right-button" :style="{'width':'100%','position': 'fixed','z-index':1000}">
            <div class="btn-wrap" v-show="paramsView=='1'">
                <input class="green" type="button" value="添加文书" @click="addDoc(true)" v-show="existsCaseInfo"/>
                <input class="green" type="button" value="启动流程" @click="startWorkFlow(true)" v-show="existsCaseInfo"/>
                <input class="green" type="button" value="附件" @click="cardShow=true"  v-show="existsCaseInfo"/>
                <input class="orange" type="button" value="保存" @click="saveDraft" />
                <input class="orange" type="button" value="草稿箱" @click="draftSearch" />
                <input class="orange" type="button" value="完成立案" @click="submitLian" v-show="existsCaseInfo"/>
                <input class="orange" type="button" value="撤回案件" @click="rollbackCase" v-show="ownCase&&caseInfo.status!='0'"/>
                <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase"/>
                <input class="orange" type="button" value="移送案件" @click="transferCase" v-show="ownCase"/>
                <input class="orange" type="button" value="移交案件" @click="handedCaseInfo.show=true" v-show="ownCase"/>
            </div>
            <div class="btn-wrap" v-show="paramsView=='2'">
                <input class="green" type="button" value="添加文书" @click="addDoc(true)" />
                <input class="green" type="button" value="启动流程" @click="startWorkFlow(true)" />
                <input class="green" type="button" value="附件" @click="cardShow=true"  v-show="existsCaseInfo"/>
                <input class="orange" type="button" value="保存" @click="saveDraft"/>
                <input class="orange" type="button" value="完成办理" @click="submitAjbl" />
                <input class="orange" type="button" value="撤回案件" @click="rollbackCase" v-show="ownCase&&caseInfo.status!='0'"/>
                <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase"/>
            </div>
            <div class="btn-wrap" v-show="paramsView=='8'">
                <input class="green" type="button" value="添加文书" @click="addDoc(true)" />
                <input class="green" type="button" value="启动流程" @click="startWorkFlow(true)" />
                <input class="green" type="button" value="附件" @click="cardShow=true"/>
                <input class="orange" type="button" value="保存" @click="saveDraft"/>
                <input class="orange" type="button" value="结案归档" @click="submitJiean"/>
                <input class="orange" type="button" value="撤回案件" @click="rollbackCase" v-show="ownCase&&caseInfo.status!='0'"/>
                <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase"/>
            </div>
            <div class="btn-wrap" v-show="paramsView=='9'">
                <input class="green" type="button" value="查看文书" @click="addDoc(false)" />
                <input class="green" type="button" value="查看立案审批" @click="showWs('R2',true)"/>
                <input class="green" type="button" value="查看行政处罚审批表" @click="showWs('R6',true)"/>
                <input class="green" type="button" value="查看行政结案报告" @click="showWs('R10',true)"/>
                <input class="green" type="button" value="附件" @click="cardShow=true"/>
                <input class="orange" type="button" value="撤回案件" @click="rollbackCase" v-show="caseInfo.status=='8'&&hasAdminRole"/>
                <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="caseInfo.status=='8'&&hasAdminRole"/>
            </div>
            <div class="btn-wrap" v-show="paramsView=='simpleCase'">
                <input class="green" type="button" value="现场检查笔录" @click="makeWs('R1')" />
                <input class="green" type="button" value="现场勘验笔录" @click="makeWs('R11')" />
                <input class="green" type="button" value="当场处罚决定书" @click="makeWs('R8')" />
                <input class="green" type="button" value="责令整改通知书" @click="makeWs('R9')" />
                <input class="green" type="button" value="附件" @click="cardShow=true"/>
                <input class="orange" type="button" value="保存" @click="saveSimpleCaseDraft"/>
                <input class="orange" type="button" value="结案归档" @click="submitSimpleCase"  v-show="existsCaseInfo"/>
            </div>
            <div class="btn-wrap" v-show="paramsView=='simpleCaseview'">
                <input class="green" type="button" value="现场检查笔录" @click="showWs('R1')" />
                <input class="green" type="button" value="现场勘验笔录" @click="showWs('R11')" />
                <input class="green" type="button" value="当场处罚决定书" @click="showWs('R8')" />
                <input class="green" type="button" value="责令整改通知书" @click="showWs('R9')" />
                <input class="green" type="button" value="附件" @click="cardShow=true"/>
                <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="(ownCase&&caseInfo.status=='0')||hasAdminRole"/>
            </div>
      </div>-->
      <div class="center-content" id="content" style="height:100%;">
        <Form ref="caseInfo" :model="caseInfo" :rules="caseInfoRules" :label-width="100">
          <div class="form-wrap" id="saay">
            <fieldset class="title">
              <legend>涉案案由</legend>
            </fieldset>
            <Row>
              <Col span="23">
                <FormItem label="涉嫌" prop="illegalAct">
                  <Input v-model="caseInfo.illegalAct" placeholder="请输入涉案案由" :readonly="true">
                    <Button slot="append" @click="discretionaryShow=true" size="small">选择</Button>
                  </Input>
                </FormItem>
              </Col>
              <Col span="1">
                <div style="padding-top: 7px;padding-left: 5px;">案</div>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="违反条款:">
                  <Input v-model="caseInfo.illegalClause" placeholder="请输入违反条款" :readonly="ifEdit"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="处罚依据:">
                  <Input
                    v-model="caseInfo.punishAccording"
                    placeholder="请输入处罚依据"
                    :readonly="ifEdit"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="ahly">
            <!-- 案件来源、地点及时间写这里 -->
            <fieldset class="title">
              <legend>案件来源、地点及时间</legend>
            </fieldset>
            <Row>
              <Col span="12">
                <FormItem label="案件来源:" prop="caseSource">
                  <Select v-model="caseInfo.caseSource" placeholder="请输入案件来源" :disabled="ifEdit">
                    <Option value="检查发现">检查发现</Option>
                    <Option value="群众举报或投诉">群众举报或投诉</Option>
                    <Option value="上级交办">上级交办</Option>
                    <Option value="有关部门移送">有关部门移送</Option>
                    <Option value="媒体曝光">媒体曝光</Option>
                    <Option value="监督抽检">监督抽检</Option>
                    <Option value="违法行为人交代">违法行为人交代</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="案发时间:" prop="caseHappenTime">
                  <Date-picker
                    tansfer
                    type="datetime"
                    :disabled="ifEdit"
                    placement="bottom-start"
                    v-model="caseInfo.caseHappenTime"
                    format="yyyy-MM-dd HH:mm"
                    placeholder="选择日期和时间"
                    :clearable="false"
                  ></Date-picker>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem label="案件主体:" prop="enforceMain">
                  <Select v-model="caseInfo.enforceMain" placeholder="请选择案件主体" :disabled="ifEdit">
                    <Option value="2">船</Option>
                    <Option value="1">人</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row v-show="caseInfo.caseType=='海上'">
              <Col span="12">
                <FormItem label="东经:">
                  <Row>
                    <Col span="7">
                      <FormItem prop="lonDu">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.lonDu"
                          placeholder="请输入经度"
                          @on-blur="()=>computeFishGrid('lonDu',180)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">度</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="7">
                      <FormItem prop="lonFen">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.lonFen"
                          placeholder="请输入经度"
                          @on-blur="()=>computeFishGrid('lonFen',60)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">分</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="7">
                      <FormItem prop="lonMiao">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.lonMiao"
                          placeholder="请输入经度"
                          @on-blur="()=>computeFishGrid('lonMiao',60)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">秒</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="3">
                      <Button @click="conversion('lon')">换算</Button>
                    </Col>
                    <!-- <div class="lonBox">
                      <Input
                          :readonly="ifEdit"
                          v-model="lon"
                          placeholder="请输入经度"
                          number
                        >
                      </Input>
                      <Button @click="conversionSure">确定</Button>                      
                    </div> -->
                  </Row>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="北纬:">
                  <Row>
                    <Col span="7">
                      <FormItem prop="latDu">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.latDu"
                          placeholder="请输入纬度"
                          @on-blur="()=>computeFishGrid('latDu',90)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">度</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="7">
                      <FormItem prop="latFen">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.latFen"
                          placeholder="请输入纬度"
                          @on-blur="()=>computeFishGrid('latFen',60)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">分</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="7">
                      <FormItem prop="latMiao">
                        <Input
                          :readonly="ifEdit"
                          v-model="caseInfo.latMiao"
                          placeholder="请输入纬度"
                          @on-blur="()=>computeFishGrid('latMiao',60)"
                          @on-keydown="keydown"
                          number
                        >
                          <span slot="append">秒</span>
                        </Input>
                      </FormItem>
                    </Col>
                    <Col span="3">
                      <Button @click="conversion('lat')">换算</Button>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem label="案发地点:" prop="caseType">
                  <Select v-model="caseInfo.caseType" placeholder="请输入案件类型" :disabled="ifEdit">
                    <Option value="海上" selected>海上</Option>
                    <Option value="港口">港口</Option>
                    <Option value="陆上">陆上</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8" v-show="caseInfo.caseType=='海上'">
                <FormItem label="大渔区:">
                  <Input :readonly="ifEdit" v-model="caseInfo.bfishingarea" placeholder="请输入大渔区"></Input>
                </FormItem>
              </Col>
              <Col span="8" v-show="caseInfo.caseType=='海上'">
                <FormItem label="小渔区:">
                  <Input :readonly="ifEdit" v-model="caseInfo.sfishingarea" placeholder="请输入小渔区"></Input>
                </FormItem>
              </Col>
              <Col span="16" v-show="caseInfo.caseType=='港口'">
                <FormItem label="港口:">
                  <Input :readonly="ifEdit" v-model="caseInfo.caseHappendPort" placeholder="请输入港口"></Input>
                </FormItem>
              </Col>
              <Col span="16" v-show="caseInfo.caseType=='陆上'">
                <FormItem label="地点:" prop="caseHappenAddress">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.caseHappenAddress"
                    placeholder="请输入地点"
                  >
                    <Button slot="append" icon="ios-eye" @click="showAMapModal=true"></Button>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="zyfxx">
            <fieldset class="title">
              <legend>执法人信息</legend>
            </fieldset>
            <Row>
              <Col span="12">
                <FormItem label="执法人:" prop="lawMan">
                  <Input :readonly="ifEdit" v-model="caseInfo.lawMan" placeholder="请输入执法人"></Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="执法号:" prop="lawManNum">
                  <Input :readonly="ifEdit" v-model="caseInfo.lawManNum" placeholder="请输入执法号"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="执法人:" prop="lawMan2">
                  <Input :readonly="true" v-model="caseInfo.lawMan2" placeholder="请输入执法人">
                    <Button slot="append" @click="()=>{selectLawMan(caseInfo)}" size="small">选择</Button>
                  </Input>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem label="执法号:" prop="lawMan2Num">
                  <Input v-model="caseInfo.lawMan2Num" :readonly="ifEdit" placeholder="请输入执法号"></Input>
                </FormItem>
              </Col>
              <Col span="2">
                <ButtonGroup>
                  <Button @click="addLawMan" type="primary" style="margin-left:5px;">增加</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <Row v-for="(item, index) in caseInfo.enforcers" :key="'enforcers_'+index">
              <Col span="12">
                <FormItem label="执法人:" prop="otherlawMan">
                  <Input v-model="item['lawMan2']" :readonly="true">
                    <span slot="append" @click="()=>{selectLawMan(item)}">选择</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="10">
                <FormItem label="执法号:" prop="otherlawMan">
                  <Input v-model="item['lawMan2Num']"></Input>
                </FormItem>
              </Col>
              <Col span="2">
                <ButtonGroup>
                  <!-- <Button @click="()=>{addLawMan(index)}"  type="primary" style="margin-left:5px;">增加</Button> -->
                  <Button
                    @click="()=>{deleteLawMan(index)}"
                    type="error"
                    style="margin-left:5px;"
                  >删除</Button>
                </ButtonGroup>
              </Col>
            </Row>
            <!-- <enforcers ref="enforcers" @on-change="enforcersChange" @person="getLawMan" v-model="enforcers.show" size="default" :toplimit="'5'" :dataList="caseInfo.enforcers"></enforcers> -->
          </div>
          <!-- 当事人信息-->
          <div class="form-wrap" id="dstxx">
            <fieldset class="title">
              <legend zyfxx @click="showShipModal('ycjb')">船舶信息</legend>
            </fieldset>
            <Row>
              <Col span="8">
                <!-- <FormItem prop="shipname" label="船舶名称:" v-if="false">
                               <Select ref="shipName" v-model="caseInfo.shipinfo.shipname" :clearable="true"  :filterable="true" :remote="true" @on-query-change="searchShip"  :loading="shipLoading"  @on-change="selectShip" transfer placeholder="请输入船舶名称" readOnly :disabled="ifEdit"> 
                                    <Option  v-for="(option,index) in filterShipOptions" :value="option" :key="index" :label="option">{{option}}</Option>
                                </Select> 
                </FormItem>-->
                <FormItem prop="shipname" label="船舶名称:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.shipname"
                    placeholder="请选择渔船"
                  >
                    <Button slot="append" @click="baseShipModal.show=true" size="small">选择</Button>
                  </Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipcjg" label="船籍港:">
                  <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.cjg" placeholder="请输入船籍港"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipworkmode" label="证载作业方式:" :label-width="120">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.workmode"
                    placeholder="请输入证载作业方式"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem prop="shipowner" label="持证人:">
                  <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.owner" placeholder="请输入持证人"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipownertel" label="持证人电话:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.ownertel"
                    placeholder="请输入持证人电话"
                    :maxlength="11"
                    @on-keydown="keydown"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipownercert" label="身份证/企业注册号:" :label-width="120">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.certno"
                    placeholder="请输入身份证/企业注册号"
                    :maxlength="18"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem prop="shiplength" label="船长:">
                  <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.length" placeholder="请输入船长">
                    <span slot="append">米</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipwidth" label="型宽:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.width"
                    placeholder="请输入型宽"
                    :maxlength="11"
                    @on-keydown="keydown"
                  >
                    <span slot="append">米</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipdepth" label="型深:" :label-width="120">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.depth"
                    placeholder="请输入型深"
                    :maxlength="18"
                  >
                    <span slot="append">米</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem prop="shippower" label="主机功率:">
                  <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.power" placeholder="请输入主机功率">
                    <span slot="append">千瓦</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="shipmaterial" label="材质:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.material"
                    placeholder="请输入材质"
                    :maxlength="11"
                    @on-keydown="keydown"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <!-- <FormItem prop="shippositioncrews" label="核定职务船员数:" :label-width="120" >
								<Input v-model="caseInfo.shipinfo.positioncrews" placeholder="请输入核定职务船员数"  :maxlength="18"></Input> 
                </FormItem>-->
              </Col>
            </Row>
            <fieldset class="title">
              <legend>现场负责人信息</legend>
            </fieldset>
            <Row>
              <Col span="8">
                <FormItem prop="litigantname" label="姓名:">
                  <Input
                    :readonly="ifEdit"
                    ref="litigantsName"
                    v-model="caseInfo.litigants.name"
                    placeholder="请输入姓名"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="litiganttellphone" label="电话:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.litigants.tellphone"
                    placeholder="请输入电话"
                    :maxlength="11"
                    @on-keydown="keydown"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="职务:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.litigants.duty"
                    placeholder="请输入职务"
                    :maxlength="11"
                    @on-keydown="keydown"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="litigantsex" label="性别:">
                  <RadioGroup v-model="caseInfo.litigants.sex">
                    <Radio label="男" :disabled="ifEdit">男</Radio>
                    <Radio label="女" :disabled="ifEdit">女</Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <FormItem prop="litigantidentiId" label="身份证号码:" :label-width="100">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.litigants.identiId"
                    @on-blur="calculateAge"
                    placeholder="请输入身份证号码"
                    :maxlength="18"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="litigantage" label="年龄:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.litigants.age"
                    placeholder="请输入年龄"
                    :maxlength="3"
                    @on-keydown="keydown"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem prop="litigantpolitical" label="政治面貌:">
                  <Select
                    v-model="caseInfo.litigants.political"
                    placeholder="请输入政治面貌"
                    :disabled="ifEdit"
                  >
                    <Option value="群众">群众</Option>
                    <Option value="中共党员">中共党员</Option>
                    <Option value="民主党派">民主党派</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem prop="litigantaddress" label="联系地址:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.litigants.address"
                    placeholder="请输入联系地址"
                    :disabled="disableUnit"
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <!-- <fieldset class="title">
                        <legend>单位信息</legend>
                    </fieldset>
                    <Row>
                        <Col span="8">
                            <FormItem prop="litigantunitName" label="单位名称:">
							    <Input v-model="caseInfo.litigants.unitName" placeholder="请输入单位名称"  :disabled="disableName"  ></Input> 
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem prop="litigantfaren" label="法定代表:">
								<Input v-model="caseInfo.litigants.faren" placeholder="请输入法定代表"  :disabled="disableName"></Input> 
                            </FormItem>
                        </Col>
                        <Col span="8">
                            <FormItem prop="litigantunitTell" label="单位电话:">
							    <Input v-model="caseInfo.litigants.unitTell" placeholder="请输入单位电话" @on-keydown="keydown"  :disabled="disableName"></Input> 
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="24">
                            <FormItem label="单位地址:"  prop="litigantunitAddress">
                                <Input v-model="caseInfo.litigants.unitAddress" placeholder="请输入单位地址"  :disabled="disableName"></Input> 
                            </FormItem>
                        </Col>
            </Row>-->
          </div>
          <div class="form-wrap" id="czqk" v-show="showShip">
            <fieldset class="title">
              <legend>持证情况</legend>
            </fieldset>
            <Row>
              <Col span="12">
                <FormItem label="捕捞许可证:" prop="shipblxkz">
                  <RadioGroup v-model="caseInfo.shipinfo.blxkz" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                    <Radio label="未携带" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8">
                <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.blxkzbz" placeholder="请输入备注">
                  <Button slot="append" icon="ios-eye" @click="showShipModal('ycblxk')"></Button>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="船检证:" prop="shipcjz">
                  <RadioGroup v-model="caseInfo.shipinfo.cjz" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                    <Radio label="未携带" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8">
                <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.cjzbz" placeholder="请输入备注">
                  <Button slot="append" icon="ios-eye" @click="showShipModal('ycjy')"></Button>
                </Input>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="船舶登记证:" prop="shipcbsyq">
                  <RadioGroup v-model="caseInfo.shipinfo.cbsyq" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                    <Radio label="未携带" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="8">
                <Input :readonly="ifEdit" v-model="caseInfo.shipinfo.cbsyqbz" placeholder="请输入备注">
                  <Button slot="append" icon="ios-eye" @click="showShipModal('ycsyq')"></Button>
                </Input>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="cyqk" v-show="showShip">
            <fieldset class="title">
              <legend>船员情况</legend>
            </fieldset>
            <Row>
              <Col span="12">
                <FormItem label="船长:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.czzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="轮机长:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.jlzzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="船副/大副:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.dfzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="管轮/大管轮:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.dglzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <FormItem label="助理船副/二副:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.efzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="助理管轮/二管轮:" :label-width="110">
                  <RadioGroup v-model="caseInfo.shipinfo.eglzsqk" type="button">
                    <Radio label="有效" :disabled="ifEdit"></Radio>
                    <Radio label="无效" :disabled="ifEdit"></Radio>
                    <Radio label="无" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="syyjqk" v-show="showShip">
            <fieldset class="title">
              <legend>携带渔具情况</legend>
            </fieldset>
            <Row>
              <Col span="12">
                <FormItem label="网具数量:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.wjsl"
                    placeholder="请输入网具数量"
                    @on-keydown="keydown"
                  >
                    <span slot="append">（顶/张）</span>
                  </Input>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="网目尺寸:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.shipinfo.wmcc"
                    placeholder="请输入网目尺寸"
                    @on-keydown="keydown"
                  >
                    <span slot="append">（毫米）</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="yhwqk" v-show="showShip">
            <fieldset class="title">
              <legend>渔获物情况</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="渔获物:">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.catchfishs"
                    type="textarea"
                    :rows="4"
                    placeholder
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="ajbh">
            <fieldset class="title">
              <legend>案件编号</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="案件编号:" prop="enforceType">
                  <Input
                    :readonly="ifEdit"
                    search
                    v-model="caseInfo.enforceType"
                    placeholder="请输入案件文种"
                    style="width:200px;display: inline-table;"
                  >
                    <span slot="prepend" @click="enforceTypeShow=true" style="cursor:pointer">▼</span>
                    <span slot="append">罚字</span>
                  </Input>
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.enforceYear"
                    placeholder="请输入案件年份"
                    style="width:200px;display: inline-table;"
                  >
                    <span slot="prepend">〔</span>
                    <span slot="append">〕</span>
                  </Input>
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.enforceNum"
                    placeholder="请输入案件文号"
                    style="width:200px;display: inline-table;"
                  >
                    <span slot="append">号</span>
                  </Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="sfkycw" v-show="false">
            <fieldset class="title">
              <legend>是否扣押财物</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="扣押财物:" :label-width="100">
                  <RadioGroup v-model="caseInfo.kycw" type="button">
                    <Radio label="是" :disabled="ifEdit"></Radio>
                    <Radio label="否" :disabled="ifEdit"></Radio>
                  </RadioGroup>
                </FormItem>
              </Col>
            </Row>
            <Row v-show="caseInfo.kycw=='是'">
              <Col span="8">
                <FormItem label="扣押财物文书:" :label-width="100">
                  <RadioGroup v-model="caseInfo.kycwws" type="button" @on-change="makeWs">
                    <Radio label="CFKYJDS" :disabled="ifEdit">查封（扣押）决定书</Radio>
                    <Radio label="ZJBC" :disabled="ifEdit">证据保存清单</Radio>
                  </RadioGroup>
                  <Button type="primary">制作文书</Button>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="ajms" v-show="caseInfo.status>=0">
            <fieldset class="title">
              <legend>案情描述</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="案情描述:" prop="caseContent">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.caseContent"
                    type="textarea"
                    :rows="4"
                    placeholder
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="ajss" v-show="caseInfo.status>0">
            <fieldset class="title">
              <legend>案件事实</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="案件事实:" prop="fact">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.fact"
                    type="textarea"
                    :rows="4"
                    placeholder
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="cfjds" v-show="caseInfo.status>1">
            <fieldset class="title">
              <legend>对外公开的处罚决定书全文或摘要</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="全文/摘要:" prop="punishContent">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.punishContent"
                    type="textarea"
                    :rows="4"
                    placeholder
                  ></Input>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="zxjg" v-show="caseInfo.status>1">
            <fieldset class="title">
              <legend>执行结果</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <FormItem label="执行结果:" prop="executeresult">
                  <Input
                    :readonly="ifEdit"
                    v-model="caseInfo.executeresult"
                    type="textarea"
                    :rows="4"
                    placeholder
                  ></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="是否公开:" prop="reveal">
                    <RadioGroup v-model="caseInfo.reveal" type="button">
                      <Radio label="1" :disabled="ifEdit">公开</Radio>
                      <Radio label="0" :disabled="ifEdit">不公开</Radio>
                    </RadioGroup>
                </FormItem>
              </Col>
            </Row>
          </div>
          <div class="form-wrap" id="zpzj" v-if="existsCaseInfo">
            <fieldset class="title">
              <legend>照片证据</legend>
            </fieldset>
            <Row>
              <Col span="24">
                <ul class="ivu-upload-list">
                  <li
                    class="ivu-upload-list-file ivu-upload-list-file-finish"
                    v-for="(item,index) in uploadList"
                    :key="index"
                  >
                    <span @click="showFile(item)">
                      <i class="ivu-icon ivu-icon-image"></i>
                      {{item.name}}
                    </span>
                    <span @click="showFile(item)" style="color:blue">预览</span>
                    <span @click="deleteFile(index,item)" style="color:red">删除</span>
                    <!-- <i class="ivu-icon ivu-icon-ios-close-empty ivu-upload-list-remove"  @click="deleteFile(index,item)" ></i> -->
                  </li>
                </ul>
                <MyUpload
                  multiple
                  type="drag"
                  action="/$admin/attachs"
                  :data="uploadData"
                  :show-upload-list="false"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                >
                  <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击或将文件拖拽到这里上传</p>
                  </div>
                </MyUpload>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </data-content>
    <div class="right-button">
      <div class="btn-wrap" v-show="paramsView=='1'">
        <input
          class="green"
          type="button"
          value="添加文书"
          @click="addDoc(true)"
          v-show="existsCaseInfo"
        />
        <input
          class="green"
          type="button"
          value="启动流程"
          @click="startWorkFlow(true)"
          v-show="existsCaseInfo"
        />
        <input
          class="green"
          type="button"
          value="附件"
          @click="cardShow=true"
          v-show="existsCaseInfo"
        />
        <input class="orange" type="button" value="保存" @click="saveDraft" />
        <input class="orange" type="button" value="草稿箱" @click="draftSearch" />
        <input
          class="orange"
          type="button"
          value="完成立案"
          @click="submitLian"
          v-show="existsCaseInfo"
        />
        <input
          class="orange"
          type="button"
          value="撤回案件"
          @click="rollbackCase"
          v-show="ownCase&&caseInfo.status!='0'"
        />
        <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase" />
        <!-- <input class="orange" type="button" value="移送案件" @click="transferCase" v-show="ownCase" /> -->
        <input
          class="orange"
          type="button"
          value="移交案件"
          @click="handedCaseInfo.show=true"
          v-show="ownCase"
        />
      </div>
      <div class="btn-wrap" v-show="paramsView=='2'">
        <input class="green" type="button" value="添加文书" @click="addDoc(true)" />
        <input class="green" type="button" value="启动流程" @click="startWorkFlow(true)" />
        <input
          class="green"
          type="button"
          value="附件"
          @click="cardShow=true"
          v-show="existsCaseInfo"
        />
        <input class="orange" type="button" value="保存" @click="saveDraft" />
        <input class="orange" type="button" value="完成办理" @click="submitAjbl" />
        <input
          class="orange"
          type="button"
          value="撤回案件"
          @click="rollbackCase"
          v-show="ownCase&&caseInfo.status!='0'"
        />
        <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase" />
        <input class="orange" type="button" value="移送案件" @click="transferCaseModal=true" v-show="ownCase" />
      </div>
      <div class="btn-wrap" v-show="paramsView=='8'">
        <input class="green" type="button" value="添加文书" @click="addDoc(true)" />
        <input class="green" type="button" value="启动流程" @click="startWorkFlow(true)" />
        <input class="green" type="button" value="附件" @click="cardShow=true" />
        <input class="orange" type="button" value="保存" @click="saveDraft" />
        <input class="orange" type="button" value="结案归档" @click="submitJiean" />
        <input
          class="orange"
          type="button"
          value="撤回案件"
          @click="rollbackCase"
          v-show="ownCase&&caseInfo.status!='0'"
        />
        <input class="orange" type="button" value="撤消案件" @click="revokeCase" v-show="ownCase" />
      </div>
      <div class="btn-wrap" v-show="paramsView=='9'|| paramsView=='4'">
        <input class="green" type="button" value="查看文书" @click="addDoc(false)" />
        <input class="green" type="button" value="查看立案审批" @click="showWs('R2',true)" />
        <input class="green" type="button" value="查看行政处罚审批表" @click="showWs('R6',true)" />
        <input class="green" type="button" value="查看行政结案报告" @click="showWs('R10',true)" />
        <input class="green" type="button" value="附件" @click="cardShow=true" />
        <input
          class="orange"
          type="button"
          value="撤回案件"
          @click="rollbackCase"
          v-show="caseInfo.status=='8'&&hasAdminRole"
        />
        <input
          class="orange"
          type="button"
          value="撤消案件"
          @click="revokeCase"
          v-show="caseInfo.status=='8'&&hasAdminRole"
        />
      </div>
      <div class="btn-wrap" v-show="paramsView=='simpleCase'">
        <input class="green" type="button" value="现场检查笔录" @click="makeWs('R1')" />
        <input class="green" type="button" value="现场勘验笔录" @click="makeWs('R11')" />
        <input class="green" type="button" value="当场处罚决定书" @click="makeWs('R8')" />
        <input class="green" type="button" value="责令整改通知书" @click="makeWs('R9')" />
        <input class="green" type="button" value="附件" @click="cardShow=true" />
        <input class="orange" type="button" value="保存" @click="saveSimpleCaseDraft" />
        <input
          class="orange"
          type="button"
          value="结案归档"
          @click="submitSimpleCase"
          v-show="existsCaseInfo"
        />
      </div>
      <div class="btn-wrap" v-show="paramsView=='simpleCaseview'">
        <input class="green" type="button" value="现场检查笔录" @click="showWs('R1')" />
        <input class="green" type="button" value="现场勘验笔录" @click="showWs('R11')" />
        <input class="green" type="button" value="当场处罚决定书" @click="showWs('R8')" />
        <input class="green" type="button" value="责令整改通知书" @click="showWs('R9')" />
        <input class="green" type="button" value="附件" @click="cardShow=true" />
        <input
          class="orange"
          type="button"
          value="撤消案件"
          @click="revokeCase"
          v-show="(ownCase&&caseInfo.status=='0')||hasAdminRole"
        />
      </div>
    </div>

    <Modal id="draftBox" v-model="draft.show" title="草稿箱" width="900" :scrollable="true">
      <Row>
        <Col>
          <Input
            v-model="draft.query.wheres.search"
            placeholder="请输入查询条件..."
            style="width: 300px"
            @on-enter="draftSearch"
          ></Input>
          <Button type="primary" icon="ios-search" @click="draftSearch">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Col class="margin-top-5">
          <Table
            size="small"
            border
            :columns="draft.columns"
            :data="draft.data"
            @on-row-dblclick="draftDBClick"
            height="282"
          ></Table>
        </Col>
      </Row>
      <div slot="footer">
        <Page
          size="small"
          :current="draft.query.page"
          :total="draft.dataTotal"
          :page-size="draft.query.size"
          @on-change="draftPage"
          show-elevator
          show-total
        ></Page>
      </div>
    </Modal>

    <Modal id="wsFlowModel" v-model="wsFlow.show" title="文书" :width="620" :scrollable="true">
      <Row>
        <Col span="24">
          <Table size="small" border :columns="wsFlow.cols" :data="wsFlow.data" height="282"></Table>
        </Col>
      </Row>
      <div slot="footer"></div>
    </Modal>

    <Modal id="wenshouBox" v-model="wenshou.show" title="文书" :width="450" :scrollable="true">
      <Row>
        <Col span="24">
          <Table size="small" border :columns="wenshou.cols" :data="wenshou.data" height="282"></Table>
        </Col>
      </Row>
      <div slot="footer">
        <!-- <Button type="primary"  @click="addDoc">刷新</Button> -->
      </div>
    </Modal>
    <Modal v-model="modelShow" :title="caseTitle" width="400">
      <Form :model="caseInfo" :label-width="90" ref="formCustom" :rules="ruleCustom">
        <FormItem :label="caseLabel" prop="message">
          <Input v-model="caseInfo.message" type="textarea" :rows="3" placeholder=""></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel('ruleCustom')">取消</Button>
        <Button type="primary" @click="sure('ruleCustom')">确定</Button>
      </div>
    </Modal>

    <Modal v-model="lonlatShow" title="经纬度换算" width="300">
      <Form :label-width="60">                       
        <FormItem :label="lonlatTitle" >
          <Input v-model="lon" @on-blur="()=>computeLonLat('lon',180)" v-if="isLon" number placeholder="请输入经度"></Input>
          <Input v-model="lat" @on-blur="()=>computeLonLat('lat',90)" v-if="!isLon" number placeholder="请输入纬度"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="lonlatCancel">取消</Button>
        <Button type="primary" @click="lonlatSure">确定</Button>
      </div>
    </Modal>
    <Modal v-model="transferCaseModal" title="移送案件" width="300">
      <Form :model="transferInfo" :label-width="100">                  
        <br>
        <FormItem label='移送人数（人）: '>
          <InputNumber v-model="transferInfo.transferNumber" :min="0" style="width: 160px"></InputNumber>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="transferCaseModal=false">取消</Button>
        <Button type="primary" @click="transferCase">确定</Button>
      </div>
    </Modal>

    <discretionaryModal
      v-model="discretionaryShow"
      @selectDiscretionaryPower="selectDiscretionaryPower"
    ></discretionaryModal>
    <selectShipModal v-model="baseShipModal.show" @on-select-ship="onSelectShip" acl="0"></selectShipModal>
    <ycjbModal v-model="shipModal.ycjb" :nametheShip="caseInfo.shipinfo.shipname"></ycjbModal>
    <ycblxkModal v-model="shipModal.ycblxk" :nametheShip="caseInfo.shipinfo.shipname"></ycblxkModal>
    <ycjyModal v-model="shipModal.ycjy" :nametheShip="caseInfo.shipinfo.shipname"></ycjyModal>
    <ycsyqModal v-model="shipModal.ycsyq" :nametheShip="caseInfo.shipinfo.shipname"></ycsyqModal>
    <amapModal v-model="showAMapModal" @on-ok="selectAMap"></amapModal>
    <workflowModal
      v-model="workflow.show"
      :taskId="workflow.taskId"
      :instanceId="workflow.instanceId"
      :businessKey="workflow.businessKey"
      :category="workflow.category"
    ></workflowModal>
    <MultiUpload
      v-model="cardShow"
      :dataId="caseInfo.id"
      moduleId="EnforceCaseInfo"
      :action="paramsView=='9'?'view':'edit'"
    ></MultiUpload>
    <enforceTypeModal v-model="enforceTypeShow" @selectEnforceType="selectEnforceType"></enforceTypeModal>
    <enforcersModal v-model="enforcers.show" @changeEnforcers="changeLawMan"></enforcersModal>
    <areaselectModal
      v-model="handedCaseInfo.show"
      deptTypes="70"
      deptflag="30"
      @on-select-change="handedCase"
    ></areaselectModal>
    <pic v-model="showPic" :img="showPicPathWithBase"></pic>
  </div>
</template>
<script>
import { isNull, isEmpty, getAge, deepCopy } from "@/libs/common.js";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import ycjbModal from "@/views/components/modal-ship/ycjbModal.vue";
import ycblxkModal from "@/views/components/modal-ship/ycblxkModal.vue";
import ycjyModal from "@/views/components/modal-ship/ycjyModal.vue";
import ycsyqModal from "@/views/components/modal-ship/ycsyqModal.vue";
import amapModal from "@/views/components/aMap/amapModal.vue";
import enforcersModal from "@/views/components/case/enforcersModal.vue";
import workflowModal from "@/views/components/workflow/workflowModal.vue";
import MultiUpload from "@/views/components/Upload/MultiUpload.vue";
import selectShipModal from "@/views/components/selectModal/selectShipModal.vue";
import discretionaryModal from "@/views/components/case/discretionaryModal.vue";
import enforceTypeModal from "@/views/components/case/enforceTypeModal.vue";
import areaselectModal from "@/views/components/workflow/areaselectModal.vue";
import pic from "@/views/components/pic/pic.vue";

import { getDiscretionarys, openPageOffice } from "../../../api/laws";

export default {
  name: "addCase",
  components: {
    MyUpload,
    ycjbModal,
    ycblxkModal,
    ycjyModal,
    ycsyqModal,
    amapModal,
    enforcersModal,
    workflowModal,
    MultiUpload,
    selectShipModal,
    discretionaryModal,
    enforceTypeModal,
    areaselectModal,
    pic
  },
  data() {
    var _self = this;
    return {
      transferInfo: {},
      transferCaseModal: false,
      ruleCustom: {
        message: [
          { required: true, message: "撤销理由不能为空！", trigger: "blur" }
        ]
      },
      caseTitle: '撤销案件',
      caseLabel: '撤销理由',
      lonlatShow:false,
      isLon:false,
      lon:"",
      lat:"",
      lonlatTitle:"",
      autoSaveInterval: null,
      modelShow: false,
      ifEdit: false,
      updatedIndex: 0,
      cardShow: false,
      showleftMenu: true,
      leftActive: "",
      shipLoading: false,
      disableName: false,
      uploadList: [],
      shipOptions: [],
      baseShipModal: {
        show: false
      },
      shipModal: {
        ycjb: false,
        ycjy: false,
        ycblxk: false,
        ycsyq: false,
        shipId: ""
      },
      handedCaseInfo: {
        show: false
      },
      discretionaryShow: false,
      enforceTypeShow: false,
      showAMapModal: false,
      showPic: false,
      showPicId: "",
      wsModal: {
        show: false,
        caseId: "",
        docType: "",
        edit: false,
        wsId: undefined
      },
      enforcers: {
        show: false,
        curItem: undefined,
        data: []
      },
      caseInfo: {
        id: null,
        reveal: "1",
        status: "0",
        type: "1",
        enforceType: "",
        enforceYear: "",
        enforceNum: "",
        catchfishs: "",

        illegalAct: "",
        ladderType: "",
        illegalClause: "",
        punishAccording: "",

        lawMan: this.$store.state.user.userInfo.name,
        lawManNum: "",
        lawMan2: "",
        lawMan2Num: "",
        lawMan2Id: "",

        caseSource: "",
        caseType: "海上",
        caseHappenTime: new Date(),
        enforceMain: "2",
        message: "",
        //			    caseHapeenLongitude: "000°00.000′",
        //			    caseHappenLatitude: "000°00.000′",
        lonDu: 0,
        lonFen: 0,
        lonMiao: 0,
        latDu: 0,
        latFen: 0,
        latMiao: 0,

        caseHappenAddress: "",
        caseHappendPort: "",
        bfishingarea: "",
        sfishingarea: "5",
        kycw: "",
        kycwws: "",
        caseContent: "",
        fact: "",
        punishContent: "",
        executeresult: "",
        litigants: {
          name: "",
          sex: "男",
          tellphone: "",
          age: "",
          identiId: "",
          address: "",
          political: "",
          unitName: "",
          faren: "",
          unitAddress: "",
          unitTell: "",
          duty: ""
        },
        shipinfo: {
          shipname: "",
          cjg: "",
          length: "",
          width: "",
          depth: "",
          material: "",
          zs: "",
          owner: "",
          ownertel: "",
          certno: "",
          power: "",
          workmode: "",
          wjsl: "",
          wmcc: "",
          positioncrews: "",

          czzsqk: "",
          dfzsqk: "",
          efzsqk: "",
          jlzzsqk: "",
          dglzsqk: "",
          eglzsqk: "",

          blxkz: "",
          blxkzbz: "",
          cjz: "",
          cjzbz: "",
          cbsyq: "",
          cbsyqbz: "",
          zzzyfs: "",
          zzzyfsbz: ""
        },
        enforcers: []
      },
      draft: {
        show: false,
        dataTotal: 0,
        query: {
          page: 1,
          size: 7,
          wheres: {
            me: "1",
            search: "",
            status: "0"
          }
        },
        data: [],
        columns: [
          {
            title: "序号",
            key: "id",
            align: "center",
            width: 67,
            type: "index"
          },
          {
            title: "当事人",
            key: "name",
            width: 211,
            render: function(h, params) {
              var temp = isNull(params.row.name)
                ? params.row.unitName
                : params.row.name;
              if (!isNull(params.row.shipname)) {
                if ("1" == params.row.enforceMain)
                  temp += "(" + params.row.shipname + ")";
                else temp = params.row.shipname + "(" + temp + ")";
              }
              return h("span", temp);
            }
          },
          {
            title: "涉案案由",
            key: "illegalAct",
            width: 420,
            render: function(h, params) {
              var text = params.row.illegalAct;
              var temp =
                text.length > 20 ? text.substring(0, 22) + "..." : text;
              return h("span", temp);
            }
          },
          {
            title: "操作",
            key: "action",
            width: 150,
            align: "center",
            render: function(h, params) {
              return h("div", [
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
                      click: function() {
                        _self.loadCase(params.row.id);
                        _self.draft.show = false;
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: function() {
                        _self.$Modal.confirm({
                          title: "提示",
                          content: "是否确认删除数据？",
                          onOk: function() {
                            _self.removeCase(params.row.id);
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      },
      wenshou: {
        show: false,
        edit: false,
        cols: [
          {
            title: "序号",
            key: "id",
            type: "index",
            align: "center",
            width: 67
          },
          {
            title: "已添加文书",
            key: "dname",
            width: 208
          },
          {
            title: "操作",
            key: "action",
            width: 140,
            align: "center",
            render: function(h, params) {
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
                      click: function() {
                        var row = params.row;
                        // if(_self.wenshou.edit)
                        //     _self.makeWs(row.dtype,false,row.id);
                        // else
                        //     _self.showWs(row.dtype,false,row.id);
                        _self.openWs(
                          row.id,
                          row.dtype,
                          _self.wenshou.edit,
                          true
                        );
                      }
                    }
                  },
                  _self.wenshou.edit ? "编辑" : "查看"
                )
              );
              return h("div", buttons);
            }
          }
        ],
        data: []
      },
      workflow: {
        show: false,
        taskId: "",
        instanceId: "",
        businessKey: "",
        category: ""
      },
      wsFlow: {
        show: false,
        cols: [
          {
            title: "序号",
            key: "id",
            type: "index",
            align: "center",
            width: 60
          },
          {
            title: "审批文书",
            key: "name"
          },
          {
              title: '状态',
              key: 'action',
              width: 80,
              align: 'center',
              render: function(h, p) {
                  if(p.row.caseStatus==0){
                      return h("span",'无');
                  }else if(p.row.caseStatus==1){
                      return h("span",'待启动');
                  }else if(p.row.caseStatus==2){
                      return h("span",'办理中');
                  }else if(p.row.caseStatus==3){
                      return h("span",'已办结');
                  }
              }
          },
          {
            title: "操作",
            key: "action",
            width: 150,
            align: "center",
            render: function(h, params) {
              var buttons = [];
              // buttons.push(h('Button', {
              //     props: {
              //         type: 'primary',
              //         size: 'small'
              //     },
              //     style: {
              //         marginRight: '5px'
              //     },
              //     on: {
              //         click: function() {
              //             var row=params.row;
              //             _self.makeWs(row.id);
              //         }
              //     }
              // }, '文书'));
              var type;
              if (params.row.caseStatus == 0 || params.row.caseStatus == 1) {
                type = "primary";
              } else {
                type = "success";
              }
              buttons.push(
                h(
                  "Button",
                  {
                    props: {
                      type: type,
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: function() {
                        var row = params.row;
                        _self.makeWs(row.id, true);
                      }
                    }
                  },
                  "审批流程"
                )
              );
              return h("div", buttons);
            }
          }
        ],
        data: []
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    var urls = location.href.split("#")[1];
    if (
      urls == "/enforcement/caseIndex" ||
      urls == "/enforcement/case/addCase"
    ) {
      if (this.updatedIndex > 1) {
        if (confirm("编辑内容未保存，是否离开？")) {
          next();
        } else {
          next(false);
        }
      } else {
        next();
      }
    } else {
      next();
    }
  },
  watch: {
    caseInfo: {
      handler: function(newVal, oldVal) {
        this.updatedIndex = this.updatedIndex + 1;
      },
      deep: true
    }
  },
  // updated() {
  //     this.updatedIndex = this.updatedIndex + 1;
  // },
  computed: {
    caseInfoRules() {
      var _self = this;
      var status = _self.caseInfo.status;
      var rules = {
        caseSource: [
          {
            required: true,
            type: "string",
            message: "请选择案件来源",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        caseType: [
          {
            required: true,
            type: "string",
            message: "请选择案件类型",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        illegalAct: [
          {
            required: true,
            type: "string",
            message: "请选择案由",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        caseHappenTime: [
          {
            required: true,
            type: "date",
            message: "请选择案发时间",
            trigger: "change"
          }
        ],
        enforceMain: [
          {
            required: true,
            type: "string",
            message: "请选择案件主体",
            trigger: "change"
          }
        ],
        // lonDu: [{ required: false, type: 'string', message: '请输入正确的经度', trigger: 'change' }],
        // lonFen: [{ required: false, type: 'string', message: '请输入正确的经度', trigger: 'change' }],
        // lonMiao: [{ required: false, type: 'string', message: '请输入正确的经度', trigger: 'change' }],
        // latDu: [{ required: false, type: 'string', message: '请输入正确的纬度', trigger: 'change' }],
        // latFen: [{ required: false, type: 'string', message: '请输入正确的纬度', trigger: 'change' }],
        // latMiao: [{ required: false, type: 'string', message: '请输入正确的纬度', trigger: 'change' }],
        lawMan: [
          {
            required: true,
            type: "string",
            message: "请选择执法人",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        lawManNum: [
          {
            required: true,
            type: "string",
            message: "请选择执法号",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        lawMan2: [
          {
            required: true,
            type: "string",
            message: "请选择执法人",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        lawMan2Num: [
          {
            required: true,
            type: "string",
            message: "请选择执法号",
            trigger: "change",
            transform: value => (value ? value.trim() : "")
          }
        ],
        otherlawMan: [
          {
            validator: function(rule, value, callback) {
              var enforcers = _self.caseInfo.enforcers;
              for (var i = 0, length = enforcers.length; i < length; i++) {
                var item = enforcers[i];
                if (isEmpty(item.lawMan2) || isEmpty(item.lawMan2Num)) {
                  return callback(new Error("请填写完整执法人信息"));
                }
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        litigantname: [
          {
            validator: function(rule, value, callback) {
              var l = _self.caseInfo.litigants;
              var testStr1 = l.unitName;
              var testStr2 = l.name;
              if (isNull(testStr1) && isNull(testStr2)) {
                return callback(new Error("请输入当事人姓名"));
              }
              callback();
            },
            required: true,
            trigger: "blur"
          }
        ],
        litigantidentiId:[
          {
            validator: function(rule, value, callback) {
              var l = _self.caseInfo.litigants;
              var identiId = l.identiId;
              if (isNull(identiId)) {
                return callback(new Error("请输入身份证号码"));
              }
              callback();
            },
            required: true,
            trigger: "blur"
          }
        ],
        litigantsex: [
          {
            validator: function(rule, value, callback) {
              var l = _self.caseInfo.litigants;
              if (!isNull(l.name) && isNull(l.sex)) {
                return callback(new Error("请选择当事人性别"));
              }
              callback();
            },
            trigger: "change"
          }
        ],
        litigantunitName: [
          {
            validator: function(rule, value, callback) {
              var l = _self.caseInfo.litigants;
              if (isNull(l.name) && isNull(l.unitName)) {
                return callback(new Error("请输入单位名称"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        shipowner: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.shipinfo;
              if (!isNull(s.shipname) && isNull(s.owner)) {
                return callback(new Error("请输入船东姓名"));
              }
              callback();
            },
            trigger: "change"
          }
        ],
        shipownertel: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.shipinfo;
              if (!isNull(s.shipname) && isNull(s.ownertel)) {
                return callback(new Error("请输入船东电话"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        shipownercert: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.shipinfo;
              if (!isNull(s.shipname) && isNull(s.certno)) {
                return callback(new Error("请输入身份证号"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        shipcjg: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.shipinfo;
              if (!isNull(s.shipname) && isNull(s.cjg)) {
                return callback(new Error("请输入船籍港"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        caseHappenAddress: [
          {
            validator: function(rule, value, callback) {
              var c = _self.caseInfo;
              if (c.caseType == "淡水" && isNull(c.caseHappenAddress)) {
                return callback(new Error("请输入案发地点"));
              }
              callback();
            },
            trigger: "change"
          }
        ],

        enforceType: [
          {
            validator: function(rule, value, callback) {
              var type = _self.caseInfo.enforceType;
              var year = _self.caseInfo.enforceYear;
              var num = _self.caseInfo.enforceNum;
              if (
                status > "1" &&
                (isEmpty(type) || isEmpty(year) || isEmpty(num))
              ) {
                return callback(new Error("请输入案件编号"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        caseContent: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.caseContent;
              if (status > "1" && isEmpty(s)) {
                return callback(new Error("请输入案情描述"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        fact: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.fact;
              if (status > "1" && isEmpty(s)) {
                return callback(new Error("请输入案件事实"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        punishContent: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.punishContent;
              if (status > "1" && isEmpty(s)) {
                return callback(
                  new Error("请输入对外公开的处罚决定书全文或摘要")
                );
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        executeresult: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.executeresult;
              if (status > "1" && isEmpty(s)) {
                return callback(new Error("请输入执行结果"));
              }
              callback();
            },
            trigger: "blur"
          }
        ],
        reveal: [
          {
            validator: function(rule, value, callback) {
              var s = _self.caseInfo.reveal;
              if (status > "1" && isEmpty(s)) {
                return callback(new Error("请选择案件是否公开"));
              }
              callback();
            },
            trigger: "blur"
          }
        ]
      };
      return rules;
    },
    paramsView() {
      var view = this.$route.query.view;
      if (isEmpty(view)) return "1";
      return this.$route.query.view;
    },
    paramsCaseId() {
      return this.$route.query.caseId;
    },
    showShip() {
      return !isEmpty(this.caseInfo.shipinfo.shipname);
    },
    leftMenu() {
      // var isShow=this.showShip;
      return [
        { id: "#saay", name: "涉案案由*", show: true },
        { id: "#ahly", name: "案件来源、地点及时间", show: true },
        { id: "#zyfxx", name: "执法人信息", show: true },
        { id: "#dstxx", name: "当事人信息*", show: true },
        { id: "#czqk", name: "持证情况", show: this.caseInfo.status > 1 },
        { id: "#cyqk", name: "船员情况", show: this.caseInfo.status > 1 },
        { id: "#syyjqk", name: "携带渔具情况", show: this.caseInfo.status > 1 },
        { id: "#yhwqk", name: "渔获物情况", show: this.caseInfo.status > 1 },
        { id: "#sfkycw", name: "是否扣押财物", show: false },
        { id: "#zpzj", name: "照片证据", show: true },
        { id: "#ajbh", name: "案件编号", show: true },
        { id: "#ajms", name: "案件描述", show: true },
        { id: "#ajss", name: "案件事实", show: this.caseInfo.status > 0 },
        { id: "#cfjds", name: "全文摘要", show: this.caseInfo.status > 1 },
        { id: "#zxjg", name: "执行结果", show: this.caseInfo.status > 1 }
      ];
    },
    disableUnit() {
      return false;
    },
    // filterShipOptions(){
    //     // console.log(this.shipOptions);
    //     // var temp= deepCopy(this.shipOptions);
    //     // temp.push("3333");
    //     // console.log("temp");
    //     // console.log(temp);
    //     return this.shipOptions;
    // },
    uploadData() {
      return {
        dataId: this.caseInfo.id,
        moduleId: "EnforceCaseInfo",
        type: "file"
      };
    },
    showPicPathWithBase() {
      return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
    },
    existsCaseInfo() {
      return !isNull(this.caseInfo.id);
    },
    ownCase() {
      var userInfo = this.$store.state.user.userInfo;
      var status = this.caseInfo.status;
      return (
        !isNull(this.caseInfo.id) &&
        !isNull(userInfo) &&
        userInfo.userId == this.caseInfo.creatorId &&
        status != "8"
      );
    },
    hasAdminRole() {
      return this.$hasRoles("ADMIN");
    }
  },
  methods: {
    showShipModal(name) {
      if (isEmpty(this.caseInfo.shipinfo.shipname)) {
        this.$Message.error("请选择渔船！");
        return;
      }
      this.shipModal[name] = true;
    },
    selectLeftMenu: function(id) {
      this.leftActive = id;
      var top =
        $("#content").scrollTop() +
        $(id).offset().top -
        $("#content").offset().top -
        30;
      $("#content").scrollTop(top);
      // var content=document.getElementById("content");
      // var top=content.scrollTop+document.getElementById(id.substring(1)).offsetTop-content.offsetTop-30;
      // content.scrollTop=top;
    },
    // searchShip(query){
    //     var _self=this;
    //     // _self.$nextTick(function(){
    //         _self.shipLoading=true;
    //         _self.$http.get("/enforces/case/searchShip",{
    //             params:{
    //                 query:query
    //             }
    //         }).then(function(result){
    //             if(result.success){
    //                 _self.shipOptions=result.data;
    //             }
    //             _self.$nextTick(function(){
    //                 _self.shipLoading=false;
    //             });

    //         });
    //     // });

    // },
    // selectShip(shipname){
    //     var _self=this;
    //     var caseInfo=_self.caseInfo;
    //     _self.$http.get("/enforces/case/selectShip",{
    //         params:{
    //             shipname:shipname
    //         }
    //     }).then(function(result){
    //         if(result.success){
    //             if(!result.data)
    //                 result.data={};
    //             _self.caseInfo.shipinfo.owner=result.data.owner;
    //             _self.caseInfo.shipinfo.ownertel=result.data.tel;
    //             _self.caseInfo.shipinfo.certno=result.data.cardno;
    //             _self.caseInfo.shipinfo.cjg=result.data.cjg;
    //             _self.caseInfo.shipinfo.power=result.data.power;
    //             _self.caseInfo.shipinfo.workmode=result.data.workmode;
    //             _self.caseInfo.shipinfo.length=result.data.length;
    //             _self.caseInfo.shipinfo.width=result.data.width;
    //             _self.caseInfo.shipinfo.depth=result.data.depth;
    //             _self.caseInfo.shipinfo.material=result.data.material;
    //             _self.caseInfo.shipinfo.positioncrews=result.data.positioncrews;
    //             _self.caseInfo.shipinfo.blxkz=result.data.xkz;
    //             _self.caseInfo.shipinfo.blxkzh=result.data.fishingLicense;
    //             _self.caseInfo.shipinfo.cjz=result.data.cj;
    //             _self.caseInfo.shipinfo.cbsyq=result.data.syq;
    //             var owner=result.data.owner;
    //             if(!isNull(owner)){
    //                 // if(owner.length<=5){
    //                     // if(isNull(_self.caseInfo.litigants.name)){
    //                         _self.caseInfo.litigants.name=result.data.owner;
    //                         _self.caseInfo.litigants.tellphone=result.data.tel;
    //                         _self.caseInfo.litigants.identiId=result.data.cardno;
    //                         _self.caseInfo.litigants.address=result.data.address;
    //                         _self.caseInfo.litigants.political="";
    //                         var cardno=result.data.cardno;
    //                         if(!isNull(cardno)&&cardno.length==18)
    //                             _self.caseInfo.litigants.age=getAge(result.data.cardno);
    //                     // }
    //                 // }else{
    //                 //     if(isNull(_self.caseInfo.litigants.unitName)){
    //                 //         _self.caseInfo.litigants.unitName=result.data.owner;
    //                 //         _self.caseInfo.litigants.unitTell=result.data.tel;
    //                 //         _self.caseInfo.litigants.unitAddress=result.data.address;
    //                 //     }
    //                 // }
    //             }
    //         }
    //     });
    // },
    onSelectShip(row) {
      console.log(row);
      this.caseInfo.shipinfo.shipname = row.shipname;
      this.caseInfo.shipinfo.owner = row.owner;
      this.caseInfo.shipinfo.ownertel = row.tel;
      this.caseInfo.shipinfo.certno = row.cardno;
      this.caseInfo.shipinfo.cjg = row.portregistry;
      this.caseInfo.shipinfo.power = row.power;
      this.caseInfo.shipinfo.workmode = row.workmode;
      this.caseInfo.shipinfo.length = row.length;
      this.caseInfo.shipinfo.width = row.width;
      this.caseInfo.shipinfo.depth = row.depth;
      this.caseInfo.shipinfo.material = row.shipmate;
      // this.caseInfo.shipinfo.positioncrews=row.positioncrews;
      this.caseInfo.shipinfo.blxkz = this.certStatus(row.ycblxkz);
      this.caseInfo.shipinfo.blxkzh = row.fishingLicenseNumberA;
      this.caseInfo.shipinfo.cjz = this.certStatus(row.ycjyzs);
      this.caseInfo.shipinfo.cbsyq = this.certStatus(row.ycjyzs);
      var owner = row.owner;
      if (!isNull(owner)) {
        this.caseInfo.litigants.name = row.owner;
        this.caseInfo.litigants.tellphone = row.tel;
        this.caseInfo.litigants.identiId = row.cardno;
        this.caseInfo.litigants.address = row.address;
        this.caseInfo.litigants.political = "";
        var cardno = row.cardno;
        if (!isNull(cardno) && cardno.length == 18)
          this.caseInfo.litigants.age = getAge(cardno);
      }
    },
    certStatus(status) {
      if (status == "1") return "有效";
      else if (status == "2") return "无效";
      else if (status == "3") return "无";
      return "";
    },
    calculateAge() {
      this.caseInfo.litigants.age = getAge(this.caseInfo.litigants.identiId);
    },
    computeFishGrid(name, num) {
      var _self = this;
      var caseInfo = _self.caseInfo;
      if (parseInt(caseInfo[name]) > num || parseInt(caseInfo[name]) < 0) {
        this.$Message.error("输入的数据超出范围！");
        this.caseInfo[name] = "0";
      }

      if (
        caseInfo.caseType == "海上" &&
        !isNull(caseInfo.lonDu) &&
        !isNull(caseInfo.latDu)
      ) {
        var lon =
          parseFloat(caseInfo.lonDu) +
          parseFloat(caseInfo.lonFen) / 60 +
          parseFloat(caseInfo.lonMiao) / 3600;
        var lat =
          parseFloat(caseInfo.latDu) +
          parseFloat(caseInfo.latFen) / 60 +
          parseFloat(caseInfo.lonMiao) / 3600;
        if (lon == 0 || lat == 0) return;
        _self.$http
          .get("/enforces/case/fishgrid", {
            params: {
              lon: lon,
              lat: lat
            }
          })
          .then(function(result) {
            if (result.success) {
              caseInfo.bfishingarea = result.data.big;
              caseInfo.sfishingarea = result.data.small;
            } else {
              _self.$Message.error("输入的经纬度不在渔区内！");
            }
          });
      }
    },
    computeLonLat(name, num) {
      if(name == "lon"){
        if (parseInt(this.lon) > num || parseInt(this.lon) < 0) {
          this.$Message.error("输入的经度超出范围！");
          this.lon = ""
          return
        }
      }else{
        if (parseInt(this.lat) > num || parseInt(this.lat) < 0) {
          this.$Message.error("输入的纬度超出范围！");
          this.lat = ""
          return
        }
      }
    },
    keydown(event) {
      if (
        (event.ctrlKey && window.event.keyCode == 67) ||
        (event.ctrlKey && window.event.keyCode == 86) ||
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8 ||
        event.keyCode == 190 ||
        event.keyCode == 189
      )
        event.returnValue = true;
      else event.returnValue = false;
    },

    //地图选择地点
    selectAMap(lon, lat, address) {
      // this.caseInfo.lonDu:"000",
      // this.caseInfo.lonFen:"00",
      // this.caseInfo.lonMiao:"00",
      // this.caseInfo.latDu:"00",
      // this.caseInfo.latFen:"00",
      // this.caseInfo.latMiao:"00",
      // console.log(lon)
      // console.log(lat);
      this.showAMapModal = false;
      this.caseInfo.caseHappenAddress = address;
    },
    /**证据照片 */
    beforeUpload: function() {
      var _self = this;
      var id = _self.caseInfo.id;
      if (_self.ifEdit) {
        return false;
      }
      if (isEmpty(id)) {
        _self.$Message.error("请保存案件信息！");
        return false;
      }
      return true;
    },
    uploadSuccess: function(response, file, fileList) {
      if (response.success) {
        this.loadFiles();
      }
    },
    loadFiles: function() {
      var _self = this;
      _self.$http
        .get("/$admin/attachs", {
          params: _self.uploadData
        })
        .then(function(result) {
          if (result.success) _self.uploadList = result.data;
        });
    },
    showFile: function(item) {
      var name = item.name;
      var index = name.lastIndexOf(".");
      var suffix = index > 0 ? name.substring(index) : "";
      if (
        suffix != "" &&
        ".bmp,.jpg,.png,.jpeg,.tiff,.gif".indexOf(suffix.toLowerCase()) >= 0
      ) {
        // window.open("showImage.jsp?bigAttUrl="+item.attachpath,"_blank");
        // window.location.href=this.$basePath+"/$admin/attachs/stream/"+item.id;
        this.showPicId = item.id;
        this.showPic = true;
      } else
        window.location.href =
          this.$basePath + "/$admin/attachs/stream/" + item.id;
    },
    deleteFile: function(index, item) {
      var _self = this;
      _self.$http.delete("/$admin/attachs/" + item.id).then(function(result) {
        if (result.success) {
          _self.uploadList.splice(index, 1);
        }
        _self.$Message.info(result.description);
      });
    },

    //自由裁量
    selectDiscretionaryPower(node) {
      this.caseInfo.rightsnum = node.rightsnum;
      this.caseInfo.illegalAct = node.illegalAct;
      this.caseInfo.illegalClause = node.illegalClause;
      this.caseInfo.punishAccording = node.punishAccording;
      this.discretionaryShow = false;
    },
    addDoc(edit) {
      var _self = this;
      _self.confirmSaveCase(function() {
        openPageOffice(_self, {
          action: edit ? "edit" : "view",
          caseId: _self.caseInfo.id,
          type: "wenshou"
        });
      });
    },
    addWenshou(docType, handler) {
      var _self = this;
      _self.$http
        .get("/enforces/wenshou/addWenshou", {
          params: {
            caseId: _self.caseInfo.id,
            docType: docType
          }
        })
        .then(handler);
    },
    makeWs(docType, isFlow) {
      this.dealWs(docType, true, isFlow);
    },
    showWs(docType, isFlow) {
      this.dealWs(docType, false, isFlow);
    },
    dealWs(docType, edit, isFlow) {
      var _self = this;
      _self.confirmSaveCase(function() {
        _self.loadWsList(docType, function(result) {
          if (result.success) {
            var data = result.data;
            var length = data.length;
            console.log(data, "data");
            if (length == 1) {
              var params = data[0];
              // openPageOffice(_self,{
              //     action: edit?"edit":"view",
              //     caseId: _self.caseInfo.id,
              //     type: "wenshou",
              //     wsId:params.id,
              //     docType:docType
              // });
              _self.openWs(params.id, docType, edit, isFlow);
            } else if (length > 1) {
              // _self.openWs(result.data);
              _self.wenshou.show = true;
              _self.wenshou.edit = edit;
              _self.wenshou.data = data;
            } else {
              if (edit) {
                _self.$Modal.confirm({
                  title: "请选择",
                  content: "是否新增文书？",
                  onOk() {
                    _self.addWenshou(docType, function(result) {
                      // openPageOffice(_self,{
                      //     action: "edit",
                      //     caseId: _self.caseInfo.id,
                      //     type: "wenshou",
                      //     wsId:result.data.id,
                      //     docType:docType
                      // });
                      _self.openWs(result.data.id, docType, edit, isFlow);
                    });
                  }
                });
              } else {
                _self.$Message.info("文书不存在！");
              }
            }
          } else {
            _self.$Message.info(result.msg);
          }
        });
      });
    },
    openWs(wsId, docType, edit, isFlow) {
      var _self = this;
      if (isFlow) {
        _self.exitsWsInstance(wsId, function(result) {
          if (result.success) {
            var data = result.data;
            _self.workflow = {
              show: true,
              caseId: _self.caseInfo.id,
              businessKey: wsId,
              category: docType,
              instanceId: data.instanceId,
              taskId: data.taskId
            };
          }
        });
      } else {
        openPageOffice(_self, {
          action: edit ? "edit" : "view",
          caseId: _self.caseInfo.id,
          type: "wenshou",
          wsId: wsId,
          docType: docType
        });
      }
    },
    loadWsList(docType, handler) {
      var _self = this;
      _self.$http
        .get("/enforces/wenshou/getWsList", {
          params: {
            docType: docType,
            caseId: _self.caseInfo.id
          }
        })
        .then(handler);
    },
    exitsWsInstance(wsId, handler) {
      var _self = this;
      _self.$http
        .get("/workflow/runtime/existsInstance", {
          params: {
            businessKey: wsId
          }
        })
        .then(handler);
    },
    startWorkFlow() {
      var _self = this;
      _self.$http
        .get("/enforces/wenshou/loadUndoWsFlowList", {
          params: {
            caseId: _self.caseInfo.id
          }
        })
        .then(function(result) {
          if (result.success) {
            _self.wsFlow.data = result.data;
            _self.wsFlow.show = true;
          }
          _self.$Message.info(result.msg);
        });
    },
    /**  文书相关方法  end */

    /**  案件相关方法  start */
    initCaseInfo() {
      if (isNull(this.caseInfo.id)) {
        var userInfo = this.$store.state.user.userInfo;
        if (!isNull(userInfo) && !isNull(userInfo.ext)) {
          var ext = JSON.parse(userInfo.ext);
          this.caseInfo.headName = ext.department;
          this.caseInfo.lawManNum = ext.code;
          this.caseInfo.lawMan2 = ext.partner;
          this.caseInfo.lawMan2Num = ext.partnerCode;
        }
      }
    },
    confirmSaveCase(handler) {
      var _self = this;
      var id = _self.caseInfo.id;
      if (isEmpty(id)) {
        _self.$Message.error("请保存案件信息！");
        return;
      }
      // _self.$Modal.confirm({
      //     title:"提示",
      //     content:"请确认案件信息已经保存！",
      //     onOk:handler
      // });
      handler();
    },
    vaildCaseForm(handler) {
      var _self = this;
      this.caseInfo.lonDu = parseInt(this.caseInfo.lonDu);
      this.caseInfo.lonFen = parseInt(this.caseInfo.lonFen);
      this.caseInfo.lonMiao = parseInt(this.caseInfo.lonMiao);
      this.caseInfo.latDu = parseInt(this.caseInfo.latDu);
      this.caseInfo.latFen = parseInt(this.caseInfo.latFen);
      this.caseInfo.latMiao = parseInt(this.caseInfo.latMiao);
      _self.$refs["caseInfo"].validate(valid => {
        if (valid) {
          handler();
        } else {
          setTimeout(() => {
            var formBox = document.getElementsByClassName("transactionRegist")[0].firstChild
            var isError = document.getElementsByClassName("ivu-form-item-error")
            var isErrorTop = isError[0].getBoundingClientRect().top
            if(isErrorTop>0){
                if(isErrorTop<120){
                    formBox.scrollTop = formBox.scrollTop - isErrorTop + 20
                }else{
                    formBox.scrollTop = isErrorTop - 120
                }
            }else{
                formBox.scrollTop = formBox.scrollTop - Math.abs(isErrorTop) - 120
            }
            var showErrText = $(isError[0]).find('div[class^="ivu-form-item-error-tip"]').text();
            if(showErrText)
                _self.$Message.error(showErrText);
          }, 100);
        }
      });
    },
    vaildTask: function(docType, description, handler) {
      var _self = this;
      var caseId = _self.caseInfo.id;
      if (isNull(caseId)) {
        _self.$Message.error("请保存案件信息！");
        return;
      }
      _self.$http
        .get("/enforces/wenshou/existsTask", {
          params: {
            docType: docType,
            caseId: caseId
          }
        })
        .then(function(result) {
          if (result.success) {
            handler(result);
          } else {
            _self.$Message.error(description);
          }
        });
    },
    saveCaseInfo(handler, error) {
      var _self = this;
      var caseId = _self.caseInfo.id;
      if (isEmpty(caseId)) {
        _self.caseInfo.status = "0";
        this.$http
          .post("/enforces/case", _self.caseInfo)
          .then(handler)
          .catch(error);
      } else {
        this.$http
          .put("/enforces/case/" + caseId, _self.caseInfo)
          .then(handler)
          .catch(error);
      }
    },
    saveDraft() {
      var _self = this;
      _self.vaildCaseForm(function() {
        _self.saveCaseInfo(function(result) {
          if (result.success) {
            var caseId = result.data.id;
            _self.caseInfo.id = caseId;
            _self.updatedIndex = 0;
          }
          _self.$Message.info({ content: result.msg });
        });
      });
    },
    //立案
    submitLian() {
      var _self = this;
      _self.vaildTask("R2", "请发起立案审批！", function() {
        _self.$Modal.confirm({
          title: "提示",
          content: "请确认是否完成案件立案！",
          onOk: function() {
            _self.caseInfo.status = "1";
            _self.saveCaseInfo(function(result) {
              if (result.success) {
                // _self.submitGoto(2);
                // setTimeout(function(){ _self.submitGoto(2); }, 300);
                _self.updatedIndex = 0;
                _self.$router.push({ path: "/enforcement/case/caseDoing" });
              } else {
                _self.$Message.info(result.msg);
              }
              //window.parent.location.href="<%=basePath%>/enforcers/index.jsp";
              // loadPage('content.jsp','#zj_management_system_transaction',true);
            });
          }
        });
      });
    },
    //案件办理
    submitAjbl() {
      var _self = this;
      _self.vaildTask("R6", "请先制作行政处罚决定审批表！", function() {
        _self.$Modal.confirm({
          title: "提示",
          content: "请确认是否完成案件办理！",
          onOk: function() {
            _self.caseInfo.status = "2";
            _self.saveCaseInfo(function(result) {
              if (result.success) {
                // _self.submitGoto(8);
                // setTimeout(function(){ _self.submitGoto(8); }, 300);
                _self.updatedIndex = 0;
                _self.$router.push({ path: "/enforcement/case/caseDoing" });
              } else {
                _self.$Message.info(result.msg);
              }
              //window.parent.location.href="<%=basePath%>/enforcers/index.jsp";
              // loadPage('content.jsp','#zj_management_system_transaction',true);
            });
          }
        });
      });
    },
    //结案
    submitJiean() {
      var _self = this;
      _self.vaildCaseForm(function() {
      _self.vaildTask("R10", "请先行政处罚结案报告！", function() {
        _self.$Modal.confirm({
          title: "提示",
          content: "请确认是否结案归档！",
          onOk: function() {
            _self.$http
              .get("/enforces/wenshou/processWs/" + _self.caseInfo.id)
              .then(function(result) {
                if (result.success) {
                  var data = result.data;
                  if (!isNull(data) && data.length > 0) {
                    _self.$Message.info("存在未完成审批文书，请完成审批！");
                    return;
                  }
                  _self.caseInfo.status = "8";
                  _self.saveCaseInfo(function(result) {
                    if (result.success) {
                      _self.updatedIndex = 0;
                      _self.$router.push({ path: "/enforcement/case/caseDone" });
                    }
                    _self.$Message.info(result.msg);
                  });
                }
              });
          }
        });
      });
      })
    },
    //案件提交调整
    submitGoto(view) {
      var _self = this;
      _self.$Modal.confirm({
        title: "提示",
        content: "案件提交成功，请选择下一步操作！",
        okText: "继续办理",
        cancelText: "返回首页",
        onOk() {
          _self.$router.push({
            path: "/enforcement/case/addCase",
            query: { caseId: _self.caseInfo.id, view: view }
          });
        },
        onCancel() {
          _self.$router.push({ path: "/enforcement/case/caseDoing" });
        }
      });
    },
    loadCase(caseId) {
      var _self = this;
      this.$http.get("/enforces/case/" + caseId).then(function(result) {
        if (result.success) {
          // var $shipName=_self.$refs['shipName'];
          // $shipName.$off("on-change");
          // $shipName.$off("on-query-change");
          result.data.caseHappenTime = new Date(
            result.data.caseHappenTime.replace(/-/, "/")
          );
          if (isNull(result.data.caseType)) result.data.caseType = "海上";
          // _self.shipLoading=true;
          // _self.shipOptions=[result.data.shipinfo.shipname];
          // console.log("loadCase");
          // console.log(result.data);
          // console.log(_self.shipOptions)
          // _self.$nextTick(function(){
          //     _self.shipLoading=false;
          //      $shipName.setQuery(result.data.shipinfo.shipname);
          // });
          _self.$nextTick(function() {
            _self.caseInfo = result.data;
            // _self.shipLoading=false;
            // $shipName.$on("on-change",_self.selectShip);
            // $shipName.$on("on-query-change",_self.searchShip);
            _self.loadFiles();
          });
          _self.$Message.info("数据加载成功！");
        } else {
          _self.$Message.error("数据加载失败！");
        }
      });
    },
    removeCase(caseId) {
      var _self = this;
      this.$http.delete("/enforces/case/" + caseId).then(function(result) {
        if (result.success) {
          _self.draftPage();
        }
        _self.$Message.info({ content: "案件删除成功！" });
      });
    },
    revokeCase() {
      this.modelShow = true;
      this.caseTitle = '撤销案件'
      this.caseLabel = '撤销理由'
    },
    rollbackCase() {
      this.caseTitle = '撤回案件'
      this.caseLabel = '撤回理由'
      this.modelShow = true;
      // var _self=this;
      // _self.$Modal.confirm({
      //     title:"提示",
      //     content:"请确认是否撤回案件？",
      //     onOk:function(){
      //         _self.$http.post("/enforces/case/rollback/"+_self.caseInfo.id)
      //         .then(function(result){
      //             if(result.success){
      //                 _self.$router.go(-1);
      //             }
      //             _self.$Message.info(result.msg);
      //         });
      //     }
      // });
    },
    cancel(name) {
      this.$refs["formCustom"].resetFields();
      this.modelShow = false;
    },
    sure(name) {
      var _self = this;
      _self.$refs["formCustom"].validate(valid => {
        if (valid) {
          if (_self.caseTitle == '撤销案件') {
            _self.$http
              .delete(
                "/enforces/case/revokeCase/" +
                  _self.caseInfo.id +
                  "/" +
                  _self.caseInfo.message
              )
              .then(function(result) {
                if (result.success) {
                  _self.$router.go(-1);
                  _self.modelShow = false;
                }
                _self.$Message.info(result.msg);
              });
          } else if (_self.caseTitle == '撤回案件') {
            _self.$Modal.confirm({
              title:"提示",
              content:"请确认是否撤回案件？",
              onOk:function(){
                  _self.$http.post("/enforces/case/rollback/"+_self.caseInfo.id + "/" +_self.caseInfo.message) 
                  .then(function(result){
                      if(result.success){
                          _self.$router.go(-1);
                      }
                      _self.$Message.info(result.msg);
                  });
              }
          });
          }
        } else {
          _self.$Message.error("填写存在错误");
          return;
        }
      });
    },
    transferCase() {
      var _self = this;
      if (_self.transferInfo.transferNumber === undefined || _self.transferInfo.transferNumber === '') {
        _self.$Message.error('请填写移送人数。');
        return;
      }
      // _self.$Modal.confirm({
      //   title: "提示",
      //   content: "请确认是移送案件？",
      //   onOk: function() {
          // _self.$http.get("/enforces/case/transfer/"+_self.caseInfo.id)
          // .then(function(result){
          //     if(result.success){
          //         // _self.$router.go(-1);
          //     }
          //     _self.$Message.info(result.msg);
          // });
          // window.location.href=_self.$basePath+"/enforces/case/transfer/"+_self.caseInfo.id;

          _self
            .$http({
              method: "get",
              url:
                _self.$basePath +
                "/enforces/case/transfer/" +
                _self.caseInfo.id + '/' + _self.transferInfo.transferNumber,
              responseType: "arraybuffer"
            })
            .then(res => {
              _self.transferCaseModal = false;
              let blob = new Blob([res], { type: "" });
              // let objectUrl = URL.createObjectURL(blob);
              // window.location.href= objectUrl;
              var caseInfo = _self.caseInfo;
              var shipinfo = caseInfo.shipinfo;
              var litigants = caseInfo.litigants;
              var temp = isNull(litigants.name)
                ? litigants.unitName
                : litigants.name;
              if (!isNull(shipinfo.shipname)) {
                if ("1" == caseInfo.enforceMain)
                  temp += "(" + shipinfo.shipname + ")";
                else temp = shipinfo.shipname + "(" + temp + ")";
              }

              const fileName = temp + ".zip";
              if ("download" in document.createElement("a")) {
                // 非IE下载
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink.href); // 释放URL 对象
                document.body.removeChild(elink);
              } else {
                // IE10+下载
                navigator.msSaveBlob(blob, fileName);
              }
              window.location.href = "/#/enforcement/case/caseHanded";
            });
        // }
      // });
    },
    handedCase(nodes, ids, names) {
      this.$Modal.confirm({
        title: "提示",
        content: this.transferCaseModal && !this.handedCaseInfo.show?"请确认是移送案件？":"请确认是移交案件？",
        onOk: () => {
          if (isEmpty(ids) || isEmpty(names)) {
            this.$Message.info("接收人或单位不能为空！");
            return;
          }
          this.$http
            .patch("/enforces/case/handedCase", {
              dataId: this.caseInfo.id,
              handler: names,
              handlerId: ids
            })
            .then(res => {
              if (res.success) {
                this.$router.go(-1);
              }
              this.$Message.info(res.msg);
            });
        }
      });
    },
    draftSearch() {
      this.draftPage(1);
    },
    draftPage(page) {
      var _self = this;
      if (!isEmpty(page)) this.draft.query.page = page;
      this.$http
        .get("/enforces/case/page", {
          params: {
            query: JSON.stringify(_self.draft.query)
          }
        })
        .then(function(result) {
          if (result.success) {
            _self.draft.data = result.data.data;
            _self.draft.dataTotal = result.data.total;
            _self.draft.show = true;
          }
        });
    },
    draftDBClick(row, index) {
      this.loadCase(row.id);
      this.draft.show = false;
    },
    enforcersChange(data) {
      // console.log("enforcersChange");
      // console.log(data);
      this.caseInfo.enforcers = data;
    },
    getLawMan(info) {
      // console.log("getLawMan");
      // console.log(info);
      this.caseInfo.lawMan2 = info.name;
      this.caseInfo.lawMan2Num = info.yycert;
      this.caseInfo.lawMan2Id = info.uuid;
    },
    selectLawMan(item, index) {
      this.enforcers.curLawMan = item;
      this.enforcers.show = true;
    },
    changeLawMan(item) {
      console.log(item);
      var curLawMan = this.enforcers.curLawMan;
      curLawMan.lawMan2Id = item.id;
      curLawMan.lawMan2 = item.name;
      curLawMan.lawMan2Num = item.code;
    },
    addLawMan() {
      var length = this.caseInfo.enforcers.length;
      this.caseInfo.enforcers.splice(length, 0, {});
    },
    deleteLawMan(index) {
      this.caseInfo.enforcers.splice(index, 1);
    },
    // searchLawMan(){
    //     this.$refs.enforcers.parentPersonSearch();
    // },
    // addEnforcers(){
    //     this.$refs.enforcers.add();
    // },
    /**  案件相关方法  end */

    /**  简易案件相关方法  start */
    saveSimpleCaseDraft() {
      var _self = this;
      _self.caseInfo.type = "0";
      _self.saveDraft();
    },
    submitSimpleCase() {
      console.log(222222)
      var _self = this;
      _self.vaildCaseForm(function() {
        _self.caseInfo.type = "0";
        _self.caseInfo.status = "8";
        _self.saveCaseInfo(function(result) {
          if (result.success) {
            _self.$router.push({ path: "/enforcement/case/simpleCase" });
          }
          _self.$Message.info(result.msg);
        });
      });
    },
    /**  简易案件相关方法  end */
    /**案件编号 */
    selectEnforceType(row) {
      this.caseInfo.enforceType = row.type;
      this.caseInfo.enforceYear=new Date().getFullYear();
      this.$http
        .get("/enforces/case/enforceNum", {
          enforceType: this.caseInfo.enforceType,
          enforceYear: this.caseInfo.enforceYear
        })
        .then(result => {
          if (result.success) {
            this.caseInfo.enforceNum = result.data;
          }
        });
    },
    conversion(type){
      this.lonlatShow = true
      if(type == "lon"){
        this.lonlatTitle = "经度："
        this.isLon = true
        this.lon = Number(this.caseInfo.lonDu) + Number(this.caseInfo.lonFen / 60) + Number(this.caseInfo.lonMiao / 3600)
      }else{
        this.lonlatTitle = "纬度："
        this.isLon = false
        this.lat = Number(this.caseInfo.latDu) + Number(this.caseInfo.latFen / 60) + Number(this.caseInfo.latMiao / 3600)
      }
    },
    lonlatSure(){
      if(this.isLon == true){
        this.caseInfo.lonDu = parseInt(this.lon)
        this.caseInfo.lonFen = parseInt((this.lon - parseInt(this.lon)) * 60)
        this.caseInfo.lonMiao = parseInt(((this.lon - parseInt(this.lon)) * 60 - parseInt((this.lon - parseInt(this.lon)) * 60)) * 60)
        this.lonlatShow = false
      }else{
        this.caseInfo.latDu = parseInt(this.lat)
        this.caseInfo.latFen = parseInt((this.lat - parseInt(this.lat)) * 60)
        this.caseInfo.latMiao = parseInt(((this.lat - parseInt(this.lat)) * 60 - parseInt((this.lat - parseInt(this.lat)) * 60)) * 60)
        this.lonlatShow = false
      }
    },
    lonlatCancel(){
      this.lonlatShow = false
    }
  },
  mounted() {
    var query = this.$route.query;
    if (
      query.view === "9" ||
      query.view === "4" ||
      query.view === "simpleCaseview"
    ) {
      this.ifEdit = true;
    }
    if (!isNull(query.caseId)) this.loadCase(query.caseId);
    this.initCaseInfo();
    this.caseInfo.id = query.caseId

    if (
      this.$route.query.view == "simpleCase" ||
      this.$route.query.view == "simpleCaseview"
    )
      this.$route.meta.title = "简易案件";
    else this.$route.meta.title = "一般案件";
    var singlePageCon = document.getElementsByClassName("single-page-con");
    this.showleftMenu = !(singlePageCon.length > 0);
  }
};
</script>
