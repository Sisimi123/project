
<style lang="less">
@import "../styles/details.less";
</style>
<template>
  <dataContent>      

            <!-- <span>基本信息</span> -->
            <!-- <span style="margin-left:66%">保额保费合计</span> -->
            <div class="wrapper1">
                <div class="info-wrap1 main1">    
                    <p class="info-title1"><i></i>基本信息</p>
                    <div class="info-content1">
                        <ul class="info-list1">
                            <li>
                                <label>互保类别</label>
                                <span><input v-model="info.mutualInsuranceCategory" readonly /></span>
                            </li>
                            <li>
                                <label>会员名</label>
                                <span><input v-model="info.memberName" readonly /></span>
                            </li>
                            <li>
                                <label>互保凭证号</label>
                                <span><input v-model="info.mutuInsuCertNo" readonly/></span>
                            </li>
                            <li>
                                <label>核保日期</label>
                                <span><input v-model="info.underwritingDate" readonly/></span>
                            </li>
                            <li>
                                <label>互保起期</label>
                                <span><input v-model="info.fromdatemutualInsurance" readonly/></span>
                            </li>
                            <li>
                                <label>互保止期</label>
                                <span><input v-model="info.mutualCheckPeriod" readonly/></span>
                            </li>
                        </ul>
                        <ul  class="info-list1">
                            <li>
                                <label>市</label>
                                <span ><input v-model="info.city" readonly/></span>
                            </li>
                            <li>
                                <label>县市区</label>
                                <span><input v-model="info.countyArea" readonly/></span>
                            </li>
                            <li>
                                <label>镇乡</label>
                                <span><input v-model="info.zhenXiang" readonly/></span>
                            </li>
                            <li>
                                <label>村公司</label>
                                <span><input v-model="info.villageCompany" readonly/></span>
                            </li>
                            <li>
                                <label>经办机构</label>
                                <span><input v-model="info.agency" readonly/></span>
                            </li>
                            <li>
                                <label>经办人</label>
                                <span><input v-model="info.manager" readonly/></span>
                            </li> 
                        </ul>
                    </div>
                </div>
                <div class="info-wrap1 main1">
                    <p class="info-title1"><i></i>船舶信息</p>
                    <div class="info-content1">
                        <ul class="info-list1">
                            <li>
                                <label>船名</label>
                                <span><input :value="info.nametheShip + info.fishingCode" readonly/></span>
                            </li>
                            <li>
                                <label>船号</label>
                                <span><input v-model="info.memberName" readonly/></span>
                            </li>
                            <li>
                                <label>所有人</label>
                                <span><input v-model="info.memberName" readonly/></span>
                            </li>
                            <li>
                                <label>作业方式</label>
                                <span><input v-model="info.operationMode" readonly/></span>
                            </li>
                            <li>
                                <label>船质</label>
                                <span><input v-model="info.shipQuality" readonly/></span>
                            </li>
                        </ul>
                        <ul class="info-list1">
                            <li>
                                <label>主机功率(千瓦)</label>
                                <span><input v-model="info.powerPs" readonly/></span>
                            </li>
                            <li>
                                <label>吨位(吨)</label>
                                <span><input v-model="info.grossTonnage" readonly/></span>
                            </li>
                        
                            <li>
                                <label>船区</label>
                                <span><input v-model="info.navigationArea" readonly/></span>
                            </li>
                            
                            <li>
                                <label>船龄年</label>
                                <span><input v-model="info.ageship" readonly/></span>
                            </li>
                            <li>
                                <label>船舶价值(万元)</label>
                                <span><input v-model="info.shipValue" readonly/></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-wrap1">
                    <p class="info-title1"><i></i>保额保费合计</p>
                    <div class="info-content1">
                        <ul class="info-list1">
                            <li>
                                <label>合计保额:</label>
                                <span>{{info.totalAmountmillionYuan}}</span>
                            </li>
                            <li>
                                <label>中央补贴:</label>
                                <span>{{info.centralSubsidy}}</span>
                            </li>

                            <li>
                                <label>市级补贴:</label>
                                <span>{{info.municipalSubsidies}}</span>
                            </li>
                            <li>
                                <label>乡镇补贴:</label>
                                <span>{{info.townshipSubsidy}}</span>
                            </li>
                            <li>
                                <label>优惠比例:</label>
                                <span>{{info.preferentialRatio}}</span>
                            </li>
                            <li>
                                <label>应收互保费:</label>
                                <span>{{info.premiumReceivable}}</span>
                            </li>
                        </ul>
                        <ul class="info-list1">
                            <li>                      
                                <label>合计保费:</label>
                                <span>{{info.totalPremium}}</span>
                            </li>
                            <li>
                                <label>省级补贴:</label>
                                <span>{{info.provincialSubsidies}}</span>
                            </li>
                            <li>
                                <label>县级补贴:</label>
                                <span>{{info.countySubsidy}}</span>
                            </li>
                            <li>                     
                                <label>补贴总额:</label>
                                <span>{{info.totalFinancialSubsidies}}</span>
                            </li>
                            <li>                      
                                <label>优惠金额：</label>
                                <span>{{info.discountAmount}}</span>
                            </li>
                            <li>                     
                                <label>应实缴互保费：</label>
                                <span>{{info.paidpremium}}</span>
                            </li>   
                        </ul>
                    </div>
                </div>
            </div>
            <div class="wrapper1 free1">
                <div class="info-wrap1 main1">
                    <p class="info-title1"><i></i>互保责任</p>
                    <div class="info-content1 free1">
                        <ul class="info-free1">
                            <li>
                                <label>责任类别：</label>
                                <span>{{info.mutualResponsibility}}</span>
                            </li>
                            <li>
                                <label>费率：</label>
                                <span>{{info.rate}}</span>
                            </li>
                            <li>
                                <label>互保比例(%)：</label>
                                <span>{{info.mutualProportion}}</span>
                            </li>
                            <li>
                                <label>合计保额（万元）：</label>
                                <span>{{info.totalAmountmillionYuan}}</span>
                            </li>
                            <li>
                                <label>合计保费（元）：</label>
                                <span>{{info.totalPremium}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-wrap1 main1">
                    <p class="info-title1"><i></i>缴费计划</p>
                    <div class="info-content1 free1">
                        <ul class="info-free1">
                            <li>
                                <label>是否分期：</label>
                                <span>{{info.isStaging}}</span>
                            </li>
                            <li>
                                <label>期内应收互保费（元）：</label>
                                <span>{{info.interAnnualPremium}}</span>
                            </li>
                            <li>
                                <label>是否实收：</label>
                                <span>{{info.stagingMutualInsuranceFee}}</span>
                            </li>
                            <li>
                                <label>是否注销：</label>
                                <span>{{info.isWriteOff}}</span>
                            </li>
                            <li>
                                <label>经办人：</label>
                                <span>{{info.manager}}</span>
                            </li>
                            <li>
                                <label>录单员：</label>
                                <span>{{info.recordClerk}}</span>
                            </li>
                            <li>
                                <label>核保员：</label>
                                <span>{{info.underwriter}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="appoint1">
                    <p class="info-title1"><i></i>特别约定</p>
                    <p><i>1、</i><span>条款适用：本凭证适用雇主责任互助保险条款（2015版）。</span></p>
                    <p><i>2、</i>无理赔：凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</span></p>
                    <p><i>3、</i>除外责任：除投保时另有约定的项目外，其它船舶技术检验证书中未载明且主管部门未规定要求配备的仪器和设备，本会不负责赔偿。</span></p>
                    <p><i>4、</i>绝对理赔：无论会员是否违反条款有关会员义务的约定，部分损失至少须扣减绝对免赔额800元或绝对免赔率10％，两者以高者为准,互保渔船发生互保责任范围内的损失，本会根据失责程度按下列约定扣除免赔率：（1）未按约定时间报案影响本会及时查勘、准确理赔的，按30％以上扣除免赔率，直至拒赔。（2）未经本会同意，擅自向第三者支付赔偿或相应报酬的，一律按拒赔处理。（3）因会员过失致使本会不能行使代位追偿权利的，按30％以上扣除免赔率，直至拒赔</span></p>
                    <p><i>5、</i>免赔：下列情况或支出费用的，不属于附加机损责任赔偿范围：（1）被保渔船在正常维修保养过程中发生的机损；（2）未按规定进行维修保养或使用非合格产品导致的机损； （3）机损后维修使用的油料及易损、易耗品； （4）机损后未经协会理赔机构同意擅自更换零部件的。2、在一次事故中，对承保范围内的受损项目，本会按下列约定的金额为限给予赔偿，对被保险机器设备在修复或重置过程中发生的任何变更、性能增加或改进所产生的额外费用，本会不负责赔偿。 其中、主机个数:一个，机损主机功率：220(千瓦)，桨的材质：铜和不锈钢；（1）曲轴：3.20万元；（2）上下机体：2.80万元；（3）主机维修费：1.20万元；（4）中间轴：0.14万元；（5）尾轴：0.52万元；（6）桨：1.42万元；（7）舵：0.56万元。</span></p>
                </div>
            </div>
            <!-- <span  style="background-color:#fff;width:100%;">特别约定</span>
            <table>
                <tr class="" style="margin:0;background-color:#bcd9ec;width:100%;height:30px;line-height:30px;text-align:center">
                    <td width=80 >序号</td>
                    <td width=120>名称</td>
                    <td>内容</td>      
                </tr>
            </table>
            <table  style="width:100%;background-color:#dce7ee;height:105;margin-bottom:10px" >
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>1</td> 
                    <td width=120>条款适用</td>
                    <td  style="text-align:left">本凭证适用雇主责任互助保险条款（2015版）。</td>
                </tr>
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>2</td> 
                    <td width=120>无理赔</td>
                    <td style="text-align:left">凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</td>
                </tr>
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>3</td> 
                    <td width=120>除外责任</td>
                    <td style="text-align:left">除投保时另有约定的项目外，其它船舶技术检验证书中未载明且主管部门未规定要求配备的仪器和设备，本会不负责赔偿。</td>
                </tr> 
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>4</td> 
                    <td width=120>绝对理赔</td>
                    <td  style="text-align:left">无论会员是否违反条款有关会员义务的约定，部分损失至少须扣减绝对免赔额800元或绝对免赔率10％，两者以高者为准,互保渔船发生互保责任范围内的损失，本会根据失责程度按下列约定扣除免赔率：</td>
                </tr>
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>5</td> 
                    <td width=120>免赔</td>
                    <td style="text-align:left">（1）未按约定时间报案影响本会及时查勘、准确理赔的，按30％以上扣除免赔率，直至拒赔。（2）未经本会同意，擅自向第三者支付赔偿或相应报酬的，一律按拒赔处理。（3）因会员过失致使本会不能行使代位追偿权利的，按30％以上扣除免赔率，直至拒赔</td>
                </tr>
                <tr class="bottom" style="width:100%;margin-top:-5px">          
                    <td width=80>6</td> 
                    <td width=120>附加机损</td>
                    <td style="text-align:left">1、下列情况或支出费用的，不属于附加机损责任赔偿范围： </td>
                </tr>   
            </table>
             -->

  </dataContent>

</template>
<script>
import dataContent from "@/views/components/content/MyContent.vue";
export default {
  components: {
    dataContent
  },
  data() {
    return {
      height: "550",
      info: ""
    };
  },
  methods: {
    init() {
      if (
        this.$util.isNull(this.$route.query) ||
        this.$route.query.row == undefined
      ) {
        this.$router.push("/enforcement/achive/shipInsurance");  
        return;
      }
        this.info = this.$route.query.row;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams"
  }
};
</script>

<style scoped>
/* .tou-left td:first-child,.tou-right td:first-child{
    text-align: right;
}
table {
  width: 100%;
}
tr{
    width:100%
}
div {
  float: left;
}
input {
  background-color: #bcd9ec;
  text-align: left;
  outline: none;
  border: 1px solid #eee;
  margin-left: 5px;
  padding: 5px; 
}
.name1{
    margin-left:300px
}
.neiRong{
    margin-left:600px
}
.tou-left {
  width: 65%;
  height:235px;
  background-color: #dce7ee;
  padding: 10px;
}

.tou-right {
  width: 30%;
  height:235px;
  background-color: #dce7ee;
  padding: 10px;
  margin-left: 5%;
}

.two {
  background-color: #dce7ee;
  width: 100%;
}
.bottom-tou {
  text-align: center;
  background-color: #bcd9ec;
}
.bottom {
  text-align: center;
  background-color: #dce7ee;
} */
</style>

