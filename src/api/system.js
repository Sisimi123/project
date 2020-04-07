import {
    instance,
    getModel,
    putModel,
    postModel,
    patchModel,
    deleteModel,
    headModel,
    saveModel,
    saveEntity
} from './request.js';

import axios from 'axios';
import { isNull, isEmpty } from '@/libs/common';
import http, { axiosAll } from '@/libs/http';
import store from '@/store';
import router from '@/router';
import { nextTick } from 'q';


export const initAppInfo = function(handler, handlerError) {
    var appId = store.state.user.appId;
    http.get("/$admin/apps/getAppInfo", { params: { id: appId } })
        .then(res => {
            if (res.success) {
                store.commit("setAppInfo", res.data);
                router.resetRouter();
            }
            if (!isNull(handler))
                handler();
            else
                router.push({ path: '/login' });
        }).catch(err => {
            handlerError();
        });
};

export const initModules = function() {
    var appId = store.state.user.appId;
    return http.get("/$admin/principal/moduleTree", { params: { appId: appId } });
};

export const initDicts = function() {
    return http.get('/$admin/dicts/tree', {
        params: {
            query: JSON.stringify({ key: 'getDictTree', startIds: ['root'] })
        }
    });
};


//初始化 模块路由和数据字典
export const initSystem = function(handler) {
    // var modules=http.get("/$admin/modules/ownTree");
    // var modules=http.get("/$admin/principal/principalModuleTree");
    axios.all([initModules(), initDicts()])
        .then(axios.spread(function(moduleResult, dictResult) {
            if (moduleResult.success) {
                var data = moduleResult.data;
                store.commit('setModules', data);
                router.resetRouter();

                // var routes=router.options.routes;
                // routes.splice(0, routes.length);
                // router.options.routes=[];
                // router.matcher.addRoutes(store.state.app.menuList);
                // router.matcher.addRoutes([page404]);
                // var routes=[...baseRouters,...store.state.app.menuList,page404];
                // router.options.routes=routes;
            }
            // console.log(moduleResult)
            if (dictResult.success) {
                var data = dictResult.data;
                store.commit('setDicts', data);
            }
            // console.log(dictResult);
            if (handler)
                handler();
        }));
};

export const initUserInfo = function() {
    var appInfo = store.state.user.appInfo;
    http.get('/authentication/me')
        .then(result => {
            if (result.success) {
                var userInfo = result.data;
                store.commit('setUserInfo', userInfo);
                initSystem(function() {
                    router.push({ path: '/home' });
                });
            } else {
                router.push({ path: '/login' });
            }
        })
        .catch(error => {
            console.log(error);
            router.push({ path: '/login' });
        });
};

export const logout = function() {
    return http.get("/authentication/logout");
}

//初始化模块通用数据
// export const loadModuleDatas=function(_self,name){
//     var data=store.state.dict[name];
//     if(isNull(data)||data.length==0)
//         moduleDatas[name](_self,name).then(function(result){
//             if(result.success){
//                 console.log("3333333333333");
//                 console.log(name);
//                 console.log(result.data);
//                 store.commit('setModuleDatas',name,result.data);
//             }
//         });
// };



// export const initModule = function(_self) {
//     http.get("/$admin/modules/ownTree")
//         .then(function(result) {
//             if (result.success) {
//                 var data = result.data;
//                 store.commit('setAppRouter', data);
//                 router.matcher.addRoutes(store.state.app.menuList);
//                 router.matcher.addRoutes([page404]);
//                 // router.matcher.options.routes=store.state.app.menuList
//             }
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }

export const saveModule = function(data) {
    return saveEntity('/$admin/modules', data);
};
export const getModuleById = function(id) {
    return getModel('/$admin/modules/' + id);
};
export const getModules = function(data) {
    return getModel('/$admin/modules/tree', {
        params: {
            query: JSON.stringify(data)
        }
    });
};
export const deleteModuleById = function(id) {
    return deleteModel('/$admin/modules/' + id);
};

export const getModuleTree = function(params) {
    return getModel('/$admin/principal/moduleTree', { params: params });
};


export const saveRole = function(data) {
    return saveEntity('/$admin/roles/model', data);
};

export const saveModuleRole = function(data) {
    return saveEntity('/$admin/modules/role', data);
};

export const getRoleById = function(id) {
    return getModel('/$admin/roles/' + id);
};
export const getRoles = function(data) {
    return getModel('/$admin/roles/tree', {
        params: {
            query: JSON.stringify(data)
        }
    })
}

export const deleteRoleById = function(id) {
    return deleteModel('/$admin/roles/' + id)
}

export const saveDept = function(data) {
    return saveEntity('/$admin/depts', data)
}
export const getDeptById = function(id) {
    return getModel('/$admin/depts/' + id)
}
export const getDepts = function(data) {
    return getModel('/$admin/depts/depstree', {
        params: {
            query: JSON.stringify(data)
        }
    })
}
export const deleteDeptById = function(id) {
    return deleteModel('/$admin/depts/' + id)
}




// util.initDict = function(_self) {
//     this.ajax.get("/$admin/dicts/tree", {
//             params: {
//                 query: JSON.stringify({
//                     key: "getDictTree",
//                     startIds: ['root'],
//                     wheres: {}
//                 })
//             }
//         })
//         .then(function(result) {
//             if (result.success) {
//                 var data = result.data;
//                 console.log(data);
//                 var nodes = data[0]["children"];
//                 var dicts = {};
//                 for (var i = 0; i < nodes.length; i++) {
//                     var node = nodes[i];
//                     dicts[node["code"]] = node["children"];
// 
//                 }
//                 store.commit("setDicts", dicts);
//             }
//         })
//         .catch(function(error) {
//             console.log(error);
//         });
// }

// export const getDicts = function (data) {
//     return getModel('/$admin/dicts/tree',{
//         params:{
//             query:JSON.stringify({ key:'getDictTree'})
//         }
//     });
// };

export const saveDict = function(data) {
    return saveEntity('/$admin/dicts', data)
}
export const getDictById = function(id) {
    return getModel('/$admin/dicts/' + id)
}
export const getDictTreeGrid = function(data) {
    return getModel('/$admin/dicts/tree', {
        params: {
            query: JSON.stringify(data)
        }
    })
}
export const deleteDictById = function(id) {
    return deleteModel('/$admin/dicts/' + id)
}