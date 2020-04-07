<!--详情-详情(责令改正通知书)-->
<style lang="less" scoped>
        @import "../../../styles/commonStyle.less";
    </style>
    <template>
        <Modal 
        v-model="visible"
        :closable="closable"
        :maskClosable="maskClosable"
        :loading="loading" 
        :title="title"
        width="40%"
        @on-visible-change="visibleChange"
        @on-ok="ok"
        @on-cancel="cancel"
        >
            <div style="height:600px;overflow:auto;" class="printOrder-data" id="detailIF">
                <h1>责令改正通知书</h1>
                <div>
                    <span>______________________________________:</span>
                    <p>你（单位）______________________________________，违反了《______________________________________ 》，依据《______________________________________》_______________，本机关责令你（单位）_______________ ，改正下列违法行为：</p>
                    <p>___________________________________________。</p>
                    <p>逾期不改正的，本机关将依法处理。</p>
                    <p class="pp">处罚机关（印章）</p>
                    <p class="pp">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日</p>                              
                </div>
            </div>
            <div slot="footer">
                <Button type="info" size="large" v-show="txadd"  @click="okIF">添加</Button>
                <Button type="info" size="large" v-show="txupdate" @click="okIF">修改</Button>
                <Button type="warning" size="large" v-show="txdayin">打印</Button>
            </div>
        </Modal>
    </template>  
    <script>
        import {isNull } from '@/libs/common.js'
        import {saveEntity } from '@/api/request.js'
        export default {
            name:"aqgztzsModel",
            props: {
                    title: {
                        type: String,
                        default: "详情"
                    },
                    value:{
                        type:Boolean,
                        default:false
                    },
                    closable: {
                        type: Boolean,
                        default: true
                    },
                    maskClosable: {
                        type: Boolean,
                        default: true
                    },
                    loading: {
                        type: Boolean,
                        default: false
                    },
                    parameteFileId:{
                        type: [Number, String],
                    },
                    sID:{
                        type: [Number, String],
                    },
                    txadd:{
                        type: Boolean,
                    }, 
                    txupdate:{
                        type: Boolean,
                    },
                    txdayin:{
                        type: Boolean,
                    },
            },
            data(){
                return {
                    visible:this.value,
                    modalIF:{
                        parameteFileId:"",//台账案卷ID，外
                        type:"sea_standingbook_notificationcorrection",
                        name:"责令改正通知书",
                        content:{
                            shipName:"",
                            ownerName:"",
                            matchNeat:"",
                            fisherySupervision:"",
                            ygjdcf:"",
                            returnImmediately:"",
                            gdpq:"",
                            penaltyOrgan:"",
                            punishment:"",
                        },
                    },                
                }
            },
            methods:{
                ok() {
                if (!this.loading)
                    this.$emit("input",this.visible);
                    this.$emit("on-ok");
                },
                cancel() {
                    this.$emit("input",this.visible);
                    this.$emit("on-cancel");
                },
                visibleChange(val) {
                    this.$emit("on-visible-change",val);
                },
                //新增/修改
                okCB(){
                    var _self=this;
                    var temp={
                            parameteFileId:_self.parameteFileId,
                            name:_self.modalIF.name,
                            type:_self.modalIF.type,
                            content:JSON.stringify(_self.modalIF.content)
                        }
                    if(isNull(_self.sID)){
                        _self.$http
                        .post("/sea/word/table",temp)
                        .then(res => {
                            console.log(res,"你好世界");
                            if(res.success){
                                _self.visible=false;
                                _self.$emit("dataTbs");
                            }
                        }).catch(err => {
                            console.log(err);
                        });
                    }else{
                        _self.$http
                        .patch("/sea/word/table/"+_self.sID,temp)
                        .then(res => {
                            console.log(res,"你好世界");
                            if(res.success){
                                _self.visible=false;
                                _self.$emit("dataTbs");
                                
                            }
                        }).catch(err => {
                            console.log(err);
                        });      
                    }
                },
                search(){
                    var _self=this;
                    if(_self.txupdate||_self.txdayin){
                        var id=_self.sID;
                        console.log(_self.sID,"子id222");
                        _self.$http.get("/sea/word/table/"+id)
                        .then(res=>{
                            if(res.success){
                                //console.log("信息下载成功");
                                _self.modalIF.content=JSON.parse(res.data.content);
                                _self.visible=true;
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                        });
                    }
                },
            },
            watch:{
                value(val){
                    this.visible=val;
                    if(val)
                        this.search();
                }
            },
            mounted(){
                //console.log(this.visible,"大小");
            },
        }
    </script>  
    <style scoped>
    
    </style>