//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28272
test("prototype pollution in keyget", () => {
  var keyget = require("keyget");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  keyget.set({}, "__proto__.polluted", "yes");
  expect(obj.polluted).toBe("yes");
});
