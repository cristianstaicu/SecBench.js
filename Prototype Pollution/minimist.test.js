//https://snyk.io/vuln/SNYK-JS-MINIMIST-559764
test("prototype pollution in minimist", () => {
  expect({}.polluted).toBe(undefined);

  require("minimist")("--__proto__.polluted yes".split(" "));

  expect({}.polluted).toBe("yes");
});
