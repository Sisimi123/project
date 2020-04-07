import Main from '@/views/main/main.vue'
import Home from '@/views/single-page/home'
import Login from '@/views/login/login'
import store from '../store'
import { isNull, isEmpty } from '@/libs/common';
import NotFound from '@/views/error-page/404.vue';
import MyFrame from '@/views/components/content/MyFrame.vue';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export const otherRouter = [{
        path: '/500',
        component: () =>
            import ('@/views/error-page/500.vue'),
        meta: {
            permitAll: true,
        },
    },
    {
        path: '/entryPage',
        name: 'entryPage',
        meta: {
            title: '统一门户'
        },
        component: () =>
            import ('@/views/layout/entryPage.vue')
    }, {
        path: '/appInfo',
        name: 'appInfo',
        meta: {
            title: '获取应用信息'
        },
        component: () =>
            import ('@/views/error-page/403.vue')
    }, {
        path: '/wz_Qrcode',
        name: 'wz_Qrcode',
        meta: {
            hideInMenu: true,
            permitAll: true,
        },
        component: () =>
            import ('@/views/QrCode/wz_Qrcode')
    }, {
        path: '/zs_Qrcode',
        name: 'zs_Qrcode',
        meta: {
            hideInMenu: true,
            permitAll: true,
        },
        component: () =>
            import ('@/views/QrCode/zs_Qrcode')
    }, {
        path: '/enforcement',
        component: () =>
            import ('@/views/enforcement/enforcement.vue'),
        children: [{
            path: '/enforcement/shipdanyanIndex',
            meta: {
                title: '渔船点验'
            },
            component: () =>
                import ('@/views/enforcement/shipdanyanIndex.vue')
        }, {
            path: '/enforcement/cooperatebookIndex',
            meta: {
                title: '合作社台账'
            },
            component: () =>
                import ('@/views/enforcement/cooperatebookIndex.vue')
        }, {
            path: '/enforcement/caseIndex',
            meta: {
                title: '案件办理'
            },
            component: () =>
                import ('@/views/enforcement/caseIndex.vue')
        }, {
            path: '/enforcement/checkIndex',
            meta: {
                title: '日常检查'
            },
            component: () =>
                import ('@/views/enforcement/checkIndex.vue')
        }, {
            path: '/enforcement/shipScoreIndex',
            meta: {
                title: '渔船安全记分'
            },
            component: () =>
                import ('@/views/enforcement/shipScoreIndex.vue')
        }, {
            path: '/enforcement/achiveIndex',
            meta: {
                title: '信息查询'
            },
            component: () =>
                import ('@/views/enforcement/achiveIndex.vue')
        }, {
            path: '/enforcement/wenshou',
            meta: {
                title: '文书管理'
            },
            component: () =>
                import ('@/views/enforcement/wenshou.vue')
        }, {
            path: '/enforcement/tzIndex',
            meta: {
                title: () => { return window.document.title } // '台州市海洋与渔业综合执法管理系统'
            },
            component: () =>
                import ('@/views/enforcement/tzIndex.vue')
        }, {
            path: '/enforcement/wzindex',
            meta: {
                title: () => { return window.document.title } //'温州市农业农村局合作社台账系统'
            },
            component: () =>
                import ('@/views/enforcement/wzindex.vue')
        }, {
            path: '/enforcement/index',
            meta: {
                title: () => { return window.document.title } //'浙江省海洋与渔业执法综合管理系统'
            },
            component: () =>
                import ('@/views/enforcement/index.vue')
        }],
    }, {
        path: "/",
        component: Main,
        children: [{
                path: '/*',
                name: '404',
                meta: {
                    hideInMenu: true
                },
                component: () =>
                    import ('@/views/error-page/404.vue')
            },
            {
                path: 'ownspace',
                title: '个人中心',
                name: 'ownspace_index',
                meta: {
                    title: '个人中心'
                },
                component: () =>
                    import ('@/views/own-space/own-space.vue')
            },
        ]
    }
];


function loadView(view) {
    return () =>
        import ( /* webpackChunkName: "view-[request]" */ `@/views${view}.vue`)
}


export const initSystemRouters = function(login, home, main) {
    return [{
            path: '/login',
            name: 'login',
            meta: {
                title: 'Login - 登录',
                hideInMenu: true
            },
            component: isEmpty(login) ? Login : () =>
                import (`@/views${login}.vue`)
        },
        {
            path: '/',
            name: '_home',
            redirect: '/home',
            component: isEmpty(main) ? Main : () =>
                import (`@/views${main}.vue`),
            meta: {
                hideInMenu: true,
                notCache: true
            },
            children: [{
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true,
                    icon: 'md-home'
                },
                component: isEmpty(home) ? Home : () =>
                    import (`@/views${home}.vue`)
                    // component: home === undefined ? () => import(`@/views/single-page/home`) : () => import(`@/views/single-page/home`)
            }]
        },
    ]
}

export const initRouter = function(modules) {
    return modules.map(function(v) {
        // var path=prefix?(prefix+'/'+v.code):("/"+v.code);
        return {
            path: isEmpty(v.rpath) ? (isEmpty(v.component) ? v.href : v.component) : v.rpath,
            name: v.code,
            meta: {
                id: v.id,
                title: v.name, //名称
                code: v.code,
                icon: v.icon, //图标地址
                hidden: v.status == '0', //是否禁用 （该属性已经弃用不做判断  后台不会响应隐藏的模块路由）
                showInMenu: v.showInMenu == '1', //是否在菜单中隐藏
                showInBread: v.showInBread == '1', //是否在面包屑中隐藏
                showAlways: v.showAlways, //如果该路由只有一个子路由，是否显示父级菜单
                href: v.href, //链接地址 

            },
            component: !isEmpty(v.component) ? loadView(v.component) : (!isEmpty(v.href) ? MyFrame : NotFound),
            // component: loadView(v.component) || NotFound,
            children: v.children ? initRouter(v.children) : undefined
        }
    })
}

export const getRouters = function() {
    let systemPath = store.getters.getStstemPath()
    var routers = store.getters.getModules();
    let sessionRouters = initRouter(routers);
    let systemRouters = initSystemRouters(systemPath[0], systemPath[1], systemPath[2])
    if (!isNull(sessionRouters) && sessionRouters.length > 0) {
        return [...systemRouters, ...sessionRouters, ...otherRouter]
    } else {
        return [...systemRouters, ...otherRouter]
    }
}