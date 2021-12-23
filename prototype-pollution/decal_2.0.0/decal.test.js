//https://security.snyk.io/vuln/SNYK-JS-DECAL-1051007
test("prototype pollution in decal", () => {
  const decal = require("decal");

  expect({}.polluted).toBe(undefined);
  decal.set({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
