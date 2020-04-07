<style scoped>

</style>

<template>
    <div>
        <data-table 
                ref="test" 
                :withTree="true" 
                :autoInitTable="false"
                :useZtree="false"
                :treeTitle="'部门'"
                :treeParams="treeParams"
                :treeUrl="'/$admin/depts/authtree'" 
                @on-select-change="selectTreeChange"
                :url="'/standingbook/labor/laborList'" 
                :params="query" 
                :columns="columns"
                >
                <div slot="search">
                    <Form :label-width="52" @submit.native.prevent>
                        <Row>
                            <Col span="4" style="margin-left: 10px;">
                                <Form-item label="渔船名:">
                                    <Input v-model="query.wheres.search"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="4" style="margin-left: 10px;">
                                <Form-item label="甲方:">
                                    <Input v-model="query.wheres.jiafang"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
                                </Form-item>
                            </Col>
                            <Col span="4" style="margin-left: 10px;">
                                <Form-item label="乙方:">
                                    <Input v-model="query.wheres.yifang"  @on-keydown.enter="initSearch" placeholder="请输入..."></Input>
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
            <Modal v-model="modalStatus.newAddModal" title="船员劳动合同书" width="1200px" :mask-closable="false">
                <Form :label-width="120" :model="newAddParams" :rules="rules" ref="newAddParams">
                    <Row>
                        <Col span="8">
                            <Form-item label="甲方:" prop="jiafang" >
                                <Input style="width:187px" v-model="newAddParams.jiafang" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="乙方:" prop="yifang" >
                                <Input style="width:187px" v-model="newAddParams.yifang" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="渔船名:" prop="shipName" >
                                <Input style="width:187px" v-model="newAddParams.shipName" placeholder="请输入..." :readonly="ifEdit">
                                    <Button @click="modalStatus.baseShipModal=true" slot="append" type="primary" style="width:40px;">
                                        <span style="position: relative;left:-9px;">选择</span>
                                    </Button> 
                                </Input>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="合同试用期:" prop="timeTrial" >
                                <DatePicker v-model="newAddParams.timeTrial" type="date" placeholder="请选择日期" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                            </Form-item>
                        </Col>                        
                        <Col span="8">
                            <Form-item label="合同到期时间:" prop="timeEnd" >
                                <DatePicker v-model="newAddParams.timeEnd" type="date" placeholder="请选择日期" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="合同生效时间:" prop="timeBegin" >
                                <DatePicker v-model="newAddParams.timeBegin" type="date" placeholder="请选择日期" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                            </Form-item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="试用期工资:" prop="inTrialSalary" >
                                <Input style="width:187px" v-model="newAddParams.inTrialSalary" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="试用期满后工资:" prop="salary" >
                                <Input style="width:187px" v-model="newAddParams.salary" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="发放工资日:" prop="payoffDay" >
                                <DatePicker v-model="newAddParams.payoffDay" type="date" placeholder="请选择日期" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                            </Form-item>
                        </Col>                      
                    </Row>
                    <Row>
                        <Col span="8">
                            <Form-item label="鉴定单位:" prop="appraiser" >
                                <Input style="width:187px" v-model="newAddParams.appraiser" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="职务:" prop="duty" >
                                <Input style="width:187px" v-model="newAddParams.duty" placeholder="请输入..." :readonly="ifEdit"></Input>
                            </Form-item>
                        </Col>
                        <Col span="8">
                            <Form-item label="签订日期:" prop="signingDate" >
                                <DatePicker v-model="newAddParams.signingDate" type="date" placeholder="请选择日期" format="yyyy-MM-dd" :disabled="ifEdit"></DatePicker>
                            </Form-item>
                        </Col>                        
                    </Row>
                </Form>
                <div slot="footer">
                <Button  type="info"  @click="modalStatus.newAddModal=false">取消</Button>
                <Button  type="primary"  v-show="btnShow" @click="submitData">保存</Button>
            </div> 
            </Modal>
            <MultiUpload :creatorName="name_Data" uploadUrl="/standingbook/attachs/upload" v-model="fileShow" :dataId="sID" moduleId="laborContract" :action="'true'"></MultiUpload>
            <selectShipModal v-model="modalStatus.baseShipModal"  @on-select-ship="onSelectShip"></selectShipModal>
    </div>
</template>

<script>
import MultiUpload from '@/views/components/Upload/MultiUpload.vue';
import selectShipModal from '@/views/components/selectModal/selectShipModal.vue';
export default {
    name: 'laborContract',
    components: {
        MultiUpload, selectShipModal
    },
    data () {
        return {
            name_Data: '',
            fileShow:false,
            sID:"",
            uploadList:[],
            rules:{
                shipName: [{required: true, type: 'string', message: '请填写渔船名', trigger: 'change',transform:value=>value?value.trim():'' }], 
                jiafang: [{required: true, type: 'string', message: '请填写甲方', trigger: 'change',transform:value=>value?value.trim():'' }],                              
                yifang: [{required: true, type: 'string', message: '请填写乙方', trigger: 'change',transform:value=>value?value.trim():'' }],
                signingDate:[{required: true, type: 'date', message: '请填写签订日期', trigger: 'change' }],
            },
            ifEdit: false,
            btnShow: false,
            laborId: '',
            modalStatus: {
                baseShipModal: false,
                newAddModal: false
            },
            newAddParams: {
                shipName:"",
                jiafang:"",
                yifang:"",
                signingDate:""
            },
            title: '',
            query: {
                deptId: '',
                page: 1,
                size: 10,
                wheres: {
                    search: '',
                    jiafang: '',
                    yifang: ''
                }
            },
            treeParams: {
                containOrgan: false,
                type: 'includes:5,20,30,35'
            },
            columns: [
                {
                    title:'序号',
                    type: 'index',
                    maxWidth:80,
                    align: 'center',
                },
                {
                    title:'渔船名',
                    align:'center',
                    key:'shipName'
                },
                {
                    title:'甲方',
                    align:'center',
                    key:'jiafang'
                },
                 {
                    title:'乙方',
                    align:'center',
                    key:'yifang'
                },
                 {
                    title:'职务',
                    align:'center',
                    key:'duty'
                },
                 {
                    title:'鉴定单位',
                    align:'center',
                    key:'appraiser'
                },
                {
                    title:'签订日期',
                    align:'center',
                    key:'signingDate'
                },
                 {
                    title:'操作',
                    align:'center',
                    width:255,
                    render: (h,params) => {
                        var _self = this;
                        return h('div', [
                            h('Button', 
                            {
                                props: {
                                    type: "info",
                                    size: "small"
                                },
                                style: {

                                },
                                on: {
                                    click:()=> {
                                        this.title="查看合同";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '查看'),
                            h('Button', 
                            {
                                props: {
                                    type: "primary",
                                    size: "small"
                                },
                                style: {
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.title="编辑合同";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button', 
                            {
                                props: {
                                    type: "warning",
                                    size: "small"
                                },
                                style: {
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.uploadFs(params.row);
                                    }
                                }
                            }, '附件'),
                            h('Button', 
                            {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginLeft:"10px"
                                },
                                on: {
                                    click:()=> {
                                        this.delete(params.row)
                                    }
                                }
                            }, '删除'),
                        ])
                    }
                }
            ],
        }
    },
    methods: {
        onSelectShip (row) {
            var _self = this;
            _self.$refs['newAddParams'].resetFields();
            _self.newAddParams.shipName = row.shipname;
        },
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
        delete (row) {
            var _self=this;
            _self.$Modal.confirm({
                title:"提示",
                content:"是否确认删除？",
                onOk:function(){
                    _self.$http.delete("/standingbook/labor/"+row.id)
                    .then(result =>{
                        if(result.success){
                            _self.initSearch();
                            _self.$Message.info('删除成功');
                        }else{
                            this.$Message.error(result.msg);
                        }
                    });
                }
            });
        },
        editWin (row) {
            if (this.title == '查看合同') {
                this.btnShow = false
                this.ifEdit = true
            } else if (this.title == '编辑合同') {
                this.btnShow = true
                this.ifEdit = false
            }
            this.laborId = row.id
            this.$http.get("/standingbook/labor/"+row.id)
            .then(res => {
                if (res.success) {
                    this.newAddParams = res.data
                    if (typeof(this.newAddParams.signingDate)=='string') {
                        this.newAddParams.signingDate = (this.newAddParams.signingDate).replace(/-/g,"/");
                        this.newAddParams.signingDate = new Date(this.newAddParams.signingDate);
                    }
                    this.modalStatus.newAddModal=true;
                } else {
                    this.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            })            
        },
        submitData () {
            this.$refs['newAddParams'].validate(valid => {
                if(valid) {
                    if (this.title == '新增合同') {
                        this.$http.post("/standingbook/labor/save",this.newAddParams)
                        .then(res => {
                            if (res.success) {
                                this.$Message.info("操作成功");
                                this.modalStatus.newAddModal=false;
                                this.initSearch()
                            } else {
                                this.$Message.info(res.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    } else if (this.title == '编辑合同') {
                        this.$http.patch("/standingbook/labor/"+this.laborId,this.newAddParams)
                        .then(res=>{
                            if(res.success){                   
                                this.$Message.info("操作成功");
                                this.modalStatus.newAddModal=false; 
                                this.initSearch()                  
                            } else {
                                this.$Message.info(res.msg)
                            }
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                }
            })
        },
        selectTreeChange (treeNode) {//树选择触发事件
            this.query.deptId=treeNode[0].id;
            // this.deptid=treeNode[0].id;
            // this.node=treeNode;
            this.initSearch();
        },
        newAdd () {
            this.modalStatus.newAddModal = true
            this.title = '新增合同'
            this.btnShow = true
            this.ifEdit = false
            this.$refs["newAddParams"].resetFields()
        },
        initSearch () {
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.initSearch();
        },
        isEmpty(s) {
            if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
        },
        initQuery(){
            var query = this.$route.query;
            console.log(query)
            if(!this.isEmpty(query.shipName)){
                this.query.wheres.search = query.shipName;
                this.query.wheres.jiafang = query.jiafang;
                this.query.wheres.yifang = query.yifang;
            }
            this.initSearch();
        },
    },
    mounted () {
        if (!this.isEmpty(this.$route.query)) {
            this.initQuery();
        } else {
            this.initSearch();
        }
    },
}
</script>
