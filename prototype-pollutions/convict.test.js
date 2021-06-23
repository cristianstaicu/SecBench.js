//https://snyk.io/vuln/SNYK-JS-CONVICT-1062508
test("prototype pollution in node-dig", () => {
  const convict = require("convict");
  let obj = {};
  const config = convict(obj);

  expect({}.polluted).toBe(undefined);

  config.set("__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
