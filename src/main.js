// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import config from '@/config'
import http from '@/libs/http'
import util from '@/libs/util'
import importDirective from '@/directive'

import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import TreeTable from 'tree-table-vue'
import VOrgTree from 'v-org-tree'
import 'v-org-tree/dist/v-org-tree.css'
import dataTable from './views/components/content/MyTableNew.vue'
import dataContent from './views/components/content/MyContent.vue'


Vue.use(iView)
Vue.use(TreeTable)
Vue.use(VOrgTree)
Vue.component('dataTable', dataTable)
Vue.component('dataContent', dataContent)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
window.ueditorServerUrl = config.basePath

Vue.prototype.$config = config
Vue.prototype.$basePath = config.basePath
Vue.prototype.$baseAttachUrl = config.basePath + '/$admin/attachs/stream/'
Vue.prototype.$baseIconUrl = config.basePath + '/attachment'
Vue.prototype.$http = http
Vue.prototype.$util = util
Vue.prototype.$hasRoles = store.getters.hasRoles

Vue.prototype.$isOwn = store.getters.isOwn

/**
 * 注册指令
 */
importDirective(Vue)

store.commit('setAppId', window.appId)
store.commit('setDicts')
// sessionStorage.setItem('appId', '297e0cbc6dd73462016dd73ad6b10028')
// store.getters.getStstemPath()
// store.getters.getUserInfo()
store.getters.getModules()
// store.getters.getDicts()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  methods: {
    contentHeight () {
      // 前台页面内容部分高度
      var flexWrap = document.getElementsByClassName('flex-wrap')
      if (flexWrap.length > 0) { return flexWrap[0].offsetHeight - 83 } // 减去头部和尾部高度
      // 后台页面内容部分高度
      var singlePageCon = document.getElementsByClassName('content-wrapper')
      if (singlePageCon.length > 0) { 
        return singlePageCon[0].offsetHeight
      } else {
        return 0
      }
    }
  },
  mounted () {
    var _self = this
    _self.$store.commit('setWidthAndHeight', document.body.clientHeight, document.body.clientWidth, _self.contentHeight())
    this.$store.state.ipInfo = window.ipInfo;
    // 公网ip地址
    console.log(this.$store.state.ipInfo);
    window.onresize = () => {
      return (() => {
        var page = document.getElementsByClassName('content-wrapper')
        var wrap = document.getElementsByClassName('flex-wrap')
        var search = document.getElementsByClassName('search-wrap')
        var bottom = document.getElementsByClassName('bottom-wrap')
        if (search.length > 0) { this.$store.commit('setSearchHeight', search[0].clientHeight) }
        if (bottom.length > 0) { this.$store.commit('setBottomHeight', bottom[0].clientHeight) }
        if (page.length > 0) {
          this.$store.commit('setPageHeight', page[0].clientHeight)
        } else if (wrap.length > 0) {
          this.$store.commit('setWrapHeight', wrap[0].clientHeight)
        } else {
          console.log('error')
        }
        // console.log(document.body.clientHeight + "  " + document.body.clientWidth+"  "+_self.contentHeight());
        _self.$store.commit('setWidthAndHeight', document.body.clientHeight, document.body.clientWidth, _self.contentHeight())
      })()
    }
  }
})