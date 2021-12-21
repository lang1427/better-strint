/**
 * better-strint
 * v1.0.2
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

  function forceCondition(value, condition, conditionName) {
    if (!condition.call(null, value)) {
      // 对于值 value , 条件 conditionName 失败
      throw new Error("Condition " + conditionName + " failed for value " + value);
    }
  }
  /** 强制类型 */

  function forceType(value, type) {
    if (_typeof(value) !== type) {
      throw new Error("Not a " + type + ": " + value);
    }
  }
  /** 强制字符串类型 字符串类型只能出现0~9的自然正负整数,不包含+号（也就是说/^[\-]{0,1}[0-9]+$/） */

  function forceString(value) {
    forceType(value, "string");

    if (!/^[\-]{0,1}[0-9]+$/.test(value) && value !== "") {
      throw new Error(value + ": " + "Only natural positive and negative integers from 0 to 9 can appear, excluding the + sign");
    }
  }
  /** 强制正整数字符串 */

  function forcePositiveString(value) {
    forceString(value);
    forceCondition(value, isPositive, "isPositive");
  }
  /** 强制数字类型 数字类型不能是小数 必须大于等于0*/

  function forceNumber(value) {
    forceType(value, "number");

    if (!Number.isInteger(value)) {
      throw new Error("Condition isInteger failed for value " + value);
    }

    if (value < 0) {
      // 预期为正数: value
      throw new Error("Expected a positive number: " + value);
    }
  }

  var isNegative = function isNegative(strint) {
    forceString(strint);
    return strint.indexOf("-") === 0;
  };
  /** 是正数 */

  var isPositive = function isPositive(strint) {
    return !isNegative(strint);
  };
  /** 字符串标准化(只能出现0~9的自然正负整数,不包含+号) */

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

  /** 取反 */

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

  /** 获取数字的长度，除去减号(-) */

  var getDigitCount = function getDigitCount(strint) {
    if (isNegative(strint)) {
      return strint.length - 1;
    } else {
      return strint.length;
    }
  };

  /** 获取数字
   * 从后获取字符串参数1中参数2对应索引的值  */

  var getDigit = function getDigit(x, digitIndex) {
    forceString(x);
    forceNumber(digitIndex);

    if (digitIndex >= getDigitCount(x)) {
      return "0";
    } else {
      return x.charAt(x.length - digitIndex - 1);
    }
  };

  /** 向字符串前补0
   * 参数1：要补0的字符串；   参数2：补0的个数 */

  var prefixZeros = function prefixZeros(strint, zeroCount) {
    forcePositiveString(strint);
    forceNumber(zeroCount);
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
    forceNumber(digitCount);
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

  /** 左移  */
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

  /** 验证两个数是否同号（同为正数/负数） */

  var sameSign = function sameSign(lhs, rhs) {
    return isPositive(lhs) === isPositive(rhs);
  };

  var div = function div(dividend, divisor) {
    forceString(dividend);
    forceString(divisor);
    var absResult = quotientRemainderPositive(abs(dividend), abs(divisor))[0];
    return sameSign(dividend, divisor) ? absResult : negate(absResult);
  };

  var le = function le(lhs, rhs) {
    if (eq(lhs, rhs)) return true;
    return lt(lhs, rhs);
  };

  // 不可使用负数

  var multiply = function multiply(A, B) {
    forceString(A);
    forceString(B);
    var same_sing_flag = false;

    if (!sameSign(A, B)) {
      same_sing_flag = true;
    }

    isNegative(A) ? A = A.slice(1) : A;
    isNegative(B) ? B = B.slice(1) : B;
    var result = [];
    var l = -4; // 以支持百万位精确运算，但速度减半

    var r1 = [],
        r2 = [];

    while (A !== '') {
      r1.unshift(parseInt(A.substr(l)));
      A = A.slice(0, l);
    }

    while (B !== '') {
      r2.unshift(parseInt(B.substr(l)));
      B = B.slice(0, l);
    }

    var index, value;

    for (var i = 0; i < r1.length; i++) {
      for (var j = 0; j < r2.length; j++) {
        value = 0;

        if (r1[i] && r2[j]) {
          value = r1[i] * r2[j];
        }

        index = i + j;

        if (result[index]) {
          result[index] += value;
        } else {
          result[index] = value;
        }
      }
    }

    for (var _i4 = result.length - 1; _i4 > 0; _i4--) {
      result[_i4] += '';

      if (result[_i4].length > -l) {
        result[_i4 - 1] += parseInt(result[_i4].slice(0, l));
        result[_i4] = result[_i4].substr(l);
      }

      while (result[_i4].length < -l) {
        result[_i4] = '0' + result[_i4];
      }
    }

    if (result[0]) {
      result = result.join('');
    } else {
      result = '0';
    }

    return same_sing_flag ? "-" + result : result;
  }; // +

  var pow = function pow(val, num) {
    forceString(val);
    forceNumber(num);
    if (num == 0) return 1;
    if (num == 1) return val;
    if (num == 2) return multiply(val, val);
    var a = multiply(val, val),
        b = "";

    for (var i = 3; i <= num; i++) {
      b = multiply(a, val);
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
    le: le,
    lt: lt,
    negate: negate,
    pow: pow,
    quotientRemainderPositive: quotientRemainderPositive,
    sub: sub,
    subPositive: subPositive,
    sum: sum,
    multiply: multiply
  };

  return index;

}));
