//https://snyk.io/vuln/SNYK-JS-JSINI-1048970
test("prototype pollution in js-ini", () => {
  const fs = require("fs");
  const path = require("path");
  const ini = require("js-ini");
  obj = {};

  expect({}.polluted).toBe(undefined);

  ini.parse(fs.readFileSync(path.resolve(__dirname, "./payload.ini"), "utf-8"));

  expect({}.polluted).toBe("yes");
});
