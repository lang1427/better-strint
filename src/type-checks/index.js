import { isPositive } from "../util";


// 强制条件函数判断
export function forceCondition(value, condition, conditionName) {
    if (!condition.call(null, value)) {
        // 对于值 value , 条件 conditionName 失败
        throw new Error("Condition " + conditionName + " failed for value " + value);
    }
}


/** 强制类型 */
export function forceType(value, type) {
    if (typeof value !== type) {
        throw new Error("Not a " + type + ": " + value);
    }
}


/** 强制字符串类型 字符串类型只能出现0~9的自然正负整数,不包含+号（也就是说/^[\-]{0,1}[0-9]+$/） */
export function forceString(value) {
    forceType(value, "string");
    if (!/^[\-]{0,1}[0-9]+$/.test(value)) {
        throw new Error(value + ": " + "Only natural positive and negative integers from 0 to 9 can appear, excluding the + sign")
    }
}


/** 强制正整数字符串 */
export function forcePositiveString(value) {
    forceString(value);
    forceCondition(value, isPositive, "isPositive");
}


/** 强制数字类型 数字类型不能是小数 必须大于等于0*/
export function forceNumber(value) {
    forceType(value, "number");
    if(!Number.isInteger(value)){
        throw new Error("Condition isInteger failed for value " + value);
    }
    if (value < 0) {
        // 预期为正数: value
        throw new Error("Expected a positive number: " + value);
    }
}
