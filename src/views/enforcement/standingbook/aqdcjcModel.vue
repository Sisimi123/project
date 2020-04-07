<!--安全登船检查表-->
<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>
<template>
<Modal 
    v-model="visible" 
    :closable="closable"
    :maskClosable="maskClosable"
    :title="title"
    width="45%"
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
    @on-visible-change="visibleChange"
>
    <div style="height:600px;overflow:auto;" class="printOrder-data" v-if="tx!=='dayin'">
        <table width="100%" class="regisbg">
            <caption><h1>渔船安全登船检查</h1></caption>
            <caption>
                <span style="margin-right:40%;">船名号：<input type="text" class="shipName" v-model="content.shipName"></span>
                <span style="margin-right:10%;">检查时间：<input type="text" class="sqq" v-model="datatimeCK.year"> 年<input type="text" class="sqq" v-model="datatimeCK.month">月<input type="text" class="sqq" v-model="datatimeCK.day">日</span>
            </caption>
            <tr>
                <td colspan="10" class="zuo">一、船舶证书情况（根据实际情况在相应栏内打钩）</td>
            </tr>
            <tr>
                <td>类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
                <td>类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
            </tr>
            <tr>
                <td>登记证书</td>
                <td><input type="radio" value="1"  v-model="content.dengji1" name="aa"/></td>
                <td><input type="radio" value="1"  v-model="content.dengJi2" name="ab"/></td>
                <td><input type="radio" value="0"  v-model="content.dengJi2" name="ab"/></td>
                <td><input type="radio" value="0"  v-model="content.dengji1" name="aa"/></td>
                <td>航海签证薄</td>
                <td><input type="radio" value="1" v-model="content.qianZheng1" name="ac"/></td>
                <td><input type="radio" value="1" v-model="content.qianZheng2" name="ad"/></td>
                <td><input type="radio" value="0" v-model="content.qianZheng2" name="ad"/></td>
                <td><input type="radio" value="0" v-model="content.qianZheng1" name="ac"/></td>
            </tr>
            <tr>
                <td>船舶证书</td>
                <td><input type="radio" value="1" v-model="content.chuanJian1" name="ae"></td>
                <td><input type="radio" value="1" v-model="content.chuanJian2" name="af"></td>
                <td><input type="radio" value="0" v-model="content.chuanJian2" name="af"></td>
                <td><input type="radio" value="0" v-model="content.chuanJian1" name="ae"></td>
                <td>捕捞日志（大中型以上填写）</td>
                <td><input type="radio" value="1" v-model="content.blrz1" name="ag"></td>
                <td><input type="radio" value="1" v-model="content.blrz2" name="ah"></td>
                <td><input type="radio" value="0" v-model="content.blrz2" name="ah"></td>
                <td><input type="radio" value="0" v-model="content.blrz1" name="ag"></td>
            </tr>
            <tr>
                <td>捕捞许可证</td>
                <td><input type="radio" value="1" v-model="content.bulao1" name="ai"></td>
                <td><input type="radio" value="1" v-model="content.bulao2" name="aj"></td>
                <td><input type="radio" value="0" v-model="content.bulao2" name="aj"></td>
                <td><input type="radio" value="0" v-model="content.bulao1" name="ai"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td colspan="10" class="zuo">二、船员对证情况（根据实际情况在相应栏内打钩</td>
            </tr>
            <tr>
                <td>类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
                <td>类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
            </tr>
            <tr>
                <td>船长</td>
                <td><input type="radio" value="1" v-model="content.cz1" name="ak"></td>
                <td><input type="radio" value="1" v-model="content.cz2" name="al"></td>
                <td><input type="radio" value="0" v-model="content.cz2" name="al"></td>
                <td><input type="radio" value="0" v-model="content.cz1" name="ak"></td>
                <td>大管轮</td>
                <td><input type="radio" value="1" v-model="content.dgl1" name="am"></td>
                <td><input type="radio" value="1" v-model="content.dgl2" name="an"></td>
                <td><input type="radio" value="0" v-model="content.dgl2" name="an"></td>
                <td><input type="radio" value="0" v-model="content.dgl1" name="am"></td>
            </tr>
            <tr>
                <td>大副</td>
                <td><input type="radio" value="1" v-model="content.df1" name="ao"></td>
                <td><input type="radio" value="1" v-model="content.df2" name="ap"></td>
                <td><input type="radio" value="0" v-model="content.df2" name="ap"></td>
                <td><input type="radio" value="0" v-model="content.df1" name="ao"></td>
                <td>二管轮</td>
                <td><input type="radio" value="1" v-model="content.egl1" name="aq"></td>
                <td><input type="radio" value="1" v-model="content.egl2" name="ar"></td>
                <td><input type="radio" value="0" v-model="content.egl2" name="ar"></td>
                <td><input type="radio" value="0" v-model="content.egl1" name="aq"></td>
            </tr>
            <tr>
                <td>二副</td>
                <td><input type="radio" value="1" v-model="content.ef1" name="as"></td>
                <td><input type="radio" value="1" v-model="content.ef2" name="at"></td>
                <td><input type="radio" value="0" v-model="content.ef2" name="at"></td>
                <td><input type="radio" value="0" v-model="content.ef1" name="as"></td>
                <td rowspan="2">四小证</td>
                <td colspan="2">应持征人数</td>
                <td colspan="2">实持征人数</td>
            </tr>
            <tr>
                <td>轮机长</td>
                <td><input type="radio" value="1" v-model="content.ljz1" name="au"></td>
                <td><input type="radio" value="1" v-model="content.ljz2" name="av"></td>
                <td><input type="radio" value="0" v-model="content.ljz2" name="av"></td>
                <td><input type="radio" value="0" v-model="content.ljz1" name="au"></td>
                <td colspan="2"><input type="text" name="" v-model="content.numberOfLicensees"></td>
                <td colspan="2"><input type="text" name="" v-model="content.actualNumberOfLicensees"></td>
            </tr>
            <tr>
                <td colspan="5" class="zuo">三、救生消防设备情况</td>
                <td colspan="5" class="zuo">四、信号设备情况</td>
            </tr>
            <tr>
                <td>类别</td>
                <td>应配</td>
                <td>实配</td>
                <td>合格</td>
                <td>无</td>
                <td>类别</td>
                <td>应配</td>
                <td>实配</td>
                <td>合格</td>
                <td>无</td>
            </tr>
            <tr>
                <td>救生衣</td>
                <td><input type="text" name="" v-model="content.jsy"></td>
                <td><input type="text" name="" v-model="content.jsy1"></td>
                <td><input type="radio" value="1" v-model="content.jsy2" name="aw"></td>
                <td><input type="radio" value="0" v-model="content.jsy2" name="aw"></td>
                <td>桅灯</td>
                <td><input type="text" name="" v-model="content.wde"></td>
                <td><input type="text" name="" v-model="content.wde1"></td>
                <td><input type="radio" value="1" v-model="content.wde2" name="bc"></td>
                <td><input type="radio" value="0" v-model="content.wde2" name="bc"></td>
            </tr>
            <tr>
                <td>救生圈</td>
                <td><input type="text" name="" v-model="content.jsq"></td>
                <td><input type="text" name="" v-model="content.jsq1"></td>
                <td><input type="radio" value="1" v-model="content.jsq2" name="ay"></td>
                <td><input type="radio" value="0" v-model="content.jsq2" name="ay"></td>
                <td>舷灯</td>
                <td><input type="text" name="" v-model="content.xd"></td>
                <td><input type="text" name="" v-model="content.xd1"></td>
                <td><input type="radio" value="1" v-model="content.xd2" name="bd"></td>
                <td><input type="radio" value="0" v-model="content.xd2" name="bd"></td>
            </tr>
            <tr>
                <td>灭火器</td>
                <td><input type="text" name="" v-model="content.mhq"></td>
                <td><input type="text" name="" v-model="content.mhq1"></td>
                <td><input type="radio" value="1" v-model="content.mhq2" name="ba"></td>
                <td><input type="radio" value="0" v-model="content.mhq2" name="ba"></td>
                <td>锚灯</td>
                <td><input type="text" name="" v-model="content.zd"></td>
                <td><input type="text" name="" v-model="content.zd1"></td>
                <td><input type="radio" value="1" v-model="content.zd2" name="be"></td>
                <td><input type="radio" value="0" v-model="content.zd2" name="be"></td>
            </tr>
            <tr>
                <td>救生筏</td>
                <td><input type="text" name="" v-model="content.jsf"></td>
                <td><input type="text" name="" v-model="content.jsf1"></td>
                <td><input type="radio" value="1" v-model="content.jsf2" name="az"></td>
                <td><input type="radio" value="0" v-model="content.jsf2" name="az"></td>
                <td>尾灯</td>
                <td><input type="text" name="" v-model="content.wed"></td>
                <td><input type="text" name="" v-model="content.wed1"></td>
                <td><input type="radio" value="1" v-model="content.wed2" name="bf"></td>
                <td><input type="radio" value="0" v-model="content.wed2" name="bf"></td>
            </tr>
            <tr>
                <td>烟火信号</td>
                <td><input type="text" name="" v-model="content.yhxh"></td>
                <td><input type="text" name="" v-model="content.yhxh1"></td>
                <td><input type="radio" value="1" v-model="content.yhxh2" name="bb"></td>
                <td><input type="radio" value="0" v-model="content.yhxh2" name="bb"></td>
                <td>雾灯</td>
                <td><input type="text" name="" v-model="content.wd"></td>
                <td><input type="text" name="" v-model="content.wd1"></td>
                <td><input type="radio" value="1" v-model="content.wd2" name="bg"></td>
                <td><input type="radio" value="0" v-model="content.wd2" name="bg"></td>
            </tr>
            <tr>
                <td colspan="10" class="zuo">五、通导设备情况</td>
            </tr>
            <tr>
                    <td>类别</td>
                    <td>应配</td>
                    <td>实配</td>
                    <td>合格</td>
                    <td>无</td>
                    <td>类别</td>
                    <td>应配</td>
                    <td>实配</td>
                    <td>合格</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>AIS避碰</td>
                    <td><input type="text" name="" v-model="content.AIS"></td>
                    <td><input type="text" name="" v-model="content.ais1"></td>
                    <td><input type="radio" value="1" v-model="content.ais2" name="bh"></td>
                    <td><input type="radio" value="0" v-model="content.ais2" name="bh"></td>
                    <td>单边带</td>
                    <td><input type="text" name="" v-model="content.dbd"></td>
                    <td><input type="text" name="" v-model="content.dbd1"></td>
                    <td><input type="radio" value="1" v-model="content.dbd2" name="bi"></td>
                    <td><input type="radio" value="0" v-model="content.dbd2" name="bi"></td>
                </tr>
                <tr>
                    <td>北斗导航</td>
                    <td><input type="text" name="" v-model="content.bd"></td>
                    <td><input type="text" name="" v-model="content.bd1"></td>
                    <td><input type="radio" value="1" v-model="content.bd2" name="bj"></td>
                    <td><input type="radio" value="0" v-model="content.bd2" name="bj"></td>
                    <td>卫导</td>
                    <td><input type="text" name="" v-model="content.wda"></td>
                    <td><input type="text" name="" v-model="content.wda1"></td>
                    <td><input type="radio" value="1" v-model="content.wda2" name="bk"></td>
                    <td><input type="radio" value="0" v-model="content.wda2" name="bk"></td>
                </tr>
                <tr>
                    <td>VHF</td>
                    <td><input type="text" name="" v-model="content.VHF"></td>
                    <td><input type="text" name="" v-model="content.VHF1"></td>
                    <td><input type="radio" value="1" v-model="content.VHF2" name="bl"></td>
                    <td><input type="radio" value="0" v-model="content.VHF2" name="bl"></td>
                    <td>雷达</td>
                    <td><input type="text" name="" v-model="content.ld"></td>
                    <td><input type="text" name="" v-model="content.ld1"></td>
                    <td><input type="radio" value="1" v-model="content.ld2" name="bm"></td>
                    <td><input type="radio" value="0" v-model="content.ld2" name="bm"></td>
                </tr>
            <tr>
                <td colspan="10" class="zuo liu">
                    <p>六、整改措施</p>
                    <textarea name="" id="" cols="130" rows="3" v-model="content.correctiveActions"></textarea>
                </td>
            </tr>
            <tr>
                <td colspan="5">
                    <p>
                        <span class="tt"> 检查人员：<input type="text" v-model="content.inspectors" name=""/></span>
                    </p>
                    <p class="nyrs">
                        <span class="nyr">
                            <input type="text" class="sq" v-model="datatimeCKR.year"> 年<input type="text" class="sq" v-model="datatimeCKR.month">月<input type="text" class="sq" v-model="datatimeCKR.day">日
                        </span>
                    </p>
                </td>
                <td colspan="5">
                    <p>
                        <span class="tt">船东签名：<input type="text" v-model="content.ownerSignature" name=""/></span>
                    </p>
                    <p class="nyrs">
                        <span class="nyr">
                            <input type="text" class="sq" v-model="datatimeCD.year"> 年<input type="text" class="sq" v-model="datatimeCD.month">月<input type="text" class="sq" v-model="datatimeCD.day">日
                        </span>
                    </p>
                </td>
            </tr>
        </table>
    </div>
    <!-- ---------------------------------- -->
    <div style="height:600px;overflow:auto;" class="printOrder-data" v-if="tx=='dayin'">
            <table width="100%" class="regisbg">
                <caption><h1>渔船安全登船检查</h1></caption>
                <caption>
                    <span style="margin-right:40%;">船名号：<input :placeholder="content.shipName" type="text" class="shipName" v-model="content.shipName"></span>
                    <span style="margin-right:10%;">检查时间：<input :placeholder="datatimeCK.year" type="text" class="sqq" v-model="datatimeCK.year"> 年<input :placeholder="datatimeCK.month" type="text" class="sqq" v-model="datatimeCK.month">月<input :placeholder="datatimeCK.day" type="text" class="sqq" v-model="datatimeCK.day">日</span>
                </caption>
                <tr>
                    <td colspan="10" class="zuo">一、船舶证书情况（根据实际情况在相应栏内打钩）</td>
                </tr>
                <tr>
                    <td>类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                    <td>类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>登记证书</td>
                    <td><span>{{content.dengji1=='1'?'√':''}}</span></td>
                    <td><span>{{content.dengJi2=='1'?'√':''}}</span></td>
                    <td><span>{{content.dengJi2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.dengji1=='0'?'√':''}}</span> </td>
                    <td>航海签证薄</td>
                    <td><span>{{content.qianZheng1=='1'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng2=='1'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng2=='0'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng1=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td>船舶证书</td>
                    <td><span>{{content.chuanJian1=='1'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian2=='1'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian2=='0'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian1=='0'?'√':''}}</span></td>
                    <td>捕捞日志（大中型以上填写）</td>
                    <td><span>{{content.blrz1=='1'?'√':''}}</span></td>
                    <td><span>{{content.blrz2=='1'?'√':''}}</span></td>
                    <td><span>{{content.blrz2=='0'?'√':''}}</span></td>
                    <td><span>{{content.blrz1=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td>捕捞许可证</td>
                    <td><span>{{content.bulao1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.bulao2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.bulao2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.bulao1=='0'?'√':''}}</span> </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="10" class="zuo">二、船员对证情况（根据实际情况在相应栏内打钩</td>
                </tr>
                <tr>
                    <td>类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                    <td>类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>船长</td>
                    <td><span>{{content.cz1=='1'?'√':''}}</span></td>
                    <td><span>{{content.cz2=='1'?'√':''}}</span></td>
                    <td><span>{{content.cz2=='0'?'√':''}}</span></td>
                    <td><span>{{content.cz1=='0'?'√':''}}</span></td>
                    <td>大管轮</td>
                    <td><span>{{content.dgl1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dgl2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dgl2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.dgl1=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td>大副</td>
                    <td><span>{{content.df1=='1'?'√':''}}</span></td>
                    <td><span>{{content.df2=='1'?'√':''}}</span></td>
                    <td><span>{{content.df2=='0'?'√':''}}</span></td>
                    <td><span>{{content.df1=='0'?'√':''}}</span></td>
                    <td>二管轮</td>
                    <td><span>{{content.egl1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.egl2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.egl2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.egl1=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td>二副</td>
                    <td><span>{{content.ef1=='1'?'√':''}}</span></td>
                    <td><span>{{content.ef2=='1'?'√':''}}</span></td>
                    <td><span>{{content.ef2=='0'?'√':''}}</span></td>
                    <td><span>{{content.ef1=='0'?'√':''}}</span></td>
                    <td rowspan="2">四小证</td>
                    <td colspan="2">应持征人数</td>
                    <td colspan="2">实持征人数</td>
                </tr>
                <tr>
                    <td>轮机长</td>
                    <td><span>{{content.ljz1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.ljz2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.ljz2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.ljz1=='0'?'√':''}}</span> </td>
                    <td colspan="2"><input :placeholder="content.numberOfLicensees" type="text" name="" v-model="content.numberOfLicensees"></td>
                    <td colspan="2"><input :placeholder="content.actualNumberOfLicensees" type="text" name="" v-model="content.actualNumberOfLicensees"></td>
                </tr>
                <tr>
                    <td colspan="5" class="zuo">三、救生消防设备情况</td>
                    <td colspan="5" class="zuo">四、信号设备情况</td>
                </tr>
                <tr>
                    <td>类别</td>
                    <td>应配</td>
                    <td>实配</td>
                    <td>合格</td>
                    <td>无</td>
                    <td>类别</td>
                    <td>应配</td>
                    <td>实配</td>
                    <td>合格</td>
                    <td>无</td>
                </tr>
                <tr>
                    <td>救生衣</td>
                    <td><input :placeholder="content.jsy" type="text" name="" v-model="content.jsy"></td>
                    <td><input :placeholder="content.jsy1" type="text" name="" v-model="content.jsy1"></td>
                    <td><span>{{content.jsy2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.jsy2=='0'?'√':''}}</span> </td>
                    <td>桅灯</td>
                    <td><input :placeholder="content.wde" type="text" name="" v-model="content.wde"></td>
                    <td><input :placeholder="content.wde1" type="text" name="" v-model="content.wde1"></td>
                    <td><span>{{content.wde2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.wde2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td>救生圈</td>
                    <td><input :placeholder="content.jsq" type="text" name="" v-model="content.jsq"></td>
                    <td><input :placeholder="content.jsq1" type="text" name="" v-model="content.jsq1"></td>
                    <td><span>{{content.jsq2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.jsq2=='0'?'√':''}}</span> </td>
                    <td>舷灯</td>
                    <td><input :placeholder="content.xd" type="text" name="" v-model="content.xd"></td>
                    <td><input :placeholder="content.xd1" type="text" name="" v-model="content.xd1"></td>
                    <td><span>{{content.xd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.xd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td>灭火器</td>
                    <td><input :placeholder="content.mhq" type="text" name="" v-model="content.mhq"></td>
                    <td><input :placeholder="content.mhq1" type="text" name="" v-model="content.mhq1"></td>
                    <td><span>{{content.mhq2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.mhq2=='0'?'√':''}}</span> </td>
                    <td>锚灯</td>
                    <td><input :placeholder="content.zd" type="text" name="" v-model="content.zd"></td>
                    <td><input :placeholder="content.zd1" type="text" name="" v-model="content.zd1"></td>
                    <td><span>{{content.zd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.zd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td>救生筏</td>
                    <td><input :placeholder="content.jsf" type="text" name="" v-model="content.jsf"></td>
                    <td><input :placeholder="content.jsf1" type="text" name="" v-model="content.jsf1"></td>
                    <td><span>{{content.jsf2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.jsf2=='0'?'√':''}}</span> </td>
                    <td>尾灯</td>
                    <td><input :placeholder="content.wed" type="text" name="" v-model="content.wed"></td>
                    <td><input :placeholder="content.wed1" type="text" name="" v-model="content.wed1"></td>
                    <td><span>{{content.wed2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.wed2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td>烟火信号</td>
                    <td><input :placeholder="content.yhxh" type="text" name="" v-model="content.yhxh"></td>
                    <td><input :placeholder="content.yhxh1" type="text" name="" v-model="content.yhxh1"></td>
                    <td><span>{{content.yhxh2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.yhxh2=='0'?'√':''}}</span> </td>
                    <td>雾灯</td>
                    <td><input :placeholder="content.wd" type="text" name="" v-model="content.wd"></td>
                    <td><input :placeholder="content.wd1" type="text" name="" v-model="content.wd1"></td>
                    <td><span>{{content.wd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.wd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="10" class="zuo">五、通导设备情况</td>
                </tr>
                <tr>
                        <td>类别</td>
                        <td>应配</td>
                        <td>实配</td>
                        <td>合格</td>
                        <td>无</td>
                        <td>类别</td>
                        <td>应配</td>
                        <td>实配</td>
                        <td>合格</td>
                        <td>无</td>
                    </tr>
                    <tr>
                        <td>AIS避碰</td>
                        <td><input :placeholder="content.AIS" type="text" name="" v-model="content.AIS"></td>
                        <td><input :placeholder="content.ais1" type="text" name="" v-model="content.ais1"></td>
                        <td><span>{{content.ais2=='1'?'√':''}}</span> </td>
                        <td><span>{{content.ais2=='0'?'√':''}}</span> </td>
                        <td>单边带</td>
                        <td><input :placeholder="content.dbd" type="text" name="" v-model="content.dbd"></td>
                        <td><input :placeholder="content.dbd1" type="text" name="" v-model="content.dbd1"></td>
                        <td><span>{{content.dbd2=='1'?'√':''}}</span> </td>
                        <td><span>{{content.dbd2=='0'?'√':''}}</span> </td>
                    </tr>
                    <tr>
                        <td>北斗导航</td>
                        <td><input :placeholder="content.bd" type="text" name="" v-model="content.bd"></td>
                        <td><input :placeholder="content.bd1" type="text" name="" v-model="content.bd1"></td>
                        <td><span>{{content.bd2=='1'?'√':''}}</span></td>
                        <td><span>{{content.bd2=='0'?'√':''}}</span></td>
                        <td>卫导</td>
                        <td><input :placeholder="content.wda" type="text" name="" v-model="content.wda"></td>
                        <td><input :placeholder="content.wda1" type="text" name="" v-model="content.wda1"></td>
                        <td><span>{{content.wda2=='1'?'√':''}}</span> </td>
                        <td><span>{{content.wda2=='0'?'√':''}}</span> </td>
                    </tr>
                    <tr>
                        <td>VHF</td>
                        <td><input :placeholder="content.VHF" type="text" name="" v-model="content.VHF"></td>
                        <td><input :placeholder="content.VHF1" type="text" name="" v-model="content.VHF1"></td>
                        <td><span>{{content.VHF2=='1'?'√':''}}</span> </td>
                        <td><span>{{content.VHF2=='0'?'√':''}}</span> </td>
                        <td>雷达</td>
                        <td><input :placeholder="content.ld" type="text" name="" v-model="content.ld"></td>
                        <td><input :placeholder="content.ld1" type="text" name="" v-model="content.ld1"></td>
                        <td><span>{{content.ld2=='1'?'√':''}}</span></td>
                        <td><span>{{content.ld2=='0'?'√':''}}</span></td>
                    </tr>
                <tr>
                    <td colspan="10" class="zuo liu">
                        <p>六、整改措施</p>
                        <textarea :placeholder="content.correctiveActions" name="" id="" cols="130" rows="3" v-model="content.correctiveActions"></textarea>
                    </td>
                </tr>
                <tr>
                    <td colspan="5">
                        <p>
                            <span class="tt"> 检查人员：<input :placeholder="content.inspectors" type="text" v-model="content.inspectors" name=""/></span>
                        </p>
                        <p class="nyrs">
                            <span class="nyr">
                                <input :placeholder="datatimeCKR.year" type="text" class="sq" v-model="datatimeCKR.year"> 年<input :placeholder="datatimeCKR.month" type="text" class="sq" v-model="datatimeCKR.month">月<input :placeholder="datatimeCKR.day" type="text" class="sq" v-model="datatimeCKR.day">日
                            </span>
                        </p>
                    </td>
                    <td colspan="5">
                        <p>
                            <span class="tt">船东签名：<input :placeholder="content.ownerSignature" type="text" v-model="content.ownerSignature" name=""/></span>
                        </p>
                        <p class="nyrs">
                            <span class="nyr">
                                <input :placeholder="datatimeCD.year" type="text" class="sq" v-model="datatimeCD.year"> 年<input :placeholder="datatimeCD.month" type="text" class="sq" v-model="datatimeCD.month">月<input :placeholder="datatimeCD.day" type="text" class="sq" v-model="datatimeCD.day">日
                            </span>
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    <div slot="footer">
        <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'"  @click="okCB">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okCB">保存</Button>
        <Button type="info" size="large" @click="dayin()" v-show="tx=='dayin'">打印</Button>
    </div>
</Modal>
</template>  
<script>
import {isNull } from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
export default {
    name:"aqdcjcModel",
    props: {
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
            default:"vertical-center-modal"
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
            default () {
                return ['ease', 'fade'];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        parameteFileId:{
            type: [Number, String],
        },
        sID:{
            type: [Number, String],
        },
        tx:{
            type: String,
        },
        shipName:{
            type: String,
        },
        ownerName:{
            type: String,
        },
        phone:{
            type: [Number, String],
        },
    },
    data(){
        return {
            visible:this.value,
            datatimeCK:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimeCKR:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            datatimeCD:{
                year:"",
                month:"",
                day:"",
                minutes:"00:00:00"
            },
            modalCB:{
                id:"",
                parameteFileId:"",//台账案卷ID，外
                type:"fishingsafetycheck",
                name:"渔船安全登船检查表",
                content:{},
            },  
            content:{
                shipName:"",//渔船名	      
                checkTime:"",//检查时间
                jcqmsj:"",//检察人员签名时间
                cdqmsj:"",//船东签名时间
                dengji1:"",//登记证书 0无，1有	    
                dengJi2:"",//登记证书 0无效，1有效
                chuanJian1:"",//船舶证书 0无，1有	    
                chuanJian2:"",//船舶证书  0无效，1有效
                bulao1:"",//捕捞许可证0无，1有	    
                bulao2:"",//捕捞许可证0无效，1有效
                qianZheng1:"",//航行签证薄0无，1有	    
                qianZheng2:"",//航行签证薄0无效，1有效	    
                blrz1:"",//捕捞日志(大中型以上填写)0无，1有	    
                blrz2:"",//捕捞日志(大中型以上填写)0无效，1有效
                cz:"",//船长0无，1有	    
                cz2:"",//船长0无效，1有效
                df1:"",//大副0无，1有	    
                df2:"",//大副0无效，1有效
                ef1:"",//二副0无，1有	    
                ef2:"",//二副0无效，1有效
                ljz1:"",//轮机长0无，1有	    
                ljz2:"",//轮机长0无效，1有效	 
                dgl1:"",//大管轮0无，1有
                dgl2:"",//大管轮0无效，1有效
                egl1:"",//二管轮0无，1有	    
                egl2:"",//二管轮0无效，1有效
                numberOfLicensees:"",//四小证应持证人数
                actualNumberOfLicensees:"",//四小证实际持证人数	    
                jsy:"",//应配救生衣
                jsy1:"",//实配救生衣	    
                jsy2:"",//救生衣0无，1合格，2缺少	    
                jsq:"",//应配救生圈
                jsq1:"",//实配救生圈    
                jsq2:"",//救生圈0无，1合格，2缺少	    
                jsf:"",//应配救生筏
                jsf1:"",//实配救生筏    
                jsf2:"",//救生筏0无，1合格，2缺少	    
                mhq:"",//应配灭火器
                mhq1:"",//实配灭火器    
                mhq2:"",//灭火器0无，1合格，2缺少	  
                yhxh:"",//应配烟火信号	    
                yhxh1:"",//实配烟火信号    
                yhxh2:"",//烟火信号0无，1合格，2缺少	    
                wde:"",//应配桅灯
                wde1:"",//实配桅灯
                wde2:"",//桅灯0无，1合格，2缺少	    
                xd:"",//应配舷灯	    
                xd1:"",//实配舷灯
                xd2:"",//舷灯0无，1合格，2缺少    
                zd:"",//应配轴灯	    
                zd1:"",//实配轴灯
                zd2:"",//轴灯0无，1合格，2缺少	    
                wed:"",//应配尾灯    
                wed1:"",//实配尾灯
                wed2:"",//尾灯0无，1合格，2缺少    
                wd:"",//应配雾灯	    
                wd1:"",//实配雾灯
                wd2:"",//雾灯0无，1合格，2缺少	    
                bd:"",//应配北斗导航	    
                bd1:"",//实配北斗导航	    
                bd2:"",//A北斗导航0无，1合格，2缺少	    
                VHF:"",//应配VHF	    
                VHF1:"",//实配VHF	    
                VHF2:"",//VHF0无，1合格，2缺少	    
                AIS:"",//应配AIS	    
                ais1:"",//实配AIS	    
                ais2:"",//AIS0无，1合格，2缺少	    
                dbd:"",//应配单边带	    
                dbd1:"",//实配单边带	    
                dbd2:"",//单边带0无，1合格，2缺少	    
                ld:"",//应配雷达	    
                ld1:"",//实配雷达	    
                ld2:"",//雷达0无，1合格，2缺少	    
                wda:"",//应配卫导	    
                wda1:"",//实配卫导
                wda2:"",//卫导0无，1合格，2缺少
                correctiveActions:"",//整改措施
                inspectors:"",//检查人员
                ownerSignature:"",//船东签名
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
        dayin(){
            var newstr = document.getElementsByClassName('printOrder-data')[0].innerHTML;
            document.body.innerHTML = newstr;
            window.print();
            // 重新加载页面，以刷新数据
            window.location.reload();
        },
        cancel(){
            this.visible=false;
            this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        //新增/修改
        okCB(){
            var _self=this;
            //把conten内容放到modalCB里面的content中
            if(isNull(_self.modalCB.parameteFileId)){
                _self.modalCB.id=_self.sID;
                _self.content.checkTime=_self.datatimeCK.year+"-"+_self.datatimeCK.month+"-"+_self.datatimeCK.day+" "+_self.datatimeCK.minutes;
                _self.content.jcqmsj=_self.datatimeCKR.year+"-"+_self.datatimeCKR.month+"-"+_self.datatimeCKR.day+" "+_self.datatimeCKR.minutes;
                _self.content.cdqmsj=_self.datatimeCD.year+"-"+_self.datatimeCD.month+"-"+_self.datatimeCD.day+" "+_self.datatimeCD.minutes;
                console.log(typeof(_self.content.checkTime),"很低调",_self.content.checkTime);
                _self.modalCB.content=JSON.stringify(_self.content);
                _self.modalCB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalCB)
                .then(res => {
                    console.log(res,"你好世界");
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");
                    }
                }).catch(err => {
                    console.log(err);
                });
            }else{
                _self.content.checkTime=_self.datatimeCK.year+"-"+_self.datatimeCK.month+"-"+_self.datatimeCK.day+" "+_self.datatimeCK.minutes;
                _self.content.jcqmsj=_self.datatimeCKR.year+"-"+_self.datatimeCKR.month+"-"+_self.datatimeCKR.day+" "+_self.datatimeCKR.minutes;
                _self.content.cdqmsj=_self.datatimeCD.year+"-"+_self.datatimeCD.month+"-"+_self.datatimeCD.day+" "+_self.datatimeCD.minutes;
                _self.modalCB.content=JSON.stringify(_self.content);
                _self.modalCB.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.modalCB)
                .then(res => {
                    //console.log(res,"你好世界");
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");                            
                    }
                }).catch(err => {
                    console.log(err);
                });      
            }
        },
        checkt(s,d){
            var arr=s.split(" 00:00:00")[0];
            console.log(arr,"djdj");
            arr=arr.split("-");
            if(arr.length<=2){
                d.year="";
                d.month="";
                d.day="";
            }else{
                d.year=arr[0];
                d.month=arr[1];
                d.day=arr[2];
            }
            return d;
        },
        search(){
            var _self=this;
            if(_self.tx=="update"||_self.tx=="dayin"){
                var id=_self.sID;
                _self.$http.get("/standingbook/word/table/"+id)
                .then(res=>{
                    if(res.success){
                        console.log(res,"下载");
                        _self.modalCB=res.data;//==》modalCB里面的parameteFileId就有值了
                        _self.content=JSON.parse(res.data.content);
                        _self.datatimeCK=_self.checkt(_self.content.checkTime,_self.datatimeCK);
                        _self.datatimeCKR=_self.checkt(_self.content.jcqmsj,_self.datatimeCKR);
                        _self.datatimeCD=_self.checkt(_self.content.cdqmsj,_self.datatimeCD);
                        _self.visible=true;
                    }
                })
                .catch(err=>{
                    console.log(err);
                });
            }else if(_self.tx=="add"){
                //生成字表id
                _self.$http.get("/$admin/attachs/uuid")
                .then(res=>{
                    console.log(res,"型");
                    _self.sID=res.data;
                })
                .catch(err=>{
                    console.log(err);
                });

                _self.datatimeCK.year="";
                _self.datatimeCK.month="";
                _self.datatimeCK.day="";           
                _self.datatimeCKR.year="";
                _self.datatimeCKR.month="";
                _self.datatimeCKR.day="";
                _self.datatimeCD.year="";
                _self.datatimeCD.month="";
                _self.datatimeCD.day="";
                _self.modalCB.id=""; 
                _self.content={};
                _self.content.shipName=_self.shipName;
            }
        },
    },
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else
                this.modalCB.parameteFileId=null;
        }
    },
    mounted(){
        //console.log(this.visible,"大小");
    },
}
</script>  
<style scoped>
table.regisbg{
    border-collapse: collapse;
    margin-bottom: 10px;
}
table.regisbg td {
    border: 1px solid black;
    text-align: center;
    width: 60px;
    height: 32px;
}
table.regisbg td.zuo{
    text-align:left;
    position:relative;
    left:0px;
    top:0px;
    vertical-align:middle;
}
table.regisbg td.zuo.liu{
    height:100px;
}
table.regisbg p.nyrs{
    margin:6% 0;
}
table.regisbg span.nyr{
    position:relative;
    left:30%;
}
table.regisbg span.tt{
    display:inline-block;
    position:relative;
    right:22%;
    margin-top:3%;
}
table.regisbg input{
    border:none;
    outline:none;
    text-align:left;
    width:50%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.regisbg input.sq{
    width:8%;
    text-align:center;
}
table.regisbg input.sqq{
    width:4%;
    text-align:center;
}
table.regisbg input.shipName{
    border-bottom:1px solid gray;
    width:18%;
    margin-bottom:5px;
}
table.regisbg textarea{
    position:relative;
    left:5%;
    width:90%;
    border:none;
    outline:none;
}
</style>