// Cheesey counting
var santa_floor = function (str) {
    return str.split('').filter((x) => x=='(').length -
        str.split('').filter((x) => x==')').length;
};

module.exports = santa_floor;

if(require.main === module) {
    var str = process.argv[2];
    console.log(str + ' goes to floor ' + santa_floor(str));
}
