<template>
    <div>
        <div>
            <Row>
                 <Col span="24" >
                    <Card :style="'height:'+(clientHeight-113)+'px'">
                        <Row>
                            <Input icon="ios-search"  placeholder="请输入查询条件..." v-model="key" style="width: 200px" @on-change="handleSearch"/>
                            <Button type="info" @click="addSite">新增站点</Button>
                        </Row>
                        <Row style="margin-top:5px;">
                            <Table  :height="clientHeight-223" border :columns="siteColumn" :data="sitedata"></Table>
                        </Row>
                    </Card>
                 </Col>
            </Row>
        </div>
        <Modal
            v-model="siteModel"
            :title="isNew?'新增站点':'编辑站点'"
            width="780">
            <Form  :model="siteInfo" ref="siteInfo" :rules="ruleValidate"  :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="名称:" prop="name">
                            <Input v-model="siteInfo.name" placeholder="请输入名称..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="站点简称:">
                            <Input v-model="siteInfo.abbreviation" placeholder="请输入站点简称..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="关键字:">
                    <Input v-model="siteInfo.keyword" placeholder="请输入关键字..."></Input>
                </FormItem>
                <FormItem label="描述:">
                    <Input v-model="siteInfo.description" placeholder="请输入描述..."></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem label="域名:" prop="domain">
                            <Input v-model="siteInfo.domain" placeholder="请输入域名..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="区域代码:" prop="areaid" >
                            <Cascader :data="areadata" v-model="areaid" change-on-select></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="站点目录:" prop="sitedir" style="margin-top:30px;">
                            <Select v-model="siteInfo.sitedir" placeholder="请选择站点目录" >
                                <Option v-for="(value,index) in sitedir" :value="value" :key="index">{{value}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">

                            <!-- <span class="faviconCss">favicon:</span>
                            <MyUpload action="/$admin/attachs"
                                :data="uploadData"
                                :on-success="uploadSuccess" >
                                <img style="width: 90%;max-width: 110px;height: auto;margin-left:120px;" :src="favicon"/>
                            </MyUpload> -->
                        <FormItem label="favicon:"  style="margin-top:30px;height:115px;">
                            <MyUpload action="/$admin/attachs"
                                :data="uploadData"
                                :on-success="uploadSuccess" >
                                <img style="width: 90%;max-width: 110px;height: auto;margin-left: 60px;" :src="favicon"/>
                            </MyUpload>
                        </FormItem>
                    </Col>
                </Row>                         
            </Form>
            <div slot="footer">
                <Button @click="siteModel=false">取消</Button>
                <Button type="primary" @click="saveSiet">保存</Button>
            </div>  
        </Modal>
        <!-- <Modal v-model="grantmodal"
            title="站点授权"
            width:='780'
            height='600'
            >
            <Row >
                <Col span="12" style="height:400px;overflow:auto">
                    <Tree :data="deptdata" @on-select-change="deptSelect"></Tree>
                </Col>
                <Col span="12">
                    <Table border ref="selection" :columns="usercolumn" :data="userdata"></Table>
                </Col>
            </Row>
            
        </Modal> -->

    </div>
</template>
<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue';
export default {
    components: {
        MyUpload
    },
    data(){
        return {
            key:'',
            deptdata:[],
            siteColumn: [
                {
                    title: '序号',
                    key: 'id',
                    align: 'center',
                    width: 150
                },
                {
                    title:'名称',
                    key:'name',
                    align: 'center'
                },
                {
                    title:'域名',
                    key:'domain',
                    align: 'center'
                },
                {
                    title:'所属区域',
                    align: 'center',
                    width: 200,
                    render:(h,params) =>{
                        var areaname=params.row.area.name;
                        return h('div', areaname);
                    }
                },
                {
                    title:'站点状态',
                    key:'status',
                    align: 'center',
                    width: 200,
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
                   title:'创建时间',
                    key:'createTime',
                    align: 'center',
                    width: 200 
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
                                    this.editSite(id);
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
                                        this.removeSite(id);
                                    }
                                }
                            }, '删除'));
                        // buttons.push(h('Button', {
                        //         props: {
                        //             type: 'warning',
                        //             size: 'small'
                        //         },
                        //         style: {
                        //             marginRight: '5px'
                        //         },
                        //         on: {
                        //             click: () => {
                        //                 this.grant(id);
                        //             }
                        //         }
                        //     }, '授权'));
                        return h('div', buttons);
                    }
                }
            ],
            sitedata:[],
            siteModel:false,
            siteInfo:{
                id:'',
                name:'',
                domain:'',
                abbreviation:'',
                keyword:'',
                description:'',
                areaid:'',
                status:'',
                sitedir:'',
                favicon:''
            },
            sitedir:[],
            ruleValidate:{
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                domain: [
                    { required: true, message: '域名不能为空', trigger: 'change' }
                ],
                areaid: [
                    { required: true, message: '区域id不能为空', trigger: 'change' }
                ],
                sitedir: [
                    { required: true, message: '站点目录不能为空', trigger: 'change' }
                ]

            },
            isNew:true,
            areadata:[],
            // areaid:[],//中间件存储区域代码
        }
    },
    computed:{
        favicon(){
            let path = this.siteInfo.favicon;
            if(!path)
                return this.$util.avatar;
            path = this.$basePath+"/attachment"+this.siteInfo.favicon;
            return path;
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        areaid:{
            get:function(){
                const areapath = this.siteInfo.area;
                if(areapath){
                    let arr =areapath.path.split("/");
                    arr.shift();
                    arr.shift();
                    return arr;
                }else{
                    return [];
                }
            },
            set:function(newval){
                let size = newval.length;
                if(size>0){
                    this.siteInfo.areaid = newval[size-1];
                }else{
                    this.siteInfo.areaid = '';
                }
            }
        },
        uploadData(){
            return {
                moduleId:"CmsSite",
                // dataid:this.channelInfo.id
            }
        },

    },
    methods:{
        uploadSuccess(response, file, fileList){
            this.siteInfo.favicon=response.data.url;
        },
        addSite(){
            this.siteInfo={
                id:'',
                name:'',
                domain:'',
                abbreviation:'',
                keyword:'',
                description:'',
                areaid:'',
                status:'',
                sitedir:'',
                favicon:''
            }
            this.$refs["siteInfo"].resetFields();
            this.areaid = [];
            this.isNew=true,
            this.$http.post("/cms/site/findTempAndArea")
            .then(result => {
                this.sitedir = result.data.dir;
                this.areadata = result.data.area;
                this.siteModel=true;
            })
            
        },
        editSite(id){
            //先获取站点信息
            this.$refs["siteInfo"].resetFields();
            this.isNew=false;
            this.$http.get("/cms/site/"+id).then(result => {
                if(result.success == 1){
                    if(!result.data.favicon){
                        result.data.favicon = ''
                    };
                    this.siteInfo=result.data;
                    
                }else{
                    this.$Message.info(result.msg);
                    return;//请求失败，方法结束
                }
            });
            //获取模板和区域信息
            this.$http.post("/cms/site/findTempAndArea")
            .then(result => {
                this.sitedir = result.data.dir;
                this.areadata = result.data.area;
            })
            this.siteModel=true;

        },
        handleSearch(){
            if(this.key == ''){
                this.getSites();
            }else{
                this.$http.get("/cms/site/search?key="+this.key).then(result => {
                    if(result.success){
                        this.sitedata = result.data;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        },
        saveSiet(){
            // //获取数组最后一个的值
            // this.siteInfo.areaid = this.areaid.pop();
            this.$refs["siteInfo"].validate((valid) => {
                if (valid) {
                    if(this.isNew){
                        this.$http.post("/cms/site",this.siteInfo)
                        .then(result =>{
                            if(result.success){
                                this.getSites();
                            }else{
                                 this.$Message.info(result.msg);
                            }
                            this.siteModel = false;
                        })
                    }else{
                        this.$http.patch("/cms/site/"+this.siteInfo.id,this.siteInfo)
                        .then(result =>{
                            if(result.success){
                                this.getSites();
                            }else{
                                 this.$Message.info(result.msg);
                            }
                            this.siteModel = false;
                        })
                    }
                }
            })
            

        },
        changeStatus(id,status){
            this.$http.get("/cms/site/status?id="+id+"&status="+status).then(result => {
                if(result.success){
                    if(status == 1){
                        this.$Message.info('站点开启成功');
                    }else{
                        this.$Message.info('站点关闭成功');
                    }
                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        removeSite(id){
            let _self = this;
            this.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前站点吗？",
                onOk:function(){
                    this.$http.delete("/cms/site/"+id).then(result =>{
                        if(result.success){
                            this.$Message.info("删除成功");
                            _self.getSites();
                        }else{
                            this.$Message.info(result.msg);
                            _self.getSites();
                        }
                    });
                   
                }
            });

        },
        getSites(){
            this.$http.get("/cms/site").then(result => {
                if(result.success){
                    this.sitedata = result.data;
                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        grant(){
            this.$http.get("/$admin/depts/tree",{
                params:{
                    query: JSON.stringify({key:'getDeptTree'})
                }
            }).then(result => {
                if(result.success){
                    this.deptdata = result.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            this.grantmodal=true;
        }
    },
    mounted(){
        this.getSites();
    },

    
}
</script>

<style>
    .faviconCss{
        position: relative;
        left: 26px;
        bottom: 60px;
    }
</style>
