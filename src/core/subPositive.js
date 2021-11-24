import { forcePositiveString } from "../type-checks";
import { ge } from './ge'
import { getDigit } from "../premise/getDigit";
import { prefixZeros } from "../premise/prefixZeros";
export const subPositive = function (x, y) {
    forcePositiveString(x);
    forcePositiveString(y);
    if (!ge(x, y)) {
        throw new Error("x must be greater or equal to y");
    }

    var maxLength = Math.max(x.length, y.length);
    var result = "";
    var borrow = 0;
    var leadingZeros = 0;
    for (var i = 0; i < maxLength; i++) {
        var lhs = Number(getDigit(x, i)) - borrow;
        borrow = 0;
        var rhs = Number(getDigit(y, i));
        while (lhs < rhs) {
            lhs += 10;
            borrow++;
        }
        var digit = String(lhs - rhs);
        if (digit !== "0") {
            result = digit + prefixZeros(result, leadingZeros);
            leadingZeros = 0;
        } else {
            leadingZeros++;
        }
    }
    return result.length === 0 ? "0" : result;
}