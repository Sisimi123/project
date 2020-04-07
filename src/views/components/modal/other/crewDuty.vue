<style lang="less">
@import "./style/other.less";
</style>

<template>
<!-- 渔船安全生产责任书  -->
    <div>
        <Modal
            v-model="visible" 
            :closable="closable"
            :maskClosable="maskClosable"
            :title="title"
            :width="width"
            :okText="okText"
            :cancelText="cancelText"
            :loading="loading"
            :styles="styles"
            :class="className"
            :footerHide="footerHide"
            :scrollable="scrollable"
            :transitionNames="transitionNames"
            :transfer="transfer"
            @on-ok="ok"
            @on-cancel="cancel"
            @on-visible-change="visibleChange">

            <div slot="header" v-if="showHeader">
                <slot name="header"></slot>
            </div>
            <div slot="close" v-if="showClose">
                <slot name="close"></slot>
            </div>
            <!-- <div slot="footer" v-if="showFooter">
                <slot name="footer"></slot>
            </div> -->
            <div slot="footer">
                <Button @click="handleAdd()" type="warning" >添加记录</Button>
                <Button  @click="ok">关闭</Button>
            </div>
            <Row>
            <Col span="24">
                <Row >
                    <div style="margin-top:10px">
                        <Table :loading="status.tableLoading" :columns="columns" :data="selectList" border :height="280"></Table>
                    </div>
                </Row>
            </Col>
            </Row>
        </Modal>

        <div>

        <Modal class="vertical-center-modal"  :width="840" v-model="status.showDetail" title="详情" :scrollable=true :mask-closable="false">
            <div slot="footer">
                <Button  @click="status.showDetail = false">返回</Button>
                <Button type="warning" @click="handleShowPicList()">上传附件</Button>
                <Button type="info" @click="handlePrint()">打印</Button>
                <Button type="primary" @click="handleSave()">保存</Button>
            </div>

            <div class="peopleD printonly printOrder-zerenbook" ref="zerenbook" v-if="!inResize">
                <p class="centers" id="centers" style='text-align:center;font-size:25px;'><input type="text" v-model="info.number" style="width:150px;border:0;outline:0;text-align: center;border-bottom:1px solid black;">船员安全生产责任书</p>
                <br/><span id="captain" style="margin:1px 0">船长：<input type="text" v-model="info.captain" class="signiture" style="width:400px;outline:0;border:0;"></span>
                <br/><span id="chuanyuan" style="margin:1px 0">船员：<input type="text" v-model="info.chuanyuan" class="signiture" style="width:400px;outline:0;border:0;"></span>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>为了认真贯彻执行“安全第一，预防为主”的工作方针，全面落实上级有关部门的安全生产责任制，防止海损事故和其他以外工伤事故的发生，确保渔船船员的生命财产安全，进一步明确各船员的职责。现经本船研究特订立如下安全生产责任书：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>一、各船员必须遵守国际公约、国际惯例，遵守国家和港口当局的法律、法规、规章、条例、法令。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>二、各船员必须认真遵守《渔船安全航行守则》，切实履行船员职责。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>三、船员在临水作业时必须穿救生衣上甲板作业。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>四、船员在参加起、放网时必须戴安全帽作业。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>五、在渔船航行生产时严禁醺酒、赌博。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>六、严禁船员在床上吸烟、乱丢烟蒂及其他违规明火作业。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>七、船员要严格执行值班制度，特别是渔船抛锚时要坚守值班岗位，加强值班瞭望。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>八、轮机人员除完成本职工作外，还需特别注意安排好轮机值班。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>九、渔船抛锚时应事先清理锚索（锚链），检查好锚索（锚链）旋子和卸扣。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>十、起网机操作人员应注意事项：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>1、经常检查起网机的各部件运转情况，确保起、放网顺利进行。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>2、经常检查送勾绳、吊渔钢丝索的磨损程度；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>3、起网机运转时要系紧衣服，防止勾缠。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>十一、起、放网时应注意事项：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>1、大风大浪起网时，船尾要系好安全保险绳，以防止夹综弹出船尾；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>2、放网时，放网人员要站在安全的地方，防止被网眼和绳索勾缠；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>3、出渔绳时，渔绳边不准站无关人员。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span><span id="firstTime">时效：该责任书有效期为一年，自<input type="text" class="dt" v-model="info.firstYear" style="width:40px;outline:0;border:0;text-align:center;">年<input v-model="info.firstMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.firstDay" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">日至<input v-model="info.lastYear" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">年<input v-model="info.lastMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.lastDay" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">日。</span>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>违背责任：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>一、各船员必须严格执行责任书中确定的各项条款，如有违背，发生意外事故由该当事人负（主要）责任。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>二、任何船员违背上诉条款到主要部门处罚，责任自负。
                <p style="height:20px;"></p>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>船长签名：<span style="display: inline-block;width:275px;"></span>船员签字：
                <p style="height:20px;"></p>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>所属单位盖章：<span style="display: inline-block;width:200px;"></span><span id="lastTime"><input type="text" v-model="info.endYear" style="width:40px;outline:0;border:0;text-align:center;" class="dt">年<input v-model="info.endMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.endDay" style="width:40px;outline:0;border:0;text-align:center;" type="text" class="dt">日</span>
            </div>
            
        </Modal>

        <Modal :width="620" v-model="status.showPicList" title="详情"  :scrollable=true :mask-closable="false">
            <div class="pic-upload-list" v-for="item in uploadList" v-bind:key="item.id">
                <img :src="item.url">
                <div class="pic-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.url)" style="position: relative;left:10px"></Icon>
                    <Icon size="5" type="ios-close-outline" @click.native="handleRemove(item)" style="position: relative;left:20px;top:-40px"></Icon>
                </div>
            </div>
            <div class="pic-upload-list" >
                <div style="width: 100px;height:100px;line-height: 100px;"  @click="handleCamera">
                    <Icon type="ios-camera" size="80" style="line-height:100px"></Icon>
                </div>
            </div>
            <Upload
                :data="actionData"
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :headers="{'ipInfo': this.$store.state.ipInfo.cip}"
                :format="['bmp','jpg','png','jpeg','tiff','gif','svg','wmf']"
                :with-credentials="true"
                :max-size="20480"
                multiple
                type="drag"
                :action="actionUrl"
                style="display: inline-block;width:100px;">
                <div style="width: 100px;height:100px;line-height: 100px;">
                    <Icon type="android-add-circle" size="80" style="line-height:100px"></Icon>
                </div>
            </Upload>
        </Modal>
        <pic v-model="imgVisible" :img="imgUrl"></pic>

        </div>
    </div>

</template>

<script>
import pic from "@/views/components/pic/pic.vue";
import user from '@/store/module/user.js';
export default {
    name: "aqzrsModel",
    components: {
        pic
    },
    props: {
        // default
        shipName: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        closable: {
            type: Boolean,
            default: true
        },
        maskClosable: {
            type: Boolean,
            default: true
        },
        title: {
            type: String,
            default: "详情"
        },
        width: {
            type: [Number, String],
            default: 960
        },
        okText: {
            type: String
        },
        cancelText: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        },
        styles: {
            type: Object
        },
        className: {
            type: String,
            
        },
        // for instance
        footerHide: {
            type: Boolean,
            default: false
        },
        scrollable: {
            type: Boolean,
            default: false
        },
        transitionNames: {
            type: Array,
            default() {
                return ["ease", "fade"];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        // ------
        
        id: {
            type: String,
        },
    },
    data() {
        return {
            // default
            visible: false,
            inResize: false,
            // ------
            status:{
                tableLoading: false,
                showDetail: false,
                showPicList: false,
            },
            totalNum:0,
            columns: [
                {
                    title: "序号",
                    type: "index",
                    align: "center",
                    minWidth: 80
                },
                {
                    key: "createTime",
                    title: "创建时间",
                    align: "center",
                    minWidth: 140
                },
                {
                    title: "操作",
                    key: "id",
                    align: "center",
                    minWidth: 140,
                    render: (h, params) => {
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                props: {
                                    type: "success",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.handleShowDetail(params.row, params.index);
                                    }
                                }
                                },
                                "详情"
                            )
                        );
                        temp.push(
                            h(
                                "Button",
                                {
                                props: {
                                    type: "error",
                                    size: "small"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.index);
                                    }
                                }
                                },
                                "删除"
                            )
                        );
                        return h("div", temp);
                    }
                }
            ],
            selectList: [],
            orgin: {
            },
            info:{
                id:"",
                number:"",//船员编号
                captain:"",  // 船长
                chuanyuan:"",// 船员(多个由“，”代替)
                firstYear:"",
                firstMonth:"",
                firstDay:"",
                lastDay:"",
                lastMonth:"",
                lastYear:"",
                endYear:"",
                endMonth:"",
                endDay:""
            },
            uploadList: [],
            infoRules: {
            },
            selectIndex: "",
            imgUrl: "",
            imgVisible: false,
        };
    },
    computed: {
        // default
        showFooter() {
            return this.$slots.footer == undefined ? false : true;
        },
        showHeader() {
            return this.$slots.header == undefined ? false : true;
        },
        showClose() {
            return this.$slots.close == undefined ? false : true;
        },
        // ------
        actionData() {
            return {
                moduleId: 'crewDuty',
                dataId: this.info.id,
                owner: this.owner,
                name: this.info.chuanyuan,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName
            };
        },
        actionUrl(){
            return this.$basePath + '/standingbook/attachs/upload';
        },
        defaultUser() {
            return this.$store.state.user.userInfo;
        },
    },
    mounted() {},
    methods: {
        // default
        close() {
            this.visible = false;
            this.$emit("input", false);
            this.$emit("on-cancel");
        },
        cancel () {
            this.close();
        },
        ok () {
            this.visible = false;
            this.$emit('input', false);
            this.$emit('on-ok');
        },
        visibleChange(val){
            this.visible = val;
            if(!this.visible) this.close();
        },
        isEmpty(s){
            if(s == null || s == "" || s == undefined){
                return true;
            }
            return false;
        },
        pageSizeChange(size) {
            this.query.size = size;
            this.handleSearch();
        },
        changePage(page) {
            this.query.page = page;
            this.handleSearch();
        },
        // ----
        reset(){
            this.info = {
                id:"",
            };
        },
        handleAdd() {
            this.reset();
            this.selectIndex = "";
            this.$http
                .get("/$admin/attachs/uuid")
                .then(res => {
                    console.log(res);
                    if(res.success){
                        this.info.id = res.data;
                        this.info.createTime = new Date();
                        // this.info.creatorId = this.defaultUser.userId;
                        this.info.sort = this.selectList.length;
                        this.status.showDetail = true;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            
        },
        handleShowDetail(row, index) {
            this.reset();
            this.info = this.$util.deepCopy(row);
            this.selectIndex = this.$util.deepCopy(index) + "";
            this.initPic();
            this.status.showDetail = true;

        },
        init() {
            this.initData();
        },
        initPic() {
            this.uploadList = [];
            if(this.isEmpty(this.info.id)) {
                return;
            }
            this.$http
                .get("/$admin/attachs?dataId=" + this.info.id)
                .then(res => {
                    let attachs = res.data;
                    res.data.forEach(element => {
                        if(!this.isEmpty(element)){
                            let attr = {
                                dataId: element.id,
                                url: this.$basePath + "/$admin/attachs/stream/" + element.id
                            };
                            this.uploadList.push(attr);
                        }
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        },
        initData() {
            this.$http
                .get("/standingbook/oneshiponefile/" + this.id)
                .then(res => {
                    if (res.success) {
                        console.log(res.data);
                        this.orgin = res.data;
                        var data = res.data.crewDuty;
                        if (this.isEmpty(data)) {
                            this.selectList = [];
                            
                        } else {
                            this.selectList = data;
                        }
                        this.visible = true;

                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        initSearch(){
            this.$http.get("/standingbook/oneshiponefile/"+ this.id)
            .then(res => {
                if (res.success && !this.isEmpty(res.data)) {
                    this.orgin = res.data;
                    var data = this.$util.deepCopy(this.orgin.crewDuty);
                    this.selectList = data;
                    this.totalNum = data.length;
                    this.status.tableLoading = false;
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        handleSearch() {
            this.status.tableLoading = true;
            var query = {

            }
            this.$http
                .get("/checks/shipsailor/page", {
                    params: {
                        query: JSON.stringify(this.query)
                    }
                })
                .then(res => {
                    this.totalNum = res.data.total;
                    this.selectList = res.data.data;
                    this.status.tableLoading = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleDelete(index) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    this.selectList.splice(index, 1);
                    var data = this.$util.deepCopy(this.selectList);
                    this.orgin.crewDuty = data;
                    this.$http.post("/standingbook/oneshiponefile/save", this.orgin)
                        .then(res => {
                            if (res.success) {
                                
                            } else {
                                this.$Message.info(res.msg);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
           
        },
        handleSave() {
            this.info.updateTime = new Date();
            this.status.showDetail = false;
            var data = this.$util.deepCopy(this.selectList);
            if(this.selectIndex == ""){
                this.info.sort = this.selectList.length;
                data.push(this.info);
            } else {
                data[this.selectIndex] = this.info;
            }
            this.orgin.crewDuty = data;
            this.$http.post("/standingbook/oneshiponefile/save", this.orgin)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.crewDuty);
                        this.selectList = data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handlePrint() {
            $('#centers').text(this.info.number?this.info.number+'船员安全生产责任书':'船员安全生产责任书')
            $('#captain').text(this.info.captain?'船长:'+this.info.captain:'船长:')
            $('#chuanyuan').text(this.info.chuanyuan?'船员:'+this.info.chuanyuan:'船员:')
            $('#firstTime').text(this.info.firstYear?'时效：该责任书有效期为一年，自:'+this.info.firstYear+'年'+this.info.firstMonth+'月'+this.info.firstDay+'日至'+this.info.lastYear+'年'+this.info.lastMonth+'月'+this.info.lastDay+"日":'时效：该责任书有效期为一年，自:  年  月  日至  年  月  日')
            $('#lastTime').text(this.info.endYear?this.info.endYear+'年'+this.info.endMonth+'月'+this.info.endDay+'日':'年  月  日')
            var newstr = this.$refs["zerenbook"].innerHTML
            var newWindow = window.open(''); 
            newWindow.document.write(newstr) 
            newWindow.focus();
            newWindow.print();
            newWindow.close();
            this.inResize = true;
            this.$nextTick(function(){ 
                this.inResize = false;
            })         
        },
        handleFormat(){
            var query = {
                wheres: {
                    XM_like: this.info.xm
                },
                orders: "updateTime desc"
            };
            this.$http
                .get("/checks/shipsailor", {
                    params: {
                        query: JSON.stringify(query)
                    }
                })
                .then(res => {
                    console.log("res",res);
                    if(res.success && res.data.length > 0) {
                        var id = this.$util.deepCopy(this.info.id);
                        var sort = this.$util.deepCopy(this.info.sort);
                        this.info = res.data[0];
                        this.info.id = id;
                        this.info.sort = sort;
                    }else {
                        this.$Message.info("系统暂无该记录");
                    }
                })
                .catch((error)=> {
                    console.log(error);
                });
        },
        handleView(url) {
            this.imgUrl = url;
            this.imgVisible = true;
        },
        handleRemove(file) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    for (var i = 0; i < this.uploadList.length; i++) {
                        if (this.uploadList[i].dataId == file.dataId) {
                            this.$http.delete('/standingbook/attachs/' + this.uploadList[i].dataId)
                                .then(res => {

                                })
                                .catch(error => {
                                    console.log(error);
                                });
                            this.uploadList.splice(i, 1);
                            break;
                        }
                    }
                },
                onCancel: () => {
                    console.log("onCancel");
                }
            });
        },
        handleSuccess(response, file, fileList) {
            let attr = {
                dataId: response.data.id,
                url: this.$basePath + "/$admin/attachs/stream/" + response.data.id
            };
            this.uploadList.push(attr);
        },
        handleCamera(){
            // this.status.showCamera = true;
            window.open(this.$basePath+"/gpy/ws/ws_index.jsp?dataId=" + this.actionData.dataId + "&moduleId=" + this.actionData.moduleId);
        },
        handleShowPicList(){
            this.status.showPicList = true;
        }

    },
    watch: {
        value(val) {
            if (val) {
                this.initSearch();
                this.visible = true;
            }
        }
    },
    beforeDestroy() {
        this.visible = false;
        this.$emit("input", this.visible);
    },
};
</script>
<style scoped>
.centers{
    text-align: center;
    font-size:25px;
}
.peopleD,.shipsafe{
    font-size:17px;
    width:100%;
    height:580px;
    overflow: auto;
    padding:20px 60px;
    letter-spacing:0px;
    line-height:30px;  
}
.peopleD>.suojin,.shipsafe>.suojin{
    display:inline-block;
    width:34px;
}
input.dt{
    width:40px;
    outline:0;
    border:0;
    text-align:center;
}
input.signiture{
    width:400px;
    outline:0;
    border:0;
}
</style>


