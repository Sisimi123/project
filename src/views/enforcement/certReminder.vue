<template>
  <div style="width:100%;height:100%;" id="certReminder"></div>
</template>

<script>
// 证书到期
import echarts from "echarts";

export default {
  name: "certReminder",
  props: {},
  data() {
    return {
      time: 86400000 * 120
    };
  },

  methods: {
    initDefault(){
        var legendData = [];
            var seriesData = [];
            legendData.push("已经过期");
            seriesData.push({
              name: "已经过期",
              value: "100",
              label: {
                color: "#FFFFFF"
              }
            });
            legendData.push("即将过期");
            seriesData.push({
              name: "即将过期",
              value: "20",
              label: {
                color: "#FFFFFF"
              }
            });

            legendData.push("状态正常");
            seriesData.push({
              name: "状态正常",
              value: "500",
              label: {
                color: "#FFFFFF"
              }
            });

            var dataSource = echarts.init(
              document.getElementById("certReminder")
            );

            window.addEventListener("resize", function() {
              dataSource.resize();
            });
            var option = {
              backgroundColor: "#534BFF",
              color: ["#E94290", "#FFB417", "#25D3D2"],
              tooltip: {
                trigger: "item",
                formatter: "证书到期 <br/>{b} : {c} ({d}%)"
              },
              title: {
                text: "证书到期",
                left: 5,
                top: 5,
                textStyle: {
                  fontSize: "16",
                  color: "#FFFFFF"
                }
              },
              legend: {
                type: "scroll",
                orient: "vertical",
                right: 10,
                bottom: 10,
                data: legendData,
                textStyle: {
                  color: "#FFFFFF"
                }
              },
              series: [
                {
                  type: "pie",
                  radius: ["60%", "80%"],
                  center: ["45%", "52%"],
                  data: seriesData,
                  label: {
                    color: "#FFFFFF",
                    normal: {
                      formatter: "{b} \n {d}%"
                    }
                  }
                }
              ]
            };

            dataSource.setOption(option);
    },
    init() {
      this.drow({data:{
        expire: 0,
        nearExpire: 0,
        normal: 0
      }});
      this.$nextTick(() => {
        this.$http
          .get("/shiparchives/nybycjy/certReminder", {
            params: {
              expireRule: this.time.toString()
            }
          })
          .then(res => {
            console.log(res);
            this.drow(res);
          })
          .catch(err => {
            console.log(err);
            this.initDefault();
          });
      });
    },
    drow(res){
      var legendData = [];
      var seriesData = [];
      legendData.push("已经过期");
      seriesData.push({
        name: "已经过期",
        value: res.data.expire,
        label: {
          color: "#FFFFFF"
        }
      });
      legendData.push("即将过期");
      seriesData.push({
        name: "即将过期",
        value: res.data.nearExpire,
        label: {
          color: "#FFFFFF"
        }
      });

      legendData.push("状态正常");
      seriesData.push({
        name: "状态正常",
        value: res.data.normal,
        label: {
          color: "#FFFFFF"
        }
      });

      var dataSource = echarts.init(
        document.getElementById("certReminder")
      );

      window.addEventListener("resize", function() {
        dataSource.resize();
      });
      var option = {
        backgroundColor: "#534BFF",
        color: ["#E94290", "#FFB417", "#25D3D2"],
        tooltip: {
          trigger: "item",
          formatter: "证书到期 <br/>{b} : {c} ({d}%)"
        },
        title: {
          text: "证书到期",
          left: 5,
          top: 5,
          textStyle: {
            fontSize: "16",
            color: "#FFFFFF"
          }
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          bottom: 10,
          data: legendData,
          textStyle: {
            color: "#FFFFFF"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "65%"],
            center: ["45%", "52%"],
            data: seriesData,
            label: {
              color: "#FFFFFF",
              normal: {
                formatter: "{b} \n {d}%"
              }
            }
          }
        ]
      };
      dataSource.setOption(option);
    },
  },
  
  mounted() {
    this.init();
  },
  beforeDestroy() {},
  watch: {}
};
</script>
