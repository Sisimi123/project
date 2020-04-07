<style lang="less">
</style>

<template>
  <!-- 证书到期提醒 -->
  <div>
    <data-table
      ref="test"
      :autoInitTable="false"
      :withTree="showtree" 
      :useZtree="false" 
      :treeParams="treeQuery"
      :treeUrl="'/$admin/depts/authtree'" 

      :treeTitle="'地区'"
      :url="baseQuery.currentUrl"
      :params="query"
      :columns="columns"
      :selections="arrIndex"
      @on-select-change="selectTreeChange"
      @on-selection-change="selectChange"
    >
      <div slot="search">
        <Form :label-width="80" @submit.native.prevent>
          <Row>
            <Col span="5">
              <Form-item label="渔船名:">
                <Input
                  v-model="query.wheres.nametheShip_like"
                  @on-keydown.enter="initSearch"
                  placeholder="请输入..."
                />
              </Form-item>
            </Col>

            <Col span="6">
              <Form-item label="到期时间:">
                <Select
                  v-model="baseQuery.timeType"
                  @on-change="timeChange"
                  placement="bottom"
                  :transfer="true"
                >
                  <Option value="0">已过期</Option>
                  <Option value="1">一星期内过期</Option>
                  <Option value="2">一个月内过期</Option>
                  <Option value="3">两个月内过期</Option>
                  <Option value="4">三个月内过期</Option>
                </Select>
              </Form-item>
            </Col>
            <div class="btn-wrap">
              <Checkbox v-model="subArea" @on-change="changeSubArea">区域内</Checkbox>
              <Button @click="initSearch" type="info" icon="ios-search" shape="circle">搜索</Button>
              <Button  @click="sendSms" type="primary" >短信通知</Button>
            </div>
          </Row>
        </Form>
      </div>
    </data-table>
  </div>
</template>
<script>
import user from '@/store/module/user.js';
var dept=user.state.userInfo.dept;
export default {
  name: "certificateReminder",
  components: {},
  computed: {},
  data() {
    return {
      options: {
        shortcuts: [
          {
            text: "已过期",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 10);
              return [start, end];
            }
          },
          {
            text: "一星期过期",
            value() {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "一个月过期",
            value() {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "两个月过期",
            value() {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 60);
              return [start, end];
            }
          },
          {
            text: "三个月过期",
            value() {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      selectObj: new Map(),
      selectArr: [],
      arrIndex: [],
      status: {
        isLoading: true,
        treeLoading: true
      },
      currNode: "",
      subArea: true,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 55,
        },
        {
          key: "nametheShip",
          title: "船名",
          align: "center",
          minWidth: 120,
        },
        {
          key: "owner",
          title: "船东",
          align: "center",
          minWidth: 100,
        },
        {
          key: "tel",
          title: "联系方式",
          align: "center",
          minWidth: 120,
        },
        {
          key: "count",
          title: "到期证书本数",
          align: "center",
          minWidth: 100,
        },
        {
          key: "cjzsTime",
          title: "船检证书到期时间",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            const now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var current = "";
            current = year + "-" + month + "-" + date;

            var c = "blank";
            if (params.row.cjzsTime <= current) {
              c = "red";
            }

            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              params.row.cjzsTime
            );
          }
        },
        {
          key: "blxkzTime",
          title: "捕捞许可证到期时间",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            const now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var current = "";
            current = year + "-" + month + "-" + date;

            var c = "blank";
            if (params.row.blxkzTime <= current) {
              c = "red";
            }

            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              params.row.blxkzTime
            );
          }
        },
        {
          key: "syqTime",
          title: "所有权证书到期时间",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            const now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var current = "";
            current = year + "-" + month + "-" + date;

            var c = "blank";
            if (params.row.syqTime <= current) {
              c = "red";
            }

            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              params.row.syqTime
            );
          }
        },
        {
          key: "gjzsTime",
          title: "国籍证书到期时间",
          align: "center",
          minWidth: 140,
          render: (h, params) => {
            const now = new Date();
            var year = now.getFullYear(); //得到年份
            var month = now.getMonth(); //得到月份
            var date = now.getDate(); //得到日期
            month = month + 1;
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var current = "";
            current = year + "-" + month + "-" + date;

            var c = "blank";
            if (params.row.gjzsTime <= current) {
              c = "red";
            }

            return h(
              "span",
              {
                style: {
                  color: c
                }
              },
              params.row.gjzsTime
            );
          }
        },
        {
          key: "workType",
          title: "类型",
          align: "center",
          minWidth: 90,
        },
        {
          key: "area",
          title: "所属地区",
          align: "center",
          minWidth: 80,
        }
        // {
        //   title: "证书详情",
        //   key: "id",
        //   align: "center",
        //   minWidth: 280,
        //   render: (h, params) => {
        //     let children = [];
        //     children.push(info1(h, params));
        //     children.push(info2(h, params));
        //     children.push(info3(h, params));
        //     return h("div", children);
        //   }
        // }
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
          nametheShip_like: "",
          time_gte: "",
          time_lte: "",
          withRule: true,
          codefishingArea_in: dept.id
        }
      },
      baseQuery: {
        type: "0",
        timeType: "0",
        dateRange: [],
        currentUrl: "/shiparchives/nybycjy/maturity"
      },
      treeQuery: {
        containOrgan:false,
        type:"includes:5,30"
      }
    };
  },
  methods: {
    selectChange(selection){
      var arr = new Array();
      var dataArr = new Array();
      for(var l in selection){
        arr.push(selection[l].id);
      }
      this.selectObj.set(this.query.page, arr);
      this.selectObj.forEach(element => {
        for(var e in element){
          dataArr.push(element[e]);
        }
      });
      this.arrIndex = dataArr;
    },  
    sendSms(){
      var _self = this;
      if (this.arrIndex.length == 0) {
        _self.$Message.info('未选择渔船');
        return;
      }
      _self.$Modal.confirm({
          title:"提示",
          content:"您确定要发送 "+this.arrIndex.length+" 条提醒短信吗？",
          onOk:function(){
            var query = {
              page: _self.query.page,
              size: _self.query.size,
              wheres: {
                nametheShip_like: _self.query.wheres.nametheShip_like,
                time_gte: _self.query.wheres.time_gte,
                time_lte: _self.query.wheres.time_lte,
                withRule: _self.query.wheres.withRule,
                sendSMSPattern: _self.baseQuery.timeType,
                sendSmsShipName:_self.arrIndex,
              }
            }
            if (_self.subArea) {
              query.wheres.codefishingArea_in = _self.currNode.division;
              query.wheres.codefishingArea_eq = "";
            } else {
              query.wheres.codefishingArea_in = "";
              query.wheres.codefishingArea_eq = _self.currNode.division;
            }
            _self.$http.get("/shiparchives/nybycjy/maturity",{
              params:{query}
            }).then(function(){
              _self.$Message.info('已完成短信发送');
            });
          }
      });
    },
    initSearch() {
      this.$refs.test.initSearch();
    },
    isEmpty(s) {
      if (
        s == "" ||
        s == undefined ||
        s == null ||
        JSON.stringify(s) === "{}"
      ) {
        return true;
      }
      return false;
    },
    addArea() {
      if (this.subArea) {
        this.query.wheres.codefishingArea_in = this.currNode.division;
        this.query.wheres.codefishingArea_eq = "";
      } else {
        this.query.wheres.codefishingArea_in = "";
        this.query.wheres.codefishingArea_eq = this.currNode.division;
      }
    },
    changeSubArea(flag) {
      this.addArea();
      this.initSearch();
    },
    selectTreeChange(nodes) {
      this.currNode = nodes[0];
      this.addArea();
      this.initSearch();
    },
    handleReset() {
      for (let key in this.query.wheres) {
        this.query.wheres[key] = "";
      }
      this.initSearch();
    },
    timeChange(val) {
      const time = new Date();
      var gte;
      var lte;
      switch (val) {
        case "0":
          // this.query.wheres.time_gte
          gte = new Date(
            time.getTime() - 3600 * 1000 * 24 * 30 * 12 * 20
          );
          lte = time;
          break;
        case "1":
          gte = time;
          lte = new Date(
            time.getTime() + 3600 * 1000 * 24 * 7
          );
          break;
        case "2":
          gte = time;
          lte = new Date(
            time.getTime() + 3600 * 1000 * 24 * 30
          );
          break;
        case "3":
          gte = time;
          lte = new Date(
            time.getTime() + 3600 * 1000 * 24 * 60
          );
          break;
        case "4":
          gte = time;
          lte = new Date(
            time.getTime() + 3600 * 1000 * 24 * 90
          );
          break;

        default:
          break;
      }

      if(gte){
        var month = gte.getMonth() + 1;
        month = month.toString().length == 1 ? '0' + month : month; 
        var day = gte.getDate().toString().length == 1 ? '0' + gte.getDate() :gte.getDate();
        this.query.wheres.time_gte = [gte.getFullYear(), month, day].join('-');
      }

      if(lte){
        var monthB = lte.getMonth() + 1;
        monthB = monthB.toString().length == 1 ? '0' + monthB : monthB; 
        var dayB = lte.getDate().toString().length == 1 ? '0' + lte.getDate() :lte.getDate();
        this.query.wheres.time_lte = [lte.getFullYear(), monthB, dayB].join('-');
      }
      console.log(this.query.wheres.time_gte);
      console.log(this.query.wheres.time_lte);
      this.initSearch();
    }
  },
  beforeMount() {
      if(dept.type=="5"){
          this.showtree=false;
          this.downShow=true;
          this.query.key=dept.id;
          this.deptid=dept.id;
          this.deptname=dept.name;
      }else{
          this.showtree=true;
      }
      if(this.$hasRoles("JhrManager")){
          this.quanXianShow=true;
      }else{
          this.quanXianShow=false;
      }
  },
  mounted() {
    this.timeChange("0");

  }
};
</script>

<style scoped>
</style>
