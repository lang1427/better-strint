import { forcePositiveString } from "../type-checks";
import { forceNonNegativeNumber } from "../type-checks";
import { prefixZeros } from '../premise/prefixZeros'
import { isNegative } from "./isNegative";
import { isPositive } from "./isPositive";
import { abs } from './abs'

const leftPadZeros = function (strint, digitCount) {
    forcePositiveString(strint);
    forceNonNegativeNumber(digitCount);

    return prefixZeros(strint, digitCount - strint.length);
}

const ltPositive = function (x, y) {
    if (isNegative(x) || isNegative(y)) {
        throw new Error("Both operands must be positive: " + x + " " + y);
    }
    var maxLength = Math.max(x.length, y.length);
    var lhs = leftPadZeros(x, maxLength);
    var rhs = leftPadZeros(y, maxLength);
    return lhs < rhs; // lexicographical comparison
}

export const lt = function (lhs, rhs) {
    if (isNegative(lhs) && isPositive(rhs)) {
        return true;
    } else if (isPositive(lhs) && isNegative(rhs)) {
        return false;
    } else if (isNegative(lhs) && isNegative(rhs)) {
        // Example: -3 < -5
        return !ltPositive(abs(lhs), abs(rhs));
    } else {
        return ltPositive(lhs, rhs);
    }
}