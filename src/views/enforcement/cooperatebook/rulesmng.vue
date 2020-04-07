<style lang="less" scoped>
        @import '../../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row>
                <data-table ref="test" 
                    :url="'/standingbook/coop/reg/regList'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="50" @submit.native.prevent>
                            <Row>
                                <Col span="4">
                                    <Form-item label="标题:">
                                        <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="float:right;text-align:right;">
                                    <Button @click="newAdd()" type="success" icon="ios-add" >新增</Button>
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
            <Modal v-model="updateAddModal" :styles="{top: '165px'}" :z-index='888' :title="title" width="900" :mask-closable="maskclosable">
                    <div style="height:448px;overflow-y:auto;overflow-x:auto;box-sizing: border-box;padding:6px;">
                        <Form :label-width="50" @submit.native.prevent :model="newAddParams" ref="newAddParams" :rules="rulesvalid" v-show="title=='新增' || title=='编辑'">                   
                            <Row>
                                <Col span="12">
                                    <Form-item label="标题:" prop="title">
                                        <Input v-model="newAddParams.title" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col>
                                <Col span="12" style="z-index: 100000;">
                                    <Form-item label="类型:" :label-width="70" prop="type">
                                        <Select v-model="newAddParams.type">
                                            <!-- @on-change="rulesTrans" -->
                                            <!-- <Option value="0" selected>全部</Option> -->
                                            <Option v-for="(item,index) in rules" :value="item.index" :key="item.index">{{item.label}}</Option>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <Col span="24">
                                    <div>
                                        <UEtor ref="uetor" :config="config" :defaultMsg="defaultMsg"></UEtor> 
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        <Form :label-width="40" @submit.native.prevent v-show="title=='查看'">   
                            <Row>
                                <!-- <Col span="24" style="margin:-5px 0px -15px;">
                                    <Form-item label="标题:">
                                        <Input v-model="newAddParams.title" placeholder="请输入..."></Input>
                                    </Form-item>
                                </Col> -->
                                <Col span="24">
                                    <Row>
                                        <Col span="24">
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
                                            <div id="wenzi" ></div>                                
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>                   
                    </div>
                    <div slot="footer">
                        <Button v-show="title=='新增' || title=='编辑'"   @click="updateAddModal=false">取消</Button>
                        <Button v-show="title=='新增' || title=='编辑'" type="info"  @click="saveData('newAddParams')">保存</Button>
                        <Button v-show="title=='查看'" type="info"  @click="updateAddModal=false">关闭</Button>
                    </div>
            </Modal>
            <!-- 附件上传 -->
            <!-- <Modal v-model="fileShow" :styles="{top: '220px'}" title="附件上传" width="500" :mask-closable="maskclosable">
                <div ref="DIV">
                    <newUpload
                        multiple 
                        action="/$admin/attachs"
                        :ifEdit="ifEdit"
                        :show-upload-list="false"
                        :data="uploadData"
                        :format="format"
                        name="securityparameter"
                        :on-format-error="uploadError"
                        :before-upload="beforeUpload"  
                        :on-success="uploadSuccess"
                        :uploadList="uploadList"
                        >
                    </newUpload>
                </div> 
                <div slot="footer">
                    <Button type="info"  @click="fileShow=false">关闭</Button>
                </div>
            </Modal> -->
            <MultiUpload v-model="fileShow"  :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" :dataId="sID" moduleId="rulesmng"></MultiUpload>
        </div>     
    </template>
    <script>
    import MyUpload from '@/views/components/Upload/MyUpload.vue';
    import newUpload from '@/views/components/Upload/newUpload.vue';
    import {isNull,isEmpty } from '@/libs/common.js'  
    import UEtor from '../../cms/MyUeditor.vue';
    import userObj from '@/store/module/userId.js';
    import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
    export default {
        name: 'rulesmng',
        components: {
            //
            UEtor,
            MyUpload,
            newUpload,
            MultiUpload
        },
        data () {
            return {
                name_Data: '',
                ifEdit: false,
                format:['jpg','png','jpeg','docx','doc','xls','xlsx','pdf','swf','mp3','mp4','avi','rmvb','wav','txt'],
                iSmanager:false,
                rulesvalid:{
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur', transform:value=>value?value.trim():'' }
                        
                    ],
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'change' }
                        
                    ],
                },
                //
                defaultMsg:"",
                config:{
                    initialFrameWidth:840,
                    autoWidth: true,
                    initialFrameHeight:291,
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
                listshow:true,
                // ruleName:true,
                    
                updateAddModal:false,
                maskclosable:false,
                rules:[
                    {
                        label:"合作社章程",index:"1"
                    },
                    {
                        label:"安全管理制度",index:"2"
                    }
                ],
                title:"",
                newAddParams:{
                    title:"",
                    content:"",
                    type:"",
                },
                columns: [
                    {   
                        title:'序号',
                        type: 'index',
                        maxWidth: 80,
                        align: 'center',
                    },
                    {
                        title: '标题',
                        align: 'center',
                        key: 'title'
                    },
                    {
                        title: '类型',
                        align: 'center',
                        key: 'type',
                        render:(h,params)=>{
                            var type=params.row.type;
                            if(type=="1"){
                                return h("div","合作社章程");
                            }else if(type=="2"){
                                return h("div","安全管理制度");
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        width:200,
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: '更新时间',
                        width:200,
                        align: 'center',
                        key: 'updateTime'
                    },
                    {
                        title: '创建人',
                        align: 'center',
                        key: 'creatorName',
                        maxWidth:140
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width:255,
                        render: (h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var temp = [];
                            if(_self.iSmanager){
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.handleEdit(params.row);
                                            }
                                        }                       
                                    },"编辑"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.title="查看";
                                                _self.watchMsg(params.row);
                                            }
                                        }                       
                                    },"查看"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "warning",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                this.ifEdit = true                                    
                                                _self.uploadFs(params.row);
                                            }
                                        }                       
                                    },"附件"));
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.delete(id);
                                            }
                                        }                       
                                    },"删除"));
                            }else{
                                if(userObj.userId==params.row.creatorId){
                                    temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.handleEdit(params.row);
                                            }
                                        }                       
                                    },"编辑"));
                                }
                                temp.push(
                                    h("Button",
                                    {
                                        props: {
                                            type: "info",
                                            size: "small"
                                        },
                                        style:{
                                            marginLeft:"10px"
                                        },
                                        on:{
                                            click:()=>{
                                                _self.title="查看";
                                                _self.watchMsg(params.row);
                                            }
                                        }                       
                                    },"查看"));
                                        temp.push(
                                            h("Button",
                                            {
                                                props: {
                                                    type: "warning",
                                                    size: "small"
                                                },
                                                style:{
                                                    marginLeft:"10px"
                                                },
                                                on:{
                                                    click:()=>{
                                                        this.ifEdit = false
                                                        if(userObj.userId==params.row.creatorId){
                                                            this.ifEdit = true
                                                        }
                                                        _self.uploadFs(params.row);
                                                    }
                                                }                       
                                            },"附件"));   
                                if(userObj.userId==params.row.creatorId){
                                    temp.push(
                                        h("Button",
                                        {
                                            props: {
                                                type: "error",
                                                size: "small"
                                            },
                                            style:{
                                                marginLeft:"10px"
                                            },
                                            on:{
                                                click:()=>{
                                                    _self.delete(id);
                                                }
                                            }                       
                                        },"删除"));
                                }                      
                            }
                            return h("div", temp);
                        }
                    },
                ],
                dataList: [],
                query:{
                    page:1,
                    size:10,
                    wheres:{
                        search:"",
                    },
                    others:{
                        type:"0",
                    },
                },
                /////////////////////////////////////////////////////////////////////
                fileShow:false,
                sID:"",
                uploadList:[],
            }
        },
        computed:{  
            /////////////////////////////////////////////////////////////////////
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
            // show(url){
            //     window.open(url);
            // },
            // deleteFile:function(index,item){
            //     var _self=this;
            //     _self.$http.delete("/$admin/attachs/"+item.id)
            //         .then(function(result){
            //             if(result.success){
            //                 _self.uploadList.splice(index, 1);
            //             }
            //             _self.$Message.info(result.msg);
            //     });
            // },
            getImages(v){
                var _self=this;
                _self.$http.get("/$admin/attachs?dataId="+v+"&moduleId=standingbook")
                .then(res=>{
                    if(res.success){
                        _self.uploadList=res.data;
                        _self.fileShow=true;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            },
            uploadFs(row){
                this.name_Data = row.creatorName
                this.sID=row.id;
                this.uploadList=[];
                this.getImages(row.id);
            },


            initSearch() {
                this.$refs.test.initSearch();
            },
            handleReset() {
                for (let key in this.query.wheres) {
                    this.query.wheres[key] = "";
                }
                this.query.page = 1;
                this.query.size = 10;
                this.initSearch();
            },
            newAdd(){
                this.newAddParams={};
                this.title="新增"
                this.$refs["newAddParams"].resetFields();
                this.updateAddModal=true;
                this.listshow=false;
                this.$refs.uetor.setUEContent("");
            },
            dbhandleEdit(msg){
                this.title="查看";
                this.watchMsg(msg);
            },
            watchMsg(row){
                var _self=this;
                this.updateAddModal=true;
                if(this.title=="新增" || this.title=="编辑"){
                    this.listshow=false;
                }else if(this.title=="查看"){
                    this.listshow=false;
                }
                this.sID=row.id;
                this.uploadList=[];
                _self.$http.get("/$admin/attachs?dataId="+row.id+"&moduleId=standingbook")
                .then(res=>{
                    if(res.success){
                        _self.uploadList=res.data;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });                               
                _self.$http.get("/standingbook/coop/reg/"+row.id)
                .then(res=>{
                    if(res.success){
                        _self.newAddParams=res.data;
                        _self.$refs.uetor.setUEContent(_self.newAddParams.content);

                        $("#title").html('');
                        $("#title").html(_self.newAddParams.title);
                        
                        $("#ct").html('');
                        $("#ct").html(_self.newAddParams.createTime);

                        $("#ut").html('');
                        $("#ut").html(_self.newAddParams.updateTime);

                        $("#wenzi").html('');
                        $("#wenzi").append(_self.newAddParams.content);
                        $("#wenzi").css({
                            "min-height":"341px",
                        });
                    }
                });
            },
            handleEdit(row){
                this.title="编辑"
                this.$refs["newAddParams"].resetFields();
                this.watchMsg(row);
            },
            delete(id){
                var _self=this;
                _self.$Modal.confirm({
                    title:"提示",
                    content:"您确定要删除选中的列表项吗？",
                    onOk:function(){
                        _self.$http.delete("/standingbook/coop/reg/"+id)
                        .then(result =>{
                            if(result.success){
                                _self.initSearch();
                                _self.$Message.success('删除成功');
                            }else{
                                this.$Message.error("删除失败");
                            }
                        });
                    }
                });
            },
            saveData(name){
                var _self=this;
                _self.newAddParams.content =_self.$refs.uetor.getUEContent();
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(isNull(_self.newAddParams.id) ||_self.newAddParams.id==undefined ){
                            _self.newAddParams.creatorName=userObj.name;
                            _self.$http.post("/standingbook/coop/reg/save",_self.newAddParams)
                            .then(res=>{
                                if(res.success){
                                    _self.$Message.info("新增成功");
                                    _self.updateAddModal=false;
                                    _self.initSearch();
                                }else{
                                    _self.$Message.error("新增失败");
                                }
                            });
                        }else{
                            _self.$http.patch("/standingbook/coop/reg/"+_self.newAddParams.id,_self.newAddParams)
                            .then(res=>{
                                if(res.success){
                                    _self.$Message.info("编辑成功");
                                    _self.updateAddModal=false;
                                    _self.initSearch();
                                }else{
                                    _self.$Message.error("编辑失败");
                                }
                            });
                        }
                    }
                });
            },
        },
        beforeMount() {
            if(this.$hasRoles("ADMIN") || this.$hasRoles("cooperative")){
                this.iSmanager=true;
            }else{
                this.iSmanager=false;
            }
        },
        mounted() {
        },
    };
    </script>      
    <style scoped>
    form /deep/ tr.edui-default{
        display:none !important;
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
        margin:10px 0px 10px 0px;
        padding-bottom:10px;
        border-bottom:1px solid #e9eaec;
    }
    </style>
                    
        
        
        