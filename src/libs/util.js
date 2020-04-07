import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { forEach, hasOneOf, objEqual } from '@/libs/tools'
const { title, cookieExpires, useI18n } = config

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = { ...homeRoute }
  let routeMetched = route.matched
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem]
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = { ...item.meta }
    if (meta.title && typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      meta.title = meta.title(route)
    }
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })
  return [{ ...homeItem, to: homeRoute.path }, ...res]
}

export const getRouteTitleHandled = (route) => {
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
      title = meta.title(router)
    } else title = meta.title
  }
  meta.title = title
  router.meta = meta
  return router
}

export const showTitle = (item, vm) => {
  // let { title, __titleIsFunction__ } = item.meta
  // if (!title) return
  // if (useI18n) {
  //   if (title.includes('{{') && title.includes('}}') && useI18n) title = title.replace(/({{[\s\S]+?}})/, (m, str) => str.replace(/{{([\s\S]*)}}/, (m, _) => vm.$t(_.trim())))
  //   else if (__titleIsFunction__) title = item.meta.title
  //   else title = vm.$t(item.name)
  // } else title = (item.meta && item.meta.title) || item.name
  return (item.meta && item.meta.title) || item.name
}

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : [{
    meta: { hideInMenu: true, title: '首页', notCache: true, icon: 'md-home' },
    name: 'home',
    params: {},
    query: {}
  }]
}

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1
  let len = routers.length
  let homeRoute = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName)
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  // console.log(newList, 'newList')
  // console.log(newRoute, 'newRoute')
  let arr = newList.filter(item => {
    return item.name === newRoute.name
  })
  if (arr.length === 0) {
    newList.push({ name, path, meta })
  } else if (arr.length > 1) {
    newList.pop()
  }
  return newList
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * @param {Array} list 标签列表
 * @param {String} name 当前关闭的标签的name
 */
export const getNextRoute = (list, route) => {
  let res = {}
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route))
    if (index === list.length - 1) res = list[list.length - 2]
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}

/**
 * @param {Object} file 从上传组件得到的文件对象
 * @returns {Promise} resolve参数是解析后的二维数组
 * @description 从Csv文件中解析出表格，解析成二维数组
 */
export const getArrayFromFile = (file) => {
  let nameSplit = file.name.split('.')
  let format = nameSplit[nameSplit.length - 1]
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file) // 以文本格式读取
    let arr = []
    reader.onload = function (evt) {
      let data = evt.target.result // 读到的数据
      let pasteData = data.trim()
      arr = pasteData.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
        return row.split('\t')
      }).map(item => {
        return item[0].split(',')
      })
      if (format === 'csv') resolve(arr)
      else reject(new Error('[Format Error]:你上传的不是Csv文件'))
    }
  })
}

/**
 * @param {Array} array 表格数据二维数组
 * @returns {Object} { columns, tableData }
 * @description 从二维数组中获取表头和表格数据，将第一行作为表头，用于在iView的表格中展示数据
 */
export const getTableDataFromArray = (array) => {
  let columns = []
  let tableData = []
  if (array.length > 1) {
    let titles = array.shift()
    columns = titles.map(item => {
      return {
        title: item,
        key: item
      }
    })
    tableData = array.map(item => {
      let res = {}
      item.forEach((col, i) => {
        res[titles[i]] = col
      })
      return res
    })
  }
  return {
    columns,
    tableData
  }
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode
  if (parentNode) {
    let classList = parentNode.classList
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}

export const showByAccess = (access, canViewAccess) => {
  return hasOneOf(canViewAccess, access)
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }
  scroll(from, to, step)
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem)
  const pageTitle = showTitle(handledRoute, vm)
  const resTitle = pageTitle ? `${title} - ${pageTitle}` : title
  window.document.title = resTitle
}







let util={

};

util.resetData = function(arr, except) {
  for (let key in arr) {
      let include = false;
      for (let exc in except) {
          if (key == except[exc]) {
              include = true;
              break;
          }
      }
      if (!include) {
          arr[key] = "";
      }
  }
  return arr;
};

util.isNull = function(o) {
  return o == null || o == undefined || o == "";
};

util.trim = function(o) {
  if (this.isNull(o))
      return "";
  return o.replace(/^\s+|\s+$/gm, '');
};

util.isEmpty = function(o) {
  return this.isNull(o) || this.trim(o) == "";
};

util.getModuleCodes=function(modules,codes){
  modules.forEach(e=>{
      codes[e.code]=e;
      if(!util.isNull(e.children))
          util.getModuleCodes(e.children,codes);
  });
}

util.digui = function(node, search,handler) {
  if (this.isNull(node))
      return undefined;
  if(handler==undefined){
      if (!this.isNull(node.title) && node.title.indexOf(search) >= 0) {
          //node.title = node.title.replace(search, '<span style=\"color:red\">' + search + '</span>');
          return node;
      }
  }else{
      if (handler(node,search)) 
          return node;
  }
  if (this.isNull(node.children))
      return undefined;
  var children = []
  for (var i = 0; i < node.children.length; i++) {
      var child = util.digui(node.children[i], search,handler);
      if (!this.isNull(child))
          children.push(child);
  }
  if (children.length == 0)
      return undefined;
  node.children = children;
  node["expand"] = true;
  return node;
};

util.diguiTree = function(nodes, search,handler) {
  var search = this.trim(search);
  if (this.isEmpty(search))
      return nodes;
  var newTree = [];
  for (var i = 0; i < nodes.length; i++) {
      var node = util.digui(nodes[i], search,handler);
      if (!this.isNull(node))
          newTree.push(node);
  }
  return newTree;
};

util.expandTree = function(tree, pId) {
  // console.log(pId);
  if (this.isNull(tree) || this.isEmpty(pId))
      return false;
  for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      if (node["id"] == pId) {
          node["expand"] = true;
          return true;
      }
      if (this.expandTree(node["children"], pId)) {
          node["expand"] = true;
          return true;
      }
  }
  return false;
};

util.findNodeById = function(tree, pId) {
  // console.log(pId);
  if (this.isNull(tree) || this.isEmpty(pId))
      return undefined;
  for (var i = 0; i < tree.length; i++) {
      var node = tree[i];
      if (node["id"] == pId) {
          return node;
      }
      node = this.findNodeById(node["children"], pId);
      if (node)
          return node;
  }
  return undefined;
};

util.checkTree = function(tree, ids) {
  if (this.isNull(tree) || this.isEmpty(ids))
      return undefined;
  var temp=ids.split(",");
  var mapIds={};
  for(var i=0;i<temp.length;i++){
      mapIds[temp[i]]=true;
  }
  this.checkTreeByMap(tree,mapIds);
};

util.checkTreeByMap = function(tree, mapIds) {
  if (this.isNull(tree) || this.isNull(mapIds))
      return undefined;
  for (var i = 0; i < tree.length; i++) {
      var node=tree[i];
      if(mapIds[node.id])
          node.checked=true;
      this.checkTreeByMap(node.children,mapIds);
  }
};

util.deepCopy = function(source) {
  var str = JSON.stringify(source); //序列化对象
  return JSON.parse(str); //还原
};

util.delConfirm = function(_self, handler) {
  _self.$Modal.confirm({
      title: "提示",
      content: "请确认是否删除数据",
      onOk: handler
  });
};


util.validateForm=function(_self,name,handler){
  _self.$refs[name].validate((valid) => {
      if (valid) {
          handler();
      } else {
          // this.$Message.error('表单校验失败!');
      }
  });
};

util.inOf = function(arr, targetArr) {
  let res = true;
  arr.forEach(item => {
      if (targetArr.indexOf(item) < 0) {
          res = false;
      }
  });
  return res;
};

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
      return true;
  } else {
      return false;
  }
};

util.showThisRoute = function(itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
      return util.oneOf(currentAccess, itAccess);
  } else {
      return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function(routers, name) {
  if (!name || !routers || !routers.length) {
      return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
      if (item.name === name) {
          return item;
      }
      routerObj = util.getRouterObjByName(item.children, name);
      if (routerObj) {
          return routerObj;
      }
  }
  return null;
};

util.handleTitle = function(vm, item) {
  if (typeof item.title === 'object') {
      return vm.$t(item.title.i18n);
  } else {
      return item.title;
  }
};

util.setCurrentPath = function(vm, name) {
  let title = '';
  let isOtherRouter = false;
  vm.$store.getters.routers.forEach(item => {
      if (item.children.length === 1) {
          if (item.children[0].name === name) {
              title = util.handleTitle(vm, item);
              if (item.name === 'otherRouter') {
                  isOtherRouter = true;
              }
          }
      } else {
          item.children.forEach(child => {
              if (child.name === name) {
                  title = util.handleTitle(vm, child);
                  if (item.name === 'otherRouter') {
                      isOtherRouter = true;
                  }
              }
          });
      }
  });
  let currentPathArr = [];
  if (name === 'home_index') {
      currentPathArr = [{
          title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.getters.routers, 'home_index')),
          path: '',
          name: 'home_index'
      }];
  } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
      currentPathArr = [{
              title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.getters.routers, 'home_index')),
              path: '/home',
              name: 'home_index'
          },
          {
              title: title,
              path: '',
              name: name
          }
      ];
  } else {
      let currentPathObj = vm.$store.getters.routers.filter(item => {
          if (item.children.length <= 1) {
              return item.children[0].name === name;
          } else {
              let i = 0;
              let childArr = item.children;
              let len = childArr.length;
              while (i < len) {
                  if (childArr[i].name === name) {
                      return true;
                  }
                  i++;
              }
              return false;
          }
      })[0];

      if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
          currentPathArr = [{
              title: '首页',
              path: 'home',
              name: 'home_index'
          }];
      } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
          currentPathArr = [{
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: currentPathObj.path,
                  name: name
              }
          ];
      } else {
          let childObj = currentPathObj.children.filter((child) => {
              return child.name === name;
          })[0];
          currentPathArr = [{
                  title: '首页',
                  path: '/home',
                  name: 'home_index'
              },
              {
                  title: currentPathObj.title,
                  path: currentPathObj.path,
                  name: currentPathObj.name
              },
              {
                  title: childObj.title,
                  path:  childObj.path,
                  name: name
              }
          ];
      }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};

util.openNewPage = function(vm, name, argu, query) {
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
  while (i < openedPageLen) {
      if (name === pageOpenedList[i].name) { // 页面已经打开
          vm.$store.commit('pageOpenedList', {
              index: i,
              argu: argu,
              query: query
          });
          tagHasOpened = true;
          break;
      }
      i++;
  }
  if (!tagHasOpened) {
      let tag = vm.$store.state.app.tagsList.filter((item) => {
          if (item.children) {
              return name === item.children[0].name;
          } else {
              return name === item.name;
          }
      });
      tag = tag[0];
      if (tag) {
          tag = tag.children ? tag.children[0] : tag;
          if (argu) {
              tag.argu = argu;
          }
          if (query) {
              tag.query = query;
          }
          if(tag.meta&&tag.meta.showInBread=="1")   //模块配置  20190605
              vm.$store.commit('increateTag', tag);
      }
  }
  vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function(routers, name, route, next) {
  // console.log("toDefaultPage--"+name);
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
      if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
          route.replace({
              name: routers[i].children[0].name
          });
          notHandle = false;
          next();
          break;
      }
      i++;
  }
  if (notHandle) {
      next();
  }
};

util.fullscreenEvent = function(vm) {
  vm.$store.commit('initCachepage');
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist');
  // 全屏相关
};
export default util;