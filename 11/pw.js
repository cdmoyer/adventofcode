var cur = 'cqjxjnds';

var valid = function (s) {
    // Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
    if (!s.match(/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/)) return;
    // Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
    if (s.match(/[iol]/)) return false;
    // Passwords must contain at least two pairs of letters, like aa, bb, or zz.
    var m;
    if (m = s.match(/(.)\1/g)) {
        if (m.length < 2) return false;
    } else return false;

    return true;
};

var increment = function (s) {
    var ar = s.split("");
    var z = 'z'.charCodeAt(0);

    for (var i = ar.length-1; i>=0; i--) {
        if (ar[i].charCodeAt(0) < z) {
            ar[i] = String.fromCharCode(ar[i].charCodeAt(0)+1);
            break;
        }
        else if (ar[i].charCodeAt(0) == z) {
            ar[i] = 'a';
        }
    }
    return ar.join('');
};

do {
    cur = increment(cur);
} while (!valid(cur) && cur != 'zzzzzzzz');
console.log(cur);

do {
    cur = increment(cur);
} while (!valid(cur) && cur != 'zzzzzzzz');
console.log(cur);
