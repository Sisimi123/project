import {Modal}from 'iview'; 

export const isNull = function (o) {
  return o == null || o == undefined || o == ""; 
}

export const trim = function (o) {
  if (isNull(o))
    return ""; 
  return o.replace(/^\s + | \s + $/gm, ''); 
}

export const isEmpty = function (o) {
  return isNull(o) || o=="null"||o=="undefined"||JSON.stringify(o) === '{}'; 
}

export const getModuleCodes = function (modules, codes) {
  modules.forEach(e => {
    codes[e.code] = e
    if (isNull(e.children)) {
      getModuleCodes(e.children, codes)
    }
  })
}

export const deepCopy = function (source) {
  let str = JSON.stringify(source); //序列化对象
return JSON.parse(str); //还原
}


export const oneOf = function (value, validList) {
  for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
          return true;
      }
  }
  return false;
}


export const getBirthday = function(identityCard) {
  var len = (identityCard + "").length; 
  if (len == 0) {
    return ""; 
  }else {
    if ((len != 15) && (len != 18)) {// 身份证号码只能为15位或18位其它不合法
      return ""; 
    }
  }
  var strBirthday = ""; 
  if (len == 18) {// 处理18位的身份证号码从号码中得到生日和性别代码
    strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2); 
  }
  if (len == 15) {
    strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2); 
  }
  return strBirthday; 
}


export const getAge = function(identityCard) {
    var strBirthday = getBirthday(identityCard); 
  // 时间字符串里，必须是“/”
  var birthDate = new Date(strBirthday); 
  var nowDateTime = new Date(); 
  var age = nowDateTime.getFullYear() - birthDate.getFullYear(); 
  // 再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
  if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime
          .getDate() < birthDate.getDate())) {
    age--; 
  }
  return age||''; 
}


export const confirm = function() {
  Modal.confirm( {
    
  })
}


export const dateFormat=function(date, fmt){
  if (null == date || undefined == date) return '';
  var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Date.prototype.toJSON = function(){return dateFormat(this,'yyyy-MM-dd hh:mm:ss')};