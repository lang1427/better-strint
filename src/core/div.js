import { forceString } from "../type-checks";
import { quotientRemainderPositive } from "./quotientRemainderPositive";
import { abs } from "./abs";
import { sameSign } from '../premise/sameSign'
import { negate } from "./negate";

export const div = function (dividend, divisor) {
    forceString(dividend);
    forceString(divisor);

    var absResult = quotientRemainderPositive(abs(dividend), abs(divisor))[0];
    return (sameSign(dividend, divisor) ? absResult : negate(absResult));
}