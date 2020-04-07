export default {
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: 'iView-admin',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description 是否使用国际化，默认为false
     *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
     *              用来在菜单中显示文字
     */
    useI18n: true,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
        dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
        pro: 'https://produce.com'
    },
    // basePath: "http://172.16.3.15:8083/sea",
    // basePath: "http://zhgl.zjsos.net/sea",
    // basePath: "http://172.16.3.218:8083/sea", //仝鹏接口
    // basePath: 'http://192.168.2.62:8084/app',
    basePath: 'http://192.168.2.62:8083/sea',
    //  basePath: 'http://172.16.6.4:8084/app',
    //  basePath: 'http://localhost:8083/sea',
    // basePath: 'http://115.238.45.165:20009/sea',
    //  basePath: 'http://122.228.31.152:8083/seawz',
    // basePath: 'http://localhost:8084/app',
    // basePath: 'http://172.16.3.15:8083/sea',
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'home',
    /**
     * @description 需要加载的插件
     */
    plugin: {
        'error-store': {
            showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
            developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
        }
    },
    path: [{
            title: '浙江省海洋与渔业执法综合管理系统',
            value: 'index.html'
        },
        {
            title: '瑞安市渔业平安管控预警系统',
            value: 'raIndex.html'
        },
        {
            title: '台州市海洋与渔业综合执法管理系统',
            value: 'tzIndex.html'
        },
        {
            title: '舟山市海洋与渔业局渔船安全监管平台',
            value: 'zsIndex.html'
        },
        {
            title: '温州市农业农村局合作社台账系统',
            value: 'wzIndex.html'
        },
        {
            title: '互联网+监管平台',
            value: 'regulatory.html'
        }
    ],
    avatar: require('../images/avatar.jpg')
}