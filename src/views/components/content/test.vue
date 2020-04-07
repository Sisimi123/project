<style lang="less">
</style>
<template>
  <div>
    <!-- 
      参数说明：
      withTree 是否包含树列表; 
      treeUrl 树列表查询地址;
      useZtree 默认true 使用ztree组件展示树形结构，  false 使用iview 的tree组件展示树形结构
      treeParams 树查询参数
      treeTitle 树标题
      url 表格请求地址; 
      params 请求参数;
      columns 表格列表配置参数;
      selections 设置选择的 id 值["id1","id2"],

      事件说明：
      on-row-dblclick 列双击事件;
      on-selection-change 表格列勾选事件，返回选中列集合;
      on-select-change 树列表选中事件，返回选中节点;

      插槽说明：
      <div slot="search"> 查询条件及按钮插槽，请根据实际条件。  备注：暂未适配3个查询条件以上的查询布局，请自行调整按钮布局

      模版按钮 规范
      <Button @click="method()" type="primary" icon="ios-search">搜索</Button>查询
      <Button @click="method()" >重置</Button>重置

      功能按钮  
      <Button @click="method()" type="success" icon="ios-add" >新增</Button>
      <Button @click="method()" type="info" icon="compose" >编辑</Button>
      <Button @click="method()" type="warning" icon="android-cancel" >撤回</Button>
      <Button @click="method()" type="info" icon="android-delete" >删除</Button>
      <Button @click="method()" type="info" icon="ios-cloud-download-outline" >导入</Button>
      <Button @click="method()" type="info" icon="ios-cloud-upload-outline" >导出</Button>

      表格按钮区
      <Button @click="method()" type="info">新增</Button>
      <Button @click="method()" type="primary">编辑</Button>
      <Button @click="method()" type="warning">撤回</Button>
      <Button @click="method()" type="error">删除</Button>
    -->
<!-- data-table组件参数说明：
withTree 是否包含树列表;   true 左侧将展示树形列表card   false不展示  默认false
useZtree 是否使用ztree树;   true 树形列表使用ztree   false使用iview的tree组件  默认false
treeParams  树列表查询条件;   请求参数集合
treeUrl 树列表查询地址;     树组件初始化调用地址，仅支持get请求
treeTitle 树标题         
备注说明：如果不包含 树形列表   以上参数都可以不传

url 表格请求地址;      table请求地址，仅支持get请求
params 请求参数;      请求参数集合
columns 表格列表配置参数;   原本iview中的columns 配置

data-table组件事件说明：
on-row-dblclick 列双击事件，返回对应列的内容
on-selection-change 表格列勾选事件，返回选中列集合;
on-select-change 树列表选中事件，返回选中节点; -->
    
    <data-table 
      ref="test" 
      :withTree="true" 
      :treeUrl="'checks/organization/get/330000'" 
      :treeTitle="'行政区划'"
      :url="'/enforces/shipscoreuser/page'" 
      :params="query" 
      :columns="columns" 
      @on-row-dblclick="handleEdit"
      @on-selection-change="selectChange"
      @on-select-change="selectTreeChange" >
      <div slot="search">
        <!-- label-width 长度根据实际情况自行调整 -->
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="6">
              <Form-item label="姓名1:">
                <Input v-model="query.wheres.userName_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
              </Form-item>
            </Col>


            <div class="btn-wrap">
              <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
              <Button @click="handleReset()"  >重置</Button>
            </div>

            <span style="float:right">
              <ButtonGroup shape="circle">
                <Button @click="initSearch()" type="info" icon="ios-add" >新增</Button>
                <Button @click="initSearch()" type="info" icon="compose" >编辑</Button>
                <Button @click="initSearch()" type="info" icon="android-delete" >删除</Button>
                <!-- <Button @click="initSearch()" type="info" icon="ios-cloud-download-outline" >导入</Button>
                <Button @click="initSearch()" type="info" icon="ios-cloud-upload-outline" >导出</Button> -->
              </ButtonGroup>
              
            </span>
          </Row>
        </Form>
      </div>
    </data-table>

    <!-- <Modal></Modal> -->
  </div>


  
  
</template>
<script>
import dataTable from "@/views/components/content/MyTableNew.vue";
export default {
  name: "test",
  components: {
    dataTable,

  },
  data() {
    return {
      // default
      query: {
        page:1,
        size:10,
        wheres:{
            
        },
        orders:"updateTime desc"
      },
      treeQuery: {
          key:'',
          wheres: {
              name:""
          }
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          key: "userName",
          title: "用户",
          align: "center",
          sortable: "custom",

        },
        {
          key: "userKey.userType",
          title: "用户类型",
          align: "center",

          render: (h, params) => {
            var value = this.$store.getters.getDictName(
              "shipscore_idcardtype",
              params.row.userKey.userType
            );
            return h("span", value);
          }
        },
        {
          key: "userKey.idCard",
          title: "证件号",
          align: "center",

          render: (h, params) => {
            return h("span", params.row.userKey.idCard);
          }
        },
        {
          key: "tel",
          title: "联系手机号",
          align: "center",

        },
        {
          key: "totalScore",
          title: "当前剩余记分",
          sortable: "custom",
          align: "center"
        },
        {
          title: "操作",
          key: "userName",
          align: "center",

          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.handleEdit(params.row);
                  }
                }
              },
              "详情"
            );
          }
        }
      ],
    };
  },
  methods: {
    // defalut
    initSearch() {
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
    selectChange(row){
      console.log("enter selectChange");
      console.log(row);
    },
    selectTreeChange(node){
      console.log("enter selectTreeChange");
      console.log(node);
    },
    // method
    handleEdit(index) {
      this.$Message.info("test");
    },
  },
  mounted() {
    this.initSearch();
  },
  watch: {}
};
</script>

<style scoped>
</style>
