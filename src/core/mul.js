import { forceString } from "../type-checks";
import { mulPositive } from './mulPositive'
import { abs } from "./abs";
import { sameSign } from '../premise/sameSign'
import { negate } from "./negate";
export const mul = function (lhs, rhs) {
    forceString(lhs);
    forceString(rhs);

    var absResult = mulPositive(abs(lhs), abs(rhs));
    return (sameSign(lhs, rhs) ? absResult : negate(absResult));
}
