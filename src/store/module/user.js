import { isNull, isEmpty, getModuleCodes } from '@/libs/common';
import { logout } from '@/api/system';
import router from '@/router';
import Util from '@/libs/util';
export default {
  state: {
    appId: undefined, //系统ID
    appInfo: undefined, //系统数据
    userInfo: undefined, //登入用户数据
    modules: [], //路由信息
    dicts: [],
    moduleCodes:[],
    index:"/"
  },
  mutations: {
    //提交系统id
    setAppId (state, appId) {
      state.appId = appId
    },
    //提交系统数据
    setAppInfo (state, appInfo) {
      sessionStorage.setItem('appInfo' + state.appId, JSON.stringify(appInfo))
      state.appInfo = appInfo;
      window.document.title=state.appInfo.title;
    },
    //提交登入用户数据
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    setModules (state, modules) {
      state.modules = modules
      sessionStorage.setItem('modules' + state.appId, JSON.stringify(modules))
    },
    setDicts (state, dicts) {
      state.dicts = dicts
      sessionStorage.setItem('dicts', JSON.stringify(dicts))
    },
    //退出登录
    logout (state) {
      logout().then(res => {
        state.userInfo = undefined
        state.modules = []
        state.dicts = []
        // sessionStorage.setItem('modules' + state.appId,undefined);
        // sessionStorage.setItem('userInfo',undefined);
        // localStorage.removeItem('tagNaveList');
        sessionStorage.clear();
        router.resetRouter();
        router.push({ path: '/login' })
      })
    }
  },
  getters: {
    //获取系统信息
    getAppInfo: (state) => () => {
      if (isNull(state.appInfo)) {
        let json = sessionStorage.getItem('appInfo' + state.appId)
        // console.log(state.appId,'state.appId')
        if (!isEmpty(json)) {
          // console.log(json,'json2')
          state.appInfo = JSON.parse(json);
          window.document.title=state.appInfo.title;
        }
      }
      
      if(!isNull(state.appInfo)&&!isEmpty(state.appInfo.href)){
        var href=state.appInfo.href;
        if(href.indexOf("#")>0){
          state.index=href.substring(href.indexOf("#")+1);
        }
      }
      return state.appInfo;
    },
    //获取用户信息
    getUserInfo: (state) => () => {
      if (isNull(state.userInfo)) {
        let json = sessionStorage.getItem('userInfo');
        if (!isEmpty(json)) {
          state.userInfo = JSON.parse(json)
        }
      }
      return state.userInfo;
    },
    //获取用户名
    getUsername:(state, getters) => () => { 
      var userInfo=getters.getUserInfo();
      if(!isNull(userInfo))
        return userInfo.username;
      return "";
    },
    hasRoles:(state, getters) => (roles) => {
      var arr = roles.split(',')
      var authorities = getters.getUserInfo().authorities;
      for (var i = 0, length = arr.length; i < length; i++) {
          var role = 'ROLE_' + arr[i]
          for (var j = 0, size = authorities.length; j < size; j++) {
              var item = authorities[j]
              if (role == item)
                  return true;
          }
      }
      return false;
    },
    isOwn:(state, getters) => (creatorId) =>{
      var userInfo=getters.getUserInfo();
      return !isNull(userInfo)&&(userInfo.userId == creatorId);
    },
    getModules: (state) => () => {
      if (isNull(state.modules)) {
        let json = sessionStorage.getItem('modules' + state.appId)
        if (!isEmpty(json)) {
          state.modules = JSON.parse(json)
          console.log(state.modules, 'state.modules')
          // console.log(router, 'router')
          // var codes = {}
          // getModuleCodes(state.modules, codes)
          // state.moduleCodes = codes
          router.resetRouter()
        }
      }
      var codes={};
      Util.getModuleCodes(state.modules,codes);
      state.moduleCodes=codes;
      return state.modules
    },
    getStstemPath: (state) => () => {
      let arr = []
      if (isNull(state.appInfo)) {
        let json = sessionStorage.getItem('appInfo' + state.appId)
        if (!isEmpty(json) && json != null && json != undefined) {
          arr = [JSON.parse(json).login, JSON.parse(json).home, JSON.parse(json).main]
        }
      } else {
        arr = [state.appInfo.login, state.appInfo.home , state.appInfo.main]
      }
      return arr
    },
    getDicts: (state) => () => {
      if (isNull(state.dicts)) {
        let json = sessionStorage.getItem('dicts')
        if (!isEmpty(json)) {
          state.dicts = JSON.parse(json)
        }
      }
      return state.dicts
    }
  },
  actions: {

  }
}
