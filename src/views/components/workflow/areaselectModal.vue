<style lang="less">
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
        <Form :label-width="100" style="overflow-x:hidden;overflow-y:auto;height:350px">
            <div>
                <div>
                    <Input v-model="treeSearch" icon="ios-search" size="small"></Input>
                </div>
                <div>
                    <Tree ref="userTree" :data="filterTree" :show-checkbox="showCheckbox" @on-select-change="treeSelectChange"></Tree>
                </div>
            </div>
        </Form>
    </Modal>
</template>

<script>

import {isNull,isEmpty} from '../../../libs/common'
export default {
    name: "userselect",
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
            default: "选择地区"
        },
        width: {
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
        deptflag: {
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
        selectLeaf:{
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            visible: this.value,
            treeSearch:"",
            userTree:[],
        };
    },
    computed:{
        filterTree(){
            var tree=this.$util.deepCopy(this.userTree);
            return this.$util.diguiTree(tree,this.treeSearch);
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
            this.$emit("input",this.visible);
            this.$emit("on-cancel");
        },
        visibleChange(val) {
            this.$emit("on-visible-change",val);
        },
        selectChange(){
            var nodes=[];
            if(this.showCheckbox){
                nodes=this.$refs["userTree"].getCheckedNodes();
                if(nodes.length==0){
                    this.$Message.info("请至少选择一个节点！");
                    return;
                }
            }else{
                nodes=this.$refs["userTree"].getSelectedNodes();
                if (nodes.length == 0) {
                    this.$Message.info("请至少选择一个节点！");
                    return;
                }
                var node=nodes[0];
                if(this.selectLeaf&&!isNull(node.children)&&node.children.length>0){
                    this.$Message.info("请选择子节点！");
                    return;
                }
                if(!this.selectMySelf && node.title == this.$store.state.user.userInfo.name){
                    this.$Message.info("系统限制，不可与当前登录用户相同");
                    return;
                }
            }
            var arr=this.getNodeNames(nodes);
            this.$emit("on-select-change",nodes,arr[0],arr[1]);
            this.visible=false;
            this.ok();
        },
        getNodeNames(nodes){
            var names="",ids="";
            var length=nodes.length;
            for(var i=0;i<length;i++){
                names+=","+nodes[i].title;
                ids+=","+nodes[i].id;
            }
            if(length>0){
                names=names.substring(1);
                ids=ids.substring(1);
            }
            return [ids,names];
        },
        treeSelectChange(nodes){
            if(nodes.length>0){
                var node=nodes[0];
                if(!isNull(node.children)&&node.children.length>0){
                    if(this.selectLeaf)
                        this.$Message.info("请选择子节点！");
                    node.expand=true;
                }
            }
        },
        loadUserTree(){
            var _self=this;
            _self.$http.get("/$admin/depts/selectDeptList",{
                params:{
                    deptTypes:_self.deptTypes,
                    deptflag:_self.deptflag
                }
            }).then(function(result){
                console.log(result);
                if(result.success){
                    var data=result.data;
                    if(isNull(data)){
                        data=[];
                        _self.$Message.error("找不到办理人数据！");
                    }
                    _self.$util.checkTree(data,_self.selectIds);
                    _self.userTree=data;
                    _self.visible=true;
                }
                //_self.$Message.info(result.msg);
            });
        }
    },
    watch:{
        value(val){
            if(val){
                this.loadUserTree();
            }
        }
    }
};
</script>

