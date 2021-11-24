import { eq } from "./eq";
import { ge } from './ge'
export const gt = function (lhs, rhs) {
    if (eq(lhs, rhs)) return false;
    return ge(lhs, rhs);
}