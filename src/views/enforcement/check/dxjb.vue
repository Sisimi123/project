<style lang="less" scoped>
@import "../styles/child.less";
</style>
<template>
    <div class="content-wrap transactionInpro">
        <div style="padding-left:10px;padding-top:10px;">
            <Row class-name="searColumn">
                <Col span="16">
                    <label class="pos2">船名</label>
                    <input  v-model="search.shipname"  placeholder="请输入..."  style="width:100px" class="selec ivu-input"  id="input-line" >
                    <label class="pos2">状态</label>
                    <Select v-model="search.status" style="width:100px" placeholder="全部" @on-change="searchPage"  >
                      <Option value="">全部</Option>
                      <Option value="0">未审核</Option>
                      <Option value="1">审核通过</Option>
                      <Option value="2">审核不通过</Option>
                    </Select>
                    <Button type="primary"   style="margin-left:5px;"  v-on:click="searchPage">查找</Button>
                    <Button type="primary"  style="margin-left:5px;"  v-on:click="initPage">重置</Button>
                </Col>
                <Col span="4"  class-name="xlsupload">
                    <MyUpload action="/check/dxjb/importXls"  
                      :format="['xlsx','xls']"  
                      :on-success="importXls"
                          :on-format-error="handleFormatError"
                          :show-upload-list="false">
                          <Button type="error"  >导入</Button>
                    </MyUpload>
                </Col> 
                <Col span="4" style="float:right;text-align:right;">
                    <Button type="success"   v-on:click="addPage">新增</Button>
                    <Button type="success"   v-on:click="download">下载模版</Button>
                </Col>
            </Row>
        </div>
        <div class="table-wrap">
            <Row>
                <Col span="24">
                    <Table highlight-row  border :height="height"  ref="table" :columns="columns" :data="dxjbList"  ></Table>
               </Col>
            </Row>
        </div>
        <div style="padding-left:10px;padding-bottom:10px;">
            <Row>
                <Col span="24">
                    <Page style="padding:10px 20px; min-height:50px; line-height:50px;" :current="page.currPage"  :total="page.total"  :page-size="page.pageSize"  @on-change="changePage"  show-elevator show-total ></Page>
                </Col>
            </Row>
        </div>
            <!--结束  查看弹窗  -->
            <!--开始   增加和编辑弹出  -->
            <Modal v-model="dxjbModal" :title="title"  width="800" @on-cancel="clear(dxjb)"  >
            <Form ref="dxjb" :label-width="80">
              <Row>
                <Col span="12">
                  <Form-item label="船名:">
                    <Select v-model="dxjb.shipname" filterable remote :disabled="readOnly" placeholder="请输入关键词" :remote-method="searchShip"
                      @on-change="selectShip" :loading="loading" style="width:300px;">
                      <Option v-for="option in shipOptions" :key="option" :label="option" :value="option">
                      </Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item label="捕捞许可证:">
                    <Input v-model="dxjb.blxkh" placeholder="请输入捕捞许可证:" :readOnly="readOnly"></Input>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item label="所有人姓名">
                    <Input v-model="dxjb.owner" placeholder="请输入所有人姓名" :readOnly="readOnly"></Input>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item label="作业类型:">
                    <Input placeholder="请输入船东电话" v-model="dxjb.worktype" :readOnly="readOnly"></Input>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item label="双控功率">
                    <Input v-model="dxjb.dpower" :readOnly="readOnly" placeholder="请输入双控功率"></Input>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item label="实船功率:">
                    <Input placeholder="请输入实船功率" v-model="dxjb.rpower" :readOnly="readOnly"></Input>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="6" style="postion:releative;">
                  <Form-item label="多休时间:">
                    <Input :max="12" :min="1" placeholder="多休月数" v-model="dxjb.multiMonths" :readOnly="readOnly"></Input>
                  </Form-item>
                  <label style="position:absolute;top:10px;;right:-30px;">个月</label>
                </Col>
                <Col span="6" style="postion:releative;">
                  <Form-item>
                    <Input :max="31" :min="1" placeholder="多休天数" v-model="dxjb.multiDays" :readOnly="readOnly"></Input>
                  </Form-item>
                  <label style="position:absolute;top:10px;;right:-20px;">天</label>
                </Col>
              </Row>
              <Row>
                <Col span="22">
                  <Form-item label="渔休地点">
                    <Input v-model="dxjb.xydz"  :readOnly="true">
                      <Button slot="append"  icon="location"  @click="openAMap"></Button>
                    </Input>
                  </Form-item>
                </Col>
              </Row>
              <Row>
              </Row>
                <Col span="11">
                  <Form-item label="渔休经度">
                    <Input v-model="dxjb.jd" placeholder="点击地图获取"  readOnly> </Input>
                  </Form-item>
                </Col>
                <Col span="11">
                  <Form-item label="渔休纬度">
                    <Input v-model="dxjb.wd" placeholder="点击地图获取"  readOnly></Input>
                  </Form-item>
                </Col>
              <Row>
                <Col span="12">
                  <Form-item label="渔休时间">
                    <Date-picker class="yxsj" :readOnly="readOnly" style="width:250px;" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s1"
                      confirm @on-ok="checkDate('s1','e1')"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" style="width:250px;" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e1"
                      confirm @on-ok="checkDate('s1','e1')"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s2" confirm @on-ok="checkDate('s2','e2')"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e2" confirm @on-ok="checkDate('s2','e2')"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s3" confirm @on-ok="checkDate('s3','e3')"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e3" confirm @on-ok="checkDate('s3','e3')"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="开始日期" type="date" format="MM月dd日" v-model="dxjb.s4" confirm @on-ok="checkDate('s4','e4')"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item>
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="结束日期" type="date" format="MM月dd日" v-model="dxjb.e4" confirm @on-ok="checkDate('s4','e4')"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item label="申报人">
                    <Input v-model="dxjb.sbr" :readOnly="readOnly" placeholder="请输入申报人">
                      <</Input>
                  </Form-item>
                </Col>
                <Col span="12">
                  <Form-item label="申报时间">
                    <Date-picker class="yxsj" :readOnly="readOnly" placeholder="选择日期" type="date" format="yyyy年MM月dd日" v-model="dxjb.sbsj"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <Form-item label="备注">
                    <Input v-model="dxjb.note" :readOnly="readOnly" placeholder="备注">
                      <</Input>
                  </Form-item>
                </Col>
              </Row>
            </Form>
                    <div slot="footer">
                    <Button @click="close">关闭</Button>  <!--   状态码  0:没有审批 1 已经审批 2审批没有通过 -->
                    <template v-if="curLineStatus == '0' && spqx == 'true' ">
                      <Button type="primary" @click="disapprove">不通过</Button>
                <Button type="primary" @click="approve">通过</Button>  
                    </template>
                    <template v-if="curLineStatus == '2' || curLineStatus == '' "> 
<!-- 								            	<Button class="dtan" size="small" @click="xsdt">显示地图</Button> -->
                <Button type="primary" @click="save">保存</Button>
                </template>
                  </div>
            </Modal>

            <amapModal v-model="showAMapModal" @on-ok="selectAMap" ></amapModal>
    </div>
    
</template>
<script>
import { isNull } from '@/libs/common.js';
import amapModal from '@/views/components/aMap/amapModal.vue';
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
    name: 'dxjb',
     components: {
        amapModal,MyUpload
    }, 
    data() {
        var _self = this;
        return {
            showAMapModal:false,
            height: '',
            dxjbModal: false,
            dxjbModal2: false,
            spqx: 'false',
            title: '',
            loading: false,
            readOnly: false,
            loadingCase: true,
            curLineStatus: '',
            shipOptions: [],
            cityOptions: [],
            villageOptions: [],
            portnameOptions: [],
            dxjb: {
                id: '',
                shipname: '',
                areacode: '',
                blxkh: '',
                owner: '',
                sbr: '',
                worktype: '',
                dpower: '',
                rpower: '',
                multiMonths: '',
                multiDays: '',
                xydz: '', //休渔地点
                jd: '', //经度
                wd: '', //纬度
                city: '',
                village: '',
                portname: '',
                sbsj: '',
                note: '',
                status: '',
                s1: '',
                e1: '',
                s2: '',
                e2: '',
                s3: '',
                e3: '',
                s4: '',
                e4: ''
            },
            page: {
                curPage: 1,
                total: 0,
                pageSize: 10
            },
            search: {
                shipname: '',
                status: ''
            },
            dxjbList: [],
            monthOptions: [],
            dayOptions: [],
            columns: [
                {
                    title: '序号',
                    key: 'shipname',
                    width: 75,
                    type:"index"
                },
                {
                    title: '渔船名',
                    key: 'shipname'
                },
                {
                    title: '状态',
                    key: 'status',
                    render: function(h, params) {
                        if (params.row.status == '1') {
                            return h('span', '审核通过');
                        } else if (params.row.status == '0') {
                            return h('span', '未审核');
                        } else if (params.row.status == '2') {
                            return h('span', '审核不通过');
                        }
                        return h('span', '历史遗留数据');
                    }
                },
                {
                    title: '上传时间',
                    key: 'createDate'
                },
                {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 95,
                    render: function(h, params) {
                        var buttons = [];
                        buttons.push(
                            h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            _self.title = '查看编辑'; //状态码  0:没有审批 1 已经审批通过  2审批没有通过
                                            //                                      //console.log(JSON.stringify(params.row));
                                            if (
                                                params.row.status == '0' ||
                                                params.row.status == '1'
                                            ) {
                                                _self.readOnly = true;
                                            } else {
                                                _self.readOnly = false;
                                            }
                                            _self.curLineStatus = params.row.status;
                                            _self.loadData(params.row.id);
                                            console.log("111111")
                                            /* 以下防止显示modal后数据没有加载完 */
                                            if (_self.curLineStatus == '1') {
                                                _self.dxjbModal2 = true;
                                            } else {
                                                _self.dxjbModal = true;
                                            }
                                        }
                                    }
                                },
                                '查看'
                            )
                        );
                        return h('div', buttons);
                    }
                }
            ],
        };
    },
    methods: {
        download() {
            window.open(this.$basePath + '/check/dxjb/download');
        },
        addPage() {
            this.dxjbModal = true;
            this.readOnly = false;
            this.title = '新增';
            this.dxjb.sbsj = new Date();
            this.dxjb.mutilRest = new Date();
        },
        initPage() {
            this.clear(this.search);
            this.page.curPage = 1;
            this.page.pageSize = 10;
            this.page.total = 1;
            this.searchPage();
        },
        searchPage() {
            var _self = this;
            _self.$http
                .get('/check/dxjb/query', {
                    params: _self.search
                })
                .then(function(result) {
                    if (result.success) {
                        var data = result.data;
                        _self.dxjbList = data.data;
                        _self.page.currPage = data.curPage;
                        _self.page.pageSize = data.pageSize;
                        _self.page.total = data.total;
                    }
                });
        },
        changePage(curPage) {
            this.page.curPage = curPage;
            this.searchPage();
        },
        close: function() {
            this.dxjbModal = false;
            this.readOnly = false;
            this.clear(this.dxjb);
        },
        save() {
            var _self = this;
            var flag = _self.validate();
            var url=null;
            if (isNull(_self.dxjb.id)) {
                 url = '/check/dxjb/save';
            } else{
                url='/check/dxjb/edit';
                }
            if (flag) {
                 _self.$http.post(url, _self.dxjb)
                .then(function(result){
                  if (result.success) {
                            _self.$Message.success('操作成功');
                        }else{
                            _self.$Message.error('操作失败');
                        }
                        _self.dxjbModal = false;
                        _self.clear(_self.dxjb);
                        _self.initPage();
                }); 
            }   
        },
        approve: function() {
            var _self = this;
            this.dxjb.status = '1';
            var flag = _self.validate();
            if (flag) {
                _self.$http.post('/check/dxjb/shenpi',  _self.dxjb)
                .then(function(result){
                  if (result.success) {
                            _self.$Message.success('操作成功');
                            _self.dxjbModal = false;
                            _self.clear(_self.dxjb);
                            _self.initPage();
                        }
                });
            }
        },
        disapprove: function() {
             var _self = this;
            this.dxjb.status = '2';
            var flag = _self.validate();
                 if (flag) {
                _self.$http.post('/check/dxjb/shenpi',  _self.dxjb)
                .then(function(result){
                  if (result.success) {
                            _self.$Message.success('操作成功');
                            _self.dxjbModal = false;
                            _self.clear(_self.dxjb);
                            _self.initPage();
                        }
                });
            }
        },
        // generalSave: function() {
        //     this.dxjb.status = '0';
        //     this.save();
        // },
        clear: function(obj) {
            this.curLineStatus = '';
            for (var key in obj) {
                obj[key] = '';
            }
        },
        validate: function() {
            if (isNull(this.dxjb.shipname)) {
                this.$Message.error('请填写渔船信息');
                return false;
            } else if (isNull(this.dxjb.blxkh)) {
                this.$Message.error('请填写捕捞许可证');
                return false;
            } else if (isNull(this.dxjb.owner)) {
                this.$Message.error('请填写船舶所有人信息');
                return false;
            } else if (isNull(this.dxjb.sbr)) {
                this.$Message.error('请填写申报人信息');
                return false;
            } else if (isNull(this.dxjb.worktype)) {
                this.$Message.error('请填写作业类型');
                return false;
            } else if (isNull(this.dxjb.dpower)) {
                this.$Message.error('请填写双控功率');
                return false;
                dfdf;
            } else if (isNull(this.dxjb.multiMonths)) {
                this.$Message.error('请填写多休日期');
                return false;
            } else if (isNull(this.dxjb.multiDays)) {
                this.$Message.error('请填写多休日期');
                return false;
            } else if (isNull(this.dxjb.xydz)) {
                this.$Message.error('请填写渔休地点');
                return false;
            }
            return true;
        },
        searchShip: function(query) {
            var _self = this;
            if (query == null || query == '') {
                return;
            }
            _self.$http.get('/check/dxjb/searchShip',{
               params:{
                   query:query
               }
            })
            .then(function(result) {
                if (result.success) {
                    console.log(result)
                    _self.shipOptions =result.data;
                }
                _self.loading=false;
            });
        },
        loadData: function(id) {
            var _self = this;
            _self.$http.get('/check/dxjb/get', {
                    params: {
                        id: id
                    }
                })
                .then(function(result) {
                    if (result.success) {
                        var data = result.data;
                        _self.shipOptions =[data.shipname];
                        _self.$nextTick(function(){
                            if(isNull(data.s1)){
                                data.s1=null;
                            }else{
                                 data.s1=new Date(data.s1.replace('-','/'));
                            }
                             if(isNull(data.s2)){
                                data.s2=null;
                            }else{
                                 data.s2=new Date(data.s2.replace('-','/'));
                            }
                             if(isNull(data.s3)){
                                data.s3=null;
                            }else{
                                 data.s3=new Date(data.s3.replace('-','/'));
                            }
                             if(isNull(data.s4)){
                                data.s4=null;
                            }else{
                                 data.s4=new Date(data.s4.replace('-','/'));
                            }
                            if(isNull(data.e1)){
                                data.e1=null;
                            }else{
                                 data.e1=new Date(data.e1.replace('-','/'));
                            }
                            if(isNull(data.e2)){
                                data.e2=null;
                            }else{
                                 data.e2=new Date(data.e2.replace('-','/'));
                            }
                            if(isNull(data.e3)){
                                data.e3=null;
                            }else{
                                data.e3=new Date(data.e3.replace('-','/'));
                            }
                             if(isNull(data.e4)){
                                data.e4=null;
                            }else{
                                 data.e4=new Date(data.e4.replace('-','/'));
                            }
                            _self.dxjb=data;
                        })
                        //_self.xsdz();
                    }
                });
        },
        checkDate: function(begin, end) {
            var d1 = Date.parse(this.dxjb[begin]);
            var d2 = Date.parse(this.dxjb[end]);
            if (d1 > d2) {
                this.dxjb[begin] = '';
                this.dxjb[end] = '';
                this.$Message.error('结束日期不能大于开始日期');
            }
        },
        importXls: function(response, file, fileList) {
            if (response.success) {
                this.$Message.info('导入成功！');
                this.changePage(this.current);
            } else {
                this.$Message.error(response.description);
            }
        },
        handleFormatError: function(file) {
            this.$Message.error('文件格式不支持上传！');
        },
        selectShip: function() {
            console.log(444);
            var _self = this;
            _self.$http.get('/check/dxjb/selectShip',{
            params:{
                shipname:_self.dxjb.shipname
                }
            })
           .then(function(result){
            if(result.success){
               var data=result.data;
            //    _self.dxjb.blxkh = data.dxjb.blxkh;
            //    _self.dxjb.dpower = data.dxjb.dpower;
            //    _self.dxjb.dpowe = data.dxjb.dpowe;
            //    _self.dxjb.worktype = data.dxjb.worktype;
            //    _self.dxjb.areacode = data.dxjb.areacode;
              }
          })
        },

        openAMap(){
            this.showAMapModal=true;
        },
        selectAMap(lon,lat,address){
            // this.caseInfo.lonDu:"000",
            // this.caseInfo.lonFen:"00",
            // this.caseInfo.lonMiao:"00",
            // this.caseInfo.latDu:"00",
            // this.caseInfo.latFen:"00",
            // this.caseInfo.latMiao:"00",
            // console.log(lon)
            // console.log(lat);
            // this.showAMapModal=false;
            // this.caseInfo.caseHappenAddress = address;
            this.address = address
            this.dxjb.xydz = address
            this.dxjb.jd = lon
            this.dxjb.wd = lat
        }
    },
    mounted: function() {
        var _self = this;
        _self.spqx = 'true'; //权限\
        _self.searchPage();
    }
};
</script>

<style>
</style>
