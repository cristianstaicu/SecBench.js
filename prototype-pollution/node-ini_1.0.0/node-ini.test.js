//https://security.snyk.io/vuln/SNYK-JS-NODEINI-1054844
test("prototype pollution in node-ini", () => {
  const ini = require("node-ini");

  expect({}.polluted).toBe(undefined);

  ini.parse("./payload.ini", function (err, data) {
    expect({}.polluted).toBe("yes");
  });
});
