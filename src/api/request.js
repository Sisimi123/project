import axios from 'axios';
import { isNull, isEmpty } from '../libs/common';
import http from '../libs/http';


export const getModel = function (url, config) {
    return http.get(url, config);
};

export const postModel = function (url, data, config) {
    return http.post(url, data, config);
};

export const putModel = function (url, data, config) {
    return http.put(url, data, config);
};

export const patchModel = function (url, data, config) {
    return http.patch(url, data, config);
};

export const deleteModel = function (url, config) {
    return http.delete(url, config);
};

export const headModel = function (url, config) {
    return http.head(url, config);
};

export const saveModel = function (url, data, config) {
   
  if(!isNull(data.entity)&&!isNull(data.entity.id))
    return http.patch(url+'/'+data.entity.id, dataToParams(data), config);
  else
    return http.post(url, dataToParams(data), config);
};

export const saveEntity = function (url, data, config) {
    // console.log("saveEntity");
    // console.log(data);
    if(!isNull(data._model)&&!isNull(data._model.id))
      return http.patch(url+'/'+data._model.id, dataToParams(data), config);
    else if(!isNull(data._model)&&!isNull(data._model.entity)&&!isNull(data._model.entity.id))
      return http.patch(url+'/'+data._model.entity.id, dataToParams(data), config);
    else
      return http.post(url, dataToParams(data), config);
  };

export const dataToParams = function (data) {
    if (isNull(data) || data instanceof URLSearchParams) return data;
    let params = new URLSearchParams();
    for (var key in data) {
        if (typeof data[key] === 'object') {
            params.append(key, JSON.stringify(data[key]));
        } else {
            params.append(key, data[key]);
        }
    }
    return params;
};

export const request={
    get:getModel,
    post:postModel,
    put:putModel,
    patch:patchModel,
    delete:deleteModel,
    head:headModel,
    save:saveModel,
    all:axios.all,
    spread:axios.spread
}

// export const postJson = axios.create({
//   headers: { 'Content-Type': "application/json;charset=utf-8" },
//   baseURL: util.basePath,
//   timeout: 30000,
//   withCredentials: true
// });

// export const postForm = axios.create({
//   headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" },
//   baseURL: util.basePath,
//   timeout: 30000,
//   withCredentials: true
// });

// export const postFormParams = function(url,params){

//   return postForm({
//     url:url,

//   })
// }

// export const postFormBody = axios.create({
//   headers: { 'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" },
//   baseURL: util.basePath,
//   timeout: 30000,
//   withCredentials: true
// });

// export const postMultiForm = axios.create({
//   headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' },
//   baseURL: util.basePath,
//   timeout: 30000,
//   withCredentials: true
// });
