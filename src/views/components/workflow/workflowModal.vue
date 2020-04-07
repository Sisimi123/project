<style lang="less">
</style>

<template>
    <div>
        <Modal 
            v-model="visible" 
            :closable="closable"
            :maskClosable="maskClosable"
            :title="modalTitle"
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
            <div slot="footer">
                <Button @click="cancel">取消</Button>
                <Button type="success" :loading="btnLoading" @click="startProcess" v-show="!existsProcess">启动流程</Button>
                <Button type="primary" :loading="btnLoading" @click="revokeTask" v-show="existsProcess&&!existsTask&&hasRevokeTask">撤回</Button>
                <Button type="warning" :loading="btnLoading" @click="rollbackTask" v-show="existsTask&&hasRollbackTask">退回</Button>
                <Button type="primary" :loading="btnLoading" @click="completeTask" v-show="existsTask">办理</Button>
                <!-- <Button type="error" @click="revokeTask">撤回</Button> -->
            </div>
            <Form :label-width="100" :model="dataInfo" ref="dataInfo" :style="'overflow-x:hidden;overflow-y:auto;max-height:'+height+'px'">
                <div style="padding:5px">
                    <Row v-show="!existsProcess">
                        <Col>
                            <FormItem label="流程：">
                                <Select  v-model="processDefId"  >
                                    <Option v-for="(item,index) in processDefList" :value="item.id" :key="index">{{item.deployName}}</Option>    
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <img :src="diagram" :style="{'width':width-50+'px'}" />
                        </Col>
                    </Row>
                    <Row v-show="existsProcess && taskList&&taskList.length>0">
                        <Col>
                            <table style="width:100%">
                                <tr>
                                    <td style="width:40px">序号</td>
                                    <td style="width:150px">任务</td>
                                    <td style="width:120px">办理人</td>
                                    <!-- <td style="width:130px">创建时间</td> -->
                                    <td style="width:130px">办理时间</td>
                                    <td>办理意见</td>
                                </tr>
                                <tr v-for="(item,index) in taskList" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.taskname}}</td>
                                    <td>{{item.name}}</td>
                                    <!-- <td>{{item.starttime}}</td> -->
                                    <td>{{dateFormat(item.handleTime)}}</td>
                                    <td>{{item.message}}</td>
                                </tr>
                            </table>
                        </Col>
                    </Row>
                    <Row v-show="existsTask">
                        <Col>
                            <table style="width:100%;margin-top:10px;" id="operation">
                                <tr>
                                    <td style="width:100px">选择</td>
                                    <td style="width:200px">下一步节点</td>
                                    <td >下一步办理人</td>
                                    <td style="width:150px">操作</td>
                                </tr>
                                <tr v-for="(item,index) in nextTasks" :key="index">
                                    <td><input :type="item.selectType" name="transition" :value="item.value" :taskType="item.taskType" :assignee="item.assignee" :checked="item.checked" @click="selectNextTask(item)"></td>
                                    <td>{{item.name}}</td>
                                    <td>
                                        <!-- <input type="text" name="flow_assign_1"> -->
                                        <Input v-model="dataInfo['flow_NS'+item.assignee]" placeholder="请选择办理人" readonly v-show="item.taskType!='endEvent'">
                                            <Button slot="append" @click="()=>{selectAssignee(item,index)}">选择</Button>
                                        </Input>
                                    </td>
                                    <td>
                                        <Button type="info" @click="()=>{saveDefaultUser(item,index)}" v-show="item.taskType!='endEvent'">设为默认处理人</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>办理时间</td>
                                    <td colspan="3" style="text-align:left"> 
                                        <DatePicker type="date" v-model="dataInfo.handleTime" format="yyyy-MM-dd" placement="top-end" :clearable="false" :editable="false" confirm placeholder="请选择办理时间" style="width: 200px"></DatePicker>
                                        <input type="checkbox" v-model="dataInfo.sendMessage" title="发送短信" style="position: relative;top: 2px;margin-left: 5px;" />
                                        <label title="">发送短信</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>办理意见</td>
                                    <td colspan="3">
                                        <table style="width:100%;border:0px">
                                            <tr>
                                                <td style="border-top:0px;border-left:0px;border-bottom:0px">
                                                    <Input v-model="dataInfo.message" type="textarea"  :rows="6" placeholder="请输入办理意见!"></Input>
                                                </td>
                                                <td style="width:80px;border:0px">
                                                    <p>常用意见</p>
                                                    <Button type="default" size="small" @click="saveOpinions">>></Button>
                                                </td>
                                                <td style="width:250px;border-top:0px;border-right:0px;border-bottom:0px;padding:5px;text-align:left;font-size: 14px;vertical-align: top;line-height:20px;">
                                                    <div class="opinions">
                                                        <p v-for="item in opinionList" :key="item.id">
                                                            <span @click="selectOpinions(item)" :title="item.opinion" style="cursor:pointer">{{item.opinion}}</span>  
                                                            <span @click="deleteOpinions(item)" style="margin-right: 10px;float: right;"><Icon type="md-close"  color="red"/></span>  
                                                        </p>
                                                    </div>                   
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr> 
                            </table>
                        </Col>
                    </Row>
                    <Row v-show="existsProcess&&!existsTask&&hasRevokeTask">
                        <Col>
                            <table style="width:100%;margin-top:10px;" id="operation">
                                <tr>
                                    <td>撤回时间</td>
                                    <td colspan="3" style="text-align:left"> 
                                        <DatePicker type="date" v-model="dataInfo.handleTime" format="yyyy-MM-dd" placement="top-end" :clearable="false" :editable="false" confirm placeholder="请选择撤回时间" style="width: 200px"></DatePicker>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td>撤回意见</td>
                                    <td colspan="3">
                                        <table style="width:100%;border:0px">
                                            <tr>
                                                <td style="border-top:0px;border-left:0px;border-bottom:0px">
                                                    <Input v-model="dataInfo.message" type="textarea"  :rows="6" placeholder="请输入撤回意见!"></Input>
                                                </td>
                                                <td style="width:80px;border:0px">
                                                    <p>常用意见</p>
                                                    <Button type="default" size="small" @click="saveOpinions">>></Button>
                                                </td>
                                                <td style="width:250px;border-top:0px;border-right:0px;border-bottom:0px;padding:5px;text-align:left;font-size: 14px;vertical-align: top;line-height:20px;">
                                                    <div class="opinions">
                                                        <p v-for="item in opinionList" :key="item.id">
                                                            <span @click="selectOpinions(item)" :title="item.opinion" style="cursor:pointer">{{item.opinion}}</span>  
                                                            <span @click="deleteOpinions(item)" style="margin-right: 10px;float: right;"><Icon type="md-close"  color="red"/></span>  
                                                        </p>
                                                    </div>                   
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr> 
                            </table>
                        </Col>
                    </Row>
                </div>
            </Form>
        </Modal>
        <userselectModal v-model="userselect.show" :selectIds="userselect.selectIds" :deptTypes="userselect.deptTypes" :deptIds="userselect.deptIds" :roleIds="userselect.roleIds"  @on-select-change="userSelectChange"></userselectModal>
    </div>
</template>

<script>
import userselectModal from './userselectModal.vue'
import {isNull,isEmpty} from '../../../libs/common'
import {dataToParams} from '../../../api/request'
export default {
    name: "workflowModal",
    components:{
        userselectModal
    },
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
            default: false
        },
        title: {
            type: String,
            default: "流程审批"
        },
        width: {
            type: [Number, String],
            default: "1024"
        },
        height:{
            type: [Number, String],
            default: 520
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
            type: String
        },
        // for instance
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
        taskId:{
            type:String
        },
        instanceId:{
            type:String
        },
        businessKey:{
            type:String,
            required:true
        },
        category:{
            type:String,
            required:true
        }
    },
    data () {
        return {
            btnLoading:false,
            visible: this.value,
            taskColumns:[],
            taskList:[],
            nextTasks:[],
            hasRollbackTask:false,
            hasRevokeTask:false,
            processDefList:[],
            processDefId:"",
            params:{
                taskId:this.taskId,
                instanceId:this.instanceId,
                businessKey:this.businessKey,
                category:this.category
            },
            dataInfo:{
                message:"",
                handleTime:undefined,
                sendMessage: false
            },
            userselect:{
                show:false,
                deptIds:"",
                roleIds:"Enforcer",
                selectIds:"",
                deptTypes:"30,40,44,65"
            },
            opinionList:[],
            modalTitle:this.title
        };
    },
    computed:{
        diagram(){
            if(this.existsProcess)
                return this.$basePath+"/workflow/runtime/diagram/"+this.params.instanceId+".png?t="+new Date().getTime();
            else if(!isEmpty(this.processDefId))
                return this.$basePath+"/workflow/runtime/diagramByDefinitionId/"+this.processDefId+".png?t="+new Date().getTime();
            return "";
        },
        existsProcess(){
            return !isEmpty(this.params.instanceId);
        },
        existsTask(){
            return !isEmpty(this.params.taskId);
        }
    },
    methods: {
        ok() {
            if (!this.loading)
                this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        cancel() {
            this.visible=false;
            this.nextTasks={};
            this.taskList={};
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        dateFormat(time){
            if(!isEmpty(time))
                return time.split(" ")[0];
            return time;
        },
        exitsWsInstance(wsId,handler){
            var _self=this;
            _self.$http.get("/workflow/runtime/existsInstance",{
                params:{
                    businessKey:wsId
                }
            }).then(handler);
        },
        loadTaskList(){
            var _self=this;
            _self.$http.get("/workflow/runtime/taskList",{
                params:{
                    instanceId:_self.params.instanceId
                }
            }).then(function(result){
                if(result.success){
                    _self.taskList=result.data;
                }
            });
        },
        loadNextTasks(){
            var _self=this;
            _self.$http.get("/workflow/runtime/nextTasks",{
                params:{
                    taskId:_self.params.taskId
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    _self.nextTasks=data;
                    for(var index in data){
                        var item=data[index];
                        _self.getDefaultUser(item);
                    }
                    _self.$forceUpdate();
                }
            });
        },
        loadWorkFlowDatas(){
            var _self=this;
            _self.$http.get("/workflow/runtime/workFlowDatas",{
                params:{
                    taskId:_self.params.taskId,
                    instanceId:_self.params.instanceId
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    _self.nextTasks=data.nextTasks;
                    for(var index in data.nextTasks){
                        var item=data.nextTasks[index];
                        _self.getDefaultUser(item);
                    }
                    _self.taskList=data.taskList;
                    _self.setHandleTime();
                    _self.hasRollbackTask=data.hasRollbackTask;
                    _self.hasRevokeTask=data.hasRevokeTask;
                }
            });
        },
        setHandleTime(){
            var handleTime="";
            for(var i=0;i<this.taskList.length;i++){
                var task=this.taskList[i]
                if(!isEmpty(task.handleTime))
                    handleTime=task.handleTime;
            }
            console.log(handleTime,'handleTime');
            this.dataInfo.handleTime=handleTime;
        },
        loadProcessDef(){
            var _self=this;
            _self.$http.get("/workflow/deploys/lastProcess",{
                params:{
                    category:_self.params.category
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    _self.processDefList=data;
                    // console.log(_self.processDefList,'_self.processDefList')
                    _self.modalTitle = data[0].name
                    if(!isNull(data)&&data.length>0)
                        _self.processDefId=data[0].id;
                }
            });
        },
        startProcess(){
            var _self=this;
            _self.btnLoading=true;
            _self.$http.post("/workflow/runtime/startProcessInstanceById",dataToParams({
                processDefinitionId:_self.processDefId,
                businessKey:_self.params.businessKey,
            }))
            .then(function(result){
                if(result.success){
                    _self.exitsWsInstance(_self.params.businessKey,function(ret){
                        if(ret.success){
                            _self.params.taskId=ret.data.taskId;
                            _self.params.instanceId=ret.data.instanceId;
                            _self.loadData();
                        }
                    })
                }
                _self.btnLoading=false;
            }).catch(function(error){
                _self.btnLoading=false;
            });
        },
        eachflowElement(handler){
            // var operation = document.getElementById('operation');
            var flowEls=document.querySelectorAll('[name=transition]');
            flowEls.forEach(handler);
        },
        vaildCompleteParams(){
            var _self=this;
            this.dataInfo.taskId=this.params.taskId;
            if(isEmpty(this.dataInfo.taskId)){
                this.$Message.error("任务不存在!");
                return false;
            }
            console.log(1111)
            var transitions=[];
            var assigneeStatus=true;
            this.eachflowElement(function(item, index){
                if(item.checked){
                    transitions.push(item.value);
                    var nodeValue=item.attributes.tasktype.nodeValue;
                    console.log(nodeValue);
                    if(nodeValue!="endEvent"){
                        // var key=isEmpty(item.value)?'flow_assignee':('flow_assignee_'+item.value);
                        var key=item.attributes.assignee.nodeValue;
                        key=isEmpty(key)?'flow_assignee':('flow_'+key);
                        assigneeStatus&=!isEmpty(_self.dataInfo[key]);    
                    }
                }
            });
            this.dataInfo.flow_transition=transitions.join(",");
            if(transitions.length==0){
                this.$Message.error("请选择流向!");
                return false;
            }
            
            if(!assigneeStatus){
                this.$Message.error("请选择办理人!");
                return false;
            }

            if(isEmpty(this.dataInfo.handleTime)){
                this.$Message.error("办理时间不能为空!");
                return false;
            }

            if(isEmpty(this.dataInfo.message)){
                this.$Message.error("办理意见不能为空!");
                return false;
            }
            return true;
        },
        completeTask(){
            var _self=this;
            if(!_self.vaildCompleteParams())
                return;
            _self.confirm("请确认是否办理？",function(){
                _self.btnLoading=true;
                _self.$http.post("/workflow/runtime/complete",dataToParams(_self.dataInfo))
                .then(function(result){
                    if(result.success){
                        _self.nextTasks=result.data;
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-complete");
                    }
                    _self.btnLoading=false;
                }).catch(function(error){
                    _self.btnLoading=false;
                });
            });
        },
        rollbackTask(){
            var _self=this;
              if(isEmpty(this.dataInfo.handleTime)){
                this.$Message.error("办理时间不能为空!");
                return;
            }

            if(isEmpty(this.dataInfo.message)){
                this.$Message.error("办理意见不能为空!");
                return;
            }
            _self.confirm("请确认是否退回？",function(){
                _self.dataInfo.taskId=_self.params.taskId;
                _self.btnLoading=true;
                _self.$http.post("/workflow/runtime/rollbackTask",dataToParams(_self.dataInfo))
                .then(function(result){
                    if(result.success){
                        _self.nextTasks=result.data;
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-complete");
                    }
                    _self.btnLoading=false;
                }).catch(function(error){
                    _self.btnLoading=false;
                });
            });
        },
        revokeTask(){
            var _self=this;
            if(isEmpty(this.dataInfo.handleTime)){
                this.$Message.error("办理时间不能为空!");
                return false;
            }

            if(isEmpty(this.dataInfo.message)){
                this.$Message.error("办理意见不能为空!");
                return false;
            }
            _self.confirm("请确认是否撤回？",function(){
                _self.dataInfo.instanceId=_self.params.instanceId; 
                _self.btnLoading=true;
                _self.$http.post("/workflow/runtime/revokeTask",dataToParams(_self.dataInfo))
                .then(function(result){
                    if(result.success){
                        _self.nextTasks=result.data;
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-complete");
                    }
                    _self.btnLoading=false;
                }).catch(function(error){
                    _self.btnLoading=false;
                });
            });
        },
        selectNextTask(item){
            if(item.selectType=="radio"){
                for(var i=0,size=this.nextTasks.length;i<size;i++){
                    var nextTask=this.nextTasks[i];
                    if(nextTask.selectType=="radio")
                        nextTask.checked=false;
                }
                item.checked=true;
            }
        },
        selectAssignee(item,index){
            this.userselect.show=true;
            this.userselect.selectIds=this.dataInfo["flow_"+item.assignee];
            this.userselect.item=item;
            if(isEmpty(item.roleIds)){
                this.userselect.roleIds="Enforcer";
            }else{
                this.userselect.roleIds=item.roleIds;
            }
        },
        userSelectChange(nodes){
            var ids=[],names=[];
            for(var i=0;i<nodes.length;i++){
                ids.push(nodes[i].id);
                names.push(nodes[i].title);
            }
            // this.userselect.item.$assignee=ids.join(",");
            // this.userselect.item.$assigneeName=names.join(",");
            var assignee=this.userselect.item.assignee;
            this.dataInfo["flow_"+assignee]=ids.join(",");
            this.dataInfo["flow_NS"+assignee]=names.join(",");
            this.$forceUpdate();
        },
        loadData() {
            // console.log(11111);
            // if(!isEmpty(this.params.instanceId))
            //     this.loadTaskList();
            // if(!isEmpty(this.params.taskId))
            //     this.loadNextTasks();
            this.loadWorkFlowDatas();
            this.loadProcessDef();
            this.visible=true;
        },
        saveDefaultUser(item,index){
            var _self=this;
            var userId=_self.dataInfo['flow_'+item.assignee];
            var username=_self.dataInfo['flow_NS'+item.assignee]
            if(isEmpty(userId)){
                _self.$Message.info("默认处理人不能为空！")
                return;
            }
            _self.$http.post("/workflow/defaultuser/save",dataToParams({
                taskDefKey:item.id,
                userId:userId,
                username:username
            }))
            .then(function(result){
                if(result.success){

                }
                _self.$Message.info(result.msg);
            });
        },
        getDefaultUser(item){
            var _self=this;
            _self.$http.get("/workflow/defaultuser/"+item.id)
            .then(function(result){
                if(result.success){
                    if(!isNull(result.data)){
                        _self.dataInfo['flow_'+item.assignee]=result.data.userId;
                        _self.dataInfo['flow_NS'+item.assignee]=result.data.username;
                        _self.$forceUpdate();
                    }
                }
            });
        },
        confirm(content,handler){
               this.$Modal.confirm({
                title:"提示",
                content:content,
                onOk:handler
            });
        },
        //--------------------------------常用意见-------------------------------------
        getOpinionsList(){
            var _self=this;
            _self.$http.get("/workflow/opinions/list")
            .then(function(result){
                if(result.success){
                    _self.opinionList=result.data;
                }
            });
        },
        saveOpinions(){
            var _self=this;
            if(isEmpty(this.dataInfo.message)){
                _self.$Message.info("办理意见不能为空!");
                return;
            }
            _self.$http.post("/workflow/opinions",{
                opinion:this.dataInfo.message
            })
            .then(function(result){
                if(result.success){
                    _self.getOpinionsList();
                }
            });
        },
        deleteOpinions(item){
            var _self=this;
              _self.$Modal.confirm({
                title:"提示",
                content:"是否确认删除？",
                onOk:function(){
                    _self.$http.delete("/workflow/opinions/"+item.id)
                    .then(function(result){
                        if(result.success){
                            _self.getOpinionsList();
                        }
                    });
                }
            });
        },
        selectOpinions(item){
            this.dataInfo.message=item.opinion;
        }
    },
    mounted(){
        this.getOpinionsList();
    },
    watch:{
        value(val){
            if(val){
                this.dataInfo={message:"",handleTime:undefined};
                this.taskList=[];
                this.hasRollbackTask=false;
                this.hasRevokeTask=false;
                this.eachflowElement(function(item, index){
                    item.checked=false;
                });
                this.params={
                    taskId:this.taskId,
                    instanceId:this.instanceId,
                    businessKey:this.businessKey,
                    category:this.category
                };
                this.loadData();
            }else{
                this.processDefId="";
                this.btnLoading=false;
            }
            this.$forceUpdate();
        }
    }
};
</script>

<style scoped>
    table {
        width: 200px; 
        min-height: 25px; 
        line-height: 25px; 
        text-align: center; 
        border-color:#b6ff00; 
        border-collapse: collapse;
    }   
    table,table tr th, table tr td { 
        border:1px solid #e9eaec; 
    }
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
</style>