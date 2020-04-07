<template>
    <div >
        <Modal ref="wsList" v-model="wsList.show" title="请选择打开的文书" :width="900">
            <Input v-model="wsList.search" icon="ios-search" placeholder="请输入搜索条件" style="width: 200px"/>
            <Button type="info" @click="loadWsTemplateList">新建文书</Button>
            <div style="margin-top:8px">
            <Table size="small" border :height="320" :columns="wsList.columns" :data="wsList.data" > </Table>
            </div>
            <div slot="footer" style="display:none"></div>
        </Modal>
        <Modal ref="wsTemplateList" v-model="templateList.show" title="请选择使用文书模板" :width="900" @on-cancel="loadWsList" >
            <Input v-model="templateList.search" icon="ios-search" placeholder="请输入搜索条件" style="width: 200px"/>
            <Button type="info" @click="newWsTemplate">新建文书模板</Button>
            <div style="margin-top:8px">
                <Table size="small" border :height="320" :columns="templateList.columns" :data="templateList.data"> </Table>
            </div>
            <div slot="footer" style="display:none"></div>
        </Modal>
    </div>
</template>
<script>
export default {
    name: "wenshouModal",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        caseId: {
            type: String
        },
        docType: {
            type: String
        },
        wsId: {
            type: String
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data(){
        var _self=this;
        return {
            wsList:{
                show:false,
                search:"",
                columns:[
                    {
                        title: '文书名称',
                        key: 'dname'
                    },
                    {
                        title: '创建人',
                        key: 'creator'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        render: (h, params) => {
                            var buttons=[];

                            buttons.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.openWs(params,"view")
                                        }
                                    }
                                }, '查看'));

                            if(_self.edit){
                                buttons.push(h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.openWs(params,"edit")
                                        }
                                    }
                                }, '编辑'));

                                buttons.push(h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            _self.removeWs(params)
                                        }
                                    }
                                }, '删除'));
                            }
                            return h('div', buttons);
                        }
                    }
                ],
                data:[]
            },

            templateList:{
                show:false,
                search:"",
                columns:[
                    {
                        title: '模板名称',
                        key: 'name'
                    },
                    // {
                    //     title: '创建人',
                    //     key: 'creator'
                    // },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        render: (h, params) => {
                            var buttons=[];
                            buttons.push(h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            _self.generateWs(params)
                                        }
                                    }
                                }, '生成文书'));

                            // buttons.push(h('Button', {
                            //         props: {
                            //             type: 'info',
                            //             size: 'small'
                            //         },
                            //         style: {
                            //             marginRight: '5px'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 _self.editWsTemplate(params)
                            //             }
                            //         }
                            //     }, '编辑'));

                            // buttons.push(h('Button', {
                            //         props: {
                            //             type: 'error',
                            //             size: 'small'
                            //         },
                            //         on: {
                            //             click: () => {
                            //                 _self.removeWsTemplate(params)
                            //             }
                            //         }
                            //     }, '删除'))

                            return h('div', buttons);
                        }
                    }
                ],
                data:[]
            }
        }
    },
    computed:{
        wsListShow(){
            return this.wsList.show;
        },
        wsTemplateListShow(){
            return this.templateList.show;
        },
        _token(){
            return this.$store.state.user.userInfo.refreshToken;
        }
    },
    methods:{
        openWs(params,action){
            console.log(params.row);
            this.openPageOffice({
                type:"wenshou",
                action:action,
                docType:params.row.dtype,
                wsId:params.row.id
            });
        },
        removeWs(params){
            var _self=this;
            this.$http.delete("/enforces/wenshou/"+params.row.id)
            .then(function(result){
                if(result.success){
                   _self.loadWsList();
                   
                }
            });
        },
        loadWsList(){
            var _self=this;
            this.$http.get("/enforces/wenshou/getWsList",{
                params:{
                    caseId:_self.caseId,
                    docType:_self.docType,
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    _self.wsList.data=data;
                    _self.wsList.show=true;
                    _self.templateList.show=false
                }
            });
        },
        loadWsTemplateList(){
            var _self=this;
            this.$http.get("/enforces/wenshou/loadWsTemplateList",{
                params:{
                    docType:_self.docType,
                }
            }).then(function(result){
                if(result.success){
                    var data=result.data;
                    _self.templateList.data=data;
                    _self.templateList.show=true;
                    _self.wsList.show=false;
                }
            });
        },
        newWsTemplate(){
            this.openPageOffice({
                type:"template",
                action:"edit"
            });
        },
        generateWs(params){
            // var _self=this;
            // this.$http.get("/enforces/wenshou/loadWsByTemplate",{
            //     params:{
            //         caseId:_self.caseId,
            //         docType:_self.docType,
            //         templateId:params.row.id
            //     }
            // }).then(function(result){
            //     if(result.success){
            //        _self.loadWsList();
            //        _self.openPageOffice({
            //            templateId:result.
            //        });
            //     }
            // });
            var _self=this;
            var templateId=params.row.id;
            console.log(params.row);
            _self.$http.get("/enforces/wenshou/addWenshou",{
                params:{
                    caseId:_self.caseId,
                    docType:params.row.docType,
                    templateId:templateId
                }
            }).then(function(result){
                if(result.success){
                    _self.loadWsList();
                    _self.openPageOffice({
                        templateId:templateId,
                        type:"wenshou",
                        action:"edit",
                        wsId:result.data.id
                    });
                }
            });
     
        },
        editWsTemplate(params){
            // var _self=this;
            // this.$http.get("/enforces/wenshou/template/"+params.row.id)
            // .then(function(result){
            //     if(result.success){
            //        _self.openPageOffice(result.data);
            //     }
            // });
            this.openPageOffice({
                templateId:params.row.id,
                type:"template",
                action:"edit"
            });
        },
        removeWsTemplate(params){
            var _self=this;
            this.$http.delete("/enforces/wenshou/template/"+params.row.id)
            .then(function(result){
                if(result.success){
                   _self.loadWsTemplateList();
                   
                }
            });
        },
        openPageOffice(params){
            var args={
                _token:this._token,
                params:params
            }
            if(args.params.docTyp==null)
                args.params.docType=this.docType;
            args.params.caseId=this.caseId;
            if(args.params.wsId==null)
                args.params.wsId=this.wsId;
            console.log(args)
            var url=this.$basePath+'/static/pageOffice/index';
            // POBrowser.openWindowModeless(url,'width=1250px;height=800px;',JSON.stringify(args));
            POBrowser.openWindowModeless(url,'left=0px;top=0px;resizable=no;fullscreen=yes;',JSON.stringify(args));
        },
        emitValue(){
            if(!this.wsList.show&&!this.templateList.show)
                this.$emit("input",false);
        }
    },
    mounted(){
        var _self=this;
        window.closePageOffice=function(){
            _self.emitValue();
        }
    },
    watch:{
        value(val){
            if(!val){
                this.wsList.show=val;
                this.templateList.show=val;
            }else{
                if(this.wsId!=null){
                    this.openPageOffice({
                        type:"wenshou",
                        action:"edit"
                    });
                }else{
                    this.loadWsList();
                }
                
            }
        },
        wsListShow(val){
            this.emitValue();
        },
        wsTemplateListShow(val){
            this.emitValue();
        },
        wsId(val){
            this.wsId=val;
            if(this.wsId!=null && this.value && !this.wsList.show && this.templateList.show)
                this.openPageOffice({
                    type:"wenshou",
                    action:"edit"
                });
        }
    }
}
</script>
