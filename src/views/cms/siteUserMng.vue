<style lang="less" scoped>
    @import '../../styles/common.less';
</style> 
<template>
    <div>
        <Row>
            <data-table ref="test" 
                :url="'/jeecms/admin/list'" 
                :params="query" 
                :columns="columns"
                @on-row-dblclick="dbhandleEdit"
                >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="4">
                                <Form-item label="用户名:">
                                    <Input v-model="query.key"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
        <!-- 新增/编辑 -->
        <Modal v-model="addUpModal" :styles="{top: '165px'}" :title="title" width="450" :mask-closable="maskclosable">
            <Form :label-width="62" :model="newAddParams" ref="newAddParams" :rules="rules" @submit.native.prevent>
                <Row>
                    <Col span="24" v-show="readonly"style="margin:-10px 0px;">
                        <Form-item label="用户名:" prop="username">
                            <Input placeholder="请输入..." v-model="newAddParams.username">
                                <span slot="append" @click="checkUser()">查询</span>
                            </Input>
                        </Form-item>
                    </Col>
                    <Col span="24" v-show="!readonly" style="margin:-10px 0px;">
                        <Form-item label="用户名:" prop="username">
                            <Input placeholder="请输入..." v-model="newAddParams.username" readonly></Input>
                        </Form-item>
                    </Col>
                    <Col span="24"style="margin:-5px 0px;">
                        <Form-item label="会员组:" prop="groupId">
                            <Select v-model="newAddParams.groupId">
                                <Option v-for="(item,i) in copyParams.groups" :value="item.id" :key="i">{{item.name}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="24"style="margin:-10px 0px;">
                        <Form-item label="站点:">
                            <CheckboxGroup  v-model="newAddParams.siteIds">
                                <Checkbox v-for="(item,i) in copyParams.sites" :label="item.id" :key="i">{{item.name}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </Col>
                    <Col span="24"style="margin:-10px 0px;">
                        <Form-item label="角色:">
                            <CheckboxGroup  v-model="newAddParams.roleIds">
                                <Checkbox v-for="(item,i) in copyParams.roles" :label="item.id" :key="i">{{item.name}}</Checkbox>
                            </CheckboxGroup>
                        </Form-item>
                    </Col>
                    <Col span="24"style="margin:-10px 0px -35px;">
                        <Form-item label="受限管理员:" :label-width="98">
                           <Checkbox v-model="newAddParams.selfAdmin">是</Checkbox>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button v-show="btnShow" @click="addUpModal = false">取消</Button>
                <Button v-show="btnShow" type="info" @click="saveData('newAddParams')">保存</Button>
                <Button v-show="!btnShow" type="info" @click="addUpModal = false">关闭</Button>
            </div>
        </Modal>
        <!-- 用户信息 -->
        <Modal v-model="userselectShow" :styles="{top: '165px'}" title="用户选择" width="450" :mask-closable="maskclosable">
            <div style="width:100%;max-height:370px;overflow: auto;">
                <Tree ref="userTree" :data="filterTree" empty-text="加载中..."	 @on-select-change="treeSelectChange"></Tree>
            </div>
            <div slot="footer">
                <Button @click="cancel()">取消</Button>
                <Button type="info" @click="userselectShow=false">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    // http://192.168.2.170:4999/web/#/item/index
import userselectModal from '@/views/components/workflow/userselectModal.vue'
import {isNull,isEmpty} from '../../libs/common'
export default {
    name: 'siteUserMng',
    components: {
        userselectModal,
    },
    data () {
        return {
            userselectShow:false,
            btnShow:true,
            maskclosable:false,
            addUpModal:false,
            title:"",
            rules:{
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }   
                ],
                groupId: [
                    { required: true,type:'number', message: '会员组不能为空', trigger: 'blur',transform(value){
                        return Number(value);
                    } }   
                ],
            },
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title: '用户名',
                    align: 'center',
                    key: 'username'
                },
                {
                    title: '角色',
                    align: 'center',
                    key: 'roleNames',
                    render:(h,params)=>{
                        var roles=params.row.roleNames;
                        return h("div",roles.join(","));
                    }
                },
                {
                    title: '站点',
                    align: 'center',
                    key: 'sites',
                    render:(h,params)=>{
                        var sites=params.row.sites;
                        var str=[];
                        for(var i=0;i<sites.length;i++){
                            str.push(sites[i].name);
                        }
                        return h("div",str.join(","));
                    }
                },
                {
                    title: '是否受限',
                    align: 'center',
                    key: 'selfAdmin',
                    maxWidth:200,
                    render:(h,params)=>{
                        if(params.row.selfAdmin){
                            return h("div","是");
                        }else{
                            return h("div","否");
                        }
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width:200,
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var temp = [];
                        temp.push(
                            h("Button",
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                on:{
                                    click:()=>{
                                        _self.handleEdit(params.row);
                                    }
                                }                       
                            },"编辑"));
                        temp.push(
                            h("Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style:{
                                    marginLeft:"10px"
                                },
                                on:{
                                    click:()=>{
                                        _self.delete(id);
                                    }
                                }                       
                            },"删除"));
                        return h("div", temp);
                    }
                },
            ],
            query:{
                page:1,
                size:20,
                key:"",//用户名，模糊查询
                wheres:{},
            },
            newAddParams:{
                username:"",//用户名
                selfAdmin:false,//受限管理员
                groupId:1,//会员组id
                siteIds:[],//站点id数组
                roleIds:[],//角色id数组
            },
            copyParams:{},
            filterTree:[],
            readonly:true,
        }
    },
    computed:{  
    },
    methods: {
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            this.query.key="";
            this.query.page = 1;
            this.query.size = 20;
            this.initSearch();
        },
        treeSelectChange(nodes){
            if(nodes.length>0){
                var node=nodes[0];
                if(!isNull(node.children)&&node.children.length>0){
                    this.$Message.info("请选择用户名！");
                    return;
                }
            }
            this.newAddParams.username=nodes[0].title;
        },
        checkUser(){
            this.loadUserTree();
        },
        cancel(){
            this.newAddParams.username="";
            this.userselectShow=false;
        },
        newAdd(){
            this.title="新增";
            this.readonly=true;
            this.newAddParams={};
            this.newAddParams={
                username:"",//用户名
                selfAdmin:false,//受限管理员
                groupId:1,//会员组id
                siteIds:[],//站点id数组
                roleIds:[],//角色id数组
            },
            this.$refs["newAddParams"].resetFields();
            this.getSelectMsg();
            this.addUpModal=true;
        },
        getSelectMsg(){
            this.$http.get("/jeecms/admin/select")
            .then(res=>{
                if(res.success){
                    this.copyParams={};
                    this.copyParams=res.data;
                }
            });
        },
        dbhandleEdit(msg){
            this.handleEdit(msg);
        },
        handleEdit(row){
            this.title="编辑";
            this.readonly=false;
            this.getSelectMsg();
            this.newAddParams={};
            this.$refs["newAddParams"].resetFields();
            var obj=JSON.parse(JSON.stringify(row));
            var siteIds=[];
            for(var i=0;i<obj.sites.length;i++){
                siteIds.push(obj.sites[i].id);
            }
            this.newAddParams={
                id:obj.id,
                username:obj.username,
                selfAdmin:obj.selfAdmin,
                groupId:obj.groupid,
                siteIds:siteIds,
                roleIds:obj.roleIds,
            };
            this.addUpModal=true;
        },
        delete(id){
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除此站点管理员吗？",
                onOk:function(){
                    _self.$http.delete("/jeecms/admin/"+id)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("删除成功");
                            _self.initSearch();
                        }else{
                            _self.$Message.info("删除失败");
                        }
                    });
                }
            });
        },
        saveData(name){
            var _self=this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    if(_self.newAddParams.id==undefined || _self.newAddParams.id==null){
                        _self.$http.post("/jeecms/admin",_self.newAddParams)
                        .then(res=>{
                            if(res.success){
                                _self.$Message.info("新增成功");
                                _self.initSearch();
                                _self.addUpModal=false;
                            }else{
                                _self.$Message.error(res.msg);
                            }
                        });
                    }else{
                        _self.$http.patch("/jeecms/admin",_self.newAddParams)
                        .then(res=>{
                            if(res.success){
                                _self.$Message.info("编辑成功");
                                _self.initSearch();
                                _self.addUpModal=false;
                            }else{
                                _self.$Message.error(res.msg);
                            }
                        });
                    }
                }
            });
        },
        loadUserTree(){
            var _self=this;
            _self.$http.get("/$admin/users/selectUserList").then(function(result){
                if(result.success){
                   _self.filterTree=result.data;
                   _self.userselectShow=true;
                }
            });
        }
    },
    mounted() {
    },
};
</script>