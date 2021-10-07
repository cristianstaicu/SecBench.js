var Cryo = require('cryo');
var frozen = '{"root":"_CRYO_REF_3","references":[{"contents":{},"value":"_CRYO_FUNCTION_function () {console.log(\\"defconrussia\\"); return 1111;}"},{"contents":{},"value":"_CRYO_FUNCTION_function () {console.log(\\"defconrussia\\");return 2222;}"},{"contents":{"toString":"_CRYO_REF_0","valueOf":"_CRYO_REF_1"},"value":"_CRYO_OBJECT_"},{"contents":{"__proto__":"_CRYO_REF_2"},"value":"_CRYO_OBJECT_"}]}'
var hydrated = Cryo.parse(frozen);
console.log(hydrated);
