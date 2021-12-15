//https://snyk.io/vuln/SNYK-JS-ASSIGNDEEP-450211
test("prototype pollution in assign-deep ", () => {
  const assign = require("assign-deep");
  const payloads = ['{"__proto__": {"polluted": "yes"}}'];

  var obj = {};

  expect({}.polluted).toBe(undefined);

  assign({}, JSON.parse(payloads[0]));
  expect({}.polluted).toBe("yes");
});
