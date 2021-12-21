import { forcePositiveString } from "../type-checks";
import { getDigit } from '../premise/getDigit'
import { prefixZeros } from "./prefixZeros";
export const addPositive = function (x, y) {
    forcePositiveString(x);
    forcePositiveString(y);
    var maxLength = Math.max(x.length, y.length);
    var result = "";
    var borrow = 0;
    var leadingZeros = 0;
    for (var i = 0; i < maxLength; i++) {
        var lhs = Number(getDigit(x, i));
        var rhs = Number(getDigit(y, i));
        var digit = lhs + rhs + borrow;
        borrow = 0;
        while (digit >= 10) {
            digit -= 10;
            borrow++;
        }
        if (digit === 0) {
            leadingZeros++;
        } else {
            result = String(digit) + prefixZeros(result, leadingZeros);
            leadingZeros = 0;
        }
    }
    if (borrow > 0) {
        result = String(borrow) + result;
    }
    return result;
}
