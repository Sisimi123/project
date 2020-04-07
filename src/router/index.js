import Vue from 'vue'
import Router from 'vue-router'
import { getRouters } from './routers'
import store from '../store'
import iView from 'iview'
import { initAppInfo, initSystem, initUserInfo } from '@/api/system'
import { isNull, isEmpty } from '@/libs/common'


Vue.use(Router)

// 解决导航重复问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

const LOGIN_PAGE_PATH = '/login'

const createRouter = () => new Router({
    // mode: 'history', // require service support
    routes: getRouters()
})

const router = createRouter()

router.beforeEach((to, from, next) => {
    // console.log(to, "to-----------------------");
    iView.LoadingBar.start()
    localStorage.removeItem('tagNaveList')
    var appInfo = store.getters.getAppInfo();
    if (to.meta && to.meta.permitAll) { //免登录路由
        next()
    } else if (isNull(appInfo)) {
        initAppInfo(() => {
            next({ path: to.path });
        }, () => {
            next({ path: '/500' });
        });
    } else {
        var userInfo = store.getters.getUserInfo();
        if (isNull(userInfo) && to.path === LOGIN_PAGE_PATH) {
            sessionStorage.clear();
            next()
        } else if (isNull(userInfo)) {
            initUserInfo(() => {
                router.push({ path: to.path })
            })
        } else {
            var modules = store.getters.getModules();
            if (isNull(modules) || modules.length == 0) {
                initSystem(() => {
                    next();
                })
            } else {
                // router.resetRouter()
                next()
            }
        }
    }

})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
router.resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
    router.options = newRouter.options
}

export default router