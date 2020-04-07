<template>
    <Table 
        :data="treeData"
        :columns="treeColumns" 
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
        @on-row-dblclick="onRowDBlClick"
        @on-expand="onExpand(row,status)">
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <slot name="loading"></slot>
    </Table>
</template>

<script>

import {oneOf,isNull,isEmpty} from '../../../libs/common.js';

export default {
    name: 'MyTreeGrid',
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
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
        expandUrl:{
            type: String,
            default: undefined
        }
    },
    data() {
        return {
            treeData:[]
        }
    },
    computed: {
        treeColumns() {
            var _self=this;
            var columns = this.columns;
            columns.forEach(function(item,index,array){
                if(item.type=="tree"){
                    item.type="-";
                    item.align="left";
                    var render=item.render;
                    
                    item.render=function(h, params){
                        var span=undefined;
                        // var text=isNull(render)?params.row[item.key]:[render];
                        var text=params.row[item.key];
                        if(params.row.$leaf){
                            span=h("span",{
                                style: {
                                    marginLeft: params.row.$level*14+14+'px'
                                },
                            },[
                                h("span",{
                                        style: {
                                            marginLeft: '8px'
                                        },
                                    },text)
                            ]);
                        }else{
                            span=h("span",{
                                style: {
                                    marginLeft: params.row.$level*14+'px',
                                    width:'14px',
                                    cursor:'pointer'
                                },
                                on: {
                                    click: () => {
                                        _self.handlerExpand(params.row.id);
                                    }
                                }
                            },
                            [
                                h("Icon",{
                                    props:{
                                        size:14,
                                        type: params.row.expand?"ios-arrow-down":"ios-arrow-forward"
                                    }
                                }),
                                h("span",{
                                        style: {
                                            marginLeft: '8px',
                                            cursor:'pointer'
                                        },
                                    },text)
                            ]);
                        }

                        // var name=h("span",{
                        //         style: {
                        //             marginLeft: '8px'
                        //         },
                        //     },params.row[item.key]);

                        return h('div',{
                            style:{
                                textAlign:'left'
                            }
                        },[span]);
                    }
                }
            });
            return columns;
        }
    },
    methods: {
        handlerTreeList() {
            var data = this.data;
            if(isNull(data))
                this.treeData=[];
            else
                this.treeData = this.diguiTreeList(data,1);
　　    },
        diguiTreeList(data,level){
            var _self=this;
            var temp=[];
            data.forEach(function(item, index, array){
                var children=item.children;
                item.$leaf=isNull(children)||children.length==0;
                item.$level=level;
                temp.push(item);
                if(!item.$leaf && item.expand){
                    var list=_self.diguiTreeList(children,level+1);
                    temp=[...temp,...list];
                }
            })
            return temp;
        },
        handlerExpand(id){
            this.resetExpand(this.data,id);
            this.handlerTreeList();
        },
        resetExpand(data,id){
            var _self=this;
            if(isNull(data))
                return;
            data.forEach(function(item,index,array){
                if(item.id==id){
                    item.expand=!item.expand;
                    _self.remoteHandlerExpand(item);
                    _self.$emit('on-handler-expand', item);
                    return false;
                }else{
                    _self.resetExpand(item.children, id);
                }
            });
        },
        remoteHandlerExpand(node){
            var url=this.expandUrl;
            if(!isEmpty(url)){
                let params=new URLSearchParams();
                params.append('expand', node.expand?'1':'0');
                this.$http.patch(url+'/'+node.id,params)
                .then(function(result){

                })
            }
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
        onFilterChange(column) {
            this.$emit('on-row-click',column);
        },
        onRowClick(row,index) {
            this.$emit('on-row-click', row,index);
        },
        onRowDBlClick(row,index) {
            this.$emit('on-row-dblclick', row,index);
        },
        onExpand(row, status) {
            this.$emit('on-expand', row, status);
        }
    },
    watch: {
        data(newValue,oldValue){
            this.handlerTreeList();
        }
    },
    mounted() {}
};
</script>
