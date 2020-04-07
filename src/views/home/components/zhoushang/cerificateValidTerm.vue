<template>
  <div style="width:100%;height:100%;" id="cerifcate_area_group"></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "barArea",
  data() {
    return {
      res: {},
      certificate: ''
    };
  },
  methods: {
    updateInfo() {
          let xAxisData = [];
          let yxList = [];
          let wxList = [];
          this.$http
            .get("/achive/zs/certificate")
            .then(res => {
              this.res = res
              let datas = res.data;
              datas.forEach(element => {
                xAxisData.push(element.name);
                yxList.push(element.valid);
                wxList.push(element.invalid);
              });
              this.$nextTick(() => {
                let visiteVolume = echarts.init(
                  document.getElementById("cerifcate_area_group")
                );
                const option = {
                  color: ["#3299FF", "#7AE557"],
                  tooltip: {
                    trigger: "axis",
                    axisPointer: {
                      type: "shadow"
                    }
                  },
                  title:{
                    text:'证书有效期统计',
                    y: 20,
                    x: 20,
                  },
                  legend: {
                    data: ["证书有效数量", "证书无效数量"],
                    icon:"circle",
                    y: 20,
                    x: 170,
                  },
                  grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true
                  },
                  xAxis: {
                    type: "category",
                    data: xAxisData
                  },
                  yAxis: {
                    type: "value",
                    boundaryGap: [0, 0.01]
                  },
                  series: [
                    {
                      name: "证书有效数量",
                      type: "bar",
                      barWidth: "20",
                      data: yxList,
                      itemStyle: {
                          normal: {
                              barBorderRadius: [7,7,0,0]
                          }
                      }
                    },
                    {
                      name: "证书无效数量",
                      type: "bar",
                      barWidth: "20",
                      data: wxList,
                      itemStyle: {
                          normal: {
                              barBorderRadius: [7,7,0,0]
                          }
                      }
                    },             
                  ]
                };
                visiteVolume.setOption(option);
                //echarts自适应
                window.addEventListener("resize", function() {
                  visiteVolume.resize();
                });
                visiteVolume.on('click', (params)=> {
                  // this.$router.push({
                  //     path: '/enforcement/achive/ships',
                  //     query: {
                  //       areaCode: this.areaCode,
                  //     }
                  // });
                  var month = params.name;
                  if (params.seriesName == '证书有效数量') {
                    this.certificate = '1'
                  } else if (params.seriesName == '证书无效数量') {
                    this.certificate = '2'
                  }
                  for (const key in this.res.data) {
                      if (this.res.data.hasOwnProperty(key)) {
                        const element = this.res.data[key];
                        if (month == element.name) {
                          this.$router.push({
                            path: "/enforcement/achive/crewZs",
                            query: {
                              areaCode: element.id,
                              certificate: this.certificate
                            }
                          });
                        }
                      }
                    }
                });
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
