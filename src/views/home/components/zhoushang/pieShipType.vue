<template>
    <div style="width:100%;height:100%;" id="pie_ship_type"></div>
</template>

<script>
// 舟山渔船区域统计
import echarts from 'echarts';

export default {
    name: 'pieShipType',
    props:{
      areaCode: {
          type: String,
          default: "330900"
      },
      type: {
          type: String,
          default: "1"
      },
    },
    data() {
      return {
        typeLength1: "大型渔船",
        typeLength2: "中型渔船",
        typeLength3: "小型渔船",
        masterPower1: "60马力以上",
        masterPower2: "60马力以内",
        masterPower3: "异常数据",
      };
    },

    methods: {
      init() {
        this.$nextTick(() => {
          if(this.type&&this.areaCode){            
            this.$http
            .get("/achive/zs/ships",{
              params:{
                organid:this.areaCode,
                type:this.type,
              }
            }).then(res => {
              var legendData = [];
              var seriesData = [];
              if(this.type == "3"){
                legendData.push(this.typeLength1);
                seriesData.push({
                  name: this.typeLength1,
                  value: res.data[0].over40?res.data[0].over40: '0',
                });
                legendData.push(this.typeLength2);
                seriesData.push({
                  name: this.typeLength2,
                  value: res.data[0].middle12and40?res.data[0].middle12and40: '0',
                });
                legendData.push(this.typeLength3);
                seriesData.push({
                  name: this.typeLength3,
                  value: res.data[0].under12?res.data[0].under12: '0',
                });
              } else if(this.type == "4") {
                legendData.push(this.masterPower1);
                seriesData.push({
                  name: this.masterPower1,
                  value: res.data[0].over60,
                });
                legendData.push(this.masterPower2);
                seriesData.push({
                  name: this.masterPower2,
                  value: res.data[0].under60,
                });
                legendData.push(this.masterPower3);
                seriesData.push({
                  name: this.masterPower3,
                  value: res.data[0].ycsj?res.data[0].ycsj:'0',
                });
              } else if (this.type == "2"){
                for (let i = 1; i < res.data.length; i++) {
                  legendData.push(res.data[i].type);
                  seriesData.push({
                    name: res.data[i].type,
                    value: res.data[i].count,
                  });
                }
              } else {
                res.data.forEach(element => {
                  legendData.push(element.name);
                  seriesData.push({
                    name: element.name,
                    value: element.count,
                  });
                });
              }
              
              var dataSource = echarts.init(document.getElementById("pie_ship_type"));
              window.addEventListener("resize", function() {
                dataSource.resize();
              });
              var option = {
                // title: {
                //   text: "区域统计",
                //   x: "center"
                // },
                color:['#3781CF', '#00DCE9', '#00D192','#F5BC03', '#F7DD68', '#FD6953','#A56FFD','#615DF0','#005FFE', '#FE54C5'],
                tooltip: {
                  trigger: "item",
                  formatter: "渔船数据统计 <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  show: 'true',
                  // type: "scroll",
                  orient: "vertical",
                  x: 'right',
                  icon:"circle",
                  data: legendData,
                  padding: 20, 
                  itemGap: 30,
                  formatter: name => {
                    var index = 0;
                    var clientlabels = legendData;
                    var clientcounts = seriesData;
                    clientlabels.forEach(function(value, i) {
                      if (value == name) {
                        index = i;
                      }
                    });
                    return name + " " + clientcounts[index].value
                  }
                },
                series: [
                  {
                    type: "pie",
                    radius: ['55%', '70%'],
                    center: ["20%", "50%"],
                    data: seriesData,
                    // label: {
                    //     normal: {
                    //       formatter: "{b} \n {d}%",
                    //     }
                    // },
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                  }
                ]
              };
              if (this.type !== '1') {
                option.legend = {
                  show: 'true',
                  orient: "horizontal",
                  x: 500,
                  y: 'center',
                  icon:"circle",
                  data: legendData,
                  formatter: name => {
                    var index = 0;
                    var clientlabels = legendData;
                    var clientcounts = seriesData;
                    clientlabels.forEach(function(value, i) {
                      if (value == name) {
                        index = i;
                      }
                    });
                    return name + " " + clientcounts[index].value
                  }
                }
              }
              dataSource.setOption(option);
              dataSource.on('legendselectchanged', (params)=> {
                var typeLength_gte = '';
                var typeLength_lte = '';
                if (this.type == "3") {
                  if (params.name == this.typeLength3) {
                    typeLength_gte = '';
                    typeLength_lte = '12';
                  } else if (params.name == this.typeLength2) {
                    typeLength_gte = '12';
                    typeLength_lte = '40';
                  } else if (params.name == this.typeLength1) {
                    typeLength_gte = '40';
                    typeLength_lte = '';
                  }
                }
                this.$router.push({
                    path: '/enforcement/achive/ships',
                    query: {
                      areaCode: this.areaCode,
                      workType: this.type == "1" ? params.name : "",
                      hullMaterialA: this.type == "2" ? params.name : "",
                      typeLength_gte: typeLength_gte,
                      typeLength_lte: typeLength_lte,
                      typeLength: this.type == "3" ? params.name : "",
                      masterPower_gte: (this.type == "4" && params.name == this.masterPower1) ? "44" : "",
                      masterPower_lte: (this.type == "4" && params.name == this.masterPower2) ? "44" : "",
                      masterPower_yc: (this.type == "4" && params.name == this.masterPower3) ? "1" : "",
                    }
                });
              })
              dataSource.on('click', (params)=> {
                this.$router.push({
                    path: '/enforcement/achive/ships',
                    query: {
                      areaCode: this.areaCode,
                      workType: this.type == "1" ? params.data.name : "",
                      hullMaterialA: this.type == "2" ? params.data.name : "",
                      masterPower_gte: (this.type == "4" && params.data.name == this.masterPower1) ? "44" : "",
                      masterPower_lte: (this.type == "4" && params.data.name == this.masterPower2) ? "44" : "",
                      masterPower_yc: (this.type == "4" && params.data.name == this.masterPower3) ? "1" : "",
                    }
                });
              });
            })
            .catch(err => {
              console.log(err);
            });
          }
        });
      },
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {},
    watch:{
        areaCode(val){
            this.init();
        },
        type(val){
            this.init();
        },
    }
};
</script>
