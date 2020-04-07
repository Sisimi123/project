<style lang="less">
@import "../styles/details.less";
</style>
<template>
  <dataContent>      
            <div class="wrapper1">
                <div class="info-wrap1 main1">    
                    <p class="info-title1"><i></i>基本信息</p>
                    <div class="info-content1">
                        <ul class="info-list1">
                            <li>
                                <label>互保类别:</label>
                                <span><input v-model="info.mutualInsuranceCategory" readonly></span>
                            </li>
                            <li>
                                <label>会员名:</label>
                                <span><input v-model="info.memberName" readonly></span>
                            </li>
                            <li>
                                <label>互保凭证号:</label>
                                <span><input v-model="info.mutuInsuCertNo" readonly></span>
                            </li>
                            <li>
                                <label>核保日期:</label>
                                <span><input v-model="info.underwritingDate" readonly></span>
                            </li>
                            <li>
                                <label>互保起期:</label>
                                <span><input v-model="info.fromdatemutualInsurance" readonly></span>
                            </li>
                            <li>
                                <label>互保止期:</label>
                                <span><input v-model="info.mutualCheckPeriod" readonly></span>
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
                                <span><Input v-model="info.villageCompany" type="textarea" readonly :autosize="true" class="textarea"/></span>
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
                                <label>每人保额（万元）</label>
                                <span>{{info.amountPerMillionYuan}}</span>
                            </li>
                            <li>
                                <label>主险保额（万元）</label>
                                <span>{{info.mainInsuCoveMillYuan}}</span>
                            </li>
                            <li>
                                <label>每人互保费</label>
                                <span>{{info.mutuInsuFeePerPers}}</span>
                            </li>
                            <li>
                                <label>主险互保费</label>
                                <span>{{info.masterPremium}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-wrap1 main1">
                    <!-- <p class="info-title"><i></i>互保责任</p> -->
                    <div class="info-content1 free1">
                        <ul class="info-free1">
                            <li>
                                <label>互保人数：</label>
                                <span>{{info.mutualInsuranceNo}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="info-wrap1 main1">
                    <p class="info-title1"><i></i>互保责任</p>
                    <table border="1" bordercolor="#e9eaec">
                        <tr>
                            <th>责任类别</th>
                            <th>每人保额（万元）</th>
                            <th>主险保额（万元）</th>      
                            <th>每人互保费</th>
                            <th>主险互保费</th>
                        </tr>
                        <tr>
                            <td >{{info.mutualResponsibility}}</td> 
                            <td >{{info.amountPerMillionYuan}}</td>
                            <td >{{info.mainInsuCoveMillYuan}}</td>
                            <td >{{info.mutuInsuFeePerPers}}</td>
                            <td >{{info.masterPremium}}</td>
                        </tr>
                        <tr>
                            <td >{{info.additionalLiability}}</td> 
                            <td >{{info.onePerMillAddiLiabCove}}</td>
                            <td >{{info.aMillAddiLiabInsu}}</td>
                            <td >{{info.addiLiabPerPers}}</td>
                            <td >{{info.additionalLiabilityA}}</td>
                        </tr>
                        <tr>          
                            <td >{{info.additionalLiabilityTwo}}</td> 
                            <td >{{info.amounttwoPerPerson}}</td>
                            <td >{{info.twoAddiLiabCoveMillYuan}}</td>
                            <td >{{info.mutuInsuFeetPerPers}}</td>
                            <td >{{info.addiLiabTwoMutuPrem}}</td>
                        </tr>
                        <tr>
                            <td >{{info.additionalLiabilityThree}}</td> 
                            <td >{{info.amountthreePerPerson}}</td>
                            <td >{{info.threAddiLiabCoveMillYuan}}</td>
                            <td >{{info.mutuInsuFeetPerPersA}}</td>
                            <td >{{info.addiLiabThreMutuPrem}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="appoint1">
                <p class="info-title1"><i></i>特别约定</p>
                <p><i>1、</i><span>条款适用：本凭证适用雇主责任互助保险条款（2015版）。</span></p>
                <p><i>2、</i>除外责任1：凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</span></p>
                <p><i>3、</i>除外责任2：除投保时另有约定的项目外，其它船舶技术检验证书中未载明且主管部门未规定要求配备的仪器和设备，本会不负责赔偿。</span></p>
            </div>
        <!-- 
        <table style="margin-top:10px">
            <tr  style="background-color:#fff;width:100%;">特别约定</tr>
            <tr class="bottom" style="background-color:#bcd9ec;width:100%">
                <td width=80>序号</td>
                <td>名称</td>
                <td>内容</td>      
            </tr>
           <tr class="bottom">          
                <td>1</td> 
                <td>条款适用</td>
                <td style="text-align:left">本凭证适用雇主责任互助保险条款（2015版）。</td>
            </tr>
            <tr class="bottom">          
                <td>2</td> 
                <td>除外责任1</td>
                <td style="text-align:left">凡在续保时已享受无理赔奖励优惠的，对于续保之日前发生的互保事故，视同会员放弃索赔，本会不予立案理赔。</td>
            </tr>
            <tr class="bottom">          
                <td>3</td> 
                <td>除外责任2</td>
                <td style="text-align:left">因交通事故、医疗事故等应由第三方负责民事赔偿的伤害，本会不负责赔偿。</td>
            </tr>           
        </table>
        <table style="margin-top:10px">
            <tr>缴费计划</tr>
            <tr class="bottom-tou">
                <td>是否分期</td>
                <td>期内应收互保费（元）</td>
                <td>是否实收</td>
                <td>分期互保费金额（元）</td>
                <td>是否注销</td>
                <td>经办人</td>
                <td>录单员</td>
                <td>核保员</td>
            </tr>
            <tr class="bottom">
                <td>{{info.isStaging}}</td>
                <td>{{info.interAnnualPremium}}</td>
                <td>{{info.isRealIncome}}</td>
                <td>{{info.stagingMutualInsuranceFee}}</td>
                <td>{{info.isWriteOff}}</td>
                <td>{{info.manager}}</td>
                <td>{{info.recordClerk}}</td>
                <td>{{info.underwriter}}</td>
            </tr>
        </table> -->

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
        this.$router.push("/enforcement/achive/employerInsurance");
        return;
      }
    //   var a = this.$route.query.row.underwritingdate;
    //   var b = a.substr(0, 10);
    //   console.log(b);
    //   this.info.underwritingdate = b;
    //   this.$nextTick(function() {
        this.info = this.$route.query.row;
        this.info.fromdatemutualInsurance = this.$route.query.row.z_filltime.substr(0,10)
    //   });
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

