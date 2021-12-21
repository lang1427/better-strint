import { isPositive } from "../util";

/** 验证两个数是否同号（同为正数/负数） */
export const sameSign = (lhs, rhs) => {
    return isPositive(lhs) === isPositive(rhs);
}