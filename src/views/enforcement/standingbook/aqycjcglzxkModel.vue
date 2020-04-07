<!--渔船基层管理组织专项库-->
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
            @on-visible-change="visibleChange">
            <div style="height:600px;overflow:auto;">
                <table style="width:100%;" class="zxk">
                    <caption><h2>渔船基层管理组织专项库</h2></caption>
                    <tr>
                        <td rowspan="2">县（市、区）</td>
                        <td rowspan="2">乡镇（街道）</td>
                        <td rowspan="2" colspan="2">渔船基层管理组织名称</td>
                        <td rowspan="2" colspan="2">统一社会信用代码/注册号</td>
                        <td rowspan="2">负责人</td>
                        <td rowspan="2">联系方式</td>
                        <td rowspan="2">联系地址</td>
                        <td colspan="3">所辖渔船数量</td>
                    </tr>
                    <tr>
                        <td>60马力以上</td>
                        <td>60马力以下</td>
                        <td>应查数</td>
                    </tr>
                    <tr>
                        <td>市本级</td>
                        <td>临城街道</td>
                        <td colspan="2">临城街道办事处</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td rowspan="31">普陀区</td>
                        <td>白沙乡</td>
                        <td colspan="2">白沙管委会白沙渔船管理服务站</td>
                        <td colspan="2">M5133090300354350I</td>
                        <td>宋军波</td>
                        <td>13967208430</td>
                        <td>白沙岛后沙头68号</td>
                        <td>39</td>
                        <td>16</td>
                        <td>55</td>
                    </tr>
                    <tr>
                        <td>东港街道</td>
                        <td colspan="2">东港街道渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td rowspan="3">东极镇</td>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td rowspan="6">六横镇</td>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td>蚂蚁岛乡</td>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td rowspan="4">沈家门街道</td>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td colspan="2">东极镇东青渔船管理服务站</td>
                        <td colspan="2">11330900002637769A</td>
                        <td>李侠</td>
                        <td>0580-2299061</td>
                        <td>海景道528号</td>
                        <td>18</td>
                        <td>22</td>
                        <td>40</td>
                    </tr>
                    <tr>
                        <td rowspan="3">桃花镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>

                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="5">虾峙镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2">展茅街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="5">朱家尖街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="10">定海区</td>
                        <td>白泉镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>岑港街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>干览镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>环南街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="4">金塘镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>小沙街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>盐仓街道</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="42">岱山县</td>
                        <td>岱东镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>岱西镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>东沙镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="12">高亭镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="22">衢山镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>秀山乡</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="4">长涂镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="43">嵊泗县</td>
                        <td rowspan="18">菜园镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="7">枸杞乡</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="2">花鸟乡</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="4">黄龙乡</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="7">嵊山镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td rowspan="4">五龙乡</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>洋山镇</td>
                        <td colspan="2">桃花镇沙岙渔船管理服务站</td>
                        <td colspan="2">52330903092336512U</td>
                        <td>施峰艳</td>
                        <td>13567694281</td>
                        <td>普陀区桃花镇沙岙村</td>
                        <td>37</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
                <Button type="success" size="large"  @click="okZXK">保存</Button>
            </div>
        </Modal>
    </template>
    
    <script>
    export default {
        name: "aqycjcglzxkModal",
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
            unid: {
                type: String,
                default: ""
            },
            shipId: {
                type: String,
                default: ""
            },
            nametheShip: {
                type: String,
                default: ""
            }
        },
        data () {
            return {
                visible: this.value,
                modalZXK:{
                    xsj:"",//县(市、区)
                    xzjd:"",//乡镇(街道)
                    ycjcglmc:"",//渔船基层管理组织名称
                    xydm:"",//统一社会信用代码/注册号
                    head:"",//负责人
                    phone:"",//联系方式
                    address:"",//联系地址
                    path:"",//路径地址
                    parentId:"",
                    note:"",//备注
                }
            };
        },
        methods: {
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
            okZXK(){
                this.$http
                .post("/basic/management/database",this.modalZXK)
                .then(res => {
                    console.log(res,"你好");
                    if(res.code>0){
                        this.value=false;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
            },
            search(){
                this.$emit("inputZXK",this.value);
            },
        },
        watch:{
            value(val){
                this.visible=this.value;
                this.search();
            }
        }
    };
    </script>
<style scoped>
    table.zxk{
    border-collapse: collapse;
    margin-bottom: 10px;
    }
    /*船员安全责任书签署现场照片PIC*/
    table.zxk td{
    border:1px solid black;
    width:70px;
    height:32px;
    text-align:center;
    }
    table.zxk input{
    border:none;
    outline:none;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
    }
    </style> 
    
    