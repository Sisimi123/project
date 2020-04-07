<!-- ztree模板 -->
<style lang="less">
  @import "../../../styles/commonStyle.less";
</style>
<template>
  <div id="areaTree">
    <Card>
      <Input type="text" icon="ios-search" placeholder="请输入"v-model="searchText" @on-click="search()" @on-enter="search()"/>
      <div class="tree-box">
        <div class="zTreeDemoBackground left">
          <ul id="treeDemo" class="ztree"></ul>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  //import 'ztree/js/jquery-1.4.4.min.js'
  import 'ztree/js/jquery.ztree.core.js'
  import 'ztree/js/jquery.ztree.exedit.js'
  import 'ztree/css/zTreeStyle/zTreeStyle.css'
  export default {
    name: "ztree",
    props: {
      treeData: {
        type: [Array, String],
      },
    },
    data() {
      return {
        //ztree
        setting: {
          async: {
            enable: true //是否执行异步
            // url: "http://192.168.8.51:9022/api/sos/dir/list",
            // otherParam: [
            //   "WebAPIBean",
            //   JSON.stringify({ query: { zPid: "00000000" } })
            // ]
          },
          //是否可编辑
          edit: {
            enable: true,
            showRemoveBtn: false, //不显示删除名称按钮
            showRenameBtn: false, //不显示编辑名称按钮
            editNameSelectAll: false
          },
          //数据格式
          data: {
            simpleData: {
              enable: true,
              idKey: "id", //节点数据中保存其父节点唯一标识的属性名称
              pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称
            },
            key: {
              name: "title", //zTree 节点数据保存节点名称的属性名称:默认值。
              isParent: "haschildren" //zTree 节点数据保存节点是否为父节点的属性名称:默认值。
            }
          },
          view: {
            addHoverDom: this.addHoverDom, //添加按钮
            removeHoverDom: this.removeHoverDom, //清除添加按钮
            nameIsHTML: true, //允许name支持html				
            selectedMulti: false
          },
          //回调
          callback: {
            onClick: this.zTreeOnClick,
            // beforeClick: this.zTreeBeforeClick,
            onCheck: this.zTreeOnCheck, //如果设置了 setting.callback.beforeCheck 方法，且返回 false，将无法触发 onCheck 事件回调函数。
            beforeAsync: this.zTreeBeforeAsync, //异步回调
            onAsyncSuccess: this.ztreeOnAsyncSuccess, //如果设置了 setting.callback.beforeAsync 方法，且返回 false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数。
            beforeExpand: this.zTreeBeforeExpand, //展开前回调 
            onExpand: this.zTreeOnExpand, //点击展开项 如果设置了 setting.callback.beforeExpand 方法，且返回 false，将无法触发 onExpand 事件回调函数。           

            beforeRemove: this.zTreeBeforeRemove, //删除前回调
            onRemove: this.zTreeOnRemove, //删后前回调 如果用户设置了 beforeRemove 回调函数，并返回 false，将无法触发 onRemove 事件回调函数。     
            beforeRename: this.zTreeBeforeRename, //修改节点名称后的回调
            beforeEditName: this.zTreeBeforeEditName //用于捕获节点编辑按钮的 click 事件，并且根据返回值确定是否允许进入名称编辑状态
          },
        },
        zNodes: {},
        addHoverDomVisible: false, //添加按钮和事件绑定 的显示
        dialogFormVisible: false, //修改框
        dialogFormVisible2: false, //添加框
        form: {}, //修改
        form2: {}, //添加
        treeNode1: {}, //修改数组转移
        treeNode2: {}, //添加数组转移
        addisLeaferror: false, //添加子节点错误信息
        editisLeaferror: false, //编辑子节点错误信息
        expandAllisClose: true, //expand
        expandAllisOpen: false,
        checkChildAll: false,
        loading: false,
        searchText:"",
      };
    },
    mounted() {
      this.load();
    },
    computed: {},
    methods: {
      //ztree
      load() { //$.fn.zTree.init()初始化方法，创建 zTree 必须使用此方法
        this.zNodes = $.fn.zTree.init(
          $("#treeDemo"),
          this.setting,
          this.treeData
        );
      },
      search() {
        this.load();
        let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        let nodes = treeObj.getNodesByParamFuzzy("title", this.searchText, null);
        // this.treeData=nodes;
        this.zNodes = $.fn.zTree.init(
          $("#treeDemo"),
          this.setting,
          nodes
        );
      },
      //点击事件获取当前节点信息
      zTreeOnClick(event, treeId, treeNode) {
        console.log("发送" + treeNode.parentId);
        this.$emit("transTreeNode", treeNode);
      },
      //添加节点
      addztree() {
        // console.log(this.form2.isLeaf);
        // if (this.form2.isLeaf) {
        //   this.addisLeaferror = false;
        // } else {
        //   this.addisLeaferror = true;
        //   return;
        // }
        let param = {
          WebAPIBean: {
            formData: [{
              id: this.treeNode2.id,
              fieldCode: this.form2.fieldCode,
              fieldName: this.form2.fieldName,
              zSort: this.form2.zSort,
              icon: this.form2.icon
            }]
          }
        };
        this.postJson(
          param,
          res => {
            // this.treeNode1.text = this.form.dirValue;
            // this.treeNode1.zId = this.form.zId;
            console.log("添加成功", this.treeNode2, res.data.data);
            res.data.data[0].text = this.form2.fieldName;
            res.data.data[0].icon = this.form2.icon;
            $.fn.zTree
              .getZTreeObj("treeDemo")
              .addNodes(this.treeNode2, res.data.data[0]);
            this.dialogFormVisible2 = false;
            this.form2 = {};
            this.$Message.info("节点已添加成功");
          },
          err => {}
        );
      },
      //修改节点
      UpdataZtree() {
        // if (this.form.isLeaf) {
        //   this.editisLeaferror = false;
        // } else {
        //   this.editisLeaferror = true;
        //   return;
        // }
        let param = {
          WebAPIBean: {
            formData: [{
              id: this.form.id,
              fieldCode: this.form.fieldCode,
              fieldName: this.form.fieldName,
              icon: this.form.icon,
              zSort: this.form.zSort
            }]
          }
        };
        this.postJson(
          zygkptResfieldUpdate,
          param,
          res => {
            this.treeNode1.text = this.form.fieldName;
            this.treeNode1.id = this.form.id;
            this.treeNode1.icon = this.form.icon;
            console.log("修改成功", this.treeNode1);
            // $.fn.zTree.getZTreeObj("treeDemo").editName(this.treeNode1);
            $.fn.zTree.getZTreeObj("treeDemo").updateNode(this.treeNode1);
            this.dialogFormVisible = false;
            this.$Message.info("节点已修改成功");
          },
          err => {}
        );
      },
      //清除添加按钮
      removeHoverDom: function (treeId, treeNode) {
        $("#addBtn_" + treeNode.tId).unbind().remove();
      },
      //增加节点的按钮
      addHoverDom: function (treeId, treeNode) {
        if (this.addHoverDomVisible) {
          var aObj = $("#" + treeNode.tId + "_span");
          if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0)
            return;
          var editStr =
            "<span class='button add' id='addBtn_" +
            treeNode.tId +
            "' title='添加' onfocus='this.blur()'></span>";
          aObj.after(editStr);

          var btn = $("#addBtn_" + treeNode.tId);
          var self = this;
          if (btn)
            btn.bind("click", function () {
              console.log(treeNode);
              self.treeNode2 = treeNode;
              self.dialogFormVisible2 = false;
            });
        }
      },
      //用于捕获节点编辑按钮的 click 事件
      zTreeBeforeEditName: function (treeId, treeNode) {
        console.log(treeId, treeNode);
        let param = {
          WebAPIBean: {
            query: {
              id: treeNode.id
            }
          }
        };
        this.postJson(
          zygkptResfieldFindOne,
          param,
          res => {
            console.log("sosDirFindOne", res.data.data);
            this.form = res.data.data;
            this.treeNode1 = treeNode;
            this.dialogFormVisible = true;
          },
          err => {}
        );
        // return !treeNode.isParent;//禁止修改父节点的名称
      },
      //删除后回调
      zTreeOnRemove: function (event, treeId, treeNode) {
        console.log(event, treeId, treeNode);
        let param = {
          WebAPIBean: {
            formData: [{
              id: treeNode.id
            }]
          }
        };
        this.postJson(
          zygkptResfieldRemove,
          param,
          res => {
            this.$Message.info("节点已删除");
            console.log("成功执行删除", treeNode.id + ", " + treeNode); //删除节点
          },
          err => {}
        );
      },
      //修改节点名称后的回调
      zTreeBeforeRename: function (treeId, treeNode, newName, isCancel) {
        console.log(treeId, treeNode, newName, isCancel);
      },
      zTreeOnCheck: function (event, treeId, treeNode) {
        console.log(event, treeId, treeNode);
      },
      //删除前回调
      zTreeBeforeRemove: function (treeId, treeNode) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            console.log("确定删除");
            this.zTreeOnRemove(event, treeId, treeNode);
            $.fn.zTree.getZTreeObj("treeDemo").removeNode(treeNode);
          })
          .catch(() => {
            return false;
          });

        return false;
      },
      //展开前回调
      zTreeBeforeExpand: function (treeId, treeNode) {
        //console.log(treeId, treeNode);
        // return false;
      },
      //点击展开项
      zTreeOnExpand: function (event, treeId, treeNode) {
        this.addNodes(treeNode);
        //console.log(treeNode.parentId);
      },
      //添加节点  第一次展开的时候
      addNodes: function (treeNode) {
        let param = {
          WebAPIBean: {
            query: {
              id: treeNode.id
            }
          }
        };
        let treeObj = this.zNodes;
        //console.log(treeObj, this.zNodes);
        let parentZNode = treeObj.getNodeByParam("id", treeNode.id, null); //获取指定父节点
        let childNodes = treeObj.transformToArray(treeNode); //获取子节点集合
        this.checkChildAll = childNodes[0].checked; //获取父节点是否勾选
        //因为子节点还包括组织，所以这里需要筛选一下
        //console.log(childNodes);
        let key = false;
        for (let i in childNodes) {
          // console.log(childNodes[i].children.length >0,childNodes[i].children)
          if (childNodes[i].children.length > 0) {
            //如果当前组织有终端 就不再加载
            key = true;
            break;
          }
        }
        if (!key) {
          //如果不存在  就加载(第一次加载)     
          //判断父节点是否勾选
          if (this.checkChildAll) {
            res.data.data.forEach(val => {
              val.checked = true;
            });
          }
          //添加节点
          treeObj.addNodes(parentZNode, res.data.data, false);
        }
      },
      zTreeBeforeAsync: function (treeId, treeNode) {
        console.log("bb", treeId, treeNode);
        // return treeNode.id !== 1;
      },
    }
  };
</script>
<style scoped>
</style>
<!-- 
methods: 
    selectChangeText(parentId){
        console.log("接受"+parentId);
        this.parentId=parentId;
        this.handleSearch();
    },
data:
    areaTreeVisible:false, //数据加载完后再在ztree组件中显示
    _self.areaTreeVisible=true
template:
    <Col span="4">
        <ztree v-if="areaTreeVisible" @transParentId="selectChangeText" :treeData="areaTree"></ztree>
import和export:
        import ztree from './ztree.vue'     
        components:{
            ztree,
        },
    </Col> -->