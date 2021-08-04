//https://snyk.io/vuln/SNYK-JS-DEEPS-598667
test("prototype pollution in deeps", () => {
  expect({}.polluted).toBe(undefined);

  const deeps = require("deeps");
  deeps.set({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
