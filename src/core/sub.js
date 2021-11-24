import { forceString } from "../type-checks";
import { add } from './add'
import { negate } from "./negate";
export const sub = function (x, y) {
    forceString(x);
    forceString(y);
    return add(x, negate(y));
}