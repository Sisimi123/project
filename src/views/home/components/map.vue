<template>
    <div style="width:calc(100% - 0px);height:380px;" id="home_page_map"></div>
</template>

<script>
import echarts from 'echarts';
import geoCoordMap from '../map-data/get-geography-value.js';
export default {
    name: 'homeMap',
    props:{
        defaultData:{
            type:Array,
            required:true,
        }
    },
    data(){
        return {
            cityData: [
                // {name: '杭州', value: 50},
                // {name: '上海', value: 12},
                // {name: '温州', value: 42},
                // {name: '绍兴', value: 23},
                // {name: '舟山', value: 12}
            ],
        }
    },
    methods:{
        getHomeMap(){
            var _self=this;
            this.$http.get("/scd/homeMap",{
                params:{
                    startingDate: _self.defaultData[0],
                    endDate: _self.defaultData[1],
                }
            })
            .then(function(result){
                if(result.success){
                    _self.cityData=JSON.parse(result.data).homeMap;
                    _self.doDrow();
                }
            });
        },
        doDrow(){
            var _self=this;
            var map = echarts.init(document.getElementById('home_page_map'));
            const chinaJson = require('../map-data/china.json');
            echarts.registerMap('china', chinaJson);
            var convertData = function (cityData) {
                var res = [];
                for (var i = 0; i < cityData.length; i++) {
                    var geoCoord = geoCoordMap[cityData[i].name];
                    if (geoCoord) {
                        res.push({
                            name: cityData[i].name,
                            value: geoCoord.concat(cityData[i].value)
                        });
                    }
                }
                return res;
            };
            var d0=convertData(_self.cityData);
            var d1=convertData(_self.cityData.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6));
            map.setOption({
                backgroundColor: '#FFF',
                geo: {
                    map: 'china',
                    label: {
                        emphasis: {
                            show: true
                        }
                    },
                    center: [120, 30],
                    zoom: 4,
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#EFEFEF',
                            borderColor: '#CCC'
                        },
                        emphasis: {
                            areaColor: '#E5E5E5'
                        }
                    },
                    mapStyle: {
                        styleJson: [{
                            'featureType': 'water',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'land',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#f3f3f3'
                            }
                        }, {
                            'featureType': 'railway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fdfdfd'
                            }
                        }, {
                            'featureType': 'highway',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'geometry.fill',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'poi',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'green',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'subway',
                            'elementType': 'all',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'manmade',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'local',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'arterial',
                            'elementType': 'labels',
                            'stylers': {
                                'visibility': 'off'
                            }
                        }, {
                            'featureType': 'boundary',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#fefefe'
                            }
                        }, {
                            'featureType': 'building',
                            'elementType': 'all',
                            'stylers': {
                                'color': '#d1d1d1'
                            }
                        }, {
                            'featureType': 'label',
                            'elementType': 'labels.text.fill',
                            'stylers': {
                                'color': '#999999'
                            }
                        }]
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function(data){
                        return data.name+"\n "+data.value[2];
                    },
                },
                grid: {
                    top: 0,
                    left: '0%',
                    right: '0%',
                    bottom: '0',
                    containLabel: true
                },
                series : [
                    {
                        name: 'geo',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: d0,
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#59b1f0'
                            }
                        }
                    },
                    {
                        name: 'Top',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: d1,
                        symbolSize: function (val) {
                            return val[2] / 1.2;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: function(data){
                                    return data.name+"\n "+data.value[2];
                                },
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#59b1f0',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    }
                ]
            });
            window.addEventListener('resize', function () {
                map.resize();
            });
        },
        init(){
            this.doDrow();
            this.getHomeMap();
        }
    },
    mounted () {
        this.init();
    }
};
</script>


