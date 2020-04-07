<!-- 渔业船舶安全管理台州案卷 -->
<style lang="less">
        @import "../../../styles/commonStyle.less";
</style>
<template>
            <div>
                <Card>
                    <Row style="margin-bottom: 10px;">       
                            <label>渔船名：&nbsp;&nbsp;</label>
                            <input  v-model="query.wheres.shipName"  placeholder="请输入..." style="width:300px" class="selec ivu-input"  id="input-line">  
                            <Button @click="handleSearch(1)" type="info" icon="ios-search" shape="circle">搜索</Button>
                            <Button @click="handleReset()" type="warning">重置</Button>
                            <Button @click="modelAdd = true" type="primary">新增</Button>
                    </Row>
                    <Row>
                        <Table   
                            height="450" 
                            border 
                            :columns="columns"  
                            :data="dataList" 
                            :loading="false"
                        ></Table>
                    </Row>
                    <Row>
                        <div class="bottom">
                            <Page 
                                :current="query.page" 
                                :page-size="query.size"
                                :total="totalNum"
                                @on-page-size-change="pageSizeChange"
                                @on-change="changePage"
                            ></Page>
                        </div>
                    </Row> 
                    <!--新增-->
                    <Modal :styles="{top: '220px'}" v-model="modelAdd" title="新增" width="50%" >
                        <Form :label-width="80" >
                            <Row>
                                <Col span="12">
                                    <FormItem label="渔船名:" >
                                            <Input v-model="formLeft.shipName"/>
                                    </FormItem>
                                </Col>   
                                <Col span="12">
                                    <FormItem label="船东名:"  >
                                            <Input v-model="formLeft.ownerName"/>
                                    </FormItem>
                                </Col>                 
                            </Row>
                            <Row >
                                <Col span="12">
                                    <FormItem label="作业类型:">
                                            <Input v-model="formLeft.jobType"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话:" >
                                            <Input v-model="formLeft.phone"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                                <Col span="12">
                                    <FormItem label="年度:" >
                                                <DatePicker type="year" v-model="formLeft.theAnnual" placeholder="选择年" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="机构:" >
                                            <Input v-model="formLeft.institutions"/>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>	
                        <div slot="footer">
                            <Button @click="modelAdd = false">取消</Button>
                            <Button @click="add()">保存</Button>
                        </div>         
                    </Modal>
                    <!--修改-->
                    <Modal :styles="{top: '220px'}" v-model="modelUpdate" title="修改" width="50%" >
                        <Form :label-width="80" >
                            <Row>
                                <Col span="12">
                                    <FormItem label="渔船名:" >
                                            <Input v-model="formLeft.shipName"/>
                                    </FormItem>
                                </Col>   
                                <Col span="12">
                                    <FormItem label="船东名:"  >
                                            <Input v-model="formLeft.ownerName"/>
                                    </FormItem>
                                </Col>                 
                            </Row>
                            <Row >
                                <Col span="12">
                                    <FormItem label="作业类型:">
                                            <Input v-model="formLeft.jobType"/>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系电话:" >
                                            <Input v-model="formLeft.phone"/>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row >
                                <Col span="12">
                                    <FormItem label="年度:" >
                                            <DatePicker type="year" v-model="formLeft.theAnnual" placeholder="选择年" style="width: 100%"></DatePicker>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="机构:" >
                                            <Input v-model="formLeft.institutions"/>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>	
                        <div slot="footer">
                            <Button @click="modelUpdate = false">取消</Button>
                            <Button @click="update()">保存</Button>
                        </div>         
                    </Modal>
                    <!--详情-->
                    <Modal :styles="{top:'220px'}" v-model="modelDetail" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <Row>
                                <Col span="12" v-for="(v,i) in detailList" :key="i"> 
                                    <Button type="success" size="small" @click="showModal(i)">添加</Button><span style="font-size:14px;margin-left:15px;">{{v.item}}</span>
                                    <Table
                                        height="200"                         
                                        :columns="detailTable"
                                        :data="ddtList"
                                        :loading="false"
                                    >                               
                                    </Table> 
                                </Col>                               
                            </Row>   
                        </div>                               
                    </Modal>
                    <!--详情-详情(承诺书)-->
                    <Modal v-model="detailPM" title="详情" width="40%" >
                        <form>
                            <div id="promiseB">
                                <h1>渔业渔船安全生产承诺书</h1>
                                <h4>渔船船东(船长)安全生产承诺书</h4>
                                <div>
                                    <p>本人是_____县_____镇，身份证号码：______________,属浙_____渔_____船主（船长）；我特向合作社（公司）作如下承诺：</p>
                                    <p>一、渔船方面：做到船体、动力和船舵常看常保，一发现存有不适航，坚决停航、停行。船上安全生产设施配置：已按检验证书上规定已配齐。船主须主动向船检部门申请渔船检验。渔船主持检验证书、登记证书、捕捞许可证、职务船员驾驶证上岗。</p>
                                    <p>二、渔船航行：严格遵守《中华人民共和国内河避碰规则》和水上安全管理条例，做到：</p>
                                    <p>1、渔船航行时必须经穿好救生衣，不穿鞋工作。2、经常瞭望，锚泊时加强值班，值班人员不擅自离岗。3、有大风大浪大睡情况下，停航停产。4、捕捞渔船不载货载客营运，不从事与捕捞渔业生产无关的行业。</p>
                                    <p>三、渔业生产：遵守《中华人民共和国渔业法》、《中国水生生物养护行动纲要》以及渔业规章条例，做到：</p>
                                    <p>1、不刻意捕捉珍稀水生野生动物，无意捕获的立即放生，受伤的及时采取救护措施并向渔政部门报告。2、遵守禁渔期规定，参与资源养护和幼渔保护。3、不使用”一电四网“禁用渔具。4、不使用严重偏离最小网目尺寸标准渔具。5、不擅自改动作业类型、方式。6、及时申报船舶检验，办齐各种有效证书、证件；做到职务职责合格齐全，普通船员持证登船7、按规定配齐救生、消防和通讯导航等安全设备，不使用超期失效的安全设备。8、按规定及时办理渔船进出港报关签证，主动向驻港渔政机关汇报安全情况，未经签证和安全汇报</p>
                                    <p>7</p>
                                    <p>8</p>
                                    <p><Button>保存</Button></p>
                                </div>
                            </div>
                        </form>
                    </Modal>
                    <!--详情-详情(渔船安全登录检查表)-->
                    <Modal v-model="detailCB" title="详情" width="50%">
                            <div style="height:600px;overflow:auto;">
                                <table width="100%" class="regisbg">
                                    <caption><h1>渔船安全登录检查表</h1></caption>
                                    <caption>
                                        <b style="position:relative;right:200px;font-size:16px;">船名号: <input type="text" name="" v-model="modalCB.shipName"> </b>
                                        <span style="position:relative;left:200px;">
                                            检查时间:<input type="text" name="" v-model="modalCB.checkTime"/>
                                        </span>
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
                                        <td><input type="radio" value="1" v-model="modalCB.dengji1" name="aa"/></td>
                                        <td><input type="radio" value="1" v-model="modalCB.dengJi2" name="ab"/></td>
                                        <td><input type="radio" value="0" v-model="modalCB.dengJi2" name="ab"/></td>
                                        <td><input type="radio" value="0" v-model="modalCB.dengji1" name="aa"/></td>
                                        <td>航海签证薄</td>
                                        <td><input type="radio" value="1" v-model="modalCB.qianZheng1" name="ac"/></td>
                                        <td><input type="radio" value="1" v-model="modalCB.qianZheng2" name="ad"/></td>
                                        <td><input type="radio" value="0" v-model="modalCB.qianZheng2" name="ad"/></td>
                                        <td><input type="radio" value="0" v-model="modalCB.qianZheng1" name="ac"/></td>
                                    </tr>
                                    <tr>
                                        <td>船舶证书</td>
                                        <td><input type="radio" value="1" v-model="modalCB.chuanJian1" name="ae"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.chuanJian2" name="af"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.chuanJian2" name="af"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.chuanJian1" name="ae"></td>
                                        <td>捕捞日志（大中型以上填写）</td>
                                        <td><input type="radio" value="1" v-model="modalCB.blrz1" name="ag"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.blrz2" name="ah"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.blrz2" name="ah"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.blrz1" name="ag"></td>
                                    </tr>
                                    <tr>
                                        <td>捕捞许可证</td>
                                        <td><input type="radio" value="1" v-model="modalCB.bulao1" name="ai"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.bulao2" name="aj"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.bulao2" name="aj"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.bulao1" name="ai"></td>
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
                                        <td><input type="radio" value="1" v-model="modalCB.cz1" name="ak"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.cz2" name="al"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.cz2" name="al"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.cz1" name="ak"></td>
                                        <td>大管轮</td>
                                        <td><input type="radio" value="1" v-model="modalCB.dgl1" name="am"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.dgl2" name="an"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.dgl2" name="an"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.dgl1" name="am"></td>
                                    </tr>
                                    <tr>
                                        <td>大副</td>
                                        <td><input type="radio" value="1" v-model="modalCB.df1" name="ao"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.df2" name="ap"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.df2" name="ap"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.df1" name="ao"></td>
                                        <td>二管轮</td>
                                        <td><input type="radio" value="1" v-model="modalCB.egl1" name="aq"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.egl2" name="ar"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.egl2" name="ar"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.egl1" name="aq"></td>
                                    </tr>
                                    <tr>
                                        <td>二副</td>
                                        <td><input type="radio" value="1" v-model="modalCB.ef1" name="as"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.ef2" name="at"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.ef2" name="at"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.ef1" name="as"></td>
                                        <td rowspan="2">四小证</td>
                                        <td colspan="2">应持征人数</td>
                                        <td colspan="2">实持征人数</td>
                                    </tr>
                                    <tr>
                                        <td>轮机长</td>
                                        <td><input type="radio" value="1" v-model="modalCB.ljz1" name="au"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.ljz2" name="av"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.ljz2" name="av"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.ljz1" name="au"></td>
                                        <td colspan="2"><input type="text" name="" v-model="modalCB.numberOfLicensees"></td>
                                        <td colspan="2"><input type="text" name="" v-model="modalCB.actualNumberOfLicensees"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="zuo">三、救生消防设备情况</td>
                                        <td colspan="4" class="zuo">四、信号设备情况</td>
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
                                        <td><input type="text" name="" v-model="modalCB.jsy"></td>
                                        <td><input type="text" name="" v-model="modalCB.jsy1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.jsy2" name="aw"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.jsy2" name="aw"></td>
                                        <td>桅灯</td>
                                        <td><input type="text" name="" v-model="modalCB.wde"></td>
                                        <td><input type="text" name="" v-model="modalCB.wde1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.wde2" name="bc"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.wde2" name="bc"></td>
                                    </tr>
                                    <tr>
                                        <td>救生圈</td>
                                        <td><input type="text" name="" v-model="modalCB.jsq"></td>
                                        <td><input type="text" name="" v-model="modalCB.jsq1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.jsq2" name="ay"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.jsq2" name="ay"></td>
                                        <td>舷灯</td>
                                        <td><input type="text" name="" v-model="modalCB.xd"></td>
                                        <td><input type="text" name="" v-model="modalCB.xd1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.xd2" name="bd"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.xd2" name="bd"></td>
                                    </tr>
                                    <tr>
                                        <td>灭火器</td>
                                        <td><input type="text" name="" v-model="modalCB.mhq"></td>
                                        <td><input type="text" name="" v-model="modalCB.mhq1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.mhq2" name="ba"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.mhq2" name="ba"></td>
                                        <td>锚灯</td>
                                        <td><input type="text" name="" v-model="modalCB.zd"></td>
                                        <td><input type="text" name="" v-model="modalCB.zd1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.zd2" name="be"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.zd2" name="be"></td>
                                    </tr>
                                    <tr>
                                        <td>救生筏</td>
                                        <td><input type="text" name="" v-model="modalCB.jsf"></td>
                                        <td><input type="text" name="" v-model="modalCB.jsf1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.jsf2" name="az"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.jsf2" name="az"></td>
                                        <td>尾灯</td>
                                        <td><input type="text" name="" v-model="modalCB.wed"></td>
                                        <td><input type="text" name="" v-model="modalCB.wed1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.wed2" name="bf"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.wed2" name="bf"></td>
                                    </tr>
                                    <tr>
                                        <td>烟火信号</td>
                                        <td><input type="text" name="" v-model="modalCB.yhxh"></td>
                                        <td><input type="text" name="" v-model="modalCB.yhxh1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.yhxh2" name="bb"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.yhxh2" name="bb"></td>
                                        <td>雾灯</td>
                                        <td><input type="text" name="" v-model="modalCB.wd"></td>
                                        <td><input type="text" name="" v-model="modalCB.wd1"></td>
                                        <td><input type="radio" value="1" v-model="modalCB.wd2" name="bg"></td>
                                        <td><input type="radio" value="0" v-model="modalCB.wd2" name="bg"></td>
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
                                            <td><input type="text" name="" v-model="modalCB.AIS"></td>
                                            <td><input type="text" name="" v-model="modalCB.ais1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.ais2" name="bh"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.ais2" name="bh"></td>
                                            <td>单边带</td>
                                            <td><input type="text" name="" v-model="modalCB.dbd"></td>
                                            <td><input type="text" name="" v-model="modalCB.dbd1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.dbd2" name="bi"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.dbd2" name="bi"></td>
                                        </tr>
                                        <tr>
                                            <td>北斗导航</td>
                                            <td><input type="text" name="" v-model="modalCB.bd"></td>
                                            <td><input type="text" name="" v-model="modalCB.bd1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.bd2" name="bj"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.bd2" name="bj"></td>
                                            <td>卫导</td>
                                            <td><input type="text" name="" v-model="modalCB.wda"></td>
                                            <td><input type="text" name="" v-model="modalCB.wda1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.wda2" name="bk"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.wda2" name="bk"></td>
                                        </tr>
                                        <tr>
                                            <td>VHF</td>
                                            <td><input type="text" name="" v-model="modalCB.VHF"></td>
                                            <td><input type="text" name="" v-model="modalCB.VHF1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.VHF2" name="bl"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.VHF2" name="bl"></td>
                                            <td>雷达</td>
                                            <td><input type="text" name="" v-model="modalCB.ld"></td>
                                            <td><input type="text" name="" v-model="modalCB.ld1"></td>
                                            <td><input type="radio" value="1" v-model="modalCB.ld2" name="bm"></td>
                                            <td><input type="radio" value="0" v-model="modalCB.ld2" name="bm"></td>
                                        </tr>
                                    <tr>
                                        <td colspan="10" class="zuo liu">
                                            <span>六、整改措施</span>
                                            <textarea name="" id="" cols="130" rows="3" v-model="modalCB.correctiveActions">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo asperiores debitis placeat, iure illum dolorum dolores consequuntur, facilis esse, voluptates nulla expedita aliquam omnis quia quaerat! Minus delectus veritatis perspiciatis.
                                            </textarea>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" class="zuo">检查人员：<input type="text" name="" v-model="modalCB.inspectors"/></td>
                                        <td colspan="5" class="you">
                                            年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5" class="zuo">船东签名：<input type="text" name="" v-model="modalCB.ownerSignature"/></td>
                                        <td colspan="5" class="you">
                                            年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            月&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日
                                        </td>
                                    </tr>
                                </table>
                                <P><button @click="okCB">保存</button></P>
                            </div>
                    </Modal>
                    <!--详情-详情(责令改正通知书)-->
                    <Modal v-model="detailIF" title="详情" width="50%">
                        <form>
                            <div id="detailIF">
                                <h1>责令改正通知书</h1>
                                <div>
                                    <span>________________：</span>
                                    <p>你（单位）未按规定配齐职务船员（船长、轮机长），违反了《中华人民共和国渔业港航监督行政处罚规定》，依据《中华人民共和国渔业港航监督行政处罚规定》第二十二条规定，本机关责令你（单位）立即返港，改正下列违法行为：</p>
                                    <p>一、按规定配齐职务船员（船长、轮机长）。</p>
                                    <p>逾期不改正的，本机关将依法处理。</p>
                                    <p class="pp">处罚机关（印章）</p>
                                    <p class="pp">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>                              
                                </div>
                            </div>
                        </form>
                    </Modal>
                    <!--详情-详情(渔业船舶检验证书)-->
                    <Modal v-model="detailCHB" title="详情" width="50%">
                            <div style="height:600px;overflow:auto;">
                                <table>
                                   <caption>中华人名</caption> 
                                </table>
                            </div>
                    </Modal>
                    <!--详情-详情(渔船安全登船检查表)-->
                    <Modal v-model="detailJCB" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="ycaqdljcb">
                                <caption><h2>渔船安全登船检查表</h2></caption>
                                <tr>
                                    <td>船名号</td>
                                    <td><input type="text" name=""></td>
                                    <td>持证人</td>
                                    <td><input type="text" name=""></td>
                                    <td>检查时间</td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>住址</td>
                                    <td colspan="3"><input type="text" name=""></td>
                                    <td>联系电话</td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr class="jc">
                                    <td colspan="6">
                                            船舶核实情况：船长37.5、型宽6.8、型深3.6、总吨位126、主机型号619ZLCA2-1、马力330千瓦、建造日期2012-10-23；建造船厂；温岭市船舶修造实业有限公司。
                                    </td>
                                </tr>
                                <tr class="jc">
                                    <td colspan="6">
                                        登船检查以下情况：救生衣、救生圈、救生筏、灭火器、烟火信号弹、救生消防设备、通导设备、信号设备、船舶证书情况、船员持证等。
                                        救生筏安装情况和有效期。
                                    </td>
                                </tr>
                                <tr class="jc">
                                    <td colspan="6">
                                        处理情况：
                                    </td>
                                </tr>
                                <tr class="jcjc">
                                    <td colspan="3"><img src="#" alt="暂无照片"></td>
                                    <td colspan="3"><img src="#" alt="暂无照片"></td>
                                </tr>
                                <tr class="jc">
                                    <td colspan="3">
                                        <p>检查人员：</p>
                                        <span>时间：&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</span>   
                                    </td>
                                    <td colspan="3">
                                        <p>合作社负责人签字：</p>
                                        <p>（盖章）</p>
                                        <span>时间：&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</span>   
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </Modal>
                    <!--详情-详情(渔船隐患自查统计表)-->
                    <Modal v-model="detailTJB" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="tjb">
                                <caption><h2>渔船隐患自查统计表</h2></caption>
                                <tr>
                                    <td colspan="6">一、船舶概况</td>
                                    <td colspan="6">七、安全设备情况</td>
                                </tr>
                                <tr>
                                    <td colspan="2">船名号</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.shipName"></td>
                                    <td>所有人</td>
                                    <td><input type="text" name="" v-model="yinhuan.ownerName"></td>
                                    <td colspan="2" rowspan="2">类别</td>
                                    <td rowspan="2">应配数量</td>
                                    <td rowspan="2">合格</td>
                                    <td rowspan="2">缺少</td>
                                    <td rowspan="2">无</td>
                                </tr>
                                <tr>
                                    <td colspan="2">主机功率</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.hostPower"></td>
                                    <td>吨位</td>
                                    <td><input type="text" name="" v-model="yinhuan.tonnage"></td>
                                </tr>
                                <tr>
                                    <td colspan="6">二、船舶证书情况（打钩）</td>
                                    <td rowspan="4">救生设备</td>
                                    <td>救生衣</td>
                                    <td><input type="text" name="" v-model="yinhuan.jsy1"></td>
                                    <td><input type="radio" name="ab" value="1" v-model="yinhuan.jsy2"></td>
                                    <td><input type="radio" name="ab" value="2" v-model="yinhuan.jsy2"></td>
                                    <td><input type="radio" name="ab" value="0" v-model="yinhuan.jsy2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">类别</td>
                                    <td>有</td>
                                    <td>有效</td>
                                    <td>无效</td>
                                    <td>无</td>
                                    <td>救生圈</td>
                                    <td><input type="text" name="" v-model="yinhuan.jsq1"></td>
                                    <td><input type="radio" name="aa" value="1" v-model="yinhuan.jsq2"></td>
                                    <td><input type="radio" name="aa" value="2" v-model="yinhuan.jsq2"></td>
                                    <td><input type="radio" name="aa" value="0" v-model="yinhuan.jsq2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">登记证书</td>
                                    <td><input type="radio" name="ac" value="1" v-model="yinhuan.dengji1"></td>
                                    <td><input type="radio" name="ad" value="1" v-model="yinhuan.dengJi2"></td>
                                    <td><input type="radio" name="ad" value="0" v-model="yinhuan.dengJi2"></td>
                                    <td><input type="radio" name="ac" value="0" v-model="yinhuan.dengji1"></td>
                                    <td>救生筏</td>
                                    <td><input type="text" name="" v-model="yinhuan.jsf1"></td>
                                    <td><input type="radio" name="ae" value="1" v-model="yinhuan.jsf2"></td>
                                    <td><input type="radio" name="ae" value="2" v-model="yinhuan.jsf2"></td>
                                    <td><input type="radio" name="ae" value="0" v-model="yinhuan.jsf2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">船检证书</td>
                                    <td><input type="radio" name="af" value="1" v-model="yinhuan.chuanJian1"></td>
                                    <td><input type="radio" name="ag" value="1" v-model="yinhuan.chuanJian2"></td>
                                    <td><input type="radio" name="ag" value="0" v-model="yinhuan.chuanJian2"></td>
                                    <td><input type="radio" name="af" value="0" v-model="yinhuan.chuanJian1"></td>
                                    <td>灭火器</td>
                                    <td><input type="text" name="" v-model="yinhuan.mhq1"></td>
                                    <td><input type="radio" name="ah" value="1" v-model="yinhuan.mhq2"></td>
                                    <td><input type="radio" name="ah" value="2" v-model="yinhuan.mhq2"></td>
                                    <td><input type="radio" name="ah" value="0" v-model="yinhuan.mhq2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">捕捞许可证</td>
                                    <td><input type="radio" name="ai" value="1" v-model="yinhuan.bulao1"></td>
                                    <td><input type="radio" name="aj" value="1" v-model="yinhuan.bulao2"></td>
                                    <td><input type="radio" name="aj" value="0" v-model="yinhuan.bulao2"></td>
                                    <td><input type="radio" name="ai" value="0" v-model="yinhuan.bulao1"></td>
                                    <td rowspan="3">消防设备</td>
                                    <td>灭火弹</td>
                                    <td><input type="text" name="" v-model="yinhuan.mhd1"></td>
                                    <td><input type="radio" name="ak" value="1" v-model="yinhuan.mhd2"></td>
                                    <td><input type="radio" name="ak" value="2" v-model="yinhuan.mhd2"></td>
                                    <td><input type="radio" name="ak" value="0" v-model="yinhuan.mhd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">航行签证薄</td>
                                    <td><input type="radio" name="al" value="1" v-model="yinhuan.qianZheng1"></td>
                                    <td><input type="radio" name="am" value="1" v-model="yinhuan.qianZheng2"></td>
                                    <td><input type="radio" name="am" value="0" v-model="yinhuan.qianZheng2"></td>
                                    <td><input type="radio" name="al" value="0" v-model="yinhuan.qianZheng1"></td>
                                    <td>黄沙箱</td>
                                    <td><input type="text" name="" v-model="yinhuan.hsx1"></td>
                                    <td><input type="radio" name="an" value="1" v-model="yinhuan.hsx2"></td>
                                    <td><input type="radio" name="an" value="2" v-model="yinhuan.hsx2"></td>
                                    <td><input type="radio" name="an" value="0" v-model="yinhuan.hsx2"></td>
                                </tr>
                                <tr>
                                    <td colspan="6">三、船员特证情况（打钩）</td>
                                    <td>消防桶</td>
                                    <td><input type="text" name="" v-model="yinhuan.xft1"></td>
                                    <td><input type="radio" name="ao" value="1" v-model="yinhuan.xft2"></td>
                                    <td><input type="radio" name="ao" value="2" v-model="yinhuan.xft2"></td>
                                    <td><input type="radio" name="ao" value="0" v-model="yinhuan.xft2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">类别</td>
                                    <td>有</td>
                                    <td>有效</td>
                                    <td>无效</td>
                                    <td>无</td>
                                    <td rowspan="7">信号设备</td>
                                    <td>桅灯</td>
                                    <td><input type="text" name="" v-model="yinhuan.wde1"></td>
                                    <td><input type="radio" name="ap" value="1" v-model="yinhuan.wde2"></td>
                                    <td><input type="radio" name="ap" value="2" v-model="yinhuan.wde2"></td>
                                    <td><input type="radio" name="ap" value="0" v-model="yinhuan.wde2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">船长</td>
                                    <td><input type="radio" name="aq" value="1" v-model="yinhuan.cz1"></td>
                                    <td><input type="radio" name="ar" value="1" v-model="yinhuan.cz2"></td>
                                    <td><input type="radio" name="ar" value="0" v-model="yinhuan.cz2"></td>
                                    <td><input type="radio" name="aq" value="0" v-model="yinhuan.cz1"></td>
                                    <td>舷灯</td>
                                    <td><input type="text" name="" v-model="yinhuan.xd1"></td>
                                    <td><input type="radio" name="as" value="1" v-model="yinhuan.xd2"></td>
                                    <td><input type="radio" name="as" value="2" v-model="yinhuan.xd2"></td>
                                    <td><input type="radio" name="as" value="0" v-model="yinhuan.xd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">大副</td>
                                    <td><input type="radio" name="at" value="1" v-model="yinhuan.df1"></td>
                                    <td><input type="radio" name="au" value="1" v-model="yinhuan.df2"></td>
                                    <td><input type="radio" name="au" value="0" v-model="yinhuan.df2"></td>
                                    <td><input type="radio" name="at" value="0" v-model="yinhuan.df1"></td>
                                    <td>锚灯</td>
                                    <td><input type="text" name="" v-model="yinhuan.zd1"></td>
                                    <td><input type="radio" name="av" value="1" v-model="yinhuan.zd2"></td>
                                    <td><input type="radio" name="av" value="2" v-model="yinhuan.zd2"></td>
                                    <td><input type="radio" name="av" value="0" v-model="yinhuan.zd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">二副</td>
                                    <td><input type="radio" name="aw" value="1" v-model="yinhuan.ef1"></td>
                                    <td><input type="radio" name="ax" value="1" v-model="yinhuan.ef2"></td>
                                    <td><input type="radio" name="ax" value="0" v-model="yinhuan.ef2"></td>
                                    <td><input type="radio" name="aw" value="0" v-model="yinhuan.ef1"></td>
                                    <td>尾灯</td>
                                    <td><input type="text" name="" v-model="yinhuan.wed1"></td>
                                    <td><input type="radio" name="ay" value="1" v-model="yinhuan.wed2"></td>
                                    <td><input type="radio" name="ay" value="2" v-model="yinhuan.wed2"></td>
                                    <td><input type="radio" name="ay" value="0" v-model="yinhuan.wed2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">轮机长</td>
                                    <td><input type="radio" name="az" value="1" v-model="yinhuan.ljz1"></td>
                                    <td><input type="radio" name="ba" value="1" v-model="yinhuan.ljz2"></td>
                                    <td><input type="radio" name="ba" value="0" v-model="yinhuan.ljz2"></td>
                                    <td><input type="radio" name="az" value="0" v-model="yinhuan.ljz1"></td>
                                    <td>环照灯</td>
                                    <td><input type="text" name="" v-model="yinhuan.hzd1"></td>
                                    <td><input type="radio" name="bb" value="1" v-model="yinhuan.hzd2"></td>
                                    <td><input type="radio" name="bb" value="2" v-model="yinhuan.hzd2"></td>
                                    <td><input type="radio" name="bb" value="0" v-model="yinhuan.hzd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">大管轮</td>
                                    <td><input type="radio" name="bc" value="1" v-model="yinhuan.dgl1"></td>
                                    <td><input type="radio" name="bd" value="1" v-model="yinhuan.dgl2"></td>
                                    <td><input type="radio" name="bd" value="0" v-model="yinhuan.dgl2"></td>
                                    <td><input type="radio" name="bc" value="0" v-model="yinhuan.dgl1"></td>
                                    <td>号钟</td>
                                    <td><input type="text" name="" v-model="yinhuan.hz1"></td>
                                    <td><input type="radio" name="be" value="1" v-model="yinhuan.hz2"></td>
                                    <td><input type="radio" name="be" value="2" v-model="yinhuan.hz2"></td>
                                    <td><input type="radio" name="be" value="0" v-model="yinhuan.hz2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">二管轮</td>
                                    <td><input type="radio" name="bf" value="1" v-model="yinhuan.egl1"></td>
                                    <td><input type="radio" name="bg" value="1" v-model="yinhuan.egl2"></td>
                                    <td><input type="radio" name="bg" value="0" v-model="yinhuan.egl2"></td>
                                    <td><input type="radio" name="bf" value="0" v-model="yinhuan.egl1"></td>
                                    <td>号笛</td>
                                    <td><input type="text" name="" v-model="yinhuan.hj1"></td>
                                    <td><input type="radio" name="bh" value="1" v-model="yinhuan.hj2"></td>
                                    <td><input type="radio" name="bh" value="2" v-model="yinhuan.hj2"></td>
                                    <td><input type="radio" name="bh" value="3" v-model="yinhuan.hj2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" rowspan="2">四小证</td>
                                    <td colspan="2">应持证人数</td>
                                    <td colspan="2">实持证人数</td>
                                    <td rowspan="5">通导设备</td>
                                    <td>AIS</td>
                                    <td><input type="text" name="" v-model="yinhuan.ais1"></td>
                                    <td><input type="radio" name="bi" value="1" v-model="yinhuan.ais2"></td>
                                    <td><input type="radio" name="bi" value="2" v-model="yinhuan.ais2"></td>
                                    <td><input type="radio" name="bi" value="0" v-model="yinhuan.ais2"></td>
                                </tr>
                                <tr>                                  
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.numberOfLicensees"></td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.actualNumberOfLicensees"></td>
                                    <td>卫星</td>
                                    <td><input type="text" name="" v-model="yinhuan.wx1"></td>
                                    <td><input type="radio" name="bj" value="1" v-model="yinhuan.wx2"></td>
                                    <td><input type="radio" name="bj" value="2" v-model="yinhuan.wx2"></td>
                                    <td><input type="radio" name="bj" value="0" v-model="yinhuan.wx2"></td>
                                </tr>
                                <tr>
                                    <td colspan="4">四、安全生产责任书（承诺书）签订情况</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.productionSafety"></td>
                                    <td>单边带</td>
                                    <td><input type="text" name="" v-model="yinhuan.dbd1"></td>
                                    <td><input type="radio" name="bk" value="1" v-model="yinhuan.dbd2"></td>
                                    <td><input type="radio" name="bk" value="2" v-model="yinhuan.dbd2"></td>
                                    <td><input type="radio" name="bk" value="0" v-model="yinhuan.dbd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="4">五、财产人身保险落实情况</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.implementationSituation"></td>
                                    <td>卫导</td>
                                    <td><input type="text" name="" v-model="yinhuan.wd1"></td>
                                    <td><input type="radio" name="bl" value="1" v-model="yinhuan.wd2"></td>
                                    <td><input type="radio" name="bl" value="2" v-model="yinhuan.wd2"></td>
                                    <td><input type="radio" name="bl" value="0" v-model="yinhuan.wd2"></td>
                                </tr>
                                <tr>
                                    <td colspan="4">六、有无违章违法行为</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.wrongIllegalAct"></td>
                                    <td>雷达</td>
                                    <td><input type="text" name="" v-model="yinhuan.ld1"></td>
                                    <td><input type="radio" name="bm" value="1" v-model="yinhuan.ld2"></td>
                                    <td><input type="radio" name="bm" value="2" v-model="yinhuan.ld2"></td>
                                    <td><input type="radio" name="bm" value="0" v-model="yinhuan.ld2"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">船东签名</td>
                                    <td colspan="2"><input type="text" name="" v-model="yinhuan.ownerSignature"></td>
                                    <td colspan="2">是否编组编队</td>
                                    <td colspan="2"><input type="radio" name="gg" value="1" v-model="yinhuan.organizeFormation"> 是&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="gg" value="0" v-model="yinhuan.organizeFormation">否</td>
                                    <td colspan="2">是否按规定填写捕捞日志</td>
                                    <td colspan="2"><input type="radio" name="hh" value="1" v-model="yinhuan.fishingRequired"> 是&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="hh" value="0" v-model="yinhuan.fishingRequired">否</td>
                                </tr>
                                <tr>
                                    <td colspan="6">乡镇审核人：<input type="text" name="" v-model="yinhuan.townAuditor"></td>
                                    <td colspan="6">乡镇盖章：<input type="text" name="" v-model="yinhuan.townsSealed"></td>
                                </tr>
                            </table>
                            <p><button @click="okTJB">保存</button></p>
                        </div>
                    </Modal>
                    <!--详情-详情(海洋渔业捕捞许可年审申请表)-->
                    <Modal v-model="detailSQB" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="sqb">
                                <caption><h2>2016年苍南县海洋渔业捕捞许可年审申请表</h2></caption>
                                <caption>
                                    <span style="position:relative;right:200px;font-size:16px;">
                                        浙苍渔:<input type="text" name="" v-model="modalSQB.shipName"/>
                                    </span>
                                    <span style="position:relative;left:200px;font-size:16px;">
                                        联系电话<input type="text" name="" v-model="modalSQB.phone"/>
                                    </span>
                                </caption>
                                <tr>
                                    <td>职务</td>
                                    <td>姓名</td>
                                    <td>证号</td>
                                    <td>四小证证号</td>
                                    <td>身份证号码</td>
                                    <td>备注</td>
                                </tr>
                                <tr>
                                    <td>船长</td>
                                    <td><input type="text" v-model="modalSQB.cz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.czzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.czsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.czsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.czbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>大副</td>
                                    <td><input type="text" v-model="modalSQB.df" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dfzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dfsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dfsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dfbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>二副</td>
                                    <td><input type="text" v-model="modalSQB.ef" name=""></td>
                                    <td><input type="text" v-model="modalSQB.efzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.efsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.efsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.efbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>轮机长</td>
                                    <td><input type="text" v-model="modalSQB.ljz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.ljzzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.ljzsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.ljzsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.ljzbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>大管轮</td>
                                    <td><input type="text" v-model="modalSQB.dgl" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dglzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dglsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dglsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.dglbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>二管轮</td>
                                    <td><input type="text" v-model="modalSQB.egl" name=""></td>
                                    <td><input type="text" v-model="modalSQB.eglzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.eglsxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.eglsfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.eglbz" name=""></td>
                                </tr>
                                <tr>
                                    <td>话务员</td>
                                    <td><input type="text" v-model="modalSQB.hwy" name=""></td>
                                    <td><input type="text" v-model="modalSQB.hwyzh" name=""></td>
                                    <td><input type="text" v-model="modalSQB.hwysxz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.hwysfz" name=""></td>
                                    <td><input type="text" v-model="modalSQB.hwybz" name=""></td>
                                </tr>
                                <tr>
                                    <td>船员</td>
                                    <td><input type="text" v-model="modalSQB.cy1" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cyzh1" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysxz1" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysfz1" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cybz1" name=""></td>
                                </tr>
                                <tr>
                                    <td>船员</td>
                                    <td><input type="text" v-model="modalSQB.cy2" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cyzh2" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysxz2" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysfz2" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cybz2" name=""></td>
                                </tr>
                                <tr>
                                    <td>船员</td>
                                    <td><input type="text" v-model="modalSQB.cy3" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cyzh3" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysxz3" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cysfz3" name=""></td>
                                    <td><input type="text" v-model="modalSQB.cybz3" name=""></td>
                                </tr>
                                <tr>
                                    <td>作业类型</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.jobType" name=""></td>
                                    <td>船员总人数</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.countNumber" name=""></td>
                                </tr>
                                <tr>
                                    <td>检验证书证号</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.certificateNumber" name=""></td>
                                    <td>有效期</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.cjzs" name=""></td>
                                </tr>
                                <tr>
                                    <td>登记证书证号</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.registrationNumber" name=""></td>
                                    <td>有效期</td>
                                    <td colspan="2"><input type="text" v-model="modalSQB.djzs" name=""></td>
                                </tr>
                                <tr>
                                    <td>责任书（承诺书）签订情况</td>
                                    <td><input type="text" v-model="modalSQB.productionSafety" name=""></td>
                                    <td>渔船进出港签证情况</td>
                                    <td><input type="text" v-model="modalSQB.responsibilitySafety" name=""></td>
                                    <td>捕捞日志（生产日记）</td>
                                    <td><input type="text" v-model="modalSQB.fishingLog" name=""></td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <span>所属渔业合作社意见：</span>
                                        <p><textarea v-model="modalSQB.cooperative" name="" id="" cols="20" rows="3">
                                            
                                        </textarea></p>
                                        <p>经办人签字（盖章）：<input type="text" v-model="modalSQB.headCooperative" name=""/></p>
                                        <p>签字时间：<input type="text" v-model="modalSQB.cooperativeTime" name=""/></p>
                                    </td>
                                    <td colspan="3">
                                        <span>基层站意见：</span>
                                        <p><textarea v-model="modalSQB.grassrootsComments" name="" id="" cols="20" rows="3">
                                            
                                        </textarea></p>
                                        <p>经办人签字（盖章）：<input type="text" v-model="modalSQB.grassrootsCooperative" name=""/></p>
                                        <p>签字时间：<input type="text" v-model="modalSQB.grassrootsTime" name=""/></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <span>信息中心意见：</span>
                                        <p><textarea v-model="modalSQB.informationCenter" name="" id="" cols="20" rows="3">
                                            
                                        </textarea></p>
                                        <p>经办人签字（盖章）：<input type="text" v-model="modalSQB.informationCooperative" name=""/></p>
                                        <p>签字时间：<input type="text" v-model="modalSQB.informationCenterTime" name=""/></p>
                                    </td>
                                    <td colspan="3">
                                        <span>县局意见：</span>
                                        <p><textarea v-model="modalSQB.countyBureau" name="" id="" cols="20" rows="3">
                                            
                                        </textarea></p>
                                        <p>经办人签字（盖章）：<input type="text" v-model="modalSQB.countyBureauCooperative" name=""/></p>
                                        <p>签字时间：<input type="text" v-model="modalSQB.countyBureauTime" name=""/></p>
                                    </td>
                                </tr>
                            </table>
                            <p><button @click="okSQB"></button></p>
                        </div>
                    </Modal>
                    <!--详情-详情(渔业专业合作社一船一档目录)-->
                    <Modal v-model="detailML" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="yy">
                                <caption><h2>苍南县海帆渔业专业合作社一船一档目录</h2></caption>
                                <tr>
                                    <td colspan="6">一、渔船安全生产台账</td>
                                </tr>
                                <tr>
                                    <td>序号</td>
                                    <td colspan="2">台账内容</td>
                                    <td>缺少</td>
                                    <td>齐全</td>
                                    <td>备注</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td colspan="2">渔船安全台账</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td colspan="2">责任书签署照片</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colspan="2">渔船登船检查情况表</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td rowspan="5">4</td>
                                    <td rowspan="5">安全责任书</td>
                                    <td>合作社与船老大责任书</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>船长与船员责任书</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>船长和船员安全生产承诺书</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>渔船隐患自查统计表</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>渔船登舶检查表</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td colspan="6">二、渔船基本情况</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td  colspan="2">船舶检证书（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td  colspan="2">船舶登记（国籍）证书（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td  colspan="2">捕捞许可证（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td colspan="6">三、船员基本情况</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td  colspan="2">船员身份证（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td  colspan="2">职务船员证书（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td  colspan="2">安全员上岗证书（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td  colspan="2">渔业单船船员变更表（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td colspan="6">四、渔船其他情况</td>
                                </tr>
                                <tr>
                                    <td rowspan="6">12</td>
                                    <td rowspan="6">渔船其他材料</td>
                                    <td>渔船、船员保险单据（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>渔船边防户口薄</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>渔船签证薄</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>船员雇佣合同</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>各种奖励文件、证书（复印件）</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                                <tr>
                                    <td>行政执法处罚决定</td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                    <td><input type="text" name=""></td>
                                </tr>
                            </table>
                        </div>
                    </Modal>
                    <!--详情-详情(船员安全责任书签署现场照片)-->
                    <Modal v-model="detailPIC" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="pic">
                                <caption><h2>浙苍渔05881船员安全责任书签署现场照片</h2></caption>
                                <tr>
                                    <td><img src="" alt="暂无图片"></td>
                                    <td><img src="" alt="暂无图片"></td>
                                </tr>
                                <tr>
                                    <td><img src="" alt="暂无图片"></td>
                                    <td><img src="" alt="暂无图片"></td>
                                </tr>
                                <tr>
                                    <td><img src="" alt="暂无图片"></td>
                                    <td><img src="" alt="暂无图片"></td>
                                </tr>
                                <tr>
                                    <td colspan="2">
                                        <span>以上现场签字真实有效</span>
                                        <div>
                                            <p>合作社现场监督人员签字：</p>
                                            <p>年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
                                        </div>
                                        <div>
                                            <p>合作社负责人审核签字：</p>
                                            <p>（盖章）</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </Modal>
                    <!--详情-详情(浙苍渔船安全台账)-->
                    <Modal v-model="detailTZ" title="详情" width="50%">
                        <div style="height:600px;overflow:auto;">
                            <table width="100%" class="tz">
                                <caption>浙苍渔05881船安全台账</caption>
                                <tr>
                                    <td colspan="2">浙苍渔05881</td>
                                    <td colspan="2">船长：<input type="text" name=""></td>
                                    <td colspan="2">双控指标：<input type="text" name=""></td>
                                    <td colspan="2">作业方式：<input type="text" name=""></td>
                                </tr>
                                <tr class="ig">
                                    <td colspan="2"></td>
                                    <td colspan="4"><img src="#" alt="暂无照片"></td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr class="ig">
                                    <td colspan="2"></td>
                                    <td colspan="4"><img src="#" alt="暂无照片"></td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr class="ig">
                                    <td colspan="2"></td>
                                    <td colspan="4"><img src="#" alt="暂无照片"></td>
                                    <td colspan="2"></td>
                                </tr>
                                <tr>
                                    <td colspan="5">
                                        <p>
                                            实船配备一下情况：救生衣____件、救生圈____个、救生筏____个、灭火器____个、烟火信号弹____个、救生消防设备____、通导设备____、信号设备____。船舶证书情况：________，职务证书持证____本，四小证____本。救生筏检修时间________。
                                        </p>
                                        <p>
                                            台账管理人员签字：
                                        </p>
                                    </td>
                                    <td colspan="3">
                                        <p>合作社负责人签字：</p>
                                        <p>（盖章）</p>
                                        <p>时间：&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</p>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </Modal>
                </Card>  
            </div>
</template>       
<script>
        export default {
          name: "anjuan",
          data() {
            return {                
                detailTable:[
                    {
                        title:"序号",
                        type:"index",
                        width:120
                    },
                    {
                        title:"事项",
                        key:"item1",
                        width:205,
                    },
                    {
                        title:"",
                        key:"btn",
                        width:120,
                        render: (h, params) => {
                        let i=params.row._index;
                        //console.log(params.row.id,"你好");
                        let temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    }                                   
                                },                            
                                "详情"
                            ),
                        );
                        return h("div",temp);
                        }   
                    }
                ],
                ddtList:[
                    {
                        item1:"你好",                       
                    },
                    {
                        item1:"世界",
                    }
                ],
                detailList:[
                    {item:"渔业渔船安全生产承诺书"},
                    {item:"海洋渔业捕捞许可年审申请表"},
                    {item:"渔船安全登船检查表"},
                    {item:"渔业专业合作社一船一档目录"},
                    {item:"责令改正通知书"},
                    {item:"船员安全责任书签署现场照片"},
                    {item:"渔业船舶检验证书"},
                    {item:"浙苍渔船安全台账"},
                    {item:"渔船安全登录检查表"},
                    {item:"渔船隐患自查统计表"},                   
                ],
                updateItem:{
                    id: "",
                    creatorId: "ADMIN",
                    creatorDeptId: "330000",
                    del: "0",
                    createTime: new Date(),
                    updateTime: new Date(),
                    ownerName: ""
                },     
                formLeft:{
                    //id:"",
                    shipName:"",//渔船名
                    jobType:"",//作业类型
                    ownerName:"",//船东名字
                    phone:"",//联系电话
                    theAnnual:"",//年度
                    createTime:new Date(),//创建时间
                    institutions:"",
                },
                modelAdd:false,
                modelUpdate:false, 
                modelDetail:false,
                detailPM:false, 
                detailCB:false,
                detailIF:false,
                detailCHB:false,
                detailJCB:false,
                detailTJB:false,
                detailSQB:false,
                detailML:false,
                detailPIC:false,
                detailTZ:false,
                detailID:"",
                totalNum: 1,//总条数
                query: {
                    page: 1,
                    size: 10,
                    key:"getParameterFilesPage",
                    wheres: {                
                        shipName:""
                    }, 
                },
                dataList: [], //表格中的数据集合  
                columns: [//表头 直接变量传值
                    {
                    title: "序号",
                    type: "index",//序号展示
                    width:130
                    },
                    {
                    title: "船名号",
                    key: "shipName",
                    width:180
                    },
                    {
                    title: "作业类型",
                    key: "jobType",
                    width:180
                    },
                    {
                    title: "船东",
                    key: "ownerName",
                    width:180
                    },
                    {
                    title: "联系电话",
                    key: "phone",
                    width:180
                    },
                    {
                        title:"年度",
                        key:"theAnnual",
                        width:180
                    },
                    {
                        title:"机构",
                        key:"institutions",
                        width:180
                    },
                    {   
                        title:"创建时间",
                        key:"createTime",
                        width:180
                    },
                    {
                    title: "操作",
                    key: "id",
                    width:285,
                    render: (h, params) => {
                        //console.log(params.row,"niaho ajodfjaodfdo");
                        var id = params.row.id;
                        var temp = [];
                        temp.push(
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "info",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                        this.remove(id);                         
                                        }
                                    }
                                },                            
                                "删除"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                    type: "success",
                                    size: "small"
                                    },
                                    style: {
                                    marginLeft: "20px"
                                    },
                                    on:{
                                        click:()=>{
                                            this.modelUpdate=true;
                                            this.formLeft=params.row;
                                        }
                                    }                       
                                },
                                "修改"
                            ),
                            h(
                                "Button",
                                {
                                    props:{
                                        type:"success",
                                        size:"small"
                                    },
                                    style:{
                                        marginLeft:"20px"
                                    },
                                    on:{
                                        click:()=>{
                                            this.modelDetail=true;
                                            this.detailID=id;
                                            this.yinhuan.shipName=params.row.shipName;
                                            this.yinhuan.ownerName=params.row.ownerName;
                                            this.modalCB.shipName=params.row.shipName;
                                            this.modalSQB.shipName=params.row.shipName;
                                            //console.log(id,"你好");
                                        }
                                    }
                                },
                                "详情"
                            )
                        );
                        return h("div", temp);
                    }
                    },                   
                ],
                yinhuan:{
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
                modalCB:{

                },
                modalSQB:{
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
                },
            };
          },     
          mounted() {
            this.handleSearch();//直接调用methods里面的handleSearch(){}，进行挂载
          },
          methods: {
            handleSearch(page) {//这个是(分页查询和)搜索事件
                if(page==1){
                    this.query.page=1;
                }
              this.$http
              .get("parameter/files/page",//请求路径
                  {
                  //请求参数
                  params: {
                      _model: JSON.stringify(this.query)//接口要求转化为json格式
                  }
                }).then(res => {
                  //console.log(res.data,"你好");//{page: 1, size: 10, total: 131, data: Array(10)}
                  this.dataList = res.data.data;//data: Array(10)
                  this.page = res.data.page;//page: 1
                  this.size = res.data.size;//size: 10
                  this.totalNum = res.data.total;//total: 131
                }).catch(function(error) {
                  console.log(error);
                });
            },  
            handleReset(){   
              this.query.wheres.shipName="";
              this.handleSearch();
            },
            add(){
                this.$http
                .post("parameter/files",this.formLeft).then(res => {
                    console.log(res,"nhoa adfadf");
                    if(res.code>0){
                        this.modelAdd=false;
                    }
                    this.handleSearch();
                }).catch(function(err){
                    console.log(err);
                });
            },
            remove(id){
                this.$http
                .delete("parameter/files/"+id)
                .then(res => {
                    if(res.code>0){
                        this.handleSearch();
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
            },
            update(){
                console.log(this.formLeft.id,"太帅");
                this.$http
                .patch("parameter/files/"+this.formLeft.id,this.formLeft)
                .then(res=>{
                    if(res.code>0){
                        this.modelUpdate=false;
                    }
                    console.log(res,"你好");
                }).catch(err=>{
                    console.log(err);
                });
            },
            // 页面条数选择
            pageSizeChange(size) {
              this.query.size = size;
              this.handleSearch();
            },
            // 分页查询
            changePage(page) {
              this.query.page = page;
              this.handleSearch();
            },  
            showModal(i){
                if(i==0){
                    this.detailPM=true;
                }else if(i==1){
                    this.detailSQB=true;
                }else if(i==2){
                    this.detailJCB=true;
                }else if(i==3){
                    this.detailML=true;
                }else if(i==4){
                    this.detailIF=true;
                }else if(i==5){
                    this.detailPIC=true;
                }else if(i==6){
                    this.detailCHB=true;
                }else if(i==7){
                    this.detailTZ=true;
                }else if(i==8){
                    this.detailCB=true;
                }else if(i==9){
                    this.detailTJB=true;
                }
            },
            okTJB(){
                this.$http
                .post("fishingBoat/check/statistical",this.yinhuan)
                .then(res => {
                    console.log(res,"你好世界");
                }).catch(err => {
                    console.log(err);
                });   
            },
            okCB(){
                this.$http
                .post("fishing/safety/check",this.modalCB)
                .then(res => {
                    console.log(res,"你好世界");
                }).catch(err => {
                    console.log(err);
                });
            },
            okSQB(){
                this.$http
                .post("annual/fishing/license",this.modalSQB)
                .then(res => {
                    console.log(res,"你好世界");
                })
                .catch(err => {
                    console.log(err);
                });
            },
          }         
        };
    </script>
<style scoped>
#promiseB>h1,#promiseB>h4{
      text-align:center;
  }
  #promiseB>div>p{
      text-indent:25px;
      font-size:16px;
      margin:3px 0;
  }
#detailIF>h1{
    text-align:center;
}
#detailIF>div>p{
    text-indent:20px;
}
table.regisbg,table.ycaqdljcb,table.tjb,table.sqb,table.yy,table.pic,table.tz,table.dtl{
  border-collapse: collapse;
  margin-bottom: 10px;
}
table.regisbg th,
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}
table.regisbg td.zuo{
    text-align:left;
    position:relative;
    left:10px;
    top:10px;
    vertical-align:top;
}
table.regisbg td.zuo.liu{
    height:100px;
}
table.regisbg td.zuo.liu span{
    float:left;
    margin-left:10px;
}
table.regisbg td.you{
    border-top:1px solid transparent;
    text-align:right;
    position:relative;
    right:50px;
}
table.regisbg input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.regisbg textarea{
    position:relative;
    top:20px;
    left:-60px;
    border:none;
    outline:none;
}
table.ycaqdljcb td{
    border:1px solid black;
    width:65px;
    height:32px;
    text-align:center;
    font-size:18px;
}
table.ycaqdljcb tr.jc{
    height:100px;
}
table.ycaqdljcb tr.jcjc{
    height:150px;
}
table.ycaqdljcb input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
#detailIF p.pp{
    text-align:center;
}
#detailIF p{
    font-size:18px;
    margin:3px 0;
}
table.tjb td{
    border:1px solid gray;
    width:75px;
    height:32px;
    text-align:center;
    font-size:15px;
}
table.tjb input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.sqb td{
    border:1px solid black;
    width:75px;
    height:32px;
    text-align:center;
    font-size:15px;
}
table.sqb input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.yy td{
    border:1px solid black;
    width:75px;
    height:32px;
    text-align:center;
    font-size:15px;
}
table.yy input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.pic td{
    border:1px solid black;
    width:75px;
    height:250px;
    text-align:center;
    font-size:15px;
}
table.pic td img{
    width:100%;
}
table.pic input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.tz td{
    border:1px solid black;
    width:75px;
    height:32px;
    text-align:center;
    font-size:15px;
}
table.tz tr.ig{
    height:220px;
}
table.tz input{
    border:none;
    outline:none;
    text-align:center;
    width:100%;
    box-sizing:border-box;
    padding:0;
    margin:0;
}
table.dtl td{
    border:1px solid black;
    height:32px;
    text-align:center;
    font-size:15px;
}
</style> 
<


>     