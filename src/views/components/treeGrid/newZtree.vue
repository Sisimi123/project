<!--ztree组件-->
<template>
    <div>
        <div v-if="withCard">
            <Card>
                <Input v-if="showSearch" type="text" icon="ios-search" placeholder="请输入" v-model="searchVal" @on-click="search()" @on-enter="search()"/>
                <div>
                    <ul id="treeDemo" class="ztree" :style="'max-height:'+maxHeight+'px;overflow-y: auto;'"></ul>
                </div>
            </Card>
        </div>
        <div v-else>
            <Input v-if="showSearch" type="text" icon="ios-search" placeholder="请输入" v-model="searchVal" @on-click="search()" @on-enter="search()"/>
            <div>
                <ul id="treeDemo" class="ztree" :style="'max-height:'+maxHeight+'px;overflow-y: auto;'"></ul>
            </div>           
        </div>    
    </div>
</template>

<script>
// import 'ztree/js/jquery-1.4.4.min.js'
import 'ztree/js/jquery.ztree.core.js'
import 'ztree/js/jquery.ztree.exedit.js'
import 'ztree/css/zTreeStyle/zTreeStyle.css'
import 'ztree/js/jquery.ztree.excheck.js'

export default {
    name: "newZtree",
    props: {
        //树数据
        treeData: {
          type: [Array, String],
        },
        //是否card布局
        withCard: {
            type: Boolean,
            default: false
        },
        //节点是否可选
        checkSty: {
            type: Boolean,
            default: true
        },
        //是否显示删除按钮
        showRemoveBtn: {
            type: Boolean,
            default: false
        },
        //是否显示编辑按钮
        showRenameBtn: {
            type: Boolean,
            default: false
        },
        showSearch:{
            type: Boolean,
            default: false
        },
        chkboxType:{
            type: Object,
            default(){
                return { "Y" : "ps", "N" : "ps" };
            }
        },
        maxHeight:{
            type:String,
            default:"400"
        }
    },
    data() {
        var _self=this;
        return {
            setting: {
                //异步加载(待补充)
                async: {

                },
                //是否可编辑
                edit: {
                    enable: true, //可以编辑(支持拖拽)
                    showRemoveBtn: this.showRemoveBtn, //不显示删除名称按钮
                    removeTitle: '删除节点',
                    showRenameBtn: this.showRenameBtn, //不显示编辑名称按钮
                    renameTitle: '编辑节点',
                    editNameSelectAll: true //默认不全选
                }, 
                //设置勾选框
                check: {
                    enable: this.checkSty,
                    chkStyle: "checkbox",
                    chkboxType:_self.chkboxType
                },
                //数据格式
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id", //节点数据中保存唯一标识的属性名称
                        pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称
                    },
                    key: {
                        name: "title", //zTree 节点数据保存节点名称的属性名称:默认值。
                        isParent: "haschildren" //zTree 节点数据保存节点是否为父节点的属性名称:默认值。
                    }
                },
                //自定义控件(待补充)
                view: {

                },
                //回调
                callback: {
                    onClick: this.zTreeOnClick, //单击事件
                    onCheck: this.zTreeOnCheck, //checkbox选中事件
                    onDblClick: this.zTreeOnDblClick, //双击事件
                    onExpand: this.zTreeOnExpand,//展开事件
                }
            },
            zTreeObj: {},
            searchVal: '',
            checkArr:[]
        }
    },
    mounted() {  
        this.treeInit();
    },
    watch: {
        treeData: {
        deep: true,
            handler: function (newVal,oldVal){
            this.treeInit();
            }      
        }
    },
    computed: {},
    methods: { 
        //封装ztree方法
        // packageFun (funName,params) {
        //     if (funName == 'getCheckedNodes') {
        //         let nodes = this.getCheckedNodes();
        //         return nodes;
        //     } else if (funName == 'getSelectedNodes') {
        //         let nodes = this.getSelectedNodes();
        //         return nodes;
        //     } else if (funName == 'getNodeByParam') {
        //         let node  = this.getNodeByParam(params[0],params[1]);
        //         return node;
        //     } else if (funName == 'expandNode') {
        //         this.expandNode();
        //     }
        // },
        //ztree初始化
        treeInit() {
            this.zTreeObj = $.fn.zTree.init($("#treeDemo"),this.setting,this.treeData);
            this.getCheckedNodes();
            this.expandNode();
        },
        //搜索树节点
        search() {
            this.treeInit();
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let nodes=[];
            if(this.searchVal==""){
                nodes=this.treeData;
            }else{
                nodes = treeObj.getNodesByParamFuzzy("title", this.searchVal, null);
            }
            this.zTreeObj = $.fn.zTree.init($("#treeDemo"),this.setting,nodes);
        },
        //获取所有勾选节点
        getCheckedNodes() {
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let nodes = treeObj.getCheckedNodes(true);
            return nodes;
            // this.$emit("getCheckedNodes", nodes);
        },       
        //获取所有选中节点
        getSelectedNodes() {
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");            
            let nodes = treeObj.getSelectedNodes();
            return nodes;
        },
        //依照条件查找节点(第一个参数传key值，第二个传查询值)
        getNodeByParam(condition,value) {
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let node = treeObj.getNodesByParamFuzzy(condition, value, null);
            return node;          
        },
        //展开所有勾选的的节点
        expandNode() {
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let nodes = treeObj.getCheckedNodes();
            if (nodes.length > 0) {
                treeObj.expandNode(nodes[0], true, true, true);
            }         
        },
        //单击事件
        zTreeOnClick(event, treeId, treeNode) {
            this.$emit("onClick", treeNode);
        },
        //checkbox选中事件
        zTreeOnCheck(event, treeId, treeNode) {
            this.$emit("zTreeOnCheck", treeNode)
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            let nodes = treeObj.getCheckedNodes(true);
            this.$emit("checkList", nodes)
        },
        //双击事件
        zTreeOnDblClick(event, treeId, treeNode) {
            this.$emit("onDblClick", treeNode)
        }
    }
}
</script>
<style lang="less">

</style>

