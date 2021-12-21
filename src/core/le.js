import { lt } from "./lt";
import { eq } from "./eq";

export const le = (lhs, rhs) => {
    if (eq(lhs,rhs)) return true
    return lt(lhs, rhs)
}