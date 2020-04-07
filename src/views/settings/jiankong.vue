<style lang="less" scoped>
        @import '../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row>
                <data-table ref="test" 
                    :url="'/map/monitor/list'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="96" @submit.native.prevent>
                            <Row>
                                <Col span="4">
                                    <Select v-model="userStyle" @on-change="userChange" style="width:90%;text-align: left;"placeholder="请选择用户类型...">
                                        <Option value="1">监控用户</Option>
                                        <Option value="0">所有用户</Option>
                                    </Select>
                                </Col>
                                <Col span="4">
                                    <Form-item label="用户名(手机号):">
                                        <Input v-model="query.wheres.userinfo"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Form-item label="船名号:" :label-width="75">
                                        <Input v-model="query.wheres.shipname"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <div class="btn-wrap">
                                    <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                                    <Button @click="handleReset()"  >重置</Button>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </data-table>
            </Row>
            <!-- 监护渔船 -->
            <Modal v-model="status.watchShips" :styles="{top: '150px'}" title="监护渔船" width="50%">
                <div slot="footer" >
                    <Button @click="status.watchShips = false" type="info">关闭</Button>
                </div>
                <Row>
                    <Col span="24">
                        <Row>
                            <div>
                                <span>渔船名：</span>
                                <Input v-model="queryWs.wheres.shipname" @on-keydown.enter="selectShipWs(1)"  style="width:30%" placeholder="请输入..."></Input>
                                <Button style="margin-left:5px" @click="selectShipWs(1)" type="primary"  icon="ios-search">搜索</Button>
                                <Button @click="resetSelectShipWs()">重置</Button>
                                <Button @click="addShipsModal()" type="success" icon="ios-add" >添加渔船</Button>
                            </div>
                        </Row>
                        <Row >
                            <div style="margin-top:10px">
                                <Table 
                                :loading="status.selectShiploading" 
                                :columns="columnsWsShip" 
                                :data="selectedWsList" border :height="400"></Table>
                            </div>
                        </Row>
                        <Row>
                            <div class="bottom">
                                <Page show-total 
                                :total="totalNumWs" show-sizer show-elevator 
                                placement=top 
                                @on-page-size-change="pageSizeChangeWs" 
                                :page-size="queryWs.size" 
                                :current="queryWs.page" 
                                @on-change="changePageWs" ></Page>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Modal>
            <!-- 渔船列表 -->
            <Modal v-model="status.shipsList" :styles="{top: '150px'}" title="渔船列表" width="50%">
                <div slot="footer" >
                    <Button @click="status.shipsList = false">取消</Button>
                    <Button type="info" @click="addShips()">确定</Button>
                </div>
                <Row>
                    <Col span="24">
                        <Row>
                            <div>
                                <span>渔船名：</span>
                                <Input v-model="queryShips.wheres.shipname" @on-keydown.enter="selectShips(1)"  style="width:30%" placeholder="请输入..."></Input>
                                <Button style="margin-left:5px" @click="selectShips(1)" type="primary"  icon="ios-search">搜索</Button>
                                <Button @click="resetSelectShips()">重置</Button>
                            </div>
                        </Row>
                        <Row >
                            <div style="margin-top:10px">
                                <Table  
                                @on-selection-change="selectChange"
                                :loading="status.selectShiploading" 
                                :columns="columnsSelectShip" 
                                :data="selectedShipsList" border :height="400"></Table>
                            </div>
                        </Row>
                        <Row>
                            <div class="bottom">
                                <Page show-total 
                                :total="totalNumShips" show-sizer show-elevator 
                                placement=top 
                                @on-page-size-change="pageSizeChangeShips" 
                                :page-size="queryShips.size" 
                                :current="queryShips.page"
                                @on-change="changePageShips" ></Page>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </div>     
    </template>
    <script>
    import {isNull,isEmpty} from '@/libs/common.js'  
    import user from '@/store/module/user.js';
    var userId=user.state.userInfo.userId;
    export default {
        name: 'jiankong',
        components: {
        },
        data () {
            return {
                userShow:true,
                status:{
                    shipsList:false,
                    watchShips:false,
                },
                userStyle:"1",
                //渔船列表
                totalNumShips:1,
                queryShips: {
                    page: 1,
                    size: 10,
                    wheres: {
                        shipname: "",//渔船名搜索
                    },
                },
                selectedShipsList:[], 
                columnsSelectShip: [
                    {
                        type: "selection",
                        maxWidth: 60,
                        align: "center"
                    },
                    {
                        title: "序号",
                        type: "index",
                        maxWidth: 80,
                        align: "center"
                    },
                    {
                        key: "b",
                        title: "船名号",
                        align: "center"
                    },
                    {
                        key: "c",
                        title: "船东",
                        align: "center"
                    },
                    {
                        key: 'i',
                        title: '联系方式',
                        align: 'center'
                    }, 
                ],
                //监护渔船列表
                selectedWsList:[],
                totalNumWs:1,
                queryWs: {
                    key:"",
                    page: 1,
                    size: 10,
                    wheres: {
                        shipname: "",
                    },
                },
                columnsWsShip: [
                    {
                    title: "序号",
                    type: "index",
                    maxWidth: 60,
                    align: "center"
                    },
                    {
                    key: "b",
                    title: "船名号",
                    align: "center"
                    },
                    {
                    key: "c",
                    title: "船东姓名",
                    align: "center"
                    },
                    {
                    key: "i",
                    title: "联系方式",
                    align: "center"
                    },
                    {
                    title: "操作",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                        return h(
                            "Button",
                            {
                                props: {
                                type: "error",
                                size: "small"
                                },
                                on: {
                                click: () => {
                                    this.deleteWsShip(params.row);
                                }
                                }
                            },
                            "删除"
                            );
                        }
                    }
                ],
            
                //
                usersLists:[],
                totalNum:1,
                query:{
                    page:1,
                    size:20,
                    type:"1",//0 表示所有用户
                    wheres:{
                        userinfo:"",//用户的名称或手机号
                        shipname:"",//渔船名
                    },
                },
                columns:[
                    {   
                        title:'序号',
                        type: 'index',
                        maxWidth: 80,
                        align: 'center',
                    },
                    {   
                        title:'用户名',
                        align: 'center',
                        key: 'name',
                    },
                    {
                        title: '联系方式',
                        align: 'center',
                        key: 'mobile'
                    },
                    {
                        title: '登录名',
                        align: 'center',
                        key: 'username'
                    },
                    {
                        title: '用户类型',
                        align: 'center',
                        key: 'userType',
                        render:(h,params)=>{
                            var userType=params.row.userType;
                            if(userType=="sys"){
                                return h("div","公众用户")
                            }else{
                                return h("div","后台用户");
                            }
                        }
                    },
                    {
                        title: '监控数量',
                        align: 'center',
                        key: 'count'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:120,
                        render: (h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var temp = [];
                            temp.push(
                                h("Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    on:{
                                        click:()=>{
                                            _self.shipsWatch(params.row);
                                        }
                                    }                       
                                },"渔船监控"));
                            return h("div", temp);
                        }
                    },
                ],
                //
                newSelectsShip:[],
            }
        },
        computed:{  

        },
        methods: {
            userChange(v){
                this.query.type=v;
                this.initSearch();
            },
            //首页面
            dbhandleEdit(msg){
                this.shipsWatch(msg);
            },
            initSearch() {
                this.$refs.test.initSearch();
            },
            handleReset(){
                this.query.wheres.userinfo="";
                this.query.wheres.shipname="";
                this.query.page=1;
                this.query.size=20;
                this.initSearch();
            },
            shipsWatch(row){//渔船监控按钮
                this.queryWs.wheres.shipname="";
                this.queryWs.page=1;
                this.queryWs.size=10;
                this.queryWs.key=row.id;
                this.status.watchShips=true;
                this.selectShipWs();
            },
            selectChange(v){//选择渔船
                this.newSelectsShip=v;
            },
            addShips(){//选定渔船后的弹窗确定按钮
                var keyIds=[];
                for(var j=0;j<this.newSelectsShip.length;j++){
                    if(this.newSelectsShip[j]._checked==undefined){
                        keyIds.push(this.newSelectsShip[j].a);
                    }
                }
                var _self=this;
                this.newAddParams={
                    key:_self.queryWs.key,
                    wheres:{
                        ships:keyIds,
                    },
                };
                _self.$http.post("/map/monitor/add",_self.newAddParams)
                .then(res=>{
                    if(res.success){
                        _self.initSearch();
                        _self.selectShipWs();
                        _self.status.shipsList=false;
                        _self.$Message.info("操作成功");
                    }else{
                        _self.$Message.error(res.msg);
                    }
                });
            },
            //渔船列表
            addShipsModal(){//添加渔船弹窗按钮
                this.status.shipsList=true;
                this.newSelectsShip=[];
                this.queryShips.page = 1;
                this.queryShips.size = 10;
                this.queryShips.wheres.shipname="";
                this.selectShips();
            },
            selectShips(value) {
                var _self=this;
                if (value == 1) {
                    this.queryShips.page = 1;
                }
                this.$http
                .get("/map/monitor/yclist", {
                    params: {
                        query: JSON.stringify(this.queryShips)
                    }
                })
                .then(res => {
                    _self.totalNumShips= res.data.total;
                    _self.selectedShipsList = res.data.data;
                    _self.selectedShipsList.forEach(element => {
                        for(var i=0;i<_self.selectedWsList.length;i++){
                            if(element.a==_self.selectedWsList[i].a){
                                element._disabled = true;
                                element._checked = true;
                                break;
                            }
                        }
                    });
                })
            },
            resetSelectShips(){
                this.queryShips.wheres.shipname ="";
                this.queryShips.page=1;
                this.queryShips.size=10;
                this.selectShips();
            },
            pageSizeChangeShips(size){
                this.queryShips.size = size;
                this.selectShips();
            },   
            changePageShips(page){
                this.queryShips.page = page;
                this.selectShips();
            },
            //监控渔船列表
            deleteWsShip(row){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除选中的监护渔船吗？",
                    onOk:function(){
                        _self.$http.delete("/map/monitor/delete?userId="+_self.queryWs.key+"&shipid="+row.a)
                        .then(res => {
                            if(res.success){
                                _self.$Message.info("删除成功");
                                _self.selectShipWs();
                                _self.initSearch();
                            }else{
                                _self.$Message.error(res.msg);
                            }
                        })
                    }
                });
            },
            selectShipWs(value) {
                if (value == 1) {
                    this.queryWs.page = 1;
                }
                this.$http.get("/map/monitor/info", {
                    params: {
                        query: JSON.stringify(this.queryWs)
                    }
                })
                .then(res => {
                    this.totalNumWs= res.data.total;
                    this.selectedWsList = res.data.data;
                    this.status.selectShiploading = false;
                })
            },
            resetSelectShipWs(){
                this.queryWs.wheres.shipname ="";
                this.queryWs.page=1;
                this.queryWs.size=10;
                this.selectShipWs();
            },
            pageSizeChangeWs(size){
                this.queryWs.size = size;
                this.selectShipWs();
            },   
            changePageWs(page){
                this.queryWs.page = page;
                this.selectShipWs();
            },
        },
        mounted() {

        },
    };
    </script>      
    <style scoped>
    </style>