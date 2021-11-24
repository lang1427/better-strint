import { forcePositiveString } from '../type-checks'
import { forceNonNegativeNumber } from '../type-checks';
export const prefixZeros = function (strint, zeroCount) {
    forcePositiveString(strint);
    forceNonNegativeNumber(zeroCount);

    var result = strint;
    for (var i = 0; i < zeroCount; i++) {
        result = "0" + result;
    }
    return result;
}