//https://security.snyk.io/vuln/SNYK-JS-MOOTOOLS-1325536
test("prototype pollution in x-assign", () => {
  require("mootools");

  expect({}.polluted).toBe(undefined);

  Object.merge({}, JSON.parse('{"__proto__": {"polluted": "yes"}}'));

  expect({}.polluted).toBe("yes");
});
