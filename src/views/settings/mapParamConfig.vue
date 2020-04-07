<template>
    <div>
        <Card>
            <Row>
                <Col span='12'>
                    <Form ref="configInfo" :model="configInfo" :label-width="60">
                        <Row style='margin-bottom:5px'>
                            <span class='title'>
                                默认视角设置
                            </span>
                        </Row>
                        <Row>
                            <Col span="7">
                                <FormItem label="经度:" :label-width="120">
                                    <Input v-model="configInfo.lat" placeholder="请输入..." style='width:100px'> 
                                        <span slot="append">度</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="7">
                                <FormItem label="纬度:" :label-width="120">
                                    <Input v-model="configInfo.lon" placeholder="请输入..." style='width:100px'>
                                        <span slot="append">度</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="7">
                                <FormItem label="地图缩放等级:" :label-width="120">
                                    <Input v-model="configInfo.mapLevel" placeholder="请输入..." style='width:100px'></Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style='margin-bottom:5px'>
                            <span class='title'>
                                离线设置
                            </span>
                        </Row>
                        <Row>
                            <Col span='6'>
                                <FormItem label="显示离线:" :label-width="120">
                                    <i-switch size="large" v-model="configInfo.showoffline" true-value='1' false-value='0'>
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span='6'>
                                <FormItem label="离线颜色:" :label-width="120">
                                    <ColorPicker v-model="configInfo.coloroffline" size="large" format='rgb'/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span='7'>
                                <FormItem label="卫星船舶在线定义:" :label-width="120">
                                    <Input v-model="configInfo.onlinedef" placeholder="请输入..." style='width:100px'>
                                        <span slot="append">小时</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span='7'>
                                <FormItem label="AIS船舶在线定义:" :label-width="120">
                                    <Input v-model="configInfo.aisonlinedef" placeholder="请输入..." style='width:100px'>
                                        <span slot="append">小时</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span='7'>
                                <FormItem label="系统外在线定义:" :label-width="120">
                                    <Input v-model="configInfo.outeronlinedef" placeholder="请输入..." style='width:100px'>
                                        <span slot="append">小时</span>
                                    </Input>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style='margin-bottom:5px'>
                            <span class='title'>
                                系统外设置
                            </span>
                        </Row>
                        <Row>
                            <Col span='6'>
                                <FormItem label="显示系统外AIS(A):" :label-width="120">
                                    <i-switch size="large" v-model="configInfo.showouteraisa" true-value='1' false-value='0'>
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                            <Col span='6'>
                                <FormItem label="显示系统外AIS(B):" :label-width="120">
                                    <i-switch size="large" v-model="configInfo.showouteraisb" true-value='1' false-value='0'>
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="6">
                                <FormItem label="系统外A类颜色:" :label-width="120">
                                    <ColorPicker v-model="configInfo.colorouteraisa" size="large" format='rgb'/>
                                </FormItem>
                            </Col>
                            <Col span="6">
                                <FormItem label="系统外B类颜色:" :label-width="120">
                                    <ColorPicker v-model="configInfo.colorouteraisb" size="large" format='rgb'/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style='margin-bottom:5px'>
                            <span class='title'>
                                图层显示设置
                            </span>
                        </Row>
                        <Row>
                            <Row>
                                <Col span='6'>
                                    <FormItem label="显示渔区:"  :label-width="120">
                                        <i-switch size="large" v-model="configInfo.grid" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span='6'>
                                    <FormItem label="显示渔场:"  :label-width="120">
                                        <i-switch size="large" v-model="configInfo.yc" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span='6'>
                                    <FormItem label="显示中韩协定水域:"  :label-width="120">
                                        <i-switch size="large" v-model="configInfo.zhonghan" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="显示中日协定水域:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.zhongri" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="显示u9:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.u9" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="显示禁渔线:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.jyx" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="显示电子栅栏:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.fence" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="显示渔港:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.fishingPort" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="显示标绘物:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.drawed" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <FormItem label="显示经纬线:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.lonlatline" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                                <Col span="6">
                                    <FormItem label="电子栅栏报警:" :label-width="120">
                                        <i-switch size="large" v-model="configInfo.fenceAlarm" true-value='1' false-value='0'>
                                            <span slot="open">开启</span>
                                            <span slot="close">关闭</span>
                                        </i-switch>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Row>
                        <Row style='margin-bottom:5px'>
                            <span class='title'>
                                其他参数设置
                            </span>
                        </Row>
                        <Row>
                            <Col span="8">
                                <FormItem label="离港最远距离值:" :label-width="120">
                                    <Input v-model="configInfo.distance" placeholder="请输入..." style='width:100px'>
                                        <span slot="append">海里</span>
                                    </Input>
                                </FormItem>
                            </Col>
                            <Col span="7">
                                <FormItem label="标签列表:" :label-width="100">
                                    <Input v-model="configInfo.labels" placeholder="请输入..." style='width:120px'></Input>
                                </FormItem>
                            </Col>
                            <Col span="7">
                                <FormItem label="监控列表:" :label-width="120">
                                    <Input v-model="configInfo.jklb" placeholder="请输入..." style='width:100px'></Input>
                                </FormItem>
                            </Col>
                        </Row>
                       
                    </Form>
                </Col>
                <Col span='12'>
                    <Row>
                        <draggable
                            element="div"
                            v-model="terminalConfig"
                            @start="isDragging=true"
                            @end="isDragging=false"
                        >
                        <div v-for="(item,index) in terminalConfig" :key="index">
                            <Form ref="configInfo" :model="item" :label-width="60" style='margin-top:20px'>
                                <Row>
                                    <Col span="4">
                                        <FormItem label="编号:">
                                            <Input v-model="item.termtype" placeholder="请输入..."></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="6">
                                        <FormItem label="终端名:">
                                            <Input v-model="item.name" placeholder="请输入..."></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="3">
                                        <FormItem label="启用:">
                                            <i-switch size="large" v-model="item.enabled" true-value='1' false-value='0'>
                                                <span slot="open">开启</span>
                                                <span slot="close">关闭</span>
                                            </i-switch>
                                        </FormItem>
                                    </Col>
                                    <Col span="3">
                                        <FormItem label="展示:">
                                            <i-switch size="large" v-model="item.show" true-value='1' false-value='0'>
                                                <span slot="open">开启</span>
                                                <span slot="close">关闭</span>
                                            </i-switch>
                                        </FormItem>
                                    </Col>
                                       <Col span="3">
                                        <FormItem label="搜索:">
                                            <i-switch size="large" v-model="item.search" true-value='1' false-value='0'>
                                                <span slot="open">开启</span>
                                                <span slot="close">关闭</span>
                                            </i-switch>
                                        </FormItem>
                                    </Col>
                                    <Col span="2">
                                        <FormItem label="颜色:">
                                            <ColorPicker v-model="item.color" size="large" format='rgb'/>
                                        </FormItem>
                                    </Col>
                                    <Col span="2">
                                        <FormItem>
                                            <Button @click="handleRemove(index)" type='error'>删除</Button>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <Button slot="footer" type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                        </draggable>
                    </Row>
                    <Row>
                        <div class='btnCls'>
                            <Button type="primary" size='large' long @click="saveConfigInfo(2)">保存</Button>
                        </div>
                    </Row>
                </Col>       
            </Row>
        </Card>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
    components: {
        draggable
    },
    data () {
        return {
            isDragging: false,
            mapSelect: '1',
            configInfo: {
                colorouteraisa: '',
                colorouteraisb: '',
                coloroffline: ''
            },
            terminalConfig: [],
            isShow: false
        };
    },
    computed: {
        clientHeight () {
            return this.$store.state.app.clientHeight;
        }
    },
    watch: {
        configInfo: {
            handler(curVal, oldVal) {
                // 自动保存方法
                this.saveConfigInfo(1);
            },
            deep: true
        }
    },
    methods: {
        handleAdd () {
            this.terminalConfig.push({
                name: '',
                enabled: '0',
                show: '0',
                color: ''
            });
        },
        handleRemove (index) {
            this.terminalConfig.splice(index, 1);
        },
        saveConfigInfo (v) {
            var _self = this;
            var obj = {};
            // 1为海图设置 2为终端设置
            if (v === 1) {
                obj = {
                    type: 1,
                    config: JSON.stringify(_self.configInfo)
                };
            } else if (v === 2) {
                obj = {
                    type: 2,
                    config: JSON.stringify(_self.terminalConfig)
                };
            }
            _self.$http.post('/map/config/savedefault?query=' + encodeURI(JSON.stringify(obj)))
                .then(res => {
                    if (res.success) {
                        if (res.data.type === 1) {
                            // _self.configInfo = JSON.parse(res.data.config);
                        } else if (res.data.type === 2) {
                            _self.terminalConfig = JSON.parse(res.data.config);
                            _self.$Message.info('设置成功!');
                        }   
                    } else {
                        _self.$Message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err);
                });
        },
        getPageList () {
            var _self = this;
            _self.$http.get('/map/config/default?type=1')
                .then(res => {
                    _self.configInfo = JSON.parse(res.data.config);
                }).catch(err => {
                    console.log(err);
                });
            _self.$http.get('/map/config/default?type=2')
                .then(res => {
                    _self.terminalConfig = JSON.parse(res.data.config);
                }).catch(err => {
                    console.log(err);
                });
        }
    },
    mounted () {
        var _self = this;
        _self.getPageList();
    }
};
</script>

<style scoped>
    .configCls {
        height:calc(100vh - 180px);
    }
    .title {
        font-size: 16px;
        font-weight:800;
    }
    .btnCls {
        width: 100px;
        float: right;
        margin-top:10px;
    }
</style>