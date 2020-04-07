<template>
    <div>
        <div>
            <Row>
                <Col span="5" class="height-100" >
                    <Card :style="'height:'+(clientHeight-113)+'px'">
                        <div>
                            <Select v-model="currentsiteid" clearable placeholder="请选择站点" @on-change='changesite'>
                                <Option v-for="(item,index) in sites" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div>
                            <Tree ref="channelTree" :data="channelTree" @on-select-change="changeTree" ></Tree>
                        </div>
                    </Card>
                </Col>
                <Col span="19" class="padding-left-6">
                        <Card :style="'height:'+(clientHeight-113)+'px'">
                            <Row>
                                <Input icon="ios-search"  placeholder="请输入栏目名称..." v-model="query.search" style="width: 200px" @on-change="handleSearch"/>
                                <Button type="info" @click="addchannel">新增栏目</Button>
                            </Row>
                            <Row style="margin-top:5px;">
                                <Table  :height="clientHeight-223" border :columns="channelColumn" :data="channeldata"></Table>
                            </Row>
                            <Row style="margin-top:5px;">
                                <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                            </Row>
                    </Card>
                </Col>
            </Row>
            
        </div>
        <Modal
            :title="isNew?'新增栏目':'编辑栏目'"
            width="740"
            v-model="channelModal">
            <Form  :model="channelInfo" ref="channelInfo" :rules="ruleValidate"  :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="名称:" prop="name">
                            <Input v-model="channelInfo.name" placeholder="请输入名称..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12" style="text-align:center">
                        <FormItem label="外部链接:" >
                            <Input v-model="channelInfo.extLinks" placeholder="请输入外部链接..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                         <FormItem label="栏目类型:"  prop="type">
                            <Select v-model="channelInfo.type" placeholder="请选择栏目类型">
                                <Option v-for="(item,index) in channeltypes" :value="item.code" :key="index">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="栏目模板:"  prop="channeltemp">
                            <Select v-model="channelInfo.channeltemp" placeholder="请选择栏目模板">
                                <Option v-for="(value,index) in channeltemps" :value="value" :key="index">{{value}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="内容模板:"  prop="contenttemp">
                            <Select v-model="channelInfo.contenttemp" placeholder="请选择内容模板">
                                <Option v-for="(value,index) in contenttemps" :value="value" :key="index">{{value}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="移动端模板:" >
                            <Select v-model="channelInfo.phonetemp" placeholder="请选择移动端内容模板" clearable >
                                <Option v-for="(value,index) in phonetemps" :value="value" :key="index">{{value}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="meta标题:" >
                            <Input v-model="channelInfo.metatitle" placeholder="请输入meta标题..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="meta关键字:" >
                            <Input v-model="channelInfo.metakey" placeholder="请输入meta关键字..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="meta内容:" >
                            <Input v-model="channelInfo.metaconetnt" type="textarea" placeholder="请输入meta内容..." :rows="3"></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="channelModal=false">取消</Button>
                <Button type="primary" @click="saveChannel">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>

export default {
    data(){
        return {
            treenode:[],
            dataTotal:0,
            query:{
                page:1,
                size:10,
                others:{},
                search:''
            },
            sites:[],
            currentsiteid: 0,//0表示没有选择站点
            currentchannelid: 0,//0表示没有选择栏目，所以展示该站点下的所有栏目列表。
            channelTree:[],//栏目树
            channelColumn:[
                {
                    title: '序号',
                    key: 'id',
                    align: 'center',
                    width: 150
                },
                {
                    title: '名称',
                    key: 'name',
                    align: 'center',
                    
                },
                {
                    title: '栏目类型',
                    key: 'typename',
                    align: 'center',
                    
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    
                },
                {
                    title: '发布状态',
                    key: 'name',
                    align: 'center',
                    render:(h,params) =>{
                        return h('i-switch', {
                            props: {
                                value: params.row.status === 1  //控制开关的打开或关闭状态，官网文档属性是value
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
                        var buttons=[];
                        buttons.push(h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.editChannel(id);
                                }
                            }
                        },'编辑'));
                        buttons.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.removeChannel(id);
                                    }
                                }
                            }, '删除'));
                        return h('div', buttons);
                    }
                }
            ],
            channeldata:[],
            isNew:true,
            channelModal:false,
            channelInfo:{
                name:'',
                extLinks:'',
                type:'',
                channeltemp:'',
                contenttemp:'',
                phonetemp:'',
                metakey:'',
                metatitle:'',
                metacontent:'',
            },
            channeltypes:[],
            channeltemps:[],
            contenttemps:[],
            phonetemps:[],
            ruleValidate:{
                name: [
                    { required: true, message: '名称不能为空', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '栏目类型不能为空', trigger: 'change',type:'number' }
                ],
                channeltemp: [
                    { required: true, message: '栏目模板不能为空', trigger: 'change' }
                ],
                contenttemp: [
                    { required: true, message: '内容模板不能为空', trigger: 'change' }
                ],

            },
            isNew:true,
            pnode:{},
            dealnodeid:0
        }
    },
    computed:{
        channelimg(){
            let path = this.channelInfo.channelimg;
            if(!path)
                return this.$util.avatar;
            path = this.$basePath+"/attachment"+this.channelInfo.channelimg;
            return path;
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        uploadData(){
            return {
                moduleId:"CmsChannel",
                dataid:this.channelInfo.id
            }
        },
            
    },
    methods:{
        changeTree(node){
            if(node.length === 0){//点两次会返回空数组
                return;
            }
            this.currentchannelid = node[0].id;//改变当前的栏目id
            this.treenode = node[0];//当前栏目节点
            this.getpages();//重新加载表格
        },
        test(){
            console.log('test');
        },
        handleSearch(){
            this.getpages();
        },
        removeChannel(id){
            this.dealnodeid = id;
            let _self = this;
            this.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前栏目吗？",
                onOk:function(){
                    this.$http.delete("/cms/channel/"+id).then(result =>{
                        if(result.success){
                            this.$Message.info("删除成功");
                            //调整栏目树
                            _self.dealtree();
                            let i = 0;
                            _self.pnode.children.forEach(element =>{
                                if(element.id == id){
                                    _self.pnode.children.splice(i,1);        
                                }
                                i++;
                            })
                            _self.getpages();
                        }else{
                            this.$Message.info(result.msg);
                            _self.getpages();
                        }
                    });
                   
                }
            });


        },
        changeStatus(id,status){
            this.$http.get("/cms/channel/status?id="+id+"&status="+status).then(result => {
                if(result.success){
                    if(status == 1){
                        this.$Message.info('栏目发布成功');
                    }else{
                        this.$Message.info('栏目取消发布');
                    }
                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        uploadSuccess(response, file, fileList){
            this.channelInfo.channelimg=response.data.url;
        },
        addchannel(){
            this.channelInfo={
                name:'',
                extLinks:'',
                type:'',
                channeltemp:'',
                contenttemp:'',
                phonetemp:'',
                metakey:'',
                metatitle:'',
                metacontent:'',
            }
            this.$refs["channelInfo"].resetFields();
            this.getinfos();
            this.channelModal = true;
        },
        editChannel(id){
            //先获取栏目信息
            this.$refs["channelInfo"].resetFields();
            this.isNew=false;
            this.$http.get("/cms/channel/"+id).then(result => {
                if(result.success == 1){
                    this.channelInfo=result.data;
                    
                }else{
                    this.$Message.info(result.msg);
                    return;//请求失败，方法结束
                }
            });
            //获取模板和区域信息
            this.getinfos();
            this.channelModal=true;

        },
        getinfos(){
            this.$http.get("/cms/channel/channelinfos?siteid="+this.currentsiteid).then(result =>{
                if(result.success){
                    this.channeltypes = result.data.types;
                    this.channeltemps = result.data.channeltemps;
                    this.contenttemps = result.data.contenttemps;
                    this.phonetemps = result.data.phonetemps;
                }
            })
        },
        saveChannel(){
            let _self = this;
            this.$refs["channelInfo"].validate((valid) => {
                if (valid) {
                    if(this.isNew){
                        this.channelInfo.siteid = this.currentsiteid;
                        if(this.currentchannelid !=0){//不为0设置父栏目id
                            this.channelInfo.parentId = this.currentchannelid;
                        }
                        this.$http.post("/cms/channel",this.channelInfo)
                        .then(result =>{
                            if(result.success){
                                this.getpages();

                                var dataid = result.data.id;
                                var dataname = result.data.name;

                                // 调整树
                                _self.findptree();
                                var newnode = {
                                    expand: false,
                                    id: dataid,
                                    selected: false,
                                    title: dataname,
                                    children:[]
                                }
                                _self.pnode.children.push(newnode);
                            }else{
                                 this.$Message.info(result.msg);
                            }
                            this.channelModal = false;
                        })
                    }else{
                        this.$http.patch("/cms/channel/"+this.channelInfo.id,this.channelInfo)
                        .then(result =>{
                            if(result.success){
                                this.getpages();
                            }else{
                                this.$Message.info(result.msg);
                            }
                            this.channelModal = false;
                        })
                    }
                }
            })
            
        },
        findptree(){//增加栏目后查找Tree中的父节点
            this.channelTree.forEach(element => {
                    this.findpnode(element)
                })
        },
        findpnode(node){
            if(node.id == this.currentchannelid){//相等，表示找到当前操作栏目的节点，也即新增栏目的父节点
                this.pnode = node;
                return;
            }else{
                node.children.forEach(element => {
                    this.findpnode(element)
                });
            }
        },
        dealtree(){//删除栏目后修改树
             this.channelTree.forEach(element => {
                    this.findnode(element)
                })
        },
        findnode(node){//寻找当前删除节点的父节点
            let r = this.isparent(node);
            if(!r){
                node.children.forEach(element => {
                    this.findnode(element)
                });
            }else{
                this.pnode = node;
            }
            
        },
        isparent(node){
            let result = false;
            node.children.forEach(element => {
                    if(element.id == this.dealnodeid){
                        result = true;
                        return true;
                    }
                }
            )
            return result;
        },
        changesite(value){//切换站点
            console.log(value);
            //切换站点的初始化前操作
            this.dataTotal=0,
            this.query={
                page:1,
                size:10,
                others:{},
                search:''
            }
            this.currentchannelid = 0;
            if(value){
                this.currentsiteid = value;
                this.initChannelTree();//加载树
                this.getpages();//加载表格数据

            }else{
                //情况value,
                this.channelTree = [];//清空树
                this.channeldata = [];//清空表格数据
            }
            
        },
        init(){
            //初始化时获取当前用户的默认站点
            this.$http.get("/cms/site/defaultid").then(result =>{
                if(result.success){
                    this.currentsiteid = result.data;
                    this.initChannelTree();
                    this.getpages();

                }
            })
        },
        initChannelTree(){
            //获取当前站点的栏目树
            this.$http.get("/cms/channel/tree?siteid="+this.currentsiteid).then(result =>{
                if(result.success){
                    this.channelTree = result.data;
                }
             })
        },
        initSites(){
            //获取站点集合
            this.$http.get("/cms/site").then(result =>{
                if(result.success){
                    this.sites = result.data;
                    
                }
             })
        },
        getpages(){
            let query = this.query;
            query.others.cid = this.currentchannelid,
            query.others.siteid = this.currentsiteid,
            this.$http.get("/cms/channel/page",{
                params:{
                    query: JSON.stringify(query)
                }
            }).then(result => {
                if(result.success){
                    this.channeldata = result.data.data;
                    this.query.page =  result.data.page;
                    this.query.size =  result.data.size;
                    this.dataTotal = result.data.total;

                }else{
                    this.$Message.info(result.msg);
                }
            });

            
        },
        pageChange(page){
            this.query.page = page;
            this.getpages();

        },
        pageSizeChange(size){
            this.query.size = size;
            this.getpages();
        }

    },
    created(){
        
    },
    mounted(){
        this.init();
        this.initSites();
    }
    
}
</script>
<style>

</style>
