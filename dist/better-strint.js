/**
 * better-strint
 * v1.0.0
 * by Wei Zhixiang
 * https://github.com/lang1427/better-strint
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.BetterStrint = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var isPositive = function isPositive(strint) {
    return !isNegative(strint);
  };

  function forceNonNegativeNumber(value) {
    forceType(value, "number");

    if (value < 0) {
      throw new Error("Expected a positive number: " + value);
    }
  }
  function forceCondition(value, condition, conditionName) {
    if (!condition.call(null, value)) {
      throw new Error("Condition " + conditionName + " failed for value " + value);
    }
  }
  function forceType(value, type) {
    if (_typeof(value) !== type) {
      throw new Error("Not a " + type + ": " + value);
    }
  }
  function forceString(value) {
    forceType(value, "string");
  }
  function forcePositiveString(value) {
    forceString(value);
    forceCondition(value, isPositive, "isPositive");
  }
  function forceNumber(value) {
    forceType(value, "number");
  }

  var isNegative = function isNegative(strint) {
    forceString(strint);
    return strint.indexOf("-") === 0;
  };

  var negate = function negate(strint) {
    if (strint === "0") {
      return "0";
    }

    if (isNegative(strint)) {
      return strint.slice(1);
    } else {
      return "-" + strint;
    }
  };

  var abs = function abs(strint) {
    if (isNegative(strint)) {
      return negate(strint);
    } else {
      return strint;
    }
  };

  var getDigitCount = function getDigitCount(strint) {
    if (isNegative(strint)) {
      return strint.length - 1;
    } else {
      return strint.length;
    }
  };

  var getDigit = function getDigit(x, digitIndex) {
    forceString(x);
    forceNumber(digitIndex);

    if (digitIndex >= getDigitCount(x)) {
      return "0";
    } else {
      return x.charAt(x.length - digitIndex - 1);
    }
  };

  var prefixZeros = function prefixZeros(strint, zeroCount) {
    forcePositiveString(strint);
    forceNonNegativeNumber(zeroCount);
    var result = strint;

    for (var i = 0; i < zeroCount; i++) {
      result = "0" + result;
    }

    return result;
  };

  var addPositive = function addPositive(x, y) {
    forcePositiveString(x);
    forcePositiveString(y);
    var maxLength = Math.max(x.length, y.length);
    var result = "";
    var borrow = 0;
    var leadingZeros = 0;

    for (var i = 0; i < maxLength; i++) {
      var lhs = Number(getDigit(x, i));
      var rhs = Number(getDigit(y, i));
      var digit = lhs + rhs + borrow;
      borrow = 0;

      while (digit >= 10) {
        digit -= 10;
        borrow++;
      }

      if (digit === 0) {
        leadingZeros++;
      } else {
        result = String(digit) + prefixZeros(result, leadingZeros);
        leadingZeros = 0;
      }
    }

    if (borrow > 0) {
      result = String(borrow) + result;
    }

    return result;
  };

  var leftPadZeros = function leftPadZeros(strint, digitCount) {
    forcePositiveString(strint);
    forceNonNegativeNumber(digitCount);
    return prefixZeros(strint, digitCount - strint.length);
  };

  var ltPositive = function ltPositive(x, y) {
    if (isNegative(x) || isNegative(y)) {
      throw new Error("Both operands must be positive: " + x + " " + y);
    }

    var maxLength = Math.max(x.length, y.length);
    var lhs = leftPadZeros(x, maxLength);
    var rhs = leftPadZeros(y, maxLength);
    return lhs < rhs; // lexicographical comparison
  };

  var lt = function lt(lhs, rhs) {
    if (isNegative(lhs) && isPositive(rhs)) {
      return true;
    } else if (isPositive(lhs) && isNegative(rhs)) {
      return false;
    } else if (isNegative(lhs) && isNegative(rhs)) {
      // Example: -3 < -5
      return !ltPositive(abs(lhs), abs(rhs));
    } else {
      return ltPositive(lhs, rhs);
    }
  };

  var ge = function ge(lhs, rhs) {
    return !lt(lhs, rhs);
  };

  var subPositive = function subPositive(x, y) {
    forcePositiveString(x);
    forcePositiveString(y);

    if (!ge(x, y)) {
      throw new Error("x must be greater or equal to y");
    }

    var maxLength = Math.max(x.length, y.length);
    var result = "";
    var borrow = 0;
    var leadingZeros = 0;

    for (var i = 0; i < maxLength; i++) {
      var lhs = Number(getDigit(x, i)) - borrow;
      borrow = 0;
      var rhs = Number(getDigit(y, i));

      while (lhs < rhs) {
        lhs += 10;
        borrow++;
      }

      var digit = String(lhs - rhs);

      if (digit !== "0") {
        result = digit + prefixZeros(result, leadingZeros);
        leadingZeros = 0;
      } else {
        leadingZeros++;
      }
    }

    return result.length === 0 ? "0" : result;
  };

  var add = function add(x, y) {
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
      } // |a| >= |b|


      var absResult = subPositive(abs(x), abs(y));

      if (isPositive(x)) {
        // Example: 5 + -3
        return absResult;
      } else {
        // Example: -5 + 3
        return negate(absResult);
      }
    }
  };

  var RE_NON_ZERO = /^(-?)0*([1-9][0-9]*)$/;
  var RE_ZERO = /^0+$/;
  var normalize = function normalize(strint) {
    if (RE_ZERO.test(strint)) {
      return "0";
    }

    var match = RE_NON_ZERO.exec(strint);

    if (!match) {
      throw new Error("Illegal strint format: " + strint);
    }

    return match[1] + match[2];
  };

  var eq = function eq(lhs, rhs) {
    return normalize(lhs) === normalize(rhs);
  };

  var gt = function gt(lhs, rhs) {
    if (eq(lhs, rhs)) return false;
    return ge(lhs, rhs);
  };

  var sub = function sub(x, y) {
    forceString(x);
    forceString(y);
    return add(x, negate(y));
  };

  var shiftLeft = function shiftLeft(strint, digitCount) {
    while (digitCount > 0) {
      strint = strint + "0";
      digitCount--;
    }

    return strint;
  };

  var quotientRemainderPositive = function quotientRemainderPositive(dividend, divisor) {
    /*
    Example division: 290 / 15
    29|0 = 0  // digits larger, can subtract
    15
    14|0 = 1  // digits smaller, must shift
    15
    140| = 10  // digits are 140, can subtract 9 times
     15
    (9 subtractions omitted)
      5| = 19  // divisor is now larger than the dividend, we are done: [19, 5]
     15
     */
    forcePositiveString(dividend);
    forcePositiveString(divisor);

    if (eq(dividend, divisor)) {
      return ["1", "0"];
    }

    if (gt(divisor, dividend)) {
      return ["0", normalize(dividend)];
    }

    var quotient = "0";
    var remainingDigits = dividend.length - divisor.length;

    while (true) {
      var digits = dividend.slice(0, dividend.length - remainingDigits); // Subtract as long as possible and count the times

      while (ge(digits, divisor)) {
        digits = sub(digits, divisor);
        quotient = add(quotient, "1");
      }

      dividend = digits + dividend.slice(dividend.length - remainingDigits); // Done already?

      if (gt(divisor, dividend)) {
        // holds (at the lastest) at remainingDigits === 0
        quotient = shiftLeft(quotient, remainingDigits);
        return [quotient, normalize(dividend)];
      } // Not done, shift


      remainingDigits--;
      quotient = shiftLeft(quotient, 1);

      if (remainingDigits < 0) {
        throw new Error("Illegal state");
      }
    }
  };

  var sameSign = function sameSign(lhs, rhs) {
    return isPositive(lhs) === isPositive(rhs);
  };

  var div = function div(dividend, divisor) {
    forceString(dividend);
    forceString(divisor);
    var absResult = quotientRemainderPositive(abs(dividend), abs(divisor))[0];
    return sameSign(dividend, divisor) ? absResult : negate(absResult);
  };

  var timesDigit = function timesDigit(strint, digit) {
    forcePositiveString(strint);
    forceNumber(digit);
    var result = "";
    var digitCount = getDigitCount(strint);
    var carry = 0;
    var leadingZeros = 0;

    for (var i = 0; i < digitCount; i++) {
      var digitResult = Number(getDigit(strint, i)) * digit + carry;
      carry = 0;

      while (digitResult >= 10) {
        digitResult -= 10;
        carry++;
      }

      if (digitResult === 0) {
        leadingZeros++;
      } else {
        result = String(digitResult) + prefixZeros(result, leadingZeros);
        leadingZeros = 0;
      }
    }

    if (carry > 0) {
      result = String(carry) + result;
    }

    return result.length === 0 ? "0" : result;
  };

  var mulPositive = function mulPositive(lhs, rhs) {
    /* Example via http://en.wikipedia.org/wiki/Multiplication_algorithm
            23958233
                5830 ×
        ------------
            00000000 ( =      23,958,233 ×     0)
           71874699  ( =      23,958,233 ×    30)
         191665864   ( =      23,958,233 ×   800)
        119791165    ( =      23,958,233 × 5,000)
        ------------
        139676498390 ( = 139,676,498,390        )
     */
    forcePositiveString(lhs);
    forcePositiveString(rhs);
    var result = "0";
    var digitCount = getDigitCount(rhs);

    for (var i = 0; i < digitCount; i++) {
      var singleRow = timesDigit(lhs, Number(getDigit(rhs, i)));
      singleRow = shiftLeft(singleRow, i);
      result = addPositive(result, singleRow);
    }

    return result;
  };

  var mul = function mul(lhs, rhs) {
    forceString(lhs);
    forceString(rhs);
    var absResult = mulPositive(abs(lhs), abs(rhs));
    return sameSign(lhs, rhs) ? absResult : negate(absResult);
  };

  var pow = function pow(val, num) {
    if (num < 0) {
      throw "pow function not support negative number";
    }

    if (num == 0) return 1;
    if (num == 1) return val;
    if (num == 2) return mul(val, val);
    var a = mul(val, val),
        b = "";

    for (var i = 3; i <= num; i++) {
      b = mul(a, val);
      a = b;
    }

    return b;
  };

  var sum = function sum() {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    return arg.reduce(function (pre, cur) {
      return add(pre, cur);
    });
  };

  var index = {
    abs: abs,
    add: add,
    div: div,
    eq: eq,
    ge: ge,
    gt: gt,
    isNegative: isNegative,
    isPositive: isPositive,
    lt: lt,
    mul: mul,
    mulPositive: mulPositive,
    negate: negate,
    normalize: normalize,
    pow: pow,
    quotientRemainderPositive: quotientRemainderPositive,
    sub: sub,
    subPositive: subPositive,
    sum: sum,
    timesDigit: timesDigit
  };

  return index;

}));
