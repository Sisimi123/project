<style scoped>
/******统计表样式******/
.wrapper {
  height: 500px;
  width: 1150px;
  overflow-y:auto;
  overflow-x:hidden;
}
.tablecount {
  width: 100%;
  height: 100%;
  font-size: 5px;
  /* border: 1px solid #111111; */
  border: 1px solid black;
  overflow-x:hidden;
}
.tablecount th {
  height: 40px;
  width: 64px;
  background-color: #f8f8f9;
  /* word-wrap:break-word */
}
.tablecount td {
  height: 48px;
  width: 40px;
  text-align: center;
}
.tablecount th,
.tablecount td {
    border: 1px solid black;
  /* border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0; */
  white-space: nowrap;
  /* text-overflow:ellipsis; */
  overflow:hidden;
  /* padding-left: 5px;
  padding-right: 5px; */
}
/******渔政执法日常检查数据统计样式*****/

table.regisbg {
  border-collapse: collapse;
  margin-bottom: 10px;
}

table.regisbg th {
    border: 1px solid black;
    font-size: 20px;
    text-align: left;
    width: 65px;
    height: 32px;
}
table.regisbg td {
  border: 1px solid black;
  text-align: center;
  width: 65px;
  height: 32px;
}
table.regisbg td input {
    width: 80%;
    text-indent: 30%;
    outline: none;
    border: 0px;
}
th.none-line,
td.none-line {
  border: none;
}

textarea {
  outline: none;
  border: none;
  width: 100%;
  resize: none;
}

input {
  outline: none;
  border: 0px;
  width: 100px;
  text-indent: 12px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
   margin: 0;
}
input[type="number"]{-moz-appearance:textfield;}

caption {
  font-size: 25px;
  font-weight: 700;
}
.modalHeader {
    display: inline-block;
    width: 30%;
    height: 20px;
    line-height: 20px;
    margin-left: 450px;
    font-size: 20px;
    color: #1c2438;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

<template>
    <div>
        <data-table ref="test"
            :withTree="true"
            :useZtree="false"
            :treeUrl="'/$admin/depts/authtree'"
            :treeParams="treeQuery"
            :treeTitle="'组织机构'"
            :url="'/check/dailyCheck/getPage'"
            :params="query"
            :columns="columns"
            @on-select-change="selectTreeChange"
        >
        <div slot="search">
            <Form :label-width="100" @submit.native.prevent>
                <Row>
                    <Col span="4">
                        <Form-item label="起始时间:">
                            <DatePicker v-model="query.wheres.begin" type="date" placeholder="请选择日期"  format="yyyy-MM-dd"></DatePicker>
                        </Form-item> 
                    </Col>
                    <Col span="4">
                        <Form-item label="结束时间:">
                            <DatePicker v-model="query.wheres.end" type="date" placeholder="请选择日期"  format="yyyy-MM-dd"></DatePicker>
                        </Form-item>
                    </Col>
                    <Col span="5">
                        <Form-item label="是否查找本地区上报数据:" :label-width='160'>
                            <Select v-model="query.wheres.localArea">
                                <Option value="是">是</Option>
                                <Option value="否">否</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="3">
                        <Form-item label="区域类型:" :label-width='80'>
                            <Select v-model="query.wheres.isInland">
                                <Option value='0'>沿海</Option>
                                <Option value="1">内陆</Option>
                                <Option value="2">全部</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <div class="btn-wrap">
                        <Button @click="initSearch" type="primary" icon="ios-search" >搜索</Button>
                        <Button @click="handleReset" >重置</Button>
                    </div>
                    <span style="float:right;margin-bottom:10px">                                                                         
                        <!-- <ButtonGroup></ButtonGroup> -->
                        <Button @click="buluWin" type="primary" icon="ios-add" v-show="addShow">补录</Button>
                        <Button @click="addWin" type="info" icon="ios-add" v-show="addShow">新增</Button>
                        <Button  @click="dataDetail" type="success" icon="ios-folder">统计表</Button>
                        <!-- <Button  @click="dataTotal" type="error" icon="ios-folder">数据总表</Button> --> 
                    </span>                      
                </Row>
            </Form>
        </div>
        </data-table>
        <!-- 渔政执法日常检查数据统计-->
        <Modal :styles="{top: '40px'}" v-model="modal.dailyData" :title="title" width=1000 :mask-closable="false">
            <div style="height:600px;overflow:auto;">
                <table class="regisbg"  border="1px" width=900 style="margin: 0 auto;" v-if="areaJudge=='1'">
                    <caption style="margin-bottom:10px">渔政执法日常检查数据填报</caption>
                    <caption v-if="bulu" style="font-size:10px;">
                        <p style="margin-bottom:5px;">
                            <span style="position:relative;left:200px;">
                                <DatePicker v-model="form.replenishTime" type="month" placeholder="请选择日期"  :options="options1" format="yyyy-MM"></DatePicker>
                            </span>
                        </p>
                    </caption>
                    <th colspan="18">执法力量</th>
                    <tr>
                        <td colspan="3">检查次数(次)</td>
                        <td colspan="3">检查渔船数(艘次)</td>
                        <td colspan="4">出动执法人员(人次)</td>
                        <td colspan="4">出动执法车辆(车次)</td>
                        <td colspan="4">出动执法船艇(艘次)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.enfCheckCount" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.enfJCYCS" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.enfCheckNumOfpeople" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.enfCarCount" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.enfShipCount" :readonly="readonly" type="number"/></td>
                    </tr>
                    <th colspan="18">执法宣传</th>
                    <tr>
                        <td colspan="18" style="font-size:15px;">印发宣传材料(份)</td>
                    </tr>
                    <tr>
                        <td colspan="3">内陆渔业资源保护(份)</td>
                        <td colspan="2">安全检查(份)</td>
                        <td colspan="2">幼鱼保护(份)</td>
                        <td colspan="3">设立警示牌(块/片)</td>
                        <td colspan="3">水生野生动物保护(份)</td>
                        <td colspan="3">水产品质量安全(份)</td>
                        <td colspan="2">其他(份)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.pubNLYYZYBH" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubAQJC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubYYBH" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubSLJSP" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubSSYSDWBH" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubSCPZLAQ" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubQT" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="18" style="font-size:15px;">开展宣传活动(次)</td>
                    </tr>
                    <tr>
                        <td colspan="5">“三无”渔船集中公开拆解(次)</td>
                        <td colspan="4">渔具公开销毁(次)</td>
                        <td colspan="5">普法宣传、讲座、评选等活动</td>
                        <td colspan="4">发送宣传信息(条)</td>
                    </tr>
                    <tr>
                        <td colspan="5"><input v-model="form.pubSWYCJZGKCJ" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.pubYJGKXH" :readonly="readonly" type="number"/></td>
                        <td colspan="5"><input v-model="form.pubPJPXHD" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.pubFSXCXX" :readonly="readonly" type="number"/></td>
                    </tr>
                    <th colspan="18">检查情况</th>
                    <tr>
                        <td colspan="12" style="font-size:15px;">渔具整治</td>
                        <td colspan="6" style="font-size:15px;">渔获物情况</td>
                    </tr>
                    <tr>
                        <td colspan="2">渔具制售厂(点)</td>
                        <td colspan="3">电捕鱼器具(台/套)</td>
                        <td colspan="2">地笼网</td>
                        <td colspan="3">迷魂阵(顶/张)</td>
                        <td colspan="2">其他违禁渔具</td>
                        <td colspan="4">收缴、放生违禁渔获物(kg)</td>
                        <td colspan="2">涉案渔获物(kg)</td>
                    </tr>
                    <tr>
                        <td colspan="2"><input v-model="form.cheYJZSC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubDDZ" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staDLW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.enfMHZ" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfQTWJYJ" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.staSJFSWJYHW" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staSAYHW" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="8" style="font-size:15px;">安全执法</td>
                        <td colspan="10" style="font-size:15px;">水产品质量安全</td>
                    </tr>
                    <tr>
                        <td colspan="2">安全隐患渔船(艘)</td>
                        <td colspan="2">现场整改渔船(艘)</td>
                        <td colspan="2">限期整改渔船(艘)</td>
                        <td colspan="2">责令停航渔船(艘次)</td>
                        <td colspan="2">养殖场或苗种场(家)</td>
                        <td colspan="3">水产品其他相关单位(家)</td>
                        <td colspan="2">责令整改单位(家)</td>
                        <td colspan="3">水产品无害处理(含销毁)(公斤)</td>
                    </tr>
                    <tr>
                        <td colspan="2"><input v-model="form.staANYHYC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staXCZGYC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staXQZGYC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfZLTHYC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staYZCHMZC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSCPQTXHDW" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staZLZGDW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSCPWHCL" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="8" style="font-size:15px;">水生野生动物保护</td>
                        <td colspan="7" style="font-size:15px;">渔业环境保护</td>
                        <td colspan="3" style="font-size:15px;">投诉举报</td>
                    </tr>
                    <tr>
                        <td colspan="3">水生野生动物相关单位(家)</td>
                        <td colspan="3">收缴、上交水生野生动物(头)</td>
                        <td colspan="2">放生天然水生野生动物(头)</td>
                        <td colspan="3">调解污染死鱼案件(起)</td>
                        <td colspan="4">为养殖户挽回经济损失(万元)</td>
                        <td colspan="1">举报受理(起)</td>
                        <td colspan="2">举报处置(起)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.staSSYSDWXGDW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSJSJSSYSDW" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staFSTRSSYSDW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staTJWRSYA" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.staWHJJSS" :readonly="readonly" type="number"/></td>
                        <td colspan="1"><input v-model="form.staJBSL" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staJBCZ" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="3">信息备注</td>
                        <td colspan="15"><textarea v-model="form.comment" rows="2" :readonly="readonly"></textarea></td>
                    </tr>
                </table>
                <table class="regisbg"  border="1px" width=900 style="margin: 0 auto;" v-if="areaJudge=='0'||areaJudge=='2'">
                    <caption style="margin-bottom:10px">渔政执法日常检查数据填报</caption>
                    <caption v-if="bulu" style="font-size:10px;">
                        <p style="margin-bottom:5px;">
                            <span style="position:relative;left:200px;">
                                <DatePicker v-model="form.replenishTime" type="month" placeholder="请选择日期"  :options="options" format="yyyy-MM"></DatePicker>
                            </span>
                        </p>
                    </caption>
                    <th colspan="18">执法力量</th>
                    <tr>
                        <td rowspan="2" colspan="4" style="font-size:15px;">检查次数(次)</td>
                        <td rowspan="2" colspan="4" style="font-size:15px;">出动执法人员(人次)</td>
                        <td colspan="4" style="font-size:15px;">出动执法车辆</td>
                        <td colspan="6" style="font-size:15px;">出动执法船艇</td>
                    </tr>
                    <tr>
                        <td colspan="2">车辆(次)</td>
                        <td colspan="2">车程(公里)</td>
                        <td colspan="2">船艇(艘次)</td>
                        <td colspan="2">航时(小时)</td>
                        <td colspan="2">航程(海里)</td>
                    </tr>
                    <tr>
                        <td colspan="4"><input v-model="form.enfCheckCount" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.enfCheckNumOfpeople" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfCarCount" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfCarMileage" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfShipCount" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfDuration" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.enfShipMileage" :readonly="readonly" type="number"/></td>
                    </tr>
                    <th colspan="18">执法宣传</th>
                    <tr>
                        <td colspan="18" style="font-size:15px;">印发宣传材料(份)</td>
                    </tr>
                    <tr>
                        <td colspan="2">海洋伏休(份)</td>
                        <td colspan="2">违禁渔具(份)</td>
                        <td colspan="2">幼鱼保护(份)</td>
                        <td colspan="2">渔船安全(份)</td>
                        <td colspan="3">初级水产品质量安全(份)</td>
                        <td colspan="3">水生野生动物保护(份)</td>
                        <td colspan="2">电毒炸(份)</td>
                        <td colspan="2">其他(份)</td>
                    </tr>
                    <tr>
                        <td colspan="2"><input v-model="form.pubHYFX" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubWJYJ" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubYYBH" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubYCAQ" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubCJSCPZLAQ" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubSSYSDWBH" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubDDZ" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.pubQT" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="15" style="font-size:15px;">开展宣传活动(场次)</td>
                        <td colspan="3" rowspan="2" style="font-size:15px;">发送宣传信息(条)</td>
                    </tr>
                    <tr>
                        <td colspan="5">“三无”渔船集中公开拆解(场次)</td>
                        <td colspan="5">渔具公开销毁(场次)</td>
                        <td colspan="5">普法宣传、讲座、评选等活动(场次)</td>
                    </tr>
                    <tr>
                        <td colspan="5"><input v-model="form.pubSWYCJZGKCJ" :readonly="readonly" type="number"/></td>
                        <td colspan="5"><input v-model="form.pubYJGKXH" :readonly="readonly" type="number"/></td>
                        <td colspan="5"><input v-model="form.pubPJPXHD" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.pubFSXCXX" :readonly="readonly" type="number"/></td>
                    </tr>
                    <th colspan="18">执法检查</th>
                    <tr>
                        <td colspan="18" style="font-size:15px;">水上执法</td>
                    </tr>
                    <tr>
                        <td colspan="6">检查渔港码头及渔船自然停靠点(个次)</td>
                        <td colspan="6">海上检查渔船(艘次)</td>
                        <td colspan="6">港口检查渔船(艘次)</td>
                    </tr>
                    <tr>
                        <td colspan="6"><input v-model="form.cheTKD" :readonly="readonly" type="number"/></td>
                        <td colspan="6"><input v-model="form.cheHSJCYC" :readonly="readonly" type="number"/></td>
                        <td colspan="6"><input v-model="form.cheGKJCYC" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="18" style="font-size:15px;">陆上执法</td>
                    </tr>
                    <tr>
                        <td colspan="3">水产交易市场</td>
                        <td colspan="3">饭店</td>
                        <td colspan="2">充冰点</td>
                        <td colspan="2">冷库</td>
                        <td colspan="2">加油点(船)</td>
                        <td colspan="2">鱼粉(加工)厂</td>
                        <td colspan="2">造船厂(点)</td>
                        <td colspan="2">渔具制售厂(点)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.cheSCJYSC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.cheFD" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheCBD" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheLK" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheJYD" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheYFC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheZCC" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.cheYJZSC" :readonly="readonly" type="number"/></td>
                    </tr>
                    <th colspan="18">检查情况</th>
                    <tr>
                        <td colspan="18" style="font-size:15px;">渔具整治</td>
                    </tr>
                    <tr>
                        <td colspan="3">电脉冲(套)</td>
                        <td colspan="3">密眼衬网、多层囊网(张)</td>
                        <td colspan="3">违反最小网目尺寸规定渔具(张)</td>
                        <td colspan="3">地笼网(张)</td>
                        <td colspan="3">滩涂串网(3米/顶)</td>
                        <td colspan="3">违规张网、刺网类(张)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.staDMC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staMYCW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staWFZXWMCCGDYJ" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staDLW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staTTCW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staWGZW" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="6" style="font-size:15px;">渔获物情况</td>
                        <td colspan="12" style="font-size:15px;">渔船安全执法</td>
                    </tr>
                    <tr>
                        <td colspan="3">收缴、放生违禁渔获物(公斤)</td>
                        <td colspan="3">涉案渔获物(公斤)</td>
                        <td colspan="3">安全隐患渔船（艘次）</td>
                        <td colspan="3">现场整改渔船（艘次）</td>
                        <td colspan="3">限期整改渔船（艘次）</td>
                        <td colspan="3">扣押渔船（艘次）</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.staSJFSWJYHW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSAYHW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staANYHYC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staXCZGYC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staXQZGYC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staKYYC" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="8" style="font-size:15px;">水产品质量安全</td>
                        <td colspan="10" style="font-size:15px;">水生野生动物保护</td>
                    </tr>
                    <tr>
                        <td colspan="3">养殖场或苗种场(家)</td>
                        <td colspan="3">水产品其他相关单位(家)</td>
                        <td colspan="2">责令整改单位(家)</td>
                        <td colspan="3">水产品无害处理(含销毁)(公斤)</td>
                        <td colspan="2">水生野生动物相关单位(家)</td>
                        <td colspan="3">收缴、上交水生野生动物(头)</td>
                        <td colspan="2">放生天然水生野生动物(头)</td>
                    </tr>
                    <tr>
                        <td colspan="3"><input v-model="form.staYZCHMZC" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSCPQTXHDW" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staZLZGDW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSCPWHCL" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staSSYSDWXGDW" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staSJSJSSYSDW" :readonly="readonly" type="number"/></td>
                        <td colspan="2"><input v-model="form.staFSTRSSYSDW" :readonly="readonly" type="number"/></td>
                    </tr>
                    <tr>
                        <td colspan="8" style="font-size:15px;">渔业环境保护</td>
                        <td colspan="4" style="font-size:15px;">电毒炸</td>
                        <td colspan="6" style="font-size:15px;">投诉举报</td>
                    </tr>
                    <tr>
                        <td colspan="4">调解污染死鱼案件(起)</td>
                        <td colspan="4">为养殖户挽回经济损失(万元)</td>
                        <td colspan="4">收缴、没收电捕鱼器具(台/套)</td>
                        <td colspan="3">举报受理(起)</td>
                        <td colspan="3">举报处置(起)</td>
                    </tr>
                    <tr>
                        <td colspan="4"><input v-model="form.staTJWRSYA" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.staWHJJSS" :readonly="readonly" type="number"/></td>
                        <td colspan="4"><input v-model="form.staSJMSDBYQJ" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staJBSL" :readonly="readonly" type="number"/></td>
                        <td colspan="3"><input v-model="form.staJBCZ" :readonly="readonly" type="number"/></td>
                    </tr>
                    <!-- <th colspan="18">以上所有填写内容只能为数字</th> -->
                    <tr>
                        <td colspan="3">信息备注</td>
                        <td colspan="15"><textarea v-model="form.comment" rows="2" :readonly="readonly"></textarea></td>
                    </tr>
                </table>
            </div>
            <div slot="footer">
                <Button type="info"  @click="modal.dailyData=false">取消</Button>
                <Button v-show="btnShow" type="primary"  @click="submitData">保存</Button>
            </div>   
        </Modal>
        <!--执法数据详细表-->
        <Modal v-model="modal.dataDetail"  title="执法数据详细表"  width="1200px">
            <div slot="header">
                <div class="modalHeader">执法日常数据统计表</div>
                <div style="display:inline-block;margin-right:10px;margin-left:300px;margin-top:10px;">
                    <Select v-model="areaTypeSel" @on-change="areaChange" :disabled="areaJudge!='2'" style="width:100px">
                        <Option :value="0">沿海</Option>
                        <Option :value="1">内陆</Option>
                        <!-- <Option :value="2">全部</Option> -->
                    </Select>
                </div>
                <div style="display:inline-block;margin-top:10px;">
                    <DatePicker type="date" style="width:105px" :clearable="false" @on-change="selectBeginTime" v-model="queryTable.wheres.begin"></DatePicker>     
                </div>
                <div style="display:inline-block;">--
                    <DatePicker type="date" style="width:105px" :clearable="false" @on-change="selectEndTime" v-model="queryTable.wheres.end"></DatePicker>     
                </div>
                <Button type="info" @click="searchCount" style="margin-left:10px">搜索</Button>
                <Button type="success" @click="exportDetail" style="margin-left:10px">下载</Button>
            </div>
            <div class="wrapper">
                <Row v-if="judgeCount">
                    <i-col span="8">
                        <table class="tablecount" cellpadding="0" cellspacing="0">
                            <tr>
                                <th colspan="3" style="font-size:15px;">地区</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="5" style="font-size:20px;">执</br>法</br>力</br>量</th>
                                <th colspan="2" rowspan="1" style="font-size:15px;">检查次数(次)</th>
                            </tr>
                            <tr>                            
                                <th colspan="2" rowspan="1" style="font-size:15px;">检查渔船数(艘次)</th>
                            </tr>
                            <tr>                            
                                <th colspan="2" rowspan="1" style="font-size:15px;">出动执法人员(人次)</th>
                            </tr>
                            <tr>                            
                                <th colspan="2" rowspan="1" style="font-size:15px;">出动执法车辆(车次)</th>
                            </tr>
                            <tr>                            
                                <th colspan="2" rowspan="1" style="font-size:15px;">出动执法船艇(艘次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="13" style="font-size:20px;">执</br>法</br>宣</br>传</th>
                                <th colspan="1" rowspan="8" style="font-size:15px;">印发宣传材料(份)</th>
                                <th colspan="1" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">内陆渔业资源保护(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">安全检查(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">幼鱼保护(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">设立警示牌(块/片)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">水生野生动物保护(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">水产品质量安全(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">其他(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="5" style="font-size:15px;">开展宣传活动(场次)</th>
                                <th colspan="1" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">“三无”渔船集中公开拆解(次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">渔具公开销毁(次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">普法宣传、讲座、评选等活动</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">发送宣传信息(条)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="22" style="font-size:20px;">检</br>查</br>情</br>况</th>
                                <th colspan="1" rowspan="5" style="font-size:15px;">渔具整治</th>
                                <th colspan="1" rowspan="1">渔具制售厂(点)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">电捕鱼器具(台/套)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">地笼网</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">迷魂阵(顶/张) </th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">其他违禁渔具</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">渔获物情况</th>
                                <th colspan="1" rowspan="1">收缴、放生违禁渔获物(kg)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">涉案渔获物(kg)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="4" style="font-size:15px;">安全执法</th>
                                <th colspan="1" rowspan="1">安全隐患渔船(艘)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">现场整改渔船(艘)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">限期整改渔船(艘)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">责令停航渔船(艘次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="4" style="font-size:15px;">水产品质量安全</th>
                                <th colspan="1" rowspan="1">养殖场或苗种场(家)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">水产品其他相关单位(家)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">责令整改单位(家)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">水产品无害处理(含销毁)(公斤)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="3" style="font-size:15px;">水生野生动物保护</th>
                                <th colspan="1" rowspan="1">水生野生动物相关单位(家)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">收缴、上交水生野生动物(头)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">放生天然水生野生动物(头)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">渔业环境保护</th>
                                <th colspan="1" rowspan="1">调解污染死鱼案件(起)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">为养殖户挽回经济损失(万元)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">投诉举报</th>
                                <th colspan="1" rowspan="1">举报受理(起)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">举报处置(起)</th>
                            </tr>
                        </table>
                    </i-col>
                    <i-col span="16">
                        <table class="tablecount" cellpadding="0" cellspacing="0">
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['title']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCheckCount']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfJCYCS']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCheckNumOfpeople']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCarCount']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfShipCount']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_YFXCCL']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubNLYYZYBH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubAQJC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubYYBH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSLJSP']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSSYSDWBH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSCPZLAQ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubQT']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_KZXCHD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSWYCJZGKCJ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubYJGKXH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubPJPXHD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubFSXCXX']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheYJZSC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubDDZ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staDLW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfMHZ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfQTWJYJ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSJFSWJYHW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSAYHW']}}</th>
                            </tr><tr>
                                <th v-for="item in dataDetailArr">{{item['staANYHYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staXCZGYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staXQZGYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfZLTHYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staYZCHMZC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSCPQTXHDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staZLZGDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSCPWHCL']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSSYSDWXGDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSJSJSSYSDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staFSTRSSYSDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staTJWRSYA']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staWHJJSS']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staJBSL']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staJBCZ']}}</th>
                            </tr>
                        </table>
                    </i-col>
                </Row>                
                <Row v-if="!judgeCount">
                    <i-col span="8">
                        <table class="tablecount" cellpadding="0" cellspacing="0">
                            <tr>
                                <th colspan="4" style="font-size:15px;">地区</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="7" style="font-size:20px;">执</br>法</br>力</br>量</th>
                                <th colspan="3" rowspan="1" style="font-size:15px;">检查次数(次)</th>
                            </tr>
                            <tr>                            
                                <th colspan="3" rowspan="1" style="font-size:15px;">出动执法人员(人次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">出动执法车辆</th>                                    
                                <th colspan="2" rowspan="1" style="width:150px">车辆(车次)</th>
                            </tr>
                            <tr>                                  
                                <th colspan="2">车程(公里)</th>
                            </tr>
                            <tr>
                                <th  colspan="1" rowspan="3" style="font-size:15px;">出动执法船艇</th>
                                <th colspan="2" rowspan="1">船艇(艘次)</th>
                            </tr>
                            <tr>                                  
                                <th colspan="2">航时(小时)</th>
                            </tr>
                            <tr>                                  
                                <th colspan="2">航程(海里)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="14" style="font-size:20px;">执</br>法</br>宣</br>传</th>
                                <th colspan="1" rowspan="9" style="font-size:15px;">印发宣传材料(份)</th>
                                <th colspan="2" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">海洋伏休(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">违禁渔具(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">幼鱼保护(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">渔船安全(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">初级水产品质量安全(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">水生野生动物保护(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">电毒炸(份)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">其他(份)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="4" style="font-size:15px;">开展宣传活动(场次)</th>
                                <th colspan="2" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">“三无”渔船集中公开拆解(场次)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">渔具公开销毁(场次)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">普法宣传、讲座、评选等活动(场次)</th>
                            </tr>
                            <tr>
                                <th colspan="3" rowspan="1" style="font-size:15px;">发送宣传信息(条)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="13" style="font-size:20px;">执</br>法</br>检</br>查</th>
                                <th colspan="1" rowspan="4" style="font-size:15px;">水上执法</th>
                                <th colspan="2" rowspan="1">检查渔港码头及渔船自然停靠点(个次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="3" style="font-size:15px;">检查渔船(艘次)</th>
                                <th colspan="1" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">海上检查渔船(艘次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1">港口检查渔船(艘次)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="9" style="font-size:15px;">陆上执法</th>
                                <th colspan="2" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">水产交易市场</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">饭店</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">充冰点</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">冷库</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">加油点(船)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">鱼粉(加工)厂</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">造船厂(点)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">渔具制售厂(点)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="25" style="font-size:20px;">检</br>查</br>情</br>况</th>
                                <th colspan="1" rowspan="7" style="font-size:15px;">渔具整治</th>
                                <th colspan="2" rowspan="1">合计</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">电脉冲</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">密眼衬网、多层囊网</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">违反最小网目尺寸规定渔具</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">地笼网</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">滩涂串网(顶)</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">违规张网、刺网类</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">渔获物情况</th>
                                <th colspan="2" rowspan="1">收缴、放生违禁渔获物(公斤)</th>                                    
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">涉案渔获物(公斤)</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="4" style="font-size:15px;">渔船安全执法</th>
                                <th colspan="2" rowspan="1">安全隐患渔船（艘次）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">现场整改渔船（艘次）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">限期整改渔船（艘次）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">扣押渔船（艘次）</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="4" style="font-size:15px;">水产品质量安全</th>
                                <th colspan="2" rowspan="1">养殖场或苗种场（家）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">水产品其他相关单位（家）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">责令整改单位（家）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">水产品无害处理（含销毁）（公斤）</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="3" style="font-size:15px;">水生野生动物保护</th>
                                <th colspan="2" rowspan="1">水生野生动物相关单位（家）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">收缴、上交水生野生动物（头）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">放生天然水生野生动物（头）</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">渔业环境保护</th>
                                <th colspan="2" rowspan="1">调解污染死鱼案件（起）</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">为养殖户挽回经济损失（万元）</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="1" style="font-size:15px;">电毒炸</th>
                                <th colspan="2" rowspan="1">收缴、没收电捕鱼器具（台/套）</th>
                            </tr>
                            <tr>
                                <th colspan="1" rowspan="2" style="font-size:15px;">投诉举报</th>
                                <th colspan="2" rowspan="1">举报受理（起））</th>
                            </tr>
                            <tr>
                                <th colspan="2" rowspan="1">举报处置（起）</th>
                            </tr>
                        </table>
                    </i-col>
                    <i-col span="16">
                        <table class="tablecount" cellpadding="0" cellspacing="0">
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['title']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCheckCount']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCheckNumOfpeople']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCarCount']}}</th>
                            </tr>   
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfCarMileage']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfShipCount']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfDuration']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['enfShipMileage']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_Adverpise']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubHYFX']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubWJYJ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubYYBH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubYCAQ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubCJSCPZLAQ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSSYSDWBH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubDDZ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubQT']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_Propaganda']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubSWYCJZGKCJ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubYJGKXH']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubPJPXHD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['pubFSXCXX']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheTKD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_CheckShip']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheHSJCYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheGKJCYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_LSZF']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheSCJYSC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheFD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheCBD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheLK']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheJYD']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheYFC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheZCC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['cheYJZSC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_FishingReg']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staDMC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staMYCW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staWFZXWMCCGDYJ']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staDLW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staTTCW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staWGZW']}}</th>
                            </tr>
                            <!-- <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_YHWQK']}}</th>
                            </tr> -->
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSJFSWJYHW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSAYHW']}}</th>
                            </tr>
                            <!-- <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_YCAQZF']}}</th>
                            </tr> -->
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staANYHYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staXCZGYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staXQZGYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staKYYC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staYZCHMZC']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSCPQTXHDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staZLZGDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSCPWHCL']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSSYSDWXGDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSJSJSSYSDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staFSTRSSYSDW']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staTJWRSYA']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staWHJJSS']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staSJMSDBYQJ']}}</th>
                            </tr>
                            <!-- <tr>
                                <th v-for="item in dataDetailArr">{{item['sum_TSJB']}}</th>
                            </tr> -->
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staJBSL']}}</th>
                            </tr>
                            <tr>
                                <th v-for="item in dataDetailArr">{{item['staJBCZ']}}</th>
                            </tr>
                        </table>
                    </i-col>
                </Row>
            </div>
            <div slot="footer">
                <!-- <Button type="success"  @click="exportDetail">下载</Button>
                <Button type="info"  @click="modal.dataDetail=false">关闭</Button>   -->
            </div>             
        </Modal>
    </div>
</template>

<script>
// import userObj from '@/store/module/userId.js';
import user from '@/store/module/user.js';
var dept = user.state.userInfo.dept;
export default {
    data () {
        var _self = this;
        return {
            options: {
                disabledDate (date) {
                    const disabledMonth = date.getMonth() + 1;
                    return disabledMonth > 5;
                }
            },
            options1: {
                disabledDate (date) {
                    const disabledMonth = date.getMonth() + 1;
                    return disabledMonth > 6;
                }
            },
            judgeCount: false,
            areaTypeSel: '',
            bulu: false,
            addShow: true,
            quanXianShow: true,
            countId: '',
            areaJudge: '', // 0为沿海1为陆上2为全部
            form: {
                enfCheckCount:"",  //检查次数
                enfCheckNumOfpeople:"",  //执法人员出动人数
                enfCarCount:"",  //车辆(次)
                enfCarMileage:"",  //里程(公里)
                enfShipCount:"",  //船艇(艘次)
                enfDuration:"",  //航时(小时)
                enfShipMileage:"",  //航程(海里)
                // 执法宣传
                pubHYFX:"",  //海洋伏休
                pubWJYJ:"",  //违禁渔具
                pubYYBH:"",  //幼鱼保护
                pubYCAQ:"",  //渔船安全
                pubCJSCPZLAQ:"",  //初级水产品质量安全
                pubSSYSDWBH:"",  //水生野生动物保护
                pubDDZ:"",  //电毒炸
                pubQT:"",  //其他
                pubSWYCJZGKCJ:"",  //“三无”渔船集中公开拆解
                pubHSJCYC:"",  //海上检查渔船
                pubPJPXHD:"",  //普法宣传、讲座、评选等活动
                pubFSXCXX:"",  //发送宣传信息
                // 执法检查
                cheTKD:"",  //检查渔港码头及渔船自然停靠点
                cheHSJCYC:"",  //海上检查渔船
                cheGKJCYC:"",  //港口检查渔船
                cheSCJYSC:"",  //水产交易市场
                cheFD:"",  //饭店
                cheCBD:"",  //充冰点
                cheLK:"",  //冷库
                cheJYD:"",  //加油点
                cheYFC:"",  //鱼粉加工厂
                cheZCC:"",  //造船厂
                cheYJZSC:"",  //渔具制售厂
                // 检查情况
                staDMC:"",  //电脉冲
                staMYCW:"",  //密眼衬网、多层囊网
                staWFZXWMCCGDYJ:"",  //违反最小网目尺寸规定渔具
                staDLW:"",  //地笼网
                staTTCW:"",  //滩涂串网
                staWGZW:"",  //违规张网
                staSJFSWJYHW:"",  //收缴、放生违禁渔获物
                staSAYHW:"",  //涉案渔获物
                staANYHYC:"",  //安全隐患渔船
                staXCZGYC:"",  //现场整改渔船
                staXQZGYC:"",  //限期整改渔船
                staKYYC:"",  //扣押渔船
                staYZCHMZC:"",  //养殖场或苗种场
                staSCPQTXHDW:"",  //水产品其他相关单位
                staZLZGDW:"",  //责令整改单位
                staSCPWHCL:"",  //水产品无害处理
                staSSYSDWXGDW:"",  //水生野生动物相关单位
                staSJSJSSYSDW:"",  //收缴上缴水生野生动物
                staFSTRSSYSDW:"",  //放生天然水生野生动物
                staTJWRSYA:"",  //调解污染死鱼案
                staWHJJSS:"",  //为养殖户晚会经济损失
                staSJMSDBYQJ:"",  //收缴没收电捕鱼器具
                staJBSL:"",  //举报受理
                staJBCZ:"",  //举报处置
                comment:""  //备注
            },
            btnShow: true,
            readonly: false,
            modal: {
                dailyData: false,
                dataTotal: false,
                dataDetail: false
            },
            title: '新增',
            columns: [
                {
                    title: '序号',
                    maxWidth: 80,
                    align: 'center',
                    type: 'index'
                },
                {
                    title: '上报时间',
                    align: 'center',
                    key: 'createTime'
                },
                {
                    title: '统计日期',
                    align: 'center',
                    key: 'replenishTime',
                    render: (h, params) => {
                        if(_self.$util.isEmpty(params.row.replenishTime))
                            return  h('span')
                        var str = params.row.replenishTime.toLocaleString()
                        var arr = str.split(' ')
                        if (arr[1] == '00:00:00') {
                            var index = arr[0].lastIndexOf("\-");
                            str = arr[0].substring(0,index)
                        } else {
                            str = arr[0]
                        }
                        return h('span',str)
                    }
                },
                {
                    title: '填报单位',
                    align: 'center',
                    key: 'deptName'
                },
                {
                    title: '操作',
                    align: 'center',
                    width: 255,
                    render: (h,params) => {
                        var _self = this;
                        return h('div', [
                            h('Button',
                            {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {

                                },
                                on: {
                                    click:() => {
                                        this.title="查看"
                                        this.editWin(params.row)
                                    }
                                }
                            }, '查看'),
                            h('Button',
                            {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft:"10px",
                                    display:((this.quanXianShow)&&(params.row.edit))||this.$hasRoles("ADMIN")?"inline-block":"none",
                                },
                                on: {
                                    click:()=> {
                                        this.title="编辑";
                                        this.editWin(params.row)
                                    }
                                }
                            }, '编辑'),
                            h('Button',
                            {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft:"10px",
                                    display:this.$hasRoles("ADMIN")?"inline-block":"none",
                                },
                                on: {
                                    click: () => {
                                        this.handleDelete(params.row)
                                    }
                                }
                            },'删除'),
                            h('Button',
                            {
                                props: {
                                    type: 'warning',
                                    size: 'small'
                                },
                                style: {
                                    marginLeft:"10px",
                                    display:this.$hasRoles("ADMIN")?"inline-block":"none",
                                },
                                on: {
                                    click: () => {
                                        this.sendBack(params.row)
                                    }
                                }
                            },'退回')
                        ])
                    }
                }
            ],
            query: {
                page: 1,
                size: 10,
                wheres: {
                    isInland: '2',
                    localArea: '',
                    deptId: '',
                    begin: '',
                    end: '',
                    thisOrg: '',
                }
            },
            queryTable: {
                page: 1,
                size: 10,
                wheres: {
                    isInland: '',
                    localArea: '',
                    deptId: '',
                    begin: '',
                    end: '',
                    thisOrg: '',
                }
            },
            treeQuery: {
                containOrgan: false,
                type: 3
            },
            checkId: {

            },
            dataDetailArr: []
        };
    },
    methods: {
        areaChange (value) {
            Date.prototype.format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            var _self = this;
            if (value == '0') {
                _self.judgeCount = false;
            } else if (value == '1') {
                _self.judgeCount = true;
            }
            var search = {}
            _self.queryTable.wheres.isInland = value + '';
            if(typeof(_self.queryTable.wheres.end)=='object')
                _self.queryTable.wheres.end = _self.queryTable.wheres.end.format("yyyy-MM-dd")+" 23:59:59";
            search.query = JSON.stringify(_self.queryTable);
            _self.initTable(search);
        },
        sendBack (row) {
            this.$http.post("/check/dailyCheck/returnDailyCheck?id="+row.id)
            .then(res=>{
                    if(res.success){       
                    this.$Message.info(res.msg);        
                    this.initSearch()                  
                } else {
                    this.$Message.info(res.msg)
                }
            }).catch(error => {
                console.log(error);
            })
        },
        handleDelete (row) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除吗？</p>',
                okText: '继续',
                cancelText: '返回',
                onOk: () => {
                    this.$http
                        .delete('/check/dailyCheck/' + row.id)
                        .then(res => {
                            this.$Message.info('操作成功');
                            this.initSearch();
                        })
                        .catch(err => {
                            console.log(error);
                        });
                },
                onCancel: () => {
                    console.log('onCancel');
                }
            });
        },
        juegeTime(date1,date2) {
            var oDate1 = new Date(date1);
            var oDate2 = new Date(date2);
            if(oDate1.getTime() > oDate2.getTime()){ 
                return false
            } else {
                return true
            }
        },
        searchCount() {
            var _self = this
            var search = {}
            search.query = JSON.stringify(_self.queryTable);
            console.log(search)
            _self.initTable(search)
        },
        selectBeginTime(value) {
            var _self = this
            if (!_self.juegeTime(_self.queryTable.wheres.begin,_self.queryTable.wheres.end)) {
                _self.$Message.warning('起始时间大于结束时间')
                return
            }
            var search = {}
            search.query = JSON.stringify(_self.queryTable);
            _self.initTable(search)
        },
        selectEndTime(value) {
            var _self = this
            if (!_self.juegeTime(_self.queryTable.wheres.begin,_self.queryTable.wheres.end)) {
                _self.$Message.warning('起始时间大于结束时间')
                return
            }
            var dateValue = new Date(new Date(new Date(value).toLocaleDateString()).getTime()+24*60*60*1000-1);
            var dateEnd = dateValue.getFullYear() + '-' + ((dateValue.getMonth() + 1) < 10 ? "0" + (dateValue.getMonth() + 1):(dateValue2.getMonth() + 1))+ "-" + (dateValue.getDate() < 10 ? "0" + dateValue.getDate():dateValue.getDate()) + ' ' + dateValue.getHours() + ':' + dateValue.getMinutes() + ':' + dateValue.getSeconds();
            this.queryTable.wheres.end = dateEnd;
            var search = {}
            search.query = JSON.stringify(_self.queryTable);
            _self.initTable(search)
        },
        isEmpty(s) {
            if (s == "" || s == undefined || s == null || JSON.stringify(s) === '{}') {
                return true;
            }
            return false;
        },   
        //数据详细表下载
        exportDetail() {
            // window.open(this.$basePath+"/check/dailyCheck/exportExcel?query="+encodeURI(JSON.stringify(this.query.wheres)));'
            Date.prototype.format = function (fmt) {
                var o = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S": this.getMilliseconds()
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            
            if (typeof(this.queryTable.wheres.begin)=='string') {
                this.queryTable.wheres.begin = new Date(this.queryTable.wheres.begin.replace(/-/g,"/"));                
            } 
            if (typeof(this.queryTable.wheres.end)=='string') {
                this.queryTable.wheres.end = new Date(this.queryTable.wheres.end.replace(/-/g,"/"));                
            }
            var path = "";
            if (!this.juegeTime(this.queryTable.wheres.begin,this.queryTable.wheres.end)) {
                this.$Message.warning('起始时间大于结束时间')
                return
            }
            if (this.queryTable.wheres.localArea!="") {
                path += '&localArea='+this.queryTable.wheres.localArea;
            } 
            if (this.queryTable.wheres.deptId!="") {
                path += '&deptId='+this.queryTable.wheres.deptId;
            } 
            if (this.queryTable.wheres.begin!="") {
                path += '&begin='+this.queryTable.wheres.begin.format("yyyy-MM-dd")+" 00:00:00";
            } 
            if (this.queryTable.wheres.end!="") {
                path += '&end='+this.queryTable.wheres.end.format("yyyy-MM-dd")+" 23:59:59";
            } 
            if (this.queryTable.wheres.thisOrg!="") {
                path += '&thisOrg='+this.queryTable.wheres.thisOrg;
            } 
            if (this.queryTable.wheres.isInland!="") {
                path += '&isInland='+this.queryTable.wheres.isInland;
            } 
            window.open(this.$basePath+"/check/dailyCheck/exportExcel?"+path.substr(1));
        },
        //表单验证
        rules(obj) {
            var flag = true           
            var newObj = {}
            Object.assign(newObj, obj)
            delete newObj.comment
            for (let key in newObj) {
                if (newObj[key]) {

                } else {
                    flag = false
                }
            }
            return flag
        },
        //确定按钮
        submitData() {
            // if(!this.rules(this.form)){
            //     this.$Message.info('请填写除备注外所有项。')
            //     return
            // }
            if (this.title == '编辑') {
                this.$http.patch("/check/dailyCheck/"+this.checkId,this.form)
                .then(res=>{
                        if(res.success){                   
                        this.$Message.info("操作成功");
                        this.modal.dailyData=false; 
                        this.initSearch()                  
                    } else {
                        this.$Message.info(res.msg)
                    }
                }).catch(error => {
                    console.log(error);
                })
            } else if (this.title == '新增' || this.title == '补录') {
                this.$http.post("/check/dailyCheck/save",this.form)
                .then(res => {
                    if (res.success) {
                        this.$Message.info("操作成功");
                        this.modal.dailyData=false;
                        this.initSearch()
                    } else {
                        this.$Message.info(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
        },
        //编辑以及查看
        editWin(row) {
            this.modal.dailyData = true
            this.checkId = row.id
            this.bulu = false
            if (this.title == '编辑') {
                this.btnShow = true
            } else if (this.title == '查看') {
                this.btnShow = false
            }
            this.$http.get("/check/dailyCheck/"+this.checkId)
            .then(res => {
                if (res.success) {
                    this.form = res.data
                } else {
                    this.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        //初始化表格
        initTable(search) {
            var _self = this
            _self.dataDetailArr = []
            _self.$http.get("/check/dailyCheck/getTable", {
                params:  search
            }).then(res => {
                if (res.success) {
                    if (_self.isEmpty(res.data.tree[0].children)) {
                        _self.dataDetailArr.push(res.data.tree[0].cal.detail)
                        _self.dataDetailArr[0].title = res.data.tree[0].title
                    } else {
                        _self.dataDetailArr.push(res.data.tree[0].cal.detail)
                        _self.dataDetailArr[0].title = res.data.tree[0].title
                        for (let i = 0; i < res.data.tree[0].children.length; i++) {
                            _self.dataDetailArr.push(res.data.tree[0].children[i].cal.detail)
                            _self.dataDetailArr[i+1].title = res.data.tree[0].children[i].title
                        }
                    }
                } else {
                    _self.$Message.info(res.msg);
                }
            })
            .catch(error => {
                console.log(error);
            })
        },
        //数据详细表
        dataDetail() {
            var _self = this
            _self.modal.dataDetail = true
            var datetime = new Date();
            var dateValue = new Date(new Date(new Date(datetime).toLocaleDateString()).getTime());
            var datetStart = dateValue.getFullYear() + "-" + ((dateValue.getMonth() + 1) < 10 ? "0" + (dateValue.getMonth() + 1):(dateValue.getMonth() + 1))+ "-" + (dateValue.getDate() < 10 ? "0" + dateValue.getDate():dateValue.getDate()) + " " + (dateValue.getHours()<10?"0"+dateValue.getHours():dateValue.getHours()) + ":" + (dateValue.getMinutes()<10?"0"+dateValue.getMinutes():dateValue.getMinutes()) + ":" + (dateValue.getSeconds()<10?"0"+dateValue.getSeconds():dateValue.getSeconds());
            var dateValue2 = new Date(new Date(new Date(datetime).toLocaleDateString()).getTime()+24*60*60*1000-1);
            var dateEnd = dateValue2.getFullYear() + '-' + ((dateValue2.getMonth() + 1) < 10 ? "0" + (dateValue2.getMonth() + 1):(dateValue2.getMonth() + 1))+ "-" + (dateValue2.getDate() < 10 ? "0" + dateValue2.getDate():dateValue2.getDate()) + ' ' + dateValue2.getHours() + ':' + dateValue2.getMinutes() + ':' + dateValue2.getSeconds();
            this.queryTable.wheres.begin = datetStart;
            this.queryTable.wheres.end = dateEnd;
            if (this.areaJudge == '2') {
                this.queryTable.wheres.isInland = '0'
                this.areaTypeSel = 0
            } else {
                this.queryTable.wheres.isInland = this.areaJudge;
                this.areaTypeSel = parseInt(this.areaJudge)
            }
            var search = {}
            search.query = JSON.stringify(_self.queryTable);
            _self.initTable(search)
        },
        buluWin() {
            this.modal.dailyData = true
            this.bulu = true
            this.title = '补录'
            this.btnShow = true
            for (let key in this.form) {
                this.form[key] = "";
            }
            // var nowDate = new Date();
            // var y = nowDate.getFullYear();
            // var m = nowDate.getMonth() + 1;
            // m = m < 10 ? ('0' + m) : m;    
            // var dateStr = y + '-' + m;
            // this.form.replenishTime = dateStr+'-01 00:00:00';
        },
        addWin() {
            this.modal.dailyData = true
            this.title = '新增'
            this.btnShow = true
            for (let key in this.form) {
                this.form[key] = "";
            }
            this.bulu = false
            // var nowDate = new Date();
            // var y = nowDate.getFullYear();
            // var m = nowDate.getMonth() + 1;
            // m = m < 10 ? ('0' + m) : m;  
            // var d = nowDate.getDate();  
            // d = d < 10 ? ('0' + d) : d;  
            // var dateStr = y + '-' + m + '-' + d;
            // this.form.replenishTime = dateStr;
        },
        initSearch() {
            if (!this.juegeTime(this.query.wheres.begin,this.query.wheres.end)) {
                this.$Message.warning('起始时间大于结束时间')
                return
            }
            this.$refs.test.initSearch();
        },
        handleReset() {
            for (let key in this.query.wheres) {
                this.query.wheres[key] = "";
            }
            this.initSearch();
        },
        selectTreeChange(value) {
            if (value[0].name == "市本级") {
                this.query.thisOrg = '是'
            } else {
                this.query.thisOrg = '否'
            }
            this.countId = value[0].id
            this.query.wheres.deptId = value[0].id
            this.queryTable.wheres.deptId = value[0].id
            this.initSearch();
        }
    },
    beforeMount() {
            if (this.$hasRoles("ADMIN")) {
                this.addShow = true;
            } else{
                if(this.$hasRoles("XDailyReporter")){
                    this.quanXianShow=true;
                    this.addShow = true;
                }else{
                    this.quanXianShow=false;
                    this.addShow = false
                }
            }
        },
    mounted() {
    },
    created() {
        this.query.wheres.deptId = dept.id
        this.queryTable.wheres.deptId = dept.id
        this.countId = dept.id
        this.$http.get("/check/dailyCheck/getAreaType").then(res => {
            this.areaJudge = res.data.chilOrg
            // this.query.wheres.isInland = this.areaJudge
            if (res.data.thisOrg == 0) {
                this.judgeCount = false;
            } else if (res.data.thisOrg == 1) {
                this.judgeCount = true;
            } else if (res.data.thisOrg == 2) {
                this.judgeCount = false;
            }
        }).catch(err => {
            console.log(err)
        })
    },
    computed: {

    },
    watch: {
        'query.wheres.isInland': {
            deep: true,
            handler: function (newVal,oldVal){
                this.$nextTick(function(){
                    this.query.wheres.isInland = newVal
                    this.initSearch();
                })
            }
        },
    }
}

</script>

