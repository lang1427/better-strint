import { multiply } from "./calculation"
import { forceString, forceNumber } from '../type-checks'

export const pow = (val, num) => {
    forceString(val)
    forceNumber(num)
    if (num == 0) return 1
    if (num == 1) return val
    if (num == 2) return multiply(val, val)
    var a = multiply(val, val), b = "";
    for (var i = 3; i <= num; i++) {
        b = multiply(a, val)
        a = b
    }
    return b
}