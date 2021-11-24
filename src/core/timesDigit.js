import { forcePositiveString } from "../type-checks";
import { forceNumber } from "../type-checks";
import { getDigitCount } from "../premise/getDigitCount";
import { getDigit } from "../premise/getDigit";
import { prefixZeros } from "../premise/prefixZeros";

export const timesDigit = function (strint, digit) {
    forcePositiveString(strint);
    forceNumber(digit);
    var result = "";
    var digitCount = getDigitCount(strint);
    var carry = 0;
    var leadingZeros = 0;
    for (var i = 0; i < digitCount; i++) {
        var digitResult = (Number(getDigit(strint, i)) * digit) + carry;
        carry = 0;
        while (digitResult >= 10) {
            digitResult -= 10;
            carry++;
        }
        if (digitResult === 0) {
            leadingZeros++;
        } else {
            result = String(digitResult) + prefixZeros(result, leadingZeros);
            leadingZeros = 0;
        }
    }
    if (carry > 0) {
        result = String(carry) + result;
    }
    return result.length === 0 ? "0" : result;
}