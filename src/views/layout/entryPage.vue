<style lang="less" scoped>
    @import './entryPage.less';
</style>

<template>
    <div class="login">
        <div class="title_login">
            <p>统一门户</p>
            <p>The Entry Page</p>
        </div>
        <div class="login-con">
            <Row :gutter="10">
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:100px" src="../../styles/icon01.png"/>
                        </div>
                        <div class="title">
                            <p>船舶动态管理平台</p>
                        </div>
                        <div class="title_eng">
                            <p>Ship dynamic</p>
                            <p>management platform</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#50C06C" type="primary" @click="openMap">前往</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:100px" src="../../styles/icon02.png"/>
                        </div>
                        <div class="title">
                            <p>海洋执法管理平台</p>
                        </div>
                        <div class="title_eng">
                            <p>Marine law enforcement</p>
                            <p>management platform</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#BA6E1" type="primary" @click="()=>{routerTo('/home')}">前往</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:100px" src="../../styles/icon03.png"/>
                        </div>
                        <div class="title">
                            <p>船舶档案管理平台</p>
                        </div>
                        <div class="title_eng">
                            <p>Ship archives</p>
                            <p>management platform</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#EC6521" type="primary" @click="()=>{routerTo('/home')}">前往</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:100px" src="../../styles/icon04.png"/>
                        </div>
                        <div class="title">
                            <p>船舶安全监管平台</p>
                        </div>
                        <div class="title_eng">
                            <p>Ship safety</p>
                            <p>supervision platform</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#7FD93C" type="primary" @click="()=>{routerTo('/home')}">前往</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:125px" src="../../styles/icon05.png"/>
                        </div>
                        <div class="title">
                            <p>合作社台账</p>
                        </div>
                        <div class="title_eng">
                            <p>Cooperative ledger</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#40BA1A" type="primary" @click="()=>{routerTo('/home')}">前往</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="4">
                    <Card>
                        <div align="center">
                            <img style="height:100px" src="../../styles/icon06.png"/>
                        </div>
                        <div class="title">
                            <p>船舶行为分析平台</p>
                        </div>
                        <div class="title_eng">
                            <p>Ship behavior</p>
                            <p>analysis platform</p>
                        </div>
                        <div style="margin-top:30px;text-align:center">
                            <Button style="background-color:#546FFE" type="primary" @click="()=>{routerTo('/home')}">前往</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
export default {
    
    methods:{

        routerTo(path){
            this.$router.push(path);
        },
        openMap(){
            window.open(this.$basePath+"/attachment/zjmap/newIndex.html");
        },
    }

}
</script>

