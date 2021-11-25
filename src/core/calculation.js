
// 不可使用负数

function compare(p, q) {
    while (p[0] === '0') {
        p = p.substr(1);
    }
    while (q[0] === '0') {
        q = q.substr(1);
    }
    if (p.length > q.length) {
        return 1;
    } else if (p.length < q.length) {
        return -1;
    } else {
        let i = 0;
        let a, b;
        while (1) {
            a = parseInt(p.charAt(i));
            b = parseInt(q.charAt(i));
            if (a > b) {
                return 1;
            } else if (a < b) {
                return -1;
            } else if (i === p.length - 1) {
                return 0;
            }
            i++;
        }
    }
}
// /
export const divide = (A, B) => {
    let result = [];
    let max = 9;
    let point = 5;
    let fill = 0;
    if (B.length - A.length > 0) {
        point += fill = B.length - A.length;
    }
    for (let i = 0; i < point; i++) {
        A += '0';
    }
    let la = A.length;
    let lb = B.length;

    let b0 = parseInt(B.charAt(0));
    let Adb = A.substr(0, lb);
    A = A.substr(lb);
    let temp, r;
    for (let j = 0; j < la - lb + 1; j++) {
        while (Adb[0] === '0') {
            Adb = Adb.substr(1);
        }
        if (Adb.length === lb) {
            max = Math.ceil((parseInt(Adb.charAt(0)) + 1) / b0); // 不可能取到这个最大值,1<= max <= 10
        } else if (Adb.length > lb) {
            max = Math.ceil((parseInt(Adb.substr(0, 2)) + 1) / b0);
        } else {
            result.push(0);
            Adb += A[0];
            A = A.substr(1);
            continue;
        }
        for (let i = max - 1; i >= 0; i--) {
            if (i === 0) {
                result.push(0);
                Adb += A[0];
                A = A.substr(1);
                break;
            } else {
                temp = temp || multiply(B, i + '');
                r = compare(temp, Adb);
                if (r === 0 || r === -1) {
                    result.push(i);
                    if (r) {
                        Adb = reduce(Adb, temp);
                        Adb += A[0];
                    } else {
                        Adb = A[0];
                    }
                    A = A.substr(1);
                    break;
                } else {
                    temp = reduce(temp, B);
                }
            }
        }
        temp = 0;
    }
    for (let i = 0; i < fill; i++) {
        result.unshift('0');
    }
    result.splice(result.length - point, 0, '.');

    if (!result[0] && result[1] !== '.') {
        result.shift();
    }

    point = false;
    let position = result.indexOf('.');

    for (let i = position + 1; i < result.length; i++) {
        if (result[i]) {
            point = true;
            break;
        }
    }
    if (!point) {
        result.splice(position);
    }

    result = result.join('');
    return result;
}
// *
export const multiply = (A, B) => {
    let result = [];
    (A += ''), (B += '');
    const l = -4; // 以支持百万位精确运算，但速度减半

    let r1 = [],
        r2 = [];
    while (A !== '') {
        r1.unshift(parseInt(A.substr(l)));
        A = A.slice(0, l);
    }
    while (B !== '') {
        r2.unshift(parseInt(B.substr(l)));
        B = B.slice(0, l);
    }
    let index, value;
    for (let i = 0; i < r1.length; i++) {
        for (let j = 0; j < r2.length; j++) {
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
    for (let i = result.length - 1; i > 0; i--) {
        result[i] += '';
        if (result[i].length > -l) {
            result[i - 1] += parseInt(result[i].slice(0, l));
            result[i] = result[i].substr(l);
        }
        while (result[i].length < -l) {
            result[i] = '0' + result[i];
        }
    }
    if (result[0]) {
        result = result.join('');
    } else {
        result = '0';
    }
    return result;
}
// +
export const add = (A, B) => {
    let result = [];
    (A += ''), (B += '');
    const l = -15;
    while (A !== '' && B !== '') {
        result.unshift(parseInt(A.substr(l)) + parseInt(B.substr(l)));
        A = A.slice(0, l);
        B = B.slice(0, l);
    }
    A += B;

    for (let i = result.length - 1; i > 0; i--) {
        result[i] += '';
        if (result[i].length > -l) {
            result[i - 1] += 1;
            result[i] = result[i].substr(1);
        } else {
            while (result[i].length < -l) {
                result[i] = '0' + result[i];
            }
        }
    }

    while (A && (result[0] + '').length > -l) {
        result[0] = (result[0] + '').substr(1);
        result.unshift(parseInt(A.substr(l)) + 1);
        A = A.slice(0, l);
    }

    if (A) {
        while ((result[0] + '').length < -l) {
            result[0] = '0' + result[0];
        }
        result.unshift(A);
    }

    if (result[0]) {
        result = result.join('');
    } else {
        result = '0';
    }

    return result;
}
// -
export const reduce = (A, B) => {
    let result = [];
    (A += ''), (B += '');
    while (A[0] === '0') {
        A = A.substr(1);
    }
    while (B[0] === '0') {
        B = B.substr(1);
    }
    const l = -15;
    let N = '1';
    for (let i = 0; i < -l; i++) {
        N += '0';
    }
    N = parseInt(N);
    while (A !== '' && B !== '') {
        result.unshift(parseInt(A.substr(l)) - parseInt(B.substr(l)));
        A = A.slice(0, l);
        B = B.slice(0, l);
    }
    if (A !== '' || B !== '') {
        let s = B === '' ? 1 : -1;
        A += B;
        while (A !== '') {
            result.unshift(s * parseInt(A.substr(l)));
            A = A.slice(0, l);
        }
    }
    while (result.length !== 0 && result[0] === 0) {
        result.shift();
    }
    let s = '';
    if (result.length === 0) {
        result = 0;
    } else if (result[0] < 0) {
        s = '-';
        for (let i = result.length - 1; i > 0; i--) {
            if (result[i] > 0) {
                result[i] -= N;
                result[i - 1]++;
            }
            result[i] *= -1;
            result[i] += '';
            while (result[i].length < -l) {
                result[i] = '0' + result[i];
            }
        }
        result[0] *= -1;
    } else {
        for (let i = result.length - 1; i > 0; i--) {
            if (result[i] < 0) {
                result[i] += N;
                result[i - 1]--;
            }
            result[i] += '';
            while (result[i].length < -l) {
                result[i] = '0' + result[i];
            }
        }
    }

    if (result) {
        while ((result[0] = parseInt(result[0])) === 0) {
            result.shift();
        }
        result = s + result.join('');
    }
    return result;
}
