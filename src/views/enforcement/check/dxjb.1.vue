
		<style type="text/css">
#input-line {
  border: 1px solid #dddee1 !important;
}
.el-input__inner {
  height: inherit !important;
  line-height: 30px !important;
}
#myPageTop {
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  z-index: 9999;
}
#dtmk {
  position: absolute;
}

#dtmk input {
  border: 1px solid #ccc;
}
.ls_xydd input {
  height: 30px;
  line-height: 30px;
  width: 240px;
}
.xlsupload {
  float: right;
  text-align: left;
  text-indent: 5px;
  width: 100px;
}
.yxsj {
  width: 250px;
}
.ztss {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
}
.kdbs {
  width: 80px;
}
</style>
  <template>
		


  <div  style="height:100%">
		<div class="zj_management_system">
			<div class="zj_management_systemboxs">
				<div class="zj_management_systembox">
					<div class="zj_management_systemul">
						<div class="metro-layout xtsy_boxs">
							<div class="zj_management_systemcontentmian pads">
								<div class="zj_management_systemcontentheight">
									<div class="h_gad"  id="h_gad" >
						                <Row class-name="searColumn">
						                    <Col span="16">
						                       <label class="pos2">船名</label>
						                       <input  v-model="search.shipname"  placeholder="请输入..." class="selec ivu-input"  id="input-line" >
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
						                    	  <Upload action="/dxjb/importXls.do"  
														  :format="['xlsx','xls']"  
														  :on-success="importXls"
						       							  :on-format-error="handleFormatError"
						       							  :show-upload-list="false">
						       							 <Button type="error"  >导入</Button>
												 </Upload>
						                    </Col> 
						                    <Col span="4" style="float:right;text-align:right;">
						                        <Button type="success"   v-on:click="addPage">新增</Button>
						                        <Button type="success"   v-on:click="download">下载模版</Button>
						                    </Col>
						                </Row>
						                <Row class-name="both-white-padding">
							                <Col span="24">
								                <Table highlight-row   border :height="height"  ref="table" :columns="columns" :data="dxjbList"  ></Table>
							                </Col>
						                </Row>
                      				    <page style="padding:10px 20px; min-height:50px; line-height:50px;" :current="page.currPage"  :total="page.total"  :page-size="page.pageSize"  @on-change="changePage"  show-elevator show-total ></Page>
								    </div>
								    <!-- 查看弹出窗 -->
								     <Modal v-model="dxjbModal2"  :title="title"  width="800" @on-cancel="clear(dxjb)"  >
									 	 <div class="ls_cbws">
										      <table cellpadding=0 cellspacing=0>
										        <tbody>
										          <tr>
										            <th>船名</th>
										            <td>
														<Select
														    v-model="dxjb.shipname"
														    filterable
														    remote
														    :disabled="readOnly"
														    placeholder="请输入关键词"
														    :remote-method="searchShip"
														    @change="selectShip"
														    :loading="loading">
														    <Option
														      v-for="option in shipOptions"
														      :key="option"
														      :label="option"
														      :value="option">
														    </Option>
														 </Select>
										            </td>
										            <th>捕捞许可证编号</th>
										            <td><input type="text" class="fullline" v-model="dxjb.blxkh" :readOnly="readOnly"></td>
										          </tr>
										          <tr>
										            <th>所有人姓名</th>
										            <td><input type="text" class="fullline" v-model="dxjb.owner" :readOnly="readOnly"></td>
										            <th>作业类型</th>
										            <td><input type="text" class="fullline" v-model="dxjb.worktype" :readOnly="readOnly"></td>
										          </tr>
										          <tr>
										            <th>双控功率</th>
										            <td><input type="text" class="fullline" v-model="dxjb.dpower" :readOnly="readOnly"></td>
										            <th>实船功率</th>
										            <td><input type="text" class="fullline" v-model="dxjb.rpower" :readOnly="readOnly"></td>
										          </tr>
										          <tr>
										            <th>多休时间</th>
										            <td colspan="3">
										           		 <Select style="width:60px" v-model="dxjb.multiMonths" :disabled="readOnly">
										           		 	<Option v-for="item in monthOptions" :value="item.value" :key="item.value">{{item.value}}</Option>
										           		 </Select><label>月</label>
										           		 <Select style="width:60px" v-model="dxjb.multiDays"  :disabled="readOnly">
										           		 	<Option v-for="item in dayOptions" :value="item.value" :key="item.value">{{item.value}}</Option>
										           		 </Select><label>天</label>
										            </td>
										          </tr>
										          <tr>
										            <th>多休减捕方案</th>
										            <td colspan="3">
										              <div class="ls_xydd" >
										              <Row style="width:99%;">
											            <Form :label-width="40">
											                <Col span="4">
											                    <span class="ztss">渔休经纬度：</span>
											                </Col>
											                <Col span="2">
											                    <span class="ztss">经度</span>
											                </Col>
											                <Col span="3">
											                    <Input  v-model="dxjb.jd" readOnly class="kdbs" ></Input>
											                </Col>
											                <Col span="1">
											                	&nbsp;
											                </Col>
											                <Col span="2">
											                    <span class="ztss">纬度</span>
											                </Col>
											                <Col span="3">
											                    <Input readOnly v-model="dxjb.wd" class="kdbs"></Input>
											                </Col>
											            </Form>
											          </Row>
										              </div>
										              <div class="ls_xytime">
										                <div class="ls_xy">休渔时间：</div>
										                <div class="ls_xyjj">
										                	<div style="float:left">从<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s1" confirm  @on-ok="checkDate('s1','e1')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e1" confirm  @on-ok="checkDate('s1','e1')"></Date-picker></div>
										                	<div style="clear:both;"></div>
										                	<div style="float:left">从<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s2" confirm  @on-ok="checkDate('s2','e2')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e2" confirm  @on-ok="checkDate('s2','e2')"></Date-picker></div>
										                	<div style="clear:both;"></div>
										                	<div style="float:left">从<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s3" confirm  @on-ok="checkDate('s3','e3')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e3" confirm  @on-ok="checkDate('s3','e3')"></Date-picker></div>
										                	<div style="clear:both;"></div>
										                	<div style="float:left">从<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日" v-model="dxjb.s4" confirm  @on-ok="checkDate('s4','e4')" ></Date-picker></div><div style="float:left;margin-left:10px;">到<Date-picker :readOnly="readOnly"  style="width: 120px" placeholder="选择日期"  type="date"  format="MM月dd日"  v-model="dxjb.e4" confirm  @on-ok="checkDate('s4','e4')"></Date-picker></div>
										                </div>
										              </div>
										              <div style="text-align:right;">申报人：<input style="width:100px;margin-right:30px;" type="text" v-model="dxjb.sbr" :readOnly="readOnly"></div>
										              <div style="text-align:right;">日期:<Date-picker :readOnly="readOnly"  style="width: 150px;padding-right:20px;" placeholder="选择日期"  type="date"  format="yyyy年MM月dd日" v-model="dxjb.sbsj" ></Date-picker></div>
										            </td>
										          </tr>
										          <tr>
										            <th>备注</th>
										            <td colspan="3">
										            	<input type="text" class="fullline" V-model="dxjb.note" :readOnly="readOnly">
										            </td>
										          </tr>
										        </tbody>
										      </table>
										    </div>
										    <div slot="footer">
									            <Button @click="close2">关闭</Button>
									             <template v-if="curLineStatus == '0' && spqx === 'true' ">
									            	<Button type="primary" @click="disapprove">不通过</Button>
													<Button type="primary" @click="approve">通过</Button>  
								           		 </template>
         								    </div>
								    </Modal>
								    <!--结束  查看弹窗  -->
								    <!--开始   增加和编辑弹出  -->
								    <Modal v-model="dxjbModal" :title="title"  width="800" @on-cancel="clear(dxjb)"  >
										<Form ref="dxjb" :label-width="80">
										  <Row>
										    <Col span="12">
										      <Form-item label="船名:">
										        <Select v-model="dxjb.shipname" filterable remote :disabled="readOnly" placeholder="请输入关键词" :remote-method="searchShip"
										          @change="selectShip" :loading="loading" style="width:300px;">
										          <Option v-for="option in shipOptions" :key="option" :label="option" :value="option">
										          </Option>
										        </Select>
										      </Form-item>
										    </Col>
										    <Col span="12">
										      <Form-item label="捕捞许可证:">
										        <Input placeholder="请输入捕捞许可证:" v-model="dxjb.blxkh" :readOnly="readOnly"></Input>
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
										        <Select v-model="dxjb.multiMonths" :disabled="readOnly" placeholder="多休月数">
										          <Option v-for="item in monthOptions" :value="item.value" :key="item.value">{{item.value}}</Option>
										        </Select>
										      </Form-item>
										      <label style="position:absolute;top:10px;;right:-30px;">个月</label>
										    </Col>
										    <Col span="6" style="postion:releative;">
										      <Form-item>
										        <Select v-model="dxjb.multiDays" :disabled="readOnly" placeholder="多休天数">
										          <Option v-for="item in dayOptions" :value="item.value" :key="item.value">{{item.value}}</Option>
										        </Select>
										      </Form-item>
										      <label style="position:absolute;top:10px;;right:-20px;">天</label>
										    </Col>
										  </Row>
										  <Row>
										    <Col span="22">
										      <Form-item label="渔休地点">
										        <Input v-model="dxjb.xydz"  :readOnly="true">
										          <span slot="append" @click="xsdt" >显示地图</span>
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
								            <template v-if="curLineStatus == '0' && spqx === 'true' ">
								            	<Button type="primary" @click="disapprove">不通过</Button>
												<Button type="primary" @click="approve">通过</Button>  
								            </template>
								            <template v-if="curLineStatus == '2' || curLineStatus == '' "> 
<!-- 								            	<Button class="dtan" size="small" @click="xsdt">显示地图</Button> -->
												<Button type="primary" @click="save">保存</Button>
										    </template>
        								 </div>
								    </Modal>
								    <Modal 
									        v-model="visible" 
									        :closable="closable"
									        :maskClosable="maskClosable"
									        :width="dwidth"
									        :okText="okText"
									        :cancelText="cancelText"
									        :loading="loading"
									        :styles="styles"
									        :class="className"
									        :footerHide="footerHide"
									        :scrollable="scrollable"
									        :transitionNames="transitionNames"
									        :transfer="transfer"
									        @on-ok="ok"
									        @on-cancel="cancel"
									        @on-visible-change="visibleChange">
									        <slot name="close"></slot>
									        <slot name="header"></slot>
									        <slot name="footer"></slot>
									        <div id="allmap"  :style="'height:'+ dheight"></div>
								   	</Modal>
								    <div id="myPageTop" v-show="visible">
								        <table>
								            <tr>
								                <td>
								                    <label>按关键字搜索：</label>
								                </td>
								            </tr>
								            <tr>
								                <td>
								                    <input type="text" v-model="queryName" placeholder="请输入关键字进行搜索" id="tipinput">
								                </td>
								            </tr>
								        </table>
								    </div> 
     						</div>
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
    <script>
export default {
  name: "dxjb",
  data() {
    var _self=this;
    return {
      height: "",
      dxjbModal: false,
      dxjbModal2: false,
      spqx: "false",
      title: "",
      map: null,
      loading: false,
      readOnly: false,
      loadingCase: true,
      curLineStatus: "",
      shipOptions: [],
      cityOptions: [],
      villageOptions: [],
      portnameOptions: [],
      dxjb: {
        id: "",
        shipname: "",
        areacode: "",
        blxkh: "",
        owner: "",
        sbr: "",
        worktype: "",
        dpower: "",
        rpower: "",
        multiMonths: "",
        multiDays: "",
        xydz: "", //休渔地点
        jd: "", //经度
        wd: "", //纬度
        city: "",
        village: "",
        portname: "",
        sbsj: "",
        note: "",
        status: "",
        s1: "",
        e1: "",
        s2: "",
        e2: "",
        s3: "",
        e3: "",
        s4: "",
        e4: ""
      },
      page: {
        curPage: 1,
        total: 0,
        pageSize: 10
      },
      search: {
        shipname: "",
        status: ""
      },
      dxjbList: [],
      monthOptions: [],
      dayOptions: [],
      columns: [
        {
          title: "序号",
          key: "shipname",
          width: 75, 
          render: function(h, params) {
            return params.index + 1;
          }
        },
        {
          title: "渔船名",
          key: "shipname"
        },
        {
          title: "状态",
          key: "status",
          render: function(h, params) {
            if (params.row.status == "1") {
              return h("span","审核通过");
            } else if (params.row.status == "0") {
              return h("span","未审核");
            } else if (params.row.status == "2") {
              return h("span","审核不通过");
            }
            return h("span","历史遗留数据");
          }
        },
        {
          title: "上传时间",
          key: "createDate"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 95,
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
                  on: {
                    click: () => {
                      _self.title = "查看编辑"; //状态码  0:没有审批 1 已经审批通过  2审批没有通过
                      //                                      //console.log(JSON.stringify(params.row));
                      if (
                        params.row.status == "0" ||
                        params.row.status == "1"
                      ) {
                        _self.readOnly = true;
                      } else {
                        _self.readOnly = false;
                      }
                      _self.curLineStatus = params.row.status;
                      _self.loadData(params.row.id);

                      /* 以下防止显示modal后数据没有加载完 */
                      if (_self.curLineStatus == "1") {
                        _self.dxjbModal2 = true;
                      } else {
                        _self.dxjbModal = true;
                      }
                    }
                  }
                },
                "查看"
              )
            );
            return h("div", buttons);
          }
        }
      ],

      value: false,
      closable: true,
      maskClosable: true,
      loading: false,
      styles: { position: "relative" },
      className: "vertical-center-mocal",
      footerHide: false,
      scrollable: false,
      transitionNames: ["ease", "fade"],
      transfer: true,
      lng: "",
      lat: "",
      city: "台州",
      dheight: "",
      dwidth: "",
      okText: "okText",
      cancelText: "cancelText",
      queryName: "",
      signLng: "",
      signLat: "",
      address: "",
      marker: {},
      info: {},
      visible: false
    };
  },
  methods: {
    download() {
      window.open(this.$basePath + "/dxjb/download.do");
    },
    addPage() {
      this.dxjbModal = true;
      this.readOnly = false;
      this.title = "新增";
      this.dxjb.sbsj = new Date();
      this.dxjb.mutilRest = new Date();
      this.dxjb.sbr = username;
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
      // var data = $.extend({}, app.page, app.search);
      // $.ajax({
      //   url:  "/dxjb/query.do",
      //   async: false,
      //   dataType: "JSON",
      //   data: data,
      //   success: function(result) {
      //     if (result.success) {
      //       app.dxjbList = [];
      //       app.dxjbList = result.data;
      //       app.page.currPage = result.curPage;
      //       app.page.pageSize = result.pageSize;
      //       app.page.total = result.total;
      //     }
      //   }
      // });
      _self.$http.get("/dxjb/query.do",{
        params:_self.search
      }).then(function(result){
        if(result.success){
            var data=result.data;
            _self.dxjbList = data.data;
            _self.page.currPage = data.curPage;
            _self.page.pageSize = data.pageSize;
            _self.page.total = data.total;
        }
      })
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
    close2: function() {
      this.dxjbModal2 = false;
      this.readOnly = false;
      this.clear(this.dxjb);
    },
    save() {
      var app = this;
      var flag = app.validate();
      if (app.isNull(app.dxjb.id)) {
        url =  "/dxjb/save.do";
      } else {
        url ="/dxjb/edit.do";
      }
      if (flag) {
        $.ajax({
          url: url,
          type: "POST",
          dataType: "json",
          data: app.dxjb,
          success: function(result) {
            console.log(result);
            if (result.success) {
              app.$Message.success("操作成功");
            } else {
              app.$Message.error(result.description);
            }
            app.dxjbModal = false;
            app.clear(app.dxjb);
            app.initPage();
          }
        });
      }
    },
    approve: function() {
      this.dxjb.status = "1";
      var flag = app.validate();
      if (flag) {
        $.ajax({
          url:"/dxjb/shenpi.do",
          type: "POST",
          dataType: "json",
          data: app.dxjb,
          success: function(result) {
            if (result.success) {
              app.$Message.success("操作成功");
              app.dxjbModal = false;
              app.clear(app.dxjb);
              app.initPage();
            }
          }
        });
      }
    },
    disapprove: function() {
      this.dxjb.status = "2";
      var flag = app.validate();
      if (flag) {
        $.ajax({
          url:  "/dxjb/shenpi.do",
          type: "POST",
          dataType: "json",
          data: app.dxjb,
          success: function(result) {
            if (result.success) {
              app.$Message.success("操作成功");
              app.dxjbModal = false;
              app.clear(app.dxjb);
              app.initPage();
            }
          }
        });
      }
    },
    generalSave: function() {
      this.dxjb.status = "0";
      this.save();
    },
    clear: function(obj) {
      app.curLineStatus = "";
      for (key in obj) {
        obj[key] = "";
      }
    },
    validate: function() {
      if (this.isNull(this.dxjb.shipname)) {
        this.$Message.error("请填写渔船信息");
        return false;
      } else if (this.isNull(this.dxjb.blxkh)) {
        this.$Message.error("请填写捕捞许可证");
        return false;
      } else if (this.isNull(this.dxjb.owner)) {
        this.$Message.error("请填写船舶所有人信息");
        return false;
      } else if (this.isNull(this.dxjb.sbr)) {
        this.$Message.error("请填写申报人信息");
        return false;
      } else if (this.isNull(this.dxjb.worktype)) {
        this.$Message.error("请填写作业类型");
        return false;
      } else if (this.isNull(this.dxjb.dpower)) {
        this.$Message.error("请填写双控功率");
        return false;
        dfdf;
      } else if (this.isNull(this.dxjb.multiMonths)) {
        this.$Message.error("请填写多休日期");
        return false;
      } else if (this.isNull(this.dxjb.multiDays)) {
        this.$Message.error("请填写多休日期");
        return false;
      } else if (this.isNull(this.dxjb.xydz)) {
        this.$Message.error("请填写渔休地点");
        return false;
      }
      return true;
    },
    searchShip: function(query) {
      if (query == null || query == "") {
        return;
      }
      _self = this;
      _self.loading = true;
      _self.loadingCase = false;
      $.ajax({
        type: "get",
        url: "/dxjb/searchShip.do",
        data: { query: query },
        success: function(result) {
          if (result.success) {
            app.shipOptions = result.data;
          }
          app.loading = false;
        }
      });
    },
    loadData: function(id) {
      var _self = this;
    //   $.ajax({
    //     type: "post",
    //     url: "/dxjb/loadData.do",
    //     cache: false,
    //     data: { id: id },
    //     success: function(result) {
    //       if (result.success) {
    //         app.dxjb = result.data[0];
    //         app.xsdz();
    //         // 	    					app.portOption(1,app.city);
    //         // 	    					app.portOption(2,app.village);
    //       }
    //     }
    //   });
    // },
     _self.$http.get("/dxjb/loadData.do",{
       params:{
         id:id
       }
     }).then(function(result){
        if(result.success){
            var data=result.data;
            _self.dxjb = data.data[0];
            _self.xsdz();
        }
      })
    },
    checkDate: function(begin, end) {
      var d1 = Date.parse(this.dxjb[begin]);
      var d2 = Date.parse(this.dxjb[end]);
      if (d1 > d2) {
        this.dxjb[begin] = "";
        this.dxjb[end] = "";
        this.$Message.error("结束日期不能大于开始日期");
      }
    },
    ys: function() {
      //         		alert(this.dxjb.multiMonths)
      if (isNaN(this.dxjb.multiMonths)) {
        this.dxjb.multiMonths = 1;
        return;
      }
      var t = parseInt(this.dxjb.multiMonths);
      if (t > 12 || t < 1) {
        this.dxjb.multiMonths = 1;
      }
    },
    portOptions: function(type, val) {
      var app = this;
      var param = {};
      if (type == 1 && val == "") {
        return;
      } else if (type == 2 && val == "") {
        return;
      } else if (type == 1 && val != "") {
        param.city = val;
      } else if (type == 2 && val != "") {
        param.village = val;
      }
      _self = this;
      $.ajax({
        url: "/dxjb/gk.do",
        dataType: "JSON",
        async: false,
        data: param,
        success: function(result) {
          if (result.success) {
            app.portOption(type, result.data);
          }
        }
      });
    },
    portOption: function(type, data) {
      // 				var middle = [];
      //         		if(type == null){
      //         			this.cityOptions =[];
      //         			middle = this.cityOptions;
      //         		}else if(type == 1){
      //         			this.villageOptions =[];
      //         			middle = this.villageOptions;
      //         		}else if(type == 2){
      //         			this.portnameOptions =[];
      //         			middle = this.portnameOptions;
      //         		}
      //         		console.log(type);
      //         		console.log(data)
      //         		for(var i=0;i<data.length;i++){
      // 					var obj = {value:data[i].value};
      // 					middle.push(obj);
      // 				}
    },
    importXls: function(response, file, fileList) {
      if (response.success) {
        this.$Message.info("导入成功！");
        this.changePage(this.current);
      } else {
        this.$Message.error(response.description);
      }
    },
    handleFormatError: function(file) {
      this.$Message.error("文件格式不支持上传！");
    },
    selectShip: function(value) {
      if (app.isNull(value)) {
        return;
      }
      app = this;
      $.ajax({
        type: "get",
        url: "/dxjb/selectShip.do",
        data: { shipname: value },
        success: function(result) {
          if (result.success) {
            //         					console.log(result.data);
            app.dxjb.blxkh = result.data.blxkh;
            app.dxjb.dpower = result.data.dpower;
            app.dxjb.owner = result.data.owner;
            app.dxjb.worktype = result.data.worktype;
            app.dxjb.areacode = result.data.areacode;
          }
        }
      });
    },
    isNull: function(str) {
      return str == null || str == undefined || str == "";
    },

    // 		},

    ok() {
      if (!this.loading) this.$emit("input", this.visible);

      this.analysis();
      this.queryName = "";
      console.log(this.address + "ok");
      this.clearMarker();
    },
    cancel() {
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
      this.queryName = "";
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    clearMarker: function() {
      if (!this.isEmpty(this.marker)) {
        this.map.remove(this.marker);
      }
    },
    reset() {
      this.getLocation();
      this.queryName = "";
      this.signLng = "";
      this.signLat = "";
      this.map.clearMap();
      if (!this.isEmpty(this.marker)) {
        this.map.remove(this.marker);
      }
    },
    xsdt() {
      //载入数据时标记地图上的点
      if (!this.isNull(this.dxjb.jd) && !this.isNull(this.dxjb.wd)) {
        this.createMarker(this.dxjb.jd, this.dxjb.wd);
      }
      this.visible = true;
    },
    xsdz() {
      //通过经纬度显示地址
      if (
        !this.isNull(this.dxjb.jd) &&
        !this.isNull(this.dxjb.wd) &&
        this.isNull(this.dxjb.xydz)
      ) {
        var lnglat = [this.dxjb.jd, this.dxjb.wd];
        var geocoder = new AMap.Geocoder({
          city: "全国"
        });
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === "complete" && result.info === "OK") {
            var address = result.regeocode.formattedAddress;
            this.dxjb.xydz = address;
          }
        });
      }
    },
    // createMap() {
    //   this.map = new AMap.Map("allmap", {
    //     resizeEnable: true, //是否监控地图容器尺寸变化，默认值为false
    //     zoom: 12,
    //     doubleClickZoom: false // 地图是否可通过双击鼠标放大地图，默认为true。此属性可被setStatus/getStatus 方法控制
    //   });
    //   //                 this.map = map;
    // },
    // addControls() {
    //   var app = this;
    //   AMap.plugin(["AMap.ToolBar"], () => {
    //     //创建并添加工具条控件
    //     var toolBar = new AMap.ToolBar();
    //     app.map.addControl(toolBar);
    //   });
    // },
    // getLocation() {
    //   var app = this;
    //   app.map.plugin(["AMap.Geolocation"], () => {
    //     let geolocation = new AMap.Geolocation({
    //       timeout: 5000 //  超过5秒后停止定位，默认：无穷大
    //     });
    //     app.map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //     AMap.event.addListener(geolocation, "complete", result => {
    //       app.map.setCenter(result.position);
    //     }); //  返回定位信息
    //     AMap.event.addListener(geolocation, "error", result => {
    //       this.$Message.error("定位失败");
    //     }); //  返回定位出错信息
    //   });
    // },
    // autoCompleteSearch() {
    //   var app = this;
    //   app.map.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
    //     let auto = new AMap.Autocomplete({
    //       input: "tipinput"
    //     });
    //     var placeSearch = new AMap.PlaceSearch({
    //       map: app.map
    //     });
    //     window.placeSearch = placeSearch;

    //     AMap.event.addListener(auto, "select", e => {
    //       placeSearch.setCity(e.poi.adcode);
    //       placeSearch.search(e.poi.name); //关键字查询查询
    //       if (e.poi && e.poi.location) {
    //         app.map.setZoom(15);
    //         app.map.setCenter(e.poi.location);
    //       }

    //       AMap.event.addListener(placeSearch, "markerClick", e2 => {
    //         this.signLng = e2.data.location.lng;
    //         this.signLat = e2.data.location.lat;
    //         if (!this.isEmpty(this.marker)) {
    //           app.map.remove(this.marker);
    //         }
    //         this.createMarker(this.signLng, this.signLat);
    //       });
    //     });
    //   });
    // },
    // addClickEvent() {
    //   var app = this;
    //   AMap.event.addListener(app.map, "click", e => {
    //     this.signLng = e.lnglat.getLng();
    //     this.signLat = e.lnglat.getLat();
    //     if (!this.isEmpty(this.marker)) {
    //       app.map.remove(this.marker);
    //     }
    //     this.createMarker(e.lnglat.getLng(), e.lnglat.getLat());
    //   });
    // },
    // analysis() {
    //   // 地址解析
    //   var app = this;
    //   app.map.plugin(["AMap.Geocoder"], () => {
    //     let lnglat = [this.signLng, this.signLat];
    //     var geocoder = new AMap.Geocoder({
    //       city: "全国"
    //     });
    //     geocoder.getAddress(lnglat, (status, result) => {
    //       if (status === "complete" && result.info === "OK") {
    //         this.address = result.regeocode.formattedAddress;
    //         this.dxjb.xydz = this.address;
    //         this.dxjb.jd = this.signLng;
    //         this.dxjb.wd = this.signLat;
    //       } else if (lnglat == ",") {
    //         this.$Message.error("没有选择地点");
    //       } else {
    //         console.log(status);
    //         console.log(result);
    //         this.$Message.error("地址解析异常");
    //       }
    //     });
    //   });
    //   this.$emit("on-ok", this.signLng, this.signLat, this.address);
    // },
    // initMap() {
    //   this.createMap();
    //   this.addControls();
    //   this.getLocation();
    //   this.autoCompleteSearch();
    //   this.addClickEvent();
    //   if (!this.isEmpty(this.lng) && !this.isEmpty(this.lat)) {
    //     console.log("lnglat is not empty");
    //     this.marker = new AMap.Marker({
    //       position: [this.lng, this.lat]
    //     });
    //     this.marker.setMap(map);
    //     this.signLng = this.lng;
    //     this.signLat = this.lat;
    //     map.setZoomAndCenter(16, [lng, lat]);
    //   }
    // },
    // createMarker(lng, lat) {
    //   var app = this;
    //   this.marker = new AMap.Marker({
    //     position: [lng, lat], //marker所在的位置
    //     map: app.map //创建时直接赋予map属性
    //   });
    // }
  },

  mounted: function() {
    var app = this;
    app.spqx = "true"; //权限
    Date.prototype.toString = function() {
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
    $(".ivu-table").width($("#h_gad").width());
    this.height = $("#h_gad").height() * 0.8;
    this.dwidth = $("#h_gad").width() * 0.5;
    this.dheight = $("#h_gad").height() * 0.7 + "px";
    $("#dtmk").height($("#h_gad").height() * 0.7);
    // 			alert($("#dtmk").height())
    // 			this.initPage();
    this.changePage(1);
    // 			this.portOptions();
    for (var i = 0; i < 13; i++) {
      this.monthOptions.push({ value: i + "" });
    }
    for (var i = 0; i < 32; i++) {
      this.dayOptions.push({ value: i + "" });
    }

    // $.getScript(
    //   "http://webapi.amap.com/maps?v=1.4.4&key=56ddc282ce58da78032392ba5cd6f445&plugin=AMap.Geocoder"
    // ).done(function(script, textstatus) {
    //   if (textstatus == "success" && typeof AMap != undefined) {
    //     //                所有使用AMap的内容
    //     app.initMap();
    //   } else {
    //     showAlert("无法加载地图，请打开网络");
    //   }
    // });

    /* 初始化地图 */
  },
  watch: {
    value(val) {
      this.value = val;
      this.visible = val;
      if (val) this.reset();
    }
  }
};

function releaseMap() {
  app.$destroy();
}
</script>
