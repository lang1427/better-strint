import { forceString } from "../type-checks";
import { forceNumber } from "../type-checks";
import { getDigitCount } from "./getDigitCount";

/** 获取数字
 * 从后获取字符串参数1中参数2对应索引的值  */
export const getDigit = function (x, digitIndex) {
    forceString(x);
    forceNumber(digitIndex);
    if (digitIndex >= getDigitCount(x)) {
        return "0";
    } else {
        return x.charAt(x.length - digitIndex - 1);
    }
}