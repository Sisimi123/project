<template>
  <div>
    <Modal v-model="modal" :width="600" class-name="enforceLawAide" footer-hide draggable>
      <p slot="header">
        <span>执法小助手</span>
        <img class="AI_img" src="../images/AI.png" alt />
      </p>
      <div class="box">
        <div class="chatting">
          <div class="lite-chatbox" ref="chattingContent" id="chattingContent">
            <div v-for="(item,index) of msgs" :key="index" :id="item.id">
              <div style="width:100%;text-align: center">
                <span class="timeBox">{{item.createTime}}</span>
              </div>
              <div class="cright cmsg">
                <span class="content">{{item.sendMessage}}</span>
              </div>
              <div class="cleft cmsg">
                <!-- <span class="content"></span> -->
                <span class="content" v-if="item.resultMessage.resultType == '0'">未找到记录</span>
                <span
                  class="content shipContent"
                  v-if="item.resultMessage.resultType == '1' && item.resultMessage.dataType == 'ship'"
                >
                  <div>
                    <span>渔船名:</span>
                    <span>{{item.resultMessage.info.shipname}}</span>
                  </div>
                  <div>
                    <span>渔船类型:</span>
                    <span>{{item.resultMessage.info.shiptype}}</span>
                  </div>
                  <div>
                    <span>船东:</span>
                    <span>{{item.resultMessage.info.owner}}</span>
                  </div>
                  <div>
                    <span>联系电话:</span>
                    <span>{{item.resultMessage.info.tel}}</span>
                  </div>
                  <div>
                    <span>渔船尺寸:</span>
                    <span>长{{item.resultMessage.info.length}}米; 宽{{item.resultMessage.info.width}}米; 深{{item.resultMessage.info.depth}}米;</span>
                  </div>
                  <div>
                    <span>主机功率:</span>
                    <span>{{item.resultMessage.info.power}}KW</span>
                  </div>
                  <div>
                    <span>经纬度:</span>
                    <span>{{tranformDuFenMiao(item.resultMessage.info.lon)}}N; {{tranformDuFenMiao(item.resultMessage.info.lat)}}E;</span>
                  </div>
                  <div>
                    <span>船员数:</span>
                    <span>{{item.resultMessage.info.seamanList.length}}</span>
                  </div>
                  <div>
                    <span>报位时间:</span>
                    <span>{{item.resultMessage.info.posTime}}</span>
                  </div>
                  <a class="goButton" @click="viewMore(item.resultMessage.info)">查看更多 》</a>
                </span>
                <!-- <span
                  class="content shipContent"
                  v-if="item.resultMessage.resultType == '1' && item.resultMessage.dataType == 'region' && item.resultMessage.info"
                >
                  <div class="regionTitle">1.执法办案</div>
                  <div>
                    <span>办结案件总数:</span>
                    <span>{{item.resultMessage.info.enforceInfo.endCaseSum}}</span>
                  </div>
                  <div>
                    <span>本月新增案件数:</span>
                    <span style="color:#48d024">{{item.resultMessage.info.enforceInfo.newCase}}</span>
                  </div>
                  <div>
                    <span>在办案件数:</span>
                    <span>{{item.resultMessage.info.enforceInfo.inCase}}</span>
                  </div>
                  <div>
                    <span>当月办结数:</span>
                    <span style="color:#ee4844">{{item.resultMessage.info.enforceInfo.endCase}}</span>
                  </div>
                  <div class="regionTitle">2.执法检查</div>
                  <div>
                    <span>已检查:</span>
                    <span class="label_text">总数(<i style="color:#ee4844">{{item.resultMessage.info.taskInfo.checked.DAILY + item.resultMessage.info.taskInfo.checked.RANDOM + item.resultMessage.info.taskInfo.checked.SPECIAL}}</i>)
                    日常(<i style="color:#846de3">{{item.resultMessage.info.taskInfo.checked.DAILY}}</i>)
                    专项(<i style="color:#48bff2">{{item.resultMessage.info.taskInfo.checked.SPECIAL}}</i>)
                    双随机(<i style="color:#fdaa50">{{item.resultMessage.info.taskInfo.checked.RANDOM}}</i>)
                    </span>
                  </div>
                  <div>
                    <span>检查中:</span>
                    <span class="label_text">总数(<i style="color:#ee4844">{{item.resultMessage.info.taskInfo.checking.DAILY + item.resultMessage.info.taskInfo.checking.RANDOM + item.resultMessage.info.taskInfo.checking.SPECIAL}}</i>)
                    日常(<i style="color:#846de3">{{item.resultMessage.info.taskInfo.checking.DAILY}}</i>)
                    专项(<i style="color:#48bff2">{{item.resultMessage.info.taskInfo.checking.SPECIAL}}</i>)
                    双随机(<i style="color:#fdaa50">{{item.resultMessage.info.taskInfo.checking.RANDOM}}</i>)
                    </span>
                  </div>
                  <div>
                    <span style="display:block;margin-bottom: 5px;">本月新增检查:</span>
                    <span class="label_text">总数(<i style="color:#ee4844">{{item.resultMessage.info.taskInfo.month_task.DAILY + item.resultMessage.info.taskInfo.month_task.RANDOM + item.resultMessage.info.taskInfo.month_task.SPECIAL}}</i>)
                    日常(<i style="color:#846de3">{{item.resultMessage.info.taskInfo.month_task.DAILY}}</i>)
                    专项(<i style="color:#48bff2">{{item.resultMessage.info.taskInfo.month_task.SPECIAL}}</i>)
                    双随机(<i style="color:#fdaa50">{{item.resultMessage.info.taskInfo.month_task.RANDOM}}</i>)
                    </span>
                  </div>
                  <div>
                    <span style="display:block;margin-bottom: 5px;">本月完结:</span>
                    <span class="label_text">总数(<i style="color:#ee4844">{{item.resultMessage.info.taskInfo.month_checked.DAILY + item.resultMessage.info.taskInfo.month_checked.RANDOM + item.resultMessage.info.taskInfo.month_checked.SPECIAL}}</i>)
                    日常(<i style="color:#846de3">{{item.resultMessage.info.taskInfo.month_checked.DAILY}}</i>)
                    专项(<i style="color:#48bff2">{{item.resultMessage.info.taskInfo.month_checked.SPECIAL}}</i>)
                    双随机(<i style="color:#fdaa50">{{item.resultMessage.info.taskInfo.month_checked.RANDOM}}</i>)
                    </span>
                  </div>
                  <div class="regionTitle">3.巡航检查</div>
                  <div>
                    <span>累计循环里程:</span>
                    <span>{{item.resultMessage.info.patrolRecordInfo.samMeter}}</span>
                  </div>
                  <div>
                    <span>累计循环次数:</span>
                    <span>{{item.resultMessage.info.patrolRecordInfo.patrolCount}}</span>
                  </div>
                  <div>
                    <span>本月循环里程:</span>
                    <span style="color:#48d024">{{item.resultMessage.info.patrolRecordInfo.inMonthMeter}}</span>
                  </div>
                  <div>
                    <span>本月循环次数:</span>
                    <span style="color:#ee4844">{{item.resultMessage.info.patrolRecordInfo.newPatrolCount}}</span>
                  </div>
                  <div>
                    <span>参加循环人数:</span>
                    <span>{{item.resultMessage.info.patrolRecordInfo.checkmanNum}}</span>
                  </div>
                </span>-->
                <span
                  class="content shipContent"
                  v-if="item.resultMessage.resultType == '1' && item.resultMessage.dataType == 'region' && item.resultMessage.info"
                >
                  <div class="regionTitle">
                    <i></i> 执法办案
                  </div>
                  <div class="infoBox">
                    <img style="width:335px" src="../images/enforceInfo.png" alt />
                    <div class="enforceInfo">
                      <div style="font-size:12px;margin-bottom:10px">办结案件（件）</div>
                      <div style="font-size:26px">{{item.resultMessage.info.enforceInfo.endCaseSum}}</div>
                      <div class="infoList">
                        <div style="text-align: left;width:110px">
                          <div>{{item.resultMessage.info.enforceInfo.newCase}}</div>
                          <div>本月新增案件数</div>
                        </div>
                        <div style="text-align: center;width:110px">
                          <div>{{item.resultMessage.info.enforceInfo.inCase}}</div>
                          <div>在办案件</div>
                        </div>
                        <div style="text-align: right;width:90px">
                          <div>{{item.resultMessage.info.enforceInfo.endCase}}</div>
                          <div>本月办结数</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="regionTitle">
                    <i></i> 执法检查
                  </div>
                  <div class="infoBox checkBox">
                    <Row :gutter="15">
                      <Col :span="12" class="checkList">
                        <img src="../images/checked.png" alt />
                        <div class="checkListBox" @click="pageTo({url:'getDeptFinishResult', deptId: item.resultMessage.info.id})">
                          <div
                            style="font-size:26px"
                          >{{item.resultMessage.info.taskInfo.checked.DAILY + item.resultMessage.info.taskInfo.checked.RANDOM + item.resultMessage.info.taskInfo.checked.SPECIAL}}</div>
                          <div style="font-size:12px;margin-top: 3px;">总数</div>
                          <div style="margin-top: 12px;">
                            <i style="font-size:12px">日常:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checked.DAILY}}</i>
                            <i style="font-size:12px;margin-left:3px">专项:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checked.SPECIAL}}</i>
                            <i style="font-size:12px;margin-left:3px">双随机:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checked.RANDOM}}</i>
                          </div>
                        </div>
                      </Col>
                      <Col :span="12" class="checkList">
                        <img src="../images/checking.png" alt />
                        <div class="checkListBox" @click="pageTo({url:'getDeptIncheckResult', deptId: item.resultMessage.info.id})">
                          <div
                            style="font-size:26px"
                          >{{item.resultMessage.info.taskInfo.checking.DAILY + item.resultMessage.info.taskInfo.checking.RANDOM + item.resultMessage.info.taskInfo.checking.SPECIAL}}</div>
                          <div style="font-size:12px;margin-top: 3px;">总数</div>
                          <div style="margin-top: 12px;">
                            <i style="font-size:12px">日常:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checking.DAILY}}</i>
                            <i style="font-size:12px;margin-left:3px">专项:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checking.SPECIAL}}</i>
                            <i style="font-size:12px;margin-left:3px">双随机:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.checking.RANDOM}}</i>
                          </div>
                        </div>
                      </Col>
                      <Col :span="12" class="checkList">
                        <img src="../images/month_task.png" alt />
                        <div class="checkListBox" @click="pageTo({url:'getMonthCheckResult', deptId: item.resultMessage.info.id})">
                          <div
                            style="font-size:26px"
                          >{{item.resultMessage.info.taskInfo.month_task.DAILY + item.resultMessage.info.taskInfo.month_task.RANDOM + item.resultMessage.info.taskInfo.month_task.SPECIAL}}</div>
                          <div style="font-size:12px;margin-top: 3px;">总数</div>
                          <div style="margin-top: 12px;">
                            <i style="font-size:12px">日常:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_task.DAILY}}</i>
                            <i style="font-size:12px;margin-left:3px">专项:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_task.SPECIAL}}</i>
                            <i style="font-size:12px;margin-left:3px">双随机:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_task.RANDOM}}</i>
                          </div>
                        </div>
                      </Col>
                      <Col :span="12" class="checkList">
                        <img src="../images/month_checked.png" alt />
                        <div class="checkListBox" @click="pageTo({url:'getMonthFinishCheckResult', deptId: item.resultMessage.info.id})">
                          <div
                            style="font-size:26px"
                          >{{item.resultMessage.info.taskInfo.month_checked.DAILY + item.resultMessage.info.taskInfo.month_checked.RANDOM + item.resultMessage.info.taskInfo.month_checked.SPECIAL}}</div>
                          <div style="font-size:12px;margin-top: 3px;">总数</div>
                          <div style="margin-top: 12px;">
                            <i style="font-size:12px">日常:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_checked.DAILY}}</i>
                            <i style="font-size:12px;margin-left:3px">专项:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_checked.SPECIAL}}</i>
                            <i style="font-size:12px;margin-left:3px">双随机:</i>
                            <i style="font-size:17px">{{item.resultMessage.info.taskInfo.month_checked.RANDOM}}</i>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div class="regionTitle">
                    <i></i> 巡航检查
                  </div>
                  <Row :gutter="15">
                    <Col :span="12" class="patrolRecord">
                    <img src="../images/xh_one.png" alt="">
                    <div style="margin-left:10px">
                      <div style="font-size:26px;color:#000;margin-top:7px">{{item.resultMessage.info.patrolRecordInfo.patrolCount}}</div>
                      <div style="font-size:12px;color:#c0c0c0;margin-top:10px">累计巡航次数</div>
                    </div>
                    </Col>
                    <Col :span="12" class="patrolRecord">
                    <img src="../images/xh_two.png" alt="">
                    <div style="margin-left:10px">
                      <div style="font-size:26px;color:#000;margin-top:7px">{{item.resultMessage.info.patrolRecordInfo.inMonthMeter}}</div>
                      <div style="font-size:12px;color:#c0c0c0;margin-top:10px">本月巡航里程</div>
                    </div>
                    </Col>
                    <Col :span="12" class="patrolRecord">
                    <img src="../images/xh_three.png" alt="">
                    <div style="margin-left:10px">
                      <div style="font-size:26px;color:#000;margin-top:7px">{{item.resultMessage.info.patrolRecordInfo.newPatrolCount}}</div>
                      <div style="font-size:12px;color:#c0c0c0;margin-top:10px">本月巡航次数</div>
                    </div>
                    </Col>
                    <Col :span="12" class="patrolRecord">
                    <img src="../images/xh_four.png" alt="">
                    <div style="margin-left:10px">
                      <div style="font-size:26px;color:#000;margin-top:7px">{{item.resultMessage.info.patrolRecordInfo.checkmanNum}}</div>
                      <div style="font-size:12px;color:#c0c0c0;margin-top:10px">参加巡航人数</div>
                    </div>
                    </Col>
                  </Row>
                </span>
                <span class="content" v-if="item.resultMessage.resultType == '2'">
                  <div style="width:220px">
                    <div
                      class="contentTitle"
                      style="padding-bottom:10px;margin-bottom:20px;font-weight: bold;color:#000;border-bottom: 1px solid rgb(234,234,234);"
                    >请选择</div>
                    <div>
                      <a
                        @click="getInfo(v,k,item)"
                        class="cardButton"
                        v-for="(v,k,i) in item.resultMessage.info"
                        href="#"
                        :key="i"
                      >{{k}}</a>
                    </div>
                  </div>
                </span>
                <span class="content" v-if="item.resultMessage.resultType == '3'">有多个相似结果，请输入更详细的信息</span>
              </div>
            </div>
          </div>
        </div>
        <div class="inputBox">
          <input class="input" type="text" v-model="value" placeholder="请输入内容" @keyup.enter="send" />
          <Button type="primary" size="default" class="inputButton" shape="circle" @click="send">发送</Button>
        </div>
      </div>
    </Modal>
    <!-- <div class="button drag-element" @click="flag && show()" v-drag-element @removeClick="removeClick" @addClick="addClick"> -->
      <div class="button drag-element" @dragclick="show()" v-drag-element >
      <img src="../images/AI.png" class="drag-element-img" alt />
    </div>
  </div>
</template>

<script>
import dragElement from '@/components/drag-element';
Date.prototype.Format = function(fmt) {
  // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
export default {
  directives: { dragElement },
  data() {
    return {
      modal: false,
      end: false,
      loading: false,
      contentRef: {},
      query: {
        page: 1,
        size: 999
      },
      msgs: [
        // {
        //   createTime: "2020-02-14 23:00:26",
        //   sendMessage: "浙岭渔23118",
        //   del: "0",
        //   id: "40289fcc7044258f0170443717470019",
        //   resultMessage: {
        //     dataType: "ship",
        //     resultType: 1,
        //     info: {
        //       shiptype: "国内捕捞船",
        //       sog: 0,
        //       lon: 10000000,
        //       blxkzEffectiveTime: "2023-05-22",
        //       issuanceCertNumber: "3310810182002",
        //       fishVessOwneRegiCertNumb: "（浙岭）船登（权）（2018）HY-100326号",
        //       tel: "13738650553",
        //       tonnage: "156.00",
        //       power: "220.00",
        //       lat: 10000000,
        //       owner: "江峰",
        //       address: "温岭市石塘镇小黄坭村C区552号",
        //       fishingLicenseNumberA: "（浙台）船捕（2018）HY-100284号",
        //       seamanList: [],
        //       valiDateVessRegiCert: "2023-05-22",
        //       worktype: "拖网",
        //       updateTime: "20-2-14 上午10:49",
        //       depth: "3.20",
        //       caseInfoList: [],
        //       issuanceCertEffectiveTime: "2023-09-10",
        //       width: "6.40",
        //       enforceList: [],
        //       workmodel: "单船桁杆",
        //       cog: 0,
        //       shipname: "浙岭渔23118"
        //     }
        //   }
        // }
      ],
      value: "",
      flag: true,
    };
  },
  methods: {
    /**
     * @desc 给移动元素 添加 点击事件
     */
    addClick() {
      console.log("1")
      this.flag = true;
      console.log("2")
    },
    /**
     * @desc 给移动元素 去除 点击事件
     */
    removeClick() {
      console.log("3")
      this.flag = false;
      console.log("4")
    },
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
    show() {
      console.log("5")
      this.modal = true;
      console.log("6")
    },
    getHistory() {
      let chattingContent = document.getElementById("chattingContent");
      chattingContent.onscroll = () => {
        if (chattingContent.scrollTop == 0) {
          if (this.end == false) {
            let _self = this;
            _self.loading = true;
            let params = new URLSearchParams();
            let json = JSON.stringify(_self.query);
            params.append("query", json);
            _self.$http
              .get(`/robot/assistant/getMassagePage`, {
                params: params
              })
              .then(res => {
                if (res.success) {
                  console.log(res.data, "res.data");
                  // _self.msgs = [...res.data.list, ..._self.msgs];
                  // _self.end = res.data.end;
                  // this.$nextTick(() => {
                  //   chattingContent.scrollTop = document.getElementById(
                  //     _self.scrollHeight
                  //   ).offsetTop;
                  //   _self.scrollHeight = res.data.list[0].id;
                  //   _self.loading = false;
                  // });
                } else {
                  // _self.loading = false;
                }
              })
              .catch(err => {
                console.log(err);
                _self.loading = false;
              });
          } else {
            this.$Message.error("已经没有更多消息啦");
          }
        } else {
        }
      };
      // console.log(this.contentRef.scrollTop);
    },
    init() {
      let params = new URLSearchParams();
      let json = JSON.stringify(this.query);
      params.append("query", json);
      this.$http
        .get(`/robot/assistant/getMassagePage`, {
          params: params
        })
        .then(res => {
          if (res.success) {
            console.log(res, "res");
            this.msgs = res.data.data;
            this.msgs = this.msgs.reverse();
          }
          // _self.$nextTick(() => {
          //     _self.typhoonList = res.data;
          // });
        })
        .catch(err => {
          console.log(err);
        });
    },
    send() {
      // this.contentRef = document.getElementById('chattingContent');
      // this.contentRef.scrollTop = this.contentRef.scrollHeight;
      if (this.value === "") {
        this.$Message.error("请输入内容");
        return;
      } else {
        this.msgs.push({
          createTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
          sendMessage: this.value,
          resultMessage: {}
        });
        // setTimeout(() => {
        //   this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
        // }, 0);
        this.$http
          .post("/robot/assistant/sendMessage", {
            message: this.value
          })
          .then(res => {
            if (res.success) {
              // this.msgs.push(res.data);
              console.log(res.data, "res.data");
              this.msgs[this.msgs.length - 1].resultMessage = res.data;
              console.log(
                (this.msgs[this.msgs.length - 1].resultMessage = res.data),
                "msgs"
              );
              setTimeout(() => {
                this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
              }, 0);
            } else {
              this.$Message.error(res.msg);
            }
          });
        // .then(() => {
        //   this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight
        // })
        this.value = "";
      }
    },
    getInfo(v, key, item) {
      console.log(v, key, item, "item");
      this.msgs.push({
        createTime: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        sendMessage: key,
        resultMessage: {}
      });
      // setTimeout(() => {
      //   this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
      // }, 0);
      let query = {
        dataType: item.resultMessage.dataType,
        id: v
      };
      let params = new URLSearchParams();
      let json = JSON.stringify(query);
      params.append("query", json);
      this.$http
        .get("/robot/assistant/getInfo", {
          params: params
        })
        .then(res => {
          if (res.success) {
            // this.msgs.push(res.data);
            console.log(res.data, "res.data");
            this.msgs[this.msgs.length - 1].resultMessage = res.data;
            console.log(
              (this.msgs[this.msgs.length - 1].resultMessage = res.data),
              "msgs"
            );
            this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
            setTimeout(() => {
              this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
            }, 0);
          } else {
            this.$Message.error(res.msg);
          }
        });
      // .then(() => {
      //   this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight
      // })
    },
    viewMore(data) {
      this.modal = false;
      this.$emit('setShipInfo',data)
      this.$router.push({
        path: "/supervision/details/shipPortrait"
        // query: { info: data }
      });
    },
    /**
     * @desc 小执法弹窗 路由跳转
     */
    pageTo(query) {
      this.modal = false;
      this.$router.push({
        name: 'checklist',
        query
      })
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    modal(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.chattingContent.scrollTop = this.$refs.chattingContent.scrollHeight;
        }, 0);
      }
    }
  }
};
</script>

<style scoped>
@import "./base.css";
.button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 888;
  width: 60px;
  height: 60px;
}
.button img {
  width: 60px;
}
.AI_img {
  position: absolute;
  top: 20px;
  width: 80px;
  left: 260px;
}
.chatting {
  padding-left: 10px;
  padding-top: 40px;
  height: 500px;
  background: #f0f0fa;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.inputBox {
  height: 50px;
  background: #f5f5f5;
  padding: 0 30px;
}
.input {
  width: 440px;
  height: 32px;
  outline: none;
  margin-top: 9px;
  border-radius: 16px;
  border: 2px solid #ebebeb;
  padding: 0 30px;
}
.inputButton {
  width: 80px;
  margin-left: 20px;
  margin-right: 0px;
  font-size: 14px !important;
  padding: 3px 15px 3px !important;
  letter-spacing: 5px;
  text-indent: 5px;
}
.cardButton {
  display: block;
  margin-bottom: 5px !important;
  color: #4dabfe;
  cursor: pointer;
}
.shipContent div {
  margin-bottom: 5px;
}
.shipContent div span:first-child {
  font-weight: 600;
  letter-spacing: 1px;
  margin-right: 8px;
  color: #000;
}
.goButton {
  color: #4dabfe !important;
  float: right;
  margin: 0 !important;
  font-weight: 600;
  margin-top: 5px;
}
.timeBox {
  display: inline-block;
  font-size: 12px;
  margin-top: 10px;
  color: #b0aeae;
  padding: 5px 10px;
  background: #e1e1eb;
  border-radius: 14px;
}
.regionTitle {
  color: #000;
  font-weight: 600;
}
.regionTitle i {
  display: inline-block;
  height: 18px;
  width: 5px;
  border-left: 3px solid #5058fe;
  vertical-align: -4px;
  margin-right: 5px;
}
i {
  font-style: normal;
}
.label_text {
  color: #000;
}
.infoBox {
  position: relative;
  color: #fff;
  margin: 0;
}
.enforceInfo {
  width: 335px;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 7px 10px 10px 10px;
  margin: 0;
}
.infoList {
  font-size: 12px;
  color: #c4c4fa;
  display: flex;
}
.infoList div {
  margin: 0;
}
.infoList div div {
  height: 13px;
}
.checkList {
  position: relative;
}
.checkList img {
  width: 100%;
}
.checkListBox {
  cursor: pointer;
  width: 160px;
  height: 105px;
  position: absolute;
  top: 0px;
  left: 0;
  margin-bottom: 0 !important;
  margin-left: 10px;
  padding: 10px;
}
.checkListBox div {
  margin-bottom: 0 !important;
}
.patrolRecord{
  display: flex;
}
.patrolRecord img{
  width: 60px;
  height: 60px;
}
.patrolRecord div{
  margin-bottom: 0 !important
}
</style>