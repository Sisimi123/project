<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-btn,.ivu-input-wrapper,.ivu-select{
  margin-right: 5px;
}
.main .main-layout-con{
  position: relative;
}
.main .main-content-con{
  height: unset !important;
}
.ivu-page-options-elevator{
  height: 33px !important;
  line-height: 31px !important
}
// .main .ivu-layout{
//   display: unset;
//   width: 100%;
//     overflow: hidden;
//     height: 100%;
// }
.treeDataCard .ivu-card-head{
  padding: 7px 16px !important;
}
.enforceLawAide .ivu-modal-header p{
  overflow: unset;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  letter-spacing:2px;
  color: #fff
}
.enforceLawAide .ivu-modal-header{
  border-bottom: unset;
  background: linear-gradient(to right,#4889ff,#454cff);
}
.enforceLawAide .ivu-modal-body{
  padding: 0;
}
.enforceLawAide .ivu-icon-ios-close{
  color: #fff !important;
}
.enforceLawAide .ivu-modal-close{
  top: 12px !important
}
</style>
