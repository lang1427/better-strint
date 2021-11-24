import { lt } from './lt'
export const ge = function (lhs, rhs) {
    return !lt(lhs, rhs);
}