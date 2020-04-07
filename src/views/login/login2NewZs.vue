<style lang="less">
@import "./login2New.less";
</style>

<template>
  <div class="login">
    <div class="title_login">
      <p>{{title}}</p>
    </div>
    <div class="downLoad_login">
      <!-- <a target="_blank">打印控件</a> -->
      <!-- <a target="_blank" :href="$basePath+'/static/pageoffice/sealsetup.exe'">PageOffice控件</a>
      <a target="_blank" href="http://115.238.45.165:20009/hyjgpt/zjs/index.jsp">浙江海渔通</a>
      <a target="_blank" href="http://115.238.45.165:20009/hyjgpt/zjs/public.jsp">海渔通公众版</a> -->
      <router-link to="/zs_Qrcode">海渔通小程序</router-link>
    </div>
    <div class="login-con">
      <Card :bordered="false" v-show="ifQRcode">
        <div style="width:400px;height:120px">
          <div style="float:left;width:200px;">
            <p style="color:#4F5B69;font-size:32px;padding-top:50px;width:100px">登录</p>
          </div>
          <!-- <div style="float:left;width:200px;">
            <img
              @click="QRCode_login"
              style="width:110px;height:110px;margin-left:80px;cursor:pointer"
              src="../../styles/QRcode.png"
            />
          </div> -->
        </div>
        <passwordLogin ref="passwordLogin"></passwordLogin>
      </Card>
      <Card v-show="!ifQRcode" :bordered="false">
        <div class="QRLogin_tips">
          <!-- <div class="QRLogin_tips_div">
            <p @click="selectQRcode('0')">扫码登录</p>
          </div> -->
          <!-- <div class="QRLogin_tips_div">
            <p @click="selectQRcode('1')">钉钉二维码</p>
          </div> -->
          <div class="QRLogin_tips_div2">
            <img @click="account_login" src="../../styles/QRCode_login.png" />
          </div>
        </div>
        <div v-show="isDingTalk">
          <dingdingLogin ref="dingdingLogin"></dingdingLogin>
        </div>
        <div v-show="!isDingTalk" style="text-align: center;height:406px">
          <haiYuTongLogin ref="haiYuTongLogin"></haiYuTongLogin>
        </div>
        <!-- <Button @click="account_login" type="primary"><img style="position:absolute;z-index:10;left:130px" src="../styles/goback.png"/>账号密码登录</Button> -->
      </Card>
      <p class="jszc">技术支持：浙江索思科技有限公司</p>
    </div>
    <Modal v-model="status.chooseUser" title="选择用户" :mask-closable="false" width="620">
      <Table highlight-row @on-current-change="selectUser" :columns="columnsUser" :data="dataUser"></Table>
      <div slot="footer">
        <Button @click="status.chooseUser=false">关闭</Button>
        <Button @click="submitUser()" type="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import passwordLogin from "./components/passwordLogin"
import haiYuTongLogin from "./components/haiYuTongLogin"
import dingdingLogin from "./components/dingdingLogin"
// import { isEmpty } from "@/libs/common";
// import { initSystem } from "@/api/system";
export default {
  components:{
    passwordLogin,
    haiYuTongLogin,
    dingdingLogin
  },
  data() {
    return {
      isDingTalk: false,
      dataUser: [],
      columnsUser: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
          align: "center"
        },
        {
          title: "部门名",
          key: "deptName",
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        }
      ],
      status: {
        chooseUser: false
      },
      ifQRcode: true,
      dingdUrl: "",
      dingAppid: ""
    };
  },
  computed: {
    title() {
      return window.document.title;
    }
  },
  methods: {
    selectQRcode(v) {
      var _self = this;
      if (v === "0") {
        this.isDingTalk = false;
        $(".QRLogin_tips_div p")
          .eq(0)
          .css("border-bottom", "2px solid #0084ff");
        $(".QRLogin_tips_div p")
          .eq(1)
          .css("border-bottom", "none");
      } else if (v === "1") {
        this.isDingTalk = true;
        $(".QRLogin_tips_div p")
          .eq(1)
          .css("border-bottom", "2px solid #0084ff");
        $(".QRLogin_tips_div p")
          .eq(0)
          .css("border-bottom", "none");
      }
    },
    account_login() {
      var _self = this;
      _self.ifQRcode = true;
    },
    selectUser(currentRow) {
      var _self = this;
      _self.mobile = currentRow.mobile;
      _self.userId = currentRow.userId;
    },
    // test(loginTmpCode){
    //     var formredwin = document.createElement("form");
    //     formredwin.method = 'POST';
    //     document.body.appendChild(formredwin);
    //     formredwin.action = this.$basePath + "/auth/dTalkLogin?loginTmpCode="+loginTmpCode
    //     var ret = formredwin.submit();
    //     formredwin.parentNode.removeChild(formredwin);
    //     console.log(formredwin, ret);
    // },
    QRCode_login() {
      var _self = this;
      var url = "";
      var appid = "";
      $(".QRLogin_tips_div p")
        .eq(0)
        .css("border-bottom", "2px solid #0084ff");
      $(".QRLogin_tips_div p")
        .eq(1)
        .css("border-bottom", "none");
      this.isDingTalk = false;
      
      _self.$refs.haiYuTongLogin.getQRCodeUrl();
      _self.ifQRcode = false;
      _self.$refs.haiYuTongLogin.QRTime();
      
    },
  },
  activated() {
    console.log("activated");
  }
};
</script>

<style>
</style>
