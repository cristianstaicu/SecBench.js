//https://snyk.io/vuln/SNYK-JS-PROPERTIESREADER-1048968
test("prototype pollution in properties-reader", () => {
  const propertiesReader = require("properties-reader");

  let obj = {};
  expect({}.polluted).toBe(undefined);

  propertiesReader("./payload.ini");
  expect({}.polluted).toBe("yes");
});
