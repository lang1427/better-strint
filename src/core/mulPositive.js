import { forcePositiveString } from "../type-checks";
import { getDigitCount } from '../premise/getDigitCount'
import { addPositive } from '../premise/addPositive'
import { timesDigit } from './timesDigit'
import { shiftLeft } from "../premise/shiftLeft";
import { getDigit } from "../premise/getDigit";

export const mulPositive = function (lhs, rhs) {
    /* Example via http://en.wikipedia.org/wiki/Multiplication_algorithm
            23958233
                5830 ×
        ------------
            00000000 ( =      23,958,233 ×     0)
           71874699  ( =      23,958,233 ×    30)
         191665864   ( =      23,958,233 ×   800)
        119791165    ( =      23,958,233 × 5,000)
        ------------
        139676498390 ( = 139,676,498,390        )
     */

    forcePositiveString(lhs);
    forcePositiveString(rhs);
    var result = "0";
    var digitCount = getDigitCount(rhs);
    for (var i = 0; i < digitCount; i++) {
        var singleRow = timesDigit(lhs, Number(getDigit(rhs, i)));
        singleRow = shiftLeft(singleRow, i);
        result = addPositive(result, singleRow);
    }
    return result;
}