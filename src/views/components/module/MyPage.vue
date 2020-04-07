<template>
  <div>
    <Row>
      <slot></slot>
    </Row>   
    <Row >
      <div style="margin-top:10px">
        <Table 
          :data="page.data"
          :columns="cols" 
          :size="size"
          :width="width"
          :height="height"
          :stripe="stripe"
          :border="border"
          :showHeader="showHeader"
          :highlightRow="highlightRow"
          :rowClassName="rowClassName"
          :context="context"
          :noDataText="noDataText"
          :noFilteredDataText="noFilteredDataText"
          :disabledHover="disabledHover"
          :loading="loading"
          @on-current-change="onCurrentChange"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-selection-change="onSelectionChange"
          @on-sort-change="onSortChange"
          @on-filter-change="onFilterChange"
          @on-row-click="onRowClick"
          @on-row-dblclick="onRowDBlClick" >
          <slot name="header"></slot>
          <slot name="footer"></slot>
          <slot name="loading"></slot>
        </Table>
      </div>
    </Row>
    <Row>
      <div class="bottom-wrap">
          <Page 
           :current="page.page"
           :total="page.total"
           :page-size="page.size"
           :page-size-opts="pageSizeOpts"
           :placement="placement"
           :size="size"
           :simple="simple"
           :show-total="showTotal"
           :show-elevator="showElevator"
           :show-sizer="showSizer"
           :class-name="className"
           :styles="styles"
           :transfer="transfer">
          </Page>
      </div>
    </Row>
  </div>
</template>
<script>


function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
          return true;
      }
  }
  return false;
}

export default {
  name: "MyPage",
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      }
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    stripe: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: true
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    highlightRow: {
        type: Boolean,
        default: true
    },
    rowClassName: {
        type: Function,
        default() {
            return '';
        }
    },
    context: {
        type: Object
    },
    noDataText: {
        type: String
    },
    noFilteredDataText: {
        type: String
    },
    disabledHover: {
        type: Boolean
    },
    loading: {
        type: Boolean,
        default: false
    },
    pageSizeOpts: {
      type: Array,
      default () {
        return [10, 20, 30, 40];
      }
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom']);
      },
      default: 'top'
    },
    size: {
      validator (value) {
        return oneOf(value, ['small']);
      },
      default:"small"
    },
    simple:{
      type:Boolean,
      default:false,
    },
    showTotal:{
      type: Boolean,
      default: true
    },
    showElevator:{
      type: Boolean,
      default: true
    },
    showSizer:{
      type:Boolean,
      default:true,
    },
    className:{
      type: String,
      default:""
    },
    styles:{
      type:Object,
    },
    transfer: {
      type: Boolean,
      default () {
        return !this.$IVIEW || this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
      }
    },
    showCheckbox:{
      type:Boolean,
      default:false
    },
    query:{
      type: Object,
      default(){
        return {};
      }
    },
    getPage:{
      type:Function,
      require:true
    }
  },
  computed: {
    cols(){
      var index={
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
      };
      if(this.showCheckbox){
        index={
          type: "selection",
          width: 60,
          align: "center"
        };
      }
      return [index,...this.columns];
    },
    queryPage(){
      return this.query.page|1;
    },
    querySize(){
      return this.query.size|20;
    }
  },
  data() {
    return {
      page:{
        page:this.query.page|1,
        size:this.query.size|20,
        total:0,
        data:[]
      }
    }
  },
  methods: {
    onCurrentChange(currentRow,oldCurrentRow){
      this.$emit("on-current-change",currentRow,oldCurrentRow);
    },
    onSelect(){
      this.$emit("on-current-change",selection,row);
    },
    onSelectCancel(){
      this.$emit("on-current-change",selection,row);
    },
    onSelectAll(){
      this.$emit("on-current-change",selection);
    },
    onSelectionChange(){
      this.$emit("on-current-change",selection);
    },
    onSortChange(){
      this.$emit("on-current-change",column,key,order);
    },
    onFilterChange(){
      this.$emit("on-current-change",columns);
    },
    onRowClick(){
      this.$emit("on-current-change",row,index);
    },
    onRowDBlClick(){
      this.$emit("on-current-change",row,index);
    },
    onChange(){

    },
    onPageSizeChange(){

    },
    doPage(){
      this.getPage(this.query).then((result)=>{
        if(result.success){
          this.page=result.data;
        }
      });
    },
    oneOf(value, validList) {
      for (let i = 0; i < validList.length; i++) {
          if (value === validList[i]) {
              return true;
          }
      }
      return false;
    }
  },
  mounted(){
    this.doPage();
  }
};
</script>