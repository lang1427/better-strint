import { isNegative } from "../util";

/** 取反 */
export const negate = function (strint) {
    if (strint === "0") {
        return "0";
    }
    if (isNegative(strint)) {
        return strint.slice(1);
    } else {
        return "-" + strint;
    }
}