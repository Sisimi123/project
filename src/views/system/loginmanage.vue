<style lang="less">
    @import '../../styles/common.less';
</style>  
<template>
    <div>
        <data-table ref="test" 
            :url="'/$admin/siteUsers/page'" 
            :params="query" 
            :columns="columns" 
            >
            <div slot="search">
                <Form :label-width="40" @submit.native.prevent>
                    <Row>
                        <Col span="5">
                            <Form-item label="姓名:">
                                <Input v-model="query.wheres.name_like"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()"  >重置</Button>
                            <!-- <Button @click="newAdd()" type="info" icon="ios-add" >新增</Button> -->
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
    name: 'SystemLog',
    components: {

    },
    data () {
        return {
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    maxWidth: 80,
                    align: 'center',
                },
                {
                    title: '用户名',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '联系方式',
                    align: 'center',
                    key: 'mobile'
                },
                {
                    title: '用户ip',
                    align: 'center',
                    key: 'ip'
                },
                {
                    title: '注册时间',
                    maxWidth:160,
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '操作',
                    width:160,
                    align: 'center',
                    render: (h, params) => {
                        var _self=this;
                        var id = params.row.id;
                        var temp = [];
                        if(params.row.status=="0"){
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    on:{
                                        click:()=>{
                                            _self.tranStatus(params.row);
                                        }
                                    }                       
                                },"启用"));
                        }else if(params.row.status=="1"){
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },
                                    on:{
                                        click:()=>{
                                            _self.tranStatus(params.row);
                                        }
                                    }                       
                                },"锁定"));
                        }
                        return h("div", temp);
                    }
                },
            ],
            dataList: [],
            dataTotal:0,
            query:{
                page:1,
                size:20,
                wheres:{
                    name_like:"",
                    mobile_like:""
                },
            } 
        };
    },
    computed:{
        
    },
    methods: {
        initSearch() {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.query.page = 1;
            this.query.size = 20;
            this.initSearch();
        },
        tranStatus(row){
            var status="";
            if(row.status=="0"){
                status="1";
            }else if(row.status=="1"){
                status="0"
            }
            var _self=this;
            _self.$http.get("/$admin/siteUsers/updateStatus?id="+row.id+"&status="+status)
            .then(res=>{
                if(res.success){
                    _self.initSearch();
                }
            })
        },
    },
    mounted() {
    },
};
</script>
    



