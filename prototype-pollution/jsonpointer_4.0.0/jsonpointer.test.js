//https://security.snyk.io/vuln/SNYK-JS-JSONPOINTER-1577288
test("prototype pollution in jsonpointer", () => {
  const jsonpointer = require("jsonpointer");

  expect({}.polluted).toBe(undefined);
  jsonpointer.set({}, [["proto"], ["__proto__"], "polluted"], "yes");

  expect({}.polluted).toBe("yes");
});
