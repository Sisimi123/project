<!-- 考试系统模块 -->
<style lang="less">
        @import "../../../styles/commonStyle.less";
    </style>
    <template>
        <div>
            <Row> 
                <Col span="4">
                    <Card style="width:95%;position: relative;right:-1%;">
                        <div class="leftTree" ref="leftTree" :style="'height:'+cliHeight+'px;overflow: auto;'">
                            <Button type="success" icon="ios-add" size="small" @click="addFontNodePre()"></Button>
                            <Button type="info" icon="ios-create" size="small" @click="editFontNodePre()"></Button>
                            <Button type="error" icon="ios-trash" size="small" @click="delFontNodePre()"></Button>
                            <Tree ref="tree" :data="areaTree" @on-select-change="selectChange" :loading="status.treeLoading" empty-text="区域加载中..."></Tree>
                        </div>
                    </Card>
                </Col>
                <Col span="20">
                    <Row> 
                        <data-table 
                            ref="test" 
                            :url="'/exam/exam/shiti'" 
                            :params="query" 
                            :columns="columns"    
                            @on-row-dblclick="handleEdit"                          
                            >
                            <div slot="search">
                                <Row>                           
                                    <Col span="3" style="margin:0px 0px 15px;">
                                        <Select style="width:100%" v-model="optionV">
                                            <Option value="0">单项选择题</Option>
                                            <Option value="1">多项选择题</Option>
                                            <Option value="2">判断题</Option>
                                        </Select>                    
                                    </Col>                           
                                    <div class="btn-wrap">
                                        <Button  type="info" @click="handleSDP()">添加题目</Button>
                                        <Button  type="info" @click="handleSJC()">试卷查看</Button>
                                        <Button  type="info" @click="handleFBG()">发布管理</Button>
                                    </div>
                                    <div class="func-wrap">
                                            <Button type="info" @click="gradeCK()">成绩查询</Button>
                                    </div>
                                </Row>
                            </div>
                        </data-table>  
                    </Row>                 
                </Col>         
            </Row>
            <!-- 新增/编辑试卷节点 -->
            <Modal v-model="status.addS" :styles="{top: '150px'}" :title="addN" :closable="closable"
            :maskClosable="maskClosable">
                <Form :label-width="40"  @submit.native.prevent>
                    <Row>
                        <Col span="20" offset="2">
                            <FormItem label="名称">
                                <Input placeholder="请输入名称"  @on-keydown.enter="saveChild()" v-model="shijN.title"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button @click="status.addS=false">取消</Button>
                    <Button type="info" @click="saveChild()">保存</Button>
                </div>
            </Modal>
            <!-- 删除节点 -->
            <Modal v-model="status.delS" title="删除节点">
                <Form :label-width="40">
                    <Row>
                        <Col span="20" offset="2">
                            是否要删除选中的节点?
                        </Col>
                    </Row>
                </Form>
                <div slot="footer">
                    <Button @click="status.delS=false">取消</Button>
                    <Button type="info" @click="deleteSJ">保存</Button>
                </div>
            </Modal>
            <!-- 新增试题 -->
                <!-- 单选 -->
            <Modal :styles="{top: '220px'}" v-model="status.tmS" title="新增试题" width="40%" :closable="closable"
            :maskClosable="maskClosable">
                <Form :label-width="80">
                    <Row>               
                        <Col span="3">
                            <FormItem label="单项选择题"></FormItem>
                        </Col>
                        <Col span="18">
                            <Input type="textarea" v-model="pitem.subject" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入内容"/>
                        </Col>           
                    </Row>              
                    <Row v-for="(v,i) in pitem.options" :key="i">
                        <Col span="18" offset="3">
                            <div style="margin:5px 0;">
                                <Input v-model="v.content">
                                    <span slot="prepend">{{index2label(v,pitem.options)}}</span>
                                    <span slot="append" @click="delOption(v,pitem.options)">删除</span>
                                </Input>
                            </div>
                        </Col>                
                    </Row>                   
                    <Row>    
                        <div style="margin:3px 0;">
                            <Col span="3">
                                <FormItem label="正确答案"></FormItem>
                            </Col>
                            <Col span="18">
                                <div style="position:relative;">
                                    <Select style="width:100%" v-model="pitem.answer">
                                        <Option v-for="(answer,i) in dans" :value="answer.value" :key="i">{{answer.label}}</Option>
                                    </Select>
                                </div>
                            </Col>
                        </div>          
                    </Row>
                </Form>	 
                <div slot="footer">
                    <Button @click="handleM()">取消</Button>
                    <Button type="info" @click="addOption(pitem)">添加</Button>
                    <Button type="info" @click="updateData()" v-show="newUpdateShiti=='编辑试题'">保存</Button>
                    <Button type="info" @click="saveData()" v-show="newUpdateShiti=='新增试题'">保存</Button>
                </div>              
            </Modal>
                <!-- 多选 -->
            <Modal :styles="{top: '220px'}" v-model="status.tmD" title="新增试题" width="40%" :closable="closable"
            :maskClosable="maskClosable">
                <Form :label-width="80">
                    <Row>               
                        <Col span="3">
                            <FormItem label="多项选择题"></FormItem>
                        </Col>
                        <Col span="18">
                            <Input type="textarea" v-model="pitem.subject" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入内容"/>
                        </Col>          
                    </Row>              
                    <Row v-for="(v,i) in pitem.options" :key="i">
                        <Col span="18" offset="3">
                            <div style="margin:5px 0;">
                                <Input v-model="v.content">
                                    <span slot="prepend">{{index2label(v,pitem.options)}}</span>
                                    <span slot="append" @click="delOption(v,pitem.options)">删除</span>
                                </Input>
                            </div>
                        </Col>                
                    </Row>                   
                    <Row>    
                        <div style="margin:3px 0;">
                            <Col span="3">
                                <FormItem label="正确答案"></FormItem>
                            </Col>
                            <Col span="18">
                                <div style="position:relative;">
                                    <Select style="width:100%" v-model="answerp" multiple>
                                        <Option v-for="answer in mans" :value="answer.value" :key="answer.value">{{answer.label}}</Option>
                                    </Select>
                                </div>
                            </Col>
                        </div>          
                    </Row>
                </Form>	 
                <div slot="footer">
                    <Button @click="handleM()">取消</Button>
                    <Button type="info" @click="addOption(pitem)">添加</Button>
                    <Button type="info" @click="updateData()" v-show="newUpdateShiti=='编辑试题'">保存</Button>
                    <Button type="info" @click="saveData()" v-show="newUpdateShiti=='新增试题'">保存</Button>
                </div>              
            </Modal>
                <!-- 判断 -->
            <Modal :styles="{top: '220px'}" v-model="status.tmP" title="新增试题" width="40%" :closable="closable"
            :maskClosable="maskClosable">
                <Form :label-width="80">
                    <Row>               
                        <Col span="3">
                            <FormItem label="判断题"></FormItem>
                        </Col>
                        <Col span="21">
                            <Input type="textarea" v-model="pitem.subject" :autosize="{minRows: 2,maxRows: 5}"  placeholder="输入内容"/>
                        </Col>             
                    </Row>
                    <Row v-for="(option,i) in options" :key="i">
                        <Col span="21" offset="3">
                            <div style="margin:3px 0;">
                                <Input v-model="option.content">
                                    <span slot="prepend">{{index2label(option,pitem.options)}}</span>
                                </Input>
                            </div>
                        </Col>                 
                    </Row>
                    <Row>    
                        <div style="margin:3px 0;">
                            <Col span="3">
                                <FormItem label="正确答案"></FormItem>
                            </Col>
                            <Col span="18">
                                <Select style="width:100%" v-model="pitem.answer" >
                                    <Option v-for="answer in pans" :value="answer.value" :key="answer.value">{{answer.label}}</Option>
                                </Select>
                            </Col>
                        </div>          
                    </Row>
                </Form>	 
                <div slot="footer">
                    <Button @click="handleM()">取消</Button>
                    <Button type="info" @click="updateData()" v-show="newUpdateShiti=='编辑试题'">保存</Button>
                    <Button type="info" @click="saveData()" v-show="newUpdateShiti=='新增试题'">保存</Button>
                </div>              
            </Modal>
            <!-- 试卷查看 -->
            <Modal :styles="{top: '120px'}" v-model="status.sjC" title="试卷查看" width="50%">
                <Row>
                    <Form :label-width="60">
                        <Col span="7">
                            <div style="margin-bottom:-15px;">
                                <FormItem label="选择分类">
                                    <Select  style="width:100%" placeholder="选择分类" @on-change="handleSE">
                                        <Option v-for="(v,i) in checkSJ" :key="i" :value="i+'_'+v.value">{{v.label}}</Option>                              
                                    </Select>
                                </FormItem>
                            </div>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Col span="24">
                        <Table   
                            height="450" 
                            border 
                            :columns="columns2"  
                            :data="dataList2" 
                            :loading="false"
                        ></Table>
                    </Col>
                </Row>
                <Row>
                    <Col span="24" style="margin-top:13px;">
                        <Page 
                            show-sizer
                            show-elevator
                            show-total
                            :current="queryShijuan.curPage" 
                            :page-size="queryShijuan.pageSize"
                            :total="totalNum2"
                            @on-page-size-change="pageSizeChange2"
                            @on-change="changePage2"
                        ></Page>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="status.sjC=false" type="info">关闭</Button>
                </div>
            </Modal>
            <!-- 发布管理 -->
            <Modal :styles="{top: '120px'}" v-model="status.fbG" title="发布管理" width="35%">
                <Row>
                    <Col span="24">
                        <Table   
                            height="450" 
                            border 
                            :columns="columns3"  
                            :data="dataList3" 
                            :loading="false"
                        ></Table>
                    </Col>
                </Row>
                <div slot="footer">
                    <Button @click="status.fbG=false" type="info">关闭</Button>
                </div>
            </Modal>
            <!-- 成绩查询 -->
            <Modal v-model="status.tjModal" title="成绩查询" width="1000">
                <Row style="width:99%;">
                 <Form :label-width="80">
                      <Col span="5">
                          <FormItem label="开始日期" >    
                                    <DatePicker v-model="tj.search.beginDate" placeholder="选择日期"  type="date"  format="yyyy-MM-dd"   ></DatePicker>
                          </FormItem>
                     </Col>
                     <Col span="5">
                        <FormItem label="最高成绩">
                            <Select placeholder="否" v-model="tj.search.max">
                                <Option value="">否</Option>
                                <Option value="是">是</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem label="考试名称">
                            <Select placeholder="请选择"id="selects" v-model="selects" @on-change="transexamId">
                                    <Option v-for="(v,i) in tj.tjList" :key="i" :value="i+'_'+v.value">{{v.label}}</Option>
                            </Select>
                        </FormItem>
                   </Col>
                 </Form>
             </Row> 
                <Row style="width:99%;">
                   <Form  :label-width="80">
                    <Col span="5">
                        <FormItem label="结束日期">    
                                    <DatePicker   v-model="tj.search.endDate" placeholder="选择日期"  type="date"  format="yyyy-MM-dd" ></DatePicker>
                        </FormItem>
                    </Col>
                    <!-- <Col span="5">
                        <FormItem label="部门">
                            <Select placeholder="否" v-model="tj.search.deptId" >
                                <Option value=""></Option>
                            </Select>
                        </FormItem>
                    </Col> -->
                    <Col span="5">
                        <FormItem label="姓名">    
                                  <Input type="text" placeholder="请输入"  v-model="tj.search.name"></Input> 
                        </FormItem>
                   </Col>
                    <Col span="8">
                        <span style="margin-left:13px;">
                            <Button @click="gradeSearch()" type="info">查询</Button>
                        </span>      
                        <span style="margin-left:10px;">
                            <Button @click="gradeReset()" >重置</Button>
                        </span>
                        <span style="margin-left:10px;">
                            <Button @click="Checkout()" type="info" icon="ios-cloud-upload-outline">导出</Button>
                        </span>                      
                    </Col>
                 </Form>
             </Row>
                <Row style="width:99%;">
               <Col span="24">
                 <Table highlight-row border :columns="tj.columns" :data="tj.tjLists" height="300"></Table>
               </Col>
             </Row>
             <Row style="width:99%;">
                <Col span="24" class-name="fenge-top">
                     <Page 
                        :current="tj.search.current"
                        :total="tj.search.totalNum" 
                        :page-size="tj.search.pageSize"
                        show-elevator
                        show-sizer
                        show-total
                        @on-page-size-change="pageSizeChangeG"
                        @on-change="changePageG"
                    ></Page>
                </Col>
             </Row>
             <div slot="footer">
                <Button @click="status.tjModal=false" type="info">关闭</Button>
            </div>
            </Modal>
        </div>
    </template>       
<script>
    import {isNull } from '@/libs/common.js'
    var pitem2={
            examId:"",
            subject:"",
            answer:"",
            type:"",
            options:[
                {
                    point:"0",
                    content:""
                },
                {
                    point:"1",
                    content:""
                },
                {
                    point:"2",
                    content:""
                },
                {
                    point:"3",
                    content:""
                },
            ]
        };
    var opitons2=[
        {
            point:"0",
            content:"正确"
        },
        {
            point:"1",
            content:"错误"
        },
    ];
    export default {
        name: "exam",
        components:{
        },
        data() {
            return { 
                newUpdateShiti:"",
                updateOptions:"",
                jiekou:"/exam/exam/searchTable",
                fuziPanduan:false,
                selects:"",
                closable:false,
                maskClosable:false,
                //成绩查询
                tj : {
                    tjList:[],
                    tjLists:[],
                    search:{
                        ksId:"",
                        // fpoint:"",//最大成绩
                        endDate:"",//结束时间
                        beginDate:"",//开始时间
                        // deptId:"",//部门编号
                        max:"",//（是否是最高成绩，有参数查询的就是最高成绩
                        name:"",//姓名
                        current:1,
                        pageSize:10,
                        totalNum:0,
                    },
                    columns: [
						    {
						        title: "序号",
						        type: "index",
						        align: "center",
						        maxWidth:80,
						    }, {
						    	title:"姓名",
						    	key:"name",
						    	align:"center",
						    },
                            {
						    	title:"考试名称",
						    	key:"subtitle",
						    	align:"center",
						    },
                            {
						    	title:"分数",
						    	key:"grade",
						    	align:"center",
						    },
                            {
						    	title:"考试时间",
						    	key:"examDate",
						    	align:"center",
						    },
                        ],
			},


                label: "ABCDEF".split(""),
                pans:[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},       
                ],
                dans:[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},    
                    {label:"C",value:"2"},    
                    {label:"D",value:"3"},         
                ],
                mans:[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},    
                    {label:"C",value:"2"},    
                    {label:"D",value:"3"},    
                ],
                answers:[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},    
                    {label:"C",value:"2"},    
                    {label:"D",value:"3"},    
                    {label:"E",value:"4"},    
                    {label:"F",value:"5"},    
                ],
                //试卷查看部分
                checkSJ:[],//所有目录
                dataList2:[],//试卷列表内容
                columns2:[//试卷列表表头
                    {
                        title: "序号",
                        type: "index",
                        maxWidth:80
                    },
                    {
                        title: "试卷名称",
                        key: "title",
                    },
                    {
                        title: "所属分类",
                        key: "catlog",
                    },
                    {
                        title: "创建时间",
                        maxWidth:160,
                        key: "createTime",
                    }
                ],
                totalNum2:0,          
                //发布管理
                dataList3:[],
                columns3:[
                    {
                        title: "序号",
                        type: "index",
                        maxWidth:80
                    },
                    {
                        title: "考试名称",
                        key: "title",
                        width:130,
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        width:130,
                    },
                    {
                        title: "是否发布",
                        key: "published",
                        width:130,
                        render:(h, params) =>{
                            var type = params.row.published;
                            var xuanze="";
                            if(type=='0'){
                                xuanze="未发布";
                            }else if(type=='1'){
                                xuanze="发布";
                            }
                            return h('div',xuanze)
                        }
                    },
                    {
                        title: "操作",
                        key: "id",
                        width:150,
                        render: (h, params) => {  
                        var _self=this;                            
                        var temp = [];
                        var id=params.row.id;
                        temp.push(
                            h("Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },                               
                                    on: { 
                                        click: () => {    
                                            _self.$http.post("/exam/examm/publicAct?id="+id+"&operation="+"1")
                                            .then(res=>{
                                                if(res.success){
                                                    _self.handleFBG();
                                                    _self.parentId=="";
                                                    _self.query.examId="";
                                                    _self.showexams();
                                                    _self.initSearch();
                                                }
                                            })
                                        }
                                    }
                                },"发布"), 
                            h("Button",
                                {
                                    props: {
                                        type:"info",
                                        size: "small"
                                    },
                                    style:{
                                        marginLeft:"10px"
                                    },                               
                                    on: { 
                                        click: () => {    
                                            _self.$http.post("/exam/examm/publicAct?id="+id+"&operation="+"0")
                                            .then(res=>{
                                                if(res.success){
                                                    _self.handleFBG();
                                                    _self.parentId=="";
                                                    _self.query.examId="";
                                                    _self.showexams();
                                                    _self.initSearch();
                                                }
                                            })
                                        }
                                    }
                                },"取消"),                      
                        );
                        return h("div", temp);
                    }
                    }
                ],
                //添加试题
                    //单选/多选
                pitem:{
                    examId:"",
                    subject:"",
                    answer:"",
                    type:"",
                    options:[
                        {
                            point:"0",
                            content:""
                        },
                        {
                            point:"1",
                            content:""
                        },
                        {
                            point:"2",
                            content:""
                        },
                        {
                            point:"3",
                            content:""
                        },
                    ]
                },
                answerp:[],
                    //判断
                opitons2:[
                    {
                        point:"0",
                        content:"正确"
                    },
                    {
                        point:"1",
                        content:"错误"
                    },
                ],
                options:[
                    {
                        point:"0",
                        content:"正确"
                    },
                    {
                        point:"1",
                        content:"错误"
                    },
                ],
        

                optionV:"",
                addN:"添加节点",
                columns:[
                    {
                        title: "序号",
                        type: "index",
                        maxWidth:80
                    },
                    {
                        title: "类型",
                        key: "type",
                        render:(h, params) =>{
                            var type = params.row.type;
                            var xuanze="";
                            if(type=='0'){
                                xuanze="单项选择题";
                            }else if(type=='1'){
                                xuanze="多项选择题";
                            }else if(type=='2'){
                                xuanze= "判断题";
                            }
                            return h('div',xuanze)
                        }
                    },
                    {
                        title: "题目",
                        key: "subject",
                        ellipsis:true,
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                    },
                    {
                        title: "最后修改时间",
                        key: "updateTime",
                    },
                    {
                        title: "操作",
                        key:"id",
                        width:160,
                        render:(h, params) => {
                            var _self=this;
                            var id = params.row.id;
                            var buttons = [];
                            buttons.push(h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                "margin-right": '15px'
                            },
                            on: {
                                click: ()=>{
                                    _self.loadPItem(id);
                                }
                            }
                            }, '编辑'));                      
                            if(params.row.published == "0"){//如果考试是否发布 是否可以删除
                                buttons.push(h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: () =>{
                                        _self.$Modal.confirm({
                                            title:"提示",
                                            content:"确定要删除此试题吗？",
                                            onOk:function(){
                                                this.$http.delete("/pitem/"+id).then(result =>{
                                                    if(result.success){
                                                        _self.initSearch();
                                                        _self.$Message.info("删除成功");
                                                        // _self.getPageList();
                                                    }else{
                                                        this.$Message.info(result.msg);
                                                    }
                                                });
                                            }
                                        });                         
                                    }
                                }
                                }, '删除'));
                            }else{
                                buttons.push(h('Button', {
                                props: {
                                    type: 'dashed',
                                    size: 'small',
                                    disabled:true
                                },
                                style: {
                                    "margin-right": '15px'
                                },
                                on: {
                                    click: () =>{
                                        
                                    }
                                }
                                }, '删除'));
                                
                            }
                            return h('div', buttons);
                        }
                    },
                ],
                dataList:[],                
                areaTree:[],
                status:{
                    treeLoading:true,
                    addS:false,
                    tmS:false,
                    tmD:false,
                    tmP:false,
                    sjC:false,
                    fbG:false,
                    delS:false,
                    tjModal:false,
                },
                treeC:{"startIds":["0"]},
                shijN:{
                    parentId:"",
                    title:"",
                    published:"0"
                },//新增试卷
                parentId:"",
                id:"",
                totalNum:0,
                queryShijuan:{
                    curPage:1,
                    pageSize:10,
                },
                query:{
                    examId:"0",
                    page:1,
                    size:10,
                },
                type:"",
                
            }
        },     
        mounted() {
            // this.getPageList();
            this.showexams();
            this.initSearch();
        },
        computed:{
            cliHeight(){
                return this.$store.state.app.treeHeight +40;
            }
        },
        methods: { 
            initSearch() {
                var _self=this;
                _self.query.examId=_self.id;
                this.$refs.test.initSearch();
            },
            selectChange(nodes){
                if(nodes.length==0){
                    this.$Message.error("请选择节点");
                }else{
                    this.parentId=nodes[0].parentId;
                    this.id=nodes[0].id;
                    // this.handleSearch();   
                    this.initSearch();
                }
            },
            gradeReset(){
                var _self=this;
                _self.tj.search.max="";
                _self.tj.search.name="";
                _self.tj.search.ksId="";
                _self.tj.search.beginDate="";
                _self.tj.search.endDate="";
                _self.selects="";
                _self.tj.search.current=1;
                _self.tj.search.pageSize=10;
                _self.gradeCheck();
            },
            Checkout(){
                var _self=this;
                _self.transDate();
                if(_self.tj.search.max==undefined){
                    _self.tj.search.max="";
                }
                window.open(this.$basePath+"/exam/exam/exportExcel?max="+_self.tj.search.max+"&ksId="+_self.tj.search.ksId+"&beginDate="+_self.tj.search.beginDate+"&endDate="+_self.tj.search.endDate+"&name="+_self.tj.search.name);
            },
            changePageG(page){
                this.tj.search.current=page;
                this.gradeCheck();
            },
            pageSizeChangeG(size){
                this.tj.search.pageSize=size;
                this.gradeCheck();
            },
            transexamId(id){
                if(id==""||id==undefined){
                    this.tj.search.ksId="";
                }else{
                    id=id.split("_")[1];
                    this.tj.search.ksId=id;
                }
                
            },
             //成绩查询
             gradeCK(){
                this.status.tjModal=true;
                var _self=this;
                _self.$http.get("/exam/examm/catlog")
                .then(res=>{
                    if(res.success){
                        _self.tj.tjList=res.data;
                    }
                })
                _self.gradeCheck();
            },
            transDate(){
                var _self=this;
                var begin=_self.tj.search.beginDate;
                var end=_self.tj.search.endDate;
                if(begin!=""){
                    var beginYear=new Date(begin).getFullYear();
                    var beginMonth=new Date(begin).getMonth()+1;
                    var beginDay=new Date(begin).getDate();
                    _self.tj.search.beginDate=beginYear+"-"+beginMonth+"-"+beginDay;
                }else{
                    _self.tj.search.beginDate="";
                }
                if(end!=""){
                    var endYear=new Date(end).getFullYear();
                    var endMonth=new Date(end).getMonth()+1;
                    var endDay=new Date(end).getDate();
                    _self.tj.search.endDate=endYear+"-"+endMonth+"-"+endDay;
                }else{
                    _self.tj.search.endDate="";
                }
            },
            gradeSearch(){
                this.tj.search.current=1;
                this.tj.search.pageSize=10;
                this.gradeCheck();
            },
            gradeCheck(){                
                var _self=this;
                _self.transDate();
                if(_self.tj.search.max==undefined){
                    _self.tj.search.max="";
                }
                _self.$http.get("/exam/exam/statisGrade?max="+_self.tj.search.max+"&name="+_self.tj.search.name+"&ksId="+_self.tj.search.ksId+"&beginDate="+_self.tj.search.beginDate+"&endDate="+_self.tj.search.endDate+"&current="+_self.tj.search.current+"&pageSize="+_self.tj.search.pageSize)
                .then(res=>{
                    if(res.success){
                       _self.tj.tjLists=res.data.data;
                       _self.tj.search.totalNum=res.data.total;
                    }
                })
            },
            handleM(){
                this.status.tmD=false;
                this.status.tmS=false;
                this.status.tmP=false;
                this.pitem=JSON.parse(JSON.stringify(pitem2));
                this.options=JSON.parse(JSON.stringify(opitons2));
            },
            //试卷查看部分
            handleSJC(){//试卷查看和试卷列表
                var _self=this;
                _self.status.sjC=true;
                _self.$http.get("/exam/examm/catlog")
                .then(res=>{
                    if(res.success){
                        _self.checkSJ=res.data;
                    }
                })
                _self.showSJS();
            },
            showSJS(){
                var _self=this;
                _self.$http.get("/exam/examm/paperList?parentId="+''+"&pageSize="+_self.queryShijuan.pageSize+"&curPage="+_self.queryShijuan.curPage)
                .then(res=>{
                    if(res.success){
                        _self.dataList2=res.data.data;
                        _self.totalNum2=res.data.total;
                    }
                });
            },
            pageSizeChange2(size) {
                this.queryShijuan.pageSize = size;
                this.showSJS();
            },
            changePage2(page) {
                this.queryShijuan.curPage = page;
                this.showSJS();
            },
            handleSE(parentId){
                parentId=parentId.split("_")[1];
                var _self=this;
                if(parentId!==""){
                    _self.$http.get("/exam/examm/paperList?parentId="+parentId+"&size="+_self.query.size+"&page="+_self.query.page)
                    .then(res=>{
                        if(res.success){
                            _self.dataList2=res.data.data;
                            _self.totalNum2=res.data.total;
                        }
                    });
                }else{
                   _self.showSJS();
                }             
            },
            //发布管理
            handleFBG(){
                var _self=this;
                this.status.fbG=true;
                _self.$http.get("/exam/examm/pulishable")
                .then(res=>{
                    if(res.success){
                        _self.dataList3=res.data.data;
                        _self.totalNum3=res.data.total;
                    }
                });
            },
            //添加试题
            handleSDP(){//添加试题 弹窗判断
                var node = this.currentNode();
                this.dans=[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},    
                    {label:"C",value:"2"},    
                    {label:"D",value:"3"},         
                ];
                this.mans=[
                    {label:"A",value:"0"},    
                    {label:"B",value:"1"},    
                    {label:"C",value:"2"},    
                    {label:"D",value:"3"},         
                ];
                this.newUpdateShiti="新增试题";
                this.answerp=[];
                if(node == null || node.parentId=="0"){
                    this.$Message.error("请先选择试卷");
                    return;
                }
                if(this.optionV==""){
                    this.$Message.error("请选择题目类型");
                }else if(this.optionV==0){
                    this.updateOptions="单选";
                    this.status.tmS=true;
                }else if(this.optionV==1){
                    this.updateOptions="多选";
                    this.status.tmD=true;
                }else if(this.optionV==2){
                    this.status.tmP=true;
                }
            },
            currentNode: function () {// 返回当前选中的节点
                var node = this.$refs.tree.getSelectedNodes()[0];
                return node;
            },
            addOption:function(pitem){//针对选择题添加一个选项:比如已有A B C D选项,添加一个多了一E
                var options = pitem.options;
                var length = options.length;//当前长度
                var index = undefined;
                if(length == 0){
                    index = 0;//删除完毕后 再添加的第一个元素
                }else{
                    index = options[length-1].point+1;//下一个要添加的index
                }
                if(length >= 6){
                    this.$Message.error("添加超出限制");
                    return;
                }
                pitem.options.push({
                    point:index,
                    content:"",
                })
                this.updateOption();
            },
            delOption:function(op,options){//选择题删除一个答案选项
                if(options.length==0){
                    this.$Message.error("没有可删除项")
                    return;
                }
                var find =null;
                options.find((option,index)=>{
                    if(op.point === option.point){
                        find = index;
                        return option;
                    }
                })
                options.splice(find,1);
                this.updateOption();
            },
            updateOption:function(){//选择题添加删除答案时更新答案选择列表
                var length = this.pitem.options.length;
                if(this.updateOptions=="单选"){
                    this.dans =[];
                    for(var i=0;i<length;i++){
                        this.dans.push(this.answers[i]);
                    }
                }else if(this.updateOptions=="多选"){
                    this.mans =[];
                    for(var i=0;i<length;i++){
                        this.mans.push(this.answers[i]);
                    }
                }
            },
            index2label:function(op,options){//数字转字母显示
                var find =null;
                options.find((option,index)=>{
                    if(op.point === option.point){
                        find = index;
                        return option;
                    }
                })
                return this.label[find];
            },
            transStoA(ops){
                var arr=[],a="",b={};
                for(var i=0;i<ops.length;i++){
                    if(i==0){
                        a="A";
                    }else if(i==1){
                        a="B";
                    }
                    else if(i==2){
                        a="C";
                    }
                    else if(i==3){
                        a="D";
                    }
                    else if(i==4){
                        a="E";
                    }
                    else if(i==5){
                        a="F";
                    }
                    b.label=a;
                    b.value=i+"";
                    arr[i]=b;
                    b={};
                }
                return arr;
            },
            loadPItem(id){//载入题目信息
                var _self=this;
                _self.newUpdateShiti="编辑试题";
                _self.$http.get("/exam/exam/loadPItem?id="+id)
                .then(res=>{
                    if(res.success){
                        var type=res.data.type;
                        _self.type=type;
                        var ops=res.data.options;
                        if(type=="0"){
                            _self.status.tmS=true;
                            _self.pitem=res.data;
                            _self.dans=_self.transStoA(ops);
                        }else if(type=="1"){
                            _self.status.tmD=true;
                            _self.pitem=res.data;
                            _self.pitem.answer=res.data.answer.split(',');
                            _self.answerp=_self.pitem.answer;
                            _self.mans=_self.transStoA(ops);
                        }else if(type=="2"){
                            _self.status.tmP=true;
                            _self.options=res.data.options;
                            _self.pitem=res.data;
                        }                                    
                    }
                })
            },
            handleEdit(msg){
                this.loadPItem(msg.id);
            },
            saveData(){//保存发送单选信息
                var _self=this;
                if(_self.optionV=="0"){
                    _self.pitem.type="0"; 
                }else if(_self.optionV=="1"){
                    _self.pitem.type="1";   
                    _self.pitem.answer=[];
                    _self.pitem.answer=_self.answerp;
                    _self.pitem.answer=_self.pitem.answer.join(",");
                }else if(_self.optionV=="2"){
                    _self.pitem.type="2";                     
                    _self.pitem.options=_self.options;
                    _self.pitem.answer=_self.pitem.answer[0];
                }
                _self.pitem.examId=_self.id;       
                _self.$http.post("/exam/exam/saveItem",_self.pitem)
                .then(res=>{
                    if(res.success){
                        // _self.getPageList();
                        _self.initSearch();
                        _self.handleM();
                        _self.$Message.info("success");
                    }
                });
            },
            updateData(){//保存发送单选信息
                var _self=this;
                if(_self.type=="0"){
                    if(typeof(_self.pitem.answer)=='string'|| typeof(_self.pitem.answer)=='number'){
                        _self.pitem.answer=_self.pitem.answer; 
                    }else if(typeof(_self.pitem.answer)=='object'){
                        _self.pitem.answer=_self.pitem.answer[0];
                    }
                }else if(_self.type=="1"){
                    _self.pitem.answer=_self.answerp.join(",");
                }else if(_self.type=="2"){
                    _self.pitem.answer=_self.pitem.answer[0];
                }      
                _self.$http.post("/exam/exam/saveItem",_self.pitem)
                .then(res=>{
                    if(res.success){
                        // _self.getPageList();
                        _self.initSearch();
                        _self.handleM();
                        _self.$Message.info("success");
                    }
                });
            },

            delFontNodePre:function(){//删除节点--->界面层弹窗
                var node = this.selectCurrentNode();
                if(node == null){
                    return;
                }
                this.status.delS = true;	
            },
            selectCurrentNode(){//当前选中的节点
              var node = this.$refs.tree.getSelectedNodes()[0];
              var check = (node == null ? false : true);
              if (!check) {
                this.$Message.error("请先选中节点!");
                return null;
              }
              return node;
            },
            addFontNodePre(){//新增弹窗按钮
                var node = this.selectCurrentNode();
                this.shijN.title="";
                if (!node) {
                    return;
                }
                if(!this.addable()){
                    this.$Message.error("不可再试卷上再添加");
                    return;
                }  
                this.status.addS=true;
                this.addN="添加节点";  
            },
            addable:function(){//树节点是否可以添加
               var flag = false;
               var root = this.$refs.tree.data[0];//root节点(试题库)	
               var node = this.$refs.tree.getSelectedNodes()[0];//root的子节点
               if(root.id == node.id){
                      flag = true;
               }else{
                     var children = root.children;
                     for(var i=0;i<children.length;i++){
                      if(children[i].id == node.id){
                          flag = true;
                      }         		  
                     }
                }
                return flag;
            },
            editFontNodePre: function () {//编辑弹窗按钮
                var node = this.selectCurrentNode();
                this.shijN.title=node.title;
                    if (!node) {
                        return;
                    }
                this.status.addS=true;
                this.addN="编辑节点";
            },
            deleteSJ(){//删除 确定按钮
                var _self=this;              
                _self.$http.delete("/exam/examm/delItem?id="+_self.id)
                .then(res=>{
                    if(res.success){
                        _self.showexams();
                        _self.status.delS=false;
                        _self.$Message.info("success");
                    }
                });
            },
            saveChild(){//新增/编辑 确定按钮
                var _self=this;
                _self.shijN.parentId=_self.id;
                if(_self.addN=="添加节点"){
                    _self.$http.post("/exam/examm/addItem",_self.shijN)
                    .then(res=>{
                        if(res.success){
                            //_self.addChild2Tree(_self.currentNode(), res.data);
                            _self.showexams();
                            _self.status.addS=false;
                            _self.$Message.info("success");
                        }
                    });
                }else if(_self.addN=="编辑节点"){
                    _self.$http.post("/exam/examm/editItem?id="+_self.id+"&title="+_self.shijN.title)
                    .then(res=>{
                        if(res.success){
                            _self.showexams();
                            _self.status.addS=false;
                            _self.$Message.info("success");
                        }
                    });
                }
            },
            showexams(){
                var _self=this;
                _self.$http.get("/exam/exam/getPortArea",{
                    params:{
                        _model:JSON.stringify(_self.treeC)
                    }
                })
                .then(res=>{
                    if(res.success){
                        _self.areaTree=res.data;
                        _self.status.treeLoading = false;
                    }
                })
            }, 
        }
    };
</script>
<style scoped>

</style> 
        