import axios from 'axios';
import md5 from 'js-md5';
import qs from 'qs';
// import store from '../store';
import config from './config'
// import router from '../seaRouter';
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
                // store.commit('logout');
                //store.commit('clearOpenedSubmenu');
                // router.push({
                //     path: '/login'
                // });
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
                // store.commit('logout', this);
                // //store.commit('clearOpenedSubmenu');
                // router.push({
                //     name: 'login'
                // });
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



// function loadJs(url,id,callback){
//     console.log(1111);
//     var script=document.createElement('script');
//     script.type="text/javascript";
//     if(typeof(callback)!="undefined"){
//         if(script.readyState){
//             script.onreadystatechange=function(){
//                 if(script.readyState == "loaded" || script.readyState == "complete"){
//                     script.onreadystatechange=null;
//                     callback();
//                 }
//             }
//         }else{
//             script.onload=function(){
//                 callback();
//             }
//         }
//      }
//     if(typeof(id)!="undefined")
//         script.id=id;
//     script.src=url;
//     document.body.appendChild(script);
//     console.log(1113);
// }

// loadJs("http://192.168.2.62:8083/sea/static/pageoffice/pageoffice.js","po_js_main");


export default http;
