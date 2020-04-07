 <template>
    <div>
        <data-table ref="test" 
            :url="'/site/message/board/page'" 
            :params="query" 
            :columns="columns" 
            >
            <div slot="search">
                <Form :label-width="80" @submit.native.prevent>
                    <Row>
                        <Col span="6">
                            <Form-item label="主题:">
                                <Input v-model="query.wheres.theme"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <div class="btn-wrap">
                            <Button @click="initSearch()" type="primary" icon="ios-search" >搜索</Button>
                            <Button @click="handleReset()"  >重置</Button>
                            <Button @click="newAdd()" type="info" icon="ios-add" >新增</Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </data-table>
        <!-- 新增/修改 -->
        <Modal :styles="{top: '100px'}" v-model="updateModal" :title="title" width="50%" >
            <Form  :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="留言人:">
                            <Input v-model="updateMessage.name"/>
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="主题:">
                            <Input v-model="updateMessage.theme"/>
                        </FormItem>
                    </Col>                 
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="审核:">
                            <Select v-model="updateMessage.state">
                                <Option value="0">未审核</Option>
                                <Option value="1">审核通过</Option>
                                <Option value="2">审核不通过</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="置顶:">
                            <Select v-model="updateMessage.sfzd">
                                <Option value="0">不置顶</Option>
                                <Option value="1">置顶</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="24">
                        <FormItem label="留言信息:">
                            <textarea v-model="updateMessage.content" name="" rows="3" style="width:100%;"></textarea>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-show="messageShow">
                    <FormItem label="网友评论:">
                        <div style="height:400px;overflow:auto;">
                            <Col span="24">
                                <Table   
                                    height="400" 
                                    border 
                                    :columns="columnsMessage"  
                                    :data="dataListMessage" 
                                    :loading="false"
                                ></Table>
                            </Col>
                        </div>
                    </FormItem>
                    <!-- <Col>
                        <Page 
                        show-total 
                        :total="totalNumX" 
                        show-sizer 
                        show-elevator 
                        placement=top 
                        @on-page-size-change="pageSizeChange" 
                        :page-size="queryX.size" 
                        :current="queryX.page" 
                        @on-change="changePage" 
                        ></Page>
                    </Col> -->
                </Row>
            </Form>	
            <div slot="footer">
                <Button @click="updateModal = false">取消</Button>
                <Button type="info" @click="saveDate()">保存</Button>
                <Button type="info" v-show="messageShow" @click="newAddMessage()">新增评论</Button>
            </div>         
        </Modal> 
        <!-- 评论信息 新增/修改 -->
        <Modal :styles="{top: '220px'}" v-model="messageModal" :title="title" width="50%" >
            <Form  :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="评论人:">
                            <Input v-model="dataListMessage.name"/>
                        </FormItem>
                    </Col>   
                    <Col span="12">
                        <FormItem label="审核:">
                            <Select v-model="dataListMessage.state">
                                <Option value="0">未审核</Option>
                                <Option value="1">审核通过</Option>
                                <Option value="2">审核不通过</Option>
                            </Select>
                        </FormItem>
                    </Col>                 
                </Row>
                <Row >
                    <Col span="12">
                        <FormItem label="置顶:">
                            <Select v-model="dataListMessage.flag">
                                <Option value="0">不置顶</Option>
                                <Option value="1">置顶</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row >
                    <Col span="24">
                        <FormItem label="留言信息:">
                            <textarea v-model="dataListMessage.content" name="" rows="3" style="width:100%;"></textarea>
                        </FormItem>
                    </Col>
                </Row>
            </Form>	
            <div slot="footer">
                <Button @click="messageModal = false">取消</Button>
                <Button type="info" @click="saveDateMessage()">保存</Button>
            </div>         
        </Modal> 
    </div>     
</template>
<script>
import {isNull } from '@/libs/common.js'  
var updateMessage={
        theme:"",
        content:"",
        name:"",
        state:"",
        sfzd:"",
    };
var leaveMessage={
        name:"",
        content:"",
        state:"",
        flag:"",
    };
export default {
    name: 'liuyanban',
    components: {
    },
    data () {
        return {
            messageShow:false,
            title:"",
            messageModal:false,
            updateModal:false,
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '留言人',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '主题',
                    align: 'center',
                    key: 'theme'
                },
                {
                    title: '留言信息',
                    align: 'center',
                    ellipsis:true,
                    key: 'content'
                },
                {
                    title: '是否置顶',
                    align: 'center',
                    key: 'sfzd',
                    render:(h, params) =>{
                        var sfzd = params.row.sfzd;
                        // console.log(params,"adf发");
                        var xuanze="";
                        if(sfzd=='0'){
                            xuanze="不置顶";
                        }else if(sfzd=='1'){
                            xuanze="置顶";
                        }
                        return h('div',xuanze)
                    }
                },
                {
                    title: '针对主题',
                    align: 'center',
                    key: 'state',
                    render:(h, params) =>{
                        var state = params.row.state;
                        // console.log(params,"adf发");
                        var xuanze="";
                        if(state=='0'){
                            xuanze="未审核";
                        }else if(state=='1'){
                            xuanze="审核通过";
                        }else if(state=='2'){
                            xuanze= "审核不通过";
                        }
                        return h('div',xuanze)
                    }
                },
                {
                    title: '操作',
                    align: 'center',
                    width:250,
                    render: (h, params) => {  
                        var _self=this;                  
                        var id = params.row.id;                    
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        icon:"compose",
                                        type: "info",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                            _self.update(params.row);
                                        }
                                    }
                                },                            
                                "修改"
                            ), 
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "success",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {  
                                            _self.detail(params.row);
                                        }
                                    }
                                },                            
                                "详情"
                            ),  
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                           _self.delete(id); 
                                        }
                                    }
                                },                            
                                "删除"
                            ),                        
                        );
                        return h("div", temp);
                    }
                }
            ],
            dataList: [],
            dataTotal:0,
            dataListMessage:[],
            columnsMessage: [
                {   
                    title:'序号',
                    type: 'index',
                    width: 150,
                    align: 'center',
                },
                {
                    title: '网友名字',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '评论内容',
                    align: 'center',
                    key: 'content'
                },
                {
                    title: '发表时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '操作',
                    align: 'center',
                    render: (h, params) => {  
                        var _self=this;                  
                        var id = params.row.id;                    
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        icon:"compose",
                                        type: "info",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                           _self.updateLeaveMessage(params.row);
                                        }
                                    }
                                },                            
                                "修改"
                            ), 
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "error",
                                        size: "small"
                                    },
                                    on: { 
                                        click: () => {    
                                            _self.deleteMessage(id);
                                        }
                                    }
                                },                            
                                "删除"
                            ),                        
                        );
                        return h("div", temp);
                    }
                }
            ],
            query:{
                page:1,
                size:20,
                key:"getPageList",
                wheres:{
                    theme:"",
                    id:""
                },
            },
            updateMessage:{
                theme:"",
                content:"",
                name:"",
                state:"",
                sfzd:"",
            }, 
            leaveMessageList:{
                key:"getList",
                wheres:{
                    id:"",
                },
            },
            leaveMessage:{
                name:"",
                content:"",
                state:"",
                flag:"",
            },
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
        newAdd(){
            this.updateModal=true;
            this.title="新增";
            this.messageShow=false;
            this.updateMessage=JSON.parse(JSON.stringify(updateMessage));
        },
        detail(row){
            this.updateModal=true;
            this.title="详情";
            this.messageShow=true;
            var _self=this;
            _self.$http.post("/site/message/board/save",row)
            .then(res=>{
                if(res.success){
                    _self.updateMessage=res.data;
                    // console.log(_self.updateMessage);
                }
            })
            _self.leaveMessageList.wheres.id=row.id;
            _self.$http.get("/site/message/board",{
                params:{
                    _model:JSON.stringify(_self.leaveMessageList)
                }
            })
            .then(res=>{
                if(res.success){
                    console.log(res,"尼阿波");
                    // _self.dataListMessage=res.data;
                    // console.log(_self.updateMessage);
                    // _self.initSearch2();
                }
            })
        },
        update(row){
            this.updateModal=true;
            this.title="修改";
            this.messageShow=false;
            var _self=this;
            _self.$http.post("/site/message/board/save",row)
            .then(res=>{
                if(res.success){
                    _self.updateMessage=res.data;
                    // console.log(_self.updateMessage);
                }
            })
        },
        delete(id){
            var _self=this;
            _self.$http.delete("/site/message/board/"+id)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("操作成功");
                    _self.initSearch();
                }
            })
        },
        newAddMessage(){
            this.messageModal=true;
            this.title="新增";
            this.leaveMessage=JSON.parse(JSON.stringify(leaveMessage));
        },
        updateLeaveMessage(row){
            this.messageModal=true;
            this.title="修改";
            var _self=this;
            // ?mid==id?
            _self.$http.post("/site/message/boardn/save",row)
            .then(res=>{
                if(res.success){
                  _self.leaveMessage=res.data
                    _self.$Message.info("操作成功");
                }
            })
        },
        deleteMessage(id){
            var _self=this;
            _self.$http.delete("/site/message/boardn/"+id)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("操作成功");
                }
            })
        },
        saveDateMessage(){
            var _self=this;
            _self.$http.post("/site/message/boardn/save",_self.leaveMessage)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("操作成功");
                    this.messageModal=false;
                }
            })
        },
        saveDate(){
            var _self=this;
            _self.$http.post("/site/message/board/save",_self.updateMessage)
            .then(res=>{
                if(res.success){
                    _self.$Message.info("操作成功");
                    _self.initSearch();
                    this.updateModal=false;
                }
            })
        },
    },
    mounted() {
        this.initSearch();
    },
};
</script>
    



