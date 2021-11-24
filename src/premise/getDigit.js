import { forceString } from "../type-checks";
import { forceNumber } from "../type-checks";
import { getDigitCount } from "./getDigitCount";
export const getDigit = function (x, digitIndex) {
    forceString(x);
    forceNumber(digitIndex);
    if (digitIndex >= getDigitCount(x)) {
        return "0";
    } else {
        return x.charAt(x.length - digitIndex - 1);
    }
}