//https://github.com/advisories/GHSA-jp4x-w63m-7wgm
test("prototype pollution in hoek", () => {
  expect({}.polluted).toBe(undefined);
  var Hoek = require("hoek");
  var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  Hoek.merge({}, JSON.parse(malicious_payload));
  expect({}.polluted).toBe("yes");
});
