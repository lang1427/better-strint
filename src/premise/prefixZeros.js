import { forcePositiveString, forceNumber } from '../type-checks'

/** 向字符串前补0
 * 参数1：要补0的字符串；   参数2：补0的个数 */
export const prefixZeros = function (strint, zeroCount) {
    forcePositiveString(strint);
    forceNumber(zeroCount);
    var result = strint;
    for (var i = 0; i < zeroCount; i++) {
        result = "0" + result;
    }
    return result;
}