var fs=require('fs');
var lines = fs.readFileSync('/dev/stdin').toString().split("\n");
//var chars = fs.readFileSync('/dev/stdin').toString().split("");

var x, y, lights = {};
for (x=0; x<1000; x++) {
    for (y=0; y<1000; y++) {
        lights[x+','+y] = 0;
    }
}

lines.forEach(function (line) {
    if (line == '') return;
    var parts  = line.split(' ');
    if (parts[0] == 'toggle') parts.unshift('');
    var start = parts[2].split(',');
    var end = parts[4].split(',');
    var x, y, key;
    var startx = parseInt(start[0]);
    var starty = parseInt(start[1]);
    var endx = parseInt(end[0]);
    var endy = parseInt(end[1]);
    var tmpx, tmpy;
    for (x=startx; x<=endx; x++) {
        for (y=starty; y<=endy; y++) {
            key = x+','+y;
            switch (parts[1]) {
                case 'on': lights[key] += 1; break;
                case 'off': lights[key] = Math.max(0, lights[key]-1); break;
                case 'toggle': lights[key] +=2; break;
            }
        }
    }
});

var lit = 0;
for (x=0; x<1000; x++) {
    for (y=0; y<1000; y++) {
        lit += lights[x+','+y];
    }
}
console.log(lit);

