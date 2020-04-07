<style lang="less" scoped>
        @import '../styles/achive.less';
    </style>
    <template>
        <div>
            <Row>
                <Col span="24">
                    <data-table ref="test" 
                        :url="'/shiparchives/file/management/getPage'" 
                        :params="query" 
                        :columns="columns" 
                        @on-row-dblclick="handleEditdb"
                            >
                        <div slot="search">
                            <Form :label-width="60" @submit.native.prevent>
                                <Row>
                                    <Col span="4" >
                                        <Form-item label="标题：">
                                            <input  @keyup.enter="initSearch()" v-model="query.wheres.title"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                        </Form-item>
                                    </Col>
                                    <Col span="4">
                                        <Form-item label="状态：">
                                                <Select v-model="query.wheres.type"  placeholder="请输入...">
                                                    <Option value="0">全部</Option>
                                                    <Option value="1">发送</Option>
                                                    <Option value="2">接收</Option>
                                                </Select> 
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
            </Row>
            <!-- 新增/编辑 -->
            <Modal :width="910" :styles="{top: '100px'}" :z-index="888" v-model="updateAddModal" :title="title" :scrollable="true" :mask-closable="maskclosable">
                <Form  :label-width="72" :model="message" ref="message" :rules="rules">
                    <Row>
                        <Col span="24" style="position: relative;height:585px;overflow-y:auto;overflow-x:auto;box-sizing: border-box;padding:10px;">
                            <!-- <Card shadow style="height:585px;overflow-y:scroll;overflow-x:hidden;"> -->
                                <Row>
                                    <Col span="12">
                                        <FormItem label="标题：" prop="title" :label-width="58">
                                            <Input v-model="message.title" placeholder="请填写">
                                            </Input> 
                                        </FormItem>
                                    </Col> 
                                    <Col span="12" style="z-index:100000;">
                                        <FormItem label="类型：" prop="type" :label-width="78">
                                            <Select v-model="message.type">
                                                <Option v-for="(v,i) in fileName" :key="i" :value="v.title">{{v.title}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>             
                                    <Col span="24">
                                        <UEtor ref="uetor" :config="config" :defaultMsg="defaultMsg"></UEtor>   
                                    </Col>
                                    <Col span="18" style="padding-top:25px;">
                                        <FormItem label="选择对象: " :label-width="75">
                                            <Input placeholder="请选择..." v-model="chooseObj" readonly>
                                            </Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6" style="padding-top:25px;padding-left:10px">
                                        <Button type="success" @click="userModal=true">选择</Button>
                                        <Checkbox @on-change="selectPubUser" style="margin-left:5px">是否发送公众用户</Checkbox>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="附件上传：">
                                            <div ref="DIV">
                                                    <MyUpload 
                                                        multiple 
                                                        action="/$admin/attachs"
                                                        :show-upload-list="false"
                                                        :data="uploadData"
                                                        :format="format"
                                                        :on-format-error="uploadError"
                                                        name="securityparameter"
                                                        :before-upload="beforeUpload"  
                                                        :on-success="uploadSuccess">
                                                        <!-- <img :src="$util.basePath+'/attachment'+item.url" @click="deleteFile(index,item)" title="点击图片进行删除更新" alt=""/> -->
                                                        <Button  icon="ios-cloud-upload-outline" style="width:348px;" title="支持格式：图片、doc、xls、ppt、rar">点击或拖拽上传文件</Button>
                                                        <!-- <span >{{$util.basePath+'/attachment'+item.url}}</span> -->
                                                    </MyUpload>
                                                    <ul style="list-style: none;width:100%;">
                                                        <li v-for="(item,index) in uploadList" style="width:100%; display: flex;margin:5px 0px;" :key="index"> 
                                                            <span style="display:inline-block;width:45%;margin:0px 5px;">{{item.name}}</span> 
                                                            <span style="width:110px; text-align: right;" >
                                                                <Button @click="show($util.basePath+'/attachment'+item.url)" size="small" type="primary">文件预览</Button>
                                                                <Button @click="deleteFile(index,item)" size="small" type="error">删除</Button>
                                                            </span>                                                                
                                                        </li>
                                                    </ul>
                                                </div> 
                                        </FormItem>
                                    </Col>
                                </Row>
                            <!-- </Card> -->
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button @click="updateAddModal = false" size="large">取消</Button>
                    <Button type="info" @click="handle('message')" size="large">保存</Button>
                </div>
            </Modal>
            <!-- 查看 -->
            <Modal :width="910" :styles="{top: '100px','z-index':1000}" v-model="checkModal" :title="title" :scrollable=true :mask-closable="maskclosable">
                <Form  :label-width="72">
                        <Row>
                            <Col span="24" style="position: relative;min-height:500px;max-height:585px;overflow-y:auto;overflow-x:auto;box-sizing: border-box;padding:10px;">
                                <Row>
                                    <Col span="24">
                                        <div ref="DIV" style="margin-top:-8px;">
                                            <h1 id="title"></h1> 
                                            <p id="time">
                                                <span>
                                                    <span>创建时间：</span>
                                                    <span id="ct"></span>
                                                </span>
                                                <span id="ju"></span>
                                                <span>
                                                    <span>更新时间：</span>
                                                    <span id="ut"></span>
                                                </span>
                                            </p>
                                            <div id="wenzi"></div>
                                        </div>
                                    </Col> 
                                    <Col span="24" style="margin-top:10px;padding-top:25px;border-top:1px solid #e9eaec;">
                                        <FormItem label="已传附件：">
                                                    <span v-show="showFile">（暂无上传附件）</span>
                                                    <ul style="list-style: none;width:100%;">
                                                        <li v-for="(item,index) in uploadList" style="width:100%; display: flex;margin:0px 0px;" :key="index"> 
                                                            <span style="display:inline-block;width:45%;margin:0px 5px;">{{item.name}}</span> 
                                                            <span style="width:110px; text-align: right;" >
                                                                <Button @click="show($util.basePath+'/attachment'+item.url)" size="small" type="primary">文件预览</Button>
                                                                <!-- <Button @click="deleteFile(index,item)" size="small" type="error">删除</Button> -->
                                                            </span>                                                                
                                                        </li>
                                                    </ul>                                     
                                        </FormItem>
                                    </Col> 
                                    <Col span="24">
                                        <FormItem label="发送对象：">
                                            <p>{{objStr}}</p>
                                        </FormItem>
                                    </Col>
                                    <Col span="24">
                                        <FormItem label="浏览记录：">
                                                <Table   
                                                    size="small"
                                                    border 
                                                    :columns="columnsCheck"  
                                                    :data="dataListCheck" 
                                                    :loading="false" 
                                                ></Table>  
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                </Form>
                <div slot="footer">
                    <Button @click="checkModal = false" size="large">关闭</Button>
                    <Button @click="shouCangM()" type="info" size="large">收藏</Button>
                </div>
            </Modal>
            <!-- 收藏列表 -->
            <Modal :width="300" :styles="{top: '200px'}" v-model="shouCangModal" title="选择所属目录"  :mask-closable="maskclosable">
                <Row>
                    <Col span="23" style="max-height:200px;overflow: auto;" offset="1">
                        <RadioGroup v-model="vertical" vertical>
                            <span v-if="items.length==0">(暂无可选目录)</span>
                            <Radio v-if="items.length!=0" v-for="(item,i) in items" :label="item.title" :key="i">
                                <span>{{item.title}}</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="shouCangModal = false" >取消</Button>
                    <Button @click="shouCang()" type="info" >确认</Button>
                </div>
            </Modal>
            <userAndDept
            v-model="userModal"
            :ifPubUsers="true"  
            :selectIds="userselect.selectIds"
            :deptIds="userselect.deptIds"
            :roleIds="userselect.roleIds"
            @on-select-change="selectUserOrDept"
            >
            </userAndDept>
        </div>
    </template>
    <script>
    import {isNull,isEmpty} from '@/libs/common.js'
    import MyUpload from '@/views/components/Upload/MyUpload.vue';
    import UEtor from '../../cms/MyUeditor.vue';
    import userObj from '@/store/module/userId.js';
    import user from '@/store/module/user.js';
    import userAndDept from '../../components/modal/other/userAndDept.vue'
    var message={
        aid:"",
        author:"",
        title:"",
        content:"",
        type:"",
        createTime:"",
        updateTime:"",
        recipient:"",
    }
    var userId=user.state.userInfo.userId;
    export default {
        name: "filemanage",
        components:{
            UEtor,MyUpload,userAndDept
        },
        data() {
            return {
                objStr: '',
                chooseObj: '',
                userModal: false,
                userselect:{
                    show:false,
                    deptIds:"",
                    roleIds:"",
                    selectIds:userId,
                },
                format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
                iSmanager:false,
                shouCangModal:false,
                vertical: '',
                items:[],


                showFile:false,
                readonly:true,
                checkModal:false,
                title:"",
                maskclosable:false,
                updateAddModal:false,
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
                  initialFrameWidth:840,
                  autoWidth: true,
                  initialFrameHeight:338,
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
                        maxWidth:80
                    },
                    {
                        title: "标题",
                        key: "title",
                        align:'center',
                       
                    },
                    {
                        title: "类型",
                        key: "type",
                        align:'center',
                    },
                    {
                        title: '创建人',
                        align: 'center',
                        key: 'creatorName',
                        maxWidth:140
                    },
                    {
                        title: "创建时间",
                        maxWidth:150,
                        key: "createTime",
                        align:'center',
                    },
                    {
                        title: "修改时间",
                        maxWidth:150,
                        key: "updateTime",
                        align:'center',
                    },
                    {
                        title: "操作",
                        align:'center',
                        key:"id",
                        width:200,
                        render: (h,params) => {
                            var _self=this;
                            var id = params.row.id;
                            var aid = params.row.aid;
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    on: {
                                        click: ()=>{
                                            _self.getMsgModel(params.row);                                      
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        display:userObj.userId==params.row.creatorId?"inline-block":"none",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click: ()=>{
                                             _self.handleEdit(params.row);                                      
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        display:userObj.userId==params.row.creatorId?"inline-block":"none",
                                        marginLeft:"10px"
                                    },
                                    on: {
                                        click: ()=>{
                                            _self.deleteItem(params.row);                                      
                                        }
                                    }
                                }, '删除'),
                            ])
                        }
                    }
                ],
                dataList:[], 
                columnsCheck:[
                    {
                        title: "姓名",
                        align:"center",
                        key: "name",
                        maxWidth:140,
                    },
                    {
                        title: "首次访问时间",
                        align:"center",
                        key: "createTime",
                    },
                    {
                        title: "最后访问时间",
                        align:"center",
                        key: "updateTime",
                    },
                    {
                        title: "访问次数",
                        align:"center",
                        key: "count",
                        maxWidth:140,
                    },
                ],
                dataListCheck:[],
                totalNum:0,
                query: {
                    page:1,
                    size:10,
                    // key:"getFileManagementPage",
                    wheres:{
                        title: "",
                        type: '0',
                    },
                    // title: '',
                    // type: '0',
                },
                message:{
                    aid:"",
                    author:"",
                    title:"",
                    content:"",
                    type:"",
                    createTime:"",
                    updateTime:"",
                    ids: "",
                    deps: ""
                },
                recordId:"",//收藏id
                fileType:"",//收藏的文件类型名字
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
            selectPubUser(v) {
                var _self = this
                if (v) {
                    _self.message.pubUsers = "pubUsers"
                } else {
                    _self.message.pubUsers = ''
                }
            },
            selectUserOrDept(v) {
                var _self = this
                var obj = {
                    ids:'',
                    depts:'',
                    deptChil:'',
                    roles:''
                }
                _self.chooseObj = ''
                for (let i = 0; i < v.length; i++) {
                    for (let j = 0; j < v[i].length; j++) {
                        _self.chooseObj += v[i][j].name+','
                    }
                }
                var str = _self.chooseObj;
                if(str!='' && str.substr(str.length-1,1)==','){
                    _self.chooseObj = str.substr(0,str.length-1);
                }
                // _self.message.recipient = {}
                if (v[0].length==0) {
                    _self.message.ids = ''
                    obj.ids = ''
                } else {
                    var str = ''
                    var str2 = ''
                    for (var i = 0; i < v[0].length; i++) {
                        str = str + v[0][i].id + ','
                        str2 = str2 + v[0][i].name + ','
                    }
                    obj.ids = str2
                    _self.message.ids = str
                }
                if (v[1].length==0) {
                    _self.message.depts = ''
                    obj.depts = ''
                } else {
                    var str = ''
                    var str2 = ''
                    for (var i = 0; i < v[1].length; i++) {
                        str = str + v[1][i].id + ','
                        str2 = str2 + v[1][i].name + ','
                    }
                    obj.depts = str2
                    _self.message.depts = str
                }
                if (v[2].length==0) {
                    _self.message.deptChil = ''
                    obj.deptChil = ''
                } else {
                    var str = ''
                    var str2 = ''
                    for (var i = 0; i < v[2].length; i++) {
                        str = str + v[2][i].id + ','
                        str2 = str2 + v[2][i].name + ','
                    }
                    obj.deptChil = str2
                    _self.message.deptChil = str
                }
                if (v[3].length==0) {
                    _self.message.roles = ''
                    obj.roles = ''
                } else {
                    var str = ''
                    var str2 = ''
                    for (var i = 0; i < v[3].length; i++) {
                        str = str + v[3][i].id + ','
                        str2 = str2 + v[3][i].name + ','
                    }
                    obj.roles = str2
                    _self.message.roles = str
                }
                _self.message.recipient = JSON.stringify(obj);
            },
            shouCang(){
                if(this.vertical==""){
                    this.$Message.error("请选择所属目录");
                    return;
                }
                var _self=this;
                _self.$http.post("/standingbook/coop/fm/coll?recordId="+_self.recordId+"&folder="+_self.vertical)
                .then(res=>{
                    if(res.success){
                        _self.$Message.info("收藏成功");
                        _self.shouCangModal=false;
                    }else{
                        _self.$Message.error("收藏失败");
                    }
                });
            },
            shouCangM(){
                var _self=this;
                this.vertical="";
                _self.$http.get("/standingbook/coop/fm/getRoot")
                .then(res=>{
                    if(res.success){
                        _self.items=res.data[0].children;
                    }
                })
                this.shouCangModal=true;
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
                this.query.wheres.type = '0'
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
            uploadError(file,fileList){
                var fileName=file.name.split(".");
                fileName=fileName[fileName.length-1];
                var count=0;
                for(var i=0;i<this.format.length;i++){
                    if(fileName==this.format[i]){
                        count++;
                        break;
                    }
                }
                if(count==0){
                    this.$Message.error("文件格式不支持");
                    return;
                }
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
                        if(res.data.length==0){
                            _self.showFile=true;
                            _self.uploadList=res.data;
                        }else{
                            _self.showFile=false;
                            _self.uploadList=res.data;
                        }
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
                if(_self.chooseObj == '') {
                    _self.$Message.info('请选择对象。')
                    return
                }
                _self.message.content=content;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.judge=="new"){
                                _self.message.aid=_self.sID;
                                _self.message.creatorName=userObj.name;
                                _self.$http.post("/shiparchives/file/management/savefm",_self.message)
                                .then(res=>{
                                    if(res.success){
                                        _self.initSearch();
                                        _self.updateAddModal=false;
                                        _self.$Message.info("新增成功");
                                    }
                                })
                        }else if(_self.judge=="update"){
                            _self.$http.patch("/shiparchives/file/management/"+_self.updataId,_self.message)
                            .then(res=>{
                                if(res.success){
                                    _self.initSearch();
                                    _self.updateAddModal=false;
                                    _self.$Message.info("编辑成功");
                                }
                            })
                        }
                    }
                });
            },
            //新增弹窗
            newAdd(){
                this.updateAddModal=true;
                this.title="新增";
                this.chooseObj = '';
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
                var obj  = JSON.parse(ids.recipient)
                this.chooseObj = obj.ids + obj.depts + obj.roles + obj.deptChil
                var str = this.chooseObj;
                if(str!='' && str.substr(str.length-1,1)==','){
                    this.chooseObj = str.substr(0,str.length-1);
                }
                this.title="编辑";
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
                        // console.log(_self.message.content,"ff");
                        // _self.message.content = _self.message.content.replace(/&nbsp;/g,"");
                        // _self.message.content = _self.message.content.replace(/<\/?.+?\/?>/g,"");
                           
                        _self.$refs.uetor.setUEContent(_self.message.content);
                        _self.sID=res.data.aid;
                        _self.getImages(res.data.aid);

                        _self.updateAddModal=true;
                    }
                });
            },
            deleteItem(row){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除此条通知公告吗？",
                    onOk:function(){
                        _self.$http.delete("/shiparchives/file/management/"+row.id).then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功!');
                            }else{
                                _self.$Message.info(result.msg);
                            }
                        });
                    
                    }
                }); 
            },
            handleEditdb(ids){
                this.handleEdit(ids);
            },
            //详情
            getMsgModel(ids){
                var _self=this;
                var obj  = JSON.parse(ids.recipient)
                var str = obj.ids + obj.depts + obj.roles + obj.deptChil
                if(str!='' && str.substr(str.length-1,1)==','){
                    _self.objStr = str.substr(0,str.length-1);
                }
                this.title="查看";
                this.recordId=ids.id;
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

                        $("#title").html('');
                        $("#title").html(_self.message.title);
                        
                        $("#ct").html('');
                        $("#ct").html(_self.message.createTime);

                        $("#ut").html('');
                        $("#ut").html(_self.message.updateTime);

                        $("#wenzi").html('');
                        $("#wenzi").append(res.data.content);
                        $("#wenzi").css({
                            "min-height":"200px",
                        });
                        _self.getImages(res.data.aid);
                        // $("#title").append("<p style='text-align:center;font-size:20px;font-weight:bold;'>"+res.data.title+"</p>");
                    }
                });
                _self.$http.get("/shiparchives/file/management/select?id="+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.dataListCheck=res.data["查看表信息"];
                        _self.quanxianShow=true;
                    }
                });
                // _self.updateAddModal=true;
                _self.checkModal=true;
            },
        },  
        beforeMount() {
            if(this.$hasRoles("ADMIN") || this.$hasRoles("cooperative")){
                this.iSmanager=true;
            }else{
                this.iSmanager=false;
            }
        },
        mounted(){
        },
    }
    </script>
    
    <style scoped>
        form /deep/ textarea{
            display:none !important;
        }
        form /deep/ tr.edui-default{
            display:none !important;
        }
        form /deep/ .ivu-row:after{
            border: 0 !important;
            clear: both !important;
            content: "" !important;
            display: table !important;
            visibility: hidden !important;
        }

        #title{
            text-align: center;
            margin-top:-10px;
            margin-bottom:10px;
            color:red;
        }
        #ju{
            display: inline-block;
            width:50px;
        }
        #time{
            width:100%;
            text-align: center;
            margin:10px auto;
            padding-bottom:10px;
            border-bottom:1px solid #e9eaec;
        }
    </style>
      