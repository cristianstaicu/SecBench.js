//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2020-28277
test("prototype pollution in dset", () => {
  expect({}.polluted).toBe(undefined);

  const dset = require("dset");
  dset({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
