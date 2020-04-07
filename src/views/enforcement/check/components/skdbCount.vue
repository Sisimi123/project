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

        <div slot="footer">
          <Button type="info" @click="handleCancel">关闭</Button>
        </div>

        <div>
          <Row>
            <Col span="5">
              <label class="pos3">是否符合</label>
              <Select v-model="rule" class="selec" @on-change="selectChange" >
                <Option v-for="opt in option" :value="opt.value" :key="opt.value">{{opt.text}}</Option>
              </Select>
            </Col>
            <Col span="19">
              <div style="margin-left:100px;">
                <Checkbox v-model="checkAll" @on-change="handleCheckAll">全选</Checkbox>
                <checkbox-group v-model="intersecs" @on-change="checkBoxChange">
                  <checkbox label="insecYZ">
                      <span>渔政指挥系统</span>
                  </checkbox>
                  <checkbox label="insecCJ">                
                      <span>船检系统</span>
                  </checkbox>
                  <checkbox label=insecJZ>
                      <span>救助系统</span>
                  </checkbox>
                  <checkbox label="insecNS">
                      <span>年审表格</span>
                  </checkbox>
                  <checkbox label="insecUB">
                      <span>油补系统</span>
                  </checkbox>
                </checkbox-group>
              </div>
            </Col>
		      </Row>
        </div>
        <div>
          <div id="chart" style="height:300px;width:1220px"></div>
        </div>
    </Modal>
</div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "skdbCount",
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
      default: 1280
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
      default: ""
      // default:"vertical-center-modal"
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
    }
    //-----------------------------------------------
  },
  data() {
    return {
      visible: false,
      bar: {},
      
      checkAll: false,
      rule: "negative",
      intersecs: [],
      option: [
        { value: "negative", text: "不符" },
        { value: "positive", text: "相符" }
        // 			    {value:"2",text:"单一"},
      ],
      interCheck: [
        { insecCJ: "船检系统" },
        { insecJZ: "救助系统" },
        { insecYZ: "渔政指挥系统" },
        { insecNS: "年审表格" },
        { insecUB: "油补系统" }
      ],
    };
  },
  computed: {
  },
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
      if (s == null || s == "" || s == undefined) {
        return true;
      }
      return false;
    },
    handleCheckAll(value) {
      if (value) {
        this.intersecs = [
          "insecCJ",
          "insecJZ",
          "insecYZ",
          "insecNS",
          "insecUB"
        ];
      } else {
        this.intersecs = [];
      }
      this.changeBar();
    },
    selectChange(value) {
      this.changeBar();
    },
    checkBoxChange(value) {
      this.changeBar();
    },
    sortData(arr) {
      var sortArr = arr.slice(0, arr.length);
      for (var i = 0; i < sortArr.length - 1; i++) {
        for (var j = i + 1; j < sortArr.length; j++) {
          if (sortArr[j].cd > sortArr[i].cd) {
            var temp = sortArr[j];
            sortArr[j] = sortArr[i];
            sortArr[i] = temp;
          }
        }
      }
      return sortArr;
    },
    changeBar(){
      this.$http
        .get("/check/skdb/tongji5", {
          params: {
            tjDept: "",
            tjItem: "",
            tjValue: "",
            tjtype: this.rule,
            intersecs: this.intersecs.toString()
          }
        })
        .then(res => {
          if (res.success) {
            var seriesData = [];
            var legendData = [];
            res.data.forEach(element => {
              var one = {
                name: element.name,
                type: "bar",
                data: [element.ns2016, element.AIS, element.cj, element.ub]
              };
              seriesData.push(one);
              legendData.push(element.name);
            });

            var option = {
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  // 坐标轴指示器，坐标轴触发有效
                  type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              legend: {
                data: legendData
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
              },
              xAxis: [
                {
                  type: "category",
                  data: ["2016年审", "AIS", "船检", "油补"]
                }
              ],
              yAxis: [
                {
                  type: "value"
                }
              ],
              series: seriesData
            };
            this.bar.setOption(option);
          }
        })
        .catch(nerror => {
          console.log(error);
        });
    },
    initEcharts() {
      this.$nextTick(() => {
        var dataSource = echarts.init(document.getElementById("chart"));
        window.addEventListener("resize", function() {
          dataSource.resize();
        });
        this.bar = dataSource;
        this.changeBar();
      });
    }
  },
  mounted() {
    this.initEcharts();
  },
  beforeDestroy() {
    this.visible = false;
    this.$emit("input", this.visible);
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
.ivu-checkbox-group {
  display: inline-block;
}
</style>


