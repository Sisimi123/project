<style lang="less" scoped>
@import "../styles/child.less";
</style>
<template>
	<div>
		<data-table ref="test"
			:withTree="true" :useZtree="false" :treeUrl="'/$admin/depts/custree'" :treeParams="treeQuery" :treeTitle="'组织机构'"
			:url="'/check/skhc/search'" :params="query" :columns="columns" 
			@on-select-change="selectTree" >
			<div slot="search">
				<Form :label-width="80" @submit.native.prevent>
				<Row>
					<Col span="6">
						<Form-item label="类型:">
							<Select v-model="query.done" placeholder="全部"  @on-change="changeDone">
								<Option value="">全部</Option>
								<Option value="1">已核查</Option>
								<Option value="0">未核查</Option>
							</Select>
						</Form-item>
					</Col>
					<Col span="6">
						<Form-item label="渔船名:">
							
							<Input v-model="query.search" @on-keydown.enter="initSearch" placeholder="请输入渔船名..."></Input>
						</Form-item>
					</Col>
					<div class="btn-wrap">
						<Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              			<Button @click="handleReset()"  >重置</Button>
					</div>
					<div class="func-wrap">
						<Button type="info"  @click="seefztj">辅船统计</Button>
						<Button type="info"  @click="seetj">渔船统计</Button>
						<Button @click="downloadMb()" type="warning">下载模板</Button>
						<Button type="success"  @click="exportXls">导出</Button>
						<MyUpload :action="'/check/skhc/importXls'"
										:data="importData"
										:format="['xlsx','xls']"  
										:on-success="importXls"
										:on-format-error="handleFormatError"
										style="width:60px;height:35px;float:right;margin-left:5px;">
							<Button type="error" >导入</Button>
						</MyUpload>
					</div>
				</Row>
				</Form>
			</div>
		</data-table>

		<Modal v-model="skhcModal"  title="三库核查"  width="600" >
		     <Form ref="skhc"  :model="skhc"  :label-width="80"  >
		     	<Row>
					<Col span="12">
						<Form-item label="渔船名称："  prop="shipname">
							<Input v-model="skhc.shipname"  placeholder="请输入渔船名称" readOnly></Input> 
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="实船："  prop="realship"  ::label-width="110">
							<Radio-group v-model="skhc.realship"  type="button">
								<Radio label="1">有实船</Radio>
								<Radio label="0">无实船</Radio>
							</Radio-group>
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship=='1'">
					<Col span="12">
						<Form-item label="船东："  prop="owner"  >
							<Input v-model="skhc.owner"  :placeholder="holder('owner','1')"  ></Input> 
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="实际作业方式："  prop="workmode"  ::label-width="110">
							<Input v-model="skhc.workmode"  :placeholder="holder('workmode','1')" ></Input> 
						</Form-item>
					</Col>
					</Row>
					<Row v-show="skhc.realship=='1'">
					<Col span="12">
						<Form-item label="船长："  prop="length">
							<Input v-model="skhc.length"  :placeholder="holder('length','1')" >
								<span slot="append">米</span>
							</Input> 
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="型宽："  prop="width"  ::label-width="110">
							<Input v-model="skhc.width"  :placeholder="holder('width','1')" >
								<span slot="append">米</span>
							</Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship=='1'">
					<Col span="12">
						<Form-item label="主机功率："  prop="power">
							<Input v-model="skhc.power"  :placeholder="holder('power','1')" >
								<span slot="append">千瓦</span>
							</Input> 
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="完工时间(套牌):"  prop="completeTime"  :label-width="110">
							<Input v-model="skhc.completeTime"  ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship=='1'">
					<Col span="10">
						<Form-item label="功率备注情况："  prop="powernote"  :label-width="110">
							<Radio-group v-model="skhc.powernote"  type="button">
								<Radio label="已备"></Radio>
								<Radio label="未备"></Radio>
							</Radio-group>
						</Form-item>
					</Col>
					<Col span="14">
						<Form-item label=""  prop="powernotedescri"  :label-width="0">
							<Input v-model="skhc.powernotedescri" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship=='1'&&skhc.powernote=='已备'">
					<Col span="24">
						<Form-item label="实际功率："  prop="powernote"  :label-width="110">
							<Input v-model="skhc.realpower"  :placeholder="holder('realpower','1')" >
								<span slot="append">千瓦</span>
							</Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="selectCj()">
					<Col span="12">
						<Form-item label="2015年年检"  prop="cj2015"  :label-width="110">
							<Radio-group v-model="skhc.cj2015"  type="button">
								<Radio label="是"></Radio>
								<Radio label="否"></Radio>
							</Radio-group>
						</Form-item>
					</Col>
					<Col span="12">
						<Form-item label="2016年年检"  prop="cj2016"  :label-width="110">
							<Radio-group v-model="skhc.cj2016"  type="button">
								<Radio label="是"></Radio>
								<Radio label="否"></Radio>
							</Radio-group>
						</Form-item>
					</Col>
				</Row>
				<Row v-show="showDetail('nyb')">
					<Col span="24">
						<Form-item :label="holder('nyb')"  prop="nybdetail"  :label-width="155">
							<Input v-model="skhc.nybdetail"   :placeholder="holder('nyb','1')" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<!--	
				<Row v-show="showDetail('ub')">
					<Col span="24">
						<Form-item :label="holder('ub')"  prop="ubdetail" :label-width="155">
							<Input v-model="skhc.ubdetail"  :placeholder="holder('ub','1')" ></Input> 
						</Form-item>
					</Col>
				</Row>
				-->
				<Row v-show="showDetail('cj')">
					<Col span="24">
						<Form-item :label="holder('cj')"  prop="cjdetail"  ::label-width="155">
							<Input v-model="skhc.cjdetail"  :placeholder="holder('cj','1')" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="showDetail('jz')">
					<Col span="24">
						<Form-item :label="holder('jz')"  prop="jzdetail"  ::label-width="155">
							<Input v-model="skhc.jzdetail"  :placeholder="holder('jz','1')" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="showDetail('after_point')">
					<Col span="24">
						<Form-item :label="holder('after_point')"  prop="pointdetail"  ::label-width="155">
							<Input v-model="skhc.pointdetail"  :placeholder="holder('after_point','1')" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship!='1'">
					<Col span="24">
						<Form-item label="船舶灭失种类："  prop="shiplosttype"  ::label-width="155">
							<Radio-group v-model="skhc.shiplosttype"  type="button">
								<Radio label="减船"></Radio>
								<Radio label="更新"></Radio>
								<Radio label="收储"></Radio>
								<Radio label="事故"></Radio>
								<Radio label="灾害"></Radio>
								<Radio label="其他"></Radio>
							</Radio-group>
						</Form-item>
					</Col>
				</Row>
				<Row>
					<Col span="24">
						<Form-item label="备注"  >
							<Input v-model="skhc.note"  placeholder="请输入备注" ></Input> 
						</Form-item>
					</Col>
				</Row>
				<Row v-show="skhc.realship=='1'">
					<Col span="24" >
						<Form-item label="渔船照片："  :style="{'margin-bottom':'0px'}" >
							 <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="'uploadList_'+index">
						        <template v-if="item.id">
						            <img :src= "basepath+'/$admin/attachs/stream/'+item.id">
						            <div class="demo-upload-list-cover">
						                <Icon type="ios-eye-outline" @click.native="showFile(item)"></Icon>
						                <Icon type="ios-trash-outline" @click.native="handleRemove(item,index)"></Icon>
						            </div>
						        </template>
						        <template v-else>
						            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
						        </template>
						    </div>
						    <MyUpload
						        ref="upload"
						        :show-upload-list="false"
						        :default-file-list="defaultList"
						        :on-success="handleSuccess"
						        :on-format-error="handleFormatError"
						        :before-upload="handleBeforeUpload"
						        :data="uploadData"  
						        multiple
						        type="drag"
						        :format="['bmp','jpg','png','jpeg','tiff','gif']"  
						        :action="'/$admin/attachs?dataId='+this.uploadData.docid+'&moduleId='+this.uploadData.moduleid"
						        style="display: inline-block;width:58px;">
						        <div style="width: 58px;height:58px;line-height: 58px;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						    </MyUpload>
						    <Modal title="查看图片" v-model="visible">
						        <img :src="basepath+imgName" v-if="visible" style="width: 100%">
						    </Modal>
						</Form-item>
					</Col>
				</Row>
		     </Form>
		     <div slot="footer">
		     		<Button  @click="skhcModal=false">取消</Button>
		     		<Button type="primary"  @click="submit">提交</Button>
		     </div>
		</Modal>
		
		<form id="exportXls"  :action="this.$basePath+'/check/skhc/exportXls.do'"   method="post"  style="display:none;"> 
			<input type="hidden"   name="search"  :value="query.search"/>
			<input type="hidden"   name="done"  :value="query.done"/>
			<input type="hidden"   name="viewId"  :value="query.viewId"/>
		</form>
		
		<Modal v-model="skhctjModal"  title="三库核查统计"  width="1200px" >
		  <div class="wrapper">
		  		<table  class="zcl_ls_table" cellpadding="0" cellspacing="0">
				 <thead >
				 	<tr>
				 		<th rowspan="3">地区</th>
				 		<th rowspan="1" colspan="2">渔船名</th>
				 		<th rowspan="1" colspan="6">实船情况</th>
				 		<th rowspan="1" colspan="6">无实船情况</th>
				 	</tr>
				 	<tr> 
						<th rowspan="2" >有实船</th> 
						<th rowspan="2" >无实船</th> 
						<th rowspan="2" >2015年检</th> 
						<th rowspan="2" >2016年检</th> 
						<th colspan="2"></th> 
						<!-- <th rowspan="2" >完工时间(套牌)</th>  -->
						<th colspan="2" >功率备注情况</th> 
						<th rowspan="2" >减船</th> 
						<th rowspan="2" >更新</th> 
						<th rowspan="2" >收储</th> 
						<th rowspan="2" >事故</th> 
						<th rowspan="2" >灾害</th> 
						<th rowspan="2" >其他</th> 
				 	</tr>
				 	<tr>
				 		<th>在线</th>
				 		<th>不在</th>
				 		<th>未备</th>
				 		<th>已备</th>
				 	</tr>
				 </thead>
				 <tbody>
				 	<tr v-for=" yx in tjsj">
				 		<td >{{yx['dq']}}</td>
				 		<td>{{yx['ysc']}}</td>
				 		<td>{{yx['wsc']}}</td>
				 		<td>{{yx['cj2015']}}</td>
				 		<td>{{yx['cj2016']}}</td>
				 		<td>{{yx['zx']}}</td>
				 		<td>{{yx['bzx']}}</td>
				 		<!-- <td>{{yx['tp']}}</td> -->
				 		<td>{{yx['wb']}}</td>
				 		<td>{{yx['yb']}}</td>
				 		<td>{{yx['jc']}}</td>
				 		<td>{{yx['gx']}}</td>
				 		<td>{{yx['sc']}}</td>
				 		<td>{{yx['sg']}}</td>
				 		<td>{{yx['zh']}}</td>
				 		<td>{{yx['qt']}}</td>
				 	</tr> 
				 </tbody>	
			</table>
		  </div>
		  <div slot="footer">
		    <Button type="primary" @click="exporttj">导出数据</Button>
            <Button @click="skhctjModal=false">关闭</Button>
          </div>
		</Modal>
		
		<!-- **************************辅助渔船统计*************************** -->
		<Modal v-model="skhcfztjModal"  title="辅助渔船统计"  width="1000px" >
		  <div class="wrapper">
		  		<table  class="zcl_ls_table" cellpadding="0" cellspacing="0">
				 <thead >
				 	<tr>
				 		<th rowspan="3">地区</th>
				 		<th rowspan="1" colspan="6">捕捞辅助船统计</th>
				 	</tr>
				 	<tr> 
						<th colspan="2" >总计</th> 
						<th colspan="2" >收鲜</th> 
						<th colspan="2" >油船</th> 
				 	</tr>
				 	<tr>
				 		<th>艘</th>
				 		<th>千瓦</th>
				 		<th>艘</th>
				 		<th>千瓦</th>
				 		<th>艘</th>
				 		<th>千瓦</th>
				 	</tr>
				 </thead>
				 <tbody>
				 	<tr v-for=" yx in fztjsj">
				 		<td >{{yx['dq']}}</td>
				 		<td>{{yx['zs']}}</td>
				 		<td>{{yx['zgl']}}</td>
				 		<td>{{yx['sx']}}</td>
				 		<td>{{yx['sxgl']}}</td>
				 		<td>{{yx['yc']}}</td>
				 		<td>{{yx['ycgl']}}</td>
				 	</tr> 
				 </tbody>	
			</table>
		  </div>
		  <div slot="footer">
		    <Button type="primary" @click="exportfztj">导出数据</Button>
            <Button @click="skhcfztjModal=false">关闭</Button>
          </div>
		  
		</Modal>

		<pic v-model="showPic" :img="showPicPathWithBase"></pic>
		<form id="xztj"  :action= "this.$basePath+'/check/skhc/xztj.do?xzbs=1'"   method="post"  style="display:none;"></form> 
		<form id="xzfztj"  :action= "this.$basePath+'/check/skhc/xzfztj.do?xzbs=1'"   method="post"  style="display:none;"></form>
	</div>

</template>
<script>
import { isNull } from "@/libs/common.js";
import MyUpload from "@/views/components/Upload/MyUpload.vue";
import pic from "@/views/components/pic/pic.vue";
export default {
	name: "skhc",
	components: {
		MyUpload,
		pic
	},
	data() {
		var _self = this;
		return {
			query:{

			},
			treeQuery: {
				includes: "30,45,70,99",
				type: 1,
			},
			showPic: false,
			showPicId: "",
			basepath: this.$basePath,
			skhcModal: false,
			skhctjModal: false,
			skhcfztjModal: false,
			skhc: {
				shipname: "",
				realship: "",
				owner: "",
				length: "",
				width: "",
				power: "",
				realpower: "",
				workmode: "",
				powernote: "",
				completeTime: "",
				nyb: "",
				nybdetail: "",
				ub: "",
				ubdetail: "",
				cj: "",
				cjdetail: "",
				cj2015: "",
				cj2016: "",
				jz: "",
				jzdetail: "",
				fz: "",
				after_point: "",
				pointdetail: "",
				shiplosttype: "其他",
				note: ""
			},
			tjsj: [], //统计数据
			fztjsj: [], //辅助统计
			areas: [],
			tableWidth: 0,
			current: 1,
			total: 0,
			pageSize: 10,
			treeSpan: true,
			rowSpan: 21,
			columns: [
			{
				title: "序号",
				key: "shipname",
				minWidth: 65,
				type: "index"
			},
			{
				title: "渔船名",
				key: "shipname",
				minWidth: 120
			},
			{
				title: "有无实船",
				minWidth: 100,
				key: "realship",
				render: function(h, params) {
					if (params.row.isdone == "1") {
					if (params.row.realship == "1")
						return h("span", _self.showTd(h, "√"));
					if (params.row.realship == "0")
						return h("span", _self.showTd(h, "×"));
					}
					return "";
				}
			},
			{
				title: "农业部",
				key: "nyb",
				minWidth: 90,
				render: function(h, params) {
					return _self.showTd(h, params.row.nyb);
				}
			},
			{
				title: "船检",
				key: "cj",
				minWidth: 90,
				render: function(h, params) {
					return _self.showTd(h, params.row.cj);
				}
			},
			{
				title: "救助系统",
				key: "jz",
				minWidth: 100,
				render: function(h, params) {
					return _self.showTd(h, params.row.jz);
				}
			},
			{
				title: "报位",
				key: "after_point",
				minWidth: 90,
				render: function(h, params) {
					return _self.showTd(h, params.row.after_point);
				}
			},
			{
				title: "最后报位时间",
				key: "last_time",
				minWidth: 130
			},
			{
				title: "状态",
				key: "isdone",
				minWidth: 95,
				render: function(h, params) {
					if (params.row.isdone == "1") return h("span", "已核查");
					else return h("span", "未核查");
				}
			},
			{
				title: "操作",
				key: "action",
				align: "center",
				minWidth: 95,
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
							if (_self.isNull(params.row.realship))
								params.row.realship = "1";
							_self.skhc = params.row;
							_self.attachs();
							_self.skhcModal = true;
							}
						}
						},
						"核查"
					)
					);
					return h("div", buttons);
				}
			}
			],
			skhcList: [],
			msg: {
				"1": {
				owner: "船东",
				length: "船长",
				width: "型宽",
				power: "主机功率",
				workmode: "实际作业方式",
				//	powernote:"功率备注情况",
				//	powernotedescri:"功率备注情况",
				//	completeTime:"完工时间",
				realpower: "实际功率",
				nyb: "未录入农业部情况说明",
				ub: "2015年未领取油补情况说明",
				cj: "近2年未船检情况说明",
				jz: "未录入救助系统情况说明",
				after_point: "近2年未有效报位情况说明"
				},
				"0": {
				nyb: "已录入农业部情况说明",
				ub: "2015年已领取油补情况说明",
				cj: "近2年已船检情况说明",
				jz: "已录入救助系统情况说明",
				after_point: "近2年已有效报位情况说明",
				shiplosttype: "船舶灭失种类"
				}
			},
			defaultList: [],
			imgName: "",
			visible: false,
			uploadList: []
		};
	},
	methods: {
		initSearch() {
			this.$refs.test.initSearch();
		},
		handleReset() {
			for (let key in this.query) {
				this.query[key] = "";
			}
			this.initSearch();
		},
		showTd: function(h, value) {
			if (value == "√")
				return [
					h("Icon", {
						props: {
						type: "checkmark-round",
						size: "small",
						color: "green"
						}
					})
				];
			if (value == "×")
				return [
					h("Icon", {
						props: {
						type: "close-round",
						size: "small",
						color: "red"
						}
					})
				];
			return value;
		},
		isNull: function(str) {
			return str == null || str == undefined || str == "";
		},
		holder: function(field, qsr) {
			var real =
				this.skhc.realship != "0" && this.skhc.realship != "1"
				? "1"
				: this.skhc.realship;
			return (qsr == "1" ? "请输入" : "") + this.msg[real][field];
		},
		showDetail: function(field) {
			if (field == "ub" && this.skhc.fz == "1") return false;
			var real =
				this.skhc.realship != "0" && this.skhc.realship != "1"
				? "1"
				: this.skhc.realship;
			if (real == "1" && this.skhc[field] == "×") return true;
			if (real == "0" && this.skhc[field] == "√") return true;
			return false;
		},
		selectCj: function() {
			if (this.skhc.realship == "1" && this.skhc.cj == "√") return true;
			return false;
		},
		submit: function() {
			var _self = this;
			var skhc = _self.$data.skhc;
			if (_self.isNull(skhc.shipname)) return;
			var real =
				this.skhc.realship != "0" && this.skhc.realship != "1"
				? "1"
				: this.skhc.realship;

			var fields = [
				"owner",
				"workmode",
				"length",
				"width",
				"power",
				"powernote",
				"powernotedescri",
				"completeTime",
				"shiplosttype"
			];
			for (var i = 0; i < fields.length; i++) {
				var field = fields[i];
				if (
				!_self.isNull(_self.msg[real][field]) &&
				_self.isNull(skhc[field])
				) {
				_self.$Message.error("请输入" + _self.msg[real][field]);
				return;
				}
			}


			if (_self.selectCj() && _self.isNull(skhc.cj2015)) {
				_self.$Message.error("请选择2015年年检情况！");
				return;
			}
			if (_self.selectCj() && _self.isNull(skhc.cj2016)) {
				_self.$Message.error("请选择2016年年检情况！");
				return;
			}
			/*
							if(_self.showDetail('jz')&&_self.isNull(skhc.jzdetail)){
								_self.$Message.error("请输入"+_self.msg[real]['jz']);
								return;
							}
							if(_self.showDetail('after_point')&&_self.isNull(skhc.pointdetail)){
								_self.$Message.error("请输入"+_self.msg[real]['after_point']);
								return;
							}
						*/

			this.$http.post("/check/skhc/saveinfo", skhc).then(response => {
				if (response.success) {
				_self.skhc = {};
				_self.initSearch();
				}
				_self.skhcModal = false;
				_self.$Message.info(response.msg);
			});
		},
		isNull: function(str) {
			return str == null || str == undefined || str == "";
		},
		handleView: function(name) {
		//this.imgName = name;
		//this.visible = true;
			window.open(
				this.$basePath + "/$admin/attachs/stream/" + name,
				"_blank"
			);
		},
		handleRemove: function(file, index) {
			var _self = this;
			this.$http.delete("/$admin/attachs/" + file.id).then(response => {
				if (response.success) {
				var fileList = _self.uploadList;
				fileList.splice(index, 1);
				}
			});
		},
		handleSuccess: function(res, file) {
			this.attachs();
		},
		handleFormatError: function(file) {
			this.$Message.error("文件格式不支持上传！");
		},
		handleBeforeUpload: function() {
			const check = this.uploadList.length < 5;
			if (!check) {
				this.$Message.error("最多只能上传 5 张图片。");
			}
			return check;
		},
		attachs: function() {
			var _self = this;

			this.$http
				.get(
				"/$admin/attachs?dataId=" +
					_self.uploadData.docid +
					"&moduleId=" +
					_self.uploadData.moduleid
				)
				.then(response => {
				if (response.success) {
					_self.uploadList = response.data;
				}
				});
		},
		exportXls: function() {
			$("#exportXls").submit();
		},
		importXls: function(response, file, fileList) {
			if (response.success) {
				this.$Message.info("导入成功！");
				this.initSearch();
			} else {
				this.$Message.error(response.description);
			}
		},
		downloadMb(){
				window.open(this.$basePath+"/check/skhc/excel");
		},
		selectTree(node) {
			this.query.viewId = node[0].id;
			this.initSearch();
		},
		changeDone: function() {
			this.initSearch();
		},
		seetj: function() {
			var vue = this;
			vue.skhctjModal = true;

			this.$http
				.post("/check/skhc/tongji.do?xzbs=0") //修改对象状态
				.then(response => {
				vue.tjsj = response.data;
				});
		},
		seefztj: function() {
			var vue = this;
			vue.skhcfztjModal = true;

			this.$http
				.post("/check/skhc/tongjifz.do?xzbs=0") //修改对象状态
				.then(response => {
				vue.fztjsj = response.data;
				});
		},
		exporttj: function() {
			$("#xztj").submit();
		},
		exportfztj: function() {
			$("#xzfztj").submit();
		},
		showFile: function(item) {
			console.log(item.id);
			this.showPicId = item.id;
			this.showPic = true;
		}
	},
	computed: {
		uploadData: function() {
		return {
			docid: this.skhc.shipname,
			moduleid: "skhc"
		};
		},
		importData: function() {
			return {
				viewId: this.query.viewId
			};
		},
		showPicPathWithBase() {
		return this.$basePath + "/$admin/attachs/stream/" + this.showPicId;
		}
	},
	mounted() {

	}
};

// $(function(){
// 	$(window).on("resize",function(){
// 		this.tableWidth=$(".h_gad").width()*this.rowSpan/24;
// 	})
// })
</script>
<style scoped>
.ivu-input-icon {
  margin-top: 8px;
}
.ivu-modal {
  top: 20px;
}
.ivu-modal-body {
  padding: 8px;
}
.ivu-form-item {
  margin-bottom: 5px;
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
/*************表格样式*****************/
.wrapper {
  height: 500px;
  overflow-y: auto;
  /* 		 	paddint-bottom:30px; */
}
.zcl_ls_table {
  width: 100%;
  height: 80%;
  cellpadding: 0px;
  cellspacing: 0px;
  font-size: 12px;
  /*             text-align: center; */
  /*             border-left: 1px solid #E0E0E0; */
  /*             border-top: 1px solid #E0E0E0; */
  border: 1px solid #e0e0e0;
  margin_bottom: 10px;
}
.zcl_ls_table th {
  height: 30px;
  background-color: #f8f8f9;
}
.zcl_ls_table td {
  height: 48px;
  width: 139px;
  text-align: center;
}
.zcl_ls_table th,
.zcl_ls_table td {
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  /*          padding-left: 10px; */
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
}
.pads {
  background-color: rgb(255, 255, 255);
}
.anjglmain_tablebox {
  margin-top: 10px;
}
.ivu-page {
  float: right;
}
.add_btndivbox2 {
  padding-top: 10px;
  overflow: hidden;
  height: 50px;
}
</style>
