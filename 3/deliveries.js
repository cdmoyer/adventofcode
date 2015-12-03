var combo = {'0,0': 1};
var seen = {'0,0': 1};
var at = [0, 0, 0, 0];

var move = function (c) {
    switch (c) {
        case '^': at[1]++; break;
        case 'v': at[1]--; break;
        case '<': at[0]--; break;
        case '>': at[0]++; break;
    }
    var key = at[0]+','+at[1];
    seen[key] = (seen[key] || 0) + 1;
};

var move2 = function (c) {
    var offset = 2 * (cnt++ % 2);
    switch (c) {
        case '^': at[1 + offset]++; break;
        case 'v': at[1 + offset]--; break;
        case '<': at[0 + offset]--; break;
        case '>': at[0 + offset]++; break;
    }
    var key = at[0 + offset]+','+at[1 + offset];
    combo[key] = (combo[key] || 0) + 1;
};

var fs=require('fs');
var moves = fs.readFileSync('/dev/stdin').toString().split("");

at = [0,0];
moves.map(move);
console.log("Santa visited " + Object.keys(seen).length + " houses");

var cnt = 1;
at = [0,0,0,0];
moves.map(move2);
console.log("Combo visited " + Object.keys(combo).length + " houses");
