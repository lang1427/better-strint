# BetterStrint

BetterStrint – a JavaScript library for string-encoded integers


BetterStrint is a plug-in designed to deal with arbitrarily large integers. The core inspiration comes from the implementation of [strint](https://github.com/rauschma/strint), so BetterStrint API is generally compatible with strint. More importantly, BetterStrint also extends some functions



## API


|  方法名        | 说明   | 参数:类型 |
|:--:            |:--:   |:--:   |
| abs(x)         | 返回参数 x 绝对值 | string |
| add(x, y)      | 返回 x + y 的值 | x : string , y : string |
| div(x, y)      | 返回 x / y 的值 | x : string , y : string |
| eq(x, y)       | 判断 x == y  | x : string , y : string |
| ge(x, y)       | 判断 x ≥ y  | x : string , y : string |
| gt(x, y)       | 判断 x > y | x : string , y : string |
| le(x, y)       | 判断 x ≤ y  | x : string , y : string |
| lt(x, y)       | 判断 x < y | x : string , y : string |
| negate(x)      | 返回 x 的相反值  | x : string  |
| pow(x, y)      | 返回 x 的 y 次幂 | x : string , y : number |
| quotientRemainderPositive(x, y)      | 商剩余正数：返回值为一个数组，数组中有两个元素，索引0：x/y的商；索引1：x/y的余数 | x : string , y : string |
| sub(x, y)      | 返回 x - y 的值 | x : string , y : string |
| subPositive(x, y)    | 返回 x - y 的值,值必须为正整数 | x : string , y : string |
| sum(...arg)      | 求所有参数的和 | ...arg : string  |
| multiply(x, y)   | 返回 x * y 的值 | x : string , y : string |