<style lang="less">
@import "../../../styles/commonStyle.less";
</style>

<template>
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
        @on-ok="ok"
        @on-cancel="cancel"
        @on-visible-change="visibleChange">
        <slot name="close"></slot>
        <slot name="header"></slot>
        <slot name="footer"></slot>
        <div id="mapSearch">
          <Input element-id="tipinput" v-model="queryName" placeholder="请输入地址关键字..." />
        </div>
        <div id="allmap"  :style="'height:'+ height">
        </div>
    </Modal>
</template>

<script>

export default {
    name: 'AmapModal',
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
            default: ''
        },
        width: {
            type: [Number, String],
            default: 1080
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
            default: 'vertical-center-modal'

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
            default () {
                return ['ease', 'fade'];
            }
        },
        transfer: {
            type: Boolean,
            default: true
        },
        lng: {
            type: [Number, String],
            default: ''
        },
        lat: {
            type: [Number, String],
            default: ''
        },
        city: {
            type: String,
            default: '温州'
        },
        height: {
            type: String,
            default: '500px'
        }

    },
    data () {
        return {
            // wrapShow: false,
            // showHead: true,
            // buttonLoading: false,
            visible: this.value,
            marker: {},
            info: {},
            queryName: '',
            signLng: '',
            signLat: '',
            address: ''
        };
    },
    methods: {
        ok () {
            if (!this.loading) { this.$emit('input', this.visible); }

            this.analysis();
        },
        cancel () {
            this.$emit('input', this.visible);
            this.$emit('on-cancel');
        },
        visibleChange (val) {
            this.$emit('on-visible-change', val);
        },
        isEmpty (s) {
            if (s == null || s == '' || s == undefined) {
                return true;
            }
            return false;
        },
        reset () {
            this.queryName = '';
            this.signLng = '';
            this.signLat = '';
            map.clearMap();

            if (!this.isEmpty(this.lng) && !this.isEmpty(this.lat)) {
                this.createMarker(this.lng, this.lat);
                this.signLng = this.lng;
                this.signLat = this.lat;
                map.setZoomAndCenter(16, [this.lng, this.lat]);
            } else {
                // this.getLocation();
            }
        },
        createMap () {
            var map = new AMap.Map('allmap', {
                resizeEnable: true, // 是否监控地图容器尺寸变化，默认值为false
                zoom: 12,
                doubleClickZoom: false // 地图是否可通过双击鼠标放大地图，默认为true。此属性可被setStatus/getStatus 方法控制
            });
            window.map = map;
        },
        addControls () {
            AMap.plugin(['AMap.ToolBar'], () => {
                // 创建并添加工具条控件
                var toolBar = new AMap.ToolBar();
                map.addControl(toolBar);
            });
        },
        getLocation () {
            map.plugin(['AMap.Geolocation'], () => {
                let geolocation = new AMap.Geolocation({

                    timeout: 5000 //  超过5秒后停止定位，默认：无穷大
                });
                console.log('geolocation');
                console.log(geolocation.isSupported());

                map.addControl(geolocation);
                geolocation.getCityInfo();
                // geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', (result) => {
                    console.log('result');
                    console.log(result);
                    map.setCenter(result.position);
                }); //  返回定位信息
                AMap.event.addListener(geolocation, 'error', (result) => {
                    console.log(result);
                    this.$Message.error('定位失败');
                }); //  返回定位出错信息
            });
        },
        autoCompleteSearch () {
            map.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
                let auto = new AMap.Autocomplete({
                    input: 'tipinput'
                });
                var placeSearch = new AMap.PlaceSearch({
                    map: map
                });
                window.placeSearch = placeSearch;

                AMap.event.addListener(auto, 'select', (e) => {
                    placeSearch.setCity(e.poi.adcode);
                    placeSearch.search(e.poi.name); // 关键字查询查询

                    AMap.event.addListener(placeSearch, 'markerClick', (e2) => {
                        this.signLng = e2.data.location.lng;
                        this.signLat = e2.data.location.lat;
                        if (!this.isEmpty(this.marker)) {
                            map.remove(this.marker);
                        }
                        this.createMarker(this.signLng, this.signLat);
                    });
                });
            });
        },
        addClickEvent () {
            AMap.event.addListener(map, 'click', (e) => {
                this.signLng = e.lnglat.getLng();
                this.signLat = e.lnglat.getLat();
                if (!this.isEmpty(this.marker)) {
                    map.remove(this.marker);
                }
                this.createMarker(e.lnglat.getLng(), e.lnglat.getLat());
            });
        },
        analysis () {
            // 地址解析
            map.plugin(['AMap.Geocoder'], () => {
                let lnglat = [this.signLng, this.signLat];
                var geocoder = new AMap.Geocoder({
                    city: '全国'
                });
                geocoder.getAddress(lnglat, (status, result) => {
                    if (status === 'complete' && result.info === 'OK') {
                        this.address = result.regeocode.formattedAddress;
                        this.$emit('on-ok', this.signLng, this.signLat, this.address, result.regeocode);
                    } else {
                        this.$emit('on-ok', this.signLng, this.signLat, '');
                    }
                });
            });
        },
        initMap () {
            this.createMap();
            this.addControls();
            // this.getLocation();
            this.autoCompleteSearch();
            this.addClickEvent();
            if (!this.isEmpty(this.lng) && !this.isEmpty(this.lat)) {
                this.marker = new AMap.Marker({
                    position: [this.lng, this.lat]
                });
                this.marker.setMap(map);
                this.signLng = this.lng;
                this.signLat = this.lat;
                map.setZoomAndCenter(16, [this.lng, this.lat]);
            }
        },
        createMarker (lng, lat) {
            this.marker = new AMap.Marker({
                position: [lng, lat], // marker所在的位置
                map: map // 创建时直接赋予map属性
            });
        }
    },
    mounted () {
        this.initMap();
    },
    watch: {
        value (val) {
            this.value = val;
            this.visible = val;
            if (val) { this.reset(); }
        }
    }
};
</script>
<style>  
.amap-logo,.amap-copyright{
display: none!important;
}
</style> 

