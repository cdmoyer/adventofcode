var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");

var dist = {};
var places = [];
lines.forEach(function (ln) {
    if (ln == '') return;
    var m = ln.match(/(.*) to (.*) = (\d*)/);
    var a = m[1];
    var b = m[2];
    var d = parseInt(m[3]);
    if (!dist[a]) dist[a] = {}
    dist[a][b] = d;

    if (places.filter((l) => l == a).length == 0) places.push(a);
    if (places.filter((l) => l == b).length == 0) places.push(b);
});

var Combinatorics = require('js-combinatorics');

var all = Combinatorics.permutation(places).toArray();

var min = 99999999999;
var d, j , i, a,b ;
for (i=0; i<all.length; i++) {
	d = 0;
	for (j=0; j<all[i].length-1; j++) {
		a = all[i][j];
		b = all[i][j+1];
		if (dist[a] && dist[a][b]) d += dist[a][b];
		else d += dist[b][a];
	}
	min = Math.min(d, min);
}
console.log(min);

var max = 0;
for (i=0; i<all.length; i++) {
	d = 0;
	for (j=0; j<all[i].length-1; j++) {
		a = all[i][j];
		b = all[i][j+1];
		if (dist[a] && dist[a][b]) d += dist[a][b];
		else d += dist[b][a];
	}
	max = Math.max(d, max);
}
console.log(max);
