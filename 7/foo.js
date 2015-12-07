var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");

var circuit = {};

var good = function (k) {
    if (!circuit.hasOwnProperty(k)) return false;
    if (circuit[k].match) return false;
    return true;
};

var calc = function (input, depth) {
    var tmp,res = null;

    if (!input.match) {
        return input;
    }

    if (input.match(/^[0-9]+$/)) {
        res = parseInt(input);
    }
    else if (tmp = input.match(/^[a-z]+$/)) {
        if (!good(tmp[0])) { circuit[tmp[0]] = calc(circuit[tmp[0]], depth+1) }
        res = circuit[tmp[0]];
    }
    // Terrible hack!
    else if (tmp =  input.match(/^([0-9]+) AND ([a-z]+)$/)) {
        if (!good(tmp[2])) { circuit[tmp[2]] = calc(circuit[tmp[2]], depth+1) }
        res = parseInt(tmp[1]) & circuit[tmp[2]];
    }
    else if (tmp =  input.match(/^([a-z]+) AND ([a-z]+)$/)) {
        if (!good(tmp[1])) { circuit[tmp[1]] = calc(circuit[tmp[1]], depth+1) }
        if (!good(tmp[2])) { circuit[tmp[2]] = calc(circuit[tmp[2]], depth+1) }
        res = circuit[tmp[1]] & circuit[tmp[2]];
    }
    else if (tmp =  input.match(/^([a-z]+) OR ([a-z]+)$/)) {
        if (!good(tmp[1])) { circuit[tmp[1]] = calc(circuit[tmp[1]], depth+1) }
        if (!good(tmp[2])) { circuit[tmp[2]] = calc(circuit[tmp[2]], depth+1) }
        res = circuit[tmp[1]] | circuit[tmp[2]];
    }
    else if (tmp =  input.match(/^([a-z]+) LSHIFT ([0-9]+)$/)) {
        if (!good(tmp[1])) { circuit[tmp[1]] = calc(circuit[tmp[1]], depth+1) }
        res = circuit[tmp[1]] << parseInt(tmp[2]);
    }
    else if (tmp =  input.match(/^([a-z]+) RSHIFT ([0-9]+)$/)) {
        if (!good(tmp[1])) { circuit[tmp[1]] = calc(circuit[tmp[1]], depth+1) }
        res = circuit[tmp[1]] >> parseInt(tmp[2]);
    }
    else if (tmp =  input.match(/^NOT ([a-z]+)$/)) {
        if (!good(tmp[1])) { circuit[tmp[1]] = calc(circuit[tmp[1]], depth+1) }
        res = 65535 - circuit[tmp[1]];
    }
    else {
        console.log(input);
    }

    var str = ''
    for (var i=0; i<depth; i++) str += ' ';
    console.log(str + input + ' = '+ res);
    return res;
};

lines.forEach(function (ln) {
    if (ln == '') return;
    var pt = ln.split(" -> ");
    circuit[pt[1]] = pt[0];
});

circuit['b'] = 3176;
console.log(calc('a', 0))
