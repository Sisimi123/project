<template>
  <data-content>
    <Card style="margin-bottom:15px">
      <p slot="title">渔船基本信息</p>
      <div>
        <Row>
          <Col :span="12">
            <div class="shipBasicInfo">
              <div>
                <span>渔船名:</span>
                <span>{{info.shipname}}</span>
              </div>
              <div>
                <span>船东:</span>
                <span>{{info.owner}}</span>
              </div>
              <div>
                <span>联系电话:</span>
                <span>{{info.tel}}</span>
              </div>
              <div>
                <span>渔船尺寸:</span>
                <span>长{{info.length}};宽{{info.width}};深{{info.depth}};</span>
              </div>
              <div>
                <span>主机功率:</span>
                <span>{{info.power}}KW</span>
              </div>
              <div>
                <span>经纬度:</span>
                <span>{{tranformDuFenMiao(info.lon)}}N;{{tranformDuFenMiao(info.lat)}}E;</span>
              </div>
              <div>
                <span>船员数:</span>
                <span>{{info.seamanList.length}}</span>
              </div>
              <div>
                <span>报位时间:</span>
                <span>{{info.posTime}}</span>
              </div>
              <div>
                <span>捕捞许可证编号:</span>
                <span>{{info.fishingLicenseNumberA}}</span>
                <span style="color:#55d338">（有效期 {{info.blxkzEffectiveTime}}）</span>
              </div>
            </div>
          </Col>
          <Col :span="12">
            <div class="shipBasicInfo">
              <div>
                <span>渔船类型:</span>
                <span>{{info.shiptype}}</span>
              </div>
              <div>
                <span>作业类型:</span>
                <span>{{info.worktype}}</span>
              </div>
              <div>
                <span>作业方式:</span>
                <span>{{info.workmodel}}</span>
              </div>
              <div>
                <span>所在渔港名称:</span>
                <span>{{info.portname}}</span>
              </div>
              <div>
                <span>航速:</span>
                <span>{{info.sog}}节</span>
              </div>
              <div>
                <span>航迹向:</span>
                <span>{{info.cog}}度</span>
              </div>
              <div>
                <span>渔船检验证书编号:</span>
                <span>{{info.issuanceCertNumber}}</span>
                <span style="color:#55d338">（有效期 {{info.issuanceCertEffectiveTime}}）</span>
              </div>
              <div>
                <span>渔船登记证书编号:</span>
                <span>{{info.fishVessOwneRegiCertNumb}}</span>
                <span style="color:#55d338">（有效期 {{info.valiDateVessRegiCert}}）</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card style="margin-bottom:15px">
      <p slot="title">船员数据</p>
      <div style="padding:0 25px">
        <Row :gutter="50">
          <div v-if="info.seamanList.length>0">
            <template v-for="(v,i) in info.seamanList">
              <Col :span="8" :key="i">
                <div
                  :class="isEffective(v.fidUsedtime)?'seamanList effective':'seamanList invalid'"
                  :key="i"
                >
                  <div v-if="isEffective(v.fidUsedtime)" class="status effectiveLabel">有效</div>
                  <div v-else class="status invalidLabel">无效</div>
                  <img src="./images/man.png" v-if="v.gender == '男'" alt />
                  <img src="./images/man.png" v-else alt />
                  <div class="listRight">
                    <div>
                      <span class="fidName">{{v.fidName}}</span>
                    </div>
                    <div>
                      <span>性别:</span>
                      <span>{{v.gender}}</span>
                    </div>
                    <div>
                      <span>年龄:</span>
                      <span>{{v.age}}</span>
                    </div>
                    <div>
                      <span>职位:</span>
                      <span>{{v.fidLetter}}</span>
                    </div>
                    <div>
                      <span>有效期:</span>
                      <span>{{v.fidUsedtime}}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </template>
          </div>
          <div class="noDate" v-else>未查询到数据！</div>
        </Row>
      </div>
    </Card>
    <Card style="margin-bottom:15px">
      <p slot="title">行政处罚</p>
      <div style="padding:0 25px">
        <Row :gutter="50">
          <div v-if="info.caseInfoList.length>0">
            <template v-for="(v,i) in info.caseInfoList">
              <Col :span="8" :key="i">
                <div class="enforceListBox" :key="i">
                  <div
                    style="border-radius:0;margin-bottom:0"
                    id="enforceList"
                    :class="isStyle(i+1)"
                    :key="i"
                  >
                    <div class="listImage">
                      <img src="./images/case_one.png" v-if="isStyle(i+1) == 'leftBox'" alt />
                      <img src="./images/case_three.png" v-else-if="isStyle(i+1) == 'rightBox'" alt />
                      <img src="./images/case_two.png" v-else alt />
                    </div>
                    <div class="listRight caseInfoListRight">
                      <div>
                        <span>案件编号:</span>
                        <span>{{v.caseNum}}</span>
                      </div>
                      <div>
                        <span>案发时间:</span>
                        <span :title="v.caseHappenTime">{{v.caseHappenTime}}</span>
                      </div>
                      <div>
                        <span>案由:</span>
                        <span :title="v.illegalAct">{{v.illegalAct}}</span>
                      </div>
                      <a @click="goCaseInfo(v)" class="goButton">查看详情 >></a>
                    </div>
                  </div>
                </div>
              </Col>
            </template>
          </div>
          <div class="noDate" v-else>未查询到数据！</div>
        </Row>
      </div>
    </Card>
    <Card>
      <p slot="title">执法检查</p>
      <div style="padding:0 25px">
        <Row :gutter="50">
          <div v-if="info.enforceList.length>0">
            <template v-for="(v,i) in info.enforceList">
              <Col :span="8" :key="i">
                <div id="enforceList" :class="isStatus(v.checkStatus)" :key="i">
                  <div class="listImage">
                    <img src="./images/normal.png" v-if="v.checkStatus == '已查正常'" alt />
                    <img src="./images/abnormal.png" v-else-if="v.checkStatus == '已查异常'" alt />
                    <img src="./images/inspection.png" v-else-if="v.checkStatus == '检查中'" alt />
                    <img src="./images/unchecked.png" v-else-if="v.checkStatus == '未检查'" alt />
                  </div>
                  <div class="listRight enforceListRight">
                    <div>
                      <span>检查事项:</span>
                      <span :title="v.formName">{{v.formName}}</span>
                    </div>
                    <div>
                      <span>检查结果:</span>
                      <span class="checkStatus">{{v.checkStatus}}</span>
                    </div>
                    <div>
                      <span>检查时间:</span>
                      <span :title="v.checkTime">{{v.checkTime}}</span>
                    </div>
                    <div>
                      <span>检查人:</span>
                      <span>{{v.checkName}}</span>
                    </div>
                  </div>
                </div>
              </Col>
            </template>
          </div>
          <div class="noDate" v-else>未查询到数据！</div>
        </Row>
      </div>
    </Card>
  </data-content>
</template>

<script>
export default {
  props:{
    info:{
      type: Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    tranformDuFenMiao(val) {
      let du;
      if (val > 1000000) {
        du = val / 10000000;
      } else {
        du = val;
      }
      var d = parseInt(du);
      var fen = (du - d) * 60;
      var f = parseInt(fen);
      var m = parseInt((fen - f) * 60);
      return d + "°" + f + "′" + m + "″";
    },
    isEffective(val) {
      let time = new Date(val);
      time = time.getTime(time);
      let newTime = new Date();
      newTime = newTime.getTime(newTime);
      if (time < newTime) {
        return false;
      } else {
        return true;
      }
    },
    isStatus(val) {
      let state;
      if (val == "已查正常") {
        state = "normal";
      } else if (val == "已查异常") {
        state = "abnormal";
      } else if (val == "检查中") {
        state = "inspection";
      } else {
        state = "unchecked";
      }
      return state;
    },
    isStyle(val) {
      let state;
      if (Math.floor((val + 2) / 3) === val) {
        state = "leftBox";
      } else if (Math.floor(val / 3) === val) {
        state = "rightBox";
      } else {
        state = "centreBox";
      }
      return state;
    },
    goCaseInfo(data){
      this.$router.push({
        path: "/supervision/details/caseInfo",
        query: { info: data }
      });
    }
  },
  mounted() {
    // this.info = this.$route.query.info;
    // console.log(this.info, "info");
  }
};
</script>

<style scoped>
.shipBasicInfo div {
  margin-bottom: 5px;
  margin-left: 15%;
}
.shipBasicInfo div span:first-child {
  display: inline-block;
  font-weight: 600;
  letter-spacing: 1px;
  width: 160px;
  margin-right: 6%;
  color: #000;
}
.seamanList,
#enforceList {
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  position: relative;
  /* overflow: hidden; */
}
#enforceList {
  background: #f0f0fa;
  border-radius: 10px;
}
.seamanList img,
#enforceList img {
  width: 78px;
  height: 78px;
  margin: 0 30px;
  margin-top: 26px;
  /* float: left; */
}
#enforceList img {
  margin: 0px 30px 0 20px !important;
}
.listRight div {
  margin-bottom: 5px;
}
.listRight div span {
  color: #babbbf;
}
.fidName {
  color: #000 !important;
  font-weight: 600;
}
.listRight div span:first-child {
  margin-right: 8px;
}
.enforceListRight div span:first-child,
.caseInfoListRight div span:first-child {
  width: 62px;
  display: inline-block;
  margin-right: 12px;
  color: #000;
  font-weight: 600;
}
.caseInfoListRight div span:first-child {
  width: unset !important;
}
.effective {
  background: #f0f0fa;
  border-radius: 10px;
}
.invalid {
  background: #eeeeee;
  border-radius: 10px;
}
.status {
  padding: 2px 5px;
  font-weight: 600;
  border-radius: 3px;
  letter-spacing: 1px;
  position: absolute;
  top: 10px;
  right: 10px;
}
.effectiveLabel {
  background: #cdeacf;
  color: #72d658;
}
.invalidLabel {
  background: #efd9db;
  color: #ed6269;
}
.normal {
  border-left: 15px solid #48d024;
}
.abnormal {
  border-left: 15px solid #ee2b27;
}
.inspection {
  border-left: 15px solid #fdb346;
}
.unchecked {
  border-left: 15px solid #aaaaaa;
}
.normal .checkStatus {
  color: #48d024;
}
.abnormal .checkStatus {
  color: #ee2b27;
}
.inspection .checkStatus {
  color: #fdb346;
}
.unchecked .checkStatus {
  color: #535353;
}
.enforceListRight,
.caseInfoListRight {
  overflow: hidden;
}
.enforceListRight div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* display: -webkit-box;    
  -webkit-box-orient: vertical;    
  -webkit-line-clamp: 2;    
  overflow: hidden; */
}
.caseInfoListRight div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.noDate {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.leftBox {
  border-left: 15px solid;
  border-image: linear-gradient(#7f64e1, #3c96fb) 30 30;
}
.centreBox {
  border-left: 15px solid;
  border-image: linear-gradient(#28cae3, #44ddb9) 30 30;
}
.rightBox {
  border-left: 15px solid;
  border-image: linear-gradient(#fe8a2a, #fdbd43) 30 30;
}
.enforceListBox {
  /* padding: 10px; */
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
}
.listImage {
  display: flex; /*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items: center;
}
.goButton {
  color: #5fa8f2 !important;
  float: right;
  margin: 0 !important;
  margin-top: 5px;
  font-weight: 500
}
</style>