<style lang="less" scoped>
    @import '../../../styles/common.less';
    .opinions {
        max-height:128px;
        overflow-x:hidden;
        overflow-y:auto;
    }
    .opinions p:hover{
        background-color:#eee;
    }
    .opinions p{
        background-color: white;
    }
    .add_btndivbox {
        width: 100%;
        height: 50px;
        background-color: white;
        text-indent: 10px;
    }
    label.pos2 {
        display: inline-block;
        width: 70px;
        height: 30px;
        line-height: 30px;
    }
    .selec2 {
        width: 180px;
    }
</style> 
<template>
    <div>
        <data-table ref="test"
        :withTree="false"
        :url="'/safetysms/getSmsList'"
        :params="queryTable"
        :columns="columns"
        >
        <div slot="search">
            <Form :label-width="60" @submit.native.prevent>
                <Row>
                    <Col span="6">
                        <Form-item label="手机号:">
                            <Input v-model="queryTable.wheres.phone" @on-keydown.enter="''" placeholder="请输入..."/>
                        </Form-item> 
                    </Col>
                    <Col span="6">
                        <Form-item label="内容:">
                            <Input v-model="queryTable.wheres.search" @on-keydown.enter="''" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button  @click="initSearch" type="primary" icon="ios-search" >搜索</Button>
                        <Button  @click="handleReset" >重置</Button>
                    </div>
                    <span style="float:right;margin-bottom:10px">        
                        <Button  @click="messageCount" type="info">统计</Button>                                                                 
                        <Button  @click="sendModalOpen" type="success">发送</Button>
                    </span>             
                </Row>
            </Form>
        </div>
    </data-table>
    <Modal v-model="sendModal" :styles="{top: '80px'}" title="安全信息发送" width="1000px">
        <div>
            <Row>
                <Form :label-width="74" @submit.native.prevent>
                    <Col span="24">
                        <Form-item label="发送人员：">
                            <Input readonly v-model="userSelectedName"  placeholder="请输入...">
                                <span slot="append" @click="peopleMdShow()" style="cursor: pointer;">查询</span>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="14">
                        <Form-item label="短信内容：">
                            <Input v-model="newAddParams.content" type="textarea" :autosize="{minRows: 21,maxRows: 21}" placeholder="请输入..."/>
                        </Form-item>
                    </Col>
                    <Col span="2">
                        <div style="margin-top:200px;margin-left:10px">
                            <p>常用模板</p>
                            <Button type="default" size="small" @click="saveMb">>></Button>
                        </div>
                    </Col>
                    <Col span="8">
                        <div style="width:98%;margin: 0px 0px 0px 1%;height:451px;list-style:none;padding:5px 5px;border:1px solid #dddee1;border-radius:5px; overflow: auto;box-sizing: border-box;">
                            <p v-for="(item,i) in MdLists" class="lis" v-model="liContent" :key="i" style="position: relative;">
                                <span @click="getLiContent(item.content)" :title="item.content" style="cursor:pointer">{{item.content}}</span> 
                                <span @click="deleteMb(item)" style="margin-right: 10px;float: right;"><Icon type="md-close" color="red"/></span> 
                            </p>
                        </div>
                    </Col>
                    <Col span="24" style="text-align: right;">
                        <!-- <Button type="info" @click="saveMb">保存模板</Button>
                        <Button type="primary" @click="informMsg">发送</Button> -->
                    </Col>
                </Form>
            </Row>
        </div>
        <div slot="footer">
            <Button type="info" @click="sendModal=false">取消</Button>
            <Button type="primary" @click="informMsg">发送</Button>
        </div>
    </Modal>
    <!-- 用户信息 -->
    <Modal v-model="userselectShow" :styles="{top: '165px'}" title="人员选择" width="450" :mask-closable="maskclosable">
        <div style="width:100%;max-height:370px;overflow: auto;">
            <Tree :data="filterTree" empty-text="加载中..."	@on-check-change="treeSelectChange" show-checkbox multiple></Tree>
        </div>
        <div slot="footer">
            <Button @click="userselectShow=false">取消</Button>
            <Button type="info" @click="beSure()">确定</Button>
        </div>
    </Modal>
    <!--统计-->
    <Modal v-model="messageCountWin" :styles="{top: '165px'}" title="短信数量统计" width="900" :mask-closable="maskclosable">
          <div class="add_btndivbox">
            <label class="pos2">排序类型:</label>
            <i-Select v-model="countType" @on-change="selectType" class="selec2">
                <i-Option value="1">按天统计</i-Option>
                <i-Option value="2">按月统计</i-Option>
                <i-Option value="3">按场景统计</i-Option>
            </i-Select>
          </div>
          <div id="echarts" style="width:820px;height:400px;"></div>
    </Modal>
    </div>
</template>
<script>
import {isNull,isEmpty} from '../../../libs/common'
import user from '@/store/module/user.js';
import util from '@/libs/util.js';
import echarts from "echarts";
var uid=user.state.userInfo.userId;
// console.log(user.state.userInfo,"user.state.userInfo");
export default {
    name: 'siteUserMng',
    components: {
    },
    data () {
        return {
            countType: '1',
            messageCountWin:false,
            //用户信息
            sendModal: false,
            filterTree:[],
            columns:[
                {
                    title: '序号',
                    maxWidth: 80,
                    align: 'center',
                    type: 'index'
                },
                {
                    title: '接收人',
                    align: 'center',
                    key: 'name',
                },
                {
                    title: '内容',
                    align: 'center',
                    key: 'content',
                },
            ],
            usersParams:{
                page:1,
                size:10,
                wheres:{
                    search:""
                },
            },
            query: {
                page: 1,
                size: 10,
                wheres: {
                    id:"admin",
                    type:"0"
                }
            },
            queryTable: {
                page: 1,
                size: 10,
                wheres: {
                    search:'',
                    phone:''
                }
            },
            userSelected:[],
            userSelectedName:"",
            userSelectedId:"",
            neUserSelect:[],
            userselectShow:false,
            maskclosable:false,

            newAddParams:{
                content:"",//模板内容；
            },
            wheres:{
                userIds:"", 
                type:"1", 
                content:"", 
            },
            MdLists:[],
            liContent:"",
            count:0,
        }
    },
    computed:{  
        
    },
    methods: {
        selectType(v) {
            this.loadData()
        },
        loadData() {
            var nowDate = new Date();
            var y = nowDate.getFullYear();
            var m = nowDate.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;  
            var d = nowDate.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var dateStr = y + '-' + m + '-' + d;
            this.$http.get('/safetysms/getSmsStatistic', {
                params: {
                    type: this.countType,
                    begin: dateStr
                }
            }).then(res => {
                let xAxisData = res.title
                let failList = res.fail;
                let succList = res.succ;
                this.$nextTick(() => {
                let visiteVolume = echarts.init(document.getElementById("echarts"));
                const option = {
                  color: ["#3299FF", "#7AE557"],
                  tooltip: {
                    trigger: "axis",
                    axisPointer: {
                      type: "shadow"
                    }
                  },
                  legend: {
                    data: ["发送失败", "发送成功"],
                    icon:"circle",
                  },
                  grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                  },
                  xAxis: {
                    type: "category",
                    data: xAxisData
                  },
                  yAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                  },
                  series: [
                    {
                      name: "发送失败",
                      type: "bar",
                      barWidth: "20",
                      data: failList,
                      itemStyle: {
                          normal: {
                              barBorderRadius: [7,7,0,0]
                          }
                      }
                    },
                    {
                      name: "发送成功",
                      type: "bar",
                      barWidth: "20",
                      data: succList,
                      itemStyle: {
                          normal: {
                              barBorderRadius: [7,7,0,0]
                          }
                      }
                    },             
                  ]
                };
                visiteVolume.setOption(option);
                window.addEventListener("resize", function() {
                  visiteVolume.resize();
                });
              });
            }).catch(err => {
                console.log(err)
            })
        },
        messageCount() {
            this.loadData()
            this.messageCountWin = true
        },
        sendModalOpen() {
            var _self = this
            _self.sendModal = true
            _self.loadMdLists()
            _self.userSelectedName = ''
            _self.newAddParams.content = ''
        },
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.queryTable.wheres) {
                this.queryTable.wheres[key] = "";
            }
            this.initSearch();            
        },
        peopleMdShow(){
            var _self=this;
            _self.$http.get("/$admin/users/selectUserList").then(function(result){
                if(result.success){
                   _self.filterTree=result.data;
                   util.checkTree(_self.filterTree,_self.userSelectedId);
                   var ids=_self.userSelectedId.split(",");
                   for(var i=0;i<ids.length;i++){
                        util.expandTree(_self.filterTree,ids[i]);
                   }
                   _self.userselectShow=true;
                }
            });
        },
        treeSelectChange(v){
            this.neUserSelect=v;
        },
        beSure(){
            var names=[];
            var ids=[];
            this.userSelected=[];
            for(var i=0;i<this.neUserSelect.length;i++){
                if(this.neUserSelect[i].children==undefined){
                    ids.push(this.neUserSelect[i].id);    
                    names.push(this.neUserSelect[i].title);
                }
            }
            this.userSelectedName=names.join(",");
            this.userSelectedId=ids.join(",");

            this.userSelected=this.neUserSelect;
            this.neUserSelect=[];
            this.userselectShow=false;
        },

        informMsg(){
            if(this.userSelectedId=="" || this.userSelectedId==undefined){
                this.$Message.error("发送人员不能为空");
                return ;
            }
            if(this.newAddParams.content=="" || this.newAddParams.content==undefined){
                this.$Message.error("短信内容不能为空");
                return ;
            }
            this.wheres.content=this.newAddParams.content;
            this.wheres.userIds=this.userSelectedId;
            this.$http.post("/safetysms/sendSms?userIds="+this.wheres.userIds+"&type="+"1"+"&content="+this.wheres.content)
            .then(res=>{
                if(res.success){
                    this.$Message.info("发送成功");
                    this.sendModal = false
                }else{
                    this.$Message.error("发送失败");
                }
            });
        },
        
        getLiContent(v){
            this.newAddParams.content=v;
        },
        deleteMb(v){
            this.$http.delete("/safetyTemplate/"+v.id)
            .then(res=>{
                if(res.success){
                    this.$Message.info("删除成功");
                    this.loadMdLists();
                }
            });
        },
        saveMb(){
            if(this.newAddParams.content=="" || this.newAddParams.content==undefined){
                this.$Message.error("短信内容不能为空");
                return ;
            }
            this.$http.post("/safetyTemplate/add",this.newAddParams)
            .then(res=>{
                if(res.success){
                    this.$Message.info("操作成功");
                    this.loadMdLists();
                }
            });
        },
        loadMdLists(){
            var query={
                page:1,
                size:1000,
                wheres:{
                    scene:"",//场景
                    type :"0",//模板类型 10：长时间离线模板（无权限控制）
                },
            };
            this.$http.get("/safetyTemplate/list",{
                params:{
                    query:JSON.stringify(query)
                }
            })
            .then(res=>{
                if(res.success){
                    this.MdLists=res.data.data;
                }
            });
        },
    },
    mounted() {
        this.loadMdLists();
        this.userId=uid;
    },
};
</script>
<style scoped>
    li.lis:hover{
        color:rgb(87, 163, 243);
    }
    li.lis:hover>span.sp{
        display: inline-block;
    }
    span.sp1{display:inline-block;width:90%;word-break: keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;cursor: pointer;}
    span.sp{position: absolute; width:12px;display: none; height:12px;border-radius:50%;top:5px;right:10px;background:red;}
</style>