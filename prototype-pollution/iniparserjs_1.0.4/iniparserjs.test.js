//https://security.snyk.io/vuln/SNYK-JS-INIPARSERJS-1065989
test("prototype pollution in iniparserjs", () => {
  expect({}.polluted).toBe(undefined);

  var path = require("path");
  var IniParser = require("iniparserjs");

  var config = new IniParser(path.join(__dirname, "test.ini"), "UTF8");
  // var sections = config.sections()
  // var keysOfSection1 = config.keysOfSection("section1")
  console.log("After:", {}.polluted);

  expect({}.polluted).toBe("yes");
});
