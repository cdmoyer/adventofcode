var cur = '1113122113';
var iter = 50;

var looksay = function (s) {
    var ar = s.split("");
    var nums = [];
    var last = -1;
    var times = 0;
    for (var i=0; i<ar.length; i++) {
        if (ar[i] == last) times++
        else {
            if (last != -1) nums.push({num: last, times: times});
            times = 1;
            last = ar[i];
        }
    }
    nums.push({num: last, times: times});

    var out = '';
    for (i=0; i<nums.length; i++) {
        out += '' + nums[i].times;
        out += '' + nums[i].num;
    }
    return out;
};

for (var i=0; i<iter; i++) {
    console.log(i + ': ' + cur.length);
    cur = looksay(cur);
}
console.log(i + ': ' + cur.length);
