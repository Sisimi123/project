<style lang="less" scoped>
        @import '../styles/achive.less';
    </style>
    <template>
        <div>
            <Row>
                <Col span="4">
                    <Card style="width:95%;position: relative;right:-1%;">
                        <p slot="title">
                            <Icon type="ios-folder"></Icon>
                            文件目录
                        </p>
                        <div class="leftTree" ref="leftTree" :style="'height:'+cliHeight+'px;overflow: auto;'">
                            <Button type="success" icon="ios-add" size="small" @click="addFontNodePre()"></Button>
                            <Button type="info" icon="ios-folder" size="small" @click="editFontNodePre()"></Button>
                            <Button type="error" icon="ios-trash" size="small" @click="delFontNodePre()"></Button>
                            <Tree ref="tree" :data="areaTree" @on-select-change="selectTreeChange" empty-text="区域加载中..."></Tree>
                        </div>
                    </Card>
                </Col>
                <Col span="20" style="position: relative;">
                    <data-table ref="test" 
                        :url="'/standingbook/coop/fm/fmList'" 
                        :params="query" 
                        :columns="columns" 
                        @on-row-dblclick="handleEditdb"
                            >
                        <div slot="search">
                            <Form :label-width="49" @submit.native.prevent>
                                <Row>
                                    <Col span="4" >
                                        <Form-item label="标题：">
                                            <input  @keyup.enter="initSearch()" v-model="query.wheres.search"  placeholder="请输入..." class="selec ivu-input"  id="input-line">  
                                        </Form-item>
                                    </Col>
                                    <Col span="8" style="float:right;text-align:right;">
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
            <Modal :width="910" :styles="{top: '100px','z-index':1000}" v-model="updateAddModal" :title="title" :scrollable=true :mask-closable="maskclosable">
                <Form  :label-width="72" :model="message" ref="message" :rules="rules">
                    <Row>
                        <Col span="24" style="position: relative;height:585px;overflow-y:auto;overflow-x:auto;box-sizing: border-box;padding:10px;">
                                <Row>
                                    <Col span="12">
                                        <FormItem label="标题：" prop="title" :label-width="58">
                                            <Input v-model="message.title" placeholder="请填写">
                                            </Input> 
                                        </FormItem>
                                    </Col> 
                                    <!-- <Col span="12" style="z-index:100000;">
                                        <FormItem label="类型：" prop="type" :label-width="78">
                                            <Select v-model="message.type">
                                                <Option v-for="(v,i) in fileName" :key="i" :value="v.title">{{v.title}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>              -->
                                    <Col span="24">
                                        <UEtor ref="uetor" :config="config" :defaultMsg="defaultMsg"></UEtor>   
                                    </Col>
                                    <Col span="24" style="padding-top:25px;">
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
                                                        <Button  icon="ios-cloud-upload-outline" style="width:348px;">点击或拖拽上传文件</Button>
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
                                    <Col span="24" style="padding-top:5px;padding-bottom:-5px;border-top:1px solid #e9eaec;">
                                        <FormItem label="已传附件：">
                                                    <span v-show="showFile">（暂无上传附件）</span>
                                                    <ul style="list-style: none;width:100%;">
                                                        <li v-for="(item,index) in uploadList" style="width:100%; display: flex;margin:0px 0px;" :key="index"> 
                                                            <span style="display:inline-block;width:45%;margin:0px 5px;">{{item.name}}</span> 
                                                            <span style="width:110px; text-align: right;" >
                                                                <Button @click="show($util.basePath+'/attachment'+item.url)" size="small" type="primary">文件预览</Button>
                                                            </span>                                                                
                                                        </li>
                                                    </ul>                                               
                                        </FormItem>
                                    </Col> 
                                    <!-- <Col span="24">
                                        <FormItem label="浏览记录：">
                                                <Table   
                                                    size="small"
                                                    border 
                                                    :columns="columnsCheck"  
                                                    :data="dataListCheck" 
                                                    :loading="false" 
                                                ></Table>  
                                        </FormItem>
                                    </Col> -->
                                </Row>
                            </Col>
                        </Row>
                </Form>
                <div slot="footer">
                    <Button @click="checkModal = false" type="info" size="large">关闭</Button>
                </div>
            </Modal>
             <!-- 新增/编辑节点 -->
             <Modal v-model="jiedainSt.addS" :styles="{top: '150px'}" :title="addNTitle" :mask-closable="maskclosable">
                 <Form :label-width="48"  @submit.native.prevent>
                     <Row>
                         <Col span="21" offset="1">
                             <FormItem label="名称：">
                                 <Input v-show="addNTitle=='新增目录'" placeholder="请输入名称"  @on-keydown.enter="saveChild()" v-model="NodeContent"/>
                                 <Input v-show="addNTitle=='编辑目录'" placeholder="请输入名称"  @on-keydown.enter="saveChild()" v-model="NodeName"/>
                             </FormItem>
                         </Col>
                     </Row>
                 </Form>
                 <div slot="footer">
                     <Button @click="jiedainSt.addS=false">取消</Button>
                     <Button type="info" @click="saveChild()">保存</Button>
                 </div>
             </Modal>
             <!-- 删除节点 -->
             <Modal v-model="jiedainSt.delS" :styles="{top: '150px'}" title="删除目录" :mask-closable="maskclosable">
                 <Form :label-width="40">
                     <Row>
                         <Col v-show="deleteTip" span="21" offset="1">
                             是否要删除选中的文件目录?
                         </Col>
                         <Col v-show="!deleteTip" span="21" offset="1">
                            不能删除含有文件的文件目录!
                        </Col>
                     </Row>
                 </Form>
                 <div slot="footer">
                     <Button v-show="deleteTip" @click="jiedainSt.delS=false">取消</Button>
                     <Button v-show="deleteTip" type="info" @click="deleteSJ()">保存</Button>
                     <Button v-show="!deleteTip" type="info" @click="jiedainSt.delS=false">关闭</Button>
                 </div>
             </Modal>
             <!-- 移动列表 -->
            <Modal :width="300" :styles="{top: '200px'}" v-model="shouCangModal" title="选择移动目录"  :mask-closable="maskclosable">
                <Row>
                    <Col span="23" style="max-height:200px;overflow: auto;" offset="1">
                        <RadioGroup v-model="vertical" vertical>
                            <Radio v-for="(item,i) in items" :label="item.title" :key="i">
                                <span>{{item.title}}</span>
                            </Radio>
                        </RadioGroup>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="shouCangModal = false" >取消</Button>
                    <Button @click="moveTo()" type="info" >确认</Button>
                </div>
            </Modal>
        </div>
    </template>
    <script>
    import {isNull,isEmpty} from '@/libs/common.js'
    import MyUpload from '@/views/components/Upload/MyUpload.vue';
    import UEtor from '../../cms/MyUeditor2.vue';
    var message={
        title:"",
        content:"",
        type:"",
        cbDate:"",			// 上传者上传日期
        folder:"",			// 所属文件夹
        contributor:"",	// 上传者
        filesId:"",		// 文件id	
    }
    export default {
        name: "filemanage",
        components:{
            UEtor,MyUpload
        },
        data() {
            return {
                format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
                shouCangModal:false,
                vertical: '',
                items:[],
                recordId:"",

                treeParams:{},
                jiedainSt:{
                    addS:false,
                    delS:false,
                },
                deleteTip:true,

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
                        { required: true, message: '标题不能为空', trigger: 'blur', transform:value=>value?value.trim():'' }
                        
                    ],
                },
                // close:false,//按钮状态切换
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
                        key: "folder",
                        align:'center',
                    },
                    {
                        title: "创建时间",
                        maxWidth:150,
                        key: "cbDate",
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
                        width:260,
                        render:(h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var filesId = params.row.filesId;
                            var buttons = [];
                                buttons.push(
                                    h('Button', {
                                        props: {
                                            type: 'primary',
                                            size: 'small'
                                        },
                                        style: {
                                            "margin-right": '10px'
                                        },
                                        on: {
                                            click: ()=>{
                                                _self.handleEdit(params.row);                                      
                                            }
                                        }
                                        }, '编辑'));
                            buttons.push(
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
                                    }, '查看'));  
                                buttons.push(
                                    h('Button', {
                                        props: {
                                            type: 'warning',
                                            size: 'small'
                                        },
                                        style: {
                                            "margin-left": '10px'
                                        },
                                        on: {
                                            click: ()=>{
                                                _self.moveToModal(params.row);                                      
                                            }
                                        }
                                        }, '移动'));  
                                buttons.push(
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        style: {
                                            "margin-left": '10px'
                                        },
                                        on: {
                                            click: ()=>{
                                                _self.deleteItem(params.row);                                      
                                            }
                                        }
                                        }, '删除'));             
                            return h('div', buttons);
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
                    wheres:{
                        search:"",//根据标题的模糊查询
                        type:"",//根据文件类型的查询
                        folder:"",//需要获取哪个文件夹下的文件
                    },
                },
                message:{
                    title:"",
                    content:"",
                    type:"",
                    cbDate:"",			// 上传者上传日期
                    folder:"",			// 所属文件夹
                    contributor:"",	// 上传者
                    filesId:"",		// 文件id	
                },
                recordId:"",//收藏id
                fileType:"",//收藏的文件类型名字
                folderName:"",//新增文件属于哪个类型
                node:[],
                addNTitle:"",
                NodeContent:"",
                NodeName:"",
                areaTree:[],
                countFiles:"",
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
            cliHeight(){
                return this.$store.state.app.treeHeight -6;
            }
        },
        methods: {
              //移动
              moveTo(){
                if(this.vertical==""){
                    this.$Message.error("请选择移动目录");
                    return;
                }
                var _self=this;
                _self.$http.patch("/standingbook/coop/fm/moveFile?id="+_self.recordId+"&folder="+_self.vertical)
                .then(res=>{
                    if(res.success){
                        _self.$Message.info("移动成功");
                        _self.initSearch();
                        _self.shouCangModal=false;
                    }else{
                        _self.$Message.error("移动失败");
                    }
                });
            },
            moveToModal(row){
                this.recordId=row.id;
                var _self=this;
                this.vertical="";
                _self.$http.get("/standingbook/coop/fm/getRoot")
                .then(res=>{
                    if(res.success){
                        console.log(res,"res");
                        _self.items=res.data[0].children;
                    }
                })
                this.shouCangModal=true;
            },

            //新增文件目录节点
            addFontNodePre(){
                this.NodeContent="";
                this.addNTitle="新增目录";
                this.jiedainSt.addS=true;
            },
            //编辑文件目录节点名称
            editFontNodePre(){
                if(this.node.length==0){
                    this.$Message.error("请先选择文件目录");
                    return ;
                }
                this.NodeContent=this.node[0].title;
                this.NodeName=this.node[0].title;
                this.addNTitle="编辑目录";
                this.jiedainSt.addS=true;
            },
            //按钮
            saveChild(){
                var _self=this;
                if(this.addNTitle=="新增目录"){
                    _self.$http.post("/standingbook/coop/fm/addFolder?folder="+this.NodeContent)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("操作成功");
                            _self.showTree();
                            _self.initSearch();
                        }
                    });
                }else if(this.addNTitle=="编辑目录"){
                    if(this.node[0].parentId=="root"){
                        _self.$http.patch("/standingbook/coop/fm/updateRoot?name="+this.NodeName)
                        .then(res=>{
                            if(res.success){
                                _self.$Message.info("操作成功");
                                _self.showTree();
                                _self.query.wheres.folder=_self.NodeName;
                                _self.initSearch();
                            }
                        });
                    }else{
                        _self.$http.patch("/standingbook/coop/fm/updateFolder?folder="+this.NodeContent+"&name="+this.NodeName)
                        .then(res=>{
                            if(res.success){
                                _self.$Message.info("操作成功");
                                _self.showTree();
                                _self.query.wheres.folder=_self.NodeName;
                                _self.initSearch();
                            }
                        });
                    }
                }
                this.jiedainSt.addS=false;
            },
            //删除文件目录节点
            delFontNodePre(){
                if(this.node.length==0){
                    this.$Message.error("请先选择文件目录");
                    return ;
                }
                if(this.node[0].parentId=="root"){
                    this.$Message.error("不能删除根目录");
                    return;
                }
                if(this.countFiles=="0"){
                    this.deleteTip=true;
                }else{
                    this.deleteTip=false; 
                }
                this.NodeContent=this.node[0].title;
                this.jiedainSt.delS=true;
            },
            //按钮
            deleteSJ(){
                this.$http.delete("/standingbook/coop/fm/delFolderAndFiles?folder="+this.NodeContent)
                .then(res=>{
                    if(res.success){
                        this.$Message.info("操作成功");
                        this.showTree();
                        this.query.wheres.folder=this.NodeContent;
                        this.initSearch();
                        this.jiedainSt.delS=false;
                    }
                });
            },
            //树节点触发事件
            selectTreeChange(v){
                this.node=v;
                if(v.length==0){
                    return;
                }
                if(v[0].parentId=="root"){
                    this.query.wheres.folder="";
                }else{
                    this.query.wheres.folder=v[0].title;
                }
                this.query.wheres.type="";
                this.folderName=v[0].title;
                this.initSearch();
                
                this.$http.get("/standingbook/coop/fm/getRootCount?folder="+v[0].title)
                .then(res=>{
                    if(res.success){
                        this.countFiles=res.data;
                    }
                });
            },
            initSearch() {
                this.$refs.test.initSearch();
            },
            handleReset() {
                this.query.wheres.search="";
                this.query.page = 1;
                this.query.size = 10;
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
                _self.message.content=content;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(_self.judge=="new"){
                                _self.message.filesId=_self.sID;
                                _self.$http.post("/standingbook/coop/fm/save",_self.message)
                                .then(res=>{
                                    if(res.success){
                                        _self.initSearch();
                                        _self.showTree();
                                        _self.updateAddModal=false;
                                        _self.$Message.info("新增成功");
                                    }
                                })
                        }else if(_self.judge=="update"){
                            _self.$http.patch("/standingbook/coop/fm/"+_self.updataId,_self.message)
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
                if(this.node.length==0){
                    this.$Message.error("请选择类型文件");
                    return ;
                }
                if(this.query.wheres.folder==""){
                    var error="请选择类型文件";
                    this.$Message.error(error);
                    return;
                }
                this.updateAddModal=true;
                this.title="新增";

                this.message=JSON.parse(JSON.stringify(message));
                this.message.folder=this.folderName;
                this.message.type=this.folderName;
                this.message.cbDate=new Date();
                this.status=true;
                this.judge="new";
                this.$refs["message"].resetFields();
                this.addUpdateMl=false;
                this.quanxianShow=false;
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
                this.title="编辑";

                this.status=true;
                this.addUpdateMl=false;
                this.quanxianShow=false;
                this.$refs.uetor.setUEContent("");
                this.judge="update";
                this.$refs["message"].resetFields();
                this.updataId=ids.id;
                var _self=this;
                _self.$http.get("/standingbook/coop/fm/"+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.message=res.data;                       
                        _self.$refs.uetor.setUEContent(_self.message.content);
                        _self.sID=res.data.filesId;
                        _self.getImages(res.data.filesId);

                        _self.updateAddModal=true;
                    }
                });
            },
            deleteItem(row){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除此条文件吗？",
                    onOk:function(){
                        _self.$http.delete("/standingbook/coop/fm/"+row.id).then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.showTree();
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
                this.title="查看";
                this.recordId=ids.id;
                this.fileType=ids.type;

                this.$refs["message"].resetFields();
                _self.detailId=ids.id;
                _self.status=true;
                _self.addUpdateMl=true;
                this.quanxianFirstDl=false;
                _self.$http.get("/standingbook/coop/fm/"+ids.id)
                .then(res=>{
                    if(res.success){
                        _self.message=res.data;

                        $("#title").html('');
                        $("#title").html(_self.message.title);
                        
                        $("#ct").html('');
                        $("#ct").html(_self.message.cbDate);

                        $("#ut").html('');
                        $("#ut").html(_self.message.updateTime);

                        $("#wenzi").html('');
                        $("#wenzi").append(res.data.content);
                        $("#wenzi").css({
                            "min-height":"315px",
                        });
                        _self.getImages(res.data.filesId);
                    }
                });
                _self.checkModal=true;
            },
            showTree(){
                var _self=this;
                _self.$http.get("/standingbook/coop/fm/getRoot")
                .then(res=>{
                    if(res.success){
                        _self.areaTree=res.data;
                    }
                })
            },
        },  
        mounted(){
            this.showTree();
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
      