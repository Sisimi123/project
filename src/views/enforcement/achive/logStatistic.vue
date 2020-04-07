<style lang="less">
@import "../styles/achive.less";
</style>
<template>
  <div>
    <Card>
      <Row>
      <Form :label-width="80" @submit.native.prevent>
        <Col span="5">
            <Form-item label="类型:">
                <Select v-model="query.wheres.type" style="width:200px">
                    <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Form-item>
        </Col>
        <Col span="5">
            <Form-item label="开始时间:">
                <DatePicker format="yyyy-MM-dd" v-model="query.wheres.start" type="date"></DatePicker>
            </Form-item>
        </Col>
        <Col span="5">
            <Form-item label="结束时间:">
                <DatePicker format="yyyy-MM-dd" v-model="query.wheres.end" type="date"></DatePicker>
            </Form-item>
        </Col>
        <div>
            <Button @click="initSearch()" type="primary" icon="ios-search" >查询</Button>
        </div>
      </Form>
      </Row>
      <span
        style="display:block;width:100%;height:2px;background:rgba(158, 158, 158, 0.16);margin-bottom:-12px;margin-top:20px"
      />
      <Row>
          <div id="echarts"></div>
      </Row>
    </Card>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "logStatistic",

  data() {
    return {
      typeList: [
        {
          label: '日统计',
          value: '1'
        },
        {
          label: '月统计',
          value: '2'
        },
      ],
      query: {
        page: 1,
        size: 10,
        wheres: {
            type: '',
            start: '',
            end: '',
        },
        orders: "updateTime desc"
      },
    };
  },
  created(){
  },
  computed: {
  },  
  methods: {
      initSearch() {
          var _self = this
          var obj = {}
          var xAxisData = [];
          var seriesData = [];
          obj.query = JSON.stringify(this.query);
          _self.$http.get('/logStatistic/visit', {
              params: obj
          })
          .then(res => {
               xAxisData = res.data.title;
               seriesData = res.data.value;
               console.log(xAxisData,seriesData)
              _self.$nextTick(() => {
                  let bar = echarts.init(document.getElementById("echarts"));
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
                        text:'网站访问量统计分析',
                        y: 20,
                        x: 20,
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
                      name: "访问量",
                      type: "line",
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
              })
          }).catch(err =>{
              console.log(err)
          })
      }
  },
  mounted() {}
};
</script>

<style scoped>
    #echarts{
        height:calc(100vh - 200px);
    }
</style>
