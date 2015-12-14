var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");

var people = []
var happiness = {};
lines.forEach(function (ln) {
    if (ln == '') return;
    var m = ln.match(/^([^ ]+) would (gain|lose) (\d*) happiness units* by sitting next to (.*)\.$/);
    var a = m[1];
    var gain = m[2];
    var units = parseInt(m[3]);
    var b = m[4];

    if (gain != 'gain') units = units * -1;
    if (!happiness[a]) happiness[a] = {}
    happiness[a][b] = units;

    if (people.filter((l) => l == a).length == 0) people.push(a);
});

var Combinatorics = require('js-combinatorics');
var all = Combinatorics.permutation(people).toArray();

var max = 0;
var i, j, h, a, p, n;
for (i=0; i<all.length; i++) {
    h = 0;
	for (j=0; j<all[i].length; j++) {
        a = all[i][j];
        p = j > 0 ? j-1 : all[i].length - 1;
        n = j < all[i].length-1 ? j+1 : 0;
        h += happiness[a][all[i][p]];
        h += happiness[a][all[i][n]];
    }
	max = Math.max(h, max);
}
console.log(max);


people.push('Me');
all = Combinatorics.permutation(people).toArray();
max = 0;
for (i=0; i<all.length; i++) {
    h = 0;
	for (j=0; j<all[i].length; j++) {
        a = all[i][j];
        p = j > 0 ? j-1 : all[i].length - 1;
        n = j < all[i].length-1 ? j+1 : 0;
        if (happiness[a] && happiness[a][all[i][p]]) {
            h += happiness[a][all[i][p]];
        }
        if (happiness[a] && happiness[a][all[i][n]]) {
            h += happiness[a][all[i][n]];
        }
    }
	max = Math.max(h, max);
}
console.log(max);
