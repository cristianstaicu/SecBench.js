//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28274
test("prototype pollution in deepref", () => {
  expect({}.polluted).toBe(undefined);

  const deepref = require("deepref");
  deepref.set({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
