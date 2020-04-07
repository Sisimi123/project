<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <div>
            <Row>
                <Col span="24">
                    <Card>
                        <Row>
                            <Input v-model="query.wheres.name_like" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            <Button type="info" @click="newSiteInfo">新增站点</Button>
                        </Row>
                        <Row class="margin-top-5">
                            <Table ref="logTable" :height="clientHeight-222" size="small" border :columns="columnList" :data="dataList" @on-selection-change="selectChange"></Table>
                        </Row>
                        <Row class="margin-top-5">
                            <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>

        <Modal v-model="siteModal" :title="isNew?'新增站点':'编辑站点'" :mask-closable=false width="620">
            <Form ref="siteInfo" :model="siteInfo"  :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="站点名称:" prop="name">
                            <Input v-model="siteInfo.name" placeholder="请输入站点名称..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="站点域名:" prop="domain">
                            <Input v-model="siteInfo.domain" placeholder="请输入站点域名..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <FormItem label="模版路径:" prop="path">
                            <Input v-model="siteInfo.path" placeholder="请输入模版路径..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="备注:">
                    <Input v-model="siteInfo.note" type="textarea" placeholder="请输入备注..."></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="siteModal=false">取消</Button>
                <Button type="primary" @click="saveSiteInfo">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    name: 'SystemSite',
    data () {
        return {
            columnList: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 70,
                    align: 'center',
                    key: 'id'
                },
                {
                    title: '名称',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '域名',
                    width: 200,
                    align: 'center',
                    key: 'domain'
                },
                {
                    title: '模版路径',
                    width: 200,
                    align: 'center',
                    key: 'path'
                },
                {
                    title: '时间',
                    width: 200,
                    align: 'center',
                    key: 'createTime',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.editSiteInfo(params)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.removeSite(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            dataList: [],
            dataTotal:0,
            query:{
                page:1,
                size:10,
                wheres:{
                    name_like:"",
                    createTime_bwt:{
                        start:"",
                        end:""
                    }
                },
                orders:"createTime desc"
            },
            ruleValidate:{
                name: [
                    { required: true, message: '站点名称不能为空！', trigger: 'blur' }
                ],
                domain: [
                    { required: true, message: '站点域名不能为空！', trigger: 'blur' },
                ],
                path: [
                    { required: true, message: '模版路径不能为空！', trigger: 'blur' },
                ],
            },
            siteModal:false,
            isNew:true,
            siteInfo:{},
            siteSelection:[]
        };
    },
    computed:{
        clientHeight(){
            return this.$store.state.app.clientHeight;
        }
    },
    methods: {
        selectChange(selection){
            this.siteSelection=selection;
        },
        newSiteInfo(){
            this.isNew=true;
            this.siteInfo={},
            this.siteModal=true
        },
        editSiteInfo(params){
            var _self = this;
            var id=params.row.id;
            _self.$refs["siteInfo"].validate((valid) => {
                _self.$http.get("/$admin/sites/"+id).then(function(result){
                    if(result.success){
                        _self.isNew=false;
                        _self.siteInfo=result.data;
                        _self.siteModal=true;
                    }
                });
            });
        },
        saveSiteInfo(){
            var _self = this;
            _self.$refs["siteInfo"].validate((valid) => {
                if (valid) {
                    if(_self.isNew){
                        _self.$http.post("/$admin/sites",_self.siteInfo)
                        .then(function(result){
                            _self.siteModal=false;
                            _self.getPageList();
                        });
                    }else{
                        var id=_self.siteInfo.id;
                        _self.$http.patch("/$admin/sites/"+id,_self.siteInfo)
                        .then(function(result){
                            if(result.success){
                                _self.siteModal=false;
                                _self.getPageList();
                            }
                        })
                    }
                }
            });
        },
        removeSite(params){
            var _self = this;
            _self.$util.delConfirm(_self,function(){
                var id=params.row.id;
                _self.$http.delete("/$admin/sites/"+id)
                .then(function(result){
                    _self.getPageList();
                });
            });
        },
        handleSearch(){
            this.query.page=1;
            this.getPageList();
        },
        pageChange(page){
            this.query.page=page;
            this.getPageList();
        },
        pageSizeChange(size){
            this.query.size=size;
            this.getPageList();
        },
        getPageList(){
            var _self=this;
            _self.$http.get("/$admin/sites/page",{
                params:{
                    query: JSON.stringify(_self.query)
                }
            }).then(function(result){
                if(result.success){
                    _self.dataList=result.data.data;
                    _self.dataTotal=result.data.total;
                }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    },
    mounted() {
        var _self=this;
        this.getPageList();
    }
};
</script>
