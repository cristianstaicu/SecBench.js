//https://snyk.io/vuln/SNYK-JS-JSINI-1048970
test("prototype pollution in js-ini", () => {
  var fs = require("fs");
  var ini = require("js-ini");
  obj = {};

  expect({}.polluted).toBe(undefined);

  var parsed = ini.parse(fs.readFileSync("./payload.ini", "utf-8"));

  expect({}.polluted).toBe("yes");
});
