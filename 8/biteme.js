var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");

var mem = 0;
var tot = 0;
lines.forEach(function (ln) {
    if (ln == '') return;

    tot += ln.length;
    var s, code = "s="+ln;
    eval(code);
    mem += s.length;
});
console.log(tot - mem);

orig = 0;
enc = 0;
lines.forEach(function (ln) {
    if (ln == '') return;

    orig += ln.length;
    var s = JSON.stringify(ln);
    enc += s.length;
});
console.log(enc - orig);
