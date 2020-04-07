<style lang="less">
    @import '../../styles/common.less';
</style>  
<template>
    <div>
        <data-table ref="test" 
            :url="'/site/feedback/page'" 
            :params="query" 
            :columns="columns" 
            @on-row-dblclick="handleEdit"
             >
            <div slot="search">
                <Form :label-width="40" @submit.native.prevent>
                    <Row>
                        <Col span="5">
                            <Form-item label="姓名:">
                                <Input v-model="query.wheres.name"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
        <!-- 新增、修改 -->
        <Modal v-model="newAddModal" :styles="{top: '220px'}" :title="title" :mask-closable=false width="50%">
            <Form :label-width="100">
                <Row>
                    <Col span="12">
                        <Form-item label="姓名:">
                            <Input v-model="newAddQuery.name"  readonly  placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="联系电话:">
                            <Input v-model="newAddQuery.tel"  readonly  placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="标题:">
                            <Input v-model="newAddQuery.title"  readonly  placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="时间:">
                            <DatePicker v-model="newAddQuery.createTime" readonly  type="datetime" placeholder="请选择日期时间" style="width: 100%;"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="内容:">
                            <Input v-model="newAddQuery.yijian" type="textarea" readonly :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="文件上传:"> 
                            <MyUpload 
                                multiple 
                                type="drag" 
                                action="/$admin/attachs"
                                :show-upload-list="false"
                                :data="uploadData"
                                name="securityparameter"
                                :before-upload="beforeUpload"  
                                :on-success="uploadSuccess">
                                <!-- <img :src="$util.basePath+'/attachment'+item.url" @click="deleteFile(index,item)" title="点击图片进行删除更新" alt=""/> -->
                                <Button  icon="ios-cloud-upload-outline">上传文件</Button>
                                <!-- <span >{{$util.basePath+'/attachment'+item.url}}</span> -->
                            </MyUpload>
                            <ul style="list-style: none;width:130%;">
                                <li v-for="(item,index) in uploadList" :key="index">
                                    <span>
                                        <Button @click="show($baseIconUrl+item.url)" size="small" type="primary">文件预览</Button>
                                        <Button @click="deleteFile(index,item)" size="small" type="error">删除</Button>
                                    </span>
                                    <span style="margin:0px 5px;">{{item.name}}</span> 
                                </li>
                            </ul>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <Form-item label="是否公开:">                       
                            <Select v-model="newAddQuery.ispublish">
                                <Option value="0">公开</Option>
                                <Option value="1">不公开</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="反馈时间:">
                            <DatePicker v-model="newAddQuery.feedbacktime" type="datetime" placeholder="请选择日期时间" style="width: 100%;"></DatePicker>
                        </Form-item>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Form-item label="反馈内容:">
                            <Input v-model="newAddQuery.fankui" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <div slot="footer">
                <Button @click="newAddModal = false">取消</Button>
                <Button type="info" @click="saveData()">保存</Button>
            </div>
        </Modal>
    </div>     
</template>
<script>
import {isNull,isEmpty} from '@/libs/common.js'
import MyUpload from '@/views/components/Upload/MyUpload.vue';  
export default {
    name: 'SystemLog',
    components: {
        MyUpload,
    },
    data () {
        return {
            uploadList:[],
            sID:"",
            title:"",
            newAddModal:false,
            newAddQuery:{
                // id:"",
                name:"",//姓名
                createTime:"",//时间
                tel:"",//联系电话
                title:"",//标题
                yijian:"",//内容
                

                fankui:"",//反馈内容
                feedbacktime:"",//反馈时间
                ispublish:"",//是否公开
            },
            columns: [
                {   
                    title:'序号',
                    type: 'index',
                    maxWidth: 80,
                    align: 'center',
                },
                {
                    title: '姓名',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '标题',
                    align: 'center',
                    key: 'title'
                },
                {
                    title: '内容',
                    ellipsis:true,
                    align: 'center',
                    key: 'yijian'
                },
                {
                    title: '联系电话',
                    align: 'center',
                    key: 'tel'
                },
                // {
                //     title: '',
                //     align: 'center',
                //     key: 'ispublish',
                //     render:(h, params) =>{
                //         var ispublish = params.row.ispublish;
                //         var xuanze="";
                //         if(ispublish=='0'){
                //             xuanze="公开";
                //         }else if(ispublish=='1'){
                //             xuanze="未公开";
                //         }else if(ispublish==null){
                //             xuanze= "未处理";
                //         }
                //         return h('div',xuanze)
                //     }
                // },
                {
                    title: '创建时间',
                    align: 'center',
                    maxWidth:160,
                    key: 'createTime'
                },
                {
                    title: '操作',
                    align: 'center',
                    width:160,
                    key: 'id',
                    render: (h, params) => {  
                        var _self=this;          
                        var id = params.row.id;
                        var temp = [];
                        temp.push(
                            h("Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small"
                                    },                               
                                    on: { 
                                        click: () => {      
                                            _self.editData(params.row);          
                                        }
                                    }
                                },"编辑"),  
                                h("Button",
                                    {
                                        props:{
                                            type:"error",
                                            size:"small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.handleDelete(id);  
                                            }
                                        }
                                    },"删除"),                 
                        );
                        return h("div", temp);
                    }
                }
            ],
            dataList: [],
            dataTotal:0,
            query:{
                page:1,
                size:20,
                key:"getPageList",
                wheres:{
                    name:""
                },
            } 
        };
    },
    computed:{
        uploadData(){//上传时附带的额外参数 :data
            return {
                "dataId":this.sID,
                "moduleId":"standingbook",
                "name":"securityparameter"
            }
        },
    },
    methods: {
        //图片区域
            /**证据照片 */
        beforeUpload:function(){//:before-upload 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            var _self=this;
            var id=_self.sID;
            if(isEmpty(id)){
                _self.$Message.error("请保存案件信息！");
                return false;
            }
            return true;
        },
        uploadSuccess:function(response,file,fileList){//:on-success 文件上传成功时的钩子，返回字段为 response, file, fileList
            if(response.success){
                this.loadFiles();
            }
        },
        loadFiles:function(){
            var _self=this;
            _self.$http.get("/$admin/attachs",{
                params:_self.uploadData
            }).then(function(result){
                if(result.success){
                    _self.uploadList=result.data;
                }
            });
        },
        show(url){
            window.open(url);
        },
        deleteFile:function(index,item){
            var _self=this;
            _self.$http.delete("/$admin/attachs/"+item.id)
                .then(function(result){
                    if(result.success){
                        _self.uploadList.splice(index, 1);
                    }
                    _self.$Message.info(result.msg);
            });
        },
        getImages(v){
            var _self=this;
            _self.$http.get("/$admin/attachs?dataId="+v+"&moduleId=standingbook")
            .then(res=>{
                if(res.success){
                    _self.uploadList=res.data;
                }
            })
            .catch(err=>{
                console.log(err);
            });
        },


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
        // newAdd(){
        //     this.title="新增";
        //     this.newAddQuery={};
        //     this.newAddModal=true;
        // },
        editData(datainfo){
            this.title="编辑";
            var _self=this;
            _self.newAddModal=true;
            _self.$http.post("/site/feedback/save",datainfo)
            .then(res=>{
                if(res.success){
                    _self.newAddQuery=res.data;
                    _self.sID=res.data.id;
                    _self.getImages(res.data.id);
                }
            })
        },
        handleEdit(msg){
            this.title="编辑";
            var _self=this;
            _self.newAddModal=true;
            _self.$http.post("/site/feedback/save",msg)
            .then(res=>{
                if(res.success){
                    _self.newAddQuery=res.data;
                    _self.sID=res.data.id;
                    _self.getImages(res.data.id);
                }
            })
        },
        handleDelete(id){
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"您确定要删除当前列表项吗？",
                onOk:function(){
                    _self.$http.delete("/site/feedback/"+id)
                    .then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.success('删除成功!');
                        }else{
                            this.$Message.info(result.msg);
                        }
                    });
                
                }
            });
        },
        saveData(){
            var _self=this;
            var date=new Date(this.newAddQuery.feedbacktime);
            var year=date.getFullYear();
            var month=date.getMonth()+1;
            var day=date.getDate();
            var hours=date.getHours();
            var minutes=date.getMinutes();
            var seconds=date.getSeconds();
            _self.newAddQuery.feedbacktime=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
            if(isNull(_self.newAddQuery.id)){
                _self.$http.post("/site/feedback/save",_self.newAddQuery)
                .then(res=>{
                    if(res.success){
                        _self.newAddModal=false;
                        _self.initSearch();
                        _self.$Message.info("success");
                    }
                })
            }else{
                _self.$http.post("/site/feedback/save",_self.newAddQuery)
                .then(res=>{
                    if(res.success){
                        _self.newAddModal=false;
                        _self.initSearch();
                        _self.$Message.info("success");
                    }
                })
            }
        }
    },
    mounted() {
        this.initSearch();
    },
};
</script>
    



