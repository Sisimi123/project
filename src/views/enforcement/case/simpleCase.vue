
<template>
    <div>
        <data-table ref="test" 
            :url="'/enforces/case/page'" :params="query" :columns="columnList" 
            >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                <Row>
                    <Col span="5">
                        <Form-item label="选择条件:">
                            <Select v-model="query.wheres.me" @on-change="initSearch">
                                <Option value="2">全省/市/县</Option>
                                <Option value="0">本部门</Option>
                                <Option value="1">个人</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="当事人:">
                            <Input v-model="query.wheres.search" placeholder="请输入查询条件..." @on-enter="initSearch"></Input>
                        </Form-item>
                    </Col>

                    <div class="btn-wrap">
                        <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset()"  >重置</Button>
                    </div>

                    <div class="func-wrap">
                        <Button @click="newSimpleCase()" type="success" icon="ios-add" >新增</Button>
                    </div>
                    
                </Row>
                </Form>
            </div>
        </data-table>
    </div>
    
</template>
<script>
import {isNull } from '@/libs/common.js'

export default {
    name:"simpleCase",
    data(){
        var _self=this;
        return {
            columnList: [
                {
                    title: '序号',
                    key: 'id',
                    align: 'center',
                    width:67,
                    type:"index"
                },
                {
                    title: '当事人',
                    key: 'name',
                    width:190,
                    render: function(h, params) {
                        var temp=isNull(params.row.name)?params.row.unitName:params.row.name;
                        if(!isNull(params.row.shipname))
                            temp+="("+params.row.shipname+")";
                        return h("span",temp);
                    }
                },
                {
                    title: '涉案案由',
                    key: 'illegalAct',
                    render: function(h, params) {
                        var text=params.row.illegalAct;
                        var temp=(text.length>28)?(text.substring(0,28)+"..."):text;
                        return h("span",temp);
                    }
                },
                {
                    title: '案件编号',
                    key: 'caseNum',
                    width:230,
                    render:function(h, params){
                        var row=params.row;
                        var caseNum=row.enforceType+"〔"+row.enforceYear+"〕"+row.enforceNum+"号";
                        return h("span",caseNum);
                    }
                },
                {
                    title: '状态',
                    key: 'statusDescri',
                    width:130,
                    render:function(h, params){
                        var status=params.row.status;
                        return h("span",status=="8"?"结案":"办理中");
                    }
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: function(h, params){
                        var buttons=[];
                        var status=params.row.status;
                        if(status!="1")
                            buttons.push(h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: function() {
                                        _self.simpleCase("simpleCase",params.row.id);
                                    }
                                }
                            }, '办理'));

                        buttons.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: function() {
                                    _self.simpleCase("simpleCaseview",params.row.id);
                                }
                            }
                        }, '查看'));
                        return h('div', buttons);
                    }
                }
			],

            query:{
                page:1,
                size:20,
                wheres:{
                    me:"0",
                    search:"",
                    status:"0,1,8",
                    type:"0"
                }
            },
       }
    },
    computed:{

    },
    methods: {
        initSearch() {
            this.$refs.test.initSearch();
        },
        newSimpleCase(){
            this.simpleCase('simpleCase');
        },
        // 查询重置
        handleReset() {
            this.query.wheres.me = "0";
            this.query.wheres.search = "";
            this.query.wheres.status = "0,1";
            this.query.wheres.type = "0";
            this.query.page = 1;
            this.query.size = 20;
            this.initSearch();
        },
        simpleCase(view,caseId){
            this.$router.push({path:"/enforcement/case/addCase",query:{view:view,caseId}});
        },

    },
    mounted(){
        
    }
};
</script>

<style>
</style>
