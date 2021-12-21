import { normalize } from "../util";
export const eq = function (lhs, rhs) {
    return normalize(lhs) === normalize(rhs);
}