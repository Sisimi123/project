<style lang="less">

</style>

<template>
<!-- 当前报位  -->
<div>
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

        <div slot="header" v-if="showHeader">
            <slot name="header"></slot>
        </div>
        <div slot="close" v-if="showClose">
            <slot name="close"></slot>
        </div>
        <!-- <div slot="footer" v-if="showFooter">
            <slot name="footer"></slot>
        </div> -->
        <div slot="footer">
            <Button  @click="ok">关闭</Button>
        </div>
        <Form :label-width="100" :model="info"  ref="info">

            <Row>
                <Col span="8">
                    <Form-item label="船舶ID:" >
                        <Input v-model="info.a" />
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="终端类型:" >
                        <Input v-model="terminalType"/> 
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="更新时间:" >
                        <Input v-model="dicTime" />
                    </Form-item>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="终端号码:" >
                        <Input v-model="info.c" />
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="AIS报名:" >
                        <Input v-model="info.d"/> 
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="状态:" >
                        <Input v-model="shipReportStatus"/> 
                    </Form-item>
                </Col>
                
            </Row>
            <Row>
                <Col span="8">
                    <Form-item label="经度°:" >
                        <Input v-model="info.e"/>
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="纬度°:" >
                        <Input v-model="info.f" />
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="航速(m/s):" >
                        <Input v-model="info.h"/>
                    </Form-item>
                </Col>
            </Row>

            <Row>
                <Col span="8">
                    <Form-item label="吃水(m):" >
                        <Input v-model="info.i" />
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="船首向:" >
                        <Input v-model="info.j"/> 
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="航迹向:" >
                        <Input v-model="info.k"/>
                    </Form-item>
                </Col>
            </Row>
            <!-- <Row>
                <Col span="8">
                    <Form-item label="转向率:" >
                        <Input v-model="info.l" />
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="目的地:" >
                        <Input v-model="info.m"/> 
                    </Form-item>
                </Col>
                <Col span="8">
                    <Form-item label="预到时间:" >
                        <Input v-model="info.n"/>
                    </Form-item>
                </Col>
            </Row> -->

        </Form>
        

    </Modal>
</div>

</template>

<script>

export default {
  name: "shipPosition",
  components: {

  },
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
      default: "详情"
    },
    width: {
      type: [Number, String],
      default: 860
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
      type: String
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
      default() {
        return ["ease", "fade"];
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    // ------
    shipName:{
      type: String
    },

  },
  data() {
    return {
      // default
      visible: false,
      // ------
      status: {
          needCopy: false,
          showCamera: false,
      },
      info:{

      },
    };
  },
  computed: {
    // default
    showFooter() {
      return this.$slots.footer == undefined ? false : true;
    },
    showHeader() {
      return this.$slots.header == undefined ? false : true;
    },
    showClose() {
      return this.$slots.close == undefined ? false : true;
    },
    // ------
    // actionData() {
    //     return {
    //         moduleId: "oneshiponefile_cbjy",
    //         dataId: this.info.id,
    //     };
    // },
    // actionUrl(){
    //     return this.$basePath + "/$admin/attachs/";
    // } 
    dicTime(){
        if(!this.isEmpty(this.info.o)){
            var date = new Date(parseInt(this.info.o)* 1000);
            console.log(date);
            var month = date.getMonth() + 1;
            month = month.toString().toString().length == 1 ? '0' + month : month; 
            var day = date.getDate().toString().length == 1 ? '0' + date.getDate() :date.getDate();

            var h = date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours();
            var m = date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes();
            var s = date.getSeconds().toString().length == 1 ? '0' + date.getSeconds() : date.getSeconds();

            return [date.getFullYear(), month, day].join('-') + " " + [h, m, s].join(':');
        } else {
            return "";
        }
    },
    terminalType() {
        if(!this.isEmpty(this.info.b)){
            return this.$store.getters.getDictName("terminalType",this.info.b)
        } else {
            return "";
        }
    },
    shipReportStatus() {
        if(!this.isEmpty(this.info.g)){
            return this.$store.getters.getDictName("shipReportStatus",this.info.g)
        } else {
            return "";
        }
    },
    
  },
  mounted() {},
  methods: {
    // default
    close() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-cancel");
    },
    cancel() {
      this.close();
      this.visible = false;
    },
    ok() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-ok");
    },
    visibleChange(val) {
      this.visible = val;
      if (!this.visible) this.close();
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    // ----
    formatLonLatToDegree(loc) {
        var degree = parseInt(loc);
        var min = parseInt((loc - degree) * 60);
        var sec = parseInt((loc - degree) * 3600 - min * 60);
        return degree + '°' + (min<10?('0'+min):min) + '′' + (sec<10?('0'+sec):sec) + '″';
    },
    init() {
      this.$http.get("/ycdtjg/authXcx/getPositionByName?shipName=" + this.shipName)
        .then(res => {
            if (res.success && !this.isEmpty(res.data)) {
                this.visible = true;
                this.info = res.data;
                this.info.e = this.formatLonLatToDegree(this.info.e/1000000)+"E";
                this.info.f = this.formatLonLatToDegree(this.info.f/1000000)+"N";

                if(!this.isEmpty(this.info.h)){
                    this.info.h = this.info.h/10;
                }

                if(!this.isEmpty(this.info.i)){
                    this.info.i = this.info.i/10;
                }

                if(this.info.j*2 >= 360){
                    this.info.j = "北";
                } else if(this.info.j*2 > 270) {
                    this.info.j = "西北";
                } else if(this.info.j*2 == 270) {
                    this.info.j = "西";
                } else if(this.info.j*2 > 180) {
                    this.info.j = "西南";
                }else if(this.info.j*2 == 180) {
                    this.info.j = "南";
                }else if(this.info.j*2 > 90) {
                    this.info.j = "东南";
                }else if(this.info.j*2 == 90) {
                    this.info.j = "东";
                }else if(this.info.j*2 > 0) {
                    this.info.j = "东北";
                }else if(this.info.j*2 == 0) {
                    this.info.j = "北";
                }

                if(this.info.k*2 >= 360){
                    this.info.k = "北";
                } else if(this.info.k*2 > 270) {
                    this.info.k = "西北";
                } else if(this.info.k*2 == 270) {
                    this.info.k = "西";
                } else if(this.info.k*2 > 180) {
                    this.info.k = "西南";
                }else if(this.info.k*2 == 180) {
                    this.info.k = "南";
                }else if(this.info.k*2 > 90) {
                    this.info.k = "东南";
                }else if(this.info.k*2 == 90) {
                    this.info.k = "东";
                }else if(this.info.k*2 > 0) {
                    this.info.k = "东北";
                }else if(this.info.k*2 == 0) {
                    this.info.k = "北";
                }
            } else {
                this.visible = false;
                this.$Message.info("暂无该渔船的报位信息");
            }
        })
        .catch(error => {
            console.log(error);
        });
    },


  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
        this.init();
      }
    }
  }
};
</script>
<style scoped>
</style>


