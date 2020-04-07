import axios from 'axios';
import md5 from 'js-md5';
import qs from 'qs';
import store from '../store';
import config from '@/config'
import router from '../router/index';
import {Modal,Message} from 'iview';



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const http= axios.create({
    baseURL: config.basePath,
    timeout: 30000,
    withCredentials: true,
    headers: {'ipInfo': window.ipInfo?window.ipInfo.cip:''}
});

http.md5=md5;

export const axiosAll=function(requests,handler){
    axios.all(requests).then(axios.spread(handler));
}


var interceptor = function (response) {
    var result = response.data;
    if (result.code == 4 || result.code == 7) {
        Modal.error({
            title:"提示",
            content: result.msg,
            onOk: function () {
                store.commit('logout');
                //store.commit('clearOpenedSubmenu');
                router.push({
                    path: '/login'
                });
            }
        });
    }
    return result;
};

var interceptorerror = function (error) {
    if (error.response == undefined) {
        Message.error('请求超时，请重试！');
        return;
    }

    var result = error.response.data;
    if (result.code == 4 || result.code == 7) {
        Modal.error({
            title:"提示",
            content: result.msg,
            onOk: function () {
                store.commit('logout', this);
                //store.commit('clearOpenedSubmenu');
                router.push({
                    name: 'login'
                });
            }
        });
    } else {
        // app.$Message.error({
        //     content: "未知错误，请重试!"
        // });
    }
    return Promise.reject(error);
};
http.interceptors.response.use(interceptor, interceptorerror);



function loadJs(url,id,callback){
    console.log(1111);
    var script=document.createElement('script');
    script.type="text/javascript";
    if(typeof(callback)!="undefined"){
        if(script.readyState){
            script.onreadystatechange=function(){
                if(script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange=null;
                    callback();
                }
            }
        }else{
            script.onload=function(){
                callback();
            }
        }
     }
    if(typeof(id)!="undefined")
        script.id=id;
    script.src=url;
    document.body.appendChild(script);
    console.log(1113);
}

// loadJs(config.basePath+"/static/pageoffice/jquery.min.js");
loadJs(config.basePath+"/static/pageoffice/pageoffice.js","po_js_main");


// var appKey="GAqABpNyNsw6pUSQbjB8FJ7PhS8EEseNM";
// var appSecret="a431c21e1b0943ada3f7efe870575b2e";
// http.interceptors.request.use(function (config) {
//     if(!util.isNull(config.data)){
//         var params=config.data;
//         if(!(params instanceof URLSearchParams)){
//             params=new URLSearchParams();
//             params.append("_model",JSON.stringify(config.data));
//             config.data=params;
//         }
//         var timestamp=new Date().getTime();
//         params.append("timestamp",timestamp);
//         params.append("appKey",appKey);
//         params.sort();
//         var str="";
//         for (let item of params.entries()) {
//             str+=item[0]+"="+item[1]+"&";
//         }
//         str+="appSecret="+appSecret;
//         var sign=util.md5(str);
//         params.append("sign",sign);
//     }else{
//         var params=config.params;
//         if(util.isNull(params)){
//             params={};
//             config.params=params;
//         }
//         var timestamp=new Date().getTime();
//         params["timestamp"]=timestamp;
//         params["appKey"]=appKey;
//         var temp=[];
//         for(var item in params){
//             temp.push(item+"="+params[item]);
//         }
//         temp.sort();
//         var str="";
//         for(var i=0;i<temp.length;i++)
//             str+=temp[i]+"&";
//         str+="appSecret="+appSecret;
//         var sign=util.md5(str);
//         params["sign"]=sign;
//     }
//     return config;
//   }, function (error) {
//     return Promise.reject(error);
//   });



// http.interceptors.request.use((config) => {
//     console.log(config);
//     if (!util.isNull(config.params)) {
//         var paramStr = qs.stringify(config.params, { allowDots: true, arrayFormat: 'indices' });
//         var params = paramStr.split("&");
//         var temp = {};
//         for (var i = 0; i < params.length; i++) {
//             var kv = params[i].split("=");
//             temp[kv[0]] = kv[1];
//         }
//         config.params = temp;
//     }
//     if (!util.isNull(config.data)) {
//         config.data = qs.stringify(config.data, { allowDots: true, arrayFormat: 'indices' });
//     }
//     console.log(config);
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// http.interceptors.request.use((config) => {
//     var data=config.data;
//     if(!util.isNull(data)){
//         var params={};
//         for (var it in data) 
//             params[it]=encodeURIComponent(JSON.stringify(data[it]));
//         config.params=params;
//         config.data=undefined;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });


// 添加响应拦截器
// http.interceptors.response.use(function(response) {
//     console.log("interceptors_success");
//     return response.data;
// }, function(error) {
//     console.log("interceptors_error");
//     return Promise.reject(error);
// });


export default http;

// util.getDataById = function(url, hander, ehandler) {
//     this.ajax.get(url)
//         .then(hander).catch(function(error) {
//             if (!util.isNull(ehandler))
//                 ehandler(error)
//             else
//                 console.log(error);
//         });
// }
// util.getDataList = function(url, query, handler, ehandler) {
//     this.ajax.get(url, {
//             params: {
//                 query: query
//             }
//         }).then(handler)
//         .catch(function(error) {
//             if (!util.isNull(ehandler))
//                 ehandler(error)
//             else
//                 console.log(error);
//         });
// }
// util.saveData = function(url, data, isNew, handler, ehandler) {
//     if (isNew) {
//         this.ajax.post(url, data)
//             .then(handler)
//             .catch(function(error) {
//                 if (!util.isNull(ehandler))
//                     ehandler(error)
//                 else
//                     console.log(error);
//             });
//     } else {
//         var id = data.id
//         if (!this.isEmpty(id))
//             url = url + "/" + id;
//         this.ajax.patch(url, data)
//             .then(handler)
//             .catch(function(error) {
//                 if (!util.isNull(ehandler))
//                     ehandler(error)
//                 else
//                     console.log(error);
//             });
//     }
// }
// util.removeData = function(_self, url, handler, ehandler) {
//     var id = node[0].id;
//     this.delConfirm(_self, function() {
//         http.delete(url)
//             .then(handler)
//             .catch(function(error) {
//                 if (!util.isNull(ehandler))
//                     ehandler(error)
//                 else
//                     console.log(error);
//             });
//     });
// }

// util.newTreeEmpty = function(id) {
//     return {
//         parent: id ? { id: id } : null
//     }
// }