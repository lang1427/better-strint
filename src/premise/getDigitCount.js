import { isNegative } from "../core/isNegative";
export const getDigitCount = function (strint) {
    if (isNegative(strint)) {
        return strint.length - 1;
    } else {
        return strint.length;
    }
}