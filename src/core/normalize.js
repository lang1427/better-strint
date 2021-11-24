var RE_NON_ZERO = /^(-?)0*([1-9][0-9]*)$/;
var RE_ZERO = /^0+$/;
export const normalize = function (strint) {
    if (RE_ZERO.test(strint)) {
        return "0";
    }
    var match = RE_NON_ZERO.exec(strint);
    if (!match) {
        throw new Error("Illegal strint format: " + strint);
    }
    return match[1] + match[2];
}