<style lang="less" scoped>
    @import "../../styles/commonStyle.less";
</style>

<template>
    <div>
        <iframe
            id="list"
            name="myFrame"
            v-show="false"
            frameborder="no"
            style="width: 100%; height: 500px;"
        ></iframe>
        <iframe
            id="child"
            name="myFrame"
            frameborder="no"
            style="width: 100%; height: 500px;"
        ></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                hasData: false,
                token: ''
            }
        },
        mounted: function() {
            let _self = this;
            $.post("http://172.16.3.218:8083/sea/godata/token", {}, function(token) {
                _self.token = token;
                document.getElementById("list").src = "http://172.16.3.5:8080/sjsbpt.html#/main/plain?mycallback=" +
                    encodeURIComponent("http://172.16.3.5:8080/sjsbpt.html#/main/concisebusinessdata/null") +
                    "&token=" + encodeURIComponent(token);
            });
            var routeName = this.$route.meta.title;
            window.addEventListener(
                "message",
                function(messageEvent) {
                    if(!_self.hasData)
                    if(messageEvent.data) {
                        var objList = messageEvent.data.data;
                        var zId = null;
                        for(var l in objList){
                            if(objList[l].directoryName == routeName){
                                // 存在多个相同 directoryName
                                if(zId!=null)
                                    return;
                                zId = objList[l].zId;
                            }
                        }
                        if(zId) {
                            _self.onSelcetForm(zId, _self.token);
                            _self.hasData = true;
                        }
                    }
                }, false
            );
        },
        methods: {
            onSelcetForm(zid, token) {
                document.getElementById("child").src = "http://172.16.3.5:8080/sjsbpt.html#/main/plain?mycallback=" +
                    encodeURIComponent("http://172.16.3.5:8080/sjsbpt.html#/main/concisebusinessdata/" + zid) +
                    "&token=" + encodeURIComponent(token);
            }
        }
    };
</script>