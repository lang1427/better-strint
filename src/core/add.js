import { forceString } from '../type-checks'
import { isPositive } from './isPositive';
import { addPositive } from '../premise/addPositive'
import { negate } from './negate';
import { isNegative } from './isNegative'
import { lt } from './lt';
import { abs } from './abs';
import { subPositive } from './subPositive';
export const add = function (x, y) {
    forceString(x);
    forceString(y);

    if (isPositive(x) && isPositive(y)) {
        return addPositive(x, y);
    } else if (isNegative(x) && isNegative(y)) {
        return negate(addPositive(abs(x), abs(y)));
    } else {
        if (lt(abs(x), abs(y))) {
            var tmp = x;
            x = y;
            y = tmp;
        }
        // |a| >= |b|
        var absResult = subPositive(abs(x), abs(y));
        if (isPositive(x)) {
            // Example: 5 + -3
            return absResult;
        } else {
            // Example: -5 + 3
            return negate(absResult);
        }
    }
}