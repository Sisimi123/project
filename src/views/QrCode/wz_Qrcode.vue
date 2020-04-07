<template>
  <div class="box">
      <p>“海渔通小程序”是基于温州市渔业综合管理平台研发的小程序，为渔民朋友及其亲友提供渔船位置查询和短信通信、证书信息查询、渔场气象、船舶交易等服务。</p>
      <div class="Qrcode">
          <img style="width:100%" src="../../images/wz_QrCode.jpg" alt="">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box{
    width: 100%;
    height: 100%;
    background-image: url('../../images/qrCode.jpg');
    background-size:100% 100%;
    position: relative;
}
p{
    color: white;
    position: absolute;
    left: 48%;
    top: 36%;
    width: 35%;
    font-size: 20px;
    text-indent:2em
}
.Qrcode{
    position: absolute;
    left: 58%;
    top: 50%;
    width: 13%;
}
</style>