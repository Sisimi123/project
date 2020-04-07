<style lang="less">
</style>

<template>
    <Modal 
        v-model="visible" 
        :closable="closable"
        :maskClosable="maskClosable"
        :title="title"
        :width="width"
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

        <!-- 主体 -->
        <Form  :label-width=100>
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.portReport" @click="updatePortReport">全量同步出港数据</Button>
            </Col>
        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.attach" @click="updateAttach">全量同步附件</Button>
            </Col>

        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.kbjc" @click="updateKbjc">全量同步开捕检查</Button>
            </Col>
        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.yhw" @click="updateYhw">全量同步违禁渔获物</Button>
            </Col>
        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.zysj" @click="updateZysj">全量同步自愿上缴</Button>
            </Col>
        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.ycyd" @click="updateYcyd">初始化一船一档数据</Button>
            </Col>
        </Row>
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.skhc" @click="updateSkhc">初始化三库核查数据</Button>
            </Col>
        </Row> 
        <Row class="margin-bottom-16">
            <Col span=12>
                <Button type="info" :loading="status.skdb" @click="updateSkdb">初始化四库对比数据</Button>
            </Col>
        </Row> 
        </Form>
    </Modal>
</template>

<script>
export default {
  name: "update-info",
  props: {
    // default
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
      default: "同步数据入口。只有admin账户展示入口。请谨慎操作"
    },
    width: {
      type: [Number, String],
      default: 520
    },
    okText: {
      type: String,
      default: "确定"
    },
    cancelText: {
      type: String,
      default: "返回"
    },
    loading: {
      type: Boolean,
      default: false
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
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
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    }
    // ------
  },
  data() {
    return {
      // default
      visible: false,
      // ------
      status:{
          portReport:false,
          attach:false,
          kbjc:false,
          yhw:false,
          zysj:false,
          ycyd:false,
          skhc:false,
          skdb:false,
      },
    };
  },
  computed: {
    // default
    footer() {
      return this.$slots.footer == undefined ? false : true;
    },
    header() {
      return this.$slots.header == undefined ? false : true;
    },
    close() {
      return this.$slots.close == undefined ? false : true;
    }
    // ------
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    // default
    ok() {
      this.visible = false;
      if (!this.loading) this.$emit("input", this.visible);
      this.$emit("on-ok");
    },
    cancel() {
      this.visible = false;
      this.$emit("input", this.visible);
      this.$emit("on-cancel");
    },
    visibleChange(val) {
      this.$emit("on-visible-change", val);
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    // ------
    updateYhw(){
      this.status.yhw = true;
        this.$http
          .get("/checks/receive/updateOld")
          .then(res => {
              this.status.yhw = false;
              if(res.success){
                  this.$Notice.open({
                      title: '更新完成',
                      desc: '违禁渔获物更新完成',
                  });
              } else {
                  console.log(res);
                  this.$Notice.open({
                      title: '更新异常！！！',
                      desc: '违禁渔获物更新异常',
                  });
              }
              
          })
          .catch(error => {
              console.log(error);
          });
    },
    updateZysj(){
      this.status.yhw = true;
        this.$http
          .get("/checks/promisehand/updateOld")
          .then(res => {
              this.status.zysj = false;
              if(res.success){
                  this.$Notice.open({
                      title: '更新完成',
                      desc: '自愿上缴更新完成',
                  });
              } else {
                  console.log(res);
                  this.$Notice.open({
                      title: '更新异常！！！',
                      desc: '自愿上缴更新异常',
                  });
              }
              
          })
          .catch(error => {
              console.log(error);
          });
    },
    updatePortReport(){
        this.status.portReport = true;
        this.$http
            .get("/checks/portreport/updateOld")
            .then(res => {
                this.status.portReport = false;
                if(res.success){
                    this.$Notice.open({
                        title: '更新完成',
                        desc: '出港报告更新完成',
                    });
                } else {
                    console.log(res);
                    this.$Notice.open({
                        title: '更新异常！！！',
                        desc: '出港报告更新异常',
                    });
                }
                
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateAttach(){
        this.status.attach = true;
        this.$http
            .get("/$admin/attachs/updateOld")
            .then(res => {
                this.status.attach = false;
                if(res.success){
                    this.$Notice.open({
                        title: '更新完成',
                        desc: '附件更新完成',
                    });
                } else {
                    console.log(res);
                    this.$Notice.open({
                        title: '更新异常！！！',
                        desc: '附件更新异常',
                    });
                }
                
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateKbjc(){
        this.status.kbjc = true;
        this.$http
            .get("/checks/kbjc/updateOld")
            .then(res => {
                this.status.kbjc = false;
                if(res.success){
                    this.$Notice.open({
                        title: '更新完成',
                        desc: '开捕检查更新完成',
                    });
                } else {
                    console.log(res);
                    this.$Notice.open({
                        title: '更新异常！！！',
                        desc: '开捕检查更新异常',
                    });
                }
                
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateYcyd(){
        this.status.ycyd = true;
        this.$http
            .get("/standingbook/oneshiponefile/initInfo")
            .then(res => {
                this.status.ycyd = false;
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateSkhc(){
        this.status.skhc = true;
        this.$http
            .get("/check/skhc/updateOld")
            .then(res => {
                this.status.skhc = false;
            })
            .catch(error => {
                console.log(error);
            });
    },
    updateSkdb(){
        this.status.skdb = true;
        this.$http
            .get("/check/skdb/updateOld")
            .then(res => {
                this.status.skdb = false;
            })
            .catch(error => {
                console.log(error);
            });
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.visible = val;
      }
    }
  }
};
</script>
<style scoped>
.margin-bottom-16{
    margin-bottom: 16px;
}
</style>


