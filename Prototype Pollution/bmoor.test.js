//https://snyk.io/vuln/SNYK-JS-BMOOR-598664
test("prototype pollution in bmoor", () => {
  expect({}.polluted).toBe(undefined);

  const bmoor = require("bmoor");
  bmoor.set({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
