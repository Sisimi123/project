<template>
    <Card :style="'height:'+(clientHeight-113)+'px'">
        <Tabs value="task" :animated="false" @on-click="changetab">
            <TabPane label="任务管理" name="task">
                <!-- <Row>                    
                    <Button type="success" @click="startTask">开启任务</Button>
                    <Button type="warning" @click="startTask">停止任务</Button>
                    <Button type="info" @click="startTask">修改任务</Button>
                    <Button type="primary" @click="addTask">新增任务</Button>
                    <Button type="error" @click="startTask">删除任务</Button>                   
                </Row> -->
                <Row style="margin-top:5px;">
                    <Table border ref="selection" :columns="taskColumn" :data="taskData"></Table>
                </Row>
                <Modal
                    :title="isNew?'新增任务':'修改任务'"
                    width="440"
                    v-model="taskModal">
                    <Form  :model="taskInfo" ref="taskInfo"   :label-width="90" :rules="ruleValidate">
                        <Row>
                            <Col span="24" >
                                <FormItem label="任务名称:" >
                                    <Input :readonly='true' v-model="taskInfo.id" placeholder="请输入任务名称(bean name)..."></Input>
                                </FormItem>
                            </Col>
                        </Row>
                         <Row>
                            <Col span="24" >
                                <FormItem label="任务备注:" >
                                    <Input type="textarea" v-model="taskInfo.remark" placeholder="请输入任务备注..."></Input>
                                </FormItem>
                            </Col>
                        </Row> 
                        <Row>
                            <Col span="24">
                                <FormItem label="类型:" >
                                    <RadioGroup v-model="taskInfo.type" type="button">
                                        <Radio :label="label[0]">fixedRate</Radio>
                                        <Radio :label="label[1]">fixeDealy</Radio>
                                        <Radio :label="label[2]">cron</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-show = "typeshow">
                            <Col span="24">
                                <FormItem label="延迟时间(ms):" prop="initialDelay">
                                    <Input v-model="taskInfo.initialDelay" placeholder="请输入延迟时间..."></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-show = "typeshow">
                            <Col span="24">
                                <FormItem label="执行间隔(ms):" prop="intervals">
                                    <Input v-model="taskInfo.intervals" placeholder="请输入延迟时间..."></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row v-show = "!typeshow">
                            <Col span="24">
                                <!-- <FormItem label="固定执行时间:" prop="time">
                                    <TimePicker type="time" placeholder="请选择执行时间" style="width: 168px" v-model="taskInfo.time"></TimePicker>
                                </FormItem> -->
                                <FormItem label="cron表达式(cron4j规范):" prop="time">
                                    <Input v-model="taskInfo.time" placeholder="请输入cron表达式(cron4j规范)"></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row >
                            <Col span="12">
                                <FormItem label="实例数量:" >
                                    <InputNumber :max="8" :min="1" v-model="taskInfo.bfd"></InputNumber>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="失败重调次数:" >
                                    <InputNumber :max="10" :min="0" v-model="taskInfo.maxRestartCount"></InputNumber>
                                </FormItem>
                            </Col>
                        </Row>

                        
                    </Form>
                    <div slot="footer">
                        <Button @click="taskModal=false">取消</Button>
                        <Button type="primary" @click="saveTask">保存</Button>
                    </div>
                </Modal>
            </TabPane>
            <TabPane label="线程监控" name="thread">
                <Row>
                    <Button type="primary" @click="refreshThread">刷新</Button>
                </Row>
                <Row style="margin-top:5px;">
                    <Table border ref="pool" :columns="poolColumn" :data="poolData"></Table>
                </Row>
                <Row style="margin-top:5px;">
                    <Table border ref="thread" :columns="threadColumn" :data="threadData"></Table>
                </Row>
            </TabPane>
            <TabPane label="线程异常日志" name="log">
                <Row>
                    <DatePicker type="date" placeholder="Select date" style="width: 200px" :clearable="false" v-model="query.others.starttime" @on-change="changeDate"></DatePicker>
                    <Button type="primary" @click="refreshlog">刷新</Button>
                </Row>
                <Row style="margin-top:5px;">
                    <Table border ref="log" :columns="logColumn" :data="logData" :height="clientHeight-280"></Table>
                </Row>
                <Row style="margin-top:5px;height:36px">
                    <Page :total="logTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                </Row>
            </TabPane>
        </Tabs>
    </Card>

</template>
<script>
export default {
    data(){
        //校验延迟时间最小时间
        var _my = this;
        var  validinit = function(rule, value, callback){
                    if(_my.typeshow){
                        var intvalue = parseInt(value);
                        if(isNaN(intvalue)){
                            return callback(new Error("初次延迟时间必须为正整数"));
                        }
                        if(intvalue<5000){
                            return callback(new Error("初次延迟时间必须大于5000(ms)"));
                        }
                    }
                    callback();
                      
                };
        var  validinter = function(rule, value, callback){
         
                    if(_my.typeshow){
                        var intvalue = parseInt(value);
                        if(isNaN(intvalue)){
                            return callback(new Error("间隔时间必须为正整数"));
                        }
                        if(intvalue<5000){
                            return callback(new Error("初次延迟时间必须大于5000(ms)"));
                        }
                    }
                    callback();
                      
                };
        var  validtime = function(rule, value, callback){
                    if(!_my.typeshow){
                        var valstr = _my.taskInfo.time.trim();
                        if(valstr == ''){
                            return callback(new Error("cron表达式不能为空"));
                        }
                        var arr = valstr.split(" ");
                        console.log(valstr,arr);
                        if(arr.length!=5){
                            return callback(new Error("cron表达式格式不正确"));
                        }
                    }
                    callback();
                      
                }
        return {
            label:[
                0,1,2
            ],
            ruleValidate:{
                // id: [
                //     { required: true, message: '任务名称不能为空', trigger: 'blur' }
                    
                // ],
                initialDelay: [
                    // { type: 'string',pattern:/^([1-9](\d)*)$/, message:'请输入一个正整数', trigger:'blur'},
                    { validator: validinit, trigger: 'blur' }
                ],
                intervals: [
                    { validator: validinter, trigger: 'blur' }
                ],
                time: [
                    { validator: validtime, trigger: 'blur' }
                ]
            },
            isNew:false,//没有添加
            taskModal:false,
            LoadthreadTab:false,
            poolColumn:[
                {
                    title: '线程池最大允许线程数',
                    key: 'max',
                    align: 'center'
                },
                {
                    title: '线程池当前线程数',
                    key: 'size',
                    align: 'center'
                },
                {
                    title: '线程池核心线程数',
                    key: 'core',
                    align: 'center'
                },
                {
                    title: '线程池当前运行线程',
                    key: 'active',
                    align: 'center'
                }
            ],
            poolData:[],
            logColumn:[
                {
                    title: 'id',
                    key: 'id',
                    align: 'center',
                    width:250
                },
                {
                    title: '所在类',
                    key: 'clazz',
                    align: 'center'
                },
                {
                    title: '记录信息',
                    key: 'detail',
                    ellipsis:'true',
                    align: 'center',
                    
                },
                {
                    title: '错误消息',
                    key: 'note',
                    align: 'center',
                    // ellipsis:'true',
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    width: 180
                
                }

            ],
            taskColumn: [
                {
                    title: '任务名称',
                    key: 'id',
                    align: 'center'
                },
                {
                    title: '任务类型',
                    align: 'center',
                    render:(h,params) =>{
                        var type=params.row.type;
                        var typename = '任务类型异常';
                        if(type == 0){
                            typename = 'fixedRate';
                        }else if(type == 1){
                            typename = 'fixedDelay';
                        }else if(type == 2){
                            typename = 'cron';
                        }
                        return h('div', typename);
                    }
                },
                {
                    title: '执行时间配置',
                    align: 'center',
                    render:(h,params) =>{
                        var type=params.row.type;
                        var pz = '';
                        if(type == 0 || type == 1){
                            pz = params.row.initialDelay+"/"+params.row.intervals;
                        }else if(type == 2){
                            pz = params.row.time;
                        }
                        return h('div', pz);
                    }
                },
                {
                    title: '线程数',
                    key: 'bfd',
                    align: 'center'
                },
                {
                    title: '能否使用',
                    key: 'disable',
                    align: 'center',
                    render: (h, params) => {

                        return this.showDisable(h,params.row.disable);
                    }
                },
                {
                    title: '启动状态',
                    align: 'center',
                    render:(h,params) =>{
                        return h('i-switch', {
                            props: {
                                value: params.row.status === 1,  //控制开关的打开或关闭状态，官网文档属性是value
                                disabled:params.row.disable == 1
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                                    // this.switch(params.index) //params.index是拿到table的行序列，可以取到对应的表格值
                                    
                                    if(value){
                                        params.row.status = 1;
                                    }else{
                                        params.row.status = 0;
                                    }
                                    this.changeStatus(params.row.id,params.row.status);

                                    
                                }
                            }
                       })
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        var id=params.row.id;
                        var disable = params.row.disable;
                        disable =  disable == 1;
                        var buttons=[];
                        buttons.push(h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small',
                                disabled:disable
                            },style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.editTask(id);
                                }
                            }
                        },'编辑'));
                        return h('div', buttons);
                    }
                }

            ],
            taskData:[],
            threadColumn:[
                {
                    title: '线程名称',
                    key: 'threadname',
                    align: 'center'
                },
                {
                    title: '任务名称',
                    key: 'taskname',
                    align: 'center'
                },
                {
                    title: '上次结束时间(任务)',
                    key: 'lasttime',
                    align: 'center'
                },
                {
                    title: '开始执行时间',
                    key: 'starttime',
                    align: 'center'
                },
                {
                    title: '失败次数',
                    key: 'restartNum',
                    align: 'center'
                }

            ],
            threadData:[],
            logData:[],
            taskInfo:{
                name:'',
                remark:'',
                type:'0',
                initialDelay:'',
                intervals:'',
                bfd:1,
                time:'',
                status:0,
                id:'',
                maxRestartCount:0
            },
            logTotal:0,
            query:{
                page:1,
                size:10,
                others:{
                    starttime:new Date()
                },
                // search:'',
                


            },

        }
    },
    computed:{
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        typeshow(){
            //根据type显示不同的选项,清除校验提示
            
            // this.$refs["taskInfo"].resetFields();
            // this.resetFields();
            var re =  '0' == this.taskInfo.type || '1' == this.taskInfo.type;
            return re;
            
            
        }
    },
    methods:{
        refreshlog(){
            this.getlogPage();
        },
        changeDate(d1,d2){
            let datearr = d1.split("-");
            // console.log(datearr);
            let d = new Date(datearr[0],datearr[1]-1,datearr[2]);
            // console.log(d);
            this.query.others.starttime = d;
            
            this.getlogPage();

        },
        pageChange(page){
            this.query.page = page;
            this.getlogPage();
        },
        pageSizeChange(size){
            this.query.size = size;
            this.getlogPage();
        },
        getlogPage(){
            let query = this.query;
            this.$http.get("/task/mgr/logpage",{
                params:{
                    query: JSON.stringify(query)
                }
            }).then(result => {
                if(result.success){
                    this.logData = result.data.data;
                    this.query.page =  result.data.page;
                    this.query.size =  result.data.size;
                    this.logTotal = result.data.total;
                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        refreshThread(){
            this.loadThreadData();
        },
        changetab(name){
            //切换到线程页面刷新数据
            if(name=='thread'){
               this.loadThreadData();
            }

        },
        loadThreadData(){
            this.$http.get("/thread/state/all").then(result =>{
                if(result.success){
                    this.threadData = result.data;
                }
            });
            this.$http.get("/thread/state/poolinfo").then(result =>{
                if(result.success){
                    var poolarr = [];
                    poolarr.push( result.data); 
                    this.poolData = poolarr;
                }
            });
            

        },
        getThreadPage(){
            this.loadThreadData();
        },
        showDisable(h,value){
            if(value==0)
                return [h('Icon', {
                    props: {
                        type: 'checkmark-round',
                        size: 'small',
                        color:'green'
                    }
                })];
            if(value==1)
                return [h('Icon', {
                    props: {
                        type: 'close-round',
                        size: 'small',
                        color:'red'
                    }
                })];
            return value;
        },
        changeStatus(id,status){
            this.$http.get("/task/mgr/status?id="+id+"&status="+status).then(result =>{
                if(result.success){
                    if(status == 1){
                        this.$Message.info('任务开启成功');
                    }else{
                        this.$Message.info('任务关闭成功');
                    }
                }else{

                    this.$Message.info(result.msg);
                    this.getpages();
                    
                }
            }).catch(error => {

                this.$Message.info('有异常');
                this.getpages();
            });       
        },
        startTask(){
            console.log('st');
        },
        init(){
            this.$http.get("/task/mgr").then(result =>{
                if(result.success){
                    this.taskData = result.data;
                }
            })
            this.getlogPage();
        },
        editTask(id){
            this.$refs["taskInfo"].resetFields();
            
            this.$http.get("/task/mgr/"+id).then(result =>{
                if(result.success){
                    this.taskInfo = result.data;
                    this.taskModal = true;                    
                }else{
                    this.$Message.info(result.msg);
                }
            });


            

        },
        saveTask(){
            if(this.taskInfo.status == 1){
                this.$Message.info('请先停止任务，再进行修改');
                return false;
            }
            let _self = this;
            this.$refs["taskInfo"].validate((valid) => {
                if (valid) {                                         
                    _self.$http.patch("/task/mgr",_self.taskInfo)
                        .then(result =>{
                            if(result.success){
                                _self.getpages();
                                _self.taskModal = false;
                            }else{
                                _self.$Message.info(result.msg);
                            }
                        })
                }
            })
        },
        getpages(){
            this.$http.get("/task/mgr").then(result =>{
                if(result.success){
                    this.taskData = result.data;
                }
            })
        }

    },
    mounted(){
        this.init();


    }

    
}
</script>
<style>

</style>


