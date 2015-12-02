var neededperbox = function (l, w, h) {
    return 2*l*w + 2*w*h + 2*h*l + Math.min(l*w,w*h,h*l);
};

var ribbon_neededperbox = function (l, w, h) {
    var o = Math.min(l+l+w+w, h+h+l+l, h+h+w+w);
    return o + (l*w*h);
};

var parse_box_input = function (str) {
    return str.split('x').map(function (s) { return parseInt(s); });
};

//console.log(ribbon_neededperbox.apply(this, parse_box_input('2x3x4')));
//console.log(ribbon_neededperbox.apply(this, parse_box_input('1x1x10')));


var paper = 0;
var ribbon = 0;
var  handleline = function(line) {
    if (line) {
        paper += neededperbox.apply(this, parse_box_input(line));
        ribbon += ribbon_neededperbox.apply(this, parse_box_input(line));
        console.log('paper: ' + paper);
        console.log('ribbon: ' + ribbon);
    }
}
var fs=require('fs');
fs.readFileSync('/dev/stdin').toString().split("\n").map(handleline);
