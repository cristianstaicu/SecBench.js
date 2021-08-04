//https://hackerone.com/reports/878339
test("prototype pollution in extend-merge", () => {
  const extend_merge = require("extend-merge");
  const payload = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  let obj = {};

  expect({}.polluted).toBe(undefined);

  extend_merge.merge({}, payload);
  expect({}.polluted).toBe("yes");
});
