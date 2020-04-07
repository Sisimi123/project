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

// 
export const getPage_user = (data) => {
    return getModel('/enforces/shipscoreuser/page', data);
};


export const getModuleById_user = (id) => {
    return getModel('/enforces/shipscoreuser/' + id);
};
export const getModules = (data) => {
    return getModel('/$admin/modules/tree', {
        params:{
            query:JSON.stringify(data)
        }
    });
};
export const deleteDeptById = function (id) {
    return deleteModel('/$admin/depts/' + id);
};

