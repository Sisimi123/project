<!--渔船隐患自查统计表-->
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
    <div style="height:600px;overflow:auto;" class="printOrder-datatjb" v-if="tx!=='dayin'">
        <table width="100%" class="tjb">
            <caption><h2>渔船隐患自查统计表</h2></caption>
            <tr>
                <td colspan="6" class="tjbt">一、船舶概况</td>
                <td colspan="6" class="tjbt">七、安全设备情况</td>
            </tr>
            <tr>
                <td colspan="2">船名号</td>
                <td colspan="2"><input type="text" name="" v-model="content.shipName"></td>
                <td>所有人</td>
                <td><input type="text" name="" v-model="content.ownerName"></td>
                <td colspan="2" rowspan="2">类别</td>
                <td rowspan="2">应配数量</td>
                <td rowspan="2">合格</td>
                <td rowspan="2">缺少</td>
                <td rowspan="2">无</td>
            </tr>
            <tr>
                <td colspan="2">主机功率</td>
                <td colspan="2"><input type="text" name="" v-model="content.hostPower"></td>
                <td>吨位</td>
                <td><input type="text" name="" v-model="content.tonnage"></td>
            </tr>
            <tr>
                <td colspan="6" class="tjbt">二、船舶证书情况（打钩）</td>
                <td rowspan="4">救生设备</td>
                <td>救生衣</td>
                <td><input type="text" name="" v-model="content.jsy1"></td>
                <td><input type="radio" name="ab" value="1"v-model="content.jsy2"></td>
                <td><input type="radio" name="ab" value="2"v-model="content.jsy2"></td>
                <td><input type="radio" name="ab" value="0"v-model="content.jsy2"></td>
            </tr>
            <tr>
                <td colspan="2">类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
                <td>救生圈</td>
                <td><input type="text" name="" v-model="content.jsq1"></td>
                <td><input type="radio" name="aa" value="1"v-model="content.jsq2"></td>
                <td><input type="radio" name="aa" value="2"v-model="content.jsq2"></td>
                <td><input type="radio" name="aa" value="0"v-model="content.jsq2"></td>
            </tr>
            <tr>
                <td colspan="2">登记证书</td>
                <td><input type="radio" name="ac" value="1" v-model="content.dengji1"></td>
                <td><input type="radio" name="ad" value="1" v-model="content.dengJi2"></td>
                <td><input type="radio" name="ad" value="0" v-model="content.dengJi2"></td>
                <td><input type="radio" name="ac" value="0" v-model="content.dengji1"></td>
                <td>救生筏</td>
                <td><input type="text" name="" v-model="content.jsf1"></td>
                <td><input type="radio" name="ae" value="1"v-model="content.jsf2"></td>
                <td><input type="radio" name="ae" value="2"v-model="content.jsf2"></td>
                <td><input type="radio" name="ae" value="0"v-model="content.jsf2"></td>
            </tr>
            <tr>
                <td colspan="2">船检证书</td>
                <td><input type="radio" name="af" value="1"v-model="content.chuanJian1"></td>
                <td><input type="radio" name="ag" value="1"v-model="content.chuanJian2"></td>
                <td><input type="radio" name="ag" value="0"v-model="content.chuanJian2"></td>
                <td><input type="radio" name="af" value="0"v-model="content.chuanJian1"></td>
                <td>灭火器</td>
                <td><input type="text" name="" v-model="content.mhq1"></td>
                <td><input type="radio" name="ah" value="1"v-model="content.mhq2"></td>
                <td><input type="radio" name="ah" value="2"v-model="content.mhq2"></td>
                <td><input type="radio" name="ah" value="0"v-model="content.mhq2"></td>
            </tr>
            <tr>
                <td colspan="2">捕捞许可证</td>
                <td><input type="radio" name="ai" value="1"v-model="content.bulao1"></td>
                <td><input type="radio" name="aj" value="1"v-model="content.bulao2"></td>
                <td><input type="radio" name="aj" value="0"v-model="content.bulao2"></td>
                <td><input type="radio" name="ai" value="0"v-model="content.bulao1"></td>
                <td rowspan="3">消防设备</td>
                <td>灭火弹</td>
                <td><input type="text" name="" v-model="content.mhd1"></td>
                <td><input type="radio" name="ak" value="1"v-model="content.mhd2"></td>
                <td><input type="radio" name="ak" value="2"v-model="content.mhd2"></td>
                <td><input type="radio" name="ak" value="0"v-model="content.mhd2"></td>
            </tr>
            <tr>
                <td colspan="2">航行签证薄</td>
                <td><input type="radio" name="al" value="1"v-model="content.qianZheng1"></td>
                <td><input type="radio" name="am" value="1"v-model="content.qianZheng2"></td>
                <td><input type="radio" name="am" value="0"v-model="content.qianZheng2"></td>
                <td><input type="radio" name="al" value="0"v-model="content.qianZheng1"></td>
                <td>黄沙箱</td>
                <td><input type="text" name="" v-model="content.hsx1"></td>
                <td><input type="radio" name="an" value="1"v-model="content.hsx2"></td>
                <td><input type="radio" name="an" value="2"v-model="content.hsx2"></td>
                <td><input type="radio" name="an" value="0"v-model="content.hsx2"></td>
            </tr>
            <tr>
                <td colspan="6" class="tjbt">三、船员特证情况（打钩）</td>
                <td>消防桶</td>
                <td><input type="text" name="" v-model="content.xft1"></td>
                <td><input type="radio" name="ao" value="1"v-model="content.xft2"></td>
                <td><input type="radio" name="ao" value="2"v-model="content.xft2"></td>
                <td><input type="radio" name="ao" value="0"v-model="content.xft2"></td>
            </tr>
            <tr>
                <td colspan="2">类别</td>
                <td>有</td>
                <td>有效</td>
                <td>无效</td>
                <td>无</td>
                <td rowspan="7">信号设备</td>
                <td>桅灯</td>
                <td><input type="text" name="" v-model="content.wde1"></td>
                <td><input type="radio" name="ap" value="1"v-model="content.wde2"></td>
                <td><input type="radio" name="ap" value="2"v-model="content.wde2"></td>
                <td><input type="radio" name="ap" value="0"v-model="content.wde2"></td>
            </tr>
            <tr>
                <td colspan="2">船长</td>
                <td><input type="radio" name="aq" value="1"v-model="content.cz1"></td>
                <td><input type="radio" name="ar" value="1"v-model="content.cz2"></td>
                <td><input type="radio" name="ar" value="0"v-model="content.cz2"></td>
                <td><input type="radio" name="aq" value="0"v-model="content.cz1"></td>
                <td>舷灯</td>
                <td><input type="text" name="" v-model="content.xd1"></td>
                <td><input type="radio" name="as" value="1"v-model="content.xd2"></td>
                <td><input type="radio" name="as" value="2"v-model="content.xd2"></td>
                <td><input type="radio" name="as" value="0"v-model="content.xd2"></td>
            </tr>
            <tr>
                <td colspan="2">大副</td>
                <td><input type="radio" name="at" value="1"v-model="content.df1"></td>
                <td><input type="radio" name="au" value="1"v-model="content.df2"></td>
                <td><input type="radio" name="au" value="0"v-model="content.df2"></td>
                <td><input type="radio" name="at" value="0"v-model="content.df1"></td>
                <td>锚灯</td>
                <td><input type="text" name="" v-model="content.zd1"></td>
                <td><input type="radio" name="av" value="1"v-model="content.zd2"></td>
                <td><input type="radio" name="av" value="2"v-model="content.zd2"></td>
                <td><input type="radio" name="av" value="0"v-model="content.zd2"></td>
            </tr>
            <tr>
                <td colspan="2">二副</td>
                <td><input type="radio" name="aw" value="1"v-model="content.ef1"></td>
                <td><input type="radio" name="ax" value="1"v-model="content.ef2"></td>
                <td><input type="radio" name="ax" value="0"v-model="content.ef2"></td>
                <td><input type="radio" name="aw" value="0"v-model="content.ef1"></td>
                <td>尾灯</td>
                <td><input type="text" name="" v-model="content.wed1"></td>
                <td><input type="radio" name="ay" value="1"v-model="content.wed2"></td>
                <td><input type="radio" name="ay" value="2"v-model="content.wed2"></td>
                <td><input type="radio" name="ay" value="0"v-model="content.wed2"></td>
            </tr>
            <tr>
                <td colspan="2">轮机长</td>
                <td><input type="radio" name="az" value="1"v-model="content.ljz1"></td>
                <td><input type="radio" name="ba" value="1"v-model="content.ljz2"></td>
                <td><input type="radio" name="ba" value="0"v-model="content.ljz2"></td>
                <td><input type="radio" name="az" value="0"v-model="content.ljz1"></td>
                <td>环照灯</td>
                <td><input type="text" name="" v-model="content.hzd1"></td>
                <td><input type="radio" name="bb" value="1"v-model="content.hzd2"></td>
                <td><input type="radio" name="bb" value="2"v-model="content.hzd2"></td>
                <td><input type="radio" name="bb" value="0"v-model="content.hzd2"></td>
            </tr>
            <tr>
                <td colspan="2">大管轮</td>
                <td><input type="radio" name="bc" value="1"v-model="content.dgl1"></td>
                <td><input type="radio" name="bd" value="1"v-model="content.dgl2"></td>
                <td><input type="radio" name="bd" value="0"v-model="content.dgl2"></td>
                <td><input type="radio" name="bc" value="0"v-model="content.dgl1"></td>
                <td>号钟</td>
                <td><input type="text" name="" v-model="content.hz1"></td>
                <td><input type="radio" name="be" value="1"v-model="content.hz2"></td>
                <td><input type="radio" name="be" value="2"v-model="content.hz2"></td>
                <td><input type="radio" name="be" value="0"v-model="content.hz2"></td>
            </tr>
            <tr>
                <td colspan="2">二管轮</td>
                <td><input type="radio" name="bf" value="1"v-model="content.egl1"></td>
                <td><input type="radio" name="bg" value="1"v-model="content.egl2"></td>
                <td><input type="radio" name="bg" value="0"v-model="content.egl2"></td>
                <td><input type="radio" name="bf" value="0"v-model="content.egl1"></td>
                <td>号笛</td>
                <td><input type="text" name="" v-model="content.hj1"></td>
                <td><input type="radio" name="bh" value="1"v-model="content.hj2"></td>
                <td><input type="radio" name="bh" value="2"v-model="content.hj2"></td>
                <td><input type="radio" name="bh" value="3"v-model="content.hj2"></td>
            </tr>
            <tr>
                <td colspan="2" rowspan="2">四小证</td>
                <td colspan="2">应持证人数</td>
                <td colspan="2">实持证人数</td>
                <td rowspan="5">通导设备</td>
                <td>AIS</td>
                <td><input type="text" name="" v-model="content.ais1"></td>
                <td><input type="radio" name="bi" value="1"v-model="content.ais2"></td>
                <td><input type="radio" name="bi" value="2"v-model="content.ais2"></td>
                <td><input type="radio" name="bi" value="0"v-model="content.ais2"></td>
            </tr>
            <tr>                                  
                <td colspan="2"><input type="text" name="" v-model="content.numberOfLicensees"></td>
                <td colspan="2"><input type="text" name="" v-model="content.actualNumberOfLicensees"></td>
                <td>卫星</td>
                <td><input type="text" name="" v-model="content.wx1"></td>
                <td><input type="radio" name="bj" value="1"v-model="content.wx2"></td>
                <td><input type="radio" name="bj" value="2"v-model="content.wx2"></td>
                <td><input type="radio" name="bj" value="0"v-model="content.wx2"></td>
            </tr>
            <tr>
                <td colspan="4" class="tjbt">四、安全生产责任书（承诺书）签订情况</td>
                <td colspan="2"><input type="text" name="" v-model="content.productionSafety"></td>
                <td>单边带</td>
                <td><input type="text" name="" v-model="content.dbd1"></td>
                <td><input type="radio" name="bk" value="1"v-model="content.dbd2"></td>
                <td><input type="radio" name="bk" value="2"v-model="content.dbd2"></td>
                <td><input type="radio" name="bk" value="0"v-model="content.dbd2"></td>
            </tr>
            <tr>
                <td colspan="4" class="tjbt">五、财产人身保险落实情况</td>
                <td colspan="2"><input type="text" name="" v-model="content.implementationSituation"></td>
                <td>卫导</td>
                <td><input type="text" name="" v-model="content.wd1"></td>
                <td><input type="radio" name="bl" value="1"v-model="content.wd2"></td>
                <td><input type="radio" name="bl" value="2"v-model="content.wd2"></td>
                <td><input type="radio" name="bl" value="0"v-model="content.wd2"></td>
            </tr>
            <tr>
                <td colspan="4" class="tjbt">六、有无违章违法行为</td>
                <td colspan="2"><input type="text" name="" v-model="content.wrongIllegalAct"></td>
                <td>雷达</td>
                <td><input type="text" name="" v-model="content.ld1"></td>
                <td><input type="radio" name="bm" value="1"v-model="content.ld2"></td>
                <td><input type="radio" name="bm" value="2"v-model="content.ld2"></td>
                <td><input type="radio" name="bm" value="0"v-model="content.ld2"></td>
            </tr>
            <tr>
                <td colspan="2">船东签名</td>
                <td colspan="2"><input type="text" name="" v-model="content.ownerSignature"></td>
                <td colspan="2">是否编组编队</td>
                <td colspan="2"><input type="radio" name="ht" v-model="content.organizeFormation" value="1" class="yh">是<input type="radio" name="ht" v-model="content.organizeFormation" value="0" class="yh">否</td>
                <td colspan="2">是否按规定填写捕捞日志</td>
                <td colspan="2"><input type="radio" name="hy" v-model="content.fishingRequired" value="1" class="yh">是<input type="radio" name="hy" v-model="content.fishingRequired" value="0" class="yh">否</td>
            </tr>
            <tr>
                <td colspan="12" class="tjbt tjbt3">
                    <span>乡镇审核人：<input type="text" name="" v-model="content.townAuditor" style="width:20%;"></span>
                    <span class="tjbt2">乡镇盖章<input type="text" name="" style="width:20%;"></span>
                </td>                              
            </tr>
        </table>
    </div>
    <!-- ---------------------------------- -->
    <div style="height:600px;overflow:auto;" class="printOrder-datatjb" v-if="tx=='dayin'">
            <table width="100%" class="tjb">
                <caption><h2>渔船隐患自查统计表</h2></caption>
                <tr>
                    <td colspan="6" class="tjbt">一、船舶概况</td>
                    <td colspan="6" class="tjbt">七、安全设备情况</td>
                </tr>
                <tr>
                    <td colspan="2">船名号</td>
                    <td colspan="2"><input :placeholder="content.shipName" type="text" name="" v-model="content.shipName"></td>
                    <td>所有人</td>
                    <td><input :placeholder="content.ownerName" type="text" name="" v-model="content.ownerName"></td>
                    <td colspan="2" rowspan="2">类别</td>
                    <td rowspan="2">应配数量</td>
                    <td rowspan="2">合格</td>
                    <td rowspan="2">缺少</td>
                    <td rowspan="2">无</td>
                </tr>
                <tr>
                    <td colspan="2">主机功率</td>
                    <td colspan="2"><input :placeholder="content.hostPower" type="text" name="" v-model="content.hostPower"></td>
                    <td>吨位</td>
                    <td><input :placeholder="content.tonnage" type="text" name="" v-model="content.tonnage"></td>
                </tr>
                <tr>
                    <td colspan="6" class="tjbt">二、船舶证书情况（打钩）</td>
                    <td rowspan="4">救生设备</td>
                    <td>救生衣</td>
                    <td><input :placeholder="content.jsy1" type="text" name="" v-model="content.jsy1"></td>
                    <td><span>{{content.jsy2=='1'?'√':''}}</span></td>
                    <td><span>{{content.jsy2=='2'?'√':''}}</span></td>
                    <td><span>{{content.jsy2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                    <td>救生圈</td>
                    <td><input :placeholder="content.jsq1" type="text" name="" v-model="content.jsq1"></td>
                    <td><span>{{content.jsq2=='1'?'√':''}}</span></td>
                    <td><span>{{content.jsq2=='2'?'√':''}}</span></td>
                    <td><span>{{content.jsq2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">登记证书</td>
                    <td><span>{{content.dengji1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dengJi2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dengJi2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.dengji1=='0'?'√':''}}</span> </td>
                    <td>救生筏</td>
                    <td><input :placeholder="content.jsf1" type="text" name="" v-model="content.jsf1"></td>
                    <td><span>{{content.jsf2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.jsf2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.jsf2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">船检证书</td>
                    <td><span>{{content.chuanJian1=='1'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian2=='1'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian2=='0'?'√':''}}</span></td>
                    <td><span>{{content.chuanJian1=='0'?'√':''}}</span></td>
                    <td>灭火器</td>
                    <td><input :placeholder="content.mhq1" type="text" name="" v-model="content.mhq1"></td>
                    <td><span>{{content.mhq2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.mhq2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.mhq2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">捕捞许可证</td>
                    <td><span>{{content.bulao1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.bulao2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.bulao2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.bulao1=='0'?'√':''}}</span> </td>
                    <td rowspan="3">消防设备</td>
                    <td>灭火弹</td>
                    <td><input :placeholder="content.mhd1" type="text" name="" v-model="content.mhd1"></td>
                    <td><span>{{content.mhd2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.mhd2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.mhd2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">航行签证薄</td>
                    <td><span>{{content.qianZheng1=='1'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng2=='1'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng2=='0'?'√':''}}</span></td>
                    <td><span>{{content.qianZheng1=='0'?'√':''}}</span></td>
                    <td>黄沙箱</td>
                    <td><input :placeholder="content.hsx1" type="text" name="" v-model="content.hsx1"></td>
                    <td><span>{{content.hsx2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.hsx2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.hsx2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="6" class="tjbt">三、船员特证情况（打钩）</td>
                    <td>消防桶</td>
                    <td><input :placeholder="content.xft1" type="text" name="" v-model="content.xft1"></td>
                    <td><span>{{content.xft2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.xft2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.xft2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">类别</td>
                    <td>有</td>
                    <td>有效</td>
                    <td>无效</td>
                    <td>无</td>
                    <td rowspan="7">信号设备</td>
                    <td>桅灯</td>
                    <td><input :placeholder="content.wde1" type="text" name="" v-model="content.wde1"></td>
                    <td><span>{{content.wde2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.wde2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.wde2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">船长</td>
                    <td><span>{{content.cz1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.cz2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.cz2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.cz1=='0'?'√':''}}</span> </td>
                    <td>舷灯</td>
                    <td><input :placeholder="content.xd1" type="text" name="" v-model="content.xd1"></td>
                    <td><span>{{content.xd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.xd2=='2'?'√':''}}</span></td>
                    <td><span>{{content.xd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">大副</td>
                    <td><span>{{content.df1=='1'?'√':''}}</span></td>
                    <td><span>{{content.df2=='1'?'√':''}}</span></td>
                    <td><span>{{content.df2=='0'?'√':''}}</span></td>
                    <td><span>{{content.df1=='0'?'√':''}}</span></td>
                    <td>锚灯</td>
                    <td><input :placeholder="content.zd1" type="text" name="" v-model="content.zd1"></td>
                    <td><span>{{content.zd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.zd2=='2'?'√':''}}</span></td>
                    <td><span>{{content.zd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">二副</td>
                    <td><span>{{content.ef1=='1'?'√':''}}</span></td>
                    <td><span>{{content.ef2=='1'?'√':''}}</span></td>
                    <td><span>{{content.ef2=='0'?'√':''}}</span></td>
                    <td><span>{{content.ef1=='0'?'√':''}}</span></td>
                    <td>尾灯</td>
                    <td><input :placeholder="content.wed1" type="text" name="" v-model="content.wed1"></td>
                    <td><span>{{content.wed2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.wed2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.wed2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">轮机长</td>
                    <td><span>{{content.ljz1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.ljz2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.ljz2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.ljz1=='0'?'√':''}}</span> </td>
                    <td>环照灯</td>
                    <td><input :placeholder="content.hzd1" type="text" name="" v-model="content.hzd1"></td>
                    <td><span>{{content.hzd2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.hzd2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.hzd2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="2">大管轮</td>
                    <td><span>{{content.dgl1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dgl2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.dgl2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.dgl1=='0'?'√':''}}</span> </td>
                    <td>号钟</td>
                    <td><input :placeholder="content.hz1" type="text" name="" v-model="content.hz1"></td>
                    <td><span>{{content.hz2=='1'?'√':''}}</span></td>
                    <td><span>{{content.hz2=='2'?'√':''}}</span></td>
                    <td><span>{{content.hz2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">二管轮</td>
                    <td><span>{{content.egl1=='1'?'√':''}}</span> </td>
                    <td><span>{{content.egl2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.egl2=='0'?'√':''}}</span> </td>
                    <td><span>{{content.egl1=='0'?'√':''}}</span> </td>
                    <td>号笛</td>
                    <td><input :placeholder="content.hj1" type="text" name="" v-model="content.hj1"></td>
                    <td><span>{{content.hj2=='1'?'√':''}}</span></td>
                    <td><span>{{content.hj2=='2'?'√':''}}</span></td>
                    <td><span>{{content.hj2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2" rowspan="2">四小证</td>
                    <td colspan="2">应持证人数</td>
                    <td colspan="2">实持证人数</td>
                    <td rowspan="5">通导设备</td>
                    <td>AIS</td>
                    <td><input :placeholder="content.ais1" type="text" name="" v-model="content.ais1"></td>
                    <td><span>{{content.ais2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.ais2=='2'?'√':''}}</span>  </td>
                    <td><span>{{content.ais2=='0'?'√':''}}</span>  </td>
                </tr>
                <tr>                                  
                    <td colspan="2"><input :placeholder="content.numberOfLicensees" type="text" name="" v-model="content.numberOfLicensees"></td>
                    <td colspan="2"><input :placeholder="content.actualNumberOfLicensees" type="text" name="" v-model="content.actualNumberOfLicensees"></td>
                    <td>卫星</td>
                    <td><input :placeholder="content.wx1" type="text" name="" v-model="content.wx1"></td>
                    <td><span>{{content.wx2=='1'?'√':''}}</span> </td>
                    <td><span>{{content.wx2=='2'?'√':''}}</span> </td>
                    <td><span>{{content.wx2=='0'?'√':''}}</span> </td>
                </tr>
                <tr>
                    <td colspan="4" class="tjbt">四、安全生产责任书（承诺书）签订情况</td>
                    <td colspan="2"><input :placeholder="content.productionSafety" type="text" name="" v-model="content.productionSafety"></td>
                    <td>单边带</td>
                    <td><input :placeholder="content.dbd1" type="text" name="" v-model="content.dbd1"></td>
                    <td><span>{{content.dbd2=='1'?'√':''}}</span>  </td>
                    <td><span>{{content.dbd2=='2'?'√':''}}</span>  </td>
                    <td><span>{{content.dbd2=='0'?'√':''}}</span>  </td>
                </tr>
                <tr>
                    <td colspan="4" class="tjbt">五、财产人身保险落实情况</td>
                    <td colspan="2"><input :placeholder="content.implementationSituation" type="text" name="" v-model="content.implementationSituation"></td>
                    <td>卫导</td>
                    <td><input :placeholder="content.wd1" type="text" name="" v-model="content.wd1"></td>
                    <td><span>{{content.wd2=='1'?'√':''}}</span></td>
                    <td><span>{{content.wd2=='2'?'√':''}}</span></td>
                    <td><span>{{content.wd2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="4" class="tjbt">六、有无违章违法行为</td>
                    <td colspan="2"><input :placeholder="content.wrongIllegalAct" type="text" name="" v-model="content.wrongIllegalAct"></td>
                    <td>雷达</td>
                    <td><input :placeholder="content.ld1" type="text" name="" v-model="content.ld1"></td>
                    <td><span>{{content.ld2=='1'?'√':''}}</span></td>
                    <td><span>{{content.ld2=='2'?'√':''}}</span></td>
                    <td><span>{{content.ld2=='0'?'√':''}}</span></td>
                </tr>
                <tr>
                    <td colspan="2">船东签名</td>
                    <td colspan="2"><input :placeholder="content.ownerSignature" type="text" name="" v-model="content.ownerSignature"></td>
                    <td colspan="2">是否编组编队</td>
                    <td colspan="2"><span>{{content.organizeFormation=='1'?'√':''}}</span>是   <span>{{content.organizeFormation=='0'?'√':''}}</span>否</td>
                    <td colspan="2">是否按规定填写捕捞日志</td>
                    <td colspan="2"><span>{{content.fishingRequired=='1'?'√':''}}</span>是   <span>{{content.fishingRequired=='0'?'√':''}}</span>否</td>
                </tr>
                <tr>
                    <td colspan="12" class="tjbt tjbt3">
                        <span>乡镇审核人：<input :placeholder="content.townAuditor" type="text" name="" v-model="content.townAuditor" style="width:20%;"></span>
                        <span class="tjbt2">乡镇盖章<input  type="text" name="" style="width:20%;"></span>
                    </td>                              
                </tr>
            </table>
        </div>
    <div slot="footer">
            <Button size="large" @click="cancel()">取消</Button>
        <Button type="info" size="large" v-show="tx=='add'" @click="okTJB">保存</Button>
        <Button type="info" size="large" v-show="tx=='update'" @click="okTJB">保存</Button>
        <Button type="info" size="large" v-show="tx=='dayin'" @click="dayin">打印</Button>
    </div>     
</Modal>
</template>
<script>
import {isNull } from '@/libs/common.js'
import {saveEntity } from '@/api/request.js'
export default {
    name:"aqzrsModel",
    props:{
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
            type: [Object, String],
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
            yinhuan:{
                id:"",
                parameteFileId:"",//台账案卷ID，外
                type:"fishingboat",
                name:"渔船隐患自查统计表",
                content:{},         
            },
            content:{
                shipName:"",
                ownerName:"",
                hostPower:"",
                tonnage:"",
                dengji1:"",
                dengJi2:"",
                chuanJian1:"",
                chuanJian2:"",
                bulao1:"",
                bulao2:"",
                qianZheng1:"",
                qianZheng2:"",
                jsy1:"",
                jsy2:"",
                jsq1:"",
                jsq2:"",
                jsf1:"",
                jsf2:"",
                mhq1:"",
                mhq2:"",
                mhd1:"",
                mhd2:"",
                hsx1:"",
                hsx2:"",
                xft1:"",
                xft2:"",
                cz1:"",
                cz2:"",
                df1:"",
                df2:"",
                ef1:"",
                ef2:"",
                ljz1:"",
                ljz2:"",
                dgl1:"",
                dgl2:"",
                egl1:"",
                egl2:"",
                wde1:"",
                wde2:"",
                xd1:"",
                xd2:"",
                zd1:"",
                zd2:"",
                wed1:"",
                wed2:"",
                hzd1:"",
                hzd2:"",
                hz1:"",
                hz2:"",
                hj1:"",
                hj2:"",
                numberOfLicensees:"",
                actualNumberOfLicensees:"",
                ais1:"",
                ais2:"",
                wx1:"",
                wx2:"",
                dbd1:"",
                dbd2:"",
                ld1:"",
                ld2:"",
                wd1:"",
                wd2:"",
                productionSafety:"",
                implementationSituation:"",
                wrongIllegalAct:"",
                ownerSignature:"",
                organizeFormation:"",
                fishingRequired:"",
                townAuditor:"",
                townsSealed:""
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
            console.log(window.location,"好的佛啊");
            var newstr = document.getElementsByClassName('printOrder-datatjb')[0].innerHTML
            document.body.innerHTML = newstr
            window.print()
            // 重新加载页面，以刷新数据
            window.location.reload()
        },
        cancel(){
            this.visible=false;
            this.$emit("input",this.visible);
            this.$emit("on-ok");
        },
        okTJB(){
            var _self=this;
            _self.yinhuan.content=JSON.stringify(_self.content);
            if(isNull(_self.yinhuan.parameteFileId)){
                _self.yinhuan.id=_self.sID;
                _self.yinhuan.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.yinhuan)
                .then(res => {
                    //console.log(res,"你好世界");
                    if(res.success){
                        _self.visible=false;
                        _self.$emit("input",_self.visible);
                        _self.$emit("on-ok");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            }else{
                _self.yinhuan.parameteFileId=_self.parameteFileId;
                _self.$http
                .post("standingbook/word/table/save",_self.yinhuan)
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
        search(){
            var _self=this;
            if(_self.tx=="update"||_self.tx=="dayin"){
                var id=_self.sID;
                console.log(_self.sID,"子id222");
                _self.$http.get("/standingbook/word/table/"+id)
                .then(res=>{
                    if(res.success){
                        //console.log("信息下载成功");
                        _self.yinhuan=res.data;
                        _self.content=JSON.parse(res.data.content);
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
                
                _self.content={};
                _self.content.shipName=_self.shipName;
                _self.content.ownerName=_self.ownerName;
                _self.yinhuan.id="";
            }
        },
    },
    watch:{
        value(val){
            this.visible=val;
            if(val)
                this.search();
            else 
                this.yinhuan.parameteFileId=null;
        }
    }
}
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