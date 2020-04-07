<template>
    <div style="width:100%;height:100%;" id="pie-orderStatus"></div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "dataSourcePie",
  data() {
    return {
      timeOut:{},
      dataType:[],
      data:[],
    };
  },
  computed:{
    status4user () {
        return this.$store.state.dict.dicts.status4user;
    },
  },
  methods: {
    updateInfo(){
      let _self = this;
      this.dataType = [],
      this.data = [],
      this.$http
        .get("/enanny/count/orderStatus")
        .then(res => {
          console.log("enanny/count/orderStatus");
          console.log(res.data);
          for (let key in res.data) {
              if (res.data.hasOwnProperty(key)) {
                  res.data[key].name = this.$store.getters.getDictName("status4user",res.data[key].name);
                  this.dataType.push(res.data[key].name);
                  this.data.push(res.data[key]);
              }
          }
          this.$nextTick(() => {
            var dataSourcePie = echarts.init(
              document.getElementById("pie-orderStatus")
            );
            const option = {
              color: ['#008080', '#5cadff', '#ff9900', '#00ffff', '#19be6b', '#495060', '#bbbec4'],
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: "vertical",
                left: "right",
                data: this.dataType
              },
              series: [
                {
                  name: "访问来源",
                  type: "pie",
                  radius: "66%",
                  center: ["40%", "50%"],
                  data: this.data,
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
            dataSourcePie.setOption(option);
            window.addEventListener("resize", function() {
              dataSourcePie.resize();
            });
          });

          this.timeOut = setTimeout(() => {
            this.updateInfo();
          }, 20000);

        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let _self = this;
    this.updateInfo();
  },
  beforeDestroy () {
    clearTimeout(this.timeOut);
  },
};
</script>
