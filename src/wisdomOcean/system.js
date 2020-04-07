import http from './seaHttp';
import store from './store';


export const initUserInfo = function (handler) {
    http.get('/authentication/me')
        .then(result => {
            if (result.success) {
                console.log(result,'result')
                var userInfo = result.data;
                store.commit('setUserInfo', userInfo);
                handler()
            } else {

            }
        })
        .catch(error => {
            console.log(error)
        });
};

export const initDicts = function () {
    http.get('/$admin/dicts/tree', {
        params: {
            query: JSON.stringify({ key: 'getDictTree', startIds: ['root'] })
        }
    }).then(res => {
        console.log(res, 'initDicts')
        var data = res.data;
        store.commit('setDicts', data);
    })
};
