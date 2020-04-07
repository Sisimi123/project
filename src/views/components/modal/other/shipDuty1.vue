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

        <Modal class="vertical-center-modal" :width="840" v-model="status.showDetail" title="详情" :scrollable=true :mask-closable="false">
            <div slot="footer">
                <Button  @click="status.showDetail = false">返回</Button>
                <Button type="warning" @click="handleShowPicList()">上传附件</Button>
                <Button type="info" @click="handlePrint()">打印</Button>
                <Button type="primary" @click="handleSave()">保存</Button>
            </div>

            <div class="shipsafe printonly printOrder-zerenbook" ref="zerenbook" v-if="!inResize">
                <p class="centers">渔船安全生产责任书</p>
                <br/><span id="jia" style="margin:1px 0">甲方：<input type="text" v-model="info.jiafang" class="signiture" style="width:400px;outline:0;border:0;"></span>
                <br/><span id="yi" style="margin:1px 0">乙方：<input type="text" v-model="info.yifang" class="signiture" style="width:400px;outline:0;border:0;"></span>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>为了保证渔船航行和生产的安全，防止海损事故的发生，确保渔民生产和财产的安全，认真贯彻执行“安全第一，预防为主”的方针，使渔业安全生产规章制度全面落实，做到责任明确，现经双方研究决定，特订立以下安全责任书：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>甲方对安全生产负领导责任：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>一、领导和组织乙方学习有关法律法规和安全知识，增强法制观念和安全意识；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>二、督促乙方严格遵守和执行国家有关法律法规和上级管理部门的有关政策，服从上级管理机关的监督和管理，自觉维护海上生产和港区的交通秩序；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>三、组织船员业务技术培训，并协作乙方处理海损事故等工作；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>四、督促检查乙方各项安全生产规章制度的落实，认真总结经验教训，确保安全生产；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>五、定期开展安全隐患排查工作吗；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>乙方对航行、生产的安全负直接责任：
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>一、严格遵守执行《72国籍避碰规则》、《中华人民共和国海上交通安全法》、《中华人民共和国渔港水域交通安全管理条例》、《渔船作业避让暂行条例》和渔船安全操作规程，自觉办理进出港签证手续；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>二、严禁超抗风力等级、超航区航行、生产，严禁违章搭客；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>三、做到经常检查船体、主机和各种设备的技术情况和使用情况，及时做好维护保养工作，保证船舶处于适航状态；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>四、保养期间一定要检查好船体各部门的安全情况；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>五、生产期间保证救生、消防、通讯、信号灯、号型等处于适航状态；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>六、做好船上日常值班，注意防火、防盗、人身安全、严禁港内违规明火作业；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>七、要做好防台、避风、抗台等工作；
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>八、渔船每次进出港时，必须通过北斗设备向县渔船安全信息中心发送进出港报告，出港期间必须开启渔船信息终端设备，积极回复信息中心发送有关的安全信息，做好信息终端设备日常维护，做到信息终端专人保管，如有故障及时到维修点进行维护，未携带信息终端设备不得出海，按规定实行报平安制度。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>九、发生海损事故应按规定及时向就近渔港监督部门报告，并接受调查，申请有关部门调解。
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span><span id="firstTime">时效：该责任书有效期为一年，自<input type="text" class="dt" v-model="info.firstYear" style="width:40px;outline:0;border:0;text-align:center;">年<input v-model="info.firstMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.firstDay" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">日至<input v-model="info.lastYear" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">年<input v-model="info.lastMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.lastDay" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">日止，双方签名盖章后生效。</span>
                <p style="height:20px;"></p>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>甲方签名：<span style="display: inline-block;width:275px;"></span>乙方签名：
                <p style="height:20px;"></p>
                <br/><span class="suojin" style="display:inline-block;width:34px;"></span>盖章：<span style="display: inline-block;width:200px;"></span><span id="lastTime"><input type="text" v-model="info.endYear" style="width:40px;outline:0;border:0;text-align:center;" class="dt">年<input v-model="info.endMonth" type="text" class="dt" style="width:40px;outline:0;border:0;text-align:center;">月<input v-model="info.endDay" style="width:40px;outline:0;border:0;text-align:center;" type="text" class="dt">日</span>
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
                                        this.handleDelete(params.row,params.index);
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
                yifang:"",
                jiafang:"",
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
                moduleId: 'oneShipOneFile',
                dataId: this.info.id,
                owner: this.owner,
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
                        var data = res.data.shipDuty;
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
            this.$http.get("/standingbook/oneshiponefile/getShipDutyList?id="+ this.id)
            .then(res => {
                this.selectList = res.data;
                this.totalNum = res.data.length;
                this.status.tableLoading = false;
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
        handleDelete(row,index) {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确认删除吗？</p>",
                okText: "继续",
                cancelText: "返回",
                onOk: () => {
                    this.$http.delete("/standingbook/oneshiponefile/deleteShipDuty?id="+row.id)
                        .then(res => {
                            if (res.success) {
                                this.initSearch();
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
            this.orgin.shipDuty = data;
            this.info.fileId = this.id
            this.$http.post("/standingbook/oneshiponefile/saveShipDuty", this.info)
                .then(res => {
                    if (res.success) {
                         this.initSearch();
                        // this.orgin = res.data;
                        // var data = this.$util.deepCopy(this.orgin.shipDuty);
                        // this.selectList = data;
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handlePrint() {
            // var newstr = document.getElementsByClassName('printOrder-zerenbook')[0].innerHTML
            // document.body.innerHTML = newstr;
            // window.print();
            // // 重新加载页面，以刷新数据
            // window.location.reload();
            $('#jia').text(this.info.jiafang?'甲方:'+this.info.jiafang:'甲方:')
            $('#yi').text(this.info.yifang?'乙方:'+this.info.yifang:'乙方:')
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


