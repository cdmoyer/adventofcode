var nice = function (s) {
    var ar = s.split("");
    // three vowels, aeiou
    var v = 0;
    for (var i=0; i<ar.length;i ++) {
        if (ar[i].match(/[aeiou]/)) v++
    }
    if (v < 3) return false;
    // It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
    if (!s.match(/(.)\1/)) return false;

    // It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
    if (s.match(/(ab|cd|pq|xy)/)) return false;

    return true;
};

var nice2 = function (s) {
    // It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
    if (!s.match(/(.).\1/)) return false;

    // It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
    if (!s.match(/(..).*\1/)) return false;

    return true;

};

var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");
var ok = 0;
lines.forEach(function (line) {
    if (nice2(line)) ok++;
});
console.log(ok);
