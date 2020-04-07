<style lang="less" scoped>
    @import "../../../styles/common.less";
</style>
<template>
    <div style="height:100%;overflow:auto;">
        <Row style="">
            <Card shadow style="">
            <Card shadow style="border:1px solid #e9eaec;">
                <p slot="title" style="height:15px;margin:0;padding:0;font-size:13px;">今日点验进度：{{new Date().toLocaleString()}}</p>
                <div style="position:relative;height:90px;">
                    <!-- 原点文字 -->
                    <span :style="'position:absolute;left:7.3%;top:-10px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding1Color">02:00</span>
                    <span :style="'position:absolute;left:32.3%;top:-10px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding2Color">08:00</span>
                    <span :style="'position:absolute;left:57.2%;top:-10px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding3Color">14:00</span>
                    <span :style="'position:absolute;left:82.2%;top:-10px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding4Color">20:00</span>
                    <!-- 原点 -->
                    <span :style="'position:absolute;left:8%;top:12px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian1Color+';border-radius: 50%;'"></span>
                    <span :style="'position:absolute;left:33%;top:12px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian2Color+';border-radius: 50%;'"></span>
                    <span :style="'position:absolute;left:58%;top:12px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian3Color+';border-radius: 50%;'"></span>
                    <span :style="'position:absolute;left:83%;top:12px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian4Color+';border-radius: 50%;'"></span>
                    <!-- 开始/未开始 -->
                    <span style="position:absolute;left:7.3%;top:45px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi1}}</span>
                    <span style="position:absolute;left:32.3%;top:45px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi2}}</span>
                    <span style="position:absolute;left:57.2%;top:45px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi3}}</span>
                    <span style="position:absolute;left:82.2%;top:45px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi4}}</span>
                    <!-- 点验提示时间 -->
                    <span :style="'position:absolute;left:'+(percent-2.5)+'%;top:68px; z-index:1000;font-size:12px;color:#dc1728;text-align:center;'">
                        点验中
                        <br/>
                        <span>(用时 {{checkTime}})</span>
                    </span>
                    <Progress :percent="percent" :stroke-width="7"  hide-info style="position: absolute;top:12px;width:100%;overflow: hidden;"></Progress>
                </div>
            </Card>
            <div style="margin-top:10px;">
                <Row>
                    <Col span="24" style="margin-bottom:3px;">
                        <Row>
                            <Col span="2" style="display: inline-block;border:1px solid #e9eaec;border-bottom:1px solid transparent;height:32px;line-height: 32px;text-align: center;">点验统计</Col>
                            <Col span="22" style="display: inline-block;border:1px solid transparent;border-bottom:1px solid #e9eaec;height:32px;line-height: 32px;">
                                <Button @click="showExcelTree()"  type="info" icon="ios-cloud-upload-outline" size="small" style="float:right;margin-right:10px;">导出Excel</Button>
                            </Col>
                        </Row>
                    </Col>      
                    <Col span="24">
                        <MyTreeGrid 
                            ref="dataGrid"                               
                            size="small"
                            :height="475"
                            border 
                            :columns="columnList" 
                            :data="filterTree" 
                            >
                        </MyTreeGrid> 
                    </Col> 
                </Row> 
            </div>
        </Card>
        </Row>
    </div>
</template>
<script>
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import { isNull, isEmpty } from "../../../libs/common";
export default {
    name: "dainyanlists",
    components: {
        MyTreeGrid
    },
    data() {
        return {
            value1: '1',
            percent:0,
            checkTime:"",
            wenzi1:"",
            wenzi2:"",
            wenzi3:"",
            wenzi4:"",
            zhengding1Color:"",
            zhengding2Color:"",
            zhengding3Color:"",
            zhengding4Color:"",
            yuandian1Color:"",
            yuandian2Color:"",
            yuandian3Color:"",
            yuandian4Color:"",
            query:{
                type:"1",
                wheres:{
                    mode:"",
                    organid:"",
                },
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
                    key: "zs",
                    minWidth:50,
                },
                {
                    title: "点验数",
                    align:"center",
                    minWidth:50,
                    render:(h,params)=>{
                        var _self=this;
                        var bmd=params.row.bmd;
                        var zs=params.row.zs;
                        if(parseInt(zs-bmd)==0){
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
                                                _self.query.type="1";
                                                _self.showmodes(params.row);
                                            }
                                        }
                                }, parseInt(zs-bmd))
                            ])
                        }
                    }
                },
                {
                    title: "白名单",
                    align:"center",
                    key: "bmd",
                    minWidth:50,
                },
                {
                    title: "离线数",
                    align:"center",
                    key: "lx",
                    minWidth:50,
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
                    key: "lb",
                    minWidth:50,
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
                    key: "ycl",
                    minWidth:50
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
                    align:"center",
                    minWidth:50,
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
                    align:"center",
                    minWidth:40,
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
                    align:"center",
                    minWidth:40,
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
                    align:"center",
                    minWidth:50,
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
                //     align:"center",
                //     minWidth:40,
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
                    title:"在线数",
                    align:"center",
                    minWidth:40,
                    key:"zs",
                    render: (h, params) => {
                        var str = '';
                        str = params.row.zs - params.row.lx;
                        return h('span', str);
                    }
                },
                {
                    title:"在线率",
                    align:"center",
                    minWidth:40,
                    key:"zs",
                    render: (h, params) => {
                        var str = '';   
                        console.log(params.row.ycl,'params.row.ycl')
                        if(params.row.ycl == "0%"){
                            str = "100%"
                        }else{
                        str = (100 - parseInt(params.row.ycl.slice(0, params.row.ycl.length - 2))) + '%';
                        }
                        return h('span', str);
                        // console.log(parseInt(params.row.zs) - parseInt(params.row.lx))
                    }
                }
            ],
            dataFilter: "",
            dataListl: [],
        };
    },
    computed: {
        filterTree() {
          var tree = this.$util.deepCopy(this.dataListl);
          return this.$util.diguiTree(tree, this.dataFilter, function(
            node,
            filter
          ) {
            return !isNull(node.name) && node.name.indexOf(filter) >= 0;
          });
        },
    },
    methods: {
        showExcelTree(){
            window.open(this.$basePath+"/check/dy/exportTreeXls?version="+"");
        },
        showmodes(row){//modes
            this.query.wheres.organid=row.id;
            var _self=this;
            this.$router.push(
                {
                    path:'/enforcement/shipsdy/dylistjump',
                    query:{ 
                        type:_self.query.type, 
                        organid:_self.query.wheres.organid,
                        mode:_self.query.wheres.mode
                    }
                }
            );
        },
        loadDataTree() {
          var _self = this;
          _self.$http.get("/check/dy")
          .then(function(result) {
            if (result.success) {
              _self.dataListl = result.data;
            }
          });
        },
        fontColor(){
            // 整点颜色
            if(this.percent>0 && this.percent<32.3){
                this.zhengding1Color="#dc1728";
            }else{
                this.zhengding1Color="#ccc";
            }
            if(this.percent>=32.3 && this.percent<57.2){
                this.zhengding2Color="#dc1728";
            }else{
                this.zhengding2Color="#ccc";
            }
            if(this.percent>=57.2 && this.percent<82.2){
                this.zhengding3Color="#dc1728";
            }else{
                this.zhengding3Color="#ccc";
            }
            if(this.percent>=82.2){
                this.zhengding4Color="#dc1728";
            }else{
                this.zhengding4Color="#ccc";
            }
            //文字、原点颜色
            if(this.percent>7.3){
                this.wenzi1="";
                this.yuandian1Color="#2db7f5";
            }else{
                this.wenzi1="未开始";
                this.yuandian1Color="#ccc";
            }
            if(this.percent>32.3){
                this.wenzi2="";
                this.yuandian2Color="#2db7f5";
            }else{
                this.wenzi2="未开始";
                this.yuandian2Color="#ccc";
            }
            if(this.percent>57.2){
                this.wenzi3="";
                this.yuandian3Color="#2db7f5";
            }else{
                this.wenzi3="未开始";
                this.yuandian3Color="#ccc";
            }
            if(this.percent>82.2){
                this.wenzi4="";
                this.yuandian4Color="#2db7f5";
            }else{
                this.wenzi4="未开始";
                this.yuandian4Color="#ccc";
            }
        },
        Progress(){
            var nowDt=new Date();
            var hour=nowDt.getHours();
            var minute=nowDt.getMinutes();
            var second=nowDt.getSeconds();
            var digit=hour*3600+minute*60+second;
            if(parseInt(digit/864)<101){
                this.percent=parseInt(digit/864);
            }
            if(hour<10){
                hour="0"+hour;
            }
            if(minute<10){
                minute="0"+minute;
            }
            if(second<10){
                second="0"+second;
            }
            this.checkTime=hour+":"+minute+":"+second;
        },
        timer(){
            var _self=this;
            var timer=setInterval(function(){
                _self.Progress();
                _self.fontColor();
            },1000);
        },  
    },
    beforeMount(){
        this.Progress();
        this.fontColor();
    },
    mounted(){
        this.loadDataTree();
        this.timer();
    },
}
</script>
<style scoped>
.menuitem.ivu-menu-item{
    color:#2fa4e7;
    height:30px;
    line-height: 30px;
    padding:0;
}
</style>
      