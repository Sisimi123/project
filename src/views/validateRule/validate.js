export const validateMoney = (rule, value, callback) => {
    if (!Number.isInteger(+value)) {
        callback(new Error('请输入有效金额'));
    } else {
        callback();
    }
};

export const validate_sfz = (rule, value, callback) => {
    if (!/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
        callback(new Error('请输入有效身份证'));
    } else {
        callback();
    }
};

export const validate_sjh = (rule, value, callback) => {
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value) && !/^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(value)) {
        callback(new Error('请输入有效手机号'));
    } else {
        callback();
    }
};

export const validate_sjh2 = (rule, value, callback) => {
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
        callback(new Error('请输入有效手机号'));
    } else {
        callback();
    }
};

export const validate_xm = (rule, value, callback) => {
    if (!/^[\u4e00-\u9fa5]{2,}$/.test(value)) {
        callback(new Error('请输入有效姓名'));
    } else {
        callback();
    }
};

export const positiveInteger = (rule, value, callback) => {
    if (!Number.isInteger(+value) || value < 0) {
        callback(new Error('请输入有效整数'));
    } else {
        callback();
    }
};

export const price = (rule, value, callback) => {
    if (!Number.isInteger(+value)) {
        callback(new Error('请输入有效金额'));
    } else {
        callback();
    }
};


export const pattern_sfz = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export const pattern_sjh = /^[1][3,4,5,7,8][0-9]{9}$/;
