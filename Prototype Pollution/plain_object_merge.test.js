//https://hackerone.com/reports/871156
test("prototype pollution in plain-object-merge", () => {
  const merge = require("plain-object-merge");
  const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');

  obj = {};

  expect({}.polluted).toBe(undefined);

  merge([{}, payload]);
  expect({}.polluted).toBe("yes");
});
