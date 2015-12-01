var santa_floor = require('./notquitelisp');

// Brute force
var basement_detect = function (str) {
    var i, floor;
    for (i=1; i<=str.length; i++) {
       floor = santa_floor(str.substr(0, i));
       if (floor < 0) return i;
    }
    return -1;
};

var str = process.argv[2];
console.log(str + ' enters basement at ' + basement_detect(str));
