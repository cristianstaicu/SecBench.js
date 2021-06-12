//https://snyk.io/vuln/SNYK-JS-IRRELONPATH-598673
test("prototype pollution in @irrelon/path", () => {
  const path = require("@irrelon/path");
  obj = {};

  expect({}.polluted).toBe(undefined);

  path.set({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
