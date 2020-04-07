<style lang="less">
</style>

<template>
<!-- 添加isIf 判断 用来销毁元素，控件仅支持连接一个 -->
<div v-if="isIf">
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
        
        <div slot="footer" >
            <Button  @click="cancel()">关闭</Button>
            <Button type="primary" @click="handleSave()">保存</Button>
        </div>
        <div>
          <div style="width:100%;background-color:#FFF;text-align:center">
            <div style="width:100%;height: 435px;" align="center" id="mainUI">
              <img id="myCanvas" width='600' height='400' style="background-color: black;" />
              <br /><br />
              <label id="lab1">设备类别:</label>
              <select id="device"></select>
              <label id="lab1">分辨率:</label>
              <select name="" id="resoultion" ></select>
              <label id="lab1">视频格式:</label>
              <select id="videoStyle" ></select>
              <br/><br />
             
              <br/><br />
            </div>
          </div>
        </div>

    </Modal>
</div>

</template>

<script>
export default {
    name: 'ws',
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
            default: '高拍仪上传'
        },
        width: {
            type: [Number, String],
            default: 720
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
            type: String
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
        }
        // 参数
    },
    computed: {

    },
    data () {
        return {
            visible: false,
            isIf: false,
            ws: '',
            wsinterval: '',
            img: false,
            imgBase64: '',
            m_isConnectWS: false,
            m_splitTag: '$*$',
            m_lastMessage: '',
            m_imageDataH: 0,
            m_imageDataW: 0,
            m_imageDataS: 0
            // m_stopWait: false // 同步等待
        };
    },
    methods: {
        ok () {
            this.visible = false;
            if (!this.loading) this.$emit('input', this.visible);
            this.$emit('on-ok');
        },
        cancel () {
            this.visible = false;
            this.$emit('input', this.visible);
            this.$emit('on-cancel');
        },
        visibleChange (val) {
            this.visible = val;
            this.$emit('on-visible-change', val);
        },
        handleOk (base64) {
            this.visible = false;
            this.$emit('input', this.visible);
            this.$emit('on-ok', base64);
        },
        handleSave () {
            // 函数内部 调用 on-ok 回调
            this.captureBase64();
        },
        // 保存参数
        SavePara () {
            this.sendWsMessage('SetJPGQuanlity' + this.m_splitTag + '100'); // JPG
        },
        captureBase64 () {
            var fileDir = 'D:\\temp';
            var fileStyle = 'jpg';
            this.SavePara();
            this.sendWsMessage('CaptureImageToBase64' + this.m_splitTag + fileDir + this.m_splitTag + fileStyle);
        },
        saveBase64info (str) {
            this.imgBase64 = str;
        },
        isEmpty (object) {
            if (object === '' || object === undefined || object === null || JSON.stringify(object) === '{}' || JSON.stringify(object) === '[]') {
                return true;
            }
            return false;
        },
        initError () {
            this.$Notice.open({
                title: '高拍仪初始化失败',
                desc: '初始化失败，请检查高拍仪是否连接，高拍仪插件CamSDKAB是否正常启动！'
            });
        },
        closeWebSocket () {
            this.ws.send('camCloseDev');
        },
        startWebSocket () {
            var url = 'ws://localhost:9000/';
            if ('WebSocket' in window) {
                this.ws = new WebSocket(url);
            } else if ('MozWebSocket' in window) {
                this.ws = new MozWebSocket(url);
            }

            this.ws.onopen = () => {
                console.log('enter onopen');
                this.ws.binaryType = 'arraybuffer';
                this.m_isConnectWS = true;
                this.sendWsMessage('IsInit'); // 初始化
            };
            this.ws.onmessage = (evt) => {
                if (typeof (evt.data) === 'string') {
                    var str = evt.data;
                    if (str.length <= 0) {
                        return;
                    }
                    if (str.indexOf('imageHWS') >= 0) {
                        let strs = []; // 定义一数组
                        strs = str.split(this.m_splitTag); // 字符分割
                        this.setCanvasImageSize(strs[1], strs[2], strs[3]);
                    } else {
                        this.handleEveryMessage(str);
                    }
                } else {
                    // var bytearray = new Uint8Array(evt.data);
                    // setCavasImage(bytearray);
                    // var b64encoded = btoa(Uint8ToString(bytearray));
                    // setImageWithBase64(b64encoded);
                }
            };
            this.ws.onclose = () => {
                this.m_isConnectWS = false;
                clearInterval();
                this.initError();
            };
        },
        sendWsMessage (msg) {
            this.ws.send(msg);
        },
        handleEveryMessage (str) {
            var strs = [];
            if (str.indexOf('imageData') >= 0) {
                strs = str.split(this.m_splitTag); // 分割设备名称
                this.setImageWithBase64(strs[1]);
                return;
            }
            if (str == 'IsInit_true') {
                this.sendPreZoneSize();
                this.sendWsMessage('OpenDevice' + this.m_splitTag + '0');
                setInterval(() => {
                    this.ws.send('GetBuff');
                }, 500);
                this.sendWsMessage('GetDeviceCount');
                this.sendWsMessage('GetDeviceName');
            } else if (str == 'IsInit_false') {
                this.initError();
            } else if (str == 'open_true') {
                this.sendWsMessage('GetResolutionCount');
                this.sendWsMessage('GetResolution');
                this.sendWsMessage('GetMediaTypeCount');
                this.sendWsMessage('GetMedia');
                // this.startShowUI();
            } else if (str.indexOf('DeviceName') >= 0) {
                strs = str.split(this.m_splitTag); // 分割设备名称
                this.configureDevInfo(strs);
            } else if (str.indexOf('ResoultionName') >= 0) {
                strs = str.split(this.m_splitTag); // 分割分辨率
                this.configureRestionInfo(strs);
            } else if (str.indexOf('MediaName') >= 0) {
                strs = str.split(this.m_splitTag); // 分割设备格式
                this.configureVideoStyle(strs);
            } else if (str.indexOf('Base64Info') >= 0) {
                strs = str.split(this.m_splitTag);

                this.saveBase64info(strs[1]);
                // 逻辑修改 获取到base64 直接回调成功接口
                this.handleOk(strs[1]);
            } else if (str.indexOf('CaptureSuccess') >= 0) {
                strs = str.split(this.m_splitTag);
            } else if (str.indexOf('viewFolderSuccess') >= 0) {
                strs = str.split(this.m_splitTag);
                this.setSavePath(strs[1]);
            } else if (str.indexOf('Error') >= 0) {
                strs = str.split(this.m_splitTag); // 处理错误
            } else if (str == 'close_true') {
                // this.$Message.info('关闭成功');
            } else if (str == 'close_false') {
                // this.$Message.info('关闭失败');
            } else {
                console.log('else', str);
            }
        },
        setCanvasImageSize (w, h, s) {
            this.m_imageDataH = h;
            this.m_imageDataS = s;
            this.m_imageDataW = w;
        },
        setImageWithBase64 (str) {
            var myimg = document.getElementById('myCanvas');
            myimg.src = 'data:image/png;base64,' + str;
        },
        sendPreZoneSize () {
            var w = document.getElementById('myCanvas').width;
            var h = document.getElementById('myCanvas').height;
            this.sendWsMessage('PreZoneSize' + this.m_splitTag + String(w) + this.m_splitTag + String(h));
        },
        configureDevInfo (names) {
            // 设备名字
            var objSelect = document.getElementById('device');
            objSelect.options.length = 0;
            for (var i = 1; i < names.length; i++) {
                var op = new Option(names[i], i);
                objSelect.options[objSelect.length] = op;
            }
            // 设置设备
            objSelect.onchange = () => {
                this.sendWsMessage('OpenDevice' + this.m_splitTag + String(objSelect.selectedIndex));
            };
        },
        configureRestionInfo (names) {
            var objSelect = document.getElementById('resoultion');
            objSelect.options.length = 0;
            for (var i = 1; i < names.length; i++) {
                if (names[i].length <= 0) {
                    continue;
                }
                var op = new Option(names[i], i);
                objSelect.options[objSelect.length] = op;
            }
            // 设置分辨率
            objSelect.onchange = () => {
                this.sendWsMessage('SetResolution' + this.m_splitTag + String(objSelect.selectedIndex));
            };
        },
        configureVideoStyle (names) {
            var objSelect = document.getElementById('videoStyle');
            objSelect.options.length = 0;
            for (var i = 1; i < names.length; i++) {
                var op = new Option(names[i], i);
                objSelect.options[objSelect.length] = op;
            }
            // 设置视频格式
            objSelect.onchange = () => {
                this.sendWsMessage('SetMediaType' + this.m_splitTag + String(objSelect.selectedIndex));
            };
        }

    },
    watch: {
        value (val) {
            this.visible = val;
            this.isIf = val;
            if (val) {
                this.startWebSocket();
            } else {
                this.closeWebSocket();
            }
        }
    }
};
</script>

<style scoped>

</style>