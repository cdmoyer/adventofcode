var crypto = require('crypto');

var key = 'yzbqklnj';

var zeroes = 6;
var match = '';
for (var j=0; j<zeroes; j++) match += '0';

var i=0,
    result;
do {
    i++;
    result = crypto.createHash('md5').update(key+i).digest('hex');
} while (result.substr(0, zeroes) != match);
console.log(i);
