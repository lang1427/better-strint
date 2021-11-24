import { mul } from "./mul"

export const pow = (val, num) => {
    if (num < 0) {
        throw ("pow function not support negative number")
    }
    if (num == 0) return 1
    if (num == 1) return val
    if (num == 2) return mul(val, val)
    var a = mul(val, val), b = "";
    for (var i = 3; i <= num; i++) {
        b = mul(a, val)
        a = b
    }
    return b
}