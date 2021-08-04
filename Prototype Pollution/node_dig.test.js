//https://snyk.io/vuln/SNYK-JS-NODEDIG-1069825
test("prototype pollution in node-dig", () => {
  const nodeDig = require("node-dig");
  expect({}.polluted).toBe(undefined);

  nodeDig({}, ["__proto__", "polluted"], "yes");
  expect({}.polluted).toBe("yes");
});
