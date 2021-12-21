import { forceString } from "./type-checks";

// 是负数
export const isNegative = function (strint) {
    forceString(strint);
    return (strint.indexOf("-") === 0);
}

/** 是正数 */
export const isPositive = function (strint) {
    return !isNegative(strint);
}


/** 字符串标准化(只能出现0~9的自然正负整数,不包含+号) */
const RE_NON_ZERO = /^(-?)0*([1-9][0-9]*)$/;
const RE_ZERO = /^0+$/;
export const normalize = function (strint) {
    if (RE_ZERO.test(strint)) {
        return "0";
    }
    var match = RE_NON_ZERO.exec(strint);
    if (!match) {
        throw new Error("Illegal strint format: " + strint);
    }
    return match[1] + match[2];
}