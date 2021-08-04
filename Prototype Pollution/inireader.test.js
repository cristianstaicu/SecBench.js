//https://snyk.io/vuln/SNYK-JS-INIREADER-1054843
test("prototype pollution in inireader", () => {
  const iniReader = require("inireader");
  const path = require("path");
  const parser = new iniReader.IniReader();

  let obj = {};
  expect({}.polluted).toBe(undefined);

  parser.load(path.resolve(__dirname, "./payload.ini"));
  expect({}.polluted).toBe("yes");
});
