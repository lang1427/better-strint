import { normalize } from "./normalize";
export const eq = function (lhs, rhs) {
    return normalize(lhs) === normalize(rhs);
}