<template>
  <data-content>
    <Card>
      <p slot="title">行政处罚详情</p>
      <div>
        <div class="caseTitle">{{info.illegalAct}}</div>
        <div class="caseCentreBox">
          <Row class="list">
            <Col :span="14">
              <span>行政处罚决定书文号:</span>
              <span>{{info.caseNum}}</span>
            </Col>
            <Col :span="10">
              <span>被处罚单位（被处罚人）:</span>
              <span>{{info.punishedName}}</span>
            </Col>
            <Col style="margin-top:20px" :span="14">
              <span>执法部门:</span>
              <span>{{info.headName}}</span>
            </Col>
            <Col style="margin-top:20px" :span="10">
              <span>做出行政处罚的日期:</span>
              <span>{{info.caseHappenTime}}</span>
            </Col>
          </Row>
          <div class="punishContent">
            <div class="contentLabel">行政处罚决定书（全文或摘要）:</div>
            <div class="text">{{info.punishContent}}</div>
          </div>
        </div>
      </div>
    </Card>
  </data-content>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  mounted() {
    this.info = this.$route.query.info;
    console.log(this.info);
  }
};
</script>

<style scoped>
.caseTitle {
  text-align: center;
  margin-top: 20px;
  color: black;
  font-weight: 600;
}
.caseCentreBox {
  margin-top: 30px;
  padding: 0 15%;
}
.list div span:first-child {
  display: inline-block;
  width: 220px;
  font-weight: 600;
}
.punishContent {
  margin-top: 20px;
  display: flex;
}
.contentLabel {
  width: 220px;
  font-weight: 600;
}
.text {
  width: calc(100% - 220px);
  text-indent: 2em;
  line-height: 30px;
}
</style>