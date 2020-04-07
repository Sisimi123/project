<style lang="less" scoped>

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
        <div slot="footer">
            <Button @click="cancel">取消</Button>
            <Button type="primary" @click="selectChange">确定</Button>
        </div>
        <diV>
            <Row>
                <Col span="12">
                    <div style="border-right:1px solid #DDDEE1;padding">
                        <Form :label-width="100" style="overflow:hidden;height:400px">
                            <Input v-model="treeSearch" icon="ios-search" size="small"/>
                            <div style="margin-top:10px">
                                <p style="margin-top:10px;font-size:15px">选择:</p>
                                <!-- <Tag v-if="sendPubUser">公众用户</Tag> -->
                                <Tag :name="item.id" v-for="item in selectUserArr" closable @on-close="handleClose_user" :key="item.id" :value="item.id">{{item.name}}</Tag>
                                <Tag :name="item.id" v-for="item in selectDeptArr" closable @on-close="handleClose_dept" :key="item.id" :value="item.id">{{item.name}}</Tag>
                                <Tag :name="item.id" v-for="item in selectRoleArr" closable @on-close="handleClose_role" :key="item.id" :value="item.id">{{item.name}}</Tag>
                                <Tag :name="item.id" v-for="item in selectDeptArr_child" closable @on-close="handleClose_deptChild" :key="item.id" :value="item.id">{{item.name}}</Tag>
                            </div>
                            <!-- <div style="margin-top:10px">
                                <p style="margin-top:10px">用户:</p>
                                <Tag :name="item.id" v-for="item in selectUserArr" closable @on-close="handleClose_user" :key="item.id" :value="item.id">{{item.name}}</Tag>
                            </div>
                            <div style="margin-top:150px">
                                <p>部门:</p>
                                <Tag :name="item.id" v-for="item in selectDeptArr" closable @on-close="handleClose_dept" :key="item.id" :value="item.id">{{item.name}}</Tag>
                            </div> -->
                        </Form>
                    </div>
                </Col>
                <Col span="12">
                    <Tabs ref="tabs" value="user" :animated="false">
                        <TabPane label="用户" name="user">
                            <div style="overflow:auto;height:350px">
                                <!-- <Checkbox @on-change="selectPubUser" style="margin-left:5px" v-if="ifPubUsers">是否发送公众用户</Checkbox> -->
                                <Tree ref="userTree" :data="filterTree" @on-select-change="treeSelectUser" :show-checkbox="showCheckbox"></Tree>
                            </div>
                        </TabPane>
                        <TabPane label="部门" name="dept">
                            <div style="overflow:auto;height:350px">
                                <Tree ref="deptTree" :data="filterTree2" @on-select-change="treeSelectDept" :show-checkbox="showCheckbox"></Tree>
                            </div>
                        </TabPane>
                        <TabPane label="角色" name="role">
                            <div style="overflow:auto;height:350px">
                                <Tree ref="roleTree" :data="filterTree3"  @on-select-change="treeSelectRole" :show-checkbox="showCheckbox"></Tree>
                            </div>
                        </TabPane>
                        <TabPane label="子部门" name="deptChild">
                            <div style="overflow:auto;height:350px">
                                <Tree ref="deptTree_child" :data="filterTree4" @on-select-change="treeSelectDept_child" :show-checkbox="showCheckbox"></Tree>
                            </div>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    </Modal>
</template>

<script>

import {isNull,isEmpty} from '../../../../libs/common'
export default {
    name: "userAndDept",
    props: {
        // ifPubUsers: {
        //     type: Boolean,
        //     default: false
        // },
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
            default: "选择用户或部门"
        },
        width: {
            type: [Number, String],
            default: 800
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
        showCheckbox:{
            type: Boolean,
            default: false
        },
        deptTypes:{
            type: String,
            default: ""
        },
        deptIds: {
            type: String,
            default: ""
        },
        roleIds: {
            type: String,
            default: ""
        },
        selectIds:{
            type: String
        },
        selectMySelf:{
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
            // inResize: true,
            // sendPubUser: false,
            selectUserArr: [],
            selectDeptArr: [],
            selectRoleArr: [],
            selectDeptArr_child: [],
            userMap: new Map(),
            deptMap: new Map(),
            roleMap: new Map(),
            deptMap_child: new Map(),
            visible: this.value,
            treeSearch:"",
            userTree:[],
            deptTree:[],
            roleTree:[],
            deptTree_child:[],
            treeQuery: {
                containOrgan: false,
                type: "includes:5,20,30,35"
            },
        };
    },
    computed:{
        filterTree(){
            var tree=this.$util.deepCopy(this.userTree);
            return this.$util.diguiTree(tree,this.treeSearch);
        },
        filterTree2(){
            var tree=this.$util.deepCopy(this.deptTree);
            return this.$util.diguiTree(tree,this.treeSearch);
        },
        filterTree3(){
            var tree=this.$util.deepCopy(this.roleTree);
            return this.$util.diguiTree(tree,this.treeSearch);
        },
        filterTree4(){
            var tree=this.$util.deepCopy(this.deptTree_child);
            return this.$util.diguiTree(tree,this.treeSearch);
        }
    },
    methods: {
        // selectPubUser(value) {
        //     if (value) {
        //         this.sendPubUser = true
        //     } else {
        //         this.sendPubUser = false
        //     }
        // },
        handleClose_user(event,name) {
            var _self = this
            _self.selectUserArr.forEach(function(v,k) { 
                if (v.id == name) {
                    _self.selectUserArr.splice(k, 1);
                    _self.userMap.delete(v.id)
                }
            });
        },
        handleClose_dept(event,name) {
            var _self = this
            _self.selectDeptArr.forEach(function(v,k) { 
                if (v.id == name) {
                    _self.selectDeptArr.splice(k, 1);
                    _self.deptMap.delete(v.id)
                }
            });
        },
        handleClose_role(event,name) {
            var _self = this
            _self.selectRoleArr.forEach(function(v,k) { 
                if (v.id == name) {
                    _self.selectRoleArr.splice(k, 1);
                    _self.roleMap.delete(v.id)
                }
            });
        },
        handleClose_deptChild(event,name) {
            var _self = this
            _self.selectDeptArr_child.forEach(function(v,k) { 
                if (v.id == name) {
                    _self.selectDeptArr_child.splice(k, 1);
                    _self.deptMap_child.delete(v.id)
                }
            });
        },
        ok() {
            if (!this.loading){
                this.$emit("input",this.visible);
            }
            this.$emit("on-ok");
        },
        cancel() {
            this.visible=false;
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        selectChange(){
            var _self = this
            var nodes=[];
            nodes.push(_self.selectUserArr,_self.selectDeptArr,_self.selectDeptArr_child,_self.selectRoleArr)
            this.$emit("on-select-change",nodes);
            this.visible=false;
            this.ok();
        },
        treeSelectUser(nodes){
            var _self = this
            if(nodes.length>0){
                var node=nodes[0];
                if(!isNull(node.children)&&node.children.length>0)
                    _self.$Message.info("请选择子节点！");
                else {
                    _self.userMap.set(nodes[0].id,nodes[0].title)
                    var arr = []
                    _self.userMap.forEach(function (value, key, map) {
                        arr.push({
                            id: key,
                            name: value+'(用户)'
                        })
                    });
                    _self.selectUserArr = arr
                }
            } else {
                return
            }
        },
        treeSelectDept(nodes) {
            var _self = this
            if (nodes.length>0) {
                _self.deptMap.set(nodes[0].id,nodes[0].title)
                var arr = []
                _self.deptMap.forEach(function (value, key, map) {
                    arr.push({
                        id: key,
                        name: value+'(部门)'
                    })
                });
                _self.selectDeptArr = arr    
            } else {
                return
            }       
        },
        treeSelectRole(nodes) {
          var _self = this
            if (nodes.length>0) {
                _self.roleMap.set(nodes[0].code,nodes[0].title)
                var arr = []
                _self.roleMap.forEach(function (value, key, map) {
                    arr.push({
                        id: key,
                        name: value+'(角色)'
                    })
                });
                _self.selectRoleArr = arr    
            } else {
                return
            }   
        },
        treeSelectDept_child(nodes) {
            var _self = this
            if (nodes.length>0) {
                _self.deptMap_child.set(nodes[0].id,nodes[0].title)
                var arr = []
                _self.deptMap_child.forEach(function (value, key, map) {
                    arr.push({
                        id: key,
                        name: value+'(子部门)'
                    })
                });
                _self.selectDeptArr_child = arr    
            } else {
                return
            }       
        },
        loadUserTree(){
            var _self=this;
            _self.$http.get("/$admin/users/selectUserList",{
                params:{
                    deptTypes:_self.deptTypes,
                    deptIds:_self.deptIds,
                    roleIds:_self.roleIds,
                    type:"tree"
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    if(isNull(data)){
                        data=[];
                        _self.$Message.error("找不到用户数据。");
                    }
                    _self.$util.checkTree(data,_self.selectIds);
                    _self.userTree=data;
                    _self.visible=true;
                }
                //_self.$Message.info(result.msg);
            });
        },
        loadDeptTree () {
            var search = {}
            for (const key in this.treeQuery) {
                search[key] = this.treeQuery[key];
            }
            this.$http.get('/$admin/depts/authtree', {
                params: search
                })
                .then(res => {
                if (res.success) {
                    this.deptTree = res.data;
                    }
                })
                .catch(error => {
                console.log(error);
            });
        },
        loadDeptTree_child() {
            var search = {}
            for (const key in this.treeQuery) {
                search[key] = this.treeQuery[key];
            }
            this.$http.get('/$admin/depts/authtree', {
                params: search
                })
                .then(res => {
                if (res.success) {
                    this.deptTree_child = res.data;
                    }
                })
                .catch(error => {
                console.log(error);
            });
        },
        loadRoleTree () {
            var query = {
                key:"getRoleTree",
                orders:"sort asc"
            }
            this.$http.get('/shiparchives/file/management/list',{params:{query}})
            .then(res => {
                if (res.success) {
                    this.roleTree = res.data
                }
            }).catch(err=> {
                console.log(err)
            })
        },
    },
    mounted() {
    },
    watch:{
        value(val){
            if(val){
                this.loadUserTree();
                this.loadDeptTree();
                this.loadRoleTree();
                this.loadDeptTree_child();
            }
        },
    }
};
</script>

