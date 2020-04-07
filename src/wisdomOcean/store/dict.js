
import { isNull } from "@/libs/common";

const dict = {
    state: {
        dicts:[],
        laws:[],
        discretionarys:[]
    },
    mutations: {
        setDicts(state, data) {
            // if (!dicts) {
            //     var dicts = sessionStorage.getItem("dicts")
            //     if (dicts != undefined && dicts != null && dicts != '') {
            //         dicts = JSON.parse(dicts)
            //     } else {
            //         dicts = [];
            //     }
            // }else{
            //     sessionStorage.setItem("dicts",JSON.stringify(dicts));
            // }
            // state.dicts = dicts;
            var dicts = undefined;
            if(data&&data.length>0){
                var nodes = data[0]["children"];
                dicts = {};
                for (var i = 0; i < nodes.length; i++) {
                    var node = nodes[i];
                    dicts[node["code"]] = node["children"];
                }
                sessionStorage.setItem("sessionDicts",JSON.stringify(dicts));
            }else{
                dicts = JSON.parse(sessionStorage.getItem("sessionDicts"));
            }
            state.dicts=dicts;


            // if(state.dicts.length==0){
            //     getDicts().then(function(result){
            //         if(result.data.success){
            //             var nodes = result.data.data[0]["children"];
            //             var dicts = {};
            //             for (var i = 0; i < nodes.length; i++) {
            //                 var node = nodes[i];
            //                 dicts[node["code"]] = node["children"];
            //             }
            //             state.dicts=dicts;
            //         }
            //     });
            // }
        },
        // setLaws(state,data) {
        //     // if(state.laws.length==0){
        //     //     getLaws().then(function(result){
        //     //         if(result.data.success){
        //     //             state.laws=result.data.data[0]["children"];
        //     //         }
        //     //     });
        //     // }
        //     var laws = undefined;
        //     if(data&&data.length>0){
        //         sessionStorage.setItem("sessionLaws",JSON.stringify(dicts));
        //     }else{
        //         laws = JSON.parse(sessionStorage.getItem("sessionLaws"));
        //     }
        //     state.laws=laws;
        // },
        // setDiscretionarys(state,data){
        //     // if(state.discretionarys.length==0){
        //     //     getDiscretionarys().then(function(result){
        //     //         if(result.data.success){
        //     //             state.discretionarys=result.data.data[0]["children"];
        //     //         }
        //     //     });
        //     // }
        //     var laws = undefined;
        //     if(data&&data.length>0){
        //         sessionStorage.setItem("sessionLaws",JSON.stringify(dicts));
        //     }else{
        //         laws = JSON.parse(sessionStorage.getItem("sessionLaws"));
        //     }
        //     state.laws=laws;
        // }
        setModuleDatas(state,name,data){
            // console.log("33333334444");
            var temp = undefined;
            var sessionName="session"+name;
            if(data&&data.length>0){
                sessionStorage.setItem(sessionName,JSON.stringify(temp));
                temp=data;
            }else{
                temp = JSON.parse(sessionStorage.getItem(sessionName));
            }
            // console.log(temp);
            state[name]=temp;
        }
    },
    getters: {
        getDictList: (state) => (type) => {
            // console.log(state.dicts);
            return state.dicts[type];
        },
        getDict: (state) => (type, value) => {
            return state.dicts[type].find(item => item.value === value);
        },
        getDictName: (state) => (type, value) => {
            var dict=state.dicts[type].find(item => item.value === value);
            if(isNull(dict))
                return '';
            var title=dict["title"];
            return isNull(title)?"":title;
        },
        // getLaws: (state) => () => {
        //     return state.laws;
        // },
        // getDiscretionarys: (state) => () => {
        //     return state.discretionarys;
        //     // if(state.discretionarys.length==0){
        //     //     getDiscretionarys().then(function(result){
        //     //         if(result.data.success){
        //     //             state.discretionarys=result.data.data[0]["children"];
        //     //         }
        //     //     });
        //     // }
        //     // return state.discretionarys;
        // }
        getModuleDatas(state,name){
            // console.log("333333344446666");
            // console.log(state[name]);
            return state[name];
        }
    }
};

export default dict;