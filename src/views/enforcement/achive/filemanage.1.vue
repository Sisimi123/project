<style lang="less" scoped>
        @import '../styles/achive.less';
    </style>
    <template>
        <div>
            <Row>
                <Col span="24" v-show="!status">
                    <data-table ref="test" 
                        :url="'/shiparchives/file/management/page'" 
                        :params="query" 
                        :columns="columns" 
                        @on-row-dblclick="handleEditdb"
                            >
                        <div slot="search" style="margin-bottom:5px;">
                            <Form :label-width="49" @submit.native.prevent>
                                <Row>
                                    <Col span="4" >
                                        <Form-item label="标题：">
                                            <input  @keyup.enter="initSearch()" v-model="query.wheres.title"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                        </Form-item>
                                    </Col>
                                    <Col span="2" style="float:right;text-align:right;">
                                        <Button @click="newAdd()" type="success" icon="ios-add">新增</Button>
                                    </Col>
                                    <div class="btn-wrap">
                                        <Button @click="initSearch()" type="primary" icon="ios-search">搜索</Button>
                                        <Button @click="handleReset()" >重置</Button>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </data-table>
                </Col>
                <Col span="24" v-show="status">
                    <!-- 详情/新增查询/编辑 -->
                    <Form  :label-width="72" :model="message" ref="message" :rules="rules">
                        <Row>
                            <Col span="17" style="position: relative;">
                                <Card shadow style="height:585px;overflow-y:scroll;overflow-x:hidden;">
                                    <Row>
                                        <Col span="24" v-show="!addUpdateMl">
                                            <Row>
                                                <Col span="24" style="margin-top:5px;">
                                                    <!-- <div ref="DIV" style="height:340px;margin-top:5px;overflow-y:auto;overflow-x:hidden;"> -->
                                                        <UEtor ref="uetor" :config="config" :defaultMsg="defaultMsg"></UEtor> 
                                                    <!-- </div>                                   -->
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span="24" v-if="addUpdateMl">
                                            <Row>
                                                <Col span="24">
                                                    <div ref="DIV" style="margin-top:5px;">
                                                        <p id="title">{{message.title}}</p> 
                                                        <!-- <p>{{message.content}}</p> -->
                                                        <div id="wenzi"></div>
                                                        <!-- <Input v-model="message.content" type="textarea" :autosize="{minRows: 3,maxRows: 40}" placeholder="请输入..."></Input>  -->
                                                    </div>                                  
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span="7" style="position: relative; left:10px;">
                                <Card shadow style="height:585px; overflow: auto;">
                                    <Row>  
                                        <Col span="24">
                                            <FormItem label="类型：" prop="type">
                                                <Select v-model="message.type">
                                                    <Option v-for="(v,i) in fileName" :key="i" :value="v.title">{{v.title}}</Option>
                                                </Select>
                                            </FormItem>
                                        </Col>     
                                        <Col span="24">
                                            <FormItem label="标题：" prop="title">
                                                <Input v-model="message.title" placeholder="请填写">
                                                </Input> 
                                            </FormItem>
                                        </Col>          
                                        <Col span="24">
                                            <FormItem label="创建时间：" v-if="addUpdateMl">
                                                <Input v-model="message.createTime">
                                                </Input> 
                                            </FormItem>
                                        </Col>
                                        <Col span="24"  v-if="addUpdateMl">
                                            <FormItem label="更新时间：">
                                                <Input v-model="message.updateTime">
                                                </Input> 
                                            </FormItem>
                                        </Col>
                                        <Col span="24">
                                            <FormItem label="附件上传：" v-if="!addUpdateMl">
                                                <div ref="DIV" style="margin-top:5px;width:100%;">
                                                        <MyUpload 
                                                            multiple 
                                                            action="/$admin/attachs"
                                                            :show-upload-list="false"
                                                            :data="uploadData"
                                                            name="securityparameter"
                                                            :before-upload="beforeUpload"  
                                                            :on-success="uploadSuccess">
                                                            <!-- <img :src="$util.basePath+'/attachment'+item.url" @click="deleteFile(index,item)" title="点击图片进行删除更新" alt=""/> -->
                                                            <Button  icon="ios-cloud-upload-outline" style="width:400px;">点击或拖拽上传文件</Button>
                                                            <!-- <span >{{$util.basePath+'/attachment'+item.url}}</span> -->
                                                        </MyUpload>
                                                        <ul style="list-style: none;width:100%;">
                                                            <li v-for="(item,index) in uploadList" style="width:100%; display: flex;margin:5px 0px;" :key="index"> 
                                                                <span style="display:inline-block;width:70%;margin:0px 5px;">{{item.name}}</span> 
                                                                <span style="width:110px; text-align: right;" >
                                                                    <Button @click="show($util.basePath+'/attachment'+item.url)" size="small" type="primary">文件预览</Button>
                                                                    <Button @click="deleteFile(index,item)" size="small" type="error">删除</Button>
                                                                </span>                                                                
                                                            </li>
                                                        </ul>
                                                    </div> 
                                            </FormItem>
                                        </Col> 
                                        <Col span="24" v-if="addUpdateMl" style="margin-bottom:10px;">
                                            <Row>
                                                <Col span="24"><span style="font-size: 12px;">浏览记录：</span></Col>
                                                <Col span="24">
                                                    <div ref="DIV" style="margin-top:5px;">
                                                        <Table   
                                                            border 
                                                            :columns="columnsCheck"  
                                                            :data="dataListCheck" 
                                                            :loading="false" 
                                                        ></Table> 
                                                    </div>                                  
                                                </Col>
                                            </Row>                              
                                        </Col>
                                        <Col span="24">
                                            <div style="text-align:center;">
                                                <span>
                                                    <Button @click="status = false" type="info" v-show="close" size="large" style="width:40%;">返回</Button>
                                                    <Button @click="status = false"  v-show="!close" size="large" style="width:30%;">取消</Button>
                                                    <span style="margin-left:15px;" v-show="!close"><Button type="info" @click="handle('message')" size="large" style="width:30%;">保存</Button></span>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Form>	           
                </Col>           
            </Row>
        </div>
    </template>
    <script>
    import {isNull,isEmpty} from '@/libs/common.js'
    import MyUpload from '@/views/components/Upload/MyUpload.vue';
    import UEtor from '../../cms/MyUeditor.vue';
    import user from '@/store/module/user.js';
    var message={
        aid:"",
        author:"",
        title:"",
        content:"",
        type:"",
        createTime:"",
        updateTime:"",
    }
    var userId=user.state.userInfo.userId;
    export default {
        name: "filemanage",
        components:{
            UEtor,MyUpload
        },
        data() {
            return {
                rules:{
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'change' }
                        
                    ],
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                        
                    ],
                },
                close:false,//按钮状态切换
                uploadList:[],
                sID:"",
                quanxianShow:false,
                defaultMsg:"",
                config:{
                  // initialFrameWidth:100%,
                  autoWidth: true,
                  initialFrameHeight:445,
                  autoFloatEnabled:false,
                  maximumWords:1000000,
                  toolbars: [
                                [
                                    // 'anchor', //锚点
                                    'undo', //撤销
                                    'redo', //重做
                                    'bold', //加粗
                                    'indent', //首行缩进
                                    // 'snapscreen', //截图
                                    'italic', //斜体
                                    'underline', //下划线
                                    'strikethrough', //删除线
                                    'subscript', //下标
                                    'fontborder', //字符边框
                                    'superscript', //上标
                                    'formatmatch', //格式刷
                                    'source', //源代码
                                    'blockquote', //引用
                                    'pasteplain', //纯文本粘贴模式
                                    'selectall', //全选
                                    'print', //打印
                                    'preview', //预览
                                    'horizontal', //分隔线
                                    'removeformat', //清除格式
                                    'time', //时间
                                    'date', //日期
                                    'unlink', //取消链接
                                    'insertrow', //前插入行
                                    'insertcol', //前插入列
                                    'mergeright', //右合并单元格
                                    'mergedown', //下合并单元格
                                    'deleterow', //删除行
                                    'deletecol', //删除列
                                    'splittorows', //拆分成行
                                    'splittocols', //拆分成列
                                    'splittocells', //完全拆分单元格
                                    'deletecaption', //删除表格标题
                                    'inserttitle', //插入标题
                                    'mergecells', //合并多个单元格
                                    'deletetable', //删除表格
                                    'cleardoc', //清空文档
                                    'insertparagraphbeforetable', //"表格前插入行"
                                    'insertcode', //代码语言
                                    'fontfamily', //字体
                                    'fontsize', //字号
                                    'paragraph', //段落格式
                                    // 'simpleupload', //单图上传
                                    'insertimage', //多图上传
                                    'edittable', //表格属性
                                    'edittd', //单元格属性
                                    'link', //超链接
                                    'emotion', //表情
                                    'spechars', //特殊字符
                                    'searchreplace', //查询替换
                                    'map', //Baidu地图
                                    // 'gmap', //Google地图
                                    'insertvideo', //视频
                                    // 'help', //帮助
                                    'justifyleft', //居左对齐
                                    'justifyright', //居右对齐
                                    'justifycenter', //居中对齐
                                    'justifyjustify', //两端对齐
                                    'forecolor', //字体颜色
                                    'backcolor', //背景色
                                    'insertorderedlist', //有序列表
                                    'insertunorderedlist', //无序列表
                                    'fullscreen', //全屏
                                    'directionalityltr', //从左向右输入
                                    'directionalityrtl', //从右向左输入
                                    'rowspacingtop', //段前距
                                    'rowspacingbottom', //段后距
                                    'pagebreak', //分页
                                    'insertframe', //插入Iframe
                                    'imagenone', //默认
                                    'imageleft', //左浮动
                                    'imageright', //右浮动
                                    'attachment', //附件
                                    'imagecenter', //居中
                                    'wordimage', //图片转存
                                    'lineheight', //行间距
                                    'edittip ', //编辑提示
                                    'customstyle', //自定义标题
                                    'autotypeset', //自动排版
                                    // 'webapp', //百度应用
                                    'touppercase', //字母大写
                                    'tolowercase', //字母小写
                                    'background', //背景
                                    'template', //模板
                                    'scrawl', //涂鸦
                                    // 'music', //音乐
                                    'inserttable', //插入表格
                                    // 'drafts', // 从草稿箱加载
                                    'charts', // 图表
                                ]
                            ]
                },
                judge:"",
                status:false,
                addUpdateMl:false,
                updataId:"",
                columns:[
                    {
                        title: "序号",
                        type: "index",
                        align:'center',
                        width:160
                    },
                    {
                        title: "标题",
                        key: "title",
                        align:'center',
                        minWidth:160
                    },
                    {
                        title: "类型",
                        key: "type",
                        align:'center',
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        align:'center',
                    },
                    {
                        title: "修改时间",
                        key: "updateTime",
                        align:'center',
                    },
                    {
                        title: "操作",
                        align:'center',
                        key:"id",
                        render:(h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var aid = params.row.aid;
                            var buttons = [];
                            if(userId==params.row.creatorId){
                                buttons.push(
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            "margin-right": '15px'
                                        },
                                        on: {
                                            click: ()=>{
                                                _self.handleEdit(params.row);                                      
                                            }
                                        }
                                        }, '编辑'));
                            }
                            buttons.push(
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        "margin-right": '15px'
                                    },
                                    on: {
                                        click: ()=>{
                                            _self.getMsgModel(params.row);                                      
                                        }
                                    }
                                    }, '查看'));                      
                            return h('div', buttons);
                        }
                    }
                ],
                dataList:[], 
                columnsCheck:[
                    {
                        title: "姓名",
                        key: "name",
                        maxWidth:80,
                    },
                    {
                        title: "首次访问时间",
                        key: "createTime",
                    },
                    {
                        title: "最后访问时间",
                        key: "updateTime",
                    },
                    {
                        title: "访问次数",
                        key: "count",
                        maxWidth:70,
                    },
                ],
                dataListCheck:[],
                totalNum:0,
                query: {
                    page:1,
                    size:10,
                    key:"getFileManagementPage",
                    wheres:{
                        title: "",
                    },
                },
                message:{
                    aid:"",
                    author:"",
                    title:"",
                    content:"",
                    type:"",
                    createTime:"",
                    updateTime:"",
                },
            }
        },
        computed: {
            fileName(){
                return this.$store.getters.getDictList("sea_base_filetype");
            },
            uploadData(){//上传时附带的额外参数 :data
                return {
                    "dataId":this.sID,
                    "moduleId":"standingbook",
                    "name":"securityparameter"
                }
            },
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
    
            handle(name){
                var _self=this;
                var content =_self.$refs.uetor.getUEContent();
                // var reg = /(<p>|<\/p>|<br\/>)/g;
                // content =content.replace(reg,function(v){
                //     return "";
                // }); 
                _self.message.content=content;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.judge=="new"){
                                _self.message.aid=_self.sID;
                                _self.$http.post("/shiparchives/file/management",_self.message)
                                .then(res=>{
                                    if(res.success){
                                        _self.initSearch();
                                        _self.status=false;
                                        _self.$Message.info("success");
                                    }
                                })
                        }else if(_self.judge=="update"){
                            _self.$http.patch("/shiparchives/file/management/"+_self.updataId,_self.message)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    _self.status=false;
                                    _self.$Message.info("success");
                                }
                            })
                        }
                    }
                });
            },
            //新增弹窗
            newAdd(){
                this.message=JSON.parse(JSON.stringify(message));
                this.status=true;
                this.judge="new";
                this.$refs["message"].resetFields();
                this.addUpdateMl=false;
                this.quanxianShow=false;
                this.close=false;
                this.uploadList=[];
                this.$refs.uetor.setUEContent("");
                var _self=this;
                 //生成id
                 _self.$http.get("/$admin/attachs/uuid")
                .then(res=>{
                    _self.sID=res.data;
                })
            },
            //修改
            handleEdit(ids){
                this.status=true;
                this.addUpdateMl=false;
                this.quanxianShow=false;
                this.close=false;
                this.$refs.uetor.setUEContent("");
                this.judge="update";
                this.$refs["message"].resetFields();
                this.updataId=ids.id;
                var _self=this;
                _self.$http.get("/shiparchives/file/management/"+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.message=res.data;
                        _self.$refs.uetor.setUEContent(_self.message.content);
                        _self.sID=res.data.aid;
                        _self.getImages(res.data.aid);
                    }
                });
            },
            handleEditdb(ids){
                this.handleEdit(ids);
            },
            //详情
            getMsgModel(ids){
                var _self=this;
                this.$refs["message"].resetFields();
                _self.detailId=ids.id;
                _self.status=true;
                _self.addUpdateMl=true;
                this.quanxianFirstDl=false;
                this.close=true;
                _self.$http.get("/shiparchives/file/management/"+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.message=res.data;
                        $("#wenzi").html('');
                        $("#title").html('');
                        $("#wenzi").append(res.data.content);
                        $("#title").append("<p style='text-align:center;font-size:20px;font-weight:bold;'>"+res.data.title+"</p>");
                    }
                });
                _self.$http.get("/shiparchives/file/management/select?id="+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.dataListCheck=res.data["查看表信息"];
                        _self.quanxianShow=true;
                    }
                });
            },
        },  
        mounted(){
        },
    }
    </script>
    
    <style scoped>
    
    
    </style>
      