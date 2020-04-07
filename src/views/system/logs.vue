<style lang="less">
        @import '../../styles/common.less';
    </style>
    
    <template>
        <div>
            <div>
                <Row>
                    <Col span="24">
                        <Card>
                            <Row>
                                <Input v-model="query.wheres.action_like" icon="ios-search" @on-change="handleSearch" placeholder="请输入查询条件..." style="width: 200px" />
                            </Row>
                            <Row class="margin-top-5">
                                <Table ref="logTable" :height="clientHeight-222" size="small" border highlight-row :columns="columnList" :data="dataList"></Table>
                            </Row>
                            <Row class="margin-top-5">
                                <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    </template>
    
    <script>
    export default {
        name: 'SystemLog',
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
                        title: '操作',
                        width: 250,
                        align: 'center',
                        key: 'action'
                    },
                    {
                        title: '设备',
                        width: 250,
                        align: 'center',
                        key: 'device'
                    },
                    {
                        title: 'IP地址',
                        width: 150,
                        align: 'center',
                        key: 'ip'
                    },
                    {
                        title: 'URL地址',
                        align: 'center',
                        key: 'url'
                    },
                    {
                        title: '请求时间',
                        width: 180,
                        align: 'center',
                        key: 'createTime',
                    },
                    {
                        title: '耗时（毫秒）',
                        width: 130,
                        align: 'center',
                        key: 'runtime',
                    }
                ],
                dataList: [],
                dataTotal:0,
                query:{
                    page:1,
                    size:20,
                    wheres:{
                        action_like:"",
                        createTime_bwt:{
                            start:"",
                            end:""
                        }
                    },
                    orders:"createTime desc"
                } 
            };
        },
        computed:{
            clientHeight(){
                return this.$store.state.app.clientHeight;
            }
        },
        methods: {
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
                _self.$http.get("/$admin/logs/page",{
                    params:{
                        query: JSON.stringify(_self.query)
                    }
                }).then(function(result){
                    if(result.success){
                        console.log(result.data);
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
    