<style lang="less" scoped>
    @import "../../../styles/commonStyle.less";
</style>

<template>
    <div style="width: 100%; height: 100%;">
        <iframe
            id="chatFrame"
            name="myFrame"
            runat="server"
            v-show="true"
            frameborder="no"
            style="width: 100%; height: 100%;"
        ></iframe>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted: function() {
            this.init();
        },
        methods: {
            init(){
                this.$http.get('/supervision/external/getToken')
                .then(res => {
                    if (res.success) {
                        this.chatFrame(res.data);
                    }
                }).catch(error => {
                    this.$Message.error("token获取失败");
                });
            },
            chatFrame(token) {
                document.getElementById("chatFrame").src = "http://192.168.2.62:8084/front//chat.html#/?appId=ff8080816eecd4f6016ef1dc061706ab&token=" + token;
            }
        }
    };
</script>