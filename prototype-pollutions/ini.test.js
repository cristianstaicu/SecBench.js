//https://snyk.io/vuln/SNYK-JS-INI-1048974
test("prototype pollution in ini", () => {
  const fs = require("fs");
  const path = require("path");
  const ini = require("ini");
  obj = {};

  expect({}.polluted).toBe(undefined);

  ini.parse(fs.readFileSync(path.resolve(__dirname, "./payload.ini"), "utf-8"));

  expect({}.polluted).toBe("yes");
});
