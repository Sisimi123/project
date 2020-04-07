<style lang="less" scoped>
    @import './styles/wenshou.less';
</style>
<template>
    <div class="wrapper">
        <header>
            <div class="left-name-wrap">
                <em class="system-name">
                    <i>浙江省海洋与渔业综合管理系统执法文书</i>
                </em>
                <em class="home-btn-wrap">
                    <a class="return-home"><b>首页</b></a> 
                    <a class="return-sj"><b>返回上级</b></a> 
                </em>
            </div>
            <div class="user"><b></b><em>超级管理员</em></div>
        </header>
        <div class="flex-wrap">
            <!-- 左侧菜单 -->
            <div class="left-menu" :class="{active: nav.activeFlag}">
                <menu>
                    <nav class="fn-line"><Button type="primary">保存排序</Button></nav>
                    <nav class="nav" ref="nav" v-for="navs in nav.item" @click="navActive(navs.name)" :class="{active: nav.activeName == navs.name}">
                        <em>{{navs.code}}. {{navs.name}}</em>
                        <div class="mini">
                            <span class="btn edit"><b></b></span>
                            <span class="btn del"><b></b></span>
                            <span class="btn site"><b></b></span>
                        </div>
                    </nav>
                </menu>
                <input class="flex-btn" type="button"   @click="menuSelected(nav.activeFlag)"/>
            </div>
            <!-- 中间内容 -->
            <div class="center-content">
                <div class="fn-line">
                     <Button type="primary" icon="plus-round">添加当前文书</Button>
                     <Button type="primary" icon="plus-round">添加文书</Button>
                     <Button type="primary" icon="printer" size="18px">打印</Button>
                     <Button type="primary" icon="eye">查看流程</Button>
                </div>
            </div>
            <!-- 右侧功能菜单 -->
            <div class="right-menu"  :class="{active: nature.activeFlag}">
                <div class="nature-wrap">
                    <div class="nature"  v-for="natures in nature.item" @click="natureActive(natures.name)" :class="{active: nature.activeName == natures.name}">
                        <div class="nature-head">
                            <Icon type="arrow-down-b"></Icon>
                            <em>{{natures.name}}</em>
                            <div class="nature-btn-wrap">
                                <Button type="success">载入模板</Button>
                                <Button type="warning">暂停笔录</Button>
                            </div>
                        </div>
                        <div class="nature-body">
                            <div class="search-wrap">
                                <Input icon="ios-search-strong" placeholder="请输入搜索关键字"></Input>
                                <Button type="primary">新增模板</Button>
                            </div>
                            <ul class="writ-list">
                                <li>
                                    <span class="writ-title">行政处罚结案报告行政处罚结案报告行政处罚结案报告</span>
                                    <span class="writ-btn">
                                        <Button  size="small">加载</Button>
                                        <Button  size="small">编辑</Button>
                                        <Button  size="small">删除</Button>
                                    </span>
                                </li>
                                <li>
                                    <span class="writ-title">行政处罚结案报告行政处罚结案报告行政处罚结案报告行政处罚结案报告</span>
                                    <span class="writ-btn">
                                        <Button  size="small">加载</Button>
                                        <Button  size="small">编辑</Button>
                                        <Button  size="small">删除</Button>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <input class="flex-btn" type="button"   @click="natureSelected(nature.activeFlag)"/>
            </div>
            <!-- <router-view></router-view> -->
            <!-- <footer>
                <em class="copyright">© 浙江省海洋与渔业局</em>
                <span class="pagebar">
                    <a>1</a>
                </span>
            </footer> -->
        </div>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
    data(){
       return {
           //左侧菜单栏
            nav:{
                item:[{
                    code:1,
                    name:'行政处罚立案审批表'
                },{
                    code:2,
                    name:'接受调查询问通知书'
                },{
                    code:3,
                    name:'案件调查最终报告 '
                },{
                    code:4,
                    name:'扣押情况说明'
                },{
                    code:5,
                    name:'禁止离港通知书'
                },{
                    code:6,
                    name:'当事人送达地址确认书 '
                },{
                    code:7,
                    name:'案件集体讨论记录'
                },{
                    code:8,
                    name:'查封（扣押）现场...'
                },{
                    code:9,
                    name:'行政处罚决定审批表'
                },{
                    code:10,
                    name:'行政处罚结案报告'
                }],
                activeFlag:false,//是否显示
                activeName:'行政处罚立案审批表',
            },
            //右侧功能栏
            nature:{ 
                item:[{
                    name:'案件属性',
                    html:'111111111'
                },{
                    name:'文书模板',
                    html:'222222222222'
                },{
                    name:'其他',
                    html:'3333'
                }],
                activeFlag:true,//是否显示
                activeName:'案件属性',
            },
           caseInfo:{
               user:'',
               shipinfo: {
                   shipName: '',
               },
           },
           	caseInfoRules:{
				shipname: [{required: false, type: 'string', message: '请输入船舶名称', trigger: 'change'}],
            }
       }
   },
   methods: {
        menuSelected: function(navFlag) {
            let natureFlag = this.nature.activeFlag
            this.nav.activeFlag = !navFlag;
            this.nature.activeFlag = !natureFlag;
        },
        navActive:function(navName){
            this.nav.activeName = navName;
        },
        natureSelected: function(navFlag) {
            let navsFlag = this.nav.activeFlag
            this.nature.activeFlag = !navFlag;
            this.nav.activeFlag = !navsFlag;
        },
        natureActive:function(navName){
            this.nature.activeName = navName;
        },
        saveWenshou(){

        },
        loadWenshou(){

        },
        removeWenshou(){

        },
        loadWenshouList(){

        },
        
    },
    mounted(){

    }
};
</script>

<style>

</style>
