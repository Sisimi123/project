<style lang="less">
@import "./style/other.less";
</style>

<template>
<!-- 渔船隐患自查统计表  -->
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
                <Button @click="status.showDetail= false">取消</Button>
                <Button type="warning" @click="handleShowPicList()">上传附件</Button>
                <Button type="info" @click="handlePrint()">打印</Button>
                <Button type="primary" @click="handleSave()">保存</Button>
            </div>
            <div style="height:600px;overflow:auto;" class="printOrder-datatjb">
                <table width="100%" class="tjb">
                    <caption><h2>渔船隐患自查统计表</h2></caption>
                    <tr>
                        <td colspan="6" class="tjbt">一、船舶概况</td>
                        <td colspan="6" class="tjbt">七、安全设备情况</td>
                    </tr>
                    <tr>
                        <td colspan="2">船名号</td>
                        <td colspan="2"><input type="text" name="" v-model="info.shipName"></td>
                        <td>所有人</td>
                        <td><input type="text" name="" v-model="info.ownerName"></td>
                        <td colspan="2" rowspan="2">类别</td>
                        <td rowspan="2">应配数量</td>
                        <td rowspan="2">合格</td>
                        <td rowspan="2">缺少</td>
                        <td rowspan="2">无</td>
                    </tr>
                    <tr>
                        <td colspan="2">主机功率</td>
                        <td colspan="2"><input type="text" name="" v-model="info.hostPower"></td>
                        <td>吨位</td>
                        <td><input type="text" name="" v-model="info.tonnage"></td>
                    </tr>
                    <tr>
                        <td colspan="6" class="tjbt">二、船舶证书情况（打钩）</td>
                        <td rowspan="4">救生设备</td>
                        <td>救生衣</td>
                        <td><input type="text" name="" v-model="info.jsy1"></td>
                        <td><input type="radio" name="ab" value="1" v-model="info.jsy2"></td>
                        <td><input type="radio" name="ab" value="2" v-model="info.jsy2"></td>
                        <td><input type="radio" name="ab" value="0" v-model="info.jsy2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">类别</td>
                        <td>有</td>
                        <td>有效</td>
                        <td>无效</td>
                        <td>无</td>
                        <td>救生圈</td>
                        <td><input type="text" name="" v-model="info.jsq1"></td>
                        <td><input type="radio" name="aa" value="1" v-model="info.jsq2"></td>
                        <td><input type="radio" name="aa" value="2" v-model="info.jsq2"></td>
                        <td><input type="radio" name="aa" value="0" v-model="info.jsq2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">登记证书</td>
                        <td><input type="radio" name="ac" value="1" v-model="info.dengji1"></td>
                        <td><input type="radio" name="ad" value="1" v-model="info.dengJi2"></td>
                        <td><input type="radio" name="ad" value="0" v-model="info.dengJi2"></td>
                        <td><input type="radio" name="ac" value="0" v-model="info.dengji1"></td>
                        <td>救生筏</td>
                        <td><input type="text" name="" v-model="info.jsf1"></td>
                        <td><input type="radio" name="ae" value="1" v-model="info.jsf2"></td>
                        <td><input type="radio" name="ae" value="2" v-model="info.jsf2"></td>
                        <td><input type="radio" name="ae" value="0" v-model="info.jsf2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">船检证书</td>
                        <td><input type="radio" name="af" value="1" v-model="info.chuanJian1"></td>
                        <td><input type="radio" name="ag" value="1" v-model="info.chuanJian2"></td>
                        <td><input type="radio" name="ag" value="0" v-model="info.chuanJian2"></td>
                        <td><input type="radio" name="af" value="0" v-model="info.chuanJian1"></td>
                        <td>灭火器</td>
                        <td><input type="text" name="" v-model="info.mhq1"></td>
                        <td><input type="radio" name="ah" value="1" v-model="info.mhq2"></td>
                        <td><input type="radio" name="ah" value="2" v-model="info.mhq2"></td>
                        <td><input type="radio" name="ah" value="0" v-model="info.mhq2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">捕捞许可证</td>
                        <td><input type="radio" name="ai" value="1" v-model="info.bulao1"></td>
                        <td><input type="radio" name="aj" value="1" v-model="info.bulao2"></td>
                        <td><input type="radio" name="aj" value="0" v-model="info.bulao2"></td>
                        <td><input type="radio" name="ai" value="0" v-model="info.bulao1"></td>
                        <td rowspan="3">消防设备</td>
                        <td>灭火弹</td>
                        <td><input type="text" name="" v-model="info.mhd1"></td>
                        <td><input type="radio" name="ak" value="1" v-model="info.mhd2"></td>
                        <td><input type="radio" name="ak" value="2" v-model="info.mhd2"></td>
                        <td><input type="radio" name="ak" value="0" v-model="info.mhd2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">航行签证薄</td>
                        <td><input type="radio" name="al" value="1" v-model="info.qianZheng1"></td>
                        <td><input type="radio" name="am" value="1" v-model="info.qianZheng2"></td>
                        <td><input type="radio" name="am" value="0" v-model="info.qianZheng2"></td>
                        <td><input type="radio" name="al" value="0" v-model="info.qianZheng1"></td>
                        <td>黄沙箱</td>
                        <td><input type="text" name="" v-model="info.hsx1"></td>
                        <td><input type="radio" name="an" value="1" v-model="info.hsx2"></td>
                        <td><input type="radio" name="an" value="2" v-model="info.hsx2"></td>
                        <td><input type="radio" name="an" value="0" v-model="info.hsx2"></td>
                    </tr>
                    <tr>
                        <td colspan="6" class="tjbt">三、船员特证情况（打钩）</td>
                        <td>消防桶</td>
                        <td><input type="text" name="" v-model="info.xft1"></td>
                        <td><input type="radio" name="ao" value="1" v-model="info.xft2"></td>
                        <td><input type="radio" name="ao" value="2" v-model="info.xft2"></td>
                        <td><input type="radio" name="ao" value="0" v-model="info.xft2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">类别</td>
                        <td>有</td>
                        <td>有效</td>
                        <td>无效</td>
                        <td>无</td>
                        <td rowspan="7">信号设备</td>
                        <td>桅灯</td>
                        <td><input type="text" name="" v-model="info.wde1"></td>
                        <td><input type="radio" name="ap" value="1" v-model="info.wde2"></td>
                        <td><input type="radio" name="ap" value="2" v-model="info.wde2"></td>
                        <td><input type="radio" name="ap" value="0" v-model="info.wde2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">船长</td>
                        <td><input type="radio" name="aq" value="1" v-model="info.cz1"></td>
                        <td><input type="radio" name="ar" value="1" v-model="info.cz2"></td>
                        <td><input type="radio" name="ar" value="0" v-model="info.cz2"></td>
                        <td><input type="radio" name="aq" value="0" v-model="info.cz1"></td>
                        <td>舷灯</td>
                        <td><input type="text" name="" v-model="info.xd1"></td>
                        <td><input type="radio" name="as" value="1" v-model="info.xd2"></td>
                        <td><input type="radio" name="as" value="2" v-model="info.xd2"></td>
                        <td><input type="radio" name="as" value="0" v-model="info.xd2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">大副</td>
                        <td><input type="radio" name="at" value="1" v-model="info.df1"></td>
                        <td><input type="radio" name="au" value="1" v-model="info.df2"></td>
                        <td><input type="radio" name="au" value="0" v-model="info.df2"></td>
                        <td><input type="radio" name="at" value="0" v-model="info.df1"></td>
                        <td>锚灯</td>
                        <td><input type="text" name="" v-model="info.zd1"></td>
                        <td><input type="radio" name="av" value="1" v-model="info.zd2"></td>
                        <td><input type="radio" name="av" value="2" v-model="info.zd2"></td>
                        <td><input type="radio" name="av" value="0" v-model="info.zd2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">二副</td>
                        <td><input type="radio" name="aw" value="1" v-model="info.ef1"></td>
                        <td><input type="radio" name="ax" value="1" v-model="info.ef2"></td>
                        <td><input type="radio" name="ax" value="0" v-model="info.ef2"></td>
                        <td><input type="radio" name="aw" value="0" v-model="info.ef1"></td>
                        <td>尾灯</td>
                        <td><input type="text" name="" v-model="info.wed1"></td>
                        <td><input type="radio" name="ay" value="1" v-model="info.wed2"></td>
                        <td><input type="radio" name="ay" value="2" v-model="info.wed2"></td>
                        <td><input type="radio" name="ay" value="0" v-model="info.wed2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">轮机长</td>
                        <td><input type="radio" name="az" value="1" v-model="info.ljz1"></td>
                        <td><input type="radio" name="ba" value="1" v-model="info.ljz2"></td>
                        <td><input type="radio" name="ba" value="0" v-model="info.ljz2"></td>
                        <td><input type="radio" name="az" value="0" v-model="info.ljz1"></td>
                        <td>环照灯</td>
                        <td><input type="text" name="" v-model="info.hzd1"></td>
                        <td><input type="radio" name="bb" value="1" v-model="info.hzd2"></td>
                        <td><input type="radio" name="bb" value="2" v-model="info.hzd2"></td>
                        <td><input type="radio" name="bb" value="0" v-model="info.hzd2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">大管轮</td>
                        <td><input type="radio" name="bc" value="1" v-model="info.dgl1"></td>
                        <td><input type="radio" name="bd" value="1" v-model="info.dgl2"></td>
                        <td><input type="radio" name="bd" value="0" v-model="info.dgl2"></td>
                        <td><input type="radio" name="bc" value="0" v-model="info.dgl1"></td>
                        <td>号钟</td>
                        <td><input type="text" name="" v-model="info.hz1"></td>
                        <td><input type="radio" name="be" value="1" v-model="info.hz2"></td>
                        <td><input type="radio" name="be" value="2" v-model="info.hz2"></td>
                        <td><input type="radio" name="be" value="0" v-model="info.hz2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">二管轮</td>
                        <td><input type="radio" name="bf" value="1" v-model="info.egl1"></td>
                        <td><input type="radio" name="bg" value="1" v-model="info.egl2"></td>
                        <td><input type="radio" name="bg" value="0" v-model="info.egl2"></td>
                        <td><input type="radio" name="bf" value="0" v-model="info.egl1"></td>
                        <td>号笛</td>
                        <td><input type="text" name="" v-model="info.hj1"></td>
                        <td><input type="radio" name="bh" value="1" v-model="info.hj2"></td>
                        <td><input type="radio" name="bh" value="2" v-model="info.hj2"></td>
                        <td><input type="radio" name="bh" value="3" v-model="info.hj2"></td>
                    </tr>
                    <tr>
                        <td colspan="2" rowspan="2">四小证</td>
                        <td colspan="2">应持证人数</td>
                        <td colspan="2">实持证人数</td>
                        <td rowspan="5">通导设备</td>
                        <td>AIS</td>
                        <td><input type="text" name="" v-model="info.ais1"></td>
                        <td><input type="radio" name="bi" value="1" v-model="info.ais2"></td>
                        <td><input type="radio" name="bi" value="2" v-model="info.ais2"></td>
                        <td><input type="radio" name="bi" value="0" v-model="info.ais2"></td>
                    </tr>
                    <tr>                                  
                        <td colspan="2"><input type="text" name="" v-model="info.numberOfLicensees"></td>
                        <td colspan="2"><input type="text" name="" v-model="info.actualNumberOfLicensees"></td>
                        <td>卫星</td>
                        <td><input type="text" name="" v-model="info.wx1"></td>
                        <td><input type="radio" name="bj" value="1" v-model="info.wx2"></td>
                        <td><input type="radio" name="bj" value="2" v-model="info.wx2"></td>
                        <td><input type="radio" name="bj" value="0" v-model="info.wx2"></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="tjbt">四、安全生产责任书（承诺书）签订情况</td>
                        <td colspan="2"><input type="text" name="" v-model="info.productionSafety"></td>
                        <td>单边带</td>
                        <td><input type="text" name="" v-model="info.dbd1"></td>
                        <td><input type="radio" name="bk" value="1" v-model="info.dbd2"></td>
                        <td><input type="radio" name="bk" value="2" v-model="info.dbd2"></td>
                        <td><input type="radio" name="bk" value="0" v-model="info.dbd2"></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="tjbt">五、财产人身保险落实情况</td>
                        <td colspan="2"><input type="text" name="" v-model="info.implementationSituation"></td>
                        <td>卫导</td>
                        <td><input type="text" name="" v-model="info.wd1"></td>
                        <td><input type="radio" name="bl" value="1" v-model="info.wd2"></td>
                        <td><input type="radio" name="bl" value="2" v-model="info.wd2"></td>
                        <td><input type="radio" name="bl" value="0" v-model="info.wd2"></td>
                    </tr>
                    <tr>
                        <td colspan="4" class="tjbt">六、有无违章违法行为</td>
                        <td colspan="2"><input type="text" name="" v-model="info.wrongIllegalAct"></td>
                        <td>雷达</td>
                        <td><input type="text" name="" v-model="info.ld1"></td>
                        <td><input type="radio" name="bm" value="1" v-model="info.ld2"></td>
                        <td><input type="radio" name="bm" value="2" v-model="info.ld2"></td>
                        <td><input type="radio" name="bm" value="0" v-model="info.ld2"></td>
                    </tr>
                    <tr>
                        <td colspan="2">船东签名</td>
                        <td colspan="2"><input type="text" name="" v-model="info.ownerSignature"></td>
                        <td colspan="2">是否编组编队</td>
                        <td colspan="2"><input type="radio" name="ht" v-model="info.organizeFormation" value="1" class="yh">是<input type="radio" name="ht" v-model="info.organizeFormation" value="0" class="yh">否</td>
                        <td colspan="2">是否按规定填写捕捞日志</td>
                        <td colspan="2"><input type="radio" name="hy" v-model="info.fishingRequired" value="1" class="yh">是<input type="radio" name="hy" v-model="info.fishingRequired" value="0" class="yh">否</td>
                    </tr>
                    <tr>
                        <td colspan="12" class="tjbt tjbt3">
                            <span>乡镇审核人：<input type="text" name="" v-model="info.townAuditor" style="width:20%;"></span>
                            <span class="tjbt2">乡镇盖章<input type="text" name="" style="width:20%;"></span>
                        </td>                              
                    </tr>
                </table>
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
        const v_form = (rule, value, callback) => {
            var baseValue = this.base[rule.fullField];
            if (
                !this.isEmpty(baseValue) &&
                !this.isEmpty(value) &&
                baseValue != value
            ) {
                callback(new Error("系统数据："+baseValue));
            }
            if(this.isEmpty(baseValue) && this.isEmpty(value)) {
                callback(new Error("暂无数据"));
            }
            callback();
        };
        return {
            // default
            visible: false,
            // ------
            status:{
                tableLoading: false,
                showDetail: false,
                showPicList: false,
            },
            totalNum:0,
            query: {
                page: 1,
                size: 10,
                wheres: {
                    XM_like: ""
                },
                orders: "updateTime desc"
            },
            columns: [
                {
                    title: "序号",
                    type: "index",
                    align: "center",
                    minWidth: 80
                },
                {
                    key: "shipName",
                    title: "船名号",
                    align: "center",
                    minWidth: 150
                },
                {
                    key: "ownerName",
                    title: "所有人",
                    align: "center",
                    minWidth: 140
                },
                {
                    key: "hostPower",
                    title: "主机功率",
                    align: "center",
                    minWidth: 120
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
                                        console.log("123123",params);
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
            initial: "initial",
            orgin: {},
            base:{},
            info:{
                id:"",
            },
            uploadList: [],
            infoRules: {
                xm: [{ validator: v_form, trigger: "change" }],xb: [{ validator: v_form, trigger: "change" }],jzrq: [{ validator: v_form, trigger: "change" }],qfrq: [{ validator: v_form, trigger: "change" }],qfjg_MC: [{ validator: v_form, trigger: "change" }],qfgyxm: [{ validator: v_form, trigger: "change" }],zshm: [{ validator: v_form, trigger: "change" }],zszw_MC: [{ validator: v_form, trigger: "change" }],hjdz: [{ validator: v_form, trigger: "change" }],sfzhm: [{ validator: v_form, trigger: "change" }],csrq: [{ validator: v_form, trigger: "change" }],
            },
            selectIndex: "",
            imgUrl: "",
            imgVisible: false,
            

            datatimehf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimejf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimemf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimexf:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            visible:this.value,
            modalSQB:{   
                id:"",                                           
                parameteFileId:"",
                type:"annualfishing",
                name:"海洋渔业捕捞许可年审申请表",
                content:{},
            },   
            content:{
                shipName:"",
                phone:"",
                cz:"",
                czzh:"",
                czsxz:"",
                czsfz:"",
                czbz:"",
                df:"",
                dfzh:"",
                dfsxz:"",
                dfsfz:"",
                dfbz:"",
                ef:"",
                efzh:"",
                efsxz:"",
                efsfz:"",
                efbz:"",
                ljz:"",
                ljzzh:"",
                ljzsxz:"",
                ljzsfz:"",
                ljzbz:"",
                egl:"",
                eglzh:"",
                eglsxz:"",
                eglsfz:"",
                eglbz:"",
                hwy:"",
                hwyzh:"",
                hwysxz:"",
                hwysfz:"",
                hwybz:"",
                cy1:"",
                cyzh1:"",
                cysxz1:"",
                cysfz1:"",
                cybz1:"",
                cy2:"",
                cyzh2:"",
                cysxz2:"",
                cysfz2:"",
                cybz2:"",
                cy3:"",
                cyzh3:"",
                cysxz3:"",
                cysfz3:"",
                cybz3:"",
                jobType:"",
                countNumber:"",
                certificateNumber:"",
                cjzs:"",
                registrationNumber:"",
                djzs:"",
                productionSafety:"",
                responsibilitySafety:"",
                fishingLog:"",
                cooperative:"",
                cooperativeTime:"",
                headCooperative:"",
                cooperativeStamp:"",
                grassrootsComments:"",
                grassrootsTime:"",
                grassrootsCooperative:"",
                grassrootsStamp:"",
                informationCenter:"",
                informationCenterTime:"",
                informationCooperative:"",
                informationStamp:"",
                countyBureau:"",
                countyBureauTime:"",
                countyBureauCooperative:"",
                countyBureauStamp:"",
                dgl:"",
                dglzh:"",
                dglsxz:"",
                dglsfz:"",
                dglbz:"",
            },      
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
                // moduleId: "oneshiponefile_dangercheck",
                // dataId: this.info.id,
                moduleId: 'aqzrsModel',
                dataId: this.info.id,
                owner: this.owner,
                creatorName: user.state.userInfo.name,
                shipName: this.shipName
            };
        },
        actionUrl(){
            return this.$basePath + '/standingbook/attachs/upload';
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
            this.base = {};
            this.initial = "initial";

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
                        this.info.shipName = this.orgin.shipName;
                        this.info.createTime = new Date();
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
            this.initial = "initial";
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
            this.base = {};
            this.$http
                .get("/standingbook/oneshiponefile/" + this.id)
                .then(res => {
                    if (res.success) {
                        console.log(res.data);
                        this.orgin = res.data;
                        var data = res.data.dangerCheck;
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
                    var data = this.$util.deepCopy(this.orgin.dangerCheck);
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
                    this.orgin.dangerCheck = data;
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
            this.orgin.dangerCheck = data;
            this.$http.post("/standingbook/oneshiponefile/save", this.orgin)
                .then(res => {
                    if (res.success) {
                        this.orgin = res.data;
                        var data = this.$util.deepCopy(this.orgin.dangerCheck);
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
            var newstr = document.getElementsByClassName('printOrder-datatjb')[0].innerHTML
            document.body.innerHTML = newstr;
            window.print();
            // 重新加载页面，以刷新数据
            window.location.reload();
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
        handleCopyBase(){
            this.info = this.base;
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
table.tjb{
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.tjb td{
    border:1px solid gray;
    width:65px;
    height:32px;
    text-align:center;
}
table.tjb td span.tjbt2{
    float:right;
    margin-right:2%;
}
table.tjb td.tjbt{
    text-align:left;
    padding-left:1%;
}
table.tjb td.tjbt.tjbt3{
    height:60px;
}
table.tjb input{
    border:none;
    outline:none;
    width:90%;
    padding:0;
    margin:0;
}
table.tjb td input.yh{
    width:15%;
}
</style>


