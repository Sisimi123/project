<template>
  <div style="width:100%;height:100%;" id="bar_area_worker"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "barArea",
  data() {
    return {
      res: {}
    };
  },
  methods: {
    updateInfo() {
          this.$http
            .get("/achive/zs/areaDist")
            .then(res => {
              this.res = res;
              var xAxisData = [];
              var seriesData = [];
              res.data.forEach(element => {
                xAxisData.push(element.name);
                seriesData.push(element.count);
              });
              this.$nextTick(() => {
                let bar = echarts.init(
                  document.getElementById("bar_area_worker")
                );

                const option = {
                  color: ["#7B52FE"],
                  tooltip: {
                    trigger: "axis",
                    axisPointer: {
                      // 坐标轴指示器，坐标轴触发有效
                      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  title:{
                    text:'从业人员分布统计',
                    y: 20,
                    x: 20,
                  },
                  grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "8%",
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: "category",
                      data: xAxisData,
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: "value"
                    }
                  ],
                  series: [
                    {
                      smooth: true,
                      name: "从业人员数量",
                      type: "line",
                      // barWidth: '40%',
                      barWidth: "50",
                      data: seriesData,
                      symbolSize: 8,//拐点大小
                      itemStyle : {
                            normal : {
                                lineStyle:{
                                    width:3,//折线宽度
                                    color:new echarts.graphic.LinearGradient(
                                        0, 0, 1, 0,
                                        [
                                            {offset: 0, color: '#A442FF'},
                                            {offset: 0.5, color: '#8E4AFE'},
                                            {offset: 1, color: '#2A75FF'}
                                        ]
                                    )
                                }
                            }
                      },
                    }
                  ]
                };

                bar.setOption(option);

                window.addEventListener("resize", function() {
                  bar.resize();
                });
                bar.getZr().on("click", params => {
                  var pointInPixel = [params.offsetX, params.offsetY];
                  if (bar.containPixel("grid", pointInPixel)) {
                    var pointInGrid = bar.convertFromPixel(
                      { seriesIndex: 0 },
                      pointInPixel
                    );
                    //X轴序号
                    var xIndex = pointInGrid[0];
                    //获取当前图表的option
                    var op = bar.getOption();
                    //获得图表中我们想要的数据
                    var month = op.xAxis[0].data[xIndex];
                    for (const key in this.res.data) {
                      if (this.res.data.hasOwnProperty(key)) {
                        const element = this.res.data[key];
                        if (month == element.name) {
                          this.$router.push({
                            path: "/enforcement/achive/crewZs",
                            query: {
                              areaCode: element.id
                            }
                          });
                        }
                      }
                    }
                  }
                });
                // 将可以响应点击事件的范围内，鼠标样式设为pointer
                bar.getZr().on("mousemove", function(params) {
                  var pointInPixel = [params.offsetX, params.offsetY];
                  if (bar.containPixel("grid", pointInPixel)) {
                    bar.getZr().setCursorStyle("pointer");
                  }
                });
                bar.on("mouseout", function(params) {
                  var pointInPixel = [params.offsetX, params.offsetY];
                  if (!bar.containPixel("grid", pointInPixel)) {
                    bar.getZr().setCursorStyle("default");
                  }
                });
                // this.timeOut = setTimeout(() => {
                //     this.updateInfo();
                // }, 15000);
              });
            })
            .catch(err => {
              console.log(err);
            });
    }
  },
  mounted() {
    this.updateInfo();
  },
  beforeDestroy() {
    // clearTimeout(this.timeOut);
  }
};
</script>
