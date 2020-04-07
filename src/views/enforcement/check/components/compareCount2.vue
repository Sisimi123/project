<style lang="less">
@import "../../../../styles/commonStyle.less";
</style>

<template>
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
        @on-ok="handleOk"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">

        <tabs>
          <tab-pane label="按地区">
          <div class="add_btndivbox">
            <label class="pos2">地区</label>
            <i-Select v-model="selectedArea" class="selec2"  @on-change="selectAreaChange" placeholder="全部" >
                <i-Option v-for="dept in tjdata.tjdepts" :value="dept.aid" :key="dept.id">{{dept.name}}</i-Option>
            </i-Select>
          </div>
          <div id="chartA" style="width:820px;height:400px;"></div>
          </tab-pane>
          <tab-pane label="按分类">
            <div class="add_btndivbox">
              <label class="pos2">类别</label>
              <i-Select v-model="typeCount"  @on-change="selectChange1" style="width:120px" placeholder="" >
                <i-Option value="shipownerStatus">船东</i-Option>
                <!-- <i-Option value="telStatus">电话</i-Option> -->
                <i-Option value="shipLengthStatus">船长</i-Option>
                <i-Option value="shipWidthStatus">船宽</i-Option>
                <i-Option value="workTypeStatus">作业方式</i-Option>
                <i-Option value="shipPowerStatus">主机功率</i-Option>
                <!-- <i-Option value="ais">ais</i-Option> -->
              </i-Select>
              <i-Select v-model="statusCount" @on-change="selectChange2" style="width:100px"  placeholder="请选择..." :label-in-value="true" >
                <i-Option value="1">不符</i-Option>
                <i-Option value="0">相符</i-Option>
                <i-Option value="2">单一</i-Option>
                <i-Option value="-1">无数据</i-Option>
              </i-Select>
            </div>
            <div id="chartB" style="width:820px;height:400px;"></div>
          </tab-pane>
        </tabs>
    </Modal>
</div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "skdbCount2",
  components: {},
  props: {
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
      type: String,
      // default: ""
      default: "vertical-center-modal"
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
    //-----------------------------------------------
    area: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
     tjdata: {
        tjdept: "index",
        tjdepts: [],
        tjItem: "船东",
        tjItems: [],
        tjValue: "avail",
        ywshow: false,
        fhshow: true
     },
      visible: false,
      // data
      selectArea:[],
      selectedArea:"330900",
      selectedAreas:[],
      deptId:"330900",
      typeCount: 'shipownerStatus',
      statusCount: '0',
      bar: {},
      pie: {},
    };
  },
  computed: {},
  methods: {
    ok() {
      this.visible = false;
      this.$emit("input", this.visible);
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
    handleCancel() {
      this.cancel();
    },
    handleOk() {
      this.ok();
    },
    isEmpty(s) {
      if (s == null || s == "" || s == undefined || JSON.stringify(s) === '{}') {
        return true;
      }
      return false;
    },
    // method
    changePie() {
      this.$http
        .get("/shipContrast/getStatisticClass", {
          params: {
              deptId:  this.deptId,
              type: this.typeCount,
              status: this.statusCount
          }
        })
        .then(res => {
          if (res.success) {
            var seriesData = []
            var legend = [];
            for (var key in res.data)
              legend.push(key);
            for (let i = 0; i < legend.length; i++) {
                seriesData.push(
                    {
                        value: res.data[legend[i]],
                        name: legend[i]
                    }
                )
            }
            var option = {
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: "区域统计",
                x: "center"
              },
              color: [
                "#0f75bb",
                "#0aa5b8",
                "#e83f05",
                "#139a56",
                "#a71dac",
                "#46647C"
              ],
              legend: {
                type: "scroll",
                orient: "vertical",
                left: 10,
                top: 10,
                bottom: 10,
                data: []
              },
              series: [
                {
                  name: "当前区域：",
                  type: "pie",
                  radius: "60%",
                  center: ["55%", "55%"],
                  data: seriesData,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            };
            this.pie.setOption(option);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeBar() {
      this.$http
        .get("/shipContrast/getStatisticRegion?deptId="+this.selectedArea)
        .then(res => {
          if (res.success) {
            // 0不符合 1:相符 2:只有一个系统有数据 3:所有系统没有数据
            let xAxisData = ["主机功率","作业方式","型宽","联系电话","船东","船长"];
            let array0 = [];
            let array1 = [];
            let array2 = [];
            let array3 = [];
            array0.push(res.data.shipPowerStatus_unequal, res.data.workTypeStatus_unequal,
            res.data.shipWidthStatus_unequal, res.data.telStatus_unequal,
            res.data.shipownerStatus_unequal,res.data.shipLengthStatus_unequal)
            array1.push(res.data.shipPowerStatus_theOne, res.data.workTypeStatus_theOne,
            res.data.shipWidthStatus_theOne, res.data.telStatus_theOne,
            res.data.shipownerStatus_theOne,res.data.shipLengthStatus_theOne)
            array2.push(res.data.shipPowerStatus_equal, res.data.workTypeStatus_equal,
            res.data.shipWidthStatus_equal, res.data.telStatus_equal,
            res.data.shipownerStatus_equal,res.data.shipLengthStatus_equal)
            array3.push(res.data.shipPowerStatus_none, res.data.workTypeStatus_none,
            res.data.shipWidthStatus_none, res.data.telStatus_none,
            res.data.shipownerStatus_none,res.data.shipLengthStatus_none)
            var option = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                  data:['不符','单一','符合','无数据']
              },
              xAxis: {
                type: 'category',
                data: xAxisData
              },
              yAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              // 0不符合 1:相符 2:只有一个系统有数据 3:所有系统没有数据
              series: [
                {
                  name: "不符",
                  type: "bar",
                  itemStyle: {
                    normal: {
                      color: "#C23531"
                    }
                  },
                  data: array0
                },
                {
                  name: "单一",
                  type: "bar",
                  itemStyle: {
                    normal: {
                      color: "#CA8622"
                    }
                  },
                  data: array1
                },
                {
                  name: "符合",
                  type: "bar",
                  itemStyle: {
                    normal: {
                      color: "#3CC881"
                    }
                  },
                  data: array2
                },
                {
                  name: "无数据",
                  type: "bar",
                  itemStyle: {
                    normal: {
                      color: "#0D5ABA"
                    }
                  },
                  data: array3
                }
              ]
            };
            this.bar.setOption(option);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    initEcharts() {
      this.$nextTick(() => {
        var dataSourceA = echarts.init(document.getElementById("chartA"));
        this.bar = dataSourceA;
        this.changeBar();

        var dataSourceB = echarts.init(document.getElementById("chartB"));
        this.pie = dataSourceB;
        this.changePie();

        window.addEventListener("resize", function() {
          dataSourceA.resize();
          dataSourceB.resize();
        });
      });
    },
    initDept() {
      this.$http
        .get("/shipContrast/area?deptId="+this.selectedArea)
        .then(res => {
          this.tjdata.tjdepts = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    initTjItem() {
      this.$http
        .get("/check/skdb/tjitem")
        .then(res => {
          this.tjdata.tjItems = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectChange1(value) {
        this.typeCount = value;
        this.changePie();
    },
    selectChange2(obj) {
        this.statusCount = obj.value;
        this.changePie();
    },
    selectAreaChange(value) {
      this.selectedAreas = [];
      if(value == "330900") {
        this.tjdata.tjdepts.forEach(element => {
          this.selectedAreas.push(element.aid);
        });
      } else {
         this.selectedAreas.push(value);
      }
      this.changeBar();
    },
    initSelectArea(){
      this.selectArea = [];
      if(this.isEmpty(this.area)) {
        this.tjdata.tjdepts.forEach(element => {
          this.selectedAreas.push(element.aid);
        });
      } else {
        this.selectArea.push({
          title: this.area.title,
          id: this.area.id,
          path: this.area.path,
        });
        this.selectedArea = this.area.title;
        if(!this.isEmpty(this.area.children) && "30" != this.area.type){
          // 只循环一层
          this.area.children.forEach(element => {
            this.selectArea.push({
              title: element.title,
              id: element.id,
              path: element.path,
            });
          });
        }
      }

    }
  },
  mounted() {
    // this.initSelectArea();
    this.initDept();
    this.initTjItem();
    // this.initEcharts();
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
  },
  watch: {
    value(val) {
      if (val) {
          this.initSelectArea();
          this.initEcharts();
          this.visible = val;
      }
    }
  }
};
</script>
<style scoped>
.ivu-input-icon {
  margin-top: 8px;
}
.ivu-modal {
  top: 20px;
}
.ivu-modal-body {
  padding: 8px;
}
.ivu-form-item {
  margin-bottom: 5px;
}
.ivu-table-tip table {
  min-height: 200px;
}
.ivu-tag {
  /* 			margin-left:5px; */
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}

.zcl_ls_table,
.zcl_ls_table2 {
  width: 100%;
  font-size: 12px;
  text-align: center;
  border-left: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  margin_bottom: 10px;
}
.zcl_ls_table th,
.zcl_ls_table2 th {
  height: 30px;
  background-color: #f8f8f9;
}
.zcl_ls_table td {
  height: 48px;
  width: 139px;
  text-align: center;
}
.zcl_ls_table2 td {
  height: 35px;
  width: 139px;
  text-align: center;
}

td.point:hover {
  cursor: pointer;
}

.zcl_ls_table th,
.zcl_ls_table td,
.zcl_ls_table2 th,
.zcl_ls_table2 td {
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  /* 			padding-left: 10px; */
  white-space: nowrap;
  padding-left: 5px;
  padding-right: 5px;
}
.zcl_ls_table input {
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 12px;
  width: 100%;
}

label.pos {
  display: inline-block;
  width: 108px;
  height: 30px;
  line-height: 30px;
}
label.pos2 {
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
}
label.pos3 {
  display: inline-block;
  width: 88px;
  height: 30px;
  line-height: 30px;
}
.selec {
  width: 90px;
}
.selec2 {
  width: 120px;
}
.selec3 {
  width: 140px;
}
.ivu-checkbox-group {
  display: inline-block;
}

.add_btndivbox {
  /* position: fixed;
	z-index: 1; */
  width: 100%;
  /* padding-right: 20px; */
  height: 50px;
  /* 	line-height: 50px; */
  background-color: white;
  text-indent: 10px;
}
.add_btndivbox2 {
  /* position: fixed;
	z-index: 1; */
  width: 100%;
  /* padding-right: 20px; */
  height: 100px;
  line-height: 50px;
  background-color: white;
  text-indent: 10px;
}
</style>


