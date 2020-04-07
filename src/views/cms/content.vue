<style lang="less">
    @import '../../styles/common.less';
</style>
<template>
    <div>
        <div>
            <Row>
                <Col span="5" class="height-100" >
                    <Card :style="'height:'+(clientHeight-113)+'px'">
                        <div>
                            <Select v-model="currentsiteid" clearable placeholder="请选择站点" @on-change='changesite'>
                                <Option v-for="(item,index) in sites" :value="item.id" :key="index">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div>
                            <Tree ref="channelTree" :data="channelTree" @on-select-change="changeTree" ></Tree>
                        </div>
                    </Card>
                </Col>
                <Col span="19" class="padding-left-6">
                        <Card :style="'height:'+(clientHeight-113)+'px'" v-show="!contentpage">
                            <Row>
                                <Input icon="ios-search"  placeholder="请输入内容名称..." v-model="query.search" style="width: 200px" @on-change="handleSearch"/>
                                <Button type="info" @click="addcontent">新增内容</Button>
                            </Row>
                            <Row style="margin-top:5px;">
                                <Table  :height="clientHeight-223" border :columns="contentColumn" :data="contentdata"></Table>
                            </Row>
                            <Row style="margin-top:5px;">
                                <Page :total="dataTotal" :current="query.page" :page-size="query.size" @on-change="pageChange" @on-page-size-change="pageSizeChange" placement="top" show-total show-elevator show-sizer></Page>
                            </Row>
                        </Card>
                        <Card :style="'height:'+(clientHeight-113)+'px'"  title="asdasda" v-show="contentpage">
                            <p slot="title">{{isNew?'内容新增':'内容修改'}}</p>
                            <div :style="'overflow-y:scroll;height:'+(clientHeight-190)+'px'" ref="pagediv" id="pagediv">
                            <Row>
                                <!-- <Col span="2"> 
                                <br/>
                                </Col>-->
                                <Col span="23">
                                    <Form  :model="contentInfo" ref="contentInfo" :rules="ruleValidate"  :label-width="80">
                                        <Row>
                                            <Col span="12">
                                                <Row>
                                                    <FormItem label="标题:" prop="title">
                                                        <Input v-model="contentInfo.title" placeholder="请输入标题..."></Input>
                                                    </FormItem>
                                                </Row>
                                                <Row>
                                                    <FormItem label="发布时间:">
                                                        <Date-picker type="datetime"    v-model="contentInfo.publishtime"  format="yyyy-MM-dd HH:mm"  placeholder="选择日期和时间"  :clearable="false"></Date-picker>
                                                    </FormItem>
                                                </Row>
                                                
                                            </Col>
                                            <Col span="4">
                                                <br/>
                                            </Col>
                                            <Col span="8">
                                                <FormItem label="标题图:" >
                                                    <MyUpload action="/$admin/attachs"
                                                        :data="uploadData"
                                                        :on-success="uploadSuccess" >
                                                        <img style="width: 90%;max-width: 100px;height: auto;" :src="contentimg"/>
                                                    </MyUpload>
                                                </FormItem>
                                                
                                            </Col>
                                            
                                        </Row>
                                        <Row style="margin-top:12px">
                                            <Col span="12">
                                                <FormItem label="当前栏目:" >
                                                    <Input v-model="currentChannel.name" readonly></Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="栏目类型:" >
                                                    <Input v-model="currentChannel.typename" readonly></Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row style="margin-top:12px">
                                            <Col span="12">
                                                <FormItem label="作者:" >
                                                    <Input v-model="contentInfo.author" placeholder="请输入作者..."></Input>
                                                </FormItem>
                                            </Col>
                                            <Col span="12">
                                                <FormItem label="来源:" >
                                                    <Input v-model="contentInfo.source" placeholder="请输入来源..."></Input>
                                                </FormItem>
                                            </Col>
                                        </Row>
                                        <Row style="margin-top:12px">
                                            <FormItem label="摘要:" >
                                                <Input v-model="contentInfo.summary" type="textarea" placeholder="请输入摘要内容..." :rows="3"></Input>
                                            </FormItem>
                                        </Row>
                                        <Row style="margin-top:12px">
                                          <Col span="24">
                                            <FormItem label="内容:" >
                                              <UEtor :config="config" ref="ue" :defaultMsg='defaultMsg'>
                                              </UEtor>
                                            </FormItem>
                                            

                                          </Col>
                                        </Row>
                                    </Form>
                                    <div style="float:right;">
                                        <!-- <Button @click="gdt">touppercase</Button> -->
                                        <Button @click="closepage">取消</Button>
                                        <Button type="primary" @click="saveContent">保存</Button>
                                    </div>
                                </Col>
                                <!-- <Col span="2"> 
                                <br/>
                                </Col>-->
                            </Row>
                            
                            </div>
                        </Card>
                </Col>
            </Row>
        </div>

    </div>
</template>
<script>
import MyUpload from '@/views/components/Upload/MyUpload.vue';
import UEtor from './MyUeditor.vue';
export default {
    components: {
        MyUpload,
        UEtor
    },
    data(){
        return {
            ruleValidate:{
                title: [
                    { required: true, message: '标题不能为空', trigger: 'change' }
                ]
            },
            defaultMsg:'12313',
            config:{
              // initialFrameWidth:100%,
              autoWidth: true,
              initialFrameHeight:450,
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
            contentpage:false,//控制两个card的显示
            dataTotal:0,
            query:{
                page:1,
                size:10,
                others:{},
                search:''

            },
            sites:[],
            currentsiteid: 0,//0表示没有选择站点
            currentchannelid: 0,//0表示没有选择栏目，所以展示该站点下的所有栏目列表。
            channelTree:[],//栏目树
            contentInfo:{
                summary:'',
                publishtime: new Date(),
                contentimg:'',
                content:'',
                title:'',
                status:0

            },
            contentColumn:[
                {
                    title: '序号',
                    key: 'id',
                    align: 'center',
                    width: 100
                },
                {
                    title: '标题',
                    key: 'title',
                    align: 'center',
                    width: 300
                    
                },
                {
                    title: '所属栏目',
                    key: 'channelname',
                    align: 'center',
                    
                },
                {
                    title: '发布时间',
                    key: 'publishtime',
                    align: 'center',
                    
                },
                {
                    title: '创建时间',
                    key: 'createTime',
                    align: 'center',
                    
                },
                {
                    title: '发布状态',
                    key: 'status',
                    align: 'center',
                    render:(h,params) =>{
                        return h('i-switch', {
                            props: {
                                value: params.row.status === 1  //控制开关的打开或关闭状态，官网文档属性是value
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                                    // this.switch(params.index) //params.index是拿到table的行序列，可以取到对应的表格值
                                    
                                    if(value){
                                        params.row.status = 1;
                                    }else{
                                        params.row.status = 0;
                                    }
                                    this.changeStatus(params.row.id,params.row.status);

                                    
                                }
                            }
                       })
                    }
                    
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 200,
                    align: 'center',
                    render: (h, params) => {
                        var id=params.row.id;
                        var buttons=[];
                        buttons.push(h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small'
                            },style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.editContent(id);
                                }
                            }
                        },'编辑'));
                        buttons.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.removeContent(id);
                                    }
                                }
                            }, '删除'));
                        return h('div', buttons);
                    }
                }
            ],
            contentdata:[],
            currentChannel:{},
            isNew:true
        }
    },
    computed:{
        clientHeight(){
            return this.$store.state.app.clientHeight;
        },
        contentimg(){
            let path = this.contentInfo.contentimg;
            if(!path)
                return this.$util.avatar;
            path = this.$basePath+"/attachment"+this.contentInfo.contentimg;
            return path;
        },
        uploadData(){
            return {
                moduleId:"CmsContent",
                // dataid:this.userInfo.username
            }
        }
    },
    methods:{
        closepage(){
            this.contentpage = false;
            $("#pagediv").scrollTop(0);
        },
        changeStatus(id,status){
            this.$http.get("/cms/content/status?id="+id+"&status="+status).then(result => {
                if(result.success){
                    if(status == 1){
                        this.$Message.info('内容发布成功');
                    }else{
                        this.$Message.info('内容撤销发布');
                    }
                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        removeContent(id){
            let _self = this;
            this.$Modal.confirm({
                title:"提示",
                content:"确定要删除当前内容吗？",
                onOk:function(){
                    this.$http.delete("/cms/content/"+id).then(result =>{
                        if(result.success){
                            this.$Message.info("删除成功");
                            _self.getpages();
                        }else{
                            this.$Message.info(result.msg);
                            _self.getpages();
                        }
                    });
                   
                }
            });


        },
        saveContent(){//保存内容
            let _self = this;
            this.$refs["contentInfo"].validate((valid) => {
                if (valid) {
                    var content =_self.$refs.ue.getUEContent();
                    // console.log(content)
                    _self.contentInfo.content = content;
                    _self.contentInfo.channelid = _self.currentchannelid;
                    if(this.isNew){
                        _self.$http.post("/cms/content",_self.contentInfo)
                                .then(result =>{
                                    if(result.success){
                                        this.getpages();
                                        _self.contentpage = false;
                                        $("#pagediv").scrollTop(0);
                                    }else{
                                        _self.$Message.info(result.msg);
                                    }
                                })
                    }else{
                         _self.$http.patch("/cms/content/"+_self.contentInfo.id,_self.contentInfo)
                                .then(result =>{
                                    if(result.success){
                                        this.getpages();
                                        _self.contentpage = false;
                                        $("#pagediv").scrollTop(0);
                                    }else{
                                        _self.$Message.info(result.msg);
                                    }
                                })

                    }

                }
            });

        },
        uploadSuccess(response, file, fileList){
            this.contentInfo.contentimg=response.data.url;
        },
        addcontent(){    
            this.isNew =true;        
            let _self = this;
            if(_self.currentchannelid==0){
                 _self.$Message.error({
                    content:"请先选择栏目"
                });
                return;
            }
            this.contentInfo = {
                summary:'',
                publishtime: new Date(),
                contentimg:'',
                content:'',
                title:'',
                status:0

            };
            $("#pagediv").scrollTop(0);
            this.$refs["contentInfo"].resetFields();
            this.$refs.ue.setUEContent('');
            //获取当前栏目信息
            this.$http.get("/cms/channel/"+_self.currentchannelid).then(result => {
                if(result.success){
                    this.currentChannel=result.data;
                    
                }else{
                    this.$Message.info(result.msg);
                    return;//请求失败，方法结束
                }
            });
            this.contentpage = true;
        },
        editContent(id){
            this.$refs["contentInfo"].resetFields();
            let _self = this;
            this.isNew=false;
            //获取当前操作栏目信息
            this.contentpage = true;
            $("#pagediv").scrollTop(0);
            //获取内容信息
            this.$http.get("/cms/content/"+id).then(result => {
                if(result.success){
                    this.contentInfo=result.data;
                    this.$refs.ue.setUEContent(result.data.content);//设置富文本编辑器内容
                    this.$http.get("/cms/channel/"+result.data.channelid).then(result => {
                    if(result.success){
                        this.currentChannel=result.data;
                        
                    }else{
                        this.$Message.info(result.msg);
                        return;//请求失败，方法结束
                    }
            });
                }else{
                    this.$Message.info(result.msg);
                    return;//请求失败，方法结束
                }
            });
            
            
            

        },
        changeTree(node){//改变当前选中的栏目树节点
            if(node.length === 0){//点两次会返回空数组
                return;
            }
            this.currentchannelid = node[0].id;//改变当前的栏目id
            // this.treenode = node[0];//当前栏目节点
            this.getpages();//重新加载表格
        },
        changesite(value){//切换站点
            // console.log(value);
            //切换站点的初始化前操作
            this.dataTotal=0,
            this.query={
                page:1,
                size:10,
                others:{},
                search:''
            }
            this.currentchannelid = 0;//表示没选
            this.currentChannel={};
            if(value){
                this.currentsiteid = value;
                this.initChannelTree();//加载树
                this.getpages();//加载表格数据

            }else{
                //情况value,
                this.channelTree = [];//清空树
                this.contentdata = [];
                
            }
            
        },
        init(){
            //初始化时获取当前用户的默认站点
            this.$http.get("/cms/site/defaultid").then(result =>{
                if(result.success){
                    this.currentsiteid = result.data;
                    this.initChannelTree();
                    // this.getpages();
                    this.getpages();

                }
            })
        },
        initChannelTree(){
            //获取当前站点的栏目树
            this.$http.get("/cms/channel/tree?siteid="+this.currentsiteid).then(result =>{
                if(result.success){
                    this.channelTree = result.data;
                }
             })
        },
        initSites(){
            //获取站点集合
            this.$http.get("/cms/site").then(result =>{
                if(result.success){
                    this.sites = result.data;
                    
                }
             })
        },
        handleSearch(){
            this.getpages();
        },
        getpages(){
            let query = this.query;
            query.others.channelid = this.currentchannelid,
            query.others.siteid = this.currentsiteid,
            this.$http.get("/cms/content/page",{
                params:{
                    query: JSON.stringify(query)
                }
            }).then(result => {
                if(result.success){
                    this.contentdata = result.data.data;
                    this.query.page =  result.data.page;
                    this.query.size =  result.data.size;
                    this.dataTotal = result.data.total;

                }else{
                    this.$Message.info(result.msg);
                }
            });
        },
        pageChange(page){
            this.query.page = page;
            this.getpages();

        },
        pageSizeChange(size){
            this.query.size = size;
            this.getpages();
        }
    },
    mounted(){
        this.init();
        this.initSites();
    }
    
}
</script>
<style>

</style>
