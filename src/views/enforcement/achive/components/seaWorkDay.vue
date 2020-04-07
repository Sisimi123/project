<template>
  <div style="width:100%;height:100%;" id="sea_work_day"></div>
</template>

<script>
import echarts from "echarts";

export default {
  data() {
    return {};
  },
  methods: {
    upDateInfo() {
      let myDate = new Date();
      let dateList = [];
      //   let endDate = new Date(myDate.getTime() - 144*60*60*1000);
      let oneDateTiem = 24;
      for (var i = 0; i < 7; i++) {
        let thisData = new Date(myDate.getTime() - 24 * 60 * 60 * 1000 * i);
        thisData = this.getNowFormatDate(thisData)
        dateList.push(thisData);
      }
      dateList = dateList.reverse()
      console.log(dateList, "dateList dateList dateList");

      this.$nextTick(() => {
        let bar = echarts.init(document.getElementById("sea_work_day"));

        const option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: [
              "拖网",
              "围网",
              "刺网",
              "张网",
              "钓具",
              "笼壶",
              "杂渔具",
              "陷阱",
              "耙刺",
              "渔运船",
              "冷藏船",
              "渔油船",
              "油污船",
              "制冰船",
              "拖轮",
              "科研教学",
              "工程船",
              "渔政船",
              "海监艇",
              "其他"
            ]
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
              data: dateList
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "拖网",
              type: "bar",
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: "围网",
              type: "bar",
            //   stack: "广告",
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: "刺网",
              type: "bar",
            //   stack: "广告",
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: "张网",
              type: "bar",
            //   stack: "广告",
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: "钓具",
              type: "bar",
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            //   markLine: {
            //     lineStyle: {
            //       normal: {
            //         type: "dashed"
            //       }
            //     },
            //     data: [[{ type: "min" }, { type: "max" }]]
            //   }
            },
            {
              name: "笼壶",
              type: "bar",
              barWidth: 5,
            //   stack: "搜索引擎",
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: "杂渔具",
              type: "bar",
            //   stack: "搜索引擎",
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: "陷阱",
              type: "bar",
            //   stack: "搜索引擎",
              data: [60, 162, 71, 74, 190, 130, 1102]
            },
            {
              name: "耙刺",
              type: "bar",
            //   stack: "搜索引擎",
              data: [138, 82, 41, 81, 1090, 110, 87]
            },
            {
              name: "渔运船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [86, 567, 910, 84, 89, 123, 86]
            },
            {
              name: "冷藏船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [96, 126, 96, 87, 415, 56, 128]
            },
            {
              name: "渔油船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [62, 82, 91, 84, 109, 110, 120]
            },
            {
              name: "油污船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [620, 84, 97, 84, 69, 90, 120]
            },
            {
              name: "制冰船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [36, 82, 720, 84, 319, 110, 120]
            },
            {
              name: "拖轮",
              type: "bar",
            //   stack: "搜索引擎",
              data: [89, 82, 91, 555, 209, 116, 160]
            },
            {
              name: "科研教学",
              type: "bar",
            //   stack: "搜索引擎",
              data: [62, 821, 913, 846, 109, 189, 420]
            },
            {
              name: "工程船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [621, 82, 911, 844, 169, 110, 320]
            },
            {
              name: "渔政船",
              type: "bar",
            //   stack: "搜索引擎",
              data: [62, 829, 91, 841, 109, 136, 120]
            },
            {
              name: "海监艇",
              type: "bar",
            //   stack: "搜索引擎",
              data: [62, 821, 913, 84, 109, 110, 120]
            },
            {
              name: "其他",
              type: "bar",
            //   stack: "搜索引擎",
              data: [52, 621, 710, 98, 100, 180, 20]
            },
          ]
        };

        bar.setOption(option);

        window.addEventListener("resize", function() {
          bar.resize();
        });
        // bar.getZr().on("click", params => {
        //   var pointInPixel = [params.offsetX, params.offsetY];
        //   if (bar.containPixel("grid", pointInPixel)) {
        //     var pointInGrid = bar.convertFromPixel(
        //       { seriesIndex: 0 },
        //       pointInPixel
        //     );
        //     //X轴序号
        //     var xIndex = pointInGrid[0];
        //     //获取当前图表的option
        //     var op = bar.getOption();
        //     //获得图表中我们想要的数据
        //     var month = op.xAxis[0].data[xIndex];
        //     for (const key in this.res.data) {
        //       if (this.res.data.hasOwnProperty(key)) {
        //         const element = this.res.data[key];
        //         if (month == element.name) {
        //           this.$router.push({
        //             path: "/enforcement/achive/crewZs",
        //             query: {
        //               areaCode: element.id
        //             }
        //           });
        //         }
        //       }
        //     }
        //   }
        // });
        // // 将可以响应点击事件的范围内，鼠标样式设为pointer
        // bar.getZr().on("mousemove", function(params) {
        //   var pointInPixel = [params.offsetX, params.offsetY];
        //   if (bar.containPixel("grid", pointInPixel)) {
        //     bar.getZr().setCursorStyle("pointer");
        //   }
        // });
        // bar.on("mouseout", function(params) {
        //   var pointInPixel = [params.offsetX, params.offsetY];
        //   if (!bar.containPixel("grid", pointInPixel)) {
        //     bar.getZr().setCursorStyle("default");
        //   }
        // });
        // this.timeOut = setTimeout(() => {
        //     this.updateInfo();
        // }, 15000);
      });
    },
    getNowFormatDate(data) {
      var currentdate
      var seperator = "-";
      var year = data.getFullYear();
      var month = data.getMonth() + 1;
      var strDate = data.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      currentdate = month + seperator + strDate 
      return currentdate;
    }
  },
  mounted() {
    this.upDateInfo();
  }
};
</script>
