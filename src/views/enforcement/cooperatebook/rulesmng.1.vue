<style lang="less" scoped>
        @import '../../../styles/common.less';
    </style>  
    <template>
        <div>
            <Row v-show="listshow">
                <data-table ref="test" 
                    :url="'/standingbook/coop/reg/regList'" 
                    :params="query" 
                    :columns="columns"
                    @on-row-dblclick="dbhandleEdit"
                    >
                    <div slot="search">
                        <Form :label-width="60" @submit.native.prevent>
                            <Row>
                                <Col span="3">
                                    <Select v-model="query.others.type" @on-change="rulesTrans">
                                        <Option value="0" selected>全部类型</Option>
                                        <Option v-for="(item,index) in rules" :value="item.index" :key="item.index">{{item.label}}</Option>
                                    </Select>
                                </Col>
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
            <!-- 新增 -->
            <Card shadow v-show="title=='新增' || title=='编辑'" style="height:585px;">
                <Form :label-width="40" @submit.native.prevent>                   
                    <Row>
                        <Col span="24" style="margin-bottom:-20px;">
                            <Form-item label="标题:">
                                <Input v-model="newAddParams.title" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="24">
                            <div style="height:465px;overflow-y:scroll;overflow-x:hidden;">
                                <UEtor ref="uetor" :config="config" :defaultMsg="defaultMsg"></UEtor> 
                            </div>
                        </Col>
                        <Col span="24" style="margin-top:20px;text-align: center;">
                            <span>
                                <Button   size="large" @click="cancel()">取消</Button>
                                <span style="margin:0 5px;"></span>
                                <Button type="info" size="large" @click="saveData">保存</Button>
                            </span>
                        </Col>
                    </Row>
                </Form>
            </Card>
            <!-- 查看 -->
            <Card shadow v-show="title=='查看'" style="height:585px;">
                <Form :label-width="40" @submit.native.prevent>   
                    <Row>
                        <Col span="22">
                            <Form-item label="标题:" style="margin-bottom:-20px;">
                                <Input v-model="newAddParams.title" placeholder="请输入..."></Input>
                            </Form-item>
                        </Col>
                        <Col span="2" style="float:right;text-align: right;">
                            <Button type="info"  @click="cancel()">关闭查看</Button>
                        </Col>
                        <!-- <Col span="24">
                            <Tabs type="card" :animated="false">
                                <TabPane v-if="ruleName" label="合作社规章"></TabPane>
                                <TabPane v-if="!ruleName" label="安全管理制度"></TabPane>
                                <Button type="info"  @click="cancel()" slot="extra">关闭查看</Button>
                            </Tabs>
                        </Col> -->
                        <Col span="24">
                            <Row>
                                <Col span="24">
                                    <div id="wenzi" style="height:465px;overflow-y:scroll;overflow-x:hidden;"></div>                                
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>     
    </template>
    <script>
    import {isNull } from '@/libs/common.js'  
    import UEtor from '../../cms/MyUeditor.vue';
    export default {
        name: 'rulesmng',
        components: {
            //
            UEtor,
        },
        data () {
            return {
                //
                defaultMsg:"",
                config:{
                    // initialFrameWidth:100%,
                    autoWidth: true,
                    initialFrameHeight:380,
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
                        maxWidth: 150,
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
                    // {
                    //     title: '内容',
                    //     align: 'center',
                    //     key: 'content',
                    //     render:(h,params)=>{
                    //         var content=params.row.content;
                    //         content = content.replace(/&nbsp;/g,"");
                    //         content = content.replace(/<\/?.+?\/?>/g,"");
                    //         return h("div",content);
                    //     },
                    //     ellipsis:true,
                    // },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime'
                    },
                    {
                        title: '更新时间',
                        align: 'center',
                        key: 'updateTime'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        width: 180,
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
            }
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
                this.query.size = 10;
                this.initSearch();
            },
            rulesTrans(rule){
                this.query.others.type=rule;
                this.initSearch();
            },
            cancel(){
                this.listshow=true;
                this.title='';
            },
            newAdd(){
                if(this.query.others.type=="1" || this.query.others.type=="2"){
                    this.newAddParams={};
                    this.title="新增"
                    if(this.query.others.type=="1"){
                        this.newAddParams.type="1";
                    }else{
                        this.newAddParams.type="2";
                    }
                    this.listshow=false;
                    this.$refs.uetor.setUEContent("");
                }else{
                    this.$Message.error("请先选择规章制度类型");
                    return ;
                }
            },
            dbhandleEdit(msg){
                this.title="查看";
                this.watchMsg(msg);
            },
            watchMsg(row){
                var _self=this;
                if(this.title=="新增" || this.title=="编辑"){
                    this.listshow=false;

                }else if(this.title=="查看"){
                    this.listshow=false;
                }
                _self.$http.get("/standingbook/coop/reg/"+row.id)
                .then(res=>{
                    if(res.success){
                        _self.newAddParams=res.data;
                        _self.$refs.uetor.setUEContent(_self.newAddParams.content);
                        $("#wenzi").html('');
                        $("#wenzi").append(_self.newAddParams.content);
                        if(res.data.type=="1"){
                            _self.ruleName=true;
                        }else{
                            _self.ruleName=false;
                        }
                    }
                });
            },
            handleEdit(row){
                this.title="编辑"
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
            saveData(){
                var _self=this;
                _self.newAddParams.content =_self.$refs.uetor.getUEContent();
                if(isNull(_self.newAddParams.id) ||_self.newAddParams.id==undefined ){
                    _self.newAddParams.type=_self.query.others.type;
                    _self.$http.post("/standingbook/coop/reg/save",_self.newAddParams)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("新增成功");
                            _self.initSearch();
                            _self.cancel();
                        }else{
                            _self.$Message.error("新增失败");
                        }
                    });
                }else{
                    _self.$http.patch("/standingbook/coop/reg/"+_self.newAddParams.id,_self.newAddParams)
                    .then(res=>{
                        if(res.success){
                            _self.$Message.info("编辑成功");
                            _self.initSearch();
                            _self.cancel();
                        }else{
                            _self.$Message.error("编辑失败");
                        }
                    });
                }
            },
        },
        mounted() {
        },
    };
    </script>      
    <style scoped>
    
    </style>
                    
        
        
        