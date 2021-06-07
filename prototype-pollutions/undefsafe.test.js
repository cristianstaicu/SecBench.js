//https://snyk.io/vuln/SNYK-JS-UNDEFSAFE-548940
test("prototype pollution in undefsafe ", () => {
  expect({}.polluted).toBe(undefined);

  const a = require("undefsafe");
  const obj = {};
  const payload = "__proto__.polluted";
  a({}, payload, "yes");

  expect(obj.polluted).toBe("yes");
});
