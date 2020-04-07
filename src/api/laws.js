import {
    instance,
    getModel,
    putModel,
    postModel,
    patchModel,
    deleteModel,
    headModel
  } from './request.js';
  
  
  
  
  
  export const getDiscretionarys=function(_self,name){
    return getModel("/enforces/discretionary/tree",{
        params:{
            query:JSON.stringify({key:"getDiscretionaryTree",startIds:['root']})
        }
    });
  };
  
  export const getLaws=function(_self,name){
    return getModel("/enforces/laws/tree",{
        params:{
        query:JSON.stringify({key:"getLawsTree",startIds:['root']})
        }
    });
  };
  
  
  export const openPageOffice=function(_self,params){
    var args={
        _token:_self.$store.state.user.userInfo.refreshToken,
        params:params
    };
    console.log("args",args);
    var url=_self.$basePath+'/static/pageOffice/index';
    // POBrowser.openWindowModeless(url,'width=1250px;height=800px;',JSON.stringify(args));
    POBrowser.openWindowModeless(url,'left=0px;top=0px;resizable=no;fullscreen=yes;',JSON.stringify(args));
  };