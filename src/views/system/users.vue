<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <div>
            <Row>
                <Col span="5" class="height-100" >
                    <Card class="MainLeftCard" :style="'height:'+(clientHeight-113)+'px'">
                        <p slot="title">
                            <Icon type="ios-home"></Icon>
                            组织机构
                        </p>
                        <Row>
                            <div class="LeftCardBody" :style="'height:'+(clientHeight-165)+'px'">
                                <div class="LeftCardHead">
                                    <Input v-model="treeSearch" icon="ios-search" size="small"></Input>
                                </div>
                                <div class="LeftCardContent" >
                                    <Tree ref="deptTree" :data="filterTree" @on-select-change="deptSelect" ></Tree>
                                </div>
                            </div>
                        </Row>
                    </Card>
                </Col>
                <Col span="19" class="padding-left-6">
                    <Card>
                        <Row>
                            <Input v-model="query.wheres.name_like" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            <Select v-model="statusColumn" @on-change="changeColumn" placeholder="请选择..." style="width: 100px">
                                <Option value="1">就职</Option>
                                <Option value="2">挂职</Option>
                            </Select>
                            <Checkbox v-if="statusColumn == 1" v-model="subDept" @on-change="changeSubDept">子部门</Checkbox>
                            
                            <div style="float:right">
                                <Button type="info" @click="newUserInfo">新增用户</Button>
                                <Button type="primary" @click="editUserInfo">修改用户</Button>
                                <Button type="success" @click="moveUser">人事调动</Button>
                                <Button type="warning" @click="addUserRole">角色授权</Button>
                                <!-- <Button type="info" style="background-color:#9900FF;color:white" @click="addUserDepts">用户挂职</Button> -->
                                <Button type="warning" style="background-color:pink+8000;color:white" @click="getUserDept" >主管部门</Button>
                                <Button type="error" @click="deleteUserInfo" >删除用户</Button>
                                <Button type="primary" @click="userConfig">用户配置</Button>
                            </div>
                        </Row>
                        <Row class="margin-top-5">
                            <Table ref="userTable" :height="clientHeight-223" size="small" border :columns="currentColumn" :data="dataList" @on-selection-change="selectChange"></Table>
                        </Row>
                        <Row class="margin-top-5">
                            <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="userConfigModal" title="用户配置" :mask-closable=false width="620">
            <Form ref="userInfo" :model="userInfo" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="执法号:">
                            <Input v-model="userInfo.ext.code" placeholder="请输入姓名..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="执法部门:">
                            <Input v-model="userInfo.ext.department" placeholder="请输入姓名..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="主管救助机构:" :label-width="100">
                            <Input v-model="userInfo.organName" placeholder="请输入姓名...">
                                <Button slot="append" @click="chooseId">选择</Button>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="userConfigModal=false">取消</Button>
                <Button type="primary" @click="saveUserInfoConfig">保存</Button>
            </div>
        </Modal>
        <Modal v-model="userModal" :title="isNew?'新增用户':'编辑用户'" :mask-closable=false width="620">
            <Form ref="userInfo" :model="userInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="19">
                        <Row>
                            <Col span="12">
                                <FormItem label="真实姓名:" prop="name">
                                    <Input v-model="userInfo.name" placeholder="请输入姓名..."></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="性别:" :label-width="100" prop="sex">
                                    <RadioGroup v-model="userInfo.sex" type="button">
                                        <Radio label="1">男</Radio>
                                        <Radio label="0">女</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="登录名:" prop="username">
                                    <Input v-model="userInfo.username" placeholder="请输入姓名..." :readonly="!isNew"></Input>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="通讯录:" :label-width="100">
                                    <RadioGroup v-model="userInfo.contact" type="button">
                                        <Radio label="1">显示</Radio>
                                        <Radio label="0">隐藏</Radio>
                                    </RadioGroup>
                                </FormItem>
                            </Col>
                            <!-- <Col span="12">
                                <FormItem label="排序:" :label-width="100">
                                    <Input v-model="userInfo.sort" placeholder="请输入排序..." ></Input>
                                </FormItem>
                            </Col> -->
                        </Row>
                    </Col>
                    <Col span="5" style="text-align:center">
                        <MyUpload action="/$admin/attachs"
                            :data="uploadData"
                            :on-success="uploadSuccess" >
                            <img style="width: 90%;max-width: 100px;height: auto;" :src="userPhoto"/>
                        </MyUpload>
                        <!-- <IconUpload v-model="userInfo.photo" moduleId="modules" action="edit" :width="120" :height="110" style="margin-left:5px;">
                            <div slot="upload" style="height:110px;padding-top:20px">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>请上传头像！</p>
                            </div>
                        </IconUpload> -->
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="密码:" prop="password">
                            <Input v-model="userInfo.password" type="password" placeholder="请输入密码..."></Input>
                        </FormItem>
                        
                    </Col>
                    <Col span="12">
                        <FormItem label="手机号:" prop="mobile">
                            <Input v-model="userInfo.mobile" placeholder="请输入手机号..."></Input>
                        </FormItem>
                        
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="职位:">
                            <Input v-model="userInfo.position" placeholder="请输入职位..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="办公电话:">
                            <Input v-model="userInfo.telephone" placeholder="请输入办公电话..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                
                <FormItem label="备注:">
                    <Input v-model="userInfo.note" type="textarea" placeholder="请输入备注..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="userModal=false">取消</Button>
                <Button type="primary" @click="saveUserInfo">保存</Button>
            </div>
        </Modal>

        <Modal v-model="userDeptModal" title="人事调动" :mask-closable=false width="320">
            <div style="height:300px;overflow-y:auto">
                <Tree ref="userDeptTree" :data="userDeptTree"></Tree>
            </div>
            <div slot="footer">
                <Button @click="userDeptModal=false">取消</Button>
                <Button type="primary" @click="updateUserDept">保存</Button>
            </div>
        </Modal>

        <Modal v-model="userDeptsModal" :mask-closable="true"  width="450">
            <h3 slot="header" style="color:#2D8CF0;margin-left:5px">用户挂职</h3>
            <Row>
                <Col span="24" >
                    <div style="height:250px;overflow-y:auto;border:1px solid #FFF">
                        <Tree :multiple="false" @on-select-change="selectDept" ref="userDeptsTree" :data="filterUserDeptsTree" empty-text="数据加载中。。。"></Tree>
                    </div>
                </Col>
            </Row>
            <div slot="footer">
                <Button @click="userDeptsModal=false">关闭</Button>
                <!-- <Button type="primary" @click="saveUserDeptsInfo()" style="margin-right: 8px">保存</Button> -->
            </div>
        </Modal>    
        </Modal>

        <Modal v-model="userRoleModal" title="角色授权" :mask-closable=false width="600">
            <Transfer
                :titles="['所有角色','拥有角色']"
                :list-style="{'width':'250px','height':'300px'}"
                :data="userRoles.roles"
                :target-keys="userRoles.keys"
                :render-format="userRoleRender"
                @on-change="userRoleChange"></Transfer>
            <div slot="footer">
                <Button @click="userRoleModal=false">取消</Button>
                <Button type="primary" @click="updateUserRole">保存</Button>
            </div>
        </Modal>
        <!-- _tp -->
        <Modal v-model="siteDeptModal" title="主管部门" :mask-closable=false width="350" >
            <Col>
                <Row>
                    <div style="height:420px;overflow:auto;">
                        <div>
                            <Input v-model="authTreeSearch" icon="ios-search" size="small"></Input>
                        </div>
                        <div>
                            <Tree ref="authTree"  :data="filterAuthTree" @on-check-change="userAuth"  @on-select-change="userAuth"></Tree>
                        </div>
                    </div>
                </Row>
            </Col>
            <div slot="footer">
                <Button @click="siteDeptModal=false">取消</Button>
                <Button type="primary" @click="updateUserAuth">保存</Button>
            </div>
        </Modal>
        <Modal v-model="bangDingModal" title="部门列表" width="320">
            <div style="height:300px;overflow-y:auto">
                <Tree :data="userDeptsTree2" @on-select-change="onselectchange"></Tree>
            </div>
            <div slot="footer">
                <Button @click="getSelect()" type="primary">确定</Button>
                <Button @click="bangDingModal=false">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue';
import IconUpload from '../components/Upload/IconUpload.vue';
import { isNull,isEmpty } from '../../libs/common';
export default {
    name: 'SystemUser',
    components: {
        MyUpload,
        IconUpload
    },  
    data () {
        return {
            bangDingModal: false,
            userDeptsTree: [],
            statusColumn:"1",
            siteRoleModal:false,
            siteDeptModal:false,
            search:"",
            treeSearch:"",
            authTreeSearch:" ",
            deptTree: [],
            authTree: [],
            columnList: [
                {   
                    title:'序号',
                    type: 'selection',
                    width: 58,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '登录名',
                    width: 120,
                    align: 'center',
                    key: 'username'
                },
                {
                    title: '姓名',
                    width: 120,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    width: 180,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '所属部门',
                    align: 'center',
                    key: 'deptname'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 75,
                    align: 'center',
                    render: (h, params) => {
                        var flag=params.row.status==1;
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: flag?'success':'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.lockUser(params,flag);
                                    }
                                }
                            }, flag?'锁定':'解锁')
                        ]);
                    }
                }
            ],
            userDeptsTree2: [],
            currentColumn:[],
            columnList2: [
                {   
                    title:'序号',
                    type: 'selection',
                    width: 58,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '登录名',
                    width: 120,
                    align: 'center',
                    key: 'username'
                },
                {
                    title: '姓名',
                    width: 120,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    width: 180,
                    align: 'center',
                    key: 'createTime'
                },  
                {
                    title: '挂职部门',
                    align: 'center',
                    key: 'deptname'
                },

                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        var flag=params.row.status==1;
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: flag?'success':'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.lockUser(params,flag);
                                    }
                                }
                            }, flag?'锁定':'解锁'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.dismissal(params.row.dataId);
                                    }
                                }
                            }, '撤职')
                        ]);
                    }
                }
            ],
            columnList: [
                {   
                    title:'序号',
                    type: 'selection',
                    width: 58,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '登录名',
                    width: 120,
                    align: 'center',
                    key: 'username'
                },
                {
                    title: '姓名',
                    width: 120,
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '创建时间',
                    width: 180,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '所属部门',
                    align: 'center',
                    key: 'deptname'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 75,
                    align: 'center',
                    render: (h, params) => {
                        var flag=params.row.status==1;
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: flag?'success':'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.lockUser(params,flag);
                                    }
                                }
                            }, flag?'锁定':'解锁')
                        ]);
                    }
                }
            ],
            dataList: [],
            dataTotal:0,
            query:{
                key:'getPage',
                page:1,
                size:10,
                wheres:{
                    username:"",
                    pathlike:"",
                    patheq:""
                },
                orders:"name asc,createTime desc"
            },
            query2:{
                userId:"",
                deptId:[],
            },
            userSelection:[],
            userModal:false,
            userConfigModal: false,
            isNew:true,
            userInfo:{
                id:"",
                name:"",
                username:"",
                photo:"",
                password:"",
                sex:"1",
                contact:"",
                status:"",
                position:"",
                mobile:"",
                telephone:"",
                sfz:"",
                note:"",
                dept:{
                    id:""
                },
                ext: {
                    code: '',
                    department: '',
                    organId: ''
                }
            },
            ruleValidate: {
                name: [
                    { required: true, message: '姓名不能为空！', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '性别不能为空！', trigger: 'blur' },
                ],
                username: [
                    { required: true, message: '登录名不能为空！', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '密码不能为空！', trigger: 'change' }
                ],
                mobile: [
                    { required: true, message: '手机号不能为空！', trigger: 'change' }
                ],
            },
            deptQuery: {
                // key:'getDeptTree',
                // wheres: {
                //     name:""
                // }
                containOrgan:false,
            },
            subDept: true,
            userDeptModal:false,
            userRoleModal:false,
            userDeptsModal: false,
            selectUserId: "",
            userRoles:{
                roles:[],
                keys:[]
            },
            sitecolumn:[
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '站点名称',
                    key: 'sitename',
                    align: 'center'
                },
            ],
            sitedata:[],
            sietRoleSeletion:[]
        };
    },
    computed:{
        userPhoto(){
            if(!this.userInfo.photo)
                return this.$util.avatar;
            return this.$basePath+"/$admin/attachs/stream/"+this.userInfo.photo;
        },
        uploadData(){
            return {
                moduleId:"SystemUser",
                dataid:this.userInfo.username
            }
        },
        filterTree(){
            var tree=this.$util.deepCopy(this.deptTree);
            return this.$util.diguiTree(tree,this.treeSearch);
        },
        filterUserDeptsTree(){
            var tree=this.$util.deepCopy(this.userDeptsTree);
            return this.$util.diguiTree(tree,"");
        },
        userDeptTree(){
            var tree=this.$util.deepCopy(this.deptTree);
            return this.$util.diguiTree(tree,this.treeSearch);
        },
        filterAuthTree(){
            var tree=this.$util.deepCopy(this.authTree);
            return this.$util.diguiTree(tree,this.authTreeSearch);
        },
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        sitecolumndata(){
            this.sitedata.forEach(item => {
                if(item.status == 1){
                    item._checked = true;
                }else{
                    item._checked = false;
                }
            } )
            return this.sitedata;
        }
    },
    methods: {
        getSelect() {
            var _self = this
            _self.userInfo.organName = _self.diguiUserConfig(_self.userInfo.ext.organId, _self.userDeptsTree2)
            // console.log(_self.userInfo.ext.organId,_self.userInfo.organName, _self.userDeptsTree2)
            _self.bangDingModal = false
        },
        onselectchange(v) {
            var _self = this;
            _self.userInfo.ext.organId = v[0].id;
            // _self.userInfo.organName = _self.diguiUserConfig(v[0].id, _self.userDeptsTree2);
        },
        selectedDept(tree, pId){
          if (isNull(tree) || isEmpty(pId))
              return false;
          for (var i = 0; i < tree.length; i++) {
              var node = tree[i];
              if (node["id"] == pId) {
                  node["expand"] = true;
                  node["selected"] = true;
                  return true;
              }
              if (this.selectedDept(node["children"], pId)) {
                  node["expand"] = true;
                  node["selected"] = false;
                  return true;
              }
          }
          return false;
        },
        chooseId() {
            var _self = this
            self.clickOrganid="";
            _self.$http
            .get("/map/organs/tree")
            .then(res => {
                if(res.success){
                _self.userDeptsTree2 = res.data;
                var tree=_self.$util.deepCopy(_self.userDeptsTree2);
                _self.selectedDept(tree,_self.did);
                if(_self.did){
                    _self.clickOrganid= _self.did
                }
                _self.userDeptsTree2=tree;
                _self.bangDingModal = true;
                }
            });
        },
        saveUserInfoConfig() {
            var _self = this
            var id=_self.userInfo.id
            _self.userInfo.ext = JSON.stringify(_self.userInfo.ext)
            _self.$http.patch("/$admin/users/"+id,_self.userInfo)
            .then(function(result){
                if(result.success){
                    _self.userConfigModal=false;
                    _self.getPageList();
                } else {
                    if (result.msg === "代码不能重复！") {
                        _self.$Message.error("账号名重复！");
                    } else {
                        _self.$Message.error(result.msg);
                    }
                    
                }
            })
        },
        diguiUserConfig (id, items) {
            let result;
            if (!items) {
                return;
            }
            for (var i = 0; i < items.length; i++) {
                let item = items[i];
                if (item.id === id) {
                    result = item.name;
                    break;
                } else if (item.children && item.children.length > 0) {
                    result = this.diguiUserConfig(id, item.children);
                    if (result) return result;
                }
            }
            return result;
        },
        userConfig() {
            var _self = this
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var id=_self.userSelection[0].id;
            _self.$http.get("/$admin/users/"+id).then(function(result){
                if(result.success){
                    if ((result.data.ext) == undefined) {
                        _self.userInfo = result.data;
                         var obj = {
                            code: '',
                            department: '',
                            organId: '',
                        }
                        var str = JSON.stringify(obj);
                        _self.userInfo.ext = JSON.parse(str);
                        _self.userInfo.organName = _self.diguiUserConfig(_self.userInfo.ext.organId,_self.userDeptsTree2)
                         _self.userConfigModal = true
                    }  else {
                    _self.userInfo = result.data;
                    _self.userInfo.ext=JSON.parse(result.data.ext);
                    _self.userInfo.organName = _self.diguiUserConfig(_self.userInfo.ext.organId,_self.userDeptsTree2)
                    _self.userConfigModal = true
                    }
                }
            });
        },
        uploadSuccess(response, file, fileList){
            this.userInfo.photo=response.data.id;
        },
        selectChange(selection){
            this.userSelection=selection;
            this.authTree=JSON.parse(JSON.stringify(this.deptTree));
        },
        newUserInfo(){
            var _self=this;
            var nodes=_self.$refs["deptTree"].getSelectedNodes();
            if(nodes.length!=1){
                _self.$Message.error({
                    content:"请选择一个部门！"
                })
                return;
            }
            _self.isNew=true;
            _self.userInfo={
                sex:"1",
                status:"1",
                contact:"1",
                dept:{
                    id:nodes[0].id
                },
                ext:{
                    code: '',
                    department: '',
                    organId: ''
                }
            };
            _self.userInfo.ext = JSON.stringify(_self.userInfo.ext)
            _self.userModal=true;
        },
        editUserInfo(){
            var _self = this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var id=_self.userSelection[0].id;
            _self.$http.get("/$admin/users/"+id).then(function(result){
                if(result.success){
                    _self.isNew=false;
                    if (!result.data.ext) {
                        var obj = {
                            code: '',
                            department: '',
                            organId: '',
                        }
                        var str = JSON.stringify(obj);
                        _self.userInfo.ext = JSON.parse(str);
                        _self.userModal=true;    
                    } else {
                        _self.userInfo = result.data;
                        _self.userModal=true;
                    }
                }
            });
        },
        deleteUserInfo(){
            var _self = this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            _self.$Modal.confirm({
                title:"提示",
                content:"请确认删除数据",
                onOk(){
                    var id=_self.userSelection[0].id;
                    _self.$http.delete("/$admin/users/"+id).then(function(result){
                        if(result.success){
                            _self.getPageList();
                        }
                    });
                }
            })
            
        },
          saveUserInfo(){
            var _self = this;
            _self.$refs["userInfo"].validate((valid) => {
                if (valid) {
                    if(_self.isNew){
                        _self.$http.post("/$admin/users",_self.userInfo)
                        .then(function(result){
                            if(result.success){
                                if(result.data==null){
                                    _self.$Message.error("账号名或手机号重复！");
                                }else{
                                    _self.userModal=false;
                                    _self.getPageList();
                                }
                            } else {
                                if (result.msg === "代码不能重复！") {
                                    _self.$Message.error("账号名或手机号重复！");
                                } else {
                                    _self.$Message.error(result.msg);
                                }                                
                            }
                        })
                    }else{
                        var id=_self.userInfo.id;
                        _self.$http.patch("/$admin/users/"+id,_self.userInfo)
                        .then(function(result){
                            if(result.success){
                                if(result.data==null){
                                    _self.$Message.error("账号名或手机号重复！");
                                }else{
                                    _self.userModal=false;
                                    _self.getPageList();
                                }
                            } else {
                                if (result.msg === "代码不能重复！") {
                                    _self.$Message.error("账号名或手机号重复！");
                                } else {
                                    _self.$Message.error(result.msg);
                                }
                                
                            }
                        })
                    }
                }
            });
        },
        moveUser(params){
            var _self = this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            this.userDeptModal=true;

        },

    // _tp
        getUserDept(){
            var _self=this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var userId=_self.userSelection[0].id;
            _self.$http.get("/$admin/users/auth/"+userId)
            .then(function(result){
                if(result.success){
                    // 获取已有权限
                    var res=result.data;
                    var j=JSON.stringify(_self.deptTree);
                    for(var x in res){
                        j=j.replace("\""+res[x].deptId+"\"","\""+res[x].deptId+"\",\"checked\":true")
                    }
                    _self.authTree=JSON.parse(j);
                    _self.authTreeSearch="";
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            _self.siteDeptModal = true;
        },
        updateUserDept(){
            var _self = this;
            var nodes=_self.$refs["userDeptTree"].getSelectedNodes();
            if(nodes.length!=1){
                _self.$Message.error({
                    content:"请选择一个部门！"
                })
                return;
            }
            var deptId=nodes[0].id;
            var userId=_self.userSelection[0].id;
            _self.$http.patch("/$admin/users/"+userId+"/depts/"+deptId)
            .then(function(result){
                if(result.success){
                    _self.getPageList();
                    _self.userDeptModal=false;
                }
                _self.$Message.info({content:result.msg});
            })
        },
        lockUser(params,flag){
            var _self=this;
            var row=params.row
            _self.$Modal.confirm({
                title:"提示",
                content:flag?"请确认是否锁定用户？":"请确认是否解锁用户？",
                onOk:function(){
                    _self.$http.patch("/$admin/users/"+row.id,{
                        status:flag?0:1
                    })
                    .then(function(result){
                        if(result.success){
                            row.status=result.data.status;
                        }
                    })
                }
            })
        },
        addUserRole(){
            var _self=this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var id=_self.userSelection[0].id;
            _self.$http.get("/$admin/roles/list")
                .then(function(result){
                    if(result.success){
                        _self.userRoles.roles=result.data;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            _self.$http.get("/$admin/users/"+id+"/roles")
                .then(function(result){
                    if(result.success){
                        _self.userRoles.keys=result.data;

                    }
                }).catch(function (error) {
                    console.log(error);
                });
            _self.userRoleModal=true;
        },
        // 用户撤职
        dismissal(id){
            this.$Modal.confirm({
                    title:"提示",
                    content:"确定要将'"+ this.userSelection[0].name + "'撤职吗？",
                    onOk: () => {
                        this.$http
                            .patch("/$admin/users/dismissal/"+id)
                            .then(result => {
                                this.getPageList();
                            })
                            .catch(error =>{
                                console.log(error);
                            });
                    },
                });
            
        },
        // 用户挂职
        selectDept(node){
            console.log(node);
            if(node.length == 1){
                this.$Modal.confirm({
                    title:"提示",
                    content:"确定要将'"+ this.userSelection[0].name + "'挂职到'" + node[0].title + "'吗？",
                    onOk: () => {
                        this.saveUserDeptsInfo();
                    },
                });
            }
        },
        // 用户挂职
        addUserDepts(){
            if(this.userSelection.length != 1){
                this.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var id = this.userSelection[0].id;
            this.$http
                // .get("/$admin/users/"+id+"/deptTree")
                .get("/$admin/depts/depstree")
                .then(result => {
                    this.userDeptsTree = result.data;
                    this.userDeptsModal=true;
                })
                .catch(error =>{
                    console.log(error);
                });

            this.$http.get("/$admin/users/"+id).then(result =>{
                if(result.success){
                    this.userInfo=result.data;
                }
            });
        },
        // 用户挂职
        saveUserDeptsInfo(){
            this.userDeptsModal = false;
            // var depts = this.$refs["userDeptsTree"].getCheckedNodes();
            var depts = this.$refs["userDeptsTree"].getSelectedNodes();
            var deptIds = [];
            for(var i=0;i<depts.length;i++)
                deptIds.push(depts[i].id);

            var model={entity:this.userInfo,params:{deptIds:deptIds}};
            this.$http
                .patch("/$admin/users/workon/" + this.userInfo.id, model)
                .then(result => {
                    if(result.success){
                        this.$Message.info("操作成功");
                    }
                })
                .catch(error =>{
                    console.log(error);
                });

        },
        addSiteRole(){
            var _self=this;
            if(_self.userSelection.length!=1){
                _self.$Message.error({
                    content:"请选择一条用户数据"
                });
                return;
            }
            var id=_self.userSelection[0].id;
            _self.$http.get("/cms/siterole/"+id)
            .then(function(result){
                if(result.success){
                    _self.sitedata=result.data;
                }
            }).catch(function (error) {
                console.log(error);
            });

            _self.siteRoleModal = true;
        },
        updateSiteRole(){
            var _self=this;
            var id=_self.userSelection[0].id;
            _self.$http.post("/cms/siterole/"+id,_self.sietRoleSeletion)
            .then(function(result){
                if(result.success){
                   _self.$Message.info("保存成功");
                }else{
                    _self.$Message.info(result.msg);
                }
            }).catch(function (error) {
                console.log(error);
            });
            _self.siteRoleModal = false;
            
        },
        updateUserAuth(){
            var _self=this;
            var userId=_self.userSelection[0].id;
            var deptId=JSON.stringify(_self.query2.deptId);
            if(deptId.length<8){_self.query2.deptId=["null"]}
            _self.$http.patch("/$admin/users/"+userId+"/auths/"+_self.query2.deptId)
            .then(function(result){
                if(result.success){
                    _self.siteDeptModal=false;
                }
                _self.$Message.info({content:result.msg});
            }).catch(function (error) {
                console.log(error);
            });
        },
        siteRoleChange(selection){
            this.sietRoleSeletion = selection;
        },
        userRoleRender(item){
            return item.name;
        },
        userRoleChange(targetKeys, direction, moveKeys){
            var keys= this.$util.deepCopy(this.userRoles.keys);
            if(direction=="right"){
                for(var i=0;i<moveKeys.length;i++){
                    keys.push(moveKeys[i]);
                }
            }else if(direction=="left"){
                for(var i=0;i<moveKeys.length;i++){
                    for(var j=0;j<keys.length;j++){
                        if(moveKeys[i]==keys[j]){
                            delete keys[j];
                            break;
                        }
                    }
                }
            }
            this.userRoles.keys = keys;
        },
        updateUserRole(){
            var _self=this;
            var id=_self.userSelection[0].id;
            var roleIds=_self.userRoles.keys.join();
            let params=new URLSearchParams();
            params.append("roleIds",roleIds);
            _self.$http.patch("/$admin/users/"+id+"/roles",params)
            .then(function(result){
                if(result.success){
                    _self.userRoleModal=false;
                }
                _self.$Message.info({content:result.msg});
            }).catch(function (error) {
                console.log(error);
            });
        },
        handleSearch(){
            this.query.page=1;
            this.getPageList();
        },
        pageChange(page){
            this.query.page=page;
            this.getPageList();
        },
        pageSizeChange(size){
            this.query.size=size;
            this.getPageList();
        },
        changeColumn(value){
            if(value == "1"){
                this.currentColumn = this.columnList;
            } else {
                this.currentColumn = this.columnList2;
            }

            if(isNull(this.query.wheres.pathlike) && isNull(this.query.wheres.patheq)){
                this.$Message.info("请选择组织机构！");
            }
            this.getPageList(value);
        },
        changeSubDept(flag){
            var _self=this;
            if(flag){
                _self.query.wheres.pathlike=_self.query.wheres.patheq;
                _self.query.wheres.patheq="";
            }else{
                _self.query.wheres.patheq=_self.query.wheres.pathlike;
                _self.query.wheres.pathlike="";
            }
            _self.getPageList();
        },
        deptSelect(node){
            console.log(node,"node");
            if(node.length === 0){
                return;
            }

            var _self=this;
            var n=node[0];
            if(_self.subDept){
                _self.query.wheres.pathlike=n.path;
                _self.query.wheres.patheq="";
            }else{
                _self.query.wheres.pathlike="";
                _self.query.wheres.patheq=n.path;
            }
            this.query.page = 1;
            _self.getPageList();
        },
        userAuth(node){
            var _self=this;
            var id=_self.userSelection[0].id;
            var select = new Array();
            for ( var i = 0; i <node.length; i++){
                select.push(node[i].id);
            }
            _self.query2.userId=id;
            _self.query2.deptId=select;
        },
        getPageList(){
            var _self=this;
            _self.$http.get("/$admin/users/page",{
                params:{
                    query: JSON.stringify(_self.query)
                }
            }).then(function(result){
                if(result.success){
                    _self.dataList=result.data.data;
                    _self.dataTotal=result.data.total;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        getPageList(value){
            var _self=this;
            if(!_self.query.wheres.pathlike){
                _self.query.wheres.pathlike = _self.$store.state.user.userInfo.dept.path;
            }
            if(value == "2" || this.statusColumn == "2"){
                console.log("挂职");
                _self.$http.get("/$admin/users/queryList",{
                    params:{
                        query: JSON.stringify(_self.query)
                    }
                }).then(function(result){
                    if(result.success){
                        _self.dataList=result.data.data;
                        _self.dataTotal=result.data.total;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                // 老流程
                _self.$http.get("/$admin/users/page",{
                    params:{
                        query: JSON.stringify(_self.query)
                    }
                }).then(function(result){
                    if(result.success){
                        _self.dataList=result.data.data;
                        _self.dataTotal=result.data.total;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }


            // 老方法废弃，走新流程，支持获取单挂职用户
            // var _self=this;
            // _self.$http.get("/$admin/users/page",{
            //     params:{
            //         query: JSON.stringify(_self.query)
            //     }
            // }).then(function(result){
            //     if(result.success){
            //         _self.dataList=result.data.data;
            //         _self.dataTotal=result.data.total;
            //     }
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        },
        getDeptTree(){
            var _self=this;
            _self.$http.get("/$admin/depts/depstree",{
                params:{
                    query: JSON.stringify(_self.deptQuery)
                }
            }).then(function(result){
                if(result.success){
                    _self.deptTree=result.data;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
    mounted() {
        var _self=this;
        this.currentColumn = this.columnList;
        this.getPageList();
        this.getDeptTree();
        _self.$http("/map/organs/tree")
        .then(res => {
            _self.userDeptsTree2 = res.data
        }).catch(err => {
            console.log(err)
        })
    }
};
</script>

