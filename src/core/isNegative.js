import { forceString } from "../type-checks";
export const isNegative = function (strint) {
    forceString(strint);
    return (strint.indexOf("-") === 0);
}