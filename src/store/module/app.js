import {
  getBreadCrumbList,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled
} from '@/libs/util'
import router from '@/router'
import config from '@/config'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    menuList: [], //侧边栏数据，用于渲染侧边栏
    breadCrumbList: [], //面包屑数据
    tagNavList: [], //导航卡片数据
    homeRoute: {}, 
    searchHeight: 0, //筛选区的高度
    orginalSinglePage: 0,
    orginalFlexWrap: 0,
    treeHeight: 0, //树组件高度
    bottomHeight: 0, //分页组件高度
    clientWidth: 0,
    clientHeight: 0,
    contentHeight: 0
  },
  mutations: {
    //提交侧边栏数据
    setMenuList (state, menuList) {
      state.menuList = menuList
    },
    //提交面包屑数据
    setBreadCrumb (state, route) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    //提交导航卡数据
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else {
        tagList = getTagNavListFromLocalstorage() || []
      }
      if (tagList[0] && tagList[0].name !== homeName) {
        tagList.shift()
      }
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    //关闭当前导航卡
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      closePage(state, route)
    },
    //跳转路由时向导航卡数据中添加当前路由卡片
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setWidthAndHeight (state, height, width, contentHeight) {
      state.clientHeight = height
      state.clientWidth = width
      state.contentHeight = contentHeight
    },
    setSearchHeight (state, height) {
      state.searchHeight = height
    },
    setBottomHeight (state, height) {
      state.bottomHeight = height
    },
    setPageHeight (state, height) {
      if (height > 900) {
        state.orginalSinglePage = height - 45
      } else {
        state.orginalSinglePage = height
      }
      state.orginalFlexWrap = 0
      state.treeHeight = state.orginalSinglePage - 50 - 32 - 6
    },
    setWrapHeight (state, height) {
      state.orginalSinglePage = 0
      state.orginalFlexWrap = height - 55 - 10 - 16 - 7
      state.treeHeight = state.orginalFlexWrap - 50 - 32 - 6
    },
  },
  actions: {
  }
}
