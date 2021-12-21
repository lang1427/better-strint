import { isNegative } from "../util";
import { negate } from "./negate";
export const abs = function (strint) {
    if (isNegative(strint)) {
        return negate(strint);
    } else {
        return strint;
    }
}