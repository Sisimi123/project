<!-- 渔船基层管理组织专项库 -->
<style lang="less" scoped>
        @import "../../../styles/commonStyle.less";
    </style>
    <template>
    <div>
        <Row>
                <data-table 
                    ref="test" 
                    :withTree="true" 
                    :useZtree="false"
                    :treeParams="cities"
                    :treeUrl="'/$admin/depts/authtree'" 
                    @on-select-change="selectTreeChange"
                    
                    :url="'/shiparchives/management/database/page'" 
                    :params="query" 
                    :columns="columns" 
                    @on-row-dblclick="handleEdit"
                >
                    <div slot="search">
                        <Form :label-width="142" @submit.native.prevent>
                            <Row>
                                <Col span="8">
                                    <Form-item label="渔船基层管理组织名称:">
                                        <Input v-model="query.wheres.ycjcglmc"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="float:right;text-align:right;">
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
                                </Col>
                                <div class="btn-wrap">
                                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                    <Button @click="handleReset()"  >重置</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </data-table>
        </Row>
        <!--新增/修改-->
        <Modal :styles="{top: '220px'}" v-model="pmodel" :title="title" width="50%" :mask-closable="maskclosable">
            <Form  :label-width="165" ref="dataInfo" :model="dataInfo" :rules="ruleValidate">
                <Row >
                    <Col span="12">
                        <FormItem label="渔船基层管理组织名称:" prop="ycjcglmc">
                            <Input v-model="dataInfo.ycjcglmc" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="社会信用代码/注册号:" prop="xydm">
                            <Input v-model="dataInfo.xydm" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="负责人:" prop="head">
                            <Input v-model="dataInfo.head" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="联系方式:" prop="phone">
                            <Input v-model="dataInfo.phone" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="联系地址:" prop="address">
                            <Input v-model="dataInfo.address" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="备注:">
                            <Input v-model="dataInfo.note" :maxlength="maxNum"/>
                        </FormItem>
                    </Col>
                </Row>             
            </Form>	
            <div slot="footer">
                <Button @click="pmodel = false">取消</Button>
                <Button type="info" @click="saveData('dataInfo')">保存</Button>
            </div>        
        </Modal>
    </div>
    </template>       
    <script>
    import {isNull } from '@/libs/common.js'
    import ztree from './ztree.vue'
    import user from '@/store/module/user.js';
    var uid=user.state.userInfo.userId;
    export default {
        name: "yjgzzk",
        components:{
            ztree,
        },
        data() {
            return {  
                maxNum:255,
                cities:{
                    containOrgan:false
                },
                title:"", 
                status:{
                    treeLoading:true,
                },
                maskclosable:false,
                ruleValidate: {
                    xsj: [
                            { required: true, message: '请输入县(市、区)', trigger: 'blur' }
                        ],
                    xzjd: [
                        { required: true, message: '请输入乡镇(街道)', trigger: 'blur' }
                    ],
                    ycjcglmc: [
                        { required: true, message: '请输入渔船基层管理组织名称', trigger: 'blur' }
                    ],
                    xydm: [
                        { required: true, message: '请输入社会信用代码/注册号', trigger: 'blur' }
                    ],
                    head: [
                        { required: true, message: '请输入负责人', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true,type:'number', message: '请输入联系方式', trigger: 'blur' ,transform(value){
                            return Number(value);
                        }}
                    ],
                    address: [
                        { required: true, message: '请输入联系地址', trigger: 'blur' }
                    ],
                    note: [
                        { required: true, message: '请输入备注', trigger: 'blur' }
                    ],
                },       
                dataInfo:{            
                    xsj:"",//县(市、区)
                    xzjd:"",//乡镇(街道)
                    ycjcglmc:"",//渔船基层管理组织名称
                    xydm:"",//统一社会信用代码/注册号
                    head:"",//负责人
                    phone:"",//联系方式
                    address:"",
                    note:"",
                    parentId:"",
                    deptname:"",
                },
                totalNum: 0,//总条数
                query: {
                    page: 1,
                    size: 10,
                    key:"getBasicManagementDataBasePage",
                    wheres: {                
                        path:"",
                        ycjcglmc:""
                    }, 
                },
                id:"",
                pmodel:false,
                dataList: [], //表格中的数据集合  
                columns: [//表头 直接变量传值
                    {
                        title: "序号",
                        type: "index",//序号展示
                        width:70
                    },
                    {
                        title: "渔船基层管理组织名称",
                        key: "ycjcglmc",
                        width:160
                    },
                    {
                        title: "统一社会信用代码/注册号",
                        key: "xydm",
                        width:180
                    },
                    {
                        title:"负责人",
                        key:"head",
                        minWidth:100
                    },
                    {
                        title:"联系方式",
                        key:"phone",
                        minWidth:100
                    },
                    {
                        title:"联系地址",
                        key:"address",
                        ellipsis:true,
                        minWidth:100
                    },
                    {
                        title:"所属区域",
                        key:"deptname",
                        ellipsis:true,
                        minWidth:100
                    },
                    // {
                    //     title:"备注",
                    //     ellipsis:true,
                    //     key:"note",
                    // },
                    {
                        title: "操作",
                        width:150,
                        key: "id",
                        render: (h, params) => {
                            var id = params.row.id;
                            var _self=this;
                            var temp = [];
                            // console.log(params.row.creatorId);
                            // console.log(params.row.creatorId,uid,"测试",params.row.creatorId==uid);
                            if(params.row.creatorId==uid){
                                temp.push(
                                    h("Button",
                                        {
                                            props: {
                                            type: "primary",
                                            size: "small"
                                            },
                                            on:{
                                                click:()=>{
                                                    _self.editData(id);
                                                    console.log(params);
                                                }
                                            }                       
                                        },"编辑"),
                                    h("Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small"
                                            },
                                            style: {
                                                marginLeft: "10px"
                                            },
                                            on: {
                                                click: () => {
                                                    _self.remove(id);                    
                                                }
                                            }
                                        },"删除"),
                                );
                            }else{
                                temp.push(
                                    h("Button",
                                        {
                                            props: {
                                            type: "dashed",
                                            size: "small",
                                            disabled:true
                                            },
                                            on:{
                                                click:()=>{
                                                   
                                                }
                                            }                       
                                        },"编辑"),
                                    h("Button",
                                        {
                                            props: {
                                                type: "dashed",
                                                size: "small",
                                                disabled:true
                                            },
                                            style: {
                                                marginLeft: "10px"
                                            },
                                            on: {
                                                click: () => {
                                                                        
                                                }
                                            }
                                        },"删除"),
                                );
                            }
                            return h("div", temp);
                        }
                    },                   
                ],
                nodes:[],
                path:"",
                deptname:"",
            };
        },     
        mounted() {
            this.initSearch();
        },
        computed:{
        },
        methods: {
            initSearch() {
                this.query.wheres.path=this.path;
                this.$refs.test.initSearch();
            },
            handleReset() {
                for (let key in this.query.wheres) {
                    this.query.wheres[key] = "";
                }
                this.query.page = 1;
                this.query.size = 10;
                this.initSearch();
            },
            //左侧
            selectTreeChange(treeNode){
                this.id=treeNode[0].id;
                this.path=treeNode[0].path;
                this.nodes=treeNode;
                this.deptname=treeNode[0].title;
                this.initSearch();
            },
            newAdd(){
                if(this.nodes.length==0){
                    this.$Message.error("请选择所属区域");
                    return ;
                }
                this.title="新增";
                this.$refs["dataInfo"].resetFields();
                this.pmodel=true;
                this.dataInfo={};
            },
            //修改 编辑页面信息
            editData(id){
                this.title="编辑";
                this.$refs["dataInfo"].resetFields();
                var _self=this;
                _self.$http.get("/shiparchives/management/database/"+id)
                .then(res=>{
                    if(res.success){
                        _self.dataInfo=res.data;
                        _self.pmodel=true;
                    }
                })
            },
            handleEdit(msg){
                this.editData(msg.id);
            },
            zhengCeYanZheng(v){
                var number=/^[0-9]{0,}$/;
                var bool=number.test(v);
                return bool;
            },
            //新增/修改
            saveData(name){
                var _self=this;
                _self.dataInfo.parentId=_self.id;
                _self.dataInfo.deptname=_self.deptname;
                var dataInfo=_self.dataInfo;
                if((dataInfo.xydm!=undefined) && !(_self.zhengCeYanZheng(dataInfo.xydm))){
                    _self.$Message.error("请输入正确的社会信用代码/注册号格式");
                    return ;
                }
                if((dataInfo.phone!=undefined) && !(_self.zhengCeYanZheng(dataInfo.phone))){
                    _self.$Message.error("请输入正确的联系方式格式");
                    return ;
                }
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(isNull(dataInfo.id)){
                            _self.$http.post("/shiparchives/management/database",dataInfo)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    _self.pmodel=false;
                                    _self.$Message.success('新增成功!');
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                        }else{
                            _self.$http.patch("/shiparchives/management/database/"+dataInfo.id,dataInfo)
                            .then(res=>{
                                if(res.success){
                                _self.initSearch();
                                _self.pmodel=false;
                                _self.$Message.success('修改成功!');
                                }
                            })
                            .catch(err=>{
                                console.log(err);
                            });
                        }
                    }else{
                        this.$Message.error('失败!');
                    }
                })    
            },
            //删除
            remove(id){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除当前列表项吗？",
                    onOk:function(){
                        _self.$http.delete("/shiparchives/management/database/"+id).then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功!');
                            }else{
                                _self.$Message.info(result.msg);
                            }
                        });
                    
                    }
                });
            }, 
        }
    };
    </script>
    <style scoped>
    .leftTree{
        width:100%;
        height:526px;
        overflow-y:scroll;
        overflow-x:hidden;
    }
    #page div.ivu-page-options-elevator input{
        padding:1px 0px;
    }
    </style> 
            











