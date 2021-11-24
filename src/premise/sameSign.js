import { isPositive } from "../core/isPositive";
export const sameSign = (lhs, rhs) => {
    return isPositive(lhs) === isPositive(rhs);
}