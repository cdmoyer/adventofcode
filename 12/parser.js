var fs=require('fs');
var json = fs.readFileSync('/dev/stdin').toString();
var res = JSON.parse(json);

var rec = function(ob, depth) {
    var out = 0;
    var i;
    if (typeof ob == 'number') out += ob;
    else if (typeof ob.length == 'undefined') {
        for (i in ob) {
            out += rec(ob[i], depth+1);
            if (ob[i] == 'red') return 0;
        }
    }
    else if (typeof ob == 'string') {
        // ignore
    }
    else if (ob.length) {
        for (i=0; i<ob.length; i++) out += rec(ob[i], depth+1);
    }
    else {
        console.log('what is a '+ob);
    }
    return out;
};

tot = rec(res, 0);
console.log(tot);
