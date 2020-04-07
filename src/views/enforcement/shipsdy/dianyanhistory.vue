<style lang="less" scoped>
    @import "../../../styles/common.less";
    @import "../../system/components/table.less";
</style>
<template>
<div style="height:100%;overflow:auto;">
    <Card shadow style="">
            <Form :label-width="64" @submit.native.prevent>
                <Row>
                    <div style="margin:10px 0px;">
                        点验日期：<DatePicker :editable="editable" type="date" :options="disabledOps" v-model="DatePicker" placeholder="请选择日期" style="width: 200px"></DatePicker>
                        <span style="margin:0px 5px;"></span>
                        点验时间：<Select readonly placeholder="请选择时间" v-model="DateTimePicker" style="width: 200px">
                                    <Option value="02">02:00</Option>
                                    <Option value="08">08:00</Option>
                                    <Option value="14">14:00</Option>
                                    <Option value="20">20:00</Option>
                                </Select>
                        <Button  type="primary" @click="checkDate()" icon="ios-search">查询</Button>
                        <Button @click="showExcel()"  type="info" icon="ios-cloud-upload-outline" style="float:right;">导出Excel</Button>
                    </div>
                </Row>
                <Row>
                    <div style="min-height: 380px;">
                        <MyTreeGrid 
                            ref="dataGrid"                               
                            size="small"
                            border 
                            :columns="columnList" 
                            :data="filterTree" 
                            >
                        </MyTreeGrid>                       
                    </div>
                </Row>
            </Form>
    </Card>
</div>
</template>
<script>
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import { isNull, isEmpty } from "../../../libs/common";
export default {
    name: "dianyanhistory",
    components: {
        MyTreeGrid
    },
    data() {
        return {
            editable:false,
            disabledOps: {
                disabledDate (date) {
                    return date.valueOf() > Date.now();
                }
            },
            DatePicker:new Date(),
            DateTimePicker:"02",
            dataFilter: "",
            dataList: [],
            version:"",
            query:{
                key:"",
                type:"",//1全部 2离线 3离编
                wheres:{
                    organid:"",//机构id（必填）
                    mode:"",//1待核查 2已核查 3在港 4作业 5未联系 6出航 7返航
                }
            },
            columnList: [ 
                {
                    title: "所属区域",
                    align:"left",
                    type: "tree", 
                    key: "name",
                    width: 200
                },
                {
                    title: "船总数",
                    align:"center",
                    minWidth:50,
                    key: "zs",
                },
                {
                    title: "离线数",
                    align:"center",
                    minWidth:50,
                    key: "lx",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.lx)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.type="2";
                                                _self.showmodes(params.row);
                                            }
                                        }
                                }, params.row.lx)
                            ])
                        }
                    }
                },
                {
                    title: "离编数",
                    align:"center",
                    minWidth:50,
                    key: "lb",
                    render:(h,params)=>{
                        var _self=this;
                        var lb=params.row.lb;
                        if(parseInt(lb)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.type="3";
                                                _self.showmodes(params.row);
                                            }
                                        }
                                }, parseInt(lb))
                            ])
                        }
                    }
                },
                {
                    title: "异常率",
                    align:"center",
                    minWidth:50,
                    key: "ycl",
                },
                {
                    title: "已核查",
                    minWidth:50,
                    align:"center",
                    render:(h,params)=>{
                        var _self=this;
                        var lx=params.row.lx;
                        var dhc=params.row.dhc;
                        if(parseInt(lx-dhc)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="2";
                                                _self.showmodes(params.row);
                                            }
                                        }
                                }, parseInt(lx-dhc))
                            ])
                        }
                    }
                },
                {
                    title: "待核查",
                    minWidth:50,
                    align:"center",
                    key: "dhc",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.dhc)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="1";
                                                _self.showmodes(params.row)
                                            }
                                        }
                                }, params.row.dhc)
                            ])
                        }
                    }
                },
                {
                    title: "在港",
                    minWidth:40,
                    align:"center",
                    key: "zg",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.zg)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="3";
                                                _self.showmodes(params.row)
                                            }
                                        }
                                }, params.row.zg)
                            ])
                        }
                    }
                },
                {
                    title: "作业",
                    minWidth:40,
                    align:"center",
                    key: "zy",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.zy)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="4";
                                                _self.showmodes(params.row)
                                            }
                                        }
                                }, params.row.zy)
                            ])
                        }
                    } 
                },
                {
                    title: "未联系",
                    minWidth:50,
                    align:"center",
                    key: "sl",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.sl)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="5";
                                                _self.showmodes(params.row)
                                            }
                                        }
                                }, params.row.sl)
                            ])
                        }
                    }
                },
                // {
                //     title: "出航",
                //     minWidth:40,
                //     align:"center",
                //     key: "ch",
                //     render: (h, params) => {
                //         var _self=this;
                //         if(parseInt(params.row.ch)==0){
                //             return h('div',0);
                //         }else{
                //             return h('div', [
                //                     h('a', {
                //                         props: {
                //                             type: 'primary',
                //                             size: 'small'
                //                         },
                //                         class:"show",
                //                         on: {
                //                             click: () => {
                //                                 _self.query.wheres.mode="6";
                //                                 _self.showmodes(params.row)
                //                             }
                //                         }
                //                 }, params.row.ch)
                //             ])
                //         }
                //     }
                // },
                {
                    title:"返航",
                    align:"center",
                    minWidth:40,
                    key:"fh",
                    render: (h, params) => {
                        var _self=this;
                        if(parseInt(params.row.fh)==0){
                            return h('div',0);
                        }else{
                            return h('div', [
                                    h('a', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        class:"show",
                                        on: {
                                            click: () => {
                                                _self.query.wheres.mode="7";
                                                _self.showmodes(params.row)
                                            }
                                        }
                                }, params.row.fh)
                            ])
                        }
                    }
                },
                {
                    title:"点验时间",
                    align:"center",
                    key:"createTime",
                    width:160,
                },
            ],
        };
    },
    created() {
        this.checkDate();
    },
    computed: {
        filterTree() {
            var tree = this.$util.deepCopy(this.dataList);
            return this.$util.diguiTree(tree, this.dataFilter, function(
            node,
            filter
            ) {
            return !isNull(node.name) && node.name.indexOf(filter) >= 0;
            });
        },
    },
    methods: {
        checkDate(){
            if(this.DatePicker==""){
                this.$Message.error("请选择点验日期");
                return ;
            }
            if(this.DateTimePicker==""){
                this.$Message.error("请选择点验时间");
                return ;
            }
            var date=new Date(this.DatePicker);
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            if(month<10){
                month="0"+month;
            }
            if(day<10){
                day="0"+day;
            }
            date=year+""+month+""+day+""+this.DateTimePicker;
            this.version=date;
            this.loadDataTree(date);
        },
        showExcel(){
            if(this.DatePicker==""){
                this.$Message.error("请选择点验日期");
                return ;
            }
            if(this.DateTimePicker==""){
                this.$Message.error("请选择点验时间");
                return ;
            }
            window.open(this.$basePath+"/check/dy/exportTreeXls?version="+this.version);
        },
        loadDataTree(version) {
            var _self = this;
            _self.$http.get("/check/dy/history?version="+version)
            .then(function(result) {
                if (result.success) {
                    _self.dataList = result.data;
                    _self.$Message.info("加载成功");
                }else{
                    _self.$Message.error("加载失败");
                }
            });
        },
        showmodes(row){//modes
            this.query.key=this.version;
            this.query.wheres.organid=row.id;
            var _self=this;
            this.$router.push(
                {
                    path:'/enforcement/shipsdy/dyhistoryjump',
                    query:{ 
                        key:_self.query.key, 
                        type:_self.query.type, 
                        organid:_self.query.wheres.organid,
                        mode:_self.query.wheres.mode
                    }
                }
            );
        },
        // defaultDate(){
        //     var date=new Date();
        //     var year=data.getFullYear();
        //     var month=dat
        // },
    },
    watch:{
        
    },
    mounted(){
    },
}
</script>

<style scoped>

</style>
          