<style lang="less">
</style>
<template>
  <div>
    <data-table ref="test" 
        :withTree="showtree" :useZtree="false" :treeUrl="'/$admin/depts/authtree'" :treeParams="treeQuery" :treeTitle="'所属地区'"
        :url="'/standingbook/oneshiponefile/page'" :params="query" :columns="columns"
        @on-select-change="selectTreeChange"
        @on-selection-change="selectTableChange"
        @on-row-dblclick="handleShowDetail">
        <div slot="search">
            <Form :label-width="100" @submit.native.prevent>
              <Row>
                <Col span="6">
                    <Form-item label="渔船名:">
                      <Input v-model="query.wheres.shipName_like" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item label="作业类型:">
                        <Select v-model="query.wheres.workType_like">
                          <Option v-for="item in defaultWorkType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                        </Select>
                    </Form-item>
                </Col>

                <div class="btn-wrap">
                  <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                  <Button @click="handleReset()"  >重置</Button>
                </div>

                <div class="func-wrap">
                  <Button @click="handleDownLoadCamera()" type="info">下载高拍仪插件</Button>
                  <Button @click="handleExport()" type="success" >导出</Button>
                  <Button @click="handleAdd()" type="info" icon="ios-add" >添加档案</Button>
                    <!-- <Button @click="handleShowExpireList()" type="warning" icon="information-circled" >证书到期提醒</Button> -->
                </div>
              </Row>
              <Row>
                <Col span="6">
                    <Form-item  label="船长(下限):">
                      <Input v-model="query.wheres.typeLength_gte" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item  label="船长(上限):">
                      <Input v-model="query.wheres.typeLength_lte" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item  label="功率(下限):">
                      <Input v-model="query.wheres.masterPower_gte" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
                <Col span="6">
                    <Form-item  label="功率(上限):">
                      <Input v-model="query.wheres.masterPower_lte" @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                    </Form-item>
                </Col>
              </Row>
            </Form>
        </div>
    </data-table>

    <Modal :width="840" v-model="status.showAdd" @on-ok="handleSave" title="档案信息" :mask-closable="false">
        <div slot="footer">
            <Button @click="handleCance">取消</Button>
            <Button type="primary" :disabled="submitLoad" @click="handleSave">确定</Button>
        </div>
        <Form :label-width="90" :model="info" :rules="infoRules" ref="info">
            <Row>
                <Col span="8">
                    <Form-item label="渔船名称:" prop="shipName">
                        <Input v-model="info.shipName" :readonly="status.isEdit">
                          <Button slot="append" type="primary" @click="handleSelectShip()">检索</Button>
                        </Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船籍港:" prop="area">
                        <Input v-model="info.area" @on-focus="selectArea"></Input>
                        <!-- <Input v-model="info.area"></Input>   -->
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="所属组织:" prop="organization">
                        <Input v-model="info.organization" @on-focus="selectOrganization"></Input>
                        <!-- <Input v-model="info.area"></Input>   -->
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="作业类型:">
                        <Select v-model="info.workType">
                          <Option v-for="item in defaultWorkType" :value="item.value" :key="item.value">{{ item.title }}</Option>
                        </Select>

                        <!-- <Input v-model="info.workType"></Input>   -->
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船东姓名:" >
                        <Input v-model="info.owner" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="联系电话:" prop="ownerTel">
                        <Input v-model="info.ownerTel" number></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="船舶类型:">
                        <Input v-model="info.shipTypeA"></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船体材质:" >
                        <Input v-model="info.hullMaterialA" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="渔船编码:">
                        <Input v-model="info.fishingCode"></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="总吨位:">
                        <Input v-model="info.grossTonnage"></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船体长度:" >
                        <Input v-model="info.typeLength" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="型宽:">
                        <Input v-model="info.typeWidth"></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="型深:">
                        <Input v-model="info.shipDepth"></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="功率:" >
                        <Input v-model="info.masterPower" ></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船舶呼号识别码:">
                        <Input v-model="info.shipCallMarkIdenCode"></Input>  
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="北斗ID:">
                        <Input v-model="info.beidou"></Input>  
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="MMSI:" >
                        <Input v-model="info.mmsi" ></Input>  
                    </Form-item>
                </Col>
            </Row>
        </Form>
    </Modal>

    <Modal :width="840" v-model="status.showDetail" :title="titleShipName">
        <div class="iconlist" >
          <div class="iconbean" @click="handleShowItem(1)">
            <div class="img-wrap">
              <span>{{count.cydy}}人</span>
              <img src="../../../images/船员档案.png" >
            </div>
            <div class="icondesc">船员档案</div>
          </div> 
          <div class="iconbean" @click="handleShowItem(2)">
            <div class="img-wrap">
              <span>{{count.cj}}%</span>
              <img src="../../../images/船检证书.png" >
            </div>
            <div class="icondesc">船检证书</div>
          </div> 
          <div class="iconbean" @click="handleShowItem(3)">
            <div class="img-wrap">
              <span>{{count.blxk}}%</span>
              <img src="../../../images/捕捞许可证书.png" >
            </div>
            <div class="icondesc">捕捞许可证书</div>
          </div> 
          <div class="iconbean" @click="handleShowItem(4)">
            <div class="img-wrap">
              <span>{{count.syq}}%</span>
              <img src="../../../images/所有权证书.png" >
            </div>
            <div class="icondesc">所有权证书</div>
          </div> 
          <div class="iconbean" @click="handleShowItem(5)">
            <div class="img-wrap">
              <span>{{count.gj}}%</span>
              <img src="../../../images/国籍证书.png" >
            </div>
            <div class="icondesc">国籍证书</div>
          </div>
          <div class="iconbean" @click="handleShowItem(6)">
            <div class="img-wrap">
              <span>{{count.insurance}}%</span>
              <img src="../../../images/渔船互保.png" >
            </div>
            <div class="icondesc">渔船互保保单</div>
          </div>
          <div class="iconbean" @click="handleShowItem(7)">
            <div class="img-wrap">
              <span>{{count.crewInsurance}}条</span>
              <img src="../../../images/雇主互保.png" >
            </div>
            <div class="icondesc">雇主互保保单</div>
          </div>
          <div class="iconbean" @click="handleShowItem(8)">
            <div class="img-wrap">
              <span>{{count.shipDuty}}条</span>
              <img src="../../../images/责任书.png" >
            </div>
            <div class="icondesc">渔船责任书</div>
          </div>
          <div class="iconbean" @click="handleShowItem(13)">
            <div class="img-wrap">
              <span>{{count.crewDuty}}条</span>
              <img src="../../../images/船员责任书.png" >
            </div>
            <div class="icondesc">船员责任书</div>
          </div>
          <div class="iconbean" @click="handleShowItem(9)">
            <div class="img-wrap">
              <span>{{count.safecheck}}条</span>
              <img src="../../../images/安全检查记录.png" >
            </div>
            <div class="icondesc">安全检查记录</div>
          </div>
          <div class="iconbean" @click="handleShowItem(10)">
            <div class="img-wrap">
              <span>{{count.annualReview}}条</span>
              <img src="../../../images/年审申请表.png">
            </div>
            <div class="icondesc">年审申请表</div>
          </div>
          <div class="iconbean" @click="handleShowItem(11)">
            <div class="img-wrap">
              <span>{{count.dangerCheck}}条</span>
              <img src="../../../images/渔船隐患自查.png">
            </div>
            <div class="icondesc">渔船隐患自查</div>
          </div>

          <div v-if="isShowPortReport" class="iconbean" @click="handleShowItem(14)">
            <div class="img-wrap">
              <span>{{count.portReport}}条</span>
              <img src="../../../images/出港检查.png">
            </div>
            <div class="icondesc">出港报告</div>
          </div>
          <div v-show="isCooperative" class="iconbean" @click="handleShowItem(15)">
            <div class="img-wrap">
              <span>{{count.case}}条</span>
              <img src="../../../images/卷宗档案库.png">
            </div>
            <div class="icondesc">违法记录</div>
          </div>
          <div class="iconbean" @click="handleShowItem(16)">
            <div class="img-wrap">
              <span>{{count.moveShipReport}}条</span>
              <img src="../../../images/移泊报告.png">
            </div>
            <div class="icondesc">移泊报告</div>
          </div>
          <div class="iconbean" @click="handleShowItem(17)">
            <div class="img-wrap">
              <span>{{count.guardians}}条</span>
              <img src="../../../images/监护人管理.png">
            </div>
            <div class="icondesc">监护人</div>
          </div>
          <div class="iconbean" @click="handleShowItem(18)">
            <div class="img-wrap">
              <span>{{count.drlc}}条</span>
              <img src="../../../images/定人联船.png">
            </div>
            <div class="icondesc">定人联船</div>
          </div>
          <div class="iconbean" @click="handleShowItem(19)">
            <div class="img-wrap">
              <span>{{count.groupShip}}条</span>
              <img src="../../../images/渔船编组.png">
            </div>
            <div class="icondesc">渔船编组</div>
          </div>
          <div class="iconbean" @click="handleShowItem(20)">
            <div class="img-wrap">
              <span>{{count.labor}}条</span>
              <img src="../../../images/渔船编组.png">
            </div>
            <div class="icondesc">船员劳动合同书</div>
          </div>
          <div class="iconbean" @click="handleShowItem(12)">
            <div class="img-wrap">
              <img src="../../../images/当前报位.png">
            </div>
            <div class="icondesc">最后一次报位</div>
          </div>
        </div>

    </Modal>

    <Modal :width="840" v-model="status.showLabor" title="详情" :maskClosable="true">
        <div slot="footer">
                <Button  @click="status.showLabor = false">关闭</Button>
            </div>
            <Row>
                <Col span="24">
                    <Row >
                        <div style="margin-top:10px">
                            <Table :columns="columns_labor" :data="laborData" border :height="280"></Table>
                        </div>
                    </Row>
            </Col>
            </Row>
    </Modal>
    <crewDetail :width="'840'" v-model="status.showCrewDetail" :id="selectedRow.id" @on-ok="reloadPoint" :shipName="selectedRow.shipName" :owner="selectedRow.owner"></crewDetail>
    <cbjy v-model="status.showCbjy" :id="selectedRow.id" @on-ok="reloadPoint" :shipName="selectedRow.shipName" :owner="selectedRow.owner"></cbjy>
    <blxk :width="'1080'" v-model="status.showBlxk" :id="selectedRow.id" :shipName="selectedRow.shipName" :owner="selectedRow.owner" @on-ok="reloadPoint"></blxk>
    <syq v-model="status.showSyq" :id="selectedRow.id" @on-ok="reloadPoint" :shipName="selectedRow.shipName" :owner="selectedRow.owner"></syq>
    <gj v-model="status.showGj" :id="selectedRow.id" @on-ok="reloadPoint" :shipName="selectedRow.shipName" :owner="selectedRow.owner"></gj>
    <crewInsurance v-model="status.showCrewInsurance" :id="selectedRow.id" :shipName="selectedRow.shipName" :owner="selectedRow.owner" @on-ok="reloadPoint"></crewInsurance>
    <shipInsurance v-model="status.showShipInsurance" :id="selectedRow.id" :shipName_attach="selectedRow.shipName" :owner="selectedRow.owner" @on-ok="reloadPoint"></shipInsurance>
    <nssqbModel v-model="status.showNssqbModel" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></nssqbModel>
    <aqzrsModel v-model="status.showAqzrsModel" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></aqzrsModel>
    <selectArea v-model="status.showArea" :params="this.areaParams" @on-selected="selectedArea" ></selectArea>
    <selectArea v-model="status.showOrganization" :params="this.organizationParams" @on-selected="selectedOrganization"></selectArea>
    <selectShip v-model="status.showSelectShip" :keyParam="this.info.shipName" @on-selected="selectedShip"></selectShip>
    <shipDuty v-model="status.showShipDuty" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></shipDuty>
    <crewDuty v-model="status.showCrewDuty" :shipName="selectedRow.shipName" :owner="selectedRow.owner" :id="selectedRow.id" @on-ok="reloadPoint"></crewDuty>
    <shipPosition v-model="status.showShipPosition" :shipName="titleShipName" @on-ok="reloadPoint"></shipPosition>
  </div>
</template>
<script>
import crewDetail from '@/views/components/modal/crew/crewDetail';
import cbjy from '@/views/components/modal/shipCertificate/cbjy';
import blxk from '@/views/components/modal/shipCertificate/blxk';
import syq from '@/views/components/modal/shipCertificate/syq';
import gj from '@/views/components/modal/shipCertificate/gj';
import crewInsurance from '@/views/components/modal/insurance/crewInsuranceDetail';
import shipInsurance from '@/views/components/modal/insurance/shipInsuranceDetail';
import nssqbModel from '@/views/components/modal/other/nssqbModel';
import aqzrsModel from '@/views/components/modal/other/aqzrsModel';
import shipDuty from '@/views/components/modal/other/shipDuty';
import crewDuty from '@/views/components/modal/other/crewDuty';
import shipPosition from '@/views/components/modal/other/shipPosition';
import selectArea from '@/views/components/selectModal/selectArea';
import selectShip from '@/views/components/selectModal/selectShip.vue';
import user from '@/store/module/user.js';
var path = user.state.userInfo.dept.path;
var dept = user.state.userInfo.dept;
export default {
    name: 'oneShipOneFile',
    components: {
        crewDetail,
        cbjy,
        blxk,
        syq,
        gj,
        crewInsurance,
        shipInsurance,
        nssqbModel,
        aqzrsModel,
        selectArea,
        selectShip,
        shipDuty,
        crewDuty,
        shipPosition
    },
    data () {
        return {
            isShowPortReport: false,
            laborData: [],
            columns_labor: [
                {
                    title:'序号',
                    type: 'index',
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title:'甲方',
                    align:'center',
                    key:'jiafang'
                },
                 {
                    title:'乙方',
                    align:'center',
                    key:'yifang'
                },
                 {
                    title:'职务',
                    align:'center',
                    key:'duty'
                },
                 {
                    title:'鉴定单位',
                    align:'center',
                    key:'appraiser'
                },
                {
                    title:'签订日期',
                    align:'center',
                    key:'signingDate'
                },
                 {
                    title:'操作',
                    align:'center',
                    width:100,
                    render: (h,params) => {
                        var _self = this;
                        return h('div', [
                            h('Button', 
                            {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {

                                },
                                on: {
                                    click:()=> {
                                        // this.title="劳务合同";
                                        // this.editWin(params.row)
                                        this.goRounter(params.row)
                                    }
                                }
                            }, '劳务合同'),
                        ])
                    }
                }
            ],
            isCooperative: false,
            submitLoad: false,
            count: {
                cydy: '',
                cj: '',
                blxk: ''
            },
            status: {
                showAdd: false,
                isEdit: false,
                showDetail: false,
                showLabor: false,
                showCrewDetail: false,
                showCbjy: false,
                showBlxk: false,
                showSyq: false,
                showGj: false,
                showShipInsurance: false,
                showCrewInsurance: false,
                showDuty: false,
                showNssqbModel: false,
                showAqzrsModel: false,
                showArea: false,
                showSelectShip: false,
                showOrganization: false,
                showCrewDuty: false,
                showShipDuty: false,
                showShipPosition: false
            },
            areaParams: {
                includes: '30,44,45',
                type: '1'
            },
            organizationParams: {
                includes: '5,30,44,45,70,99',
                type: '1'
            },
            bookType: '1',
            columns: [
                // {
                //   type: 'selection',
                //   width: 58,
                //   align: 'center',
                // },
                {
                    title: '序号',
                    type: 'index',
                    align: 'center',
                    fixed: 'left',
                    width: 80
                },
                {
                    key: 'shipName',
                    title: '渔船名',
                    align: 'center',
                    sortable: 'custom',
                    fixed: 'left',
                    minWidth: 140
                },
                {
                    key: 'area',
                    title: '船籍港',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'owner',
                    title: '船东姓名',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'ownerTel',
                    title: '联系电话',
                    align: 'center',
                    minWidth: 120
                },
                {
                    key: 'organization',
                    title: '所属基层单位',
                    align: 'center',
                    minWidth: 140
                },
                {
                    key: 'shipTypeA',
                    title: '船舶类型',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'hullMaterialA',
                    title: '船体材质',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'fishingCode',
                    title: '渔船编码',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'beidou',
                    title: '北斗ID',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'mmsi',
                    title: 'MMSI',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'grossTonnage',
                    title: '总吨位',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'typeLength',
                    title: '船体长度',
                    align: 'center',
                    minWidth: 100
                },

                {
                    key: 'typeWidth',
                    title: '型宽',
                    align: 'center',
                    minWidth: 80
                },
                {
                    key: 'shipDepth',
                    title: '型深',
                    align: 'center',
                    minWidth: 80
                },
                {
                    key: 'masterPower',
                    title: '主机总功率',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'workType',
                    title: '作业类型',
                    align: 'center',
                    minWidth: 100
                },
                {
                    key: 'shipCallMarkIdenCode',
                    title: '船舶呼号识别码',
                    align: 'center',
                    minWidth: 140
                },

                {
                    title: '操作',
                    key: 'id',
                    align: 'center',
                    fixed: 'right',
                    minWidth: 180,
                    render: (h, params) => {
                        var temp = [];
                        temp.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleShowDetail(params.row);
                                        }
                                    }
                                },
                                '详情'
                            )
                        );
                        temp.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleEdit(params.row);
                                        }
                                    }
                                },
                                '修改'
                            )
                        );
                        temp.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.handleDelete(params.row);
                                        }
                                    }
                                },
                                '删除'
                            )
                        );
                        return h('div', temp);
                    }
                }
            ],
            infoRules: {
                ownerTel: [
                    {
                        type: 'number',
                        message: '请输入电话号码',
                        trigger: 'change'
                    }
                ],
                shipName: [
                    {
                        required: true,
                        type: 'string',
                        message: '请输入渔船名',
                        trigger: 'change'
                    }
                ],
                area: [
                    {
                        required: true,
                        type: 'string',
                        message: '请选择船籍港',
                        trigger: 'change'
                    }
                ],
                organization: [
                    {
                        required: true,
                        type: 'string',
                        message: '请选择所属组织',
                        trigger: 'change'
                    }
                ]

            },
            treeQuery: {
                containOrgan: false,
                type: '2'
            },
            query: {
                page: 1,
                size: 10,
                wheres: {
                    shipName_like: '',
                    organizationPath_like: path
                },
                orders: 'updateTime desc'
            },
            currNode: {},
            selectedRow: {},
            info: {
                shipName: '',
                workType: '',
                owner: '',
                tel: '',
                organization: '',
                area: '',
                sailorCertificate: [],
                crewInsurance: [],
                dangerCheck: [],
                annualReview: [],
                shipDuty: [],
                crewDuty: []
            },
            titleShipName: ''
        };
    },
    computed: {
        defaultWorkType () {
            var dicTypes = this.$store.getters.getDictList('ship_work_type');
            var workType = [];
            dicTypes.forEach(element => {
                workType.push({
                    title: element.title,
                    value: element.title
                });
            });

            workType.push({
                title: '辅助船',
                value: '辅助船'
            });
            return workType;
        }
    },
    methods: {
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset () {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = '';
            }
            this.query.wheres.organizationPath_like = path;
            this.initSearch();
        },
        isEmpty (s) {
            if (s == '' || s == undefined || s == null || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
        },
        selectTableChange (selection) {
            console.log(selection);
        },
        reloadPoint () {
            for (let key in this.count) {
                this.count[key] = 0;
            }
            if (this.isEmpty(this.selectedRow.id)) {
                return;
            }
            this.$http
                .get('/standingbook/oneshiponefile/getRelationInfo/' + this.selectedRow.id)
                .then(res => {
                    if (res.success) {
                        this.count = res.data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        reloadPointAndShowDetail () {
            for (let key in this.count) {
                this.count[key] = 0;
            }
            this.$http
                .get('/standingbook/oneshiponefile/getRelationInfo/' + this.selectedRow.id)
                .then(res => {
                    if (res.success) {
                        this.count = res.data;
                        this.status.showDetail = true;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleShowDetail (index) {
            if (this.$store.state.user.moduleCodes['portreport']) {
                this.isShowPortReport = true
            } else {
                this.isShowPortReport = false
            }
            this.selectedRow = index;
            this.reloadPointAndShowDetail();
            this.titleShipName = index.shipName;
        },
        handleEdit (index) {
            this.$http
                .get('/standingbook/oneshiponefile/' + index.id)
                .then(res => {
                    if (res.success) {
                        this.info = res.data;
                        this.info.ownerTel = parseInt(res.data.ownerTel);
                        this.status.showAdd = true;
                        this.status.isEdit = true;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDelete (index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    this.$http
                        .delete('/standingbook/oneshiponefile/' + index.id)
                        .then(res => {
                            this.$Message.info('操作成功');
                            this.initSearch();
                        })
                        .catch(err => {
                            console.log(error);
                        });
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        handleSelectShip () {
            this.status.showSelectShip = true;
        },
        selectedShip (info) {
            var _self = this;
            this.info.shipName = info.nametheShip;
            this.info.workType = info.workType;
            this.info.owner = info.namevesselOwner;
            this.info.ownerTel = parseInt(info.shipOwnerTelephone);
            this.info.fishingCode = info.fishingCode;
            this.info.grossTonnage = info.grossTonnage;
            this.info.addressshipOwner = info.addressshipOwner;
            this.info.shipDepth = info.shipDepth;
            this.info.shipOwnerTelephone = info.shipOwnerTelephone;
            this.info.typeLength = info.typeLength;
            this.info.typeWidth = info.typeWidth;
            this.info.hullMaterialA = info.material;
            this.info.masterPower = info.power;
            this.info.shipTypeA = info.shipTypeA;
            this.info.shipCallMarkIdenCode = info.shipCallMarkIdenCode;
            this.info.beidou = info.beidou;
            this.info.mmsi = info.mmsi;
            _self.$http
                .get('/standingbook/oneshiponefile/orgInfo', {
                    params: {
                        shipName: info.nametheShip,
                        type: 2
                    }
                })
                .then(res => {
                    if (res.success) {
                        _self.info.area = res.data.area;
                        _self.info.areaCode = res.data.areaCode;
                        _self.info.organization = res.data.organization;
                        _self.info.organizationCode = res.data.organizationCode;
                        _self.info.organizationPath = res.data.organizationPath;
                        //   this.$nextTick(function(){
                        //     _self.info.organization = res.data.artel
                        // })
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        selectArea () {
            this.status.showArea = true;
        },
        selectedArea (row) {
            var data = row[0];
            this.info.area = data.title;
            this.info.areaCode = data.division;
        },
        selectOrganization () {
            this.status.showOrganization = true;
        },
        selectedOrganization (row) {
            var data = row[0];
            if (!data.division) {
                this.info.organizationCode = data.id;
            } else {
                this.info.organizationCode = data.division;
            }
            this.info.organization = data.title;
            this.info.organizationPath = data.path;
        },
        handleAdd () {
            this.status.showAdd = true;
            this.status.isEdit = false;
            this.submitLoad = false;
            for (let key in this.info) {
                this.info[key] = '';
            }
            this.$refs['info'].resetFields();
        },
        onlySave () {
            if (this.info.sailorCertificate == '') {
                this.info.sailorCertificate = []
            }
            if (this.info.crewInsurance == '') {
                this.info.crewInsurance = []
            }
            if (this.info.dangerCheck == '') {
                this.info.dangerCheck = []
            }
            if (this.info.annualReview == '') {
                this.info.annualReview = []
            }
            if (this.info.shipDuty == '') {
                this.info.shipDuty = []
            }
            if (this.info.crewDuty == '') {
                this.info.crewDuty = []
            }
            if (this.info.ycjy == '') {
                this.info.ycjy = []
            }
            if (this.info.gj == '') {
                this.info.gj = []
            }
            if (this.info.syq == '') {
                this.info.syq = []
            }
            if (this.info.ycblxk == '') {
                this.info.ycblxk = []
            }
            this.$http
                .post('/standingbook/oneshiponefile/save', this.info)
                .then(res => {
                    this.status.showAdd = false;
                    if (res.success) {
                        this.submitLoad = false;
                        this.initSearch();
                    } else {
                        this.submitLoad = false;
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleCance () {
            this.status.showAdd = false;
        },
        handleSave () {
            this.submitLoad = true;
            this.$refs['info'].validate(valid => {
                if (valid) {
                    if (this.status.isEdit == true) {
                        this.$Modal.confirm({
                            title: '提示',
                            content: '<p>确认修改吗？</p>',
                            okText: '确认',
                            cancelText: '返回',
                            onOk: () => {
                                this.status.showAdd = false;
                                this.onlySave();
                            },
                            onCancel: () => {
                                this.submitLoad = false;
                                console.log('onCancel');
                            }
                        });
                    } else {
                        var query = {
                            page: 1,
                            size: 10,
                            wheres: {
                                shipName_eq: this.info.shipName
                            },
                            orders: 'updateTime desc'
                        };
                        this.$http
                            .get('/standingbook/oneshiponefile', {
                                params: {
                                    query: JSON.stringify(query)
                                }
                            })
                            .then(res => {
                                if (!res.success || res.data.length > 0) {
                                    this.$Message.error('系统中已存在该船数据，请勿重复创建！');
                                    this.status.showAdd = false;
                                } else {
                                    this.status.showAdd = false;
                                    this.onlySave();
                                }
                                this.submitLoad = true;
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }
                } else {
                    this.submitLoad = false;
                }
            });
        },
        selectTreeChange (nodes) {
            if (nodes.length == 0) {

            } else {
                this.currNode = nodes[0];
                this.query.wheres.organizationPath_like = this.currNode.path;
                this.initSearch();
            }
        },
        handleDownLoadCamera () {
            // window.open('src/static/zipSource/高拍仪控件.zip');
            window.open(this.$basePath + '/standingbook/oneshiponefile/getGPY');
        },
        handleExport () {
            // 导出数据
            window.open(this.$basePath + '/standingbook/oneshiponefile/exportData?query=' + encodeURI(JSON.stringify(this.query)));
        },
        goRounter(row) {
            this.$router.push({
                path: '/enforcement/cooperatebook/laborContract',
                query: {
                    shipName: row.shipName
                }
            });
        },
        initLaborData(shipName) {
            this.$http
            .get('/standingbook/labor/getLaborContractByShipName?shipName=' + shipName)
            .then(res => {
                if (res.success) {
                    this.laborData = res.data
                } else {
                    this.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        handleShowItem (val) {
            var shipName = '';
            switch (val) {
                case 1:
                    this.status.showCrewDetail = true;
                    break;
                case 2:
                    this.status.showCbjy = true;
                    break;
                case 3:
                    this.status.showBlxk = true;
                    break;
                case 4:
                    this.status.showSyq = true;
                    break;
                case 5:
                    this.status.showGj = true;
                    break;
                case 6:
                    this.status.showShipInsurance = true;
                    break;
                case 7:
                    this.status.showCrewInsurance = true;
                    break;
                case 8:
                    this.status.showShipDuty = true;
                    break;
                case 9:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/check/safety',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 10:
                    this.status.showNssqbModel = true;
                    break;
                case 11:
                    this.status.showAqzrsModel = true;
                    break;
                case 12:
                    this.status.showShipPosition = true;
                    break;
                case 13:
                    this.status.showCrewDuty = true;
                    break;
                case 14:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/check/portreport',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 15:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/case/caseDone',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 16:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/cooperatebook/movereport',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 17:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/check/guardian',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 18:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/cooperatebook/drlc',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 19:
                    shipName = this.selectedRow.shipName;
                    this.$router.push({
                        path: '/enforcement/cooperatebook/bianzu',
                        query: {
                            shipName: shipName
                        }
                    });
                    break;
                case 20:
                    this.initLaborData(this.selectedRow.shipName)
                    this.status.showLabor = true
                    break;
                default:
                    console.log('error format', val);
                    break;
            }
        }
    },
    beforeMount () {
        if (dept.type == '5') {
            this.showtree = false;
            this.query.key = dept.id;
            this.deptid = dept.id;
        } else {
            this.showtree = true;
        }
        if (this.$hasRoles('ADMIN')) {
            this.adminMng = true;
        } else {
            if (this.$hasRoles('coopAdmin') || this.$hasRoles('cooperative')) {
                this.iSmanager = true;
            } else {
                this.iSmanager = false;
            }
        }
        if(this.$hasRoles("cooperative")){
                this.isCooperative=false;
            }else{
                this.isCooperative=true;
            }
    },
    mounted () {
    // this.$http
    //   .get("/ycdtjg/third/shipInfo")
    //   .then(res => {
    //     console.log("shipInfo",res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // this.$http
    //       .get("/ycdtjg/third/portInfo")
    //       .then(res => {
    //         console.log("portInfo",res);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });

    // this.$http
    //   .get("/ycdtjg/third/shipPosition")
    //   .then(res => {
    //     console.log("shipPosition",res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // this.$http
    //   .get("/ycdtjg/third/shipStatistics")
    //   .then(res => {
    //     console.log("shipStatistics",res);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    }
};
</script>

<style scoped>
.iconlist {
  width: auto;
  height: 400px;
  overflow: auto;
}
.iconlist .img-wrap {
  /* border: 1px solid #eee; */
  border: none;
  position: relative;
  width: 80px;
  height: 80px;
  margin: auto;
  overflow: hidden;
  margin-bottom: 5px;
}
.iconlist .img-wrap span {
  position: absolute;
  transform: rotate(45deg);
  right: -15px;
  width: 50px;
  top: 4px;
  font-size: 10px;
  background-color: #2d8cf0;
  color: #fff;
  text-align: center;
}
.iconlist img {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 10px;
}
.icondesc {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 95px;
  margin: auto;
}
.iconbean {
  float: left;
  width: 12.5%;
  margin: 10px 0px;
  text-align: center;
  box-sizing: border-box;
  background-color: white;
}
.iconbean:hover {
  color: red;
}
</style>

