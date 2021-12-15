//https://snyk.io/vuln/SNYK-JS-DOTNOTES-598668
test("prototype pollution in dot-notes", () => {
  expect({}.polluted).toBe(undefined);

  const dots = require("dot-notes");
  dots.create({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
