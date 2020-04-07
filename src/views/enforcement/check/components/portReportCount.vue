<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>

<template>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
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
        <Form :label-width="100" :model="info" ref="info">
        <Row>
            <Col span="6">
                <Form-item label="渔船名称:" >
                    <i-select  v-model="info.shipName"  :clearable="true"  :filterable="true" :remote="true"  :remote-method="searchShip" @on-change="loadInfo"  :loading="loading"     placeholder="请输入船舶名称">
                        <i-Option  v-for="option in shipOptions"  :value="option"  :key="option">{{option}}</i-Option>
                    </i-select>   
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item label="船东:" >
                    <Input v-model="info.shipOwner" ></Input>  
                </Form-item>
            </Col>              
            <Col span="6">
                <Form-item label="手机:" >
                    <Input v-model="info.mobilePhone" ></Input>  
                </Form-item>
            </Col>
                <Col span="6">
                <Form-item label="家庭电话:" >
                    <Input v-model="info.homePhone" ></Input>  
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="24">    
                <Form-item label="基层组织"  >
                    <Cascader :data="data" change-on-select style="width:100%"></Cascader>
                </Form-item>
            </Col> 
            
        </Row>
        <Row>
            <Col span="12">
                <Form-item label="报告港口名">
                    <Cascader :data="portData" change-on-select style="width:100%"></Cascader>
                </Form-item>
            </Col>
            <Col span="12">
                <Form-item label="出港时间">
                    <DatePicker type="date"  format="yyyy-MM-dd" style="width:100%" v-model="info.chuGangTime"></DatePicker>
                </Form-item> 
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <p style="text-align:center;font-size:18px;margin-bottom:10px;">一、	船舶及安全基本情况</p>
            </Col>
        </Row>
        <Row >
            <Col span="7">
                <Form-item label="捕捞许可证"   >
                    <Radio-group v-model="info.fishingPermit" type="button">
                        <Radio label="有效">有效</Radio>
                        <Radio label="无效">无效</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="7">
                <Form-item label="北斗终端"  >
                    <Radio-group v-model="info.beiDouTermina" type="button">
                        <Radio label="有效">有效</Radio>
                        <Radio label="无效">无效</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
            <Col span="10">
                <Form-item label="AIS" >
                    <Radio-group v-model="info.aIS" type="button">
                        <Radio label="有效">有效</Radio>
                        <Radio label="无效">无效</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
        <Row >
            <Col span="7">
                <Form-item label="应急部署" :label-width="80" >
                    <Radio-group v-model="info.deployment" type="button">
                        <Radio label="已实施">已实施</Radio>
                        <Radio label="未实施">未实施</Radio>
                    </Radio-group>
                </Form-item>   
            </Col>
            <Col span="6">               
                <Form-item label="面对面培训"  >
                    <Radio-group v-model="info.training" type="button">
                        <Radio label="已实施">已实施</Radio>
                        <Radio label="未实施">未实施</Radio>
                    </Radio-group>
                </Form-item>   
            </Col>
            <Col span="10">    
                <Form-item label="救生设备及各类船用信号灯有效配备"  :label-width="220" >
                    <Radio-group v-model="info.survivalEquipment" type="button">
                        <Radio label="已实施">已实施</Radio>
                        <Radio label="未实施">未实施</Radio>
                    </Radio-group>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <p style="text-align:center;font-size:18px;margin-bottom:10px;">二、作业类型情况</p>
            </Col>
        </Row>
            <Row >
            <Col span="24">
                <Form-item label="证载作业类型及辅助方式" :label-width="160" prop="loadWorkZType">
                    <Col >
                        <div class="select-wrap">
                            <i-select   v-model="info.loadWorkZType"  :filterable="true"    placeholder="请选择类型">
                                <i-Option  v-for="option in loadWorkZBigs"  :value="option"  :key="option"  :label="option"></i-Option>
                            </i-select>
                        </div>
                    </Col>
                </Form-item>
            </Col>
        </Row>
        <Row >
            <Col span="24">
                <Form-item label="实际作业类型及辅助方式" :label-width="160" prop="actualWorkZType">
                    <Col >
                        <div class="select-wrap">
                            <i-select   v-model="info.actualWorkZType"    :filterable="true"     placeholder="请选择类型">
                                <i-Option  v-for="option in actualWorkZBigs"  :value="option"  :key="option" :label="option"></i-Option>
                            </i-select>
                        </div>
                    </Col>
                </Form-item>
            </Col>
        </Row>
        <Row >
            <Col span=12 >
                <Form-item label="携带渔具数量" :label-width="100" prop="fishingGearNumber">
                    <i-input v-model="info.fishingGearNumber"  placeholder="请输入携带渔具数量..."></i-input>
                </Form-item>
            </Col>
            <Col span=12 >
                <Form-item label="实际网目尺寸" :label-width="100" prop="meshSize">
                    <i-input v-model="info.meshSize"   name="mm" placeholder="请输入实际网目尺寸..." >
                        <span slot="append">mm</span>
                    </i-input>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <p style="text-align:center;font-size:18px;">三、船员基本情况</p>
                <p style="text-align:center;font-size:10px;margin-bottom:10px">职务船员</p>
            </Col>
        </Row>
        <Row class="addRow" :key="ports" v-for="(ports,index) in info.positionShipMan" >
            <Col span="5">
                <Form-item  :label="ports.personType" :label-width="65" >
                    <i-input v-model="ports.personName"  placeholder="请输入姓名"></i-input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item  label="等级" icon="star" :label-width="40"  v-if="ports.sort==1">
                    <div class="select-wrap"> 
                        <i-select  v-model="ports.postGrades" :loading="loading"    placeholder="请选择等级...">
                            <i-option v-for="item in levels1" :value="item" :key="item">{{ item }}</i-option>
                        </i-select> 
                    </div> 
                </Form-item>
                <Form-item  label="等级"  :label-width="40" v-else-if="ports.sort==2">
                    <div class="select-wrap">
                        <i-select  v-model="ports.postGrades" :loading="loading"   placeholder="请选择等级...">
                            <i-option v-for="item in levels2" :value="item" :key="item">{{ item }}</i-option>
                        </i-select>
                    </div>
                </Form-item>
                <Form-item  label="等级"  :label-width="40" v-else-if="ports.sort==3">                                        
                    <div class="select-wrap">
                        <i-select  v-model="ports.postGrades" :loading="loading"   placeholder="请选择等级...">
                            <i-option v-for="item in levels3" :value="item" :key="item">{{ item }}</i-option>
                        </i-select>
                    </div>
                </Form-item> 
                <Form-item  label="等级"  :label-width="40" v-else>                                        
                    <div class="select-wrap">
                        <i-select  v-model="ports.postGrades" :loading="loading"   placeholder="请选择等级...">
                            <i-option v-for="item in levels4" :value="item" :key="item">{{ item }}</i-option>
                        </i-select>
                    </div>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item   label="联系电话"  >
                    <i-input v-model="ports.phone"  placeholder="请输入联系电话"></i-input>
                </Form-item>
            </Col>
            <Col span="6">
                <Form-item   label="身份证号" >
                    <i-input v-model="ports.idCard"  placeholder="请输入身份证号"></i-input>
                </Form-item>
            </Col> 
            <Col span="2" offset="1">                                 
                <i-Button type="dashed" @click="removePositionShipMan(index)" icon="minus-round"  v-show="(ports.personType!='船长'&&ports.personType!='轮机长')">删除</i-Button>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <Form-item>
                    <i-Button type="dashed" style="width:100%;margin-left:-50px" @click="handleAdd(1)" icon="plus-round">增加船副</i-Button>
                </Form-item>  
            </Col>
            <Col span="12">
                <Form-item>
                    <i-Button type="dashed" style="width:100%;margin-left:-50px" @click="handleAdd(2)" icon="plus-round">增加管轮</i-Button>
                </Form-item>
            </Col>
        </Row> 
        
        <p style="text-align:center;font-size:10px;margin-bottom:10px">普通船员</p>
                                                
        <Row class="addRow" :key="index" v-for="(puTong,index) in OrdinaryShipMans">
            <Col span="3">
                <Form-item label="姓名" :label-width="50">
                        <i-input v-model="puTong[0].personName"  placeholder="姓名7"></i-input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item  label="身份证号" >
                    <i-input v-model=" puTong[0].idCard"  placeholder="身份证号"></i-input>
                </Form-item>
            </Col>
            
            <Col span="4">
                <Form-item>
                    <i-Button type="dashed"  style="width:100%;margin-left:-50px" @click="removeHandleAddPT(index)" >删除</i-Button>
                </Form-item>
            </Col>
            
            <Col span="3">
                <Form-item  label="姓名" :label-width="50">
                    <i-input v-model="puTong[1].personName"  placeholder="姓名8"></i-input>
                </Form-item>
            </Col>
            <Col span="5">
                <Form-item   label="身份证号">
                    <i-input v-model=" puTong[1].idCard"  placeholder="身份证号"></i-input>
                </Form-item>
            </Col> 
            
            <Col span="4">
                <Form-item>
                    <i-Button type="dashed"  style="width:100%;margin-left:-50px" @click="removeHandleAddPT(index)" >删除</i-Button>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Form-item>
                    <i-Button type="dashed" style="width:100%;margin-left:-50px" @click="handleAddPT()" icon="plus-round">增加普通船员</i-Button>
                </Form-item>
            </Col>
        </Row> 
        <Row >
            <Col span="12">
                <Form-item label="船东自查" :label-width="75" ></Form-item> 
            </Col>
            <Col span="12">
                <Form-item label="日期"  style="width:250px">
                    <DatePicker type="date"  format="yyyy-MM-dd HH:mm"  v-model="info.checkTime"></DatePicker>
                </Form-item>
            </Col>
        </Row>
        <Row  >
            <Col span="12">
                <Form-item label="基层组织核查" :label-width="100" >
                    <Radio-group v-model="info.grassRoots" type="button">
                        <Radio label="风险可控">风险可控</Radio>
                        <Radio label="风险不可控">风险不可控</Radio>
                    </Radio-group>
                </Form-item> 
            </Col>
            <Col span="12">
                <Form-item label="日期"  style="width:250px" >
                    <DatePicker type="date" format="yyyy-MM-dd HH:mm"  v-model="info.grassRootsTime"></DatePicker>
                </Form-item>
            </Col>
        </Row>
        <Row >
            <Col span="12">
                <Form-item label="管理部门抽查" :label-width="100" >
                    <Radio-group v-model="info.management" type="button" >
                        <Radio label="风险可控">风险可控</Radio>
                        <Radio label="风险不可控">风险不可控</Radio>
                    </Radio-group>
                </Form-item> 
            </Col>
            <Col span="12">
                <Form-item label="日期"  style="width:250px" >
                    <DatePicker type="date"  format="yyyy-MM-dd HH:mm"  v-model="info.managementTime"></DatePicker>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <Form-item label="报告人" :label-width="50">
                        <i-input v-model="info.reportMan"  placeholder="请输入填报人姓名"></i-input>
                </Form-item>
            </Col>
            <Col span="12">
                <Form-item  label="检查人" >
                    <i-input v-model="info.CheckMan"  placeholder="请输入检查人姓名"></i-input>
                </Form-item>
            </Col>
        </Row>				                            
    </Form>
    </Modal>
</template>

<script>
export default {
    name: "portReportCount",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "出港信息"
        },
        width: {
            type: [Number, String],
            default: 1160
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        className: {
            type: String,
            default:"vertical-center-modal"
        },
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default () {
                return ['ease', 'fade'];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
     
    },
    data () {
        return {
            visible: false,
            guiShuCity:[],
            guiShuArea:[],
            guiShuTowns:[],
            guiShuVillage:[],
            shipOptions:[],
            loadWorkZBigs:[],
            actualWorkZBigs:[],
            data:[],
            portData:[],
            levels1:["一级船长","二级船长","三级船长","机架长"],
            levels2:["一级轮机长","二级轮机长","三级轮机长"],
			levels3:["一级船长","二级船长","三级船长","一级船副","二级船副","助理船副"],
			levels4:["一级轮机长","二级轮机长","三级轮机长","一级管轮","二级管轮","助理管轮"],
            clickNum:0,
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
            info:{
                relationID: "", // 关系ID
                shipName: "", // 船名
                shipOwner: "", // 船东
                mobilePhone: "", // 手机
                homePhone: "", // 家庭电话
                city: "", // 市
                cityId: "",
                county: "", // 县
                countyId: "",
                towns: "", // 乡镇
                townsId: "",
                village: "", // 村
                villageId: "",
                portName: "", // 报告港口名称
                chuGangTime: "", // 出港时间
                fishingPermit: "", // 捕捞许可证
                deployment: "", // 应急部署
                beiDouTermina: "", // 北斗终端
                training: "", // 面对面培训
                aIS: "", // AIS
                survivalEquipment: "", // 救生设备有效配备
                loadWorkZType: "", // 证载作业类型（主作）
                fishingGearNumber: "", // 渔具数量
                meshSize: "", // 网目尺寸
                actualWorkZType: "", // 实际作业类型（主作）
                drafts: "", // 草稿箱 1=草稿 0=不是草稿
                ziCha: "", // 自查
                grassRoots: "", // 基层组织核查
                management: "", // 管理部门核查
                level: "", // 等级
                rectificationScheme: "", // 整改方案
                checkTime: "", // 自查日期
                grassRootsTime: "", // 基层组织核查日期
                managementTime: "", // 管理部门核查日期
                userId: "",
                deptType: "", // 部门类型(0：用户、3、4、5：省市县管理层、 8：基层乡镇)
                deptType2: "", // 自查后其他上级做 进一步检查时显示审查的类型（本条渔船最高检查部门类型）
                reportMan: "", // 报告人(公众)
                CheckMan: "", // 检查人(管理人员)
                positionShipMan: [
                    {
					 		personName: "",
					        postGrades: "",
					        phone: "",
					        idCard: "",
					        sort:1,
					        personType:"船长",
					 	} ,
					 	{
					 		personName: "",
					        postGrades: "",
					        phone: "",
					        idCard: "",
					        sort:2,
					        personType:"轮机长",
					 	}
                ], // 职务船员信息
                ordinaryShipMan: [
                    {
                        personName: "",
                        idCard: "",
                    },
                    {
                        personName: "",
                        idCard: "",
                    }
                ] // 普通船员信息
            }
        };
    },
    computed:{
        /***普通船员 一维数组转二维数组**/
        OrdinaryShipMans:function(){
            var arr=this.info.ordinaryShipMan;
            var temp=[];
            var length=arr.length;
            for(var i=0;i<length;i+=2){
                if(i+1<length){
                    temp.push([arr[i],arr[i+1]])
                }else{
                    temp.push([arr[i],{personName: "",idCard: ""}])
                }
            }
            console.log(temp)
            return temp;
        },
		},
    methods: {
        ok() {
            if (!this.loading)
                this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        search() {
            this.visible= true;
        },
              
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        getOrganization(){
              this.$http
                    //请求路径
                    .get("checks/organization/cascader/330000")
                    // 返回值
                    .then(res => {
                        this.data=res.data;
                   
                    })
                    .catch(function(error) {
                    console.log(error);
                    }); 
        },
        getPort(){
            
        },
      
        searchShip(shipName){
             if (shipName == null || shipName == "") {
                    return;
                }
                this.fishQuery.wheres.nametheShip_like=shipName;                
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
                        if (res.data.data[i].nametheShip != "" &&res.data.data[i].nametheShip != null) {
                            ship.push(res.data.data[i].nametheShip);
                        }
                    }
                    this.shipOptions = ship;
                    })
                    .catch(function(error) {
                    console.log(error);
                    }); 
        },
        loadInfo() {
            this.xinXi.wheres.nametheShip_eq = this.info.shipName;
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
                    this.info.shipOwner = res.data.data[0].namevesselOwner;
                    this.info.mobilePhone = res.data.data[0].shipOwnerTelephone;
                })
                .catch(function(error) {
                console.log(error);
                });
        },
        //获取职务船员数组下标索引
        getIndex(type){
            var shipMan=this.info.positionShipMan;
            if(type=="船副"){
                for(var i=0;i<shipMan.length;i++){
                    if(shipMan[i].personType=="船副"){
                        return this.index=i+1;
                    }
                };
                return 2;
            }
            if(type=="管轮"){
                for(var i=0;i<shipMan.length;i++){
                    if(shipMan[i].personType=="船副"){
                            this.index=i+1;
                    }else{
                        if(shipMan[i].personType=="管轮"){
                            this.index=i+1;
                        }else{
                            if(shipMan[i].personType=="轮机长"){
                                this.index=i+1;
                            }
                        }
                    }
                }
                return this.index;
            }
        },		        
        //获取添加的职务船员类型
        handleAdd(index){
            var shipMan=this.info.positionShipMan;
            var personType="";
            var sort=0;
            if(index==1){
                personType="船副";
                sort=3;
                }
            if(index==2){
                personType="管轮";
                sort=4;
                }
                for(var i=0 ;i<shipMan.length;i++){		        			
                if(shipMan[i].personType==personType){
                    this.clickNum++;	        						   						
                }else{
                    this.clickNum=0
                }
            }
            if(this.clickNum<10){
                this.handleAddshipMan(personType,sort);
                if(this.clickNum==1){
                    this.clickNum=0;
                }
            }else{
                this.clickNum=0;
                this.addShipManMessage();
            }
            
        },
        /***增加职务船员信息*/
        handleAddshipMan(personType,sort){
                    var i=this.getIndex(personType);					              
                    var  positionShipMan=this.info.positionShipMan;
                    positionShipMan.splice(i,0,{
                            personName: "",
                            postGrades: "",
                            phone: "",
                            idCard: "",
                            sort,
                            personType
                    });
        },
        addShipManMessage () {
            this.$Message.info({
                content: '每种职务船员最多只能有十个！',
                duration: 2,
                closable: true
            });
        },
        //指定删除职务船员
        removePositionShipMan(index){
                var  positionShipMan=this.info.positionShipMan;
                if(positionShipMan[index].personType=="船长"||positionShipMan[index].personType=="轮机长"){
                    this.closable2()
                }else{
                    positionShipMan.splice(index,1)
                }
        },
        closable2 () {
            this.$Message.info({
                content: '船长或轮机长无法删除！',
                duration: 2,
                closable: true
            });
        },
				
    /***增加普通船员**/
        handleAddPT:function(){
                var ordinaryShipMan=this.info.ordinaryShipMan
                ordinaryShipMan.splice(ordinaryShipMan.length,0,{
                            personName: "",
                            idCard: "",
                        })
                ordinaryShipMan.splice(ordinaryShipMan.length,0,{
                            personName: "",
                            idCard: "",
                        })
        },
        
        /** 指定删除船员 */
        removeHandleAddPT:function(index){
                var ordinaryShipMan=this.info.ordinaryShipMan
                ordinaryShipMan.splice(index,1)
        },


    
    },
    watch:{
        value(val){
            if(val){
                this.visible = val;
                this.getOrganization();
                this.getPort();
                this.search();
            }
        }
    }
};
</script>
<style scoped>

</style>


