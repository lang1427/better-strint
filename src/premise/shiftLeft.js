/** 左移  */
export const shiftLeft = (strint, digitCount) => {
    while (digitCount > 0) {
        strint = strint + "0";
        digitCount--;
    }
    return strint;
}