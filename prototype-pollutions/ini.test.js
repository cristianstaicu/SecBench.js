//https://snyk.io/vuln/SNYK-JS-INI-1048974
test("prototype pollution in ini", () => {
  var fs = require("fs");
  var ini = require("ini");
  obj = {};

  expect({}.polluted).toBe(undefined);

  var parsed = ini.parse(fs.readFileSync("./payload.ini", "utf-8"));

  expect({}.polluted).toBe("yes");
});
