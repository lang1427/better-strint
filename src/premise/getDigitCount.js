import { isNegative } from "../util";

/** 获取数字的长度，除去减号(-) */
export const getDigitCount = function (strint) {
    if (isNegative(strint)) {
        return strint.length - 1;
    } else {
        return strint.length;
    }
}