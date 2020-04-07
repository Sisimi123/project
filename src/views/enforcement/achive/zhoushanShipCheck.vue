<style lang="less" scoped>
    @import "../../../styles/common.less";
    @import "../../system/components/table.less";
</style>
<template>
<div style="width:100%;min-height:500px;" class="layout">
    <Layout>
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-nav">
                    <MenuItem name="1">
                        <span style="font-size:26px;font-weight:200;color:white;">渔船动态点验平台</span>
                    </MenuItem>
                    <MenuItem name="2">
                        <span>主页</span>
                    </MenuItem>
                    <MenuItem name="3">
                        <span>海图定位</span>
                    </MenuItem>
                    <MenuItem name="4">
                        <span>点验管理</span>
                    </MenuItem>
                    <MenuItem name="5">
                        <span>预设管理</span>
                    </MenuItem>
                    <MenuItem name="6">
                        <span>系统管理</span>
                    </MenuItem>
                </div>
            </Menu>
        </Header>
        <Layout :style="{'margin-top':'10px'}">
            <Sider hide-trigger :style="{background: '#fff'}">
                <div style="min-height:500px;">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <div style="border:1px solid #e5e5e5;">
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="arrow-right-b" color="#2fa4e7"></Icon>
                                    <span style="color:#2fa4e7;">主页</span>
                                </template>
                                <span style="display:inline-block;width:100%;border:0.5px solid #e5e5e5;position:relative;top:-15px;"></span>
                                <MenuItem class="menuitem" name="1-1">点验统计列表</MenuItem>
                                <MenuItem class="menuitem" name="1-2">点验统计历史</MenuItem>
                                <MenuItem class="menuitem" name="1-3">点验统计情况</MenuItem>
                                <MenuItem class="menuitem" name="1-4">救助渔船名单</MenuItem>
                                <MenuItem class="menuitem" name="1-5">点验黑名单</MenuItem>
                            </Submenu>
                        </div>
                    </Menu>                                 
                </div>
            </Sider>
            <Layout :style="{padding: '0 10px 0 10px'}">
                <Content>
                    <Card shadow>
                        <p slot="title" style="height:16px;margin:0;padding:0;font-size:13px;">今日点验进度：{{new Date().toLocaleString()}}</p>
                        <div style="position:relative;height:130px;">
                            <!-- 原点文字 -->
                            <span :style="'position:absolute;left:7.3%;top:3px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding1Color">02:00</span>
                            <span :style="'position:absolute;left:32.3%;top:3px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding2Color">08:00</span>
                            <span :style="'position:absolute;left:57.2%;top:3px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding3Color">14:00</span>
                            <span :style="'position:absolute;left:82.2%;top:3px; z-index:1000;font-size:16px;font-weight:bold;color:'+zhengding4Color">20:00</span>
                            <!-- 原点 -->
                            <span :style="'position:absolute;left:8%;top:42px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian1Color+';border-radius: 50%;'"></span>
                            <span :style="'position:absolute;left:33%;top:42px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian2Color+';border-radius: 50%;'"></span>
                            <span :style="'position:absolute;left:58%;top:42px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian3Color+';border-radius: 50%;'"></span>
                            <span :style="'position:absolute;left:83%;top:42px; z-index:1000;width:0px;height:0px;border:9px solid '+yuandian4Color+';border-radius: 50%;'"></span>
                            <!-- 开始/未开始 -->
                            <span style="position:absolute;left:7.3%;top:75px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi1}}</span>
                            <span style="position:absolute;left:32.3%;top:75px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi2}}</span>
                            <span style="position:absolute;left:57.2%;top:75px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi3}}</span>
                            <span style="position:absolute;left:82.2%;top:75px; z-index:1000;font-size:16px;color:#ccc;">{{wenzi4}}</span>
                            <!-- 点验提示时间 -->
                            <span :style="'position:absolute;left:'+(percent-2.5)+'%;top:100px; z-index:1000;font-size:12px;color:#dc1728;text-align:center;'">
                                点验中
                                <br/>
                                <span>(用时 {{checkTime}})</span>
                            </span>
                            <Progress :percent="percent" :stroke-width="7"  hide-info style="position: absolute;top:42px;width:100%;overflow: hidden;"></Progress>
                        </div>
                    </Card>
                    <div style="height:300px;overflow: auto;margin-top:10px;">
                        <MyTreeGrid 
                            ref="dataGrid"                               
                            size="small"
                            border 
                            :columns="columnList" 
                            :data="filterTree" 
                            >
                        </MyTreeGrid>  
                    </div>
                </Content>
            </Layout>
        </Layout>
    </Layout>
</div>
</template>
<script>
import MyTreeGrid from "../../components/treeGrid/MyTreeGrid.vue";
import { isNull, isEmpty } from "../../../libs/common";
export default {
    name: "zhoushanShipCheck",
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
            dataFilter: "",
            dataList: [],
            dataTotal: 0, 
            columnList: [ 
                {
                    title: "所属区域",
                    type: "tree", 
                    key: "name",
                    width: 200
                },
                {
                    title: "船总数",
                    align:"center",
                    key: "zs",
                },
                {
                    title: "点验数",
                    align:"center",
                    render:(h,params)=>{
                        var bmd=params.row.bmd;
                        var zs=params.row.zs;
                        return h('div',parseInt(zs-bmd));
                    }
                },
                {
                    title: "白名单",
                    align:"center",
                    key: "bmd",
                },
                {
                    title: "离线数",
                    align:"center",
                    key: "lx",
                },
                {
                    title: "离编数",
                    align:"center",
                    key: "lb",
                },
                {
                    title: "异常率",
                    align:"center",
                    key: "ycl",
                },
                {
                    title: "已核查",
                    align:"center",
                    render:(h,params)=>{
                        var lx=params.row.lx;
                        var dhc=params.row.dhc;
                        return h('div',parseInt(lx-dhc));
                    }
                },
                {
                    title: "待核查",
                    align:"center",
                    key: "dhc",
                },
                {
                    title: "在港",
                    align:"center",
                    key: "zg",
                },
                {
                    title: "作业",
                    align:"center",
                    key: "zy",
                },
                {
                    title: "未联系",
                    align:"center",
                    key: "sl",
                },
                {
                    title: "出航",
                    align:"center",
                    key: "ch",
                },
                {
                    title:"返航",
                    align:"center",
                    key:"fh",
                },
            ],
            
        };
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
        loadDataTree(id) {
          var _self = this;
        //   var params="/map/organs/tree";
        //   if(id!=undefined){
        //     params="/map/organs/tree?organid="+id;
        //   }
          _self.$http.get("/check/dy")
          .then(function(result) {
            if (result.success) {
              _self.dataList = result.data;
            }
          });
        },
        wenziColor(){
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
            var digit=hour*3600+minute*60+second;
            if(parseInt(digit/864)<101){
                this.percent=parseInt(digit/864);
            }
        },
        dingShiQi(){
            var _self=this;
            var timer=setInterval(function(){
                _self.Progress();
                _self.wenziColor();
            },1000);
        },
    },
    beforeMount(){
        this.Progress();
        this.wenziColor();
    },
    mounted(){
        this.loadDataTree();
        this.dingShiQi();
    },
}
</script>

<style scoped>
/* .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    margin-top:10px;
}
.layout-nav{
    width: 100%;
    margin: 0 auto;
    margin-right: 20px;
}
.ivu-layout-header {
    background: #45aeea;
    padding: 0 50px;
    height: 64px;
    line-height: 64px;
}
.ivu-menu-dark {
    background: #45aeea;
}
.ivu-menu.ivu-menu-dark.ivu-menu-horizontal{
    position: relative;
    right:60px;
}
.ivu-menu-item{
    height:64px;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
    color: white;
}
.layout-nav>.ivu-menu-item:first-child:hover{
    background: #45aeea;
    cursor:auto;
}
.ivu-menu-item:hover{
    background-color: #1684c2;
}
.menuitem.ivu-menu-item:hover{
    background: #f5f5f5;
}
.ivu-layout-content{
    min-height:500px;
    background:white;
} */
.menuitem.ivu-menu-item{
    color:#2fa4e7;
    height:30px;
    line-height: 30px;
    padding:0;
}
</style>
      