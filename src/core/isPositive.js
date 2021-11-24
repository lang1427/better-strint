import { isNegative } from './isNegative'

export const isPositive = function (strint) {
    return !isNegative(strint);
}