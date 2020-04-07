<template>
        <!-- :width="width" 
        :rowClassName="rowClassName"-->
    <Table 
        :data="treeData"
        :columns="treeColumns" 
        :size="size"

        :height="height"
        :stripe="stripe"
        :border="border"
        :showHeader="showHeader"
        :highlightRow="highlightRow"
        
        :context="context"
        :noDataText="noDataText"
        :noFilteredDataText="noFilteredDataText"
        :disabledHover="disabledHover"
        :loading="loading"
        @on-current-change="onCurrentChange(currentRow,oldCurrentRow)"
        @on-select="onSelect(selection,row)"
        @on-select-cancel="onSelectCancel(selection,row)"
        @on-select-all="onSelectAll(selection)"
        @on-selection-change="onSelectionChange(selection)"
        @on-sort-change="onSortChange(column,key,order)"
        @on-filter-change="onFilterChange()"
        @on-row-click="onRowClick(index)"
        @on-row-dblclick="onRowDBlClick(index)"
        @on-expand="onExpand(row,status)">
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <slot name="loading"></slot>
    </Table>
</template>

<script>
export default {
    name: 'MyTreeGrid',
    props: {
        data: {
            type: Array,
            default() {
                return {};
            }
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        size: {
            type: String
            // validator(value) {
            //     return oneOf(value, ['small', 'large', 'default']);
            // }
        },
        // width: {
        //     type: [Number, String]
        // },
        height: {
            type: [Number, String]
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightRow: {
            type: Boolean,
            default: false
        },
        // rowClassName: {
        //     type: Function,
        //     default() {
        //         return '';
        //     }
        // },
        context: {
            type: Object
        },
        noDataText: {
            type: String,
            default:"暂无数据"
        },
        noFilteredDataText: {
            type: String,
            default:"暂无筛选结果"
        },
        disabledHover: {
            type: Boolean,
            default:false,
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {},
    computed: {
        treeData() {
            var data = this.data;
            if(data==null)
                return [];
            return this.treeToList(data);
        },
        treeColumns() {
            var columns = this.columns;
            columns.forEach(function(item,index,array){
                if(item.type=="tree"){
                    item.type="-";
                    var span=h("span",{
                        style: {
                            marginRight: item.level*10+'px'
                        },
                    });
                    
                    var icon=h("span",[
                        h("Icon",{
                            props:{
                                type:item.expand?"android-arrow-dropdown":"android-arrow-dropright"
                            }
                        })]
                    );

                    
                    item.render=function(h, params){
                        
                        var name=item.render
                        if(name==undefined)
                            name=h("span",params.row[item.key]);

                        return h('div', [
                            span,
                            icon,
                            name
                        ]);
                    }
                }
            });
            return columns;
        }
    },
    methods: {
        treeToList(data,level){
            var _self=this;
            var temp=[];
            data.forEach(function(item, index, array){
                var children=item.children;
                item.$leaf=children==null||children.length==0;
                item.$level=level||0;
                temp.push(item);
                if(!item.$leaf){
                    if(item.expand){
                        var list=_self.treeToList(children);
                        temp.concat(list);
                    }
                }
            })
            return temp;
        },
        onCurrentChange(currentRow, oldCurrentRow) {
            this.$emit('on-current-change', currentRow, oldCurrentRow);
        },
        onSelect(selection, row) {
            this.$emit('on-select', selection, row);
        },
        onSelectCancel(selection, row) {
            this.$emit('on-select-cancel', selection, row);
        },
        onSelectAll(selection) {
            this.$emit('on-select-all', selection);
        },
        onSelectionChange(selection) {
            this.$emit('on-selection-change', selection);
        },
        onSortChange(column, key, order) {
            this.$emit('on-sort-change', column, key, order);
        },
        onFilterChange() {
            this.$emit('on-row-click');
        },
        onRowClick(index) {
            this.$emit('on-row-click', index);
        },
        onRowDBlClick(index) {
            this.$emit('on-row-dblclick', index);
        },
        onExpand(row, status) {
            this.$emit('on-expand', row, status);
        }
    },
    watch: {},
    mounted() {}
};
</script>
